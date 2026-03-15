(function(){"use strict";const bt={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let st=bt.blue,At=null;function qt(e){e&&bt[e]&&(At=e,st=bt[e],pe(),requestAnimationFrame(()=>Me()))}function We(){if(At&&bt[At])return bt[At];try{const e=localStorage.getItem("netflow_app_theme");if(e&&bt[e])return bt[e]}catch{}return bt.blue}let ct=43,dt=125,pt=233;function pe(){const e=st.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(ct=parseInt(e[1],16),dt=parseInt(e[2],16),pt=parseInt(e[3],16))}const fe='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',ue='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let V=null,rt=null,nt=null,ge=0,Ut=null,Pt=null,Wt=null,Zt=0,yt=!1,gt=null,Mt=null,Rt=null,Ct=1,tt=[];function jt(e){const t=[{stepId:"open-flow",label:"เปิด Google Flow",status:"waiting"},{stepId:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let o=2;o<=e;o++)t.push({stepId:`scene${o}-prompt`,label:`ฉาก ${o} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${o}-gen`,label:`ฉาก ${o} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${o}-wait`,label:`ฉาก ${o} — กำลังสร้าง`,status:"waiting",progress:0});t.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return t}const ft=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"open-flow",label:"เปิด Google Flow",status:"waiting"},{id:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];tt=jt(1);function je(e){const t=e.rgb,o=e.accentRgb,r=e.doneRgb,a=e.hex,d=e.accentHex,i=e.doneHex,l=(()=>{const m=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!m)return"#4ade80";const s=b=>Math.min(255,b+80);return`#${[1,2,3].map(b=>s(parseInt(m[b],16)).toString(16).padStart(2,"0")).join("")}`})(),c=(()=>{const m=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!m)return"#4ade80";const s=b=>Math.min(255,b+60);return`#${[1,2,3].map(b=>s(parseInt(m[b],16)).toString(16).padStart(2,"0")).join("")}`})(),p=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),g=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,y=p?parseInt(p[1],16)/g:0,w=p?parseInt(p[2],16)/g:1,N=p?parseInt(p[3],16)/g:.25,T=m=>`${Math.round(y*m)}, ${Math.round(w*m)}, ${Math.round(N*m)}`;return`
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
.nf-term-line.nf-term-done { color: rgba(${r}, 0.85); }
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
    background: ${a};
    box-shadow: 0 0 6px rgba(${t},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: ${i};
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
    background: linear-gradient(90deg, ${a}, ${l});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${t},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${i}, ${c});
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
    background: linear-gradient(90deg, ${i}, ${c});
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
    background: ${i};
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

    `}function Jt(){nt||(nt=document.createElement("style"),nt.id="netflow-overlay-styles",nt.textContent=je(st),document.head.appendChild(nt))}function me(e){e.innerHTML="",tt.forEach((t,o)=>{const r=document.createElement("div");r.className="nf-proc-row nf-proc-waiting",r.id=`nf-proc-${t.stepId}`,r.innerHTML=`
            <span class="nf-proc-num">${o+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(r)})}function he(){const e=document.getElementById("nf-terminal");if(!e)return;me(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${tt.length}`)}function be(e,t){let l="";for(let w=0;w<20;w++){const N=w/20*Math.PI*2,T=(w+.2)/20*Math.PI*2,m=(w+.5)/20*Math.PI*2,s=(w+.8)/20*Math.PI*2,b=(w+1)/20*Math.PI*2;l+=`${w===0?"M":"L"}${(120+100*Math.cos(N)).toFixed(1)},${(120+100*Math.sin(N)).toFixed(1)} `,l+=`L${(120+100*Math.cos(T)).toFixed(1)},${(120+100*Math.sin(T)).toFixed(1)} `,l+=`L${(120+112*Math.cos(m)).toFixed(1)},${(120+112*Math.sin(m)).toFixed(1)} `,l+=`L${(120+100*Math.cos(s)).toFixed(1)},${(120+100*Math.sin(s)).toFixed(1)} `,l+=`L${(120+100*Math.cos(b)).toFixed(1)},${(120+100*Math.sin(b)).toFixed(1)} `}l+="Z";const c=14,p=72,g=62;let y="";for(let w=0;w<c;w++){const N=w/c*Math.PI*2,T=(w+.25)/c*Math.PI*2,m=(w+.75)/c*Math.PI*2,s=(w+1)/c*Math.PI*2;y+=`${w===0?"M":"L"}${(120+g*Math.cos(N)).toFixed(1)},${(120+g*Math.sin(N)).toFixed(1)} `,y+=`L${(120+p*Math.cos(T)).toFixed(1)},${(120+p*Math.sin(T)).toFixed(1)} `,y+=`L${(120+p*Math.cos(m)).toFixed(1)},${(120+p*Math.sin(m)).toFixed(1)} `,y+=`L${(120+g*Math.cos(s)).toFixed(1)},${(120+g*Math.sin(s)).toFixed(1)} `}return y+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${y}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${g}" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${e},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${e},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Ye(){const e=document.createElement("div");e.id="netflow-engine-overlay",gt=document.createElement("canvas"),gt.id="nf-matrix-canvas",e.appendChild(gt);const t=document.createElement("div");t.className="nf-pat-plasma",e.appendChild(t);for(let k=1;k<=5;k++){const C=document.createElement("div");C.className=`nf-ambient-orb nf-orb-${k}`,e.appendChild(C)}const o=document.createElement("div");o.className="nf-pat-data",e.appendChild(o);const r=document.createElement("div");r.className="nf-pat-diag-a",e.appendChild(r);const a=document.createElement("div");a.className="nf-pat-diag-b",e.appendChild(a);const d=document.createElement("div");d.className="nf-pat-circuit",e.appendChild(d);const i=document.createElement("div");i.className="nf-pat-honeycomb",e.appendChild(i);const l=document.createElement("div");l.className="nf-pat-binary",e.appendChild(l);const c=document.createElement("div");c.className="nf-pat-crosshatch",e.appendChild(c);const p=document.createElement("div");p.className="nf-pat-diamond",e.appendChild(p);const g=document.createElement("div");g.className="nf-pat-wave-h",e.appendChild(g);const y=document.createElement("div");y.className="nf-pat-radar",e.appendChild(y);const w=document.createElement("div");w.className="nf-pat-ripple-1",e.appendChild(w);const N=document.createElement("div");N.className="nf-pat-ripple-2",e.appendChild(N);const T=document.createElement("div");T.className="nf-pat-techscan",e.appendChild(T);const m=document.createElement("div");m.className="nf-center-glow",e.appendChild(m);const s=document.createElement("div");s.className="nf-pat-noise",e.appendChild(s);const b=document.createElement("div");b.className="nf-crt-scanlines",e.appendChild(b);const P=document.createElement("div");P.className="nf-vignette",e.appendChild(P);for(let k=0;k<3;k++){const C=document.createElement("div");C.className="nf-pulse-ring",e.appendChild(C)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(k=>{const C=document.createElement("div");C.className=`nf-corner-deco ${k}`,e.appendChild(C)});const K=document.createElement("button");K.className="nf-stop-btn",K.innerHTML='<span class="nf-stop-icon"></span> หยุด',K.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",K.onclick=()=>{var k;window.__NETFLOW_STOP__=!0;try{Nt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((k=chrome.runtime)!=null&&k.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},e.appendChild(K);const F=document.createElement("div");F.className="nf-layout";const O=document.createElement("div");O.className="nf-core-monitor",O.id="nf-core-monitor";const h=document.createElement("div");h.className="nf-core-header",h.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${tt.length}</div>
    `,O.appendChild(h);const S=document.createElement("div");S.className="nf-terminal",S.id="nf-terminal",me(S),O.appendChild(S);const B=document.createElement("div");B.className="nf-engine-core",B.id="nf-engine-core";const u=document.createElement("div");u.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(k=>{const C=document.createElement("div");C.className=`nf-frame-corner ${k}`,u.appendChild(C)}),B.appendChild(u);const v="http://www.w3.org/2000/svg",x=document.createElementNS(v,"svg");x.setAttribute("class","nf-engine-waves"),x.setAttribute("viewBox","0 0 560 140"),x.setAttribute("preserveAspectRatio","none"),x.id="nf-engine-waves";for(let k=0;k<4;k++){const C=document.createElementNS(v,"path");C.setAttribute("fill","none"),C.setAttribute("stroke-width",k<2?"1.5":"1"),C.setAttribute("stroke",k<2?`rgba(${st.rgb},${.14+k*.1})`:`rgba(${st.accentRgb},${.1+(k-2)*.08})`),C.setAttribute("data-wave-idx",String(k)),x.appendChild(C)}B.appendChild(x);const $=document.createElement("div");$.className="nf-engine-brand-inner",$.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${be(st.rgb,st.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${be(st.rgb,st.accentRgb)}
        </div>
    `,B.appendChild($);const M=document.createElement("div");M.className="nf-engine-stats",M.id="nf-engine-stats",M.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([k,C,G])=>`<div class="nf-stat-item"><span class="nf-stat-label">${k}</span><span class="nf-stat-val" id="${C}">${G}</span></div>`).join(""),B.appendChild(M),O.appendChild(B),F.appendChild(O);const E=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ft.forEach((k,C)=>{const G=Ke(k);G.classList.add(E[C]),G.id=`nf-mod-${k.id}`,F.appendChild(G)}),e.appendChild(F);for(let k=0;k<30;k++){const C=document.createElement("div");C.className="nf-particle",C.style.left=`${5+Math.random()*90}%`,C.style.bottom=`${Math.random()*40}%`,C.style.animationDuration=`${3+Math.random()*5}s`,C.style.animationDelay=`${Math.random()*4}s`;const G=.3+Math.random()*.4,I=.7+Math.random()*.3;C.style.background=`rgba(${Math.floor(ct*I)}, ${Math.floor(dt*I)}, ${Math.floor(pt*I)}, ${G})`,C.style.width=`${1+Math.random()*2}px`,C.style.height=C.style.width,e.appendChild(C)}return e}function Ke(e){const t=document.createElement("div");t.className="nf-module";const o=document.createElement("div");o.className="nf-mod-header",o.innerHTML=`
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
        `,t.appendChild(d)});const r=document.createElement("div");return r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(r),t}function Xe(){ge=Date.now(),Ut=setInterval(()=>{const e=Math.floor((Date.now()-ge)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),o=String(e%60).padStart(2,"0"),r=document.getElementById("nf-timer");r&&(r.textContent=`${t}:${o}`);const a=document.getElementById("nf-stat-elapsed");a&&(a.textContent=`${t}:${o}`)},1e3)}function we(){Ut&&(clearInterval(Ut),Ut=null)}const Qe=120,xe=160,ye=.4;let Tt=null,ve=0,$e=0,Ee=0,Bt=[];function Ze(e,t){Bt=[];for(let o=0;o<Qe;o++){const r=Math.random();let a;r<.22?a=0:r<.4?a=1:r<.55?a=2:r<.68?a=3:r<.84?a=4:a=5;const d=Math.random()*e,i=Math.random()*t,l=50+Math.random()*220,c=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Bt.push({x:a===0?Math.random()*e:d+Math.cos(c)*l,y:a===0?Math.random()*t:i+Math.sin(c)*l,vx:(Math.random()-.5)*ye,vy:(Math.random()-.5)*ye,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:a,oCx:d,oCy:i,oRadius:l,oAngle:c,oSpeed:p})}}function Je(){if(!gt)return;const e=gt;if(Mt=e.getContext("2d"),!Mt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,Bt.length===0&&Ze(e.width,e.height)};t(),window.addEventListener("resize",t);let o=null,r=0,a=0,d=!1;function i(){if(!Mt||!gt){Rt=null;return}if(Rt=requestAnimationFrame(i),d=!d,d)return;const l=Mt,c=gt.width,p=gt.height;l.fillStyle=`rgba(${ct*.04|0},${dt*.04|0},${pt*.06|0},1)`,l.fillRect(0,0,c,p),(!o||r!==c||a!==p)&&(r=c,a=p,o=l.createRadialGradient(c*.5,p*.5,0,c*.5,p*.5,Math.max(c,p)*.6),o.addColorStop(0,`rgba(${ct*.08|0},${dt*.08|0},${pt*.1|0},0.4)`),o.addColorStop(1,"rgba(0,0,0,0)")),l.fillStyle=o,l.fillRect(0,0,c,p);const g=Bt,y=g.length,w=xe*xe;for(let m=0;m<y;m++){const s=g[m];if(s.pulsePhase+=s.pulseSpeed,s.motion===0)s.x+=s.vx,s.y+=s.vy,s.x<0?(s.x=0,s.vx=Math.abs(s.vx)*(.8+Math.random()*.4)):s.x>c&&(s.x=c,s.vx=-Math.abs(s.vx)*(.8+Math.random()*.4)),s.y<0?(s.y=0,s.vy=Math.abs(s.vy)*(.8+Math.random()*.4)):s.y>p&&(s.y=p,s.vy=-Math.abs(s.vy)*(.8+Math.random()*.4));else if(s.motion===1)s.oAngle+=s.oSpeed,s.x=s.oCx+Math.cos(s.oAngle)*s.oRadius,s.y=s.oCy+Math.sin(s.oAngle)*s.oRadius,s.oCx+=Math.sin(s.oAngle*.3)*.15,s.oCy+=Math.cos(s.oAngle*.3)*.15;else if(s.motion===2)s.oAngle+=s.oSpeed,s.x=s.oCx+Math.cos(s.oAngle)*s.oRadius,s.y=s.oCy+Math.sin(s.oAngle)*s.oRadius*.5,s.oCx+=Math.sin(s.oAngle*.2)*.1,s.oCy+=Math.cos(s.oAngle*.2)*.1;else if(s.motion===3){s.oAngle+=s.oSpeed;const b=s.oAngle,P=s.oRadius*.7;s.x=s.oCx+P*Math.cos(b),s.y=s.oCy+P*Math.sin(b)*Math.cos(b),s.oCx+=Math.sin(b*.15)*.12,s.oCy+=Math.cos(b*.15)*.12}else if(s.motion===4){s.oAngle+=s.oSpeed*1.2;const b=s.oRadius*(.5+.5*Math.abs(Math.sin(s.oAngle*.15)));s.x=s.oCx+Math.cos(s.oAngle)*b,s.y=s.oCy+Math.sin(s.oAngle)*b,s.oCx+=Math.sin(s.oAngle*.1)*.18,s.oCy+=Math.cos(s.oAngle*.1)*.18}else s.oAngle+=s.oSpeed,s.x+=s.vx*.8,s.y=s.oCy+Math.sin(s.oAngle+s.x*.008)*s.oRadius*.35,s.x<-30?s.x=c+30:s.x>c+30&&(s.x=-30),s.oCy+=Math.sin(s.oAngle*.1)*.08;if(s.motion>0){const b=s.oRadius+50;s.oCx<-b?s.oCx=c+b:s.oCx>c+b&&(s.oCx=-b),s.oCy<-b?s.oCy=p+b:s.oCy>p+b&&(s.oCy=-b)}}l.beginPath(),l.strokeStyle=`rgba(${ct},${dt},${pt},0.06)`,l.lineWidth=.4;const N=new Path2D;for(let m=0;m<y;m++){const s=g[m];for(let b=m+1;b<y;b++){const P=g[b],K=s.x-P.x,F=s.y-P.y,O=K*K+F*F;O<w&&(1-O/w<.4?(l.moveTo(s.x,s.y),l.lineTo(P.x,P.y)):(N.moveTo(s.x,s.y),N.lineTo(P.x,P.y)))}}if(l.stroke(),l.strokeStyle=`rgba(${ct},${dt},${pt},0.18)`,l.lineWidth=.8,l.stroke(N),!Tt||ve!==ct||$e!==dt||Ee!==pt){Tt=document.createElement("canvas");const m=48;Tt.width=m,Tt.height=m;const s=Tt.getContext("2d"),b=s.createRadialGradient(m/2,m/2,0,m/2,m/2,m/2);b.addColorStop(0,`rgba(${ct},${dt},${pt},0.9)`),b.addColorStop(.3,`rgba(${ct},${dt},${pt},0.35)`),b.addColorStop(1,`rgba(${ct},${dt},${pt},0)`),s.fillStyle=b,s.fillRect(0,0,m,m),ve=ct,$e=dt,Ee=pt}const T=Tt;for(let m=0;m<y;m++){const s=g[m],b=.6+.4*Math.sin(s.pulsePhase),P=s.radius*5*(.8+b*.4);l.globalAlpha=.5+b*.4,l.drawImage(T,s.x-P/2,s.y-P/2,P,P)}l.globalAlpha=1,l.fillStyle="rgba(255,255,255,0.45)",l.beginPath();for(let m=0;m<y;m++){const s=g[m];if(s.radius>2){const b=.6+.4*Math.sin(s.pulsePhase),P=s.radius*(.8+b*.4)*.35;l.moveTo(s.x+P,s.y),l.arc(s.x,s.y,P,0,Math.PI*2)}}l.fill()}i()}function tn(){Rt!==null&&(cancelAnimationFrame(Rt),Rt=null),gt=null,Mt=null,Bt=[]}let Dt=null;const Yt=560,en=140,ke=Yt/2,Ce=en/2,Te=[];for(let e=0;e<=Yt;e+=8){const t=Math.abs(e-ke)/ke;Te.push(Math.pow(Math.min(1,t*1.6),.6))}const nn=[0,1,2,3].map(e=>({amp:10+e*5,freq:(1.2+e*.35)*Math.PI*2/Yt,off:e*.6,spd:.7+e*.12}));let te=!1;function Ie(){if(Pt=requestAnimationFrame(Ie),te=!te,te)return;if(Zt+=.07,!Dt){const t=document.getElementById("nf-engine-waves");if(!t){Pt=null;return}Dt=Array.from(t.querySelectorAll("path"))}const e=[];for(let t=0;t<Dt.length;t++){const o=nn[t],r=Zt*o.spd+o.off;e.length=0,e.push(`M 0 ${Ce}`);let a=0;for(let d=0;d<=Yt;d+=8){const i=Ce+o.amp*Te[a++]*Math.sin(d*o.freq+r);e.push(`L${d} ${i*10+.5|0}`)}Dt[t].setAttribute("d",e.join(" "))}}function on(){Zt=0,Ie(),Je(),Wt=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),o=document.getElementById("nf-stat-lat2"),r=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function Se(){Pt!==null&&(cancelAnimationFrame(Pt),Pt=null),Wt&&(clearInterval(Wt),Wt=null),Dt=null,tn()}function Kt(){let e=0;const t=tt.filter(p=>p.status!=="skipped").length;for(const p of tt){const g=document.getElementById(`nf-proc-${p.stepId}`);if(!g)continue;g.className="nf-proc-row";const y=g.querySelector(".nf-proc-badge");switch(p.status){case"done":g.classList.add("nf-proc-done"),y&&(y.textContent="✅ done"),e++;break;case"active":g.classList.add("nf-proc-active"),y&&(y.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":g.classList.add("nf-proc-error"),y&&(y.textContent="❌ error");break;case"skipped":g.classList.add("nf-proc-skipped"),y&&(y.textContent="— skip");break;default:g.classList.add("nf-proc-waiting"),y&&(y.textContent="(queued)")}}const o=tt.findIndex(p=>p.status==="active"),r=o>=0?o+1:e>=t&&t>0?tt.length:e,a=document.getElementById("nf-step-counter");a&&(a.textContent=`${r}/${tt.length}`);const d=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");e>=t&&t>0?(d&&(d.textContent="COMPLETE",d.style.color=st.doneHex),i&&(i.style.background=st.doneHex,i.style.boxShadow=`0 0 8px rgba(${st.doneRgb},0.7)`)):tt.some(g=>g.status==="error")?(d&&(d.textContent="ERROR",d.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):tt.some(g=>g.status==="active")&&d&&(d.textContent="ACTIVE",d.style.color=st.hex,d.style.textShadow=`0 0 10px rgba(${st.rgb},0.5)`);const l=document.getElementById("nf-terminal"),c=l==null?void 0:l.querySelector(".nf-proc-active");c&&l&&c.scrollIntoView({behavior:"smooth",block:"center"})}function _e(){rt&&rt.isConnected||(Jt(),rt=document.createElement("button"),rt.id="nf-toggle-btn",rt.className="nf-toggle-visible",rt.innerHTML=yt?fe:ue,rt.title="ซ่อน/แสดง Netflow Overlay",rt.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",rt.onclick=()=>Ae(),document.body.appendChild(rt))}function Ae(){V&&(_e(),yt?(V.classList.remove("nf-hidden"),V.classList.add("nf-visible"),V.style.opacity="1",V.style.pointerEvents="auto",rt&&(rt.innerHTML=ue),yt=!1):(V.classList.remove("nf-visible"),V.classList.add("nf-hidden"),V.style.opacity="0",V.style.pointerEvents="none",rt&&(rt.innerHTML=fe),yt=!0))}const Pe={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Me(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=At;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"green"}catch{t="green"}const o=Pe[t]||Pe.green;let r;try{r=chrome.runtime.getURL(o)}catch{r=`/${o}`}const a=st.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${a},0.25) 0%, rgba(${a},0.12) 50%, rgba(${a},0.20) 100%)`,`url('${r}')`].join(", "),e.style.backgroundSize="auto, auto, 50%",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${a},0.45)`,e.style.boxShadow=`0 0 70px rgba(${a},0.22), 0 0 140px rgba(${a},0.1), inset 0 1px 0 rgba(${a},0.15)`}function Xt(e=1){if(st=We(),pe(),V&&V.isConnected){V.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!nt||!nt.isConnected)&&(nt=null,Jt()),setTimeout(()=>{if(V)try{nt!=null&&nt.sheet&&nt.sheet.cssRules.length>0&&(V.style.removeProperty("background"),V.style.removeProperty("font-family"),V.style.removeProperty("overflow"))}catch{}},200);for(const t of ft)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;Ct=e,tt=jt(e),he();for(const t of ft)ee(t);if(Qt(),Kt(),!V.querySelector(".nf-stop-btn")){const t=document.createElement("button");t.className="nf-stop-btn",t.innerHTML='<span class="nf-stop-icon"></span> หยุด',t.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",t.onclick=()=>{var o;window.__NETFLOW_STOP__=!0;try{Nt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((o=chrome.runtime)!=null&&o.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},V.appendChild(t)}yt&&Ae();return}V&&!V.isConnected&&(V=null),nt&&(nt.remove(),nt=null),Jt();for(const t of ft)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;if(Ct=e,tt=jt(e),e>1){const t=ft.find(r=>r.id==="video");if(t){const r=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let a=2;a<=e;a++)r.push({id:`scene${a}-prompt`,label:`Scene ${a} Prompt`,status:"waiting"}),r.push({id:`scene${a}-gen`,label:`Scene ${a} Generate`,status:"waiting"}),r.push({id:`scene${a}-wait`,label:`Scene ${a} รอผล`,status:"waiting",progress:0});t.steps=r}const o=ft.find(r=>r.id==="render");if(o){const r=o.steps.find(d=>d.id==="download");r&&(r.label="ดาวน์โหลด 720p");const a=o.steps.find(d=>d.id==="upscale");a&&(a.label="Full Video")}}V=Ye(),V.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(V),V.classList.add("nf-visible"),yt=!1,_e(),Xe(),on(),requestAnimationFrame(()=>Me()),setTimeout(()=>{if(V)try{nt!=null&&nt.sheet&&nt.sheet.cssRules.length>0&&(V.style.removeProperty("background"),V.style.removeProperty("font-family"),V.style.removeProperty("overflow"))}catch{}},200)}function Re(){we(),Se(),yt=!1,V&&(V.classList.add("nf-fade-out"),setTimeout(()=>{V==null||V.remove(),V=null},500)),rt&&(rt.remove(),rt=null)}const an={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function rn(e,t,o){const r=tt.findIndex(y=>y.status==="active"),a=tt.filter(y=>y.status==="done").length,d=tt.length,i=r>=0?r+1:a>=d?d:a,l=document.getElementById("nf-stat-step");l&&(l.textContent=`${i}/${d}`);let c=1;for(const y of tt)if(y.status==="active"||y.status==="done")if(y.stepId.startsWith("scene")){const w=y.stepId.match(/^scene(\d+)-/);w&&(c=Math.max(c,parseInt(w[1],10)))}else(y.stepId==="download"||y.stepId==="upscale"||y.stepId==="open")&&(c=Ct);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=Ct>1?`${c}/${Ct}`:"1/1"),t==="active"){const y=document.getElementById("nf-stat-status"),w=an[e]||e.toUpperCase();y&&(y.textContent=w)}else if(t==="done"&&a>=d){const y=document.getElementById("nf-stat-status");y&&(y.textContent="COMPLETE")}else if(t==="error"){const y=document.getElementById("nf-stat-status");y&&(y.textContent="ERROR")}const g=document.getElementById("nf-stat-progress");g&&(o!==void 0&&o>0?g.textContent=`${Math.min(100,o)}%`:t==="active"&&(g.textContent="—"))}function _(e,t,o){if(!V)return;for(const a of ft)for(const d of a.steps)d.id===e&&(d.status=t,o!==void 0&&(d.progress=o));for(const a of tt)a.stepId===e&&(a.status=t,o!==void 0&&(a.progress=o));const r=document.getElementById(`nf-step-${e}`);if(r&&(r.className="nf-step",t==="active"?r.classList.add("nf-step-active"):t==="done"?r.classList.add("nf-step-done"):t==="error"&&r.classList.add("nf-step-error")),rn(e,t,o),o!==void 0){const a=document.getElementById(`nf-bar-${e}`);a&&(a.style.width=`${Math.min(100,o)}%`)}Qt(),Kt()}function It(e){_(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function Ot(e=4e3){we(),Se(),Qt(),Kt(),setTimeout(()=>Re(),e)}function Qt(){for(const e of ft){const t=e.steps.filter(c=>c.status!=="skipped").length,o=e.steps.filter(c=>c.status==="done").length,r=e.steps.some(c=>c.status==="active"),a=t>0?Math.round(o/t*100):0,d=document.getElementById(`nf-pct-${e.id}`);d&&(d.textContent=`${a}%`);const i=document.getElementById(`nf-modbar-${e.id}`);i&&(i.style.width=`${a}%`);const l=document.getElementById(`nf-mod-${e.id}`);l&&(l.classList.remove("nf-active","nf-done"),a>=100?l.classList.add("nf-done"):r&&l.classList.add("nf-active"))}}function sn(e){var r,a,d,i;Ct=e;const t=new Map;for(const l of tt)t.set(l.stepId,{status:l.status,progress:l.progress});tt=jt(e);for(const l of tt){const c=t.get(l.stepId);c&&(l.status=c.status,c.progress!==void 0&&(l.progress=c.progress))}if(he(),e>1){const l=ft.find(c=>c.id==="video");if(l){const c=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((r=l.steps.find(p=>p.id==="animate"))==null?void 0:r.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((a=l.steps.find(p=>p.id==="vid-prompt"))==null?void 0:a.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=l.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((i=l.steps.find(p=>p.id==="vid-wait"))==null?void 0:i.status)||"waiting",progress:0}];for(let p=2;p<=e;p++)c.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),c.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),c.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});l.steps=c,ee(l)}}const o=ft.find(l=>l.id==="render");if(o&&e>1){const l=o.steps.find(p=>p.id==="download");l&&(l.label="ดาวน์โหลด 720p");const c=o.steps.find(p=>p.id==="upscale");c&&(c.label="Full Video"),ee(o)}Qt(),Kt()}function ee(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(a=>a.remove()),e.steps.forEach(a=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${a.id}`;let i="";a.progress!==void 0&&(i=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${i}
        `,t.appendChild(d)});const r=document.createElement("div");r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(r)}function Nt(e){e.replace(/^\[Netflow AI\]\s*/,"")}let St=null,vt=null;const ln=new Promise(e=>{vt=e,setTimeout(()=>e(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},e=>{!chrome.runtime.lastError&&(e!=null&&e.tabId)&&(St=e.tabId,console.log(`[Netflow AI] Tab ID: ${St}`)),vt&&(vt(St),vt=null)})}catch{vt&&(vt(null),vt=null)}function mt(){return St?`netflow_pending_action_${St}`:"netflow_pending_action"}function Be(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Nt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},R=e=>{console.warn(`[Netflow AI] ${e}`);try{Nt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}};(()=>{const e=(o,r)=>{const a=o.tagName.toLowerCase(),d=o.id?`#${o.id}`:"",i=o.className&&typeof o.className=="string"?"."+o.className.trim().split(/\s+/).join("."):"",l=o.getBoundingClientRect(),c={};for(const s of o.attributes)["class","id","style"].includes(s.name)||(c[s.name]=s.value.length>80?s.value.slice(0,80)+"…":s.value);const p=(o.textContent||"").trim().slice(0,120),g=Array.from(o.querySelectorAll('i, [class*="icon"]')).map(s=>{var b;return(b=s.textContent)==null?void 0:b.trim()}).filter(Boolean).join(", "),y=[];let w=o.parentElement;for(let s=0;s<5&&w;s++){const b=w.tagName.toLowerCase(),P=w.id?`#${w.id}`:"",K=w.className&&typeof w.className=="string"?"."+w.className.trim().split(/\s+/).slice(0,2).join("."):"";y.push(`${b}${P}${K}`),w=w.parentElement}const N=r==="click"?`%c🖱️ CLICK %c<${a}${d}${i}>`:`%c👆 HOVER %c<${a}${d}${i}>`;console.groupCollapsed(N,r==="click"?"background:#e74c3c;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold":"background:#3498db;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold","color:#f39c12;font-weight:bold"),console.log("Element:",o),console.log("Selector:",`${a}${d}${i}`),console.log("Rect:",{x:Math.round(l.x),y:Math.round(l.y),w:Math.round(l.width),h:Math.round(l.height)}),Object.keys(c).length&&console.log("Attributes:",c),p&&console.log("Text:",p),g&&console.log("Icons:",g),y.length&&console.log("Ancestors:",y.join(" > ")),console.groupEnd()};document.addEventListener("click",o=>{const r=o.target;r!=null&&r.closest("#netflow-engine-overlay")||e(r,"click")},!0);let t=null;document.addEventListener("mouseover",o=>{const r=o.target;r!==t&&(r!=null&&r.closest("#netflow-engine-overlay")||(t=r,e(r,"hover")))},!0),console.log("%c[Netflow AI] 🔍 Debug Element Inspector ACTIVE — click/hover elements to inspect","background:#2ecc71;color:#000;padding:4px 8px;border-radius:4px;font-weight:bold")})();function ne(e=3e3){n(`🔒 จะปิดแท็บ automation ใน ${e/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},t=>{chrome.runtime.lastError?R(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${t==null?void 0:t.message}`)})}catch(t){R(`ปิดแท็บผิดพลาด: ${t.message}`)}},e)}async function oe(){try{if(await new Promise(a=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},d=>{if(chrome.runtime.lastError){a(!1);return}a(!!(d!=null&&d.cached))})}catch{a(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const a=document.querySelectorAll("video");for(const d of a){const i=d.src||d.currentSrc||"";if(i)return i}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const t=document.querySelectorAll("video");let o=null,r=0;for(const a of t){let d=a.src||"";if(!d){const c=a.querySelector("source");c&&(d=c.getAttribute("src")||"")}if(!d&&a.currentSrc&&(d=a.currentSrc),!d)continue;if(et()){o||(o=d,r=1);continue}const i=a.getBoundingClientRect(),l=i.width*i.height;i.width>50&&l>r&&(r=l,o=d)}if(!o)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${o.substring(0,80)}... (area=${r.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const a=await fetch(o);if(!a.ok)return n(`[TikTok] fetch failed: HTTP ${a.status}`),await De(o),o;const d=await a.blob(),i=(d.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${i} MB, type: ${d.type}`),d.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${d.size} bytes) — อาจเป็น thumbnail`);const l=await new Promise((c,p)=>{const g=new FileReader;g.onloadend=()=>c(g.result),g.onerror=()=>p(new Error("FileReader error")),g.readAsDataURL(d)});n(`[TikTok] Data URL พร้อม: ${(l.length/1024/1024).toFixed(1)} MB`),await new Promise(c=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:l},p=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),c()})})}catch(a){n(`[TikTok] Content script fetch error: ${a.message}`),await De(o)}return o}catch(e){return n(`[TikTok] captureVideoUrl error: ${e.message}`),null}}async function De(e){if(e.startsWith("https://"))try{await new Promise(t=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched via background: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),t()})})}catch{}}function ie(e){if(e){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:e,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const Y=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),ae=/Win/i.test(navigator.userAgent),Oe=Y?"🍎 Mac":ae?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${Oe}`),window.__VIDEO_COMPLETE_SENT__=!1;class re extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Ft=null,$t=null,Ne=!1;const _t=new Map;let Fe=0;function cn(){if(Ft)return Ft;try{const e=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Ft=new Worker(URL.createObjectURL(e)),Ft.onmessage=t=>{const o=_t.get(t.data);o&&(_t.delete(t.data),o())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Ft}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function dn(){if($t)return $t;if(Ne)return null;try{return $t=chrome.runtime.connect({name:"timer"}),$t.onMessage.addListener(e=>{const t=_t.get(e.id);t&&(_t.delete(e.id),t())}),$t.onDisconnect.addListener(()=>{$t=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),$t}catch{return Ne=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const f=e=>new Promise((t,o)=>{if(window.__NETFLOW_STOP__)return o(new re);let r=!1;const a=()=>{if(!r){if(r=!0,window.__NETFLOW_STOP__)return o(new re);t()}};setTimeout(a,e);const d=cn();if(d){const c=++Fe;_t.set(c,a),d.postMessage({id:c,ms:e});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e+2e3},()=>{chrome.runtime.lastError||a()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e},()=>{chrome.runtime.lastError?setTimeout(a,e):a()});return}catch{}const i=dn();if(i){const c=++Fe;_t.set(c,a),i.postMessage({cmd:"delay",id:c,ms:e});return}const l=setTimeout(a,e);f._lastId=l});function Et(){return!!window.__NETFLOW_STOP__}const et=()=>document.hidden;let Le=0;async function kt(){if(!document.hidden)return!1;const e=Date.now();if(e-Le<15e3)return!1;Le=e;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await f(1500),!0}catch{return!1}}async function wt(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(t=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>t()));const e=Date.now();for(;document.hidden&&Date.now()-e<5e3;)await f(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function ze(){var o;const e=["audio generation failed","couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","might violate","violate our policies","อาจละเมิด","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const r of t){if(r.closest("#netflow-engine-overlay"))continue;const a=(r.textContent||"").trim().toLowerCase();if(!(a.length>200||a.length<5)){for(const d of e)if(a.includes(d))return((o=r.textContent)==null?void 0:o.trim())||d}}return null}function pn(e){let t=e;const o=[/STRICT FACE & HEAD LOCK:[^.]*\./gi,/BODY LOCK:[^.]*\./gi,/HAIR LOCK:[^.]*\./gi,/FACE LOCK[^.]*\./gi,/PRODUCT IDENTITY LOCK:[^.]*\./gi,/LABEL LOCK:[^.]*\./gi,/PRODUCT EVERY FRAME:[^.]*\./gi,/TRANSITION STABILITY:[^.]*\./gi,/ANTI[_-]DUPLICATION:[^.]*\./gi,/ANTI[_-]TEXT[^.]*\./gi,/ANTI[_-]MORPH[^.]*\./gi,/ANTI[_-]DISTORTION[^.]*\./gi,/ANTI[_-]ADDITION[^.]*\./gi,/ANTI[_-]FLOATING[^.]*\./gi,/PROPS vs PRODUCT:[^.]*\./gi,/BRAND IDENTITY FREEZE[^.]*\./gi,/BRAND MORPHING[^.]*\./gi,/PRODUCT SIZE \(CRITICAL\):[^.]*\./gi,/PRODUCT SIZE REALISM:[^.]*\./gi,/VOICE DISCIPLINE:[^.]*\./gi,/ZERO INVENTION:[^.]*\./gi,/REALISM:[^.]*\./gi,/SCREEN CONTENT[^.]*\./gi,/SINGLE UTENSIL RULE[^.]*\./gi,/PRODUCT LOCK[^.]*\./gi,/FACE & HEAD LOCK[^.]*\./gi,/CLOTHING FIDELITY[^.]*\./gi,/FRONT[_-]FACING[^.]*\./gi];for(const i of o)t=t.replace(i,"");const r=["DO NOT","NEVER","FORBIDDEN","MUST NOT","ABSOLUTELY NO","IMMUTABLE","LOCKED","HIGHEST PRIORITY","#1 FORBIDDEN","Do NOT let","Do NOT add","Do NOT generate","Do NOT simplify","Do NOT invent","ZERO on-screen","NO split screen","NO collage","NO side-by-side","NO divided frames","never morph","never simplify","never change shape","never disappear","never be hidden","never exit","BRAND MORPHING IS","objects MUST NOT magically"];return t=t.split(/(?<=[.!])\s+/).filter(i=>!r.some(l=>i.includes(l))).join(" "),t=t.replace(/\s{2,}/g," ").trim(),t.length>1200&&(t=t.replace(/Render with extreme surface detail[^.]*\./gi,""),t=t.replace(/High-fidelity visual detail[^.]*\./gi,""),t=t.replace(/Product lit with soft rim light[^.]*\./gi,""),t=t.replace(/visible material texture[^.]*\./gi,""),t=t.replace(/Fluid motion, cinematic motion blur[^.]*\./gi,""),t=t.replace(/AI-observed appearance:[^.]*\./gi,""),t=t.replace(/Reference clothing:[^.]*\./gi,""),t=t.replace(/\s{2,}/g," ").trim()),n(`🛡️ Safe retry prompt: ${e.length} → ${t.length} chars (${Math.round((1-t.length/e.length)*100)}% reduction)`),t}async function Q(e){if(et()){e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),e.click();return}const t=e.getBoundingClientRect(),o=t.left+t.width/2,r=t.top+t.height/2,a={bubbles:!0,cancelable:!0,clientX:o,clientY:r,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",a)),await f(80),e.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",a)),e.dispatchEvent(new MouseEvent("click",a)),await f(50),e.click()}function Lt(e){const t=e.getBoundingClientRect(),o=t.left+t.width/2,r=t.top+t.height/2,a={bubbles:!0,cancelable:!0,clientX:o,clientY:r};e.dispatchEvent(new PointerEvent("pointerenter",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",a)),e.dispatchEvent(new PointerEvent("pointerover",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",a)),e.dispatchEvent(new PointerEvent("pointermove",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",a))}function fn(e){const t=[],o=document.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols'], [data-icon]");for(const r of o){if((r.textContent||"").trim()!==e)continue;let d=r,i=null,l=1/0;for(let c=0;c<20&&d&&(d=d.parentElement,!(!d||d===document.body));c++){if(et()){c>=3&&d.children.length>0&&!i&&(i=d);continue}const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const g=p.width*p.height;g<l&&(i=d,l=g)}}i&&!t.includes(i)&&t.push(i)}return t.sort((r,a)=>{const d=r.getBoundingClientRect(),i=a.getBoundingClientRect();return d.left-i.left}),t}function se(e=!1){const t=[],o=document.querySelectorAll("video");for(const i of o){let l=i.parentElement;for(let c=0;c<10&&l;c++){if(et()){if(c>=3&&l.children.length>0){t.push({el:l,left:0});break}l=l.parentElement;continue}const p=l.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){t.push({el:l,left:p.left});break}l=l.parentElement}}const r=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const i of r){const l=(i.textContent||"").trim();if(l==="play_arrow"||l==="play_circle"||l==="videocam"){let c=i.parentElement;for(let p=0;p<10&&c;p++){if(et()){if(p>=3&&c.children.length>0){t.push({el:c,left:0});break}c=c.parentElement;continue}const g=c.getBoundingClientRect();if(g.width>120&&g.height>80&&g.width<window.innerWidth*.7&&g.top>=-50&&g.left<window.innerWidth*.75){t.push({el:c,left:g.left});break}c=c.parentElement}}}const a=document.querySelectorAll("img");for(const i of a){const l=(i.alt||"").toLowerCase();if(l.includes("video")||l.includes("วิดีโอ")){let c=i.parentElement;for(let p=0;p<10&&c;p++){if(et()){if(p>=3&&c.children.length>0){t.push({el:c,left:0});break}c=c.parentElement;continue}const g=c.getBoundingClientRect();if(g.width>120&&g.height>80&&g.width<window.innerWidth*.7&&g.top>=-50&&g.left<window.innerWidth*.75){t.push({el:c,left:g.left});break}c=c.parentElement}}}const d=Array.from(new Set(t.map(i=>i.el))).map(i=>t.find(l=>l.el===i));if(d.sort((i,l)=>i.left-l.left),d.length>0){const i=d[0].el,l=i.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${l.left.toFixed(0)},${l.top.toFixed(0)}) ขนาด ${l.width.toFixed(0)}x${l.height.toFixed(0)}`),i}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function un(){const e=fn("image");if(e.length>0){const o=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${o.left.toFixed(0)},${o.top.toFixed(0)}) ขนาด ${o.width.toFixed(0)}x${o.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const o of t){let r=o.parentElement;for(let a=0;a<10&&r;a++){if(et()){if(a>=3&&r.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),r;r=r.parentElement;continue}const d=r.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),r;r=r.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function gn(e,t){var l;const[o,r]=e.split(","),a=((l=o.match(/:(.*?);/))==null?void 0:l[1])||"image/png",d=atob(r),i=new Uint8Array(d.length);for(let c=0;c<d.length;c++)i[c]=d.charCodeAt(c);return new File([i],t,{type:a})}async function mn(e,t=1024,o=.8){try{if(e.length<5e5)return n(`🗜️ รูปเล็กพอ (${(e.length/1024).toFixed(0)} KB base64) — ไม่บีบอัด`),e;n(`🗜️ รูปใหญ่ (${(e.length/1024).toFixed(0)} KB base64) — กำลังบีบอัด...`);const r=new Image;await new Promise((g,y)=>{r.onload=()=>g(),r.onerror=()=>y(new Error("Image load failed")),r.src=e});let{width:d,height:i}=r;if(d>t||i>t){const g=t/Math.max(d,i);d=Math.round(d*g),i=Math.round(i*g)}const l=document.createElement("canvas");l.width=d,l.height=i;const c=l.getContext("2d");if(!c)return e;c.drawImage(r,0,0,d,i);const p=l.toDataURL("image/jpeg",o);return n(`🗜️ บีบอัดแล้ว: ${(e.length/1024).toFixed(0)} KB → ${(p.length/1024).toFixed(0)} KB (${d}x${i})`),l.width=0,l.height=0,p}catch(r){return R(`🗜️ บีบอัดล้มเหลว: ${r.message} — ใช้รูปต้นฉบับ`),e}}function ht(e){var a;const t=[],o=new WeakSet,r=["i.google-symbols","i[class*='google-symbols']",".material-symbols-outlined",".material-icons",".material-symbols-rounded",".material-symbols-sharp","i[class*='material']","span[class*='material']","i[class*='icon']","span[class*='icon']","[data-icon]","[class*='gm-icon']","[class*='gmat-icon']","i"];for(const d of r){for(const i of document.querySelectorAll(d))if(((a=i.textContent)==null?void 0:a.trim())===e){const l=i.closest("button");l&&!o.has(l)&&(o.add(l),t.push(l))}if(t.length>0)break}if(t.length===0)for(const d of document.querySelectorAll("button")){const i=(d.getAttribute("aria-label")||"").toLowerCase();(i===e.toLowerCase()||i.includes(e.toLowerCase()))&&(o.has(d)||(o.add(d),t.push(d)))}return t}async function hn(e=5e3){const t=Date.now();for(;Date.now()-t<e;){const o=document.querySelectorAll('input[type="file"]');if(o.length>0)return o[o.length-1];await f(300)}return null}function le(){const e=["add","add_2","add_circle","add_circle_outline","attach_file","attach_file_add","attachment","note_add"];let t=[];for(const i of e)if(t=ht(i),t.length>0)break;if(t.length>0){let i=null,l=0;for(const c of t){const p=c.getBoundingClientRect();p.y>l&&(l=p.y,i=c)}if(i)return n(`พบปุ่ม "+" ของ Prompt Bar (icon) ที่ y=${l.toFixed(0)}`),i}n("ไม่พบปุ่มเพิ่มจากไอคอน — ลอง fallback ทั้งหมด");const o=["add","attach","upload","create","insert","plus","เพิ่ม","แนบ","อัปโหลด","สร้าง"];for(const i of document.querySelectorAll("button")){const l=(i.getAttribute("aria-label")||"").toLowerCase(),c=(i.getAttribute("title")||"").toLowerCase();if(o.some(p=>l.includes(p)||c.includes(p))){if(et())return n('พบปุ่ม "+" (aria/title) hidden mode'),i;const p=i.getBoundingClientRect();if(p.bottom>window.innerHeight*.6&&p.width<80&&p.height<80)return n(`พบปุ่ม "+" (aria="${l}" title="${c}") ที่ y=${p.y.toFixed(0)}`),i}}const r=document.querySelectorAll("button");for(const i of r){const l=(i.textContent||"").trim();if(l!=="+"&&l!=="add"&&l!=="Add")continue;if(et())return i;const c=i.getBoundingClientRect();if(c.bottom>window.innerHeight*.6&&c.width<80&&c.height<80)return n(`พบปุ่ม "+" (text="${l}") ที่ y=${c.y.toFixed(0)}`),i}const a=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');if(a){const i=a.getBoundingClientRect();let l=null,c=1/0;for(const p of r){const g=p.getBoundingClientRect();if(g.width<10||g.height<10||g.width>100||g.height>100||Math.abs(g.top-i.top)>80)continue;const y=Math.abs(g.left-i.left)+Math.abs(g.top-i.top);y<c&&(c=y,l=p)}if(l)return n(`พบปุ่ม "+" (ใกล้ prompt bar, dist=${c.toFixed(0)})`),l}for(const i of r){const l=i.querySelector("svg");if(!l)continue;const c=l.querySelectorAll("path, line, polygon"),p=Array.from(c).map(g=>g.getAttribute("d")||"").join(" ");if(p.includes("M12")||p.includes("M11")||p.includes("M10")){if(et())return i;const g=i.getBoundingClientRect();if(g.bottom>window.innerHeight*.6&&g.width<80&&g.height<80)return n(`พบปุ่ม "+" (SVG) ที่ y=${g.y.toFixed(0)}`),i}}const d=[];for(const i of r){const l=i.getBoundingClientRect();if(l.bottom>window.innerHeight*.6&&l.width>0){const c=(i.textContent||"").trim().substring(0,30),p=i.getAttribute("aria-label")||"",g=(i.className||"").substring(0,40),y=i.querySelector("i, span[class*='icon'], svg")?"has-icon":"no-icon";d.push(`"${c}" aria="${p}" cls="${g}" ${y} y=${l.y.toFixed(0)}`)}}return R(`ไม่พบปุ่ม "+" — ปุ่มที่พบบริเวณล่าง (${d.length}): ${d.slice(0,5).join(" | ")}`),null}function ce(){for(const r of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const a=ht(r);let d=null,i=0;for(const l of a){const c=l.getBoundingClientRect();c.y>i&&(i=c.y,d=l)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${r}" ที่ y=${i.toFixed(0)}`),d}const e=document.querySelectorAll("button");let t=null,o=0;for(const r of e){if(et())break;const a=r.getBoundingClientRect();if(a.bottom>window.innerHeight*.7&&a.right>window.innerWidth*.5){const d=Math.abs(a.width-a.height)<10&&a.width<60,i=a.y+a.x+(d?1e3:0);i>o&&(o=i,t=r)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const r of e){const a=(r.getAttribute("aria-label")||"").toLowerCase();if(a.includes("generate")||a.includes("submit")||a.includes("send")||a.includes("สร้าง"))return r}return null}function de(){const e=document.querySelectorAll("textarea");for(const r of e)if(et()||r.getBoundingClientRect().bottom>window.innerHeight*.5)return r;const t=document.querySelectorAll('[contenteditable="true"]');for(const r of t)if(et()||r.getBoundingClientRect().bottom>window.innerHeight*.5)return r;const o=document.querySelectorAll("input[type='text'], input:not([type])");for(const r of o){const a=r.placeholder||"";if(a.includes("สร้าง")||a.includes("prompt")||a.includes("describe"))return r}return e.length>0?e[e.length-1]:null}async function zt(e,t){var o,r,a,d;e.focus(),await f(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const i=new DataTransfer;i.setData("text/plain",t),i.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:i});e.dispatchEvent(l),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const c=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:i});e.dispatchEvent(c),await f(800);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(i){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await f(100);const i=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(i);const l=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(l),await f(800);const c=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(i){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await f(200);const i=new DataTransfer;i.setData("text/plain",t),i.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const l=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:i});e.dispatchEvent(l),await f(800);const c=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(i){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((o=navigator.clipboard)!=null&&o.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const l=document.createElement("textarea");l.value=t,l.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(l),l.focus(),l.select(),document.execCommand("copy"),document.body.removeChild(l),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await f(200),document.execCommand("paste"),await f(500);const i=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(i.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${i.length} ตัวอักษร)`);return}}catch(i){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const i=Object.keys(e).find(l=>l.startsWith("__reactFiber$")||l.startsWith("__reactInternalInstance$"));if(i){let l=e[i];for(let c=0;c<30&&l;c++){const p=l.memoizedProps,g=l.memoizedState;if((r=p==null?void 0:p.editor)!=null&&r.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const y=p.editor;y.selection,y.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(a=g==null?void 0:g.memoizedState)==null?void 0:a.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),g.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}l=l.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(i){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${i.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Vt(){let e=0;const t=document.querySelectorAll("img");for(const r of t){if(r.closest("#netflow-engine-overlay")||!r.src)continue;if(et()){e++;continue}const a=r.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&r.offsetParent!==null&&e++}const o=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const r of o){if(r.closest("#netflow-engine-overlay"))continue;if(et()){e++;continue}const a=r.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&r.offsetParent!==null&&e++}return e}async function Ve(e,t){n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const o=await mn(e),r=gn(o,t);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const a=Vt();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const d=Y?1.8:1,i=HTMLInputElement.prototype.click,l=HTMLInputElement.prototype.showPicker,c=()=>{HTMLInputElement.prototype.click=function(){if(this.type==="file"){n("🚫 บล็อก file dialog จาก click()");return}return i.call(this)},typeof l=="function"&&(HTMLInputElement.prototype.showPicker=function(){if(this.type==="file"){n("🚫 บล็อก file dialog จาก showPicker()");return}return l.call(this)})},p=()=>{HTMLInputElement.prototype.click=i,typeof l=="function"&&(HTMLInputElement.prototype.showPicker=l)};c();try{n("── วิธี A: ฉีดไฟล์ลง file input โดยตรง (ไม่คลิก UI) ──");let g=Ge();if(g){n(`พบ file input: accept="${g.accept}" multiple=${g.multiple}`),He(g,r,t),await f(3e3);const w=Vt();return w>a?n(`✅ วิธี A สำเร็จ — รูปย่อเพิ่ม ${a} → ${w}`):n("✅ วิธี A — ฉีดไฟล์แล้ว (ถือว่าสำเร็จ ไม่ลองซ้ำ)"),!0}n("ไม่พบ file input[accept=image/*] — ลองวิธี B"),n("── วิธี B: คลิก '+' → เปิด dialog → ฉีดไฟล์ ──"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300);let y=le();if(y||(await f(2e3*d),y=le()),!y){const w=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');w&&(w.click(),await f(2e3*d)),y=le()}if(y){if(await Q(y),n("คลิกปุ่ม '+' (Create) ✅"),await f(1500*d),g=Ge(),g||(g=await hn(Y?5e3:3e3)),g)return He(g,r,t),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(2e3),n("✅ วิธี B — ฉีดไฟล์แล้ว"),!0;document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else R("ไม่พบปุ่ม '+' บน Prompt Bar");return n("── วิธี C: drag-drop ──"),await bn(r,a)}finally{setTimeout(()=>p(),1e4)}}function Ge(){const e=document.querySelectorAll('input[type="file"][accept*="image"]');if(e.length>0)return e[e.length-1];const t=document.querySelectorAll('input[type="file"]');return t.length>0?t[t.length-1]:null}function He(e,t,o){var d,i;const r=new DataTransfer;r.items.add(t),e.files=r.files,n(`ฉีดไฟล์ ${o} เข้า file input (${((d=e.files)==null?void 0:d.length)??0} ไฟล์)`);const a=e._valueTracker;a&&(a.setValue(""),n("รีเซ็ต React _valueTracker")),e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));try{const l=(i=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"files"))==null?void 0:i.set;l&&(l.call(e,r.files),e.dispatchEvent(new Event("change",{bubbles:!0})))}catch{}n("ส่ง change + input event ✅")}async function bn(e,t){n("── Fallback: drag-and-drop ลงบน workspace ──");const o=new DataTransfer;o.items.add(e);let r=null;const a=document.querySelectorAll('[class*="workspace"], [class*="drop"], [class*="media"], main, [role="main"]');for(const g of a){const y=g.getBoundingClientRect();if(y.width>200&&y.height>200){r=g;break}}r||(r=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)||document.body);const d=r.getBoundingClientRect(),i=d.left+d.width/2,l=d.top+d.height/2,c={bubbles:!0,cancelable:!0,clientX:i,clientY:l,dataTransfer:o};r.dispatchEvent(new DragEvent("dragenter",c)),await f(100),r.dispatchEvent(new DragEvent("dragover",c)),await f(100),r.dispatchEvent(new DragEvent("drop",c)),n(`ส่ง drag-drop ลง <${r.tagName}>`);const p=Date.now();for(;Date.now()-p<8e3;){if(Vt()>t)return n("✅ drag-drop สำเร็จ — พบรูปย่อใหม่"),!0;await f(1e3)}return R("❌ drag-drop ล้มเหลว — ไม่พบรูปย่อใหม่"),!1}async function wn(e,t){var g,y;n("=== ขั้น 0: ตั้งค่า Flow ===");let o=null;for(let w=0;w<10;w++){const N=document.querySelectorAll("button, div, span, [role='button']");for(const m of N){const s=(m.textContent||"").trim();if(!(s.length>80)&&(s.includes("Nano Banana")||s.includes("Imagen")||s.includes("วิดีโอ")||s.includes("รูปภาพ")||s.includes("Image")||s.includes("Video"))){const b=m.getBoundingClientRect();b.bottom>window.innerHeight*.7&&b.width>30&&b.height>10&&(!o||(m.textContent||"").length<(o.textContent||"").length)&&(o=m)}}if(o){n(`พบปุ่มตั้งค่าจากข้อความ: "${(o.textContent||"").substring(0,40).trim()}"`);break}const T=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons, .material-symbols-rounded, span[class*='material'], span[class*='icon'], i");for(const m of T){const s=((g=m.textContent)==null?void 0:g.trim())||"";if(s.includes("crop")||s==="aspect_ratio"||s==="photo_size_select_large"){const b=m.closest("button, div[role='button'], [role='button']")||m.parentElement;if(b){const P=b.getBoundingClientRect();if(P.bottom>window.innerHeight*.7&&P.width>0){o=b,n(`พบปุ่มตั้งค่าจากไอคอน: ${s}`);break}}}}if(o)break;for(const m of N){const s=(m.textContent||"").trim();if(!(s.length>40)&&/x[1-4]/.test(s)&&(s.includes("วิดีโอ")||s.includes("รูปภาพ")||s.includes("Video")||s.includes("Image"))){const b=m.getBoundingClientRect();if(b.bottom>window.innerHeight*.7&&b.width>30){o=m,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${s.substring(0,40)}"`);break}}}if(o)break;n(`⏳ รอปุ่มตั้งค่า... (${w+1}/10)`),await f(1e3)}if(!o)return R("ไม่พบปุ่มตั้งค่า (หมด 10 รอบ)"),!1;let r=o;const a=o.closest("button");if(a&&a!==o){const w=a.getBoundingClientRect();w.width>0&&w.width<250&&w.height<80?(r=a,n(`ปุ่มตั้งค่า: ใช้ parent button (${w.width.toFixed(0)}×${w.height.toFixed(0)})`)):n(`ปุ่มตั้งค่า: parent button ใหญ่เกิน (${w.width.toFixed(0)}×${w.height.toFixed(0)}) — คลิกตรงๆ`)}await Q(r),n("คลิกปุ่มตั้งค่าแล้ว (robustClick)"),await f(3500);let d=!1,i=null;for(let w=0;w<3&&!i;w++){w>0&&(n(`⏳ ลองหาแท็บ Image อีกครั้ง (${w+1}/3)...`),await Q(r),await f(2e3));const N=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"], [class*="tab_slider_trigger"][role="tab"]');for(const T of N){const m=T.getAttribute("aria-controls")||"",s=T.id||"";if(m.toUpperCase().includes("IMAGE")||s.toUpperCase().includes("IMAGE")){i=T,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${m})`);break}}if(!i)for(const T of document.querySelectorAll('[role="tab"]')){const m=T.id||"";if(m.toUpperCase().includes("IMAGE")){i=T,n(`พบแท็บ Image ผ่าน id: ${m}`);break}}if(!i)for(const T of document.querySelectorAll('[role="tab"]')){const m=T.getAttribute("aria-label")||((y=T.textContent)==null?void 0:y.trim())||"";if(m.toLowerCase().includes("image")||m.includes("รูปภาพ")){i=T,n(`พบแท็บ Image ผ่าน accessible name: "${m.substring(0,30)}"`);break}}if(!i)for(const T of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const m=(T.textContent||"").trim();if(!(m.length>30)&&(m==="Image"||m.endsWith("Image")||m==="รูปภาพ"||m==="ภาพ"||m.includes("รูปภาพ"))&&!m.includes("Video")&&!m.includes("วิดีโอ")){const s=T.getBoundingClientRect();if(s.width>0&&s.height>0){i=T,n(`พบแท็บ Image ผ่านข้อความ: "${m}"`);break}}}if(!i)for(const T of document.querySelectorAll('[data-radix-portal], [data-radix-popper-content-wrapper], [role="dialog"], [role="menu"]')){for(const m of T.querySelectorAll('button, [role="tab"]')){const s=(m.textContent||"").trim().toLowerCase();if((s==="image"||s.includes("image"))&&!s.includes("video")){i=m,n(`พบแท็บ Image ใน Radix portal: "${s}"`);break}}if(i)break}i||await f(1e3)}if(i){const w=i.getAttribute("data-state")||"",N=i.getAttribute("aria-selected")||"";w==="active"||N==="true"?(d=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก")):(await Q(i),d=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await f(400))}if(!d&&!i){n("⚠️ ลองสลับโหมดด้วยวิธีตรง..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500);const w=document.querySelectorAll("button, div, span, [role='button'], [role='tab']");for(const N of w){const T=(N.textContent||"").trim();if(T.length>40)continue;const m=N.getBoundingClientRect();if(!(m.bottom<window.innerHeight*.7)&&!(m.width<20||m.height<10)&&(T==="Video"||T==="วิดีโอ")){await Q(N),n(`คลิก "${T}" เพื่อเปิดเมนูเปลี่ยนโหมด`),await f(2e3);for(const s of document.querySelectorAll('[role="option"], [role="menuitem"], [role="tab"], button, div, span')){const b=(s.textContent||"").trim();if(!(b.length>20)&&(b==="Image"||b==="รูปภาพ"||b==="ภาพ")&&!b.includes("Video")&&!b.includes("วิดีโอ")){const P=s.getBoundingClientRect();if(P.width>0&&P.height>0){await Q(s),d=!0,n(`✅ สลับเป็น Image ผ่านเมนูตรง: "${b}"`),await f(500);break}}}break}}}d||R("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว หรือต้องสลับด้วยตนเอง");const l=e==="horizontal"?"แนวนอน":"แนวตั้ง",c=e==="horizontal"?"landscape":"portrait";for(const w of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const N=(w.textContent||"").trim();if(!(N.length>30)&&(N===l||N.includes(l)||N.toLowerCase()===c||N.toLowerCase().includes(c))){const T=w.getBoundingClientRect(),m={bubbles:!0,cancelable:!0,clientX:T.left+T.width/2,clientY:T.top+T.height/2,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",m)),await f(80),w.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",m)),w.dispatchEvent(new MouseEvent("click",m)),n(`เลือกทิศทาง: ${l}`),await f(400);break}}const p=`x${t}`;for(const w of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const N=(w.textContent||"").trim();if(!(N.length>10)&&(N===p||N===`${t}`)){const T=w.getBoundingClientRect(),m={bubbles:!0,cancelable:!0,clientX:T.left+T.width/2,clientY:T.top+T.height/2,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",m)),await f(80),w.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",m)),w.dispatchEvent(new MouseEvent("click",m)),n(`เลือกจำนวน: ${p}`),await f(400);break}}return await f(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),await Q(r),n("ปิดหน้าตั้งค่าแล้ว"),await f(600),!0}async function xn(e){const t=e==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",o=e==="quality"?"Quality":"Fast",r=e==="quality"?"Fast":"Quality",a=e==="quality"?"คุณภาพ":"เร็ว",d=e==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${t} (${a}) ===`);let i=null;const l=Date.now()+1e4;for(;!i&&Date.now()<l;){const m=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const s of m){const b=(s.textContent||"").trim();if(!(b.length>80)&&(b.includes("Veo")||b.includes("veo"))&&(s.hasAttribute("aria-haspopup")||s.hasAttribute("aria-expanded")||s.getAttribute("role")==="combobox"||b.includes("arrow_drop_down")||s.querySelector("svg"))){i=s,n(`พบปุ่ม Veo dropdown (Strategy A): "${b.substring(0,50).trim()}"`);break}}if(!i)for(const s of m){const b=(s.textContent||"").trim();if(!(b.length>80)&&(b.includes("Veo")||b.includes("veo"))){const P=s.getBoundingClientRect();if(P.width>0&&P.height>0){i=s,n(`พบปุ่ม Veo dropdown (Strategy B): "${b.substring(0,50).trim()}"`);break}}}if(!i)for(const s of m){const b=(s.textContent||"").trim();if(!(b.length>50)&&(b.includes("Fast")||b.includes("Quality")||b.includes("เร็ว")||b.includes("คุณภาพ"))&&(s.hasAttribute("aria-haspopup")||s.hasAttribute("aria-expanded")||s.querySelector("svg"))){i=s,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${b.substring(0,50).trim()}"`);break}}if(!i){const s=document.querySelectorAll("div, span, button, [role='button']");for(const b of s){const P=(b.textContent||"").trim();if(P==="Veo 3.1 - Fast"||P==="Veo 3.1 - Quality"||P==="Fast"||P==="Quality"||P==="Veo 3.1 - เร็ว"||P==="Veo 3.1 - คุณภาพสูง"||P==="Veo 3.1 - คุณภาพ"||P==="Veo 2 - Fast"||P==="Veo 2 - Quality"){const K=b.getBoundingClientRect();if(K.width>0&&K.height>0){i=b,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${P}"`);break}}}}if(!i){const s=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const b of s){const P=(b.textContent||"").trim();if(!(P.length>60)&&(P.includes("3.1")||P.includes("model")||P.includes("โมเดล"))){const K=b.getBoundingClientRect();if(K.bottom>window.innerHeight*.4&&K.width>0&&K.height>0){i=b,n(`พบปุ่ม model selector (Strategy E): "${P.substring(0,50).trim()}"`);break}}}}i||await f(1e3)}if(!i)return R("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const c=(i.textContent||"").trim();if(c.includes(t)||c.includes(o)&&!c.includes(r)||c.includes(a)&&!c.includes(d))return n(`✅ Veo quality เป็น "${c}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=i.getBoundingClientRect(),g=p.left+p.width/2,y=p.top+p.height/2,w={bubbles:!0,cancelable:!0,clientX:g,clientY:y,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",w)),await f(80),i.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",w)),i.dispatchEvent(new MouseEvent("click",w)),n("คลิกเปิด Veo quality dropdown"),await f(1e3);let N=!1;const T=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const m of T){const s=(m.textContent||"").trim();if((s===t||s===o||s.includes(t)||s.includes(a))&&!s.includes("arrow_drop_down")){const P=m.getBoundingClientRect();if(P.width>0&&P.height>0){const K=P.left+P.width/2,F=P.top+P.height/2,O={bubbles:!0,cancelable:!0,clientX:K,clientY:F,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",O)),await f(80),m.dispatchEvent(new PointerEvent("pointerup",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",O)),m.dispatchEvent(new MouseEvent("click",O)),n(`✅ เลือก "${s}" สำเร็จ`),N=!0;break}}}return N?(await f(600),!0):(R(`ไม่พบตัวเลือก "${t}" หรือ "${a}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),!1)}async function yn(e){var P,K,F,O;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,o=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),r=o?o[1]:"unknown",a=Y?"macOS":ae?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",d=Y?((K=(P=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:P[1])==null?void 0:K.replace(/_/g,"."))||"":ae&&((F=t.match(/Windows NT ([0-9.]+)/))==null?void 0:F[1])||"",i=navigator.language||"unknown",l=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${a} ${d} | Chrome ${r}`),n(`🌐 ภาษา: ${i} | หน้าจอ: ${l} | แพลตฟอร์ม: ${Oe}`),n("══════════════════════════════════════════");try{qt(e.theme)}catch{}try{Xt(e.sceneCount||1)}catch(h){console.warn("Overlay show error:",h)}const c=[],p=[];if(e.needsNewProject){try{_("open-flow","done"),_("new-project","active"),n("=== สร้างโปรเจคใหม่ ===");let h=null;for(let S=0;S<15;S++){const B=document.querySelectorAll("button, [role='button']");for(const u of B){const v=(u.textContent||"").trim().toLowerCase();if(v.includes("new project")||v.includes("สร้างโปรเจค")||v.includes("โปรเจกต์ใหม่")){h=u;break}}if(!h){const u=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], i[class*='material'], span[class*='material'], span[class*='icon'], span[class*='google-symbols'], i");for(const v of u)if((v.textContent||"").trim()==="add_2"){const x=v.closest("button");if(x){h=x;break}}if(!h){const v=ht("add_2");v.length>0&&(h=v[0])}}if(h)break;n(`⏳ รอปุ่ม New Project... (${S+1}/15)`),await f(1e3)}if(h){n(`✅ พบปุ่ม New Project: "${(h.textContent||"").trim().substring(0,30)}"`),await Q(h),await f(500),await Q(h),await f(2e3);let S=!1;for(let B=0;B<20;B++){const u=document.body.innerText||"";if(u.includes("Start creating")||u.includes("เริ่มสร้าง")||u.includes("What do you want to create")||u.includes("drop media")||document.querySelector("textarea, input[placeholder]")){S=!0;break}await f(500)}n(S?"✅ Workspace พร้อมแล้ว":"⚠️ Workspace อาจยังไม่โหลดเสร็จ — ดำเนินการต่อ"),_("new-project","done"),c.push("✅ New Project")}else R("ไม่พบปุ่ม New Project — อาจอยู่ใน workspace แล้ว ดำเนินการต่อ"),_("new-project","skipped"),c.push("⚠️ New Project (skipped)")}catch(h){R(`New Project error: ${h.message}`),_("new-project","error"),c.push("⚠️ New Project")}await f(3e3)}else{try{_("open-flow","skipped")}catch{}try{_("new-project","skipped")}catch{}await f(3e3)}try{_("settings","active");const h=e.orientation||"vertical",S=e.outputCount||1,B=await wn(h,S);c.push(B?"✅ Settings":"⚠️ Settings"),_("settings",B?"done":"error")}catch(h){R(`ตั้งค่าผิดพลาด: ${h.message}`),c.push("⚠️ Settings"),_("settings","error")}try{const h=e.veoQuality||"fast";await xn(h)?(c.push(`✅ Veo ${h}`),n(`✅ Veo quality: ${h}`)):(c.push("⚠️ Veo quality"),R("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(h){R(`Veo quality error: ${h.message}`),c.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),await f(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const g=()=>{const h=document.querySelectorAll("span, div, p, label");for(const S of h){const B=(S.textContent||"").trim();if(/^\d{1,3}%$/.test(B)){if(B==="100%")return null;const u=S.getBoundingClientRect();if(u.width>0&&u.height>0&&u.top>0&&u.top<window.innerHeight)return B}}return null},y=async h=>{n(`รอการอัพโหลด ${h} เสร็จ...`),await f(2e3);const S=Date.now(),B=6e4;let u="",v=Date.now();const x=15e3;for(;Date.now()-S<B;){const $=g();if($){if($!==u)u=$,v=Date.now(),n(`กำลังอัพโหลด: ${$} — รอ...`);else if(Date.now()-v>x){n(`✅ อัพโหลด ${h} — % ค้างที่ ${$} นาน ${x/1e3} วินาที ถือว่าเสร็จ`),await f(1e3);return}await f(1500)}else{n(`✅ อัพโหลด ${h} เสร็จ — ไม่พบตัวบอก %`),await f(1e3);return}}R(`⚠️ อัพโหลด ${h} หมดเวลาหลัง ${B/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){_("upload-char","active");try{const h=await Ve(e.characterImage,"character.png");c.push(h?"✅ ตัวละคร":"⚠️ ตัวละคร"),h||p.push("character upload failed"),_("upload-char",h?"done":"error")}catch(h){R(`อัพโหลดตัวละครผิดพลาด: ${h.message}`),c.push("❌ ตัวละคร"),p.push("character upload error"),_("upload-char","error")}await y("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else It("upload-char");if(e.productImage){_("upload-prod","active");try{const h=await Ve(e.productImage,"product.png");c.push(h?"✅ สินค้า":"⚠️ สินค้า"),h||p.push("product upload failed"),_("upload-prod",h?"done":"error")}catch(h){R(`อัพโหลดสินค้าผิดพลาด: ${h.message}`),c.push("❌ สินค้า"),p.push("product upload error"),_("upload-prod","error")}await y("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else It("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800);const w=g();w&&(n(`⚠️ อัพโหลดยังแสดง ${w} — รอเพิ่มเติม...`),await y("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await f(1e3);const N=(e.characterImage?1:0)+(e.productImage?1:0);if(N>0){let h=Vt();h<N&&(n(`⏳ เห็นรูปย่อแค่ ${h}/${N} — รอ 3 วินาที...`),await f(3e3),h=Vt()),h>=N?n(`✅ ยืนยันรูปย่ออ้างอิง: ${h}/${N}`):R(`⚠️ คาดว่าจะมี ${N} รูปย่อ แต่พบ ${h} — ดำเนินการต่อ`)}if(Et()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{Ot(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),_("img-prompt","active"),await f(1e3);const T=de();T?(await zt(T,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),c.push("✅ Prompt"),_("img-prompt","done")):(R("ไม่พบช่องป้อนข้อความ Prompt"),c.push("❌ Prompt"),p.push("prompt input not found"),_("img-prompt","error")),await f(800);const m=new Set;document.querySelectorAll("img").forEach(h=>{h.src&&m.add(h.src)}),n(`บันทึกรูปเดิม: ${m.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),_("img-generate","active"),await f(500);const s=ce();if(s){const h=s.getBoundingClientRect(),S=h.left+h.width/2,B=h.top+h.height/2,u={bubbles:!0,cancelable:!0,clientX:S,clientY:B,button:0};s.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mousedown",u)),await f(80),s.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mouseup",u)),s.dispatchEvent(new MouseEvent("click",u)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),c.push("✅ Generate"),await f(500),s.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mousedown",u)),await f(80),s.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mouseup",u)),s.dispatchEvent(new MouseEvent("click",u)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),_("img-generate","done")}else R("ไม่พบปุ่ม → Generate"),c.push("❌ Generate"),p.push("generate button not found"),_("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),_("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await f(15e3);const h=()=>{const x=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of x){if($.closest("#netflow-engine-overlay"))continue;const M=($.textContent||"").trim();if(M.length>10)continue;const E=M.match(/(\d{1,3})\s*%/);if(!E)continue;const k=parseInt(E[1],10);if(k<1||k>100)continue;if(et())return k;const C=$.getBoundingClientRect();if(!(C.width===0||C.width>150)&&!(C.top<0||C.top>window.innerHeight))return k}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let S=null,B=-1,u=0;const v=Date.now();for(;!S&&Date.now()-v<18e4;){const x=document.querySelectorAll("img");for(const $ of x){if(m.has($.src)||!($.alt||"").toLowerCase().includes("generated"))continue;if(et()?$.naturalWidth>120&&$.naturalHeight>120:(()=>{const k=$.getBoundingClientRect();return k.width>120&&k.height>120&&k.top>0&&k.top<window.innerHeight*.85})()){const k=$.closest("div");if(k){S=k,n(`พบรูป AI จาก alt="${$.alt}": ${$.src.substring(0,80)}...${et()?" (hidden-mode)":""}`);break}}}if(!S)for(const $ of x){if(m.has($.src))continue;const M=$.closest("div"),E=(M==null?void 0:M.textContent)||"";if(E.includes("product.png")||E.includes("character.png")||E.includes(".png")||E.includes(".jpg"))continue;if(et()?$.naturalWidth>120&&$.naturalHeight>120:(()=>{const C=$.getBoundingClientRect();return C.width>120&&C.height>120&&C.top>0&&C.top<window.innerHeight*.85})()){const C=$.closest("div");if(C){S=C,n(`พบรูปใหม่ (สำรอง): ${$.src.substring(0,80)}...${et()?" (hidden-mode)":""}`);break}}}if(!S){if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const $=u>0?Date.now()-u:1/0;if(B<20||$>3e4){const E=ze();if(E){R(`❌ สร้างรูปล้มเหลว: ${E}`),p.push(`image gen failed: ${E}`),_("img-wait","error");break}}const M=h();if(M!==null)M!==B&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${M}%`),B=M,_("img-wait","active",M)),u=Date.now();else if(B>30){const E=Math.floor((Date.now()-u)/1e3);E>=3&&n(`🖼️ % หายที่ ${B}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&E>=5&&B>50&&(n("🍎 Tab ซ่อน + รูปน่าจะเสร็จ → เปิด tab เต็มเพื่อตรวจหารูป"),await wt(),await f(3e3))}document.hidden&&B>0&&Date.now()-u>1e4&&await kt(),document.hidden&&B<1&&Date.now()-v>3e4&&await kt(),await f(3e3)}}if(!S)R("หมดเวลารอรูปที่สร้าง"),c.push("⚠️ Wait Image"),_("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),c.push("✅ Image Found"),_("img-wait","done",100),await wt();const x=S.getBoundingClientRect(),$=x.left+x.width/2,M=x.top+x.height/2,E={bubbles:!0,cancelable:!0,clientX:$,clientY:M};S.dispatchEvent(new PointerEvent("pointerenter",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseenter",E)),S.dispatchEvent(new PointerEvent("pointerover",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseover",E)),S.dispatchEvent(new PointerEvent("pointermove",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousemove",E)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await f(1500);let k=null;for(const C of["more_vert","more_horiz","more"]){const G=ht(C);for(const I of G){const A=I.getBoundingClientRect();if(A.top>=x.top-20&&A.top<=x.bottom&&A.right>=x.right-150&&A.right<=x.right+20){k=I;break}}if(k)break}if(!k){const C=document.querySelectorAll("button");for(const G of C){const I=G.getBoundingClientRect();if(I.width<50&&I.height<50&&I.top>=x.top-10&&I.top<=x.top+60&&I.left>=x.right-80){const A=G.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const z of A)if((((O=z.textContent)==null?void 0:O.trim())||"").includes("more")){k=G;break}if(k)break;const L=G.getAttribute("aria-label")||"";if(L.includes("เพิ่มเติม")||L.includes("more")){k=G;break}}}}if(!k)R("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),c.push("⚠️ 3-dots");else{const C=k.getBoundingClientRect(),G=C.left+C.width/2,I=C.top+C.height/2,A={bubbles:!0,cancelable:!0,clientX:G,clientY:I,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",A)),await f(80),k.dispatchEvent(new PointerEvent("pointerup",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",A)),k.dispatchEvent(new MouseEvent("click",A)),n("คลิกปุ่ม 3 จุดแล้ว"),await f(1500);let L=null;const z=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const H of z){const D=(H.textContent||"").trim();if(D.includes("ทำให้เป็นภาพเคลื่อนไหว")||D.includes("Animate")||D.includes("animate")){L=H;break}}if(!L)R("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),c.push("⚠️ Animate");else{const H=L.getBoundingClientRect(),D=H.left+H.width/2,j=H.top+H.height/2,q={bubbles:!0,cancelable:!0,clientX:D,clientY:j,button:0};L.dispatchEvent(new PointerEvent("pointerdown",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mousedown",q)),await f(80),L.dispatchEvent(new PointerEvent("pointerup",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mouseup",q)),L.dispatchEvent(new MouseEvent("click",q)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),c.push("✅ Animate"),_("animate","done"),await f(3e3)}}}}catch(h){R(`ขั้น 4 ผิดพลาด: ${h.message}`),c.push("⚠️ Animate")}if(Et()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{Ot(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),_("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await f(3e3);let h=!1;const S=document.querySelectorAll("button, span, div");for(const x of S){const $=(x.textContent||"").trim(),M=x.getBoundingClientRect();if(($==="วิดีโอ"||$==="Video"||$.includes("วิดีโอ"))&&M.bottom>window.innerHeight*.7){h=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}h||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let B=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise($=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>$())),B=!0;const x=Date.now();for(;document.hidden&&Date.now()-x<5e3;)await f(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await f(1e3);let u=!1;for(let x=1;x<=5&&!u;x++){if(x>1&&document.hidden){n(`🔄 Retry ${x}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(k=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>k())),B=!0;const E=Date.now();for(;document.hidden&&Date.now()-E<5e3;)await f(200);document.hidden||await f(2e3)}catch{}}const $=de();if(!$){n(`⚠️ ครั้งที่ ${x}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await f(3e3);continue}x>1&&($.focus(),await f(500)),await zt($,e.videoPrompt),await f(500);const M=($.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();M.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${x} (${M.length} ตัวอักษร)`),c.push("✅ Video Prompt"),_("vid-prompt","done"),u=!0):(n(`⚠️ ครั้งที่ ${x}: Prompt ไม่ถูกวาง (ได้ ${M.length} ตัวอักษร)`),await f(1500))}if(!u)throw R("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),c.push("❌ Video Prompt"),p.push("video prompt paste failed after 5 attempts"),_("vid-prompt","error"),new Error("Video prompt paste failed");await f(1e3),_("vid-generate","active");const v=ce();if(v){const x=v.getBoundingClientRect(),$=x.left+x.width/2,M=x.top+x.height/2,E={bubbles:!0,cancelable:!0,clientX:$,clientY:M,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",E)),await f(80),v.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",E)),v.dispatchEvent(new MouseEvent("click",E)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),c.push("✅ Video Generate"),_("vid-generate","done"),await f(500),v.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",E)),await f(80),v.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",E)),v.dispatchEvent(new MouseEvent("click",E)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else R("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),c.push("❌ Video Generate"),p.push("video generate button not found"),_("vid-generate","error");if(B){await f(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(h){R(`ขั้น 5 ผิดพลาด: ${h.message}`),c.push("⚠️ Video Gen"),p.push(`video gen error: ${h.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),It("animate"),It("vid-prompt"),It("vid-generate"),It("vid-wait");if(e.videoPrompt){_("vid-wait","active");const h=e.sceneCount||1,S=e.videoScenePrompts||[e.videoPrompt];if(h>1)try{sn(h)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${h>1?`ต่อ ${h} ฉาก`:"ดาวน์โหลด"} ===`);const B=()=>{const x=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of x){if($.closest("#netflow-engine-overlay"))continue;const M=($.textContent||"").trim();if(M.length>10)continue;const E=M.match(/(\d{1,3})\s*%/);if(!E)continue;const k=parseInt(E[1],10);if(k<1||k>100)continue;if(et())return k;const C=$.getBoundingClientRect();if(!(C.width===0||C.width>150)&&!(C.top<0||C.top>window.innerHeight))return k}return null},u=async(x=6e5)=>{n("รอการสร้างวิดีโอ..."),_("vid-wait","active"),await f(5e3);const $=()=>{const W=document.querySelectorAll("div, span, p, label, strong, small");let X=0;for(const ot of W){if(ot.closest("#netflow-engine-overlay"))continue;const U=(ot.textContent||"").trim();if(U.includes("%")&&U.length<15){const at=ot.tagName.toLowerCase(),it=ot.className&&typeof ot.className=="string"?ot.className.split(/\s+/).slice(0,2).join(" "):"",J=ot.getBoundingClientRect();if(n(`  🔍 "${U}" ใน <${at}.${it}> ที่ (${J.left.toFixed(0)},${J.top.toFixed(0)}) w=${J.width.toFixed(0)}`),X++,X>=5)break}}X===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},M=async(W,X)=>{n(`🔄 Policy Retry ${X}/2 — สร้าง Safe Prompt แล้วลองใหม่...`),await wt(),await f(2e3);const ot=de();if(!ot)return R("❌ Retry: ไม่พบช่อง Prompt"),!1;ot.focus(),await f(300);const U=window.getSelection();U&&U.selectAllChildren(ot),await f(200),ot.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"deleteContentBackward"})),ot.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"deleteContentBackward"})),await f(500);let at=pn(W);X>=2&&(at=at.substring(0,600).replace(/\s\S*$/,"").trim(),n(`🛡️ 2nd retry: ultra-short prompt (${at.length} chars)`)),await zt(ot,at),await f(500);const it=(ot.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(it.length<20)return R(`❌ Retry: วาง Safe Prompt ไม่สำเร็จ (${it.length} ตัวอักษร)`),!1;n(`✅ วาง Safe Prompt สำเร็จ (${it.length} ตัวอักษร)`),await f(500);const J=ce();if(!J)return R("❌ Retry: ไม่พบปุ่ม Generate"),!1;const ut=J.getBoundingClientRect(),xt=ut.left+ut.width/2,Gt=ut.top+ut.height/2,Ht={bubbles:!0,cancelable:!0,clientX:xt,clientY:Gt,button:0};return J.dispatchEvent(new PointerEvent("pointerdown",{...Ht,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousedown",Ht)),await f(80),J.dispatchEvent(new PointerEvent("pointerup",{...Ht,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mouseup",Ht)),J.dispatchEvent(new MouseEvent("click",Ht)),n(`✅ คลิก Generate สำหรับ Safe Retry ${X}`),await f(5e3),!0},E=se();n(E?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),$();const k=Date.now();let C=-1,G=0,I=!1,A=0;const L=2;for(;Date.now()-k<x;){const W=B();if(W!==null){if(W!==C&&(n(`ความคืบหน้าวิดีโอ: ${W}%`),C=W,_("vid-wait","active",W)),G=Date.now(),W>=100){n("✅ ตรวจพบ 100%!"),I=!0;break}}else if(C>30){const X=Math.floor((Date.now()-G)/1e3);if(X>=5){n(`✅ % หายไปที่ ${C}% (หาย ${X} วินาที) — วิดีโอเสร็จ!`),I=!0;break}n(`⏳ % หายที่ ${C}% — ยืนยันใน ${5-X} วินาที...`)}else{const X=Math.floor((Date.now()-k)/1e3);X%15<3&&n(`⏳ รอ... (${X} วินาที) ไม่พบ %`)}if(!I&&C>0&&se(!0)&&!E){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${C}% — วิดีโอเสร็จ!`),I=!0;break}if(Et())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(C<1){const X=ze();if(X){if(R(`❌ สร้างวิดีโอล้มเหลว: ${X}`),A<L&&e.videoPrompt)if(A++,n(`🔄 Policy violation detected — attempting safe retry ${A}/${L}...`),await M(e.videoPrompt,A)){C=-1,G=0,n(`✅ Safe retry ${A} started — continuing to monitor...`);continue}else R(`❌ Safe retry ${A} failed to start`);return null}}document.hidden&&C>0&&Date.now()-G>1e4&&await kt(),document.hidden&&C<1&&Date.now()-k>3e4&&await kt(),await f(3e3)}await wt();let z=null;for(let W=1;W<=10&&(z=se(),!z);W++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${W}/10)`),W%3===0&&await wt(),await f(3e3);if(!z)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),_("vid-wait","error"),null;const H=z;I?(_("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await f(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const D=H.getBoundingClientRect();let j=D.left+D.width/2,q=D.top+D.height/2,Z=H;const lt=H.querySelector("video, img, canvas");if(lt){const W=lt.getBoundingClientRect();W.width>50&&W.height>50&&(j=W.left+W.width/2,q=W.top+W.height/2,Z=lt,n(`🎯 พบรูปย่อ <${lt.tagName.toLowerCase()}> ในการ์ดที่ (${j.toFixed(0)},${q.toFixed(0)}) ${W.width.toFixed(0)}x${W.height.toFixed(0)}`))}else q=D.top+D.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${j.toFixed(0)},${q.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${j.toFixed(0)}, ${q.toFixed(0)})...`),Lt(Z);for(let W=0;W<8;W++){const X={bubbles:!0,cancelable:!0,clientX:j+W%2,clientY:q};Z.dispatchEvent(new PointerEvent("pointermove",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Z.dispatchEvent(new MouseEvent("mousemove",X)),await f(500)}try{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"mute_video",sceneCount:h,scenePrompts:S,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${h} ฉาก, ${S.length} prompts, theme: ${e.theme})`)}catch(W){n(`⚠️ ไม่สามารถบันทึก pending action: ${W.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await v(Z),n("✅ คลิกการ์ดวิดีโอเสร็จ"),H},v=async x=>{const $=x.getBoundingClientRect(),M=$.left+$.width/2,E=$.top+$.height/2,k={bubbles:!0,cancelable:!0,clientX:M,clientY:E,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",k)),await f(80),x.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",k)),x.dispatchEvent(new MouseEvent("click",k)),await f(50),x.click(),n("คลิกการ์ดวิดีโอแล้ว"),await f(2e3)};try{if(!await u())R("หมดเวลารอการสร้างวิดีโอ"),c.push("⚠️ Video Wait"),_("vid-wait","error");else{c.push("✅ Video Complete"),_("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await f(3e3);const $=await new Promise(M=>{chrome.storage.local.get(mt(),E=>{if(chrome.runtime.lastError){M(null);return}M((E==null?void 0:E[mt()])||null)})});$&&!$._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(mt()),$.action==="mute_video"?await qe($.sceneCount||1,$.scenePrompts||[],$.theme):$.action==="wait_scene_gen_and_download"&&await Ue($.sceneCount||2,$.currentScene||2,$.theme,$.scenePrompts||[]))}}catch(x){R(`ขั้น 6 ผิดพลาด: ${x.message}`),c.push("⚠️ Step6"),p.push(`step 6: ${x.message}`)}}const b=p.length===0;try{Ot(b?5e3:8e3)}catch(h){console.warn("Overlay complete error:",h)}return{success:b,message:b?`สำเร็จ! ${c.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${c.join(" → ")} | ${p.join(", ")}`,step:b?"done":"partial"}}async function qe(e,t=[],o){var K;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{o&&qt(o)}catch{}try{Xt(e)}catch(F){n(`⚠️ showOverlay error: ${F.message}`)}try{const F=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const O of F)_(O,"done");e>=2&&_("scene2-prompt","active"),n(`✅ overlay restored: ${F.length} steps done, sceneCount=${e}`)}catch(F){n(`⚠️ overlay restore error: ${F.message}`)}await f(1500);const r=(()=>{for(const F of document.querySelectorAll("button")){const O=F.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const S of O){const B=(S.textContent||"").trim();if(B==="volume_up"||B==="volume_off"||B==="volume_mute"){const u=F.getBoundingClientRect();if(u.width>0&&u.height>0)return F}}const h=(F.getAttribute("aria-label")||"").toLowerCase();if(h.includes("mute")||h.includes("ปิดเสียง")){const S=F.getBoundingClientRect();if(S.width>0&&S.height>0)return F}}return null})();r?(r.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let a=null;if(e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await f(2e3);for(let I=2;I<=e;I++){const A=t[I-1];if(!A){R(`ไม่พบ prompt สำหรับฉากที่ ${I}`);continue}n(`── ฉากที่ ${I}/${e}: วาง prompt + generate ──`);let L=null;const z=Date.now();for(;!L&&Date.now()-z<1e4;){const U=document.querySelectorAll("[data-slate-editor='true']");if(U.length>0&&(L=U[U.length-1]),!L){const at=document.querySelectorAll("[role='textbox'][contenteditable='true']");at.length>0&&(L=at[at.length-1])}L||await f(1e3)}if(!L){R("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${L.tagName.toLowerCase()}> ${L.className.substring(0,40)}`),await zt(L,A),n(`วาง prompt ฉาก ${I} (${A.length} ตัวอักษร) ✅`);try{_(`scene${I}-prompt`,"done"),_(`scene${I}-gen`,"active")}catch{}await f(1e3);const H=L.getBoundingClientRect();let D=null,j=1/0;for(const U of document.querySelectorAll("button")){if(U.disabled)continue;const at=U.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let it=!1;for(const xt of at){const Gt=(xt.textContent||"").trim();if(Gt==="arrow_forward"||Gt==="send"||Gt==="arrow_upward"){it=!0;break}}if(!it)continue;const J=U.getBoundingClientRect();if(J.width<=0||J.height<=0)continue;const ut=Math.abs(J.top-H.top)+Math.abs(J.right-H.right);ut<j&&(j=ut,D=U)}if(!D)for(const U of["arrow_forward","send","arrow_upward"]){const at=ht(U);for(const it of at)if(!it.disabled){const J=it.getBoundingClientRect();if(J.width>0&&J.height>0){D=it;break}}if(D)break}if(!D)for(const U of document.querySelectorAll("button")){const at=U.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const it of at)if((it.textContent||"").trim()==="arrow_forward"){const J=U.getBoundingClientRect();if(J.width>0&&J.height>0){D=U;break}}if(D)break}if(!D){R("ไม่พบปุ่ม Generate/Send");return}await new Promise(U=>{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:I,scenePrompts:t}},()=>U())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${I}/${e})`),await Q(D),n(`คลิก Generate ฉาก ${I} ✅`);try{_(`scene${I}-gen`,"done"),_(`scene${I}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${I} gen เสร็จ ──`),await f(5e3);let q=0,Z=0;const lt=Date.now(),W=6e5,X=5e3;let ot=!1;for(;Date.now()-lt<W;){let U=null;const at=document.querySelectorAll("div, span, p, label, strong, small");for(const it of at){if(it.closest("#netflow-engine-overlay"))continue;const ut=(it.textContent||"").trim().match(/^(\d{1,3})%$/);if(ut){const xt=it.getBoundingClientRect();if(xt.width>0&&xt.height>0&&xt.width<120&&xt.height<60){U=parseInt(ut[1],10);break}}}if(U!==null){if(U!==q){n(`🎬 ฉาก ${I} ความคืบหน้า: ${U}%`),q=U;try{_(`scene${I}-wait`,"active",U)}catch{}}Z=0}else if(q>0){if(Z===0)Z=Date.now(),n(`🔍 ฉาก ${I}: % หายไป (จาก ${q}%) — กำลังยืนยัน...`);else if(Date.now()-Z>=X){n(`✅ ฉาก ${I}: % หายไป ${X/1e3} วินาที — เจนเสร็จ!`),ot=!0;break}}if(Et()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&q>0&&Z===0&&await kt(),await f(2e3)}ot||R(`ฉาก ${I} หมดเวลา`),n(`✅ ฉาก ${I} เสร็จแล้ว`);try{_(`scene${I}-wait`,"done",100)}catch{}chrome.storage.local.remove(mt()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await f(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{_("download","active")}catch{}let F=!1;if(await wt()&&document.hidden===!1&&(F=!0),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(I=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>I())),F=!0,await f(Y?8e3:5e3)}catch{}}await f(Y?3e3:2e3);const h=Date.now();let S=null;const B=Date.now();for(;!S&&Date.now()-B<(Y?15e3:1e4);){const I=ht("download");for(const A of I){const L=A.getBoundingClientRect();if(L.width>0&&L.height>0){S=A;break}}if(!S)for(const A of document.querySelectorAll("button")){const L=A.querySelector("i, span[class*='icon'], span[class*='material']");if(L&&(L.textContent||"").trim()==="download"){const D=A.getBoundingClientRect();if(D.width>0&&D.height>0){S=A;break}}const z=(A.getAttribute("aria-label")||"").toLowerCase(),H=(A.getAttribute("title")||"").toLowerCase();if(z.includes("download")||z.includes("ดาวน์โหลด")||H.includes("download")||H.includes("ดาวน์โหลด")){const D=A.getBoundingClientRect();if(D.width>0&&D.height>0){S=A;break}}}S||await f(1e3)}if(!S){if(R("ไม่พบปุ่มดาวน์โหลด"),F)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await Q(S),n("คลิกดาวน์โหลดแล้ว ✅");try{_("download","done"),_("upscale","active")}catch{}await f(Y?3e3:1500);const u=(I,A)=>new Promise(async L=>{const z=Date.now();for(;Date.now()-z<A;){const H="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const D of document.querySelectorAll(H)){const j=(D.textContent||"").trim();if(j.includes(I)&&j.length<100){const q=D.getBoundingClientRect();if(q.width>0&&q.height>0){L(D);return}}}await f(500)}L(null)}),v=(I,A)=>new Promise(async L=>{const z=Date.now();for(;Date.now()-z<I;){const H="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const D of document.querySelectorAll(H)){const j=(D.textContent||"").trim();if(j.includes("720p")&&j.length<50){const Z=D.getBoundingClientRect();if(Z.width>0&&Z.height>0){L(D);return}}const q=D.querySelectorAll("span");for(const Z of q)if((Z.textContent||"").trim()==="720p"){const lt=D.getBoundingClientRect();if(lt.width>0&&lt.height>0){L(D);return}}}A!=null&&A.isConnected&&Lt(A),await f(500)}L(null)});let x=null;for(let I=0;I<(Y?5:3)&&!x;I++){I>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${I+1}...`),S.isConnected&&(await Q(S),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await f(Y?3e3:2e3)));const A=await u("Full Video",Y?1e4:5e3);if(!A){R("ไม่พบ Full Video");continue}Lt(A),await f(Y?1e3:500),await Q(A),n("คลิก/hover Full Video ✅"),await f(Y?3e3:2e3),x=await v(Y?12e3:8e3,A)}if(!x){if(R("ไม่พบ 720p"),F)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await Q(x),n("คลิก 720p ✅"),F){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const $=Date.now();let M=!1,E=!1;for(;Date.now()-$<3e5;){for(const I of document.querySelectorAll("div[data-title] div, div[data-content] div")){const A=(I.textContent||"").trim();if(A==="Download complete!"||A==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),M=!0;break}(A.includes("Downloading your extended video")||A.includes("กำลังดาวน์โหลด"))&&(E||(E=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(M)break;if(E){let I=!1;for(const A of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((A.textContent||"").trim().includes("Downloading")){I=!0;break}if(!I){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),M=!0;break}}if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await f(2e3)}if(!M){R("เตรียมไฟล์หมดเวลา");return}try{_("upscale","done",100),_("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let k=!1;const C=Date.now();for(;Date.now()-C<6e4&&!k;){try{await new Promise(I=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:h},A=>{chrome.runtime.lastError?R(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):A!=null&&A.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${A.message}`),k=!0,A.downloadUrl&&(a=A.downloadUrl,n(`[TikTok] จะใช้ download URL: ${A.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-C)/1e3)}s)`),I()})})}catch(I){R(`ตรวจสอบผิดพลาด: ${I.message}`)}k||await f(3e3)}k||R("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const G=await oe();a||(a=G);try{_("open","done"),Ot(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),ie(a),ne(2e3);return}if(n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await wt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(F=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>F())),await f(Y?8e3:5e3)}catch{}}await f(Y?3e3:2e3);const d=(F,O="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const h of document.querySelectorAll(O)){const S=(h.textContent||"").trim();if(S.includes(F)&&S.length<100){const B=h.getBoundingClientRect();if(B.width>0&&B.height>0&&B.top>=0)return h}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let i=null;const l=Date.now();for(;!i&&Date.now()-l<(Y?15e3:1e4);){const F=ht("download");for(const O of F){const h=O.getBoundingClientRect();if(h.width>0&&h.height>0){i=O;break}}if(!i)for(const O of document.querySelectorAll("button, [role='button']")){const h=(O.textContent||"").trim(),S=h.toLowerCase();if((S.includes("download")||S.includes("ดาวน์โหลด"))&&h.length<80){const B=O.getBoundingClientRect();if(B.width>0&&B.height>0){i=O;break}}}if(!i)for(const O of document.querySelectorAll("button")){const h=(O.getAttribute("aria-label")||"").toLowerCase(),S=(O.getAttribute("title")||"").toLowerCase();if(h.includes("download")||h.includes("ดาวน์")||S.includes("download")||S.includes("ดาวน์")){const B=O.getBoundingClientRect();if(B.width>0&&B.height>0){i=O;break}}}i||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await f(1e3))}if(!i){R("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(i.textContent||"").trim().substring(0,40)}"`),await Q(i),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await f(Y?3e3:1500);const c=Date.now();let p=null;const g=Date.now();for(;!p&&Date.now()-g<(Y?1e4:5e3);)p=d("1080p"),p||(n("รอ 1080p..."),await f(500));if(!p){R("ไม่พบ 1080p");return}await Q(p),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const y=Date.now();let w=!1,N=!1,T=0;const m=3e3;for(;Date.now()-y<3e5;){const O=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(O.includes("upscaling complete")||O.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),w=!0;break}for(const S of document.querySelectorAll("div, span, p")){const B=(S.textContent||"").trim().toLowerCase();if(B.length<60&&(B.includes("upscaling complete")||B.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(K=S.textContent)==null?void 0:K.trim()}")`),w=!0;break}}if(w)break;if(O.includes("upscaling your video")||O.includes("กำลังอัปสเกล")){N=!0,T=0;const S=Math.floor((Date.now()-y)/1e3);n(`⏳ กำลังอัปสเกล... (${S} วินาที)`)}else if(N){if(T===0)T=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-T>=m){n(`✅ ข้อความ Upscaling หายไป ${m/1e3} วินาที — เสร็จ!`),w=!0;break}}else{const S=Math.floor((Date.now()-y)/1e3);S%10<3&&n(`⏳ รอ Upscale... (${S} วินาที)`)}if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await f(2e3)}if(!w){R("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let s=!1;const b=Date.now();for(;Date.now()-b<6e4&&!s;){try{await new Promise(F=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:c},O=>{chrome.runtime.lastError?R(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):O!=null&&O.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${O.message}`),s=!0,O.downloadUrl&&(a=O.downloadUrl,n(`[TikTok] จะใช้ download URL: ${O.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-b)/1e3)}s)`),F()})})}catch(F){R(`ตรวจสอบผิดพลาด: ${F.message}`)}s||await f(3e3)}s||R("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const P=await oe();a||(a=P),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),ie(a),ne(2e3)}async function Ue(e=2,t=2,o,r=[]){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{o&&qt(o)}catch{}try{Xt(e)}catch(u){n(`⚠️ showOverlay error: ${u.message}`)}try{const u=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let v=2;v<=t;v++)u.push(`scene${v}-prompt`,`scene${v}-gen`),v<t&&u.push(`scene${v}-wait`);for(const v of u)_(v,"done");_(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${u.length} steps done (scene ${t}/${e} navigate)`)}catch(u){n(`⚠️ overlay restore error: ${u.message}`)}await f(2e3);const a=(()=>{for(const u of document.querySelectorAll("button")){const v=u.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const $ of v){const M=($.textContent||"").trim();if(M==="volume_up"||M==="volume_off"||M==="volume_mute"){const E=u.getBoundingClientRect();if(E.width>0&&E.height>0)return u}}const x=(u.getAttribute("aria-label")||"").toLowerCase();if(x.includes("mute")||x.includes("ปิดเสียง")){const $=u.getBoundingClientRect();if($.width>0&&$.height>0)return u}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);let d=0,i=0;const l=Date.now(),c=6e5,p=5e3;let g=!1,y=0;for(;Date.now()-l<c;){let u=null;const v=document.querySelectorAll("div, span, p, label, strong, small");for(const x of v){if(x.closest("#netflow-engine-overlay"))continue;const M=(x.textContent||"").trim().match(/^(\d{1,3})%$/);if(M){const E=x.getBoundingClientRect();if(E.width>0&&E.height>0&&E.width<120&&E.height<60){u=parseInt(M[1],10);break}}}if(u!==null){if(y=0,u!==d){n(`🎬 scene ${t} ความคืบหน้า: ${u}%`),d=u;try{_(`scene${t}-wait`,"active",u)}catch{}}i=0}else if(d>0){if(i===0)i=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${d}%) — กำลังยืนยัน...`);else if(Date.now()-i>=p){n(`✅ scene ${t}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),g=!0;break}}else if(y++,y>=15){const x=document.querySelectorAll("video");let $=!1;for(const M of x)if(M.readyState>=2&&!M.paused&&M.getBoundingClientRect().width>200){$=!0;break}if($){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),g=!0;break}if(y>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),g=!0;break}}document.hidden&&d>0&&i===0&&await kt(),await f(2e3)}g||n(`⚠️ scene ${t} หมดเวลา — ลองต่อไป`);try{_(`scene${t}-wait`,"done",100)}catch{}if(n(`✅ scene ${t} เสร็จ`),t<e&&r.length>0){n(`═══ ยังเหลืออีก ${e-t} ฉาก — ต่อฉากถัดไป ═══`),await f(2e3);for(let u=t+1;u<=e;u++){const v=r[u-1];if(!v){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${u} — ข้าม`);continue}n(`── ฉากที่ ${u}/${e}: วาง prompt + generate (pending recovery) ──`);let x=null;const $=Date.now();for(;!x&&Date.now()-$<1e4;){const z=document.querySelectorAll("[data-slate-editor='true']");if(z.length>0&&(x=z[z.length-1]),!x){const H=document.querySelectorAll("[role='textbox'][contenteditable='true']");H.length>0&&(x=H[H.length-1])}x||await f(1e3)}if(!x){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${u}`);break}await zt(x,v),n(`วาง prompt ฉาก ${u} (${v.length} ตัวอักษร) ✅`);try{_(`scene${u}-prompt`,"done"),_(`scene${u}-gen`,"active")}catch{}await f(1e3);const M=x.getBoundingClientRect();let E=null,k=1/0;for(const z of document.querySelectorAll("button")){if(z.disabled)continue;const H=z.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let D=!1;for(const Z of H){const lt=(Z.textContent||"").trim();if(lt==="arrow_forward"||lt==="send"||lt==="arrow_upward"){D=!0;break}}if(!D)continue;const j=z.getBoundingClientRect();if(j.width<=0||j.height<=0)continue;const q=Math.abs(j.top-M.top)+Math.abs(j.right-M.right);q<k&&(k=q,E=z)}if(!E)for(const z of["arrow_forward","send","arrow_upward"]){const H=ht(z);for(const D of H)if(!D.disabled){const j=D.getBoundingClientRect();if(j.width>0&&j.height>0){E=D;break}}if(E)break}if(!E)for(const z of document.querySelectorAll("button")){const H=z.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const D of H)if((D.textContent||"").trim()==="arrow_forward"){const j=z.getBoundingClientRect();if(j.width>0&&j.height>0){E=z;break}}if(E)break}if(!E){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${u}`);break}await new Promise(z=>{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:u,scenePrompts:r}},()=>z())}),await Q(E),n(`คลิก Generate ฉาก ${u} ✅`);try{_(`scene${u}-gen`,"done"),_(`scene${u}-wait`,"active")}catch{}await f(5e3);let C=0,G=0;const I=Date.now();let A=!1,L=0;for(;Date.now()-I<6e5;){let z=null;const H=document.querySelectorAll("div, span, p, label, strong, small");for(const D of H){if(D.closest("#netflow-engine-overlay"))continue;const q=(D.textContent||"").trim().match(/^(\d{1,3})%$/);if(q){const Z=D.getBoundingClientRect();if(Z.width>0&&Z.height>0&&Z.width<120&&Z.height<60){z=parseInt(q[1],10);break}}}if(z!==null){if(L=0,z!==C){n(`🎬 ฉาก ${u} ความคืบหน้า: ${z}%`),C=z;try{_(`scene${u}-wait`,"active",z)}catch{}}G=0}else if(C>0){if(G===0)G=Date.now();else if(Date.now()-G>=5e3){n(`✅ ฉาก ${u}: เจนเสร็จ!`),A=!0;break}}else if(L++,L>=15){const D=document.querySelectorAll("video");let j=!1;for(const q of D)if(q.readyState>=2&&!q.paused&&q.getBoundingClientRect().width>200){j=!0;break}if(j){n(`✅ ฉาก ${u}: พบวิดีโอเล่นอยู่ — เสร็จ`),A=!0;break}if(L>=30){n(`✅ ฉาก ${u}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),A=!0;break}}document.hidden&&C>0&&G===0&&await kt(),await f(2e3)}A||n(`⚠️ ฉาก ${u} หมดเวลา`);try{_(`scene${u}-wait`,"done",100)}catch{}n(`✅ ฉาก ${u} เสร็จแล้ว`),chrome.storage.local.remove(mt()),await f(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await f(3e3);let w=null;try{_("download","active")}catch{}if(n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──"),await wt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(u=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>u())),await f(Y?8e3:5e3)}catch{}}await f(Y?3e3:2e3);const N=Date.now();let T=null;const m=Date.now();for(;!T&&Date.now()-m<(Y?15e3:1e4);){const u=ht("download");for(const v of u){const x=v.getBoundingClientRect();if(x.width>0&&x.height>0){T=v;break}}if(!T)for(const v of document.querySelectorAll("button")){const x=v.querySelector("i, span[class*='icon'], span[class*='material']");if(x&&(x.textContent||"").trim()==="download"){const E=v.getBoundingClientRect();if(E.width>0&&E.height>0){T=v;break}}const $=(v.getAttribute("aria-label")||"").toLowerCase(),M=(v.getAttribute("title")||"").toLowerCase();if($.includes("download")||$.includes("ดาวน์โหลด")||M.includes("download")||M.includes("ดาวน์โหลด")){const E=v.getBoundingClientRect();if(E.width>0&&E.height>0){T=v;break}}}T||await f(1e3)}if(!T){R("ไม่พบปุ่มดาวน์โหลด");return}await Q(T),n("คลิกดาวน์โหลดแล้ว ✅");try{_("download","done"),_("upscale","active")}catch{}await f(Y?3e3:1500);const s=(u,v)=>new Promise(async x=>{const $=Date.now();for(;Date.now()-$<v;){const M="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const E of document.querySelectorAll(M)){const k=(E.textContent||"").trim();if(k.includes(u)&&k.length<100){const C=E.getBoundingClientRect();if(C.width>0&&C.height>0){x(E);return}}}await f(500)}x(null)}),b=(u,v)=>new Promise(async x=>{const $=Date.now();for(;Date.now()-$<u;){const M="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const E of document.querySelectorAll(M)){const k=(E.textContent||"").trim();if(k.includes("720p")&&k.length<50){const G=E.getBoundingClientRect();if(G.width>0&&G.height>0){x(E);return}}const C=E.querySelectorAll("span");for(const G of C)if((G.textContent||"").trim()==="720p"){const I=E.getBoundingClientRect();if(I.width>0&&I.height>0){x(E);return}}}v!=null&&v.isConnected&&Lt(v),await f(500)}x(null)});let P=null;for(let u=0;u<(Y?5:3)&&!P;u++){u>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${u+1}...`),T.isConnected&&(await Q(T),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await f(Y?3e3:2e3)));const v=await s("Full Video",Y?1e4:5e3);if(!v){R("ไม่พบ Full Video");continue}Lt(v),await f(Y?1e3:500),await Q(v),n("คลิก/hover Full Video ✅"),await f(Y?3e3:2e3),P=await b(Y?12e3:8e3,v)}if(!P){R("ไม่พบ 720p");return}await Q(P),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const K=Date.now();let F=!1,O=!1;for(;Date.now()-K<3e5;){for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div")){const v=(u.textContent||"").trim();if(v==="Download complete!"||v==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),F=!0;break}(v.includes("Downloading your extended video")||v.includes("กำลังดาวน์โหลด"))&&(O||(O=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(F)break;if(O){let u=!1;for(const v of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((v.textContent||"").trim().includes("Downloading")){u=!0;break}if(!u){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),F=!0;break}}await f(2e3)}if(!F){R("เตรียมไฟล์หมดเวลา");return}try{_("upscale","done",100),_("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let h=!1;const S=Date.now();for(;Date.now()-S<6e4&&!h;){try{await new Promise(u=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:N},v=>{chrome.runtime.lastError?R(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):v!=null&&v.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${v.message}`),h=!0,v.downloadUrl&&(w=v.downloadUrl,n(`[TikTok] จะใช้ download URL: ${v.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-S)/1e3)}s)`),u()})})}catch(u){R(`ตรวจสอบผิดพลาด: ${u.message}`)}h||await f(3e3)}h||R("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const B=await oe();w||(w=B);try{_("open","done"),Ot(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),ie(w),ne(2e3)}async function vn(){try{await ln;const e=mt();let t=await new Promise(i=>{chrome.storage.local.get(e,l=>{if(chrome.runtime.lastError){i(null);return}i((l==null?void 0:l[e])||null)})});if(!t&&St){const i="netflow_pending_action";t=await new Promise(l=>{chrome.storage.local.get(i,c=>{if(chrome.runtime.lastError){l(null);return}l((c==null?void 0:c[i])||null)})}),t&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(i))}if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const r=Date.now()-t.timestamp;if(r>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(e);return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=a,await new Promise(i=>{chrome.storage.local.set({[e]:t},()=>i())}),await f(300),!await new Promise(i=>{chrome.storage.local.get(e,l=>{const c=l==null?void 0:l[e];i((c==null?void 0:c._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(e),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(r/1e3)} วินาที)`),t.action==="mute_video"?await qe(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await Ue(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,o)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),o({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),yn(e).then(r=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${r.message}`),Be()}).catch(r=>{if(r instanceof re||(r==null?void 0:r.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Nt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Re()}catch{}}else console.error("[Netflow AI] Generate error:",r);Be()}),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,o({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return o({status:"ready"}),!1;if((e==null?void 0:e.type)==="CAPTURE_PAGE_VIDEO")return(async()=>{try{const r=document.querySelectorAll("video");let a="",d=0;for(const p of r){const g=p.src||p.currentSrc||"";if(!g)continue;const y=p.getBoundingClientRect(),w=y.width*y.height;(w>d||!a&&g)&&(d=w,a=g)}if(!a){o({success:!1,error:"No video found"});return}const i=await fetch(a);if(!i.ok){o({success:!1,error:"HTTP "+i.status});return}const l=await i.blob();if(l.size<1e4){o({success:!1,error:"Video too small: "+l.size});return}const c=await new Promise((p,g)=>{const y=new FileReader;y.onloadend=()=>p(y.result),y.onerror=()=>g(new Error("FileReader error")),y.readAsDataURL(l)});o({success:!0,data:c,size:l.size})}catch(r){o({success:!1,error:r.message})}})(),!0;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return o({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await f(500);const r=un();if(!r){R("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const a=r.getBoundingClientRect(),d=a.left+a.width/2,i=a.top+a.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${i.toFixed(0)}) ${a.width.toFixed(0)}x${a.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let l=0;l<2;l++){const c=document.elementFromPoint(d,i);c?(await Q(c),n(`คลิก ${l+1}/2 บน <${c.tagName.toLowerCase()}>`)):(await Q(r),n(`คลิก ${l+1}/2 บนการ์ด (สำรอง)`)),await f(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),(async()=>{try{const e=await new Promise(t=>{chrome.storage.local.get("netflow_preshow_overlay",o=>{if(chrome.runtime.lastError){t(null);return}t((o==null?void 0:o.netflow_preshow_overlay)||null)})});if(e&&e.timestamp&&Date.now()-e.timestamp<3e4){n("⚡ Pre-show overlay — แสดง overlay ทันที");try{qt(e.theme)}catch{}try{Xt(e.sceneCount||1)}catch(t){n(`⚠️ pre-show overlay error: ${t.message}`)}chrome.storage.local.remove("netflow_preshow_overlay")}}catch{}})(),vn()})();
