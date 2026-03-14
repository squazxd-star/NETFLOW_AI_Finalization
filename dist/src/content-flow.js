(function(){"use strict";const ht={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let at=ht.green,Mt=null;function Ut(e){e&&ht[e]&&(Mt=e,at=ht[e],fe(),requestAnimationFrame(()=>De()))}function Ye(){if(Mt&&ht[Mt])return ht[Mt];try{const e=localStorage.getItem("netflow_app_theme");if(e&&ht[e])return ht[e]}catch{}return ht.green}let ct=0,lt=255,dt=65;function fe(){const e=at.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(ct=parseInt(e[1],16),lt=parseInt(e[2],16),dt=parseInt(e[3],16))}const ge='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',me='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let U=null,it=null,nt=null,he=0,qt=null,At=null,Ht=null,Xt=0,xt=!1,ft=null,Rt=null,Dt=null,kt=1,Z=[];function Gt(e){const t=[{stepId:"open-flow",label:"เปิด Google Flow",status:"waiting"},{stepId:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let o=2;o<=e;o++)t.push({stepId:`scene${o}-prompt`,label:`ฉาก ${o} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${o}-gen`,label:`ฉาก ${o} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${o}-wait`,label:`ฉาก ${o} — กำลังสร้าง`,status:"waiting",progress:0});t.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return t}const pt=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"open-flow",label:"เปิด Google Flow",status:"waiting"},{id:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];Z=Gt(1);function Ke(e){const t=e.rgb,o=e.accentRgb,s=e.doneRgb,a=e.hex,d=e.accentHex,i=e.doneHex,c=(()=>{const w=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!w)return"#4ade80";const l=g=>Math.min(255,g+80);return`#${[1,2,3].map(g=>l(parseInt(w[g],16)).toString(16).padStart(2,"0")).join("")}`})(),r=(()=>{const w=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!w)return"#4ade80";const l=g=>Math.min(255,g+60);return`#${[1,2,3].map(g=>l(parseInt(w[g],16)).toString(16).padStart(2,"0")).join("")}`})(),p=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),f=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,h=p?parseInt(p[1],16)/f:0,S=p?parseInt(p[2],16)/f:1,N=p?parseInt(p[3],16)/f:.25,k=w=>`${Math.round(h*w)}, ${Math.round(S*w)}, ${Math.round(N*w)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${t},0.15) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${o},0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 10% 80%, rgba(${t},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 90% 10%, rgba(${o},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(${k(18)},0.94) 0%, rgba(${k(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
        radial-gradient(ellipse at 100% 100%, rgba(${o},0.09) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 0%, rgba(${t},0.06) 0%, transparent 35%),
        radial-gradient(ellipse at 0% 100%, rgba(${o},0.06) 0%, transparent 35%);
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
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${o},0.18); }
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
        rgba(${o},0.054) 70px,
        rgba(${o},0.054) 71px
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
        rgba(${o},0.045) 113px,
        rgba(${o},0.045) 114px
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
    background: radial-gradient(circle, rgba(${o},0.16) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${o},0.12) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${t},0.18) 0%, rgba(${o},0.06) 40%, transparent 70%);
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
        linear-gradient(0deg, rgba(${o},0.025) 2px, transparent 2px),
        linear-gradient(90deg, rgba(${o},0.025) 2px, transparent 2px);
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
        radial-gradient(circle at 0% 75%, rgba(${o},0.05) 2px, transparent 2px),
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
        rgba(${o},0.06) 195deg,
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
        rgba(${o},0.035) 18px,
        rgba(${o},0.035) 19px
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
        radial-gradient(circle, rgba(${o},0.05) 1px, transparent 1px);
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
            rgba(${o},0.025) 40px, rgba(${o},0.025) 41px
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
        rgba(${o},0.035) 25px, rgba(${o},0.035) 26px
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
        linear-gradient(45deg, transparent 75%, rgba(${o},0.03) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(${o},0.03) 75%);
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
        radial-gradient(ellipse at 80% 20%, rgba(${o},0.12) 0%, transparent 45%),
        radial-gradient(ellipse at 60% 80%, rgba(${t},0.10) 0%, transparent 40%),
        radial-gradient(ellipse at 30% 10%, rgba(${o},0.08) 0%, transparent 50%),
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
        rgba(${o},0.04) 2.5%,
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
    background: rgba(${k(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${k(180)},0.05),
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
            0 0 200px rgba(${k(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${k(180)},0.08),
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
    filter: drop-shadow(0 0 18px rgba(${o},0.25));
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
    0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 18px rgba(${o},0.25)); }
    50%      { opacity: 0.6;  filter: drop-shadow(0 0 28px rgba(${o},0.4)); }
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
    color: ${c};
    font-weight: 700;
    text-shadow: 0 0 10px rgba(${t},0.5);
}

.nf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${a};
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
.nf-term-line.nf-term-done { color: rgba(${s}, 0.85); }
.nf-term-line.nf-term-error { color: rgba(239, 68, 68, 0.8); }
.nf-term-line.nf-term-waiting { color: rgba(255, 255, 255, 0.55); }

.nf-term-prefix {
    color: rgba(${t},0.92);
    font-weight: 700;
    user-select: none;
}

.nf-term-active .nf-term-prefix { color: ${a}; text-shadow: 0 0 6px rgba(${t},0.4); }

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
    color: ${c};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${t},0.3);
}

