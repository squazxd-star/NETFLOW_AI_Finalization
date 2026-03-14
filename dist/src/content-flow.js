(function(){"use strict";const bt={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let st=bt.green,Mt=null;function Ht(e){e&&bt[e]&&(Mt=e,st=bt[e],ge(),requestAnimationFrame(()=>De()))}function Ye(){if(Mt&&bt[Mt])return bt[Mt];try{const e=localStorage.getItem("netflow_app_theme");if(e&&bt[e])return bt[e]}catch{}return bt.green}let lt=0,dt=255,pt=65;function ge(){const e=st.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(lt=parseInt(e[1],16),dt=parseInt(e[2],16),pt=parseInt(e[3],16))}const me='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',he='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let U=null,rt=null,nt=null,be=0,Gt=null,Rt=null,Wt=null,Zt=0,yt=!1,gt=null,Bt=null,Dt=null,Ct=1,J=[];function jt(e){const t=[{stepId:"open-flow",label:"เปิด Google Flow",status:"waiting"},{stepId:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let o=2;o<=e;o++)t.push({stepId:`scene${o}-prompt`,label:`ฉาก ${o} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${o}-gen`,label:`ฉาก ${o} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${o}-wait`,label:`ฉาก ${o} — กำลังสร้าง`,status:"waiting",progress:0});t.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return t}const ut=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"open-flow",label:"เปิด Google Flow",status:"waiting"},{id:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];J=jt(1);function Ke(e){const t=e.rgb,o=e.accentRgb,s=e.doneRgb,a=e.hex,d=e.accentHex,i=e.doneHex,c=(()=>{const x=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!x)return"#4ade80";const l=g=>Math.min(255,g+80);return`#${[1,2,3].map(g=>l(parseInt(x[g],16)).toString(16).padStart(2,"0")).join("")}`})(),r=(()=>{const x=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!x)return"#4ade80";const l=g=>Math.min(255,g+60);return`#${[1,2,3].map(g=>l(parseInt(x[g],16)).toString(16).padStart(2,"0")).join("")}`})(),p=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),f=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,h=p?parseInt(p[1],16)/f:0,_=p?parseInt(p[2],16)/f:1,z=p?parseInt(p[3],16)/f:.25,T=x=>`${Math.round(h*x)}, ${Math.round(_*x)}, ${Math.round(z*x)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${T(18)},0.94) 0%, rgba(${T(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: rgba(${T(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${T(180)},0.05),
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
            0 0 200px rgba(${T(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${T(180)},0.08),
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
    background: linear-gradient(180deg, rgba(${T(5)},0.95) 0%, rgba(${T(12)},0.98) 100%);
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
    background: linear-gradient(180deg, rgba(${T(6)},0.75) 0%, rgba(${T(3)},0.92) 100%);
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
    background: rgba(${T(8)}, 0.88);
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
    background: rgba(${T(8)},0.8);
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
    background: rgba(${T(8)}, 0.9);
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

    `}function Jt(){nt||(nt=document.createElement("style"),nt.id="netflow-overlay-styles",nt.textContent=Ke(st),document.head.appendChild(nt))}function we(e){e.innerHTML="",J.forEach((t,o)=>{const s=document.createElement("div");s.className="nf-proc-row nf-proc-waiting",s.id=`nf-proc-${t.stepId}`,s.innerHTML=`
            <span class="nf-proc-num">${o+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(s)})}function xe(){const e=document.getElementById("nf-terminal");if(!e)return;we(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${J.length}`)}function ye(e,t){let c="";for(let _=0;_<20;_++){const z=_/20*Math.PI*2,T=(_+.2)/20*Math.PI*2,x=(_+.5)/20*Math.PI*2,l=(_+.8)/20*Math.PI*2,g=(_+1)/20*Math.PI*2;c+=`${_===0?"M":"L"}${(120+100*Math.cos(z)).toFixed(1)},${(120+100*Math.sin(z)).toFixed(1)} `,c+=`L${(120+100*Math.cos(T)).toFixed(1)},${(120+100*Math.sin(T)).toFixed(1)} `,c+=`L${(120+112*Math.cos(x)).toFixed(1)},${(120+112*Math.sin(x)).toFixed(1)} `,c+=`L${(120+100*Math.cos(l)).toFixed(1)},${(120+100*Math.sin(l)).toFixed(1)} `,c+=`L${(120+100*Math.cos(g)).toFixed(1)},${(120+100*Math.sin(g)).toFixed(1)} `}c+="Z";const r=14,p=72,f=62;let h="";for(let _=0;_<r;_++){const z=_/r*Math.PI*2,T=(_+.25)/r*Math.PI*2,x=(_+.75)/r*Math.PI*2,l=(_+1)/r*Math.PI*2;h+=`${_===0?"M":"L"}${(120+f*Math.cos(z)).toFixed(1)},${(120+f*Math.sin(z)).toFixed(1)} `,h+=`L${(120+p*Math.cos(T)).toFixed(1)},${(120+p*Math.sin(T)).toFixed(1)} `,h+=`L${(120+p*Math.cos(x)).toFixed(1)},${(120+p*Math.sin(x)).toFixed(1)} `,h+=`L${(120+f*Math.cos(l)).toFixed(1)},${(120+f*Math.sin(l)).toFixed(1)} `}return h+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`}function Xe(){const e=document.createElement("div");e.id="netflow-engine-overlay",gt=document.createElement("canvas"),gt.id="nf-matrix-canvas",e.appendChild(gt);const t=document.createElement("div");t.className="nf-pat-plasma",e.appendChild(t);for(let E=1;E<=5;E++){const k=document.createElement("div");k.className=`nf-ambient-orb nf-orb-${E}`,e.appendChild(k)}const o=document.createElement("div");o.className="nf-pat-data",e.appendChild(o);const s=document.createElement("div");s.className="nf-pat-diag-a",e.appendChild(s);const a=document.createElement("div");a.className="nf-pat-diag-b",e.appendChild(a);const d=document.createElement("div");d.className="nf-pat-circuit",e.appendChild(d);const i=document.createElement("div");i.className="nf-pat-honeycomb",e.appendChild(i);const c=document.createElement("div");c.className="nf-pat-binary",e.appendChild(c);const r=document.createElement("div");r.className="nf-pat-crosshatch",e.appendChild(r);const p=document.createElement("div");p.className="nf-pat-diamond",e.appendChild(p);const f=document.createElement("div");f.className="nf-pat-wave-h",e.appendChild(f);const h=document.createElement("div");h.className="nf-pat-radar",e.appendChild(h);const _=document.createElement("div");_.className="nf-pat-ripple-1",e.appendChild(_);const z=document.createElement("div");z.className="nf-pat-ripple-2",e.appendChild(z);const T=document.createElement("div");T.className="nf-pat-techscan",e.appendChild(T);const x=document.createElement("div");x.className="nf-center-glow",e.appendChild(x);const l=document.createElement("div");l.className="nf-pat-noise",e.appendChild(l);const g=document.createElement("div");g.className="nf-crt-scanlines",e.appendChild(g);const C=document.createElement("div");C.className="nf-vignette",e.appendChild(C);for(let E=0;E<3;E++){const k=document.createElement("div");k.className="nf-pulse-ring",e.appendChild(k)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(E=>{const k=document.createElement("div");k.className=`nf-corner-deco ${E}`,e.appendChild(k)});const V=document.createElement("button");V.className="nf-stop-btn",V.innerHTML='<span class="nf-stop-icon"></span> หยุด',V.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",V.onclick=()=>{var E;window.__NETFLOW_STOP__=!0;try{Ft("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((E=chrome.runtime)!=null&&E.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},e.appendChild(V);const N=document.createElement("div");N.className="nf-layout";const O=document.createElement("div");O.className="nf-core-monitor",O.id="nf-core-monitor";const b=document.createElement("div");b.className="nf-core-header",b.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${J.length}</div>
    `,O.appendChild(b);const S=document.createElement("div");S.className="nf-terminal",S.id="nf-terminal",we(S),O.appendChild(S);const B=document.createElement("div");B.className="nf-engine-core",B.id="nf-engine-core";const m=document.createElement("div");m.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(E=>{const k=document.createElement("div");k.className=`nf-frame-corner ${E}`,m.appendChild(k)}),B.appendChild(m);const y="http://www.w3.org/2000/svg",w=document.createElementNS(y,"svg");w.setAttribute("class","nf-engine-waves"),w.setAttribute("viewBox","0 0 560 140"),w.setAttribute("preserveAspectRatio","none"),w.id="nf-engine-waves";for(let E=0;E<4;E++){const k=document.createElementNS(y,"path");k.setAttribute("fill","none"),k.setAttribute("stroke-width",E<2?"1.5":"1"),k.setAttribute("stroke",E<2?`rgba(${st.rgb},${.14+E*.1})`:`rgba(${st.accentRgb},${.1+(E-2)*.08})`),k.setAttribute("data-wave-idx",String(E)),w.appendChild(k)}B.appendChild(w);const v=document.createElement("div");v.className="nf-engine-brand-inner",v.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${ye(st.rgb,st.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${ye(st.rgb,st.accentRgb)}
        </div>
    `,B.appendChild(v);const R=document.createElement("div");R.className="nf-engine-stats",R.id="nf-engine-stats",R.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([E,k,q])=>`<div class="nf-stat-item"><span class="nf-stat-label">${E}</span><span class="nf-stat-val" id="${k}">${q}</span></div>`).join(""),B.appendChild(R),O.appendChild(B),N.appendChild(O);const $=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ut.forEach((E,k)=>{const q=Qe(E);q.classList.add($[k]),q.id=`nf-mod-${E.id}`,N.appendChild(q)}),e.appendChild(N);for(let E=0;E<30;E++){const k=document.createElement("div");k.className="nf-particle",k.style.left=`${5+Math.random()*90}%`,k.style.bottom=`${Math.random()*40}%`,k.style.animationDuration=`${3+Math.random()*5}s`,k.style.animationDelay=`${Math.random()*4}s`;const q=.3+Math.random()*.4,I=.7+Math.random()*.3;k.style.background=`rgba(${Math.floor(lt*I)}, ${Math.floor(dt*I)}, ${Math.floor(pt*I)}, ${q})`,k.style.width=`${1+Math.random()*2}px`,k.style.height=k.style.width,e.appendChild(k)}return e}function Qe(e){const t=document.createElement("div");t.className="nf-module";const o=document.createElement("div");o.className="nf-mod-header",o.innerHTML=`
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
        `,t.appendChild(d)});const s=document.createElement("div");return s.className="nf-mod-progress",s.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(s),t}function Ze(){be=Date.now(),Gt=setInterval(()=>{const e=Math.floor((Date.now()-be)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),o=String(e%60).padStart(2,"0"),s=document.getElementById("nf-timer");s&&(s.textContent=`${t}:${o}`);const a=document.getElementById("nf-stat-elapsed");a&&(a.textContent=`${t}:${o}`)},1e3)}function ve(){Gt&&(clearInterval(Gt),Gt=null)}const Je=120,$e=160,Ee=.4;let Tt=null,ke=0,Ce=0,Te=0,Ot=[];function tn(e,t){Ot=[];for(let o=0;o<Je;o++){const s=Math.random();let a;s<.22?a=0:s<.4?a=1:s<.55?a=2:s<.68?a=3:s<.84?a=4:a=5;const d=Math.random()*e,i=Math.random()*t,c=50+Math.random()*220,r=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Ot.push({x:a===0?Math.random()*e:d+Math.cos(r)*c,y:a===0?Math.random()*t:i+Math.sin(r)*c,vx:(Math.random()-.5)*Ee,vy:(Math.random()-.5)*Ee,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:a,oCx:d,oCy:i,oRadius:c,oAngle:r,oSpeed:p})}}function en(){if(!gt)return;const e=gt;if(Bt=e.getContext("2d"),!Bt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,Ot.length===0&&tn(e.width,e.height)};t(),window.addEventListener("resize",t);let o=null,s=0,a=0,d=!1;function i(){if(!Bt||!gt){Dt=null;return}if(Dt=requestAnimationFrame(i),d=!d,d)return;const c=Bt,r=gt.width,p=gt.height;c.fillStyle=`rgba(${lt*.04|0},${dt*.04|0},${pt*.06|0},1)`,c.fillRect(0,0,r,p),(!o||s!==r||a!==p)&&(s=r,a=p,o=c.createRadialGradient(r*.5,p*.5,0,r*.5,p*.5,Math.max(r,p)*.6),o.addColorStop(0,`rgba(${lt*.08|0},${dt*.08|0},${pt*.1|0},0.4)`),o.addColorStop(1,"rgba(0,0,0,0)")),c.fillStyle=o,c.fillRect(0,0,r,p);const f=Ot,h=f.length,_=$e*$e;for(let x=0;x<h;x++){const l=f[x];if(l.pulsePhase+=l.pulseSpeed,l.motion===0)l.x+=l.vx,l.y+=l.vy,l.x<0?(l.x=0,l.vx=Math.abs(l.vx)*(.8+Math.random()*.4)):l.x>r&&(l.x=r,l.vx=-Math.abs(l.vx)*(.8+Math.random()*.4)),l.y<0?(l.y=0,l.vy=Math.abs(l.vy)*(.8+Math.random()*.4)):l.y>p&&(l.y=p,l.vy=-Math.abs(l.vy)*(.8+Math.random()*.4));else if(l.motion===1)l.oAngle+=l.oSpeed,l.x=l.oCx+Math.cos(l.oAngle)*l.oRadius,l.y=l.oCy+Math.sin(l.oAngle)*l.oRadius,l.oCx+=Math.sin(l.oAngle*.3)*.15,l.oCy+=Math.cos(l.oAngle*.3)*.15;else if(l.motion===2)l.oAngle+=l.oSpeed,l.x=l.oCx+Math.cos(l.oAngle)*l.oRadius,l.y=l.oCy+Math.sin(l.oAngle)*l.oRadius*.5,l.oCx+=Math.sin(l.oAngle*.2)*.1,l.oCy+=Math.cos(l.oAngle*.2)*.1;else if(l.motion===3){l.oAngle+=l.oSpeed;const g=l.oAngle,C=l.oRadius*.7;l.x=l.oCx+C*Math.cos(g),l.y=l.oCy+C*Math.sin(g)*Math.cos(g),l.oCx+=Math.sin(g*.15)*.12,l.oCy+=Math.cos(g*.15)*.12}else if(l.motion===4){l.oAngle+=l.oSpeed*1.2;const g=l.oRadius*(.5+.5*Math.abs(Math.sin(l.oAngle*.15)));l.x=l.oCx+Math.cos(l.oAngle)*g,l.y=l.oCy+Math.sin(l.oAngle)*g,l.oCx+=Math.sin(l.oAngle*.1)*.18,l.oCy+=Math.cos(l.oAngle*.1)*.18}else l.oAngle+=l.oSpeed,l.x+=l.vx*.8,l.y=l.oCy+Math.sin(l.oAngle+l.x*.008)*l.oRadius*.35,l.x<-30?l.x=r+30:l.x>r+30&&(l.x=-30),l.oCy+=Math.sin(l.oAngle*.1)*.08;if(l.motion>0){const g=l.oRadius+50;l.oCx<-g?l.oCx=r+g:l.oCx>r+g&&(l.oCx=-g),l.oCy<-g?l.oCy=p+g:l.oCy>p+g&&(l.oCy=-g)}}c.beginPath(),c.strokeStyle=`rgba(${lt},${dt},${pt},0.06)`,c.lineWidth=.4;const z=new Path2D;for(let x=0;x<h;x++){const l=f[x];for(let g=x+1;g<h;g++){const C=f[g],V=l.x-C.x,N=l.y-C.y,O=V*V+N*N;O<_&&(1-O/_<.4?(c.moveTo(l.x,l.y),c.lineTo(C.x,C.y)):(z.moveTo(l.x,l.y),z.lineTo(C.x,C.y)))}}if(c.stroke(),c.strokeStyle=`rgba(${lt},${dt},${pt},0.18)`,c.lineWidth=.8,c.stroke(z),!Tt||ke!==lt||Ce!==dt||Te!==pt){Tt=document.createElement("canvas");const x=48;Tt.width=x,Tt.height=x;const l=Tt.getContext("2d"),g=l.createRadialGradient(x/2,x/2,0,x/2,x/2,x/2);g.addColorStop(0,`rgba(${lt},${dt},${pt},0.9)`),g.addColorStop(.3,`rgba(${lt},${dt},${pt},0.35)`),g.addColorStop(1,`rgba(${lt},${dt},${pt},0)`),l.fillStyle=g,l.fillRect(0,0,x,x),ke=lt,Ce=dt,Te=pt}const T=Tt;for(let x=0;x<h;x++){const l=f[x],g=.6+.4*Math.sin(l.pulsePhase),C=l.radius*5*(.8+g*.4);c.globalAlpha=.5+g*.4,c.drawImage(T,l.x-C/2,l.y-C/2,C,C)}c.globalAlpha=1,c.fillStyle="rgba(255,255,255,0.45)",c.beginPath();for(let x=0;x<h;x++){const l=f[x];if(l.radius>2){const g=.6+.4*Math.sin(l.pulsePhase),C=l.radius*(.8+g*.4)*.35;c.moveTo(l.x+C,l.y),c.arc(l.x,l.y,C,0,Math.PI*2)}}c.fill()}i()}function nn(){Dt!==null&&(cancelAnimationFrame(Dt),Dt=null),gt=null,Bt=null,Ot=[]}let Nt=null;const Yt=560,on=140,Ie=Yt/2,Se=on/2,_e=[];for(let e=0;e<=Yt;e+=8){const t=Math.abs(e-Ie)/Ie;_e.push(Math.pow(Math.min(1,t*1.6),.6))}const an=[0,1,2,3].map(e=>({amp:10+e*5,freq:(1.2+e*.35)*Math.PI*2/Yt,off:e*.6,spd:.7+e*.12}));let te=!1;function Pe(){if(Rt=requestAnimationFrame(Pe),te=!te,te)return;if(Zt+=.07,!Nt){const t=document.getElementById("nf-engine-waves");if(!t){Rt=null;return}Nt=Array.from(t.querySelectorAll("path"))}const e=[];for(let t=0;t<Nt.length;t++){const o=an[t],s=Zt*o.spd+o.off;e.length=0,e.push(`M 0 ${Se}`);let a=0;for(let d=0;d<=Yt;d+=8){const i=Se+o.amp*_e[a++]*Math.sin(d*o.freq+s);e.push(`L${d} ${i*10+.5|0}`)}Nt[t].setAttribute("d",e.join(" "))}}function rn(){Zt=0,Pe(),en(),Wt=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),o=document.getElementById("nf-stat-lat2"),s=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(12+Math.random()*10)}ms`),s&&(s.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function Ae(){Rt!==null&&(cancelAnimationFrame(Rt),Rt=null),Wt&&(clearInterval(Wt),Wt=null),Nt=null,nn()}function Kt(){let e=0;const t=J.filter(p=>p.status!=="skipped").length;for(const p of J){const f=document.getElementById(`nf-proc-${p.stepId}`);if(!f)continue;f.className="nf-proc-row";const h=f.querySelector(".nf-proc-badge");switch(p.status){case"done":f.classList.add("nf-proc-done"),h&&(h.textContent="✅ done"),e++;break;case"active":f.classList.add("nf-proc-active"),h&&(h.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":f.classList.add("nf-proc-error"),h&&(h.textContent="❌ error");break;case"skipped":f.classList.add("nf-proc-skipped"),h&&(h.textContent="— skip");break;default:f.classList.add("nf-proc-waiting"),h&&(h.textContent="(queued)")}}const o=J.findIndex(p=>p.status==="active"),s=o>=0?o+1:e>=t&&t>0?J.length:e,a=document.getElementById("nf-step-counter");a&&(a.textContent=`${s}/${J.length}`);const d=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");e>=t&&t>0?(d&&(d.textContent="COMPLETE",d.style.color=st.doneHex),i&&(i.style.background=st.doneHex,i.style.boxShadow=`0 0 8px rgba(${st.doneRgb},0.7)`)):J.some(f=>f.status==="error")?(d&&(d.textContent="ERROR",d.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):J.some(f=>f.status==="active")&&d&&(d.textContent="ACTIVE",d.style.color=st.hex,d.style.textShadow=`0 0 10px rgba(${st.rgb},0.5)`);const c=document.getElementById("nf-terminal"),r=c==null?void 0:c.querySelector(".nf-proc-active");r&&c&&r.scrollIntoView({behavior:"smooth",block:"center"})}function Me(){rt&&rt.isConnected||(Jt(),rt=document.createElement("button"),rt.id="nf-toggle-btn",rt.className="nf-toggle-visible",rt.innerHTML=yt?me:he,rt.title="ซ่อน/แสดง Netflow Overlay",rt.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",rt.onclick=()=>Re(),document.body.appendChild(rt))}function Re(){U&&(Me(),yt?(U.classList.remove("nf-hidden"),U.classList.add("nf-visible"),U.style.opacity="1",U.style.pointerEvents="auto",rt&&(rt.innerHTML=he),yt=!1):(U.classList.remove("nf-visible"),U.classList.add("nf-hidden"),U.style.opacity="0",U.style.pointerEvents="none",rt&&(rt.innerHTML=me),yt=!0))}const Be={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function De(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=Mt;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"green"}catch{t="green"}const o=Be[t]||Be.green;let s;try{s=chrome.runtime.getURL(o)}catch{s=`/${o}`}const a=st.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${a},0.25) 0%, rgba(${a},0.12) 50%, rgba(${a},0.20) 100%)`,`url('${s}')`].join(", "),e.style.backgroundSize="auto, auto, 50%",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${a},0.45)`,e.style.boxShadow=`0 0 70px rgba(${a},0.22), 0 0 140px rgba(${a},0.1), inset 0 1px 0 rgba(${a},0.15)`}function Xt(e=1){if(st=Ye(),ge(),U&&U.isConnected){U.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!nt||!nt.isConnected)&&(nt=null,Jt()),setTimeout(()=>{if(U)try{nt!=null&&nt.sheet&&nt.sheet.cssRules.length>0&&(U.style.removeProperty("background"),U.style.removeProperty("font-family"),U.style.removeProperty("overflow"))}catch{}},200);for(const t of ut)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;Ct=e,J=jt(e),xe();for(const t of ut)ee(t);if(Qt(),Kt(),!U.querySelector(".nf-stop-btn")){const t=document.createElement("button");t.className="nf-stop-btn",t.innerHTML='<span class="nf-stop-icon"></span> หยุด',t.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",t.onclick=()=>{var o;window.__NETFLOW_STOP__=!0;try{Ft("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((o=chrome.runtime)!=null&&o.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},U.appendChild(t)}yt&&Re();return}U&&!U.isConnected&&(U=null),nt&&(nt.remove(),nt=null),Jt();for(const t of ut)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;if(Ct=e,J=jt(e),e>1){const t=ut.find(s=>s.id==="video");if(t){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let a=2;a<=e;a++)s.push({id:`scene${a}-prompt`,label:`Scene ${a} Prompt`,status:"waiting"}),s.push({id:`scene${a}-gen`,label:`Scene ${a} Generate`,status:"waiting"}),s.push({id:`scene${a}-wait`,label:`Scene ${a} รอผล`,status:"waiting",progress:0});t.steps=s}const o=ut.find(s=>s.id==="render");if(o){const s=o.steps.find(d=>d.id==="download");s&&(s.label="ดาวน์โหลด 720p");const a=o.steps.find(d=>d.id==="upscale");a&&(a.label="Full Video")}}U=Xe(),U.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(U),U.classList.add("nf-visible"),yt=!1,Me(),Ze(),rn(),requestAnimationFrame(()=>De()),setTimeout(()=>{if(U)try{nt!=null&&nt.sheet&&nt.sheet.cssRules.length>0&&(U.style.removeProperty("background"),U.style.removeProperty("font-family"),U.style.removeProperty("overflow"))}catch{}},200)}function Oe(){ve(),Ae(),yt=!1,U&&(U.classList.add("nf-fade-out"),setTimeout(()=>{U==null||U.remove(),U=null},500)),rt&&(rt.remove(),rt=null)}const sn={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function cn(e,t,o){const s=J.findIndex(h=>h.status==="active"),a=J.filter(h=>h.status==="done").length,d=J.length,i=s>=0?s+1:a>=d?d:a,c=document.getElementById("nf-stat-step");c&&(c.textContent=`${i}/${d}`);let r=1;for(const h of J)if(h.status==="active"||h.status==="done")if(h.stepId.startsWith("scene")){const _=h.stepId.match(/^scene(\d+)-/);_&&(r=Math.max(r,parseInt(_[1],10)))}else(h.stepId==="download"||h.stepId==="upscale"||h.stepId==="open")&&(r=Ct);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=Ct>1?`${r}/${Ct}`:"1/1"),t==="active"){const h=document.getElementById("nf-stat-status"),_=sn[e]||e.toUpperCase();h&&(h.textContent=_)}else if(t==="done"&&a>=d){const h=document.getElementById("nf-stat-status");h&&(h.textContent="COMPLETE")}else if(t==="error"){const h=document.getElementById("nf-stat-status");h&&(h.textContent="ERROR")}const f=document.getElementById("nf-stat-progress");f&&(o!==void 0&&o>0?f.textContent=`${Math.min(100,o)}%`:t==="active"&&(f.textContent="—"))}function P(e,t,o){if(!U)return;for(const a of ut)for(const d of a.steps)d.id===e&&(d.status=t,o!==void 0&&(d.progress=o));for(const a of J)a.stepId===e&&(a.status=t,o!==void 0&&(a.progress=o));const s=document.getElementById(`nf-step-${e}`);if(s&&(s.className="nf-step",t==="active"?s.classList.add("nf-step-active"):t==="done"?s.classList.add("nf-step-done"):t==="error"&&s.classList.add("nf-step-error")),cn(e,t,o),o!==void 0){const a=document.getElementById(`nf-bar-${e}`);a&&(a.style.width=`${Math.min(100,o)}%`)}Qt(),Kt()}function It(e){P(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function Lt(e=4e3){ve(),Ae(),Qt(),Kt(),setTimeout(()=>Oe(),e)}function Qt(){for(const e of ut){const t=e.steps.filter(r=>r.status!=="skipped").length,o=e.steps.filter(r=>r.status==="done").length,s=e.steps.some(r=>r.status==="active"),a=t>0?Math.round(o/t*100):0,d=document.getElementById(`nf-pct-${e.id}`);d&&(d.textContent=`${a}%`);const i=document.getElementById(`nf-modbar-${e.id}`);i&&(i.style.width=`${a}%`);const c=document.getElementById(`nf-mod-${e.id}`);c&&(c.classList.remove("nf-active","nf-done"),a>=100?c.classList.add("nf-done"):s&&c.classList.add("nf-active"))}}function ln(e){var s,a,d,i;Ct=e;const t=new Map;for(const c of J)t.set(c.stepId,{status:c.status,progress:c.progress});J=jt(e);for(const c of J){const r=t.get(c.stepId);r&&(c.status=r.status,r.progress!==void 0&&(c.progress=r.progress))}if(xe(),e>1){const c=ut.find(r=>r.id==="video");if(c){const r=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((s=c.steps.find(p=>p.id==="animate"))==null?void 0:s.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((a=c.steps.find(p=>p.id==="vid-prompt"))==null?void 0:a.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=c.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((i=c.steps.find(p=>p.id==="vid-wait"))==null?void 0:i.status)||"waiting",progress:0}];for(let p=2;p<=e;p++)r.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),r.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),r.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});c.steps=r,ee(c)}}const o=ut.find(c=>c.id==="render");if(o&&e>1){const c=o.steps.find(p=>p.id==="download");c&&(c.label="ดาวน์โหลด 720p");const r=o.steps.find(p=>p.id==="upscale");r&&(r.label="Full Video"),ee(o)}Qt(),Kt()}function ee(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(a=>a.remove()),e.steps.forEach(a=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${a.id}`;let i="";a.progress!==void 0&&(i=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${i}
        `,t.appendChild(d)});const s=document.createElement("div");s.className="nf-mod-progress",s.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(s)}function Ft(e){e.replace(/^\[Netflow AI\]\s*/,"")}let St=null,vt=null;const dn=new Promise(e=>{vt=e,setTimeout(()=>e(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},e=>{!chrome.runtime.lastError&&(e!=null&&e.tabId)&&(St=e.tabId,console.log(`[Netflow AI] Tab ID: ${St}`)),vt&&(vt(St),vt=null)})}catch{vt&&(vt(null),vt=null)}function mt(){return St?`netflow_pending_action_${St}`:"netflow_pending_action"}function Ne(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Ft(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},A=e=>{console.warn(`[Netflow AI] ${e}`);try{Ft(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}};(()=>{const e=(o,s)=>{const a=o.tagName.toLowerCase(),d=o.id?`#${o.id}`:"",i=o.className&&typeof o.className=="string"?"."+o.className.trim().split(/\s+/).join("."):"",c=o.getBoundingClientRect(),r={};for(const l of o.attributes)["class","id","style"].includes(l.name)||(r[l.name]=l.value.length>80?l.value.slice(0,80)+"…":l.value);const p=(o.textContent||"").trim().slice(0,120),f=Array.from(o.querySelectorAll('i, [class*="icon"]')).map(l=>{var g;return(g=l.textContent)==null?void 0:g.trim()}).filter(Boolean).join(", "),h=[];let _=o.parentElement;for(let l=0;l<5&&_;l++){const g=_.tagName.toLowerCase(),C=_.id?`#${_.id}`:"",V=_.className&&typeof _.className=="string"?"."+_.className.trim().split(/\s+/).slice(0,2).join("."):"";h.push(`${g}${C}${V}`),_=_.parentElement}const z=s==="click"?`%c🖱️ CLICK %c<${a}${d}${i}>`:`%c👆 HOVER %c<${a}${d}${i}>`;console.groupCollapsed(z,s==="click"?"background:#e74c3c;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold":"background:#3498db;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold","color:#f39c12;font-weight:bold"),console.log("Element:",o),console.log("Selector:",`${a}${d}${i}`),console.log("Rect:",{x:Math.round(c.x),y:Math.round(c.y),w:Math.round(c.width),h:Math.round(c.height)}),Object.keys(r).length&&console.log("Attributes:",r),p&&console.log("Text:",p),f&&console.log("Icons:",f),h.length&&console.log("Ancestors:",h.join(" > ")),console.groupEnd()};document.addEventListener("click",o=>{const s=o.target;s!=null&&s.closest("#netflow-engine-overlay")||e(s,"click")},!0);let t=null;document.addEventListener("mouseover",o=>{const s=o.target;s!==t&&(s!=null&&s.closest("#netflow-engine-overlay")||(t=s,e(s,"hover")))},!0),console.log("%c[Netflow AI] 🔍 Debug Element Inspector ACTIVE — click/hover elements to inspect","background:#2ecc71;color:#000;padding:4px 8px;border-radius:4px;font-weight:bold")})();function ne(e=3e3){n(`🔒 จะปิดแท็บ automation ใน ${e/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},t=>{chrome.runtime.lastError?A(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${t==null?void 0:t.message}`)})}catch(t){A(`ปิดแท็บผิดพลาด: ${t.message}`)}},e)}async function oe(){try{if(await new Promise(a=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},d=>{if(chrome.runtime.lastError){a(!1);return}a(!!(d!=null&&d.cached))})}catch{a(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const a=document.querySelectorAll("video");for(const d of a){const i=d.src||d.currentSrc||"";if(i)return i}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const t=document.querySelectorAll("video");let o=null,s=0;for(const a of t){let d=a.src||"";if(!d){const r=a.querySelector("source");r&&(d=r.getAttribute("src")||"")}if(!d&&a.currentSrc&&(d=a.currentSrc),!d)continue;if(tt()){o||(o=d,s=1);continue}const i=a.getBoundingClientRect(),c=i.width*i.height;i.width>50&&c>s&&(s=c,o=d)}if(!o)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${o.substring(0,80)}... (area=${s.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const a=await fetch(o);if(!a.ok)return n(`[TikTok] fetch failed: HTTP ${a.status}`),await Le(o),o;const d=await a.blob(),i=(d.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${i} MB, type: ${d.type}`),d.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${d.size} bytes) — อาจเป็น thumbnail`);const c=await new Promise((r,p)=>{const f=new FileReader;f.onloadend=()=>r(f.result),f.onerror=()=>p(new Error("FileReader error")),f.readAsDataURL(d)});n(`[TikTok] Data URL พร้อม: ${(c.length/1024/1024).toFixed(1)} MB`),await new Promise(r=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:c},p=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),r()})})}catch(a){n(`[TikTok] Content script fetch error: ${a.message}`),await Le(o)}return o}catch(e){return n(`[TikTok] captureVideoUrl error: ${e.message}`),null}}async function Le(e){if(e.startsWith("https://"))try{await new Promise(t=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched via background: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),t()})})}catch{}}function ie(e){if(e){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:e,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const G=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),ae=/Win/i.test(navigator.userAgent),Fe=G?"🍎 Mac":ae?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${Fe}`),window.__VIDEO_COMPLETE_SENT__=!1;class re extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let zt=null,$t=null,ze=!1;const _t=new Map;let Ve=0;function pn(){if(zt)return zt;try{const e=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return zt=new Worker(URL.createObjectURL(e)),zt.onmessage=t=>{const o=_t.get(t.data);o&&(_t.delete(t.data),o())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),zt}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function un(){if($t)return $t;if(ze)return null;try{return $t=chrome.runtime.connect({name:"timer"}),$t.onMessage.addListener(e=>{const t=_t.get(e.id);t&&(_t.delete(e.id),t())}),$t.onDisconnect.addListener(()=>{$t=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),$t}catch{return ze=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const u=e=>new Promise((t,o)=>{if(window.__NETFLOW_STOP__)return o(new re);let s=!1;const a=()=>{if(!s){if(s=!0,window.__NETFLOW_STOP__)return o(new re);t()}};setTimeout(a,e);const d=pn();if(d){const r=++Ve;_t.set(r,a),d.postMessage({id:r,ms:e});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e+2e3},()=>{chrome.runtime.lastError||a()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e},()=>{chrome.runtime.lastError?setTimeout(a,e):a()});return}catch{}const i=un();if(i){const r=++Ve;_t.set(r,a),i.postMessage({cmd:"delay",id:r,ms:e});return}const c=setTimeout(a,e);u._lastId=c});function Et(){return!!window.__NETFLOW_STOP__}const tt=()=>document.hidden;let Ue=0;async function kt(){if(!document.hidden)return!1;const e=Date.now();if(e-Ue<15e3)return!1;Ue=e;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await u(1500),!0}catch{return!1}}async function wt(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(t=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>t()));const e=Date.now();for(;document.hidden&&Date.now()-e<5e3;)await u(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await u(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function qe(){var o;const e=["audio generation failed","couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","might violate","violate our policies","อาจละเมิด","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const s of t){if(s.closest("#netflow-engine-overlay"))continue;const a=(s.textContent||"").trim().toLowerCase();if(!(a.length>200||a.length<5)){for(const d of e)if(a.includes(d))return((o=s.textContent)==null?void 0:o.trim())||d}}return null}function fn(e){let t=e;const o=[/STRICT FACE & HEAD LOCK:[^.]*\./gi,/BODY LOCK:[^.]*\./gi,/HAIR LOCK:[^.]*\./gi,/FACE LOCK[^.]*\./gi,/PRODUCT IDENTITY LOCK:[^.]*\./gi,/LABEL LOCK:[^.]*\./gi,/PRODUCT EVERY FRAME:[^.]*\./gi,/TRANSITION STABILITY:[^.]*\./gi,/ANTI[_-]DUPLICATION:[^.]*\./gi,/ANTI[_-]TEXT[^.]*\./gi,/ANTI[_-]MORPH[^.]*\./gi,/ANTI[_-]DISTORTION[^.]*\./gi,/ANTI[_-]ADDITION[^.]*\./gi,/ANTI[_-]FLOATING[^.]*\./gi,/PROPS vs PRODUCT:[^.]*\./gi,/BRAND IDENTITY FREEZE[^.]*\./gi,/BRAND MORPHING[^.]*\./gi,/PRODUCT SIZE \(CRITICAL\):[^.]*\./gi,/PRODUCT SIZE REALISM:[^.]*\./gi,/VOICE DISCIPLINE:[^.]*\./gi,/ZERO INVENTION:[^.]*\./gi,/REALISM:[^.]*\./gi,/SCREEN CONTENT[^.]*\./gi,/SINGLE UTENSIL RULE[^.]*\./gi,/PRODUCT LOCK[^.]*\./gi,/FACE & HEAD LOCK[^.]*\./gi,/CLOTHING FIDELITY[^.]*\./gi,/FRONT[_-]FACING[^.]*\./gi];for(const i of o)t=t.replace(i,"");const s=["DO NOT","NEVER","FORBIDDEN","MUST NOT","ABSOLUTELY NO","IMMUTABLE","LOCKED","HIGHEST PRIORITY","#1 FORBIDDEN","Do NOT let","Do NOT add","Do NOT generate","Do NOT simplify","Do NOT invent","ZERO on-screen","NO split screen","NO collage","NO side-by-side","NO divided frames","never morph","never simplify","never change shape","never disappear","never be hidden","never exit","BRAND MORPHING IS","objects MUST NOT magically"];return t=t.split(/(?<=[.!])\s+/).filter(i=>!s.some(c=>i.includes(c))).join(" "),t=t.replace(/\s{2,}/g," ").trim(),t.length>1200&&(t=t.replace(/Render with extreme surface detail[^.]*\./gi,""),t=t.replace(/High-fidelity visual detail[^.]*\./gi,""),t=t.replace(/Product lit with soft rim light[^.]*\./gi,""),t=t.replace(/visible material texture[^.]*\./gi,""),t=t.replace(/Fluid motion, cinematic motion blur[^.]*\./gi,""),t=t.replace(/AI-observed appearance:[^.]*\./gi,""),t=t.replace(/Reference clothing:[^.]*\./gi,""),t=t.replace(/\s{2,}/g," ").trim()),n(`🛡️ Safe retry prompt: ${e.length} → ${t.length} chars (${Math.round((1-t.length/e.length)*100)}% reduction)`),t}async function et(e){if(tt()){e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),e.click();return}const t=e.getBoundingClientRect(),o=t.left+t.width/2,s=t.top+t.height/2,a={bubbles:!0,cancelable:!0,clientX:o,clientY:s,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",a)),await u(80),e.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",a)),e.dispatchEvent(new MouseEvent("click",a)),await u(50),e.click()}function Pt(e){const t=e.getBoundingClientRect(),o=t.left+t.width/2,s=t.top+t.height/2,a={bubbles:!0,cancelable:!0,clientX:o,clientY:s};e.dispatchEvent(new PointerEvent("pointerenter",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",a)),e.dispatchEvent(new PointerEvent("pointerover",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",a)),e.dispatchEvent(new PointerEvent("pointermove",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",a))}function gn(e){const t=[],o=document.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols'], [data-icon]");for(const s of o){if((s.textContent||"").trim()!==e)continue;let d=s,i=null,c=1/0;for(let r=0;r<20&&d&&(d=d.parentElement,!(!d||d===document.body));r++){if(tt()){r>=3&&d.children.length>0&&!i&&(i=d);continue}const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const f=p.width*p.height;f<c&&(i=d,c=f)}}i&&!t.includes(i)&&t.push(i)}return t.sort((s,a)=>{const d=s.getBoundingClientRect(),i=a.getBoundingClientRect();return d.left-i.left}),t}function se(e=!1){const t=[],o=document.querySelectorAll("video");for(const i of o){let c=i.parentElement;for(let r=0;r<10&&c;r++){if(tt()){if(r>=3&&c.children.length>0){t.push({el:c,left:0});break}c=c.parentElement;continue}const p=c.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){t.push({el:c,left:p.left});break}c=c.parentElement}}const s=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const i of s){const c=(i.textContent||"").trim();if(c==="play_arrow"||c==="play_circle"||c==="videocam"){let r=i.parentElement;for(let p=0;p<10&&r;p++){if(tt()){if(p>=3&&r.children.length>0){t.push({el:r,left:0});break}r=r.parentElement;continue}const f=r.getBoundingClientRect();if(f.width>120&&f.height>80&&f.width<window.innerWidth*.7&&f.top>=-50&&f.left<window.innerWidth*.75){t.push({el:r,left:f.left});break}r=r.parentElement}}}const a=document.querySelectorAll("img");for(const i of a){const c=(i.alt||"").toLowerCase();if(c.includes("video")||c.includes("วิดีโอ")){let r=i.parentElement;for(let p=0;p<10&&r;p++){if(tt()){if(p>=3&&r.children.length>0){t.push({el:r,left:0});break}r=r.parentElement;continue}const f=r.getBoundingClientRect();if(f.width>120&&f.height>80&&f.width<window.innerWidth*.7&&f.top>=-50&&f.left<window.innerWidth*.75){t.push({el:r,left:f.left});break}r=r.parentElement}}}const d=Array.from(new Set(t.map(i=>i.el))).map(i=>t.find(c=>c.el===i));if(d.sort((i,c)=>i.left-c.left),d.length>0){const i=d[0].el,c=i.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${c.left.toFixed(0)},${c.top.toFixed(0)}) ขนาด ${c.width.toFixed(0)}x${c.height.toFixed(0)}`),i}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function mn(){const e=gn("image");if(e.length>0){const o=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${o.left.toFixed(0)},${o.top.toFixed(0)}) ขนาด ${o.width.toFixed(0)}x${o.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const o of t){let s=o.parentElement;for(let a=0;a<10&&s;a++){if(tt()){if(a>=3&&s.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),s;s=s.parentElement;continue}const d=s.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),s;s=s.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function hn(e,t){var c;const[o,s]=e.split(","),a=((c=o.match(/:(.*?);/))==null?void 0:c[1])||"image/png",d=atob(s),i=new Uint8Array(d.length);for(let r=0;r<d.length;r++)i[r]=d.charCodeAt(r);return new File([i],t,{type:a})}async function bn(e,t=1024,o=.8){try{if(e.length<5e5)return n(`🗜️ รูปเล็กพอ (${(e.length/1024).toFixed(0)} KB base64) — ไม่บีบอัด`),e;n(`🗜️ รูปใหญ่ (${(e.length/1024).toFixed(0)} KB base64) — กำลังบีบอัด...`);const s=new Image;await new Promise((f,h)=>{s.onload=()=>f(),s.onerror=()=>h(new Error("Image load failed")),s.src=e});let{width:d,height:i}=s;if(d>t||i>t){const f=t/Math.max(d,i);d=Math.round(d*f),i=Math.round(i*f)}const c=document.createElement("canvas");c.width=d,c.height=i;const r=c.getContext("2d");if(!r)return e;r.drawImage(s,0,0,d,i);const p=c.toDataURL("image/jpeg",o);return n(`🗜️ บีบอัดแล้ว: ${(e.length/1024).toFixed(0)} KB → ${(p.length/1024).toFixed(0)} KB (${d}x${i})`),c.width=0,c.height=0,p}catch(s){return A(`🗜️ บีบอัดล้มเหลว: ${s.message} — ใช้รูปต้นฉบับ`),e}}function ht(e){var a;const t=[],o=new WeakSet,s=["i.google-symbols","i[class*='google-symbols']",".material-symbols-outlined",".material-icons",".material-symbols-rounded",".material-symbols-sharp","i[class*='material']","span[class*='material']","i[class*='icon']","span[class*='icon']","[data-icon]","[class*='gm-icon']","[class*='gmat-icon']","i"];for(const d of s){for(const i of document.querySelectorAll(d))if(((a=i.textContent)==null?void 0:a.trim())===e){const c=i.closest("button");c&&!o.has(c)&&(o.add(c),t.push(c))}if(t.length>0)break}if(t.length===0)for(const d of document.querySelectorAll("button")){const i=(d.getAttribute("aria-label")||"").toLowerCase();(i===e.toLowerCase()||i.includes(e.toLowerCase()))&&(o.has(d)||(o.add(d),t.push(d)))}return t}async function He(e=5e3){const t=Date.now();for(;Date.now()-t<e;){const o=document.querySelectorAll('input[type="file"]');if(o.length>0)return o[o.length-1];await u(300)}return null}function ce(){const e=["add","add_2","add_circle","add_circle_outline","attach_file","attach_file_add","attachment","note_add"];let t=[];for(const i of e)if(t=ht(i),t.length>0)break;if(t.length>0){let i=null,c=0;for(const r of t){const p=r.getBoundingClientRect();p.y>c&&(c=p.y,i=r)}if(i)return n(`พบปุ่ม "+" ของ Prompt Bar (icon) ที่ y=${c.toFixed(0)}`),i}n("ไม่พบปุ่มเพิ่มจากไอคอน — ลอง fallback ทั้งหมด");const o=["add","attach","upload","create","insert","plus","เพิ่ม","แนบ","อัปโหลด","สร้าง"];for(const i of document.querySelectorAll("button")){const c=(i.getAttribute("aria-label")||"").toLowerCase(),r=(i.getAttribute("title")||"").toLowerCase();if(o.some(p=>c.includes(p)||r.includes(p))){if(tt())return n('พบปุ่ม "+" (aria/title) hidden mode'),i;const p=i.getBoundingClientRect();if(p.bottom>window.innerHeight*.6&&p.width<80&&p.height<80)return n(`พบปุ่ม "+" (aria="${c}" title="${r}") ที่ y=${p.y.toFixed(0)}`),i}}const s=document.querySelectorAll("button");for(const i of s){const c=(i.textContent||"").trim();if(c!=="+"&&c!=="add"&&c!=="Add")continue;if(tt())return i;const r=i.getBoundingClientRect();if(r.bottom>window.innerHeight*.6&&r.width<80&&r.height<80)return n(`พบปุ่ม "+" (text="${c}") ที่ y=${r.y.toFixed(0)}`),i}const a=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');if(a){const i=a.getBoundingClientRect();let c=null,r=1/0;for(const p of s){const f=p.getBoundingClientRect();if(f.width<10||f.height<10||f.width>100||f.height>100||Math.abs(f.top-i.top)>80)continue;const h=Math.abs(f.left-i.left)+Math.abs(f.top-i.top);h<r&&(r=h,c=p)}if(c)return n(`พบปุ่ม "+" (ใกล้ prompt bar, dist=${r.toFixed(0)})`),c}for(const i of s){const c=i.querySelector("svg");if(!c)continue;const r=c.querySelectorAll("path, line, polygon"),p=Array.from(r).map(f=>f.getAttribute("d")||"").join(" ");if(p.includes("M12")||p.includes("M11")||p.includes("M10")){if(tt())return i;const f=i.getBoundingClientRect();if(f.bottom>window.innerHeight*.6&&f.width<80&&f.height<80)return n(`พบปุ่ม "+" (SVG) ที่ y=${f.y.toFixed(0)}`),i}}const d=[];for(const i of s){const c=i.getBoundingClientRect();if(c.bottom>window.innerHeight*.6&&c.width>0){const r=(i.textContent||"").trim().substring(0,30),p=i.getAttribute("aria-label")||"",f=(i.className||"").substring(0,40),h=i.querySelector("i, span[class*='icon'], svg")?"has-icon":"no-icon";d.push(`"${r}" aria="${p}" cls="${f}" ${h} y=${c.y.toFixed(0)}`)}}return A(`ไม่พบปุ่ม "+" — ปุ่มที่พบบริเวณล่าง (${d.length}): ${d.slice(0,5).join(" | ")}`),null}function le(){for(const s of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const a=ht(s);let d=null,i=0;for(const c of a){const r=c.getBoundingClientRect();r.y>i&&(i=r.y,d=c)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${s}" ที่ y=${i.toFixed(0)}`),d}const e=document.querySelectorAll("button");let t=null,o=0;for(const s of e){if(tt())break;const a=s.getBoundingClientRect();if(a.bottom>window.innerHeight*.7&&a.right>window.innerWidth*.5){const d=Math.abs(a.width-a.height)<10&&a.width<60,i=a.y+a.x+(d?1e3:0);i>o&&(o=i,t=s)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const s of e){const a=(s.getAttribute("aria-label")||"").toLowerCase();if(a.includes("generate")||a.includes("submit")||a.includes("send")||a.includes("สร้าง"))return s}return null}function de(){const e=document.querySelectorAll("textarea");for(const s of e)if(tt()||s.getBoundingClientRect().bottom>window.innerHeight*.5)return s;const t=document.querySelectorAll('[contenteditable="true"]');for(const s of t)if(tt()||s.getBoundingClientRect().bottom>window.innerHeight*.5)return s;const o=document.querySelectorAll("input[type='text'], input:not([type])");for(const s of o){const a=s.placeholder||"";if(a.includes("สร้าง")||a.includes("prompt")||a.includes("describe"))return s}return e.length>0?e[e.length-1]:null}async function Vt(e,t){var o,s,a,d;e.focus(),await u(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const i=new DataTransfer;i.setData("text/plain",t),i.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:i});e.dispatchEvent(c),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const r=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:i});e.dispatchEvent(r),await u(800);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(i){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await u(100);const i=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(i);const c=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(c),await u(800);const r=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(r.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${r.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(i){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await u(200);const i=new DataTransfer;i.setData("text/plain",t),i.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const c=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:i});e.dispatchEvent(c),await u(800);const r=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(r.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${r.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(i){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((o=navigator.clipboard)!=null&&o.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const c=document.createElement("textarea");c.value=t,c.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(c),c.focus(),c.select(),document.execCommand("copy"),document.body.removeChild(c),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await u(200),document.execCommand("paste"),await u(500);const i=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(i.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${i.length} ตัวอักษร)`);return}}catch(i){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const i=Object.keys(e).find(c=>c.startsWith("__reactFiber$")||c.startsWith("__reactInternalInstance$"));if(i){let c=e[i];for(let r=0;r<30&&c;r++){const p=c.memoizedProps,f=c.memoizedState;if((s=p==null?void 0:p.editor)!=null&&s.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const h=p.editor;h.selection,h.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(a=f==null?void 0:f.memoizedState)==null?void 0:a.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),f.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}c=c.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(i){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${i.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function At(){let e=0;const t=document.querySelectorAll("img");for(const s of t){if(s.closest("#netflow-engine-overlay")||!s.src)continue;if(tt()){e++;continue}const a=s.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&s.offsetParent!==null&&e++}const o=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const s of o){if(s.closest("#netflow-engine-overlay"))continue;if(tt()){e++;continue}const a=s.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&s.offsetParent!==null&&e++}return e}async function pe(e,t=5e3){var i;const o=Date.now(),s=["upload","upload_file","upload_2","cloud_upload","file_upload","image"],a=["upload image","อัปโหลดรูปภาพ","upload","อัปโหลด","upload file","add image","เพิ่มรูป","เพิ่มรูปภาพ"];for(;Date.now()-o<t;){const c=[],r=e.getAttribute("aria-controls");if(r){const f=document.getElementById(r);f&&c.push(f)}const p=e.getAttribute("aria-owns");if(p){const f=document.getElementById(p);f&&c.push(f)}for(const f of["[data-radix-portal]","[data-radix-popper-content-wrapper]",'[role="dialog"]','[role="menu"]','[role="listbox"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]","[data-radix-popover-content]",'[class*="popover"]','[class*="dropdown"]','[class*="menu-content"]','[class*="dialog"]'])for(const h of document.querySelectorAll(f))c.push(h);for(const f of c)for(const h of f.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[tabindex], a")){if(h===e)continue;const _=h.querySelector("i, span[class*='icon'], span[class*='material']"),z=((i=_==null?void 0:_.textContent)==null?void 0:i.trim().toLowerCase())||"";if(s.includes(z))return n(`พบปุ่ม Upload (icon="${z}")`),h;const T=(h.textContent||"").trim().toLowerCase(),x=Array.from(h.querySelectorAll("span, div, p")).map(g=>{var C;return((C=g.textContent)==null?void 0:C.trim().toLowerCase())||""});if(a.some(g=>T===g||x.some(C=>C===g)))return n(`พบปุ่ม Upload (text="${T.substring(0,40)}")`),h;const l=(h.getAttribute("aria-label")||"").toLowerCase();if(a.some(g=>l.includes(g)))return n(`พบปุ่ม Upload (aria="${l}")`),h}if(Date.now()-o>t/2)for(const f of document.querySelectorAll("button, [role='menuitem']")){if(f===e)continue;const h=(f.textContent||"").trim().toLowerCase(),_=f.getBoundingClientRect();if(!(_.width===0||_.height===0)&&a.some(z=>h===z||h.includes(z))&&h.length<50)return n(`พบปุ่ม Upload (global search, text="${h.substring(0,40)}")`),f}await u(500)}const d=[];for(const c of["[data-radix-portal]",'[role="dialog"]','[role="menu"]']){const r=document.querySelectorAll(c);if(r.length>0)for(const p of r){const f=p.querySelectorAll("button, [role='menuitem']");for(const h of f)d.push(`[${c}] "${(h.textContent||"").trim().substring(0,30)}"`)}}return A(`ไม่พบปุ่ม Upload — พบ elements ใน dialogs: ${d.slice(0,8).join(" | ")||"(ว่าง)"}`),null}async function Ge(e,t){n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const o=await bn(e),s=hn(o,t);n(`ขนาดไฟล์: ${(s.size/1024).toFixed(1)} KB`);const a=At();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const d=G?1.8:1;n("── ขั้น 1: คลิกปุ่ม '+' (Create) ──");let i=ce();if(i||(n("ไม่พบปุ่ม '+' — รอแล้วลองใหม่..."),await u(3e3*d),i=ce()),!i){n("ลองคลิกบน prompt bar area เพื่อ activate...");const r=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');r&&(r.click(),await u(2e3*d),i=ce())}if(!i)return A("ไม่พบปุ่ม '+' บน Prompt Bar — ลอง direct file input → drag-drop"),await ue(s,a)?!0:await fe(s,a);await et(i),n("คลิกปุ่ม '+' (Create) ✅"),await u(1500*d),n("── ขั้น 2: หาและคลิกปุ่ม 'Upload image' ──");let c=await pe(i,G?8e3:5e3);if(!c){A("ไม่พบปุ่ม 'Upload image' ครั้ง 1 — ลอง robustClick + pointer events บนปุ่ม '+'"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500);const r=i.getBoundingClientRect(),p=r.left+r.width/2,f=r.top+r.height/2,h={bubbles:!0,cancelable:!0,clientX:p,clientY:f,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",h)),await u(80),i.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",h)),i.dispatchEvent(new MouseEvent("click",h)),await u(2e3*d),c=await pe(i,G?5e3:3e3)}return c||(A("ไม่พบปุ่ม 'Upload image' ครั้ง 2 — ลอง robustHover + robustClick อีกครั้ง"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500),Pt(i),await u(300),await et(i),await u(2e3*d),c=await pe(i,G?5e3:3e3)),c?await wn(c,s,t,a):(A("❌ ไม่พบปุ่ม Upload image หลังลองทั้ง 3 วิธี — ลอง direct file input → drag-drop"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500),await ue(s,a)?!0:await fe(s,a))}async function wn(e,t,o,s){var p;n("── ขั้น 3: บล็อก file dialog + คลิก Upload + ฉีดไฟล์ ──");const a=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type==="file"){n("🚫 บล็อก file dialog จาก click()");return}return a.call(this)};try{e.click(),n("คลิกปุ่ม 'Upload image' ✅"),await u(G?1500:800)}finally{HTMLInputElement.prototype.click=a}let d=document.querySelector('input[type="file"]');if(d||(n("ไม่พบ file input ทันที — รอ..."),d=await He(G?5e3:3e3)),!d){n("ลอง robustClick บนปุ่ม Upload อีกครั้ง...");const f=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type!=="file")return f.call(this)};try{await et(e),await u(1500)}finally{HTMLInputElement.prototype.click=f}d=document.querySelector('input[type="file"]'),d||(d=await He(3e3))}if(!d)return A("ไม่พบ file input หลังคลิก Upload — ลอง direct file input → drag-drop"),await ue(t,s)?!0:await fe(t,s);const i=new DataTransfer;i.items.add(t),d.files=i.files,n(`ฉีดไฟล์ ${o} เข้า file input (${((p=d.files)==null?void 0:p.length)??0} ไฟล์)`);const c=d._valueTracker;c&&(c.setValue(""),n("รีเซ็ต React _valueTracker")),d.dispatchEvent(new Event("change",{bubbles:!0})),d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),n("ส่ง change + input event ✅"),n("── ขั้น 4: รอยืนยันรูปย่อ ──");const r=Date.now();for(;Date.now()-r<15e3;){const f=At();if(f>s)return n(`✅ ยืนยัน: รูปย่อเพิ่มจาก ${s} → ${f}`),!0;const h=document.querySelectorAll("span, div, p");for(const _ of h){const z=(_.textContent||"").trim();if(/^\d{1,2}%$/.test(z)){n(`กำลังอัพโหลด: ${z}`);break}}await u(1e3)}return A(`❌ อัพโหลด ${o} ล้มเหลว — ไม่พบรูปย่อใหม่หลัง 15 วินาที`),!1}async function ue(e,t){n("── Fallback: direct file input injection (ข้าม UI ปุ่มทั้งหมด) ──");let o=document.querySelector('input[type="file"]');if(!o){n("ไม่พบ file input — ลองคลิก prompt area เพื่อ trigger...");const i=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"], [contenteditable="true"]');i&&(await et(i),await u(1e3));const c=document.querySelectorAll("button");for(const r of c){const p=r.getBoundingClientRect();if(p.width<10||p.height<10||p.width>80||p.height>80||p.bottom<window.innerHeight*.5)continue;const f=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type==="file"){n("🚫 บล็อก file dialog (direct fallback)");return}return f.call(this)};try{r.click(),await u(800)}finally{HTMLInputElement.prototype.click=f}if(o=document.querySelector('input[type="file"]'),o){n(`พบ file input หลังคลิกปุ่ม "${(r.textContent||"").trim().substring(0,20)}"`);break}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300)}}if(!o)return n("ไม่พบ file input ใดๆ บนหน้า — fallback นี้ล้มเหลว"),!1;n(`พบ file input: accept="${o.accept||"*"}" name="${o.name||""}"`);const s=new DataTransfer;s.items.add(e),o.files=s.files;const a=o._valueTracker;a&&a.setValue(""),o.dispatchEvent(new Event("change",{bubbles:!0})),o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),n("ฉีดไฟล์ผ่าน direct file input ✅");const d=Date.now();for(;Date.now()-d<15e3;){if(At()>t)return n("✅ direct file input สำเร็จ — พบรูปย่อใหม่"),!0;await u(1e3)}return A("❌ direct file input — ไม่พบรูปย่อใหม่หลัง 15 วินาที"),!1}async function fe(e,t){n("── Fallback: drag-and-drop ลงบน workspace ──");const o=new DataTransfer;o.items.add(e);let s=null;const a=document.querySelectorAll('[class*="workspace"], [class*="drop"], [class*="media"], main, [role="main"]');for(const f of a){const h=f.getBoundingClientRect();if(h.width>200&&h.height>200){s=f;break}}s||(s=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)||document.body);const d=s.getBoundingClientRect(),i=d.left+d.width/2,c=d.top+d.height/2,r={bubbles:!0,cancelable:!0,clientX:i,clientY:c,dataTransfer:o};s.dispatchEvent(new DragEvent("dragenter",r)),await u(100),s.dispatchEvent(new DragEvent("dragover",r)),await u(100),s.dispatchEvent(new DragEvent("drop",r)),n(`ส่ง drag-drop ลง <${s.tagName}>`);const p=Date.now();for(;Date.now()-p<8e3;){if(At()>t)return n("✅ drag-drop สำเร็จ — พบรูปย่อใหม่"),!0;await u(1e3)}return A("❌ drag-drop ล้มเหลว — ไม่พบรูปย่อใหม่"),!1}async function xn(e,t){var z;n("=== ขั้น 0: ตั้งค่า Flow ===");let o=null;for(let T=0;T<10;T++){const x=document.querySelectorAll("button, div, span, [role='button']");for(const g of x){const C=(g.textContent||"").trim();if(!(C.length>80)&&(C.includes("Nano Banana")||C.includes("Imagen")||C.includes("วิดีโอ")||C.includes("รูปภาพ")||C.includes("Image")||C.includes("Video"))){const V=g.getBoundingClientRect();V.bottom>window.innerHeight*.7&&V.width>30&&V.height>10&&(!o||(g.textContent||"").length<(o.textContent||"").length)&&(o=g)}}if(o){n(`พบปุ่มตั้งค่าจากข้อความ: "${(o.textContent||"").substring(0,40).trim()}"`);break}const l=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons, .material-symbols-rounded, span[class*='material'], span[class*='icon'], i");for(const g of l){const C=((z=g.textContent)==null?void 0:z.trim())||"";if(C.includes("crop")||C==="aspect_ratio"||C==="photo_size_select_large"){const V=g.closest("button, div[role='button'], [role='button']")||g.parentElement;if(V){const N=V.getBoundingClientRect();if(N.bottom>window.innerHeight*.7&&N.width>0){o=V,n(`พบปุ่มตั้งค่าจากไอคอน: ${C}`);break}}}}if(o)break;for(const g of x){const C=(g.textContent||"").trim();if(!(C.length>40)&&/x[1-4]/.test(C)&&(C.includes("วิดีโอ")||C.includes("รูปภาพ")||C.includes("Video")||C.includes("Image"))){const V=g.getBoundingClientRect();if(V.bottom>window.innerHeight*.7&&V.width>30){o=g,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${C.substring(0,40)}"`);break}}}if(o)break;n(`⏳ รอปุ่มตั้งค่า... (${T+1}/10)`),await u(1e3)}if(!o)return A("ไม่พบปุ่มตั้งค่า (หมด 10 รอบ)"),!1;const s=o.getBoundingClientRect(),a=s.left+s.width/2,d=s.top+s.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:d,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",i)),await u(80),o.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",i)),o.dispatchEvent(new MouseEvent("click",i)),n("คลิกปุ่มตั้งค่าแล้ว"),await u(2500);let c=!1,r=null;const p=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const T of p){const x=T.getAttribute("aria-controls")||"",l=T.id||"";if(x.toUpperCase().includes("IMAGE")||l.toUpperCase().includes("IMAGE")){r=T,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${x})`);break}}if(!r)for(const T of document.querySelectorAll('[role="tab"]')){const x=T.id||"";if(x.toUpperCase().includes("TRIGGER-IMAGE")){r=T,n(`พบแท็บ Image ผ่าน id: ${x}`);break}}if(!r)for(const T of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const x=(T.textContent||"").trim();if(!(x.length>30)&&(x==="Image"||x.endsWith("Image")||x==="รูปภาพ"||x==="ภาพ"||x.includes("รูปภาพ"))&&!x.includes("Video")&&!x.includes("วิดีโอ")){const l=T.getBoundingClientRect();if(l.width>0&&l.height>0){r=T,n(`พบแท็บ Image ผ่านข้อความ: "${x}"`);break}}}if(r){const T=r.getAttribute("data-state")||"",x=r.getAttribute("aria-selected")||"";if(T==="active"||x==="true")c=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const l=r.getBoundingClientRect(),g={bubbles:!0,cancelable:!0,clientX:l.left+l.width/2,clientY:l.top+l.height/2,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",g)),await u(80),r.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",g)),r.dispatchEvent(new MouseEvent("click",g)),c=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await u(400)}}c||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const f=e==="horizontal"?"แนวนอน":"แนวตั้ง",h=e==="horizontal"?"landscape":"portrait";for(const T of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const x=(T.textContent||"").trim();if(!(x.length>30)&&(x===f||x.includes(f)||x.toLowerCase()===h||x.toLowerCase().includes(h))){const l=T.getBoundingClientRect(),g={bubbles:!0,cancelable:!0,clientX:l.left+l.width/2,clientY:l.top+l.height/2,button:0};T.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mousedown",g)),await u(80),T.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseup",g)),T.dispatchEvent(new MouseEvent("click",g)),n(`เลือกทิศทาง: ${f}`),await u(400);break}}const _=`x${t}`;for(const T of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const x=(T.textContent||"").trim();if(!(x.length>10)&&(x===_||x===`${t}`)){const l=T.getBoundingClientRect(),g={bubbles:!0,cancelable:!0,clientX:l.left+l.width/2,clientY:l.top+l.height/2,button:0};T.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mousedown",g)),await u(80),T.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseup",g)),T.dispatchEvent(new MouseEvent("click",g)),n(`เลือกจำนวน: ${_}`),await u(400);break}}return await u(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),o.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",i)),await u(80),o.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",i)),o.dispatchEvent(new MouseEvent("click",i)),n("ปิดหน้าตั้งค่าแล้ว"),await u(600),!0}async function yn(e){const t=e==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",o=e==="quality"?"Quality":"Fast",s=e==="quality"?"Fast":"Quality",a=e==="quality"?"คุณภาพ":"เร็ว",d=e==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${t} (${a}) ===`);let i=null;const c=Date.now()+1e4;for(;!i&&Date.now()<c;){const x=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const l of x){const g=(l.textContent||"").trim();if(!(g.length>80)&&(g.includes("Veo")||g.includes("veo"))&&(l.hasAttribute("aria-haspopup")||l.hasAttribute("aria-expanded")||l.getAttribute("role")==="combobox"||g.includes("arrow_drop_down")||l.querySelector("svg"))){i=l,n(`พบปุ่ม Veo dropdown (Strategy A): "${g.substring(0,50).trim()}"`);break}}if(!i)for(const l of x){const g=(l.textContent||"").trim();if(!(g.length>80)&&(g.includes("Veo")||g.includes("veo"))){const C=l.getBoundingClientRect();if(C.width>0&&C.height>0){i=l,n(`พบปุ่ม Veo dropdown (Strategy B): "${g.substring(0,50).trim()}"`);break}}}if(!i)for(const l of x){const g=(l.textContent||"").trim();if(!(g.length>50)&&(g.includes("Fast")||g.includes("Quality")||g.includes("เร็ว")||g.includes("คุณภาพ"))&&(l.hasAttribute("aria-haspopup")||l.hasAttribute("aria-expanded")||l.querySelector("svg"))){i=l,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${g.substring(0,50).trim()}"`);break}}if(!i){const l=document.querySelectorAll("div, span, button, [role='button']");for(const g of l){const C=(g.textContent||"").trim();if(C==="Veo 3.1 - Fast"||C==="Veo 3.1 - Quality"||C==="Fast"||C==="Quality"||C==="Veo 3.1 - เร็ว"||C==="Veo 3.1 - คุณภาพสูง"||C==="Veo 3.1 - คุณภาพ"||C==="Veo 2 - Fast"||C==="Veo 2 - Quality"){const V=g.getBoundingClientRect();if(V.width>0&&V.height>0){i=g,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${C}"`);break}}}}if(!i){const l=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const g of l){const C=(g.textContent||"").trim();if(!(C.length>60)&&(C.includes("3.1")||C.includes("model")||C.includes("โมเดล"))){const V=g.getBoundingClientRect();if(V.bottom>window.innerHeight*.4&&V.width>0&&V.height>0){i=g,n(`พบปุ่ม model selector (Strategy E): "${C.substring(0,50).trim()}"`);break}}}}i||await u(1e3)}if(!i)return A("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const r=(i.textContent||"").trim();if(r.includes(t)||r.includes(o)&&!r.includes(s)||r.includes(a)&&!r.includes(d))return n(`✅ Veo quality เป็น "${r}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=i.getBoundingClientRect(),f=p.left+p.width/2,h=p.top+p.height/2,_={bubbles:!0,cancelable:!0,clientX:f,clientY:h,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",_)),await u(80),i.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",_)),i.dispatchEvent(new MouseEvent("click",_)),n("คลิกเปิด Veo quality dropdown"),await u(1e3);let z=!1;const T=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const x of T){const l=(x.textContent||"").trim();if((l===t||l===o||l.includes(t)||l.includes(a))&&!l.includes("arrow_drop_down")){const C=x.getBoundingClientRect();if(C.width>0&&C.height>0){const V=C.left+C.width/2,N=C.top+C.height/2,O={bubbles:!0,cancelable:!0,clientX:V,clientY:N,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",O)),await u(80),x.dispatchEvent(new PointerEvent("pointerup",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",O)),x.dispatchEvent(new MouseEvent("click",O)),n(`✅ เลือก "${l}" สำเร็จ`),z=!0;break}}}return z?(await u(600),!0):(A(`ไม่พบตัวเลือก "${t}" หรือ "${a}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),document.body.click(),!1)}async function vn(e){var C,V,N,O;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,o=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),s=o?o[1]:"unknown",a=G?"macOS":ae?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",d=G?((V=(C=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:C[1])==null?void 0:V.replace(/_/g,"."))||"":ae&&((N=t.match(/Windows NT ([0-9.]+)/))==null?void 0:N[1])||"",i=navigator.language||"unknown",c=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${a} ${d} | Chrome ${s}`),n(`🌐 ภาษา: ${i} | หน้าจอ: ${c} | แพลตฟอร์ม: ${Fe}`),n("══════════════════════════════════════════");try{Ht(e.theme)}catch{}try{Xt(e.sceneCount||1)}catch(b){console.warn("Overlay show error:",b)}const r=[],p=[];if(e.needsNewProject){try{P("open-flow","done"),P("new-project","active"),n("=== สร้างโปรเจคใหม่ ===");let b=null;for(let S=0;S<15;S++){const B=document.querySelectorAll("button, [role='button']");for(const m of B){const y=(m.textContent||"").trim().toLowerCase();if(y.includes("new project")||y.includes("สร้างโปรเจค")||y.includes("โปรเจกต์ใหม่")){b=m;break}}if(!b){const m=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], i[class*='material'], span[class*='material'], span[class*='icon'], span[class*='google-symbols'], i");for(const y of m)if((y.textContent||"").trim()==="add_2"){const w=y.closest("button");if(w){b=w;break}}if(!b){const y=ht("add_2");y.length>0&&(b=y[0])}}if(b)break;n(`⏳ รอปุ่ม New Project... (${S+1}/15)`),await u(1e3)}if(b){n(`✅ พบปุ่ม New Project: "${(b.textContent||"").trim().substring(0,30)}"`),await et(b),await u(500),await et(b),await u(2e3);let S=!1;for(let B=0;B<20;B++){const m=document.body.innerText||"";if(m.includes("Start creating")||m.includes("เริ่มสร้าง")||m.includes("What do you want to create")||m.includes("drop media")||document.querySelector("textarea, input[placeholder]")){S=!0;break}await u(500)}n(S?"✅ Workspace พร้อมแล้ว":"⚠️ Workspace อาจยังไม่โหลดเสร็จ — ดำเนินการต่อ"),P("new-project","done"),r.push("✅ New Project")}else A("ไม่พบปุ่ม New Project — อาจอยู่ใน workspace แล้ว ดำเนินการต่อ"),P("new-project","skipped"),r.push("⚠️ New Project (skipped)")}catch(b){A(`New Project error: ${b.message}`),P("new-project","error"),r.push("⚠️ New Project")}await u(3e3)}else{try{P("open-flow","skipped")}catch{}try{P("new-project","skipped")}catch{}await u(3e3)}try{P("settings","active");const b=e.orientation||"vertical",S=e.outputCount||1,B=await xn(b,S);r.push(B?"✅ Settings":"⚠️ Settings"),P("settings",B?"done":"error")}catch(b){A(`ตั้งค่าผิดพลาด: ${b.message}`),r.push("⚠️ Settings"),P("settings","error")}try{const b=e.veoQuality||"fast";await yn(b)?(r.push(`✅ Veo ${b}`),n(`✅ Veo quality: ${b}`)):(r.push("⚠️ Veo quality"),A("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(b){A(`Veo quality error: ${b.message}`),r.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),document.body.click(),await u(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const f=()=>{const b=document.querySelectorAll("span, div, p, label");for(const S of b){const B=(S.textContent||"").trim();if(/^\d{1,3}%$/.test(B)){if(B==="100%")return null;const m=S.getBoundingClientRect();if(m.width>0&&m.height>0&&m.top>0&&m.top<window.innerHeight)return B}}return null},h=async b=>{n(`รอการอัพโหลด ${b} เสร็จ...`),await u(2e3);const S=Date.now(),B=6e4;let m="",y=Date.now();const w=15e3;for(;Date.now()-S<B;){const v=f();if(v){if(v!==m)m=v,y=Date.now(),n(`กำลังอัพโหลด: ${v} — รอ...`);else if(Date.now()-y>w){n(`✅ อัพโหลด ${b} — % ค้างที่ ${v} นาน ${w/1e3} วินาที ถือว่าเสร็จ`),await u(1e3);return}await u(1500)}else{n(`✅ อัพโหลด ${b} เสร็จ — ไม่พบตัวบอก %`),await u(1e3);return}}A(`⚠️ อัพโหลด ${b} หมดเวลาหลัง ${B/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){P("upload-char","active");try{const b=await Ge(e.characterImage,"character.png");r.push(b?"✅ ตัวละคร":"⚠️ ตัวละคร"),b||p.push("character upload failed"),P("upload-char",b?"done":"error")}catch(b){A(`อัพโหลดตัวละครผิดพลาด: ${b.message}`),r.push("❌ ตัวละคร"),p.push("character upload error"),P("upload-char","error")}await h("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500)}else It("upload-char");if(e.productImage){P("upload-prod","active");try{const b=await Ge(e.productImage,"product.png");r.push(b?"✅ สินค้า":"⚠️ สินค้า"),b||p.push("product upload failed"),P("upload-prod",b?"done":"error")}catch(b){A(`อัพโหลดสินค้าผิดพลาด: ${b.message}`),r.push("❌ สินค้า"),p.push("product upload error"),P("upload-prod","error")}await h("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500)}else It("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800);const _=f();_&&(n(`⚠️ อัพโหลดยังแสดง ${_} — รอเพิ่มเติม...`),await h("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await u(1e3);const z=(e.characterImage?1:0)+(e.productImage?1:0);if(z>0){let b=At();b<z&&(n(`⏳ เห็นรูปย่อแค่ ${b}/${z} — รอ 3 วินาที...`),await u(3e3),b=At()),b>=z?n(`✅ ยืนยันรูปย่ออ้างอิง: ${b}/${z}`):A(`⚠️ คาดว่าจะมี ${z} รูปย่อ แต่พบ ${b} — ดำเนินการต่อ`)}if(Et()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{Lt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),P("img-prompt","active"),await u(1e3);const T=de();T?(await Vt(T,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),r.push("✅ Prompt"),P("img-prompt","done")):(A("ไม่พบช่องป้อนข้อความ Prompt"),r.push("❌ Prompt"),p.push("prompt input not found"),P("img-prompt","error")),await u(800);const x=new Set;document.querySelectorAll("img").forEach(b=>{b.src&&x.add(b.src)}),n(`บันทึกรูปเดิม: ${x.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),P("img-generate","active"),await u(500);const l=le();if(l){const b=l.getBoundingClientRect(),S=b.left+b.width/2,B=b.top+b.height/2,m={bubbles:!0,cancelable:!0,clientX:S,clientY:B,button:0};l.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",m)),await u(80),l.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",m)),l.dispatchEvent(new MouseEvent("click",m)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),r.push("✅ Generate"),await u(500),l.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",m)),await u(80),l.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",m)),l.dispatchEvent(new MouseEvent("click",m)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),P("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),r.push("❌ Generate"),p.push("generate button not found"),P("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),P("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await u(15e3);const b=()=>{const w=document.querySelectorAll("div, span, p, label, strong, small");for(const v of w){if(v.closest("#netflow-engine-overlay"))continue;const R=(v.textContent||"").trim();if(R.length>10)continue;const $=R.match(/(\d{1,3})\s*%/);if(!$)continue;const E=parseInt($[1],10);if(E<1||E>100)continue;if(tt())return E;const k=v.getBoundingClientRect();if(!(k.width===0||k.width>150)&&!(k.top<0||k.top>window.innerHeight))return E}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let S=null,B=-1,m=0;const y=Date.now();for(;!S&&Date.now()-y<18e4;){const w=document.querySelectorAll("img");for(const v of w){if(x.has(v.src)||!(v.alt||"").toLowerCase().includes("generated"))continue;if(tt()?v.naturalWidth>120&&v.naturalHeight>120:(()=>{const E=v.getBoundingClientRect();return E.width>120&&E.height>120&&E.top>0&&E.top<window.innerHeight*.85})()){const E=v.closest("div");if(E){S=E,n(`พบรูป AI จาก alt="${v.alt}": ${v.src.substring(0,80)}...${tt()?" (hidden-mode)":""}`);break}}}if(!S)for(const v of w){if(x.has(v.src))continue;const R=v.closest("div"),$=(R==null?void 0:R.textContent)||"";if($.includes("product.png")||$.includes("character.png")||$.includes(".png")||$.includes(".jpg"))continue;if(tt()?v.naturalWidth>120&&v.naturalHeight>120:(()=>{const k=v.getBoundingClientRect();return k.width>120&&k.height>120&&k.top>0&&k.top<window.innerHeight*.85})()){const k=v.closest("div");if(k){S=k,n(`พบรูปใหม่ (สำรอง): ${v.src.substring(0,80)}...${tt()?" (hidden-mode)":""}`);break}}}if(!S){if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const v=m>0?Date.now()-m:1/0;if(B<20||v>3e4){const $=qe();if($){A(`❌ สร้างรูปล้มเหลว: ${$}`),p.push(`image gen failed: ${$}`),P("img-wait","error");break}}const R=b();if(R!==null)R!==B&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${R}%`),B=R,P("img-wait","active",R)),m=Date.now();else if(B>30){const $=Math.floor((Date.now()-m)/1e3);$>=3&&n(`🖼️ % หายที่ ${B}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&$>=5&&B>50&&(n("🍎 Tab ซ่อน + รูปน่าจะเสร็จ → เปิด tab เต็มเพื่อตรวจหารูป"),await wt(),await u(3e3))}document.hidden&&B>0&&Date.now()-m>1e4&&await kt(),document.hidden&&B<1&&Date.now()-y>3e4&&await kt(),await u(3e3)}}if(!S)A("หมดเวลารอรูปที่สร้าง"),r.push("⚠️ Wait Image"),P("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),r.push("✅ Image Found"),P("img-wait","done",100),await wt();const w=S.getBoundingClientRect(),v=w.left+w.width/2,R=w.top+w.height/2,$={bubbles:!0,cancelable:!0,clientX:v,clientY:R};S.dispatchEvent(new PointerEvent("pointerenter",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseenter",$)),S.dispatchEvent(new PointerEvent("pointerover",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseover",$)),S.dispatchEvent(new PointerEvent("pointermove",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousemove",$)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await u(1500);let E=null;for(const k of["more_vert","more_horiz","more"]){const q=ht(k);for(const I of q){const M=I.getBoundingClientRect();if(M.top>=w.top-20&&M.top<=w.bottom&&M.right>=w.right-150&&M.right<=w.right+20){E=I;break}}if(E)break}if(!E){const k=document.querySelectorAll("button");for(const q of k){const I=q.getBoundingClientRect();if(I.width<50&&I.height<50&&I.top>=w.top-10&&I.top<=w.top+60&&I.left>=w.right-80){const M=q.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const F of M)if((((O=F.textContent)==null?void 0:O.trim())||"").includes("more")){E=q;break}if(E)break;const L=q.getAttribute("aria-label")||"";if(L.includes("เพิ่มเติม")||L.includes("more")){E=q;break}}}}if(!E)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),r.push("⚠️ 3-dots");else{const k=E.getBoundingClientRect(),q=k.left+k.width/2,I=k.top+k.height/2,M={bubbles:!0,cancelable:!0,clientX:q,clientY:I,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",M)),await u(80),E.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",M)),E.dispatchEvent(new MouseEvent("click",M)),n("คลิกปุ่ม 3 จุดแล้ว"),await u(1500);let L=null;const F=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const H of F){const D=(H.textContent||"").trim();if(D.includes("ทำให้เป็นภาพเคลื่อนไหว")||D.includes("Animate")||D.includes("animate")){L=H;break}}if(!L)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),r.push("⚠️ Animate");else{const H=L.getBoundingClientRect(),D=H.left+H.width/2,K=H.top+H.height/2,W={bubbles:!0,cancelable:!0,clientX:D,clientY:K,button:0};L.dispatchEvent(new PointerEvent("pointerdown",{...W,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mousedown",W)),await u(80),L.dispatchEvent(new PointerEvent("pointerup",{...W,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mouseup",W)),L.dispatchEvent(new MouseEvent("click",W)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),r.push("✅ Animate"),P("animate","done"),await u(3e3)}}}}catch(b){A(`ขั้น 4 ผิดพลาด: ${b.message}`),r.push("⚠️ Animate")}if(Et()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{Lt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),P("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await u(3e3);let b=!1;const S=document.querySelectorAll("button, span, div");for(const w of S){const v=(w.textContent||"").trim(),R=w.getBoundingClientRect();if((v==="วิดีโอ"||v==="Video"||v.includes("วิดีโอ"))&&R.bottom>window.innerHeight*.7){b=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}b||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let B=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise(v=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>v())),B=!0;const w=Date.now();for(;document.hidden&&Date.now()-w<5e3;)await u(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await u(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await u(1e3);let m=!1;for(let w=1;w<=5&&!m;w++){if(w>1&&document.hidden){n(`🔄 Retry ${w}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(E=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>E())),B=!0;const $=Date.now();for(;document.hidden&&Date.now()-$<5e3;)await u(200);document.hidden||await u(2e3)}catch{}}const v=de();if(!v){n(`⚠️ ครั้งที่ ${w}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await u(3e3);continue}w>1&&(v.focus(),await u(500)),await Vt(v,e.videoPrompt),await u(500);const R=(v.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();R.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${w} (${R.length} ตัวอักษร)`),r.push("✅ Video Prompt"),P("vid-prompt","done"),m=!0):(n(`⚠️ ครั้งที่ ${w}: Prompt ไม่ถูกวาง (ได้ ${R.length} ตัวอักษร)`),await u(1500))}if(!m)throw A("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),r.push("❌ Video Prompt"),p.push("video prompt paste failed after 5 attempts"),P("vid-prompt","error"),new Error("Video prompt paste failed");await u(1e3),P("vid-generate","active");const y=le();if(y){const w=y.getBoundingClientRect(),v=w.left+w.width/2,R=w.top+w.height/2,$={bubbles:!0,cancelable:!0,clientX:v,clientY:R,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",$)),await u(80),y.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",$)),y.dispatchEvent(new MouseEvent("click",$)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),r.push("✅ Video Generate"),P("vid-generate","done"),await u(500),y.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",$)),await u(80),y.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",$)),y.dispatchEvent(new MouseEvent("click",$)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),r.push("❌ Video Generate"),p.push("video generate button not found"),P("vid-generate","error");if(B){await u(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(b){A(`ขั้น 5 ผิดพลาด: ${b.message}`),r.push("⚠️ Video Gen"),p.push(`video gen error: ${b.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),It("animate"),It("vid-prompt"),It("vid-generate"),It("vid-wait");if(e.videoPrompt){P("vid-wait","active");const b=e.sceneCount||1,S=e.videoScenePrompts||[e.videoPrompt];if(b>1)try{ln(b)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${b>1?`ต่อ ${b} ฉาก`:"ดาวน์โหลด"} ===`);const B=()=>{const w=document.querySelectorAll("div, span, p, label, strong, small");for(const v of w){if(v.closest("#netflow-engine-overlay"))continue;const R=(v.textContent||"").trim();if(R.length>10)continue;const $=R.match(/(\d{1,3})\s*%/);if(!$)continue;const E=parseInt($[1],10);if(E<1||E>100)continue;if(tt())return E;const k=v.getBoundingClientRect();if(!(k.width===0||k.width>150)&&!(k.top<0||k.top>window.innerHeight))return E}return null},m=async(w=6e5)=>{n("รอการสร้างวิดีโอ..."),P("vid-wait","active"),await u(5e3);const v=()=>{const Y=document.querySelectorAll("div, span, p, label, strong, small");let X=0;for(const ot of Y){if(ot.closest("#netflow-engine-overlay"))continue;const j=(ot.textContent||"").trim();if(j.includes("%")&&j.length<15){const at=ot.tagName.toLowerCase(),it=ot.className&&typeof ot.className=="string"?ot.className.split(/\s+/).slice(0,2).join(" "):"",Z=ot.getBoundingClientRect();if(n(`  🔍 "${j}" ใน <${at}.${it}> ที่ (${Z.left.toFixed(0)},${Z.top.toFixed(0)}) w=${Z.width.toFixed(0)}`),X++,X>=5)break}}X===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},R=async(Y,X)=>{n(`🔄 Policy Retry ${X}/2 — สร้าง Safe Prompt แล้วลองใหม่...`),await wt(),await u(2e3);const ot=de();if(!ot)return A("❌ Retry: ไม่พบช่อง Prompt"),!1;ot.focus(),await u(300);const j=window.getSelection();j&&j.selectAllChildren(ot),await u(200),ot.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"deleteContentBackward"})),ot.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"deleteContentBackward"})),await u(500);let at=fn(Y);X>=2&&(at=at.substring(0,600).replace(/\s\S*$/,"").trim(),n(`🛡️ 2nd retry: ultra-short prompt (${at.length} chars)`)),await Vt(ot,at),await u(500);const it=(ot.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(it.length<20)return A(`❌ Retry: วาง Safe Prompt ไม่สำเร็จ (${it.length} ตัวอักษร)`),!1;n(`✅ วาง Safe Prompt สำเร็จ (${it.length} ตัวอักษร)`),await u(500);const Z=le();if(!Z)return A("❌ Retry: ไม่พบปุ่ม Generate"),!1;const ft=Z.getBoundingClientRect(),xt=ft.left+ft.width/2,Ut=ft.top+ft.height/2,qt={bubbles:!0,cancelable:!0,clientX:xt,clientY:Ut,button:0};return Z.dispatchEvent(new PointerEvent("pointerdown",{...qt,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Z.dispatchEvent(new MouseEvent("mousedown",qt)),await u(80),Z.dispatchEvent(new PointerEvent("pointerup",{...qt,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Z.dispatchEvent(new MouseEvent("mouseup",qt)),Z.dispatchEvent(new MouseEvent("click",qt)),n(`✅ คลิก Generate สำหรับ Safe Retry ${X}`),await u(5e3),!0},$=se();n($?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),v();const E=Date.now();let k=-1,q=0,I=!1,M=0;const L=2;for(;Date.now()-E<w;){const Y=B();if(Y!==null){if(Y!==k&&(n(`ความคืบหน้าวิดีโอ: ${Y}%`),k=Y,P("vid-wait","active",Y)),q=Date.now(),Y>=100){n("✅ ตรวจพบ 100%!"),I=!0;break}}else if(k>30){const X=Math.floor((Date.now()-q)/1e3);if(X>=5){n(`✅ % หายไปที่ ${k}% (หาย ${X} วินาที) — วิดีโอเสร็จ!`),I=!0;break}n(`⏳ % หายที่ ${k}% — ยืนยันใน ${5-X} วินาที...`)}else{const X=Math.floor((Date.now()-E)/1e3);X%15<3&&n(`⏳ รอ... (${X} วินาที) ไม่พบ %`)}if(!I&&k>0&&se(!0)&&!$){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${k}% — วิดีโอเสร็จ!`),I=!0;break}if(Et())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(k<1){const X=qe();if(X){if(A(`❌ สร้างวิดีโอล้มเหลว: ${X}`),M<L&&e.videoPrompt)if(M++,n(`🔄 Policy violation detected — attempting safe retry ${M}/${L}...`),await R(e.videoPrompt,M)){k=-1,q=0,n(`✅ Safe retry ${M} started — continuing to monitor...`);continue}else A(`❌ Safe retry ${M} failed to start`);return null}}document.hidden&&k>0&&Date.now()-q>1e4&&await kt(),document.hidden&&k<1&&Date.now()-E>3e4&&await kt(),await u(3e3)}await wt();let F=null;for(let Y=1;Y<=10&&(F=se(),!F);Y++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${Y}/10)`),Y%3===0&&await wt(),await u(3e3);if(!F)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),P("vid-wait","error"),null;const H=F;I?(P("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await u(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const D=H.getBoundingClientRect();let K=D.left+D.width/2,W=D.top+D.height/2,Q=H;const ct=H.querySelector("video, img, canvas");if(ct){const Y=ct.getBoundingClientRect();Y.width>50&&Y.height>50&&(K=Y.left+Y.width/2,W=Y.top+Y.height/2,Q=ct,n(`🎯 พบรูปย่อ <${ct.tagName.toLowerCase()}> ในการ์ดที่ (${K.toFixed(0)},${W.toFixed(0)}) ${Y.width.toFixed(0)}x${Y.height.toFixed(0)}`))}else W=D.top+D.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${K.toFixed(0)},${W.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${K.toFixed(0)}, ${W.toFixed(0)})...`),Pt(Q);for(let Y=0;Y<8;Y++){const X={bubbles:!0,cancelable:!0,clientX:K+Y%2,clientY:W};Q.dispatchEvent(new PointerEvent("pointermove",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Q.dispatchEvent(new MouseEvent("mousemove",X)),await u(500)}try{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"mute_video",sceneCount:b,scenePrompts:S,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${b} ฉาก, ${S.length} prompts, theme: ${e.theme})`)}catch(Y){n(`⚠️ ไม่สามารถบันทึก pending action: ${Y.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await y(Q),n("✅ คลิกการ์ดวิดีโอเสร็จ"),H},y=async w=>{const v=w.getBoundingClientRect(),R=v.left+v.width/2,$=v.top+v.height/2,E={bubbles:!0,cancelable:!0,clientX:R,clientY:$,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",E)),await u(80),w.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",E)),w.dispatchEvent(new MouseEvent("click",E)),await u(50),w.click(),n("คลิกการ์ดวิดีโอแล้ว"),await u(2e3)};try{if(!await m())A("หมดเวลารอการสร้างวิดีโอ"),r.push("⚠️ Video Wait"),P("vid-wait","error");else{r.push("✅ Video Complete"),P("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await u(3e3);const v=await new Promise(R=>{chrome.storage.local.get(mt(),$=>{if(chrome.runtime.lastError){R(null);return}R(($==null?void 0:$[mt()])||null)})});v&&!v._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(mt()),v.action==="mute_video"?await We(v.sceneCount||1,v.scenePrompts||[],v.theme):v.action==="wait_scene_gen_and_download"&&await je(v.sceneCount||2,v.currentScene||2,v.theme,v.scenePrompts||[]))}}catch(w){A(`ขั้น 6 ผิดพลาด: ${w.message}`),r.push("⚠️ Step6"),p.push(`step 6: ${w.message}`)}}const g=p.length===0;try{Lt(g?5e3:8e3)}catch(b){console.warn("Overlay complete error:",b)}return{success:g,message:g?`สำเร็จ! ${r.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${r.join(" → ")} | ${p.join(", ")}`,step:g?"done":"partial"}}async function We(e,t=[],o){var V;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{o&&Ht(o)}catch{}try{Xt(e)}catch(N){n(`⚠️ showOverlay error: ${N.message}`)}try{const N=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const O of N)P(O,"done");e>=2&&P("scene2-prompt","active"),n(`✅ overlay restored: ${N.length} steps done, sceneCount=${e}`)}catch(N){n(`⚠️ overlay restore error: ${N.message}`)}await u(1500);const s=(()=>{for(const N of document.querySelectorAll("button")){const O=N.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const S of O){const B=(S.textContent||"").trim();if(B==="volume_up"||B==="volume_off"||B==="volume_mute"){const m=N.getBoundingClientRect();if(m.width>0&&m.height>0)return N}}const b=(N.getAttribute("aria-label")||"").toLowerCase();if(b.includes("mute")||b.includes("ปิดเสียง")){const S=N.getBoundingClientRect();if(S.width>0&&S.height>0)return N}}return null})();s?(s.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let a=null;if(e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await u(2e3);for(let I=2;I<=e;I++){const M=t[I-1];if(!M){A(`ไม่พบ prompt สำหรับฉากที่ ${I}`);continue}n(`── ฉากที่ ${I}/${e}: วาง prompt + generate ──`);let L=null;const F=Date.now();for(;!L&&Date.now()-F<1e4;){const j=document.querySelectorAll("[data-slate-editor='true']");if(j.length>0&&(L=j[j.length-1]),!L){const at=document.querySelectorAll("[role='textbox'][contenteditable='true']");at.length>0&&(L=at[at.length-1])}L||await u(1e3)}if(!L){A("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${L.tagName.toLowerCase()}> ${L.className.substring(0,40)}`),await Vt(L,M),n(`วาง prompt ฉาก ${I} (${M.length} ตัวอักษร) ✅`);try{P(`scene${I}-prompt`,"done"),P(`scene${I}-gen`,"active")}catch{}await u(1e3);const H=L.getBoundingClientRect();let D=null,K=1/0;for(const j of document.querySelectorAll("button")){if(j.disabled)continue;const at=j.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let it=!1;for(const xt of at){const Ut=(xt.textContent||"").trim();if(Ut==="arrow_forward"||Ut==="send"||Ut==="arrow_upward"){it=!0;break}}if(!it)continue;const Z=j.getBoundingClientRect();if(Z.width<=0||Z.height<=0)continue;const ft=Math.abs(Z.top-H.top)+Math.abs(Z.right-H.right);ft<K&&(K=ft,D=j)}if(!D)for(const j of["arrow_forward","send","arrow_upward"]){const at=ht(j);for(const it of at)if(!it.disabled){const Z=it.getBoundingClientRect();if(Z.width>0&&Z.height>0){D=it;break}}if(D)break}if(!D)for(const j of document.querySelectorAll("button")){const at=j.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const it of at)if((it.textContent||"").trim()==="arrow_forward"){const Z=j.getBoundingClientRect();if(Z.width>0&&Z.height>0){D=j;break}}if(D)break}if(!D){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(j=>{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:I,scenePrompts:t}},()=>j())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${I}/${e})`),await et(D),n(`คลิก Generate ฉาก ${I} ✅`);try{P(`scene${I}-gen`,"done"),P(`scene${I}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${I} gen เสร็จ ──`),await u(5e3);let W=0,Q=0;const ct=Date.now(),Y=6e5,X=5e3;let ot=!1;for(;Date.now()-ct<Y;){let j=null;const at=document.querySelectorAll("div, span, p, label, strong, small");for(const it of at){if(it.closest("#netflow-engine-overlay"))continue;const ft=(it.textContent||"").trim().match(/^(\d{1,3})%$/);if(ft){const xt=it.getBoundingClientRect();if(xt.width>0&&xt.height>0&&xt.width<120&&xt.height<60){j=parseInt(ft[1],10);break}}}if(j!==null){if(j!==W){n(`🎬 ฉาก ${I} ความคืบหน้า: ${j}%`),W=j;try{P(`scene${I}-wait`,"active",j)}catch{}}Q=0}else if(W>0){if(Q===0)Q=Date.now(),n(`🔍 ฉาก ${I}: % หายไป (จาก ${W}%) — กำลังยืนยัน...`);else if(Date.now()-Q>=X){n(`✅ ฉาก ${I}: % หายไป ${X/1e3} วินาที — เจนเสร็จ!`),ot=!0;break}}if(Et()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&W>0&&Q===0&&await kt(),await u(2e3)}ot||A(`ฉาก ${I} หมดเวลา`),n(`✅ ฉาก ${I} เสร็จแล้ว`);try{P(`scene${I}-wait`,"done",100)}catch{}chrome.storage.local.remove(mt()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await u(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{P("download","active")}catch{}let N=!1;if(await wt()&&document.hidden===!1&&(N=!0),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(I=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>I())),N=!0,await u(G?8e3:5e3)}catch{}}await u(G?3e3:2e3);const b=Date.now();let S=null;const B=Date.now();for(;!S&&Date.now()-B<(G?15e3:1e4);){const I=ht("download");for(const M of I){const L=M.getBoundingClientRect();if(L.width>0&&L.height>0){S=M;break}}if(!S)for(const M of document.querySelectorAll("button")){const L=M.querySelector("i, span[class*='icon'], span[class*='material']");if(L&&(L.textContent||"").trim()==="download"){const D=M.getBoundingClientRect();if(D.width>0&&D.height>0){S=M;break}}const F=(M.getAttribute("aria-label")||"").toLowerCase(),H=(M.getAttribute("title")||"").toLowerCase();if(F.includes("download")||F.includes("ดาวน์โหลด")||H.includes("download")||H.includes("ดาวน์โหลด")){const D=M.getBoundingClientRect();if(D.width>0&&D.height>0){S=M;break}}}S||await u(1e3)}if(!S){if(A("ไม่พบปุ่มดาวน์โหลด"),N)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await et(S),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await u(G?3e3:1500);const m=(I,M)=>new Promise(async L=>{const F=Date.now();for(;Date.now()-F<M;){const H="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const D of document.querySelectorAll(H)){const K=(D.textContent||"").trim();if(K.includes(I)&&K.length<100){const W=D.getBoundingClientRect();if(W.width>0&&W.height>0){L(D);return}}}await u(500)}L(null)}),y=(I,M)=>new Promise(async L=>{const F=Date.now();for(;Date.now()-F<I;){const H="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const D of document.querySelectorAll(H)){const K=(D.textContent||"").trim();if(K.includes("720p")&&K.length<50){const Q=D.getBoundingClientRect();if(Q.width>0&&Q.height>0){L(D);return}}const W=D.querySelectorAll("span");for(const Q of W)if((Q.textContent||"").trim()==="720p"){const ct=D.getBoundingClientRect();if(ct.width>0&&ct.height>0){L(D);return}}}M!=null&&M.isConnected&&Pt(M),await u(500)}L(null)});let w=null;for(let I=0;I<(G?5:3)&&!w;I++){I>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${I+1}...`),S.isConnected&&(await et(S),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await u(G?3e3:2e3)));const M=await m("Full Video",G?1e4:5e3);if(!M){A("ไม่พบ Full Video");continue}Pt(M),await u(G?1e3:500),await et(M),n("คลิก/hover Full Video ✅"),await u(G?3e3:2e3),w=await y(G?12e3:8e3,M)}if(!w){if(A("ไม่พบ 720p"),N)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await et(w),n("คลิก 720p ✅"),N){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const v=Date.now();let R=!1,$=!1;for(;Date.now()-v<3e5;){for(const I of document.querySelectorAll("div[data-title] div, div[data-content] div")){const M=(I.textContent||"").trim();if(M==="Download complete!"||M==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),R=!0;break}(M.includes("Downloading your extended video")||M.includes("กำลังดาวน์โหลด"))&&($||($=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(R)break;if($){let I=!1;for(const M of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((M.textContent||"").trim().includes("Downloading")){I=!0;break}if(!I){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),R=!0;break}}if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await u(2e3)}if(!R){A("เตรียมไฟล์หมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await u(5e3);let E=!1;const k=Date.now();for(;Date.now()-k<6e4&&!E;){try{await new Promise(I=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:b},M=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):M!=null&&M.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${M.message}`),E=!0,M.downloadUrl&&(a=M.downloadUrl,n(`[TikTok] จะใช้ download URL: ${M.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-k)/1e3)}s)`),I()})})}catch(I){A(`ตรวจสอบผิดพลาด: ${I.message}`)}E||await u(3e3)}E||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const q=await oe();a||(a=q);try{P("open","done"),Lt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),ie(a),ne(2e3);return}if(n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await wt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(N=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>N())),await u(G?8e3:5e3)}catch{}}await u(G?3e3:2e3);const d=(N,O="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const b of document.querySelectorAll(O)){const S=(b.textContent||"").trim();if(S.includes(N)&&S.length<100){const B=b.getBoundingClientRect();if(B.width>0&&B.height>0&&B.top>=0)return b}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let i=null;const c=Date.now();for(;!i&&Date.now()-c<(G?15e3:1e4);){const N=ht("download");for(const O of N){const b=O.getBoundingClientRect();if(b.width>0&&b.height>0){i=O;break}}if(!i)for(const O of document.querySelectorAll("button, [role='button']")){const b=(O.textContent||"").trim(),S=b.toLowerCase();if((S.includes("download")||S.includes("ดาวน์โหลด"))&&b.length<80){const B=O.getBoundingClientRect();if(B.width>0&&B.height>0){i=O;break}}}if(!i)for(const O of document.querySelectorAll("button")){const b=(O.getAttribute("aria-label")||"").toLowerCase(),S=(O.getAttribute("title")||"").toLowerCase();if(b.includes("download")||b.includes("ดาวน์")||S.includes("download")||S.includes("ดาวน์")){const B=O.getBoundingClientRect();if(B.width>0&&B.height>0){i=O;break}}}i||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await u(1e3))}if(!i){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(i.textContent||"").trim().substring(0,40)}"`),await et(i),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await u(G?3e3:1500);const r=Date.now();let p=null;const f=Date.now();for(;!p&&Date.now()-f<(G?1e4:5e3);)p=d("1080p"),p||(n("รอ 1080p..."),await u(500));if(!p){A("ไม่พบ 1080p");return}await et(p),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const h=Date.now();let _=!1,z=!1,T=0;const x=3e3;for(;Date.now()-h<3e5;){const O=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(O.includes("upscaling complete")||O.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),_=!0;break}for(const S of document.querySelectorAll("div, span, p")){const B=(S.textContent||"").trim().toLowerCase();if(B.length<60&&(B.includes("upscaling complete")||B.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(V=S.textContent)==null?void 0:V.trim()}")`),_=!0;break}}if(_)break;if(O.includes("upscaling your video")||O.includes("กำลังอัปสเกล")){z=!0,T=0;const S=Math.floor((Date.now()-h)/1e3);n(`⏳ กำลังอัปสเกล... (${S} วินาที)`)}else if(z){if(T===0)T=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-T>=x){n(`✅ ข้อความ Upscaling หายไป ${x/1e3} วินาที — เสร็จ!`),_=!0;break}}else{const S=Math.floor((Date.now()-h)/1e3);S%10<3&&n(`⏳ รอ Upscale... (${S} วินาที)`)}if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await u(2e3)}if(!_){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await u(5e3);let l=!1;const g=Date.now();for(;Date.now()-g<6e4&&!l;){try{await new Promise(N=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:r},O=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):O!=null&&O.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${O.message}`),l=!0,O.downloadUrl&&(a=O.downloadUrl,n(`[TikTok] จะใช้ download URL: ${O.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-g)/1e3)}s)`),N()})})}catch(N){A(`ตรวจสอบผิดพลาด: ${N.message}`)}l||await u(3e3)}l||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const C=await oe();a||(a=C),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),ie(a),ne(2e3)}async function je(e=2,t=2,o,s=[]){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{o&&Ht(o)}catch{}try{Xt(e)}catch(m){n(`⚠️ showOverlay error: ${m.message}`)}try{const m=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let y=2;y<=t;y++)m.push(`scene${y}-prompt`,`scene${y}-gen`),y<t&&m.push(`scene${y}-wait`);for(const y of m)P(y,"done");P(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${m.length} steps done (scene ${t}/${e} navigate)`)}catch(m){n(`⚠️ overlay restore error: ${m.message}`)}await u(2e3);const a=(()=>{for(const m of document.querySelectorAll("button")){const y=m.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const v of y){const R=(v.textContent||"").trim();if(R==="volume_up"||R==="volume_off"||R==="volume_mute"){const $=m.getBoundingClientRect();if($.width>0&&$.height>0)return m}}const w=(m.getAttribute("aria-label")||"").toLowerCase();if(w.includes("mute")||w.includes("ปิดเสียง")){const v=m.getBoundingClientRect();if(v.width>0&&v.height>0)return m}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);let d=0,i=0;const c=Date.now(),r=6e5,p=5e3;let f=!1,h=0;for(;Date.now()-c<r;){let m=null;const y=document.querySelectorAll("div, span, p, label, strong, small");for(const w of y){if(w.closest("#netflow-engine-overlay"))continue;const R=(w.textContent||"").trim().match(/^(\d{1,3})%$/);if(R){const $=w.getBoundingClientRect();if($.width>0&&$.height>0&&$.width<120&&$.height<60){m=parseInt(R[1],10);break}}}if(m!==null){if(h=0,m!==d){n(`🎬 scene ${t} ความคืบหน้า: ${m}%`),d=m;try{P(`scene${t}-wait`,"active",m)}catch{}}i=0}else if(d>0){if(i===0)i=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${d}%) — กำลังยืนยัน...`);else if(Date.now()-i>=p){n(`✅ scene ${t}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),f=!0;break}}else if(h++,h>=15){const w=document.querySelectorAll("video");let v=!1;for(const R of w)if(R.readyState>=2&&!R.paused&&R.getBoundingClientRect().width>200){v=!0;break}if(v){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),f=!0;break}if(h>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),f=!0;break}}document.hidden&&d>0&&i===0&&await kt(),await u(2e3)}f||n(`⚠️ scene ${t} หมดเวลา — ลองต่อไป`);try{P(`scene${t}-wait`,"done",100)}catch{}if(n(`✅ scene ${t} เสร็จ`),t<e&&s.length>0){n(`═══ ยังเหลืออีก ${e-t} ฉาก — ต่อฉากถัดไป ═══`),await u(2e3);for(let m=t+1;m<=e;m++){const y=s[m-1];if(!y){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${m} — ข้าม`);continue}n(`── ฉากที่ ${m}/${e}: วาง prompt + generate (pending recovery) ──`);let w=null;const v=Date.now();for(;!w&&Date.now()-v<1e4;){const F=document.querySelectorAll("[data-slate-editor='true']");if(F.length>0&&(w=F[F.length-1]),!w){const H=document.querySelectorAll("[role='textbox'][contenteditable='true']");H.length>0&&(w=H[H.length-1])}w||await u(1e3)}if(!w){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${m}`);break}await Vt(w,y),n(`วาง prompt ฉาก ${m} (${y.length} ตัวอักษร) ✅`);try{P(`scene${m}-prompt`,"done"),P(`scene${m}-gen`,"active")}catch{}await u(1e3);const R=w.getBoundingClientRect();let $=null,E=1/0;for(const F of document.querySelectorAll("button")){if(F.disabled)continue;const H=F.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let D=!1;for(const Q of H){const ct=(Q.textContent||"").trim();if(ct==="arrow_forward"||ct==="send"||ct==="arrow_upward"){D=!0;break}}if(!D)continue;const K=F.getBoundingClientRect();if(K.width<=0||K.height<=0)continue;const W=Math.abs(K.top-R.top)+Math.abs(K.right-R.right);W<E&&(E=W,$=F)}if(!$)for(const F of["arrow_forward","send","arrow_upward"]){const H=ht(F);for(const D of H)if(!D.disabled){const K=D.getBoundingClientRect();if(K.width>0&&K.height>0){$=D;break}}if($)break}if(!$)for(const F of document.querySelectorAll("button")){const H=F.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const D of H)if((D.textContent||"").trim()==="arrow_forward"){const K=F.getBoundingClientRect();if(K.width>0&&K.height>0){$=F;break}}if($)break}if(!$){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${m}`);break}await new Promise(F=>{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:m,scenePrompts:s}},()=>F())}),await et($),n(`คลิก Generate ฉาก ${m} ✅`);try{P(`scene${m}-gen`,"done"),P(`scene${m}-wait`,"active")}catch{}await u(5e3);let k=0,q=0;const I=Date.now();let M=!1,L=0;for(;Date.now()-I<6e5;){let F=null;const H=document.querySelectorAll("div, span, p, label, strong, small");for(const D of H){if(D.closest("#netflow-engine-overlay"))continue;const W=(D.textContent||"").trim().match(/^(\d{1,3})%$/);if(W){const Q=D.getBoundingClientRect();if(Q.width>0&&Q.height>0&&Q.width<120&&Q.height<60){F=parseInt(W[1],10);break}}}if(F!==null){if(L=0,F!==k){n(`🎬 ฉาก ${m} ความคืบหน้า: ${F}%`),k=F;try{P(`scene${m}-wait`,"active",F)}catch{}}q=0}else if(k>0){if(q===0)q=Date.now();else if(Date.now()-q>=5e3){n(`✅ ฉาก ${m}: เจนเสร็จ!`),M=!0;break}}else if(L++,L>=15){const D=document.querySelectorAll("video");let K=!1;for(const W of D)if(W.readyState>=2&&!W.paused&&W.getBoundingClientRect().width>200){K=!0;break}if(K){n(`✅ ฉาก ${m}: พบวิดีโอเล่นอยู่ — เสร็จ`),M=!0;break}if(L>=30){n(`✅ ฉาก ${m}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),M=!0;break}}document.hidden&&k>0&&q===0&&await kt(),await u(2e3)}M||n(`⚠️ ฉาก ${m} หมดเวลา`);try{P(`scene${m}-wait`,"done",100)}catch{}n(`✅ ฉาก ${m} เสร็จแล้ว`),chrome.storage.local.remove(mt()),await u(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await u(3e3);let _=null;try{P("download","active")}catch{}if(n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──"),await wt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(m=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>m())),await u(G?8e3:5e3)}catch{}}await u(G?3e3:2e3);const z=Date.now();let T=null;const x=Date.now();for(;!T&&Date.now()-x<(G?15e3:1e4);){const m=ht("download");for(const y of m){const w=y.getBoundingClientRect();if(w.width>0&&w.height>0){T=y;break}}if(!T)for(const y of document.querySelectorAll("button")){const w=y.querySelector("i, span[class*='icon'], span[class*='material']");if(w&&(w.textContent||"").trim()==="download"){const $=y.getBoundingClientRect();if($.width>0&&$.height>0){T=y;break}}const v=(y.getAttribute("aria-label")||"").toLowerCase(),R=(y.getAttribute("title")||"").toLowerCase();if(v.includes("download")||v.includes("ดาวน์โหลด")||R.includes("download")||R.includes("ดาวน์โหลด")){const $=y.getBoundingClientRect();if($.width>0&&$.height>0){T=y;break}}}T||await u(1e3)}if(!T){A("ไม่พบปุ่มดาวน์โหลด");return}await et(T),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await u(G?3e3:1500);const l=(m,y)=>new Promise(async w=>{const v=Date.now();for(;Date.now()-v<y;){const R="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const $ of document.querySelectorAll(R)){const E=($.textContent||"").trim();if(E.includes(m)&&E.length<100){const k=$.getBoundingClientRect();if(k.width>0&&k.height>0){w($);return}}}await u(500)}w(null)}),g=(m,y)=>new Promise(async w=>{const v=Date.now();for(;Date.now()-v<m;){const R="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const $ of document.querySelectorAll(R)){const E=($.textContent||"").trim();if(E.includes("720p")&&E.length<50){const q=$.getBoundingClientRect();if(q.width>0&&q.height>0){w($);return}}const k=$.querySelectorAll("span");for(const q of k)if((q.textContent||"").trim()==="720p"){const I=$.getBoundingClientRect();if(I.width>0&&I.height>0){w($);return}}}y!=null&&y.isConnected&&Pt(y),await u(500)}w(null)});let C=null;for(let m=0;m<(G?5:3)&&!C;m++){m>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${m+1}...`),T.isConnected&&(await et(T),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await u(G?3e3:2e3)));const y=await l("Full Video",G?1e4:5e3);if(!y){A("ไม่พบ Full Video");continue}Pt(y),await u(G?1e3:500),await et(y),n("คลิก/hover Full Video ✅"),await u(G?3e3:2e3),C=await g(G?12e3:8e3,y)}if(!C){A("ไม่พบ 720p");return}await et(C),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const V=Date.now();let N=!1,O=!1;for(;Date.now()-V<3e5;){for(const m of document.querySelectorAll("div[data-title] div, div[data-content] div")){const y=(m.textContent||"").trim();if(y==="Download complete!"||y==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),N=!0;break}(y.includes("Downloading your extended video")||y.includes("กำลังดาวน์โหลด"))&&(O||(O=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(N)break;if(O){let m=!1;for(const y of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((y.textContent||"").trim().includes("Downloading")){m=!0;break}if(!m){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),N=!0;break}}await u(2e3)}if(!N){A("เตรียมไฟล์หมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await u(5e3);let b=!1;const S=Date.now();for(;Date.now()-S<6e4&&!b;){try{await new Promise(m=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:z},y=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):y!=null&&y.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${y.message}`),b=!0,y.downloadUrl&&(_=y.downloadUrl,n(`[TikTok] จะใช้ download URL: ${y.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-S)/1e3)}s)`),m()})})}catch(m){A(`ตรวจสอบผิดพลาด: ${m.message}`)}b||await u(3e3)}b||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const B=await oe();_||(_=B);try{P("open","done"),Lt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),ie(_),ne(2e3)}async function $n(){try{await dn;const e=mt();let t=await new Promise(i=>{chrome.storage.local.get(e,c=>{if(chrome.runtime.lastError){i(null);return}i((c==null?void 0:c[e])||null)})});if(!t&&St){const i="netflow_pending_action";t=await new Promise(c=>{chrome.storage.local.get(i,r=>{if(chrome.runtime.lastError){c(null);return}c((r==null?void 0:r[i])||null)})}),t&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(i))}if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const s=Date.now()-t.timestamp;if(s>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(e);return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=a,await new Promise(i=>{chrome.storage.local.set({[e]:t},()=>i())}),await u(300),!await new Promise(i=>{chrome.storage.local.get(e,c=>{const r=c==null?void 0:c[e];i((r==null?void 0:r._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(e),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(s/1e3)} วินาที)`),t.action==="mute_video"?await We(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await je(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,o)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),o({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),vn(e).then(s=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${s.message}`),Ne()}).catch(s=>{if(s instanceof re||(s==null?void 0:s.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Ft("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Oe()}catch{}}else console.error("[Netflow AI] Generate error:",s);Ne()}),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,o({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return o({status:"ready"}),!1;if((e==null?void 0:e.type)==="CAPTURE_PAGE_VIDEO")return(async()=>{try{const s=document.querySelectorAll("video");let a="",d=0;for(const p of s){const f=p.src||p.currentSrc||"";if(!f)continue;const h=p.getBoundingClientRect(),_=h.width*h.height;(_>d||!a&&f)&&(d=_,a=f)}if(!a){o({success:!1,error:"No video found"});return}const i=await fetch(a);if(!i.ok){o({success:!1,error:"HTTP "+i.status});return}const c=await i.blob();if(c.size<1e4){o({success:!1,error:"Video too small: "+c.size});return}const r=await new Promise((p,f)=>{const h=new FileReader;h.onloadend=()=>p(h.result),h.onerror=()=>f(new Error("FileReader error")),h.readAsDataURL(c)});o({success:!0,data:r,size:c.size})}catch(s){o({success:!1,error:s.message})}})(),!0;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return o({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await u(500);const s=mn();if(!s){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const a=s.getBoundingClientRect(),d=a.left+a.width/2,i=a.top+a.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${i.toFixed(0)}) ${a.width.toFixed(0)}x${a.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let c=0;c<2;c++){const r=document.elementFromPoint(d,i);r?(await et(r),n(`คลิก ${c+1}/2 บน <${r.tagName.toLowerCase()}>`)):(await et(s),n(`คลิก ${c+1}/2 บนการ์ด (สำรอง)`)),await u(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),(async()=>{try{const e=await new Promise(t=>{chrome.storage.local.get("netflow_preshow_overlay",o=>{if(chrome.runtime.lastError){t(null);return}t((o==null?void 0:o.netflow_preshow_overlay)||null)})});if(e&&e.timestamp&&Date.now()-e.timestamp<3e4){n("⚡ Pre-show overlay — แสดง overlay ทันที");try{Ht(e.theme)}catch{}try{Xt(e.sceneCount||1)}catch(t){n(`⚠️ pre-show overlay error: ${t.message}`)}chrome.storage.local.remove("netflow_preshow_overlay")}}catch{}})(),$n()})();
