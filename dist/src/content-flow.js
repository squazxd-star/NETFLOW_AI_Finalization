(function(){"use strict";const bt={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let st=bt.blue,At=null;function qt(e){e&&bt[e]&&(At=e,st=bt[e],pe(),requestAnimationFrame(()=>Me()))}function We(){if(At&&bt[At])return bt[At];try{const e=localStorage.getItem("netflow_app_theme");if(e&&bt[e])return bt[e]}catch{}return bt.blue}let ct=43,dt=125,pt=233;function pe(){const e=st.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(ct=parseInt(e[1],16),dt=parseInt(e[2],16),pt=parseInt(e[3],16))}const fe='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',ue='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let G=null,rt=null,nt=null,ge=0,Ut=null,Pt=null,Wt=null,Zt=0,yt=!1,gt=null,Mt=null,Rt=null,Ct=1,et=[];function jt(e){const t=[{stepId:"open-flow",label:"เปิด Google Flow",status:"waiting"},{stepId:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let o=2;o<=e;o++)t.push({stepId:`scene${o}-prompt`,label:`ฉาก ${o} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${o}-gen`,label:`ฉาก ${o} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${o}-wait`,label:`ฉาก ${o} — กำลังสร้าง`,status:"waiting",progress:0});t.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return t}const ft=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"open-flow",label:"เปิด Google Flow",status:"waiting"},{id:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];et=jt(1);function je(e){const t=e.rgb,o=e.accentRgb,r=e.doneRgb,i=e.hex,d=e.accentHex,a=e.doneHex,s=(()=>{const P=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!P)return"#4ade80";const c=$=>Math.min(255,$+80);return`#${[1,2,3].map($=>c(parseInt(P[$],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const P=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!P)return"#4ade80";const c=$=>Math.min(255,$+60);return`#${[1,2,3].map($=>c(parseInt(P[$],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),m=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,x=p?parseInt(p[1],16)/m:0,S=p?parseInt(p[2],16)/m:1,L=p?parseInt(p[3],16)/m:.25,F=P=>`${Math.round(x*P)}, ${Math.round(S*P)}, ${Math.round(L*P)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${F(18)},0.94) 0%, rgba(${F(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: rgba(${F(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${F(180)},0.05),
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
            0 0 200px rgba(${F(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${F(180)},0.08),
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
    color: ${s};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${t},0.3);
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
    border-top: 1px solid rgba(${t},0.2);
    background: linear-gradient(180deg, rgba(${F(5)},0.95) 0%, rgba(${F(12)},0.98) 100%);
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
    background: linear-gradient(180deg, rgba(${F(6)},0.75) 0%, rgba(${F(3)},0.92) 100%);
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
    background: rgba(${F(8)}, 0.88);
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
    background: ${a};
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
    background: linear-gradient(90deg, ${i}, ${s});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${t},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${a}, ${l});
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
    background: linear-gradient(90deg, ${a}, ${l});
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
    background: rgba(${F(8)},0.8);
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
    background: rgba(${F(8)}, 0.9);
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
    background: ${a};
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

    `}function Jt(){nt||(nt=document.createElement("style"),nt.id="netflow-overlay-styles",nt.textContent=je(st),document.head.appendChild(nt))}function me(e){e.innerHTML="",et.forEach((t,o)=>{const r=document.createElement("div");r.className="nf-proc-row nf-proc-waiting",r.id=`nf-proc-${t.stepId}`,r.innerHTML=`
            <span class="nf-proc-num">${o+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(r)})}function he(){const e=document.getElementById("nf-terminal");if(!e)return;me(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${et.length}`)}function be(e,t){let s="";for(let S=0;S<20;S++){const L=S/20*Math.PI*2,F=(S+.2)/20*Math.PI*2,P=(S+.5)/20*Math.PI*2,c=(S+.8)/20*Math.PI*2,$=(S+1)/20*Math.PI*2;s+=`${S===0?"M":"L"}${(120+100*Math.cos(L)).toFixed(1)},${(120+100*Math.sin(L)).toFixed(1)} `,s+=`L${(120+100*Math.cos(F)).toFixed(1)},${(120+100*Math.sin(F)).toFixed(1)} `,s+=`L${(120+112*Math.cos(P)).toFixed(1)},${(120+112*Math.sin(P)).toFixed(1)} `,s+=`L${(120+100*Math.cos(c)).toFixed(1)},${(120+100*Math.sin(c)).toFixed(1)} `,s+=`L${(120+100*Math.cos($)).toFixed(1)},${(120+100*Math.sin($)).toFixed(1)} `}s+="Z";const l=14,p=72,m=62;let x="";for(let S=0;S<l;S++){const L=S/l*Math.PI*2,F=(S+.25)/l*Math.PI*2,P=(S+.75)/l*Math.PI*2,c=(S+1)/l*Math.PI*2;x+=`${S===0?"M":"L"}${(120+m*Math.cos(L)).toFixed(1)},${(120+m*Math.sin(L)).toFixed(1)} `,x+=`L${(120+p*Math.cos(F)).toFixed(1)},${(120+p*Math.sin(F)).toFixed(1)} `,x+=`L${(120+p*Math.cos(P)).toFixed(1)},${(120+p*Math.sin(P)).toFixed(1)} `,x+=`L${(120+m*Math.cos(c)).toFixed(1)},${(120+m*Math.sin(c)).toFixed(1)} `}return x+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </svg>`}function Ye(){const e=document.createElement("div");e.id="netflow-engine-overlay",gt=document.createElement("canvas"),gt.id="nf-matrix-canvas",e.appendChild(gt);const t=document.createElement("div");t.className="nf-pat-plasma",e.appendChild(t);for(let k=1;k<=5;k++){const C=document.createElement("div");C.className=`nf-ambient-orb nf-orb-${k}`,e.appendChild(C)}const o=document.createElement("div");o.className="nf-pat-data",e.appendChild(o);const r=document.createElement("div");r.className="nf-pat-diag-a",e.appendChild(r);const i=document.createElement("div");i.className="nf-pat-diag-b",e.appendChild(i);const d=document.createElement("div");d.className="nf-pat-circuit",e.appendChild(d);const a=document.createElement("div");a.className="nf-pat-honeycomb",e.appendChild(a);const s=document.createElement("div");s.className="nf-pat-binary",e.appendChild(s);const l=document.createElement("div");l.className="nf-pat-crosshatch",e.appendChild(l);const p=document.createElement("div");p.className="nf-pat-diamond",e.appendChild(p);const m=document.createElement("div");m.className="nf-pat-wave-h",e.appendChild(m);const x=document.createElement("div");x.className="nf-pat-radar",e.appendChild(x);const S=document.createElement("div");S.className="nf-pat-ripple-1",e.appendChild(S);const L=document.createElement("div");L.className="nf-pat-ripple-2",e.appendChild(L);const F=document.createElement("div");F.className="nf-pat-techscan",e.appendChild(F);const P=document.createElement("div");P.className="nf-center-glow",e.appendChild(P);const c=document.createElement("div");c.className="nf-pat-noise",e.appendChild(c);const $=document.createElement("div");$.className="nf-crt-scanlines",e.appendChild($);const D=document.createElement("div");D.className="nf-vignette",e.appendChild(D);for(let k=0;k<3;k++){const C=document.createElement("div");C.className="nf-pulse-ring",e.appendChild(C)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(k=>{const C=document.createElement("div");C.className=`nf-corner-deco ${k}`,e.appendChild(C)});const M=document.createElement("button");M.className="nf-stop-btn",M.innerHTML='<span class="nf-stop-icon"></span> หยุด',M.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",M.onclick=()=>{var k;window.__NETFLOW_STOP__=!0;try{Nt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((k=chrome.runtime)!=null&&k.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},e.appendChild(M);const T=document.createElement("div");T.className="nf-layout";const w=document.createElement("div");w.className="nf-core-monitor",w.id="nf-core-monitor";const f=document.createElement("div");f.className="nf-core-header",f.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${et.length}</div>
    `,w.appendChild(f);const h=document.createElement("div");h.className="nf-terminal",h.id="nf-terminal",me(h),w.appendChild(h);const _=document.createElement("div");_.className="nf-engine-core",_.id="nf-engine-core";const g=document.createElement("div");g.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(k=>{const C=document.createElement("div");C.className=`nf-frame-corner ${k}`,g.appendChild(C)}),_.appendChild(g);const y="http://www.w3.org/2000/svg",b=document.createElementNS(y,"svg");b.setAttribute("class","nf-engine-waves"),b.setAttribute("viewBox","0 0 560 140"),b.setAttribute("preserveAspectRatio","none"),b.id="nf-engine-waves";for(let k=0;k<4;k++){const C=document.createElementNS(y,"path");C.setAttribute("fill","none"),C.setAttribute("stroke-width",k<2?"1.5":"1"),C.setAttribute("stroke",k<2?`rgba(${st.rgb},${.14+k*.1})`:`rgba(${st.accentRgb},${.1+(k-2)*.08})`),C.setAttribute("data-wave-idx",String(k)),b.appendChild(C)}_.appendChild(b);const v=document.createElement("div");v.className="nf-engine-brand-inner",v.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${be(st.rgb,st.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${be(st.rgb,st.accentRgb)}
        </div>
    `,_.appendChild(v);const B=document.createElement("div");B.className="nf-engine-stats",B.id="nf-engine-stats",B.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([k,C,H])=>`<div class="nf-stat-item"><span class="nf-stat-label">${k}</span><span class="nf-stat-val" id="${C}">${H}</span></div>`).join(""),_.appendChild(B),w.appendChild(_),T.appendChild(w);const E=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ft.forEach((k,C)=>{const H=Ke(k);H.classList.add(E[C]),H.id=`nf-mod-${k.id}`,T.appendChild(H)}),e.appendChild(T);for(let k=0;k<30;k++){const C=document.createElement("div");C.className="nf-particle",C.style.left=`${5+Math.random()*90}%`,C.style.bottom=`${Math.random()*40}%`,C.style.animationDuration=`${3+Math.random()*5}s`,C.style.animationDelay=`${Math.random()*4}s`;const H=.3+Math.random()*.4,I=.7+Math.random()*.3;C.style.background=`rgba(${Math.floor(ct*I)}, ${Math.floor(dt*I)}, ${Math.floor(pt*I)}, ${H})`,C.style.width=`${1+Math.random()*2}px`,C.style.height=C.style.width,e.appendChild(C)}return e}function Ke(e){const t=document.createElement("div");t.className="nf-module";const o=document.createElement("div");o.className="nf-mod-header",o.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(o),e.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let a="";i.progress!==void 0&&(a=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${a}
        `,t.appendChild(d)});const r=document.createElement("div");return r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(r),t}function Xe(){ge=Date.now(),Ut=setInterval(()=>{const e=Math.floor((Date.now()-ge)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),o=String(e%60).padStart(2,"0"),r=document.getElementById("nf-timer");r&&(r.textContent=`${t}:${o}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${t}:${o}`)},1e3)}function we(){Ut&&(clearInterval(Ut),Ut=null)}const Qe=120,xe=160,ye=.4;let Tt=null,ve=0,$e=0,Ee=0,Bt=[];function Ze(e,t){Bt=[];for(let o=0;o<Qe;o++){const r=Math.random();let i;r<.22?i=0:r<.4?i=1:r<.55?i=2:r<.68?i=3:r<.84?i=4:i=5;const d=Math.random()*e,a=Math.random()*t,s=50+Math.random()*220,l=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Bt.push({x:i===0?Math.random()*e:d+Math.cos(l)*s,y:i===0?Math.random()*t:a+Math.sin(l)*s,vx:(Math.random()-.5)*ye,vy:(Math.random()-.5)*ye,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:d,oCy:a,oRadius:s,oAngle:l,oSpeed:p})}}function Je(){if(!gt)return;const e=gt;if(Mt=e.getContext("2d"),!Mt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,Bt.length===0&&Ze(e.width,e.height)};t(),window.addEventListener("resize",t);let o=null,r=0,i=0,d=!1;function a(){if(!Mt||!gt){Rt=null;return}if(Rt=requestAnimationFrame(a),d=!d,d)return;const s=Mt,l=gt.width,p=gt.height;s.fillStyle=`rgba(${ct*.04|0},${dt*.04|0},${pt*.06|0},1)`,s.fillRect(0,0,l,p),(!o||r!==l||i!==p)&&(r=l,i=p,o=s.createRadialGradient(l*.5,p*.5,0,l*.5,p*.5,Math.max(l,p)*.6),o.addColorStop(0,`rgba(${ct*.08|0},${dt*.08|0},${pt*.1|0},0.4)`),o.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=o,s.fillRect(0,0,l,p);const m=Bt,x=m.length,S=xe*xe;for(let P=0;P<x;P++){const c=m[P];if(c.pulsePhase+=c.pulseSpeed,c.motion===0)c.x+=c.vx,c.y+=c.vy,c.x<0?(c.x=0,c.vx=Math.abs(c.vx)*(.8+Math.random()*.4)):c.x>l&&(c.x=l,c.vx=-Math.abs(c.vx)*(.8+Math.random()*.4)),c.y<0?(c.y=0,c.vy=Math.abs(c.vy)*(.8+Math.random()*.4)):c.y>p&&(c.y=p,c.vy=-Math.abs(c.vy)*(.8+Math.random()*.4));else if(c.motion===1)c.oAngle+=c.oSpeed,c.x=c.oCx+Math.cos(c.oAngle)*c.oRadius,c.y=c.oCy+Math.sin(c.oAngle)*c.oRadius,c.oCx+=Math.sin(c.oAngle*.3)*.15,c.oCy+=Math.cos(c.oAngle*.3)*.15;else if(c.motion===2)c.oAngle+=c.oSpeed,c.x=c.oCx+Math.cos(c.oAngle)*c.oRadius,c.y=c.oCy+Math.sin(c.oAngle)*c.oRadius*.5,c.oCx+=Math.sin(c.oAngle*.2)*.1,c.oCy+=Math.cos(c.oAngle*.2)*.1;else if(c.motion===3){c.oAngle+=c.oSpeed;const $=c.oAngle,D=c.oRadius*.7;c.x=c.oCx+D*Math.cos($),c.y=c.oCy+D*Math.sin($)*Math.cos($),c.oCx+=Math.sin($*.15)*.12,c.oCy+=Math.cos($*.15)*.12}else if(c.motion===4){c.oAngle+=c.oSpeed*1.2;const $=c.oRadius*(.5+.5*Math.abs(Math.sin(c.oAngle*.15)));c.x=c.oCx+Math.cos(c.oAngle)*$,c.y=c.oCy+Math.sin(c.oAngle)*$,c.oCx+=Math.sin(c.oAngle*.1)*.18,c.oCy+=Math.cos(c.oAngle*.1)*.18}else c.oAngle+=c.oSpeed,c.x+=c.vx*.8,c.y=c.oCy+Math.sin(c.oAngle+c.x*.008)*c.oRadius*.35,c.x<-30?c.x=l+30:c.x>l+30&&(c.x=-30),c.oCy+=Math.sin(c.oAngle*.1)*.08;if(c.motion>0){const $=c.oRadius+50;c.oCx<-$?c.oCx=l+$:c.oCx>l+$&&(c.oCx=-$),c.oCy<-$?c.oCy=p+$:c.oCy>p+$&&(c.oCy=-$)}}s.beginPath(),s.strokeStyle=`rgba(${ct},${dt},${pt},0.06)`,s.lineWidth=.4;const L=new Path2D;for(let P=0;P<x;P++){const c=m[P];for(let $=P+1;$<x;$++){const D=m[$],M=c.x-D.x,T=c.y-D.y,w=M*M+T*T;w<S&&(1-w/S<.4?(s.moveTo(c.x,c.y),s.lineTo(D.x,D.y)):(L.moveTo(c.x,c.y),L.lineTo(D.x,D.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${ct},${dt},${pt},0.18)`,s.lineWidth=.8,s.stroke(L),!Tt||ve!==ct||$e!==dt||Ee!==pt){Tt=document.createElement("canvas");const P=48;Tt.width=P,Tt.height=P;const c=Tt.getContext("2d"),$=c.createRadialGradient(P/2,P/2,0,P/2,P/2,P/2);$.addColorStop(0,`rgba(${ct},${dt},${pt},0.9)`),$.addColorStop(.3,`rgba(${ct},${dt},${pt},0.35)`),$.addColorStop(1,`rgba(${ct},${dt},${pt},0)`),c.fillStyle=$,c.fillRect(0,0,P,P),ve=ct,$e=dt,Ee=pt}const F=Tt;for(let P=0;P<x;P++){const c=m[P],$=.6+.4*Math.sin(c.pulsePhase),D=c.radius*5*(.8+$*.4);s.globalAlpha=.5+$*.4,s.drawImage(F,c.x-D/2,c.y-D/2,D,D)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let P=0;P<x;P++){const c=m[P];if(c.radius>2){const $=.6+.4*Math.sin(c.pulsePhase),D=c.radius*(.8+$*.4)*.35;s.moveTo(c.x+D,c.y),s.arc(c.x,c.y,D,0,Math.PI*2)}}s.fill()}a()}function tn(){Rt!==null&&(cancelAnimationFrame(Rt),Rt=null),gt=null,Mt=null,Bt=[]}let Dt=null;const Yt=560,en=140,ke=Yt/2,Ce=en/2,Te=[];for(let e=0;e<=Yt;e+=8){const t=Math.abs(e-ke)/ke;Te.push(Math.pow(Math.min(1,t*1.6),.6))}const nn=[0,1,2,3].map(e=>({amp:10+e*5,freq:(1.2+e*.35)*Math.PI*2/Yt,off:e*.6,spd:.7+e*.12}));let te=!1;function Ie(){if(Pt=requestAnimationFrame(Ie),te=!te,te)return;if(Zt+=.07,!Dt){const t=document.getElementById("nf-engine-waves");if(!t){Pt=null;return}Dt=Array.from(t.querySelectorAll("path"))}const e=[];for(let t=0;t<Dt.length;t++){const o=nn[t],r=Zt*o.spd+o.off;e.length=0,e.push(`M 0 ${Ce}`);let i=0;for(let d=0;d<=Yt;d+=8){const a=Ce+o.amp*Te[i++]*Math.sin(d*o.freq+r);e.push(`L${d} ${a*10+.5|0}`)}Dt[t].setAttribute("d",e.join(" "))}}function on(){Zt=0,Ie(),Je(),Wt=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),o=document.getElementById("nf-stat-lat2"),r=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function Se(){Pt!==null&&(cancelAnimationFrame(Pt),Pt=null),Wt&&(clearInterval(Wt),Wt=null),Dt=null,tn()}function Kt(){let e=0;const t=et.filter(p=>p.status!=="skipped").length;for(const p of et){const m=document.getElementById(`nf-proc-${p.stepId}`);if(!m)continue;m.className="nf-proc-row";const x=m.querySelector(".nf-proc-badge");switch(p.status){case"done":m.classList.add("nf-proc-done"),x&&(x.textContent="✅ done"),e++;break;case"active":m.classList.add("nf-proc-active"),x&&(x.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":m.classList.add("nf-proc-error"),x&&(x.textContent="❌ error");break;case"skipped":m.classList.add("nf-proc-skipped"),x&&(x.textContent="— skip");break;default:m.classList.add("nf-proc-waiting"),x&&(x.textContent="(queued)")}}const o=et.findIndex(p=>p.status==="active"),r=o>=0?o+1:e>=t&&t>0?et.length:e,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${r}/${et.length}`);const d=document.querySelector(".nf-core-title-val"),a=document.querySelector(".nf-status-dot");e>=t&&t>0?(d&&(d.textContent="COMPLETE",d.style.color=st.doneHex),a&&(a.style.background=st.doneHex,a.style.boxShadow=`0 0 8px rgba(${st.doneRgb},0.7)`)):et.some(m=>m.status==="error")?(d&&(d.textContent="ERROR",d.style.color="#f87171"),a&&(a.style.background="#ef4444",a.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):et.some(m=>m.status==="active")&&d&&(d.textContent="ACTIVE",d.style.color=st.hex,d.style.textShadow=`0 0 10px rgba(${st.rgb},0.5)`);const s=document.getElementById("nf-terminal"),l=s==null?void 0:s.querySelector(".nf-proc-active");l&&s&&l.scrollIntoView({behavior:"smooth",block:"center"})}function _e(){rt&&rt.isConnected||(Jt(),rt=document.createElement("button"),rt.id="nf-toggle-btn",rt.className="nf-toggle-visible",rt.innerHTML=yt?fe:ue,rt.title="ซ่อน/แสดง Netflow Overlay",rt.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",rt.onclick=()=>Ae(),document.body.appendChild(rt))}function Ae(){G&&(_e(),yt?(G.classList.remove("nf-hidden"),G.classList.add("nf-visible"),G.style.opacity="1",G.style.pointerEvents="auto",rt&&(rt.innerHTML=ue),yt=!1):(G.classList.remove("nf-visible"),G.classList.add("nf-hidden"),G.style.opacity="0",G.style.pointerEvents="none",rt&&(rt.innerHTML=fe),yt=!0))}const Pe={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Me(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=At;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"green"}catch{t="green"}const o=Pe[t]||Pe.green;let r;try{r=chrome.runtime.getURL(o)}catch{r=`/${o}`}const i=st.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${r}')`].join(", "),e.style.backgroundSize="auto, auto, 50%",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${i},0.45)`,e.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function Xt(e=1){if(st=We(),pe(),G&&G.isConnected){G.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!nt||!nt.isConnected)&&(nt=null,Jt()),setTimeout(()=>{if(G)try{nt!=null&&nt.sheet&&nt.sheet.cssRules.length>0&&(G.style.removeProperty("background"),G.style.removeProperty("font-family"),G.style.removeProperty("overflow"))}catch{}},200);for(const t of ft)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;Ct=e,et=jt(e),he();for(const t of ft)ee(t);if(Qt(),Kt(),!G.querySelector(".nf-stop-btn")){const t=document.createElement("button");t.className="nf-stop-btn",t.innerHTML='<span class="nf-stop-icon"></span> หยุด',t.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",t.onclick=()=>{var o;window.__NETFLOW_STOP__=!0;try{Nt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((o=chrome.runtime)!=null&&o.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},G.appendChild(t)}yt&&Ae();return}G&&!G.isConnected&&(G=null),nt&&(nt.remove(),nt=null),Jt();for(const t of ft)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;if(Ct=e,et=jt(e),e>1){const t=ft.find(r=>r.id==="video");if(t){const r=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=e;i++)r.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),r.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),r.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});t.steps=r}const o=ft.find(r=>r.id==="render");if(o){const r=o.steps.find(d=>d.id==="download");r&&(r.label="ดาวน์โหลด 720p");const i=o.steps.find(d=>d.id==="upscale");i&&(i.label="Full Video")}}G=Ye(),G.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(G),G.classList.add("nf-visible"),yt=!1,_e(),Xe(),on(),requestAnimationFrame(()=>Me()),setTimeout(()=>{if(G)try{nt!=null&&nt.sheet&&nt.sheet.cssRules.length>0&&(G.style.removeProperty("background"),G.style.removeProperty("font-family"),G.style.removeProperty("overflow"))}catch{}},200)}function Re(){we(),Se(),yt=!1,G&&(G.classList.add("nf-fade-out"),setTimeout(()=>{G==null||G.remove(),G=null},500)),rt&&(rt.remove(),rt=null)}const an={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function rn(e,t,o){const r=et.findIndex(x=>x.status==="active"),i=et.filter(x=>x.status==="done").length,d=et.length,a=r>=0?r+1:i>=d?d:i,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${a}/${d}`);let l=1;for(const x of et)if(x.status==="active"||x.status==="done")if(x.stepId.startsWith("scene")){const S=x.stepId.match(/^scene(\d+)-/);S&&(l=Math.max(l,parseInt(S[1],10)))}else(x.stepId==="download"||x.stepId==="upscale"||x.stepId==="open")&&(l=Ct);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=Ct>1?`${l}/${Ct}`:"1/1"),t==="active"){const x=document.getElementById("nf-stat-status"),S=an[e]||e.toUpperCase();x&&(x.textContent=S)}else if(t==="done"&&i>=d){const x=document.getElementById("nf-stat-status");x&&(x.textContent="COMPLETE")}else if(t==="error"){const x=document.getElementById("nf-stat-status");x&&(x.textContent="ERROR")}const m=document.getElementById("nf-stat-progress");m&&(o!==void 0&&o>0?m.textContent=`${Math.min(100,o)}%`:t==="active"&&(m.textContent="—"))}function A(e,t,o){if(!G)return;for(const i of ft)for(const d of i.steps)d.id===e&&(d.status=t,o!==void 0&&(d.progress=o));for(const i of et)i.stepId===e&&(i.status=t,o!==void 0&&(i.progress=o));const r=document.getElementById(`nf-step-${e}`);if(r&&(r.className="nf-step",t==="active"?r.classList.add("nf-step-active"):t==="done"?r.classList.add("nf-step-done"):t==="error"&&r.classList.add("nf-step-error")),rn(e,t,o),o!==void 0){const i=document.getElementById(`nf-bar-${e}`);i&&(i.style.width=`${Math.min(100,o)}%`)}Qt(),Kt()}function It(e){A(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function Ot(e=4e3){we(),Se(),Qt(),Kt(),setTimeout(()=>Re(),e)}function Qt(){for(const e of ft){const t=e.steps.filter(l=>l.status!=="skipped").length,o=e.steps.filter(l=>l.status==="done").length,r=e.steps.some(l=>l.status==="active"),i=t>0?Math.round(o/t*100):0,d=document.getElementById(`nf-pct-${e.id}`);d&&(d.textContent=`${i}%`);const a=document.getElementById(`nf-modbar-${e.id}`);a&&(a.style.width=`${i}%`);const s=document.getElementById(`nf-mod-${e.id}`);s&&(s.classList.remove("nf-active","nf-done"),i>=100?s.classList.add("nf-done"):r&&s.classList.add("nf-active"))}}function sn(e){var r,i,d,a;Ct=e;const t=new Map;for(const s of et)t.set(s.stepId,{status:s.status,progress:s.progress});et=jt(e);for(const s of et){const l=t.get(s.stepId);l&&(s.status=l.status,l.progress!==void 0&&(s.progress=l.progress))}if(he(),e>1){const s=ft.find(l=>l.id==="video");if(s){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((r=s.steps.find(p=>p.id==="animate"))==null?void 0:r.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=s.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=s.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((a=s.steps.find(p=>p.id==="vid-wait"))==null?void 0:a.status)||"waiting",progress:0}];for(let p=2;p<=e;p++)l.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),l.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),l.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});s.steps=l,ee(s)}}const o=ft.find(s=>s.id==="render");if(o&&e>1){const s=o.steps.find(p=>p.id==="download");s&&(s.label="ดาวน์โหลด 720p");const l=o.steps.find(p=>p.id==="upscale");l&&(l.label="Full Video"),ee(o)}Qt(),Kt()}function ee(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),e.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let a="";i.progress!==void 0&&(a=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${a}
        `,t.appendChild(d)});const r=document.createElement("div");r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(r)}function Nt(e){e.replace(/^\[Netflow AI\]\s*/,"")}let St=null,vt=null;const ln=new Promise(e=>{vt=e,setTimeout(()=>e(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},e=>{!chrome.runtime.lastError&&(e!=null&&e.tabId)&&(St=e.tabId,console.log(`[Netflow AI] Tab ID: ${St}`)),vt&&(vt(St),vt=null)})}catch{vt&&(vt(null),vt=null)}function mt(){return St?`netflow_pending_action_${St}`:"netflow_pending_action"}function Be(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Nt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},O=e=>{console.warn(`[Netflow AI] ${e}`);try{Nt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}};(()=>{const e=(o,r)=>{const i=o.tagName.toLowerCase(),d=o.id?`#${o.id}`:"",a=o.className&&typeof o.className=="string"?"."+o.className.trim().split(/\s+/).join("."):"",s=o.getBoundingClientRect(),l={};for(const c of o.attributes)["class","id","style"].includes(c.name)||(l[c.name]=c.value.length>80?c.value.slice(0,80)+"…":c.value);const p=(o.textContent||"").trim().slice(0,120),m=Array.from(o.querySelectorAll('i, [class*="icon"]')).map(c=>{var $;return($=c.textContent)==null?void 0:$.trim()}).filter(Boolean).join(", "),x=[];let S=o.parentElement;for(let c=0;c<5&&S;c++){const $=S.tagName.toLowerCase(),D=S.id?`#${S.id}`:"",M=S.className&&typeof S.className=="string"?"."+S.className.trim().split(/\s+/).slice(0,2).join("."):"";x.push(`${$}${D}${M}`),S=S.parentElement}const L=r==="click"?`%c🖱️ CLICK %c<${i}${d}${a}>`:`%c👆 HOVER %c<${i}${d}${a}>`;console.groupCollapsed(L,r==="click"?"background:#e74c3c;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold":"background:#3498db;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold","color:#f39c12;font-weight:bold"),console.log("Element:",o),console.log("Selector:",`${i}${d}${a}`),console.log("Rect:",{x:Math.round(s.x),y:Math.round(s.y),w:Math.round(s.width),h:Math.round(s.height)}),Object.keys(l).length&&console.log("Attributes:",l),p&&console.log("Text:",p),m&&console.log("Icons:",m),x.length&&console.log("Ancestors:",x.join(" > ")),console.groupEnd()};document.addEventListener("click",o=>{const r=o.target;r!=null&&r.closest("#netflow-engine-overlay")||e(r,"click")},!0);let t=null;document.addEventListener("mouseover",o=>{const r=o.target;r!==t&&(r!=null&&r.closest("#netflow-engine-overlay")||(t=r,e(r,"hover")))},!0),console.log("%c[Netflow AI] 🔍 Debug Element Inspector ACTIVE — click/hover elements to inspect","background:#2ecc71;color:#000;padding:4px 8px;border-radius:4px;font-weight:bold")})();function ne(e=3e3){n(`🔒 จะปิดแท็บ automation ใน ${e/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},t=>{chrome.runtime.lastError?O(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${t==null?void 0:t.message}`)})}catch(t){O(`ปิดแท็บผิดพลาด: ${t.message}`)}},e)}async function oe(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},d=>{if(chrome.runtime.lastError){i(!1);return}i(!!(d!=null&&d.cached))})}catch{i(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const d of i){const a=d.src||d.currentSrc||"";if(a)return a}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const t=document.querySelectorAll("video");let o=null,r=0;for(const i of t){let d=i.src||"";if(!d){const l=i.querySelector("source");l&&(d=l.getAttribute("src")||"")}if(!d&&i.currentSrc&&(d=i.currentSrc),!d)continue;if(Z()){o||(o=d,r=1);continue}const a=i.getBoundingClientRect(),s=a.width*a.height;a.width>50&&s>r&&(r=s,o=d)}if(!o)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${o.substring(0,80)}... (area=${r.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(o);if(!i.ok)return n(`[TikTok] fetch failed: HTTP ${i.status}`),await De(o),o;const d=await i.blob(),a=(d.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${a} MB, type: ${d.type}`),d.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${d.size} bytes) — อาจเป็น thumbnail`);const s=await new Promise((l,p)=>{const m=new FileReader;m.onloadend=()=>l(m.result),m.onerror=()=>p(new Error("FileReader error")),m.readAsDataURL(d)});n(`[TikTok] Data URL พร้อม: ${(s.length/1024/1024).toFixed(1)} MB`),await new Promise(l=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:s},p=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),l()})})}catch(i){n(`[TikTok] Content script fetch error: ${i.message}`),await De(o)}return o}catch(e){return n(`[TikTok] captureVideoUrl error: ${e.message}`),null}}async function De(e){if(e.startsWith("https://"))try{await new Promise(t=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched via background: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),t()})})}catch{}}function ie(e){if(e){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:e,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const K=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),ae=/Win/i.test(navigator.userAgent),Oe=K?"🍎 Mac":ae?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${Oe}`),window.__VIDEO_COMPLETE_SENT__=!1;class re extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Ft=null,$t=null,Ne=!1;const _t=new Map;let Fe=0;function cn(){if(Ft)return Ft;try{const e=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Ft=new Worker(URL.createObjectURL(e)),Ft.onmessage=t=>{const o=_t.get(t.data);o&&(_t.delete(t.data),o())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Ft}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function dn(){if($t)return $t;if(Ne)return null;try{return $t=chrome.runtime.connect({name:"timer"}),$t.onMessage.addListener(e=>{const t=_t.get(e.id);t&&(_t.delete(e.id),t())}),$t.onDisconnect.addListener(()=>{$t=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),$t}catch{return Ne=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const u=e=>new Promise((t,o)=>{if(window.__NETFLOW_STOP__)return o(new re);let r=!1;const i=()=>{if(!r){if(r=!0,window.__NETFLOW_STOP__)return o(new re);t()}};setTimeout(i,e);const d=cn();if(d){const l=++Fe;_t.set(l,i),d.postMessage({id:l,ms:e});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e+2e3},()=>{chrome.runtime.lastError||i()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e},()=>{chrome.runtime.lastError?setTimeout(i,e):i()});return}catch{}const a=dn();if(a){const l=++Fe;_t.set(l,i),a.postMessage({cmd:"delay",id:l,ms:e});return}const s=setTimeout(i,e);u._lastId=s});function Et(){return!!window.__NETFLOW_STOP__}const Z=()=>document.hidden;let Le=0;async function kt(){if(!document.hidden)return!1;const e=Date.now();if(e-Le<15e3)return!1;Le=e;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await u(1500),!0}catch{return!1}}async function wt(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(t=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>t()));const e=Date.now();for(;document.hidden&&Date.now()-e<5e3;)await u(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await u(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function ze(){var o;const e=["audio generation failed","couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","might violate","violate our policies","อาจละเมิด","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const r of t){if(r.closest("#netflow-engine-overlay"))continue;const i=(r.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const d of e)if(i.includes(d))return((o=r.textContent)==null?void 0:o.trim())||d}}return null}function pn(e){let t=e;const o=[/STRICT FACE & HEAD LOCK:[^.]*\./gi,/BODY LOCK:[^.]*\./gi,/HAIR LOCK:[^.]*\./gi,/FACE LOCK[^.]*\./gi,/PRODUCT IDENTITY LOCK:[^.]*\./gi,/LABEL LOCK:[^.]*\./gi,/PRODUCT EVERY FRAME:[^.]*\./gi,/TRANSITION STABILITY:[^.]*\./gi,/ANTI[_-]DUPLICATION:[^.]*\./gi,/ANTI[_-]TEXT[^.]*\./gi,/ANTI[_-]MORPH[^.]*\./gi,/ANTI[_-]DISTORTION[^.]*\./gi,/ANTI[_-]ADDITION[^.]*\./gi,/ANTI[_-]FLOATING[^.]*\./gi,/PROPS vs PRODUCT:[^.]*\./gi,/BRAND IDENTITY FREEZE[^.]*\./gi,/BRAND MORPHING[^.]*\./gi,/PRODUCT SIZE \(CRITICAL\):[^.]*\./gi,/PRODUCT SIZE REALISM:[^.]*\./gi,/VOICE DISCIPLINE:[^.]*\./gi,/ZERO INVENTION:[^.]*\./gi,/REALISM:[^.]*\./gi,/SCREEN CONTENT[^.]*\./gi,/SINGLE UTENSIL RULE[^.]*\./gi,/PRODUCT LOCK[^.]*\./gi,/FACE & HEAD LOCK[^.]*\./gi,/CLOTHING FIDELITY[^.]*\./gi,/FRONT[_-]FACING[^.]*\./gi];for(const a of o)t=t.replace(a,"");const r=["DO NOT","NEVER","FORBIDDEN","MUST NOT","ABSOLUTELY NO","IMMUTABLE","LOCKED","HIGHEST PRIORITY","#1 FORBIDDEN","Do NOT let","Do NOT add","Do NOT generate","Do NOT simplify","Do NOT invent","ZERO on-screen","NO split screen","NO collage","NO side-by-side","NO divided frames","never morph","never simplify","never change shape","never disappear","never be hidden","never exit","BRAND MORPHING IS","objects MUST NOT magically"];return t=t.split(/(?<=[.!])\s+/).filter(a=>!r.some(s=>a.includes(s))).join(" "),t=t.replace(/\s{2,}/g," ").trim(),t.length>1200&&(t=t.replace(/Render with extreme surface detail[^.]*\./gi,""),t=t.replace(/High-fidelity visual detail[^.]*\./gi,""),t=t.replace(/Product lit with soft rim light[^.]*\./gi,""),t=t.replace(/visible material texture[^.]*\./gi,""),t=t.replace(/Fluid motion, cinematic motion blur[^.]*\./gi,""),t=t.replace(/AI-observed appearance:[^.]*\./gi,""),t=t.replace(/Reference clothing:[^.]*\./gi,""),t=t.replace(/\s{2,}/g," ").trim()),n(`🛡️ Safe retry prompt: ${e.length} → ${t.length} chars (${Math.round((1-t.length/e.length)*100)}% reduction)`),t}async function X(e){if(Z()){e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),e.click();return}const t=e.getBoundingClientRect(),o=t.left+t.width/2,r=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:o,clientY:r,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",i)),await u(80),e.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",i)),e.dispatchEvent(new MouseEvent("click",i)),await u(50),e.click()}function Lt(e){const t=e.getBoundingClientRect(),o=t.left+t.width/2,r=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:o,clientY:r};e.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",i)),e.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",i)),e.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",i))}function fn(e){const t=[],o=document.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols'], [data-icon]");for(const r of o){if((r.textContent||"").trim()!==e)continue;let d=r,a=null,s=1/0;for(let l=0;l<20&&d&&(d=d.parentElement,!(!d||d===document.body));l++){if(Z()){l>=3&&d.children.length>0&&!a&&(a=d);continue}const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const m=p.width*p.height;m<s&&(a=d,s=m)}}a&&!t.includes(a)&&t.push(a)}return t.sort((r,i)=>{const d=r.getBoundingClientRect(),a=i.getBoundingClientRect();return d.left-a.left}),t}function se(e=!1){const t=[],o=document.querySelectorAll("video");for(const a of o){let s=a.parentElement;for(let l=0;l<10&&s;l++){if(Z()){if(l>=3&&s.children.length>0){t.push({el:s,left:0});break}s=s.parentElement;continue}const p=s.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){t.push({el:s,left:p.left});break}s=s.parentElement}}const r=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const a of r){const s=(a.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let l=a.parentElement;for(let p=0;p<10&&l;p++){if(Z()){if(p>=3&&l.children.length>0){t.push({el:l,left:0});break}l=l.parentElement;continue}const m=l.getBoundingClientRect();if(m.width>120&&m.height>80&&m.width<window.innerWidth*.7&&m.top>=-50&&m.left<window.innerWidth*.75){t.push({el:l,left:m.left});break}l=l.parentElement}}}const i=document.querySelectorAll("img");for(const a of i){const s=(a.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let l=a.parentElement;for(let p=0;p<10&&l;p++){if(Z()){if(p>=3&&l.children.length>0){t.push({el:l,left:0});break}l=l.parentElement;continue}const m=l.getBoundingClientRect();if(m.width>120&&m.height>80&&m.width<window.innerWidth*.7&&m.top>=-50&&m.left<window.innerWidth*.75){t.push({el:l,left:m.left});break}l=l.parentElement}}}const d=Array.from(new Set(t.map(a=>a.el))).map(a=>t.find(s=>s.el===a));if(d.sort((a,s)=>a.left-s.left),d.length>0){const a=d[0].el,s=a.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),a}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function un(){const e=fn("image");if(e.length>0){const o=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${o.left.toFixed(0)},${o.top.toFixed(0)}) ขนาด ${o.width.toFixed(0)}x${o.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const o of t){let r=o.parentElement;for(let i=0;i<10&&r;i++){if(Z()){if(i>=3&&r.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),r;r=r.parentElement;continue}const d=r.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),r;r=r.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function gn(e,t){var s;const[o,r]=e.split(","),i=((s=o.match(/:(.*?);/))==null?void 0:s[1])||"image/png",d=atob(r),a=new Uint8Array(d.length);for(let l=0;l<d.length;l++)a[l]=d.charCodeAt(l);return new File([a],t,{type:i})}async function mn(e,t=1024,o=.8){try{if(e.length<5e5)return n(`🗜️ รูปเล็กพอ (${(e.length/1024).toFixed(0)} KB base64) — ไม่บีบอัด`),e;n(`🗜️ รูปใหญ่ (${(e.length/1024).toFixed(0)} KB base64) — กำลังบีบอัด...`);const r=new Image;await new Promise((m,x)=>{r.onload=()=>m(),r.onerror=()=>x(new Error("Image load failed")),r.src=e});let{width:d,height:a}=r;if(d>t||a>t){const m=t/Math.max(d,a);d=Math.round(d*m),a=Math.round(a*m)}const s=document.createElement("canvas");s.width=d,s.height=a;const l=s.getContext("2d");if(!l)return e;l.drawImage(r,0,0,d,a);const p=s.toDataURL("image/jpeg",o);return n(`🗜️ บีบอัดแล้ว: ${(e.length/1024).toFixed(0)} KB → ${(p.length/1024).toFixed(0)} KB (${d}x${a})`),s.width=0,s.height=0,p}catch(r){return O(`🗜️ บีบอัดล้มเหลว: ${r.message} — ใช้รูปต้นฉบับ`),e}}function ht(e){var i;const t=[],o=new WeakSet,r=["i.google-symbols","i[class*='google-symbols']",".material-symbols-outlined",".material-icons",".material-symbols-rounded",".material-symbols-sharp","i[class*='material']","span[class*='material']","i[class*='icon']","span[class*='icon']","[data-icon]","[class*='gm-icon']","[class*='gmat-icon']","i"];for(const d of r){for(const a of document.querySelectorAll(d))if(((i=a.textContent)==null?void 0:i.trim())===e){const s=a.closest("button");s&&!o.has(s)&&(o.add(s),t.push(s))}if(t.length>0)break}if(t.length===0)for(const d of document.querySelectorAll("button")){const a=(d.getAttribute("aria-label")||"").toLowerCase();(a===e.toLowerCase()||a.includes(e.toLowerCase()))&&(o.has(d)||(o.add(d),t.push(d)))}return t}async function hn(e=5e3){const t=Date.now();for(;Date.now()-t<e;){const o=document.querySelectorAll('input[type="file"]');if(o.length>0)return o[o.length-1];await u(300)}return null}function le(){const e=["add","add_2","add_circle","add_circle_outline","attach_file","attach_file_add","attachment","note_add"];let t=[];for(const a of e)if(t=ht(a),t.length>0)break;if(t.length>0){let a=null,s=0;for(const l of t){const p=l.getBoundingClientRect();p.y>s&&(s=p.y,a=l)}if(a)return n(`พบปุ่ม "+" ของ Prompt Bar (icon) ที่ y=${s.toFixed(0)}`),a}n("ไม่พบปุ่มเพิ่มจากไอคอน — ลอง fallback ทั้งหมด");const o=["add","attach","upload","create","insert","plus","เพิ่ม","แนบ","อัปโหลด","สร้าง"];for(const a of document.querySelectorAll("button")){const s=(a.getAttribute("aria-label")||"").toLowerCase(),l=(a.getAttribute("title")||"").toLowerCase();if(o.some(p=>s.includes(p)||l.includes(p))){if(Z())return n('พบปุ่ม "+" (aria/title) hidden mode'),a;const p=a.getBoundingClientRect();if(p.bottom>window.innerHeight*.6&&p.width<80&&p.height<80)return n(`พบปุ่ม "+" (aria="${s}" title="${l}") ที่ y=${p.y.toFixed(0)}`),a}}const r=document.querySelectorAll("button");for(const a of r){const s=(a.textContent||"").trim();if(s!=="+"&&s!=="add"&&s!=="Add")continue;if(Z())return a;const l=a.getBoundingClientRect();if(l.bottom>window.innerHeight*.6&&l.width<80&&l.height<80)return n(`พบปุ่ม "+" (text="${s}") ที่ y=${l.y.toFixed(0)}`),a}const i=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');if(i){const a=i.getBoundingClientRect();let s=null,l=1/0;for(const p of r){const m=p.getBoundingClientRect();if(m.width<10||m.height<10||m.width>100||m.height>100||Math.abs(m.top-a.top)>80)continue;const x=Math.abs(m.left-a.left)+Math.abs(m.top-a.top);x<l&&(l=x,s=p)}if(s)return n(`พบปุ่ม "+" (ใกล้ prompt bar, dist=${l.toFixed(0)})`),s}for(const a of r){const s=a.querySelector("svg");if(!s)continue;const l=s.querySelectorAll("path, line, polygon"),p=Array.from(l).map(m=>m.getAttribute("d")||"").join(" ");if(p.includes("M12")||p.includes("M11")||p.includes("M10")){if(Z())return a;const m=a.getBoundingClientRect();if(m.bottom>window.innerHeight*.6&&m.width<80&&m.height<80)return n(`พบปุ่ม "+" (SVG) ที่ y=${m.y.toFixed(0)}`),a}}const d=[];for(const a of r){const s=a.getBoundingClientRect();if(s.bottom>window.innerHeight*.6&&s.width>0){const l=(a.textContent||"").trim().substring(0,30),p=a.getAttribute("aria-label")||"",m=(a.className||"").substring(0,40),x=a.querySelector("i, span[class*='icon'], svg")?"has-icon":"no-icon";d.push(`"${l}" aria="${p}" cls="${m}" ${x} y=${s.y.toFixed(0)}`)}}return O(`ไม่พบปุ่ม "+" — ปุ่มที่พบบริเวณล่าง (${d.length}): ${d.slice(0,5).join(" | ")}`),null}function ce(){for(const r of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=ht(r);let d=null,a=0;for(const s of i){const l=s.getBoundingClientRect();l.y>a&&(a=l.y,d=s)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${r}" ที่ y=${a.toFixed(0)}`),d}const e=document.querySelectorAll("button");let t=null,o=0;for(const r of e){if(Z())break;const i=r.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const d=Math.abs(i.width-i.height)<10&&i.width<60,a=i.y+i.x+(d?1e3:0);a>o&&(o=a,t=r)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const r of e){const i=(r.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return r}return null}function de(){const e=document.querySelectorAll("textarea");for(const r of e)if(Z()||r.getBoundingClientRect().bottom>window.innerHeight*.5)return r;const t=document.querySelectorAll('[contenteditable="true"]');for(const r of t)if(Z()||r.getBoundingClientRect().bottom>window.innerHeight*.5)return r;const o=document.querySelectorAll("input[type='text'], input:not([type])");for(const r of o){const i=r.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return r}return e.length>0?e[e.length-1]:null}async function zt(e,t){var o,r,i,d;e.focus(),await u(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const a=new DataTransfer;a.setData("text/plain",t),a.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:a});e.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:a});e.dispatchEvent(l),await u(800);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(a){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${a.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await u(100);const a=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(a);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(s),await u(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(a){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${a.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await u(200);const a=new DataTransfer;a.setData("text/plain",t),a.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:a});e.dispatchEvent(s),await u(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(a){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${a.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((o=navigator.clipboard)!=null&&o.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=t,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await u(200),document.execCommand("paste"),await u(500);const a=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(a.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${a.length} ตัวอักษร)`);return}}catch(a){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${a.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const a=Object.keys(e).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(a){let s=e[a];for(let l=0;l<30&&s;l++){const p=s.memoizedProps,m=s.memoizedState;if((r=p==null?void 0:p.editor)!=null&&r.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const x=p.editor;x.selection,x.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(i=m==null?void 0:m.memoizedState)==null?void 0:i.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),m.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(a){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${a.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Vt(){let e=0;const t=document.querySelectorAll("img");for(const r of t){if(r.closest("#netflow-engine-overlay")||!r.src)continue;if(Z()){e++;continue}const i=r.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&r.offsetParent!==null&&e++}const o=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const r of o){if(r.closest("#netflow-engine-overlay"))continue;if(Z()){e++;continue}const i=r.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&r.offsetParent!==null&&e++}return e}async function Ve(e,t){n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const o=await mn(e),r=gn(o,t);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const i=Vt();n(`รูปย่อปัจจุบันใน Prompt Bar: ${i} รูป`);const d=K?1.8:1,a=HTMLInputElement.prototype.click,s=HTMLInputElement.prototype.showPicker,l=()=>{HTMLInputElement.prototype.click=function(){if(this.type==="file"){n("🚫 บล็อก file dialog จาก click()");return}return a.call(this)},typeof s=="function"&&(HTMLInputElement.prototype.showPicker=function(){if(this.type==="file"){n("🚫 บล็อก file dialog จาก showPicker()");return}return s.call(this)})},p=()=>{HTMLInputElement.prototype.click=a,typeof s=="function"&&(HTMLInputElement.prototype.showPicker=s)};l();try{n("── วิธี A: ฉีดไฟล์ลง file input โดยตรง (ไม่คลิก UI) ──");let m=Ge();if(m){n(`พบ file input: accept="${m.accept}" multiple=${m.multiple}`),He(m,r,t),await u(3e3);const S=Vt();return S>i?n(`✅ วิธี A สำเร็จ — รูปย่อเพิ่ม ${i} → ${S}`):n("✅ วิธี A — ฉีดไฟล์แล้ว (ถือว่าสำเร็จ ไม่ลองซ้ำ)"),!0}n("ไม่พบ file input[accept=image/*] — ลองวิธี B"),n("── วิธี B: คลิก '+' → เปิด dialog → ฉีดไฟล์ ──"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300);let x=le();if(x||(await u(2e3*d),x=le()),!x){const S=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');S&&(S.click(),await u(2e3*d)),x=le()}if(x){if(await X(x),n("คลิกปุ่ม '+' (Create) ✅"),await u(1500*d),m=Ge(),m||(m=await hn(K?5e3:3e3)),m)return He(m,r,t),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(2e3),n("✅ วิธี B — ฉีดไฟล์แล้ว"),!0;document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500)}else O("ไม่พบปุ่ม '+' บน Prompt Bar");return n("── วิธี C: drag-drop ──"),await bn(r,i)}finally{setTimeout(()=>p(),1e4)}}function Ge(){const e=document.querySelectorAll('input[type="file"][accept*="image"]');if(e.length>0)return e[e.length-1];const t=document.querySelectorAll('input[type="file"]');return t.length>0?t[t.length-1]:null}function He(e,t,o){var d,a;const r=new DataTransfer;r.items.add(t),e.files=r.files,n(`ฉีดไฟล์ ${o} เข้า file input (${((d=e.files)==null?void 0:d.length)??0} ไฟล์)`);const i=e._valueTracker;i&&(i.setValue(""),n("รีเซ็ต React _valueTracker")),e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));try{const s=(a=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"files"))==null?void 0:a.set;s&&(s.call(e,r.files),e.dispatchEvent(new Event("change",{bubbles:!0})))}catch{}n("ส่ง change + input event ✅")}async function bn(e,t){n("── Fallback: drag-and-drop ลงบน workspace ──");const o=new DataTransfer;o.items.add(e);let r=null;const i=document.querySelectorAll('[class*="workspace"], [class*="drop"], [class*="media"], main, [role="main"]');for(const m of i){const x=m.getBoundingClientRect();if(x.width>200&&x.height>200){r=m;break}}r||(r=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)||document.body);const d=r.getBoundingClientRect(),a=d.left+d.width/2,s=d.top+d.height/2,l={bubbles:!0,cancelable:!0,clientX:a,clientY:s,dataTransfer:o};r.dispatchEvent(new DragEvent("dragenter",l)),await u(100),r.dispatchEvent(new DragEvent("dragover",l)),await u(100),r.dispatchEvent(new DragEvent("drop",l)),n(`ส่ง drag-drop ลง <${r.tagName}>`);const p=Date.now();for(;Date.now()-p<8e3;){if(Vt()>t)return n("✅ drag-drop สำเร็จ — พบรูปย่อใหม่"),!0;await u(1e3)}return O("❌ drag-drop ล้มเหลว — ไม่พบรูปย่อใหม่"),!1}async function wn(e,t){var $,D;n("=== ขั้น 0: ตั้งค่า Flow ===");let o=null;for(let M=0;M<10;M++){const T=document.querySelectorAll("button, div, span, [role='button']");for(const f of T){const h=(f.textContent||"").trim();if(!(h.length>80)&&!(h.includes("ดาวน์โหลด")||h.includes("Download")||h.includes("download"))&&!(h.length>30)&&(h.includes("Nano Banana")||h.includes("Imagen")||h.includes("วิดีโอ")||h.includes("รูปภาพ")||h.includes("Image")||h.includes("Video"))){const _=f.getBoundingClientRect();_.bottom>window.innerHeight*.7&&_.width>30&&_.height>10&&(!o||(f.textContent||"").length<(o.textContent||"").length)&&(o=f)}}if(o){n(`พบปุ่มตั้งค่าจากข้อความ: "${(o.textContent||"").substring(0,40).trim()}"`);break}const w=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons, .material-symbols-rounded, span[class*='material'], span[class*='icon'], i");for(const f of w){const h=(($=f.textContent)==null?void 0:$.trim())||"";if(h.includes("crop")||h==="aspect_ratio"||h==="photo_size_select_large"){const _=f.closest("button, div[role='button'], [role='button']")||f.parentElement;if(_){const g=_.getBoundingClientRect();if(g.bottom>window.innerHeight*.7&&g.width>0){o=_,n(`พบปุ่มตั้งค่าจากไอคอน: ${h}`);break}}}}if(o)break;for(const f of T){const h=(f.textContent||"").trim();if(!(h.length>40)&&/x[1-4]/.test(h)&&(h.includes("วิดีโอ")||h.includes("รูปภาพ")||h.includes("Video")||h.includes("Image"))){const _=f.getBoundingClientRect();if(_.bottom>window.innerHeight*.7&&_.width>30){o=f,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${h.substring(0,40)}"`);break}}}if(o)break;n(`⏳ รอปุ่มตั้งค่า... (${M+1}/10)`),await u(1e3)}if(!o)return O("ไม่พบปุ่มตั้งค่า (หมด 10 รอบ)"),!1;const r=["Video","Image","วิดีโอ","รูปภาพ","Nano Banana","Imagen"],i=M=>{const T=(M.textContent||"").trim();return T.length>40||T.includes("ดาวน์โหลด")||T.includes("Download")||T.includes("download")?!1:r.some(w=>T.includes(w))},d=[];d.push(o);const a=o.closest("button");a&&a!==o&&i(a)&&(d.unshift(a),n(`ปุ่มตั้งค่า: parent <button> "${(a.textContent||"").trim().substring(0,30)}"`));const s=o.closest('[role="button"]');s&&s!==o&&s!==a&&i(s)&&(d.unshift(s),n(`ปุ่มตั้งค่า: parent [role=button] "${(s.textContent||"").trim().substring(0,30)}"`));let l=o;for(let M=0;M<3&&l;M++)l=l.parentElement,l&&i(l)&&!d.includes(l)&&d.push(l);const p=()=>document.querySelectorAll('[data-radix-portal], [data-radix-popper-content-wrapper], [role="dialog"], [role="menu"], [role="listbox"]').length;let m=!1,x=d[0];for(const M of d){const T=p();n(`ลองคลิกตั้งค่า: <${M.tagName}> "${(M.textContent||"").trim().substring(0,30)}"`),await X(M),await u(2500);const w=p(),f=!!document.querySelector('[role="tab"]');if(w>T||f){m=!0,x=M,n(`✅ Popover เปิดแล้ว (portals: ${T}→${w}, tabs: ${f})`);break}n(`❌ ไม่มี popover เปิด (portals: ${T}→${w}) — ลองตัวถัดไป`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500)}m||(n("⚠️ Popover ไม่เปิดจากการคลิก — ลองคลิกปุ่มตั้งค่าอีกครั้งพร้อมรอนานขึ้น (Mac)"),await X(x),await u(5e3));let S=!1,L=null;for(let M=0;M<3&&!L;M++){M>0&&(n(`⏳ ลองหาแท็บ Image อีกครั้ง (${M+1}/3)...`),await X(x),await u(2e3));const T=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"], [class*="tab_slider_trigger"][role="tab"]');for(const w of T){const f=w.getAttribute("aria-controls")||"",h=w.id||"";if(f.toUpperCase().includes("IMAGE")||h.toUpperCase().includes("IMAGE")){L=w,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${f})`);break}}if(!L)for(const w of document.querySelectorAll('[role="tab"]')){const f=w.id||"";if(f.toUpperCase().includes("IMAGE")){L=w,n(`พบแท็บ Image ผ่าน id: ${f}`);break}}if(!L)for(const w of document.querySelectorAll('[role="tab"]')){const f=w.getAttribute("aria-label")||((D=w.textContent)==null?void 0:D.trim())||"";if(f.toLowerCase().includes("image")||f.includes("รูปภาพ")){L=w,n(`พบแท็บ Image ผ่าน accessible name: "${f.substring(0,30)}"`);break}}if(!L)for(const w of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const f=(w.textContent||"").trim();if(!(f.length>30)&&(f==="Image"||f.endsWith("Image")||f==="รูปภาพ"||f==="ภาพ"||f.includes("รูปภาพ"))&&!f.includes("Video")&&!f.includes("วิดีโอ")){const h=w.getBoundingClientRect();if(h.width>0&&h.height>0){L=w,n(`พบแท็บ Image ผ่านข้อความ: "${f}"`);break}}}if(!L)for(const w of document.querySelectorAll('[data-radix-portal], [data-radix-popper-content-wrapper], [role="dialog"], [role="menu"]')){for(const f of w.querySelectorAll('button, [role="tab"]')){const h=(f.textContent||"").trim().toLowerCase();if((h==="image"||h.includes("image"))&&!h.includes("video")){L=f,n(`พบแท็บ Image ใน Radix portal: "${h}"`);break}}if(L)break}L||await u(1e3)}if(L){const M=L.getAttribute("data-state")||"",T=L.getAttribute("aria-selected")||"";M==="active"||T==="true"?(S=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก")):(await X(L),S=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await u(400))}if(!S&&!L){n("⚠️ ลองสลับโหมดด้วยวิธีตรง..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500);const M=document.querySelectorAll("button, div, span, [role='button'], [role='tab']"),T=[];for(const w of M){const f=(w.textContent||"").trim();if(f.length>40||!f.includes("Video")&&!f.includes("วิดีโอ"))continue;const h=w.getBoundingClientRect();!Z()&&(h.bottom<window.innerHeight*.7||h.width<10||h.height<8)||T.push(w)}T.sort((w,f)=>(w.textContent||"").length-(f.textContent||"").length);for(const w of T){n(`Fallback 6: คลิก "${(w.textContent||"").trim().substring(0,30)}" <${w.tagName}>`);const f=[w],h=w.closest("button, [role='button']");h&&h!==w&&f.push(h),w.parentElement&&f.push(w.parentElement);for(const _ of f){await X(_),await u(2500);const g=document.querySelectorAll('[role="option"], [role="menuitem"], [role="tab"], [role="radio"], button, div, span');for(const y of g){const b=(y.textContent||"").trim();if(!(b.length>20)&&(b==="Image"||b==="รูปภาพ"||b==="ภาพ"||b.endsWith("Image"))&&!b.includes("Video")&&!b.includes("วิดีโอ")&&(y.getBoundingClientRect().width>0||Z())){await X(y),S=!0,n(`✅ สลับเป็น Image ผ่าน Fallback 6: "${b}"`),await u(500);break}}if(S)break;document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300)}if(S)break}}S||O("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว หรือต้องสลับด้วยตนเอง");const F=e==="horizontal"?"แนวนอน":"แนวตั้ง",P=e==="horizontal"?"landscape":"portrait";for(const M of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const T=(M.textContent||"").trim();if(!(T.length>30)&&(T===F||T.includes(F)||T.toLowerCase()===P||T.toLowerCase().includes(P))){const w=M.getBoundingClientRect(),f={bubbles:!0,cancelable:!0,clientX:w.left+w.width/2,clientY:w.top+w.height/2,button:0};M.dispatchEvent(new PointerEvent("pointerdown",{...f,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",f)),await u(80),M.dispatchEvent(new PointerEvent("pointerup",{...f,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",f)),M.dispatchEvent(new MouseEvent("click",f)),n(`เลือกทิศทาง: ${F}`),await u(400);break}}const c=`x${t}`;for(const M of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const T=(M.textContent||"").trim();if(!(T.length>10)&&(T===c||T===`${t}`)){const w=M.getBoundingClientRect(),f={bubbles:!0,cancelable:!0,clientX:w.left+w.width/2,clientY:w.top+w.height/2,button:0};M.dispatchEvent(new PointerEvent("pointerdown",{...f,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",f)),await u(80),M.dispatchEvent(new PointerEvent("pointerup",{...f,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",f)),M.dispatchEvent(new MouseEvent("click",f)),n(`เลือกจำนวน: ${c}`),await u(400);break}}return await u(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),await X(x),n("ปิดหน้าตั้งค่าแล้ว"),await u(600),!0}async function xn(e){const t=e==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",o=e==="quality"?"Quality":"Fast",r=e==="quality"?"Fast":"Quality",i=e==="quality"?"คุณภาพ":"เร็ว",d=e==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${t} (${i}) ===`);let a=null;const s=Date.now()+1e4;for(;!a&&Date.now()<s;){const P=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const c of P){const $=(c.textContent||"").trim();if(!($.length>80)&&($.includes("Veo")||$.includes("veo"))&&(c.hasAttribute("aria-haspopup")||c.hasAttribute("aria-expanded")||c.getAttribute("role")==="combobox"||$.includes("arrow_drop_down")||c.querySelector("svg"))){a=c,n(`พบปุ่ม Veo dropdown (Strategy A): "${$.substring(0,50).trim()}"`);break}}if(!a)for(const c of P){const $=(c.textContent||"").trim();if(!($.length>80)&&($.includes("Veo")||$.includes("veo"))){const D=c.getBoundingClientRect();if(D.width>0&&D.height>0){a=c,n(`พบปุ่ม Veo dropdown (Strategy B): "${$.substring(0,50).trim()}"`);break}}}if(!a)for(const c of P){const $=(c.textContent||"").trim();if(!($.length>50)&&($.includes("Fast")||$.includes("Quality")||$.includes("เร็ว")||$.includes("คุณภาพ"))&&(c.hasAttribute("aria-haspopup")||c.hasAttribute("aria-expanded")||c.querySelector("svg"))){a=c,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${$.substring(0,50).trim()}"`);break}}if(!a){const c=document.querySelectorAll("div, span, button, [role='button']");for(const $ of c){const D=($.textContent||"").trim();if(D==="Veo 3.1 - Fast"||D==="Veo 3.1 - Quality"||D==="Fast"||D==="Quality"||D==="Veo 3.1 - เร็ว"||D==="Veo 3.1 - คุณภาพสูง"||D==="Veo 3.1 - คุณภาพ"||D==="Veo 2 - Fast"||D==="Veo 2 - Quality"){const M=$.getBoundingClientRect();if(M.width>0&&M.height>0){a=$,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${D}"`);break}}}}if(!a){const c=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const $ of c){const D=($.textContent||"").trim();if(!(D.length>60)&&(D.includes("3.1")||D.includes("model")||D.includes("โมเดล"))){const M=$.getBoundingClientRect();if(M.bottom>window.innerHeight*.4&&M.width>0&&M.height>0){a=$,n(`พบปุ่ม model selector (Strategy E): "${D.substring(0,50).trim()}"`);break}}}}a||await u(1e3)}if(!a)return O("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const l=(a.textContent||"").trim();if(l.includes(t)||l.includes(o)&&!l.includes(r)||l.includes(i)&&!l.includes(d))return n(`✅ Veo quality เป็น "${l}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=a.getBoundingClientRect(),m=p.left+p.width/2,x=p.top+p.height/2,S={bubbles:!0,cancelable:!0,clientX:m,clientY:x,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",S)),await u(80),a.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",S)),a.dispatchEvent(new MouseEvent("click",S)),n("คลิกเปิด Veo quality dropdown"),await u(1e3);let L=!1;const F=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const P of F){const c=(P.textContent||"").trim();if((c===t||c===o||c.includes(t)||c.includes(i))&&!c.includes("arrow_drop_down")){const D=P.getBoundingClientRect();if(D.width>0&&D.height>0){const M=D.left+D.width/2,T=D.top+D.height/2,w={bubbles:!0,cancelable:!0,clientX:M,clientY:T,button:0};P.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mousedown",w)),await u(80),P.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mouseup",w)),P.dispatchEvent(new MouseEvent("click",w)),n(`✅ เลือก "${c}" สำเร็จ`),L=!0;break}}}return L?(await u(600),!0):(O(`ไม่พบตัวเลือก "${t}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),document.body.click(),!1)}async function yn(e){var D,M,T,w;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,o=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),r=o?o[1]:"unknown",i=K?"macOS":ae?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",d=K?((M=(D=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:D[1])==null?void 0:M.replace(/_/g,"."))||"":ae&&((T=t.match(/Windows NT ([0-9.]+)/))==null?void 0:T[1])||"",a=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${d} | Chrome ${r}`),n(`🌐 ภาษา: ${a} | หน้าจอ: ${s} | แพลตฟอร์ม: ${Oe}`),n("══════════════════════════════════════════");try{qt(e.theme)}catch{}try{Xt(e.sceneCount||1)}catch(f){console.warn("Overlay show error:",f)}const l=[],p=[];if(e.needsNewProject){try{A("open-flow","done"),A("new-project","active"),n("=== สร้างโปรเจคใหม่ ===");let f=null;for(let h=0;h<15;h++){const _=document.querySelectorAll("button, [role='button']");for(const g of _){const y=(g.textContent||"").trim().toLowerCase();if(y.includes("new project")||y.includes("สร้างโปรเจค")||y.includes("โปรเจกต์ใหม่")){f=g;break}}if(!f){const g=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], i[class*='material'], span[class*='material'], span[class*='icon'], span[class*='google-symbols'], i");for(const y of g)if((y.textContent||"").trim()==="add_2"){const b=y.closest("button");if(b){f=b;break}}if(!f){const y=ht("add_2");y.length>0&&(f=y[0])}}if(f)break;n(`⏳ รอปุ่ม New Project... (${h+1}/15)`),await u(1e3)}if(f){n(`✅ พบปุ่ม New Project: "${(f.textContent||"").trim().substring(0,30)}"`),await X(f),await u(500),await X(f),await u(2e3);let h=!1;for(let _=0;_<20;_++){const g=document.body.innerText||"";if(g.includes("Start creating")||g.includes("เริ่มสร้าง")||g.includes("What do you want to create")||g.includes("drop media")||document.querySelector("textarea, input[placeholder]")){h=!0;break}await u(500)}n(h?"✅ Workspace พร้อมแล้ว":"⚠️ Workspace อาจยังไม่โหลดเสร็จ — ดำเนินการต่อ"),A("new-project","done"),l.push("✅ New Project")}else O("ไม่พบปุ่ม New Project — อาจอยู่ใน workspace แล้ว ดำเนินการต่อ"),A("new-project","skipped"),l.push("⚠️ New Project (skipped)")}catch(f){O(`New Project error: ${f.message}`),A("new-project","error"),l.push("⚠️ New Project")}await u(3e3)}else{try{A("open-flow","skipped")}catch{}try{A("new-project","skipped")}catch{}await u(3e3)}try{A("settings","active");const f=e.orientation||"vertical",h=e.outputCount||1,_=await wn(f,h);l.push(_?"✅ Settings":"⚠️ Settings"),A("settings",_?"done":"error")}catch(f){O(`ตั้งค่าผิดพลาด: ${f.message}`),l.push("⚠️ Settings"),A("settings","error")}try{const f=e.veoQuality||"fast";await xn(f)?(l.push(`✅ Veo ${f}`),n(`✅ Veo quality: ${f}`)):(l.push("⚠️ Veo quality"),O("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(f){O(`Veo quality error: ${f.message}`),l.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),document.body.click(),await u(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const m=()=>{const f=document.querySelectorAll("span, div, p, label");for(const h of f){const _=(h.textContent||"").trim();if(/^\d{1,3}%$/.test(_)){if(_==="100%")return null;const g=h.getBoundingClientRect();if(g.width>0&&g.height>0&&g.top>0&&g.top<window.innerHeight)return _}}return null},x=async f=>{n(`รอการอัพโหลด ${f} เสร็จ...`),await u(2e3);const h=Date.now(),_=6e4;let g="",y=Date.now();const b=15e3;for(;Date.now()-h<_;){const v=m();if(v){if(v!==g)g=v,y=Date.now(),n(`กำลังอัพโหลด: ${v} — รอ...`);else if(Date.now()-y>b){n(`✅ อัพโหลด ${f} — % ค้างที่ ${v} นาน ${b/1e3} วินาที ถือว่าเสร็จ`),await u(1e3);return}await u(1500)}else{n(`✅ อัพโหลด ${f} เสร็จ — ไม่พบตัวบอก %`),await u(1e3);return}}O(`⚠️ อัพโหลด ${f} หมดเวลาหลัง ${_/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){A("upload-char","active");try{const f=await Ve(e.characterImage,"character.png");l.push(f?"✅ ตัวละคร":"⚠️ ตัวละคร"),f||p.push("character upload failed"),A("upload-char",f?"done":"error")}catch(f){O(`อัพโหลดตัวละครผิดพลาด: ${f.message}`),l.push("❌ ตัวละคร"),p.push("character upload error"),A("upload-char","error")}await x("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500)}else It("upload-char");if(e.productImage){A("upload-prod","active");try{const f=await Ve(e.productImage,"product.png");l.push(f?"✅ สินค้า":"⚠️ สินค้า"),f||p.push("product upload failed"),A("upload-prod",f?"done":"error")}catch(f){O(`อัพโหลดสินค้าผิดพลาด: ${f.message}`),l.push("❌ สินค้า"),p.push("product upload error"),A("upload-prod","error")}await x("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(500)}else It("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800);const S=m();S&&(n(`⚠️ อัพโหลดยังแสดง ${S} — รอเพิ่มเติม...`),await x("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await u(1e3);const L=(e.characterImage?1:0)+(e.productImage?1:0);if(L>0){let f=Vt();f<L&&(n(`⏳ เห็นรูปย่อแค่ ${f}/${L} — รอ 3 วินาที...`),await u(3e3),f=Vt()),f>=L?n(`✅ ยืนยันรูปย่ออ้างอิง: ${f}/${L}`):O(`⚠️ คาดว่าจะมี ${L} รูปย่อ แต่พบ ${f} — ดำเนินการต่อ`)}if(Et()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{Ot(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),A("img-prompt","active"),await u(1e3);const F=de();F?(await zt(F,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),A("img-prompt","done")):(O("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),p.push("prompt input not found"),A("img-prompt","error")),await u(800);const P=new Set;document.querySelectorAll("img").forEach(f=>{f.src&&P.add(f.src)}),n(`บันทึกรูปเดิม: ${P.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),A("img-generate","active"),await u(500);const c=ce();if(c){const f=c.getBoundingClientRect(),h=f.left+f.width/2,_=f.top+f.height/2,g={bubbles:!0,cancelable:!0,clientX:h,clientY:_,button:0};c.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",g)),await u(80),c.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",g)),c.dispatchEvent(new MouseEvent("click",g)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await u(500),c.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",g)),await u(80),c.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",g)),c.dispatchEvent(new MouseEvent("click",g)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),A("img-generate","done")}else O("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),p.push("generate button not found"),A("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),A("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await u(15e3);const f=()=>{const b=document.querySelectorAll("div, span, p, label, strong, small");for(const v of b){if(v.closest("#netflow-engine-overlay"))continue;const B=(v.textContent||"").trim();if(B.length>10)continue;const E=B.match(/(\d{1,3})\s*%/);if(!E)continue;const k=parseInt(E[1],10);if(k<1||k>100)continue;if(Z())return k;const C=v.getBoundingClientRect();if(!(C.width===0||C.width>150)&&!(C.top<0||C.top>window.innerHeight))return k}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let h=null,_=-1,g=0;const y=Date.now();for(;!h&&Date.now()-y<18e4;){const b=document.querySelectorAll("img");for(const v of b){if(P.has(v.src)||!(v.alt||"").toLowerCase().includes("generated"))continue;if(Z()?v.naturalWidth>120&&v.naturalHeight>120:(()=>{const k=v.getBoundingClientRect();return k.width>120&&k.height>120&&k.top>0&&k.top<window.innerHeight*.85})()){const k=v.closest("div");if(k){h=k,n(`พบรูป AI จาก alt="${v.alt}": ${v.src.substring(0,80)}...${Z()?" (hidden-mode)":""}`);break}}}if(!h)for(const v of b){if(P.has(v.src))continue;const B=v.closest("div"),E=(B==null?void 0:B.textContent)||"";if(E.includes("product.png")||E.includes("character.png")||E.includes(".png")||E.includes(".jpg"))continue;if(Z()?v.naturalWidth>120&&v.naturalHeight>120:(()=>{const C=v.getBoundingClientRect();return C.width>120&&C.height>120&&C.top>0&&C.top<window.innerHeight*.85})()){const C=v.closest("div");if(C){h=C,n(`พบรูปใหม่ (สำรอง): ${v.src.substring(0,80)}...${Z()?" (hidden-mode)":""}`);break}}}if(!h){if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const v=g>0?Date.now()-g:1/0;if(_<20||v>3e4){const E=ze();if(E){O(`❌ สร้างรูปล้มเหลว: ${E}`),p.push(`image gen failed: ${E}`),A("img-wait","error");break}}const B=f();if(B!==null)B!==_&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${B}%`),_=B,A("img-wait","active",B)),g=Date.now();else if(_>30){const E=Math.floor((Date.now()-g)/1e3);E>=3&&n(`🖼️ % หายที่ ${_}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&E>=5&&_>50&&(n("🍎 Tab ซ่อน + รูปน่าจะเสร็จ → เปิด tab เต็มเพื่อตรวจหารูป"),await wt(),await u(3e3))}document.hidden&&_>0&&Date.now()-g>1e4&&await kt(),document.hidden&&_<1&&Date.now()-y>3e4&&await kt(),await u(3e3)}}if(!h)O("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),A("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),A("img-wait","done",100),await wt();const b=h.getBoundingClientRect(),v=b.left+b.width/2,B=b.top+b.height/2,E={bubbles:!0,cancelable:!0,clientX:v,clientY:B};h.dispatchEvent(new PointerEvent("pointerenter",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseenter",E)),h.dispatchEvent(new PointerEvent("pointerover",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseover",E)),h.dispatchEvent(new PointerEvent("pointermove",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousemove",E)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await u(1500);let k=null;for(const C of["more_vert","more_horiz","more"]){const H=ht(C);for(const I of H){const R=I.getBoundingClientRect();if(R.top>=b.top-20&&R.top<=b.bottom&&R.right>=b.right-150&&R.right<=b.right+20){k=I;break}}if(k)break}if(!k){const C=document.querySelectorAll("button");for(const H of C){const I=H.getBoundingClientRect();if(I.width<50&&I.height<50&&I.top>=b.top-10&&I.top<=b.top+60&&I.left>=b.right-80){const R=H.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const V of R)if((((w=V.textContent)==null?void 0:w.trim())||"").includes("more")){k=H;break}if(k)break;const z=H.getAttribute("aria-label")||"";if(z.includes("เพิ่มเติม")||z.includes("more")){k=H;break}}}}if(!k)O("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const C=k.getBoundingClientRect(),H=C.left+C.width/2,I=C.top+C.height/2,R={bubbles:!0,cancelable:!0,clientX:H,clientY:I,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",R)),await u(80),k.dispatchEvent(new PointerEvent("pointerup",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",R)),k.dispatchEvent(new MouseEvent("click",R)),n("คลิกปุ่ม 3 จุดแล้ว"),await u(1500);let z=null;const V=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const q of V){const N=(q.textContent||"").trim();if(N.includes("ทำให้เป็นภาพเคลื่อนไหว")||N.includes("Animate")||N.includes("animate")){z=q;break}}if(!z)O("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const q=z.getBoundingClientRect(),N=q.left+q.width/2,Y=q.top+q.height/2,U={bubbles:!0,cancelable:!0,clientX:N,clientY:Y,button:0};z.dispatchEvent(new PointerEvent("pointerdown",{...U,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mousedown",U)),await u(80),z.dispatchEvent(new PointerEvent("pointerup",{...U,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mouseup",U)),z.dispatchEvent(new MouseEvent("click",U)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),A("animate","done"),await u(3e3)}}}}catch(f){O(`ขั้น 4 ผิดพลาด: ${f.message}`),l.push("⚠️ Animate")}if(Et()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{Ot(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),A("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await u(3e3);let f=!1;const h=document.querySelectorAll("button, span, div");for(const b of h){const v=(b.textContent||"").trim(),B=b.getBoundingClientRect();if((v==="วิดีโอ"||v==="Video"||v.includes("วิดีโอ"))&&B.bottom>window.innerHeight*.7){f=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}f||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let _=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise(v=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>v())),_=!0;const b=Date.now();for(;document.hidden&&Date.now()-b<5e3;)await u(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await u(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await u(1e3);let g=!1;for(let b=1;b<=5&&!g;b++){if(b>1&&document.hidden){n(`🔄 Retry ${b}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(k=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>k())),_=!0;const E=Date.now();for(;document.hidden&&Date.now()-E<5e3;)await u(200);document.hidden||await u(2e3)}catch{}}const v=de();if(!v){n(`⚠️ ครั้งที่ ${b}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await u(3e3);continue}b>1&&(v.focus(),await u(500)),await zt(v,e.videoPrompt),await u(500);const B=(v.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();B.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${b} (${B.length} ตัวอักษร)`),l.push("✅ Video Prompt"),A("vid-prompt","done"),g=!0):(n(`⚠️ ครั้งที่ ${b}: Prompt ไม่ถูกวาง (ได้ ${B.length} ตัวอักษร)`),await u(1500))}if(!g)throw O("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),l.push("❌ Video Prompt"),p.push("video prompt paste failed after 5 attempts"),A("vid-prompt","error"),new Error("Video prompt paste failed");await u(1e3),A("vid-generate","active");const y=ce();if(y){const b=y.getBoundingClientRect(),v=b.left+b.width/2,B=b.top+b.height/2,E={bubbles:!0,cancelable:!0,clientX:v,clientY:B,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",E)),await u(80),y.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",E)),y.dispatchEvent(new MouseEvent("click",E)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),A("vid-generate","done"),await u(500),y.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",E)),await u(80),y.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",E)),y.dispatchEvent(new MouseEvent("click",E)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else O("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),p.push("video generate button not found"),A("vid-generate","error");if(_){await u(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(f){O(`ขั้น 5 ผิดพลาด: ${f.message}`),l.push("⚠️ Video Gen"),p.push(`video gen error: ${f.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),It("animate"),It("vid-prompt"),It("vid-generate"),It("vid-wait");if(e.videoPrompt){A("vid-wait","active");const f=e.sceneCount||1,h=e.videoScenePrompts||[e.videoPrompt];if(f>1)try{sn(f)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${f>1?`ต่อ ${f} ฉาก`:"ดาวน์โหลด"} ===`);const _=()=>{const b=document.querySelectorAll("div, span, p, label, strong, small");for(const v of b){if(v.closest("#netflow-engine-overlay"))continue;const B=(v.textContent||"").trim();if(B.length>10)continue;const E=B.match(/(\d{1,3})\s*%/);if(!E)continue;const k=parseInt(E[1],10);if(k<1||k>100)continue;if(Z())return k;const C=v.getBoundingClientRect();if(!(C.width===0||C.width>150)&&!(C.top<0||C.top>window.innerHeight))return k}return null},g=async(b=6e5)=>{n("รอการสร้างวิดีโอ..."),A("vid-wait","active"),await u(5e3);const v=()=>{const j=document.querySelectorAll("div, span, p, label, strong, small");let Q=0;for(const ot of j){if(ot.closest("#netflow-engine-overlay"))continue;const W=(ot.textContent||"").trim();if(W.includes("%")&&W.length<15){const at=ot.tagName.toLowerCase(),it=ot.className&&typeof ot.className=="string"?ot.className.split(/\s+/).slice(0,2).join(" "):"",tt=ot.getBoundingClientRect();if(n(`  🔍 "${W}" ใน <${at}.${it}> ที่ (${tt.left.toFixed(0)},${tt.top.toFixed(0)}) w=${tt.width.toFixed(0)}`),Q++,Q>=5)break}}Q===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},B=async(j,Q)=>{n(`🔄 Policy Retry ${Q}/2 — สร้าง Safe Prompt แล้วลองใหม่...`),await wt(),await u(2e3);const ot=de();if(!ot)return O("❌ Retry: ไม่พบช่อง Prompt"),!1;ot.focus(),await u(300);const W=window.getSelection();W&&W.selectAllChildren(ot),await u(200),ot.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"deleteContentBackward"})),ot.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"deleteContentBackward"})),await u(500);let at=pn(j);Q>=2&&(at=at.substring(0,600).replace(/\s\S*$/,"").trim(),n(`🛡️ 2nd retry: ultra-short prompt (${at.length} chars)`)),await zt(ot,at),await u(500);const it=(ot.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(it.length<20)return O(`❌ Retry: วาง Safe Prompt ไม่สำเร็จ (${it.length} ตัวอักษร)`),!1;n(`✅ วาง Safe Prompt สำเร็จ (${it.length} ตัวอักษร)`),await u(500);const tt=ce();if(!tt)return O("❌ Retry: ไม่พบปุ่ม Generate"),!1;const ut=tt.getBoundingClientRect(),xt=ut.left+ut.width/2,Gt=ut.top+ut.height/2,Ht={bubbles:!0,cancelable:!0,clientX:xt,clientY:Gt,button:0};return tt.dispatchEvent(new PointerEvent("pointerdown",{...Ht,pointerId:1,isPrimary:!0,pointerType:"mouse"})),tt.dispatchEvent(new MouseEvent("mousedown",Ht)),await u(80),tt.dispatchEvent(new PointerEvent("pointerup",{...Ht,pointerId:1,isPrimary:!0,pointerType:"mouse"})),tt.dispatchEvent(new MouseEvent("mouseup",Ht)),tt.dispatchEvent(new MouseEvent("click",Ht)),n(`✅ คลิก Generate สำหรับ Safe Retry ${Q}`),await u(5e3),!0},E=se();n(E?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),v();const k=Date.now();let C=-1,H=0,I=!1,R=0;const z=2;for(;Date.now()-k<b;){const j=_();if(j!==null){if(j!==C&&(n(`ความคืบหน้าวิดีโอ: ${j}%`),C=j,A("vid-wait","active",j)),H=Date.now(),j>=100){n("✅ ตรวจพบ 100%!"),I=!0;break}}else if(C>30){const Q=Math.floor((Date.now()-H)/1e3);if(Q>=5){n(`✅ % หายไปที่ ${C}% (หาย ${Q} วินาที) — วิดีโอเสร็จ!`),I=!0;break}n(`⏳ % หายที่ ${C}% — ยืนยันใน ${5-Q} วินาที...`)}else{const Q=Math.floor((Date.now()-k)/1e3);Q%15<3&&n(`⏳ รอ... (${Q} วินาที) ไม่พบ %`)}if(!I&&C>0&&se(!0)&&!E){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${C}% — วิดีโอเสร็จ!`),I=!0;break}if(Et())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(C<1){const Q=ze();if(Q){if(O(`❌ สร้างวิดีโอล้มเหลว: ${Q}`),R<z&&e.videoPrompt)if(R++,n(`🔄 Policy violation detected — attempting safe retry ${R}/${z}...`),await B(e.videoPrompt,R)){C=-1,H=0,n(`✅ Safe retry ${R} started — continuing to monitor...`);continue}else O(`❌ Safe retry ${R} failed to start`);return null}}document.hidden&&C>0&&Date.now()-H>1e4&&await kt(),document.hidden&&C<1&&Date.now()-k>3e4&&await kt(),await u(3e3)}await wt();let V=null;for(let j=1;j<=10&&(V=se(),!V);j++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${j}/10)`),j%3===0&&await wt(),await u(3e3);if(!V)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),A("vid-wait","error"),null;const q=V;I?(A("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await u(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const N=q.getBoundingClientRect();let Y=N.left+N.width/2,U=N.top+N.height/2,J=q;const lt=q.querySelector("video, img, canvas");if(lt){const j=lt.getBoundingClientRect();j.width>50&&j.height>50&&(Y=j.left+j.width/2,U=j.top+j.height/2,J=lt,n(`🎯 พบรูปย่อ <${lt.tagName.toLowerCase()}> ในการ์ดที่ (${Y.toFixed(0)},${U.toFixed(0)}) ${j.width.toFixed(0)}x${j.height.toFixed(0)}`))}else U=N.top+N.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${Y.toFixed(0)},${U.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${Y.toFixed(0)}, ${U.toFixed(0)})...`),Lt(J);for(let j=0;j<8;j++){const Q={bubbles:!0,cancelable:!0,clientX:Y+j%2,clientY:U};J.dispatchEvent(new PointerEvent("pointermove",{...Q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousemove",Q)),await u(500)}try{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"mute_video",sceneCount:f,scenePrompts:h,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${f} ฉาก, ${h.length} prompts, theme: ${e.theme})`)}catch(j){n(`⚠️ ไม่สามารถบันทึก pending action: ${j.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await y(J),n("✅ คลิกการ์ดวิดีโอเสร็จ"),q},y=async b=>{const v=b.getBoundingClientRect(),B=v.left+v.width/2,E=v.top+v.height/2,k={bubbles:!0,cancelable:!0,clientX:B,clientY:E,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",k)),await u(80),b.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",k)),b.dispatchEvent(new MouseEvent("click",k)),await u(50),b.click(),n("คลิกการ์ดวิดีโอแล้ว"),await u(2e3)};try{if(!await g())O("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),A("vid-wait","error");else{l.push("✅ Video Complete"),A("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await u(3e3);const v=await new Promise(B=>{chrome.storage.local.get(mt(),E=>{if(chrome.runtime.lastError){B(null);return}B((E==null?void 0:E[mt()])||null)})});v&&!v._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(mt()),v.action==="mute_video"?await qe(v.sceneCount||1,v.scenePrompts||[],v.theme):v.action==="wait_scene_gen_and_download"&&await Ue(v.sceneCount||2,v.currentScene||2,v.theme,v.scenePrompts||[]))}}catch(b){O(`ขั้น 6 ผิดพลาด: ${b.message}`),l.push("⚠️ Step6"),p.push(`step 6: ${b.message}`)}}const $=p.length===0;try{Ot($?5e3:8e3)}catch(f){console.warn("Overlay complete error:",f)}return{success:$,message:$?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${p.join(", ")}`,step:$?"done":"partial"}}async function qe(e,t=[],o){var M;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{o&&qt(o)}catch{}try{Xt(e)}catch(T){n(`⚠️ showOverlay error: ${T.message}`)}try{const T=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const w of T)A(w,"done");e>=2&&A("scene2-prompt","active"),n(`✅ overlay restored: ${T.length} steps done, sceneCount=${e}`)}catch(T){n(`⚠️ overlay restore error: ${T.message}`)}await u(1500);const r=(()=>{for(const T of document.querySelectorAll("button")){const w=T.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const h of w){const _=(h.textContent||"").trim();if(_==="volume_up"||_==="volume_off"||_==="volume_mute"){const g=T.getBoundingClientRect();if(g.width>0&&g.height>0)return T}}const f=(T.getAttribute("aria-label")||"").toLowerCase();if(f.includes("mute")||f.includes("ปิดเสียง")){const h=T.getBoundingClientRect();if(h.width>0&&h.height>0)return T}}return null})();r?(r.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await u(2e3);for(let I=2;I<=e;I++){const R=t[I-1];if(!R){O(`ไม่พบ prompt สำหรับฉากที่ ${I}`);continue}n(`── ฉากที่ ${I}/${e}: วาง prompt + generate ──`);let z=null;const V=Date.now();for(;!z&&Date.now()-V<1e4;){const W=document.querySelectorAll("[data-slate-editor='true']");if(W.length>0&&(z=W[W.length-1]),!z){const at=document.querySelectorAll("[role='textbox'][contenteditable='true']");at.length>0&&(z=at[at.length-1])}z||await u(1e3)}if(!z){O("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${z.tagName.toLowerCase()}> ${z.className.substring(0,40)}`),await zt(z,R),n(`วาง prompt ฉาก ${I} (${R.length} ตัวอักษร) ✅`);try{A(`scene${I}-prompt`,"done"),A(`scene${I}-gen`,"active")}catch{}await u(1e3);const q=z.getBoundingClientRect();let N=null,Y=1/0;for(const W of document.querySelectorAll("button")){if(W.disabled)continue;const at=W.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let it=!1;for(const xt of at){const Gt=(xt.textContent||"").trim();if(Gt==="arrow_forward"||Gt==="send"||Gt==="arrow_upward"){it=!0;break}}if(!it)continue;const tt=W.getBoundingClientRect();if(tt.width<=0||tt.height<=0)continue;const ut=Math.abs(tt.top-q.top)+Math.abs(tt.right-q.right);ut<Y&&(Y=ut,N=W)}if(!N)for(const W of["arrow_forward","send","arrow_upward"]){const at=ht(W);for(const it of at)if(!it.disabled){const tt=it.getBoundingClientRect();if(tt.width>0&&tt.height>0){N=it;break}}if(N)break}if(!N)for(const W of document.querySelectorAll("button")){const at=W.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const it of at)if((it.textContent||"").trim()==="arrow_forward"){const tt=W.getBoundingClientRect();if(tt.width>0&&tt.height>0){N=W;break}}if(N)break}if(!N){O("ไม่พบปุ่ม Generate/Send");return}await new Promise(W=>{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:I,scenePrompts:t}},()=>W())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${I}/${e})`),await X(N),n(`คลิก Generate ฉาก ${I} ✅`);try{A(`scene${I}-gen`,"done"),A(`scene${I}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${I} gen เสร็จ ──`),await u(5e3);let U=0,J=0;const lt=Date.now(),j=6e5,Q=5e3;let ot=!1;for(;Date.now()-lt<j;){let W=null;const at=document.querySelectorAll("div, span, p, label, strong, small");for(const it of at){if(it.closest("#netflow-engine-overlay"))continue;const ut=(it.textContent||"").trim().match(/^(\d{1,3})%$/);if(ut){const xt=it.getBoundingClientRect();if(xt.width>0&&xt.height>0&&xt.width<120&&xt.height<60){W=parseInt(ut[1],10);break}}}if(W!==null){if(W!==U){n(`🎬 ฉาก ${I} ความคืบหน้า: ${W}%`),U=W;try{A(`scene${I}-wait`,"active",W)}catch{}}J=0}else if(U>0){if(J===0)J=Date.now(),n(`🔍 ฉาก ${I}: % หายไป (จาก ${U}%) — กำลังยืนยัน...`);else if(Date.now()-J>=Q){n(`✅ ฉาก ${I}: % หายไป ${Q/1e3} วินาที — เจนเสร็จ!`),ot=!0;break}}if(Et()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&U>0&&J===0&&await kt(),await u(2e3)}ot||O(`ฉาก ${I} หมดเวลา`),n(`✅ ฉาก ${I} เสร็จแล้ว`);try{A(`scene${I}-wait`,"done",100)}catch{}chrome.storage.local.remove(mt()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await u(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{A("download","active")}catch{}let T=!1;if(await wt()&&document.hidden===!1&&(T=!0),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(I=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>I())),T=!0,await u(K?8e3:5e3)}catch{}}await u(K?3e3:2e3);const f=Date.now();let h=null;const _=Date.now();for(;!h&&Date.now()-_<(K?15e3:1e4);){const I=ht("download");for(const R of I){const z=R.getBoundingClientRect();if(z.width>0&&z.height>0){h=R;break}}if(!h)for(const R of document.querySelectorAll("button")){const z=R.querySelector("i, span[class*='icon'], span[class*='material']");if(z&&(z.textContent||"").trim()==="download"){const N=R.getBoundingClientRect();if(N.width>0&&N.height>0){h=R;break}}const V=(R.getAttribute("aria-label")||"").toLowerCase(),q=(R.getAttribute("title")||"").toLowerCase();if(V.includes("download")||V.includes("ดาวน์โหลด")||q.includes("download")||q.includes("ดาวน์โหลด")){const N=R.getBoundingClientRect();if(N.width>0&&N.height>0){h=R;break}}}h||await u(1e3)}if(!h){if(O("ไม่พบปุ่มดาวน์โหลด"),T)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await X(h),n("คลิกดาวน์โหลดแล้ว ✅");try{A("download","done"),A("upscale","active")}catch{}await u(K?3e3:1500);const g=(I,R)=>new Promise(async z=>{const V=Date.now();for(;Date.now()-V<R;){const q="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const N of document.querySelectorAll(q)){const Y=(N.textContent||"").trim();if(Y.includes(I)&&Y.length<100){const U=N.getBoundingClientRect();if(U.width>0&&U.height>0){z(N);return}}}await u(500)}z(null)}),y=(I,R)=>new Promise(async z=>{const V=Date.now();for(;Date.now()-V<I;){const q="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const N of document.querySelectorAll(q)){const Y=(N.textContent||"").trim();if(Y.includes("720p")&&Y.length<50){const J=N.getBoundingClientRect();if(J.width>0&&J.height>0){z(N);return}}const U=N.querySelectorAll("span");for(const J of U)if((J.textContent||"").trim()==="720p"){const lt=N.getBoundingClientRect();if(lt.width>0&&lt.height>0){z(N);return}}}R!=null&&R.isConnected&&Lt(R),await u(500)}z(null)});let b=null;for(let I=0;I<(K?5:3)&&!b;I++){I>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${I+1}...`),h.isConnected&&(await X(h),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await u(K?3e3:2e3)));const R=await g("Full Video",K?1e4:5e3);if(!R){O("ไม่พบ Full Video");continue}Lt(R),await u(K?1e3:500),await X(R),n("คลิก/hover Full Video ✅"),await u(K?3e3:2e3),b=await y(K?12e3:8e3,R)}if(!b){if(O("ไม่พบ 720p"),T)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await X(b),n("คลิก 720p ✅"),T){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const v=Date.now();let B=!1,E=!1;for(;Date.now()-v<3e5;){for(const I of document.querySelectorAll("div[data-title] div, div[data-content] div")){const R=(I.textContent||"").trim();if(R==="Download complete!"||R==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),B=!0;break}(R.includes("Downloading your extended video")||R.includes("กำลังดาวน์โหลด"))&&(E||(E=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(B)break;if(E){let I=!1;for(const R of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((R.textContent||"").trim().includes("Downloading")){I=!0;break}if(!I){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),B=!0;break}}if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await u(2e3)}if(!B){O("เตรียมไฟล์หมดเวลา");return}try{A("upscale","done",100),A("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await u(5e3);let k=!1;const C=Date.now();for(;Date.now()-C<6e4&&!k;){try{await new Promise(I=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:f},R=>{chrome.runtime.lastError?O(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):R!=null&&R.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${R.message}`),k=!0,R.downloadUrl&&(i=R.downloadUrl,n(`[TikTok] จะใช้ download URL: ${R.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-C)/1e3)}s)`),I()})})}catch(I){O(`ตรวจสอบผิดพลาด: ${I.message}`)}k||await u(3e3)}k||O("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const H=await oe();i||(i=H);try{A("open","done"),Ot(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),ie(i),ne(2e3);return}if(n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await wt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(T=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>T())),await u(K?8e3:5e3)}catch{}}await u(K?3e3:2e3);const d=(T,w="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const f of document.querySelectorAll(w)){const h=(f.textContent||"").trim();if(h.includes(T)&&h.length<100){const _=f.getBoundingClientRect();if(_.width>0&&_.height>0&&_.top>=0)return f}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let a=null;const s=Date.now();for(;!a&&Date.now()-s<(K?15e3:1e4);){const T=ht("download");for(const w of T){const f=w.getBoundingClientRect();if(f.width>0&&f.height>0){a=w;break}}if(!a)for(const w of document.querySelectorAll("button, [role='button']")){const f=(w.textContent||"").trim(),h=f.toLowerCase();if((h.includes("download")||h.includes("ดาวน์โหลด"))&&f.length<80){const _=w.getBoundingClientRect();if(_.width>0&&_.height>0){a=w;break}}}if(!a)for(const w of document.querySelectorAll("button")){const f=(w.getAttribute("aria-label")||"").toLowerCase(),h=(w.getAttribute("title")||"").toLowerCase();if(f.includes("download")||f.includes("ดาวน์")||h.includes("download")||h.includes("ดาวน์")){const _=w.getBoundingClientRect();if(_.width>0&&_.height>0){a=w;break}}}a||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await u(1e3))}if(!a){O("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(a.textContent||"").trim().substring(0,40)}"`),await X(a),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await u(K?3e3:1500);const l=Date.now();let p=null;const m=Date.now();for(;!p&&Date.now()-m<(K?1e4:5e3);)p=d("1080p"),p||(n("รอ 1080p..."),await u(500));if(!p){O("ไม่พบ 1080p");return}await X(p),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const x=Date.now();let S=!1,L=!1,F=0;const P=3e3;for(;Date.now()-x<3e5;){const w=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(w.includes("upscaling complete")||w.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),S=!0;break}for(const h of document.querySelectorAll("div, span, p")){const _=(h.textContent||"").trim().toLowerCase();if(_.length<60&&(_.includes("upscaling complete")||_.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(M=h.textContent)==null?void 0:M.trim()}")`),S=!0;break}}if(S)break;if(w.includes("upscaling your video")||w.includes("กำลังอัปสเกล")){L=!0,F=0;const h=Math.floor((Date.now()-x)/1e3);n(`⏳ กำลังอัปสเกล... (${h} วินาที)`)}else if(L){if(F===0)F=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-F>=P){n(`✅ ข้อความ Upscaling หายไป ${P/1e3} วินาที — เสร็จ!`),S=!0;break}}else{const h=Math.floor((Date.now()-x)/1e3);h%10<3&&n(`⏳ รอ Upscale... (${h} วินาที)`)}if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await u(2e3)}if(!S){O("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await u(5e3);let c=!1;const $=Date.now();for(;Date.now()-$<6e4&&!c;){try{await new Promise(T=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:l},w=>{chrome.runtime.lastError?O(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):w!=null&&w.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${w.message}`),c=!0,w.downloadUrl&&(i=w.downloadUrl,n(`[TikTok] จะใช้ download URL: ${w.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-$)/1e3)}s)`),T()})})}catch(T){O(`ตรวจสอบผิดพลาด: ${T.message}`)}c||await u(3e3)}c||O("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const D=await oe();i||(i=D),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),ie(i),ne(2e3)}async function Ue(e=2,t=2,o,r=[]){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{o&&qt(o)}catch{}try{Xt(e)}catch(g){n(`⚠️ showOverlay error: ${g.message}`)}try{const g=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let y=2;y<=t;y++)g.push(`scene${y}-prompt`,`scene${y}-gen`),y<t&&g.push(`scene${y}-wait`);for(const y of g)A(y,"done");A(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${g.length} steps done (scene ${t}/${e} navigate)`)}catch(g){n(`⚠️ overlay restore error: ${g.message}`)}await u(2e3);const i=(()=>{for(const g of document.querySelectorAll("button")){const y=g.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const v of y){const B=(v.textContent||"").trim();if(B==="volume_up"||B==="volume_off"||B==="volume_mute"){const E=g.getBoundingClientRect();if(E.width>0&&E.height>0)return g}}const b=(g.getAttribute("aria-label")||"").toLowerCase();if(b.includes("mute")||b.includes("ปิดเสียง")){const v=g.getBoundingClientRect();if(v.width>0&&v.height>0)return g}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);let d=0,a=0;const s=Date.now(),l=6e5,p=5e3;let m=!1,x=0;for(;Date.now()-s<l;){let g=null;const y=document.querySelectorAll("div, span, p, label, strong, small");for(const b of y){if(b.closest("#netflow-engine-overlay"))continue;const B=(b.textContent||"").trim().match(/^(\d{1,3})%$/);if(B){const E=b.getBoundingClientRect();if(E.width>0&&E.height>0&&E.width<120&&E.height<60){g=parseInt(B[1],10);break}}}if(g!==null){if(x=0,g!==d){n(`🎬 scene ${t} ความคืบหน้า: ${g}%`),d=g;try{A(`scene${t}-wait`,"active",g)}catch{}}a=0}else if(d>0){if(a===0)a=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${d}%) — กำลังยืนยัน...`);else if(Date.now()-a>=p){n(`✅ scene ${t}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),m=!0;break}}else if(x++,x>=15){const b=document.querySelectorAll("video");let v=!1;for(const B of b)if(B.readyState>=2&&!B.paused&&B.getBoundingClientRect().width>200){v=!0;break}if(v){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),m=!0;break}if(x>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),m=!0;break}}document.hidden&&d>0&&a===0&&await kt(),await u(2e3)}m||n(`⚠️ scene ${t} หมดเวลา — ลองต่อไป`);try{A(`scene${t}-wait`,"done",100)}catch{}if(n(`✅ scene ${t} เสร็จ`),t<e&&r.length>0){n(`═══ ยังเหลืออีก ${e-t} ฉาก — ต่อฉากถัดไป ═══`),await u(2e3);for(let g=t+1;g<=e;g++){const y=r[g-1];if(!y){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${g} — ข้าม`);continue}n(`── ฉากที่ ${g}/${e}: วาง prompt + generate (pending recovery) ──`);let b=null;const v=Date.now();for(;!b&&Date.now()-v<1e4;){const V=document.querySelectorAll("[data-slate-editor='true']");if(V.length>0&&(b=V[V.length-1]),!b){const q=document.querySelectorAll("[role='textbox'][contenteditable='true']");q.length>0&&(b=q[q.length-1])}b||await u(1e3)}if(!b){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${g}`);break}await zt(b,y),n(`วาง prompt ฉาก ${g} (${y.length} ตัวอักษร) ✅`);try{A(`scene${g}-prompt`,"done"),A(`scene${g}-gen`,"active")}catch{}await u(1e3);const B=b.getBoundingClientRect();let E=null,k=1/0;for(const V of document.querySelectorAll("button")){if(V.disabled)continue;const q=V.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let N=!1;for(const J of q){const lt=(J.textContent||"").trim();if(lt==="arrow_forward"||lt==="send"||lt==="arrow_upward"){N=!0;break}}if(!N)continue;const Y=V.getBoundingClientRect();if(Y.width<=0||Y.height<=0)continue;const U=Math.abs(Y.top-B.top)+Math.abs(Y.right-B.right);U<k&&(k=U,E=V)}if(!E)for(const V of["arrow_forward","send","arrow_upward"]){const q=ht(V);for(const N of q)if(!N.disabled){const Y=N.getBoundingClientRect();if(Y.width>0&&Y.height>0){E=N;break}}if(E)break}if(!E)for(const V of document.querySelectorAll("button")){const q=V.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const N of q)if((N.textContent||"").trim()==="arrow_forward"){const Y=V.getBoundingClientRect();if(Y.width>0&&Y.height>0){E=V;break}}if(E)break}if(!E){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${g}`);break}await new Promise(V=>{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:g,scenePrompts:r}},()=>V())}),await X(E),n(`คลิก Generate ฉาก ${g} ✅`);try{A(`scene${g}-gen`,"done"),A(`scene${g}-wait`,"active")}catch{}await u(5e3);let C=0,H=0;const I=Date.now();let R=!1,z=0;for(;Date.now()-I<6e5;){let V=null;const q=document.querySelectorAll("div, span, p, label, strong, small");for(const N of q){if(N.closest("#netflow-engine-overlay"))continue;const U=(N.textContent||"").trim().match(/^(\d{1,3})%$/);if(U){const J=N.getBoundingClientRect();if(J.width>0&&J.height>0&&J.width<120&&J.height<60){V=parseInt(U[1],10);break}}}if(V!==null){if(z=0,V!==C){n(`🎬 ฉาก ${g} ความคืบหน้า: ${V}%`),C=V;try{A(`scene${g}-wait`,"active",V)}catch{}}H=0}else if(C>0){if(H===0)H=Date.now();else if(Date.now()-H>=5e3){n(`✅ ฉาก ${g}: เจนเสร็จ!`),R=!0;break}}else if(z++,z>=15){const N=document.querySelectorAll("video");let Y=!1;for(const U of N)if(U.readyState>=2&&!U.paused&&U.getBoundingClientRect().width>200){Y=!0;break}if(Y){n(`✅ ฉาก ${g}: พบวิดีโอเล่นอยู่ — เสร็จ`),R=!0;break}if(z>=30){n(`✅ ฉาก ${g}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),R=!0;break}}document.hidden&&C>0&&H===0&&await kt(),await u(2e3)}R||n(`⚠️ ฉาก ${g} หมดเวลา`);try{A(`scene${g}-wait`,"done",100)}catch{}n(`✅ ฉาก ${g} เสร็จแล้ว`),chrome.storage.local.remove(mt()),await u(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await u(3e3);let S=null;try{A("download","active")}catch{}if(n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──"),await wt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(g=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>g())),await u(K?8e3:5e3)}catch{}}await u(K?3e3:2e3);const L=Date.now();let F=null;const P=Date.now();for(;!F&&Date.now()-P<(K?15e3:1e4);){const g=ht("download");for(const y of g){const b=y.getBoundingClientRect();if(b.width>0&&b.height>0){F=y;break}}if(!F)for(const y of document.querySelectorAll("button")){const b=y.querySelector("i, span[class*='icon'], span[class*='material']");if(b&&(b.textContent||"").trim()==="download"){const E=y.getBoundingClientRect();if(E.width>0&&E.height>0){F=y;break}}const v=(y.getAttribute("aria-label")||"").toLowerCase(),B=(y.getAttribute("title")||"").toLowerCase();if(v.includes("download")||v.includes("ดาวน์โหลด")||B.includes("download")||B.includes("ดาวน์โหลด")){const E=y.getBoundingClientRect();if(E.width>0&&E.height>0){F=y;break}}}F||await u(1e3)}if(!F){O("ไม่พบปุ่มดาวน์โหลด");return}await X(F),n("คลิกดาวน์โหลดแล้ว ✅");try{A("download","done"),A("upscale","active")}catch{}await u(K?3e3:1500);const c=(g,y)=>new Promise(async b=>{const v=Date.now();for(;Date.now()-v<y;){const B="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const E of document.querySelectorAll(B)){const k=(E.textContent||"").trim();if(k.includes(g)&&k.length<100){const C=E.getBoundingClientRect();if(C.width>0&&C.height>0){b(E);return}}}await u(500)}b(null)}),$=(g,y)=>new Promise(async b=>{const v=Date.now();for(;Date.now()-v<g;){const B="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const E of document.querySelectorAll(B)){const k=(E.textContent||"").trim();if(k.includes("720p")&&k.length<50){const H=E.getBoundingClientRect();if(H.width>0&&H.height>0){b(E);return}}const C=E.querySelectorAll("span");for(const H of C)if((H.textContent||"").trim()==="720p"){const I=E.getBoundingClientRect();if(I.width>0&&I.height>0){b(E);return}}}y!=null&&y.isConnected&&Lt(y),await u(500)}b(null)});let D=null;for(let g=0;g<(K?5:3)&&!D;g++){g>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${g+1}...`),F.isConnected&&(await X(F),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await u(K?3e3:2e3)));const y=await c("Full Video",K?1e4:5e3);if(!y){O("ไม่พบ Full Video");continue}Lt(y),await u(K?1e3:500),await X(y),n("คลิก/hover Full Video ✅"),await u(K?3e3:2e3),D=await $(K?12e3:8e3,y)}if(!D){O("ไม่พบ 720p");return}await X(D),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const M=Date.now();let T=!1,w=!1;for(;Date.now()-M<3e5;){for(const g of document.querySelectorAll("div[data-title] div, div[data-content] div")){const y=(g.textContent||"").trim();if(y==="Download complete!"||y==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),T=!0;break}(y.includes("Downloading your extended video")||y.includes("กำลังดาวน์โหลด"))&&(w||(w=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(T)break;if(w){let g=!1;for(const y of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((y.textContent||"").trim().includes("Downloading")){g=!0;break}if(!g){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),T=!0;break}}await u(2e3)}if(!T){O("เตรียมไฟล์หมดเวลา");return}try{A("upscale","done",100),A("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await u(5e3);let f=!1;const h=Date.now();for(;Date.now()-h<6e4&&!f;){try{await new Promise(g=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:L},y=>{chrome.runtime.lastError?O(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):y!=null&&y.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${y.message}`),f=!0,y.downloadUrl&&(S=y.downloadUrl,n(`[TikTok] จะใช้ download URL: ${y.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-h)/1e3)}s)`),g()})})}catch(g){O(`ตรวจสอบผิดพลาด: ${g.message}`)}f||await u(3e3)}f||O("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const _=await oe();S||(S=_);try{A("open","done"),Ot(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),ie(S),ne(2e3)}async function vn(){try{await ln;const e=mt();let t=await new Promise(a=>{chrome.storage.local.get(e,s=>{if(chrome.runtime.lastError){a(null);return}a((s==null?void 0:s[e])||null)})});if(!t&&St){const a="netflow_pending_action";t=await new Promise(s=>{chrome.storage.local.get(a,l=>{if(chrome.runtime.lastError){s(null);return}s((l==null?void 0:l[a])||null)})}),t&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(a))}if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const r=Date.now()-t.timestamp;if(r>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(e);return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=i,await new Promise(a=>{chrome.storage.local.set({[e]:t},()=>a())}),await u(300),!await new Promise(a=>{chrome.storage.local.get(e,s=>{const l=s==null?void 0:s[e];a((l==null?void 0:l._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(e),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(r/1e3)} วินาที)`),t.action==="mute_video"?await qe(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await Ue(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,o)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),o({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),yn(e).then(r=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${r.message}`),Be()}).catch(r=>{if(r instanceof re||(r==null?void 0:r.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Nt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Re()}catch{}}else console.error("[Netflow AI] Generate error:",r);Be()}),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,o({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return o({status:"ready"}),!1;if((e==null?void 0:e.type)==="CAPTURE_PAGE_VIDEO")return(async()=>{try{const r=document.querySelectorAll("video");let i="",d=0;for(const p of r){const m=p.src||p.currentSrc||"";if(!m)continue;const x=p.getBoundingClientRect(),S=x.width*x.height;(S>d||!i&&m)&&(d=S,i=m)}if(!i){o({success:!1,error:"No video found"});return}const a=await fetch(i);if(!a.ok){o({success:!1,error:"HTTP "+a.status});return}const s=await a.blob();if(s.size<1e4){o({success:!1,error:"Video too small: "+s.size});return}const l=await new Promise((p,m)=>{const x=new FileReader;x.onloadend=()=>p(x.result),x.onerror=()=>m(new Error("FileReader error")),x.readAsDataURL(s)});o({success:!0,data:l,size:s.size})}catch(r){o({success:!1,error:r.message})}})(),!0;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return o({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await u(500);const r=un();if(!r){O("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=r.getBoundingClientRect(),d=i.left+i.width/2,a=i.top+i.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${a.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const l=document.elementFromPoint(d,a);l?(await X(l),n(`คลิก ${s+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await X(r),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await u(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),(async()=>{try{const e=await new Promise(t=>{chrome.storage.local.get("netflow_preshow_overlay",o=>{if(chrome.runtime.lastError){t(null);return}t((o==null?void 0:o.netflow_preshow_overlay)||null)})});if(e&&e.timestamp&&Date.now()-e.timestamp<3e4){n("⚡ Pre-show overlay — แสดง overlay ทันที");try{qt(e.theme)}catch{}try{Xt(e.sceneCount||1)}catch(t){n(`⚠️ pre-show overlay error: ${t.message}`)}chrome.storage.local.remove("netflow_preshow_overlay")}}catch{}})(),vn()})();
