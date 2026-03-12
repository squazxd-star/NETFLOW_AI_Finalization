(function(){"use strict";const ge={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let Z=ge.green,Pe=null;function Ue(n){n&&ge[n]&&(Pe=n,Z=ge[n],at(),requestAnimationFrame(()=>Tt()))}function zt(){if(Pe&&ge[Pe])return ge[Pe];try{const n=localStorage.getItem("netflow_app_theme");if(n&&ge[n])return ge[n]}catch{}return ge.green}let ae=0,re=255,se=65;function at(){const n=Z.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);n&&(ae=parseInt(n[1],16),re=parseInt(n[2],16),se=parseInt(n[3],16))}const rt='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',st='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let H=null,Q=null,K=null,lt=0,Fe=null,Se=null,Ne=null,We=0,he=!1,pe=null,Ie=null,_e=null,Ee=1,j=[];function ze(n){const e=[{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(n<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let s=2;s<=n;s++)e.push({stepId:`scene${s}-prompt`,label:`ฉาก ${s} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${s}-gen`,label:`ฉาก ${s} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${s}-wait`,label:`ฉาก ${s} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const le=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];j=ze(1);function Lt(n){const e=n.rgb,s=n.accentRgb,r=n.doneRgb,i=n.hex,d=n.accentHex,c=n.doneHex,a=(()=>{const m=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!m)return"#4ade80";const o=g=>Math.min(255,g+80);return`#${[1,2,3].map(g=>o(parseInt(m[g],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const m=c.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!m)return"#4ade80";const o=g=>Math.min(255,g+60);return`#${[1,2,3].map(g=>o(parseInt(m[g],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),x=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,w=p?parseInt(p[1],16)/x:0,k=p?parseInt(p[2],16)/x:1,D=p?parseInt(p[3],16)/x:.25,C=m=>`${Math.round(w*m)}, ${Math.round(k*m)}, ${Math.round(D*m)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${e},0.15) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${s},0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 10% 80%, rgba(${e},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 90% 10%, rgba(${s},0.08) 0%, transparent 45%),
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
        radial-gradient(ellipse at 100% 100%, rgba(${s},0.09) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 0%, rgba(${e},0.06) 0%, transparent 35%),
        radial-gradient(ellipse at 0% 100%, rgba(${s},0.06) 0%, transparent 35%);
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
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${s},0.18); }
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
        rgba(${s},0.054) 70px,
        rgba(${s},0.054) 71px
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
        rgba(${s},0.045) 113px,
        rgba(${s},0.045) 114px
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
    background: radial-gradient(circle, rgba(${s},0.16) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${s},0.12) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${e},0.18) 0%, rgba(${s},0.06) 40%, transparent 70%);
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
        linear-gradient(0deg, rgba(${s},0.025) 2px, transparent 2px),
        linear-gradient(90deg, rgba(${s},0.025) 2px, transparent 2px);
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
        radial-gradient(circle at 0% 75%, rgba(${s},0.05) 2px, transparent 2px),
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
        rgba(${s},0.06) 195deg,
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
        rgba(${s},0.035) 18px,
        rgba(${s},0.035) 19px
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
        radial-gradient(circle, rgba(${s},0.05) 1px, transparent 1px);
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
            rgba(${s},0.025) 40px, rgba(${s},0.025) 41px
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
        rgba(${s},0.035) 25px, rgba(${s},0.035) 26px
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
        linear-gradient(45deg, transparent 75%, rgba(${s},0.03) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(${s},0.03) 75%);
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
        radial-gradient(ellipse at 80% 20%, rgba(${s},0.12) 0%, transparent 45%),
        radial-gradient(ellipse at 60% 80%, rgba(${e},0.10) 0%, transparent 40%),
        radial-gradient(ellipse at 30% 10%, rgba(${s},0.08) 0%, transparent 50%),
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
        rgba(${s},0.04) 2.5%,
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
    filter: drop-shadow(0 0 18px rgba(${s},0.25));
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
    0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 18px rgba(${s},0.25)); }
    50%      { opacity: 0.6;  filter: drop-shadow(0 0 28px rgba(${s},0.4)); }
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
    color: ${a};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

