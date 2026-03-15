(function(){"use strict";const bt={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let st=bt.blue,At=null;function qt(e){e&&bt[e]&&(At=e,st=bt[e],pe(),requestAnimationFrame(()=>Me()))}function We(){if(At&&bt[At])return bt[At];try{const e=localStorage.getItem("netflow_app_theme");if(e&&bt[e])return bt[e]}catch{}return bt.blue}let ct=0,dt=255,pt=65;function pe(){const e=st.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(ct=parseInt(e[1],16),dt=parseInt(e[2],16),pt=parseInt(e[3],16))}const fe='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',ue='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let V=null,rt=null,nt=null,ge=0,Ut=null,Pt=null,Wt=null,Zt=0,yt=!1,gt=null,Mt=null,Rt=null,Ct=1,J=[];function jt(e){const t=[{stepId:"open-flow",label:"เปิด Google Flow",status:"waiting"},{stepId:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let o=2;o<=e;o++)t.push({stepId:`scene${o}-prompt`,label:`ฉาก ${o} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${o}-gen`,label:`ฉาก ${o} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${o}-wait`,label:`ฉาก ${o} — กำลังสร้าง`,status:"waiting",progress:0});t.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return t}const ft=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"open-flow",label:"เปิด Google Flow",status:"waiting"},{id:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];J=jt(1);function je(e){const t=e.rgb,o=e.accentRgb,a=e.doneRgb,i=e.hex,d=e.accentHex,r=e.doneHex,s=(()=>{const w=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!w)return"#4ade80";const c=y=>Math.min(255,y+80);return`#${[1,2,3].map(y=>c(parseInt(w[y],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const w=r.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!w)return"#4ade80";const c=y=>Math.min(255,y+60);return`#${[1,2,3].map(y=>c(parseInt(w[y],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),m=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,g=p?parseInt(p[1],16)/m:0,T=p?parseInt(p[2],16)/m:1,B=p?parseInt(p[3],16)/m:.25,x=w=>`${Math.round(g*w)}, ${Math.round(T*w)}, ${Math.round(B*w)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${x(18)},0.94) 0%, rgba(${x(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: rgba(${x(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${x(180)},0.05),
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
            0 0 200px rgba(${x(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${x(180)},0.08),
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
    color: ${s};
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
.nf-term-line.nf-term-done { color: rgba(${a}, 0.85); }
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
    background: linear-gradient(180deg, rgba(${x(5)},0.95) 0%, rgba(${x(12)},0.98) 100%);
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
    background: linear-gradient(180deg, rgba(${x(6)},0.75) 0%, rgba(${x(3)},0.92) 100%);
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
    background: rgba(${x(8)}, 0.88);
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
    background: ${i};
    box-shadow: 0 0 6px rgba(${t},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: ${r};
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
    background: linear-gradient(90deg, ${i}, ${s});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${t},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${r}, ${l});
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
    background: linear-gradient(90deg, ${r}, ${l});
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
    background: rgba(${x(8)},0.8);
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
    background: rgba(${x(8)}, 0.9);
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
    background: ${r};
    box-shadow: 0 0 5px rgba(${a},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${a},0.1);
    color: ${l};
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

    `}function Jt(){nt||(nt=document.createElement("style"),nt.id="netflow-overlay-styles",nt.textContent=je(st),document.head.appendChild(nt))}function me(e){e.innerHTML="",J.forEach((t,o)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${t.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${o+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(a)})}function he(){const e=document.getElementById("nf-terminal");if(!e)return;me(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${J.length}`)}function be(e,t){let s="";for(let T=0;T<20;T++){const B=T/20*Math.PI*2,x=(T+.2)/20*Math.PI*2,w=(T+.5)/20*Math.PI*2,c=(T+.8)/20*Math.PI*2,y=(T+1)/20*Math.PI*2;s+=`${T===0?"M":"L"}${(120+100*Math.cos(B)).toFixed(1)},${(120+100*Math.sin(B)).toFixed(1)} `,s+=`L${(120+100*Math.cos(x)).toFixed(1)},${(120+100*Math.sin(x)).toFixed(1)} `,s+=`L${(120+112*Math.cos(w)).toFixed(1)},${(120+112*Math.sin(w)).toFixed(1)} `,s+=`L${(120+100*Math.cos(c)).toFixed(1)},${(120+100*Math.sin(c)).toFixed(1)} `,s+=`L${(120+100*Math.cos(y)).toFixed(1)},${(120+100*Math.sin(y)).toFixed(1)} `}s+="Z";const l=14,p=72,m=62;let g="";for(let T=0;T<l;T++){const B=T/l*Math.PI*2,x=(T+.25)/l*Math.PI*2,w=(T+.75)/l*Math.PI*2,c=(T+1)/l*Math.PI*2;g+=`${T===0?"M":"L"}${(120+m*Math.cos(B)).toFixed(1)},${(120+m*Math.sin(B)).toFixed(1)} `,g+=`L${(120+p*Math.cos(x)).toFixed(1)},${(120+p*Math.sin(x)).toFixed(1)} `,g+=`L${(120+p*Math.cos(w)).toFixed(1)},${(120+p*Math.sin(w)).toFixed(1)} `,g+=`L${(120+m*Math.cos(c)).toFixed(1)},${(120+m*Math.sin(c)).toFixed(1)} `}return g+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${g}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${m}" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${e},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${e},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Ye(){const e=document.createElement("div");e.id="netflow-engine-overlay",gt=document.createElement("canvas"),gt.id="nf-matrix-canvas",e.appendChild(gt);const t=document.createElement("div");t.className="nf-pat-plasma",e.appendChild(t);for(let k=1;k<=5;k++){const C=document.createElement("div");C.className=`nf-ambient-orb nf-orb-${k}`,e.appendChild(C)}const o=document.createElement("div");o.className="nf-pat-data",e.appendChild(o);const a=document.createElement("div");a.className="nf-pat-diag-a",e.appendChild(a);const i=document.createElement("div");i.className="nf-pat-diag-b",e.appendChild(i);const d=document.createElement("div");d.className="nf-pat-circuit",e.appendChild(d);const r=document.createElement("div");r.className="nf-pat-honeycomb",e.appendChild(r);const s=document.createElement("div");s.className="nf-pat-binary",e.appendChild(s);const l=document.createElement("div");l.className="nf-pat-crosshatch",e.appendChild(l);const p=document.createElement("div");p.className="nf-pat-diamond",e.appendChild(p);const m=document.createElement("div");m.className="nf-pat-wave-h",e.appendChild(m);const g=document.createElement("div");g.className="nf-pat-radar",e.appendChild(g);const T=document.createElement("div");T.className="nf-pat-ripple-1",e.appendChild(T);const B=document.createElement("div");B.className="nf-pat-ripple-2",e.appendChild(B);const x=document.createElement("div");x.className="nf-pat-techscan",e.appendChild(x);const w=document.createElement("div");w.className="nf-center-glow",e.appendChild(w);const c=document.createElement("div");c.className="nf-pat-noise",e.appendChild(c);const y=document.createElement("div");y.className="nf-crt-scanlines",e.appendChild(y);const D=document.createElement("div");D.className="nf-vignette",e.appendChild(D);for(let k=0;k<3;k++){const C=document.createElement("div");C.className="nf-pulse-ring",e.appendChild(C)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(k=>{const C=document.createElement("div");C.className=`nf-corner-deco ${k}`,e.appendChild(C)});const K=document.createElement("button");K.className="nf-stop-btn",K.innerHTML='<span class="nf-stop-icon"></span> หยุด',K.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",K.onclick=()=>{var k;window.__NETFLOW_STOP__=!0;try{Nt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((k=chrome.runtime)!=null&&k.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},e.appendChild(K);const F=document.createElement("div");F.className="nf-layout";const N=document.createElement("div");N.className="nf-core-monitor",N.id="nf-core-monitor";const h=document.createElement("div");h.className="nf-core-header",h.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${J.length}</div>
    `,N.appendChild(h);const S=document.createElement("div");S.className="nf-terminal",S.id="nf-terminal",me(S),N.appendChild(S);const R=document.createElement("div");R.className="nf-engine-core",R.id="nf-engine-core";const u=document.createElement("div");u.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(k=>{const C=document.createElement("div");C.className=`nf-frame-corner ${k}`,u.appendChild(C)}),R.appendChild(u);const v="http://www.w3.org/2000/svg",b=document.createElementNS(v,"svg");b.setAttribute("class","nf-engine-waves"),b.setAttribute("viewBox","0 0 560 140"),b.setAttribute("preserveAspectRatio","none"),b.id="nf-engine-waves";for(let k=0;k<4;k++){const C=document.createElementNS(v,"path");C.setAttribute("fill","none"),C.setAttribute("stroke-width",k<2?"1.5":"1"),C.setAttribute("stroke",k<2?`rgba(${st.rgb},${.14+k*.1})`:`rgba(${st.accentRgb},${.1+(k-2)*.08})`),C.setAttribute("data-wave-idx",String(k)),b.appendChild(C)}R.appendChild(b);const $=document.createElement("div");$.className="nf-engine-brand-inner",$.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${be(st.rgb,st.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${be(st.rgb,st.accentRgb)}
        </div>
    `,R.appendChild($);const P=document.createElement("div");P.className="nf-engine-stats",P.id="nf-engine-stats",P.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([k,C,G])=>`<div class="nf-stat-item"><span class="nf-stat-label">${k}</span><span class="nf-stat-val" id="${C}">${G}</span></div>`).join(""),R.appendChild(P),N.appendChild(R),F.appendChild(N);const E=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ft.forEach((k,C)=>{const G=Ke(k);G.classList.add(E[C]),G.id=`nf-mod-${k.id}`,F.appendChild(G)}),e.appendChild(F);for(let k=0;k<30;k++){const C=document.createElement("div");C.className="nf-particle",C.style.left=`${5+Math.random()*90}%`,C.style.bottom=`${Math.random()*40}%`,C.style.animationDuration=`${3+Math.random()*5}s`,C.style.animationDelay=`${Math.random()*4}s`;const G=.3+Math.random()*.4,I=.7+Math.random()*.3;C.style.background=`rgba(${Math.floor(ct*I)}, ${Math.floor(dt*I)}, ${Math.floor(pt*I)}, ${G})`,C.style.width=`${1+Math.random()*2}px`,C.style.height=C.style.width,e.appendChild(C)}return e}function Ke(e){const t=document.createElement("div");t.className="nf-module";const o=document.createElement("div");o.className="nf-mod-header",o.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(o),e.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let r="";i.progress!==void 0&&(r=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${r}
        `,t.appendChild(d)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(a),t}function Xe(){ge=Date.now(),Ut=setInterval(()=>{const e=Math.floor((Date.now()-ge)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),o=String(e%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${t}:${o}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${t}:${o}`)},1e3)}function we(){Ut&&(clearInterval(Ut),Ut=null)}const Qe=120,xe=160,ye=.4;let Tt=null,ve=0,$e=0,Ee=0,Bt=[];function Ze(e,t){Bt=[];for(let o=0;o<Qe;o++){const a=Math.random();let i;a<.22?i=0:a<.4?i=1:a<.55?i=2:a<.68?i=3:a<.84?i=4:i=5;const d=Math.random()*e,r=Math.random()*t,s=50+Math.random()*220,l=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Bt.push({x:i===0?Math.random()*e:d+Math.cos(l)*s,y:i===0?Math.random()*t:r+Math.sin(l)*s,vx:(Math.random()-.5)*ye,vy:(Math.random()-.5)*ye,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:d,oCy:r,oRadius:s,oAngle:l,oSpeed:p})}}function Je(){if(!gt)return;const e=gt;if(Mt=e.getContext("2d"),!Mt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,Bt.length===0&&Ze(e.width,e.height)};t(),window.addEventListener("resize",t);let o=null,a=0,i=0,d=!1;function r(){if(!Mt||!gt){Rt=null;return}if(Rt=requestAnimationFrame(r),d=!d,d)return;const s=Mt,l=gt.width,p=gt.height;s.fillStyle=`rgba(${ct*.04|0},${dt*.04|0},${pt*.06|0},1)`,s.fillRect(0,0,l,p),(!o||a!==l||i!==p)&&(a=l,i=p,o=s.createRadialGradient(l*.5,p*.5,0,l*.5,p*.5,Math.max(l,p)*.6),o.addColorStop(0,`rgba(${ct*.08|0},${dt*.08|0},${pt*.1|0},0.4)`),o.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=o,s.fillRect(0,0,l,p);const m=Bt,g=m.length,T=xe*xe;for(let w=0;w<g;w++){const c=m[w];if(c.pulsePhase+=c.pulseSpeed,c.motion===0)c.x+=c.vx,c.y+=c.vy,c.x<0?(c.x=0,c.vx=Math.abs(c.vx)*(.8+Math.random()*.4)):c.x>l&&(c.x=l,c.vx=-Math.abs(c.vx)*(.8+Math.random()*.4)),c.y<0?(c.y=0,c.vy=Math.abs(c.vy)*(.8+Math.random()*.4)):c.y>p&&(c.y=p,c.vy=-Math.abs(c.vy)*(.8+Math.random()*.4));else if(c.motion===1)c.oAngle+=c.oSpeed,c.x=c.oCx+Math.cos(c.oAngle)*c.oRadius,c.y=c.oCy+Math.sin(c.oAngle)*c.oRadius,c.oCx+=Math.sin(c.oAngle*.3)*.15,c.oCy+=Math.cos(c.oAngle*.3)*.15;else if(c.motion===2)c.oAngle+=c.oSpeed,c.x=c.oCx+Math.cos(c.oAngle)*c.oRadius,c.y=c.oCy+Math.sin(c.oAngle)*c.oRadius*.5,c.oCx+=Math.sin(c.oAngle*.2)*.1,c.oCy+=Math.cos(c.oAngle*.2)*.1;else if(c.motion===3){c.oAngle+=c.oSpeed;const y=c.oAngle,D=c.oRadius*.7;c.x=c.oCx+D*Math.cos(y),c.y=c.oCy+D*Math.sin(y)*Math.cos(y),c.oCx+=Math.sin(y*.15)*.12,c.oCy+=Math.cos(y*.15)*.12}else if(c.motion===4){c.oAngle+=c.oSpeed*1.2;const y=c.oRadius*(.5+.5*Math.abs(Math.sin(c.oAngle*.15)));c.x=c.oCx+Math.cos(c.oAngle)*y,c.y=c.oCy+Math.sin(c.oAngle)*y,c.oCx+=Math.sin(c.oAngle*.1)*.18,c.oCy+=Math.cos(c.oAngle*.1)*.18}else c.oAngle+=c.oSpeed,c.x+=c.vx*.8,c.y=c.oCy+Math.sin(c.oAngle+c.x*.008)*c.oRadius*.35,c.x<-30?c.x=l+30:c.x>l+30&&(c.x=-30),c.oCy+=Math.sin(c.oAngle*.1)*.08;if(c.motion>0){const y=c.oRadius+50;c.oCx<-y?c.oCx=l+y:c.oCx>l+y&&(c.oCx=-y),c.oCy<-y?c.oCy=p+y:c.oCy>p+y&&(c.oCy=-y)}}s.beginPath(),s.strokeStyle=`rgba(${ct},${dt},${pt},0.06)`,s.lineWidth=.4;const B=new Path2D;for(let w=0;w<g;w++){const c=m[w];for(let y=w+1;y<g;y++){const D=m[y],K=c.x-D.x,F=c.y-D.y,N=K*K+F*F;N<T&&(1-N/T<.4?(s.moveTo(c.x,c.y),s.lineTo(D.x,D.y)):(B.moveTo(c.x,c.y),B.lineTo(D.x,D.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${ct},${dt},${pt},0.18)`,s.lineWidth=.8,s.stroke(B),!Tt||ve!==ct||$e!==dt||Ee!==pt){Tt=document.createElement("canvas");const w=48;Tt.width=w,Tt.height=w;const c=Tt.getContext("2d"),y=c.createRadialGradient(w/2,w/2,0,w/2,w/2,w/2);y.addColorStop(0,`rgba(${ct},${dt},${pt},0.9)`),y.addColorStop(.3,`rgba(${ct},${dt},${pt},0.35)`),y.addColorStop(1,`rgba(${ct},${dt},${pt},0)`),c.fillStyle=y,c.fillRect(0,0,w,w),ve=ct,$e=dt,Ee=pt}const x=Tt;for(let w=0;w<g;w++){const c=m[w],y=.6+.4*Math.sin(c.pulsePhase),D=c.radius*5*(.8+y*.4);s.globalAlpha=.5+y*.4,s.drawImage(x,c.x-D/2,c.y-D/2,D,D)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let w=0;w<g;w++){const c=m[w];if(c.radius>2){const y=.6+.4*Math.sin(c.pulsePhase),D=c.radius*(.8+y*.4)*.35;s.moveTo(c.x+D,c.y),s.arc(c.x,c.y,D,0,Math.PI*2)}}s.fill()}r()}function tn(){Rt!==null&&(cancelAnimationFrame(Rt),Rt=null),gt=null,Mt=null,Bt=[]}let Dt=null;const Yt=560,en=140,ke=Yt/2,Ce=en/2,Te=[];for(let e=0;e<=Yt;e+=8){const t=Math.abs(e-ke)/ke;Te.push(Math.pow(Math.min(1,t*1.6),.6))}const nn=[0,1,2,3].map(e=>({amp:10+e*5,freq:(1.2+e*.35)*Math.PI*2/Yt,off:e*.6,spd:.7+e*.12}));let te=!1;function Ie(){if(Pt=requestAnimationFrame(Ie),te=!te,te)return;if(Zt+=.07,!Dt){const t=document.getElementById("nf-engine-waves");if(!t){Pt=null;return}Dt=Array.from(t.querySelectorAll("path"))}const e=[];for(let t=0;t<Dt.length;t++){const o=nn[t],a=Zt*o.spd+o.off;e.length=0,e.push(`M 0 ${Ce}`);let i=0;for(let d=0;d<=Yt;d+=8){const r=Ce+o.amp*Te[i++]*Math.sin(d*o.freq+a);e.push(`L${d} ${r*10+.5|0}`)}Dt[t].setAttribute("d",e.join(" "))}}function on(){Zt=0,Ie(),Je(),Wt=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),o=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function Se(){Pt!==null&&(cancelAnimationFrame(Pt),Pt=null),Wt&&(clearInterval(Wt),Wt=null),Dt=null,tn()}function Kt(){let e=0;const t=J.filter(p=>p.status!=="skipped").length;for(const p of J){const m=document.getElementById(`nf-proc-${p.stepId}`);if(!m)continue;m.className="nf-proc-row";const g=m.querySelector(".nf-proc-badge");switch(p.status){case"done":m.classList.add("nf-proc-done"),g&&(g.textContent="✅ done"),e++;break;case"active":m.classList.add("nf-proc-active"),g&&(g.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":m.classList.add("nf-proc-error"),g&&(g.textContent="❌ error");break;case"skipped":m.classList.add("nf-proc-skipped"),g&&(g.textContent="— skip");break;default:m.classList.add("nf-proc-waiting"),g&&(g.textContent="(queued)")}}const o=J.findIndex(p=>p.status==="active"),a=o>=0?o+1:e>=t&&t>0?J.length:e,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${a}/${J.length}`);const d=document.querySelector(".nf-core-title-val"),r=document.querySelector(".nf-status-dot");e>=t&&t>0?(d&&(d.textContent="COMPLETE",d.style.color=st.doneHex),r&&(r.style.background=st.doneHex,r.style.boxShadow=`0 0 8px rgba(${st.doneRgb},0.7)`)):J.some(m=>m.status==="error")?(d&&(d.textContent="ERROR",d.style.color="#f87171"),r&&(r.style.background="#ef4444",r.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):J.some(m=>m.status==="active")&&d&&(d.textContent="ACTIVE",d.style.color=st.hex,d.style.textShadow=`0 0 10px rgba(${st.rgb},0.5)`);const s=document.getElementById("nf-terminal"),l=s==null?void 0:s.querySelector(".nf-proc-active");l&&s&&l.scrollIntoView({behavior:"smooth",block:"center"})}function _e(){rt&&rt.isConnected||(Jt(),rt=document.createElement("button"),rt.id="nf-toggle-btn",rt.className="nf-toggle-visible",rt.innerHTML=yt?fe:ue,rt.title="ซ่อน/แสดง Netflow Overlay",rt.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",rt.onclick=()=>Ae(),document.body.appendChild(rt))}function Ae(){V&&(_e(),yt?(V.classList.remove("nf-hidden"),V.classList.add("nf-visible"),V.style.opacity="1",V.style.pointerEvents="auto",rt&&(rt.innerHTML=ue),yt=!1):(V.classList.remove("nf-visible"),V.classList.add("nf-hidden"),V.style.opacity="0",V.style.pointerEvents="none",rt&&(rt.innerHTML=fe),yt=!0))}const Pe={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Me(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=At;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"green"}catch{t="green"}const o=Pe[t]||Pe.green;let a;try{a=chrome.runtime.getURL(o)}catch{a=`/${o}`}const i=st.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${a}')`].join(", "),e.style.backgroundSize="auto, auto, 50%",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${i},0.45)`,e.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function Xt(e=1){if(st=We(),pe(),V&&V.isConnected){V.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!nt||!nt.isConnected)&&(nt=null,Jt()),setTimeout(()=>{if(V)try{nt!=null&&nt.sheet&&nt.sheet.cssRules.length>0&&(V.style.removeProperty("background"),V.style.removeProperty("font-family"),V.style.removeProperty("overflow"))}catch{}},200);for(const t of ft)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;Ct=e,J=jt(e),he();for(const t of ft)ee(t);if(Qt(),Kt(),!V.querySelector(".nf-stop-btn")){const t=document.createElement("button");t.className="nf-stop-btn",t.innerHTML='<span class="nf-stop-icon"></span> หยุด',t.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",t.onclick=()=>{var o;window.__NETFLOW_STOP__=!0;try{Nt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((o=chrome.runtime)!=null&&o.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},V.appendChild(t)}yt&&Ae();return}V&&!V.isConnected&&(V=null),nt&&(nt.remove(),nt=null),Jt();for(const t of ft)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;if(Ct=e,J=jt(e),e>1){const t=ft.find(a=>a.id==="video");if(t){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=e;i++)a.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),a.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),a.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});t.steps=a}const o=ft.find(a=>a.id==="render");if(o){const a=o.steps.find(d=>d.id==="download");a&&(a.label="ดาวน์โหลด 720p");const i=o.steps.find(d=>d.id==="upscale");i&&(i.label="Full Video")}}V=Ye(),V.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(V),V.classList.add("nf-visible"),yt=!1,_e(),Xe(),on(),requestAnimationFrame(()=>Me()),setTimeout(()=>{if(V)try{nt!=null&&nt.sheet&&nt.sheet.cssRules.length>0&&(V.style.removeProperty("background"),V.style.removeProperty("font-family"),V.style.removeProperty("overflow"))}catch{}},200)}function Re(){we(),Se(),yt=!1,V&&(V.classList.add("nf-fade-out"),setTimeout(()=>{V==null||V.remove(),V=null},500)),rt&&(rt.remove(),rt=null)}const an={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function rn(e,t,o){const a=J.findIndex(g=>g.status==="active"),i=J.filter(g=>g.status==="done").length,d=J.length,r=a>=0?a+1:i>=d?d:i,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${r}/${d}`);let l=1;for(const g of J)if(g.status==="active"||g.status==="done")if(g.stepId.startsWith("scene")){const T=g.stepId.match(/^scene(\d+)-/);T&&(l=Math.max(l,parseInt(T[1],10)))}else(g.stepId==="download"||g.stepId==="upscale"||g.stepId==="open")&&(l=Ct);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=Ct>1?`${l}/${Ct}`:"1/1"),t==="active"){const g=document.getElementById("nf-stat-status"),T=an[e]||e.toUpperCase();g&&(g.textContent=T)}else if(t==="done"&&i>=d){const g=document.getElementById("nf-stat-status");g&&(g.textContent="COMPLETE")}else if(t==="error"){const g=document.getElementById("nf-stat-status");g&&(g.textContent="ERROR")}const m=document.getElementById("nf-stat-progress");m&&(o!==void 0&&o>0?m.textContent=`${Math.min(100,o)}%`:t==="active"&&(m.textContent="—"))}function _(e,t,o){if(!V)return;for(const i of ft)for(const d of i.steps)d.id===e&&(d.status=t,o!==void 0&&(d.progress=o));for(const i of J)i.stepId===e&&(i.status=t,o!==void 0&&(i.progress=o));const a=document.getElementById(`nf-step-${e}`);if(a&&(a.className="nf-step",t==="active"?a.classList.add("nf-step-active"):t==="done"?a.classList.add("nf-step-done"):t==="error"&&a.classList.add("nf-step-error")),rn(e,t,o),o!==void 0){const i=document.getElementById(`nf-bar-${e}`);i&&(i.style.width=`${Math.min(100,o)}%`)}Qt(),Kt()}function It(e){_(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function Ot(e=4e3){we(),Se(),Qt(),Kt(),setTimeout(()=>Re(),e)}function Qt(){for(const e of ft){const t=e.steps.filter(l=>l.status!=="skipped").length,o=e.steps.filter(l=>l.status==="done").length,a=e.steps.some(l=>l.status==="active"),i=t>0?Math.round(o/t*100):0,d=document.getElementById(`nf-pct-${e.id}`);d&&(d.textContent=`${i}%`);const r=document.getElementById(`nf-modbar-${e.id}`);r&&(r.style.width=`${i}%`);const s=document.getElementById(`nf-mod-${e.id}`);s&&(s.classList.remove("nf-active","nf-done"),i>=100?s.classList.add("nf-done"):a&&s.classList.add("nf-active"))}}function sn(e){var a,i,d,r;Ct=e;const t=new Map;for(const s of J)t.set(s.stepId,{status:s.status,progress:s.progress});J=jt(e);for(const s of J){const l=t.get(s.stepId);l&&(s.status=l.status,l.progress!==void 0&&(s.progress=l.progress))}if(he(),e>1){const s=ft.find(l=>l.id==="video");if(s){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=s.steps.find(p=>p.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=s.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=s.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((r=s.steps.find(p=>p.id==="vid-wait"))==null?void 0:r.status)||"waiting",progress:0}];for(let p=2;p<=e;p++)l.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),l.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),l.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});s.steps=l,ee(s)}}const o=ft.find(s=>s.id==="render");if(o&&e>1){const s=o.steps.find(p=>p.id==="download");s&&(s.label="ดาวน์โหลด 720p");const l=o.steps.find(p=>p.id==="upscale");l&&(l.label="Full Video"),ee(o)}Qt(),Kt()}function ee(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),e.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let r="";i.progress!==void 0&&(r=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${r}
        `,t.appendChild(d)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(a)}function Nt(e){e.replace(/^\[Netflow AI\]\s*/,"")}let St=null,vt=null;const ln=new Promise(e=>{vt=e,setTimeout(()=>e(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},e=>{!chrome.runtime.lastError&&(e!=null&&e.tabId)&&(St=e.tabId,console.log(`[Netflow AI] Tab ID: ${St}`)),vt&&(vt(St),vt=null)})}catch{vt&&(vt(null),vt=null)}function mt(){return St?`netflow_pending_action_${St}`:"netflow_pending_action"}function Be(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Nt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},M=e=>{console.warn(`[Netflow AI] ${e}`);try{Nt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}};(()=>{const e=(o,a)=>{const i=o.tagName.toLowerCase(),d=o.id?`#${o.id}`:"",r=o.className&&typeof o.className=="string"?"."+o.className.trim().split(/\s+/).join("."):"",s=o.getBoundingClientRect(),l={};for(const c of o.attributes)["class","id","style"].includes(c.name)||(l[c.name]=c.value.length>80?c.value.slice(0,80)+"…":c.value);const p=(o.textContent||"").trim().slice(0,120),m=Array.from(o.querySelectorAll('i, [class*="icon"]')).map(c=>{var y;return(y=c.textContent)==null?void 0:y.trim()}).filter(Boolean).join(", "),g=[];let T=o.parentElement;for(let c=0;c<5&&T;c++){const y=T.tagName.toLowerCase(),D=T.id?`#${T.id}`:"",K=T.className&&typeof T.className=="string"?"."+T.className.trim().split(/\s+/).slice(0,2).join("."):"";g.push(`${y}${D}${K}`),T=T.parentElement}const B=a==="click"?`%c🖱️ CLICK %c<${i}${d}${r}>`:`%c👆 HOVER %c<${i}${d}${r}>`;console.groupCollapsed(B,a==="click"?"background:#e74c3c;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold":"background:#3498db;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold","color:#f39c12;font-weight:bold"),console.log("Element:",o),console.log("Selector:",`${i}${d}${r}`),console.log("Rect:",{x:Math.round(s.x),y:Math.round(s.y),w:Math.round(s.width),h:Math.round(s.height)}),Object.keys(l).length&&console.log("Attributes:",l),p&&console.log("Text:",p),m&&console.log("Icons:",m),g.length&&console.log("Ancestors:",g.join(" > ")),console.groupEnd()};document.addEventListener("click",o=>{const a=o.target;a!=null&&a.closest("#netflow-engine-overlay")||e(a,"click")},!0);let t=null;document.addEventListener("mouseover",o=>{const a=o.target;a!==t&&(a!=null&&a.closest("#netflow-engine-overlay")||(t=a,e(a,"hover")))},!0),console.log("%c[Netflow AI] 🔍 Debug Element Inspector ACTIVE — click/hover elements to inspect","background:#2ecc71;color:#000;padding:4px 8px;border-radius:4px;font-weight:bold")})();function ne(e=3e3){n(`🔒 จะปิดแท็บ automation ใน ${e/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},t=>{chrome.runtime.lastError?M(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${t==null?void 0:t.message}`)})}catch(t){M(`ปิดแท็บผิดพลาด: ${t.message}`)}},e)}async function oe(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},d=>{if(chrome.runtime.lastError){i(!1);return}i(!!(d!=null&&d.cached))})}catch{i(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const d of i){const r=d.src||d.currentSrc||"";if(r)return r}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const t=document.querySelectorAll("video");let o=null,a=0;for(const i of t){let d=i.src||"";if(!d){const l=i.querySelector("source");l&&(d=l.getAttribute("src")||"")}if(!d&&i.currentSrc&&(d=i.currentSrc),!d)continue;if(tt()){o||(o=d,a=1);continue}const r=i.getBoundingClientRect(),s=r.width*r.height;r.width>50&&s>a&&(a=s,o=d)}if(!o)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${o.substring(0,80)}... (area=${a.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(o);if(!i.ok)return n(`[TikTok] fetch failed: HTTP ${i.status}`),await De(o),o;const d=await i.blob(),r=(d.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${r} MB, type: ${d.type}`),d.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${d.size} bytes) — อาจเป็น thumbnail`);const s=await new Promise((l,p)=>{const m=new FileReader;m.onloadend=()=>l(m.result),m.onerror=()=>p(new Error("FileReader error")),m.readAsDataURL(d)});n(`[TikTok] Data URL พร้อม: ${(s.length/1024/1024).toFixed(1)} MB`),await new Promise(l=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:s},p=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),l()})})}catch(i){n(`[TikTok] Content script fetch error: ${i.message}`),await De(o)}return o}catch(e){return n(`[TikTok] captureVideoUrl error: ${e.message}`),null}}async function De(e){if(e.startsWith("https://"))try{await new Promise(t=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched via background: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),t()})})}catch{}}function ie(e){if(e){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:e,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const Y=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),ae=/Win/i.test(navigator.userAgent),Oe=Y?"🍎 Mac":ae?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${Oe}`),window.__VIDEO_COMPLETE_SENT__=!1;class re extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Ft=null,$t=null,Ne=!1;const _t=new Map;let Fe=0;function cn(){if(Ft)return Ft;try{const e=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Ft=new Worker(URL.createObjectURL(e)),Ft.onmessage=t=>{const o=_t.get(t.data);o&&(_t.delete(t.data),o())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Ft}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function dn(){if($t)return $t;if(Ne)return null;try{return $t=chrome.runtime.connect({name:"timer"}),$t.onMessage.addListener(e=>{const t=_t.get(e.id);t&&(_t.delete(e.id),t())}),$t.onDisconnect.addListener(()=>{$t=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),$t}catch{return Ne=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const f=e=>new Promise((t,o)=>{if(window.__NETFLOW_STOP__)return o(new re);let a=!1;const i=()=>{if(!a){if(a=!0,window.__NETFLOW_STOP__)return o(new re);t()}};setTimeout(i,e);const d=cn();if(d){const l=++Fe;_t.set(l,i),d.postMessage({id:l,ms:e});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e+2e3},()=>{chrome.runtime.lastError||i()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e},()=>{chrome.runtime.lastError?setTimeout(i,e):i()});return}catch{}const r=dn();if(r){const l=++Fe;_t.set(l,i),r.postMessage({cmd:"delay",id:l,ms:e});return}const s=setTimeout(i,e);f._lastId=s});function Et(){return!!window.__NETFLOW_STOP__}const tt=()=>document.hidden;let Le=0;async function kt(){if(!document.hidden)return!1;const e=Date.now();if(e-Le<15e3)return!1;Le=e;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await f(1500),!0}catch{return!1}}async function wt(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(t=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>t()));const e=Date.now();for(;document.hidden&&Date.now()-e<5e3;)await f(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function ze(){var o;const e=["audio generation failed","couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","might violate","violate our policies","อาจละเมิด","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const a of t){if(a.closest("#netflow-engine-overlay"))continue;const i=(a.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const d of e)if(i.includes(d))return((o=a.textContent)==null?void 0:o.trim())||d}}return null}function pn(e){let t=e;const o=[/STRICT FACE & HEAD LOCK:[^.]*\./gi,/BODY LOCK:[^.]*\./gi,/HAIR LOCK:[^.]*\./gi,/FACE LOCK[^.]*\./gi,/PRODUCT IDENTITY LOCK:[^.]*\./gi,/LABEL LOCK:[^.]*\./gi,/PRODUCT EVERY FRAME:[^.]*\./gi,/TRANSITION STABILITY:[^.]*\./gi,/ANTI[_-]DUPLICATION:[^.]*\./gi,/ANTI[_-]TEXT[^.]*\./gi,/ANTI[_-]MORPH[^.]*\./gi,/ANTI[_-]DISTORTION[^.]*\./gi,/ANTI[_-]ADDITION[^.]*\./gi,/ANTI[_-]FLOATING[^.]*\./gi,/PROPS vs PRODUCT:[^.]*\./gi,/BRAND IDENTITY FREEZE[^.]*\./gi,/BRAND MORPHING[^.]*\./gi,/PRODUCT SIZE \(CRITICAL\):[^.]*\./gi,/PRODUCT SIZE REALISM:[^.]*\./gi,/VOICE DISCIPLINE:[^.]*\./gi,/ZERO INVENTION:[^.]*\./gi,/REALISM:[^.]*\./gi,/SCREEN CONTENT[^.]*\./gi,/SINGLE UTENSIL RULE[^.]*\./gi,/PRODUCT LOCK[^.]*\./gi,/FACE & HEAD LOCK[^.]*\./gi,/CLOTHING FIDELITY[^.]*\./gi,/FRONT[_-]FACING[^.]*\./gi];for(const r of o)t=t.replace(r,"");const a=["DO NOT","NEVER","FORBIDDEN","MUST NOT","ABSOLUTELY NO","IMMUTABLE","LOCKED","HIGHEST PRIORITY","#1 FORBIDDEN","Do NOT let","Do NOT add","Do NOT generate","Do NOT simplify","Do NOT invent","ZERO on-screen","NO split screen","NO collage","NO side-by-side","NO divided frames","never morph","never simplify","never change shape","never disappear","never be hidden","never exit","BRAND MORPHING IS","objects MUST NOT magically"];return t=t.split(/(?<=[.!])\s+/).filter(r=>!a.some(s=>r.includes(s))).join(" "),t=t.replace(/\s{2,}/g," ").trim(),t.length>1200&&(t=t.replace(/Render with extreme surface detail[^.]*\./gi,""),t=t.replace(/High-fidelity visual detail[^.]*\./gi,""),t=t.replace(/Product lit with soft rim light[^.]*\./gi,""),t=t.replace(/visible material texture[^.]*\./gi,""),t=t.replace(/Fluid motion, cinematic motion blur[^.]*\./gi,""),t=t.replace(/AI-observed appearance:[^.]*\./gi,""),t=t.replace(/Reference clothing:[^.]*\./gi,""),t=t.replace(/\s{2,}/g," ").trim()),n(`🛡️ Safe retry prompt: ${e.length} → ${t.length} chars (${Math.round((1-t.length/e.length)*100)}% reduction)`),t}async function et(e){if(tt()){e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),e.click();return}const t=e.getBoundingClientRect(),o=t.left+t.width/2,a=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:o,clientY:a,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",i)),await f(80),e.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",i)),e.dispatchEvent(new MouseEvent("click",i)),await f(50),e.click()}function Lt(e){const t=e.getBoundingClientRect(),o=t.left+t.width/2,a=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:o,clientY:a};e.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",i)),e.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",i)),e.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",i))}function fn(e){const t=[],o=document.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols'], [data-icon]");for(const a of o){if((a.textContent||"").trim()!==e)continue;let d=a,r=null,s=1/0;for(let l=0;l<20&&d&&(d=d.parentElement,!(!d||d===document.body));l++){if(tt()){l>=3&&d.children.length>0&&!r&&(r=d);continue}const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const m=p.width*p.height;m<s&&(r=d,s=m)}}r&&!t.includes(r)&&t.push(r)}return t.sort((a,i)=>{const d=a.getBoundingClientRect(),r=i.getBoundingClientRect();return d.left-r.left}),t}function se(e=!1){const t=[],o=document.querySelectorAll("video");for(const r of o){let s=r.parentElement;for(let l=0;l<10&&s;l++){if(tt()){if(l>=3&&s.children.length>0){t.push({el:s,left:0});break}s=s.parentElement;continue}const p=s.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){t.push({el:s,left:p.left});break}s=s.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const r of a){const s=(r.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let l=r.parentElement;for(let p=0;p<10&&l;p++){if(tt()){if(p>=3&&l.children.length>0){t.push({el:l,left:0});break}l=l.parentElement;continue}const m=l.getBoundingClientRect();if(m.width>120&&m.height>80&&m.width<window.innerWidth*.7&&m.top>=-50&&m.left<window.innerWidth*.75){t.push({el:l,left:m.left});break}l=l.parentElement}}}const i=document.querySelectorAll("img");for(const r of i){const s=(r.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let l=r.parentElement;for(let p=0;p<10&&l;p++){if(tt()){if(p>=3&&l.children.length>0){t.push({el:l,left:0});break}l=l.parentElement;continue}const m=l.getBoundingClientRect();if(m.width>120&&m.height>80&&m.width<window.innerWidth*.7&&m.top>=-50&&m.left<window.innerWidth*.75){t.push({el:l,left:m.left});break}l=l.parentElement}}}const d=Array.from(new Set(t.map(r=>r.el))).map(r=>t.find(s=>s.el===r));if(d.sort((r,s)=>r.left-s.left),d.length>0){const r=d[0].el,s=r.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),r}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function un(){const e=fn("image");if(e.length>0){const o=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${o.left.toFixed(0)},${o.top.toFixed(0)}) ขนาด ${o.width.toFixed(0)}x${o.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const o of t){let a=o.parentElement;for(let i=0;i<10&&a;i++){if(tt()){if(i>=3&&a.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),a;a=a.parentElement;continue}const d=a.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function gn(e,t){var s;const[o,a]=e.split(","),i=((s=o.match(/:(.*?);/))==null?void 0:s[1])||"image/png",d=atob(a),r=new Uint8Array(d.length);for(let l=0;l<d.length;l++)r[l]=d.charCodeAt(l);return new File([r],t,{type:i})}async function mn(e,t=1024,o=.8){try{if(e.length<5e5)return n(`🗜️ รูปเล็กพอ (${(e.length/1024).toFixed(0)} KB base64) — ไม่บีบอัด`),e;n(`🗜️ รูปใหญ่ (${(e.length/1024).toFixed(0)} KB base64) — กำลังบีบอัด...`);const a=new Image;await new Promise((m,g)=>{a.onload=()=>m(),a.onerror=()=>g(new Error("Image load failed")),a.src=e});let{width:d,height:r}=a;if(d>t||r>t){const m=t/Math.max(d,r);d=Math.round(d*m),r=Math.round(r*m)}const s=document.createElement("canvas");s.width=d,s.height=r;const l=s.getContext("2d");if(!l)return e;l.drawImage(a,0,0,d,r);const p=s.toDataURL("image/jpeg",o);return n(`🗜️ บีบอัดแล้ว: ${(e.length/1024).toFixed(0)} KB → ${(p.length/1024).toFixed(0)} KB (${d}x${r})`),s.width=0,s.height=0,p}catch(a){return M(`🗜️ บีบอัดล้มเหลว: ${a.message} — ใช้รูปต้นฉบับ`),e}}function ht(e){var i;const t=[],o=new WeakSet,a=["i.google-symbols","i[class*='google-symbols']",".material-symbols-outlined",".material-icons",".material-symbols-rounded",".material-symbols-sharp","i[class*='material']","span[class*='material']","i[class*='icon']","span[class*='icon']","[data-icon]","[class*='gm-icon']","[class*='gmat-icon']","i"];for(const d of a){for(const r of document.querySelectorAll(d))if(((i=r.textContent)==null?void 0:i.trim())===e){const s=r.closest("button");s&&!o.has(s)&&(o.add(s),t.push(s))}if(t.length>0)break}if(t.length===0)for(const d of document.querySelectorAll("button")){const r=(d.getAttribute("aria-label")||"").toLowerCase();(r===e.toLowerCase()||r.includes(e.toLowerCase()))&&(o.has(d)||(o.add(d),t.push(d)))}return t}async function hn(e=5e3){const t=Date.now();for(;Date.now()-t<e;){const o=document.querySelectorAll('input[type="file"]');if(o.length>0)return o[o.length-1];await f(300)}return null}function le(){const e=["add","add_2","add_circle","add_circle_outline","attach_file","attach_file_add","attachment","note_add"];let t=[];for(const r of e)if(t=ht(r),t.length>0)break;if(t.length>0){let r=null,s=0;for(const l of t){const p=l.getBoundingClientRect();p.y>s&&(s=p.y,r=l)}if(r)return n(`พบปุ่ม "+" ของ Prompt Bar (icon) ที่ y=${s.toFixed(0)}`),r}n("ไม่พบปุ่มเพิ่มจากไอคอน — ลอง fallback ทั้งหมด");const o=["add","attach","upload","create","insert","plus","เพิ่ม","แนบ","อัปโหลด","สร้าง"];for(const r of document.querySelectorAll("button")){const s=(r.getAttribute("aria-label")||"").toLowerCase(),l=(r.getAttribute("title")||"").toLowerCase();if(o.some(p=>s.includes(p)||l.includes(p))){if(tt())return n('พบปุ่ม "+" (aria/title) hidden mode'),r;const p=r.getBoundingClientRect();if(p.bottom>window.innerHeight*.6&&p.width<80&&p.height<80)return n(`พบปุ่ม "+" (aria="${s}" title="${l}") ที่ y=${p.y.toFixed(0)}`),r}}const a=document.querySelectorAll("button");for(const r of a){const s=(r.textContent||"").trim();if(s!=="+"&&s!=="add"&&s!=="Add")continue;if(tt())return r;const l=r.getBoundingClientRect();if(l.bottom>window.innerHeight*.6&&l.width<80&&l.height<80)return n(`พบปุ่ม "+" (text="${s}") ที่ y=${l.y.toFixed(0)}`),r}const i=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');if(i){const r=i.getBoundingClientRect();let s=null,l=1/0;for(const p of a){const m=p.getBoundingClientRect();if(m.width<10||m.height<10||m.width>100||m.height>100||Math.abs(m.top-r.top)>80)continue;const g=Math.abs(m.left-r.left)+Math.abs(m.top-r.top);g<l&&(l=g,s=p)}if(s)return n(`พบปุ่ม "+" (ใกล้ prompt bar, dist=${l.toFixed(0)})`),s}for(const r of a){const s=r.querySelector("svg");if(!s)continue;const l=s.querySelectorAll("path, line, polygon"),p=Array.from(l).map(m=>m.getAttribute("d")||"").join(" ");if(p.includes("M12")||p.includes("M11")||p.includes("M10")){if(tt())return r;const m=r.getBoundingClientRect();if(m.bottom>window.innerHeight*.6&&m.width<80&&m.height<80)return n(`พบปุ่ม "+" (SVG) ที่ y=${m.y.toFixed(0)}`),r}}const d=[];for(const r of a){const s=r.getBoundingClientRect();if(s.bottom>window.innerHeight*.6&&s.width>0){const l=(r.textContent||"").trim().substring(0,30),p=r.getAttribute("aria-label")||"",m=(r.className||"").substring(0,40),g=r.querySelector("i, span[class*='icon'], svg")?"has-icon":"no-icon";d.push(`"${l}" aria="${p}" cls="${m}" ${g} y=${s.y.toFixed(0)}`)}}return M(`ไม่พบปุ่ม "+" — ปุ่มที่พบบริเวณล่าง (${d.length}): ${d.slice(0,5).join(" | ")}`),null}function ce(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=ht(a);let d=null,r=0;for(const s of i){const l=s.getBoundingClientRect();l.y>r&&(r=l.y,d=s)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${r.toFixed(0)}`),d}const e=document.querySelectorAll("button");let t=null,o=0;for(const a of e){if(tt())break;const i=a.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const d=Math.abs(i.width-i.height)<10&&i.width<60,r=i.y+i.x+(d?1e3:0);r>o&&(o=r,t=a)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const a of e){const i=(a.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return a}return null}function de(){const e=document.querySelectorAll("textarea");for(const a of e)if(tt()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const t=document.querySelectorAll('[contenteditable="true"]');for(const a of t)if(tt()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const o=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of o){const i=a.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return a}return e.length>0?e[e.length-1]:null}async function zt(e,t){var o,a,i,d;e.focus(),await f(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const r=new DataTransfer;r.setData("text/plain",t),r.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:r});e.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:r});e.dispatchEvent(l),await f(800);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(r){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${r.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await f(100);const r=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(r);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(s),await f(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(r){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${r.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await f(200);const r=new DataTransfer;r.setData("text/plain",t),r.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:r});e.dispatchEvent(s),await f(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(r){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${r.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((o=navigator.clipboard)!=null&&o.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=t,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await f(200),document.execCommand("paste"),await f(500);const r=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(r.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${r.length} ตัวอักษร)`);return}}catch(r){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${r.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const r=Object.keys(e).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(r){let s=e[r];for(let l=0;l<30&&s;l++){const p=s.memoizedProps,m=s.memoizedState;if((a=p==null?void 0:p.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const g=p.editor;g.selection,g.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(i=m==null?void 0:m.memoizedState)==null?void 0:i.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),m.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(r){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${r.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Vt(){let e=0;const t=document.querySelectorAll("img");for(const a of t){if(a.closest("#netflow-engine-overlay")||!a.src)continue;if(tt()){e++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&e++}const o=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const a of o){if(a.closest("#netflow-engine-overlay"))continue;if(tt()){e++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&e++}return e}async function Ve(e,t){n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const o=await mn(e),a=gn(o,t);n(`ขนาดไฟล์: ${(a.size/1024).toFixed(1)} KB`);const i=Vt();n(`รูปย่อปัจจุบันใน Prompt Bar: ${i} รูป`);const d=Y?1.8:1,r=HTMLInputElement.prototype.click,s=HTMLInputElement.prototype.showPicker,l=()=>{HTMLInputElement.prototype.click=function(){if(this.type==="file"){n("🚫 บล็อก file dialog จาก click()");return}return r.call(this)},typeof s=="function"&&(HTMLInputElement.prototype.showPicker=function(){if(this.type==="file"){n("🚫 บล็อก file dialog จาก showPicker()");return}return s.call(this)})},p=()=>{HTMLInputElement.prototype.click=r,typeof s=="function"&&(HTMLInputElement.prototype.showPicker=s)};l();try{n("── วิธี A: ฉีดไฟล์ลง file input โดยตรง (ไม่คลิก UI) ──");let m=Ge();if(m){n(`พบ file input: accept="${m.accept}" multiple=${m.multiple}`),He(m,a,t),await f(3e3);const T=Vt();return T>i?n(`✅ วิธี A สำเร็จ — รูปย่อเพิ่ม ${i} → ${T}`):n("✅ วิธี A — ฉีดไฟล์แล้ว (ถือว่าสำเร็จ ไม่ลองซ้ำ)"),!0}n("ไม่พบ file input[accept=image/*] — ลองวิธี B"),n("── วิธี B: คลิก '+' → เปิด dialog → ฉีดไฟล์ ──"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300);let g=le();if(g||(await f(2e3*d),g=le()),!g){const T=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');T&&(T.click(),await f(2e3*d)),g=le()}if(g){if(await et(g),n("คลิกปุ่ม '+' (Create) ✅"),await f(1500*d),m=Ge(),m||(m=await hn(Y?5e3:3e3)),m)return He(m,a,t),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(2e3),n("✅ วิธี B — ฉีดไฟล์แล้ว"),!0;document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else M("ไม่พบปุ่ม '+' บน Prompt Bar");return n("── วิธี C: drag-drop ──"),await bn(a,i)}finally{setTimeout(()=>p(),1e4)}}function Ge(){const e=document.querySelectorAll('input[type="file"][accept*="image"]');if(e.length>0)return e[e.length-1];const t=document.querySelectorAll('input[type="file"]');return t.length>0?t[t.length-1]:null}function He(e,t,o){var d,r;const a=new DataTransfer;a.items.add(t),e.files=a.files,n(`ฉีดไฟล์ ${o} เข้า file input (${((d=e.files)==null?void 0:d.length)??0} ไฟล์)`);const i=e._valueTracker;i&&(i.setValue(""),n("รีเซ็ต React _valueTracker")),e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));try{const s=(r=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"files"))==null?void 0:r.set;s&&(s.call(e,a.files),e.dispatchEvent(new Event("change",{bubbles:!0})))}catch{}n("ส่ง change + input event ✅")}async function bn(e,t){n("── Fallback: drag-and-drop ลงบน workspace ──");const o=new DataTransfer;o.items.add(e);let a=null;const i=document.querySelectorAll('[class*="workspace"], [class*="drop"], [class*="media"], main, [role="main"]');for(const m of i){const g=m.getBoundingClientRect();if(g.width>200&&g.height>200){a=m;break}}a||(a=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)||document.body);const d=a.getBoundingClientRect(),r=d.left+d.width/2,s=d.top+d.height/2,l={bubbles:!0,cancelable:!0,clientX:r,clientY:s,dataTransfer:o};a.dispatchEvent(new DragEvent("dragenter",l)),await f(100),a.dispatchEvent(new DragEvent("dragover",l)),await f(100),a.dispatchEvent(new DragEvent("drop",l)),n(`ส่ง drag-drop ลง <${a.tagName}>`);const p=Date.now();for(;Date.now()-p<8e3;){if(Vt()>t)return n("✅ drag-drop สำเร็จ — พบรูปย่อใหม่"),!0;await f(1e3)}return M("❌ drag-drop ล้มเหลว — ไม่พบรูปย่อใหม่"),!1}async function wn(e,t){var p,m;n("=== ขั้น 0: ตั้งค่า Flow ===");let o=null;for(let g=0;g<10;g++){const T=document.querySelectorAll("button, div, span, [role='button']");for(const x of T){const w=(x.textContent||"").trim();if(!(w.length>80)&&(w.includes("Nano Banana")||w.includes("Imagen")||w.includes("วิดีโอ")||w.includes("รูปภาพ")||w.includes("Image")||w.includes("Video"))){const c=x.getBoundingClientRect();c.bottom>window.innerHeight*.7&&c.width>30&&c.height>10&&(!o||(x.textContent||"").length<(o.textContent||"").length)&&(o=x)}}if(o){n(`พบปุ่มตั้งค่าจากข้อความ: "${(o.textContent||"").substring(0,40).trim()}"`);break}const B=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons, .material-symbols-rounded, span[class*='material'], span[class*='icon'], i");for(const x of B){const w=((p=x.textContent)==null?void 0:p.trim())||"";if(w.includes("crop")||w==="aspect_ratio"||w==="photo_size_select_large"){const c=x.closest("button, div[role='button'], [role='button']")||x.parentElement;if(c){const y=c.getBoundingClientRect();if(y.bottom>window.innerHeight*.7&&y.width>0){o=c,n(`พบปุ่มตั้งค่าจากไอคอน: ${w}`);break}}}}if(o)break;for(const x of T){const w=(x.textContent||"").trim();if(!(w.length>40)&&/x[1-4]/.test(w)&&(w.includes("วิดีโอ")||w.includes("รูปภาพ")||w.includes("Video")||w.includes("Image"))){const c=x.getBoundingClientRect();if(c.bottom>window.innerHeight*.7&&c.width>30){o=x,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${w.substring(0,40)}"`);break}}}if(o)break;n(`⏳ รอปุ่มตั้งค่า... (${g+1}/10)`),await f(1e3)}if(!o)return M("ไม่พบปุ่มตั้งค่า (หมด 10 รอบ)"),!1;const a=o.closest("button")||o;a!==o&&n(`ปุ่มตั้งค่า: ใช้ parent button แทน ${o.tagName}`),await et(a),n("คลิกปุ่มตั้งค่าแล้ว (robustClick)"),await f(3500);let i=!1,d=null;for(let g=0;g<3&&!d;g++){g>0&&(n(`⏳ ลองหาแท็บ Image อีกครั้ง (${g+1}/3)...`),await et(a),await f(2e3));const T=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"], [class*="tab_slider_trigger"][role="tab"]');for(const B of T){const x=B.getAttribute("aria-controls")||"",w=B.id||"";if(x.toUpperCase().includes("IMAGE")||w.toUpperCase().includes("IMAGE")){d=B,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${x})`);break}}if(!d)for(const B of document.querySelectorAll('[role="tab"]')){const x=B.id||"";if(x.toUpperCase().includes("IMAGE")){d=B,n(`พบแท็บ Image ผ่าน id: ${x}`);break}}if(!d)for(const B of document.querySelectorAll('[role="tab"]')){const x=B.getAttribute("aria-label")||((m=B.textContent)==null?void 0:m.trim())||"";if(x.toLowerCase().includes("image")||x.includes("รูปภาพ")){d=B,n(`พบแท็บ Image ผ่าน accessible name: "${x.substring(0,30)}"`);break}}if(!d)for(const B of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const x=(B.textContent||"").trim();if(!(x.length>30)&&(x==="Image"||x.endsWith("Image")||x==="รูปภาพ"||x==="ภาพ"||x.includes("รูปภาพ"))&&!x.includes("Video")&&!x.includes("วิดีโอ")){const w=B.getBoundingClientRect();if(w.width>0&&w.height>0){d=B,n(`พบแท็บ Image ผ่านข้อความ: "${x}"`);break}}}if(!d)for(const B of document.querySelectorAll('[data-radix-portal], [data-radix-popper-content-wrapper], [role="dialog"], [role="menu"]')){for(const x of B.querySelectorAll('button, [role="tab"]')){const w=(x.textContent||"").trim().toLowerCase();if((w==="image"||w.includes("image"))&&!w.includes("video")){d=x,n(`พบแท็บ Image ใน Radix portal: "${w}"`);break}}if(d)break}d||await f(1e3)}if(d){const g=d.getAttribute("data-state")||"",T=d.getAttribute("aria-selected")||"";g==="active"||T==="true"?(i=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก")):(await et(d),i=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await f(400))}i||M("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const r=e==="horizontal"?"แนวนอน":"แนวตั้ง",s=e==="horizontal"?"landscape":"portrait";for(const g of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const T=(g.textContent||"").trim();if(!(T.length>30)&&(T===r||T.includes(r)||T.toLowerCase()===s||T.toLowerCase().includes(s))){const B=g.getBoundingClientRect(),x={bubbles:!0,cancelable:!0,clientX:B.left+B.width/2,clientY:B.top+B.height/2,button:0};g.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousedown",x)),await f(80),g.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseup",x)),g.dispatchEvent(new MouseEvent("click",x)),n(`เลือกทิศทาง: ${r}`),await f(400);break}}const l=`x${t}`;for(const g of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const T=(g.textContent||"").trim();if(!(T.length>10)&&(T===l||T===`${t}`)){const B=g.getBoundingClientRect(),x={bubbles:!0,cancelable:!0,clientX:B.left+B.width/2,clientY:B.top+B.height/2,button:0};g.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousedown",x)),await f(80),g.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseup",x)),g.dispatchEvent(new MouseEvent("click",x)),n(`เลือกจำนวน: ${l}`),await f(400);break}}return await f(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),await et(a),n("ปิดหน้าตั้งค่าแล้ว"),await f(600),!0}async function xn(e){const t=e==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",o=e==="quality"?"Quality":"Fast",a=e==="quality"?"Fast":"Quality",i=e==="quality"?"คุณภาพ":"เร็ว",d=e==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${t} (${i}) ===`);let r=null;const s=Date.now()+1e4;for(;!r&&Date.now()<s;){const w=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const c of w){const y=(c.textContent||"").trim();if(!(y.length>80)&&(y.includes("Veo")||y.includes("veo"))&&(c.hasAttribute("aria-haspopup")||c.hasAttribute("aria-expanded")||c.getAttribute("role")==="combobox"||y.includes("arrow_drop_down")||c.querySelector("svg"))){r=c,n(`พบปุ่ม Veo dropdown (Strategy A): "${y.substring(0,50).trim()}"`);break}}if(!r)for(const c of w){const y=(c.textContent||"").trim();if(!(y.length>80)&&(y.includes("Veo")||y.includes("veo"))){const D=c.getBoundingClientRect();if(D.width>0&&D.height>0){r=c,n(`พบปุ่ม Veo dropdown (Strategy B): "${y.substring(0,50).trim()}"`);break}}}if(!r)for(const c of w){const y=(c.textContent||"").trim();if(!(y.length>50)&&(y.includes("Fast")||y.includes("Quality")||y.includes("เร็ว")||y.includes("คุณภาพ"))&&(c.hasAttribute("aria-haspopup")||c.hasAttribute("aria-expanded")||c.querySelector("svg"))){r=c,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${y.substring(0,50).trim()}"`);break}}if(!r){const c=document.querySelectorAll("div, span, button, [role='button']");for(const y of c){const D=(y.textContent||"").trim();if(D==="Veo 3.1 - Fast"||D==="Veo 3.1 - Quality"||D==="Fast"||D==="Quality"||D==="Veo 3.1 - เร็ว"||D==="Veo 3.1 - คุณภาพสูง"||D==="Veo 3.1 - คุณภาพ"||D==="Veo 2 - Fast"||D==="Veo 2 - Quality"){const K=y.getBoundingClientRect();if(K.width>0&&K.height>0){r=y,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${D}"`);break}}}}if(!r){const c=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const y of c){const D=(y.textContent||"").trim();if(!(D.length>60)&&(D.includes("3.1")||D.includes("model")||D.includes("โมเดล"))){const K=y.getBoundingClientRect();if(K.bottom>window.innerHeight*.4&&K.width>0&&K.height>0){r=y,n(`พบปุ่ม model selector (Strategy E): "${D.substring(0,50).trim()}"`);break}}}}r||await f(1e3)}if(!r)return M("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const l=(r.textContent||"").trim();if(l.includes(t)||l.includes(o)&&!l.includes(a)||l.includes(i)&&!l.includes(d))return n(`✅ Veo quality เป็น "${l}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=r.getBoundingClientRect(),m=p.left+p.width/2,g=p.top+p.height/2,T={bubbles:!0,cancelable:!0,clientX:m,clientY:g,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",T)),await f(80),r.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",T)),r.dispatchEvent(new MouseEvent("click",T)),n("คลิกเปิด Veo quality dropdown"),await f(1e3);let B=!1;const x=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const w of x){const c=(w.textContent||"").trim();if((c===t||c===o||c.includes(t)||c.includes(i))&&!c.includes("arrow_drop_down")){const D=w.getBoundingClientRect();if(D.width>0&&D.height>0){const K=D.left+D.width/2,F=D.top+D.height/2,N={bubbles:!0,cancelable:!0,clientX:K,clientY:F,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",N)),await f(80),w.dispatchEvent(new PointerEvent("pointerup",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",N)),w.dispatchEvent(new MouseEvent("click",N)),n(`✅ เลือก "${c}" สำเร็จ`),B=!0;break}}}return B?(await f(600),!0):(M(`ไม่พบตัวเลือก "${t}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),!1)}async function yn(e){var D,K,F,N;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,o=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=o?o[1]:"unknown",i=Y?"macOS":ae?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",d=Y?((K=(D=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:D[1])==null?void 0:K.replace(/_/g,"."))||"":ae&&((F=t.match(/Windows NT ([0-9.]+)/))==null?void 0:F[1])||"",r=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${d} | Chrome ${a}`),n(`🌐 ภาษา: ${r} | หน้าจอ: ${s} | แพลตฟอร์ม: ${Oe}`),n("══════════════════════════════════════════");try{qt(e.theme)}catch{}try{Xt(e.sceneCount||1)}catch(h){console.warn("Overlay show error:",h)}const l=[],p=[];if(e.needsNewProject){try{_("open-flow","done"),_("new-project","active"),n("=== สร้างโปรเจคใหม่ ===");let h=null;for(let S=0;S<15;S++){const R=document.querySelectorAll("button, [role='button']");for(const u of R){const v=(u.textContent||"").trim().toLowerCase();if(v.includes("new project")||v.includes("สร้างโปรเจค")||v.includes("โปรเจกต์ใหม่")){h=u;break}}if(!h){const u=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], i[class*='material'], span[class*='material'], span[class*='icon'], span[class*='google-symbols'], i");for(const v of u)if((v.textContent||"").trim()==="add_2"){const b=v.closest("button");if(b){h=b;break}}if(!h){const v=ht("add_2");v.length>0&&(h=v[0])}}if(h)break;n(`⏳ รอปุ่ม New Project... (${S+1}/15)`),await f(1e3)}if(h){n(`✅ พบปุ่ม New Project: "${(h.textContent||"").trim().substring(0,30)}"`),await et(h),await f(500),await et(h),await f(2e3);let S=!1;for(let R=0;R<20;R++){const u=document.body.innerText||"";if(u.includes("Start creating")||u.includes("เริ่มสร้าง")||u.includes("What do you want to create")||u.includes("drop media")||document.querySelector("textarea, input[placeholder]")){S=!0;break}await f(500)}n(S?"✅ Workspace พร้อมแล้ว":"⚠️ Workspace อาจยังไม่โหลดเสร็จ — ดำเนินการต่อ"),_("new-project","done"),l.push("✅ New Project")}else M("ไม่พบปุ่ม New Project — อาจอยู่ใน workspace แล้ว ดำเนินการต่อ"),_("new-project","skipped"),l.push("⚠️ New Project (skipped)")}catch(h){M(`New Project error: ${h.message}`),_("new-project","error"),l.push("⚠️ New Project")}await f(3e3)}else{try{_("open-flow","skipped")}catch{}try{_("new-project","skipped")}catch{}await f(3e3)}try{_("settings","active");const h=e.orientation||"vertical",S=e.outputCount||1,R=await wn(h,S);l.push(R?"✅ Settings":"⚠️ Settings"),_("settings",R?"done":"error")}catch(h){M(`ตั้งค่าผิดพลาด: ${h.message}`),l.push("⚠️ Settings"),_("settings","error")}try{const h=e.veoQuality||"fast";await xn(h)?(l.push(`✅ Veo ${h}`),n(`✅ Veo quality: ${h}`)):(l.push("⚠️ Veo quality"),M("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(h){M(`Veo quality error: ${h.message}`),l.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),await f(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const m=()=>{const h=document.querySelectorAll("span, div, p, label");for(const S of h){const R=(S.textContent||"").trim();if(/^\d{1,3}%$/.test(R)){if(R==="100%")return null;const u=S.getBoundingClientRect();if(u.width>0&&u.height>0&&u.top>0&&u.top<window.innerHeight)return R}}return null},g=async h=>{n(`รอการอัพโหลด ${h} เสร็จ...`),await f(2e3);const S=Date.now(),R=6e4;let u="",v=Date.now();const b=15e3;for(;Date.now()-S<R;){const $=m();if($){if($!==u)u=$,v=Date.now(),n(`กำลังอัพโหลด: ${$} — รอ...`);else if(Date.now()-v>b){n(`✅ อัพโหลด ${h} — % ค้างที่ ${$} นาน ${b/1e3} วินาที ถือว่าเสร็จ`),await f(1e3);return}await f(1500)}else{n(`✅ อัพโหลด ${h} เสร็จ — ไม่พบตัวบอก %`),await f(1e3);return}}M(`⚠️ อัพโหลด ${h} หมดเวลาหลัง ${R/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){_("upload-char","active");try{const h=await Ve(e.characterImage,"character.png");l.push(h?"✅ ตัวละคร":"⚠️ ตัวละคร"),h||p.push("character upload failed"),_("upload-char",h?"done":"error")}catch(h){M(`อัพโหลดตัวละครผิดพลาด: ${h.message}`),l.push("❌ ตัวละคร"),p.push("character upload error"),_("upload-char","error")}await g("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else It("upload-char");if(e.productImage){_("upload-prod","active");try{const h=await Ve(e.productImage,"product.png");l.push(h?"✅ สินค้า":"⚠️ สินค้า"),h||p.push("product upload failed"),_("upload-prod",h?"done":"error")}catch(h){M(`อัพโหลดสินค้าผิดพลาด: ${h.message}`),l.push("❌ สินค้า"),p.push("product upload error"),_("upload-prod","error")}await g("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else It("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800);const T=m();T&&(n(`⚠️ อัพโหลดยังแสดง ${T} — รอเพิ่มเติม...`),await g("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await f(1e3);const B=(e.characterImage?1:0)+(e.productImage?1:0);if(B>0){let h=Vt();h<B&&(n(`⏳ เห็นรูปย่อแค่ ${h}/${B} — รอ 3 วินาที...`),await f(3e3),h=Vt()),h>=B?n(`✅ ยืนยันรูปย่ออ้างอิง: ${h}/${B}`):M(`⚠️ คาดว่าจะมี ${B} รูปย่อ แต่พบ ${h} — ดำเนินการต่อ`)}if(Et()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{Ot(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),_("img-prompt","active"),await f(1e3);const x=de();x?(await zt(x,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),_("img-prompt","done")):(M("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),p.push("prompt input not found"),_("img-prompt","error")),await f(800);const w=new Set;document.querySelectorAll("img").forEach(h=>{h.src&&w.add(h.src)}),n(`บันทึกรูปเดิม: ${w.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),_("img-generate","active"),await f(500);const c=ce();if(c){const h=c.getBoundingClientRect(),S=h.left+h.width/2,R=h.top+h.height/2,u={bubbles:!0,cancelable:!0,clientX:S,clientY:R,button:0};c.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",u)),await f(80),c.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",u)),c.dispatchEvent(new MouseEvent("click",u)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await f(500),c.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",u)),await f(80),c.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",u)),c.dispatchEvent(new MouseEvent("click",u)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),_("img-generate","done")}else M("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),p.push("generate button not found"),_("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),_("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await f(15e3);const h=()=>{const b=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of b){if($.closest("#netflow-engine-overlay"))continue;const P=($.textContent||"").trim();if(P.length>10)continue;const E=P.match(/(\d{1,3})\s*%/);if(!E)continue;const k=parseInt(E[1],10);if(k<1||k>100)continue;if(tt())return k;const C=$.getBoundingClientRect();if(!(C.width===0||C.width>150)&&!(C.top<0||C.top>window.innerHeight))return k}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let S=null,R=-1,u=0;const v=Date.now();for(;!S&&Date.now()-v<18e4;){const b=document.querySelectorAll("img");for(const $ of b){if(w.has($.src)||!($.alt||"").toLowerCase().includes("generated"))continue;if(tt()?$.naturalWidth>120&&$.naturalHeight>120:(()=>{const k=$.getBoundingClientRect();return k.width>120&&k.height>120&&k.top>0&&k.top<window.innerHeight*.85})()){const k=$.closest("div");if(k){S=k,n(`พบรูป AI จาก alt="${$.alt}": ${$.src.substring(0,80)}...${tt()?" (hidden-mode)":""}`);break}}}if(!S)for(const $ of b){if(w.has($.src))continue;const P=$.closest("div"),E=(P==null?void 0:P.textContent)||"";if(E.includes("product.png")||E.includes("character.png")||E.includes(".png")||E.includes(".jpg"))continue;if(tt()?$.naturalWidth>120&&$.naturalHeight>120:(()=>{const C=$.getBoundingClientRect();return C.width>120&&C.height>120&&C.top>0&&C.top<window.innerHeight*.85})()){const C=$.closest("div");if(C){S=C,n(`พบรูปใหม่ (สำรอง): ${$.src.substring(0,80)}...${tt()?" (hidden-mode)":""}`);break}}}if(!S){if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const $=u>0?Date.now()-u:1/0;if(R<20||$>3e4){const E=ze();if(E){M(`❌ สร้างรูปล้มเหลว: ${E}`),p.push(`image gen failed: ${E}`),_("img-wait","error");break}}const P=h();if(P!==null)P!==R&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${P}%`),R=P,_("img-wait","active",P)),u=Date.now();else if(R>30){const E=Math.floor((Date.now()-u)/1e3);E>=3&&n(`🖼️ % หายที่ ${R}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&E>=5&&R>50&&(n("🍎 Tab ซ่อน + รูปน่าจะเสร็จ → เปิด tab เต็มเพื่อตรวจหารูป"),await wt(),await f(3e3))}document.hidden&&R>0&&Date.now()-u>1e4&&await kt(),document.hidden&&R<1&&Date.now()-v>3e4&&await kt(),await f(3e3)}}if(!S)M("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),_("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),_("img-wait","done",100),await wt();const b=S.getBoundingClientRect(),$=b.left+b.width/2,P=b.top+b.height/2,E={bubbles:!0,cancelable:!0,clientX:$,clientY:P};S.dispatchEvent(new PointerEvent("pointerenter",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseenter",E)),S.dispatchEvent(new PointerEvent("pointerover",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseover",E)),S.dispatchEvent(new PointerEvent("pointermove",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousemove",E)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await f(1500);let k=null;for(const C of["more_vert","more_horiz","more"]){const G=ht(C);for(const I of G){const A=I.getBoundingClientRect();if(A.top>=b.top-20&&A.top<=b.bottom&&A.right>=b.right-150&&A.right<=b.right+20){k=I;break}}if(k)break}if(!k){const C=document.querySelectorAll("button");for(const G of C){const I=G.getBoundingClientRect();if(I.width<50&&I.height<50&&I.top>=b.top-10&&I.top<=b.top+60&&I.left>=b.right-80){const A=G.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const z of A)if((((N=z.textContent)==null?void 0:N.trim())||"").includes("more")){k=G;break}if(k)break;const L=G.getAttribute("aria-label")||"";if(L.includes("เพิ่มเติม")||L.includes("more")){k=G;break}}}}if(!k)M("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const C=k.getBoundingClientRect(),G=C.left+C.width/2,I=C.top+C.height/2,A={bubbles:!0,cancelable:!0,clientX:G,clientY:I,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",A)),await f(80),k.dispatchEvent(new PointerEvent("pointerup",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",A)),k.dispatchEvent(new MouseEvent("click",A)),n("คลิกปุ่ม 3 จุดแล้ว"),await f(1500);let L=null;const z=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const H of z){const O=(H.textContent||"").trim();if(O.includes("ทำให้เป็นภาพเคลื่อนไหว")||O.includes("Animate")||O.includes("animate")){L=H;break}}if(!L)M("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const H=L.getBoundingClientRect(),O=H.left+H.width/2,j=H.top+H.height/2,q={bubbles:!0,cancelable:!0,clientX:O,clientY:j,button:0};L.dispatchEvent(new PointerEvent("pointerdown",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mousedown",q)),await f(80),L.dispatchEvent(new PointerEvent("pointerup",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mouseup",q)),L.dispatchEvent(new MouseEvent("click",q)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),_("animate","done"),await f(3e3)}}}}catch(h){M(`ขั้น 4 ผิดพลาด: ${h.message}`),l.push("⚠️ Animate")}if(Et()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{Ot(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),_("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await f(3e3);let h=!1;const S=document.querySelectorAll("button, span, div");for(const b of S){const $=(b.textContent||"").trim(),P=b.getBoundingClientRect();if(($==="วิดีโอ"||$==="Video"||$.includes("วิดีโอ"))&&P.bottom>window.innerHeight*.7){h=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}h||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let R=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise($=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>$())),R=!0;const b=Date.now();for(;document.hidden&&Date.now()-b<5e3;)await f(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await f(1e3);let u=!1;for(let b=1;b<=5&&!u;b++){if(b>1&&document.hidden){n(`🔄 Retry ${b}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(k=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>k())),R=!0;const E=Date.now();for(;document.hidden&&Date.now()-E<5e3;)await f(200);document.hidden||await f(2e3)}catch{}}const $=de();if(!$){n(`⚠️ ครั้งที่ ${b}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await f(3e3);continue}b>1&&($.focus(),await f(500)),await zt($,e.videoPrompt),await f(500);const P=($.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();P.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${b} (${P.length} ตัวอักษร)`),l.push("✅ Video Prompt"),_("vid-prompt","done"),u=!0):(n(`⚠️ ครั้งที่ ${b}: Prompt ไม่ถูกวาง (ได้ ${P.length} ตัวอักษร)`),await f(1500))}if(!u)throw M("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),l.push("❌ Video Prompt"),p.push("video prompt paste failed after 5 attempts"),_("vid-prompt","error"),new Error("Video prompt paste failed");await f(1e3),_("vid-generate","active");const v=ce();if(v){const b=v.getBoundingClientRect(),$=b.left+b.width/2,P=b.top+b.height/2,E={bubbles:!0,cancelable:!0,clientX:$,clientY:P,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",E)),await f(80),v.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",E)),v.dispatchEvent(new MouseEvent("click",E)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),_("vid-generate","done"),await f(500),v.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",E)),await f(80),v.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",E)),v.dispatchEvent(new MouseEvent("click",E)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else M("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),p.push("video generate button not found"),_("vid-generate","error");if(R){await f(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(h){M(`ขั้น 5 ผิดพลาด: ${h.message}`),l.push("⚠️ Video Gen"),p.push(`video gen error: ${h.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),It("animate"),It("vid-prompt"),It("vid-generate"),It("vid-wait");if(e.videoPrompt){_("vid-wait","active");const h=e.sceneCount||1,S=e.videoScenePrompts||[e.videoPrompt];if(h>1)try{sn(h)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${h>1?`ต่อ ${h} ฉาก`:"ดาวน์โหลด"} ===`);const R=()=>{const b=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of b){if($.closest("#netflow-engine-overlay"))continue;const P=($.textContent||"").trim();if(P.length>10)continue;const E=P.match(/(\d{1,3})\s*%/);if(!E)continue;const k=parseInt(E[1],10);if(k<1||k>100)continue;if(tt())return k;const C=$.getBoundingClientRect();if(!(C.width===0||C.width>150)&&!(C.top<0||C.top>window.innerHeight))return k}return null},u=async(b=6e5)=>{n("รอการสร้างวิดีโอ..."),_("vid-wait","active"),await f(5e3);const $=()=>{const W=document.querySelectorAll("div, span, p, label, strong, small");let X=0;for(const ot of W){if(ot.closest("#netflow-engine-overlay"))continue;const U=(ot.textContent||"").trim();if(U.includes("%")&&U.length<15){const at=ot.tagName.toLowerCase(),it=ot.className&&typeof ot.className=="string"?ot.className.split(/\s+/).slice(0,2).join(" "):"",Z=ot.getBoundingClientRect();if(n(`  🔍 "${U}" ใน <${at}.${it}> ที่ (${Z.left.toFixed(0)},${Z.top.toFixed(0)}) w=${Z.width.toFixed(0)}`),X++,X>=5)break}}X===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},P=async(W,X)=>{n(`🔄 Policy Retry ${X}/2 — สร้าง Safe Prompt แล้วลองใหม่...`),await wt(),await f(2e3);const ot=de();if(!ot)return M("❌ Retry: ไม่พบช่อง Prompt"),!1;ot.focus(),await f(300);const U=window.getSelection();U&&U.selectAllChildren(ot),await f(200),ot.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"deleteContentBackward"})),ot.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"deleteContentBackward"})),await f(500);let at=pn(W);X>=2&&(at=at.substring(0,600).replace(/\s\S*$/,"").trim(),n(`🛡️ 2nd retry: ultra-short prompt (${at.length} chars)`)),await zt(ot,at),await f(500);const it=(ot.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(it.length<20)return M(`❌ Retry: วาง Safe Prompt ไม่สำเร็จ (${it.length} ตัวอักษร)`),!1;n(`✅ วาง Safe Prompt สำเร็จ (${it.length} ตัวอักษร)`),await f(500);const Z=ce();if(!Z)return M("❌ Retry: ไม่พบปุ่ม Generate"),!1;const ut=Z.getBoundingClientRect(),xt=ut.left+ut.width/2,Gt=ut.top+ut.height/2,Ht={bubbles:!0,cancelable:!0,clientX:xt,clientY:Gt,button:0};return Z.dispatchEvent(new PointerEvent("pointerdown",{...Ht,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Z.dispatchEvent(new MouseEvent("mousedown",Ht)),await f(80),Z.dispatchEvent(new PointerEvent("pointerup",{...Ht,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Z.dispatchEvent(new MouseEvent("mouseup",Ht)),Z.dispatchEvent(new MouseEvent("click",Ht)),n(`✅ คลิก Generate สำหรับ Safe Retry ${X}`),await f(5e3),!0},E=se();n(E?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),$();const k=Date.now();let C=-1,G=0,I=!1,A=0;const L=2;for(;Date.now()-k<b;){const W=R();if(W!==null){if(W!==C&&(n(`ความคืบหน้าวิดีโอ: ${W}%`),C=W,_("vid-wait","active",W)),G=Date.now(),W>=100){n("✅ ตรวจพบ 100%!"),I=!0;break}}else if(C>30){const X=Math.floor((Date.now()-G)/1e3);if(X>=5){n(`✅ % หายไปที่ ${C}% (หาย ${X} วินาที) — วิดีโอเสร็จ!`),I=!0;break}n(`⏳ % หายที่ ${C}% — ยืนยันใน ${5-X} วินาที...`)}else{const X=Math.floor((Date.now()-k)/1e3);X%15<3&&n(`⏳ รอ... (${X} วินาที) ไม่พบ %`)}if(!I&&C>0&&se(!0)&&!E){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${C}% — วิดีโอเสร็จ!`),I=!0;break}if(Et())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(C<1){const X=ze();if(X){if(M(`❌ สร้างวิดีโอล้มเหลว: ${X}`),A<L&&e.videoPrompt)if(A++,n(`🔄 Policy violation detected — attempting safe retry ${A}/${L}...`),await P(e.videoPrompt,A)){C=-1,G=0,n(`✅ Safe retry ${A} started — continuing to monitor...`);continue}else M(`❌ Safe retry ${A} failed to start`);return null}}document.hidden&&C>0&&Date.now()-G>1e4&&await kt(),document.hidden&&C<1&&Date.now()-k>3e4&&await kt(),await f(3e3)}await wt();let z=null;for(let W=1;W<=10&&(z=se(),!z);W++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${W}/10)`),W%3===0&&await wt(),await f(3e3);if(!z)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),_("vid-wait","error"),null;const H=z;I?(_("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await f(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const O=H.getBoundingClientRect();let j=O.left+O.width/2,q=O.top+O.height/2,Q=H;const lt=H.querySelector("video, img, canvas");if(lt){const W=lt.getBoundingClientRect();W.width>50&&W.height>50&&(j=W.left+W.width/2,q=W.top+W.height/2,Q=lt,n(`🎯 พบรูปย่อ <${lt.tagName.toLowerCase()}> ในการ์ดที่ (${j.toFixed(0)},${q.toFixed(0)}) ${W.width.toFixed(0)}x${W.height.toFixed(0)}`))}else q=O.top+O.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${j.toFixed(0)},${q.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${j.toFixed(0)}, ${q.toFixed(0)})...`),Lt(Q);for(let W=0;W<8;W++){const X={bubbles:!0,cancelable:!0,clientX:j+W%2,clientY:q};Q.dispatchEvent(new PointerEvent("pointermove",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Q.dispatchEvent(new MouseEvent("mousemove",X)),await f(500)}try{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"mute_video",sceneCount:h,scenePrompts:S,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${h} ฉาก, ${S.length} prompts, theme: ${e.theme})`)}catch(W){n(`⚠️ ไม่สามารถบันทึก pending action: ${W.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await v(Q),n("✅ คลิกการ์ดวิดีโอเสร็จ"),H},v=async b=>{const $=b.getBoundingClientRect(),P=$.left+$.width/2,E=$.top+$.height/2,k={bubbles:!0,cancelable:!0,clientX:P,clientY:E,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",k)),await f(80),b.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",k)),b.dispatchEvent(new MouseEvent("click",k)),await f(50),b.click(),n("คลิกการ์ดวิดีโอแล้ว"),await f(2e3)};try{if(!await u())M("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),_("vid-wait","error");else{l.push("✅ Video Complete"),_("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await f(3e3);const $=await new Promise(P=>{chrome.storage.local.get(mt(),E=>{if(chrome.runtime.lastError){P(null);return}P((E==null?void 0:E[mt()])||null)})});$&&!$._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(mt()),$.action==="mute_video"?await qe($.sceneCount||1,$.scenePrompts||[],$.theme):$.action==="wait_scene_gen_and_download"&&await Ue($.sceneCount||2,$.currentScene||2,$.theme,$.scenePrompts||[]))}}catch(b){M(`ขั้น 6 ผิดพลาด: ${b.message}`),l.push("⚠️ Step6"),p.push(`step 6: ${b.message}`)}}const y=p.length===0;try{Ot(y?5e3:8e3)}catch(h){console.warn("Overlay complete error:",h)}return{success:y,message:y?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${p.join(", ")}`,step:y?"done":"partial"}}async function qe(e,t=[],o){var K;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{o&&qt(o)}catch{}try{Xt(e)}catch(F){n(`⚠️ showOverlay error: ${F.message}`)}try{const F=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const N of F)_(N,"done");e>=2&&_("scene2-prompt","active"),n(`✅ overlay restored: ${F.length} steps done, sceneCount=${e}`)}catch(F){n(`⚠️ overlay restore error: ${F.message}`)}await f(1500);const a=(()=>{for(const F of document.querySelectorAll("button")){const N=F.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const S of N){const R=(S.textContent||"").trim();if(R==="volume_up"||R==="volume_off"||R==="volume_mute"){const u=F.getBoundingClientRect();if(u.width>0&&u.height>0)return F}}const h=(F.getAttribute("aria-label")||"").toLowerCase();if(h.includes("mute")||h.includes("ปิดเสียง")){const S=F.getBoundingClientRect();if(S.width>0&&S.height>0)return F}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await f(2e3);for(let I=2;I<=e;I++){const A=t[I-1];if(!A){M(`ไม่พบ prompt สำหรับฉากที่ ${I}`);continue}n(`── ฉากที่ ${I}/${e}: วาง prompt + generate ──`);let L=null;const z=Date.now();for(;!L&&Date.now()-z<1e4;){const U=document.querySelectorAll("[data-slate-editor='true']");if(U.length>0&&(L=U[U.length-1]),!L){const at=document.querySelectorAll("[role='textbox'][contenteditable='true']");at.length>0&&(L=at[at.length-1])}L||await f(1e3)}if(!L){M("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${L.tagName.toLowerCase()}> ${L.className.substring(0,40)}`),await zt(L,A),n(`วาง prompt ฉาก ${I} (${A.length} ตัวอักษร) ✅`);try{_(`scene${I}-prompt`,"done"),_(`scene${I}-gen`,"active")}catch{}await f(1e3);const H=L.getBoundingClientRect();let O=null,j=1/0;for(const U of document.querySelectorAll("button")){if(U.disabled)continue;const at=U.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let it=!1;for(const xt of at){const Gt=(xt.textContent||"").trim();if(Gt==="arrow_forward"||Gt==="send"||Gt==="arrow_upward"){it=!0;break}}if(!it)continue;const Z=U.getBoundingClientRect();if(Z.width<=0||Z.height<=0)continue;const ut=Math.abs(Z.top-H.top)+Math.abs(Z.right-H.right);ut<j&&(j=ut,O=U)}if(!O)for(const U of["arrow_forward","send","arrow_upward"]){const at=ht(U);for(const it of at)if(!it.disabled){const Z=it.getBoundingClientRect();if(Z.width>0&&Z.height>0){O=it;break}}if(O)break}if(!O)for(const U of document.querySelectorAll("button")){const at=U.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const it of at)if((it.textContent||"").trim()==="arrow_forward"){const Z=U.getBoundingClientRect();if(Z.width>0&&Z.height>0){O=U;break}}if(O)break}if(!O){M("ไม่พบปุ่ม Generate/Send");return}await new Promise(U=>{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:I,scenePrompts:t}},()=>U())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${I}/${e})`),await et(O),n(`คลิก Generate ฉาก ${I} ✅`);try{_(`scene${I}-gen`,"done"),_(`scene${I}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${I} gen เสร็จ ──`),await f(5e3);let q=0,Q=0;const lt=Date.now(),W=6e5,X=5e3;let ot=!1;for(;Date.now()-lt<W;){let U=null;const at=document.querySelectorAll("div, span, p, label, strong, small");for(const it of at){if(it.closest("#netflow-engine-overlay"))continue;const ut=(it.textContent||"").trim().match(/^(\d{1,3})%$/);if(ut){const xt=it.getBoundingClientRect();if(xt.width>0&&xt.height>0&&xt.width<120&&xt.height<60){U=parseInt(ut[1],10);break}}}if(U!==null){if(U!==q){n(`🎬 ฉาก ${I} ความคืบหน้า: ${U}%`),q=U;try{_(`scene${I}-wait`,"active",U)}catch{}}Q=0}else if(q>0){if(Q===0)Q=Date.now(),n(`🔍 ฉาก ${I}: % หายไป (จาก ${q}%) — กำลังยืนยัน...`);else if(Date.now()-Q>=X){n(`✅ ฉาก ${I}: % หายไป ${X/1e3} วินาที — เจนเสร็จ!`),ot=!0;break}}if(Et()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&q>0&&Q===0&&await kt(),await f(2e3)}ot||M(`ฉาก ${I} หมดเวลา`),n(`✅ ฉาก ${I} เสร็จแล้ว`);try{_(`scene${I}-wait`,"done",100)}catch{}chrome.storage.local.remove(mt()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await f(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{_("download","active")}catch{}let F=!1;if(await wt()&&document.hidden===!1&&(F=!0),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(I=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>I())),F=!0,await f(Y?8e3:5e3)}catch{}}await f(Y?3e3:2e3);const h=Date.now();let S=null;const R=Date.now();for(;!S&&Date.now()-R<(Y?15e3:1e4);){const I=ht("download");for(const A of I){const L=A.getBoundingClientRect();if(L.width>0&&L.height>0){S=A;break}}if(!S)for(const A of document.querySelectorAll("button")){const L=A.querySelector("i, span[class*='icon'], span[class*='material']");if(L&&(L.textContent||"").trim()==="download"){const O=A.getBoundingClientRect();if(O.width>0&&O.height>0){S=A;break}}const z=(A.getAttribute("aria-label")||"").toLowerCase(),H=(A.getAttribute("title")||"").toLowerCase();if(z.includes("download")||z.includes("ดาวน์โหลด")||H.includes("download")||H.includes("ดาวน์โหลด")){const O=A.getBoundingClientRect();if(O.width>0&&O.height>0){S=A;break}}}S||await f(1e3)}if(!S){if(M("ไม่พบปุ่มดาวน์โหลด"),F)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await et(S),n("คลิกดาวน์โหลดแล้ว ✅");try{_("download","done"),_("upscale","active")}catch{}await f(Y?3e3:1500);const u=(I,A)=>new Promise(async L=>{const z=Date.now();for(;Date.now()-z<A;){const H="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const O of document.querySelectorAll(H)){const j=(O.textContent||"").trim();if(j.includes(I)&&j.length<100){const q=O.getBoundingClientRect();if(q.width>0&&q.height>0){L(O);return}}}await f(500)}L(null)}),v=(I,A)=>new Promise(async L=>{const z=Date.now();for(;Date.now()-z<I;){const H="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const O of document.querySelectorAll(H)){const j=(O.textContent||"").trim();if(j.includes("720p")&&j.length<50){const Q=O.getBoundingClientRect();if(Q.width>0&&Q.height>0){L(O);return}}const q=O.querySelectorAll("span");for(const Q of q)if((Q.textContent||"").trim()==="720p"){const lt=O.getBoundingClientRect();if(lt.width>0&&lt.height>0){L(O);return}}}A!=null&&A.isConnected&&Lt(A),await f(500)}L(null)});let b=null;for(let I=0;I<(Y?5:3)&&!b;I++){I>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${I+1}...`),S.isConnected&&(await et(S),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await f(Y?3e3:2e3)));const A=await u("Full Video",Y?1e4:5e3);if(!A){M("ไม่พบ Full Video");continue}Lt(A),await f(Y?1e3:500),await et(A),n("คลิก/hover Full Video ✅"),await f(Y?3e3:2e3),b=await v(Y?12e3:8e3,A)}if(!b){if(M("ไม่พบ 720p"),F)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await et(b),n("คลิก 720p ✅"),F){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const $=Date.now();let P=!1,E=!1;for(;Date.now()-$<3e5;){for(const I of document.querySelectorAll("div[data-title] div, div[data-content] div")){const A=(I.textContent||"").trim();if(A==="Download complete!"||A==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),P=!0;break}(A.includes("Downloading your extended video")||A.includes("กำลังดาวน์โหลด"))&&(E||(E=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(P)break;if(E){let I=!1;for(const A of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((A.textContent||"").trim().includes("Downloading")){I=!0;break}if(!I){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),P=!0;break}}if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await f(2e3)}if(!P){M("เตรียมไฟล์หมดเวลา");return}try{_("upscale","done",100),_("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let k=!1;const C=Date.now();for(;Date.now()-C<6e4&&!k;){try{await new Promise(I=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:h},A=>{chrome.runtime.lastError?M(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):A!=null&&A.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${A.message}`),k=!0,A.downloadUrl&&(i=A.downloadUrl,n(`[TikTok] จะใช้ download URL: ${A.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-C)/1e3)}s)`),I()})})}catch(I){M(`ตรวจสอบผิดพลาด: ${I.message}`)}k||await f(3e3)}k||M("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const G=await oe();i||(i=G);try{_("open","done"),Ot(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),ie(i),ne(2e3);return}if(n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await wt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(F=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>F())),await f(Y?8e3:5e3)}catch{}}await f(Y?3e3:2e3);const d=(F,N="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const h of document.querySelectorAll(N)){const S=(h.textContent||"").trim();if(S.includes(F)&&S.length<100){const R=h.getBoundingClientRect();if(R.width>0&&R.height>0&&R.top>=0)return h}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let r=null;const s=Date.now();for(;!r&&Date.now()-s<(Y?15e3:1e4);){const F=ht("download");for(const N of F){const h=N.getBoundingClientRect();if(h.width>0&&h.height>0){r=N;break}}if(!r)for(const N of document.querySelectorAll("button, [role='button']")){const h=(N.textContent||"").trim(),S=h.toLowerCase();if((S.includes("download")||S.includes("ดาวน์โหลด"))&&h.length<80){const R=N.getBoundingClientRect();if(R.width>0&&R.height>0){r=N;break}}}if(!r)for(const N of document.querySelectorAll("button")){const h=(N.getAttribute("aria-label")||"").toLowerCase(),S=(N.getAttribute("title")||"").toLowerCase();if(h.includes("download")||h.includes("ดาวน์")||S.includes("download")||S.includes("ดาวน์")){const R=N.getBoundingClientRect();if(R.width>0&&R.height>0){r=N;break}}}r||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await f(1e3))}if(!r){M("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(r.textContent||"").trim().substring(0,40)}"`),await et(r),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await f(Y?3e3:1500);const l=Date.now();let p=null;const m=Date.now();for(;!p&&Date.now()-m<(Y?1e4:5e3);)p=d("1080p"),p||(n("รอ 1080p..."),await f(500));if(!p){M("ไม่พบ 1080p");return}await et(p),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const g=Date.now();let T=!1,B=!1,x=0;const w=3e3;for(;Date.now()-g<3e5;){const N=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(N.includes("upscaling complete")||N.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),T=!0;break}for(const S of document.querySelectorAll("div, span, p")){const R=(S.textContent||"").trim().toLowerCase();if(R.length<60&&(R.includes("upscaling complete")||R.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(K=S.textContent)==null?void 0:K.trim()}")`),T=!0;break}}if(T)break;if(N.includes("upscaling your video")||N.includes("กำลังอัปสเกล")){B=!0,x=0;const S=Math.floor((Date.now()-g)/1e3);n(`⏳ กำลังอัปสเกล... (${S} วินาที)`)}else if(B){if(x===0)x=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-x>=w){n(`✅ ข้อความ Upscaling หายไป ${w/1e3} วินาที — เสร็จ!`),T=!0;break}}else{const S=Math.floor((Date.now()-g)/1e3);S%10<3&&n(`⏳ รอ Upscale... (${S} วินาที)`)}if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await f(2e3)}if(!T){M("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let c=!1;const y=Date.now();for(;Date.now()-y<6e4&&!c;){try{await new Promise(F=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:l},N=>{chrome.runtime.lastError?M(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):N!=null&&N.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${N.message}`),c=!0,N.downloadUrl&&(i=N.downloadUrl,n(`[TikTok] จะใช้ download URL: ${N.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-y)/1e3)}s)`),F()})})}catch(F){M(`ตรวจสอบผิดพลาด: ${F.message}`)}c||await f(3e3)}c||M("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const D=await oe();i||(i=D),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),ie(i),ne(2e3)}async function Ue(e=2,t=2,o,a=[]){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{o&&qt(o)}catch{}try{Xt(e)}catch(u){n(`⚠️ showOverlay error: ${u.message}`)}try{const u=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let v=2;v<=t;v++)u.push(`scene${v}-prompt`,`scene${v}-gen`),v<t&&u.push(`scene${v}-wait`);for(const v of u)_(v,"done");_(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${u.length} steps done (scene ${t}/${e} navigate)`)}catch(u){n(`⚠️ overlay restore error: ${u.message}`)}await f(2e3);const i=(()=>{for(const u of document.querySelectorAll("button")){const v=u.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const $ of v){const P=($.textContent||"").trim();if(P==="volume_up"||P==="volume_off"||P==="volume_mute"){const E=u.getBoundingClientRect();if(E.width>0&&E.height>0)return u}}const b=(u.getAttribute("aria-label")||"").toLowerCase();if(b.includes("mute")||b.includes("ปิดเสียง")){const $=u.getBoundingClientRect();if($.width>0&&$.height>0)return u}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);let d=0,r=0;const s=Date.now(),l=6e5,p=5e3;let m=!1,g=0;for(;Date.now()-s<l;){let u=null;const v=document.querySelectorAll("div, span, p, label, strong, small");for(const b of v){if(b.closest("#netflow-engine-overlay"))continue;const P=(b.textContent||"").trim().match(/^(\d{1,3})%$/);if(P){const E=b.getBoundingClientRect();if(E.width>0&&E.height>0&&E.width<120&&E.height<60){u=parseInt(P[1],10);break}}}if(u!==null){if(g=0,u!==d){n(`🎬 scene ${t} ความคืบหน้า: ${u}%`),d=u;try{_(`scene${t}-wait`,"active",u)}catch{}}r=0}else if(d>0){if(r===0)r=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${d}%) — กำลังยืนยัน...`);else if(Date.now()-r>=p){n(`✅ scene ${t}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),m=!0;break}}else if(g++,g>=15){const b=document.querySelectorAll("video");let $=!1;for(const P of b)if(P.readyState>=2&&!P.paused&&P.getBoundingClientRect().width>200){$=!0;break}if($){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),m=!0;break}if(g>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),m=!0;break}}document.hidden&&d>0&&r===0&&await kt(),await f(2e3)}m||n(`⚠️ scene ${t} หมดเวลา — ลองต่อไป`);try{_(`scene${t}-wait`,"done",100)}catch{}if(n(`✅ scene ${t} เสร็จ`),t<e&&a.length>0){n(`═══ ยังเหลืออีก ${e-t} ฉาก — ต่อฉากถัดไป ═══`),await f(2e3);for(let u=t+1;u<=e;u++){const v=a[u-1];if(!v){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${u} — ข้าม`);continue}n(`── ฉากที่ ${u}/${e}: วาง prompt + generate (pending recovery) ──`);let b=null;const $=Date.now();for(;!b&&Date.now()-$<1e4;){const z=document.querySelectorAll("[data-slate-editor='true']");if(z.length>0&&(b=z[z.length-1]),!b){const H=document.querySelectorAll("[role='textbox'][contenteditable='true']");H.length>0&&(b=H[H.length-1])}b||await f(1e3)}if(!b){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${u}`);break}await zt(b,v),n(`วาง prompt ฉาก ${u} (${v.length} ตัวอักษร) ✅`);try{_(`scene${u}-prompt`,"done"),_(`scene${u}-gen`,"active")}catch{}await f(1e3);const P=b.getBoundingClientRect();let E=null,k=1/0;for(const z of document.querySelectorAll("button")){if(z.disabled)continue;const H=z.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let O=!1;for(const Q of H){const lt=(Q.textContent||"").trim();if(lt==="arrow_forward"||lt==="send"||lt==="arrow_upward"){O=!0;break}}if(!O)continue;const j=z.getBoundingClientRect();if(j.width<=0||j.height<=0)continue;const q=Math.abs(j.top-P.top)+Math.abs(j.right-P.right);q<k&&(k=q,E=z)}if(!E)for(const z of["arrow_forward","send","arrow_upward"]){const H=ht(z);for(const O of H)if(!O.disabled){const j=O.getBoundingClientRect();if(j.width>0&&j.height>0){E=O;break}}if(E)break}if(!E)for(const z of document.querySelectorAll("button")){const H=z.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const O of H)if((O.textContent||"").trim()==="arrow_forward"){const j=z.getBoundingClientRect();if(j.width>0&&j.height>0){E=z;break}}if(E)break}if(!E){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${u}`);break}await new Promise(z=>{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:u,scenePrompts:a}},()=>z())}),await et(E),n(`คลิก Generate ฉาก ${u} ✅`);try{_(`scene${u}-gen`,"done"),_(`scene${u}-wait`,"active")}catch{}await f(5e3);let C=0,G=0;const I=Date.now();let A=!1,L=0;for(;Date.now()-I<6e5;){let z=null;const H=document.querySelectorAll("div, span, p, label, strong, small");for(const O of H){if(O.closest("#netflow-engine-overlay"))continue;const q=(O.textContent||"").trim().match(/^(\d{1,3})%$/);if(q){const Q=O.getBoundingClientRect();if(Q.width>0&&Q.height>0&&Q.width<120&&Q.height<60){z=parseInt(q[1],10);break}}}if(z!==null){if(L=0,z!==C){n(`🎬 ฉาก ${u} ความคืบหน้า: ${z}%`),C=z;try{_(`scene${u}-wait`,"active",z)}catch{}}G=0}else if(C>0){if(G===0)G=Date.now();else if(Date.now()-G>=5e3){n(`✅ ฉาก ${u}: เจนเสร็จ!`),A=!0;break}}else if(L++,L>=15){const O=document.querySelectorAll("video");let j=!1;for(const q of O)if(q.readyState>=2&&!q.paused&&q.getBoundingClientRect().width>200){j=!0;break}if(j){n(`✅ ฉาก ${u}: พบวิดีโอเล่นอยู่ — เสร็จ`),A=!0;break}if(L>=30){n(`✅ ฉาก ${u}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),A=!0;break}}document.hidden&&C>0&&G===0&&await kt(),await f(2e3)}A||n(`⚠️ ฉาก ${u} หมดเวลา`);try{_(`scene${u}-wait`,"done",100)}catch{}n(`✅ ฉาก ${u} เสร็จแล้ว`),chrome.storage.local.remove(mt()),await f(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await f(3e3);let T=null;try{_("download","active")}catch{}if(n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──"),await wt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(u=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>u())),await f(Y?8e3:5e3)}catch{}}await f(Y?3e3:2e3);const B=Date.now();let x=null;const w=Date.now();for(;!x&&Date.now()-w<(Y?15e3:1e4);){const u=ht("download");for(const v of u){const b=v.getBoundingClientRect();if(b.width>0&&b.height>0){x=v;break}}if(!x)for(const v of document.querySelectorAll("button")){const b=v.querySelector("i, span[class*='icon'], span[class*='material']");if(b&&(b.textContent||"").trim()==="download"){const E=v.getBoundingClientRect();if(E.width>0&&E.height>0){x=v;break}}const $=(v.getAttribute("aria-label")||"").toLowerCase(),P=(v.getAttribute("title")||"").toLowerCase();if($.includes("download")||$.includes("ดาวน์โหลด")||P.includes("download")||P.includes("ดาวน์โหลด")){const E=v.getBoundingClientRect();if(E.width>0&&E.height>0){x=v;break}}}x||await f(1e3)}if(!x){M("ไม่พบปุ่มดาวน์โหลด");return}await et(x),n("คลิกดาวน์โหลดแล้ว ✅");try{_("download","done"),_("upscale","active")}catch{}await f(Y?3e3:1500);const c=(u,v)=>new Promise(async b=>{const $=Date.now();for(;Date.now()-$<v;){const P="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const E of document.querySelectorAll(P)){const k=(E.textContent||"").trim();if(k.includes(u)&&k.length<100){const C=E.getBoundingClientRect();if(C.width>0&&C.height>0){b(E);return}}}await f(500)}b(null)}),y=(u,v)=>new Promise(async b=>{const $=Date.now();for(;Date.now()-$<u;){const P="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const E of document.querySelectorAll(P)){const k=(E.textContent||"").trim();if(k.includes("720p")&&k.length<50){const G=E.getBoundingClientRect();if(G.width>0&&G.height>0){b(E);return}}const C=E.querySelectorAll("span");for(const G of C)if((G.textContent||"").trim()==="720p"){const I=E.getBoundingClientRect();if(I.width>0&&I.height>0){b(E);return}}}v!=null&&v.isConnected&&Lt(v),await f(500)}b(null)});let D=null;for(let u=0;u<(Y?5:3)&&!D;u++){u>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${u+1}...`),x.isConnected&&(await et(x),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await f(Y?3e3:2e3)));const v=await c("Full Video",Y?1e4:5e3);if(!v){M("ไม่พบ Full Video");continue}Lt(v),await f(Y?1e3:500),await et(v),n("คลิก/hover Full Video ✅"),await f(Y?3e3:2e3),D=await y(Y?12e3:8e3,v)}if(!D){M("ไม่พบ 720p");return}await et(D),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const K=Date.now();let F=!1,N=!1;for(;Date.now()-K<3e5;){for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div")){const v=(u.textContent||"").trim();if(v==="Download complete!"||v==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),F=!0;break}(v.includes("Downloading your extended video")||v.includes("กำลังดาวน์โหลด"))&&(N||(N=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(F)break;if(N){let u=!1;for(const v of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((v.textContent||"").trim().includes("Downloading")){u=!0;break}if(!u){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),F=!0;break}}await f(2e3)}if(!F){M("เตรียมไฟล์หมดเวลา");return}try{_("upscale","done",100),_("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let h=!1;const S=Date.now();for(;Date.now()-S<6e4&&!h;){try{await new Promise(u=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:B},v=>{chrome.runtime.lastError?M(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):v!=null&&v.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${v.message}`),h=!0,v.downloadUrl&&(T=v.downloadUrl,n(`[TikTok] จะใช้ download URL: ${v.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-S)/1e3)}s)`),u()})})}catch(u){M(`ตรวจสอบผิดพลาด: ${u.message}`)}h||await f(3e3)}h||M("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const R=await oe();T||(T=R);try{_("open","done"),Ot(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),ie(T),ne(2e3)}async function vn(){try{await ln;const e=mt();let t=await new Promise(r=>{chrome.storage.local.get(e,s=>{if(chrome.runtime.lastError){r(null);return}r((s==null?void 0:s[e])||null)})});if(!t&&St){const r="netflow_pending_action";t=await new Promise(s=>{chrome.storage.local.get(r,l=>{if(chrome.runtime.lastError){s(null);return}s((l==null?void 0:l[r])||null)})}),t&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(r))}if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const a=Date.now()-t.timestamp;if(a>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(e);return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=i,await new Promise(r=>{chrome.storage.local.set({[e]:t},()=>r())}),await f(300),!await new Promise(r=>{chrome.storage.local.get(e,s=>{const l=s==null?void 0:s[e];r((l==null?void 0:l._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(e),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(a/1e3)} วินาที)`),t.action==="mute_video"?await qe(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await Ue(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,o)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),o({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),yn(e).then(a=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`),Be()}).catch(a=>{if(a instanceof re||(a==null?void 0:a.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Nt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Re()}catch{}}else console.error("[Netflow AI] Generate error:",a);Be()}),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,o({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return o({status:"ready"}),!1;if((e==null?void 0:e.type)==="CAPTURE_PAGE_VIDEO")return(async()=>{try{const a=document.querySelectorAll("video");let i="",d=0;for(const p of a){const m=p.src||p.currentSrc||"";if(!m)continue;const g=p.getBoundingClientRect(),T=g.width*g.height;(T>d||!i&&m)&&(d=T,i=m)}if(!i){o({success:!1,error:"No video found"});return}const r=await fetch(i);if(!r.ok){o({success:!1,error:"HTTP "+r.status});return}const s=await r.blob();if(s.size<1e4){o({success:!1,error:"Video too small: "+s.size});return}const l=await new Promise((p,m)=>{const g=new FileReader;g.onloadend=()=>p(g.result),g.onerror=()=>m(new Error("FileReader error")),g.readAsDataURL(s)});o({success:!0,data:l,size:s.size})}catch(a){o({success:!1,error:a.message})}})(),!0;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return o({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await f(500);const a=un();if(!a){M("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=a.getBoundingClientRect(),d=i.left+i.width/2,r=i.top+i.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${r.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const l=document.elementFromPoint(d,r);l?(await et(l),n(`คลิก ${s+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await et(a),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await f(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),(async()=>{try{const e=await new Promise(t=>{chrome.storage.local.get("netflow_preshow_overlay",o=>{if(chrome.runtime.lastError){t(null);return}t((o==null?void 0:o.netflow_preshow_overlay)||null)})});if(e&&e.timestamp&&Date.now()-e.timestamp<3e4){n("⚡ Pre-show overlay — แสดง overlay ทันที");try{qt(e.theme)}catch{}try{Xt(e.sceneCount||1)}catch(t){n(`⚠️ pre-show overlay error: ${t.message}`)}chrome.storage.local.remove("netflow_preshow_overlay")}}catch{}})(),vn()})();
