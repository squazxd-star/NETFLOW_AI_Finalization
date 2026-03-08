(function(){"use strict";const H={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let M=H.green,Q=null;function se(e){e&&H[e]&&(Q=e,M=H[e],Ct(),requestAnimationFrame(()=>jt()))}function le(){if(Q&&H[Q])return H[Q];try{const e=localStorage.getItem("netflow_app_theme");if(e&&H[e])return H[e]}catch{}return H.green}let P=0,N=255,O=65;function Ct(){const e=M.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(P=parseInt(e[1],16),N=parseInt(e[2],16),O=parseInt(e[3],16))}const St='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',Mt='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let S=null,I=null,V=null,It=0,lt=null,tt=null,ct=null,ht=0,j=!1,D=null,et=null,nt=null,xt=1,A=[];function At(e){const t=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let n=2;n<=e;n++)t.push({stepId:`scene${n}-prompt`,label:`ฉาก ${n} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${n}-gen`,label:`ฉาก ${n} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${n}-wait`,label:`ฉาก ${n} — กำลังสร้าง`,status:"waiting",progress:0});t.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return t}const at=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];A=At(1);function ce(e){const t=e.rgb,n=e.accentRgb,a=e.doneRgb,r=e.hex,i=e.accentHex,l=e.doneHex,s=(()=>{const h=r.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const o=g=>Math.min(255,g+80);return`#${[1,2,3].map(g=>o(parseInt(h[g],16)).toString(16).padStart(2,"0")).join("")}`})(),d=(()=>{const h=l.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const o=g=>Math.min(255,g+60);return`#${[1,2,3].map(g=>o(parseInt(h[g],16)).toString(16).padStart(2,"0")).join("")}`})(),c=r.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),m=c?Math.max(parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16),1):255,x=c?parseInt(c[1],16)/m:0,k=c?parseInt(c[2],16)/m:1,b=c?parseInt(c[3],16)/m:.25,w=h=>`${Math.round(x*h)}, ${Math.round(k*h)}, ${Math.round(b*h)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${t},0.15) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${n},0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 10% 80%, rgba(${t},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 90% 10%, rgba(${n},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(${w(18)},0.94) 0%, rgba(${w(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
        radial-gradient(ellipse at 100% 100%, rgba(${n},0.09) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 0%, rgba(${t},0.06) 0%, transparent 35%),
        radial-gradient(ellipse at 0% 100%, rgba(${n},0.06) 0%, transparent 35%);
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
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${n},0.18); }
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
        rgba(${n},0.054) 70px,
        rgba(${n},0.054) 71px
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
        rgba(${n},0.045) 113px,
        rgba(${n},0.045) 114px
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
    background: radial-gradient(circle, rgba(${n},0.16) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${n},0.12) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${t},0.18) 0%, rgba(${n},0.06) 40%, transparent 70%);
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
        linear-gradient(0deg, rgba(${n},0.025) 2px, transparent 2px),
        linear-gradient(90deg, rgba(${n},0.025) 2px, transparent 2px);
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
        radial-gradient(circle at 0% 75%, rgba(${n},0.05) 2px, transparent 2px),
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
        rgba(${n},0.06) 195deg,
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
        rgba(${n},0.035) 18px,
        rgba(${n},0.035) 19px
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
        radial-gradient(circle, rgba(${n},0.05) 1px, transparent 1px);
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
            rgba(${n},0.025) 40px, rgba(${n},0.025) 41px
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
        rgba(${n},0.035) 25px, rgba(${n},0.035) 26px
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
        linear-gradient(45deg, transparent 75%, rgba(${n},0.03) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(${n},0.03) 75%);
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
        radial-gradient(ellipse at 80% 20%, rgba(${n},0.12) 0%, transparent 45%),
        radial-gradient(ellipse at 60% 80%, rgba(${t},0.10) 0%, transparent 40%),
        radial-gradient(ellipse at 30% 10%, rgba(${n},0.08) 0%, transparent 50%),
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
        rgba(${n},0.04) 2.5%,
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
    background: rgba(${w(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${w(180)},0.05),
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
            0 0 200px rgba(${w(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${w(180)},0.08),
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
    filter: drop-shadow(0 0 18px rgba(${n},0.25));
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
    0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 18px rgba(${n},0.25)); }
    50%      { opacity: 0.6;  filter: drop-shadow(0 0 28px rgba(${n},0.4)); }
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
    background: ${r};
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
.nf-term-line.nf-term-done { color: rgba(${a}, 0.85); }
.nf-term-line.nf-term-error { color: rgba(239, 68, 68, 0.8); }
.nf-term-line.nf-term-waiting { color: rgba(255, 255, 255, 0.55); }

.nf-term-prefix {
    color: rgba(${t},0.92);
    font-weight: 700;
    user-select: none;
}

.nf-term-active .nf-term-prefix { color: ${r}; text-shadow: 0 0 6px rgba(${t},0.4); }

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
    background: rgba(${a}, 0.12);
    color: ${d};
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
    background: linear-gradient(180deg, rgba(${w(5)},0.95) 0%, rgba(${w(12)},0.98) 100%);
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

/* HUD Frame — hidden */
.nf-engine-frame {
    display: none;
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
    background: radial-gradient(circle, rgba(${t},0.25) 0%, rgba(${n},0.08) 40%, transparent 70%);
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
        drop-shadow(0 0 3px rgba(${t},0.7))
        drop-shadow(0 0 8px rgba(${t},0.3));
    opacity: 0.75;
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
    border-top: 1px solid rgba(${n},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${w(6)},0.75) 0%, rgba(${w(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${t},0.12), 0 0 24px rgba(${t},0.06), inset 0 1px 0 rgba(${n},0.08);
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
    color: rgba(${n},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${n},0.7),
        0 0 12px rgba(${n},0.35),
        0 0 20px rgba(${t},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${w(8)}, 0.88);
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
        0 0 30px rgba(${t},0.12),
        0 0 60px rgba(${t},0.06),
        inset 0 0 20px rgba(${t},0.03);
}

.nf-module.nf-done {
    box-shadow: 0 0 20px rgba(${a}, 0.1);
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
    color: ${r};
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
    background: ${r};
    box-shadow: 0 0 6px rgba(${t},0.6);
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
    background: linear-gradient(90deg, ${r}, ${s});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${t},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${l}, ${d});
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
    background: linear-gradient(90deg, ${r}, ${i});
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
    box-shadow: 0 0 6px rgba(${t},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${l}, ${d});
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
    background: rgba(${w(8)},0.8);
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
    background: rgba(${w(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${r};
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
        0 0 4px rgba(${t},0.6),
        0 0 10px rgba(${t},0.4),
        0 0 20px rgba(${t},0.2);
}
.nf-proc-active .nf-proc-num {
    color: ${r};
    text-shadow: 0 0 6px rgba(${t},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${r};
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
    color: ${d};
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

    `}function Tt(){V||(V=document.createElement("style"),V.id="netflow-overlay-styles",V.textContent=ce(M),document.head.appendChild(V))}function de(e){e.innerHTML="",A.forEach((t,n)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${t.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${n+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(a)})}function Rt(e,t){let s="";for(let k=0;k<20;k++){const b=k/20*Math.PI*2,w=(k+.2)/20*Math.PI*2,h=(k+.5)/20*Math.PI*2,o=(k+.8)/20*Math.PI*2,g=(k+1)/20*Math.PI*2;s+=`${k===0?"M":"L"}${(120+100*Math.cos(b)).toFixed(1)},${(120+100*Math.sin(b)).toFixed(1)} `,s+=`L${(120+100*Math.cos(w)).toFixed(1)},${(120+100*Math.sin(w)).toFixed(1)} `,s+=`L${(120+112*Math.cos(h)).toFixed(1)},${(120+112*Math.sin(h)).toFixed(1)} `,s+=`L${(120+100*Math.cos(o)).toFixed(1)},${(120+100*Math.sin(o)).toFixed(1)} `,s+=`L${(120+100*Math.cos(g)).toFixed(1)},${(120+100*Math.sin(g)).toFixed(1)} `}s+="Z";const d=14,c=72,m=62;let x="";for(let k=0;k<d;k++){const b=k/d*Math.PI*2,w=(k+.25)/d*Math.PI*2,h=(k+.75)/d*Math.PI*2,o=(k+1)/d*Math.PI*2;x+=`${k===0?"M":"L"}${(120+m*Math.cos(b)).toFixed(1)},${(120+m*Math.sin(b)).toFixed(1)} `,x+=`L${(120+c*Math.cos(w)).toFixed(1)},${(120+c*Math.sin(w)).toFixed(1)} `,x+=`L${(120+c*Math.cos(h)).toFixed(1)},${(120+c*Math.sin(h)).toFixed(1)} `,x+=`L${(120+m*Math.cos(o)).toFixed(1)},${(120+m*Math.sin(o)).toFixed(1)} `}return x+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="nfKGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="rgba(${e},0.9)"/>
                <stop offset="100%" stop-color="rgba(${t},0.7)"/>
            </linearGradient>
            <linearGradient id="nfKGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(${t},0.7)"/>
                <stop offset="100%" stop-color="rgba(${e},0.5)"/>
            </linearGradient>
        </defs>

        <!-- Outer ring (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${s}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="100" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.4"/>
        </g>

        <!-- Inner ring (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${x}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${m}" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${e},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${e},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function pe(){const e=document.createElement("div");e.id="netflow-engine-overlay",D=document.createElement("canvas"),D.id="nf-matrix-canvas",e.appendChild(D);const t=document.createElement("div");t.className="nf-pat-plasma",e.appendChild(t);for(let E=1;E<=5;E++){const v=document.createElement("div");v.className=`nf-ambient-orb nf-orb-${E}`,e.appendChild(v)}const n=document.createElement("div");n.className="nf-pat-data",e.appendChild(n);const a=document.createElement("div");a.className="nf-pat-diag-a",e.appendChild(a);const r=document.createElement("div");r.className="nf-pat-diag-b",e.appendChild(r);const i=document.createElement("div");i.className="nf-pat-circuit",e.appendChild(i);const l=document.createElement("div");l.className="nf-pat-honeycomb",e.appendChild(l);const s=document.createElement("div");s.className="nf-pat-binary",e.appendChild(s);const d=document.createElement("div");d.className="nf-pat-crosshatch",e.appendChild(d);const c=document.createElement("div");c.className="nf-pat-diamond",e.appendChild(c);const m=document.createElement("div");m.className="nf-pat-wave-h",e.appendChild(m);const x=document.createElement("div");x.className="nf-pat-radar",e.appendChild(x);const k=document.createElement("div");k.className="nf-pat-ripple-1",e.appendChild(k);const b=document.createElement("div");b.className="nf-pat-ripple-2",e.appendChild(b);const w=document.createElement("div");w.className="nf-pat-techscan",e.appendChild(w);const h=document.createElement("div");h.className="nf-center-glow",e.appendChild(h);const o=document.createElement("div");o.className="nf-pat-noise",e.appendChild(o);const g=document.createElement("div");g.className="nf-crt-scanlines",e.appendChild(g);const C=document.createElement("div");C.className="nf-vignette",e.appendChild(C);for(let E=0;E<3;E++){const v=document.createElement("div");v.className="nf-pulse-ring",e.appendChild(v)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(E=>{const v=document.createElement("div");v.className=`nf-corner-deco ${E}`,e.appendChild(v)});const G=document.createElement("button");G.className="nf-stop-btn",G.innerHTML='<span class="nf-stop-icon"></span> หยุด',G.onclick=()=>{var E;window.__NETFLOW_STOP__=!0;try{yt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((E=chrome.runtime)!=null&&E.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},e.appendChild(G);const W=document.createElement("button");W.className="nf-close-btn",W.textContent="✕ ซ่อน",W.onclick=()=>wt(),e.appendChild(W);const _=document.createElement("div");_.className="nf-layout";const u=document.createElement("div");u.className="nf-core-monitor",u.id="nf-core-monitor";const z=document.createElement("div");z.className="nf-core-header",z.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${A.length}</div>
    `,u.appendChild(z);const U=document.createElement("div");U.className="nf-terminal",U.id="nf-terminal",de(U),u.appendChild(U);const B=document.createElement("div");B.className="nf-engine-core",B.id="nf-engine-core";const F=document.createElement("div");F.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(E=>{const v=document.createElement("div");v.className=`nf-frame-corner ${E}`,F.appendChild(v)}),B.appendChild(F);const J="http://www.w3.org/2000/svg",Z=document.createElementNS(J,"svg");Z.setAttribute("class","nf-engine-waves"),Z.setAttribute("viewBox","0 0 560 140"),Z.setAttribute("preserveAspectRatio","none"),Z.id="nf-engine-waves";for(let E=0;E<4;E++){const v=document.createElementNS(J,"path");v.setAttribute("fill","none"),v.setAttribute("stroke-width",E<2?"1.5":"1"),v.setAttribute("stroke",E<2?`rgba(${M.rgb},${.14+E*.1})`:`rgba(${M.accentRgb},${.1+(E-2)*.08})`),v.setAttribute("data-wave-idx",String(E)),Z.appendChild(v)}B.appendChild(Z);const kt=document.createElement("div");kt.className="nf-engine-brand-inner",kt.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${Rt(M.rgb,M.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${Rt(M.rgb,M.accentRgb)}
        </div>
    `,B.appendChild(kt);const mt=document.createElement("div");mt.className="nf-engine-stats",mt.id="nf-engine-stats",mt.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([E,v,q])=>`<div class="nf-stat-item"><span class="nf-stat-label">${E}</span><span class="nf-stat-val" id="${v}">${q}</span></div>`).join(""),B.appendChild(mt),u.appendChild(B),_.appendChild(u);const Le=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];at.forEach((E,v)=>{const q=fe(E);q.classList.add(Le[v]),q.id=`nf-mod-${E.id}`,_.appendChild(q)}),e.appendChild(_);for(let E=0;E<30;E++){const v=document.createElement("div");v.className="nf-particle",v.style.left=`${5+Math.random()*90}%`,v.style.bottom=`${Math.random()*40}%`,v.style.animationDuration=`${3+Math.random()*5}s`,v.style.animationDelay=`${Math.random()*4}s`;const q=.3+Math.random()*.4,Et=.7+Math.random()*.3;v.style.background=`rgba(${Math.floor(P*Et)}, ${Math.floor(N*Et)}, ${Math.floor(O*Et)}, ${q})`,v.style.width=`${1+Math.random()*2}px`,v.style.height=v.style.width,e.appendChild(v)}return e}function fe(e){const t=document.createElement("div");t.className="nf-module";const n=document.createElement("div");n.className="nf-mod-header",n.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(n),e.steps.forEach(r=>{const i=document.createElement("div");i.className="nf-step",i.id=`nf-step-${r.id}`;let l="";r.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${r.id}" style="width: 0%"></div>
                </div>
            `),i.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${r.label}</span>
            ${l}
        `,t.appendChild(i)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(a),t}function ge(){It=Date.now(),lt=setInterval(()=>{const e=Math.floor((Date.now()-It)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),n=String(e%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${t}:${n}`);const r=document.getElementById("nf-stat-elapsed");r&&(r.textContent=`${t}:${n}`)},1e3)}function zt(){lt&&(clearInterval(lt),lt=null)}const ue=120,_t=160,Pt=.4;let Y=null,Nt=0,Ot=0,Bt=0,rt=[];function me(e,t){rt=[];for(let n=0;n<ue;n++){const a=Math.random();let r;a<.22?r=0:a<.4?r=1:a<.55?r=2:a<.68?r=3:a<.84?r=4:r=5;const i=Math.random()*e,l=Math.random()*t,s=50+Math.random()*220,d=Math.random()*Math.PI*2,c=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);rt.push({x:r===0?Math.random()*e:i+Math.cos(d)*s,y:r===0?Math.random()*t:l+Math.sin(d)*s,vx:(Math.random()-.5)*Pt,vy:(Math.random()-.5)*Pt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:r,oCx:i,oCy:l,oRadius:s,oAngle:d,oSpeed:c})}}function he(){if(!D)return;const e=D;if(et=e.getContext("2d"),!et)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,rt.length===0&&me(e.width,e.height)};t(),window.addEventListener("resize",t);let n=null,a=0,r=0,i=!1;function l(){if(!et||!D){nt=null;return}if(nt=requestAnimationFrame(l),i=!i,i)return;const s=et,d=D.width,c=D.height;s.fillStyle=`rgba(${P*.04|0},${N*.04|0},${O*.06|0},1)`,s.fillRect(0,0,d,c),(!n||a!==d||r!==c)&&(a=d,r=c,n=s.createRadialGradient(d*.5,c*.5,0,d*.5,c*.5,Math.max(d,c)*.6),n.addColorStop(0,`rgba(${P*.08|0},${N*.08|0},${O*.1|0},0.4)`),n.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=n,s.fillRect(0,0,d,c);const m=rt,x=m.length,k=_t*_t;for(let h=0;h<x;h++){const o=m[h];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>d&&(o.x=d,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>c&&(o.y=c,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const g=o.oAngle,C=o.oRadius*.7;o.x=o.oCx+C*Math.cos(g),o.y=o.oCy+C*Math.sin(g)*Math.cos(g),o.oCx+=Math.sin(g*.15)*.12,o.oCy+=Math.cos(g*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const g=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*g,o.y=o.oCy+Math.sin(o.oAngle)*g,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=d+30:o.x>d+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const g=o.oRadius+50;o.oCx<-g?o.oCx=d+g:o.oCx>d+g&&(o.oCx=-g),o.oCy<-g?o.oCy=c+g:o.oCy>c+g&&(o.oCy=-g)}}s.beginPath(),s.strokeStyle=`rgba(${P},${N},${O},0.06)`,s.lineWidth=.4;const b=new Path2D;for(let h=0;h<x;h++){const o=m[h];for(let g=h+1;g<x;g++){const C=m[g],G=o.x-C.x,W=o.y-C.y,_=G*G+W*W;_<k&&(1-_/k<.4?(s.moveTo(o.x,o.y),s.lineTo(C.x,C.y)):(b.moveTo(o.x,o.y),b.lineTo(C.x,C.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${P},${N},${O},0.18)`,s.lineWidth=.8,s.stroke(b),!Y||Nt!==P||Ot!==N||Bt!==O){Y=document.createElement("canvas");const h=48;Y.width=h,Y.height=h;const o=Y.getContext("2d"),g=o.createRadialGradient(h/2,h/2,0,h/2,h/2,h/2);g.addColorStop(0,`rgba(${P},${N},${O},0.9)`),g.addColorStop(.3,`rgba(${P},${N},${O},0.35)`),g.addColorStop(1,`rgba(${P},${N},${O},0)`),o.fillStyle=g,o.fillRect(0,0,h,h),Nt=P,Ot=N,Bt=O}const w=Y;for(let h=0;h<x;h++){const o=m[h],g=.6+.4*Math.sin(o.pulsePhase),C=o.radius*5*(.8+g*.4);s.globalAlpha=.5+g*.4,s.drawImage(w,o.x-C/2,o.y-C/2,C,C)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let h=0;h<x;h++){const o=m[h];if(o.radius>2){const g=.6+.4*Math.sin(o.pulsePhase),C=o.radius*(.8+g*.4)*.35;s.moveTo(o.x+C,o.y),s.arc(o.x,o.y,C,0,Math.PI*2)}}s.fill()}l()}function xe(){nt!==null&&(cancelAnimationFrame(nt),nt=null),D=null,et=null,rt=[]}let ot=null;const dt=560,be=140,Lt=dt/2,Ft=be/2,Dt=[];for(let e=0;e<=dt;e+=8){const t=Math.abs(e-Lt)/Lt;Dt.push(Math.pow(Math.min(1,t*1.6),.6))}const we=[0,1,2,3].map(e=>({amp:10+e*5,freq:(1.2+e*.35)*Math.PI*2/dt,off:e*.6,spd:.7+e*.12}));let bt=!1;function Gt(){if(tt=requestAnimationFrame(Gt),bt=!bt,bt)return;if(ht+=.07,!ot){const t=document.getElementById("nf-engine-waves");if(!t){tt=null;return}ot=Array.from(t.querySelectorAll("path"))}const e=[];for(let t=0;t<ot.length;t++){const n=we[t],a=ht*n.spd+n.off;e.length=0,e.push(`M 0 ${Ft}`);let r=0;for(let i=0;i<=dt;i+=8){const l=Ft+n.amp*Dt[r++]*Math.sin(i*n.freq+a);e.push(`L${i} ${l*10+.5|0}`)}ot[t].setAttribute("d",e.join(" "))}}function ye(){ht=0,Gt(),he(),ct=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),n=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),n&&(n.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function Ht(){tt!==null&&(cancelAnimationFrame(tt),tt=null),ct&&(clearInterval(ct),ct=null),ot=null,xe()}function Vt(){let e=0;const t=A.filter(c=>c.status!=="skipped").length;for(const c of A){const m=document.getElementById(`nf-proc-${c.stepId}`);if(!m)continue;m.className="nf-proc-row";const x=m.querySelector(".nf-proc-badge");switch(c.status){case"done":m.classList.add("nf-proc-done"),x&&(x.textContent="✅ done"),e++;break;case"active":m.classList.add("nf-proc-active"),x&&(x.textContent=c.progress!==void 0&&c.progress>0?`⏳ ${c.progress}%`:"⏳ active");break;case"error":m.classList.add("nf-proc-error"),x&&(x.textContent="❌ error");break;case"skipped":m.classList.add("nf-proc-skipped"),x&&(x.textContent="— skip");break;default:m.classList.add("nf-proc-waiting"),x&&(x.textContent="(queued)")}}const n=A.findIndex(c=>c.status==="active"),a=n>=0?n+1:e>=t&&t>0?A.length:e,r=document.getElementById("nf-step-counter");r&&(r.textContent=`${a}/${A.length}`);const i=document.querySelector(".nf-core-title-val"),l=document.querySelector(".nf-status-dot");e>=t&&t>0?(i&&(i.textContent="COMPLETE",i.style.color=M.doneHex),l&&(l.style.background=M.doneHex,l.style.boxShadow=`0 0 8px rgba(${M.doneRgb},0.7)`)):A.some(m=>m.status==="error")?(i&&(i.textContent="ERROR",i.style.color="#f87171"),l&&(l.style.background="#ef4444",l.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):A.some(m=>m.status==="active")&&i&&(i.textContent="ACTIVE",i.style.color=M.hex,i.style.textShadow=`0 0 10px rgba(${M.rgb},0.5)`);const s=document.getElementById("nf-terminal"),d=s==null?void 0:s.querySelector(".nf-proc-active");d&&s&&d.scrollIntoView({behavior:"smooth",block:"center"})}function Wt(){I&&I.isConnected||(Tt(),I=document.createElement("button"),I.id="nf-toggle-btn",I.className="nf-toggle-visible",I.innerHTML=j?St:Mt,I.title="ซ่อน/แสดง Netflow Overlay",I.onclick=()=>wt(),document.body.appendChild(I))}function wt(){S&&(Wt(),j?(S.classList.remove("nf-hidden"),S.classList.add("nf-visible"),I&&(I.innerHTML=Mt),j=!1):(S.classList.remove("nf-visible"),S.classList.add("nf-hidden"),I&&(I.innerHTML=St),j=!0))}const Ut={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function jt(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=Q;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"green"}catch{t="green"}const n=Ut[t]||Ut.green;let a;try{a=chrome.runtime.getURL(n)}catch{a=`/${n}`}const r=M.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${r},0.25) 0%, rgba(${r},0.12) 50%, rgba(${r},0.20) 100%)`,`url('${a}')`].join(", "),e.style.backgroundSize="auto, auto, 50%",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${r},0.45)`,e.style.boxShadow=`0 0 70px rgba(${r},0.22), 0 0 140px rgba(${r},0.1), inset 0 1px 0 rgba(${r},0.15)`}function ve(e=1){if(M=le(),Ct(),S&&S.isConnected){j&&wt();return}if(S&&!S.isConnected&&(S=null),V&&(V.remove(),V=null),Tt(),xt=e,A=At(e),e>1){const t=at.find(a=>a.id==="video");if(t){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let r=2;r<=e;r++)a.push({id:`scene${r}-prompt`,label:`Scene ${r} Prompt`,status:"waiting"}),a.push({id:`scene${r}-gen`,label:`Scene ${r} Generate`,status:"waiting"}),a.push({id:`scene${r}-wait`,label:`Scene ${r} รอผล`,status:"waiting",progress:0});t.steps=a}const n=at.find(a=>a.id==="render");if(n){const a=n.steps.find(i=>i.id==="download");a&&(a.label="ดาวน์โหลด 720p");const r=n.steps.find(i=>i.id==="upscale");r&&(r.label="Full Video")}}S=pe(),document.body.appendChild(S),j=!1,Wt(),ge(),ye(),requestAnimationFrame(()=>jt())}function qt(){zt(),Ht(),j=!1,S&&(S.classList.add("nf-fade-out"),setTimeout(()=>{S==null||S.remove(),S=null},500)),I&&(I.remove(),I=null)}const $e={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function ke(e,t,n){const a=A.findIndex(c=>c.status==="active"),r=A.filter(c=>c.status==="done").length,i=A.length,l=a>=0?a+1:r>=i?i:r,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${l}/${i}`);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=xt>1?`1/${xt}`:"1/1"),t==="active"){const c=document.getElementById("nf-stat-status"),m=$e[e]||e.toUpperCase();c&&(c.textContent=m)}else if(t==="done"&&r>=i){const c=document.getElementById("nf-stat-status");c&&(c.textContent="COMPLETE")}else if(t==="error"){const c=document.getElementById("nf-stat-status");c&&(c.textContent="ERROR")}if(n!==void 0&&n>0){const c=document.getElementById("nf-stat-progress");c&&(c.textContent=`${Math.min(100,n)}%`)}}function $(e,t,n){if(!S)return;for(const r of at)for(const i of r.steps)i.id===e&&(i.status=t,n!==void 0&&(i.progress=n));for(const r of A)r.stepId===e&&(r.status=t,n!==void 0&&(r.progress=n));const a=document.getElementById(`nf-step-${e}`);if(a&&(a.className="nf-step",t==="active"?a.classList.add("nf-step-active"):t==="done"?a.classList.add("nf-step-done"):t==="error"&&a.classList.add("nf-step-error")),ke(e,t,n),n!==void 0){const r=document.getElementById(`nf-bar-${e}`);r&&(r.style.width=`${Math.min(100,n)}%`)}Yt(),Vt()}function Ee(e=4e3){zt(),Ht(),Yt(),Vt(),setTimeout(()=>qt(),e)}function Yt(){for(const e of at){const t=e.steps.filter(d=>d.status!=="skipped").length,n=e.steps.filter(d=>d.status==="done").length,a=e.steps.some(d=>d.status==="active"),r=t>0?Math.round(n/t*100):0,i=document.getElementById(`nf-pct-${e.id}`);i&&(i.textContent=`${r}%`);const l=document.getElementById(`nf-modbar-${e.id}`);l&&(l.style.width=`${r}%`);const s=document.getElementById(`nf-mod-${e.id}`);s&&(s.classList.remove("nf-active","nf-done"),r>=100?s.classList.add("nf-done"):a&&s.classList.add("nf-active"))}}function yt(e){e.replace(/^\[Netflow AI\]\s*/,"")}const pt="7.1.0",it="[Netflow AI — Grok]";window.__NETFLOW_GROK_LOADED__&&console.log(`${it} Already loaded — skipping duplicate injection`),window.__NETFLOW_GROK_LOADED__=!0,(()=>{var r,i;const e=navigator.userAgent,t=((r=e.match(/Chrome\/(\d+)/))==null?void 0:r[1])||"?",n=/Mac/i.test(e)?"macOS":/Windows/i.test(e)?"Windows":"Linux",a=!!(typeof chrome<"u"&&((i=chrome==null?void 0:chrome.runtime)!=null&&i.id));console.log(`%c NetflowAI Grok v${pt} %c ${n} · Chrome ${t} %c ${a?"✅ Ready":"❌ No Runtime"}`,"background:#1d9bf0;color:#fff;font-weight:bold;padding:2px 6px;border-radius:4px 0 0 4px","background:#334155;color:#fff;padding:2px 6px",`background:${a?"#16a34a":"#dc2626"};color:#fff;padding:2px 6px;border-radius:0 4px 4px 0`)})();const f=e=>new Promise(t=>setTimeout(t,e)),p=e=>{console.log(`${it} ${e}`);try{yt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},y=e=>{console.warn(`${it} ⚠️ ${e}`);try{yt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}},ft=e=>{var t,n;try{if(!((t=chrome.runtime)!=null&&t.id)){console.warn(`${it} Extension context invalidated`);return}chrome.runtime.sendMessage(e)}catch(a){(n=a.message)!=null&&n.includes("Extension context invalidated")&&console.error(`${it} ❌ Extension context invalidated! Refresh this page.`)}},L=(e,t)=>{ft({type:"GROK_STATUS",status:e,detail:t})};let vt=!1;const gt=()=>vt,X=()=>{const e=document.querySelectorAll('[contenteditable="true"]');for(const n of e){const a=n,r=a.getBoundingClientRect();if(r.width>150&&r.bottom>window.innerHeight*.5)return a}const t=['[placeholder*="imagine" i]','[aria-label*="imagine" i]','[data-placeholder*="imagine" i]','textarea[placeholder*="imagine" i]',"textarea"];for(const n of t){const a=document.querySelector(n);if(a&&a.getBoundingClientRect().width>100)return a}for(const n of e){const a=n,r=a.getBoundingClientRect();if(r.width>100&&r.height>10)return a}return null},Xt=async(e=2e4)=>{p("⏳ Waiting for grok.com/imagine root page...");const t=Date.now();for(;Date.now()-t<e;){const n=window.location.href;if(/grok\.com\/imagine\/?$/.test(n)||/grok\.com\/imagine\/?(\?|#|$)/.test(n)){const r=X();if(r)return p(`✅ On imagine root, input found (${r.tagName})`),!0}const a=Math.round((Date.now()-t)/1e3);a%3===0&&a>0&&p(`Still waiting for imagine root... ${a}s`),await f(800)}return!1},T=(e,t)=>{const n=document.querySelectorAll(e),a=t.toLowerCase();for(const r of n)if((r.textContent||"").trim().toLowerCase().includes(a)&&r.offsetParent!==null)return r;return null},R=async e=>{var r,i;const t=e;(r=t.scrollIntoView)==null||r.call(t,{block:"center",behavior:"instant"}),await f(100),(i=t.focus)==null||i.call(t),t.click(),await f(50);const n=e.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:n.left+n.width/2,clientY:n.top+n.height/2};e.dispatchEvent(new MouseEvent("pointerdown",a)),e.dispatchEvent(new MouseEvent("mousedown",a)),e.dispatchEvent(new MouseEvent("pointerup",a)),e.dispatchEvent(new MouseEvent("mouseup",a)),e.dispatchEvent(new MouseEvent("click",a))},Kt=async e=>{const t=e.getBoundingClientRect(),n={bubbles:!0,cancelable:!0,clientX:t.left+t.width/2,clientY:t.top+t.height/2};e.dispatchEvent(new MouseEvent("mouseenter",{...n,bubbles:!1})),e.dispatchEvent(new MouseEvent("mouseover",n)),e.dispatchEvent(new MouseEvent("mousemove",n)),e.dispatchEvent(new PointerEvent("pointerenter",{...n,bubbles:!1})),e.dispatchEvent(new PointerEvent("pointerover",n)),e.dispatchEvent(new PointerEvent("pointermove",n))},ut=async(e,t)=>{var a,r;if(e.focus(),e.click(),await f(150),e.getAttribute("contenteditable")==="true"||e.isContentEditable)e.textContent="",e.focus(),await f(100),document.execCommand("selectAll",!1),document.execCommand("delete",!1),document.execCommand("insertText",!1,t),e.dispatchEvent(new InputEvent("input",{bubbles:!0,data:t,inputType:"insertText"})),e.dispatchEvent(new Event("change",{bubbles:!0}));else{const i=e,l=((a=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value"))==null?void 0:a.set)||((r=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value"))==null?void 0:r.set);l?l.call(i,t):i.value=t,i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}));for(const s of t.slice(-3))i.dispatchEvent(new InputEvent("input",{bubbles:!0,data:s,inputType:"insertText"}))}await f(400)},Jt=(e,t)=>{var n;try{if(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("blob:"))return y("base64ToFile received a URL, not base64 — use fetchImageAsFile instead"),null;let a="image/png",r;if(e.startsWith("data:")){const s=e.indexOf(",");if(s===-1)return y("Invalid data URL — no comma separator"),null;const d=e.substring(0,s);r=e.substring(s+1),a=((n=d.match(/:(.*?);/))==null?void 0:n[1])||"image/png"}else r=e;if(r=r.replace(/[\s\r\n]/g,""),!r||r.length<10)return y("base64 data too short or empty"),null;const i=atob(r),l=new Uint8Array(i.length);for(let s=0;s<i.length;s++)l[s]=i.charCodeAt(s);return new File([l],t,{type:a})}catch(a){return y("base64ToFile failed: "+a),null}},Ce=async(e,t)=>{try{p(`🌐 Fetching image from URL: ${e.substring(0,80)}...`);const n=await fetch(e,{mode:"cors"});if(!n.ok)return y(`Fetch failed: ${n.status} ${n.statusText}`),null;const a=await n.blob(),r=a.type||"image/png",i=new File([a],t,{type:r});return p(`✅ Fetched image: ${(i.size/1024).toFixed(1)} KB, type: ${r}`),i}catch(n){y("fetchImageAsFile failed: "+n);try{const a=document.createElement("img");a.crossOrigin="anonymous",a.src=e,await new Promise((s,d)=>{a.onload=()=>s(),a.onerror=()=>d(new Error("Image load failed")),setTimeout(()=>d(new Error("Image load timeout")),1e4)});const r=document.createElement("canvas");r.width=a.naturalWidth,r.height=a.naturalHeight;const i=r.getContext("2d");if(!i)return null;i.drawImage(a,0,0);const l=r.toDataURL("image/png");return Jt(l,t)}catch(a){return y("Canvas fallback also failed: "+a),null}}},Se=async(e,t)=>e.startsWith("http://")||e.startsWith("https://")||e.startsWith("blob:")?Ce(e,t):Jt(e,t),$t=()=>{var i,l,s;const e=X();if(e){const d=e.closest("form")||((l=(i=e.parentElement)==null?void 0:i.parentElement)==null?void 0:l.parentElement)||((s=e.parentElement)==null?void 0:s.parentElement)||e.parentElement;if(d){const c=e.getBoundingClientRect(),m=Array.from(d.querySelectorAll("button")),x=m.filter(k=>{const b=k.getBoundingClientRect();return Math.abs(b.top-c.top)<60&&b.left>=c.right-60});if(x.length>0)return x.sort((k,b)=>b.getBoundingClientRect().right-k.getBoundingClientRect().right),x[0];if(m.length>0)return m[m.length-1]}}const t=document.querySelector('button[type="submit"]');if(t)return t;const n=document.querySelectorAll("button");let a=null,r=0;for(const d of n){const c=d.getBoundingClientRect();c.bottom>window.innerHeight*.75&&c.right>r&&d.querySelector("svg")&&(a=d,r=c.right)}return a},Zt=async(e,t="image")=>{p(`📤 Injecting ${t} into Grok file input...`),L("uploading",`กำลังแนบรูป${t==="product"?"สินค้า":"ตัวละคร"}เข้า Grok...`);const n=await Se(e,`${t}_${Date.now()}.png`);if(!n)return y(`imageSourceToFile failed for ${t}`),!1;p(`📦 ${t} file ready: ${n.name} (${(n.size/1024).toFixed(1)} KB)`);const a=()=>{const l=document.querySelectorAll('input[type="file"]');for(const s of l){const d=s,c=d.accept||"";if(!c||c.includes("image")||c.includes("*"))return d}return l.length>0?l[0]:null};let r=a();if(!r){p("No file input found, searching for attach button...");const l=T('button, [role="button"], label',"Image")||document.querySelector('[aria-label*="image" i], [aria-label*="attach" i], [aria-label*="photo" i]');if(l){const s=HTMLInputElement.prototype,d=s.click;s.click=function(){if(this.type==="file"){r=this,p("Captured file input via button click intercept");return}return d.call(this)},l.click(),await f(300),s.click=d}r||(r=a())}if(!r){y("Could not find file input — trying drag-and-drop fallback");const l=X()||document.querySelector("main")||document.body,s=new DataTransfer;return s.items.add(n),l.dispatchEvent(new DragEvent("dragenter",{bubbles:!0,dataTransfer:s})),await f(100),l.dispatchEvent(new DragEvent("dragover",{bubbles:!0,dataTransfer:s})),await f(100),l.dispatchEvent(new DragEvent("drop",{bubbles:!0,dataTransfer:s})),await f(2e3),!1}const i=new DataTransfer;return i.items.add(n),r.files=i.files,r.dispatchEvent(new Event("change",{bubbles:!0})),r.dispatchEvent(new Event("input",{bubbles:!0})),p(`✅ File injected: ${n.name} (${(n.size/1024).toFixed(1)} KB)`),await f(2500),!0},Qt=()=>{const e=new Set;document.querySelectorAll("img").forEach(n=>{n.src&&n.getBoundingClientRect().width>50&&e.add(n.src)});const t=new Set;return document.querySelectorAll("video").forEach(n=>{n.src&&t.add(n.src),n.querySelectorAll("source").forEach(a=>{a.src&&t.add(a.src)})}),{imgs:e,videos:t,count:e.size+t.size}},Me=async(e,t=18e4)=>{p("⏳ Waiting for new content to appear...");const n=Date.now();for(;Date.now()-n<t;){if(gt())return!1;const a=Qt();let r=0;if(a.imgs.forEach(l=>{e.imgs.has(l)||r++}),a.videos.forEach(l=>{e.videos.has(l)||r++}),r>0)return p(`✅ Found ${r} new content item(s)`),await f(3e3),!0;const i=Math.round((Date.now()-n)/1e3);i%10===0&&i>0&&p(`⏳ Still waiting... ${i}s`),await f(2e3)}return y("Timed out waiting for new content"),!1},Ie=(e=80,t=80)=>{const a=(document.querySelector("main")||document.body).querySelectorAll("img"),r=[];for(const i of a){const l=i.getBoundingClientRect();if(l.width<e||l.height<t||l.top<0||l.bottom>window.innerHeight+200)continue;const s=i.getAttribute("src")||"";s.includes("avatar")||s.includes("icon")||s.includes("logo")||s.includes("favicon")||s.includes("profile")||s.includes("emoji")||r.push(i)}return r.sort((i,l)=>{const s=i.getBoundingClientRect(),d=l.getBoundingClientRect();return d.width*d.height-s.width*s.height}),r},Ae=async(e=45e3)=>{p("🖼️ Looking for a generated image to hover...");const t=Date.now();let n=0;for(;Date.now()-t<e;){n++;const a=n<=3?120:n<=6?80:50,r=Ie(a,a);if(r.length>0){const l=r[0],s=l.closest("a, div[class], article, li, [data-testid]")||l;p(`Found ${r.length} image(s) (attempt ${n}), hovering on first one`),l.scrollIntoView({block:"center",behavior:"instant"}),await f(300),await Kt(s),await f(600),await Kt(l),await f(800);const d=l.getBoundingClientRect();for(let c=0;c<3;c++){const m=d.left+d.width*(.3+c*.2),x=d.top+d.height*.5;l.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:m,clientY:x})),s.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:m,clientY:x})),await f(200)}return await f(1e3),s}const i=Math.round((Date.now()-t)/1e3);i%5===0&&p(`⏳ Still looking for generated image... ${i}s`),await f(2e3)}return y("No suitable images found after "+Math.round(e/1e3)+"s"),null},te=()=>{const e='button, a, div[role="button"], div[role="menuitem"], span, li, [class*="option"], [class*="action"], [class*="menu-item"]';let t=T(e,"Make video");if(t||(t=T(e,"Animate Image"),t))return t;if(t=T(e,"Animate"),t){const a=(t.textContent||"").trim();if(a.length<80&&/animate/i.test(a))return t}if(t=T(e,"Turn an image to a video"),t)return t.closest('button, a, div[role="button"], li, [class*="option"]')||t;const n=document.querySelectorAll("*");for(const a of n){if(a.children.length>5)continue;const r=(a.textContent||"").trim();if(r.length>0&&r.length<60&&/animate\s*image|make\s*video/i.test(r)){if(a.offsetParent===null)continue;return a}}return null},Te=async(e=8)=>{p('🎬 Looking for "Make video" / "Animate Image" button...'),L("animating","กำลังหาปุ่ม Make video...");const t=Date.now(),n=6e4;for(let a=0;a<e&&Date.now()-t<n;a++){const r=te();if(r)return p(`Found "Make video" button directly (attempt ${a})`),await R(r),await f(2e3),st()||K()||await f(2e3),!0;if(a>=1&&(p(`Trying hover strategy (attempt ${a})...`),await Ae(1e4))){await f(1500);const l=te();if(l)return p("Found button after hover"),await R(l),await f(3e3),!0}await f(3e3)}return y('Could not find "Make video" button'),!1},st=()=>/\/(post|video)\//i.test(window.location.href),K=()=>{var t;const e=document.querySelectorAll("video");for(const n of e){if(!(n.src||((t=n.querySelector("source[src]"))==null?void 0:t.getAttribute("src"))||""))continue;const r=n.getBoundingClientRect();if(r.width>200&&r.height>200)return n}return null},ee=()=>{const e=document.body.innerText;if(/generating\s*\d+%/i.test(e))return!0;const t=document.querySelectorAll('[role="progressbar"], progress');for(const a of t)if(a.getBoundingClientRect().width>50)return!0;return!!T("button","Cancel")},ne=()=>{const e=document.querySelectorAll('[role="progressbar"]');for(const r of e){const i=r.getAttribute("aria-valuenow");if(i)return parseFloat(i)}const n=document.body.innerText.match(/generating\s*(\d+)%/i);if(n)return parseInt(n[1],10);const a=document.querySelectorAll('[class*="progress"] > div, [class*="bar"]');for(const r of a){const i=r.style.width;if(i&&i.endsWith("%")){const l=parseFloat(i);if(l>0&&l<=100)return l}}return-1},Re=async(e=6e5)=>{p("⏳ Waiting for video to be ready (up to 10 min)...");const t=Date.now();for(;Date.now()-t<e;){if(gt())return!1;if(ee()){const r=ne();if(r>=0){const i=Math.round((Date.now()-t)/1e3);i%10===0&&p(`⏳ Video generating: ${r}% (${i}s)`);try{$("vid-wait","active",r)}catch{}}await f(3e3);continue}const n=K();if(n){if(n.readyState>=2)return p("✅ Video ready (readyState >= 2)"),!0;if(await f(2e3),n.readyState>=2)return p("✅ Video ready after brief wait"),!0}if(T("button, a","Download"))return p("✅ Download button found — video likely ready"),!0;await f(3e3)}return y("⏰ Timed out waiting for video"),!1},ae=()=>{if(!st())return y("getVideoUrl called but not on /post/ page"),null;const e=K();if(e!=null&&e.src)return e.src;if(e){const a=e.querySelector("source[src]");if(a)return a.src}const t=document.querySelector('a[download], a[href*="download"]');if(t!=null&&t.href)return t.href;const n=T("button, a","Download");return n!=null&&n.href?n.href:window.location.href},ze=()=>{let e=T('button, a, div[role="button"], [role="menuitem"]',"Extend video");return e||(e=document.querySelector('[aria-label*="Extend" i]'),e&&e.offsetParent!==null)?e:null},_e=()=>{const e=K();if(!e)return null;const t=e.getBoundingClientRect(),a=Array.from(document.querySelectorAll("button")).filter(r=>{const i=r.getBoundingClientRect();return!(i.width<10||i.width>60||i.height<10||i.height>60||i.left<t.right-60||i.top<t.top-50||i.bottom>t.bottom+50||!r.querySelector("svg")&&!/⋯|\.\.\.|\u22EF|\u2026|more/i.test(r.textContent||""))});return a.length===0?null:(a.sort((r,i)=>i.getBoundingClientRect().bottom-r.getBoundingClientRect().bottom),a[0])},re=async(e=6e4)=>{p("🔄 Looking for Extend video button...");const t=Date.now();for(;Date.now()-t<e;){if(gt())return!1;if(!st())return y("Not on /post/ page — aborting extend"),!1;const n=ze();if(n)return p('Found direct "Extend video" button'),await R(n),await f(2e3),!0;const a=_e();if(a){p("Found ⋯ menu button, clicking..."),await R(a),await f(1e3);for(let r=0;r<5;r++){const i=T('[role="menuitem"], [role="option"], button, a, div[class*="menu"], li',"Extend video");if(i)return p('Found "Extend video" in dropdown'),await R(i),await f(2e3),!0;await f(500)}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),await f(500)}await f(3e3)}return y("Could not find Extend video option"),!1},oe=async(e=15e3)=>{p("🔍 Looking for Extend prompt input...");const t=Date.now();for(;Date.now()-t<e;){const n=X();if(n)return n;const a=document.querySelector("textarea");if(a&&a.offsetParent!==null)return a;await f(1e3)}return null},ie=async(e,t,n=6e5)=>{var i;p(`⏳ Waiting for extended video (Scene ${t})...`);const a=Date.now(),r=`scene${t}-wait`;for(;Date.now()-a<n;){if(gt())return!1;if(ee()){const d=ne();if(d>=0)try{$(r,"active",d)}catch{}await f(3e3);continue}const l=K();if(l){const d=l.src||((i=l.querySelector("source"))==null?void 0:i.getAttribute("src"))||"";if(d&&d!==e)return p(`✅ Extended video ready (Scene ${t}) — src changed`),!0}if(!st())return y("Left /post/ page during extend wait"),!1;const s=Math.round((Date.now()-a)/1e3);s%15===0&&s>0&&p(`⏳ Still waiting for extend... ${s}s`),await f(3e3)}return y(`⏰ Timed out waiting for extended video (Scene ${t})`),!1},Pe=async(e,t)=>{var k;const n=e+1,a=`scene${n}-prompt`,r=`scene${n}-gen`,i=`scene${n}-wait`;if(p(`═══ Scene ${n}: Starting Extend ═══`),!st())return y(`Not on /post/ page — cannot extend for Scene ${n}`),!1;const l=K(),s=(l==null?void 0:l.src)||((k=l==null?void 0:l.querySelector("source"))==null?void 0:k.getAttribute("src"))||null;try{$(a,"active")}catch{}if(p(`Scene ${n}: Clicking Extend...`),!await re(6e4)){y(`Failed to click Extend for Scene ${n}`);try{$(a,"error")}catch{}return!1}try{$(a,"done")}catch{}try{$(r,"active")}catch{}p(`Scene ${n}: Typing script...`);const c=await oe(15e3);if(!c){y(`No prompt input for Scene ${n}`);try{$(r,"error")}catch{}return!1}await ut(c,t),await f(500);const m=$t();m?await R(m):c.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:!0})),await f(2e3);try{$(r,"done")}catch{}try{$(i,"active",0)}catch{}if(p(`Scene ${n}: Waiting for video generation...`),!await ie(s,n,6e5)){y(`Scene ${n}: First attempt failed, retrying...`);const b=t.substring(0,Math.min(t.length,200));for(let w=0;w<2;w++){if(!await re(3e4))continue;const o=await oe(1e4);if(!o)continue;await ut(o,b),await f(500);const g=$t();if(g?await R(g):o.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:!0})),await f(2e3),await ie(s,n,6e5)){try{$(i,"done",100)}catch{}return!0}}try{$(i,"error")}catch{}return!1}try{$(i,"done",100)}catch{}return!0},Ne=e=>{const t=(e||"").toLowerCase();return/fitness|gym|sport|workout|protein/i.test(t)?"in a modern gym setting with equipment and mirrors":/beauty|skincare|makeup|cream|serum/i.test(t)?"in a spa-like vanity setting with soft lighting and mirror":/perfume|fragrance|cologne|scent/i.test(t)?"in a luxury setting with golden bokeh and soft focus":/fashion|clothing|dress|shirt|shoes/i.test(t)?"in an editorial fashion setting with dramatic lighting":/food|snack|drink|coffee|tea|restaurant/i.test(t)?"in a stylish kitchen or café setting with warm lighting":/tech|phone|laptop|gadget|computer/i.test(t)?"in a clean modern workspace with ambient lighting":/home|furniture|decor|kitchen|bed/i.test(t)?"in a beautifully designed home interior":/pet|dog|cat|animal/i.test(t)?"in a warm, pet-friendly environment":/car|vehicle|auto|motor/i.test(t)?"in a sleek showroom or scenic road setting":/baby|kid|child|toy/i.test(t)?"in a safe, colorful, child-friendly space":"in a professional studio setting with clean background"},Oe=async e=>{const{imagePrompt:t,videoPrompt:n,characterImage:a,productImage:r,aspectRatio:i,sceneCount:l,sceneScripts:s,productName:d,theme:c,resolution:m,duration:x}=e;try{c&&se(c),ve(l,"grok")}catch(u){p(`⚠️ Overlay error: ${u.message}`)}if(p("Step 1/8: Waiting for Grok Imagine page..."),L("step_1","รอหน้า Grok Imagine..."),!await Xt(25e3)&&!/grok\.com\/imagine/i.test(window.location.href)&&(p("Navigating to /imagine..."),window.location.href="https://grok.com/imagine",await f(3e3),!await Xt(15e3)))return y("Could not reach Grok Imagine page"),{success:!1};p("Step 2/8: Uploading images..."),L("step_2","กำลังแนบรูป...");try{$("upload-char","active")}catch{}a&&(await Zt(a,"character")?p("✅ Character image uploaded"):y("Character image upload failed (continuing)"));try{$("upload-char","done")}catch{}try{$("upload-prod","active")}catch{}r&&(await Zt(r,"product")?p("✅ Product image uploaded"):y("Product image upload failed (continuing)"));try{$("upload-prod","done")}catch{}p("Step 3/8: Typing image prompt..."),L("step_3","กำลังใส่ prompt...");try{$("img-prompt","active")}catch{}let b=n||t||"";if(d){const u=Ne(d);u&&!b.includes(u)&&(b=b+" "+u)}if(b.length>500&&(b=b.substring(0,500)),!b)return y("No prompt text provided"),{success:!1};let w=X();if(w||(await f(2e3),w=X()),!w)return y("Could not find prompt input"),{success:!1};await ut(w,b),await f(500),(w.textContent||w.value||"").trim().length===0&&(p("Retrying prompt entry..."),await ut(w,b),await f(500));try{$("img-prompt","done")}catch{}p("Step 4/8: Clicking Generate..."),L("step_4","กด Generate...");try{$("img-generate","active")}catch{}const o=Qt(),g=$t();g?await R(g):w.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:!0})),await f(2e3);try{$("img-generate","done")}catch{}p("Step 5/8: Waiting for image generation..."),L("step_5","กำลังรอสร้างภาพ...");try{$("img-wait","active",0)}catch{}if(!await Me(o,3e5)){y("No new content after 5 minutes");try{$("img-wait","error")}catch{}return{success:!1}}await f(3e3);try{$("img-wait","done",100)}catch{}p('Step 6/8: Clicking "Make video"...'),L("step_6","กำลังคลิก Make video...");try{$("animate","active")}catch{}if(!await Te(8)){y('Could not find/click "Make video" button');try{$("animate","error")}catch{}return{success:!1}}try{$("animate","done")}catch{}p("Step 7/8: Setting aspect ratio..."),L("step_7","ตั้ง Aspect Ratio...");try{$("vid-prompt","active")}catch{}if(i){const u=document.querySelector('button[aria-label="Aspect Ratio"]');if(u){const z=(u.textContent||"").trim();if(z.includes(i))p(`Aspect ratio already ${i} — skipping`);else{p(`Opening Aspect Ratio dropdown (current: ${z})...`),await R(u),await f(800);const U=document.querySelectorAll('[role="menuitemradio"], [role="menuitem"], [role="option"], [data-radix-collection-item]');let B=!1;for(const F of U){const J=(F.textContent||"").trim();if(J===i||J.replace(/\s/g,"")===i.replace(/\s/g,"")){p(`Selecting aspect ratio: "${J}"`),await R(F),B=!0;break}}if(!B){const F=T('[role="menuitemradio"], [role="menuitem"], [role="option"], div, span',i);F?(await R(F),p(`Fallback: selected ${i}`)):y(`Could not find aspect ratio option: ${i}`)}await f(600)}}else{const z=T('button, div[role="button"], span',i);z?(await R(z),p(`Direct click aspect ratio: ${i}`),await f(600)):y("Could not find Aspect Ratio trigger button")}}if(m){const u=T('button, div[role="button"], span, [class*="option"]',m);u?(p(`Setting resolution: ${m}`),await R(u),await f(600)):p(`Resolution button "${m}" not found — may already be set`)}if(x){const u=T('button, div[role="button"], span, [class*="option"]',x);u?(p(`Setting duration: ${x}`),await R(u),await f(600)):p(`Duration button "${x}" not found — may already be set`)}try{$("vid-prompt","done")}catch{}p("Step 8/8: Waiting for video generation..."),L("step_8","กำลังสร้างวิดีโอฉาก 1...");try{$("vid-wait","active",0)}catch{}if(!await Re(6e5)){y("Video generation timed out");try{$("vid-wait","error")}catch{}return{success:!1}}try{$("vid-wait","done",100)}catch{}if(p("✅ Scene 1 video ready"),l>1)for(let u=1;u<l;u++){const z=u+1;p(`═══ Starting Scene ${z} ═══`);const U=s[u]||s[0]||n;if(!await Pe(u,U))return y(`Scene ${z} extend failed — using Scene 1 result`),{success:!0,videoUrl:ae()||void 0};p(`✅ Scene ${z} complete`)}const _=ae();return p(`🎬 Pipeline complete! Video URL: ${(_==null?void 0:_.substring(0,80))||"N/A"}`),{success:!0,videoUrl:_||void 0}};async function Be(e){p("═══ Grok Automation Started ═══"),p(`Engine: Grok v${pt} | Scenes: ${e.sceneCount||1} | Orientation: ${e.orientation||"vertical"}`);const t=Math.min(3,Math.max(1,e.sceneCount||1));let n=[];if(e.videoScenePrompts&&e.videoScenePrompts.length>0)n=e.videoScenePrompts;else if(e.videoPrompt){const r=e.videoPrompt.split(/\n{2,}/).map(i=>i.trim()).filter(i=>i.length>0);n=Array.from({length:t},(i,l)=>r[l]||r[0]||e.videoPrompt)}const a={imagePrompt:e.imagePrompt||e.videoPrompt||"",videoPrompt:e.videoPrompt||e.imagePrompt||"",characterImage:e.characterImage,productImage:e.productImage,aspectRatio:e.grokAspectRatio||(e.orientation==="horizontal"?"16:9":"9:16"),sceneCount:t,sceneScripts:n,productName:e.productName,autoPostTikTok:e.autoPostTikTok,theme:e.theme,resolution:e.grokResolution||"480p",duration:e.grokDuration||"6s"};try{const r=await Oe(a);if(r.success){ft({type:"VIDEO_GENERATION_COMPLETE",videoUrl:r.videoUrl,sceneCount:t,source:"grok"});try{$("complete","done")}catch{}try{Ee(8e3)}catch{}return{success:!0,message:`วิดีโอสำเร็จ (${t} ฉาก)`,step:"complete"}}else return ft({type:"VIDEO_GENERATION_ERROR",error:"Pipeline failed",source:"grok"}),{success:!1,message:"Grok pipeline failed — ลองใหม่อีกครั้ง",step:"pipeline-error"}}catch(r){return y(`Pipeline crashed: ${r.message}`),ft({type:"VIDEO_GENERATION_ERROR",error:r.message,source:"grok"}),{success:!1,message:`Error: ${r.message}`,step:"error"}}}chrome.runtime.onMessage.addListener((e,t,n)=>{if(e!=null&&e.action){if(e.action==="PING"){n({status:"ready",engine:"grok",version:pt,url:window.location.href});return}if(e.action==="STOP_AUTOMATION"){vt=!0,p("⛔ ผู้ใช้สั่งหยุด automation");try{qt()}catch{}n({success:!0,message:"Stopped"});return}if(e.action==="GENERATE_IMAGE")return vt=!1,Be(e).then(a=>n(a),a=>n({success:!1,message:`Error: ${a.message}`,step:"error"})),!0}}),p(`✅ Grok content script v${pt} loaded on: ${window.location.href}`)})();