@keyframes nf-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.nf-term-done .nf-term-status {
    background: rgba(${s}, 0.12);
    color: ${r};
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
    background: linear-gradient(180deg, rgba(${k(5)},0.95) 0%, rgba(${k(12)},0.98) 100%);
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
    background: radial-gradient(circle, rgba(${t},0.25) 0%, rgba(${o},0.08) 40%, transparent 70%);
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
    border: 1px solid rgba(${t},0.25);
    border-top: 1px solid rgba(${o},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${k(6)},0.75) 0%, rgba(${k(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${t},0.12), 0 0 24px rgba(${t},0.06), inset 0 1px 0 rgba(${o},0.08);
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
    color: rgba(${o},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${o},0.7),
        0 0 12px rgba(${o},0.35),
        0 0 20px rgba(${t},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${k(8)}, 0.88);
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
    box-shadow: 0 0 20px rgba(${s}, 0.1);
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
    color: ${a};
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
    background: ${a};
    box-shadow: 0 0 6px rgba(${t},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: ${i};
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
    background: linear-gradient(90deg, ${a}, ${c});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${t},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${i}, ${r});
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
    background: linear-gradient(90deg, ${a}, ${d});
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
    box-shadow: 0 0 6px rgba(${t},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${i}, ${r});
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
    background: rgba(${k(8)},0.8);
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
    background: rgba(${k(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${a};
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
    color: ${a};
    text-shadow: 0 0 6px rgba(${t},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${a};
    box-shadow: 0 0 6px rgba(${t},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}
.nf-proc-active .nf-proc-badge {
    background: rgba(${t},0.12);
    color: ${c};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${t},0.3);
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
    background: ${i};
    box-shadow: 0 0 5px rgba(${s},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${s},0.1);
    color: ${r};
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

    `}function Qt(){nt||(nt=document.createElement("style"),nt.id="netflow-overlay-styles",nt.textContent=Ke(at),document.head.appendChild(nt))}function be(e){e.innerHTML="",Z.forEach((t,o)=>{const s=document.createElement("div");s.className="nf-proc-row nf-proc-waiting",s.id=`nf-proc-${t.stepId}`,s.innerHTML=`
            <span class="nf-proc-num">${o+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(s)})}function we(){const e=document.getElementById("nf-terminal");if(!e)return;be(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${Z.length}`)}function xe(e,t){let c="";for(let S=0;S<20;S++){const N=S/20*Math.PI*2,k=(S+.2)/20*Math.PI*2,w=(S+.5)/20*Math.PI*2,l=(S+.8)/20*Math.PI*2,g=(S+1)/20*Math.PI*2;c+=`${S===0?"M":"L"}${(120+100*Math.cos(N)).toFixed(1)},${(120+100*Math.sin(N)).toFixed(1)} `,c+=`L${(120+100*Math.cos(k)).toFixed(1)},${(120+100*Math.sin(k)).toFixed(1)} `,c+=`L${(120+112*Math.cos(w)).toFixed(1)},${(120+112*Math.sin(w)).toFixed(1)} `,c+=`L${(120+100*Math.cos(l)).toFixed(1)},${(120+100*Math.sin(l)).toFixed(1)} `,c+=`L${(120+100*Math.cos(g)).toFixed(1)},${(120+100*Math.sin(g)).toFixed(1)} `}c+="Z";const r=14,p=72,f=62;let h="";for(let S=0;S<r;S++){const N=S/r*Math.PI*2,k=(S+.25)/r*Math.PI*2,w=(S+.75)/r*Math.PI*2,l=(S+1)/r*Math.PI*2;h+=`${S===0?"M":"L"}${(120+f*Math.cos(N)).toFixed(1)},${(120+f*Math.sin(N)).toFixed(1)} `,h+=`L${(120+p*Math.cos(k)).toFixed(1)},${(120+p*Math.sin(k)).toFixed(1)} `,h+=`L${(120+p*Math.cos(w)).toFixed(1)},${(120+p*Math.sin(w)).toFixed(1)} `,h+=`L${(120+f*Math.cos(l)).toFixed(1)},${(120+f*Math.sin(l)).toFixed(1)} `}return h+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${c}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="100" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.4"/>
        </g>

        <!-- Inner ring (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${h}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${f}" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${e},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${e},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Xe(){const e=document.createElement("div");e.id="netflow-engine-overlay",ft=document.createElement("canvas"),ft.id="nf-matrix-canvas",e.appendChild(ft);const t=document.createElement("div");t.className="nf-pat-plasma",e.appendChild(t);for(let y=1;y<=5;y++){const $=document.createElement("div");$.className=`nf-ambient-orb nf-orb-${y}`,e.appendChild($)}const o=document.createElement("div");o.className="nf-pat-data",e.appendChild(o);const s=document.createElement("div");s.className="nf-pat-diag-a",e.appendChild(s);const a=document.createElement("div");a.className="nf-pat-diag-b",e.appendChild(a);const d=document.createElement("div");d.className="nf-pat-circuit",e.appendChild(d);const i=document.createElement("div");i.className="nf-pat-honeycomb",e.appendChild(i);const c=document.createElement("div");c.className="nf-pat-binary",e.appendChild(c);const r=document.createElement("div");r.className="nf-pat-crosshatch",e.appendChild(r);const p=document.createElement("div");p.className="nf-pat-diamond",e.appendChild(p);const f=document.createElement("div");f.className="nf-pat-wave-h",e.appendChild(f);const h=document.createElement("div");h.className="nf-pat-radar",e.appendChild(h);const S=document.createElement("div");S.className="nf-pat-ripple-1",e.appendChild(S);const N=document.createElement("div");N.className="nf-pat-ripple-2",e.appendChild(N);const k=document.createElement("div");k.className="nf-pat-techscan",e.appendChild(k);const w=document.createElement("div");w.className="nf-center-glow",e.appendChild(w);const l=document.createElement("div");l.className="nf-pat-noise",e.appendChild(l);const g=document.createElement("div");g.className="nf-crt-scanlines",e.appendChild(g);const E=document.createElement("div");E.className="nf-vignette",e.appendChild(E);for(let y=0;y<3;y++){const $=document.createElement("div");$.className="nf-pulse-ring",e.appendChild($)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(y=>{const $=document.createElement("div");$.className=`nf-corner-deco ${y}`,e.appendChild($)});const V=document.createElement("button");V.className="nf-stop-btn",V.innerHTML='<span class="nf-stop-icon"></span> หยุด',V.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",V.onclick=()=>{var y;window.__NETFLOW_STOP__=!0;try{Ft("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((y=chrome.runtime)!=null&&y.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},e.appendChild(V);const R=document.createElement("div");R.className="nf-layout";const O=document.createElement("div");O.className="nf-core-monitor",O.id="nf-core-monitor";const b=document.createElement("div");b.className="nf-core-header",b.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${Z.length}</div>
    `,O.appendChild(b);const _=document.createElement("div");_.className="nf-terminal",_.id="nf-terminal",be(_),O.appendChild(_);const B=document.createElement("div");B.className="nf-engine-core",B.id="nf-engine-core";const m=document.createElement("div");m.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(y=>{const $=document.createElement("div");$.className=`nf-frame-corner ${y}`,m.appendChild($)}),B.appendChild(m);const C="http://www.w3.org/2000/svg",x=document.createElementNS(C,"svg");x.setAttribute("class","nf-engine-waves"),x.setAttribute("viewBox","0 0 560 140"),x.setAttribute("preserveAspectRatio","none"),x.id="nf-engine-waves";for(let y=0;y<4;y++){const $=document.createElementNS(C,"path");$.setAttribute("fill","none"),$.setAttribute("stroke-width",y<2?"1.5":"1"),$.setAttribute("stroke",y<2?`rgba(${at.rgb},${.14+y*.1})`:`rgba(${at.accentRgb},${.1+(y-2)*.08})`),$.setAttribute("data-wave-idx",String(y)),x.appendChild($)}B.appendChild(x);const v=document.createElement("div");v.className="nf-engine-brand-inner",v.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${xe(at.rgb,at.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${xe(at.rgb,at.accentRgb)}
        </div>
    `,B.appendChild(v);const A=document.createElement("div");A.className="nf-engine-stats",A.id="nf-engine-stats",A.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([y,$,q])=>`<div class="nf-stat-item"><span class="nf-stat-label">${y}</span><span class="nf-stat-val" id="${$}">${q}</span></div>`).join(""),B.appendChild(A),O.appendChild(B),R.appendChild(O);const I=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];pt.forEach((y,$)=>{const q=Qe(y);q.classList.add(I[$]),q.id=`nf-mod-${y.id}`,R.appendChild(q)}),e.appendChild(R);for(let y=0;y<30;y++){const $=document.createElement("div");$.className="nf-particle",$.style.left=`${5+Math.random()*90}%`,$.style.bottom=`${Math.random()*40}%`,$.style.animationDuration=`${3+Math.random()*5}s`,$.style.animationDelay=`${Math.random()*4}s`;const q=.3+Math.random()*.4,T=.7+Math.random()*.3;$.style.background=`rgba(${Math.floor(ct*T)}, ${Math.floor(lt*T)}, ${Math.floor(dt*T)}, ${q})`,$.style.width=`${1+Math.random()*2}px`,$.style.height=$.style.width,e.appendChild($)}return e}function Qe(e){const t=document.createElement("div");t.className="nf-module";const o=document.createElement("div");o.className="nf-mod-header",o.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(o),e.steps.forEach(a=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${a.id}`;let i="";a.progress!==void 0&&(i=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${i}
        `,t.appendChild(d)});const s=document.createElement("div");return s.className="nf-mod-progress",s.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(s),t}function Ze(){he=Date.now(),qt=setInterval(()=>{const e=Math.floor((Date.now()-he)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),o=String(e%60).padStart(2,"0"),s=document.getElementById("nf-timer");s&&(s.textContent=`${t}:${o}`);const a=document.getElementById("nf-stat-elapsed");a&&(a.textContent=`${t}:${o}`)},1e3)}function ye(){qt&&(clearInterval(qt),qt=null)}const Je=120,ve=160,$e=.4;let Ct=null,Ee=0,ke=0,Ce=0,Bt=[];function tn(e,t){Bt=[];for(let o=0;o<Je;o++){const s=Math.random();let a;s<.22?a=0:s<.4?a=1:s<.55?a=2:s<.68?a=3:s<.84?a=4:a=5;const d=Math.random()*e,i=Math.random()*t,c=50+Math.random()*220,r=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Bt.push({x:a===0?Math.random()*e:d+Math.cos(r)*c,y:a===0?Math.random()*t:i+Math.sin(r)*c,vx:(Math.random()-.5)*$e,vy:(Math.random()-.5)*$e,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:a,oCx:d,oCy:i,oRadius:c,oAngle:r,oSpeed:p})}}function en(){if(!ft)return;const e=ft;if(Rt=e.getContext("2d"),!Rt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,Bt.length===0&&tn(e.width,e.height)};t(),window.addEventListener("resize",t);let o=null,s=0,a=0,d=!1;function i(){if(!Rt||!ft){Dt=null;return}if(Dt=requestAnimationFrame(i),d=!d,d)return;const c=Rt,r=ft.width,p=ft.height;c.fillStyle=`rgba(${ct*.04|0},${lt*.04|0},${dt*.06|0},1)`,c.fillRect(0,0,r,p),(!o||s!==r||a!==p)&&(s=r,a=p,o=c.createRadialGradient(r*.5,p*.5,0,r*.5,p*.5,Math.max(r,p)*.6),o.addColorStop(0,`rgba(${ct*.08|0},${lt*.08|0},${dt*.1|0},0.4)`),o.addColorStop(1,"rgba(0,0,0,0)")),c.fillStyle=o,c.fillRect(0,0,r,p);const f=Bt,h=f.length,S=ve*ve;for(let w=0;w<h;w++){const l=f[w];if(l.pulsePhase+=l.pulseSpeed,l.motion===0)l.x+=l.vx,l.y+=l.vy,l.x<0?(l.x=0,l.vx=Math.abs(l.vx)*(.8+Math.random()*.4)):l.x>r&&(l.x=r,l.vx=-Math.abs(l.vx)*(.8+Math.random()*.4)),l.y<0?(l.y=0,l.vy=Math.abs(l.vy)*(.8+Math.random()*.4)):l.y>p&&(l.y=p,l.vy=-Math.abs(l.vy)*(.8+Math.random()*.4));else if(l.motion===1)l.oAngle+=l.oSpeed,l.x=l.oCx+Math.cos(l.oAngle)*l.oRadius,l.y=l.oCy+Math.sin(l.oAngle)*l.oRadius,l.oCx+=Math.sin(l.oAngle*.3)*.15,l.oCy+=Math.cos(l.oAngle*.3)*.15;else if(l.motion===2)l.oAngle+=l.oSpeed,l.x=l.oCx+Math.cos(l.oAngle)*l.oRadius,l.y=l.oCy+Math.sin(l.oAngle)*l.oRadius*.5,l.oCx+=Math.sin(l.oAngle*.2)*.1,l.oCy+=Math.cos(l.oAngle*.2)*.1;else if(l.motion===3){l.oAngle+=l.oSpeed;const g=l.oAngle,E=l.oRadius*.7;l.x=l.oCx+E*Math.cos(g),l.y=l.oCy+E*Math.sin(g)*Math.cos(g),l.oCx+=Math.sin(g*.15)*.12,l.oCy+=Math.cos(g*.15)*.12}else if(l.motion===4){l.oAngle+=l.oSpeed*1.2;const g=l.oRadius*(.5+.5*Math.abs(Math.sin(l.oAngle*.15)));l.x=l.oCx+Math.cos(l.oAngle)*g,l.y=l.oCy+Math.sin(l.oAngle)*g,l.oCx+=Math.sin(l.oAngle*.1)*.18,l.oCy+=Math.cos(l.oAngle*.1)*.18}else l.oAngle+=l.oSpeed,l.x+=l.vx*.8,l.y=l.oCy+Math.sin(l.oAngle+l.x*.008)*l.oRadius*.35,l.x<-30?l.x=r+30:l.x>r+30&&(l.x=-30),l.oCy+=Math.sin(l.oAngle*.1)*.08;if(l.motion>0){const g=l.oRadius+50;l.oCx<-g?l.oCx=r+g:l.oCx>r+g&&(l.oCx=-g),l.oCy<-g?l.oCy=p+g:l.oCy>p+g&&(l.oCy=-g)}}c.beginPath(),c.strokeStyle=`rgba(${ct},${lt},${dt},0.06)`,c.lineWidth=.4;const N=new Path2D;for(let w=0;w<h;w++){const l=f[w];for(let g=w+1;g<h;g++){const E=f[g],V=l.x-E.x,R=l.y-E.y,O=V*V+R*R;O<S&&(1-O/S<.4?(c.moveTo(l.x,l.y),c.lineTo(E.x,E.y)):(N.moveTo(l.x,l.y),N.lineTo(E.x,E.y)))}}if(c.stroke(),c.strokeStyle=`rgba(${ct},${lt},${dt},0.18)`,c.lineWidth=.8,c.stroke(N),!Ct||Ee!==ct||ke!==lt||Ce!==dt){Ct=document.createElement("canvas");const w=48;Ct.width=w,Ct.height=w;const l=Ct.getContext("2d"),g=l.createRadialGradient(w/2,w/2,0,w/2,w/2,w/2);g.addColorStop(0,`rgba(${ct},${lt},${dt},0.9)`),g.addColorStop(.3,`rgba(${ct},${lt},${dt},0.35)`),g.addColorStop(1,`rgba(${ct},${lt},${dt},0)`),l.fillStyle=g,l.fillRect(0,0,w,w),Ee=ct,ke=lt,Ce=dt}const k=Ct;for(let w=0;w<h;w++){const l=f[w],g=.6+.4*Math.sin(l.pulsePhase),E=l.radius*5*(.8+g*.4);c.globalAlpha=.5+g*.4,c.drawImage(k,l.x-E/2,l.y-E/2,E,E)}c.globalAlpha=1,c.fillStyle="rgba(255,255,255,0.45)",c.beginPath();for(let w=0;w<h;w++){const l=f[w];if(l.radius>2){const g=.6+.4*Math.sin(l.pulsePhase),E=l.radius*(.8+g*.4)*.35;c.moveTo(l.x+E,l.y),c.arc(l.x,l.y,E,0,Math.PI*2)}}c.fill()}i()}function nn(){Dt!==null&&(cancelAnimationFrame(Dt),Dt=null),ft=null,Rt=null,Bt=[]}let Ot=null;const Wt=560,on=140,Te=Wt/2,Ie=on/2,Se=[];for(let e=0;e<=Wt;e+=8){const t=Math.abs(e-Te)/Te;Se.push(Math.pow(Math.min(1,t*1.6),.6))}const an=[0,1,2,3].map(e=>({amp:10+e*5,freq:(1.2+e*.35)*Math.PI*2/Wt,off:e*.6,spd:.7+e*.12}));let Zt=!1;function Pe(){if(At=requestAnimationFrame(Pe),Zt=!Zt,Zt)return;if(Xt+=.07,!Ot){const t=document.getElementById("nf-engine-waves");if(!t){At=null;return}Ot=Array.from(t.querySelectorAll("path"))}const e=[];for(let t=0;t<Ot.length;t++){const o=an[t],s=Xt*o.spd+o.off;e.length=0,e.push(`M 0 ${Ie}`);let a=0;for(let d=0;d<=Wt;d+=8){const i=Ie+o.amp*Se[a++]*Math.sin(d*o.freq+s);e.push(`L${d} ${i*10+.5|0}`)}Ot[t].setAttribute("d",e.join(" "))}}function rn(){Xt=0,Pe(),en(),Ht=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),o=document.getElementById("nf-stat-lat2"),s=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(12+Math.random()*10)}ms`),s&&(s.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function _e(){At!==null&&(cancelAnimationFrame(At),At=null),Ht&&(clearInterval(Ht),Ht=null),Ot=null,nn()}function jt(){let e=0;const t=Z.filter(p=>p.status!=="skipped").length;for(const p of Z){const f=document.getElementById(`nf-proc-${p.stepId}`);if(!f)continue;f.className="nf-proc-row";const h=f.querySelector(".nf-proc-badge");switch(p.status){case"done":f.classList.add("nf-proc-done"),h&&(h.textContent="✅ done"),e++;break;case"active":f.classList.add("nf-proc-active"),h&&(h.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":f.classList.add("nf-proc-error"),h&&(h.textContent="❌ error");break;case"skipped":f.classList.add("nf-proc-skipped"),h&&(h.textContent="— skip");break;default:f.classList.add("nf-proc-waiting"),h&&(h.textContent="(queued)")}}const o=Z.findIndex(p=>p.status==="active"),s=o>=0?o+1:e>=t&&t>0?Z.length:e,a=document.getElementById("nf-step-counter");a&&(a.textContent=`${s}/${Z.length}`);const d=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");e>=t&&t>0?(d&&(d.textContent="COMPLETE",d.style.color=at.doneHex),i&&(i.style.background=at.doneHex,i.style.boxShadow=`0 0 8px rgba(${at.doneRgb},0.7)`)):Z.some(f=>f.status==="error")?(d&&(d.textContent="ERROR",d.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):Z.some(f=>f.status==="active")&&d&&(d.textContent="ACTIVE",d.style.color=at.hex,d.style.textShadow=`0 0 10px rgba(${at.rgb},0.5)`);const c=document.getElementById("nf-terminal"),r=c==null?void 0:c.querySelector(".nf-proc-active");r&&c&&r.scrollIntoView({behavior:"smooth",block:"center"})}function Me(){it&&it.isConnected||(Qt(),it=document.createElement("button"),it.id="nf-toggle-btn",it.className="nf-toggle-visible",it.innerHTML=xt?ge:me,it.title="ซ่อน/แสดง Netflow Overlay",it.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",it.onclick=()=>Ae(),document.body.appendChild(it))}function Ae(){U&&(Me(),xt?(U.classList.remove("nf-hidden"),U.classList.add("nf-visible"),U.style.opacity="1",U.style.pointerEvents="auto",it&&(it.innerHTML=me),xt=!1):(U.classList.remove("nf-visible"),U.classList.add("nf-hidden"),U.style.opacity="0",U.style.pointerEvents="none",it&&(it.innerHTML=ge),xt=!0))}const Re={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function De(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=Mt;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"green"}catch{t="green"}const o=Re[t]||Re.green;let s;try{s=chrome.runtime.getURL(o)}catch{s=`/${o}`}const a=at.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${a},0.25) 0%, rgba(${a},0.12) 50%, rgba(${a},0.20) 100%)`,`url('${s}')`].join(", "),e.style.backgroundSize="auto, auto, 50%",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${a},0.45)`,e.style.boxShadow=`0 0 70px rgba(${a},0.22), 0 0 140px rgba(${a},0.1), inset 0 1px 0 rgba(${a},0.15)`}function Yt(e=1){if(at=Ye(),fe(),U&&U.isConnected){U.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!nt||!nt.isConnected)&&(nt=null,Qt()),setTimeout(()=>{if(U)try{nt!=null&&nt.sheet&&nt.sheet.cssRules.length>0&&(U.style.removeProperty("background"),U.style.removeProperty("font-family"),U.style.removeProperty("overflow"))}catch{}},200);for(const t of pt)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;kt=e,Z=Gt(e),we();for(const t of pt)Jt(t);if(Kt(),jt(),!U.querySelector(".nf-stop-btn")){const t=document.createElement("button");t.className="nf-stop-btn",t.innerHTML='<span class="nf-stop-icon"></span> หยุด',t.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",t.onclick=()=>{var o;window.__NETFLOW_STOP__=!0;try{Ft("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((o=chrome.runtime)!=null&&o.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},U.appendChild(t)}xt&&Ae();return}U&&!U.isConnected&&(U=null),nt&&(nt.remove(),nt=null),Qt();for(const t of pt)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;if(kt=e,Z=Gt(e),e>1){const t=pt.find(s=>s.id==="video");if(t){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let a=2;a<=e;a++)s.push({id:`scene${a}-prompt`,label:`Scene ${a} Prompt`,status:"waiting"}),s.push({id:`scene${a}-gen`,label:`Scene ${a} Generate`,status:"waiting"}),s.push({id:`scene${a}-wait`,label:`Scene ${a} รอผล`,status:"waiting",progress:0});t.steps=s}const o=pt.find(s=>s.id==="render");if(o){const s=o.steps.find(d=>d.id==="download");s&&(s.label="ดาวน์โหลด 720p");const a=o.steps.find(d=>d.id==="upscale");a&&(a.label="Full Video")}}U=Xe(),U.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(U),U.classList.add("nf-visible"),xt=!1,Me(),Ze(),rn(),requestAnimationFrame(()=>De()),setTimeout(()=>{if(U)try{nt!=null&&nt.sheet&&nt.sheet.cssRules.length>0&&(U.style.removeProperty("background"),U.style.removeProperty("font-family"),U.style.removeProperty("overflow"))}catch{}},200)}function Be(){ye(),_e(),xt=!1,U&&(U.classList.add("nf-fade-out"),setTimeout(()=>{U==null||U.remove(),U=null},500)),it&&(it.remove(),it=null)}const sn={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function cn(e,t,o){const s=Z.findIndex(h=>h.status==="active"),a=Z.filter(h=>h.status==="done").length,d=Z.length,i=s>=0?s+1:a>=d?d:a,c=document.getElementById("nf-stat-step");c&&(c.textContent=`${i}/${d}`);let r=1;for(const h of Z)if(h.status==="active"||h.status==="done")if(h.stepId.startsWith("scene")){const S=h.stepId.match(/^scene(\d+)-/);S&&(r=Math.max(r,parseInt(S[1],10)))}else(h.stepId==="download"||h.stepId==="upscale"||h.stepId==="open")&&(r=kt);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=kt>1?`${r}/${kt}`:"1/1"),t==="active"){const h=document.getElementById("nf-stat-status"),S=sn[e]||e.toUpperCase();h&&(h.textContent=S)}else if(t==="done"&&a>=d){const h=document.getElementById("nf-stat-status");h&&(h.textContent="COMPLETE")}else if(t==="error"){const h=document.getElementById("nf-stat-status");h&&(h.textContent="ERROR")}const f=document.getElementById("nf-stat-progress");f&&(o!==void 0&&o>0?f.textContent=`${Math.min(100,o)}%`:t==="active"&&(f.textContent="—"))}function P(e,t,o){if(!U)return;for(const a of pt)for(const d of a.steps)d.id===e&&(d.status=t,o!==void 0&&(d.progress=o));for(const a of Z)a.stepId===e&&(a.status=t,o!==void 0&&(a.progress=o));const s=document.getElementById(`nf-step-${e}`);if(s&&(s.className="nf-step",t==="active"?s.classList.add("nf-step-active"):t==="done"?s.classList.add("nf-step-done"):t==="error"&&s.classList.add("nf-step-error")),cn(e,t,o),o!==void 0){const a=document.getElementById(`nf-bar-${e}`);a&&(a.style.width=`${Math.min(100,o)}%`)}Kt(),jt()}function Tt(e){P(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function Nt(e=4e3){ye(),_e(),Kt(),jt(),setTimeout(()=>Be(),e)}function Kt(){for(const e of pt){const t=e.steps.filter(r=>r.status!=="skipped").length,o=e.steps.filter(r=>r.status==="done").length,s=e.steps.some(r=>r.status==="active"),a=t>0?Math.round(o/t*100):0,d=document.getElementById(`nf-pct-${e.id}`);d&&(d.textContent=`${a}%`);const i=document.getElementById(`nf-modbar-${e.id}`);i&&(i.style.width=`${a}%`);const c=document.getElementById(`nf-mod-${e.id}`);c&&(c.classList.remove("nf-active","nf-done"),a>=100?c.classList.add("nf-done"):s&&c.classList.add("nf-active"))}}function ln(e){var s,a,d,i;kt=e;const t=new Map;for(const c of Z)t.set(c.stepId,{status:c.status,progress:c.progress});Z=Gt(e);for(const c of Z){const r=t.get(c.stepId);r&&(c.status=r.status,r.progress!==void 0&&(c.progress=r.progress))}if(we(),e>1){const c=pt.find(r=>r.id==="video");if(c){const r=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((s=c.steps.find(p=>p.id==="animate"))==null?void 0:s.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((a=c.steps.find(p=>p.id==="vid-prompt"))==null?void 0:a.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=c.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((i=c.steps.find(p=>p.id==="vid-wait"))==null?void 0:i.status)||"waiting",progress:0}];for(let p=2;p<=e;p++)r.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),r.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),r.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});c.steps=r,Jt(c)}}const o=pt.find(c=>c.id==="render");if(o&&e>1){const c=o.steps.find(p=>p.id==="download");c&&(c.label="ดาวน์โหลด 720p");const r=o.steps.find(p=>p.id==="upscale");r&&(r.label="Full Video"),Jt(o)}Kt(),jt()}function Jt(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(a=>a.remove()),e.steps.forEach(a=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${a.id}`;let i="";a.progress!==void 0&&(i=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${i}
        `,t.appendChild(d)});const s=document.createElement("div");s.className="nf-mod-progress",s.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(s)}function Ft(e){e.replace(/^\[Netflow AI\]\s*/,"")}let It=null,yt=null;const dn=new Promise(e=>{yt=e,setTimeout(()=>e(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},e=>{!chrome.runtime.lastError&&(e!=null&&e.tabId)&&(It=e.tabId,console.log(`[Netflow AI] Tab ID: ${It}`)),yt&&(yt(It),yt=null)})}catch{yt&&(yt(null),yt=null)}function gt(){return It?`netflow_pending_action_${It}`:"netflow_pending_action"}function Oe(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Ft(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},M=e=>{console.warn(`[Netflow AI] ${e}`);try{Ft(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}};(()=>{const e=(o,s)=>{const a=o.tagName.toLowerCase(),d=o.id?`#${o.id}`:"",i=o.className&&typeof o.className=="string"?"."+o.className.trim().split(/\s+/).join("."):"",c=o.getBoundingClientRect(),r={};for(const l of o.attributes)["class","id","style"].includes(l.name)||(r[l.name]=l.value.length>80?l.value.slice(0,80)+"…":l.value);const p=(o.textContent||"").trim().slice(0,120),f=Array.from(o.querySelectorAll('i, [class*="icon"]')).map(l=>{var g;return(g=l.textContent)==null?void 0:g.trim()}).filter(Boolean).join(", "),h=[];let S=o.parentElement;for(let l=0;l<5&&S;l++){const g=S.tagName.toLowerCase(),E=S.id?`#${S.id}`:"",V=S.className&&typeof S.className=="string"?"."+S.className.trim().split(/\s+/).slice(0,2).join("."):"";h.push(`${g}${E}${V}`),S=S.parentElement}const N=s==="click"?`%c🖱️ CLICK %c<${a}${d}${i}>`:`%c👆 HOVER %c<${a}${d}${i}>`;console.groupCollapsed(N,s==="click"?"background:#e74c3c;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold":"background:#3498db;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold","color:#f39c12;font-weight:bold"),console.log("Element:",o),console.log("Selector:",`${a}${d}${i}`),console.log("Rect:",{x:Math.round(c.x),y:Math.round(c.y),w:Math.round(c.width),h:Math.round(c.height)}),Object.keys(r).length&&console.log("Attributes:",r),p&&console.log("Text:",p),f&&console.log("Icons:",f),h.length&&console.log("Ancestors:",h.join(" > ")),console.groupEnd()};document.addEventListener("click",o=>{const s=o.target;s!=null&&s.closest("#netflow-engine-overlay")||e(s,"click")},!0);let t=null;document.addEventListener("mouseover",o=>{const s=o.target;s!==t&&(s!=null&&s.closest("#netflow-engine-overlay")||(t=s,e(s,"hover")))},!0),console.log("%c[Netflow AI] 🔍 Debug Element Inspector ACTIVE — click/hover elements to inspect","background:#2ecc71;color:#000;padding:4px 8px;border-radius:4px;font-weight:bold")})();function te(e=3e3){n(`🔒 จะปิดแท็บ automation ใน ${e/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},t=>{chrome.runtime.lastError?M(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${t==null?void 0:t.message}`)})}catch(t){M(`ปิดแท็บผิดพลาด: ${t.message}`)}},e)}async function ee(){try{if(await new Promise(a=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},d=>{if(chrome.runtime.lastError){a(!1);return}a(!!(d!=null&&d.cached))})}catch{a(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const a=document.querySelectorAll("video");for(const d of a){const i=d.src||d.currentSrc||"";if(i)return i}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const t=document.querySelectorAll("video");let o=null,s=0;for(const a of t){let d=a.src||"";if(!d){const r=a.querySelector("source");r&&(d=r.getAttribute("src")||"")}if(!d&&a.currentSrc&&(d=a.currentSrc),!d)continue;if(J()){o||(o=d,s=1);continue}const i=a.getBoundingClientRect(),c=i.width*i.height;i.width>50&&c>s&&(s=c,o=d)}if(!o)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${o.substring(0,80)}... (area=${s.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const a=await fetch(o);if(!a.ok)return n(`[TikTok] fetch failed: HTTP ${a.status}`),await Ne(o),o;const d=await a.blob(),i=(d.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${i} MB, type: ${d.type}`),d.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${d.size} bytes) — อาจเป็น thumbnail`);const c=await new Promise((r,p)=>{const f=new FileReader;f.onloadend=()=>r(f.result),f.onerror=()=>p(new Error("FileReader error")),f.readAsDataURL(d)});n(`[TikTok] Data URL พร้อม: ${(c.length/1024/1024).toFixed(1)} MB`),await new Promise(r=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:c},p=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),r()})})}catch(a){n(`[TikTok] Content script fetch error: ${a.message}`),await Ne(o)}return o}catch(e){return n(`[TikTok] captureVideoUrl error: ${e.message}`),null}}async function Ne(e){if(e.startsWith("https://"))try{await new Promise(t=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched via background: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),t()})})}catch{}}function ne(e){if(e){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:e,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const H=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),oe=/Win/i.test(navigator.userAgent),Fe=H?"🍎 Mac":oe?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${Fe}`),window.__VIDEO_COMPLETE_SENT__=!1;class ie extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Lt=null,vt=null,Le=!1;const St=new Map;let ze=0;function pn(){if(Lt)return Lt;try{const e=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Lt=new Worker(URL.createObjectURL(e)),Lt.onmessage=t=>{const o=St.get(t.data);o&&(St.delete(t.data),o())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Lt}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function un(){if(vt)return vt;if(Le)return null;try{return vt=chrome.runtime.connect({name:"timer"}),vt.onMessage.addListener(e=>{const t=St.get(e.id);t&&(St.delete(e.id),t())}),vt.onDisconnect.addListener(()=>{vt=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),vt}catch{return Le=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const u=e=>new Promise((t,o)=>{if(window.__NETFLOW_STOP__)return o(new ie);let s=!1;const a=()=>{if(!s){if(s=!0,window.__NETFLOW_STOP__)return o(new ie);t()}};setTimeout(a,e);const d=pn();if(d){const r=++ze;St.set(r,a),d.postMessage({id:r,ms:e});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e+2e3},()=>{chrome.runtime.lastError||a()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e},()=>{chrome.runtime.lastError?setTimeout(a,e):a()});return}catch{}const i=un();if(i){const r=++ze;St.set(r,a),i.postMessage({cmd:"delay",id:r,ms:e});return}const c=setTimeout(a,e);u._lastId=c});function $t(){return!!window.__NETFLOW_STOP__}const J=()=>document.hidden;let Ve=0;async function Et(){if(!document.hidden)return!1;const e=Date.now();if(e-Ve<15e3)return!1;Ve=e;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await u(1500),!0}catch{return!1}}async function bt(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(t=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>t()));const e=Date.now();for(;document.hidden&&Date.now()-e<5e3;)await u(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await u(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function Ue(){var o;const e=["audio generation failed","couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","might violate","violate our policies","อาจละเมิด","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const s of t){if(s.closest("#netflow-engine-overlay"))continue;const a=(s.textContent||"").trim().toLowerCase();if(!(a.length>200||a.length<5)){for(const d of e)if(a.includes(d))return((o=s.textContent)==null?void 0:o.trim())||d}}return null}function fn(e){let t=e;const o=[/STRICT FACE & HEAD LOCK:[^.]*\./gi,/BODY LOCK:[^.]*\./gi,/HAIR LOCK:[^.]*\./gi,/FACE LOCK[^.]*\./gi,/PRODUCT IDENTITY LOCK:[^.]*\./gi,/LABEL LOCK:[^.]*\./gi,/PRODUCT EVERY FRAME:[^.]*\./gi,/TRANSITION STABILITY:[^.]*\./gi,/ANTI[_-]DUPLICATION:[^.]*\./gi,/ANTI[_-]TEXT[^.]*\./gi,/ANTI[_-]MORPH[^.]*\./gi,/ANTI[_-]DISTORTION[^.]*\./gi,/ANTI[_-]ADDITION[^.]*\./gi,/ANTI[_-]FLOATING[^.]*\./gi,/PROPS vs PRODUCT:[^.]*\./gi,/BRAND IDENTITY FREEZE[^.]*\./gi,/BRAND MORPHING[^.]*\./gi,/PRODUCT SIZE \(CRITICAL\):[^.]*\./gi,/PRODUCT SIZE REALISM:[^.]*\./gi,/VOICE DISCIPLINE:[^.]*\./gi,/ZERO INVENTION:[^.]*\./gi,/REALISM:[^.]*\./gi,/SCREEN CONTENT[^.]*\./gi,/SINGLE UTENSIL RULE[^.]*\./gi,/PRODUCT LOCK[^.]*\./gi,/FACE & HEAD LOCK[^.]*\./gi,/CLOTHING FIDELITY[^.]*\./gi,/FRONT[_-]FACING[^.]*\./gi];for(const i of o)t=t.replace(i,"");const s=["DO NOT","NEVER","FORBIDDEN","MUST NOT","ABSOLUTELY NO","IMMUTABLE","LOCKED","HIGHEST PRIORITY","#1 FORBIDDEN","Do NOT let","Do NOT add","Do NOT generate","Do NOT simplify","Do NOT invent","ZERO on-screen","NO split screen","NO collage","NO side-by-side","NO divided frames","never morph","never simplify","never change shape","never disappear","never be hidden","never exit","BRAND MORPHING IS","objects MUST NOT magically"];return t=t.split(/(?<=[.!])\s+/).filter(i=>!s.some(c=>i.includes(c))).join(" "),t=t.replace(/\s{2,}/g," ").trim(),t.length>1200&&(t=t.replace(/Render with extreme surface detail[^.]*\./gi,""),t=t.replace(/High-fidelity visual detail[^.]*\./gi,""),t=t.replace(/Product lit with soft rim light[^.]*\./gi,""),t=t.replace(/visible material texture[^.]*\./gi,""),t=t.replace(/Fluid motion, cinematic motion blur[^.]*\./gi,""),t=t.replace(/AI-observed appearance:[^.]*\./gi,""),t=t.replace(/Reference clothing:[^.]*\./gi,""),t=t.replace(/\s{2,}/g," ").trim()),n(`🛡️ Safe retry prompt: ${e.length} → ${t.length} chars (${Math.round((1-t.length/e.length)*100)}% reduction)`),t}async function tt(e){if(J()){e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),e.click();return}const t=e.getBoundingClientRect(),o=t.left+t.width/2,s=t.top+t.height/2,a={bubbles:!0,cancelable:!0,clientX:o,clientY:s,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",a)),await u(80),e.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",a)),e.dispatchEvent(new MouseEvent("click",a)),await u(50),e.click()}function Pt(e){const t=e.getBoundingClientRect(),o=t.left+t.width/2,s=t.top+t.height/2,a={bubbles:!0,cancelable:!0,clientX:o,clientY:s};e.dispatchEvent(new PointerEvent("pointerenter",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",a)),e.dispatchEvent(new PointerEvent("pointerover",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",a)),e.dispatchEvent(new PointerEvent("pointermove",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",a))}function gn(e){const t=[],o=document.querySelectorAll("i");for(const s of o){if((s.textContent||"").trim()!==e)continue;let d=s,i=null,c=1/0;for(let r=0;r<20&&d&&(d=d.parentElement,!(!d||d===document.body));r++){if(J()){r>=3&&d.children.length>0&&!i&&(i=d);continue}const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const f=p.width*p.height;f<c&&(i=d,c=f)}}i&&!t.includes(i)&&t.push(i)}return t.sort((s,a)=>{const d=s.getBoundingClientRect(),i=a.getBoundingClientRect();return d.left-i.left}),t}function ae(e=!1){const t=[],o=document.querySelectorAll("video");for(const i of o){let c=i.parentElement;for(let r=0;r<10&&c;r++){if(J()){if(r>=3&&c.children.length>0){t.push({el:c,left:0});break}c=c.parentElement;continue}const p=c.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){t.push({el:c,left:p.left});break}c=c.parentElement}}const s=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const i of s){const c=(i.textContent||"").trim();if(c==="play_arrow"||c==="play_circle"||c==="videocam"){let r=i.parentElement;for(let p=0;p<10&&r;p++){if(J()){if(p>=3&&r.children.length>0){t.push({el:r,left:0});break}r=r.parentElement;continue}const f=r.getBoundingClientRect();if(f.width>120&&f.height>80&&f.width<window.innerWidth*.7&&f.top>=-50&&f.left<window.innerWidth*.75){t.push({el:r,left:f.left});break}r=r.parentElement}}}const a=document.querySelectorAll("img");for(const i of a){const c=(i.alt||"").toLowerCase();if(c.includes("video")||c.includes("วิดีโอ")){let r=i.parentElement;for(let p=0;p<10&&r;p++){if(J()){if(p>=3&&r.children.length>0){t.push({el:r,left:0});break}r=r.parentElement;continue}const f=r.getBoundingClientRect();if(f.width>120&&f.height>80&&f.width<window.innerWidth*.7&&f.top>=-50&&f.left<window.innerWidth*.75){t.push({el:r,left:f.left});break}r=r.parentElement}}}const d=Array.from(new Set(t.map(i=>i.el))).map(i=>t.find(c=>c.el===i));if(d.sort((i,c)=>i.left-c.left),d.length>0){const i=d[0].el,c=i.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${c.left.toFixed(0)},${c.top.toFixed(0)}) ขนาด ${c.width.toFixed(0)}x${c.height.toFixed(0)}`),i}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function mn(){const e=gn("image");if(e.length>0){const o=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${o.left.toFixed(0)},${o.top.toFixed(0)}) ขนาด ${o.width.toFixed(0)}x${o.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const o of t){let s=o.parentElement;for(let a=0;a<10&&s;a++){if(J()){if(a>=3&&s.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),s;s=s.parentElement;continue}const d=s.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),s;s=s.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function hn(e,t){var c;const[o,s]=e.split(","),a=((c=o.match(/:(.*?);/))==null?void 0:c[1])||"image/png",d=atob(s),i=new Uint8Array(d.length);for(let r=0;r<d.length;r++)i[r]=d.charCodeAt(r);return new File([i],t,{type:a})}async function bn(e,t=1024,o=.8){try{if(e.length<5e5)return n(`🗜️ รูปเล็กพอ (${(e.length/1024).toFixed(0)} KB base64) — ไม่บีบอัด`),e;n(`🗜️ รูปใหญ่ (${(e.length/1024).toFixed(0)} KB base64) — กำลังบีบอัด...`);const s=new Image;await new Promise((f,h)=>{s.onload=()=>f(),s.onerror=()=>h(new Error("Image load failed")),s.src=e});let{width:d,height:i}=s;if(d>t||i>t){const f=t/Math.max(d,i);d=Math.round(d*f),i=Math.round(i*f)}const c=document.createElement("canvas");c.width=d,c.height=i;const r=c.getContext("2d");if(!r)return e;r.drawImage(s,0,0,d,i);const p=c.toDataURL("image/jpeg",o);return n(`🗜️ บีบอัดแล้ว: ${(e.length/1024).toFixed(0)} KB → ${(p.length/1024).toFixed(0)} KB (${d}x${i})`),c.width=0,c.height=0,p}catch(s){return M(`🗜️ บีบอัดล้มเหลว: ${s.message} — ใช้รูปต้นฉบับ`),e}}function re(e){var a;const t=[],o=new WeakSet,s=["i.google-symbols","i[class*='google-symbols']",".material-symbols-outlined",".material-icons",".material-symbols-rounded",".material-symbols-sharp","i[class*='material']","span[class*='material']","i[class*='icon']","span[class*='icon']","[data-icon]","[class*='gm-icon']","[class*='gmat-icon']","i"];for(const d of s){for(const i of document.querySelectorAll(d))if(((a=i.textContent)==null?void 0:a.trim())===e){const c=i.closest("button");c&&!o.has(c)&&(o.add(c),t.push(c))}if(t.length>0)break}if(t.length===0)for(const d of document.querySelectorAll("button")){const i=(d.getAttribute("aria-label")||"").toLowerCase();(i===e.toLowerCase()||i.includes(e.toLowerCase()))&&(o.has(d)||(o.add(d),t.push(d)))}return t}async function qe(e=5e3){const t=Date.now();for(;Date.now()-t<e;){const o=document.querySelectorAll('input[type="file"]');if(o.length>0)return o[o.length-1];await u(300)}return null}function se(){const e=["add","add_2","add_circle","add_circle_outline","attach_file","attach_file_add","attachment","note_add"];let t=[];for(const i of e)if(t=re(i),t.length>0)break;if(t.length>0){let i=null,c=0;for(const r of t){const p=r.getBoundingClientRect();p.y>c&&(c=p.y,i=r)}if(i)return n(`พบปุ่ม "+" ของ Prompt Bar (icon) ที่ y=${c.toFixed(0)}`),i}n("ไม่พบปุ่มเพิ่มจากไอคอน — ลอง fallback ทั้งหมด");const o=["add","attach","upload","create","insert","plus","เพิ่ม","แนบ","อัปโหลด","สร้าง"];for(const i of document.querySelectorAll("button")){const c=(i.getAttribute("aria-label")||"").toLowerCase(),r=(i.getAttribute("title")||"").toLowerCase();if(o.some(p=>c.includes(p)||r.includes(p))){if(J())return n('พบปุ่ม "+" (aria/title) hidden mode'),i;const p=i.getBoundingClientRect();if(p.bottom>window.innerHeight*.6&&p.width<80&&p.height<80)return n(`พบปุ่ม "+" (aria="${c}" title="${r}") ที่ y=${p.y.toFixed(0)}`),i}}const s=document.querySelectorAll("button");for(const i of s){const c=(i.textContent||"").trim();if(c!=="+"&&c!=="add"&&c!=="Add")continue;if(J())return i;const r=i.getBoundingClientRect();if(r.bottom>window.innerHeight*.6&&r.width<80&&r.height<80)return n(`พบปุ่ม "+" (text="${c}") ที่ y=${r.y.toFixed(0)}`),i}const a=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');if(a){const i=a.getBoundingClientRect();let c=null,r=1/0;for(const p of s){const f=p.getBoundingClientRect();if(f.width<10||f.height<10||f.width>100||f.height>100||Math.abs(f.top-i.top)>80)continue;const h=Math.abs(f.left-i.left)+Math.abs(f.top-i.top);h<r&&(r=h,c=p)}if(c)return n(`พบปุ่ม "+" (ใกล้ prompt bar, dist=${r.toFixed(0)})`),c}for(const i of s){const c=i.querySelector("svg");if(!c)continue;const r=c.querySelectorAll("path, line, polygon"),p=Array.from(r).map(f=>f.getAttribute("d")||"").join(" ");if(p.includes("M12")||p.includes("M11")||p.includes("M10")){if(J())return i;const f=i.getBoundingClientRect();if(f.bottom>window.innerHeight*.6&&f.width<80&&f.height<80)return n(`พบปุ่ม "+" (SVG) ที่ y=${f.y.toFixed(0)}`),i}}const d=[];for(const i of s){const c=i.getBoundingClientRect();if(c.bottom>window.innerHeight*.6&&c.width>0){const r=(i.textContent||"").trim().substring(0,30),p=i.getAttribute("aria-label")||"",f=(i.className||"").substring(0,40),h=i.querySelector("i, span[class*='icon'], svg")?"has-icon":"no-icon";d.push(`"${r}" aria="${p}" cls="${f}" ${h} y=${c.y.toFixed(0)}`)}}return M(`ไม่พบปุ่ม "+" — ปุ่มที่พบบริเวณล่าง (${d.length}): ${d.slice(0,5).join(" | ")}`),null}function ce(){for(const s of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const a=re(s);let d=null,i=0;for(const c of a){const r=c.getBoundingClientRect();r.y>i&&(i=r.y,d=c)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${s}" ที่ y=${i.toFixed(0)}`),d}const e=document.querySelectorAll("button");let t=null,o=0;for(const s of e){if(J())break;const a=s.getBoundingClientRect();if(a.bottom>window.innerHeight*.7&&a.right>window.innerWidth*.5){const d=Math.abs(a.width-a.height)<10&&a.width<60,i=a.y+a.x+(d?1e3:0);i>o&&(o=i,t=s)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const s of e){const a=(s.getAttribute("aria-label")||"").toLowerCase();if(a.includes("generate")||a.includes("submit")||a.includes("send")||a.includes("สร้าง"))return s}return null}function le(){const e=document.querySelectorAll("textarea");for(const s of e)if(J()||s.getBoundingClientRect().bottom>window.innerHeight*.5)return s;const t=document.querySelectorAll('[contenteditable="true"]');for(const s of t)if(J()||s.getBoundingClientRect().bottom>window.innerHeight*.5)return s;const o=document.querySelectorAll("input[type='text'], input:not([type])");for(const s of o){const a=s.placeholder||"";if(a.includes("สร้าง")||a.includes("prompt")||a.includes("describe"))return s}return e.length>0?e[e.length-1]:null}async function zt(e,t){var o,s,a,d;e.focus(),await u(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const i=new DataTransfer;i.setData("text/plain",t),i.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:i});e.dispatchEvent(c),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const r=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:i});e.dispatchEvent(r),await u(800);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(i){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await u(100);const i=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(i);const c=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(c),await u(800);const r=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(r.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${r.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(i){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await u(200);const i=new DataTransfer;i.setData("text/plain",t),i.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const c=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:i});e.dispatchEvent(c),await u(800);const r=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(r.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${r.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(i){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((o=navigator.clipboard)!=null&&o.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const c=document.createElement("textarea");c.value=t,c.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(c),c.focus(),c.select(),document.execCommand("copy"),document.body.removeChild(c),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await u(200),document.execCommand("paste"),await u(500);const i=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(i.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${i.length} ตัวอักษร)`);return}}catch(i){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const i=Object.keys(e).find(c=>c.startsWith("__reactFiber$")||c.startsWith("__reactInternalInstance$"));if(i){let c=e[i];for(let r=0;r<30&&c;r++){const p=c.memoizedProps,f=c.memoizedState;if((s=p==null?void 0:p.editor)!=null&&s.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const h=p.editor;h.selection,h.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(a=f==null?void 0:f.memoizedState)==null?void 0:a.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),f.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}c=c.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(i){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${i.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function _t(){let e=0;const t=document.querySelectorAll("img");for(const s of t){if(s.closest("#netflow-engine-overlay")||!s.src)continue;if(J()){e++;continue}const a=s.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&s.offsetParent!==null&&e++}const o=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const s of o){if(s.closest("#netflow-engine-overlay"))continue;if(J()){e++;continue}const a=s.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&s.offsetParent!==null&&e++}return e}async function de(e,t=5e3){var i;const o=Date.now(),s=["upload","upload_file","upload_2","cloud_upload","file_upload","image"],a=["upload image","อัปโหลดรูปภาพ","upload","อัปโหลด","upload file","add image","เพิ่มรูป","เพิ่มรูปภาพ"];for(;Date.now()-o<t;){const c=[],r=e.getAttribute("aria-controls");if(r){const f=document.getElementById(r);f&&c.push(f)}const p=e.getAttribute("aria-owns");if(p){const f=document.getElementById(p);f&&c.push(f)}for(const f of["[data-radix-portal]","[data-radix-popper-content-wrapper]",'[role="dialog"]','[role="menu"]','[role="listbox"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]","[data-radix-popover-content]",'[class*="popover"]','[class*="dropdown"]','[class*="menu-content"]','[class*="dialog"]'])for(const h of document.querySelectorAll(f))c.push(h);for(const f of c)for(const h of f.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[tabindex], a")){if(h===e)continue;const S=h.querySelector("i, span[class*='icon'], span[class*='material']"),N=((i=S==null?void 0:S.textContent)==null?void 0:i.trim().toLowerCase())||"";if(s.includes(N))return n(`พบปุ่ม Upload (icon="${N}")`),h;const k=(h.textContent||"").trim().toLowerCase(),w=Array.from(h.querySelectorAll("span, div, p")).map(g=>{var E;return((E=g.textContent)==null?void 0:E.trim().toLowerCase())||""});if(a.some(g=>k===g||w.some(E=>E===g)))return n(`พบปุ่ม Upload (text="${k.substring(0,40)}")`),h;const l=(h.getAttribute("aria-label")||"").toLowerCase();if(a.some(g=>l.includes(g)))return n(`พบปุ่ม Upload (aria="${l}")`),h}if(Date.now()-o>t/2)for(const f of document.querySelectorAll("button, [role='menuitem']")){if(f===e)continue;const h=(f.textContent||"").trim().toLowerCase(),S=f.getBoundingClientRect();if(!(S.width===0||S.height===0)&&a.some(N=>h===N||h.includes(N))&&h.length<50)return n(`พบปุ่ม Upload (global search, text="${h.substring(0,40)}")`),f}await u(500)}const d=[];for(const c of["[data-radix-portal]",'[role="dialog"]','[role="menu"]']){const r=document.querySelectorAll(c);if(r.length>0)for(const p of r){const f=p.querySelectorAll("button, [role='menuitem']");for(const h of f)d.push(`[${c}] "${(h.textContent||"").trim().substring(0,30)}"`)}}return M(`ไม่พบปุ่ม Upload — พบ elements ใน dialogs: ${d.slice(0,8).join(" | ")||"(ว่าง)"}`),null}async function He(e,t){n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const o=await bn(e),s=hn(o,t);n(`ขนาดไฟล์: ${(s.size/1024).toFixed(1)} KB`);const a=_t();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const d=H?1.8:1;n("── ขั้น 1: คลิกปุ่ม '+' (Create) ──");let i=se();if(i||(n("ไม่พบปุ่ม '+' — รอแล้วลองใหม่..."),await u(3e3*d),i=se()),!i){n("ลองคลิกบน prompt bar area เพื่อ activate...");const r=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');r&&(r.click(),await u(2e3*d),i=se())}if(!i)return M("ไม่พบปุ่ม '+' บน Prompt Bar — ลอง direct file input → drag-drop"),await pe(s,a)?!0:await ue(s,a);await tt(i),n("คลิกปุ่ม '+' (Create) ✅"),await u(1500*d),n("── ขั้น 2: หาและคลิกปุ่ม 'Upload image' ──");let c=await de(i,H?8e3:5e3);if(!c){M("ไม่พบปุ่ม 'Upload image' ครั้ง 1 — ลอง robustClick + pointer events บนปุ่ม '+'"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500);const r=i.getBoundingClientRect(),p=r.left+r.width/2,f=r.top+r.height/2,h={bubbles:!0,cancelable:!0,clientX:p,clientY:f,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",h)),await u(80),i.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",h)),i.dispatchEvent(new MouseEvent("click",h)),await u(2e3*d),c=await de(i,H?5e3:3e3)}return c||(M("ไม่พบปุ่ม 'Upload image' ครั้ง 2 — ลอง robustHover + robustClick อีกครั้ง"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500),Pt(i),await u(300),await tt(i),await u(2e3*d),c=await de(i,H?5e3:3e3)),c?await wn(c,s,t,a):(M("❌ ไม่พบปุ่ม Upload image หลังลองทั้ง 3 วิธี — ลอง direct file input → drag-drop"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500),await pe(s,a)?!0:await ue(s,a))}async function wn(e,t,o,s){var p;n("── ขั้น 3: บล็อก file dialog + คลิก Upload + ฉีดไฟล์ ──");const a=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type==="file"){n("🚫 บล็อก file dialog จาก click()");return}return a.call(this)};try{e.click(),n("คลิกปุ่ม 'Upload image' ✅"),await u(H?1500:800)}finally{HTMLInputElement.prototype.click=a}let d=document.querySelector('input[type="file"]');if(d||(n("ไม่พบ file input ทันที — รอ..."),d=await qe(H?5e3:3e3)),!d){n("ลอง robustClick บนปุ่ม Upload อีกครั้ง...");const f=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type!=="file")return f.call(this)};try{await tt(e),await u(1500)}finally{HTMLInputElement.prototype.click=f}d=document.querySelector('input[type="file"]'),d||(d=await qe(3e3))}if(!d)return M("ไม่พบ file input หลังคลิก Upload — ลอง direct file input → drag-drop"),await pe(t,s)?!0:await ue(t,s);const i=new DataTransfer;i.items.add(t),d.files=i.files,n(`ฉีดไฟล์ ${o} เข้า file input (${((p=d.files)==null?void 0:p.length)??0} ไฟล์)`);const c=d._valueTracker;c&&(c.setValue(""),n("รีเซ็ต React _valueTracker")),d.dispatchEvent(new Event("change",{bubbles:!0})),d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),n("ส่ง change + input event ✅"),n("── ขั้น 4: รอยืนยันรูปย่อ ──");const r=Date.now();for(;Date.now()-r<15e3;){const f=_t();if(f>s)return n(`✅ ยืนยัน: รูปย่อเพิ่มจาก ${s} → ${f}`),!0;const h=document.querySelectorAll("span, div, p");for(const S of h){const N=(S.textContent||"").trim();if(/^\d{1,2}%$/.test(N)){n(`กำลังอัพโหลด: ${N}`);break}}await u(1e3)}return M(`❌ อัพโหลด ${o} ล้มเหลว — ไม่พบรูปย่อใหม่หลัง 15 วินาที`),!1}async function pe(e,t){n("── Fallback: direct file input injection (ข้าม UI ปุ่มทั้งหมด) ──");let o=document.querySelector('input[type="file"]');if(!o){n("ไม่พบ file input — ลองคลิก prompt area เพื่อ trigger...");const i=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"], [contenteditable="true"]');i&&(await tt(i),await u(1e3));const c=document.querySelectorAll("button");for(const r of c){const p=r.getBoundingClientRect();if(p.width<10||p.height<10||p.width>80||p.height>80||p.bottom<window.innerHeight*.5)continue;const f=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type==="file"){n("🚫 บล็อก file dialog (direct fallback)");return}return f.call(this)};try{r.click(),await u(800)}finally{HTMLInputElement.prototype.click=f}if(o=document.querySelector('input[type="file"]'),o){n(`พบ file input หลังคลิกปุ่ม "${(r.textContent||"").trim().substring(0,20)}"`);break}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300)}}if(!o)return n("ไม่พบ file input ใดๆ บนหน้า — fallback นี้ล้มเหลว"),!1;n(`พบ file input: accept="${o.accept||"*"}" name="${o.name||""}"`);const s=new DataTransfer;s.items.add(e),o.files=s.files;const a=o._valueTracker;a&&a.setValue(""),o.dispatchEvent(new Event("change",{bubbles:!0})),o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),n("ฉีดไฟล์ผ่าน direct file input ✅");const d=Date.now();for(;Date.now()-d<15e3;){if(_t()>t)return n("✅ direct file input สำเร็จ — พบรูปย่อใหม่"),!0;await u(1e3)}return M("❌ direct file input — ไม่พบรูปย่อใหม่หลัง 15 วินาที"),!1}async function ue(e,t){n("── Fallback: drag-and-drop ลงบน workspace ──");const o=new DataTransfer;o.items.add(e);let s=null;const a=document.querySelectorAll('[class*="workspace"], [class*="drop"], [class*="media"], main, [role="main"]');for(const f of a){const h=f.getBoundingClientRect();if(h.width>200&&h.height>200){s=f;break}}s||(s=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)||document.body);const d=s.getBoundingClientRect(),i=d.left+d.width/2,c=d.top+d.height/2,r={bubbles:!0,cancelable:!0,clientX:i,clientY:c,dataTransfer:o};s.dispatchEvent(new DragEvent("dragenter",r)),await u(100),s.dispatchEvent(new DragEvent("dragover",r)),await u(100),s.dispatchEvent(new DragEvent("drop",r)),n(`ส่ง drag-drop ลง <${s.tagName}>`);const p=Date.now();for(;Date.now()-p<8e3;){if(_t()>t)return n("✅ drag-drop สำเร็จ — พบรูปย่อใหม่"),!0;await u(1e3)}return M("❌ drag-drop ล้มเหลว — ไม่พบรูปย่อใหม่"),!1}async function xn(e,t){var N;n("=== ขั้น 0: ตั้งค่า Flow ===");let o=null;for(let k=0;k<10;k++){const w=document.querySelectorAll("button, div, span, [role='button']");for(const g of w){const E=(g.textContent||"").trim();if(!(E.length>80)&&(E.includes("Nano Banana")||E.includes("Imagen")||E.includes("วิดีโอ")||E.includes("รูปภาพ")||E.includes("Image")||E.includes("Video"))){const V=g.getBoundingClientRect();V.bottom>window.innerHeight*.7&&V.width>30&&V.height>10&&(!o||(g.textContent||"").length<(o.textContent||"").length)&&(o=g)}}if(o){n(`พบปุ่มตั้งค่าจากข้อความ: "${(o.textContent||"").substring(0,40).trim()}"`);break}const l=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const g of l){const E=((N=g.textContent)==null?void 0:N.trim())||"";if(E.includes("crop")||E==="aspect_ratio"||E==="photo_size_select_large"){const V=g.closest("button, div[role='button'], [role='button']")||g.parentElement;if(V){const R=V.getBoundingClientRect();if(R.bottom>window.innerHeight*.7&&R.width>0){o=V,n(`พบปุ่มตั้งค่าจากไอคอน: ${E}`);break}}}}if(o)break;for(const g of w){const E=(g.textContent||"").trim();if(!(E.length>40)&&/x[1-4]/.test(E)&&(E.includes("วิดีโอ")||E.includes("รูปภาพ")||E.includes("Video")||E.includes("Image"))){const V=g.getBoundingClientRect();if(V.bottom>window.innerHeight*.7&&V.width>30){o=g,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${E.substring(0,40)}"`);break}}}if(o)break;n(`⏳ รอปุ่มตั้งค่า... (${k+1}/10)`),await u(1e3)}if(!o)return M("ไม่พบปุ่มตั้งค่า (หมด 10 รอบ)"),!1;const s=o.getBoundingClientRect(),a=s.left+s.width/2,d=s.top+s.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:d,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",i)),await u(80),o.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",i)),o.dispatchEvent(new MouseEvent("click",i)),n("คลิกปุ่มตั้งค่าแล้ว"),await u(2500);let c=!1,r=null;const p=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const k of p){const w=k.getAttribute("aria-controls")||"",l=k.id||"";if(w.toUpperCase().includes("IMAGE")||l.toUpperCase().includes("IMAGE")){r=k,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${w})`);break}}if(!r)for(const k of document.querySelectorAll('[role="tab"]')){const w=k.id||"";if(w.toUpperCase().includes("TRIGGER-IMAGE")){r=k,n(`พบแท็บ Image ผ่าน id: ${w}`);break}}if(!r)for(const k of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const w=(k.textContent||"").trim();if(!(w.length>30)&&(w==="Image"||w.endsWith("Image")||w==="รูปภาพ"||w==="ภาพ"||w.includes("รูปภาพ"))&&!w.includes("Video")&&!w.includes("วิดีโอ")){const l=k.getBoundingClientRect();if(l.width>0&&l.height>0){r=k,n(`พบแท็บ Image ผ่านข้อความ: "${w}"`);break}}}if(r){const k=r.getAttribute("data-state")||"",w=r.getAttribute("aria-selected")||"";if(k==="active"||w==="true")c=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const l=r.getBoundingClientRect(),g={bubbles:!0,cancelable:!0,clientX:l.left+l.width/2,clientY:l.top+l.height/2,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",g)),await u(80),r.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",g)),r.dispatchEvent(new MouseEvent("click",g)),c=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await u(400)}}c||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const f=e==="horizontal"?"แนวนอน":"แนวตั้ง",h=e==="horizontal"?"landscape":"portrait";for(const k of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const w=(k.textContent||"").trim();if(!(w.length>30)&&(w===f||w.includes(f)||w.toLowerCase()===h||w.toLowerCase().includes(h))){const l=k.getBoundingClientRect(),g={bubbles:!0,cancelable:!0,clientX:l.left+l.width/2,clientY:l.top+l.height/2,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",g)),await u(80),k.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",g)),k.dispatchEvent(new MouseEvent("click",g)),n(`เลือกทิศทาง: ${f}`),await u(400);break}}const S=`x${t}`;for(const k of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const w=(k.textContent||"").trim();if(!(w.length>10)&&(w===S||w===`${t}`)){const l=k.getBoundingClientRect(),g={bubbles:!0,cancelable:!0,clientX:l.left+l.width/2,clientY:l.top+l.height/2,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",g)),await u(80),k.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",g)),k.dispatchEvent(new MouseEvent("click",g)),n(`เลือกจำนวน: ${S}`),await u(400);break}}return await u(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),o.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",i)),await u(80),o.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",i)),o.dispatchEvent(new MouseEvent("click",i)),n("ปิดหน้าตั้งค่าแล้ว"),await u(600),!0}async function yn(e){const t=e==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",o=e==="quality"?"Quality":"Fast",s=e==="quality"?"Fast":"Quality",a=e==="quality"?"คุณภาพ":"เร็ว",d=e==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${t} (${a}) ===`);let i=null;const c=Date.now()+1e4;for(;!i&&Date.now()<c;){const w=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const l of w){const g=(l.textContent||"").trim();if(!(g.length>80)&&(g.includes("Veo")||g.includes("veo"))&&(l.hasAttribute("aria-haspopup")||l.hasAttribute("aria-expanded")||l.getAttribute("role")==="combobox"||g.includes("arrow_drop_down")||l.querySelector("svg"))){i=l,n(`พบปุ่ม Veo dropdown (Strategy A): "${g.substring(0,50).trim()}"`);break}}if(!i)for(const l of w){const g=(l.textContent||"").trim();if(!(g.length>80)&&(g.includes("Veo")||g.includes("veo"))){const E=l.getBoundingClientRect();if(E.width>0&&E.height>0){i=l,n(`พบปุ่ม Veo dropdown (Strategy B): "${g.substring(0,50).trim()}"`);break}}}if(!i)for(const l of w){const g=(l.textContent||"").trim();if(!(g.length>50)&&(g.includes("Fast")||g.includes("Quality")||g.includes("เร็ว")||g.includes("คุณภาพ"))&&(l.hasAttribute("aria-haspopup")||l.hasAttribute("aria-expanded")||l.querySelector("svg"))){i=l,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${g.substring(0,50).trim()}"`);break}}if(!i){const l=document.querySelectorAll("div, span, button, [role='button']");for(const g of l){const E=(g.textContent||"").trim();if(E==="Veo 3.1 - Fast"||E==="Veo 3.1 - Quality"||E==="Fast"||E==="Quality"||E==="Veo 3.1 - เร็ว"||E==="Veo 3.1 - คุณภาพสูง"||E==="Veo 3.1 - คุณภาพ"||E==="Veo 2 - Fast"||E==="Veo 2 - Quality"){const V=g.getBoundingClientRect();if(V.width>0&&V.height>0){i=g,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${E}"`);break}}}}if(!i){const l=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const g of l){const E=(g.textContent||"").trim();if(!(E.length>60)&&(E.includes("3.1")||E.includes("model")||E.includes("โมเดล"))){const V=g.getBoundingClientRect();if(V.bottom>window.innerHeight*.4&&V.width>0&&V.height>0){i=g,n(`พบปุ่ม model selector (Strategy E): "${E.substring(0,50).trim()}"`);break}}}}i||await u(1e3)}if(!i)return M("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const r=(i.textContent||"").trim();if(r.includes(t)||r.includes(o)&&!r.includes(s)||r.includes(a)&&!r.includes(d))return n(`✅ Veo quality เป็น "${r}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=i.getBoundingClientRect(),f=p.left+p.width/2,h=p.top+p.height/2,S={bubbles:!0,cancelable:!0,clientX:f,clientY:h,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",S)),await u(80),i.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",S)),i.dispatchEvent(new MouseEvent("click",S)),n("คลิกเปิด Veo quality dropdown"),await u(1e3);let N=!1;const k=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const w of k){const l=(w.textContent||"").trim();if((l===t||l===o||l.includes(t)||l.includes(a))&&!l.includes("arrow_drop_down")){const E=w.getBoundingClientRect();if(E.width>0&&E.height>0){const V=E.left+E.width/2,R=E.top+E.height/2,O={bubbles:!0,cancelable:!0,clientX:V,clientY:R,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",O)),await u(80),w.dispatchEvent(new PointerEvent("pointerup",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",O)),w.dispatchEvent(new MouseEvent("click",O)),n(`✅ เลือก "${l}" สำเร็จ`),N=!0;break}}}return N?(await u(600),!0):(M(`ไม่พบตัวเลือก "${t}" หรือ "${a}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),document.body.click(),!1)}async function vn(e){var E,V,R,O;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,o=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),s=o?o[1]:"unknown",a=H?"macOS":oe?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",d=H?((V=(E=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:E[1])==null?void 0:V.replace(/_/g,"."))||"":oe&&((R=t.match(/Windows NT ([0-9.]+)/))==null?void 0:R[1])||"",i=navigator.language||"unknown",c=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${a} ${d} | Chrome ${s}`),n(`🌐 ภาษา: ${i} | หน้าจอ: ${c} | แพลตฟอร์ม: ${Fe}`),n("══════════════════════════════════════════");try{Ut(e.theme)}catch{}try{Yt(e.sceneCount||1)}catch(b){console.warn("Overlay show error:",b)}const r=[],p=[];if(e.needsNewProject){try{P("open-flow","done"),P("new-project","active"),n("=== สร้างโปรเจคใหม่ ===");let b=null;for(let _=0;_<15;_++){const B=document.querySelectorAll("button, [role='button']");for(const m of B){const C=(m.textContent||"").trim().toLowerCase();if(C.includes("new project")||C.includes("สร้างโปรเจค")||C.includes("โปรเจกต์ใหม่")){b=m;break}}if(!b){const m=document.querySelectorAll("i.google-symbols, i[class*='google-symbols']");for(const C of m)if((C.textContent||"").trim()==="add_2"){const x=C.closest("button");if(x){b=x;break}}}if(b)break;n(`⏳ รอปุ่ม New Project... (${_+1}/15)`),await u(1e3)}if(b){n(`✅ พบปุ่ม New Project: "${(b.textContent||"").trim().substring(0,30)}"`),await tt(b),await u(500),await tt(b),await u(2e3);let _=!1;for(let B=0;B<20;B++){const m=document.body.innerText||"";if(m.includes("Start creating")||m.includes("เริ่มสร้าง")||m.includes("What do you want to create")||m.includes("drop media")||document.querySelector("textarea, input[placeholder]")){_=!0;break}await u(500)}n(_?"✅ Workspace พร้อมแล้ว":"⚠️ Workspace อาจยังไม่โหลดเสร็จ — ดำเนินการต่อ"),P("new-project","done"),r.push("✅ New Project")}else M("ไม่พบปุ่ม New Project — อาจอยู่ใน workspace แล้ว ดำเนินการต่อ"),P("new-project","skipped"),r.push("⚠️ New Project (skipped)")}catch(b){M(`New Project error: ${b.message}`),P("new-project","error"),r.push("⚠️ New Project")}await u(3e3)}else{try{P("open-flow","skipped")}catch{}try{P("new-project","skipped")}catch{}await u(3e3)}try{P("settings","active");const b=e.orientation||"vertical",_=e.outputCount||1,B=await xn(b,_);r.push(B?"✅ Settings":"⚠️ Settings"),P("settings",B?"done":"error")}catch(b){M(`ตั้งค่าผิดพลาด: ${b.message}`),r.push("⚠️ Settings"),P("settings","error")}try{const b=e.veoQuality||"fast";await yn(b)?(r.push(`✅ Veo ${b}`),n(`✅ Veo quality: ${b}`)):(r.push("⚠️ Veo quality"),M("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(b){M(`Veo quality error: ${b.message}`),r.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),document.body.click(),await u(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const f=()=>{const b=document.querySelectorAll("span, div, p, label");for(const _ of b){const B=(_.textContent||"").trim();if(/^\d{1,3}%$/.test(B)){if(B==="100%")return null;const m=_.getBoundingClientRect();if(m.width>0&&m.height>0&&m.top>0&&m.top<window.innerHeight)return B}}return null},h=async b=>{n(`รอการอัพโหลด ${b} เสร็จ...`),await u(2e3);const _=Date.now(),B=6e4;let m="",C=Date.now();const x=15e3;for(;Date.now()-_<B;){const v=f();if(v){if(v!==m)m=v,C=Date.now(),n(`กำลังอัพโหลด: ${v} — รอ...`);else if(Date.now()-C>x){n(`✅ อัพโหลด ${b} — % ค้างที่ ${v} นาน ${x/1e3} วินาที ถือว่าเสร็จ`),await u(1e3);return}await u(1500)}else{n(`✅ อัพโหลด ${b} เสร็จ — ไม่พบตัวบอก %`),await u(1e3);return}}M(`⚠️ อัพโหลด ${b} หมดเวลาหลัง ${B/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){P("upload-char","active");try{const b=await He(e.characterImage,"character.png");r.push(b?"✅ ตัวละคร":"⚠️ ตัวละคร"),b||p.push("character upload failed"),P("upload-char",b?"done":"error")}catch(b){M(`อัพโหลดตัวละครผิดพลาด: ${b.message}`),r.push("❌ ตัวละคร"),p.push("character upload error"),P("upload-char","error")}await h("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500)}else Tt("upload-char");if(e.productImage){P("upload-prod","active");try{const b=await He(e.productImage,"product.png");r.push(b?"✅ สินค้า":"⚠️ สินค้า"),b||p.push("product upload failed"),P("upload-prod",b?"done":"error")}catch(b){M(`อัพโหลดสินค้าผิดพลาด: ${b.message}`),r.push("❌ สินค้า"),p.push("product upload error"),P("upload-prod","error")}await h("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500)}else Tt("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800);const S=f();S&&(n(`⚠️ อัพโหลดยังแสดง ${S} — รอเพิ่มเติม...`),await h("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await u(1e3);const N=(e.characterImage?1:0)+(e.productImage?1:0);if(N>0){let b=_t();b<N&&(n(`⏳ เห็นรูปย่อแค่ ${b}/${N} — รอ 3 วินาที...`),await u(3e3),b=_t()),b>=N?n(`✅ ยืนยันรูปย่ออ้างอิง: ${b}/${N}`):M(`⚠️ คาดว่าจะมี ${N} รูปย่อ แต่พบ ${b} — ดำเนินการต่อ`)}if($t()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{Nt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),P("img-prompt","active"),await u(1e3);const k=le();k?(await zt(k,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),r.push("✅ Prompt"),P("img-prompt","done")):(M("ไม่พบช่องป้อนข้อความ Prompt"),r.push("❌ Prompt"),p.push("prompt input not found"),P("img-prompt","error")),await u(800);const w=new Set;document.querySelectorAll("img").forEach(b=>{b.src&&w.add(b.src)}),n(`บันทึกรูปเดิม: ${w.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),P("img-generate","active"),await u(500);const l=ce();if(l){const b=l.getBoundingClientRect(),_=b.left+b.width/2,B=b.top+b.height/2,m={bubbles:!0,cancelable:!0,clientX:_,clientY:B,button:0};l.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",m)),await u(80),l.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",m)),l.dispatchEvent(new MouseEvent("click",m)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),r.push("✅ Generate"),await u(500),l.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",m)),await u(80),l.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",m)),l.dispatchEvent(new MouseEvent("click",m)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),P("img-generate","done")}else M("ไม่พบปุ่ม → Generate"),r.push("❌ Generate"),p.push("generate button not found"),P("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),P("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await u(15e3);const b=()=>{const x=document.querySelectorAll("div, span, p, label, strong, small");for(const v of x){if(v.closest("#netflow-engine-overlay"))continue;const A=(v.textContent||"").trim();if(A.length>10)continue;const I=A.match(/(\d{1,3})\s*%/);if(!I)continue;const y=parseInt(I[1],10);if(y<1||y>100)continue;if(J())return y;const $=v.getBoundingClientRect();if(!($.width===0||$.width>150)&&!($.top<0||$.top>window.innerHeight))return y}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let _=null,B=-1,m=0;const C=Date.now();for(;!_&&Date.now()-C<18e4;){const x=document.querySelectorAll("img");for(const v of x){if(w.has(v.src)||!(v.alt||"").toLowerCase().includes("generated"))continue;if(J()?v.naturalWidth>120&&v.naturalHeight>120:(()=>{const y=v.getBoundingClientRect();return y.width>120&&y.height>120&&y.top>0&&y.top<window.innerHeight*.85})()){const y=v.closest("div");if(y){_=y,n(`พบรูป AI จาก alt="${v.alt}": ${v.src.substring(0,80)}...${J()?" (hidden-mode)":""}`);break}}}if(!_)for(const v of x){if(w.has(v.src))continue;const A=v.closest("div"),I=(A==null?void 0:A.textContent)||"";if(I.includes("product.png")||I.includes("character.png")||I.includes(".png")||I.includes(".jpg"))continue;if(J()?v.naturalWidth>120&&v.naturalHeight>120:(()=>{const $=v.getBoundingClientRect();return $.width>120&&$.height>120&&$.top>0&&$.top<window.innerHeight*.85})()){const $=v.closest("div");if($){_=$,n(`พบรูปใหม่ (สำรอง): ${v.src.substring(0,80)}...${J()?" (hidden-mode)":""}`);break}}}if(!_){if($t()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const v=m>0?Date.now()-m:1/0;if(B<20||v>3e4){const I=Ue();if(I){M(`❌ สร้างรูปล้มเหลว: ${I}`),p.push(`image gen failed: ${I}`),P("img-wait","error");break}}const A=b();if(A!==null)A!==B&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${A}%`),B=A,P("img-wait","active",A)),m=Date.now();else if(B>30){const I=Math.floor((Date.now()-m)/1e3);I>=3&&n(`🖼️ % หายที่ ${B}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&I>=5&&B>50&&(n("🍎 Tab ซ่อน + รูปน่าจะเสร็จ → เปิด tab เต็มเพื่อตรวจหารูป"),await bt(),await u(3e3))}document.hidden&&B>0&&Date.now()-m>1e4&&await Et(),document.hidden&&B<1&&Date.now()-C>3e4&&await Et(),await u(3e3)}}if(!_)M("หมดเวลารอรูปที่สร้าง"),r.push("⚠️ Wait Image"),P("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),r.push("✅ Image Found"),P("img-wait","done",100),await bt();const x=_.getBoundingClientRect(),v=x.left+x.width/2,A=x.top+x.height/2,I={bubbles:!0,cancelable:!0,clientX:v,clientY:A};_.dispatchEvent(new PointerEvent("pointerenter",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),_.dispatchEvent(new MouseEvent("mouseenter",I)),_.dispatchEvent(new PointerEvent("pointerover",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),_.dispatchEvent(new MouseEvent("mouseover",I)),_.dispatchEvent(new PointerEvent("pointermove",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),_.dispatchEvent(new MouseEvent("mousemove",I)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await u(1500);let y=null;for(const $ of["more_vert","more_horiz","more"]){const q=re($);for(const T of q){const D=T.getBoundingClientRect();if(D.top>=x.top-20&&D.top<=x.bottom&&D.right>=x.right-150&&D.right<=x.right+20){y=T;break}}if(y)break}if(!y){const $=document.querySelectorAll("button");for(const q of $){const T=q.getBoundingClientRect();if(T.width<50&&T.height<50&&T.top>=x.top-10&&T.top<=x.top+60&&T.left>=x.right-80){const D=q.querySelectorAll("i");for(const z of D)if((((O=z.textContent)==null?void 0:O.trim())||"").includes("more")){y=q;break}if(y)break;const L=q.getAttribute("aria-label")||"";if(L.includes("เพิ่มเติม")||L.includes("more")){y=q;break}}}}if(!y)M("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),r.push("⚠️ 3-dots");else{const $=y.getBoundingClientRect(),q=$.left+$.width/2,T=$.top+$.height/2,D={bubbles:!0,cancelable:!0,clientX:q,clientY:T,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",D)),await u(80),y.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",D)),y.dispatchEvent(new MouseEvent("click",D)),n("คลิกปุ่ม 3 จุดแล้ว"),await u(1500);let L=null;const z=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const Y of z){const F=(Y.textContent||"").trim();if(F.includes("ทำให้เป็นภาพเคลื่อนไหว")||F.includes("Animate")||F.includes("animate")){L=Y;break}}if(!L)M("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),r.push("⚠️ Animate");else{const Y=L.getBoundingClientRect(),F=Y.left+Y.width/2,K=Y.top+Y.height/2,G={bubbles:!0,cancelable:!0,clientX:F,clientY:K,button:0};L.dispatchEvent(new PointerEvent("pointerdown",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mousedown",G)),await u(80),L.dispatchEvent(new PointerEvent("pointerup",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mouseup",G)),L.dispatchEvent(new MouseEvent("click",G)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),r.push("✅ Animate"),P("animate","done"),await u(3e3)}}}}catch(b){M(`ขั้น 4 ผิดพลาด: ${b.message}`),r.push("⚠️ Animate")}if($t()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{Nt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),P("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await u(3e3);let b=!1;const _=document.querySelectorAll("button, span, div");for(const x of _){const v=(x.textContent||"").trim(),A=x.getBoundingClientRect();if((v==="วิดีโอ"||v==="Video"||v.includes("วิดีโอ"))&&A.bottom>window.innerHeight*.7){b=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}b||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let B=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise(v=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>v())),B=!0;const x=Date.now();for(;document.hidden&&Date.now()-x<5e3;)await u(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await u(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await u(1e3);let m=!1;for(let x=1;x<=5&&!m;x++){if(x>1&&document.hidden){n(`🔄 Retry ${x}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(y=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>y())),B=!0;const I=Date.now();for(;document.hidden&&Date.now()-I<5e3;)await u(200);document.hidden||await u(2e3)}catch{}}const v=le();if(!v){n(`⚠️ ครั้งที่ ${x}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await u(3e3);continue}x>1&&(v.focus(),await u(500)),await zt(v,e.videoPrompt),await u(500);const A=(v.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();A.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${x} (${A.length} ตัวอักษร)`),r.push("✅ Video Prompt"),P("vid-prompt","done"),m=!0):(n(`⚠️ ครั้งที่ ${x}: Prompt ไม่ถูกวาง (ได้ ${A.length} ตัวอักษร)`),await u(1500))}if(!m)throw M("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),r.push("❌ Video Prompt"),p.push("video prompt paste failed after 5 attempts"),P("vid-prompt","error"),new Error("Video prompt paste failed");await u(1e3),P("vid-generate","active");const C=ce();if(C){const x=C.getBoundingClientRect(),v=x.left+x.width/2,A=x.top+x.height/2,I={bubbles:!0,cancelable:!0,clientX:v,clientY:A,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",I)),await u(80),C.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",I)),C.dispatchEvent(new MouseEvent("click",I)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),r.push("✅ Video Generate"),P("vid-generate","done"),await u(500),C.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",I)),await u(80),C.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",I)),C.dispatchEvent(new MouseEvent("click",I)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else M("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),r.push("❌ Video Generate"),p.push("video generate button not found"),P("vid-generate","error");if(B){await u(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(b){M(`ขั้น 5 ผิดพลาด: ${b.message}`),r.push("⚠️ Video Gen"),p.push(`video gen error: ${b.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),Tt("animate"),Tt("vid-prompt"),Tt("vid-generate"),Tt("vid-wait");if(e.videoPrompt){P("vid-wait","active");const b=e.sceneCount||1,_=e.videoScenePrompts||[e.videoPrompt];if(b>1)try{ln(b)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${b>1?`ต่อ ${b} ฉาก`:"ดาวน์โหลด"} ===`);const B=()=>{const x=document.querySelectorAll("div, span, p, label, strong, small");for(const v of x){if(v.closest("#netflow-engine-overlay"))continue;const A=(v.textContent||"").trim();if(A.length>10)continue;const I=A.match(/(\d{1,3})\s*%/);if(!I)continue;const y=parseInt(I[1],10);if(y<1||y>100)continue;if(J())return y;const $=v.getBoundingClientRect();if(!($.width===0||$.width>150)&&!($.top<0||$.top>window.innerHeight))return y}return null},m=async(x=6e5)=>{n("รอการสร้างวิดีโอ..."),P("vid-wait","active"),await u(5e3);const v=()=>{const W=document.querySelectorAll("div, span, p, label, strong, small");let X=0;for(const ot of W){if(ot.closest("#netflow-engine-overlay"))continue;const j=(ot.textContent||"").trim();if(j.includes("%")&&j.length<15){const rt=ot.tagName.toLowerCase(),st=ot.className&&typeof ot.className=="string"?ot.className.split(/\s+/).slice(0,2).join(" "):"",et=ot.getBoundingClientRect();if(n(`  🔍 "${j}" ใน <${rt}.${st}> ที่ (${et.left.toFixed(0)},${et.top.toFixed(0)}) w=${et.width.toFixed(0)}`),X++,X>=5)break}}X===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},A=async(W,X)=>{n(`🔄 Policy Retry ${X}/2 — สร้าง Safe Prompt แล้วลองใหม่...`),await bt(),await u(2e3);const ot=le();if(!ot)return M("❌ Retry: ไม่พบช่อง Prompt"),!1;ot.focus(),await u(300);const j=window.getSelection();j&&j.selectAllChildren(ot),await u(200),ot.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"deleteContentBackward"})),ot.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"deleteContentBackward"})),await u(500);let rt=fn(W);X>=2&&(rt=rt.substring(0,600).replace(/\s\S*$/,"").trim(),n(`🛡️ 2nd retry: ultra-short prompt (${rt.length} chars)`)),await zt(ot,rt),await u(500);const st=(ot.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(st.length<20)return M(`❌ Retry: วาง Safe Prompt ไม่สำเร็จ (${st.length} ตัวอักษร)`),!1;n(`✅ วาง Safe Prompt สำเร็จ (${st.length} ตัวอักษร)`),await u(500);const et=ce();if(!et)return M("❌ Retry: ไม่พบปุ่ม Generate"),!1;const ut=et.getBoundingClientRect(),wt=ut.left+ut.width/2,je=ut.top+ut.height/2,Vt={bubbles:!0,cancelable:!0,clientX:wt,clientY:je,button:0};return et.dispatchEvent(new PointerEvent("pointerdown",{...Vt,pointerId:1,isPrimary:!0,pointerType:"mouse"})),et.dispatchEvent(new MouseEvent("mousedown",Vt)),await u(80),et.dispatchEvent(new PointerEvent("pointerup",{...Vt,pointerId:1,isPrimary:!0,pointerType:"mouse"})),et.dispatchEvent(new MouseEvent("mouseup",Vt)),et.dispatchEvent(new MouseEvent("click",Vt)),n(`✅ คลิก Generate สำหรับ Safe Retry ${X}`),await u(5e3),!0},I=ae();n(I?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),v();const y=Date.now();let $=-1,q=0,T=!1,D=0;const L=2;for(;Date.now()-y<x;){const W=B();if(W!==null){if(W!==$&&(n(`ความคืบหน้าวิดีโอ: ${W}%`),$=W,P("vid-wait","active",W)),q=Date.now(),W>=100){n("✅ ตรวจพบ 100%!"),T=!0;break}}else if($>30){const X=Math.floor((Date.now()-q)/1e3);if(X>=5){n(`✅ % หายไปที่ ${$}% (หาย ${X} วินาที) — วิดีโอเสร็จ!`),T=!0;break}n(`⏳ % หายที่ ${$}% — ยืนยันใน ${5-X} วินาที...`)}else{const X=Math.floor((Date.now()-y)/1e3);X%15<3&&n(`⏳ รอ... (${X} วินาที) ไม่พบ %`)}if(!T&&$>0&&ae(!0)&&!I){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${$}% — วิดีโอเสร็จ!`),T=!0;break}if($t())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if($<1){const X=Ue();if(X){if(M(`❌ สร้างวิดีโอล้มเหลว: ${X}`),D<L&&e.videoPrompt)if(D++,n(`🔄 Policy violation detected — attempting safe retry ${D}/${L}...`),await A(e.videoPrompt,D)){$=-1,q=0,n(`✅ Safe retry ${D} started — continuing to monitor...`);continue}else M(`❌ Safe retry ${D} failed to start`);return null}}document.hidden&&$>0&&Date.now()-q>1e4&&await Et(),document.hidden&&$<1&&Date.now()-y>3e4&&await Et(),await u(3e3)}await bt();let z=null;for(let W=1;W<=10&&(z=ae(),!z);W++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${W}/10)`),W%3===0&&await bt(),await u(3e3);if(!z)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),P("vid-wait","error"),null;const Y=z;T?(P("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await u(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const F=Y.getBoundingClientRect();let K=F.left+F.width/2,G=F.top+F.height/2,Q=Y;const mt=Y.querySelector("video, img, canvas");if(mt){const W=mt.getBoundingClientRect();W.width>50&&W.height>50&&(K=W.left+W.width/2,G=W.top+W.height/2,Q=mt,n(`🎯 พบรูปย่อ <${mt.tagName.toLowerCase()}> ในการ์ดที่ (${K.toFixed(0)},${G.toFixed(0)}) ${W.width.toFixed(0)}x${W.height.toFixed(0)}`))}else G=F.top+F.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${K.toFixed(0)},${G.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${K.toFixed(0)}, ${G.toFixed(0)})...`),Pt(Q);for(let W=0;W<8;W++){const X={bubbles:!0,cancelable:!0,clientX:K+W%2,clientY:G};Q.dispatchEvent(new PointerEvent("pointermove",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Q.dispatchEvent(new MouseEvent("mousemove",X)),await u(500)}try{chrome.storage.local.set({[gt()]:{timestamp:Date.now(),action:"mute_video",sceneCount:b,scenePrompts:_,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${b} ฉาก, ${_.length} prompts, theme: ${e.theme})`)}catch(W){n(`⚠️ ไม่สามารถบันทึก pending action: ${W.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await C(Q),n("✅ คลิกการ์ดวิดีโอเสร็จ"),Y},C=async x=>{const v=x.getBoundingClientRect(),A=v.left+v.width/2,I=v.top+v.height/2,y={bubbles:!0,cancelable:!0,clientX:A,clientY:I,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",y)),await u(80),x.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",y)),x.dispatchEvent(new MouseEvent("click",y)),await u(50),x.click(),n("คลิกการ์ดวิดีโอแล้ว"),await u(2e3)};try{if(!await m())M("หมดเวลารอการสร้างวิดีโอ"),r.push("⚠️ Video Wait"),P("vid-wait","error");else{r.push("✅ Video Complete"),P("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await u(3e3);const v=await new Promise(A=>{chrome.storage.local.get(gt(),I=>{if(chrome.runtime.lastError){A(null);return}A((I==null?void 0:I[gt()])||null)})});v&&!v._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(gt()),v.action==="mute_video"?await Ge(v.sceneCount||1,v.scenePrompts||[],v.theme):v.action==="wait_scene_gen_and_download"&&await We(v.sceneCount||2,v.currentScene||2,v.theme,v.scenePrompts||[]))}}catch(x){M(`ขั้น 6 ผิดพลาด: ${x.message}`),r.push("⚠️ Step6"),p.push(`step 6: ${x.message}`)}}const g=p.length===0;try{Nt(g?5e3:8e3)}catch(b){console.warn("Overlay complete error:",b)}return{success:g,message:g?`สำเร็จ! ${r.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${r.join(" → ")} | ${p.join(", ")}`,step:g?"done":"partial"}}async function Ge(e,t=[],o){var V;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{o&&Ut(o)}catch{}try{Yt(e)}catch(R){n(`⚠️ showOverlay error: ${R.message}`)}try{const R=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const O of R)P(O,"done");e>=2&&P("scene2-prompt","active"),n(`✅ overlay restored: ${R.length} steps done, sceneCount=${e}`)}catch(R){n(`⚠️ overlay restore error: ${R.message}`)}await u(1500);const s=(()=>{for(const R of document.querySelectorAll("button")){const O=R.querySelectorAll("i");for(const _ of O){const B=(_.textContent||"").trim();if(B==="volume_up"||B==="volume_off"||B==="volume_mute"){const m=R.getBoundingClientRect();if(m.width>0&&m.height>0)return R}}const b=(R.getAttribute("aria-label")||"").toLowerCase();if(b.includes("mute")||b.includes("ปิดเสียง")){const _=R.getBoundingClientRect();if(_.width>0&&_.height>0)return R}}return null})();s?(s.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let a=null;if(e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await u(2e3);for(let T=2;T<=e;T++){const D=t[T-1];if(!D){M(`ไม่พบ prompt สำหรับฉากที่ ${T}`);continue}n(`── ฉากที่ ${T}/${e}: วาง prompt + generate ──`);let L=null;const z=Date.now();for(;!L&&Date.now()-z<1e4;){const j=document.querySelectorAll("[data-slate-editor='true']");if(j.length>0&&(L=j[j.length-1]),!L){const rt=document.querySelectorAll("[role='textbox'][contenteditable='true']");rt.length>0&&(L=rt[rt.length-1])}L||await u(1e3)}if(!L){M("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${L.tagName.toLowerCase()}> ${L.className.substring(0,40)}`),await zt(L,D),n(`วาง prompt ฉาก ${T} (${D.length} ตัวอักษร) ✅`);try{P(`scene${T}-prompt`,"done"),P(`scene${T}-gen`,"active")}catch{}await u(1e3);const Y=L.getBoundingClientRect();let F=null,K=1/0;for(const j of document.querySelectorAll("button")){if(j.disabled)continue;const rt=j.querySelectorAll("i");let st=!1;for(const wt of rt)if((wt.textContent||"").trim()==="arrow_forward"){st=!0;break}if(!st)continue;const et=j.getBoundingClientRect();if(et.width<=0||et.height<=0)continue;const ut=Math.abs(et.top-Y.top)+Math.abs(et.right-Y.right);ut<K&&(K=ut,F=j)}if(!F)for(const j of document.querySelectorAll("button")){const rt=j.querySelectorAll("i");for(const st of rt)if((st.textContent||"").trim()==="arrow_forward"){const et=j.getBoundingClientRect();if(et.width>0&&et.height>0){F=j;break}}if(F)break}if(!F){M("ไม่พบปุ่ม Generate/Send");return}await new Promise(j=>{chrome.storage.local.set({[gt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:T,scenePrompts:t}},()=>j())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${T}/${e})`),await tt(F),n(`คลิก Generate ฉาก ${T} ✅`);try{P(`scene${T}-gen`,"done"),P(`scene${T}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${T} gen เสร็จ ──`),await u(5e3);let G=0,Q=0;const mt=Date.now(),W=6e5,X=5e3;let ot=!1;for(;Date.now()-mt<W;){let j=null;const rt=document.querySelectorAll("div, span, p, label, strong, small");for(const st of rt){if(st.closest("#netflow-engine-overlay"))continue;const ut=(st.textContent||"").trim().match(/^(\d{1,3})%$/);if(ut){const wt=st.getBoundingClientRect();if(wt.width>0&&wt.height>0&&wt.width<120&&wt.height<60){j=parseInt(ut[1],10);break}}}if(j!==null){if(j!==G){n(`🎬 ฉาก ${T} ความคืบหน้า: ${j}%`),G=j;try{P(`scene${T}-wait`,"active",j)}catch{}}Q=0}else if(G>0){if(Q===0)Q=Date.now(),n(`🔍 ฉาก ${T}: % หายไป (จาก ${G}%) — กำลังยืนยัน...`);else if(Date.now()-Q>=X){n(`✅ ฉาก ${T}: % หายไป ${X/1e3} วินาที — เจนเสร็จ!`),ot=!0;break}}if($t()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&G>0&&Q===0&&await Et(),await u(2e3)}ot||M(`ฉาก ${T} หมดเวลา`),n(`✅ ฉาก ${T} เสร็จแล้ว`);try{P(`scene${T}-wait`,"done",100)}catch{}chrome.storage.local.remove(gt()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await u(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{P("download","active")}catch{}let R=!1;if(await bt()&&document.hidden===!1&&(R=!0),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(T=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>T())),R=!0,await u(H?8e3:5e3)}catch{}}await u(H?3e3:2e3);const b=Date.now();let _=null;const B=Date.now();for(;!_&&Date.now()-B<(H?15e3:1e4);){for(const T of document.querySelectorAll("button")){const D=T.querySelector("i");if(D&&(D.textContent||"").trim()==="download"){const L=T.getBoundingClientRect();if(L.width>0&&L.height>0){_=T;break}}}_||await u(1e3)}if(!_){if(M("ไม่พบปุ่มดาวน์โหลด"),R)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await tt(_),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await u(H?3e3:1500);const m=(T,D)=>new Promise(async L=>{const z=Date.now();for(;Date.now()-z<D;){const Y="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const F of document.querySelectorAll(Y)){const K=(F.textContent||"").trim();if(K.includes(T)&&K.length<100){const G=F.getBoundingClientRect();if(G.width>0&&G.height>0){L(F);return}}}await u(500)}L(null)}),C=(T,D)=>new Promise(async L=>{const z=Date.now();for(;Date.now()-z<T;){const Y="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const F of document.querySelectorAll(Y)){const K=(F.textContent||"").trim();if(K.includes("720p")&&K.length<50){const Q=F.getBoundingClientRect();if(Q.width>0&&Q.height>0){L(F);return}}const G=F.querySelectorAll("span");for(const Q of G)if((Q.textContent||"").trim()==="720p"){const mt=F.getBoundingClientRect();if(mt.width>0&&mt.height>0){L(F);return}}}D!=null&&D.isConnected&&Pt(D),await u(500)}L(null)});let x=null;for(let T=0;T<(H?5:3)&&!x;T++){T>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${T+1}...`),_.isConnected&&(await tt(_),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await u(H?3e3:2e3)));const D=await m("Full Video",H?1e4:5e3);if(!D){M("ไม่พบ Full Video");continue}Pt(D),await u(H?1e3:500),await tt(D),n("คลิก/hover Full Video ✅"),await u(H?3e3:2e3),x=await C(H?12e3:8e3,D)}if(!x){if(M("ไม่พบ 720p"),R)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await tt(x),n("คลิก 720p ✅"),R){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const v=Date.now();let A=!1,I=!1;for(;Date.now()-v<3e5;){for(const T of document.querySelectorAll("div[data-title] div, div[data-content] div")){const D=(T.textContent||"").trim();if(D==="Download complete!"||D==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),A=!0;break}(D.includes("Downloading your extended video")||D.includes("กำลังดาวน์โหลด"))&&(I||(I=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(A)break;if(I){let T=!1;for(const D of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((D.textContent||"").trim().includes("Downloading")){T=!0;break}if(!T){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),A=!0;break}}if($t()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await u(2e3)}if(!A){M("เตรียมไฟล์หมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await u(5e3);let y=!1;const $=Date.now();for(;Date.now()-$<6e4&&!y;){try{await new Promise(T=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:b},D=>{chrome.runtime.lastError?M(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):D!=null&&D.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${D.message}`),y=!0,D.downloadUrl&&(a=D.downloadUrl,n(`[TikTok] จะใช้ download URL: ${D.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-$)/1e3)}s)`),T()})})}catch(T){M(`ตรวจสอบผิดพลาด: ${T.message}`)}y||await u(3e3)}y||M("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const q=await ee();a||(a=q);try{P("open","done"),Nt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),ne(a),te(2e3);return}if(n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await bt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(R=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>R())),await u(H?8e3:5e3)}catch{}}await u(H?3e3:2e3);const d=(R,O="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const b of document.querySelectorAll(O)){const _=(b.textContent||"").trim();if(_.includes(R)&&_.length<100){const B=b.getBoundingClientRect();if(B.width>0&&B.height>0&&B.top>=0)return b}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let i=null;const c=Date.now();for(;!i&&Date.now()-c<(H?15e3:1e4);){for(const R of document.querySelectorAll("button, [role='button']")){const O=(R.textContent||"").trim(),b=O.toLowerCase();if((b.includes("download")||b.includes("ดาวน์โหลด"))&&O.length<80){const _=R.getBoundingClientRect();if(_.width>0&&_.height>0){i=R;break}}}if(!i)for(const R of document.querySelectorAll("button")){const O=(R.getAttribute("aria-label")||"").toLowerCase();if(O.includes("download")||O.includes("ดาวน์")){const b=R.getBoundingClientRect();if(b.width>0&&b.height>0){i=R;break}}}i||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await u(1e3))}if(!i){M("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(i.textContent||"").trim().substring(0,40)}"`),await tt(i),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await u(H?3e3:1500);const r=Date.now();let p=null;const f=Date.now();for(;!p&&Date.now()-f<(H?1e4:5e3);)p=d("1080p"),p||(n("รอ 1080p..."),await u(500));if(!p){M("ไม่พบ 1080p");return}await tt(p),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const h=Date.now();let S=!1,N=!1,k=0;const w=3e3;for(;Date.now()-h<3e5;){const O=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(O.includes("upscaling complete")||O.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),S=!0;break}for(const _ of document.querySelectorAll("div, span, p")){const B=(_.textContent||"").trim().toLowerCase();if(B.length<60&&(B.includes("upscaling complete")||B.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(V=_.textContent)==null?void 0:V.trim()}")`),S=!0;break}}if(S)break;if(O.includes("upscaling your video")||O.includes("กำลังอัปสเกล")){N=!0,k=0;const _=Math.floor((Date.now()-h)/1e3);n(`⏳ กำลังอัปสเกล... (${_} วินาที)`)}else if(N){if(k===0)k=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-k>=w){n(`✅ ข้อความ Upscaling หายไป ${w/1e3} วินาที — เสร็จ!`),S=!0;break}}else{const _=Math.floor((Date.now()-h)/1e3);_%10<3&&n(`⏳ รอ Upscale... (${_} วินาที)`)}if($t()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await u(2e3)}if(!S){M("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await u(5e3);let l=!1;const g=Date.now();for(;Date.now()-g<6e4&&!l;){try{await new Promise(R=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:r},O=>{chrome.runtime.lastError?M(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):O!=null&&O.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${O.message}`),l=!0,O.downloadUrl&&(a=O.downloadUrl,n(`[TikTok] จะใช้ download URL: ${O.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-g)/1e3)}s)`),R()})})}catch(R){M(`ตรวจสอบผิดพลาด: ${R.message}`)}l||await u(3e3)}l||M("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const E=await ee();a||(a=E),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),ne(a),te(2e3)}async function We(e=2,t=2,o,s=[]){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{o&&Ut(o)}catch{}try{Yt(e)}catch(m){n(`⚠️ showOverlay error: ${m.message}`)}try{const m=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let C=2;C<=t;C++)m.push(`scene${C}-prompt`,`scene${C}-gen`),C<t&&m.push(`scene${C}-wait`);for(const C of m)P(C,"done");P(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${m.length} steps done (scene ${t}/${e} navigate)`)}catch(m){n(`⚠️ overlay restore error: ${m.message}`)}await u(2e3);const a=(()=>{for(const m of document.querySelectorAll("button")){const C=m.querySelectorAll("i");for(const x of C){const v=(x.textContent||"").trim();if(v==="volume_up"||v==="volume_off"||v==="volume_mute"){const A=m.getBoundingClientRect();if(A.width>0&&A.height>0)return m}}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);let d=0,i=0;const c=Date.now(),r=6e5,p=5e3;let f=!1,h=0;for(;Date.now()-c<r;){let m=null;const C=document.querySelectorAll("div, span, p, label, strong, small");for(const x of C){if(x.closest("#netflow-engine-overlay"))continue;const A=(x.textContent||"").trim().match(/^(\d{1,3})%$/);if(A){const I=x.getBoundingClientRect();if(I.width>0&&I.height>0&&I.width<120&&I.height<60){m=parseInt(A[1],10);break}}}if(m!==null){if(h=0,m!==d){n(`🎬 scene ${t} ความคืบหน้า: ${m}%`),d=m;try{P(`scene${t}-wait`,"active",m)}catch{}}i=0}else if(d>0){if(i===0)i=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${d}%) — กำลังยืนยัน...`);else if(Date.now()-i>=p){n(`✅ scene ${t}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),f=!0;break}}else if(h++,h>=15){const x=document.querySelectorAll("video");let v=!1;for(const A of x)if(A.readyState>=2&&!A.paused&&A.getBoundingClientRect().width>200){v=!0;break}if(v){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),f=!0;break}if(h>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),f=!0;break}}document.hidden&&d>0&&i===0&&await Et(),await u(2e3)}f||n(`⚠️ scene ${t} หมดเวลา — ลองต่อไป`);try{P(`scene${t}-wait`,"done",100)}catch{}if(n(`✅ scene ${t} เสร็จ`),t<e&&s.length>0){n(`═══ ยังเหลืออีก ${e-t} ฉาก — ต่อฉากถัดไป ═══`),await u(2e3);for(let m=t+1;m<=e;m++){const C=s[m-1];if(!C){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${m} — ข้าม`);continue}n(`── ฉากที่ ${m}/${e}: วาง prompt + generate (pending recovery) ──`);let x=null;const v=Date.now();for(;!x&&Date.now()-v<1e4;){const z=document.querySelectorAll("[data-slate-editor='true']");if(z.length>0&&(x=z[z.length-1]),!x){const Y=document.querySelectorAll("[role='textbox'][contenteditable='true']");Y.length>0&&(x=Y[Y.length-1])}x||await u(1e3)}if(!x){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${m}`);break}await zt(x,C),n(`วาง prompt ฉาก ${m} (${C.length} ตัวอักษร) ✅`);try{P(`scene${m}-prompt`,"done"),P(`scene${m}-gen`,"active")}catch{}await u(1e3);const A=x.getBoundingClientRect();let I=null,y=1/0;for(const z of document.querySelectorAll("button")){if(z.disabled)continue;const Y=z.querySelectorAll("i");let F=!1;for(const Q of Y)if((Q.textContent||"").trim()==="arrow_forward"){F=!0;break}if(!F)continue;const K=z.getBoundingClientRect();if(K.width<=0||K.height<=0)continue;const G=Math.abs(K.top-A.top)+Math.abs(K.right-A.right);G<y&&(y=G,I=z)}if(!I)for(const z of document.querySelectorAll("button")){const Y=z.querySelectorAll("i");for(const F of Y)if((F.textContent||"").trim()==="arrow_forward"){const K=z.getBoundingClientRect();if(K.width>0&&K.height>0){I=z;break}}if(I)break}if(!I){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${m}`);break}await new Promise(z=>{chrome.storage.local.set({[gt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:m,scenePrompts:s}},()=>z())}),await tt(I),n(`คลิก Generate ฉาก ${m} ✅`);try{P(`scene${m}-gen`,"done"),P(`scene${m}-wait`,"active")}catch{}await u(5e3);let $=0,q=0;const T=Date.now();let D=!1,L=0;for(;Date.now()-T<6e5;){let z=null;const Y=document.querySelectorAll("div, span, p, label, strong, small");for(const F of Y){if(F.closest("#netflow-engine-overlay"))continue;const G=(F.textContent||"").trim().match(/^(\d{1,3})%$/);if(G){const Q=F.getBoundingClientRect();if(Q.width>0&&Q.height>0&&Q.width<120&&Q.height<60){z=parseInt(G[1],10);break}}}if(z!==null){if(L=0,z!==$){n(`🎬 ฉาก ${m} ความคืบหน้า: ${z}%`),$=z;try{P(`scene${m}-wait`,"active",z)}catch{}}q=0}else if($>0){if(q===0)q=Date.now();else if(Date.now()-q>=5e3){n(`✅ ฉาก ${m}: เจนเสร็จ!`),D=!0;break}}else if(L++,L>=15){const F=document.querySelectorAll("video");let K=!1;for(const G of F)if(G.readyState>=2&&!G.paused&&G.getBoundingClientRect().width>200){K=!0;break}if(K){n(`✅ ฉาก ${m}: พบวิดีโอเล่นอยู่ — เสร็จ`),D=!0;break}if(L>=30){n(`✅ ฉาก ${m}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),D=!0;break}}document.hidden&&$>0&&q===0&&await Et(),await u(2e3)}D||n(`⚠️ ฉาก ${m} หมดเวลา`);try{P(`scene${m}-wait`,"done",100)}catch{}n(`✅ ฉาก ${m} เสร็จแล้ว`),chrome.storage.local.remove(gt()),await u(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await u(3e3);let S=null;try{P("download","active")}catch{}if(n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──"),await bt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(m=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>m())),await u(H?8e3:5e3)}catch{}}await u(H?3e3:2e3);const N=Date.now();let k=null;const w=Date.now();for(;!k&&Date.now()-w<(H?15e3:1e4);){for(const m of document.querySelectorAll("button")){const C=m.querySelector("i");if(C&&(C.textContent||"").trim()==="download"){const x=m.getBoundingClientRect();if(x.width>0&&x.height>0){k=m;break}}}k||await u(1e3)}if(!k){M("ไม่พบปุ่มดาวน์โหลด");return}await tt(k),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await u(H?3e3:1500);const l=(m,C)=>new Promise(async x=>{const v=Date.now();for(;Date.now()-v<C;){const A="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const I of document.querySelectorAll(A)){const y=(I.textContent||"").trim();if(y.includes(m)&&y.length<100){const $=I.getBoundingClientRect();if($.width>0&&$.height>0){x(I);return}}}await u(500)}x(null)}),g=(m,C)=>new Promise(async x=>{const v=Date.now();for(;Date.now()-v<m;){const A="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const I of document.querySelectorAll(A)){const y=(I.textContent||"").trim();if(y.includes("720p")&&y.length<50){const q=I.getBoundingClientRect();if(q.width>0&&q.height>0){x(I);return}}const $=I.querySelectorAll("span");for(const q of $)if((q.textContent||"").trim()==="720p"){const T=I.getBoundingClientRect();if(T.width>0&&T.height>0){x(I);return}}}C!=null&&C.isConnected&&Pt(C),await u(500)}x(null)});let E=null;for(let m=0;m<(H?5:3)&&!E;m++){m>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${m+1}...`),k.isConnected&&(await tt(k),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await u(H?3e3:2e3)));const C=await l("Full Video",H?1e4:5e3);if(!C){M("ไม่พบ Full Video");continue}Pt(C),await u(H?1e3:500),await tt(C),n("คลิก/hover Full Video ✅"),await u(H?3e3:2e3),E=await g(H?12e3:8e3,C)}if(!E){M("ไม่พบ 720p");return}await tt(E),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const V=Date.now();let R=!1,O=!1;for(;Date.now()-V<3e5;){for(const m of document.querySelectorAll("div[data-title] div, div[data-content] div")){const C=(m.textContent||"").trim();if(C==="Download complete!"||C==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),R=!0;break}(C.includes("Downloading your extended video")||C.includes("กำลังดาวน์โหลด"))&&(O||(O=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(R)break;if(O){let m=!1;for(const C of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((C.textContent||"").trim().includes("Downloading")){m=!0;break}if(!m){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),R=!0;break}}await u(2e3)}if(!R){M("เตรียมไฟล์หมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await u(5e3);let b=!1;const _=Date.now();for(;Date.now()-_<6e4&&!b;){try{await new Promise(m=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:N},C=>{chrome.runtime.lastError?M(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):C!=null&&C.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${C.message}`),b=!0,C.downloadUrl&&(S=C.downloadUrl,n(`[TikTok] จะใช้ download URL: ${C.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-_)/1e3)}s)`),m()})})}catch(m){M(`ตรวจสอบผิดพลาด: ${m.message}`)}b||await u(3e3)}b||M("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const B=await ee();S||(S=B);try{P("open","done"),Nt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),ne(S),te(2e3)}async function $n(){try{await dn;const e=gt();let t=await new Promise(i=>{chrome.storage.local.get(e,c=>{if(chrome.runtime.lastError){i(null);return}i((c==null?void 0:c[e])||null)})});if(!t&&It){const i="netflow_pending_action";t=await new Promise(c=>{chrome.storage.local.get(i,r=>{if(chrome.runtime.lastError){c(null);return}c((r==null?void 0:r[i])||null)})}),t&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(i))}if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const s=Date.now()-t.timestamp;if(s>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(e);return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=a,await new Promise(i=>{chrome.storage.local.set({[e]:t},()=>i())}),await u(300),!await new Promise(i=>{chrome.storage.local.get(e,c=>{const r=c==null?void 0:c[e];i((r==null?void 0:r._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(e),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(s/1e3)} วินาที)`),t.action==="mute_video"?await Ge(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await We(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,o)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),o({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),vn(e).then(s=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${s.message}`),Oe()}).catch(s=>{if(s instanceof ie||(s==null?void 0:s.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Ft("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Be()}catch{}}else console.error("[Netflow AI] Generate error:",s);Oe()}),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,o({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return o({status:"ready"}),!1;if((e==null?void 0:e.type)==="CAPTURE_PAGE_VIDEO")return(async()=>{try{const s=document.querySelectorAll("video");let a="",d=0;for(const p of s){const f=p.src||p.currentSrc||"";if(!f)continue;const h=p.getBoundingClientRect(),S=h.width*h.height;(S>d||!a&&f)&&(d=S,a=f)}if(!a){o({success:!1,error:"No video found"});return}const i=await fetch(a);if(!i.ok){o({success:!1,error:"HTTP "+i.status});return}const c=await i.blob();if(c.size<1e4){o({success:!1,error:"Video too small: "+c.size});return}const r=await new Promise((p,f)=>{const h=new FileReader;h.onloadend=()=>p(h.result),h.onerror=()=>f(new Error("FileReader error")),h.readAsDataURL(c)});o({success:!0,data:r,size:c.size})}catch(s){o({success:!1,error:s.message})}})(),!0;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return o({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await u(500);const s=mn();if(!s){M("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const a=s.getBoundingClientRect(),d=a.left+a.width/2,i=a.top+a.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${i.toFixed(0)}) ${a.width.toFixed(0)}x${a.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let c=0;c<2;c++){const r=document.elementFromPoint(d,i);r?(await tt(r),n(`คลิก ${c+1}/2 บน <${r.tagName.toLowerCase()}>`)):(await tt(s),n(`คลิก ${c+1}/2 บนการ์ด (สำรอง)`)),await u(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),(async()=>{try{const e=await new Promise(t=>{chrome.storage.local.get("netflow_preshow_overlay",o=>{if(chrome.runtime.lastError){t(null);return}t((o==null?void 0:o.netflow_preshow_overlay)||null)})});if(e&&e.timestamp&&Date.now()-e.timestamp<3e4){n("⚡ Pre-show overlay — แสดง overlay ทันที");try{Ut(e.theme)}catch{}try{Yt(e.sceneCount||1)}catch(t){n(`⚠️ pre-show overlay error: ${t.message}`)}chrome.storage.local.remove("netflow_preshow_overlay")}}catch{}})(),$n()})();