@keyframes nf-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.nf-term-done .nf-term-status {
    background: rgba(${r}, 0.12);
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
    background: radial-gradient(circle, rgba(${e},0.25) 0%, rgba(${s},0.08) 40%, transparent 70%);
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
    border-top: 1px solid rgba(${s},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${C(6)},0.75) 0%, rgba(${C(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${e},0.12), 0 0 24px rgba(${e},0.06), inset 0 1px 0 rgba(${s},0.08);
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
    color: rgba(${s},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${s},0.7),
        0 0 12px rgba(${s},0.35),
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
    background: ${c};
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
    background: linear-gradient(90deg, ${i}, ${d});
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
    color: ${a};
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
    background: ${c};
    box-shadow: 0 0 5px rgba(${r},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${r},0.1);
    color: ${l};
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

    `}function Ye(){K||(K=document.createElement("style"),K.id="netflow-overlay-styles",K.textContent=Lt(Z),document.head.appendChild(K))}function ct(n){n.innerHTML="",j.forEach((e,s)=>{const r=document.createElement("div");r.className="nf-proc-row nf-proc-waiting",r.id=`nf-proc-${e.stepId}`,r.innerHTML=`
            <span class="nf-proc-num">${s+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,n.appendChild(r)})}function dt(){const n=document.getElementById("nf-terminal");if(!n)return;ct(n);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${j.length}`)}function pt(n,e){let a="";for(let k=0;k<20;k++){const D=k/20*Math.PI*2,C=(k+.2)/20*Math.PI*2,m=(k+.5)/20*Math.PI*2,o=(k+.8)/20*Math.PI*2,g=(k+1)/20*Math.PI*2;a+=`${k===0?"M":"L"}${(120+100*Math.cos(D)).toFixed(1)},${(120+100*Math.sin(D)).toFixed(1)} `,a+=`L${(120+100*Math.cos(C)).toFixed(1)},${(120+100*Math.sin(C)).toFixed(1)} `,a+=`L${(120+112*Math.cos(m)).toFixed(1)},${(120+112*Math.sin(m)).toFixed(1)} `,a+=`L${(120+100*Math.cos(o)).toFixed(1)},${(120+100*Math.sin(o)).toFixed(1)} `,a+=`L${(120+100*Math.cos(g)).toFixed(1)},${(120+100*Math.sin(g)).toFixed(1)} `}a+="Z";const l=14,p=72,x=62;let w="";for(let k=0;k<l;k++){const D=k/l*Math.PI*2,C=(k+.25)/l*Math.PI*2,m=(k+.75)/l*Math.PI*2,o=(k+1)/l*Math.PI*2;w+=`${k===0?"M":"L"}${(120+x*Math.cos(D)).toFixed(1)},${(120+x*Math.sin(D)).toFixed(1)} `,w+=`L${(120+p*Math.cos(C)).toFixed(1)},${(120+p*Math.sin(C)).toFixed(1)} `,w+=`L${(120+p*Math.cos(m)).toFixed(1)},${(120+p*Math.sin(m)).toFixed(1)} `,w+=`L${(120+x*Math.cos(o)).toFixed(1)},${(120+x*Math.sin(o)).toFixed(1)} `}return w+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="nfKGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="rgba(${n},0.9)"/>
                <stop offset="100%" stop-color="rgba(${e},0.7)"/>
            </linearGradient>
            <linearGradient id="nfKGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(${e},0.7)"/>
                <stop offset="100%" stop-color="rgba(${n},0.5)"/>
            </linearGradient>
        </defs>

        <!-- Outer ring (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${a}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="100" fill="none" stroke="rgba(${n},0.15)" stroke-width="0.4"/>
        </g>

        <!-- Inner ring (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${w}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${x}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${n},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${n},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function qt(){const n=document.createElement("div");n.id="netflow-engine-overlay",pe=document.createElement("canvas"),pe.id="nf-matrix-canvas",n.appendChild(pe);const e=document.createElement("div");e.className="nf-pat-plasma",n.appendChild(e);for(let h=1;h<=5;h++){const b=document.createElement("div");b.className=`nf-ambient-orb nf-orb-${h}`,n.appendChild(b)}const s=document.createElement("div");s.className="nf-pat-data",n.appendChild(s);const r=document.createElement("div");r.className="nf-pat-diag-a",n.appendChild(r);const i=document.createElement("div");i.className="nf-pat-diag-b",n.appendChild(i);const d=document.createElement("div");d.className="nf-pat-circuit",n.appendChild(d);const c=document.createElement("div");c.className="nf-pat-honeycomb",n.appendChild(c);const a=document.createElement("div");a.className="nf-pat-binary",n.appendChild(a);const l=document.createElement("div");l.className="nf-pat-crosshatch",n.appendChild(l);const p=document.createElement("div");p.className="nf-pat-diamond",n.appendChild(p);const x=document.createElement("div");x.className="nf-pat-wave-h",n.appendChild(x);const w=document.createElement("div");w.className="nf-pat-radar",n.appendChild(w);const k=document.createElement("div");k.className="nf-pat-ripple-1",n.appendChild(k);const D=document.createElement("div");D.className="nf-pat-ripple-2",n.appendChild(D);const C=document.createElement("div");C.className="nf-pat-techscan",n.appendChild(C);const m=document.createElement("div");m.className="nf-center-glow",n.appendChild(m);const o=document.createElement("div");o.className="nf-pat-noise",n.appendChild(o);const g=document.createElement("div");g.className="nf-crt-scanlines",n.appendChild(g);const y=document.createElement("div");y.className="nf-vignette",n.appendChild(y);for(let h=0;h<3;h++){const b=document.createElement("div");b.className="nf-pulse-ring",n.appendChild(b)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(h=>{const b=document.createElement("div");b.className=`nf-corner-deco ${h}`,n.appendChild(b)});const q=document.createElement("button");q.className="nf-stop-btn",q.innerHTML='<span class="nf-stop-icon"></span> หยุด',q.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",q.onclick=()=>{var h;window.__NETFLOW_STOP__=!0;try{Re("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((h=chrome.runtime)!=null&&h.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},n.appendChild(q);const I=document.createElement("div");I.className="nf-layout";const _=document.createElement("div");_.className="nf-core-monitor",_.id="nf-core-monitor";const U=document.createElement("div");U.className="nf-core-header",U.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${j.length}</div>
    `,_.appendChild(U);const v=document.createElement("div");v.className="nf-terminal",v.id="nf-terminal",ct(v),_.appendChild(v);const u=document.createElement("div");u.className="nf-engine-core",u.id="nf-engine-core";const T=document.createElement("div");T.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(h=>{const b=document.createElement("div");b.className=`nf-frame-corner ${h}`,T.appendChild(b)}),u.appendChild(T);const B="http://www.w3.org/2000/svg",S=document.createElementNS(B,"svg");S.setAttribute("class","nf-engine-waves"),S.setAttribute("viewBox","0 0 560 140"),S.setAttribute("preserveAspectRatio","none"),S.id="nf-engine-waves";for(let h=0;h<4;h++){const b=document.createElementNS(B,"path");b.setAttribute("fill","none"),b.setAttribute("stroke-width",h<2?"1.5":"1"),b.setAttribute("stroke",h<2?`rgba(${Z.rgb},${.14+h*.1})`:`rgba(${Z.accentRgb},${.1+(h-2)*.08})`),b.setAttribute("data-wave-idx",String(h)),S.appendChild(b)}u.appendChild(S);const O=document.createElement("div");O.className="nf-engine-brand-inner",O.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${pt(Z.rgb,Z.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${pt(Z.rgb,Z.accentRgb)}
        </div>
    `,u.appendChild(O);const M=document.createElement("div");M.className="nf-engine-stats",M.id="nf-engine-stats",M.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([h,b,E])=>`<div class="nf-stat-item"><span class="nf-stat-label">${h}</span><span class="nf-stat-val" id="${b}">${E}</span></div>`).join(""),u.appendChild(M),_.appendChild(u),I.appendChild(_);const $=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];le.forEach((h,b)=>{const E=Vt(h);E.classList.add($[b]),E.id=`nf-mod-${h.id}`,I.appendChild(E)}),n.appendChild(I);for(let h=0;h<30;h++){const b=document.createElement("div");b.className="nf-particle",b.style.left=`${5+Math.random()*90}%`,b.style.bottom=`${Math.random()*40}%`,b.style.animationDuration=`${3+Math.random()*5}s`,b.style.animationDelay=`${Math.random()*4}s`;const E=.3+Math.random()*.4,F=.7+Math.random()*.3;b.style.background=`rgba(${Math.floor(ae*F)}, ${Math.floor(re*F)}, ${Math.floor(se*F)}, ${E})`,b.style.width=`${1+Math.random()*2}px`,b.style.height=b.style.width,n.appendChild(b)}return n}function Vt(n){const e=document.createElement("div");e.className="nf-module";const s=document.createElement("div");s.className="nf-mod-header",s.innerHTML=`
        <div class="nf-mod-title">${n.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${n.id}">0%</span>
    `,e.appendChild(s),n.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let c="";i.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${c}
        `,e.appendChild(d)});const r=document.createElement("div");return r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${n.id}"></div>`,e.appendChild(r),e}function Ht(){lt=Date.now(),Fe=setInterval(()=>{const n=Math.floor((Date.now()-lt)/1e3),e=String(Math.floor(n/60)).padStart(2,"0"),s=String(n%60).padStart(2,"0"),r=document.getElementById("nf-timer");r&&(r.textContent=`${e}:${s}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${s}`)},1e3)}function ut(){Fe&&(clearInterval(Fe),Fe=null)}const Gt=120,ft=160,gt=.4;let ke=null,mt=0,ht=0,bt=0,Ae=[];function Ut(n,e){Ae=[];for(let s=0;s<Gt;s++){const r=Math.random();let i;r<.22?i=0:r<.4?i=1:r<.55?i=2:r<.68?i=3:r<.84?i=4:i=5;const d=Math.random()*n,c=Math.random()*e,a=50+Math.random()*220,l=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Ae.push({x:i===0?Math.random()*n:d+Math.cos(l)*a,y:i===0?Math.random()*e:c+Math.sin(l)*a,vx:(Math.random()-.5)*gt,vy:(Math.random()-.5)*gt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:d,oCy:c,oRadius:a,oAngle:l,oSpeed:p})}}function Wt(){if(!pe)return;const n=pe;if(Ie=n.getContext("2d"),!Ie)return;const e=()=>{n.width=window.innerWidth,n.height=window.innerHeight,Ae.length===0&&Ut(n.width,n.height)};e(),window.addEventListener("resize",e);let s=null,r=0,i=0,d=!1;function c(){if(!Ie||!pe){_e=null;return}if(_e=requestAnimationFrame(c),d=!d,d)return;const a=Ie,l=pe.width,p=pe.height;a.fillStyle=`rgba(${ae*.04|0},${re*.04|0},${se*.06|0},1)`,a.fillRect(0,0,l,p),(!s||r!==l||i!==p)&&(r=l,i=p,s=a.createRadialGradient(l*.5,p*.5,0,l*.5,p*.5,Math.max(l,p)*.6),s.addColorStop(0,`rgba(${ae*.08|0},${re*.08|0},${se*.1|0},0.4)`),s.addColorStop(1,"rgba(0,0,0,0)")),a.fillStyle=s,a.fillRect(0,0,l,p);const x=Ae,w=x.length,k=ft*ft;for(let m=0;m<w;m++){const o=x[m];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>l&&(o.x=l,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>p&&(o.y=p,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const g=o.oAngle,y=o.oRadius*.7;o.x=o.oCx+y*Math.cos(g),o.y=o.oCy+y*Math.sin(g)*Math.cos(g),o.oCx+=Math.sin(g*.15)*.12,o.oCy+=Math.cos(g*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const g=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*g,o.y=o.oCy+Math.sin(o.oAngle)*g,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=l+30:o.x>l+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const g=o.oRadius+50;o.oCx<-g?o.oCx=l+g:o.oCx>l+g&&(o.oCx=-g),o.oCy<-g?o.oCy=p+g:o.oCy>p+g&&(o.oCy=-g)}}a.beginPath(),a.strokeStyle=`rgba(${ae},${re},${se},0.06)`,a.lineWidth=.4;const D=new Path2D;for(let m=0;m<w;m++){const o=x[m];for(let g=m+1;g<w;g++){const y=x[g],q=o.x-y.x,I=o.y-y.y,_=q*q+I*I;_<k&&(1-_/k<.4?(a.moveTo(o.x,o.y),a.lineTo(y.x,y.y)):(D.moveTo(o.x,o.y),D.lineTo(y.x,y.y)))}}if(a.stroke(),a.strokeStyle=`rgba(${ae},${re},${se},0.18)`,a.lineWidth=.8,a.stroke(D),!ke||mt!==ae||ht!==re||bt!==se){ke=document.createElement("canvas");const m=48;ke.width=m,ke.height=m;const o=ke.getContext("2d"),g=o.createRadialGradient(m/2,m/2,0,m/2,m/2,m/2);g.addColorStop(0,`rgba(${ae},${re},${se},0.9)`),g.addColorStop(.3,`rgba(${ae},${re},${se},0.35)`),g.addColorStop(1,`rgba(${ae},${re},${se},0)`),o.fillStyle=g,o.fillRect(0,0,m,m),mt=ae,ht=re,bt=se}const C=ke;for(let m=0;m<w;m++){const o=x[m],g=.6+.4*Math.sin(o.pulsePhase),y=o.radius*5*(.8+g*.4);a.globalAlpha=.5+g*.4,a.drawImage(C,o.x-y/2,o.y-y/2,y,y)}a.globalAlpha=1,a.fillStyle="rgba(255,255,255,0.45)",a.beginPath();for(let m=0;m<w;m++){const o=x[m];if(o.radius>2){const g=.6+.4*Math.sin(o.pulsePhase),y=o.radius*(.8+g*.4)*.35;a.moveTo(o.x+y,o.y),a.arc(o.x,o.y,y,0,Math.PI*2)}}a.fill()}c()}function Yt(){_e!==null&&(cancelAnimationFrame(_e),_e=null),pe=null,Ie=null,Ae=[]}let Be=null;const Le=560,Xt=140,wt=Le/2,xt=Xt/2,yt=[];for(let n=0;n<=Le;n+=8){const e=Math.abs(n-wt)/wt;yt.push(Math.pow(Math.min(1,e*1.6),.6))}const jt=[0,1,2,3].map(n=>({amp:10+n*5,freq:(1.2+n*.35)*Math.PI*2/Le,off:n*.6,spd:.7+n*.12}));let Xe=!1;function vt(){if(Se=requestAnimationFrame(vt),Xe=!Xe,Xe)return;if(We+=.07,!Be){const e=document.getElementById("nf-engine-waves");if(!e){Se=null;return}Be=Array.from(e.querySelectorAll("path"))}const n=[];for(let e=0;e<Be.length;e++){const s=jt[e],r=We*s.spd+s.off;n.length=0,n.push(`M 0 ${xt}`);let i=0;for(let d=0;d<=Le;d+=8){const c=xt+s.amp*yt[i++]*Math.sin(d*s.freq+r);n.push(`L${d} ${c*10+.5|0}`)}Be[e].setAttribute("d",n.join(" "))}}function Kt(){We=0,vt(),Wt(),Ne=setInterval(()=>{const n=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),s=document.getElementById("nf-stat-lat2"),r=document.getElementById("nf-stat-buf");n&&(n.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),s&&(s.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function $t(){Se!==null&&(cancelAnimationFrame(Se),Se=null),Ne&&(clearInterval(Ne),Ne=null),Be=null,Yt()}function qe(){let n=0;const e=j.filter(p=>p.status!=="skipped").length;for(const p of j){const x=document.getElementById(`nf-proc-${p.stepId}`);if(!x)continue;x.className="nf-proc-row";const w=x.querySelector(".nf-proc-badge");switch(p.status){case"done":x.classList.add("nf-proc-done"),w&&(w.textContent="✅ done"),n++;break;case"active":x.classList.add("nf-proc-active"),w&&(w.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":x.classList.add("nf-proc-error"),w&&(w.textContent="❌ error");break;case"skipped":x.classList.add("nf-proc-skipped"),w&&(w.textContent="— skip");break;default:x.classList.add("nf-proc-waiting"),w&&(w.textContent="(queued)")}}const s=j.findIndex(p=>p.status==="active"),r=s>=0?s+1:n>=e&&e>0?j.length:n,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${r}/${j.length}`);const d=document.querySelector(".nf-core-title-val"),c=document.querySelector(".nf-status-dot");n>=e&&e>0?(d&&(d.textContent="COMPLETE",d.style.color=Z.doneHex),c&&(c.style.background=Z.doneHex,c.style.boxShadow=`0 0 8px rgba(${Z.doneRgb},0.7)`)):j.some(x=>x.status==="error")?(d&&(d.textContent="ERROR",d.style.color="#f87171"),c&&(c.style.background="#ef4444",c.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):j.some(x=>x.status==="active")&&d&&(d.textContent="ACTIVE",d.style.color=Z.hex,d.style.textShadow=`0 0 10px rgba(${Z.rgb},0.5)`);const a=document.getElementById("nf-terminal"),l=a==null?void 0:a.querySelector(".nf-proc-active");l&&a&&l.scrollIntoView({behavior:"smooth",block:"center"})}function Et(){Q&&Q.isConnected||(Ye(),Q=document.createElement("button"),Q.id="nf-toggle-btn",Q.className="nf-toggle-visible",Q.innerHTML=he?rt:st,Q.title="ซ่อน/แสดง Netflow Overlay",Q.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",Q.onclick=()=>kt(),document.body.appendChild(Q))}function kt(){H&&(Et(),he?(H.classList.remove("nf-hidden"),H.classList.add("nf-visible"),H.style.opacity="1",H.style.pointerEvents="auto",Q&&(Q.innerHTML=st),he=!1):(H.classList.remove("nf-visible"),H.classList.add("nf-hidden"),H.style.opacity="0",H.style.pointerEvents="none",Q&&(Q.innerHTML=rt),he=!0))}const Ct={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Tt(){const n=document.getElementById("nf-core-monitor");if(!n)return;let e=Pe;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const s=Ct[e]||Ct.green;let r;try{r=chrome.runtime.getURL(s)}catch{r=`/${s}`}const i=Z.rgb;n.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${r}')`].join(", "),n.style.backgroundSize="auto, auto, 50%",n.style.backgroundPosition="center, center, center",n.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",n.style.setProperty("--nf-bg-set","1"),n.style.border=`1.5px solid rgba(${i},0.45)`,n.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function je(n=1){if(Z=zt(),at(),H&&H.isConnected){H.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!K||!K.isConnected)&&(K=null,Ye()),setTimeout(()=>{if(H)try{K!=null&&K.sheet&&K.sheet.cssRules.length>0&&(H.style.removeProperty("background"),H.style.removeProperty("font-family"),H.style.removeProperty("overflow"))}catch{}},200);for(const e of le)for(const s of e.steps)s.status="waiting",s.progress=s.progress!==void 0?0:void 0;Ee=n,j=ze(n),dt();for(const e of le)Ke(e);if(Ve(),qe(),!H.querySelector(".nf-stop-btn")){const e=document.createElement("button");e.className="nf-stop-btn",e.innerHTML='<span class="nf-stop-icon"></span> หยุด',e.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",e.onclick=()=>{var s;window.__NETFLOW_STOP__=!0;try{Re("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((s=chrome.runtime)!=null&&s.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},H.appendChild(e)}he&&kt();return}H&&!H.isConnected&&(H=null),K&&(K.remove(),K=null),Ye();for(const e of le)for(const s of e.steps)s.status="waiting",s.progress=s.progress!==void 0?0:void 0;if(Ee=n,j=ze(n),n>1){const e=le.find(r=>r.id==="video");if(e){const r=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=n;i++)r.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),r.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),r.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});e.steps=r}const s=le.find(r=>r.id==="render");if(s){const r=s.steps.find(d=>d.id==="download");r&&(r.label="ดาวน์โหลด 720p");const i=s.steps.find(d=>d.id==="upscale");i&&(i.label="Full Video")}}H=qt(),H.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(H),H.classList.add("nf-visible"),he=!1,Et(),Ht(),Kt(),requestAnimationFrame(()=>Tt()),setTimeout(()=>{if(H)try{K!=null&&K.sheet&&K.sheet.cssRules.length>0&&(H.style.removeProperty("background"),H.style.removeProperty("font-family"),H.style.removeProperty("overflow"))}catch{}},200)}function Mt(){ut(),$t(),he=!1,H&&(H.classList.add("nf-fade-out"),setTimeout(()=>{H==null||H.remove(),H=null},500)),Q&&(Q.remove(),Q=null)}const Qt={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Jt(n,e,s){const r=j.findIndex(w=>w.status==="active"),i=j.filter(w=>w.status==="done").length,d=j.length,c=r>=0?r+1:i>=d?d:i,a=document.getElementById("nf-stat-step");a&&(a.textContent=`${c}/${d}`);let l=1;for(const w of j)if(w.status==="active"||w.status==="done")if(w.stepId.startsWith("scene")){const k=w.stepId.match(/^scene(\d+)-/);k&&(l=Math.max(l,parseInt(k[1],10)))}else(w.stepId==="download"||w.stepId==="upscale"||w.stepId==="open")&&(l=Ee);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=Ee>1?`${l}/${Ee}`:"1/1"),e==="active"){const w=document.getElementById("nf-stat-status"),k=Qt[n]||n.toUpperCase();w&&(w.textContent=k)}else if(e==="done"&&i>=d){const w=document.getElementById("nf-stat-status");w&&(w.textContent="COMPLETE")}else if(e==="error"){const w=document.getElementById("nf-stat-status");w&&(w.textContent="ERROR")}const x=document.getElementById("nf-stat-progress");x&&(s!==void 0&&s>0?x.textContent=`${Math.min(100,s)}%`:e==="active"&&(x.textContent="—"))}function P(n,e,s){if(!H)return;for(const i of le)for(const d of i.steps)d.id===n&&(d.status=e,s!==void 0&&(d.progress=s));for(const i of j)i.stepId===n&&(i.status=e,s!==void 0&&(i.progress=s));const r=document.getElementById(`nf-step-${n}`);if(r&&(r.className="nf-step",e==="active"?r.classList.add("nf-step-active"):e==="done"?r.classList.add("nf-step-done"):e==="error"&&r.classList.add("nf-step-error")),Jt(n,e,s),s!==void 0){const i=document.getElementById(`nf-bar-${n}`);i&&(i.style.width=`${Math.min(100,s)}%`)}Ve(),qe()}function Ce(n){P(n,"skipped");const e=document.getElementById(`nf-step-${n}`);e&&(e.style.opacity="0.2")}function De(n=4e3){ut(),$t(),Ve(),qe(),setTimeout(()=>Mt(),n)}function Ve(){for(const n of le){const e=n.steps.filter(l=>l.status!=="skipped").length,s=n.steps.filter(l=>l.status==="done").length,r=n.steps.some(l=>l.status==="active"),i=e>0?Math.round(s/e*100):0,d=document.getElementById(`nf-pct-${n.id}`);d&&(d.textContent=`${i}%`);const c=document.getElementById(`nf-modbar-${n.id}`);c&&(c.style.width=`${i}%`);const a=document.getElementById(`nf-mod-${n.id}`);a&&(a.classList.remove("nf-active","nf-done"),i>=100?a.classList.add("nf-done"):r&&a.classList.add("nf-active"))}}function Zt(n){var r,i,d,c;Ee=n;const e=new Map;for(const a of j)e.set(a.stepId,{status:a.status,progress:a.progress});j=ze(n);for(const a of j){const l=e.get(a.stepId);l&&(a.status=l.status,l.progress!==void 0&&(a.progress=l.progress))}if(dt(),n>1){const a=le.find(l=>l.id==="video");if(a){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((r=a.steps.find(p=>p.id==="animate"))==null?void 0:r.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=a.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=a.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((c=a.steps.find(p=>p.id==="vid-wait"))==null?void 0:c.status)||"waiting",progress:0}];for(let p=2;p<=n;p++)l.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),l.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),l.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});a.steps=l,Ke(a)}}const s=le.find(a=>a.id==="render");if(s&&n>1){const a=s.steps.find(p=>p.id==="download");a&&(a.label="ดาวน์โหลด 720p");const l=s.steps.find(p=>p.id==="upscale");l&&(l.label="Full Video"),Ke(s)}Ve(),qe()}function Ke(n){const e=document.getElementById(`nf-mod-${n.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),n.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let c="";i.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${c}
        `,e.appendChild(d)});const r=document.createElement("div");r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${n.id}"></div>`,e.appendChild(r)}function Re(n){n.replace(/^\[Netflow AI\]\s*/,"")}let Te=null,be=null;const en=new Promise(n=>{be=n,setTimeout(()=>n(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},n=>{!chrome.runtime.lastError&&(n!=null&&n.tabId)&&(Te=n.tabId,console.log(`[Netflow AI] Tab ID: ${Te}`)),be&&(be(Te),be=null)})}catch{be&&(be(null),be=null)}function ue(){return Te?`netflow_pending_action_${Te}`:"netflow_pending_action"}function Pt(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const t=n=>{console.log(`[Netflow AI] ${n}`);try{Re(n)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:n})}catch{}},A=n=>{console.warn(`[Netflow AI] ${n}`);try{Re(`⚠️ ${n}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${n}`})}catch{}};function Qe(n=3e3){t(`🔒 จะปิดแท็บ automation ใน ${n/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?A(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):t(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){A(`ปิดแท็บผิดพลาด: ${e.message}`)}},n)}async function Je(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},d=>{if(chrome.runtime.lastError){i(!1);return}i(!!(d!=null&&d.cached))})}catch{i(!1)}})){t("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const d of i){const c=d.src||d.currentSrc||"";if(c)return c}return null}t("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const e=document.querySelectorAll("video");let s=null,r=0;for(const i of e){let d=i.src||"";if(!d){const l=i.querySelector("source");l&&(d=l.getAttribute("src")||"")}if(!d&&i.currentSrc&&(d=i.currentSrc),!d)continue;if(X()){s||(s=d,r=1);continue}const c=i.getBoundingClientRect(),a=c.width*c.height;c.width>50&&a>r&&(r=a,s=d)}if(!s)return t("[TikTok] ไม่พบ video URL บนหน้า"),null;t(`[TikTok] พบ video URL: ${s.substring(0,80)}... (area=${r.toFixed(0)})`);try{t("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(s);if(!i.ok)return t(`[TikTok] fetch failed: HTTP ${i.status}`),await St(s),s;const d=await i.blob(),c=(d.size/1024/1024).toFixed(1);t(`[TikTok] Video blob fetched: ${c} MB, type: ${d.type}`),d.size<1e5&&t(`[TikTok] ⚠️ Blob เล็กเกินไป (${d.size} bytes) — อาจเป็น thumbnail`);const a=await new Promise((l,p)=>{const x=new FileReader;x.onloadend=()=>l(x.result),x.onerror=()=>p(new Error("FileReader error")),x.readAsDataURL(d)});t(`[TikTok] Data URL พร้อม: ${(a.length/1024/1024).toFixed(1)} MB`),await new Promise(l=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:a},p=>{chrome.runtime.lastError?t(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?t("[TikTok] ✅ Video cached in background service worker"):t(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),l()})})}catch(i){t(`[TikTok] Content script fetch error: ${i.message}`),await St(s)}return s}catch(n){return t(`[TikTok] captureVideoUrl error: ${n.message}`),null}}async function St(n){if(n.startsWith("https://"))try{await new Promise(e=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:n},s=>{chrome.runtime.lastError?t(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):s!=null&&s.success?t(`[TikTok] Video pre-fetched via background: ${((s.size||0)/1024/1024).toFixed(1)} MB`):t(`[TikTok] PRE_FETCH_VIDEO failed: ${s==null?void 0:s.error}`),e()})})}catch{}}function Ze(n){if(n){if(window.__VIDEO_COMPLETE_SENT__){t("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:n,source:"veo"}),t("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const we=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),et=/Win/i.test(navigator.userAgent),me=we?"🍎 Mac":et?"🪟 Win":"🐧 Other";t(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${me}`),window.__VIDEO_COMPLETE_SENT__=!1;class tt extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Oe=null,xe=null,It=!1;const Me=new Map;let _t=0;function tn(){if(Oe)return Oe;try{const n=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Oe=new Worker(URL.createObjectURL(n)),Oe.onmessage=e=>{const s=Me.get(e.data);s&&(Me.delete(e.data),s())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Oe}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function nn(){if(xe)return xe;if(It)return null;try{return xe=chrome.runtime.connect({name:"timer"}),xe.onMessage.addListener(n=>{const e=Me.get(n.id);e&&(Me.delete(n.id),e())}),xe.onDisconnect.addListener(()=>{xe=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),xe}catch{return It=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const f=n=>new Promise((e,s)=>{if(window.__NETFLOW_STOP__)return s(new tt);let r=!1;const i=()=>{if(!r){if(r=!0,window.__NETFLOW_STOP__)return s(new tt);e()}},d=tn();if(d){const l=++_t;Me.set(l,i),d.postMessage({id:l,ms:n});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:n+2e3},()=>{chrome.runtime.lastError||i()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:n},()=>{chrome.runtime.lastError?setTimeout(i,n):i()});return}catch{}const c=nn();if(c){const l=++_t;Me.set(l,i),c.postMessage({cmd:"delay",id:l,ms:n});return}const a=setTimeout(i,n);f._lastId=a});function ye(){return!!window.__NETFLOW_STOP__}const X=()=>document.hidden;let At=0;async function ve(){if(!document.hidden)return!1;const n=Date.now();if(n-At<15e3)return!1;At=n;try{return t("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await f(1500),!0}catch{return!1}}async function nt(){if(!document.hidden)return!0;t("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(e=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>e()));const n=Date.now();for(;document.hidden&&Date.now()-n<5e3;)await f(200);return document.hidden?(t("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(t("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3),!0)}catch{return t("⚠️ ensureTabVisible ล้มเหลว"),!1}}function Bt(){var s;const n=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const r of e){if(r.closest("#netflow-engine-overlay"))continue;const i=(r.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const d of n)if(i.includes(d))return((s=r.textContent)==null?void 0:s.trim())||d}}return null}async function ie(n){if(X()){n.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),n.click();return}const e=n.getBoundingClientRect(),s=e.left+e.width/2,r=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:s,clientY:r,button:0};n.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mousedown",i)),await f(80),n.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mouseup",i)),n.dispatchEvent(new MouseEvent("click",i)),await f(50),n.click()}function on(n){const e=n.getBoundingClientRect(),s=e.left+e.width/2,r=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:s,clientY:r};n.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mouseenter",i)),n.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mouseover",i)),n.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mousemove",i))}function an(n){const e=[],s=document.querySelectorAll("i");for(const r of s){if((r.textContent||"").trim()!==n)continue;let d=r,c=null,a=1/0;for(let l=0;l<20&&d&&(d=d.parentElement,!(!d||d===document.body));l++){if(X()){l>=3&&d.children.length>0&&!c&&(c=d);continue}const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const x=p.width*p.height;x<a&&(c=d,a=x)}}c&&!e.includes(c)&&e.push(c)}return e.sort((r,i)=>{const d=r.getBoundingClientRect(),c=i.getBoundingClientRect();return d.left-c.left}),e}function ot(n=!1){const e=[],s=document.querySelectorAll("video");for(const c of s){let a=c.parentElement;for(let l=0;l<10&&a;l++){if(X()){if(l>=3&&a.children.length>0){e.push({el:a,left:0});break}a=a.parentElement;continue}const p=a.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){e.push({el:a,left:p.left});break}a=a.parentElement}}const r=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const c of r){const a=(c.textContent||"").trim();if(a==="play_arrow"||a==="play_circle"||a==="videocam"){let l=c.parentElement;for(let p=0;p<10&&l;p++){if(X()){if(p>=3&&l.children.length>0){e.push({el:l,left:0});break}l=l.parentElement;continue}const x=l.getBoundingClientRect();if(x.width>120&&x.height>80&&x.width<window.innerWidth*.7&&x.top>=-50&&x.left<window.innerWidth*.75){e.push({el:l,left:x.left});break}l=l.parentElement}}}const i=document.querySelectorAll("img");for(const c of i){const a=(c.alt||"").toLowerCase();if(a.includes("video")||a.includes("วิดีโอ")){let l=c.parentElement;for(let p=0;p<10&&l;p++){if(X()){if(p>=3&&l.children.length>0){e.push({el:l,left:0});break}l=l.parentElement;continue}const x=l.getBoundingClientRect();if(x.width>120&&x.height>80&&x.width<window.innerWidth*.7&&x.top>=-50&&x.left<window.innerWidth*.75){e.push({el:l,left:x.left});break}l=l.parentElement}}}const d=Array.from(new Set(e.map(c=>c.el))).map(c=>e.find(a=>a.el===c));if(d.sort((c,a)=>c.left-a.left),d.length>0){const c=d[0].el,a=c.getBoundingClientRect();return n||t(`🎬 พบการ์ดวิดีโอที่ (${a.left.toFixed(0)},${a.top.toFixed(0)}) ขนาด ${a.width.toFixed(0)}x${a.height.toFixed(0)}`),c}return n||t("🎬 ไม่พบการ์ดวิดีโอ"),null}function rn(){const n=an("image");if(n.length>0){const s=n[0].getBoundingClientRect();return t(`🖼️ พบการ์ดรูปภาพ ${n.length} ใบ — ใบแรกที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),n[0]}const e=document.querySelectorAll("canvas");for(const s of e){let r=s.parentElement;for(let i=0;i<10&&r;i++){if(X()){if(i>=3&&r.children.length>0)return t("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),r;r=r.parentElement;continue}const d=r.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return t(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),r;r=r.parentElement}}return t("🖼️ ไม่พบการ์ดรูปภาพ"),null}function sn(n,e){var a;const[s,r]=n.split(","),i=((a=s.match(/:(.*?);/))==null?void 0:a[1])||"image/png",d=atob(r),c=new Uint8Array(d.length);for(let l=0;l<d.length;l++)c[l]=d.charCodeAt(l);return new File([c],e,{type:i})}function He(n){var r;const e=[],s=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of s)if(((r=i.textContent)==null?void 0:r.trim())===n){const d=i.closest("button");d&&e.push(d)}return e}function ln(){const n=[...He("add"),...He("add_2")];if(n.length===0){t("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const r=document.querySelectorAll("button");for(const i of r){const d=(i.textContent||"").trim();if(d!=="+"&&d!=="add")continue;if(X())return i;const c=i.getBoundingClientRect();if(c.bottom>window.innerHeight*.7&&c.width<60&&c.height<60)return i}return null}let e=null,s=0;for(const r of n){const i=r.getBoundingClientRect();i.y>s&&(s=i.y,e=r)}return e&&t(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${s.toFixed(0)}`),e}function Dt(){for(const r of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=He(r);let d=null,c=0;for(const a of i){const l=a.getBoundingClientRect();l.y>c&&(c=l.y,d=a)}if(d)return t(`พบปุ่ม Generate จากไอคอน "${r}" ที่ y=${c.toFixed(0)}`),d}const n=document.querySelectorAll("button");let e=null,s=0;for(const r of n){if(X())break;const i=r.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const d=Math.abs(i.width-i.height)<10&&i.width<60,c=i.y+i.x+(d?1e3:0);c>s&&(s=c,e=r)}}if(e)return t("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const r of n){const i=(r.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return r}return null}function it(){const n=a=>!!a.closest("#netflow-engine-overlay"),e=X(),s=document.querySelectorAll('[data-slate-editor="true"]');for(const a of s){if(n(a))continue;if(e)return t("findPromptTextInput: ✅ Slate editor (hidden mode)"),a;const l=a.getBoundingClientRect();if(l.height>0)return t(`findPromptTextInput: ✅ Slate editor (rect.bottom=${Math.round(l.bottom)})`),a}const r=document.querySelectorAll('[role="textbox"]');for(const a of r){if(n(a))continue;if(e)return t("findPromptTextInput: ✅ role=textbox (hidden mode)"),a;const l=a.getBoundingClientRect();if(l.height>0)return t(`findPromptTextInput: ✅ role=textbox (rect.bottom=${Math.round(l.bottom)})`),a}const i=document.querySelectorAll('[contenteditable="true"]');for(const a of i){if(n(a))continue;if(e)return t("findPromptTextInput: ✅ contenteditable (hidden mode)"),a;const l=a.getBoundingClientRect();if(l.bottom>window.innerHeight*.3&&l.height>0)return t(`findPromptTextInput: ✅ contenteditable (rect.bottom=${Math.round(l.bottom)})`),a}const d=document.querySelectorAll("textarea");for(const a of d){if(n(a))continue;if(e)return t("findPromptTextInput: ✅ textarea (hidden mode)"),a;if(a.getBoundingClientRect().bottom>window.innerHeight*.3)return a}const c=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of c){if(n(a))continue;const l=a.placeholder||"";if(l.includes("สร้าง")||l.includes("prompt")||l.includes("describe")||l.includes("create"))return a}for(const a of i)if(!n(a))return t(`findPromptTextInput: ⚠️ last-resort contenteditable (tag=${a.tagName})`),a;return t(`findPromptTextInput: ❌ ไม่พบ (slate=${s.length}, textbox=${r.length}, editable=${i.length}, textarea=${d.length}, input=${c.length})`),null}async function Ge(n,e){var s,r,i,d;n.focus(),await f(300),t("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const a=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:c});n.dispatchEvent(a),t("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:c});n.dispatchEvent(l),await f(800);const p=(n.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){t(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}t(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(c){t(`วางข้อความ: วิธี 1 ล้มเหลว: ${c.message}`)}t("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{n.focus(),await f(100);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});n.dispatchEvent(c);const a=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});n.dispatchEvent(a),await f(800);const l=(n.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){t(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}t("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(c){t(`วางข้อความ: วิธี 2 ล้มเหลว: ${c.message}`)}t("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{n.focus(),await f(200);const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const a=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:c});n.dispatchEvent(a),await f(800);const l=(n.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){t(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}t("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(c){t(`วางข้อความ: วิธี 3 ล้มเหลว: ${c.message}`)}t("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((s=navigator.clipboard)!=null&&s.writeText)await navigator.clipboard.writeText(e),t("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const a=document.createElement("textarea");a.value=e,a.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(a),a.focus(),a.select(),document.execCommand("copy"),document.body.removeChild(a),t("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}n.focus(),await f(200),document.execCommand("paste"),await f(500);const c=(n.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){t(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${c.length} ตัวอักษร)`);return}}catch(c){t(`วางข้อความ: วิธี 4 ล้มเหลว: ${c.message}`)}t("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const c=Object.keys(n).find(a=>a.startsWith("__reactFiber$")||a.startsWith("__reactInternalInstance$"));if(c){let a=n[c];for(let l=0;l<30&&a;l++){const p=a.memoizedProps,x=a.memoizedState;if((r=p==null?void 0:p.editor)!=null&&r.insertText){t("วางข้อความ: พบ Slate editor ผ่าน fiber props");const w=p.editor;w.selection,w.insertText(e),t("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(i=x==null?void 0:x.memoizedState)==null?void 0:i.editor)!=null&&d.insertText){t("วางข้อความ: พบ Slate editor ผ่าน fiber state"),x.memoizedState.editor.insertText(e),t("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}a=a.return}t("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else t("วางข้อความ: ไม่พบ React fiber บน element")}catch(c){t(`วางข้อความ: วิธี 5 ล้มเหลว: ${c.message}`)}t("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function cn(){const n=[],e=document.querySelectorAll('input[type="file"]');for(const s of e)n.push({input:s,origType:"file"}),s.type="text";return n.length>0&&t(`ปิดกั้น file input ${n.length} ตัว (type → text)`),n}let te=null;function dn(){te=null;const n=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type==="file"){t(`🚫 บล็อก .click() บน file input (${me})`),te=this;return}return n.call(this)};const e=HTMLInputElement.prototype.showPicker;let s=!1;typeof e=="function"&&(HTMLInputElement.prototype.showPicker=function(){if(this.type==="file"){t(`🚫 บล็อก .showPicker() บน file input (${me})`),te=this;return}return e.call(this)},s=!0);const r=window.showOpenFilePicker;let i=!1;typeof r=="function"&&(window.showOpenFilePicker=async function(...c){throw t(`🚫 บล็อก showOpenFilePicker (${me})`),new DOMException("Blocked by Netflow","AbortError")},i=!0);let d=null;return we&&(d=c=>{var x,w;const a=(w=(x=c.target)==null?void 0:x.closest)==null?void 0:w.call(x,"label");if(!a)return;const l=a.getAttribute("for");if(l){const k=document.getElementById(l);if(k&&k.tagName==="INPUT"&&k.type==="file"){c.preventDefault(),c.stopPropagation(),t(`🚫 บล็อก <label for="${l}"> คลิก file input (Mac)`);return}}a.querySelector('input[type="file"]')&&(c.preventDefault(),c.stopPropagation(),t("🚫 บล็อก <label> ที่ครอบ file input (Mac)"))},document.addEventListener("click",d,!0)),t(`🔒 บล็อก file dialog: click ✅ | showPicker ${s?"✅":"❌"} | showOpenFilePicker ${i?"✅":"❌"} | label-intercept ${d?"✅":"—"} (${me})`),()=>{HTMLInputElement.prototype.click=n,s&&(HTMLInputElement.prototype.showPicker=e),i&&(window.showOpenFilePicker=r),d&&document.removeEventListener("click",d,!0),t("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function pn(n,e,s){var x;const r=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...n.map(w=>w.input)];te&&!i.includes(te)&&(i.push(te),t("เพิ่ม captured file input จากตัวบล็อก"));for(const w of r)!i.includes(w)&&w.offsetParent===null&&i.push(w);for(const w of i)w.type="file";t(`คืนค่า input ${i.length} ตัวเป็น type=file`);const c=[...document.querySelectorAll('input[type="file"]')];if(te&&te.type==="file"&&!c.includes(te)&&(c.push(te),t("captured file input ไม่อยู่ใน DOM — เพิ่มเป็น candidate")),c.length===0)return t(`⚠️ ไม่พบ file input หลังคืนค่า (${me})`),!1;let a;if(te&&te.type==="file")a=te,t("ใช้ captured file input จากตัวบล็อก ✅");else if(s&&s.size>0){const w=c.filter(k=>!s.has(k));w.length>0?(a=w[w.length-1],t(`เล็งเป้า file input ใหม่ (${w.length} ใหม่, ${c.length} ทั้งหมด)`)):(a=c[c.length-1],t(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${c.length} ตัว`))}else a=c[c.length-1];const l=new DataTransfer;l.items.add(e);try{a.files=l.files,t(`ฉีดไฟล์ผ่าน target.files (${((x=a.files)==null?void 0:x.length)??0} ไฟล์)`)}catch(w){t(`กำหนด target.files ล้มเหลว: ${w.message} — ลอง defineProperty`);try{Object.defineProperty(a,"files",{value:l.files,writable:!0,configurable:!0}),t("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(k){return A(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${k.message}`),!1}}const p=a._valueTracker;p&&(p.setValue(""),t("รีเซ็ต React _valueTracker บน file input")),a.dispatchEvent(new Event("change",{bubbles:!0})),a.dispatchEvent(new Event("input",{bubbles:!0}));try{const w=new DataTransfer;w.items.add(e);const k=new DragEvent("drop",{bubbles:!we,cancelable:!0,dataTransfer:w});a.dispatchEvent(k),t(`ส่ง drop event บน file input (bubbles=${!we})`)}catch{}return t(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${me}`),!0}function ne(){let n=0;const e=document.querySelectorAll("img");for(const r of e){if(r.closest("#netflow-engine-overlay")||!r.src)continue;if(X()){n++;continue}const i=r.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&r.offsetParent!==null&&n++}const s=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const r of s){if(r.closest("#netflow-engine-overlay"))continue;if(X()){n++;continue}const i=r.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&r.offsetParent!==null&&n++}return n}function Rt(){const n=document.querySelectorAll("img");for(const s of n){if(!s.src||s.closest("#netflow-engine-overlay"))continue;if(X())return t("พบรูปย่อ (minimized mode)"),!0;const r=s.getBoundingClientRect();if(r.bottom>window.innerHeight*.6&&r.width>20&&r.width<200&&r.height>20&&r.height<200&&s.offsetParent!==null)return t(`พบรูปย่อ: ${r.width.toFixed(0)}x${r.height.toFixed(0)} ที่ y=${r.top.toFixed(0)}`),!0}const e=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const s of e){if(s.closest("#netflow-engine-overlay"))continue;if(X())return!0;const r=s.getBoundingClientRect();if(r.bottom>window.innerHeight*.6&&r.width>20&&r.width<200&&r.height>20&&r.height<200&&s.offsetParent!==null)return t(`พบรูปย่อ div: ${r.width.toFixed(0)}x${r.height.toFixed(0)} ที่ y=${r.top.toFixed(0)}`),!0}return!1}async function un(n){t("ลองลากวางไฟล์บน Prompt Bar (drag-and-drop)...");const e=[],s=document.querySelectorAll('[contenteditable="true"]');for(const i of s){if(X()){e.push(i);continue}i.getBoundingClientRect().bottom>window.innerHeight*.5&&e.push(i)}const r=document.querySelectorAll('form, [role="textbox"], [data-slate-editor]');for(const i of r){if(X()){e.includes(i)||e.push(i);continue}i.getBoundingClientRect().bottom>window.innerHeight*.5&&!e.includes(i)&&e.push(i)}if(e.length===0&&!X()){const i=document.querySelectorAll("div");for(const d of i){const c=d.getBoundingClientRect();if(c.bottom>window.innerHeight*.8&&c.width>300&&c.height>30&&c.height<200&&(e.push(d),e.length>=3))break}}if(e.length===0)return t("ไม่พบเป้าหมายบน Prompt Bar สำหรับ drag-and-drop"),!1;t(`พบเป้าหมาย drag-and-drop ${e.length} ตัว`);for(const i of e)try{const d=i.getBoundingClientRect(),c=d.left+d.width/2,a=d.top+d.height/2,l={bubbles:!0,cancelable:!0,clientX:c,clientY:a},p=new DataTransfer;if(p.items.add(n),i.dispatchEvent(new DragEvent("dragenter",{...l,dataTransfer:p})),await f(100),i.dispatchEvent(new DragEvent("dragover",{...l,dataTransfer:p})),await f(100),i.dispatchEvent(new DragEvent("drop",{...l,dataTransfer:p})),t(`ส่ง drag-and-drop บน <${i.tagName.toLowerCase()}> ที่ (${c.toFixed(0)}, ${a.toFixed(0)})`),await f(500),Rt())return!0}catch(d){t(`drag-and-drop ผิดพลาด: ${d.message}`)}return!1}async function fn(n,e,s){t("── Real Clipboard: เขียนรูปลง system clipboard แล้ว paste จริง ──");const r=async(a,l=2500)=>{const p=Date.now();for(;Date.now()-p<l;){if(ne()>s)return t(`✅ [${a}] รูปย่อเพิ่ม! (${ne()} > ${s})`),!0;await f(400)}return!1};let i=null;const d=document.querySelectorAll('[data-slate-editor="true"]');for(const a of d)if(a.getBoundingClientRect().bottom>window.innerHeight*.4){i=a;break}if(!i){const a=document.querySelectorAll('[contenteditable="true"]');for(const l of a)if(l.getBoundingClientRect().bottom>window.innerHeight*.4){i=l;break}}if(!i)return t("ไม่พบ editor สำหรับ paste"),!1;let c=!1;try{const a=await e.arrayBuffer(),l=new Blob([a],{type:e.type||"image/png"}),p=new ClipboardItem({[l.type]:l});await navigator.clipboard.write([p]),t(`เขียนรูป ${(e.size/1024).toFixed(1)}KB ลง system clipboard สำเร็จ`),i.focus(),await f(300);const x=document.execCommand("paste");if(t(`execCommand('paste'): ${x}`),x)return c=!0,await r("ClipboardAPI",8e3)||t("⚠️ Method A: paste dispatched แต่ thumbnail ยังไม่ขึ้น — ถือว่าสำเร็จ (async processing)"),!0}catch(a){t(`Method A (Clipboard API) ล้มเหลว: ${a.message}`)}if(ne()>s)return t("✅ Method A สำเร็จ (ตรวจพบทีหลัง)"),!0;try{t("ลอง Method B: copy img จาก hidden div → paste ลง editor");const a=document.createElement("div");a.contentEditable="true",a.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none;";const l=document.createElement("img");l.src=n,l.style.cssText="max-width:200px;max-height:200px;",a.appendChild(l),document.body.appendChild(a),await new Promise(k=>{if(l.complete){k();return}l.onload=()=>k(),l.onerror=()=>k(),setTimeout(k,2e3)}),await f(200);const p=document.createRange();p.selectNodeContents(a);const x=window.getSelection();x==null||x.removeAllRanges(),x==null||x.addRange(p);const w=document.execCommand("copy");if(t(`execCommand('copy') จาก temp img: ${w}`),document.body.removeChild(a),w){i.focus(),await f(300);const k=document.execCommand("paste");if(t(`execCommand('paste') ลง editor: ${k}`),k)return c=!0,await r("HiddenDiv",8e3)||t("⚠️ Method B: paste dispatched แต่ thumbnail ยังไม่ขึ้น — ถือว่าสำเร็จ"),!0}}catch(a){t(`Method B (hidden div) ล้มเหลว: ${a.message}`)}if(ne()>s)return t("✅ Method B สำเร็จ (ตรวจพบทีหลัง)"),!0;try{t("ลอง Method C: canvas toBlob → clipboard write → paste");const a=new Image;a.crossOrigin="anonymous";const l=new Promise((D,C)=>{a.onload=()=>D(),a.onerror=()=>C(new Error("img load failed")),setTimeout(()=>C(new Error("img load timeout")),5e3)});a.src=n,await l;const p=document.createElement("canvas");p.width=a.naturalWidth,p.height=a.naturalHeight;const x=p.getContext("2d");if(!x)throw new Error("no canvas context");x.drawImage(a,0,0);const w=await new Promise((D,C)=>{p.toBlob(m=>m?D(m):C(new Error("toBlob null")),"image/png")});await navigator.clipboard.write([new ClipboardItem({"image/png":w})]),t(`เขียน canvas PNG ${(w.size/1024).toFixed(1)}KB ลง clipboard`),i.focus(),await f(300);const k=document.execCommand("paste");if(t(`execCommand('paste') จาก canvas: ${k}`),k)return c=!0,await r("Canvas",8e3)||t("⚠️ Method C: paste dispatched แต่ thumbnail ยังไม่ขึ้น — ถือว่าสำเร็จ"),!0}catch(a){t(`Method C (canvas) ล้มเหลว: ${a.message}`)}return t("Real clipboard methods ล้มเหลวทั้งหมด"),!1}async function gn(n){t("ลองวางไฟล์ผ่านคลิปบอร์ด (clipboard paste)...");const e=[],s=document.querySelectorAll('[data-slate-editor="true"]');for(const d of s)d.getBoundingClientRect().bottom>window.innerHeight*.4&&e.push(d);const r=document.querySelectorAll('[contenteditable="true"]');for(const d of r){if(e.includes(d))continue;d.getBoundingClientRect().bottom>window.innerHeight*.4&&e.push(d)}const i=it();if(i&&!e.includes(i)&&e.push(i),e.length===0)return t("ไม่พบช่อง prompt สำหรับวางไฟล์"),!1;t(`พบเป้าหมาย paste ${e.length} ตัว`);for(const d of e)try{d.focus(),await f(200);const c=new DataTransfer;c.items.add(n);const a=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:c});d.dispatchEvent(a),t(`ส่ง paste event บน <${d.tagName.toLowerCase()}${d.hasAttribute("data-slate-editor")?" [Slate]":""}>`);try{const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:c});d.dispatchEvent(l),t("ส่ง beforeinput(insertFromPaste) ด้วย")}catch{}if(await f(800),Rt())return t("✅ พบรูปย่อหลัง paste!"),!0}catch(c){t(`วางผ่านคลิปบอร์ดผิดพลาดบน target: ${c.message}`)}try{const d=new DataTransfer;d.items.add(n);const c=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:d});return document.dispatchEvent(c),t("ส่ง paste event บน document"),!0}catch(d){t(`วาง paste บน document ผิดพลาด: ${d.message}`)}return!1}async function Ot(n,e){var x;t(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const s=sn(n,e);t(`ขนาดไฟล์: ${(s.size/1024).toFixed(1)} KB`);const r=ne();t(`รูปย่อปัจจุบันใน Prompt Bar: ${r} รูป`);const i=async(w,k=8e3)=>{const D=Date.now();for(;Date.now()-D<k;){const C=ne();if(C>r)return t(`✅ [${w}] ยืนยัน: รูปย่อเพิ่มจาก ${r} → ${C}`),!0;await f(500)}return t(`⚠️ [${w}] รูปย่อไม่เพิ่ม (ยังคง ${ne()} รูป)`),!1};t("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=ln();if(!d)return A("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const c=new Set(document.querySelectorAll('input[type="file"]'));t(`file input ที่มีอยู่เดิม: ${c.size} ตัว`);const a=dn();let l=cn();const p=new MutationObserver(w=>{for(const k of w)for(const D of k.addedNodes)if(D instanceof HTMLInputElement&&D.type==="file"&&(D.type="text",l.push({input:D,origType:"file"}),t("🎯 Observer ปิดกั้น file input ใหม่")),D instanceof HTMLElement){const C=D.querySelectorAll('input[type="file"]');for(const m of C)m.type="text",l.push({input:m,origType:"file"}),t("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{d.click(),t("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await f(1500),t("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let w=!1;const k=Date.now();for(;!w&&Date.now()-k<8e3;){const C=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button'], [role='menuitemradio'], a[role='button']");for(const m of C){if(m===d)continue;const o=m.querySelectorAll("i, .material-icons, .material-symbols-outlined, [class*='icon']");for(const g of o){const y=((x=g.textContent)==null?void 0:x.trim())||"";if(y==="upload"||y==="upload_file"||y==="add_photo_alternate"){const q=Array.from(m.querySelectorAll("i")).map(I=>{var _;return(_=I.textContent)==null?void 0:_.trim()});if(!q.includes("drive_folder_upload")&&!q.includes("photo_library")){m.click(),w=!0,t(`คลิกปุ่มอัปโหลด (ไอคอน: ${y}) ✅`);break}}}if(w)break}if(!w)for(const m of C){if(m===d)continue;const o=m.childNodes.length<=8?(m.textContent||"").trim():"";if(o.length>0&&o.length<60){const g=o.toLowerCase();if(g.includes("ไลบรารี")||g.includes("library")||g.includes("drive")||g.includes("ไดรฟ์"))continue;if(g==="upload"||g==="อัปโหลด"||g==="อัพโหลด"||g.includes("upload image")||g.includes("upload photo")||g.includes("upload a file")||g.includes("upload file")||g.includes("อัปโหลดรูปภาพ")||g.includes("อัพโหลดรูปภาพ")||g.includes("อัปโหลดไฟล์")||g.includes("อัพโหลดไฟล์")||g.includes("from computer")||g.includes("จากคอมพิวเตอร์")||g.includes("from device")||g.includes("จากอุปกรณ์")||g.includes("my computer")||g.includes("คอมพิวเตอร์ของฉัน")){m.click(),w=!0,t(`คลิกปุ่มอัปโหลด (ข้อความ: "${o}") ✅`);break}}}if(!w)for(const m of C){if(m===d)continue;const o=(m.textContent||"").trim().toLowerCase();if(o.length>0&&o.length<60){if(o.includes("drive")||o.includes("ไดรฟ์")||o.includes("google")||o.includes("สร้าง")||o.includes("create")||o.includes("cancel")||o.includes("ยกเลิก")||o.includes("ไลบรารี")||o.includes("library"))continue;if(o.includes("upload")||o.includes("อัป")||o.includes("อัพ")||o.includes("file")||o.includes("ไฟล์")||o.includes("รูปภาพ")||o.includes("image")||o.includes("photo")){const g=m.getBoundingClientRect();if(g.width>0&&g.height>0){m.click(),w=!0,t(`คลิกปุ่มอัปโหลด (broad match: "${o.substring(0,40)}") ✅`);break}}}}w||await f(500)}if(!w)return A("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 8 วินาที"),!1;await f(1e3),t("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──");let D=pn(l,s,c);if(!D){t("⚠️ file input injection ล้มเหลว — ลอง drag-and-drop แทน");let C=null;const m=document.querySelectorAll('[role="dialog"], [data-state="open"][aria-haspopup="dialog"]');for(const o of m)if(o.getBoundingClientRect().width>0){C=o;break}if(!C){const o=document.querySelectorAll('[data-radix-portal], [class*="overlay"], [class*="modal"]');for(const g of o)if(g.getBoundingClientRect().width>0&&!g.closest("#netflow-engine-overlay")){C=g;break}}if(!C){const o=document.querySelector('[contenteditable="true"], [role="textbox"]');o&&(C=o)}if(C){t(`🎯 Drop target: <${C.tagName}> ${(C.className||"").substring(0,40)}`);const o=new DataTransfer;o.items.add(s);const g=C.getBoundingClientRect(),y=g.left+g.width/2,q=g.top+g.height/2,I={bubbles:!0,cancelable:!0,clientX:y,clientY:q,dataTransfer:o};C.dispatchEvent(new DragEvent("dragenter",I)),await f(100),C.dispatchEvent(new DragEvent("dragover",{...I,cancelable:!0})),await f(100),C.dispatchEvent(new DragEvent("drop",I)),t("✅ ส่ง drop event บน target แล้ว"),await f(2e3);const _=ne();_>r?(t(`✅ Drop สำเร็จ — รูปย่อเพิ่มจาก ${r} → ${_}`),D=!0):(t(`⚠️ Drop อาจไม่สำเร็จ — ยังคง ${_} รูป — ดำเนินการต่อ`),D=!0)}else return A(`ฉีดไฟล์ ${e} ล้มเหลว — ไม่พบ file input และ drop target`),!1}if(t(`ฉีดไฟล์ ${e} เสร็จ ✅`),t("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4))return!0;if(we){t("🍎 Mac: file input ไม่สำเร็จ — ลอง clipboard paste แทน");try{if(await fn(n,s,r)&&ne()>r)return t("✅ Mac clipboard paste สำเร็จ!"),!0}catch(C){t(`⚠️ Mac clipboard paste ล้มเหลว: ${C.message}`)}try{if(await un(s)&&ne()>r)return t("✅ Mac drag-and-drop สำเร็จ!"),!0}catch(C){t(`⚠️ Mac drag-and-drop ล้มเหลว: ${C.message}`)}try{if(await gn(s)&&ne()>r)return t("✅ Mac synthetic paste สำเร็จ!"),!0}catch(C){t(`⚠️ Mac synthetic paste ล้มเหลว: ${C.message}`)}return t("⚠️ Mac: ลองครบทุกวิธีแล้ว — รูปย่ออาจกำลังประมวลผลอยู่"),!0}return t("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0}finally{p.disconnect(),a();for(const w of l)w.input.type!=="file"&&(w.input.type="file")}}async function mn(n,e){var C;t("=== ขั้น 0: ตั้งค่า Flow ===");const s=document.querySelectorAll("button, div, span, [role='button']");let r=null;for(const m of s){const o=(m.textContent||"").trim();if(!(o.length>80)&&(o.includes("Nano Banana")||o.includes("Imagen")||o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Image")||o.includes("Video"))){const g=m.getBoundingClientRect();g.bottom>window.innerHeight*.7&&g.width>30&&g.height>10&&(!r||(m.textContent||"").length<(r.textContent||"").length)&&(r=m)}}if(r&&t(`พบปุ่มตั้งค่าจากข้อความ: "${(r.textContent||"").substring(0,40).trim()}"`),!r){const m=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of m){const g=((C=o.textContent)==null?void 0:C.trim())||"";if(g.includes("crop")||g==="aspect_ratio"||g==="photo_size_select_large"){const y=o.closest("button, div[role='button'], [role='button']")||o.parentElement;if(y){const q=y.getBoundingClientRect();if(q.bottom>window.innerHeight*.7&&q.width>0){r=y,t(`พบปุ่มตั้งค่าจากไอคอน: ${g}`);break}}}}}if(!r)for(const m of s){const o=(m.textContent||"").trim();if(!(o.length>40)&&/x[1-4]/.test(o)&&(o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Video")||o.includes("Image"))){const g=m.getBoundingClientRect();if(g.bottom>window.innerHeight*.7&&g.width>30){r=m,t(`พบปุ่มตั้งค่าจาก x-count + mode text: "${o.substring(0,40)}"`);break}}}if(!r)return A("ไม่พบปุ่มตั้งค่า"),!1;const i=r.getBoundingClientRect(),d=i.left+i.width/2,c=i.top+i.height/2,a={bubbles:!0,cancelable:!0,clientX:d,clientY:c,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",a)),await f(80),r.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",a)),r.dispatchEvent(new MouseEvent("click",a)),t("คลิกปุ่มตั้งค่าแล้ว"),await f(1500);let l=!1,p=null;const x=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const m of x){const o=m.getAttribute("aria-controls")||"",g=m.id||"";if(o.toUpperCase().includes("IMAGE")||g.toUpperCase().includes("IMAGE")){p=m,t(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${o})`);break}}if(!p)for(const m of document.querySelectorAll('[role="tab"]')){const o=m.id||"";if(o.toUpperCase().includes("TRIGGER-IMAGE")){p=m,t(`พบแท็บ Image ผ่าน id: ${o}`);break}}if(!p)for(const m of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const o=(m.textContent||"").trim();if(!(o.length>30)&&(o==="Image"||o.endsWith("Image")||o==="รูปภาพ"||o==="ภาพ"||o.includes("รูปภาพ"))&&!o.includes("Video")&&!o.includes("วิดีโอ")){const g=m.getBoundingClientRect();if(g.width>0&&g.height>0){p=m,t(`พบแท็บ Image ผ่านข้อความ: "${o}"`);break}}}if(p){const m=p.getAttribute("data-state")||"",o=p.getAttribute("aria-selected")||"";if(m==="active"||o==="true")l=!0,t("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const g=p.getBoundingClientRect(),y={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",y)),await f(80),p.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",y)),p.dispatchEvent(new MouseEvent("click",y)),l=!0,t("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await f(400)}}l||t("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const w=n==="horizontal"?"แนวนอน":"แนวตั้ง",k=n==="horizontal"?"landscape":"portrait";for(const m of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(m.textContent||"").trim();if(!(o.length>30)&&(o===w||o.includes(w)||o.toLowerCase()===k||o.toLowerCase().includes(k))){const g=m.getBoundingClientRect(),y={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",y)),await f(80),m.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",y)),m.dispatchEvent(new MouseEvent("click",y)),t(`เลือกทิศทาง: ${w}`),await f(400);break}}const D=`x${e}`;for(const m of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(m.textContent||"").trim();if(!(o.length>10)&&(o===D||o===`${e}`)){const g=m.getBoundingClientRect(),y={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",y)),await f(80),m.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",y)),m.dispatchEvent(new MouseEvent("click",y)),t(`เลือกจำนวน: ${D}`),await f(400);break}}return await f(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),r.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",a)),await f(80),r.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",a)),r.dispatchEvent(new MouseEvent("click",a)),t("ปิดหน้าตั้งค่าแล้ว"),await f(600),!0}async function hn(n){const e=n==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",s=n==="quality"?"Quality":"Fast",r=n==="quality"?"Fast":"Quality",i=n==="quality"?"คุณภาพ":"เร็ว",d=n==="quality"?"เร็ว":"คุณภาพ";t(`=== เลือกคุณภาพ Veo: ${e} (${i}) ===`);let c=null;const a=Date.now()+1e4;for(;!c&&Date.now()<a;){const m=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const o of m){const g=(o.textContent||"").trim();if(!(g.length>80)&&(g.includes("Veo")||g.includes("veo"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.getAttribute("role")==="combobox"||g.includes("arrow_drop_down")||o.querySelector("svg"))){c=o,t(`พบปุ่ม Veo dropdown (Strategy A): "${g.substring(0,50).trim()}"`);break}}if(!c)for(const o of m){const g=(o.textContent||"").trim();if(!(g.length>80)&&(g.includes("Veo")||g.includes("veo"))){const y=o.getBoundingClientRect();if(y.width>0&&y.height>0){c=o,t(`พบปุ่ม Veo dropdown (Strategy B): "${g.substring(0,50).trim()}"`);break}}}if(!c)for(const o of m){const g=(o.textContent||"").trim();if(!(g.length>50)&&(g.includes("Fast")||g.includes("Quality")||g.includes("เร็ว")||g.includes("คุณภาพ"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.querySelector("svg"))){c=o,t(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${g.substring(0,50).trim()}"`);break}}if(!c){const o=document.querySelectorAll("div, span, button, [role='button']");for(const g of o){const y=(g.textContent||"").trim();if(y==="Veo 3.1 - Fast"||y==="Veo 3.1 - Quality"||y==="Fast"||y==="Quality"||y==="Veo 3.1 - เร็ว"||y==="Veo 3.1 - คุณภาพสูง"||y==="Veo 3.1 - คุณภาพ"||y==="Veo 2 - Fast"||y==="Veo 2 - Quality"){const q=g.getBoundingClientRect();if(q.width>0&&q.height>0){c=g,t(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${y}"`);break}}}}if(!c){const o=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const g of o){const y=(g.textContent||"").trim();if(!(y.length>60)&&(y.includes("3.1")||y.includes("model")||y.includes("โมเดล"))){const q=g.getBoundingClientRect();if(q.bottom>window.innerHeight*.4&&q.width>0&&q.height>0){c=g,t(`พบปุ่ม model selector (Strategy E): "${y.substring(0,50).trim()}"`);break}}}}c||await f(1e3)}if(!c)return A("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const l=(c.textContent||"").trim();if(l.includes(e)||l.includes(s)&&!l.includes(r)||l.includes(i)&&!l.includes(d))return t(`✅ Veo quality เป็น "${l}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=c.getBoundingClientRect(),x=p.left+p.width/2,w=p.top+p.height/2,k={bubbles:!0,cancelable:!0,clientX:x,clientY:w,button:0};c.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",k)),await f(80),c.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",k)),c.dispatchEvent(new MouseEvent("click",k)),t("คลิกเปิด Veo quality dropdown"),await f(1e3);let D=!1;const C=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const m of C){const o=(m.textContent||"").trim();if((o===e||o===s||o.includes(e)||o.includes(i))&&!o.includes("arrow_drop_down")){const y=m.getBoundingClientRect();if(y.width>0&&y.height>0){const q=y.left+y.width/2,I=y.top+y.height/2,_={bubbles:!0,cancelable:!0,clientX:q,clientY:I,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",_)),await f(80),m.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",_)),m.dispatchEvent(new MouseEvent("click",_)),t(`✅ เลือก "${o}" สำเร็จ`),D=!0;break}}}return D?(await f(600),!0):(A(`ไม่พบตัวเลือก "${e}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),!1)}async function bn(n){var I,_,U,v;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,s=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),r=s?s[1]:"unknown",i=we?"macOS":et?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",d=we?((_=(I=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:I[1])==null?void 0:_.replace(/_/g,"."))||"":et&&((U=e.match(/Windows NT ([0-9.]+)/))==null?void 0:U[1])||"",c=navigator.language||"unknown",a=`${window.innerWidth}x${window.innerHeight}`;t("══════════════════════════════════════════"),t(`🖥️ ระบบ: ${i} ${d} | Chrome ${r}`),t(`🌐 ภาษา: ${c} | หน้าจอ: ${a} | แพลตฟอร์ม: ${me}`),t("══════════════════════════════════════════");try{Ue(n.theme)}catch{}try{je()}catch(u){console.warn("Overlay show error:",u)}const l=[],p=[];try{P("settings","active");const u=n.orientation||"horizontal",T=n.outputCount||1,B=await mn(u,T);l.push(B?"✅ Settings":"⚠️ Settings"),P("settings",B?"done":"error")}catch(u){A(`ตั้งค่าผิดพลาด: ${u.message}`),l.push("⚠️ Settings"),P("settings","error")}try{const u=n.veoQuality||"fast";await hn(u)?(l.push(`✅ Veo ${u}`),t(`✅ Veo quality: ${u}`)):(l.push("⚠️ Veo quality"),A("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(u){A(`Veo quality error: ${u.message}`),l.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),await f(500),t("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const x=()=>{const u=document.querySelectorAll("span, div, p, label");for(const T of u){const B=(T.textContent||"").trim();if(/^\d{1,3}%$/.test(B)){if(B==="100%")return null;const S=T.getBoundingClientRect();if(S.width>0&&S.height>0&&S.top>0&&S.top<window.innerHeight)return B}}return null},w=async u=>{t(`รอการอัพโหลด ${u} เสร็จ...`),await f(2e3);const T=Date.now(),B=6e4;let S="",O=Date.now();const M=15e3;for(;Date.now()-T<B;){const $=x();if($){if($!==S)S=$,O=Date.now(),t(`กำลังอัพโหลด: ${$} — รอ...`);else if(Date.now()-O>M){t(`✅ อัพโหลด ${u} — % ค้างที่ ${$} นาน ${M/1e3} วินาที ถือว่าเสร็จ`),await f(1e3);return}await f(1500)}else{t(`✅ อัพโหลด ${u} เสร็จ — ไม่พบตัวบอก %`),await f(1e3);return}}A(`⚠️ อัพโหลด ${u} หมดเวลาหลัง ${B/1e3} วินาที — ดำเนินการต่อ`)};if(n.characterImage){P("upload-char","active");try{const u=await Ot(n.characterImage,"character.png");l.push(u?"✅ ตัวละคร":"⚠️ ตัวละคร"),u||p.push("character upload failed"),P("upload-char",u?"done":"error")}catch(u){A(`อัพโหลดตัวละครผิดพลาด: ${u.message}`),l.push("❌ ตัวละคร"),p.push("character upload error"),P("upload-char","error")}await w("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else Ce("upload-char");if(n.productImage){P("upload-prod","active"),t("🧹 รีเซ็ต UI ก่อนอัพโหลดสินค้า..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),await f(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500),document.querySelectorAll('input[type="file"]').forEach(u=>{t("🧹 ลบ file input เก่า"),u.remove()}),document.querySelectorAll('input[type="text"]').forEach(u=>{if(u.offsetParent===null&&!u.closest('[role="textbox"]')&&!u.closest("[contenteditable]")){const T=u.getBoundingClientRect();(T.width===0||T.height===0)&&(t("🧹 ลบ hidden text input เก่า"),u.remove())}}),await f(1e3),t("🧹 รีเซ็ตเสร็จ — เริ่มอัพโหลดสินค้า");try{const u=await Ot(n.productImage,"product.png");l.push(u?"✅ สินค้า":"⚠️ สินค้า"),u||p.push("product upload failed"),P("upload-prod",u?"done":"error")}catch(u){A(`อัพโหลดสินค้าผิดพลาด: ${u.message}`),l.push("❌ สินค้า"),p.push("product upload error"),P("upload-prod","error")}await w("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else Ce("upload-prod");t("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800);const k=x();k&&(t(`⚠️ อัพโหลดยังแสดง ${k} — รอเพิ่มเติม...`),await w("final")),t("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await f(1e3);const D=(n.characterImage?1:0)+(n.productImage?1:0);if(D>0){let u=ne();u<D&&(t(`⏳ เห็นรูปย่อแค่ ${u}/${D} — รอ 3 วินาที...`),await f(3e3),u=ne()),u>=D?t(`✅ ยืนยันรูปย่ออ้างอิง: ${u}/${D}`):A(`⚠️ คาดว่าจะมี ${D} รูปย่อ แต่พบ ${u} — ดำเนินการต่อ`)}if(ye()){t("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{De(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}t("=== ขั้น 2: วาง Image Prompt ==="),P("img-prompt","active");let C=!1;if(document.hidden){t("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt ภาพ + กด Generate");try{await new Promise(u=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>u())),C=!0,await f(1500)}catch{t("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await f(1e3);let m=!1;if(document.hidden){t("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง Image prompt + กด Generate");try{await new Promise(T=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>T())),m=!0;const u=Date.now();for(;document.hidden&&Date.now()-u<5e3;)await f(200);document.hidden?t("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(t("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3))}catch{t("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}let o=!1;for(let u=1;u<=5&&!o;u++){if(u>1&&document.hidden){t(`🔄 Retry ${u}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(S=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>S())),m=!0;const B=Date.now();for(;document.hidden&&Date.now()-B<5e3;)await f(200);document.hidden||await f(2e3)}catch{}}const T=it();if(!T){t(`⚠️ ครั้งที่ ${u}: ไม่พบช่อง Image Prompt — รอแล้วลองใหม่`),await f(3e3);continue}u>1&&(T.focus(),await f(500)),await Ge(T,n.imagePrompt),t(`วาง Prompt แล้ว (${n.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),P("img-prompt","done"),o=!0;break}if(!o)return A("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),p.push("image prompt paste failed after 5 attempts"),P("img-prompt","error"),{success:!1,message:"❌ วาง Prompt ไม่สำเร็จ",step:"img-prompt"};await f(800);const g=new Set;document.querySelectorAll("img").forEach(u=>{u.src&&g.add(u.src)}),t(`บันทึกรูปเดิม: ${g.size} รูปก่อน Generate`),t("=== ขั้น 3: คลิก Generate → ==="),P("img-generate","active"),await f(500);const y=Dt();if(y){const u=y.getBoundingClientRect(),T=u.left+u.width/2,B=u.top+u.height/2,S={bubbles:!0,cancelable:!0,clientX:T,clientY:B,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",S)),await f(80),y.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",S)),y.dispatchEvent(new MouseEvent("click",S)),t("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await f(500),y.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",S)),await f(80),y.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",S)),y.dispatchEvent(new MouseEvent("click",S)),t("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),P("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),p.push("generate button not found"),P("img-generate","error");t("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),P("img-wait","active");try{t("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await f(15e3);const u=()=>{const M=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of M){if($.closest("#netflow-engine-overlay"))continue;const h=($.textContent||"").trim();if(h.length>10)continue;const b=h.match(/(\d{1,3})\s*%/);if(!b)continue;const E=parseInt(b[1],10);if(E<1||E>100)continue;if(X())return E;const F=$.getBoundingClientRect();if(!(F.width===0||F.width>150)&&!(F.top<0||F.top>window.innerHeight))return E}return null};t("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let T=null,B=-1,S=0;const O=Date.now();for(;!T&&Date.now()-O<18e4;){const M=document.querySelectorAll("img");for(const $ of M){if(g.has($.src)||!($.alt||"").toLowerCase().includes("generated"))continue;if(X()?$.naturalWidth>120&&$.naturalHeight>120:(()=>{const E=$.getBoundingClientRect();return E.width>120&&E.height>120&&E.top>0&&E.top<window.innerHeight*.85})()){const E=$.closest("div");if(E){T=E,t(`พบรูป AI จาก alt="${$.alt}": ${$.src.substring(0,80)}...${X()?" (hidden-mode)":""}`);break}}}if(!T)for(const $ of M){if(g.has($.src))continue;const h=$.closest("div"),b=(h==null?void 0:h.textContent)||"";if(b.includes("product.png")||b.includes("character.png")||b.includes(".png")||b.includes(".jpg"))continue;if(X()?$.naturalWidth>120&&$.naturalHeight>120:(()=>{const F=$.getBoundingClientRect();return F.width>120&&F.height>120&&F.top>0&&F.top<window.innerHeight*.85})()){const F=$.closest("div");if(F){T=F,t(`พบรูปใหม่ (สำรอง): ${$.src.substring(0,80)}...${X()?" (hidden-mode)":""}`);break}}}if(!T){if(ye()){t("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const $=Bt();if($){A(`❌ สร้างรูปล้มเหลว: ${$}`),p.push(`image gen failed: ${$}`),P("img-wait","error");break}const h=u();h!==null?(h!==B&&(t(`🖼️ ความคืบหน้ารูปภาพ: ${h}%`),B=h,P("img-wait","active",h)),S=Date.now()):B>30&&Math.floor((Date.now()-S)/1e3)>=3&&t(`🖼️ % หายที่ ${B}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&B>0&&Date.now()-S>1e4&&await ve(),document.hidden&&B<1&&Date.now()-O>3e4&&await ve(),await f(3e3)}}if(!T)A("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),P("img-wait","error");else{t("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),P("img-wait","done",100),await nt();const M=T.getBoundingClientRect(),$=M.left+M.width/2,h=M.top+M.height/2,b={bubbles:!0,cancelable:!0,clientX:$,clientY:h};T.dispatchEvent(new PointerEvent("pointerenter",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseenter",b)),T.dispatchEvent(new PointerEvent("pointerover",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseover",b)),T.dispatchEvent(new PointerEvent("pointermove",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mousemove",b)),t("ส่งเหตุการณ์ hover บนรูปแล้ว"),await f(1500);let E=null;for(const F of["more_vert","more_horiz","more"]){const R=He(F);for(const L of R){const G=L.getBoundingClientRect();if(G.top>=M.top-20&&G.top<=M.bottom&&G.right>=M.right-150&&G.right<=M.right+20){E=L;break}}if(E)break}if(!E){const F=document.querySelectorAll("button");for(const R of F){const L=R.getBoundingClientRect();if(L.width<50&&L.height<50&&L.top>=M.top-10&&L.top<=M.top+60&&L.left>=M.right-80){const G=R.querySelectorAll("i");for(const Y of G)if((((v=Y.textContent)==null?void 0:v.trim())||"").includes("more")){E=R;break}if(E)break;const N=R.getAttribute("aria-label")||"";if(N.includes("เพิ่มเติม")||N.includes("more")){E=R;break}}}}if(!E)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const F=E.getBoundingClientRect(),R=F.left+F.width/2,L=F.top+F.height/2,G={bubbles:!0,cancelable:!0,clientX:R,clientY:L,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",G)),await f(80),E.dispatchEvent(new PointerEvent("pointerup",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",G)),E.dispatchEvent(new MouseEvent("click",G)),t("คลิกปุ่ม 3 จุดแล้ว"),await f(1500);let N=null;const Y=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const W of Y){const ee=(W.textContent||"").trim();if(ee.includes("ทำให้เป็นภาพเคลื่อนไหว")||ee.includes("Animate")||ee.includes("animate")){N=W;break}}if(!N)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const W=N.getBoundingClientRect(),ee=W.left+W.width/2,fe=W.top+W.height/2,V={bubbles:!0,cancelable:!0,clientX:ee,clientY:fe,button:0};N.dispatchEvent(new PointerEvent("pointerdown",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),N.dispatchEvent(new MouseEvent("mousedown",V)),await f(80),N.dispatchEvent(new PointerEvent("pointerup",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),N.dispatchEvent(new MouseEvent("mouseup",V)),N.dispatchEvent(new MouseEvent("click",V)),t("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),P("animate","done"),await f(3e3)}}}}catch(u){A(`ขั้น 4 ผิดพลาด: ${u.message}`),l.push("⚠️ Animate")}if(ye()){t("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{De(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(n.videoPrompt){t("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),P("vid-prompt","active");try{t("รอ UI โหมดวิดีโอ..."),await f(3e3);let u=!1;const T=document.querySelectorAll("button, span, div");for(const M of T){const $=(M.textContent||"").trim(),h=M.getBoundingClientRect();if(($==="วิดีโอ"||$==="Video"||$.includes("วิดีโอ"))&&h.bottom>window.innerHeight*.7){u=!0,t("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}u||t("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let B=!1;if(document.hidden){t("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise($=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>$())),B=!0;const M=Date.now();for(;document.hidden&&Date.now()-M<5e3;)await f(200);document.hidden?t("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(t("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3))}catch{t("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await f(1e3);let S=!1;for(let M=1;M<=5&&!S;M++){if(M>1&&document.hidden){t(`🔄 Retry ${M}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(E=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>E())),B=!0;const b=Date.now();for(;document.hidden&&Date.now()-b<5e3;)await f(200);document.hidden||await f(2e3)}catch{}}const $=it();if(!$){t(`⚠️ ครั้งที่ ${M}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await f(3e3);continue}M>1&&($.focus(),await f(500)),await Ge($,n.videoPrompt),await f(500);const h=($.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();h.length>=20?(t(`วาง Video Prompt สำเร็จ ครั้งที่ ${M} (${h.length} ตัวอักษร)`),l.push("✅ Video Prompt"),P("vid-prompt","done"),S=!0):(t(`⚠️ ครั้งที่ ${M}: Prompt ไม่ถูกวาง (ได้ ${h.length} ตัวอักษร)`),await f(1500))}if(!S)throw A("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),l.push("❌ Video Prompt"),p.push("video prompt paste failed after 5 attempts"),P("vid-prompt","error"),new Error("Video prompt paste failed");await f(1e3),P("vid-generate","active");const O=Dt();if(O){const M=O.getBoundingClientRect(),$=M.left+M.width/2,h=M.top+M.height/2,b={bubbles:!0,cancelable:!0,clientX:$,clientY:h,button:0};O.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mousedown",b)),await f(80),O.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mouseup",b)),O.dispatchEvent(new MouseEvent("click",b)),t("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),P("vid-generate","done"),await f(500),O.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mousedown",b)),await f(80),O.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mouseup",b)),O.dispatchEvent(new MouseEvent("click",b)),t("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),p.push("video generate button not found"),P("vid-generate","error");if(B){await f(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}t("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(u){A(`ขั้น 5 ผิดพลาด: ${u.message}`),l.push("⚠️ Video Gen"),p.push(`video gen error: ${u.message}`)}}else t("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),Ce("animate"),Ce("vid-prompt"),Ce("vid-generate"),Ce("vid-wait");if(n.videoPrompt){P("vid-wait","active");const u=n.sceneCount||1,T=n.videoScenePrompts||[n.videoPrompt];if(u>1)try{Zt(u)}catch{}t(`=== ขั้น 6: รอวิดีโอ + ${u>1?`ต่อ ${u} ฉาก`:"ดาวน์โหลด"} ===`);const B=()=>{const M=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of M){if($.closest("#netflow-engine-overlay"))continue;const h=($.textContent||"").trim();if(h.length>10)continue;const b=h.match(/(\d{1,3})\s*%/);if(!b)continue;const E=parseInt(b[1],10);if(E<1||E>100)continue;if(X())return E;const F=$.getBoundingClientRect();if(!(F.width===0||F.width>150)&&!(F.top<0||F.top>window.innerHeight))return E}return null},S=async(M=6e5)=>{t("รอการสร้างวิดีโอ..."),P("vid-wait","active"),await f(5e3);const $=()=>{const V=document.querySelectorAll("div, span, p, label, strong, small");let z=0;for(const J of V){if(J.closest("#netflow-engine-overlay"))continue;const oe=(J.textContent||"").trim();if(oe.includes("%")&&oe.length<15){const ce=J.tagName.toLowerCase(),$e=J.className&&typeof J.className=="string"?J.className.split(/\s+/).slice(0,2).join(" "):"",de=J.getBoundingClientRect();if(t(`  🔍 "${oe}" ใน <${ce}.${$e}> ที่ (${de.left.toFixed(0)},${de.top.toFixed(0)}) w=${de.width.toFixed(0)}`),z++,z>=5)break}}z===0&&t("  🔍 ไม่พบ element ที่มีข้อความ '%'")},h=ot();t(h?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),t("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),$();const b=Date.now();let E=-1,F=0,R=!1;for(;Date.now()-b<M;){const V=B();if(V!==null){if(V!==E&&(t(`ความคืบหน้าวิดีโอ: ${V}%`),E=V,P("vid-wait","active",V)),F=Date.now(),V>=100){t("✅ ตรวจพบ 100%!"),R=!0;break}}else if(E>30){const z=Math.floor((Date.now()-F)/1e3);if(z>=5){t(`✅ % หายไปที่ ${E}% (หาย ${z} วินาที) — วิดีโอเสร็จ!`),R=!0;break}t(`⏳ % หายที่ ${E}% — ยืนยันใน ${5-z} วินาที...`)}else{const z=Math.floor((Date.now()-b)/1e3);z%15<3&&t(`⏳ รอ... (${z} วินาที) ไม่พบ %`)}if(!R&&E>0&&ot(!0)&&!h){t(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${E}% — วิดีโอเสร็จ!`),R=!0;break}if(ye())return t("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(E<1){const z=Bt();if(z)return A(`❌ สร้างวิดีโอล้มเหลว: ${z}`),null}document.hidden&&E>0&&Date.now()-F>1e4&&await ve(),document.hidden&&E<1&&Date.now()-b>3e4&&await ve(),await f(3e3)}await nt();let L=null;for(let V=1;V<=10&&(L=ot(),!L);V++)t(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${V}/10)`),V%3===0&&await nt(),await f(3e3);if(!L)return t("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),P("vid-wait","error"),null;const G=L;R?(P("vid-wait","done",100),t("รอ 4 วินาทีก่อนคลิก..."),await f(4e3)):t("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const N=G.getBoundingClientRect();let Y=N.left+N.width/2,W=N.top+N.height/2,ee=G;const fe=G.querySelector("video, img, canvas");if(fe){const V=fe.getBoundingClientRect();V.width>50&&V.height>50&&(Y=V.left+V.width/2,W=V.top+V.height/2,ee=fe,t(`🎯 พบรูปย่อ <${fe.tagName.toLowerCase()}> ในการ์ดที่ (${Y.toFixed(0)},${W.toFixed(0)}) ${V.width.toFixed(0)}x${V.height.toFixed(0)}`))}else W=N.top+N.height*.3,t(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${Y.toFixed(0)},${W.toFixed(0)})`);t(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${Y.toFixed(0)}, ${W.toFixed(0)})...`),on(ee);for(let V=0;V<8;V++){const z={bubbles:!0,cancelable:!0,clientX:Y+V%2,clientY:W};ee.dispatchEvent(new PointerEvent("pointermove",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),ee.dispatchEvent(new MouseEvent("mousemove",z)),await f(500)}try{chrome.storage.local.set({[ue()]:{timestamp:Date.now(),action:"mute_video",sceneCount:u,scenePrompts:T,theme:n.theme}}),t(`💾 บันทึก pending action: mute_video (${u} ฉาก, ${T.length} prompts, theme: ${n.theme})`)}catch(V){t(`⚠️ ไม่สามารถบันทึก pending action: ${V.message}`)}return t("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await O(ee),t("✅ คลิกการ์ดวิดีโอเสร็จ"),G},O=async M=>{const $=M.getBoundingClientRect(),h=$.left+$.width/2,b=$.top+$.height/2,E={bubbles:!0,cancelable:!0,clientX:h,clientY:b,button:0};M.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",E)),await f(80),M.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",E)),M.dispatchEvent(new MouseEvent("click",E)),await f(50),M.click(),t("คลิกการ์ดวิดีโอแล้ว"),await f(2e3)};try{if(!await S())A("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),P("vid-wait","error");else{l.push("✅ Video Complete"),P("vid-wait","done",100),t("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await f(3e3);const $=await new Promise(h=>{chrome.storage.local.get(ue(),b=>{if(chrome.runtime.lastError){h(null);return}h((b==null?void 0:b[ue()])||null)})});$&&!$._claimed&&(t("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(ue()),$.action==="mute_video"?await Ft($.sceneCount||1,$.scenePrompts||[],$.theme):$.action==="wait_scene_gen_and_download"&&await Nt($.sceneCount||2,$.currentScene||2,$.theme,$.scenePrompts||[]))}}catch(M){A(`ขั้น 6 ผิดพลาด: ${M.message}`),l.push("⚠️ Step6"),p.push(`step 6: ${M.message}`)}}const q=p.length===0;try{De(q?5e3:8e3)}catch(u){console.warn("Overlay complete error:",u)}return{success:q,message:q?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${p.join(", ")}`,step:q?"done":"partial"}}async function Ft(n,e=[],s){var q;t("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{s&&Ue(s)}catch{}try{je(n)}catch(I){t(`⚠️ showOverlay error: ${I.message}`)}try{const I=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const _ of I)P(_,"done");n>=2&&P("scene2-prompt","active"),t(`✅ overlay restored: ${I.length} steps done, sceneCount=${n}`)}catch(I){t(`⚠️ overlay restore error: ${I.message}`)}await f(1500);const r=(()=>{for(const I of document.querySelectorAll("button")){const _=I.querySelectorAll("i");for(const v of _){const u=(v.textContent||"").trim();if(u==="volume_up"||u==="volume_off"||u==="volume_mute"){const T=I.getBoundingClientRect();if(T.width>0&&T.height>0)return I}}const U=(I.getAttribute("aria-label")||"").toLowerCase();if(U.includes("mute")||U.includes("ปิดเสียง")){const v=I.getBoundingClientRect();if(v.width>0&&v.height>0)return I}}return null})();r?(r.click(),t("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):t("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(n>=2){t(`═══ ${n} ฉาก — เริ่มต่อฉาก ═══`),await f(2e3);for(let h=2;h<=n;h++){const b=e[h-1];if(!b){A(`ไม่พบ prompt สำหรับฉากที่ ${h}`);continue}t(`── ฉากที่ ${h}/${n}: วาง prompt + generate ──`);let E=null;const F=Date.now();for(;!E&&Date.now()-F<1e4;){const z=document.querySelectorAll("[data-slate-editor='true']");if(z.length>0&&(E=z[z.length-1]),!E){const J=document.querySelectorAll("[role='textbox'][contenteditable='true']");J.length>0&&(E=J[J.length-1])}E||await f(1e3)}if(!E){A("ไม่พบช่อง prompt (Slate editor)");return}t(`พบ Slate editor: <${E.tagName.toLowerCase()}> ${E.className.substring(0,40)}`),await Ge(E,b),t(`วาง prompt ฉาก ${h} (${b.length} ตัวอักษร) ✅`);try{P(`scene${h}-prompt`,"done"),P(`scene${h}-gen`,"active")}catch{}await f(1e3);const R=E.getBoundingClientRect();let L=null,G=1/0;for(const z of document.querySelectorAll("button")){if(z.disabled)continue;const J=z.querySelectorAll("i");let oe=!1;for(const de of J)if((de.textContent||"").trim()==="arrow_forward"){oe=!0;break}if(!oe)continue;const ce=z.getBoundingClientRect();if(ce.width<=0||ce.height<=0)continue;const $e=Math.abs(ce.top-R.top)+Math.abs(ce.right-R.right);$e<G&&(G=$e,L=z)}if(!L)for(const z of document.querySelectorAll("button")){const J=z.querySelectorAll("i");for(const oe of J)if((oe.textContent||"").trim()==="arrow_forward"){const ce=z.getBoundingClientRect();if(ce.width>0&&ce.height>0){L=z;break}}if(L)break}if(!L){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(z=>{chrome.storage.local.set({[ue()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:s,sceneCount:n,currentScene:h,scenePrompts:e}},()=>z())}),t(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${h}/${n})`),await ie(L),t(`คลิก Generate ฉาก ${h} ✅`);try{P(`scene${h}-gen`,"done"),P(`scene${h}-wait`,"active")}catch{}t(`── รอวิดีโอฉาก ${h} gen เสร็จ ──`),await f(5e3);let N=0,Y=0;const W=Date.now(),ee=6e5,fe=5e3;let V=!1;for(;Date.now()-W<ee;){let z=null;const J=document.querySelectorAll("div, span, p, label, strong, small");for(const oe of J){if(oe.closest("#netflow-engine-overlay"))continue;const $e=(oe.textContent||"").trim().match(/^(\d{1,3})%$/);if($e){const de=oe.getBoundingClientRect();if(de.width>0&&de.height>0&&de.width<120&&de.height<60){z=parseInt($e[1],10);break}}}if(z!==null){if(z!==N){t(`🎬 ฉาก ${h} ความคืบหน้า: ${z}%`),N=z;try{P(`scene${h}-wait`,"active",z)}catch{}}Y=0}else if(N>0){if(Y===0)Y=Date.now(),t(`🔍 ฉาก ${h}: % หายไป (จาก ${N}%) — กำลังยืนยัน...`);else if(Date.now()-Y>=fe){t(`✅ ฉาก ${h}: % หายไป ${fe/1e3} วินาที — เจนเสร็จ!`),V=!0;break}}if(ye()){t("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&N>0&&Y===0&&await ve(),await f(2e3)}V||A(`ฉาก ${h} หมดเวลา`),t(`✅ ฉาก ${h} เสร็จแล้ว`);try{P(`scene${h}-wait`,"done",100)}catch{}chrome.storage.local.remove(ue()),t("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await f(2e3)}t("── เริ่มดาวน์โหลด Full Video ──");try{P("download","active")}catch{}let I=!1;if(document.hidden){t("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อคลิกเมนูดาวน์โหลด (Radix UI)");try{await new Promise(h=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>h())),I=!0,await f(5e3)}catch{}}await f(2e3);const _=Date.now();let U=null;const v=Date.now();for(;!U&&Date.now()-v<1e4;){for(const h of document.querySelectorAll("button")){const b=h.querySelector("i");if(b&&(b.textContent||"").trim()==="download"){const E=h.getBoundingClientRect();if(E.width>0&&E.height>0){U=h;break}}}U||await f(1e3)}if(!U){if(A("ไม่พบปุ่มดาวน์โหลด"),I)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await ie(U),t("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await f(1500);let u=null;for(let h=0;h<3&&!u;h++){h>0&&t(`🔄 ลองหา 720p ครั้งที่ ${h+1}...`);let b=null;const E=Date.now();for(;!b&&Date.now()-E<5e3;){for(const N of document.querySelectorAll("[role='menuitem']"))if((N.textContent||"").trim().includes("Full Video")&&N.querySelector("i")){const W=N.getBoundingClientRect();if(W.width>0&&W.height>0){b=N;break}}b||await f(500)}if(!b){A("ไม่พบ Full Video");continue}const F=b.getBoundingClientRect(),R=F.left+F.width/2,L=F.top+F.height/2;b.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:R,clientY:L})),b.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:R,clientY:L})),b.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:R,clientY:L})),await ie(b),t("คลิก/hover Full Video ✅"),await f(2e3);const G=Date.now();for(;!u&&Date.now()-G<8e3;){for(const N of document.querySelectorAll("button[role='menuitem']")){const Y=N.querySelectorAll("span");for(const W of Y)if((W.textContent||"").trim()==="720p"){const ee=N.getBoundingClientRect();if(ee.width>0&&ee.height>0){u=N;break}}if(u)break}u||(b.isConnected&&(b.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:R,clientY:L})),b.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:R+20,clientY:L}))),await f(500))}}if(!u){if(A("ไม่พบ 720p"),I)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await ie(u),t("คลิก 720p ✅"),I){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}t("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}t("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const T=Date.now();let B=!1,S=!1;for(;Date.now()-T<3e5;){for(const h of document.querySelectorAll("div[data-title] div, div[data-content] div")){const b=(h.textContent||"").trim();if(b==="Download complete!"||b==="ดาวน์โหลดเสร็จ"){t("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),B=!0;break}(b.includes("Downloading your extended video")||b.includes("กำลังดาวน์โหลด"))&&(S||(S=!0,t("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(B)break;if(S){let h=!1;for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((b.textContent||"").trim().includes("Downloading")){h=!0;break}if(!h){t("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),B=!0;break}}if(ye()){t("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await f(2e3)}if(!B){A("เตรียมไฟล์หมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}t("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let O=!1;const M=Date.now();for(;Date.now()-M<6e4&&!O;){try{await new Promise(h=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:_},b=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):b!=null&&b.success?(t(`✅ เปิดวิดีโอใน Chrome แล้ว: ${b.message}`),O=!0,b.downloadUrl&&(i=b.downloadUrl,t(`[TikTok] จะใช้ download URL: ${b.downloadUrl.substring(0,80)}...`))):t(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-M)/1e3)}s)`),h()})})}catch(h){A(`ตรวจสอบผิดพลาด: ${h.message}`)}O||await f(3e3)}O||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),t("[TikTok] กำลัง capture + cache video blob จาก content script...");const $=await Je();i||(i=$);try{P("open","done"),De(8e3)}catch{}t("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),Ze(i),Qe(2e3);return}t("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await f(2e3);const d=(I,_="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const U of document.querySelectorAll(_)){const v=(U.textContent||"").trim();if(v.includes(I)&&v.length<100){const u=U.getBoundingClientRect();if(u.width>0&&u.height>0&&u.top>=0)return U}}return null};t("── ค้นหาปุ่มดาวน์โหลด ──");let c=null;const a=Date.now();for(;!c&&Date.now()-a<1e4;){for(const I of document.querySelectorAll("button, [role='button']")){const _=(I.textContent||"").trim(),U=_.toLowerCase();if((U.includes("download")||U.includes("ดาวน์โหลด"))&&_.length<80){const v=I.getBoundingClientRect();if(v.width>0&&v.height>0){c=I;break}}}if(!c)for(const I of document.querySelectorAll("button")){const _=(I.getAttribute("aria-label")||"").toLowerCase();if(_.includes("download")||_.includes("ดาวน์")){const U=I.getBoundingClientRect();if(U.width>0&&U.height>0){c=I;break}}}c||(t(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await f(1e3))}if(!c){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}t(`พบปุ่มดาวน์โหลด: "${(c.textContent||"").trim().substring(0,40)}"`),await ie(c),t("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await f(1500);const l=Date.now();let p=null;const x=Date.now();for(;!p&&Date.now()-x<5e3;)p=d("1080p"),p||(t("รอ 1080p..."),await f(500));if(!p){A("ไม่พบ 1080p");return}await ie(p),t("คลิก 1080p Upscaled ✅"),t("รอการอัปสเกลเสร็จ...");const w=Date.now();let k=!1,D=!1,C=0;const m=3e3;for(;Date.now()-w<3e5;){const _=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(_.includes("upscaling complete")||_.includes("อัปสเกลเสร็จ")){t("✅ Upscaling complete!"),k=!0;break}for(const v of document.querySelectorAll("div, span, p")){const u=(v.textContent||"").trim().toLowerCase();if(u.length<60&&(u.includes("upscaling complete")||u.includes("อัปสเกลเสร็จ"))){t(`✅ Upscaling complete! (element: "${(q=v.textContent)==null?void 0:q.trim()}")`),k=!0;break}}if(k)break;if(_.includes("upscaling your video")||_.includes("กำลังอัปสเกล")){D=!0,C=0;const v=Math.floor((Date.now()-w)/1e3);t(`⏳ กำลังอัปสเกล... (${v} วินาที)`)}else if(D){if(C===0)C=Date.now(),t("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-C>=m){t(`✅ ข้อความ Upscaling หายไป ${m/1e3} วินาที — เสร็จ!`),k=!0;break}}else{const v=Math.floor((Date.now()-w)/1e3);v%10<3&&t(`⏳ รอ Upscale... (${v} วินาที)`)}if(ye()){t("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await f(2e3)}if(!k){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}t("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let o=!1;const g=Date.now();for(;Date.now()-g<6e4&&!o;){try{await new Promise(I=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:l},_=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):_!=null&&_.success?(t(`✅ เปิดวิดีโอใน Chrome แล้ว: ${_.message}`),o=!0,_.downloadUrl&&(i=_.downloadUrl,t(`[TikTok] จะใช้ download URL: ${_.downloadUrl.substring(0,80)}...`))):t(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-g)/1e3)}s)`),I()})})}catch(I){A(`ตรวจสอบผิดพลาด: ${I.message}`)}o||await f(3e3)}o||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),t("[TikTok] กำลัง capture + cache video blob จาก content script...");const y=await Je();i||(i=y),t("═══ ดาวน์โหลดเสร็จสิ้น ═══"),Ze(i),Qe(2e3)}async function Nt(n=2,e=2,s,r=[]){t(`═══ Pending: รอ scene ${e}/${n} gen เสร็จ + ดาวน์โหลด ═══`);try{s&&Ue(s)}catch{}try{je(n)}catch(v){t(`⚠️ showOverlay error: ${v.message}`)}try{const v=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let u=2;u<=e;u++)v.push(`scene${u}-prompt`,`scene${u}-gen`),u<e&&v.push(`scene${u}-wait`);for(const u of v)P(u,"done");P(`scene${e}-wait`,"active"),t(`✅ overlay restored: ${v.length} steps done (scene ${e}/${n} navigate)`)}catch(v){t(`⚠️ overlay restore error: ${v.message}`)}await f(2e3);const i=(()=>{for(const v of document.querySelectorAll("button")){const u=v.querySelectorAll("i");for(const T of u){const B=(T.textContent||"").trim();if(B==="volume_up"||B==="volume_off"||B==="volume_mute"){const S=v.getBoundingClientRect();if(S.width>0&&S.height>0)return v}}}return null})();i?(i.click(),t("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):t("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),t(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let d=0,c=0;const a=Date.now(),l=6e5,p=5e3;let x=!1,w=0;for(;Date.now()-a<l;){let v=null;const u=document.querySelectorAll("div, span, p, label, strong, small");for(const T of u){if(T.closest("#netflow-engine-overlay"))continue;const S=(T.textContent||"").trim().match(/^(\d{1,3})%$/);if(S){const O=T.getBoundingClientRect();if(O.width>0&&O.height>0&&O.width<120&&O.height<60){v=parseInt(S[1],10);break}}}if(v!==null){if(w=0,v!==d){t(`🎬 scene ${e} ความคืบหน้า: ${v}%`),d=v;try{P(`scene${e}-wait`,"active",v)}catch{}}c=0}else if(d>0){if(c===0)c=Date.now(),t(`🔍 scene ${e}: % หายไป (จาก ${d}%) — กำลังยืนยัน...`);else if(Date.now()-c>=p){t(`✅ scene ${e}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),x=!0;break}}else if(w++,w>=15){const T=document.querySelectorAll("video");let B=!1;for(const S of T)if(S.readyState>=2&&!S.paused&&S.getBoundingClientRect().width>200){B=!0;break}if(B){t(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),x=!0;break}if(w>=30){t(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),x=!0;break}}document.hidden&&d>0&&c===0&&await ve(),await f(2e3)}x||t(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{P(`scene${e}-wait`,"done",100)}catch{}if(t(`✅ scene ${e} เสร็จ`),e<n&&r.length>0){t(`═══ ยังเหลืออีก ${n-e} ฉาก — ต่อฉากถัดไป ═══`),await f(2e3);for(let v=e+1;v<=n;v++){const u=r[v-1];if(!u){t(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${v} — ข้าม`);continue}t(`── ฉากที่ ${v}/${n}: วาง prompt + generate (pending recovery) ──`);let T=null;const B=Date.now();for(;!T&&Date.now()-B<1e4;){const R=document.querySelectorAll("[data-slate-editor='true']");if(R.length>0&&(T=R[R.length-1]),!T){const L=document.querySelectorAll("[role='textbox'][contenteditable='true']");L.length>0&&(T=L[L.length-1])}T||await f(1e3)}if(!T){t(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${v}`);break}await Ge(T,u),t(`วาง prompt ฉาก ${v} (${u.length} ตัวอักษร) ✅`);try{P(`scene${v}-prompt`,"done"),P(`scene${v}-gen`,"active")}catch{}await f(1e3);const S=T.getBoundingClientRect();let O=null,M=1/0;for(const R of document.querySelectorAll("button")){if(R.disabled)continue;const L=R.querySelectorAll("i");let G=!1;for(const W of L)if((W.textContent||"").trim()==="arrow_forward"){G=!0;break}if(!G)continue;const N=R.getBoundingClientRect();if(N.width<=0||N.height<=0)continue;const Y=Math.abs(N.top-S.top)+Math.abs(N.right-S.right);Y<M&&(M=Y,O=R)}if(!O)for(const R of document.querySelectorAll("button")){const L=R.querySelectorAll("i");for(const G of L)if((G.textContent||"").trim()==="arrow_forward"){const N=R.getBoundingClientRect();if(N.width>0&&N.height>0){O=R;break}}if(O)break}if(!O){t(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${v}`);break}await new Promise(R=>{chrome.storage.local.set({[ue()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:s,sceneCount:n,currentScene:v,scenePrompts:r}},()=>R())}),await ie(O),t(`คลิก Generate ฉาก ${v} ✅`);try{P(`scene${v}-gen`,"done"),P(`scene${v}-wait`,"active")}catch{}await f(5e3);let $=0,h=0;const b=Date.now();let E=!1,F=0;for(;Date.now()-b<6e5;){let R=null;const L=document.querySelectorAll("div, span, p, label, strong, small");for(const G of L){if(G.closest("#netflow-engine-overlay"))continue;const Y=(G.textContent||"").trim().match(/^(\d{1,3})%$/);if(Y){const W=G.getBoundingClientRect();if(W.width>0&&W.height>0&&W.width<120&&W.height<60){R=parseInt(Y[1],10);break}}}if(R!==null){if(F=0,R!==$){t(`🎬 ฉาก ${v} ความคืบหน้า: ${R}%`),$=R;try{P(`scene${v}-wait`,"active",R)}catch{}}h=0}else if($>0){if(h===0)h=Date.now();else if(Date.now()-h>=5e3){t(`✅ ฉาก ${v}: เจนเสร็จ!`),E=!0;break}}else if(F++,F>=15){const G=document.querySelectorAll("video");let N=!1;for(const Y of G)if(Y.readyState>=2&&!Y.paused&&Y.getBoundingClientRect().width>200){N=!0;break}if(N){t(`✅ ฉาก ${v}: พบวิดีโอเล่นอยู่ — เสร็จ`),E=!0;break}if(F>=30){t(`✅ ฉาก ${v}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),E=!0;break}}document.hidden&&$>0&&h===0&&await ve(),await f(2e3)}E||t(`⚠️ ฉาก ${v} หมดเวลา`);try{P(`scene${v}-wait`,"done",100)}catch{}t(`✅ ฉาก ${v} เสร็จแล้ว`),chrome.storage.local.remove(ue()),await f(2e3)}}t("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await f(3e3);let k=null;try{P("download","active")}catch{}t("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const D=Date.now();let C=null;const m=Date.now();for(;!C&&Date.now()-m<1e4;){for(const v of document.querySelectorAll("button")){const u=v.querySelector("i");if(u&&(u.textContent||"").trim()==="download"){const T=v.getBoundingClientRect();if(T.width>0&&T.height>0){C=v;break}}}C||await f(1e3)}if(!C){A("ไม่พบปุ่มดาวน์โหลด");return}await ie(C),t("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await f(1500);let o=null;for(let v=0;v<3&&!o;v++){v>0&&t(`🔄 ลองหา 720p ครั้งที่ ${v+1}...`);let u=null;const T=Date.now();for(;!u&&Date.now()-T<5e3;){for(const $ of document.querySelectorAll("[role='menuitem']"))if(($.textContent||"").trim().includes("Full Video")&&$.querySelector("i")){const b=$.getBoundingClientRect();if(b.width>0&&b.height>0){u=$;break}}u||await f(500)}if(!u){A("ไม่พบ Full Video");continue}const B=u.getBoundingClientRect(),S=B.left+B.width/2,O=B.top+B.height/2;u.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:S,clientY:O})),u.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:S,clientY:O})),u.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:S,clientY:O})),await ie(u),t("คลิก/hover Full Video ✅"),await f(2e3);const M=Date.now();for(;!o&&Date.now()-M<8e3;){for(const $ of document.querySelectorAll("button[role='menuitem']")){const h=$.querySelectorAll("span");for(const b of h)if((b.textContent||"").trim()==="720p"){const E=$.getBoundingClientRect();if(E.width>0&&E.height>0){o=$;break}}if(o)break}o||(u.isConnected&&(u.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:S,clientY:O})),u.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:S+20,clientY:O}))),await f(500))}}if(!o){A("ไม่พบ 720p");return}await ie(o),t("คลิก 720p ✅"),t("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const g=Date.now();let y=!1,q=!1;for(;Date.now()-g<3e5;){for(const v of document.querySelectorAll("div[data-title] div, div[data-content] div")){const u=(v.textContent||"").trim();if(u==="Download complete!"||u==="ดาวน์โหลดเสร็จ"){t("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),y=!0;break}(u.includes("Downloading your extended video")||u.includes("กำลังดาวน์โหลด"))&&(q||(q=!0,t("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(y)break;if(q){let v=!1;for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((u.textContent||"").trim().includes("Downloading")){v=!0;break}if(!v){t("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),y=!0;break}}await f(2e3)}if(!y){A("เตรียมไฟล์หมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}t("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let I=!1;const _=Date.now();for(;Date.now()-_<6e4&&!I;){try{await new Promise(v=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:D},u=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):u!=null&&u.success?(t(`✅ เปิดวิดีโอใน Chrome แล้ว: ${u.message}`),I=!0,u.downloadUrl&&(k=u.downloadUrl,t(`[TikTok] จะใช้ download URL: ${u.downloadUrl.substring(0,80)}...`))):t(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-_)/1e3)}s)`),v()})})}catch(v){A(`ตรวจสอบผิดพลาด: ${v.message}`)}I||await f(3e3)}I||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),t("[TikTok] กำลัง capture + cache video blob จาก content script...");const U=await Je();k||(k=U);try{P("open","done"),De(8e3)}catch{}t("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),Ze(k),Qe(2e3)}async function wn(){try{await en;const n=ue();let e=await new Promise(c=>{chrome.storage.local.get(n,a=>{if(chrome.runtime.lastError){c(null);return}c((a==null?void 0:a[n])||null)})});if(!e&&Te){const c="netflow_pending_action";e=await new Promise(a=>{chrome.storage.local.get(c,l=>{if(chrome.runtime.lastError){a(null);return}a((l==null?void 0:l[c])||null)})}),e&&(t("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(c))}if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){t("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){t("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const r=Date.now()-e.timestamp;if(r>3e5){t("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(n);return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=i,await new Promise(c=>{chrome.storage.local.set({[n]:e},()=>c())}),await f(300),!await new Promise(c=>{chrome.storage.local.get(n,a=>{const l=a==null?void 0:a[n];c((l==null?void 0:l._claimed)===i)})})){t("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(n),t(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(r/1e3)} วินาที)`),e.action==="mute_video"?await Ft(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await Nt(e.sceneCount||2,e.currentScene||2,e.theme,e.scenePrompts||[]):t(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(n){t(`⚠️ checkAndRunPendingAction error: ${n.message}`)}}chrome.runtime.onMessage.addListener((n,e,s)=>{if((n==null?void 0:n.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,t("ได้รับคำสั่ง GENERATE_IMAGE"),s({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),bn(n).then(r=>{t(`✅ ระบบอัตโนมัติเสร็จ: ${r.message}`),Pt()}).catch(r=>{if(r instanceof tt||(r==null?void 0:r.name)==="NetflowAbortError"){t("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Re("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Mt()}catch{}}else console.error("[Netflow AI] Generate error:",r);Pt()}),!1;if((n==null?void 0:n.action)==="STOP_AUTOMATION")return t("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,s({success:!0,message:"Stop signal sent"}),!1;if((n==null?void 0:n.action)==="PING")return s({status:"ready"}),!1;if((n==null?void 0:n.action)==="CLICK_FIRST_IMAGE")return s({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{t("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await f(500);const r=rn();if(!r){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=r.getBoundingClientRect(),d=i.left+i.width/2,c=i.top+i.height/2;t(`การ์ดรูปที่ (${d.toFixed(0)}, ${c.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let a=0;a<2;a++){const l=document.elementFromPoint(d,c);l?(await ie(l),t(`คลิก ${a+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await ie(r),t(`คลิก ${a+1}/2 บนการ์ด (สำรอง)`)),await f(300)}t("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),t("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),wn()})();
