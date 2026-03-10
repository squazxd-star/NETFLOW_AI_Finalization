(function(){"use strict";const ct={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let Q=ct.green,wt=null;function Dt(e){e&&ct[e]&&(wt=e,Q=ct[e],Xt(),requestAnimationFrame(()=>me()))}function ke(){if(wt&&ct[wt])return ct[wt];try{const e=localStorage.getItem("netflow_app_theme");if(e&&ct[e])return ct[e]}catch{}return ct.green}let et=0,nt=255,ot=65;function Xt(){const e=Q.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(et=parseInt(e[1],16),nt=parseInt(e[2],16),ot=parseInt(e[3],16))}const jt='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',Kt='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let W=null,K=null,dt=null,Qt=0,St=null,xt=null,Mt=null,zt=0,pt=!1,st=null,vt=null,yt=null,ut=1,Y=[];function _t(e){const t=[{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let a=2;a<=e;a++)t.push({stepId:`scene${a}-prompt`,label:`ฉาก ${a} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${a}-gen`,label:`ฉาก ${a} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${a}-wait`,label:`ฉาก ${a} — กำลังสร้าง`,status:"waiting",progress:0});t.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return t}const at=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];Y=_t(1);function Ce(e){const t=e.rgb,a=e.accentRgb,r=e.doneRgb,i=e.hex,d=e.accentHex,s=e.doneHex,l=(()=>{const m=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!m)return"#4ade80";const o=h=>Math.min(255,h+80);return`#${[1,2,3].map(h=>o(parseInt(m[h],16)).toString(16).padStart(2,"0")).join("")}`})(),c=(()=>{const m=s.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!m)return"#4ade80";const o=h=>Math.min(255,h+60);return`#${[1,2,3].map(h=>o(parseInt(m[h],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),u=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,E=p?parseInt(p[1],16)/u:0,R=p?parseInt(p[2],16)/u:1,T=p?parseInt(p[3],16)/u:.25,$=m=>`${Math.round(E*m)}, ${Math.round(R*m)}, ${Math.round(T*m)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${t},0.15) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${a},0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 10% 80%, rgba(${t},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 90% 10%, rgba(${a},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(${$(18)},0.94) 0%, rgba(${$(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
        radial-gradient(ellipse at 100% 100%, rgba(${a},0.09) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 0%, rgba(${t},0.06) 0%, transparent 35%),
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
    background: radial-gradient(circle, rgba(${t},0.21) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${t},0.13) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${t},0.18) 0%, rgba(${a},0.06) 40%, transparent 70%);
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
        radial-gradient(circle at 50% 0%, rgba(${t},0.06) 2px, transparent 2px),
        radial-gradient(circle at 0% 75%, rgba(${a},0.05) 2px, transparent 2px),
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
        radial-gradient(circle, rgba(${t},0.07) 1.5px, transparent 1.5px),
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
            rgba(${t},0.03) 40px, rgba(${t},0.03) 41px
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
        linear-gradient(45deg, rgba(${t},0.035) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(${t},0.035) 25%, transparent 25%),
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
        radial-gradient(ellipse at 20% 50%, rgba(${t},0.14) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(${a},0.12) 0%, transparent 45%),
        radial-gradient(ellipse at 60% 80%, rgba(${t},0.10) 0%, transparent 40%),
        radial-gradient(ellipse at 30% 10%, rgba(${a},0.08) 0%, transparent 50%),
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
    background: rgba(${$(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${$(180)},0.05),
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
            0 0 200px rgba(${$(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${$(180)},0.08),
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
    color: ${l};
    font-weight: 700;
    text-shadow: 0 0 10px rgba(${t},0.5);
}

.nf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${i};
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
.nf-term-line.nf-term-done { color: rgba(${r}, 0.85); }
.nf-term-line.nf-term-error { color: rgba(239, 68, 68, 0.8); }
.nf-term-line.nf-term-waiting { color: rgba(255, 255, 255, 0.55); }

.nf-term-prefix {
    color: rgba(${t},0.92);
    font-weight: 700;
    user-select: none;
}

.nf-term-active .nf-term-prefix { color: ${i}; text-shadow: 0 0 6px rgba(${t},0.4); }

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
    color: ${l};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${t},0.3);
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
    border-top: 1px solid rgba(${t},0.2);
    background: linear-gradient(180deg, rgba(${$(5)},0.95) 0%, rgba(${$(12)},0.98) 100%);
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
    background: radial-gradient(circle, rgba(${t},0.25) 0%, rgba(${a},0.08) 40%, transparent 70%);
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
    border-top: 1px solid rgba(${a},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${$(6)},0.75) 0%, rgba(${$(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${t},0.12), 0 0 24px rgba(${t},0.06), inset 0 1px 0 rgba(${a},0.08);
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
    color: rgba(${a},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${a},0.7),
        0 0 12px rgba(${a},0.35),
        0 0 20px rgba(${t},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${$(8)}, 0.88);
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
    box-shadow: 0 0 20px rgba(${r}, 0.1);
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
    box-shadow: 0 0 6px rgba(${t},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: ${s};
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
    background: linear-gradient(90deg, ${i}, ${l});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${t},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${s}, ${c});
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
    box-shadow: 0 0 6px rgba(${t},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${s}, ${c});
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
    background: rgba(${$(8)},0.8);
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
    background: rgba(${$(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${i};
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
    color: ${i};
    text-shadow: 0 0 6px rgba(${t},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${i};
    box-shadow: 0 0 6px rgba(${t},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}
.nf-proc-active .nf-proc-badge {
    background: rgba(${t},0.12);
    color: ${l};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${t},0.3);
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
    background: ${s};
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

    `}function Jt(){dt||(dt=document.createElement("style"),dt.id="netflow-overlay-styles",dt.textContent=Ce(Q),document.head.appendChild(dt))}function Zt(e){e.innerHTML="",Y.forEach((t,a)=>{const r=document.createElement("div");r.className="nf-proc-row nf-proc-waiting",r.id=`nf-proc-${t.stepId}`,r.innerHTML=`
            <span class="nf-proc-num">${a+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(r)})}function te(){const e=document.getElementById("nf-terminal");if(!e)return;Zt(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${Y.length}`)}function ee(e,t){let l="";for(let R=0;R<20;R++){const T=R/20*Math.PI*2,$=(R+.2)/20*Math.PI*2,m=(R+.5)/20*Math.PI*2,o=(R+.8)/20*Math.PI*2,h=(R+1)/20*Math.PI*2;l+=`${R===0?"M":"L"}${(120+100*Math.cos(T)).toFixed(1)},${(120+100*Math.sin(T)).toFixed(1)} `,l+=`L${(120+100*Math.cos($)).toFixed(1)},${(120+100*Math.sin($)).toFixed(1)} `,l+=`L${(120+112*Math.cos(m)).toFixed(1)},${(120+112*Math.sin(m)).toFixed(1)} `,l+=`L${(120+100*Math.cos(o)).toFixed(1)},${(120+100*Math.sin(o)).toFixed(1)} `,l+=`L${(120+100*Math.cos(h)).toFixed(1)},${(120+100*Math.sin(h)).toFixed(1)} `}l+="Z";const c=14,p=72,u=62;let E="";for(let R=0;R<c;R++){const T=R/c*Math.PI*2,$=(R+.25)/c*Math.PI*2,m=(R+.75)/c*Math.PI*2,o=(R+1)/c*Math.PI*2;E+=`${R===0?"M":"L"}${(120+u*Math.cos(T)).toFixed(1)},${(120+u*Math.sin(T)).toFixed(1)} `,E+=`L${(120+p*Math.cos($)).toFixed(1)},${(120+p*Math.sin($)).toFixed(1)} `,E+=`L${(120+p*Math.cos(m)).toFixed(1)},${(120+p*Math.sin(m)).toFixed(1)} `,E+=`L${(120+u*Math.cos(o)).toFixed(1)},${(120+u*Math.sin(o)).toFixed(1)} `}return E+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${l}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="100" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.4"/>
        </g>

        <!-- Inner ring (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${E}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${u}" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${e},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${e},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Te(){const e=document.createElement("div");e.id="netflow-engine-overlay",st=document.createElement("canvas"),st.id="nf-matrix-canvas",e.appendChild(st);const t=document.createElement("div");t.className="nf-pat-plasma",e.appendChild(t);for(let k=1;k<=5;k++){const _=document.createElement("div");_.className=`nf-ambient-orb nf-orb-${k}`,e.appendChild(_)}const a=document.createElement("div");a.className="nf-pat-data",e.appendChild(a);const r=document.createElement("div");r.className="nf-pat-diag-a",e.appendChild(r);const i=document.createElement("div");i.className="nf-pat-diag-b",e.appendChild(i);const d=document.createElement("div");d.className="nf-pat-circuit",e.appendChild(d);const s=document.createElement("div");s.className="nf-pat-honeycomb",e.appendChild(s);const l=document.createElement("div");l.className="nf-pat-binary",e.appendChild(l);const c=document.createElement("div");c.className="nf-pat-crosshatch",e.appendChild(c);const p=document.createElement("div");p.className="nf-pat-diamond",e.appendChild(p);const u=document.createElement("div");u.className="nf-pat-wave-h",e.appendChild(u);const E=document.createElement("div");E.className="nf-pat-radar",e.appendChild(E);const R=document.createElement("div");R.className="nf-pat-ripple-1",e.appendChild(R);const T=document.createElement("div");T.className="nf-pat-ripple-2",e.appendChild(T);const $=document.createElement("div");$.className="nf-pat-techscan",e.appendChild($);const m=document.createElement("div");m.className="nf-center-glow",e.appendChild(m);const o=document.createElement("div");o.className="nf-pat-noise",e.appendChild(o);const h=document.createElement("div");h.className="nf-crt-scanlines",e.appendChild(h);const P=document.createElement("div");P.className="nf-vignette",e.appendChild(P);for(let k=0;k<3;k++){const _=document.createElement("div");_.className="nf-pulse-ring",e.appendChild(_)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(k=>{const _=document.createElement("div");_.className=`nf-corner-deco ${k}`,e.appendChild(_)});const H=document.createElement("button");H.className="nf-stop-btn",H.innerHTML='<span class="nf-stop-icon"></span> หยุด',H.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",H.onclick=()=>{var k;window.__NETFLOW_STOP__=!0;try{Rt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((k=chrome.runtime)!=null&&k.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},e.appendChild(H);const D=document.createElement("button");D.className="nf-close-btn",D.textContent="✕ ซ่อน",D.style.cssText="position:absolute !important;top:14px !important;right:14px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(0,0,0,0.6) !important;border:1px solid rgba(255,255,255,0.3) !important;border-radius:8px !important;color:#fff !important;font-size:19px !important;padding:6px 14px !important;font-family:inherit !important;",D.onclick=()=>Ot(),e.appendChild(D);const B=document.createElement("div");B.className="nf-layout";const w=document.createElement("div");w.className="nf-core-monitor",w.id="nf-core-monitor";const f=document.createElement("div");f.className="nf-core-header",f.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${Y.length}</div>
    `,w.appendChild(f);const v=document.createElement("div");v.className="nf-terminal",v.id="nf-terminal",Zt(v),w.appendChild(v);const C=document.createElement("div");C.className="nf-engine-core",C.id="nf-engine-core";const F=document.createElement("div");F.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(k=>{const _=document.createElement("div");_.className=`nf-frame-corner ${k}`,F.appendChild(_)}),C.appendChild(F);const S="http://www.w3.org/2000/svg",y=document.createElementNS(S,"svg");y.setAttribute("class","nf-engine-waves"),y.setAttribute("viewBox","0 0 560 140"),y.setAttribute("preserveAspectRatio","none"),y.id="nf-engine-waves";for(let k=0;k<4;k++){const _=document.createElementNS(S,"path");_.setAttribute("fill","none"),_.setAttribute("stroke-width",k<2?"1.5":"1"),_.setAttribute("stroke",k<2?`rgba(${Q.rgb},${.14+k*.1})`:`rgba(${Q.accentRgb},${.1+(k-2)*.08})`),_.setAttribute("data-wave-idx",String(k)),y.appendChild(_)}C.appendChild(y);const z=document.createElement("div");z.className="nf-engine-brand-inner",z.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${ee(Q.rgb,Q.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${ee(Q.rgb,Q.accentRgb)}
        </div>
    `,C.appendChild(z);const b=document.createElement("div");b.className="nf-engine-stats",b.id="nf-engine-stats",b.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([k,_,O])=>`<div class="nf-stat-item"><span class="nf-stat-label">${k}</span><span class="nf-stat-val" id="${_}">${O}</span></div>`).join(""),C.appendChild(b),w.appendChild(C),B.appendChild(w);const x=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];at.forEach((k,_)=>{const O=Se(k);O.classList.add(x[_]),O.id=`nf-mod-${k.id}`,B.appendChild(O)}),e.appendChild(B);for(let k=0;k<30;k++){const _=document.createElement("div");_.className="nf-particle",_.style.left=`${5+Math.random()*90}%`,_.style.bottom=`${Math.random()*40}%`,_.style.animationDuration=`${3+Math.random()*5}s`,_.style.animationDelay=`${Math.random()*4}s`;const O=.3+Math.random()*.4,I=.7+Math.random()*.3;_.style.background=`rgba(${Math.floor(et*I)}, ${Math.floor(nt*I)}, ${Math.floor(ot*I)}, ${O})`,_.style.width=`${1+Math.random()*2}px`,_.style.height=_.style.width,e.appendChild(_)}return e}function Se(e){const t=document.createElement("div");t.className="nf-module";const a=document.createElement("div");a.className="nf-mod-header",a.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(a),e.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let s="";i.progress!==void 0&&(s=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${s}
        `,t.appendChild(d)});const r=document.createElement("div");return r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(r),t}function Me(){Qt=Date.now(),St=setInterval(()=>{const e=Math.floor((Date.now()-Qt)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),a=String(e%60).padStart(2,"0"),r=document.getElementById("nf-timer");r&&(r.textContent=`${t}:${a}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${t}:${a}`)},1e3)}function ne(){St&&(clearInterval(St),St=null)}const _e=120,oe=160,ie=.4;let gt=null,ae=0,re=0,se=0,$t=[];function Pe(e,t){$t=[];for(let a=0;a<_e;a++){const r=Math.random();let i;r<.22?i=0:r<.4?i=1:r<.55?i=2:r<.68?i=3:r<.84?i=4:i=5;const d=Math.random()*e,s=Math.random()*t,l=50+Math.random()*220,c=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);$t.push({x:i===0?Math.random()*e:d+Math.cos(c)*l,y:i===0?Math.random()*t:s+Math.sin(c)*l,vx:(Math.random()-.5)*ie,vy:(Math.random()-.5)*ie,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:d,oCy:s,oRadius:l,oAngle:c,oSpeed:p})}}function Ie(){if(!st)return;const e=st;if(vt=e.getContext("2d"),!vt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,$t.length===0&&Pe(e.width,e.height)};t(),window.addEventListener("resize",t);let a=null,r=0,i=0,d=!1;function s(){if(!vt||!st){yt=null;return}if(yt=requestAnimationFrame(s),d=!d,d)return;const l=vt,c=st.width,p=st.height;l.fillStyle=`rgba(${et*.04|0},${nt*.04|0},${ot*.06|0},1)`,l.fillRect(0,0,c,p),(!a||r!==c||i!==p)&&(r=c,i=p,a=l.createRadialGradient(c*.5,p*.5,0,c*.5,p*.5,Math.max(c,p)*.6),a.addColorStop(0,`rgba(${et*.08|0},${nt*.08|0},${ot*.1|0},0.4)`),a.addColorStop(1,"rgba(0,0,0,0)")),l.fillStyle=a,l.fillRect(0,0,c,p);const u=$t,E=u.length,R=oe*oe;for(let m=0;m<E;m++){const o=u[m];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>c&&(o.x=c,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>p&&(o.y=p,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const h=o.oAngle,P=o.oRadius*.7;o.x=o.oCx+P*Math.cos(h),o.y=o.oCy+P*Math.sin(h)*Math.cos(h),o.oCx+=Math.sin(h*.15)*.12,o.oCy+=Math.cos(h*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const h=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*h,o.y=o.oCy+Math.sin(o.oAngle)*h,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=c+30:o.x>c+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const h=o.oRadius+50;o.oCx<-h?o.oCx=c+h:o.oCx>c+h&&(o.oCx=-h),o.oCy<-h?o.oCy=p+h:o.oCy>p+h&&(o.oCy=-h)}}l.beginPath(),l.strokeStyle=`rgba(${et},${nt},${ot},0.06)`,l.lineWidth=.4;const T=new Path2D;for(let m=0;m<E;m++){const o=u[m];for(let h=m+1;h<E;h++){const P=u[h],H=o.x-P.x,D=o.y-P.y,B=H*H+D*D;B<R&&(1-B/R<.4?(l.moveTo(o.x,o.y),l.lineTo(P.x,P.y)):(T.moveTo(o.x,o.y),T.lineTo(P.x,P.y)))}}if(l.stroke(),l.strokeStyle=`rgba(${et},${nt},${ot},0.18)`,l.lineWidth=.8,l.stroke(T),!gt||ae!==et||re!==nt||se!==ot){gt=document.createElement("canvas");const m=48;gt.width=m,gt.height=m;const o=gt.getContext("2d"),h=o.createRadialGradient(m/2,m/2,0,m/2,m/2,m/2);h.addColorStop(0,`rgba(${et},${nt},${ot},0.9)`),h.addColorStop(.3,`rgba(${et},${nt},${ot},0.35)`),h.addColorStop(1,`rgba(${et},${nt},${ot},0)`),o.fillStyle=h,o.fillRect(0,0,m,m),ae=et,re=nt,se=ot}const $=gt;for(let m=0;m<E;m++){const o=u[m],h=.6+.4*Math.sin(o.pulsePhase),P=o.radius*5*(.8+h*.4);l.globalAlpha=.5+h*.4,l.drawImage($,o.x-P/2,o.y-P/2,P,P)}l.globalAlpha=1,l.fillStyle="rgba(255,255,255,0.45)",l.beginPath();for(let m=0;m<E;m++){const o=u[m];if(o.radius>2){const h=.6+.4*Math.sin(o.pulsePhase),P=o.radius*(.8+h*.4)*.35;l.moveTo(o.x+P,o.y),l.arc(o.x,o.y,P,0,Math.PI*2)}}l.fill()}s()}function Ae(){yt!==null&&(cancelAnimationFrame(yt),yt=null),st=null,vt=null,$t=[]}let Et=null;const Pt=560,Re=140,le=Pt/2,ce=Re/2,de=[];for(let e=0;e<=Pt;e+=8){const t=Math.abs(e-le)/le;de.push(Math.pow(Math.min(1,t*1.6),.6))}const Be=[0,1,2,3].map(e=>({amp:10+e*5,freq:(1.2+e*.35)*Math.PI*2/Pt,off:e*.6,spd:.7+e*.12}));let Ft=!1;function pe(){if(xt=requestAnimationFrame(pe),Ft=!Ft,Ft)return;if(zt+=.07,!Et){const t=document.getElementById("nf-engine-waves");if(!t){xt=null;return}Et=Array.from(t.querySelectorAll("path"))}const e=[];for(let t=0;t<Et.length;t++){const a=Be[t],r=zt*a.spd+a.off;e.length=0,e.push(`M 0 ${ce}`);let i=0;for(let d=0;d<=Pt;d+=8){const s=ce+a.amp*de[i++]*Math.sin(d*a.freq+r);e.push(`L${d} ${s*10+.5|0}`)}Et[t].setAttribute("d",e.join(" "))}}function De(){zt=0,pe(),Ie(),Mt=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),a=document.getElementById("nf-stat-lat2"),r=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function fe(){xt!==null&&(cancelAnimationFrame(xt),xt=null),Mt&&(clearInterval(Mt),Mt=null),Et=null,Ae()}function It(){let e=0;const t=Y.filter(p=>p.status!=="skipped").length;for(const p of Y){const u=document.getElementById(`nf-proc-${p.stepId}`);if(!u)continue;u.className="nf-proc-row";const E=u.querySelector(".nf-proc-badge");switch(p.status){case"done":u.classList.add("nf-proc-done"),E&&(E.textContent="✅ done"),e++;break;case"active":u.classList.add("nf-proc-active"),E&&(E.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":u.classList.add("nf-proc-error"),E&&(E.textContent="❌ error");break;case"skipped":u.classList.add("nf-proc-skipped"),E&&(E.textContent="— skip");break;default:u.classList.add("nf-proc-waiting"),E&&(E.textContent="(queued)")}}const a=Y.findIndex(p=>p.status==="active"),r=a>=0?a+1:e>=t&&t>0?Y.length:e,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${r}/${Y.length}`);const d=document.querySelector(".nf-core-title-val"),s=document.querySelector(".nf-status-dot");e>=t&&t>0?(d&&(d.textContent="COMPLETE",d.style.color=Q.doneHex),s&&(s.style.background=Q.doneHex,s.style.boxShadow=`0 0 8px rgba(${Q.doneRgb},0.7)`)):Y.some(u=>u.status==="error")?(d&&(d.textContent="ERROR",d.style.color="#f87171"),s&&(s.style.background="#ef4444",s.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):Y.some(u=>u.status==="active")&&d&&(d.textContent="ACTIVE",d.style.color=Q.hex,d.style.textShadow=`0 0 10px rgba(${Q.rgb},0.5)`);const l=document.getElementById("nf-terminal"),c=l==null?void 0:l.querySelector(".nf-proc-active");c&&l&&c.scrollIntoView({behavior:"smooth",block:"center"})}function ue(){K&&K.isConnected||(Jt(),K=document.createElement("button"),K.id="nf-toggle-btn",K.className="nf-toggle-visible",K.innerHTML=pt?jt:Kt,K.title="ซ่อน/แสดง Netflow Overlay",K.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",K.onclick=()=>Ot(),document.body.appendChild(K))}function Ot(){W&&(ue(),pt?(W.classList.remove("nf-hidden"),W.classList.add("nf-visible"),K&&(K.innerHTML=Kt),pt=!1):(W.classList.remove("nf-visible"),W.classList.add("nf-hidden"),K&&(K.innerHTML=jt),pt=!0))}const ge={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function me(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=wt;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"green"}catch{t="green"}const a=ge[t]||ge.green;let r;try{r=chrome.runtime.getURL(a)}catch{r=`/${a}`}const i=Q.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${r}')`].join(", "),e.style.backgroundSize="auto, auto, 50%",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${i},0.45)`,e.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function Nt(e=1){if(Q=ke(),Xt(),W&&W.isConnected){for(const t of at)for(const a of t.steps)a.status="waiting",a.progress=a.progress!==void 0?0:void 0;ut=e,Y=_t(e),te();for(const t of at)Lt(t);At(),It(),pt&&Ot();return}W&&!W.isConnected&&(W=null),dt&&(dt.remove(),dt=null),Jt();for(const t of at)for(const a of t.steps)a.status="waiting",a.progress=a.progress!==void 0?0:void 0;if(ut=e,Y=_t(e),e>1){const t=at.find(r=>r.id==="video");if(t){const r=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=e;i++)r.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),r.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),r.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});t.steps=r}const a=at.find(r=>r.id==="render");if(a){const r=a.steps.find(d=>d.id==="download");r&&(r.label="ดาวน์โหลด 720p");const i=a.steps.find(d=>d.id==="upscale");i&&(i.label="Full Video")}}W=Te(),W.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;",document.body.appendChild(W),W.classList.add("nf-visible"),pt=!1,ue(),Me(),De(),requestAnimationFrame(()=>me())}function he(){ne(),fe(),pt=!1,W&&(W.classList.add("nf-fade-out"),setTimeout(()=>{W==null||W.remove(),W=null},500)),K&&(K.remove(),K=null)}const ze={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Fe(e,t,a){const r=Y.findIndex(u=>u.status==="active"),i=Y.filter(u=>u.status==="done").length,d=Y.length,s=r>=0?r+1:i>=d?d:i,l=document.getElementById("nf-stat-step");l&&(l.textContent=`${s}/${d}`);let c=1;for(const u of Y)if(u.status==="active"||u.status==="done")if(u.stepId.startsWith("scene")){const E=u.stepId.match(/^scene(\d+)-/);E&&(c=Math.max(c,parseInt(E[1],10)))}else(u.stepId==="download"||u.stepId==="upscale"||u.stepId==="open")&&(c=ut);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=ut>1?`${c}/${ut}`:"1/1"),t==="active"){const u=document.getElementById("nf-stat-status"),E=ze[e]||e.toUpperCase();u&&(u.textContent=E)}else if(t==="done"&&i>=d){const u=document.getElementById("nf-stat-status");u&&(u.textContent="COMPLETE")}else if(t==="error"){const u=document.getElementById("nf-stat-status");u&&(u.textContent="ERROR")}if(a!==void 0&&a>0){const u=document.getElementById("nf-stat-progress");u&&(u.textContent=`${Math.min(100,a)}%`)}}function M(e,t,a){if(!W)return;for(const i of at)for(const d of i.steps)d.id===e&&(d.status=t,a!==void 0&&(d.progress=a));for(const i of Y)i.stepId===e&&(i.status=t,a!==void 0&&(i.progress=a));const r=document.getElementById(`nf-step-${e}`);if(r&&(r.className="nf-step",t==="active"?r.classList.add("nf-step-active"):t==="done"?r.classList.add("nf-step-done"):t==="error"&&r.classList.add("nf-step-error")),Fe(e,t,a),a!==void 0){const i=document.getElementById(`nf-bar-${e}`);i&&(i.style.width=`${Math.min(100,a)}%`)}At(),It()}function mt(e){M(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function kt(e=4e3){ne(),fe(),At(),It(),setTimeout(()=>he(),e)}function At(){for(const e of at){const t=e.steps.filter(c=>c.status!=="skipped").length,a=e.steps.filter(c=>c.status==="done").length,r=e.steps.some(c=>c.status==="active"),i=t>0?Math.round(a/t*100):0,d=document.getElementById(`nf-pct-${e.id}`);d&&(d.textContent=`${i}%`);const s=document.getElementById(`nf-modbar-${e.id}`);s&&(s.style.width=`${i}%`);const l=document.getElementById(`nf-mod-${e.id}`);l&&(l.classList.remove("nf-active","nf-done"),i>=100?l.classList.add("nf-done"):r&&l.classList.add("nf-active"))}}function Oe(e){var r,i,d,s;ut=e;const t=new Map;for(const l of Y)t.set(l.stepId,{status:l.status,progress:l.progress});Y=_t(e);for(const l of Y){const c=t.get(l.stepId);c&&(l.status=c.status,c.progress!==void 0&&(l.progress=c.progress))}if(te(),e>1){const l=at.find(c=>c.id==="video");if(l){const c=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((r=l.steps.find(p=>p.id==="animate"))==null?void 0:r.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=l.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=l.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((s=l.steps.find(p=>p.id==="vid-wait"))==null?void 0:s.status)||"waiting",progress:0}];for(let p=2;p<=e;p++)c.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),c.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),c.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});l.steps=c,Lt(l)}}const a=at.find(l=>l.id==="render");if(a&&e>1){const l=a.steps.find(p=>p.id==="download");l&&(l.label="ดาวน์โหลด 720p");const c=a.steps.find(p=>p.id==="upscale");c&&(c.label="Full Video"),Lt(a)}At(),It()}function Lt(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),e.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let s="";i.progress!==void 0&&(s=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${s}
        `,t.appendChild(d)});const r=document.createElement("div");r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(r)}function Rt(e){e.replace(/^\[Netflow AI\]\s*/,"")}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Rt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},A=e=>{console.warn(`[Netflow AI] ${e}`);try{Rt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}};function Vt(e=3e3){n(`🔒 จะปิดแท็บ automation ใน ${e/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},t=>{chrome.runtime.lastError?A(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${t==null?void 0:t.message}`)})}catch(t){A(`ปิดแท็บผิดพลาด: ${t.message}`)}},e)}async function qt(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},d=>{if(chrome.runtime.lastError){i(!1);return}i(!!(d!=null&&d.cached))})}catch{i(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const d of i){const s=d.src||d.currentSrc||"";if(s)return s}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const t=document.querySelectorAll("video");let a=null,r=0;for(const i of t){let d=i.src||"";if(!d){const c=i.querySelector("source");c&&(d=c.getAttribute("src")||"")}if(!d&&i.currentSrc&&(d=i.currentSrc),!d)continue;if(J()){a||(a=d,r=1);continue}const s=i.getBoundingClientRect(),l=s.width*s.height;s.width>50&&l>r&&(r=l,a=d)}if(!a)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${a.substring(0,80)}... (area=${r.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(a);if(!i.ok)return n(`[TikTok] fetch failed: HTTP ${i.status}`),await be(a),a;const d=await i.blob(),s=(d.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${s} MB, type: ${d.type}`),d.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${d.size} bytes) — อาจเป็น thumbnail`);const l=await new Promise((c,p)=>{const u=new FileReader;u.onloadend=()=>c(u.result),u.onerror=()=>p(new Error("FileReader error")),u.readAsDataURL(d)});n(`[TikTok] Data URL พร้อม: ${(l.length/1024/1024).toFixed(1)} MB`),await new Promise(c=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:l},p=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),c()})})}catch(i){n(`[TikTok] Content script fetch error: ${i.message}`),await be(a)}return a}catch(e){return n(`[TikTok] captureVideoUrl error: ${e.message}`),null}}async function be(e){if(e.startsWith("https://"))try{await new Promise(t=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},a=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):a!=null&&a.success?n(`[TikTok] Video pre-fetched via background: ${((a.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${a==null?void 0:a.error}`),t()})})}catch{}}function Gt(e){if(e){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:e,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const Ht=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ut=/Win/i.test(navigator.userAgent),ht=Ht?"🍎 Mac":Ut?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ht}`),window.__VIDEO_COMPLETE_SENT__=!1;class Wt extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}const g=e=>new Promise((t,a)=>{if(window.__NETFLOW_STOP__)return a(new Wt);const r=setTimeout(()=>{if(window.__NETFLOW_STOP__)return a(new Wt);t()},e);g._lastId=r});function ft(){return!!window.__NETFLOW_STOP__}const J=()=>document.hidden;function we(){var a;const e=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const r of t){if(r.closest("#netflow-engine-overlay"))continue;const i=(r.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const d of e)if(i.includes(d))return((a=r.textContent)==null?void 0:a.trim())||d}}return null}async function tt(e){if(J()){e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),e.click();return}const t=e.getBoundingClientRect(),a=t.left+t.width/2,r=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:r,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",i)),await g(80),e.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",i)),e.dispatchEvent(new MouseEvent("click",i)),await g(50),e.click()}function Ne(e){const t=e.getBoundingClientRect(),a=t.left+t.width/2,r=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:r};e.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",i)),e.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",i)),e.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",i))}function Le(e){const t=[],a=document.querySelectorAll("i");for(const r of a){if((r.textContent||"").trim()!==e)continue;let d=r,s=null,l=1/0;for(let c=0;c<20&&d&&(d=d.parentElement,!(!d||d===document.body));c++){if(J()){c>=3&&d.children.length>0&&!s&&(s=d);continue}const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const u=p.width*p.height;u<l&&(s=d,l=u)}}s&&!t.includes(s)&&t.push(s)}return t.sort((r,i)=>{const d=r.getBoundingClientRect(),s=i.getBoundingClientRect();return d.left-s.left}),t}function Yt(e=!1){const t=[],a=document.querySelectorAll("video");for(const s of a){let l=s.parentElement;for(let c=0;c<10&&l;c++){if(J()){if(c>=3&&l.children.length>0){t.push({el:l,left:0});break}l=l.parentElement;continue}const p=l.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){t.push({el:l,left:p.left});break}l=l.parentElement}}const r=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const s of r){const l=(s.textContent||"").trim();if(l==="play_arrow"||l==="play_circle"||l==="videocam"){let c=s.parentElement;for(let p=0;p<10&&c;p++){if(J()){if(p>=3&&c.children.length>0){t.push({el:c,left:0});break}c=c.parentElement;continue}const u=c.getBoundingClientRect();if(u.width>120&&u.height>80&&u.width<window.innerWidth*.7&&u.top>=-50&&u.left<window.innerWidth*.75){t.push({el:c,left:u.left});break}c=c.parentElement}}}const i=document.querySelectorAll("img");for(const s of i){const l=(s.alt||"").toLowerCase();if(l.includes("video")||l.includes("วิดีโอ")){let c=s.parentElement;for(let p=0;p<10&&c;p++){if(J()){if(p>=3&&c.children.length>0){t.push({el:c,left:0});break}c=c.parentElement;continue}const u=c.getBoundingClientRect();if(u.width>120&&u.height>80&&u.width<window.innerWidth*.7&&u.top>=-50&&u.left<window.innerWidth*.75){t.push({el:c,left:u.left});break}c=c.parentElement}}}const d=Array.from(new Set(t.map(s=>s.el))).map(s=>t.find(l=>l.el===s));if(d.sort((s,l)=>s.left-l.left),d.length>0){const s=d[0].el,l=s.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${l.left.toFixed(0)},${l.top.toFixed(0)}) ขนาด ${l.width.toFixed(0)}x${l.height.toFixed(0)}`),s}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function Ve(){const e=Le("image");if(e.length>0){const a=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${a.left.toFixed(0)},${a.top.toFixed(0)}) ขนาด ${a.width.toFixed(0)}x${a.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const a of t){let r=a.parentElement;for(let i=0;i<10&&r;i++){if(J()){if(i>=3&&r.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),r;r=r.parentElement;continue}const d=r.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),r;r=r.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function qe(e,t){var l;const[a,r]=e.split(","),i=((l=a.match(/:(.*?);/))==null?void 0:l[1])||"image/png",d=atob(r),s=new Uint8Array(d.length);for(let c=0;c<d.length;c++)s[c]=d.charCodeAt(c);return new File([s],t,{type:i})}function Ct(e){var r;const t=[],a=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of a)if(((r=i.textContent)==null?void 0:r.trim())===e){const d=i.closest("button");d&&t.push(d)}return t}function Ge(){const e=[...Ct("add"),...Ct("add_2")];if(e.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const r=document.querySelectorAll("button");for(const i of r){const d=(i.textContent||"").trim();if(d!=="+"&&d!=="add")continue;if(J())return i;const s=i.getBoundingClientRect();if(s.bottom>window.innerHeight*.7&&s.width<60&&s.height<60)return i}return null}let t=null,a=0;for(const r of e){const i=r.getBoundingClientRect();i.y>a&&(a=i.y,t=r)}return t&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${a.toFixed(0)}`),t}function xe(){for(const r of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=Ct(r);let d=null,s=0;for(const l of i){const c=l.getBoundingClientRect();c.y>s&&(s=c.y,d=l)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${r}" ที่ y=${s.toFixed(0)}`),d}const e=document.querySelectorAll("button");let t=null,a=0;for(const r of e){if(J())break;const i=r.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const d=Math.abs(i.width-i.height)<10&&i.width<60,s=i.y+i.x+(d?1e3:0);s>a&&(a=s,t=r)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const r of e){const i=(r.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return r}return null}function ve(){const e=document.querySelectorAll("textarea");for(const r of e)if(J()||r.getBoundingClientRect().bottom>window.innerHeight*.5)return r;const t=document.querySelectorAll('[contenteditable="true"]');for(const r of t)if(J()||r.getBoundingClientRect().bottom>window.innerHeight*.5)return r;const a=document.querySelectorAll("input[type='text'], input:not([type])");for(const r of a){const i=r.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return r}return e.length>0?e[e.length-1]:null}async function Bt(e,t){var a,r,i,d;e.focus(),await g(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const s=new DataTransfer;s.setData("text/plain",t),s.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:s});e.dispatchEvent(l),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const c=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:s});e.dispatchEvent(c),await g(800);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(s){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await g(100);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(s);const l=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(l),await g(800);const c=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await g(200);const s=new DataTransfer;s.setData("text/plain",t),s.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const l=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:s});e.dispatchEvent(l),await g(800);const c=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((a=navigator.clipboard)!=null&&a.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const l=document.createElement("textarea");l.value=t,l.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(l),l.focus(),l.select(),document.execCommand("copy"),document.body.removeChild(l),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await g(200),document.execCommand("paste"),await g(500);const s=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${s.length} ตัวอักษร)`);return}}catch(s){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const s=Object.keys(e).find(l=>l.startsWith("__reactFiber$")||l.startsWith("__reactInternalInstance$"));if(s){let l=e[s];for(let c=0;c<30&&l;c++){const p=l.memoizedProps,u=l.memoizedState;if((r=p==null?void 0:p.editor)!=null&&r.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const E=p.editor;E.selection,E.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(i=u==null?void 0:u.memoizedState)==null?void 0:i.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),u.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}l=l.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(s){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${s.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function He(){const e=[],t=document.querySelectorAll('input[type="file"]');for(const a of t)e.push({input:a,origType:"file"}),a.type="text";return e.length>0&&n(`ปิดกั้น file input ${e.length} ตัว (type → text)`),e}function Ue(){const e=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ht})`);return}return e.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ht})`),()=>{HTMLInputElement.prototype.click=e,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function We(e,t,a){var p;const r=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...e.map(u=>u.input)];for(const u of r)!i.includes(u)&&u.offsetParent===null&&i.push(u);for(const u of i)u.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ht})`),!1;let s;if(a&&a.size>0){const u=Array.from(d).filter(E=>!a.has(E));u.length>0?(s=u[u.length-1],n(`เล็งเป้า file input ใหม่ (${u.length} ใหม่, ${d.length} ทั้งหมด)`)):(s=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else s=d[d.length-1];const l=new DataTransfer;l.items.add(t);try{s.files=l.files,n(`ฉีดไฟล์ผ่าน target.files (${((p=s.files)==null?void 0:p.length)??0} ไฟล์)`)}catch(u){n(`กำหนด target.files ล้มเหลว: ${u.message} — ลอง defineProperty`);try{Object.defineProperty(s,"files",{value:l.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(E){return A(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${E.message}`),!1}}const c=s._valueTracker;c&&(c.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),s.dispatchEvent(new Event("change",{bubbles:!0})),s.dispatchEvent(new Event("input",{bubbles:!0}));try{const u=new DataTransfer;u.items.add(t);const E=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:u});s.dispatchEvent(E),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${t.name} (${(t.size/1024).toFixed(1)} KB) → <input> ${ht}`),!0}function Tt(){let e=0;const t=document.querySelectorAll("img");for(const r of t){if(r.closest("#netflow-engine-overlay")||!r.src)continue;if(J()){e++;continue}const i=r.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&r.offsetParent!==null&&e++}const a=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const r of a){if(r.closest("#netflow-engine-overlay"))continue;if(J()){e++;continue}const i=r.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&r.offsetParent!==null&&e++}return e}async function ye(e,t){var u;n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const a=qe(e,t);n(`ขนาดไฟล์: ${(a.size/1024).toFixed(1)} KB`);const r=Tt();n(`รูปย่อปัจจุบันใน Prompt Bar: ${r} รูป`);const i=async(E,R=8e3)=>{const T=Date.now();for(;Date.now()-T<R;){const $=Tt();if($>r)return n(`✅ [${E}] ยืนยัน: รูปย่อเพิ่มจาก ${r} → ${$}`),!0;await g(500)}return n(`⚠️ [${E}] รูปย่อไม่เพิ่ม (ยังคง ${Tt()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=Ge();if(!d)return A("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const s=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${s.size} ตัว`);const l=Ue();let c=He();const p=new MutationObserver(E=>{for(const R of E)for(const T of R.addedNodes)if(T instanceof HTMLInputElement&&T.type==="file"&&(T.type="text",c.push({input:T,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),T instanceof HTMLElement){const $=T.querySelectorAll('input[type="file"]');for(const m of $)m.type="text",c.push({input:m,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{d.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await g(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let E=!1;const R=Date.now();for(;!E&&Date.now()-R<8e3;){const $=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button'], [role='menuitemradio'], a[role='button']");for(const m of $){if(m===d)continue;const o=m.querySelectorAll("i, .material-icons, .material-symbols-outlined, [class*='icon']");for(const h of o){const P=((u=h.textContent)==null?void 0:u.trim())||"";if((P==="upload"||P==="upload_file"||P==="add_photo_alternate"||P==="image"||P==="photo_library")&&!Array.from(m.querySelectorAll("i")).map(D=>{var B;return(B=D.textContent)==null?void 0:B.trim()}).includes("drive_folder_upload")){m.click(),E=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${P}) ✅`);break}}if(E)break}if(!E)for(const m of $){if(m===d)continue;const o=m.childNodes.length<=8?(m.textContent||"").trim():"";if(o.length>0&&o.length<60){const h=o.toLowerCase();if(h==="upload"||h==="อัปโหลด"||h==="อัพโหลด"||h.includes("upload image")||h.includes("upload photo")||h.includes("upload a file")||h.includes("upload file")||h.includes("อัปโหลดรูปภาพ")||h.includes("อัพโหลดรูปภาพ")||h.includes("อัปโหลดไฟล์")||h.includes("อัพโหลดไฟล์")||h.includes("from computer")||h.includes("จากคอมพิวเตอร์")||h.includes("from device")||h.includes("จากอุปกรณ์")||h.includes("my computer")||h.includes("คอมพิวเตอร์ของฉัน")){m.click(),E=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${o}") ✅`);break}}}if(!E)for(const m of $){if(m===d)continue;const o=(m.textContent||"").trim().toLowerCase();if(o.length>0&&o.length<60){if(o.includes("drive")||o.includes("ไดรฟ์")||o.includes("google")||o.includes("สร้าง")||o.includes("create")||o.includes("cancel")||o.includes("ยกเลิก"))continue;if(o.includes("upload")||o.includes("อัป")||o.includes("อัพ")||o.includes("file")||o.includes("ไฟล์")||o.includes("รูปภาพ")||o.includes("image")||o.includes("photo")){const h=m.getBoundingClientRect();if(h.width>0&&h.height>0){m.click(),E=!0,n(`คลิกปุ่มอัปโหลด (broad match: "${o.substring(0,40)}") ✅`);break}}}}E||await g(500)}return E?(await g(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),We(c,a,s)?(n(`ฉีดไฟล์ ${t} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(A(`ฉีดไฟล์ ${t} ล้มเหลว`),!1)):(A("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 8 วินาที"),!1)}finally{p.disconnect(),l();for(const E of c)E.input.type!=="file"&&(E.input.type="file")}}async function Ye(e,t){n("=== ขั้น 0: ตั้งค่า Flow ===");const a=document.querySelectorAll("button");let r=null;for(const T of a){const $=T.textContent||"";if(($.includes("Nano Banana")||$.includes("Imagen")||$.includes("วิดีโอ")||$.includes("รูปภาพ")||$.includes("Image")||$.includes("Video"))&&T.getBoundingClientRect().bottom>window.innerHeight*.7){r=T,n(`พบปุ่มตั้งค่าจากข้อความ: "${$.substring(0,30).trim()}"`);break}}if(!r)for(const T of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const $=Ct(T);for(const m of $)if(m.getBoundingClientRect().bottom>window.innerHeight*.7){r=m,n(`พบปุ่มตั้งค่าจากไอคอน: ${T}`);break}if(r)break}if(!r)return A("ไม่พบปุ่มตั้งค่า"),!1;const i=r.getBoundingClientRect(),d=i.left+i.width/2,s=i.top+i.height/2,l={bubbles:!0,cancelable:!0,clientX:d,clientY:s,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",l)),await g(80),r.dispatchEvent(new PointerEvent("pointerup",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",l)),r.dispatchEvent(new MouseEvent("click",l)),n("คลิกปุ่มตั้งค่าแล้ว"),await g(1500);let c=!1,p=null;const u=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const T of u){const $=T.getAttribute("aria-controls")||"",m=T.id||"";if($.toUpperCase().includes("IMAGE")||m.toUpperCase().includes("IMAGE")){p=T,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${$})`);break}}if(!p)for(const T of document.querySelectorAll('[role="tab"]')){const $=T.id||"";if($.toUpperCase().includes("TRIGGER-IMAGE")){p=T,n(`พบแท็บ Image ผ่าน id: ${$}`);break}}if(!p)for(const T of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const $=(T.textContent||"").trim();if(($==="Image"||$.endsWith("Image")||$==="รูปภาพ"||$==="ภาพ")&&!$.includes("Video")&&!$.includes("วิดีโอ")){p=T,n(`พบแท็บ Image ผ่านข้อความ: "${$}"`);break}}if(p){const T=p.getAttribute("data-state")||"",$=p.getAttribute("aria-selected")||"";if(T==="active"||$==="true")c=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const m=p.getBoundingClientRect(),o={bubbles:!0,cancelable:!0,clientX:m.left+m.width/2,clientY:m.top+m.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",o)),await g(80),p.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",o)),p.dispatchEvent(new MouseEvent("click",o)),c=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await g(400)}}c||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const E=e==="horizontal"?"แนวนอน":"แนวตั้ง";for(const T of document.querySelectorAll("button, [role='tab'], [role='option']")){const $=(T.textContent||"").trim();if($===E||$.toLowerCase()===(e==="horizontal"?"landscape":"portrait")){const m=T.getBoundingClientRect(),o={bubbles:!0,cancelable:!0,clientX:m.left+m.width/2,clientY:m.top+m.height/2,button:0};T.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mousedown",o)),await g(80),T.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseup",o)),T.dispatchEvent(new MouseEvent("click",o)),n(`เลือกทิศทาง: ${E}`),await g(400);break}}const R=`x${t}`;for(const T of document.querySelectorAll("button, [role='tab'], [role='option']"))if((T.textContent||"").trim()===R){const m=T.getBoundingClientRect(),o={bubbles:!0,cancelable:!0,clientX:m.left+m.width/2,clientY:m.top+m.height/2,button:0};T.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mousedown",o)),await g(80),T.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseup",o)),T.dispatchEvent(new MouseEvent("click",o)),n(`เลือกจำนวน: ${R}`),await g(400);break}return await g(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),r.dispatchEvent(new PointerEvent("pointerdown",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",l)),await g(80),r.dispatchEvent(new PointerEvent("pointerup",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",l)),r.dispatchEvent(new MouseEvent("click",l)),n("ปิดหน้าตั้งค่าแล้ว"),await g(600),!0}async function Xe(e){const t=e==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",a=e==="quality"?"Quality":"Fast",r=e==="quality"?"Fast":"Quality",i=e==="quality"?"คุณภาพ":"เร็ว",d=e==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${t} (${i}) ===`);let s=null;const l=Date.now()+1e4;for(;!s&&Date.now()<l;){const m=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const o of m){const h=(o.textContent||"").trim();if(!(h.length>80)&&(h.includes("Veo")||h.includes("veo"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.getAttribute("role")==="combobox"||h.includes("arrow_drop_down")||o.querySelector("svg"))){s=o,n(`พบปุ่ม Veo dropdown (Strategy A): "${h.substring(0,50).trim()}"`);break}}if(!s)for(const o of m){const h=(o.textContent||"").trim();if(!(h.length>80)&&(h.includes("Veo")||h.includes("veo"))){const P=o.getBoundingClientRect();if(P.width>0&&P.height>0){s=o,n(`พบปุ่ม Veo dropdown (Strategy B): "${h.substring(0,50).trim()}"`);break}}}if(!s)for(const o of m){const h=(o.textContent||"").trim();if(!(h.length>50)&&(h.includes("Fast")||h.includes("Quality")||h.includes("เร็ว")||h.includes("คุณภาพ"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.querySelector("svg"))){s=o,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${h.substring(0,50).trim()}"`);break}}if(!s){const o=document.querySelectorAll("div, span, button, [role='button']");for(const h of o){const P=(h.textContent||"").trim();if(P==="Veo 3.1 - Fast"||P==="Veo 3.1 - Quality"||P==="Fast"||P==="Quality"||P==="Veo 3.1 - เร็ว"||P==="Veo 3.1 - คุณภาพสูง"||P==="Veo 3.1 - คุณภาพ"||P==="Veo 2 - Fast"||P==="Veo 2 - Quality"){const H=h.getBoundingClientRect();if(H.width>0&&H.height>0){s=h,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${P}"`);break}}}}if(!s){const o=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const h of o){const P=(h.textContent||"").trim();if(!(P.length>60)&&(P.includes("3.1")||P.includes("model")||P.includes("โมเดล"))){const H=h.getBoundingClientRect();if(H.bottom>window.innerHeight*.4&&H.width>0&&H.height>0){s=h,n(`พบปุ่ม model selector (Strategy E): "${P.substring(0,50).trim()}"`);break}}}}s||await g(1e3)}if(!s)return A("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const c=(s.textContent||"").trim();if(c.includes(t)||c.includes(a)&&!c.includes(r)||c.includes(i)&&!c.includes(d))return n(`✅ Veo quality เป็น "${c}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=s.getBoundingClientRect(),u=p.left+p.width/2,E=p.top+p.height/2,R={bubbles:!0,cancelable:!0,clientX:u,clientY:E,button:0};s.dispatchEvent(new PointerEvent("pointerdown",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mousedown",R)),await g(80),s.dispatchEvent(new PointerEvent("pointerup",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mouseup",R)),s.dispatchEvent(new MouseEvent("click",R)),n("คลิกเปิด Veo quality dropdown"),await g(1e3);let T=!1;const $=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const m of $){const o=(m.textContent||"").trim();if((o===t||o===a||o.includes(t)||o.includes(i))&&!o.includes("arrow_drop_down")){const P=m.getBoundingClientRect();if(P.width>0&&P.height>0){const H=P.left+P.width/2,D=P.top+P.height/2,B={bubbles:!0,cancelable:!0,clientX:H,clientY:D,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",B)),await g(80),m.dispatchEvent(new PointerEvent("pointerup",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",B)),m.dispatchEvent(new MouseEvent("click",B)),n(`✅ เลือก "${o}" สำเร็จ`),T=!0;break}}}return T?(await g(600),!0):(A(`ไม่พบตัวเลือก "${t}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),document.body.click(),!1)}async function je(e){var P,H,D,B;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,a=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),r=a?a[1]:"unknown",i=Ht?"macOS":Ut?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",d=Ht?((H=(P=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:P[1])==null?void 0:H.replace(/_/g,"."))||"":Ut&&((D=t.match(/Windows NT ([0-9.]+)/))==null?void 0:D[1])||"",s=navigator.language||"unknown",l=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${d} | Chrome ${r}`),n(`🌐 ภาษา: ${s} | หน้าจอ: ${l} | แพลตฟอร์ม: ${ht}`),n("══════════════════════════════════════════");try{Dt(e.theme)}catch{}try{Nt()}catch(w){console.warn("Overlay show error:",w)}const c=[],p=[];try{M("settings","active");const w=e.orientation||"horizontal",f=e.outputCount||1,v=await Ye(w,f);c.push(v?"✅ Settings":"⚠️ Settings"),M("settings",v?"done":"error")}catch(w){A(`ตั้งค่าผิดพลาด: ${w.message}`),c.push("⚠️ Settings"),M("settings","error")}try{const w=e.veoQuality||"fast";await Xe(w)?(c.push(`✅ Veo ${w}`),n(`✅ Veo quality: ${w}`)):(c.push("⚠️ Veo quality"),A("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(w){A(`Veo quality error: ${w.message}`),c.push("⚠️ Veo quality")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const u=()=>{const w=document.querySelectorAll("span, div, p, label");for(const f of w){const v=(f.textContent||"").trim();if(/^\d{1,3}%$/.test(v)){if(v==="100%")return null;const C=f.getBoundingClientRect();if(C.width>0&&C.height>0&&C.top>0&&C.top<window.innerHeight)return v}}return null},E=async w=>{n(`รอการอัพโหลด ${w} เสร็จ...`),await g(2e3);const f=Date.now(),v=6e4;let C="",F=Date.now();const S=15e3;for(;Date.now()-f<v;){const y=u();if(y){if(y!==C)C=y,F=Date.now();else if(Date.now()-F>S){n(`✅ อัพโหลด ${w} — % ค้างที่ ${y} นาน ${S/1e3} วินาที ถือว่าเสร็จ`),await g(1e3);return}n(`กำลังอัพโหลด: ${y} — รอ...`),await g(1500)}else{n(`✅ อัพโหลด ${w} เสร็จ — ไม่พบตัวบอก %`),await g(1e3);return}}A(`⚠️ อัพโหลด ${w} หมดเวลาหลัง ${v/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){M("upload-char","active");try{const w=await ye(e.characterImage,"character.png");c.push(w?"✅ ตัวละคร":"⚠️ ตัวละคร"),w||p.push("character upload failed"),M("upload-char",w?"done":"error")}catch(w){A(`อัพโหลดตัวละครผิดพลาด: ${w.message}`),c.push("❌ ตัวละคร"),p.push("character upload error"),M("upload-char","error")}await E("character")}else mt("upload-char");if(e.productImage){M("upload-prod","active");try{const w=await ye(e.productImage,"product.png");c.push(w?"✅ สินค้า":"⚠️ สินค้า"),w||p.push("product upload failed"),M("upload-prod",w?"done":"error")}catch(w){A(`อัพโหลดสินค้าผิดพลาด: ${w.message}`),c.push("❌ สินค้า"),p.push("product upload error"),M("upload-prod","error")}await E("product")}else mt("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800);const R=u();R&&(n(`⚠️ อัพโหลดยังแสดง ${R} — รอเพิ่มเติม...`),await E("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await g(1e3);const T=(e.characterImage?1:0)+(e.productImage?1:0);if(T>0){let w=Tt();w<T&&(n(`⏳ เห็นรูปย่อแค่ ${w}/${T} — รอ 3 วินาที...`),await g(3e3),w=Tt()),w>=T?n(`✅ ยืนยันรูปย่ออ้างอิง: ${w}/${T}`):A(`⚠️ คาดว่าจะมี ${T} รูปย่อ แต่พบ ${w} — ดำเนินการต่อ`)}if(ft()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{kt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),M("img-prompt","active"),await g(1e3);const $=ve();$?(await Bt($,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),c.push("✅ Prompt"),M("img-prompt","done")):(A("ไม่พบช่องป้อนข้อความ Prompt"),c.push("❌ Prompt"),p.push("prompt input not found"),M("img-prompt","error")),await g(800);const m=new Set;document.querySelectorAll("img").forEach(w=>{w.src&&m.add(w.src)}),n(`บันทึกรูปเดิม: ${m.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),M("img-generate","active"),await g(500);const o=xe();if(o){const w=o.getBoundingClientRect(),f=w.left+w.width/2,v=w.top+w.height/2,C={bubbles:!0,cancelable:!0,clientX:f,clientY:v,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",C)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",C)),o.dispatchEvent(new MouseEvent("click",C)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),c.push("✅ Generate"),await g(500),o.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",C)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",C)),o.dispatchEvent(new MouseEvent("click",C)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),M("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),c.push("❌ Generate"),p.push("generate button not found"),M("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),M("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await g(15e3);const w=()=>{const S=document.querySelectorAll("div, span, p, label, strong, small");for(const y of S){if(y.closest("#netflow-engine-overlay"))continue;const z=(y.textContent||"").trim();if(z.length>10)continue;const b=z.match(/(\d{1,3})\s*%/);if(!b)continue;const x=parseInt(b[1],10);if(x<1||x>100)continue;const k=y.getBoundingClientRect();if(!(k.width===0||k.width>150)&&!(k.top<0||k.top>window.innerHeight))return x}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let f=null,v=-1,C=0;const F=Date.now();for(;!f&&Date.now()-F<18e4;){const S=document.querySelectorAll("img");for(const y of S){if(m.has(y.src)||!(y.alt||"").toLowerCase().includes("generated"))continue;const b=y.getBoundingClientRect();if(b.width>120&&b.height>120&&b.top>0&&b.top<window.innerHeight*.85){const x=y.closest("div");if(x){f=x,n(`พบรูป AI จาก alt="${y.alt}": ${y.src.substring(0,80)}...`);break}}}if(!f)for(const y of S){if(m.has(y.src))continue;const z=y.closest("div"),b=(z==null?void 0:z.textContent)||"";if(b.includes("product.png")||b.includes("character.png")||b.includes(".png")||b.includes(".jpg"))continue;const x=y.getBoundingClientRect();if(x.width>120&&x.height>120&&x.top>0&&x.top<window.innerHeight*.85){const k=y.closest("div");if(k){f=k,n(`พบรูปใหม่ (สำรอง): ${y.src.substring(0,80)}...`);break}}}if(!f){if(ft()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const y=we();if(y){A(`❌ สร้างรูปล้มเหลว: ${y}`),p.push(`image gen failed: ${y}`),M("img-wait","error");break}const z=w();z!==null?(z!==v&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${z}%`),v=z,M("img-wait","active",z)),C=Date.now()):v>30&&Math.floor((Date.now()-C)/1e3)>=3&&n(`🖼️ % หายที่ ${v}% — รูปน่าจะเสร็จแล้ว`),await g(3e3)}}if(!f)A("หมดเวลารอรูปที่สร้าง"),c.push("⚠️ Wait Image"),M("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),c.push("✅ Image Found"),M("img-wait","done",100);const S=f.getBoundingClientRect(),y=S.left+S.width/2,z=S.top+S.height/2,b={bubbles:!0,cancelable:!0,clientX:y,clientY:z};f.dispatchEvent(new PointerEvent("pointerenter",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseenter",b)),f.dispatchEvent(new PointerEvent("pointerover",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseover",b)),f.dispatchEvent(new PointerEvent("pointermove",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousemove",b)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await g(1500);let x=null;for(const k of["more_vert","more_horiz","more"]){const _=Ct(k);for(const O of _){const I=O.getBoundingClientRect();if(I.top>=S.top-20&&I.top<=S.bottom&&I.right>=S.right-150&&I.right<=S.right+20){x=O;break}}if(x)break}if(!x){const k=document.querySelectorAll("button");for(const _ of k){const O=_.getBoundingClientRect();if(O.width<50&&O.height<50&&O.top>=S.top-10&&O.top<=S.top+60&&O.left>=S.right-80){const I=_.querySelectorAll("i");for(const N of I)if((((B=N.textContent)==null?void 0:B.trim())||"").includes("more")){x=_;break}if(x)break;const V=_.getAttribute("aria-label")||"";if(V.includes("เพิ่มเติม")||V.includes("more")){x=_;break}}}}if(!x)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),c.push("⚠️ 3-dots");else{const k=x.getBoundingClientRect(),_=k.left+k.width/2,O=k.top+k.height/2,I={bubbles:!0,cancelable:!0,clientX:_,clientY:O,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",I)),await g(80),x.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",I)),x.dispatchEvent(new MouseEvent("click",I)),n("คลิกปุ่ม 3 จุดแล้ว"),await g(1500);let V=null;const N=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const L of N){const U=(L.textContent||"").trim();if(U.includes("ทำให้เป็นภาพเคลื่อนไหว")||U.includes("Animate")||U.includes("animate")){V=L;break}}if(!V)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),c.push("⚠️ Animate");else{const L=V.getBoundingClientRect(),U=L.left+L.width/2,j=L.top+L.height/2,q={bubbles:!0,cancelable:!0,clientX:U,clientY:j,button:0};V.dispatchEvent(new PointerEvent("pointerdown",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),V.dispatchEvent(new MouseEvent("mousedown",q)),await g(80),V.dispatchEvent(new PointerEvent("pointerup",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),V.dispatchEvent(new MouseEvent("mouseup",q)),V.dispatchEvent(new MouseEvent("click",q)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),c.push("✅ Animate"),M("animate","done"),await g(3e3)}}}}catch(w){A(`ขั้น 4 ผิดพลาด: ${w.message}`),c.push("⚠️ Animate")}if(ft()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{kt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),M("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await g(3e3);let w=!1;const f=document.querySelectorAll("button, span, div");for(const F of f){const S=(F.textContent||"").trim(),y=F.getBoundingClientRect();if((S==="วิดีโอ"||S==="Video"||S.includes("วิดีโอ"))&&y.bottom>window.innerHeight*.7){w=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}w||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await g(1e3);const v=ve();v?(await Bt(v,e.videoPrompt),n(`วาง Video Prompt แล้ว (${e.videoPrompt.length} ตัวอักษร)`),c.push("✅ Video Prompt"),M("vid-prompt","done")):(A("ไม่พบช่อง Prompt สำหรับ Video Prompt"),c.push("❌ Video Prompt"),p.push("video prompt input not found"),M("vid-prompt","error")),await g(1e3),M("vid-generate","active");const C=xe();if(C){const F=C.getBoundingClientRect(),S=F.left+F.width/2,y=F.top+F.height/2,z={bubbles:!0,cancelable:!0,clientX:S,clientY:y,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",z)),await g(80),C.dispatchEvent(new PointerEvent("pointerup",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",z)),C.dispatchEvent(new MouseEvent("click",z)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),c.push("✅ Video Generate"),M("vid-generate","done"),await g(500),C.dispatchEvent(new PointerEvent("pointerdown",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",z)),await g(80),C.dispatchEvent(new PointerEvent("pointerup",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",z)),C.dispatchEvent(new MouseEvent("click",z)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),c.push("❌ Video Generate"),p.push("video generate button not found"),M("vid-generate","error")}catch(w){A(`ขั้น 5 ผิดพลาด: ${w.message}`),c.push("⚠️ Video Gen"),p.push(`video gen error: ${w.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),mt("animate"),mt("vid-prompt"),mt("vid-generate"),mt("vid-wait");if(e.videoPrompt){M("vid-wait","active");const w=e.sceneCount||1,f=e.videoScenePrompts||[e.videoPrompt];if(w>1)try{Oe(w)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${w>1?`ต่อ ${w} ฉาก`:"ดาวน์โหลด"} ===`);const v=()=>{const S=document.querySelectorAll("div, span, p, label, strong, small");for(const y of S){if(y.closest("#netflow-engine-overlay"))continue;const z=(y.textContent||"").trim();if(z.length>10)continue;const b=z.match(/(\d{1,3})\s*%/);if(!b)continue;const x=parseInt(b[1],10);if(x<1||x>100)continue;const k=y.getBoundingClientRect();if(!(k.width===0||k.width>150)&&!(k.top<0||k.top>window.innerHeight))return x}return null},C=async(S=6e5)=>{n("รอการสร้างวิดีโอ..."),M("vid-wait","active"),await g(5e3);const y=()=>{const q=document.querySelectorAll("div, span, p, label, strong, small");let X=0;for(const G of q){if(G.closest("#netflow-engine-overlay"))continue;const Z=(G.textContent||"").trim();if(Z.includes("%")&&Z.length<15){const it=G.tagName.toLowerCase(),rt=G.className&&typeof G.className=="string"?G.className.split(/\s+/).slice(0,2).join(" "):"",lt=G.getBoundingClientRect();if(n(`  🔍 "${Z}" ใน <${it}.${rt}> ที่ (${lt.left.toFixed(0)},${lt.top.toFixed(0)}) w=${lt.width.toFixed(0)}`),X++,X>=5)break}}X===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},z=Yt();n(z?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),y();const b=Date.now();let x=-1,k=0,_=!1;for(;Date.now()-b<S;){const q=v();if(q!==null){if(q!==x&&(n(`ความคืบหน้าวิดีโอ: ${q}%`),x=q,M("vid-wait","active",q)),k=Date.now(),q>=100){n("✅ ตรวจพบ 100%!"),_=!0;break}}else if(x>30){const X=Math.floor((Date.now()-k)/1e3);if(X>=5){n(`✅ % หายไปที่ ${x}% (หาย ${X} วินาที) — วิดีโอเสร็จ!`),_=!0;break}n(`⏳ % หายที่ ${x}% — ยืนยันใน ${5-X} วินาที...`)}else{const X=Math.floor((Date.now()-b)/1e3);X%15<3&&n(`⏳ รอ... (${X} วินาที) ไม่พบ %`)}if(!_&&x>0&&Yt(!0)&&!z){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${x}% — วิดีโอเสร็จ!`),_=!0;break}if(ft())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(x<1){const X=we();if(X)return A(`❌ สร้างวิดีโอล้มเหลว: ${X}`),null}await g(3e3)}const O=Yt();if(!O)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),M("vid-wait","error"),null;const I=O;_?(M("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await g(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const V=I.getBoundingClientRect();let N=V.left+V.width/2,L=V.top+V.height/2,U=I;const j=I.querySelector("video, img, canvas");if(j){const q=j.getBoundingClientRect();q.width>50&&q.height>50&&(N=q.left+q.width/2,L=q.top+q.height/2,U=j,n(`🎯 พบรูปย่อ <${j.tagName.toLowerCase()}> ในการ์ดที่ (${N.toFixed(0)},${L.toFixed(0)}) ${q.width.toFixed(0)}x${q.height.toFixed(0)}`))}else L=V.top+V.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${N.toFixed(0)},${L.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${N.toFixed(0)}, ${L.toFixed(0)})...`),Ne(U);for(let q=0;q<8;q++){const X={bubbles:!0,cancelable:!0,clientX:N+q%2,clientY:L};U.dispatchEvent(new PointerEvent("pointermove",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),U.dispatchEvent(new MouseEvent("mousemove",X)),await g(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:w,scenePrompts:f,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${w} ฉาก, ${f.length} prompts, theme: ${e.theme})`)}catch(q){n(`⚠️ ไม่สามารถบันทึก pending action: ${q.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await F(U),n("✅ คลิกการ์ดวิดีโอเสร็จ"),I},F=async S=>{const y=S.getBoundingClientRect(),z=y.left+y.width/2,b=y.top+y.height/2,x={bubbles:!0,cancelable:!0,clientX:z,clientY:b,button:0};S.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousedown",x)),await g(80),S.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseup",x)),S.dispatchEvent(new MouseEvent("click",x)),await g(50),S.click(),n("คลิกการ์ดวิดีโอแล้ว"),await g(2e3)};try{if(!await C())A("หมดเวลารอการสร้างวิดีโอ"),c.push("⚠️ Video Wait"),M("vid-wait","error");else{c.push("✅ Video Complete"),M("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await g(3e3);const y=await new Promise(z=>{chrome.storage.local.get("netflow_pending_action",b=>{if(chrome.runtime.lastError){z(null);return}z((b==null?void 0:b.netflow_pending_action)||null)})});y&&!y._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove("netflow_pending_action"),y.action==="mute_video"?await $e(y.sceneCount||1,y.scenePrompts||[],y.theme):y.action==="wait_scene_gen_and_download"&&await Ee(y.sceneCount||2,y.currentScene||2,y.theme,y.scenePrompts||[]))}}catch(S){A(`ขั้น 6 ผิดพลาด: ${S.message}`),c.push("⚠️ Step6"),p.push(`step 6: ${S.message}`)}}const h=p.length===0;try{kt(h?5e3:8e3)}catch(w){console.warn("Overlay complete error:",w)}return{success:h,message:h?`สำเร็จ! ${c.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${c.join(" → ")} | ${p.join(", ")}`,step:h?"done":"partial"}}async function $e(e,t=[],a){var H;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{a&&Dt(a)}catch{}try{Nt(e)}catch(D){n(`⚠️ showOverlay error: ${D.message}`)}try{const D=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const B of D)M(B,"done");e>=2&&M("scene2-prompt","active"),n(`✅ overlay restored: ${D.length} steps done, sceneCount=${e}`)}catch(D){n(`⚠️ overlay restore error: ${D.message}`)}await g(1500);const r=(()=>{for(const D of document.querySelectorAll("button")){const B=D.querySelectorAll("i");for(const f of B){const v=(f.textContent||"").trim();if(v==="volume_up"||v==="volume_off"||v==="volume_mute"){const C=D.getBoundingClientRect();if(C.width>0&&C.height>0)return D}}const w=(D.getAttribute("aria-label")||"").toLowerCase();if(w.includes("mute")||w.includes("ปิดเสียง")){const f=D.getBoundingClientRect();if(f.width>0&&f.height>0)return D}}return null})();r?(r.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await g(2e3);for(let b=2;b<=e;b++){const x=t[b-1];if(!x){A(`ไม่พบ prompt สำหรับฉากที่ ${b}`);continue}n(`── ฉากที่ ${b}/${e}: วาง prompt + generate ──`);let k=null;const _=Date.now();for(;!k&&Date.now()-_<1e4;){const G=document.querySelectorAll("[data-slate-editor='true']");if(G.length>0&&(k=G[G.length-1]),!k){const Z=document.querySelectorAll("[role='textbox'][contenteditable='true']");Z.length>0&&(k=Z[Z.length-1])}k||await g(1e3)}if(!k){A("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${k.tagName.toLowerCase()}> ${k.className.substring(0,40)}`),await Bt(k,x),n(`วาง prompt ฉาก ${b} (${x.length} ตัวอักษร) ✅`);try{M(`scene${b}-prompt`,"done"),M(`scene${b}-gen`,"active")}catch{}await g(1e3);const O=k.getBoundingClientRect();let I=null,V=1/0;for(const G of document.querySelectorAll("button")){if(G.disabled)continue;const Z=G.querySelectorAll("i");let it=!1;for(const bt of Z)if((bt.textContent||"").trim()==="arrow_forward"){it=!0;break}if(!it)continue;const rt=G.getBoundingClientRect();if(rt.width<=0||rt.height<=0)continue;const lt=Math.abs(rt.top-O.top)+Math.abs(rt.right-O.right);lt<V&&(V=lt,I=G)}if(!I)for(const G of document.querySelectorAll("button")){const Z=G.querySelectorAll("i");for(const it of Z)if((it.textContent||"").trim()==="arrow_forward"){const rt=G.getBoundingClientRect();if(rt.width>0&&rt.height>0){I=G;break}}if(I)break}if(!I){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(G=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:a,sceneCount:e,currentScene:b,scenePrompts:t}},()=>G())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${b}/${e})`),await tt(I),n(`คลิก Generate ฉาก ${b} ✅`);try{M(`scene${b}-gen`,"done"),M(`scene${b}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${b} gen เสร็จ ──`),await g(5e3);let N=0,L=0;const U=Date.now(),j=6e5,q=5e3;let X=!1;for(;Date.now()-U<j;){let G=null;const Z=document.querySelectorAll("div, span, p, label, strong, small");for(const it of Z){if(it.closest("#netflow-engine-overlay"))continue;const lt=(it.textContent||"").trim().match(/^(\d{1,3})%$/);if(lt){const bt=it.getBoundingClientRect();if(bt.width>0&&bt.height>0&&bt.width<120&&bt.height<60){G=parseInt(lt[1],10);break}}}if(G!==null){if(G!==N){n(`🎬 ฉาก ${b} ความคืบหน้า: ${G}%`),N=G;try{M(`scene${b}-wait`,"active",G)}catch{}}L=0}else if(N>0){if(L===0)L=Date.now(),n(`🔍 ฉาก ${b}: % หายไป (จาก ${N}%) — กำลังยืนยัน...`);else if(Date.now()-L>=q){n(`✅ ฉาก ${b}: % หายไป ${q/1e3} วินาที — เจนเสร็จ!`),X=!0;break}}if(ft()){n("⛔ ผู้ใช้สั่งหยุด");return}await g(2e3)}X||A(`ฉาก ${b} หมดเวลา`),n(`✅ ฉาก ${b} เสร็จแล้ว`);try{M(`scene${b}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await g(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{M("download","active")}catch{}await g(2e3);const D=Date.now();let B=null;const w=Date.now();for(;!B&&Date.now()-w<1e4;){for(const b of document.querySelectorAll("button")){const x=b.querySelector("i");if(x&&(x.textContent||"").trim()==="download"){const k=b.getBoundingClientRect();if(k.width>0&&k.height>0){B=b;break}}}B||await g(1e3)}if(!B){A("ไม่พบปุ่มดาวน์โหลด");return}await tt(B),n("คลิกดาวน์โหลดแล้ว ✅");try{M("download","done"),M("upscale","active")}catch{}await g(1500);let f=null;for(let b=0;b<3&&!f;b++){b>0&&n(`🔄 ลองหา 720p ครั้งที่ ${b+1}...`);let x=null;const k=Date.now();for(;!x&&Date.now()-k<5e3;){for(const N of document.querySelectorAll("[role='menuitem']"))if((N.textContent||"").trim().includes("Full Video")&&N.querySelector("i")){const U=N.getBoundingClientRect();if(U.width>0&&U.height>0){x=N;break}}x||await g(500)}if(!x){A("ไม่พบ Full Video");continue}const _=x.getBoundingClientRect(),O=_.left+_.width/2,I=_.top+_.height/2;x.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:O,clientY:I})),x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:O,clientY:I})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:O,clientY:I})),await tt(x),n("คลิก/hover Full Video ✅"),await g(2e3);const V=Date.now();for(;!f&&Date.now()-V<8e3;){for(const N of document.querySelectorAll("button[role='menuitem']")){const L=N.querySelectorAll("span");for(const U of L)if((U.textContent||"").trim()==="720p"){const j=N.getBoundingClientRect();if(j.width>0&&j.height>0){f=N;break}}if(f)break}f||(x.isConnected&&(x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:O,clientY:I})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:O+20,clientY:I}))),await g(500))}}if(!f){A("ไม่พบ 720p");return}await tt(f),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const v=Date.now();let C=!1,F=!1;for(;Date.now()-v<3e5;){for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div")){const x=(b.textContent||"").trim();if(x==="Download complete!"||x==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),C=!0;break}(x.includes("Downloading your extended video")||x.includes("กำลังดาวน์โหลด"))&&(F||(F=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(C)break;if(F){let b=!1;for(const x of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((x.textContent||"").trim().includes("Downloading")){b=!0;break}if(!b){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),C=!0;break}}if(ft()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await g(2e3)}if(!C){A("เตรียมไฟล์หมดเวลา");return}try{M("upscale","done",100),M("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await g(5e3);let S=!1;const y=Date.now();for(;Date.now()-y<6e4&&!S;){try{await new Promise(b=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:D},x=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):x!=null&&x.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${x.message}`),S=!0,x.downloadUrl&&(i=x.downloadUrl,n(`[TikTok] จะใช้ download URL: ${x.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-y)/1e3)}s)`),b()})})}catch(b){A(`ตรวจสอบผิดพลาด: ${b.message}`)}S||await g(3e3)}S||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const z=await qt();i||(i=z);try{M("open","done"),kt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),Gt(i),Vt(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await g(2e3);const d=(D,B="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const w of document.querySelectorAll(B)){const f=(w.textContent||"").trim();if(f.includes(D)&&f.length<100){const v=w.getBoundingClientRect();if(v.width>0&&v.height>0&&v.top>=0)return w}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let s=null;const l=Date.now();for(;!s&&Date.now()-l<1e4;){for(const D of document.querySelectorAll("button, [role='button']")){const B=(D.textContent||"").trim(),w=B.toLowerCase();if((w.includes("download")||w.includes("ดาวน์โหลด"))&&B.length<80){const f=D.getBoundingClientRect();if(f.width>0&&f.height>0){s=D;break}}}if(!s)for(const D of document.querySelectorAll("button")){const B=(D.getAttribute("aria-label")||"").toLowerCase();if(B.includes("download")||B.includes("ดาวน์")){const w=D.getBoundingClientRect();if(w.width>0&&w.height>0){s=D;break}}}s||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await g(1e3))}if(!s){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(s.textContent||"").trim().substring(0,40)}"`),await tt(s),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await g(1500);const c=Date.now();let p=null;const u=Date.now();for(;!p&&Date.now()-u<5e3;)p=d("1080p"),p||(n("รอ 1080p..."),await g(500));if(!p){A("ไม่พบ 1080p");return}await tt(p),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const E=Date.now();let R=!1,T=!1,$=0;const m=3e3;for(;Date.now()-E<3e5;){const B=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(B.includes("upscaling complete")||B.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),R=!0;break}for(const f of document.querySelectorAll("div, span, p")){const v=(f.textContent||"").trim().toLowerCase();if(v.length<60&&(v.includes("upscaling complete")||v.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(H=f.textContent)==null?void 0:H.trim()}")`),R=!0;break}}if(R)break;if(B.includes("upscaling your video")||B.includes("กำลังอัปสเกล")){T=!0,$=0;const f=Math.floor((Date.now()-E)/1e3);n(`⏳ กำลังอัปสเกล... (${f} วินาที)`)}else if(T){if($===0)$=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-$>=m){n(`✅ ข้อความ Upscaling หายไป ${m/1e3} วินาที — เสร็จ!`),R=!0;break}}else{const f=Math.floor((Date.now()-E)/1e3);f%10<3&&n(`⏳ รอ Upscale... (${f} วินาที)`)}if(ft()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await g(2e3)}if(!R){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await g(5e3);let o=!1;const h=Date.now();for(;Date.now()-h<6e4&&!o;){try{await new Promise(D=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:c},B=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):B!=null&&B.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${B.message}`),o=!0,B.downloadUrl&&(i=B.downloadUrl,n(`[TikTok] จะใช้ download URL: ${B.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-h)/1e3)}s)`),D()})})}catch(D){A(`ตรวจสอบผิดพลาด: ${D.message}`)}o||await g(3e3)}o||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const P=await qt();i||(i=P),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),Gt(i),Vt(2e3)}async function Ee(e=2,t=2,a,r=[]){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{a&&Dt(a)}catch{}try{Nt(e)}catch(f){n(`⚠️ showOverlay error: ${f.message}`)}try{const f=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let v=2;v<=t;v++)f.push(`scene${v}-prompt`,`scene${v}-gen`),v<t&&f.push(`scene${v}-wait`);for(const v of f)M(v,"done");M(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${f.length} steps done (scene ${t}/${e} navigate)`)}catch(f){n(`⚠️ overlay restore error: ${f.message}`)}await g(2e3);const i=(()=>{for(const f of document.querySelectorAll("button")){const v=f.querySelectorAll("i");for(const C of v){const F=(C.textContent||"").trim();if(F==="volume_up"||F==="volume_off"||F==="volume_mute"){const S=f.getBoundingClientRect();if(S.width>0&&S.height>0)return f}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);let d=0,s=0;const l=Date.now(),c=6e5,p=5e3;let u=!1,E=0;for(;Date.now()-l<c;){let f=null;const v=document.querySelectorAll("div, span, p, label, strong, small");for(const C of v){if(C.closest("#netflow-engine-overlay"))continue;const S=(C.textContent||"").trim().match(/^(\d{1,3})%$/);if(S){const y=C.getBoundingClientRect();if(y.width>0&&y.height>0&&y.width<120&&y.height<60){f=parseInt(S[1],10);break}}}if(f!==null){if(E=0,f!==d){n(`🎬 scene ${t} ความคืบหน้า: ${f}%`),d=f;try{M(`scene${t}-wait`,"active",f)}catch{}}s=0}else if(d>0){if(s===0)s=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${d}%) — กำลังยืนยัน...`);else if(Date.now()-s>=p){n(`✅ scene ${t}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),u=!0;break}}else if(E++,E>=15){const C=document.querySelectorAll("video");let F=!1;for(const S of C)if(S.readyState>=2&&!S.paused&&S.getBoundingClientRect().width>200){F=!0;break}if(F){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),u=!0;break}if(E>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),u=!0;break}}await g(2e3)}u||n(`⚠️ scene ${t} หมดเวลา — ลองต่อไป`);try{M(`scene${t}-wait`,"done",100)}catch{}if(n(`✅ scene ${t} เสร็จ`),t<e&&r.length>0){n(`═══ ยังเหลืออีก ${e-t} ฉาก — ต่อฉากถัดไป ═══`),await g(2e3);for(let f=t+1;f<=e;f++){const v=r[f-1];if(!v){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${f} — ข้าม`);continue}n(`── ฉากที่ ${f}/${e}: วาง prompt + generate (pending recovery) ──`);let C=null;const F=Date.now();for(;!C&&Date.now()-F<1e4;){const I=document.querySelectorAll("[data-slate-editor='true']");if(I.length>0&&(C=I[I.length-1]),!C){const V=document.querySelectorAll("[role='textbox'][contenteditable='true']");V.length>0&&(C=V[V.length-1])}C||await g(1e3)}if(!C){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${f}`);break}await Bt(C,v),n(`วาง prompt ฉาก ${f} (${v.length} ตัวอักษร) ✅`);try{M(`scene${f}-prompt`,"done"),M(`scene${f}-gen`,"active")}catch{}await g(1e3);const S=C.getBoundingClientRect();let y=null,z=1/0;for(const I of document.querySelectorAll("button")){if(I.disabled)continue;const V=I.querySelectorAll("i");let N=!1;for(const j of V)if((j.textContent||"").trim()==="arrow_forward"){N=!0;break}if(!N)continue;const L=I.getBoundingClientRect();if(L.width<=0||L.height<=0)continue;const U=Math.abs(L.top-S.top)+Math.abs(L.right-S.right);U<z&&(z=U,y=I)}if(!y)for(const I of document.querySelectorAll("button")){const V=I.querySelectorAll("i");for(const N of V)if((N.textContent||"").trim()==="arrow_forward"){const L=I.getBoundingClientRect();if(L.width>0&&L.height>0){y=I;break}}if(y)break}if(!y){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${f}`);break}await new Promise(I=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:a,sceneCount:e,currentScene:f,scenePrompts:r}},()=>I())}),await tt(y),n(`คลิก Generate ฉาก ${f} ✅`);try{M(`scene${f}-gen`,"done"),M(`scene${f}-wait`,"active")}catch{}await g(5e3);let b=0,x=0;const k=Date.now();let _=!1,O=0;for(;Date.now()-k<6e5;){let I=null;const V=document.querySelectorAll("div, span, p, label, strong, small");for(const N of V){if(N.closest("#netflow-engine-overlay"))continue;const U=(N.textContent||"").trim().match(/^(\d{1,3})%$/);if(U){const j=N.getBoundingClientRect();if(j.width>0&&j.height>0&&j.width<120&&j.height<60){I=parseInt(U[1],10);break}}}if(I!==null){if(O=0,I!==b){n(`🎬 ฉาก ${f} ความคืบหน้า: ${I}%`),b=I;try{M(`scene${f}-wait`,"active",I)}catch{}}x=0}else if(b>0){if(x===0)x=Date.now();else if(Date.now()-x>=5e3){n(`✅ ฉาก ${f}: เจนเสร็จ!`),_=!0;break}}else if(O++,O>=15){const N=document.querySelectorAll("video");let L=!1;for(const U of N)if(U.readyState>=2&&!U.paused&&U.getBoundingClientRect().width>200){L=!0;break}if(L){n(`✅ ฉาก ${f}: พบวิดีโอเล่นอยู่ — เสร็จ`),_=!0;break}if(O>=30){n(`✅ ฉาก ${f}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),_=!0;break}}await g(2e3)}_||n(`⚠️ ฉาก ${f} หมดเวลา`);try{M(`scene${f}-wait`,"done",100)}catch{}n(`✅ ฉาก ${f} เสร็จแล้ว`),chrome.storage.local.remove("netflow_pending_action"),await g(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await g(3e3);let R=null;try{M("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const T=Date.now();let $=null;const m=Date.now();for(;!$&&Date.now()-m<1e4;){for(const f of document.querySelectorAll("button")){const v=f.querySelector("i");if(v&&(v.textContent||"").trim()==="download"){const C=f.getBoundingClientRect();if(C.width>0&&C.height>0){$=f;break}}}$||await g(1e3)}if(!$){A("ไม่พบปุ่มดาวน์โหลด");return}await tt($),n("คลิกดาวน์โหลดแล้ว ✅");try{M("download","done"),M("upscale","active")}catch{}await g(1500);let o=null;for(let f=0;f<3&&!o;f++){f>0&&n(`🔄 ลองหา 720p ครั้งที่ ${f+1}...`);let v=null;const C=Date.now();for(;!v&&Date.now()-C<5e3;){for(const b of document.querySelectorAll("[role='menuitem']"))if((b.textContent||"").trim().includes("Full Video")&&b.querySelector("i")){const k=b.getBoundingClientRect();if(k.width>0&&k.height>0){v=b;break}}v||await g(500)}if(!v){A("ไม่พบ Full Video");continue}const F=v.getBoundingClientRect(),S=F.left+F.width/2,y=F.top+F.height/2;v.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:S,clientY:y})),v.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:S,clientY:y})),v.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:S,clientY:y})),await tt(v),n("คลิก/hover Full Video ✅"),await g(2e3);const z=Date.now();for(;!o&&Date.now()-z<8e3;){for(const b of document.querySelectorAll("button[role='menuitem']")){const x=b.querySelectorAll("span");for(const k of x)if((k.textContent||"").trim()==="720p"){const _=b.getBoundingClientRect();if(_.width>0&&_.height>0){o=b;break}}if(o)break}o||(v.isConnected&&(v.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:S,clientY:y})),v.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:S+20,clientY:y}))),await g(500))}}if(!o){A("ไม่พบ 720p");return}await tt(o),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const h=Date.now();let P=!1,H=!1;for(;Date.now()-h<3e5;){for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div")){const v=(f.textContent||"").trim();if(v==="Download complete!"||v==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),P=!0;break}(v.includes("Downloading your extended video")||v.includes("กำลังดาวน์โหลด"))&&(H||(H=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(P)break;if(H){let f=!1;for(const v of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((v.textContent||"").trim().includes("Downloading")){f=!0;break}if(!f){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),P=!0;break}}await g(2e3)}if(!P){A("เตรียมไฟล์หมดเวลา");return}try{M("upscale","done",100),M("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await g(5e3);let D=!1;const B=Date.now();for(;Date.now()-B<6e4&&!D;){try{await new Promise(f=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:T},v=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):v!=null&&v.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${v.message}`),D=!0,v.downloadUrl&&(R=v.downloadUrl,n(`[TikTok] จะใช้ download URL: ${v.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-B)/1e3)}s)`),f()})})}catch(f){A(`ตรวจสอบผิดพลาด: ${f.message}`)}D||await g(3e3)}D||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const w=await qt();R||(R=w);try{M("open","done"),kt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),Gt(R),Vt(2e3)}async function Ke(){try{const e=await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{if(chrome.runtime.lastError){d(null);return}d((s==null?void 0:s.netflow_pending_action)||null)})});if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const a=Date.now()-e.timestamp;if(a>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const r=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=r,await new Promise(d=>{chrome.storage.local.set({netflow_pending_action:e},()=>d())}),await g(300),!await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{const l=s==null?void 0:s.netflow_pending_action;d((l==null?void 0:l._claimed)===r)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(a/1e3)} วินาที)`),e.action==="mute_video"?await $e(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await Ee(e.sceneCount||2,e.currentScene||2,e.theme,e.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,a)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),a({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),je(e).then(r=>n(`✅ ระบบอัตโนมัติเสร็จ: ${r.message}`)).catch(r=>{if(r instanceof Wt||(r==null?void 0:r.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Rt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{he()}catch{}}else console.error("[Netflow AI] Generate error:",r)}),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,a({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return a({status:"ready"}),!1;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return a({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await g(500);const r=Ve();if(!r){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=r.getBoundingClientRect(),d=i.left+i.width/2,s=i.top+i.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${s.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let l=0;l<2;l++){const c=document.elementFromPoint(d,s);c?(await tt(c),n(`คลิก ${l+1}/2 บน <${c.tagName.toLowerCase()}>`)):(await tt(r),n(`คลิก ${l+1}/2 บนการ์ด (สำรอง)`)),await g(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Ke()})();
