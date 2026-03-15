(function(){"use strict";const wt={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let st=wt.blue,At=null;function Ht(e){e&&wt[e]&&(At=e,st=wt[e],de(),et&&(et.remove(),et=null),Yt(),requestAnimationFrame(()=>Pe()))}function He(){if(At&&wt[At])return wt[At];try{const e=localStorage.getItem("netflow_app_theme");if(e&&wt[e])return wt[e]}catch{}return wt.blue}let ct=43,dt=125,pt=233;function de(){const e=st.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(ct=parseInt(e[1],16),dt=parseInt(e[2],16),pt=parseInt(e[3],16))}const pe='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',fe='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let q=null,rt=null,et=null,ue=0,Wt=null,Pt=null,jt=null,te=0,yt=!1,gt=null,Mt=null,Rt=null,Ct=1,nt=[];function Kt(e){const t=[{stepId:"open-flow",label:"เปิด Google Flow",status:"waiting"},{stepId:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let o=2;o<=e;o++)t.push({stepId:`scene${o}-prompt`,label:`ฉาก ${o} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${o}-gen`,label:`ฉาก ${o} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${o}-wait`,label:`ฉาก ${o} — กำลังสร้าง`,status:"waiting",progress:0});t.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return t}const ft=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"open-flow",label:"เปิด Google Flow",status:"waiting"},{id:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];nt=Kt(1);function We(e){const t=e.rgb,o=e.accentRgb,s=e.doneRgb,a=e.hex,p=e.accentHex,i=e.doneHex,l=(()=>{const I=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!I)return"#4ade80";const c=$=>Math.min(255,$+80);return`#${[1,2,3].map($=>c(parseInt(I[$],16)).toString(16).padStart(2,"0")).join("")}`})(),r=(()=>{const I=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!I)return"#4ade80";const c=$=>Math.min(255,$+60);return`#${[1,2,3].map($=>c(parseInt(I[$],16)).toString(16).padStart(2,"0")).join("")}`})(),d=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),h=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,g=d?parseInt(d[1],16)/h:0,v=d?parseInt(d[2],16)/h:1,D=d?parseInt(d[3],16)/h:.25,L=I=>`${Math.round(g*I)}, ${Math.round(v*I)}, ${Math.round(D*I)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${L(18)},0.94) 0%, rgba(${L(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: rgba(${L(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${L(180)},0.05),
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
            0 0 200px rgba(${L(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${L(180)},0.08),
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
    color: ${l};
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
    color: ${l};
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
    background: linear-gradient(180deg, rgba(${L(5)},0.95) 0%, rgba(${L(12)},0.98) 100%);
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
    background: linear-gradient(180deg, rgba(${L(6)},0.75) 0%, rgba(${L(3)},0.92) 100%);
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
    background: rgba(${L(8)}, 0.88);
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
    background: linear-gradient(90deg, ${a}, ${l});
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
    background: linear-gradient(90deg, ${a}, ${p});
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
    background: rgba(${L(8)},0.8);
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
    background: rgba(${L(8)}, 0.9);
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
    color: ${l};
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

    `}function Yt(){et||(et=document.createElement("style"),et.id="netflow-overlay-styles",et.textContent=We(st),document.head.appendChild(et))}function ge(e){e.innerHTML="",nt.forEach((t,o)=>{const s=document.createElement("div");s.className="nf-proc-row nf-proc-waiting",s.id=`nf-proc-${t.stepId}`,s.innerHTML=`
            <span class="nf-proc-num">${o+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(s)})}function me(){const e=document.getElementById("nf-terminal");if(!e)return;ge(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${nt.length}`)}function he(e,t){let l="";for(let v=0;v<20;v++){const D=v/20*Math.PI*2,L=(v+.2)/20*Math.PI*2,I=(v+.5)/20*Math.PI*2,c=(v+.8)/20*Math.PI*2,$=(v+1)/20*Math.PI*2;l+=`${v===0?"M":"L"}${(120+100*Math.cos(D)).toFixed(1)},${(120+100*Math.sin(D)).toFixed(1)} `,l+=`L${(120+100*Math.cos(L)).toFixed(1)},${(120+100*Math.sin(L)).toFixed(1)} `,l+=`L${(120+112*Math.cos(I)).toFixed(1)},${(120+112*Math.sin(I)).toFixed(1)} `,l+=`L${(120+100*Math.cos(c)).toFixed(1)},${(120+100*Math.sin(c)).toFixed(1)} `,l+=`L${(120+100*Math.cos($)).toFixed(1)},${(120+100*Math.sin($)).toFixed(1)} `}l+="Z";const r=14,d=72,h=62;let g="";for(let v=0;v<r;v++){const D=v/r*Math.PI*2,L=(v+.25)/r*Math.PI*2,I=(v+.75)/r*Math.PI*2,c=(v+1)/r*Math.PI*2;g+=`${v===0?"M":"L"}${(120+h*Math.cos(D)).toFixed(1)},${(120+h*Math.sin(D)).toFixed(1)} `,g+=`L${(120+d*Math.cos(L)).toFixed(1)},${(120+d*Math.sin(L)).toFixed(1)} `,g+=`L${(120+d*Math.cos(I)).toFixed(1)},${(120+d*Math.sin(I)).toFixed(1)} `,g+=`L${(120+h*Math.cos(c)).toFixed(1)},${(120+h*Math.sin(c)).toFixed(1)} `}return g+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${g}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${h}" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${e},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${e},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function je(){const e=document.createElement("div");e.id="netflow-engine-overlay",gt=document.createElement("canvas"),gt.id="nf-matrix-canvas",e.appendChild(gt);const t=document.createElement("div");t.className="nf-pat-plasma",e.appendChild(t);for(let C=1;C<=5;C++){const _=document.createElement("div");_.className=`nf-ambient-orb nf-orb-${C}`,e.appendChild(_)}const o=document.createElement("div");o.className="nf-pat-data",e.appendChild(o);const s=document.createElement("div");s.className="nf-pat-diag-a",e.appendChild(s);const a=document.createElement("div");a.className="nf-pat-diag-b",e.appendChild(a);const p=document.createElement("div");p.className="nf-pat-circuit",e.appendChild(p);const i=document.createElement("div");i.className="nf-pat-honeycomb",e.appendChild(i);const l=document.createElement("div");l.className="nf-pat-binary",e.appendChild(l);const r=document.createElement("div");r.className="nf-pat-crosshatch",e.appendChild(r);const d=document.createElement("div");d.className="nf-pat-diamond",e.appendChild(d);const h=document.createElement("div");h.className="nf-pat-wave-h",e.appendChild(h);const g=document.createElement("div");g.className="nf-pat-radar",e.appendChild(g);const v=document.createElement("div");v.className="nf-pat-ripple-1",e.appendChild(v);const D=document.createElement("div");D.className="nf-pat-ripple-2",e.appendChild(D);const L=document.createElement("div");L.className="nf-pat-techscan",e.appendChild(L);const I=document.createElement("div");I.className="nf-center-glow",e.appendChild(I);const c=document.createElement("div");c.className="nf-pat-noise",e.appendChild(c);const $=document.createElement("div");$.className="nf-crt-scanlines",e.appendChild($);const O=document.createElement("div");O.className="nf-vignette",e.appendChild(O);for(let C=0;C<3;C++){const _=document.createElement("div");_.className="nf-pulse-ring",e.appendChild(_)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(C=>{const _=document.createElement("div");_.className=`nf-corner-deco ${C}`,e.appendChild(_)});const P=document.createElement("button");P.className="nf-stop-btn",P.innerHTML='<span class="nf-stop-icon"></span> หยุด',P.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",P.onclick=()=>{var C;window.__NETFLOW_STOP__=!0;try{Nt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((C=chrome.runtime)!=null&&C.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},e.appendChild(P);const T=document.createElement("div");T.className="nf-layout";const x=document.createElement("div");x.className="nf-core-monitor",x.id="nf-core-monitor";const f=document.createElement("div");f.className="nf-core-header",f.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${nt.length}</div>
    `,x.appendChild(f);const b=document.createElement("div");b.className="nf-terminal",b.id="nf-terminal",ge(b),x.appendChild(b);const A=document.createElement("div");A.className="nf-engine-core",A.id="nf-engine-core";const m=document.createElement("div");m.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(C=>{const _=document.createElement("div");_.className=`nf-frame-corner ${C}`,m.appendChild(_)}),A.appendChild(m);const y="http://www.w3.org/2000/svg",w=document.createElementNS(y,"svg");w.setAttribute("class","nf-engine-waves"),w.setAttribute("viewBox","0 0 560 140"),w.setAttribute("preserveAspectRatio","none"),w.id="nf-engine-waves";for(let C=0;C<4;C++){const _=document.createElementNS(y,"path");_.setAttribute("fill","none"),_.setAttribute("stroke-width",C<2?"1.5":"1"),_.setAttribute("stroke",C<2?`rgba(${st.rgb},${.14+C*.1})`:`rgba(${st.accentRgb},${.1+(C-2)*.08})`),_.setAttribute("data-wave-idx",String(C)),w.appendChild(_)}A.appendChild(w);const E=document.createElement("div");E.className="nf-engine-brand-inner",E.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${he(st.rgb,st.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${he(st.rgb,st.accentRgb)}
        </div>
    `,A.appendChild(E);const N=document.createElement("div");N.className="nf-engine-stats",N.id="nf-engine-stats",N.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([C,_,U])=>`<div class="nf-stat-item"><span class="nf-stat-label">${C}</span><span class="nf-stat-val" id="${_}">${U}</span></div>`).join(""),A.appendChild(N),x.appendChild(A),T.appendChild(x);const k=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ft.forEach((C,_)=>{const U=Ke(C);U.classList.add(k[_]),U.id=`nf-mod-${C.id}`,T.appendChild(U)}),e.appendChild(T);for(let C=0;C<30;C++){const _=document.createElement("div");_.className="nf-particle",_.style.left=`${5+Math.random()*90}%`,_.style.bottom=`${Math.random()*40}%`,_.style.animationDuration=`${3+Math.random()*5}s`,_.style.animationDelay=`${Math.random()*4}s`;const U=.3+Math.random()*.4,S=.7+Math.random()*.3;_.style.background=`rgba(${Math.floor(ct*S)}, ${Math.floor(dt*S)}, ${Math.floor(pt*S)}, ${U})`,_.style.width=`${1+Math.random()*2}px`,_.style.height=_.style.width,e.appendChild(_)}return e}function Ke(e){const t=document.createElement("div");t.className="nf-module";const o=document.createElement("div");o.className="nf-mod-header",o.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(o),e.steps.forEach(a=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${a.id}`;let i="";a.progress!==void 0&&(i=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${i}
        `,t.appendChild(p)});const s=document.createElement("div");return s.className="nf-mod-progress",s.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(s),t}function Ye(){ue=Date.now(),Wt=setInterval(()=>{const e=Math.floor((Date.now()-ue)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),o=String(e%60).padStart(2,"0"),s=document.getElementById("nf-timer");s&&(s.textContent=`${t}:${o}`);const a=document.getElementById("nf-stat-elapsed");a&&(a.textContent=`${t}:${o}`)},1e3)}function be(){Wt&&(clearInterval(Wt),Wt=null)}const Xe=120,we=160,xe=.4;let Tt=null,ye=0,ve=0,$e=0,Bt=[];function Qe(e,t){Bt=[];for(let o=0;o<Xe;o++){const s=Math.random();let a;s<.22?a=0:s<.4?a=1:s<.55?a=2:s<.68?a=3:s<.84?a=4:a=5;const p=Math.random()*e,i=Math.random()*t,l=50+Math.random()*220,r=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Bt.push({x:a===0?Math.random()*e:p+Math.cos(r)*l,y:a===0?Math.random()*t:i+Math.sin(r)*l,vx:(Math.random()-.5)*xe,vy:(Math.random()-.5)*xe,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:a,oCx:p,oCy:i,oRadius:l,oAngle:r,oSpeed:d})}}function Ze(){if(!gt)return;const e=gt;if(Mt=e.getContext("2d"),!Mt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,Bt.length===0&&Qe(e.width,e.height)};t(),window.addEventListener("resize",t);let o=null,s=0,a=0,p=!1;function i(){if(!Mt||!gt){Rt=null;return}if(Rt=requestAnimationFrame(i),p=!p,p)return;const l=Mt,r=gt.width,d=gt.height;l.fillStyle=`rgba(${ct*.04|0},${dt*.04|0},${pt*.06|0},1)`,l.fillRect(0,0,r,d),(!o||s!==r||a!==d)&&(s=r,a=d,o=l.createRadialGradient(r*.5,d*.5,0,r*.5,d*.5,Math.max(r,d)*.6),o.addColorStop(0,`rgba(${ct*.08|0},${dt*.08|0},${pt*.1|0},0.4)`),o.addColorStop(1,"rgba(0,0,0,0)")),l.fillStyle=o,l.fillRect(0,0,r,d);const h=Bt,g=h.length,v=we*we;for(let I=0;I<g;I++){const c=h[I];if(c.pulsePhase+=c.pulseSpeed,c.motion===0)c.x+=c.vx,c.y+=c.vy,c.x<0?(c.x=0,c.vx=Math.abs(c.vx)*(.8+Math.random()*.4)):c.x>r&&(c.x=r,c.vx=-Math.abs(c.vx)*(.8+Math.random()*.4)),c.y<0?(c.y=0,c.vy=Math.abs(c.vy)*(.8+Math.random()*.4)):c.y>d&&(c.y=d,c.vy=-Math.abs(c.vy)*(.8+Math.random()*.4));else if(c.motion===1)c.oAngle+=c.oSpeed,c.x=c.oCx+Math.cos(c.oAngle)*c.oRadius,c.y=c.oCy+Math.sin(c.oAngle)*c.oRadius,c.oCx+=Math.sin(c.oAngle*.3)*.15,c.oCy+=Math.cos(c.oAngle*.3)*.15;else if(c.motion===2)c.oAngle+=c.oSpeed,c.x=c.oCx+Math.cos(c.oAngle)*c.oRadius,c.y=c.oCy+Math.sin(c.oAngle)*c.oRadius*.5,c.oCx+=Math.sin(c.oAngle*.2)*.1,c.oCy+=Math.cos(c.oAngle*.2)*.1;else if(c.motion===3){c.oAngle+=c.oSpeed;const $=c.oAngle,O=c.oRadius*.7;c.x=c.oCx+O*Math.cos($),c.y=c.oCy+O*Math.sin($)*Math.cos($),c.oCx+=Math.sin($*.15)*.12,c.oCy+=Math.cos($*.15)*.12}else if(c.motion===4){c.oAngle+=c.oSpeed*1.2;const $=c.oRadius*(.5+.5*Math.abs(Math.sin(c.oAngle*.15)));c.x=c.oCx+Math.cos(c.oAngle)*$,c.y=c.oCy+Math.sin(c.oAngle)*$,c.oCx+=Math.sin(c.oAngle*.1)*.18,c.oCy+=Math.cos(c.oAngle*.1)*.18}else c.oAngle+=c.oSpeed,c.x+=c.vx*.8,c.y=c.oCy+Math.sin(c.oAngle+c.x*.008)*c.oRadius*.35,c.x<-30?c.x=r+30:c.x>r+30&&(c.x=-30),c.oCy+=Math.sin(c.oAngle*.1)*.08;if(c.motion>0){const $=c.oRadius+50;c.oCx<-$?c.oCx=r+$:c.oCx>r+$&&(c.oCx=-$),c.oCy<-$?c.oCy=d+$:c.oCy>d+$&&(c.oCy=-$)}}l.beginPath(),l.strokeStyle=`rgba(${ct},${dt},${pt},0.06)`,l.lineWidth=.4;const D=new Path2D;for(let I=0;I<g;I++){const c=h[I];for(let $=I+1;$<g;$++){const O=h[$],P=c.x-O.x,T=c.y-O.y,x=P*P+T*T;x<v&&(1-x/v<.4?(l.moveTo(c.x,c.y),l.lineTo(O.x,O.y)):(D.moveTo(c.x,c.y),D.lineTo(O.x,O.y)))}}if(l.stroke(),l.strokeStyle=`rgba(${ct},${dt},${pt},0.18)`,l.lineWidth=.8,l.stroke(D),!Tt||ye!==ct||ve!==dt||$e!==pt){Tt=document.createElement("canvas");const I=48;Tt.width=I,Tt.height=I;const c=Tt.getContext("2d"),$=c.createRadialGradient(I/2,I/2,0,I/2,I/2,I/2);$.addColorStop(0,`rgba(${ct},${dt},${pt},0.9)`),$.addColorStop(.3,`rgba(${ct},${dt},${pt},0.35)`),$.addColorStop(1,`rgba(${ct},${dt},${pt},0)`),c.fillStyle=$,c.fillRect(0,0,I,I),ye=ct,ve=dt,$e=pt}const L=Tt;for(let I=0;I<g;I++){const c=h[I],$=.6+.4*Math.sin(c.pulsePhase),O=c.radius*5*(.8+$*.4);l.globalAlpha=.5+$*.4,l.drawImage(L,c.x-O/2,c.y-O/2,O,O)}l.globalAlpha=1,l.fillStyle="rgba(255,255,255,0.45)",l.beginPath();for(let I=0;I<g;I++){const c=h[I];if(c.radius>2){const $=.6+.4*Math.sin(c.pulsePhase),O=c.radius*(.8+$*.4)*.35;l.moveTo(c.x+O,c.y),l.arc(c.x,c.y,O,0,Math.PI*2)}}l.fill()}i()}function Je(){Rt!==null&&(cancelAnimationFrame(Rt),Rt=null),gt=null,Mt=null,Bt=[]}let Dt=null;const Xt=560,tn=140,Ee=Xt/2,ke=tn/2,Ce=[];for(let e=0;e<=Xt;e+=8){const t=Math.abs(e-Ee)/Ee;Ce.push(Math.pow(Math.min(1,t*1.6),.6))}const en=[0,1,2,3].map(e=>({amp:10+e*5,freq:(1.2+e*.35)*Math.PI*2/Xt,off:e*.6,spd:.7+e*.12}));let ee=!1;function Te(){if(Pt=requestAnimationFrame(Te),ee=!ee,ee)return;if(te+=.07,!Dt){const t=document.getElementById("nf-engine-waves");if(!t){Pt=null;return}Dt=Array.from(t.querySelectorAll("path"))}const e=[];for(let t=0;t<Dt.length;t++){const o=en[t],s=te*o.spd+o.off;e.length=0,e.push(`M 0 ${ke}`);let a=0;for(let p=0;p<=Xt;p+=8){const i=ke+o.amp*Ce[a++]*Math.sin(p*o.freq+s);e.push(`L${p} ${i*10+.5|0}`)}Dt[t].setAttribute("d",e.join(" "))}}function nn(){te=0,Te(),Ze(),jt=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),o=document.getElementById("nf-stat-lat2"),s=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(12+Math.random()*10)}ms`),s&&(s.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function _e(){Pt!==null&&(cancelAnimationFrame(Pt),Pt=null),jt&&(clearInterval(jt),jt=null),Dt=null,Je()}function Qt(){let e=0;const t=nt.filter(d=>d.status!=="skipped").length;for(const d of nt){const h=document.getElementById(`nf-proc-${d.stepId}`);if(!h)continue;h.className="nf-proc-row";const g=h.querySelector(".nf-proc-badge");switch(d.status){case"done":h.classList.add("nf-proc-done"),g&&(g.textContent="✅ done"),e++;break;case"active":h.classList.add("nf-proc-active"),g&&(g.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":h.classList.add("nf-proc-error"),g&&(g.textContent="❌ error");break;case"skipped":h.classList.add("nf-proc-skipped"),g&&(g.textContent="— skip");break;default:h.classList.add("nf-proc-waiting"),g&&(g.textContent="(queued)")}}const o=nt.findIndex(d=>d.status==="active"),s=o>=0?o+1:e>=t&&t>0?nt.length:e,a=document.getElementById("nf-step-counter");a&&(a.textContent=`${s}/${nt.length}`);const p=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");e>=t&&t>0?(p&&(p.textContent="COMPLETE",p.style.color=st.doneHex),i&&(i.style.background=st.doneHex,i.style.boxShadow=`0 0 8px rgba(${st.doneRgb},0.7)`)):nt.some(h=>h.status==="error")?(p&&(p.textContent="ERROR",p.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):nt.some(h=>h.status==="active")&&p&&(p.textContent="ACTIVE",p.style.color=st.hex,p.style.textShadow=`0 0 10px rgba(${st.rgb},0.5)`);const l=document.getElementById("nf-terminal"),r=l==null?void 0:l.querySelector(".nf-proc-active");r&&l&&r.scrollIntoView({behavior:"smooth",block:"center"})}function Ie(){rt&&rt.isConnected||(Yt(),rt=document.createElement("button"),rt.id="nf-toggle-btn",rt.className="nf-toggle-visible",rt.innerHTML=yt?pe:fe,rt.title="ซ่อน/แสดง Netflow Overlay",rt.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",rt.onclick=()=>Se(),document.body.appendChild(rt))}function Se(){q&&(Ie(),yt?(q.classList.remove("nf-hidden"),q.classList.add("nf-visible"),q.style.opacity="1",q.style.pointerEvents="auto",rt&&(rt.innerHTML=fe),yt=!1):(q.classList.remove("nf-visible"),q.classList.add("nf-hidden"),q.style.opacity="0",q.style.pointerEvents="none",rt&&(rt.innerHTML=pe),yt=!0))}const Ae={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Pe(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=At;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"blue"}catch{t="blue"}const o=Ae[t]||Ae.blue;let s;try{s=chrome.runtime.getURL(o)}catch{s=`/${o}`}const a=st.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${a},0.25) 0%, rgba(${a},0.12) 50%, rgba(${a},0.20) 100%)`,`url('${s}')`].join(", "),e.style.backgroundSize="auto, auto, 50%",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${a},0.45)`,e.style.boxShadow=`0 0 70px rgba(${a},0.22), 0 0 140px rgba(${a},0.1), inset 0 1px 0 rgba(${a},0.15)`}function Zt(e=1){if(st=He(),de(),q&&q.isConnected){q.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!et||!et.isConnected)&&(et=null,Yt()),setTimeout(()=>{if(q)try{et!=null&&et.sheet&&et.sheet.cssRules.length>0&&(q.style.removeProperty("background"),q.style.removeProperty("font-family"),q.style.removeProperty("overflow"))}catch{}},200);for(const t of ft)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;Ct=e,nt=Kt(e),me();for(const t of ft)ne(t);if(Jt(),Qt(),!q.querySelector(".nf-stop-btn")){const t=document.createElement("button");t.className="nf-stop-btn",t.innerHTML='<span class="nf-stop-icon"></span> หยุด',t.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",t.onclick=()=>{var o;window.__NETFLOW_STOP__=!0;try{Nt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((o=chrome.runtime)!=null&&o.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},q.appendChild(t)}yt&&Se();return}q&&!q.isConnected&&(q=null),et&&(et.remove(),et=null),Yt();for(const t of ft)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;if(Ct=e,nt=Kt(e),e>1){const t=ft.find(s=>s.id==="video");if(t){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let a=2;a<=e;a++)s.push({id:`scene${a}-prompt`,label:`Scene ${a} Prompt`,status:"waiting"}),s.push({id:`scene${a}-gen`,label:`Scene ${a} Generate`,status:"waiting"}),s.push({id:`scene${a}-wait`,label:`Scene ${a} รอผล`,status:"waiting",progress:0});t.steps=s}const o=ft.find(s=>s.id==="render");if(o){const s=o.steps.find(p=>p.id==="download");s&&(s.label="ดาวน์โหลด 720p");const a=o.steps.find(p=>p.id==="upscale");a&&(a.label="Full Video")}}q=je(),q.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(q),q.classList.add("nf-visible"),yt=!1,Ie(),Ye(),nn(),requestAnimationFrame(()=>Pe()),setTimeout(()=>{if(q)try{et!=null&&et.sheet&&et.sheet.cssRules.length>0&&(q.style.removeProperty("background"),q.style.removeProperty("font-family"),q.style.removeProperty("overflow"))}catch{}},200)}function Me(){be(),_e(),yt=!1,q&&(q.classList.add("nf-fade-out"),setTimeout(()=>{q==null||q.remove(),q=null},500)),rt&&(rt.remove(),rt=null)}const on={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function an(e,t,o){const s=nt.findIndex(g=>g.status==="active"),a=nt.filter(g=>g.status==="done").length,p=nt.length,i=s>=0?s+1:a>=p?p:a,l=document.getElementById("nf-stat-step");l&&(l.textContent=`${i}/${p}`);let r=1;for(const g of nt)if(g.status==="active"||g.status==="done")if(g.stepId.startsWith("scene")){const v=g.stepId.match(/^scene(\d+)-/);v&&(r=Math.max(r,parseInt(v[1],10)))}else(g.stepId==="download"||g.stepId==="upscale"||g.stepId==="open")&&(r=Ct);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=Ct>1?`${r}/${Ct}`:"1/1"),t==="active"){const g=document.getElementById("nf-stat-status"),v=on[e]||e.toUpperCase();g&&(g.textContent=v)}else if(t==="done"&&a>=p){const g=document.getElementById("nf-stat-status");g&&(g.textContent="COMPLETE")}else if(t==="error"){const g=document.getElementById("nf-stat-status");g&&(g.textContent="ERROR")}const h=document.getElementById("nf-stat-progress");h&&(o!==void 0&&o>0?h.textContent=`${Math.min(100,o)}%`:t==="active"&&(h.textContent="—"))}function M(e,t,o){if(!q)return;for(const a of ft)for(const p of a.steps)p.id===e&&(p.status=t,o!==void 0&&(p.progress=o));for(const a of nt)a.stepId===e&&(a.status=t,o!==void 0&&(a.progress=o));const s=document.getElementById(`nf-step-${e}`);if(s&&(s.className="nf-step",t==="active"?s.classList.add("nf-step-active"):t==="done"?s.classList.add("nf-step-done"):t==="error"&&s.classList.add("nf-step-error")),an(e,t,o),o!==void 0){const a=document.getElementById(`nf-bar-${e}`);a&&(a.style.width=`${Math.min(100,o)}%`)}Jt(),Qt()}function _t(e){M(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function Ot(e=4e3){be(),_e(),Jt(),Qt(),setTimeout(()=>Me(),e)}function Jt(){for(const e of ft){const t=e.steps.filter(r=>r.status!=="skipped").length,o=e.steps.filter(r=>r.status==="done").length,s=e.steps.some(r=>r.status==="active"),a=t>0?Math.round(o/t*100):0,p=document.getElementById(`nf-pct-${e.id}`);p&&(p.textContent=`${a}%`);const i=document.getElementById(`nf-modbar-${e.id}`);i&&(i.style.width=`${a}%`);const l=document.getElementById(`nf-mod-${e.id}`);l&&(l.classList.remove("nf-active","nf-done"),a>=100?l.classList.add("nf-done"):s&&l.classList.add("nf-active"))}}function rn(e){var s,a,p,i;Ct=e;const t=new Map;for(const l of nt)t.set(l.stepId,{status:l.status,progress:l.progress});nt=Kt(e);for(const l of nt){const r=t.get(l.stepId);r&&(l.status=r.status,r.progress!==void 0&&(l.progress=r.progress))}if(me(),e>1){const l=ft.find(r=>r.id==="video");if(l){const r=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((s=l.steps.find(d=>d.id==="animate"))==null?void 0:s.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((a=l.steps.find(d=>d.id==="vid-prompt"))==null?void 0:a.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((p=l.steps.find(d=>d.id==="vid-generate"))==null?void 0:p.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((i=l.steps.find(d=>d.id==="vid-wait"))==null?void 0:i.status)||"waiting",progress:0}];for(let d=2;d<=e;d++)r.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),r.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),r.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});l.steps=r,ne(l)}}const o=ft.find(l=>l.id==="render");if(o&&e>1){const l=o.steps.find(d=>d.id==="download");l&&(l.label="ดาวน์โหลด 720p");const r=o.steps.find(d=>d.id==="upscale");r&&(r.label="Full Video"),ne(o)}Jt(),Qt()}function ne(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(a=>a.remove()),e.steps.forEach(a=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${a.id}`;let i="";a.progress!==void 0&&(i=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${i}
        `,t.appendChild(p)});const s=document.createElement("div");s.className="nf-mod-progress",s.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(s)}function Nt(e){e.replace(/^\[Netflow AI\]\s*/,"")}let It=null,vt=null;const sn=new Promise(e=>{vt=e,setTimeout(()=>e(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},e=>{!chrome.runtime.lastError&&(e!=null&&e.tabId)&&(It=e.tabId,console.log(`[Netflow AI] Tab ID: ${It}`)),vt&&(vt(It),vt=null)})}catch{vt&&(vt(null),vt=null)}function mt(){return It?`netflow_pending_action_${It}`:"netflow_pending_action"}function Re(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Nt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},R=e=>{console.warn(`[Netflow AI] ${e}`);try{Nt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}};(()=>{const e=(o,s)=>{const a=o.tagName.toLowerCase(),p=o.id?`#${o.id}`:"",i=o.className&&typeof o.className=="string"?"."+o.className.trim().split(/\s+/).join("."):"",l=o.getBoundingClientRect(),r={};for(const c of o.attributes)["class","id","style"].includes(c.name)||(r[c.name]=c.value.length>80?c.value.slice(0,80)+"…":c.value);const d=(o.textContent||"").trim().slice(0,120),h=Array.from(o.querySelectorAll('i, [class*="icon"]')).map(c=>{var $;return($=c.textContent)==null?void 0:$.trim()}).filter(Boolean).join(", "),g=[];let v=o.parentElement;for(let c=0;c<5&&v;c++){const $=v.tagName.toLowerCase(),O=v.id?`#${v.id}`:"",P=v.className&&typeof v.className=="string"?"."+v.className.trim().split(/\s+/).slice(0,2).join("."):"";g.push(`${$}${O}${P}`),v=v.parentElement}const D=s==="click"?`%c🖱️ CLICK %c<${a}${p}${i}>`:`%c👆 HOVER %c<${a}${p}${i}>`;console.groupCollapsed(D,s==="click"?"background:#e74c3c;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold":"background:#3498db;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold","color:#f39c12;font-weight:bold"),console.log("Element:",o),console.log("Selector:",`${a}${p}${i}`),console.log("Rect:",{x:Math.round(l.x),y:Math.round(l.y),w:Math.round(l.width),h:Math.round(l.height)}),Object.keys(r).length&&console.log("Attributes:",r),d&&console.log("Text:",d),h&&console.log("Icons:",h),g.length&&console.log("Ancestors:",g.join(" > ")),console.groupEnd()};document.addEventListener("click",o=>{const s=o.target;s!=null&&s.closest("#netflow-engine-overlay")||e(s,"click")},!0);let t=null;document.addEventListener("mouseover",o=>{const s=o.target;s!==t&&(s!=null&&s.closest("#netflow-engine-overlay")||(t=s,e(s,"hover")))},!0),console.log("%c[Netflow AI] 🔍 Debug Element Inspector ACTIVE — click/hover elements to inspect","background:#2ecc71;color:#000;padding:4px 8px;border-radius:4px;font-weight:bold")})();function oe(e=3e3){n(`🔒 จะปิดแท็บ automation ใน ${e/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},t=>{chrome.runtime.lastError?R(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${t==null?void 0:t.message}`)})}catch(t){R(`ปิดแท็บผิดพลาด: ${t.message}`)}},e)}async function ie(){try{if(await new Promise(a=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},p=>{if(chrome.runtime.lastError){a(!1);return}a(!!(p!=null&&p.cached))})}catch{a(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const a=document.querySelectorAll("video");for(const p of a){const i=p.src||p.currentSrc||"";if(i)return i}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const t=document.querySelectorAll("video");let o=null,s=0;for(const a of t){let p=a.src||"";if(!p){const r=a.querySelector("source");r&&(p=r.getAttribute("src")||"")}if(!p&&a.currentSrc&&(p=a.currentSrc),!p)continue;if(Q()){o||(o=p,s=1);continue}const i=a.getBoundingClientRect(),l=i.width*i.height;i.width>50&&l>s&&(s=l,o=p)}if(!o)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${o.substring(0,80)}... (area=${s.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const a=await fetch(o);if(!a.ok)return n(`[TikTok] fetch failed: HTTP ${a.status}`),await Be(o),o;const p=await a.blob(),i=(p.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${i} MB, type: ${p.type}`),p.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${p.size} bytes) — อาจเป็น thumbnail`);const l=await new Promise((r,d)=>{const h=new FileReader;h.onloadend=()=>r(h.result),h.onerror=()=>d(new Error("FileReader error")),h.readAsDataURL(p)});n(`[TikTok] Data URL พร้อม: ${(l.length/1024/1024).toFixed(1)} MB`),await new Promise(r=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:l},d=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):d!=null&&d.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${d==null?void 0:d.error}`),r()})})}catch(a){n(`[TikTok] Content script fetch error: ${a.message}`),await Be(o)}return o}catch(e){return n(`[TikTok] captureVideoUrl error: ${e.message}`),null}}async function Be(e){if(e.startsWith("https://"))try{await new Promise(t=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched via background: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),t()})})}catch{}}function ae(e){if(e){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:e,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const Y=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),re=/Win/i.test(navigator.userAgent),De=Y?"🍎 Mac":re?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${De}`),window.__VIDEO_COMPLETE_SENT__=!1;class se extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Lt=null,$t=null,Oe=!1;const St=new Map;let Ne=0;function ln(){if(Lt)return Lt;try{const e=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Lt=new Worker(URL.createObjectURL(e)),Lt.onmessage=t=>{const o=St.get(t.data);o&&(St.delete(t.data),o())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Lt}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function cn(){if($t)return $t;if(Oe)return null;try{return $t=chrome.runtime.connect({name:"timer"}),$t.onMessage.addListener(e=>{const t=St.get(e.id);t&&(St.delete(e.id),t())}),$t.onDisconnect.addListener(()=>{$t=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),$t}catch{return Oe=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const u=e=>new Promise((t,o)=>{if(window.__NETFLOW_STOP__)return o(new se);let s=!1;const a=()=>{if(!s){if(s=!0,window.__NETFLOW_STOP__)return o(new se);t()}};setTimeout(a,e);const p=ln();if(p){const r=++Ne;St.set(r,a),p.postMessage({id:r,ms:e});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e+2e3},()=>{chrome.runtime.lastError||a()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e},()=>{chrome.runtime.lastError?setTimeout(a,e):a()});return}catch{}const i=cn();if(i){const r=++Ne;St.set(r,a),i.postMessage({cmd:"delay",id:r,ms:e});return}const l=setTimeout(a,e);u._lastId=l});function Et(){return!!window.__NETFLOW_STOP__}const Q=()=>document.hidden;let Le=0;async function kt(){if(!document.hidden)return!1;const e=Date.now();if(e-Le<15e3)return!1;Le=e;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await u(1500),!0}catch{return!1}}async function ht(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(t=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>t()));const e=Date.now();for(;document.hidden&&Date.now()-e<5e3;)await u(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await u(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function Fe(){var o;const e=["audio generation failed","couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","might violate","violate our policies","อาจละเมิด","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const s of t){if(s.closest("#netflow-engine-overlay"))continue;const a=(s.textContent||"").trim().toLowerCase();if(!(a.length>200||a.length<5)){for(const p of e)if(a.includes(p))return((o=s.textContent)==null?void 0:o.trim())||p}}return null}function dn(e){let t=e;const o=[/STRICT FACE & HEAD LOCK:[^.]*\./gi,/BODY LOCK:[^.]*\./gi,/HAIR LOCK:[^.]*\./gi,/FACE LOCK[^.]*\./gi,/PRODUCT IDENTITY LOCK:[^.]*\./gi,/LABEL LOCK:[^.]*\./gi,/PRODUCT EVERY FRAME:[^.]*\./gi,/TRANSITION STABILITY:[^.]*\./gi,/ANTI[_-]DUPLICATION:[^.]*\./gi,/ANTI[_-]TEXT[^.]*\./gi,/ANTI[_-]MORPH[^.]*\./gi,/ANTI[_-]DISTORTION[^.]*\./gi,/ANTI[_-]ADDITION[^.]*\./gi,/ANTI[_-]FLOATING[^.]*\./gi,/PROPS vs PRODUCT:[^.]*\./gi,/BRAND IDENTITY FREEZE[^.]*\./gi,/BRAND MORPHING[^.]*\./gi,/PRODUCT SIZE \(CRITICAL\):[^.]*\./gi,/PRODUCT SIZE REALISM:[^.]*\./gi,/VOICE DISCIPLINE:[^.]*\./gi,/ZERO INVENTION:[^.]*\./gi,/REALISM:[^.]*\./gi,/SCREEN CONTENT[^.]*\./gi,/SINGLE UTENSIL RULE[^.]*\./gi,/PRODUCT LOCK[^.]*\./gi,/FACE & HEAD LOCK[^.]*\./gi,/CLOTHING FIDELITY[^.]*\./gi,/FRONT[_-]FACING[^.]*\./gi];for(const i of o)t=t.replace(i,"");const s=["DO NOT","NEVER","FORBIDDEN","MUST NOT","ABSOLUTELY NO","IMMUTABLE","LOCKED","HIGHEST PRIORITY","#1 FORBIDDEN","Do NOT let","Do NOT add","Do NOT generate","Do NOT simplify","Do NOT invent","ZERO on-screen","NO split screen","NO collage","NO side-by-side","NO divided frames","never morph","never simplify","never change shape","never disappear","never be hidden","never exit","BRAND MORPHING IS","objects MUST NOT magically"];return t=t.split(/(?<=[.!])\s+/).filter(i=>!s.some(l=>i.includes(l))).join(" "),t=t.replace(/\s{2,}/g," ").trim(),t.length>1200&&(t=t.replace(/Render with extreme surface detail[^.]*\./gi,""),t=t.replace(/High-fidelity visual detail[^.]*\./gi,""),t=t.replace(/Product lit with soft rim light[^.]*\./gi,""),t=t.replace(/visible material texture[^.]*\./gi,""),t=t.replace(/Fluid motion, cinematic motion blur[^.]*\./gi,""),t=t.replace(/AI-observed appearance:[^.]*\./gi,""),t=t.replace(/Reference clothing:[^.]*\./gi,""),t=t.replace(/\s{2,}/g," ").trim()),n(`🛡️ Safe retry prompt: ${e.length} → ${t.length} chars (${Math.round((1-t.length/e.length)*100)}% reduction)`),t}async function Z(e){if(Q()){e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),e.click();return}const t=e.getBoundingClientRect(),o=t.left+t.width/2,s=t.top+t.height/2,a={bubbles:!0,cancelable:!0,clientX:o,clientY:s,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",a)),await u(80),e.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",a)),e.dispatchEvent(new MouseEvent("click",a)),await u(50),e.click()}function Ft(e){const t=e.getBoundingClientRect(),o=t.left+t.width/2,s=t.top+t.height/2,a={bubbles:!0,cancelable:!0,clientX:o,clientY:s};e.dispatchEvent(new PointerEvent("pointerenter",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",a)),e.dispatchEvent(new PointerEvent("pointerover",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",a)),e.dispatchEvent(new PointerEvent("pointermove",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",a))}function pn(e){const t=[],o=document.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols'], [data-icon]");for(const s of o){if((s.textContent||"").trim()!==e)continue;let p=s,i=null,l=1/0;for(let r=0;r<20&&p&&(p=p.parentElement,!(!p||p===document.body));r++){if(Q()){r>=3&&p.children.length>0&&!i&&(i=p);continue}const d=p.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const h=d.width*d.height;h<l&&(i=p,l=h)}}i&&!t.includes(i)&&t.push(i)}return t.sort((s,a)=>{const p=s.getBoundingClientRect(),i=a.getBoundingClientRect();return p.left-i.left}),t}function le(e=!1){const t=[],o=document.querySelectorAll("video");for(const i of o){let l=i.parentElement;for(let r=0;r<10&&l;r++){if(Q()){if(r>=3&&l.children.length>0){t.push({el:l,left:0});break}l=l.parentElement;continue}const d=l.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){t.push({el:l,left:d.left});break}l=l.parentElement}}const s=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const i of s){const l=(i.textContent||"").trim();if(l==="play_arrow"||l==="play_circle"||l==="videocam"){let r=i.parentElement;for(let d=0;d<10&&r;d++){if(Q()){if(d>=3&&r.children.length>0){t.push({el:r,left:0});break}r=r.parentElement;continue}const h=r.getBoundingClientRect();if(h.width>120&&h.height>80&&h.width<window.innerWidth*.7&&h.top>=-50&&h.left<window.innerWidth*.75){t.push({el:r,left:h.left});break}r=r.parentElement}}}const a=document.querySelectorAll("img");for(const i of a){const l=(i.alt||"").toLowerCase();if(l.includes("video")||l.includes("วิดีโอ")){let r=i.parentElement;for(let d=0;d<10&&r;d++){if(Q()){if(d>=3&&r.children.length>0){t.push({el:r,left:0});break}r=r.parentElement;continue}const h=r.getBoundingClientRect();if(h.width>120&&h.height>80&&h.width<window.innerWidth*.7&&h.top>=-50&&h.left<window.innerWidth*.75){t.push({el:r,left:h.left});break}r=r.parentElement}}}const p=Array.from(new Set(t.map(i=>i.el))).map(i=>t.find(l=>l.el===i));if(p.sort((i,l)=>i.left-l.left),p.length>0){const i=p[0].el,l=i.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${l.left.toFixed(0)},${l.top.toFixed(0)}) ขนาด ${l.width.toFixed(0)}x${l.height.toFixed(0)}`),i}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function fn(){const e=pn("image");if(e.length>0){const o=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${o.left.toFixed(0)},${o.top.toFixed(0)}) ขนาด ${o.width.toFixed(0)}x${o.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const o of t){let s=o.parentElement;for(let a=0;a<10&&s;a++){if(Q()){if(a>=3&&s.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),s;s=s.parentElement;continue}const p=s.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${p.left.toFixed(0)},${p.top.toFixed(0)})`),s;s=s.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function un(e,t){var l;const[o,s]=e.split(","),a=((l=o.match(/:(.*?);/))==null?void 0:l[1])||"image/png",p=atob(s),i=new Uint8Array(p.length);for(let r=0;r<p.length;r++)i[r]=p.charCodeAt(r);return new File([i],t,{type:a})}async function gn(e,t=1024,o=.8){try{if(e.length<5e5)return n(`🗜️ รูปเล็กพอ (${(e.length/1024).toFixed(0)} KB base64) — ไม่บีบอัด`),e;n(`🗜️ รูปใหญ่ (${(e.length/1024).toFixed(0)} KB base64) — กำลังบีบอัด...`);const s=new Image;await new Promise((h,g)=>{s.onload=()=>h(),s.onerror=()=>g(new Error("Image load failed")),s.src=e});let{width:p,height:i}=s;if(p>t||i>t){const h=t/Math.max(p,i);p=Math.round(p*h),i=Math.round(i*h)}const l=document.createElement("canvas");l.width=p,l.height=i;const r=l.getContext("2d");if(!r)return e;r.drawImage(s,0,0,p,i);const d=l.toDataURL("image/jpeg",o);return n(`🗜️ บีบอัดแล้ว: ${(e.length/1024).toFixed(0)} KB → ${(d.length/1024).toFixed(0)} KB (${p}x${i})`),l.width=0,l.height=0,d}catch(s){return R(`🗜️ บีบอัดล้มเหลว: ${s.message} — ใช้รูปต้นฉบับ`),e}}function bt(e){var a;const t=[],o=new WeakSet,s=["i.google-symbols","i[class*='google-symbols']",".material-symbols-outlined",".material-icons",".material-symbols-rounded",".material-symbols-sharp","i[class*='material']","span[class*='material']","i[class*='icon']","span[class*='icon']","[data-icon]","[class*='gm-icon']","[class*='gmat-icon']","i"];for(const p of s){for(const i of document.querySelectorAll(p))if(((a=i.textContent)==null?void 0:a.trim())===e){const l=i.closest("button");l&&!o.has(l)&&(o.add(l),t.push(l))}if(t.length>0)break}if(t.length===0)for(const p of document.querySelectorAll("button")){const i=(p.getAttribute("aria-label")||"").toLowerCase();(i===e.toLowerCase()||i.includes(e.toLowerCase()))&&(o.has(p)||(o.add(p),t.push(p)))}return t}function mn(){const e=["add","add_2","add_circle","add_circle_outline","attach_file","attach_file_add","attachment","note_add"];let t=[];for(const i of e)if(t=bt(i),t.length>0)break;if(t.length>0){let i=null,l=0;for(const r of t){const d=r.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.y>l&&(l=d.y,i=r)}if(i)return n(`พบปุ่ม "+" ของ Prompt Bar (icon) ที่ y=${l.toFixed(0)}`),i}n("ไม่พบปุ่มเพิ่มจากไอคอน — ลอง fallback ทั้งหมด");const o=["add","attach","upload","create","insert","plus","เพิ่ม","แนบ","อัปโหลด","สร้าง"];for(const i of document.querySelectorAll("button")){const l=(i.getAttribute("aria-label")||"").toLowerCase(),r=(i.getAttribute("title")||"").toLowerCase();if(o.some(d=>l.includes(d)||r.includes(d))){if(Q())return n('พบปุ่ม "+" (aria/title) hidden mode'),i;const d=i.getBoundingClientRect();if(d.bottom>window.innerHeight*.6&&d.width<80&&d.height<80)return n(`พบปุ่ม "+" (aria="${l}" title="${r}") ที่ y=${d.y.toFixed(0)}`),i}}const s=document.querySelectorAll("button");for(const i of s){const l=(i.textContent||"").trim();if(l!=="+"&&l!=="add"&&l!=="Add")continue;if(Q())return i;const r=i.getBoundingClientRect();if(r.bottom>window.innerHeight*.6&&r.width<80&&r.height<80)return n(`พบปุ่ม "+" (text="${l}") ที่ y=${r.y.toFixed(0)}`),i}const a=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');if(a){const i=a.getBoundingClientRect();let l=null,r=1/0;for(const d of s){const h=d.getBoundingClientRect();if(h.width<10||h.height<10||h.width>100||h.height>100||Math.abs(h.top-i.top)>80)continue;const g=Math.abs(h.left-i.left)+Math.abs(h.top-i.top);g<r&&(r=g,l=d)}if(l)return n(`พบปุ่ม "+" (ใกล้ prompt bar, dist=${r.toFixed(0)})`),l}for(const i of s){const l=i.querySelector("svg");if(!l)continue;const r=l.querySelectorAll("path, line, polygon"),d=Array.from(r).map(h=>h.getAttribute("d")||"").join(" ");if(d.includes("M12")||d.includes("M11")||d.includes("M10")){if(Q())return i;const h=i.getBoundingClientRect();if(h.bottom>window.innerHeight*.6&&h.width<80&&h.height<80)return n(`พบปุ่ม "+" (SVG) ที่ y=${h.y.toFixed(0)}`),i}}const p=[];for(const i of s){const l=i.getBoundingClientRect();if(l.bottom>window.innerHeight*.6&&l.width>0){const r=(i.textContent||"").trim().substring(0,30),d=i.getAttribute("aria-label")||"",h=(i.className||"").substring(0,40),g=i.querySelector("i, span[class*='icon'], svg")?"has-icon":"no-icon";p.push(`"${r}" aria="${d}" cls="${h}" ${g} y=${l.y.toFixed(0)}`)}}return R(`ไม่พบปุ่ม "+" — ปุ่มที่พบบริเวณล่าง (${p.length}): ${p.slice(0,5).join(" | ")}`),null}function ce(){for(const s of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const a=bt(s);let p=null,i=0;for(const l of a){const r=l.getBoundingClientRect();r.y>i&&(i=r.y,p=l)}if(p)return n(`พบปุ่ม Generate จากไอคอน "${s}" ที่ y=${i.toFixed(0)}`),p}const e=document.querySelectorAll("button");let t=null,o=0;for(const s of e){if(Q())break;const a=s.getBoundingClientRect();if(a.bottom>window.innerHeight*.7&&a.right>window.innerWidth*.5){const p=Math.abs(a.width-a.height)<10&&a.width<60,i=a.y+a.x+(p?1e3:0);i>o&&(o=i,t=s)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const s of e){const a=(s.getAttribute("aria-label")||"").toLowerCase();if(a.includes("generate")||a.includes("submit")||a.includes("send")||a.includes("สร้าง"))return s}return null}function zt(){const e=document.querySelectorAll("textarea");for(const s of e)if(Q()||s.getBoundingClientRect().bottom>window.innerHeight*.5)return s;const t=document.querySelectorAll('[contenteditable="true"]');for(const s of t)if(Q()||s.getBoundingClientRect().bottom>window.innerHeight*.5)return s;const o=document.querySelectorAll("input[type='text'], input:not([type])");for(const s of o){const a=s.placeholder||"";if(a.includes("สร้าง")||a.includes("prompt")||a.includes("describe"))return s}return e.length>0?e[e.length-1]:null}async function Vt(e,t){var o,s,a,p;e.focus(),await u(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const i=new DataTransfer;i.setData("text/plain",t),i.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:i});e.dispatchEvent(l),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const r=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:i});e.dispatchEvent(r),await u(800);const d=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(i){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await u(100);const i=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(i);const l=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(l),await u(800);const r=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(r.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${r.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(i){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await u(200);const i=new DataTransfer;i.setData("text/plain",t),i.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const l=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:i});e.dispatchEvent(l),await u(800);const r=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(r.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${r.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(i){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((o=navigator.clipboard)!=null&&o.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const l=document.createElement("textarea");l.value=t,l.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(l),l.focus(),l.select(),document.execCommand("copy"),document.body.removeChild(l),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await u(200),document.execCommand("paste"),await u(500);const i=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(i.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${i.length} ตัวอักษร)`);return}}catch(i){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const i=Object.keys(e).find(l=>l.startsWith("__reactFiber$")||l.startsWith("__reactInternalInstance$"));if(i){let l=e[i];for(let r=0;r<30&&l;r++){const d=l.memoizedProps,h=l.memoizedState;if((s=d==null?void 0:d.editor)!=null&&s.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const g=d.editor;g.selection,g.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((p=(a=h==null?void 0:h.memoizedState)==null?void 0:a.editor)!=null&&p.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),h.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}l=l.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(i){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${i.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function qt(){let e=0;const t=document.querySelectorAll("img");for(const s of t){if(s.closest("#netflow-engine-overlay")||!s.src)continue;if(Q()){e++;continue}const a=s.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&s.offsetParent!==null&&e++}const o=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const s of o){if(s.closest("#netflow-engine-overlay"))continue;if(Q()){e++;continue}const a=s.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&s.offsetParent!==null&&e++}return e}async function ze(e,t=5e3){var l;const o=Date.now(),s=["upload","upload_file","upload_2","cloud_upload","file_upload","add_photo_alternate","photo_library"],a=["upload image","อัปโหลดรูปภาพ","upload","อัปโหลด","upload file","add image","เพิ่มรูป","เพิ่มรูปภาพ"],p=new Set(["tab","tablist","tabpanel","navigation"]);for(;Date.now()-o<t;){for(const g of document.querySelectorAll("button")){if(g===e)continue;const v=g.querySelector("i");if(!v)continue;const D=(v.textContent||"").trim().toLowerCase();if(D==="upload"||D==="upload_file"||D==="cloud_upload"){const L=g.getBoundingClientRect();if(L.width>0&&L.height>0&&L.y>window.innerHeight*.4)return n(`🎯 พบปุ่ม Upload โดยตรง (icon="${D}" y=${L.y.toFixed(0)})`),g}}const r=[],d=e.getAttribute("aria-controls");if(d){const g=document.getElementById(d);g&&r.push(g)}const h=e.getAttribute("aria-owns");if(h){const g=document.getElementById(h);g&&r.push(g)}for(const g of["[data-radix-portal]","[data-radix-popper-content-wrapper]",'[role="dialog"]','[role="menu"]','[role="listbox"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]","[data-radix-popover-content]",'[class*="popover"]','[class*="dropdown"]','[class*="menu-content"]','[class*="dialog"]'])for(const v of document.querySelectorAll(g))r.push(v);for(const g of document.querySelectorAll("[id]"))(g.id||"").match(/^radix-/)&&r.push(g);for(const g of r)for(const v of g.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[tabindex], a")){if(v===e)continue;const D=(v.getAttribute("role")||"").toLowerCase();if(p.has(D))continue;const L=v.querySelector("i, span[class*='icon'], span[class*='material']"),I=((l=L==null?void 0:L.textContent)==null?void 0:l.trim().toLowerCase())||"";if(s.includes(I))return n(`พบปุ่ม Upload (icon="${I}")`),v;const c=(v.textContent||"").trim().toLowerCase(),$=Array.from(v.querySelectorAll("span, div, p")).map(P=>{var T;return((T=P.textContent)==null?void 0:T.trim().toLowerCase())||""});if(a.some(P=>c===P||$.some(T=>T===P))){if(c==="image"||c==="video"||c==="รูปภาพ"||c==="วิดีโอ")continue;return n(`พบปุ่ม Upload (text="${c.substring(0,40)}")`),v}const O=(v.getAttribute("aria-label")||"").toLowerCase();if(a.some(P=>O.includes(P)))return n(`พบปุ่ม Upload (aria="${O}")`),v}if(Date.now()-o>t/2)for(const g of document.querySelectorAll("button, [role='menuitem']")){if(g===e)continue;const v=(g.getAttribute("role")||"").toLowerCase();if(p.has(v))continue;const D=(g.textContent||"").trim().toLowerCase();if(D==="image"||D==="video"||D==="รูปภาพ"||D==="วิดีโอ")continue;const L=g.getBoundingClientRect();if(!(L.width===0||L.height===0||L.y<window.innerHeight*.4)&&a.some(I=>D===I||D.includes(I))&&D.length<50)return n(`พบปุ่ม Upload (global search, text="${D.substring(0,40)}")`),g}await u(500)}const i=[];for(const r of["[data-radix-portal]",'[role="dialog"]','[role="menu"]']){const d=document.querySelectorAll(r);if(d.length>0)for(const h of d){const g=h.querySelectorAll("button, [role='menuitem']");for(const v of g)i.push(`[${r}] "${(v.textContent||"").trim().substring(0,30)}"`)}}return R(`ไม่พบปุ่ม Upload — พบ elements ใน dialogs: ${i.slice(0,8).join(" | ")||"(ว่าง)"}`),null}async function hn(){document.querySelectorAll("[data-netflow-captured]").forEach(t=>t.removeAttribute("data-netflow-captured")),document.documentElement.removeAttribute("data-nf-block-active");const e=document.createElement("script");if(e.textContent=`(function(){
        if(window.__nfBlocked) return;
        window.__nfBlocked = true;
        window.__nfOrigClick = HTMLInputElement.prototype.click;
        window.__nfOrigShowPicker = HTMLInputElement.prototype.showPicker;
        HTMLInputElement.prototype.click = function(){
            if(this.type==='file'){
                this.setAttribute('data-netflow-captured','1');
                console.log('[Netflow] Captured file input via click() in MAIN world');
                return;
            }
            return window.__nfOrigClick.call(this);
        };
        if(typeof window.__nfOrigShowPicker==='function'){
            HTMLInputElement.prototype.showPicker=function(){
                if(this.type==='file'){
                    this.setAttribute('data-netflow-captured','1');
                    console.log('[Netflow] Captured file input via showPicker() in MAIN world');
                    return;
                }
                return window.__nfOrigShowPicker.call(this);
            };
        }
        document.documentElement.setAttribute('data-nf-block-active','1');
    })();`,document.documentElement.appendChild(e),e.remove(),document.documentElement.hasAttribute("data-nf-block-active")){n("🛡️ File dialog blocked in MAIN WORLD (inline script)");return}R("⚠️ Inline script blocked by CSP — using chrome.scripting fallback");try{await new Promise((t,o)=>{chrome.runtime.sendMessage({type:"BLOCK_FILE_DIALOG"},s=>{chrome.runtime.lastError?o(new Error(chrome.runtime.lastError.message)):t()})}),await u(200),document.documentElement.hasAttribute("data-nf-block-active")?n("🛡️ File dialog blocked in MAIN WORLD (chrome.scripting fallback)"):R("❌ Failed to block file dialog — both methods failed")}catch(t){R(`❌ chrome.scripting fallback failed: ${t.message}`)}}function bn(){const e=document.createElement("script");e.textContent=`(function(){
        if(!window.__nfBlocked) return;
        HTMLInputElement.prototype.click = window.__nfOrigClick;
        if(typeof window.__nfOrigShowPicker==='function'){
            HTMLInputElement.prototype.showPicker = window.__nfOrigShowPicker;
        }
        delete window.__nfBlocked;
        delete window.__nfOrigClick;
        delete window.__nfOrigShowPicker;
        document.documentElement.removeAttribute('data-nf-block-active');
    })();`,document.documentElement.appendChild(e),e.remove(),document.documentElement.hasAttribute("data-nf-block-active")&&chrome.runtime.sendMessage({type:"UNBLOCK_FILE_DIALOG"},()=>{}),document.querySelectorAll("[data-netflow-captured]").forEach(t=>t.removeAttribute("data-netflow-captured")),n("🛡️ File dialog UNBLOCKED in MAIN WORLD")}async function Ve(e,t){n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const o=await gn(e),s=un(o,t);n(`ขนาดไฟล์: ${(s.size/1024).toFixed(1)} KB`);const a=qt();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`),n("── ขั้นตอน 1: คลิกปุ่ม '+' (Create) ──"),await ht();const p=zt();p&&(p.focus(),await u(500));let i=null;for(let r=0;r<15&&(i=mn(),!i);r++){if(await u(1e3),r%3===0){const d=zt();d&&d.focus()}n(`⏳ รอปุ่ม '+' บน Prompt Bar... (${r+1}/15)`)}if(!i)return R("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;i.click(),n("คลิกปุ่ม '+' (Create) ✅"),await u(1500),n("── ขั้นตอน 2: หาและคลิกปุ่ม 'Upload image' ──");const l=await ze(i,5e3);if(!l){R("ไม่พบปุ่ม 'Upload image' ใน Dialog — ลอง pointer events สำหรับปุ่ม '+'");const r=i.getBoundingClientRect(),d=r.left+r.width/2,h=r.top+r.height/2,g={bubbles:!0,cancelable:!0,clientX:d,clientY:h,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",g)),await u(80),i.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",g)),i.dispatchEvent(new MouseEvent("click",g)),await u(1500);const v=await ze(i,3e3);return v?await qe(v,s,t,a):(R("❌ ไม่พบปุ่ม Upload image หลังจากลองทั้ง 2 วิธี"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),!1)}return await qe(l,s,t,a)}async function qe(e,t,o,s){var r;n("── ขั้นตอน 3: บล็อค file dialog + คลิก Upload + ฉีดไฟล์ ──"),await hn();try{document.querySelectorAll("[data-netflow-captured]").forEach(d=>d.removeAttribute("data-netflow-captured")),e.click(),n("คลิกปุ่ม 'Upload image' ✅"),await u(800)}finally{bn()}let a=document.querySelector('input[type="file"][data-netflow-captured]');if(a&&n(`🎯 พบ captured file input จาก main world: accept="${a.accept}"`),a||(a=wn()||document.querySelector('input[type="file"]')),!a)return R("ไม่พบ file input หลังคลิก Upload — ลอง direct drag-drop"),await xn(t,s);const p=new DataTransfer;p.items.add(t),a.files=p.files,n(`ฉีดไฟล์ ${o} เข้า file input (${((r=a.files)==null?void 0:r.length)??0} ไฟล์)`);const i=a._valueTracker;i&&(i.setValue(""),n("รีเซ็ต React _valueTracker")),a.dispatchEvent(new Event("change",{bubbles:!0})),n("ส่ง change event ✅ (single event เพื่อป้องกันรูปซ้ำ)"),n("── ขั้นตอน 4: รอยืนยันรูปย่อ ──");const l=Date.now();for(;Date.now()-l<15e3;){const d=qt();if(d>s)return n(`✅ สำเร็จ: รูปย่อเพิ่มจาก ${s} → ${d}`),!0;const h=document.querySelectorAll("span, div, p");for(const g of h){const v=(g.textContent||"").trim();if(/^\d{1,2}%$/.test(v)){n(`กำลังอัพโหลด: ${v}`);break}}await u(1e3)}return R(`❌ อัพโหลด ${o} ไม่สำเร็จ — ไม่พบรูปย่อภายใน 15 วินาที`),!1}function wn(){const e=document.querySelectorAll('input[type="file"][accept*="image"]');if(e.length>0)return e[e.length-1];const t=document.querySelectorAll('input[type="file"]');return t.length>0?t[t.length-1]:null}async function xn(e,t){n("── Fallback: drag-and-drop ลงบน workspace ──");const o=new DataTransfer;o.items.add(e);let s=null;const a=document.querySelectorAll('[class*="workspace"], [class*="drop"], [class*="media"], main, [role="main"]');for(const h of a){const g=h.getBoundingClientRect();if(g.width>200&&g.height>200){s=h;break}}s||(s=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)||document.body);const p=s.getBoundingClientRect(),i=p.left+p.width/2,l=p.top+p.height/2,r={bubbles:!0,cancelable:!0,clientX:i,clientY:l,dataTransfer:o};s.dispatchEvent(new DragEvent("dragenter",r)),await u(100),s.dispatchEvent(new DragEvent("dragover",r)),await u(100),s.dispatchEvent(new DragEvent("drop",r)),n(`ส่ง drag-drop ลง <${s.tagName}>`);const d=Date.now();for(;Date.now()-d<8e3;){if(qt()>t)return n("✅ drag-drop สำเร็จ — พบรูปย่อใหม่"),!0;await u(1e3)}return R("❌ drag-drop ล้มเหลว — ไม่พบรูปย่อใหม่"),!1}async function yn(e,t){var $,O;n("=== ขั้น 0: ตั้งค่า Flow ===");let o=null;for(let P=0;P<10;P++){const T=document.querySelectorAll("button, div, span, [role='button']");for(const f of T){const b=(f.textContent||"").trim();if(!(b.length>80)&&!(b.includes("ดาวน์โหลด")||b.includes("Download")||b.includes("download"))&&!(b.length>30)&&(b.includes("Nano Banana")||b.includes("Imagen")||b.includes("วิดีโอ")||b.includes("รูปภาพ")||b.includes("Image")||b.includes("Video"))){const A=f.getBoundingClientRect();A.bottom>window.innerHeight*.7&&A.width>30&&A.height>10&&(!o||(f.textContent||"").length<(o.textContent||"").length)&&(o=f)}}if(o){n(`พบปุ่มตั้งค่าจากข้อความ: "${(o.textContent||"").substring(0,40).trim()}"`);break}const x=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons, .material-symbols-rounded, span[class*='material'], span[class*='icon'], i");for(const f of x){const b=(($=f.textContent)==null?void 0:$.trim())||"";if(b.includes("crop")||b==="aspect_ratio"||b==="photo_size_select_large"){const A=f.closest("button, div[role='button'], [role='button']")||f.parentElement;if(A){const m=A.getBoundingClientRect();if(m.bottom>window.innerHeight*.7&&m.width>0){o=A,n(`พบปุ่มตั้งค่าจากไอคอน: ${b}`);break}}}}if(o)break;for(const f of T){const b=(f.textContent||"").trim();if(!(b.length>40)&&/x[1-4]/.test(b)&&(b.includes("วิดีโอ")||b.includes("รูปภาพ")||b.includes("Video")||b.includes("Image"))){const A=f.getBoundingClientRect();if(A.bottom>window.innerHeight*.7&&A.width>30){o=f,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${b.substring(0,40)}"`);break}}}if(o)break;n(`⏳ รอปุ่มตั้งค่า... (${P+1}/10)`),await u(1e3)}if(!o)return R("ไม่พบปุ่มตั้งค่า (หมด 10 รอบ)"),!1;const s=["Video","Image","วิดีโอ","รูปภาพ","Nano Banana","Imagen"],a=P=>{const T=(P.textContent||"").trim();return T.length>40||T.includes("ดาวน์โหลด")||T.includes("Download")||T.includes("download")?!1:s.some(x=>T.includes(x))},p=[];p.push(o);const i=o.closest("button");i&&i!==o&&a(i)&&(p.unshift(i),n(`ปุ่มตั้งค่า: parent <button> "${(i.textContent||"").trim().substring(0,30)}"`));const l=o.closest('[role="button"]');l&&l!==o&&l!==i&&a(l)&&(p.unshift(l),n(`ปุ่มตั้งค่า: parent [role=button] "${(l.textContent||"").trim().substring(0,30)}"`));let r=o;for(let P=0;P<3&&r;P++)r=r.parentElement,r&&a(r)&&!p.includes(r)&&p.push(r);const d=()=>document.querySelectorAll('[data-radix-portal], [data-radix-popper-content-wrapper], [role="dialog"], [role="menu"], [role="listbox"]').length;let h=!1,g=p[0];for(const P of p){const T=d();n(`ลองคลิกตั้งค่า: <${P.tagName}> "${(P.textContent||"").trim().substring(0,30)}"`),await Z(P),await u(2500);const x=d(),f=!!document.querySelector('[role="tab"]');if(x>T||f){h=!0,g=P,n(`✅ Popover เปิดแล้ว (portals: ${T}→${x}, tabs: ${f})`);break}n(`❌ ไม่มี popover เปิด (portals: ${T}→${x}) — ลองตัวถัดไป`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500)}h||(n("⚠️ Popover ไม่เปิดจากการคลิก — ลองคลิกปุ่มตั้งค่าอีกครั้งพร้อมรอนานขึ้น (Mac)"),await Z(g),await u(5e3));let v=!1,D=null;for(let P=0;P<3&&!D;P++){P>0&&(n(`⏳ ลองหาแท็บ Image อีกครั้ง (${P+1}/3)...`),await Z(g),await u(2e3));const T=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"], [class*="tab_slider_trigger"][role="tab"]');for(const x of T){const f=x.getAttribute("aria-controls")||"",b=x.id||"";if(f.toUpperCase().includes("IMAGE")||b.toUpperCase().includes("IMAGE")){D=x,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${f})`);break}}if(!D)for(const x of document.querySelectorAll('[role="tab"]')){const f=x.id||"";if(f.toUpperCase().includes("IMAGE")){D=x,n(`พบแท็บ Image ผ่าน id: ${f}`);break}}if(!D)for(const x of document.querySelectorAll('[role="tab"]')){const f=x.getAttribute("aria-label")||((O=x.textContent)==null?void 0:O.trim())||"";if(f.toLowerCase().includes("image")||f.includes("รูปภาพ")){D=x,n(`พบแท็บ Image ผ่าน accessible name: "${f.substring(0,30)}"`);break}}if(!D)for(const x of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const f=(x.textContent||"").trim();if(!(f.length>30)&&(f==="Image"||f.endsWith("Image")||f==="รูปภาพ"||f==="ภาพ"||f.includes("รูปภาพ"))&&!f.includes("Video")&&!f.includes("วิดีโอ")){const b=x.getBoundingClientRect();if(b.width>0&&b.height>0){D=x,n(`พบแท็บ Image ผ่านข้อความ: "${f}"`);break}}}if(!D)for(const x of document.querySelectorAll('[data-radix-portal], [data-radix-popper-content-wrapper], [role="dialog"], [role="menu"]')){for(const f of x.querySelectorAll('button, [role="tab"]')){const b=(f.textContent||"").trim().toLowerCase();if((b==="image"||b.includes("image"))&&!b.includes("video")){D=f,n(`พบแท็บ Image ใน Radix portal: "${b}"`);break}}if(D)break}D||await u(1e3)}if(D){const P=D.getAttribute("data-state")||"",T=D.getAttribute("aria-selected")||"";P==="active"||T==="true"?(v=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก")):(await Z(D),v=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await u(400))}if(!v&&!D){n("⚠️ ลองสลับโหมดด้วยวิธีตรง..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500);const P=document.querySelectorAll("button, div, span, [role='button'], [role='tab']"),T=[];for(const x of P){const f=(x.textContent||"").trim();if(f.length>40||!f.includes("Video")&&!f.includes("วิดีโอ"))continue;const b=x.getBoundingClientRect();!Q()&&(b.bottom<window.innerHeight*.7||b.width<10||b.height<8)||T.push(x)}T.sort((x,f)=>(x.textContent||"").length-(f.textContent||"").length);for(const x of T){n(`Fallback 6: คลิก "${(x.textContent||"").trim().substring(0,30)}" <${x.tagName}>`);const f=[x],b=x.closest("button, [role='button']");b&&b!==x&&f.push(b),x.parentElement&&f.push(x.parentElement);for(const A of f){await Z(A),await u(2500);const m=document.querySelectorAll('[role="option"], [role="menuitem"], [role="tab"], [role="radio"], button, div, span');for(const y of m){const w=(y.textContent||"").trim();if(!(w.length>20)&&(w==="Image"||w==="รูปภาพ"||w==="ภาพ"||w.endsWith("Image"))&&!w.includes("Video")&&!w.includes("วิดีโอ")&&(y.getBoundingClientRect().width>0||Q())){await Z(y),v=!0,n(`✅ สลับเป็น Image ผ่าน Fallback 6: "${w}"`),await u(500);break}}if(v)break;document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300)}if(v)break}}v||R("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว หรือต้องสลับด้วยตนเอง");const L=e==="horizontal"?"แนวนอน":"แนวตั้ง",I=e==="horizontal"?"landscape":"portrait";for(const P of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const T=(P.textContent||"").trim();if(!(T.length>30)&&(T===L||T.includes(L)||T.toLowerCase()===I||T.toLowerCase().includes(I))){const x=P.getBoundingClientRect(),f={bubbles:!0,cancelable:!0,clientX:x.left+x.width/2,clientY:x.top+x.height/2,button:0};P.dispatchEvent(new PointerEvent("pointerdown",{...f,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mousedown",f)),await u(80),P.dispatchEvent(new PointerEvent("pointerup",{...f,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mouseup",f)),P.dispatchEvent(new MouseEvent("click",f)),n(`เลือกทิศทาง: ${L}`),await u(400);break}}const c=`x${t}`;for(const P of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const T=(P.textContent||"").trim();if(!(T.length>10)&&(T===c||T===`${t}`)){const x=P.getBoundingClientRect(),f={bubbles:!0,cancelable:!0,clientX:x.left+x.width/2,clientY:x.top+x.height/2,button:0};P.dispatchEvent(new PointerEvent("pointerdown",{...f,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mousedown",f)),await u(80),P.dispatchEvent(new PointerEvent("pointerup",{...f,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mouseup",f)),P.dispatchEvent(new MouseEvent("click",f)),n(`เลือกจำนวน: ${c}`),await u(400);break}}return await u(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),await Z(g),n("ปิดหน้าตั้งค่าแล้ว"),await u(600),!0}async function vn(e){const t=e==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",o=e==="quality"?"Quality":"Fast",s=e==="quality"?"Fast":"Quality",a=e==="quality"?"คุณภาพ":"เร็ว",p=e==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${t} (${a}) ===`);let i=null;const l=Date.now()+1e4;for(;!i&&Date.now()<l;){const I=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const c of I){const $=(c.textContent||"").trim();if(!($.length>80)&&($.includes("Veo")||$.includes("veo"))&&(c.hasAttribute("aria-haspopup")||c.hasAttribute("aria-expanded")||c.getAttribute("role")==="combobox"||$.includes("arrow_drop_down")||c.querySelector("svg"))){i=c,n(`พบปุ่ม Veo dropdown (Strategy A): "${$.substring(0,50).trim()}"`);break}}if(!i)for(const c of I){const $=(c.textContent||"").trim();if(!($.length>80)&&($.includes("Veo")||$.includes("veo"))){const O=c.getBoundingClientRect();if(O.width>0&&O.height>0){i=c,n(`พบปุ่ม Veo dropdown (Strategy B): "${$.substring(0,50).trim()}"`);break}}}if(!i)for(const c of I){const $=(c.textContent||"").trim();if(!($.length>50)&&($.includes("Fast")||$.includes("Quality")||$.includes("เร็ว")||$.includes("คุณภาพ"))&&(c.hasAttribute("aria-haspopup")||c.hasAttribute("aria-expanded")||c.querySelector("svg"))){i=c,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${$.substring(0,50).trim()}"`);break}}if(!i){const c=document.querySelectorAll("div, span, button, [role='button']");for(const $ of c){const O=($.textContent||"").trim();if(O==="Veo 3.1 - Fast"||O==="Veo 3.1 - Quality"||O==="Fast"||O==="Quality"||O==="Veo 3.1 - เร็ว"||O==="Veo 3.1 - คุณภาพสูง"||O==="Veo 3.1 - คุณภาพ"||O==="Veo 2 - Fast"||O==="Veo 2 - Quality"){const P=$.getBoundingClientRect();if(P.width>0&&P.height>0){i=$,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${O}"`);break}}}}if(!i){const c=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const $ of c){const O=($.textContent||"").trim();if(!(O.length>60)&&(O.includes("3.1")||O.includes("model")||O.includes("โมเดล"))){const P=$.getBoundingClientRect();if(P.bottom>window.innerHeight*.4&&P.width>0&&P.height>0){i=$,n(`พบปุ่ม model selector (Strategy E): "${O.substring(0,50).trim()}"`);break}}}}i||await u(1e3)}if(!i)return R("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const r=(i.textContent||"").trim();if(r.includes(t)||r.includes(o)&&!r.includes(s)||r.includes(a)&&!r.includes(p))return n(`✅ Veo quality เป็น "${r}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const d=i.getBoundingClientRect(),h=d.left+d.width/2,g=d.top+d.height/2,v={bubbles:!0,cancelable:!0,clientX:h,clientY:g,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",v)),await u(80),i.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",v)),i.dispatchEvent(new MouseEvent("click",v)),n("คลิกเปิด Veo quality dropdown"),await u(1e3);let D=!1;const L=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const I of L){const c=(I.textContent||"").trim();if((c===t||c===o||c.includes(t)||c.includes(a))&&!c.includes("arrow_drop_down")){const O=I.getBoundingClientRect();if(O.width>0&&O.height>0){const P=O.left+O.width/2,T=O.top+O.height/2,x={bubbles:!0,cancelable:!0,clientX:P,clientY:T,button:0};I.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mousedown",x)),await u(80),I.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mouseup",x)),I.dispatchEvent(new MouseEvent("click",x)),n(`✅ เลือก "${c}" สำเร็จ`),D=!0;break}}}return D?(await u(600),!0):(R(`ไม่พบตัวเลือก "${t}" หรือ "${a}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),document.body.click(),!1)}async function $n(e){var O,P,T,x;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,o=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),s=o?o[1]:"unknown",a=Y?"macOS":re?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",p=Y?((P=(O=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:O[1])==null?void 0:P.replace(/_/g,"."))||"":re&&((T=t.match(/Windows NT ([0-9.]+)/))==null?void 0:T[1])||"",i=navigator.language||"unknown",l=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${a} ${p} | Chrome ${s}`),n(`🌐 ภาษา: ${i} | หน้าจอ: ${l} | แพลตฟอร์ม: ${De}`),n("══════════════════════════════════════════");try{Ht(e.theme)}catch{}try{Zt(e.sceneCount||1)}catch(f){console.warn("Overlay show error:",f)}const r=[],d=[];if(e.needsNewProject){try{M("open-flow","done"),M("new-project","active"),n("=== สร้างโปรเจคใหม่ ===");let f=null;for(let b=0;b<15;b++){const A=document.querySelectorAll("button, [role='button']");for(const m of A){const y=(m.textContent||"").trim().toLowerCase();if(y.includes("new project")||y.includes("สร้างโปรเจค")||y.includes("โปรเจกต์ใหม่")){f=m;break}}if(!f){const m=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], i[class*='material'], span[class*='material'], span[class*='icon'], span[class*='google-symbols'], i");for(const y of m)if((y.textContent||"").trim()==="add_2"){const w=y.closest("button");if(w){f=w;break}}if(!f){const y=bt("add_2");y.length>0&&(f=y[0])}}if(f)break;n(`⏳ รอปุ่ม New Project... (${b+1}/15)`),await u(1e3)}if(f){n(`✅ พบปุ่ม New Project: "${(f.textContent||"").trim().substring(0,30)}"`),await Z(f),await u(500),await Z(f),await u(2e3);let b=!1;for(let A=0;A<30;A++){const m=window.location.pathname.includes("/project/"),y=!!document.querySelector('[data-slate-editor="true"]');if(m&&y){n("✅ ตรวจพบหน้า Workspace (Project URL + Slate Editor)"),await u(2e3),b=!0;break}else if(y&&!window.location.pathname.endsWith("/")){n("✅ ตรวจพบหน้า Workspace (Slate Editor)"),await u(2e3),b=!0;break}await u(500)}n(b?"✅ Workspace พร้อมแล้ว":"⚠️ Workspace อาจยังไม่โหลดเสร็จ — ดำเนินการต่อ"),M("new-project","done"),r.push("✅ New Project")}else R("ไม่พบปุ่ม New Project — อาจอยู่ใน workspace แล้ว ดำเนินการต่อ"),M("new-project","skipped"),r.push("⚠️ New Project (skipped)")}catch(f){R(`New Project error: ${f.message}`),M("new-project","error"),r.push("⚠️ New Project")}await u(3e3)}else{try{M("open-flow","skipped")}catch{}try{M("new-project","skipped")}catch{}await u(3e3)}try{M("settings","active");const f=e.orientation||"vertical",b=e.outputCount||1,A=await yn(f,b);r.push(A?"✅ Settings":"⚠️ Settings"),M("settings",A?"done":"error")}catch(f){R(`ตั้งค่าผิดพลาด: ${f.message}`),r.push("⚠️ Settings"),M("settings","error")}try{const f=e.veoQuality||"fast";await vn(f)?(r.push(`✅ Veo ${f}`),n(`✅ Veo quality: ${f}`)):(r.push("⚠️ Veo quality"),R("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(f){R(`Veo quality error: ${f.message}`),r.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),document.body.click(),await u(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const h=()=>{const f=document.querySelectorAll("span, div, p, label");for(const b of f){const A=(b.textContent||"").trim();if(/^\d{1,3}%$/.test(A)){if(A==="100%")return null;const m=b.getBoundingClientRect();if(m.width>0&&m.height>0&&m.top>0&&m.top<window.innerHeight)return A}}return null},g=async f=>{n(`รอการอัพโหลด ${f} เสร็จ...`),await u(2e3);const b=Date.now(),A=6e4;let m="",y=Date.now();const w=15e3;for(;Date.now()-b<A;){const E=h();if(E){if(E!==m)m=E,y=Date.now(),n(`กำลังอัพโหลด: ${E} — รอ...`);else if(Date.now()-y>w){n(`✅ อัพโหลด ${f} — % ค้างที่ ${E} นาน ${w/1e3} วินาที ถือว่าเสร็จ`),await u(1e3);return}await u(1500)}else{n(`✅ อัพโหลด ${f} เสร็จ — ไม่พบตัวบอก %`),await u(1e3);return}}R(`⚠️ อัพโหลด ${f} หมดเวลาหลัง ${A/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){M("upload-char","active");try{const f=await Ve(e.characterImage,"character.png");r.push(f?"✅ ตัวละคร":"⚠️ ตัวละคร"),f||d.push("character upload failed"),M("upload-char",f?"done":"error")}catch(f){R(`อัพโหลดตัวละครผิดพลาด: ${f.message}`),r.push("❌ ตัวละคร"),d.push("character upload error"),M("upload-char","error")}await g("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500)}else _t("upload-char");if(e.productImage){M("upload-prod","active");try{const f=await Ve(e.productImage,"product.png");r.push(f?"✅ สินค้า":"⚠️ สินค้า"),f||d.push("product upload failed"),M("upload-prod",f?"done":"error")}catch(f){R(`อัพโหลดสินค้าผิดพลาด: ${f.message}`),r.push("❌ สินค้า"),d.push("product upload error"),M("upload-prod","error")}await g("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500)}else _t("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800);const v=h();v&&(n(`⚠️ อัพโหลดยังแสดง ${v} — รอเพิ่มเติม...`),await g("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await u(1e3);const D=(e.characterImage?1:0)+(e.productImage?1:0);if(D>0){let f=qt();f<D&&(n(`⏳ เห็นรูปย่อแค่ ${f}/${D} — รอ 3 วินาที...`),await u(3e3),f=qt()),f>=D?n(`✅ ยืนยันรูปย่ออ้างอิง: ${f}/${D}`):R(`⚠️ คาดว่าจะมี ${D} รูปย่อ แต่พบ ${f} — ดำเนินการต่อ`)}if(Et()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{Ot(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),M("img-prompt","active"),await u(1e3);const L=zt();L?(await Vt(L,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),r.push("✅ Prompt"),M("img-prompt","done")):(R("ไม่พบช่องป้อนข้อความ Prompt"),r.push("❌ Prompt"),d.push("prompt input not found"),M("img-prompt","error")),await u(800);const I=new Set;document.querySelectorAll("img").forEach(f=>{f.src&&I.add(f.src)}),n(`บันทึกรูปเดิม: ${I.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),M("img-generate","active"),await u(500);const c=ce();if(c){const f=c.getBoundingClientRect(),b=f.left+f.width/2,A=f.top+f.height/2,m={bubbles:!0,cancelable:!0,clientX:b,clientY:A,button:0};c.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",m)),await u(80),c.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",m)),c.dispatchEvent(new MouseEvent("click",m)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),r.push("✅ Generate"),await u(500),c.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",m)),await u(80),c.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",m)),c.dispatchEvent(new MouseEvent("click",m)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),M("img-generate","done")}else R("ไม่พบปุ่ม → Generate"),r.push("❌ Generate"),d.push("generate button not found"),M("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),M("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await u(15e3);const f=()=>{const w=document.querySelectorAll("div, span, p, label, strong, small");for(const E of w){if(E.closest("#netflow-engine-overlay"))continue;const N=(E.textContent||"").trim();if(N.length>10)continue;const k=N.match(/(\d{1,3})\s*%/);if(!k)continue;const C=parseInt(k[1],10);if(C<1||C>100)continue;if(Q())return C;const _=E.getBoundingClientRect();if(!(_.width===0||_.width>150)&&!(_.top<0||_.top>window.innerHeight))return C}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let b=null,A=-1,m=0;const y=Date.now();for(;!b&&Date.now()-y<18e4;){const w=document.querySelectorAll("img");for(const E of w){if(I.has(E.src)||!(E.alt||"").toLowerCase().includes("generated"))continue;if(Q()?E.naturalWidth>120&&E.naturalHeight>120:(()=>{const C=E.getBoundingClientRect();return C.width>120&&C.height>120&&C.top>0&&C.top<window.innerHeight*.85})()){const C=E.closest("div");if(C){b=C,n(`พบรูป AI จาก alt="${E.alt}": ${E.src.substring(0,80)}...${Q()?" (hidden-mode)":""}`);break}}}if(!b)for(const E of w){if(I.has(E.src))continue;const N=E.closest("div"),k=(N==null?void 0:N.textContent)||"";if(k.includes("product.png")||k.includes("character.png")||k.includes(".png")||k.includes(".jpg"))continue;if(Q()?E.naturalWidth>120&&E.naturalHeight>120:(()=>{const _=E.getBoundingClientRect();return _.width>120&&_.height>120&&_.top>0&&_.top<window.innerHeight*.85})()){const _=E.closest("div");if(_){b=_,n(`พบรูปใหม่ (สำรอง): ${E.src.substring(0,80)}...${Q()?" (hidden-mode)":""}`);break}}}if(!b){if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const E=m>0?Date.now()-m:1/0;if(A<20||E>3e4){const k=Fe();if(k){R(`❌ สร้างรูปล้มเหลว: ${k}`),d.push(`image gen failed: ${k}`),M("img-wait","error");break}}const N=f();if(N!==null)N!==A&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${N}%`),A=N,M("img-wait","active",N)),m=Date.now();else if(A>30){const k=Math.floor((Date.now()-m)/1e3);k>=3&&n(`🖼️ % หายที่ ${A}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&k>=5&&A>50&&(n("🍎 Tab ซ่อน + รูปน่าจะเสร็จ → เปิด tab เต็มเพื่อตรวจหารูป"),await ht(),await u(3e3))}document.hidden&&A>0&&Date.now()-m>1e4&&await kt(),document.hidden&&A<1&&Date.now()-y>3e4&&await kt(),await u(3e3)}}if(!b)R("หมดเวลารอรูปที่สร้าง"),r.push("⚠️ Wait Image"),M("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),r.push("✅ Image Found"),M("img-wait","done",100),await ht();const w=b.getBoundingClientRect(),E=w.left+w.width/2,N=w.top+w.height/2,k={bubbles:!0,cancelable:!0,clientX:E,clientY:N};b.dispatchEvent(new PointerEvent("pointerenter",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseenter",k)),b.dispatchEvent(new PointerEvent("pointerover",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseover",k)),b.dispatchEvent(new PointerEvent("pointermove",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousemove",k)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await u(1500);let C=null;for(const _ of["more_vert","more_horiz","more"]){const U=bt(_);for(const S of U){const B=S.getBoundingClientRect();if(B.top>=w.top-20&&B.top<=w.bottom&&B.right>=w.right-150&&B.right<=w.right+20){C=S;break}}if(C)break}if(!C){const _=document.querySelectorAll("button");for(const U of _){const S=U.getBoundingClientRect();if(S.width<50&&S.height<50&&S.top>=w.top-10&&S.top<=w.top+60&&S.left>=w.right-80){const B=U.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const V of B)if((((x=V.textContent)==null?void 0:x.trim())||"").includes("more")){C=U;break}if(C)break;const z=U.getAttribute("aria-label")||"";if(z.includes("เพิ่มเติม")||z.includes("more")){C=U;break}}}}if(!C)R("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),r.push("⚠️ 3-dots");else{const _=C.getBoundingClientRect(),U=_.left+_.width/2,S=_.top+_.height/2,B={bubbles:!0,cancelable:!0,clientX:U,clientY:S,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",B)),await u(80),C.dispatchEvent(new PointerEvent("pointerup",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",B)),C.dispatchEvent(new MouseEvent("click",B)),n("คลิกปุ่ม 3 จุดแล้ว"),await u(1500);let z=null;const V=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const G of V){const F=(G.textContent||"").trim();if(F.includes("ทำให้เป็นภาพเคลื่อนไหว")||F.includes("Animate")||F.includes("animate")){z=G;break}}if(!z)R("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),r.push("⚠️ Animate");else{const G=z.getBoundingClientRect(),F=G.left+G.width/2,K=G.top+G.height/2,H={bubbles:!0,cancelable:!0,clientX:F,clientY:K,button:0};z.dispatchEvent(new PointerEvent("pointerdown",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mousedown",H)),await u(80),z.dispatchEvent(new PointerEvent("pointerup",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mouseup",H)),z.dispatchEvent(new MouseEvent("click",H)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),r.push("✅ Animate"),M("animate","done"),await u(3e3)}}}}catch(f){R(`ขั้น 4 ผิดพลาด: ${f.message}`),r.push("⚠️ Animate")}if(Et()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{Ot(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),M("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await u(3e3);let f=!1;const b=document.querySelectorAll("button, span, div");for(const w of b){const E=(w.textContent||"").trim(),N=w.getBoundingClientRect();if((E==="วิดีโอ"||E==="Video"||E.includes("วิดีโอ"))&&N.bottom>window.innerHeight*.7){f=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}f||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let A=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise(E=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>E())),A=!0;const w=Date.now();for(;document.hidden&&Date.now()-w<5e3;)await u(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await u(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await u(1e3);let m=!1;for(let w=1;w<=5&&!m;w++){if(w>1&&document.hidden){n(`🔄 Retry ${w}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(C=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>C())),A=!0;const k=Date.now();for(;document.hidden&&Date.now()-k<5e3;)await u(200);document.hidden||await u(2e3)}catch{}}const E=zt();if(!E){n(`⚠️ ครั้งที่ ${w}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await u(3e3);continue}w>1&&(E.focus(),await u(500)),await Vt(E,e.videoPrompt),await u(500);const N=(E.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();N.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${w} (${N.length} ตัวอักษร)`),r.push("✅ Video Prompt"),M("vid-prompt","done"),m=!0):(n(`⚠️ ครั้งที่ ${w}: Prompt ไม่ถูกวาง (ได้ ${N.length} ตัวอักษร)`),await u(1500))}if(!m)throw R("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),r.push("❌ Video Prompt"),d.push("video prompt paste failed after 5 attempts"),M("vid-prompt","error"),new Error("Video prompt paste failed");await u(1e3),M("vid-generate","active");const y=ce();if(y){const w=y.getBoundingClientRect(),E=w.left+w.width/2,N=w.top+w.height/2,k={bubbles:!0,cancelable:!0,clientX:E,clientY:N,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",k)),await u(80),y.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",k)),y.dispatchEvent(new MouseEvent("click",k)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),r.push("✅ Video Generate"),M("vid-generate","done"),await u(500),y.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",k)),await u(80),y.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",k)),y.dispatchEvent(new MouseEvent("click",k)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else R("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),r.push("❌ Video Generate"),d.push("video generate button not found"),M("vid-generate","error");if(A){await u(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(f){R(`ขั้น 5 ผิดพลาด: ${f.message}`),r.push("⚠️ Video Gen"),d.push(`video gen error: ${f.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),_t("animate"),_t("vid-prompt"),_t("vid-generate"),_t("vid-wait");if(e.videoPrompt){M("vid-wait","active");const f=e.sceneCount||1,b=e.videoScenePrompts||[e.videoPrompt];if(f>1)try{rn(f)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${f>1?`ต่อ ${f} ฉาก`:"ดาวน์โหลด"} ===`);const A=()=>{const w=document.querySelectorAll("div, span, p, label, strong, small");for(const E of w){if(E.closest("#netflow-engine-overlay"))continue;const N=(E.textContent||"").trim();if(N.length>10)continue;const k=N.match(/(\d{1,3})\s*%/);if(!k)continue;const C=parseInt(k[1],10);if(C<1||C>100)continue;if(Q())return C;const _=E.getBoundingClientRect();if(!(_.width===0||_.width>150)&&!(_.top<0||_.top>window.innerHeight))return C}return null},m=async(w=6e5)=>{n("รอการสร้างวิดีโอ..."),M("vid-wait","active"),await u(5e3);const E=()=>{const j=document.querySelectorAll("div, span, p, label, strong, small");let X=0;for(const ot of j){if(ot.closest("#netflow-engine-overlay"))continue;const W=(ot.textContent||"").trim();if(W.includes("%")&&W.length<15){const at=ot.tagName.toLowerCase(),it=ot.className&&typeof ot.className=="string"?ot.className.split(/\s+/).slice(0,2).join(" "):"",tt=ot.getBoundingClientRect();if(n(`  🔍 "${W}" ใน <${at}.${it}> ที่ (${tt.left.toFixed(0)},${tt.top.toFixed(0)}) w=${tt.width.toFixed(0)}`),X++,X>=5)break}}X===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},N=async(j,X)=>{n(`🔄 Policy Retry ${X}/2 — สร้าง Safe Prompt แล้วลองใหม่...`),await ht(),await u(2e3);const ot=zt();if(!ot)return R("❌ Retry: ไม่พบช่อง Prompt"),!1;ot.focus(),await u(300);const W=window.getSelection();W&&W.selectAllChildren(ot),await u(200),ot.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"deleteContentBackward"})),ot.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"deleteContentBackward"})),await u(500);let at=dn(j);X>=2&&(at=at.substring(0,600).replace(/\s\S*$/,"").trim(),n(`🛡️ 2nd retry: ultra-short prompt (${at.length} chars)`)),await Vt(ot,at),await u(500);const it=(ot.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(it.length<20)return R(`❌ Retry: วาง Safe Prompt ไม่สำเร็จ (${it.length} ตัวอักษร)`),!1;n(`✅ วาง Safe Prompt สำเร็จ (${it.length} ตัวอักษร)`),await u(500);const tt=ce();if(!tt)return R("❌ Retry: ไม่พบปุ่ม Generate"),!1;const ut=tt.getBoundingClientRect(),xt=ut.left+ut.width/2,Ut=ut.top+ut.height/2,Gt={bubbles:!0,cancelable:!0,clientX:xt,clientY:Ut,button:0};return tt.dispatchEvent(new PointerEvent("pointerdown",{...Gt,pointerId:1,isPrimary:!0,pointerType:"mouse"})),tt.dispatchEvent(new MouseEvent("mousedown",Gt)),await u(80),tt.dispatchEvent(new PointerEvent("pointerup",{...Gt,pointerId:1,isPrimary:!0,pointerType:"mouse"})),tt.dispatchEvent(new MouseEvent("mouseup",Gt)),tt.dispatchEvent(new MouseEvent("click",Gt)),n(`✅ คลิก Generate สำหรับ Safe Retry ${X}`),await u(5e3),!0},k=le();n(k?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),E();const C=Date.now();let _=-1,U=0,S=!1,B=0;const z=2;for(;Date.now()-C<w;){const j=A();if(j!==null){if(j!==_&&(n(`ความคืบหน้าวิดีโอ: ${j}%`),_=j,M("vid-wait","active",j)),U=Date.now(),j>=100){n("✅ ตรวจพบ 100%!"),S=!0;break}}else if(_>30){const X=Math.floor((Date.now()-U)/1e3);if(X>=5){n(`✅ % หายไปที่ ${_}% (หาย ${X} วินาที) — วิดีโอเสร็จ!`),S=!0;break}n(`⏳ % หายที่ ${_}% — ยืนยันใน ${5-X} วินาที...`)}else{const X=Math.floor((Date.now()-C)/1e3);X%15<3&&n(`⏳ รอ... (${X} วินาที) ไม่พบ %`)}if(!S&&_>0&&le(!0)&&!k){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${_}% — วิดีโอเสร็จ!`),S=!0;break}if(Et())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(_<1){const X=Fe();if(X){if(R(`❌ สร้างวิดีโอล้มเหลว: ${X}`),B<z&&e.videoPrompt)if(B++,n(`🔄 Policy violation detected — attempting safe retry ${B}/${z}...`),await N(e.videoPrompt,B)){_=-1,U=0,n(`✅ Safe retry ${B} started — continuing to monitor...`);continue}else R(`❌ Safe retry ${B} failed to start`);return null}}document.hidden&&_>0&&Date.now()-U>1e4&&await kt(),document.hidden&&_<1&&Date.now()-C>3e4&&await kt(),await u(3e3)}await ht();let V=null;for(let j=1;j<=10&&(V=le(),!V);j++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${j}/10)`),j%3===0&&await ht(),await u(3e3);if(!V)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),M("vid-wait","error"),null;const G=V;S?(M("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await u(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const F=G.getBoundingClientRect();let K=F.left+F.width/2,H=F.top+F.height/2,J=G;const lt=G.querySelector("video, img, canvas");if(lt){const j=lt.getBoundingClientRect();j.width>50&&j.height>50&&(K=j.left+j.width/2,H=j.top+j.height/2,J=lt,n(`🎯 พบรูปย่อ <${lt.tagName.toLowerCase()}> ในการ์ดที่ (${K.toFixed(0)},${H.toFixed(0)}) ${j.width.toFixed(0)}x${j.height.toFixed(0)}`))}else H=F.top+F.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${K.toFixed(0)},${H.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${K.toFixed(0)}, ${H.toFixed(0)})...`),Ft(J);for(let j=0;j<8;j++){const X={bubbles:!0,cancelable:!0,clientX:K+j%2,clientY:H};J.dispatchEvent(new PointerEvent("pointermove",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousemove",X)),await u(500)}try{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"mute_video",sceneCount:f,scenePrompts:b,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${f} ฉาก, ${b.length} prompts, theme: ${e.theme})`)}catch(j){n(`⚠️ ไม่สามารถบันทึก pending action: ${j.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await y(J),n("✅ คลิกการ์ดวิดีโอเสร็จ"),G},y=async w=>{const E=w.getBoundingClientRect(),N=E.left+E.width/2,k=E.top+E.height/2,C={bubbles:!0,cancelable:!0,clientX:N,clientY:k,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",C)),await u(80),w.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",C)),w.dispatchEvent(new MouseEvent("click",C)),await u(50),w.click(),n("คลิกการ์ดวิดีโอแล้ว"),await u(2e3)};try{if(!await m())R("หมดเวลารอการสร้างวิดีโอ"),r.push("⚠️ Video Wait"),M("vid-wait","error");else{r.push("✅ Video Complete"),M("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await u(3e3);const E=await new Promise(N=>{chrome.storage.local.get(mt(),k=>{if(chrome.runtime.lastError){N(null);return}N((k==null?void 0:k[mt()])||null)})});E&&!E._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(mt()),E.action==="mute_video"?await Ue(E.sceneCount||1,E.scenePrompts||[],E.theme):E.action==="wait_scene_gen_and_download"&&await Ge(E.sceneCount||2,E.currentScene||2,E.theme,E.scenePrompts||[]))}}catch(w){R(`ขั้น 6 ผิดพลาด: ${w.message}`),r.push("⚠️ Step6"),d.push(`step 6: ${w.message}`)}}const $=d.length===0;try{Ot($?5e3:8e3)}catch(f){console.warn("Overlay complete error:",f)}return{success:$,message:$?`สำเร็จ! ${r.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${r.join(" → ")} | ${d.join(", ")}`,step:$?"done":"partial"}}async function Ue(e,t=[],o){var P;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{o&&Ht(o)}catch{}try{Zt(e)}catch(T){n(`⚠️ showOverlay error: ${T.message}`)}try{const T=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const x of T)M(x,"done");e>=2&&M("scene2-prompt","active"),n(`✅ overlay restored: ${T.length} steps done, sceneCount=${e}`)}catch(T){n(`⚠️ overlay restore error: ${T.message}`)}await u(1500);const s=(()=>{for(const T of document.querySelectorAll("button")){const x=T.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const b of x){const A=(b.textContent||"").trim();if(A==="volume_up"||A==="volume_off"||A==="volume_mute"){const m=T.getBoundingClientRect();if(m.width>0&&m.height>0)return T}}const f=(T.getAttribute("aria-label")||"").toLowerCase();if(f.includes("mute")||f.includes("ปิดเสียง")){const b=T.getBoundingClientRect();if(b.width>0&&b.height>0)return T}}return null})();s?(s.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let a=null;if(e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await u(2e3);for(let S=2;S<=e;S++){const B=t[S-1];if(!B){R(`ไม่พบ prompt สำหรับฉากที่ ${S}`);continue}n(`── ฉากที่ ${S}/${e}: วาง prompt + generate ──`);let z=null;const V=Date.now();for(;!z&&Date.now()-V<1e4;){const W=document.querySelectorAll("[data-slate-editor='true']");if(W.length>0&&(z=W[W.length-1]),!z){const at=document.querySelectorAll("[role='textbox'][contenteditable='true']");at.length>0&&(z=at[at.length-1])}z||await u(1e3)}if(!z){R("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${z.tagName.toLowerCase()}> ${z.className.substring(0,40)}`),await Vt(z,B),n(`วาง prompt ฉาก ${S} (${B.length} ตัวอักษร) ✅`);try{M(`scene${S}-prompt`,"done"),M(`scene${S}-gen`,"active")}catch{}await u(1e3);const G=z.getBoundingClientRect();let F=null,K=1/0;for(const W of document.querySelectorAll("button")){if(W.disabled)continue;const at=W.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let it=!1;for(const xt of at){const Ut=(xt.textContent||"").trim();if(Ut==="arrow_forward"||Ut==="send"||Ut==="arrow_upward"){it=!0;break}}if(!it)continue;const tt=W.getBoundingClientRect();if(tt.width<=0||tt.height<=0)continue;const ut=Math.abs(tt.top-G.top)+Math.abs(tt.right-G.right);ut<K&&(K=ut,F=W)}if(!F)for(const W of["arrow_forward","send","arrow_upward"]){const at=bt(W);for(const it of at)if(!it.disabled){const tt=it.getBoundingClientRect();if(tt.width>0&&tt.height>0){F=it;break}}if(F)break}if(!F)for(const W of document.querySelectorAll("button")){const at=W.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const it of at)if((it.textContent||"").trim()==="arrow_forward"){const tt=W.getBoundingClientRect();if(tt.width>0&&tt.height>0){F=W;break}}if(F)break}if(!F){R("ไม่พบปุ่ม Generate/Send");return}await new Promise(W=>{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:S,scenePrompts:t}},()=>W())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${S}/${e})`),await Z(F),n(`คลิก Generate ฉาก ${S} ✅`);try{M(`scene${S}-gen`,"done"),M(`scene${S}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${S} gen เสร็จ ──`),await u(5e3);let H=0,J=0;const lt=Date.now(),j=6e5,X=5e3;let ot=!1;for(;Date.now()-lt<j;){let W=null;const at=document.querySelectorAll("div, span, p, label, strong, small");for(const it of at){if(it.closest("#netflow-engine-overlay"))continue;const ut=(it.textContent||"").trim().match(/^(\d{1,3})%$/);if(ut){const xt=it.getBoundingClientRect();if(xt.width>0&&xt.height>0&&xt.width<120&&xt.height<60){W=parseInt(ut[1],10);break}}}if(W!==null){if(W!==H){n(`🎬 ฉาก ${S} ความคืบหน้า: ${W}%`),H=W;try{M(`scene${S}-wait`,"active",W)}catch{}}J=0}else if(H>0){if(J===0)J=Date.now(),n(`🔍 ฉาก ${S}: % หายไป (จาก ${H}%) — กำลังยืนยัน...`);else if(Date.now()-J>=X){n(`✅ ฉาก ${S}: % หายไป ${X/1e3} วินาที — เจนเสร็จ!`),ot=!0;break}}if(Et()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&H>0&&J===0&&await kt(),await u(2e3)}ot||R(`ฉาก ${S} หมดเวลา`),n(`✅ ฉาก ${S} เสร็จแล้ว`);try{M(`scene${S}-wait`,"done",100)}catch{}chrome.storage.local.remove(mt()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await u(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{M("download","active")}catch{}let T=!1;if(await ht()&&document.hidden===!1&&(T=!0),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(S=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>S())),T=!0,await u(Y?8e3:5e3)}catch{}}await u(Y?3e3:2e3);const f=Date.now();let b=null;const A=Date.now();for(;!b&&Date.now()-A<(Y?15e3:1e4);){const S=bt("download");for(const B of S){const z=B.getBoundingClientRect();if(z.width>0&&z.height>0){b=B;break}}if(!b)for(const B of document.querySelectorAll("button")){const z=B.querySelector("i, span[class*='icon'], span[class*='material']");if(z&&(z.textContent||"").trim()==="download"){const F=B.getBoundingClientRect();if(F.width>0&&F.height>0){b=B;break}}const V=(B.getAttribute("aria-label")||"").toLowerCase(),G=(B.getAttribute("title")||"").toLowerCase();if(V.includes("download")||V.includes("ดาวน์โหลด")||G.includes("download")||G.includes("ดาวน์โหลด")){const F=B.getBoundingClientRect();if(F.width>0&&F.height>0){b=B;break}}}b||await u(1e3)}if(!b){if(R("ไม่พบปุ่มดาวน์โหลด"),T)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await Z(b),n("คลิกดาวน์โหลดแล้ว ✅");try{M("download","done"),M("upscale","active")}catch{}await u(Y?3e3:1500);const m=(S,B)=>new Promise(async z=>{const V=Date.now();for(;Date.now()-V<B;){const G="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const F of document.querySelectorAll(G)){const K=(F.textContent||"").trim();if(K.includes(S)&&K.length<100){const H=F.getBoundingClientRect();if(H.width>0&&H.height>0){z(F);return}}}await u(500)}z(null)}),y=(S,B)=>new Promise(async z=>{const V=Date.now();for(;Date.now()-V<S;){const G="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const F of document.querySelectorAll(G)){const K=(F.textContent||"").trim();if(K.includes("720p")&&K.length<50){const J=F.getBoundingClientRect();if(J.width>0&&J.height>0){z(F);return}}const H=F.querySelectorAll("span");for(const J of H)if((J.textContent||"").trim()==="720p"){const lt=F.getBoundingClientRect();if(lt.width>0&&lt.height>0){z(F);return}}}B!=null&&B.isConnected&&Ft(B),await u(500)}z(null)});let w=null;for(let S=0;S<(Y?5:3)&&!w;S++){S>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${S+1}...`),b.isConnected&&(await Z(b),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await u(Y?3e3:2e3)));const B=await m("Full Video",Y?1e4:5e3);if(!B){R("ไม่พบ Full Video");continue}Ft(B),await u(Y?1e3:500),await Z(B),n("คลิก/hover Full Video ✅"),await u(Y?3e3:2e3),w=await y(Y?12e3:8e3,B)}if(!w){if(R("ไม่พบ 720p"),T)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await Z(w),n("คลิก 720p ✅"),T){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const E=Date.now();let N=!1,k=!1;for(;Date.now()-E<3e5;){for(const S of document.querySelectorAll("div[data-title] div, div[data-content] div")){const B=(S.textContent||"").trim();if(B==="Download complete!"||B==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),N=!0;break}(B.includes("Downloading your extended video")||B.includes("กำลังดาวน์โหลด"))&&(k||(k=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(N)break;if(k){let S=!1;for(const B of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((B.textContent||"").trim().includes("Downloading")){S=!0;break}if(!S){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),N=!0;break}}if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await u(2e3)}if(!N){R("เตรียมไฟล์หมดเวลา");return}try{M("upscale","done",100),M("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await u(5e3);let C=!1;const _=Date.now();for(;Date.now()-_<6e4&&!C;){try{await new Promise(S=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:f},B=>{chrome.runtime.lastError?R(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):B!=null&&B.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${B.message}`),C=!0,B.downloadUrl&&(a=B.downloadUrl,n(`[TikTok] จะใช้ download URL: ${B.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-_)/1e3)}s)`),S()})})}catch(S){R(`ตรวจสอบผิดพลาด: ${S.message}`)}C||await u(3e3)}C||R("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const U=await ie();a||(a=U);try{M("open","done"),Ot(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),ae(a),oe(2e3);return}if(n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await ht(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(T=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>T())),await u(Y?8e3:5e3)}catch{}}await u(Y?3e3:2e3);const p=(T,x="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const f of document.querySelectorAll(x)){const b=(f.textContent||"").trim();if(b.includes(T)&&b.length<100){const A=f.getBoundingClientRect();if(A.width>0&&A.height>0&&A.top>=0)return f}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let i=null;const l=Date.now();for(;!i&&Date.now()-l<(Y?15e3:1e4);){const T=bt("download");for(const x of T){const f=x.getBoundingClientRect();if(f.width>0&&f.height>0){i=x;break}}if(!i)for(const x of document.querySelectorAll("button, [role='button']")){const f=(x.textContent||"").trim(),b=f.toLowerCase();if((b.includes("download")||b.includes("ดาวน์โหลด"))&&f.length<80){const A=x.getBoundingClientRect();if(A.width>0&&A.height>0){i=x;break}}}if(!i)for(const x of document.querySelectorAll("button")){const f=(x.getAttribute("aria-label")||"").toLowerCase(),b=(x.getAttribute("title")||"").toLowerCase();if(f.includes("download")||f.includes("ดาวน์")||b.includes("download")||b.includes("ดาวน์")){const A=x.getBoundingClientRect();if(A.width>0&&A.height>0){i=x;break}}}i||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await u(1e3))}if(!i){R("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(i.textContent||"").trim().substring(0,40)}"`),await Z(i),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await u(Y?3e3:1500);const r=Date.now();let d=null;const h=Date.now();for(;!d&&Date.now()-h<(Y?1e4:5e3);)d=p("1080p"),d||(n("รอ 1080p..."),await u(500));if(!d){R("ไม่พบ 1080p");return}await Z(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const g=Date.now();let v=!1,D=!1,L=0;const I=3e3;for(;Date.now()-g<3e5;){const x=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(x.includes("upscaling complete")||x.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),v=!0;break}for(const b of document.querySelectorAll("div, span, p")){const A=(b.textContent||"").trim().toLowerCase();if(A.length<60&&(A.includes("upscaling complete")||A.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(P=b.textContent)==null?void 0:P.trim()}")`),v=!0;break}}if(v)break;if(x.includes("upscaling your video")||x.includes("กำลังอัปสเกล")){D=!0,L=0;const b=Math.floor((Date.now()-g)/1e3);n(`⏳ กำลังอัปสเกล... (${b} วินาที)`)}else if(D){if(L===0)L=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-L>=I){n(`✅ ข้อความ Upscaling หายไป ${I/1e3} วินาที — เสร็จ!`),v=!0;break}}else{const b=Math.floor((Date.now()-g)/1e3);b%10<3&&n(`⏳ รอ Upscale... (${b} วินาที)`)}if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await u(2e3)}if(!v){R("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await u(5e3);let c=!1;const $=Date.now();for(;Date.now()-$<6e4&&!c;){try{await new Promise(T=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:r},x=>{chrome.runtime.lastError?R(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):x!=null&&x.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${x.message}`),c=!0,x.downloadUrl&&(a=x.downloadUrl,n(`[TikTok] จะใช้ download URL: ${x.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-$)/1e3)}s)`),T()})})}catch(T){R(`ตรวจสอบผิดพลาด: ${T.message}`)}c||await u(3e3)}c||R("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const O=await ie();a||(a=O),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),ae(a),oe(2e3)}async function Ge(e=2,t=2,o,s=[]){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{o&&Ht(o)}catch{}try{Zt(e)}catch(m){n(`⚠️ showOverlay error: ${m.message}`)}try{const m=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let y=2;y<=t;y++)m.push(`scene${y}-prompt`,`scene${y}-gen`),y<t&&m.push(`scene${y}-wait`);for(const y of m)M(y,"done");M(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${m.length} steps done (scene ${t}/${e} navigate)`)}catch(m){n(`⚠️ overlay restore error: ${m.message}`)}await u(2e3);const a=(()=>{for(const m of document.querySelectorAll("button")){const y=m.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const E of y){const N=(E.textContent||"").trim();if(N==="volume_up"||N==="volume_off"||N==="volume_mute"){const k=m.getBoundingClientRect();if(k.width>0&&k.height>0)return m}}const w=(m.getAttribute("aria-label")||"").toLowerCase();if(w.includes("mute")||w.includes("ปิดเสียง")){const E=m.getBoundingClientRect();if(E.width>0&&E.height>0)return m}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);let p=0,i=0;const l=Date.now(),r=6e5,d=5e3;let h=!1,g=0;for(;Date.now()-l<r;){let m=null;const y=document.querySelectorAll("div, span, p, label, strong, small");for(const w of y){if(w.closest("#netflow-engine-overlay"))continue;const N=(w.textContent||"").trim().match(/^(\d{1,3})%$/);if(N){const k=w.getBoundingClientRect();if(k.width>0&&k.height>0&&k.width<120&&k.height<60){m=parseInt(N[1],10);break}}}if(m!==null){if(g=0,m!==p){n(`🎬 scene ${t} ความคืบหน้า: ${m}%`),p=m;try{M(`scene${t}-wait`,"active",m)}catch{}}i=0}else if(p>0){if(i===0)i=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${p}%) — กำลังยืนยัน...`);else if(Date.now()-i>=d){n(`✅ scene ${t}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),h=!0;break}}else if(g++,g>=15){const w=document.querySelectorAll("video");let E=!1;for(const N of w)if(N.readyState>=2&&!N.paused&&N.getBoundingClientRect().width>200){E=!0;break}if(E){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),h=!0;break}if(g>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),h=!0;break}}document.hidden&&p>0&&i===0&&await kt(),await u(2e3)}h||n(`⚠️ scene ${t} หมดเวลา — ลองต่อไป`);try{M(`scene${t}-wait`,"done",100)}catch{}if(n(`✅ scene ${t} เสร็จ`),t<e&&s.length>0){n(`═══ ยังเหลืออีก ${e-t} ฉาก — ต่อฉากถัดไป ═══`),await u(2e3);for(let m=t+1;m<=e;m++){const y=s[m-1];if(!y){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${m} — ข้าม`);continue}n(`── ฉากที่ ${m}/${e}: วาง prompt + generate (pending recovery) ──`);let w=null;const E=Date.now();for(;!w&&Date.now()-E<1e4;){const V=document.querySelectorAll("[data-slate-editor='true']");if(V.length>0&&(w=V[V.length-1]),!w){const G=document.querySelectorAll("[role='textbox'][contenteditable='true']");G.length>0&&(w=G[G.length-1])}w||await u(1e3)}if(!w){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${m}`);break}await Vt(w,y),n(`วาง prompt ฉาก ${m} (${y.length} ตัวอักษร) ✅`);try{M(`scene${m}-prompt`,"done"),M(`scene${m}-gen`,"active")}catch{}await u(1e3);const N=w.getBoundingClientRect();let k=null,C=1/0;for(const V of document.querySelectorAll("button")){if(V.disabled)continue;const G=V.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let F=!1;for(const J of G){const lt=(J.textContent||"").trim();if(lt==="arrow_forward"||lt==="send"||lt==="arrow_upward"){F=!0;break}}if(!F)continue;const K=V.getBoundingClientRect();if(K.width<=0||K.height<=0)continue;const H=Math.abs(K.top-N.top)+Math.abs(K.right-N.right);H<C&&(C=H,k=V)}if(!k)for(const V of["arrow_forward","send","arrow_upward"]){const G=bt(V);for(const F of G)if(!F.disabled){const K=F.getBoundingClientRect();if(K.width>0&&K.height>0){k=F;break}}if(k)break}if(!k)for(const V of document.querySelectorAll("button")){const G=V.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const F of G)if((F.textContent||"").trim()==="arrow_forward"){const K=V.getBoundingClientRect();if(K.width>0&&K.height>0){k=V;break}}if(k)break}if(!k){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${m}`);break}await new Promise(V=>{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:m,scenePrompts:s}},()=>V())}),await Z(k),n(`คลิก Generate ฉาก ${m} ✅`);try{M(`scene${m}-gen`,"done"),M(`scene${m}-wait`,"active")}catch{}await u(5e3);let _=0,U=0;const S=Date.now();let B=!1,z=0;for(;Date.now()-S<6e5;){let V=null;const G=document.querySelectorAll("div, span, p, label, strong, small");for(const F of G){if(F.closest("#netflow-engine-overlay"))continue;const H=(F.textContent||"").trim().match(/^(\d{1,3})%$/);if(H){const J=F.getBoundingClientRect();if(J.width>0&&J.height>0&&J.width<120&&J.height<60){V=parseInt(H[1],10);break}}}if(V!==null){if(z=0,V!==_){n(`🎬 ฉาก ${m} ความคืบหน้า: ${V}%`),_=V;try{M(`scene${m}-wait`,"active",V)}catch{}}U=0}else if(_>0){if(U===0)U=Date.now();else if(Date.now()-U>=5e3){n(`✅ ฉาก ${m}: เจนเสร็จ!`),B=!0;break}}else if(z++,z>=15){const F=document.querySelectorAll("video");let K=!1;for(const H of F)if(H.readyState>=2&&!H.paused&&H.getBoundingClientRect().width>200){K=!0;break}if(K){n(`✅ ฉาก ${m}: พบวิดีโอเล่นอยู่ — เสร็จ`),B=!0;break}if(z>=30){n(`✅ ฉาก ${m}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),B=!0;break}}document.hidden&&_>0&&U===0&&await kt(),await u(2e3)}B||n(`⚠️ ฉาก ${m} หมดเวลา`);try{M(`scene${m}-wait`,"done",100)}catch{}n(`✅ ฉาก ${m} เสร็จแล้ว`),chrome.storage.local.remove(mt()),await u(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await u(3e3);let v=null;try{M("download","active")}catch{}if(n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──"),await ht(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(m=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>m())),await u(Y?8e3:5e3)}catch{}}await u(Y?3e3:2e3);const D=Date.now();let L=null;const I=Date.now();for(;!L&&Date.now()-I<(Y?15e3:1e4);){const m=bt("download");for(const y of m){const w=y.getBoundingClientRect();if(w.width>0&&w.height>0){L=y;break}}if(!L)for(const y of document.querySelectorAll("button")){const w=y.querySelector("i, span[class*='icon'], span[class*='material']");if(w&&(w.textContent||"").trim()==="download"){const k=y.getBoundingClientRect();if(k.width>0&&k.height>0){L=y;break}}const E=(y.getAttribute("aria-label")||"").toLowerCase(),N=(y.getAttribute("title")||"").toLowerCase();if(E.includes("download")||E.includes("ดาวน์โหลด")||N.includes("download")||N.includes("ดาวน์โหลด")){const k=y.getBoundingClientRect();if(k.width>0&&k.height>0){L=y;break}}}L||await u(1e3)}if(!L){R("ไม่พบปุ่มดาวน์โหลด");return}await Z(L),n("คลิกดาวน์โหลดแล้ว ✅");try{M("download","done"),M("upscale","active")}catch{}await u(Y?3e3:1500);const c=(m,y)=>new Promise(async w=>{const E=Date.now();for(;Date.now()-E<y;){const N="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const k of document.querySelectorAll(N)){const C=(k.textContent||"").trim();if(C.includes(m)&&C.length<100){const _=k.getBoundingClientRect();if(_.width>0&&_.height>0){w(k);return}}}await u(500)}w(null)}),$=(m,y)=>new Promise(async w=>{const E=Date.now();for(;Date.now()-E<m;){const N="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const k of document.querySelectorAll(N)){const C=(k.textContent||"").trim();if(C.includes("720p")&&C.length<50){const U=k.getBoundingClientRect();if(U.width>0&&U.height>0){w(k);return}}const _=k.querySelectorAll("span");for(const U of _)if((U.textContent||"").trim()==="720p"){const S=k.getBoundingClientRect();if(S.width>0&&S.height>0){w(k);return}}}y!=null&&y.isConnected&&Ft(y),await u(500)}w(null)});let O=null;for(let m=0;m<(Y?5:3)&&!O;m++){m>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${m+1}...`),L.isConnected&&(await Z(L),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await u(Y?3e3:2e3)));const y=await c("Full Video",Y?1e4:5e3);if(!y){R("ไม่พบ Full Video");continue}Ft(y),await u(Y?1e3:500),await Z(y),n("คลิก/hover Full Video ✅"),await u(Y?3e3:2e3),O=await $(Y?12e3:8e3,y)}if(!O){R("ไม่พบ 720p");return}await Z(O),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const P=Date.now();let T=!1,x=!1;for(;Date.now()-P<3e5;){for(const m of document.querySelectorAll("div[data-title] div, div[data-content] div")){const y=(m.textContent||"").trim();if(y==="Download complete!"||y==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),T=!0;break}(y.includes("Downloading your extended video")||y.includes("กำลังดาวน์โหลด"))&&(x||(x=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(T)break;if(x){let m=!1;for(const y of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((y.textContent||"").trim().includes("Downloading")){m=!0;break}if(!m){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),T=!0;break}}await u(2e3)}if(!T){R("เตรียมไฟล์หมดเวลา");return}try{M("upscale","done",100),M("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await u(5e3);let f=!1;const b=Date.now();for(;Date.now()-b<6e4&&!f;){try{await new Promise(m=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:D},y=>{chrome.runtime.lastError?R(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):y!=null&&y.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${y.message}`),f=!0,y.downloadUrl&&(v=y.downloadUrl,n(`[TikTok] จะใช้ download URL: ${y.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-b)/1e3)}s)`),m()})})}catch(m){R(`ตรวจสอบผิดพลาด: ${m.message}`)}f||await u(3e3)}f||R("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const A=await ie();v||(v=A);try{M("open","done"),Ot(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),ae(v),oe(2e3)}async function En(){try{await sn;const e=mt();let t=await new Promise(i=>{chrome.storage.local.get(e,l=>{if(chrome.runtime.lastError){i(null);return}i((l==null?void 0:l[e])||null)})});if(!t&&It){const i="netflow_pending_action";t=await new Promise(l=>{chrome.storage.local.get(i,r=>{if(chrome.runtime.lastError){l(null);return}l((r==null?void 0:r[i])||null)})}),t&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(i))}if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const s=Date.now()-t.timestamp;if(s>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(e);return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=a,await new Promise(i=>{chrome.storage.local.set({[e]:t},()=>i())}),await u(300),!await new Promise(i=>{chrome.storage.local.get(e,l=>{const r=l==null?void 0:l[e];i((r==null?void 0:r._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(e),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(s/1e3)} วินาที)`),t.action==="mute_video"?await Ue(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await Ge(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,o)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),o({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),$n(e).then(s=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${s.message}`),Re()}).catch(s=>{if(s instanceof se||(s==null?void 0:s.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Nt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Me()}catch{}}else console.error("[Netflow AI] Generate error:",s);Re()}),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,o({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return o({status:"ready"}),!1;if((e==null?void 0:e.type)==="CAPTURE_PAGE_VIDEO")return(async()=>{try{const s=document.querySelectorAll("video");let a="",p=0;for(const d of s){const h=d.src||d.currentSrc||"";if(!h)continue;const g=d.getBoundingClientRect(),v=g.width*g.height;(v>p||!a&&h)&&(p=v,a=h)}if(!a){o({success:!1,error:"No video found"});return}const i=await fetch(a);if(!i.ok){o({success:!1,error:"HTTP "+i.status});return}const l=await i.blob();if(l.size<1e4){o({success:!1,error:"Video too small: "+l.size});return}const r=await new Promise((d,h)=>{const g=new FileReader;g.onloadend=()=>d(g.result),g.onerror=()=>h(new Error("FileReader error")),g.readAsDataURL(l)});o({success:!0,data:r,size:l.size})}catch(s){o({success:!1,error:s.message})}})(),!0;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return o({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await u(500);const s=fn();if(!s){R("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const a=s.getBoundingClientRect(),p=a.left+a.width/2,i=a.top+a.height/2;n(`การ์ดรูปที่ (${p.toFixed(0)}, ${i.toFixed(0)}) ${a.width.toFixed(0)}x${a.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let l=0;l<2;l++){const r=document.elementFromPoint(p,i);r?(await Z(r),n(`คลิก ${l+1}/2 บน <${r.tagName.toLowerCase()}>`)):(await Z(s),n(`คลิก ${l+1}/2 บนการ์ด (สำรอง)`)),await u(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),(async()=>{try{const e=await new Promise(t=>{chrome.storage.local.get("netflow_preshow_overlay",o=>{if(chrome.runtime.lastError){t(null);return}t((o==null?void 0:o.netflow_preshow_overlay)||null)})});if(e&&e.timestamp&&Date.now()-e.timestamp<3e4){n("⚡ Pre-show overlay — แสดง overlay ทันที");try{Ht(e.theme)}catch{}try{Zt(e.sceneCount||1)}catch(t){n(`⚠️ pre-show overlay error: ${t.message}`)}chrome.storage.local.remove("netflow_preshow_overlay")}}catch{}})(),En()})();
