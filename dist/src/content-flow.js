(function(){"use strict";const bt={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let st=bt.green,Pt=null;function qt(e){e&&bt[e]&&(Pt=e,st=bt[e],pe(),requestAnimationFrame(()=>Me()))}function We(){if(Pt&&bt[Pt])return bt[Pt];try{const e=localStorage.getItem("netflow_app_theme");if(e&&bt[e])return bt[e]}catch{}return bt.green}let ct=0,dt=255,pt=65;function pe(){const e=st.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(ct=parseInt(e[1],16),dt=parseInt(e[2],16),pt=parseInt(e[3],16))}const fe='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',ue='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let U=null,at=null,et=null,ge=0,Ht=null,Mt=null,Wt=null,Zt=0,yt=!1,gt=null,Rt=null,Bt=null,Ct=1,J=[];function jt(e){const t=[{stepId:"open-flow",label:"เปิด Google Flow",status:"waiting"},{stepId:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let o=2;o<=e;o++)t.push({stepId:`scene${o}-prompt`,label:`ฉาก ${o} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${o}-gen`,label:`ฉาก ${o} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${o}-wait`,label:`ฉาก ${o} — กำลังสร้าง`,status:"waiting",progress:0});t.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return t}const ft=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"open-flow",label:"เปิด Google Flow",status:"waiting"},{id:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];J=jt(1);function je(e){const t=e.rgb,o=e.accentRgb,r=e.doneRgb,a=e.hex,p=e.accentHex,i=e.doneHex,l=(()=>{const w=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!w)return"#4ade80";const c=h=>Math.min(255,h+80);return`#${[1,2,3].map(h=>c(parseInt(w[h],16)).toString(16).padStart(2,"0")).join("")}`})(),s=(()=>{const w=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!w)return"#4ade80";const c=h=>Math.min(255,h+60);return`#${[1,2,3].map(h=>c(parseInt(w[h],16)).toString(16).padStart(2,"0")).join("")}`})(),d=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),u=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,m=d?parseInt(d[1],16)/u:0,y=d?parseInt(d[2],16)/u:1,O=d?parseInt(d[3],16)/u:.25,C=w=>`${Math.round(m*w)}, ${Math.round(y*w)}, ${Math.round(O*w)}`;return`
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
    color: ${s};
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
    background: linear-gradient(180deg, rgba(${C(6)},0.75) 0%, rgba(${C(3)},0.92) 100%);
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
    background: linear-gradient(90deg, ${i}, ${s});
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
    background: linear-gradient(90deg, ${i}, ${s});
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
    background: rgba(${C(8)}, 0.9);
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
    color: ${s};
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

    `}function Jt(){et||(et=document.createElement("style"),et.id="netflow-overlay-styles",et.textContent=je(st),document.head.appendChild(et))}function me(e){e.innerHTML="",J.forEach((t,o)=>{const r=document.createElement("div");r.className="nf-proc-row nf-proc-waiting",r.id=`nf-proc-${t.stepId}`,r.innerHTML=`
            <span class="nf-proc-num">${o+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(r)})}function he(){const e=document.getElementById("nf-terminal");if(!e)return;me(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${J.length}`)}function be(e,t){let l="";for(let y=0;y<20;y++){const O=y/20*Math.PI*2,C=(y+.2)/20*Math.PI*2,w=(y+.5)/20*Math.PI*2,c=(y+.8)/20*Math.PI*2,h=(y+1)/20*Math.PI*2;l+=`${y===0?"M":"L"}${(120+100*Math.cos(O)).toFixed(1)},${(120+100*Math.sin(O)).toFixed(1)} `,l+=`L${(120+100*Math.cos(C)).toFixed(1)},${(120+100*Math.sin(C)).toFixed(1)} `,l+=`L${(120+112*Math.cos(w)).toFixed(1)},${(120+112*Math.sin(w)).toFixed(1)} `,l+=`L${(120+100*Math.cos(c)).toFixed(1)},${(120+100*Math.sin(c)).toFixed(1)} `,l+=`L${(120+100*Math.cos(h)).toFixed(1)},${(120+100*Math.sin(h)).toFixed(1)} `}l+="Z";const s=14,d=72,u=62;let m="";for(let y=0;y<s;y++){const O=y/s*Math.PI*2,C=(y+.25)/s*Math.PI*2,w=(y+.75)/s*Math.PI*2,c=(y+1)/s*Math.PI*2;m+=`${y===0?"M":"L"}${(120+u*Math.cos(O)).toFixed(1)},${(120+u*Math.sin(O)).toFixed(1)} `,m+=`L${(120+d*Math.cos(C)).toFixed(1)},${(120+d*Math.sin(C)).toFixed(1)} `,m+=`L${(120+d*Math.cos(w)).toFixed(1)},${(120+d*Math.sin(w)).toFixed(1)} `,m+=`L${(120+u*Math.cos(c)).toFixed(1)},${(120+u*Math.sin(c)).toFixed(1)} `}return m+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${m}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${u}" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${e},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${e},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Ye(){const e=document.createElement("div");e.id="netflow-engine-overlay",gt=document.createElement("canvas"),gt.id="nf-matrix-canvas",e.appendChild(gt);const t=document.createElement("div");t.className="nf-pat-plasma",e.appendChild(t);for(let k=1;k<=5;k++){const T=document.createElement("div");T.className=`nf-ambient-orb nf-orb-${k}`,e.appendChild(T)}const o=document.createElement("div");o.className="nf-pat-data",e.appendChild(o);const r=document.createElement("div");r.className="nf-pat-diag-a",e.appendChild(r);const a=document.createElement("div");a.className="nf-pat-diag-b",e.appendChild(a);const p=document.createElement("div");p.className="nf-pat-circuit",e.appendChild(p);const i=document.createElement("div");i.className="nf-pat-honeycomb",e.appendChild(i);const l=document.createElement("div");l.className="nf-pat-binary",e.appendChild(l);const s=document.createElement("div");s.className="nf-pat-crosshatch",e.appendChild(s);const d=document.createElement("div");d.className="nf-pat-diamond",e.appendChild(d);const u=document.createElement("div");u.className="nf-pat-wave-h",e.appendChild(u);const m=document.createElement("div");m.className="nf-pat-radar",e.appendChild(m);const y=document.createElement("div");y.className="nf-pat-ripple-1",e.appendChild(y);const O=document.createElement("div");O.className="nf-pat-ripple-2",e.appendChild(O);const C=document.createElement("div");C.className="nf-pat-techscan",e.appendChild(C);const w=document.createElement("div");w.className="nf-center-glow",e.appendChild(w);const c=document.createElement("div");c.className="nf-pat-noise",e.appendChild(c);const h=document.createElement("div");h.className="nf-crt-scanlines",e.appendChild(h);const I=document.createElement("div");I.className="nf-vignette",e.appendChild(I);for(let k=0;k<3;k++){const T=document.createElement("div");T.className="nf-pulse-ring",e.appendChild(T)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(k=>{const T=document.createElement("div");T.className=`nf-corner-deco ${k}`,e.appendChild(T)});const F=document.createElement("button");F.className="nf-stop-btn",F.innerHTML='<span class="nf-stop-icon"></span> หยุด',F.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",F.onclick=()=>{var k;window.__NETFLOW_STOP__=!0;try{Lt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((k=chrome.runtime)!=null&&k.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},e.appendChild(F);const D=document.createElement("div");D.className="nf-layout";const L=document.createElement("div");L.className="nf-core-monitor",L.id="nf-core-monitor";const b=document.createElement("div");b.className="nf-core-header",b.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${J.length}</div>
    `,L.appendChild(b);const _=document.createElement("div");_.className="nf-terminal",_.id="nf-terminal",me(_),L.appendChild(_);const B=document.createElement("div");B.className="nf-engine-core",B.id="nf-engine-core";const g=document.createElement("div");g.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(k=>{const T=document.createElement("div");T.className=`nf-frame-corner ${k}`,g.appendChild(T)}),B.appendChild(g);const v="http://www.w3.org/2000/svg",x=document.createElementNS(v,"svg");x.setAttribute("class","nf-engine-waves"),x.setAttribute("viewBox","0 0 560 140"),x.setAttribute("preserveAspectRatio","none"),x.id="nf-engine-waves";for(let k=0;k<4;k++){const T=document.createElementNS(v,"path");T.setAttribute("fill","none"),T.setAttribute("stroke-width",k<2?"1.5":"1"),T.setAttribute("stroke",k<2?`rgba(${st.rgb},${.14+k*.1})`:`rgba(${st.accentRgb},${.1+(k-2)*.08})`),T.setAttribute("data-wave-idx",String(k)),x.appendChild(T)}B.appendChild(x);const $=document.createElement("div");$.className="nf-engine-brand-inner",$.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${be(st.rgb,st.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${be(st.rgb,st.accentRgb)}
        </div>
    `,B.appendChild($);const M=document.createElement("div");M.className="nf-engine-stats",M.id="nf-engine-stats",M.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([k,T,G])=>`<div class="nf-stat-item"><span class="nf-stat-label">${k}</span><span class="nf-stat-val" id="${T}">${G}</span></div>`).join(""),B.appendChild(M),L.appendChild(B),D.appendChild(L);const E=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ft.forEach((k,T)=>{const G=Ke(k);G.classList.add(E[T]),G.id=`nf-mod-${k.id}`,D.appendChild(G)}),e.appendChild(D);for(let k=0;k<30;k++){const T=document.createElement("div");T.className="nf-particle",T.style.left=`${5+Math.random()*90}%`,T.style.bottom=`${Math.random()*40}%`,T.style.animationDuration=`${3+Math.random()*5}s`,T.style.animationDelay=`${Math.random()*4}s`;const G=.3+Math.random()*.4,S=.7+Math.random()*.3;T.style.background=`rgba(${Math.floor(ct*S)}, ${Math.floor(dt*S)}, ${Math.floor(pt*S)}, ${G})`,T.style.width=`${1+Math.random()*2}px`,T.style.height=T.style.width,e.appendChild(T)}return e}function Ke(e){const t=document.createElement("div");t.className="nf-module";const o=document.createElement("div");o.className="nf-mod-header",o.innerHTML=`
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
        `,t.appendChild(p)});const r=document.createElement("div");return r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(r),t}function Xe(){ge=Date.now(),Ht=setInterval(()=>{const e=Math.floor((Date.now()-ge)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),o=String(e%60).padStart(2,"0"),r=document.getElementById("nf-timer");r&&(r.textContent=`${t}:${o}`);const a=document.getElementById("nf-stat-elapsed");a&&(a.textContent=`${t}:${o}`)},1e3)}function we(){Ht&&(clearInterval(Ht),Ht=null)}const Qe=120,xe=160,ye=.4;let Tt=null,ve=0,$e=0,Ee=0,Dt=[];function Ze(e,t){Dt=[];for(let o=0;o<Qe;o++){const r=Math.random();let a;r<.22?a=0:r<.4?a=1:r<.55?a=2:r<.68?a=3:r<.84?a=4:a=5;const p=Math.random()*e,i=Math.random()*t,l=50+Math.random()*220,s=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Dt.push({x:a===0?Math.random()*e:p+Math.cos(s)*l,y:a===0?Math.random()*t:i+Math.sin(s)*l,vx:(Math.random()-.5)*ye,vy:(Math.random()-.5)*ye,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:a,oCx:p,oCy:i,oRadius:l,oAngle:s,oSpeed:d})}}function Je(){if(!gt)return;const e=gt;if(Rt=e.getContext("2d"),!Rt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,Dt.length===0&&Ze(e.width,e.height)};t(),window.addEventListener("resize",t);let o=null,r=0,a=0,p=!1;function i(){if(!Rt||!gt){Bt=null;return}if(Bt=requestAnimationFrame(i),p=!p,p)return;const l=Rt,s=gt.width,d=gt.height;l.fillStyle=`rgba(${ct*.04|0},${dt*.04|0},${pt*.06|0},1)`,l.fillRect(0,0,s,d),(!o||r!==s||a!==d)&&(r=s,a=d,o=l.createRadialGradient(s*.5,d*.5,0,s*.5,d*.5,Math.max(s,d)*.6),o.addColorStop(0,`rgba(${ct*.08|0},${dt*.08|0},${pt*.1|0},0.4)`),o.addColorStop(1,"rgba(0,0,0,0)")),l.fillStyle=o,l.fillRect(0,0,s,d);const u=Dt,m=u.length,y=xe*xe;for(let w=0;w<m;w++){const c=u[w];if(c.pulsePhase+=c.pulseSpeed,c.motion===0)c.x+=c.vx,c.y+=c.vy,c.x<0?(c.x=0,c.vx=Math.abs(c.vx)*(.8+Math.random()*.4)):c.x>s&&(c.x=s,c.vx=-Math.abs(c.vx)*(.8+Math.random()*.4)),c.y<0?(c.y=0,c.vy=Math.abs(c.vy)*(.8+Math.random()*.4)):c.y>d&&(c.y=d,c.vy=-Math.abs(c.vy)*(.8+Math.random()*.4));else if(c.motion===1)c.oAngle+=c.oSpeed,c.x=c.oCx+Math.cos(c.oAngle)*c.oRadius,c.y=c.oCy+Math.sin(c.oAngle)*c.oRadius,c.oCx+=Math.sin(c.oAngle*.3)*.15,c.oCy+=Math.cos(c.oAngle*.3)*.15;else if(c.motion===2)c.oAngle+=c.oSpeed,c.x=c.oCx+Math.cos(c.oAngle)*c.oRadius,c.y=c.oCy+Math.sin(c.oAngle)*c.oRadius*.5,c.oCx+=Math.sin(c.oAngle*.2)*.1,c.oCy+=Math.cos(c.oAngle*.2)*.1;else if(c.motion===3){c.oAngle+=c.oSpeed;const h=c.oAngle,I=c.oRadius*.7;c.x=c.oCx+I*Math.cos(h),c.y=c.oCy+I*Math.sin(h)*Math.cos(h),c.oCx+=Math.sin(h*.15)*.12,c.oCy+=Math.cos(h*.15)*.12}else if(c.motion===4){c.oAngle+=c.oSpeed*1.2;const h=c.oRadius*(.5+.5*Math.abs(Math.sin(c.oAngle*.15)));c.x=c.oCx+Math.cos(c.oAngle)*h,c.y=c.oCy+Math.sin(c.oAngle)*h,c.oCx+=Math.sin(c.oAngle*.1)*.18,c.oCy+=Math.cos(c.oAngle*.1)*.18}else c.oAngle+=c.oSpeed,c.x+=c.vx*.8,c.y=c.oCy+Math.sin(c.oAngle+c.x*.008)*c.oRadius*.35,c.x<-30?c.x=s+30:c.x>s+30&&(c.x=-30),c.oCy+=Math.sin(c.oAngle*.1)*.08;if(c.motion>0){const h=c.oRadius+50;c.oCx<-h?c.oCx=s+h:c.oCx>s+h&&(c.oCx=-h),c.oCy<-h?c.oCy=d+h:c.oCy>d+h&&(c.oCy=-h)}}l.beginPath(),l.strokeStyle=`rgba(${ct},${dt},${pt},0.06)`,l.lineWidth=.4;const O=new Path2D;for(let w=0;w<m;w++){const c=u[w];for(let h=w+1;h<m;h++){const I=u[h],F=c.x-I.x,D=c.y-I.y,L=F*F+D*D;L<y&&(1-L/y<.4?(l.moveTo(c.x,c.y),l.lineTo(I.x,I.y)):(O.moveTo(c.x,c.y),O.lineTo(I.x,I.y)))}}if(l.stroke(),l.strokeStyle=`rgba(${ct},${dt},${pt},0.18)`,l.lineWidth=.8,l.stroke(O),!Tt||ve!==ct||$e!==dt||Ee!==pt){Tt=document.createElement("canvas");const w=48;Tt.width=w,Tt.height=w;const c=Tt.getContext("2d"),h=c.createRadialGradient(w/2,w/2,0,w/2,w/2,w/2);h.addColorStop(0,`rgba(${ct},${dt},${pt},0.9)`),h.addColorStop(.3,`rgba(${ct},${dt},${pt},0.35)`),h.addColorStop(1,`rgba(${ct},${dt},${pt},0)`),c.fillStyle=h,c.fillRect(0,0,w,w),ve=ct,$e=dt,Ee=pt}const C=Tt;for(let w=0;w<m;w++){const c=u[w],h=.6+.4*Math.sin(c.pulsePhase),I=c.radius*5*(.8+h*.4);l.globalAlpha=.5+h*.4,l.drawImage(C,c.x-I/2,c.y-I/2,I,I)}l.globalAlpha=1,l.fillStyle="rgba(255,255,255,0.45)",l.beginPath();for(let w=0;w<m;w++){const c=u[w];if(c.radius>2){const h=.6+.4*Math.sin(c.pulsePhase),I=c.radius*(.8+h*.4)*.35;l.moveTo(c.x+I,c.y),l.arc(c.x,c.y,I,0,Math.PI*2)}}l.fill()}i()}function tn(){Bt!==null&&(cancelAnimationFrame(Bt),Bt=null),gt=null,Rt=null,Dt=[]}let Ot=null;const Yt=560,en=140,ke=Yt/2,Ce=en/2,Te=[];for(let e=0;e<=Yt;e+=8){const t=Math.abs(e-ke)/ke;Te.push(Math.pow(Math.min(1,t*1.6),.6))}const nn=[0,1,2,3].map(e=>({amp:10+e*5,freq:(1.2+e*.35)*Math.PI*2/Yt,off:e*.6,spd:.7+e*.12}));let te=!1;function Ie(){if(Mt=requestAnimationFrame(Ie),te=!te,te)return;if(Zt+=.07,!Ot){const t=document.getElementById("nf-engine-waves");if(!t){Mt=null;return}Ot=Array.from(t.querySelectorAll("path"))}const e=[];for(let t=0;t<Ot.length;t++){const o=nn[t],r=Zt*o.spd+o.off;e.length=0,e.push(`M 0 ${Ce}`);let a=0;for(let p=0;p<=Yt;p+=8){const i=Ce+o.amp*Te[a++]*Math.sin(p*o.freq+r);e.push(`L${p} ${i*10+.5|0}`)}Ot[t].setAttribute("d",e.join(" "))}}function on(){Zt=0,Ie(),Je(),Wt=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),o=document.getElementById("nf-stat-lat2"),r=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function Se(){Mt!==null&&(cancelAnimationFrame(Mt),Mt=null),Wt&&(clearInterval(Wt),Wt=null),Ot=null,tn()}function Kt(){let e=0;const t=J.filter(d=>d.status!=="skipped").length;for(const d of J){const u=document.getElementById(`nf-proc-${d.stepId}`);if(!u)continue;u.className="nf-proc-row";const m=u.querySelector(".nf-proc-badge");switch(d.status){case"done":u.classList.add("nf-proc-done"),m&&(m.textContent="✅ done"),e++;break;case"active":u.classList.add("nf-proc-active"),m&&(m.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":u.classList.add("nf-proc-error"),m&&(m.textContent="❌ error");break;case"skipped":u.classList.add("nf-proc-skipped"),m&&(m.textContent="— skip");break;default:u.classList.add("nf-proc-waiting"),m&&(m.textContent="(queued)")}}const o=J.findIndex(d=>d.status==="active"),r=o>=0?o+1:e>=t&&t>0?J.length:e,a=document.getElementById("nf-step-counter");a&&(a.textContent=`${r}/${J.length}`);const p=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");e>=t&&t>0?(p&&(p.textContent="COMPLETE",p.style.color=st.doneHex),i&&(i.style.background=st.doneHex,i.style.boxShadow=`0 0 8px rgba(${st.doneRgb},0.7)`)):J.some(u=>u.status==="error")?(p&&(p.textContent="ERROR",p.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):J.some(u=>u.status==="active")&&p&&(p.textContent="ACTIVE",p.style.color=st.hex,p.style.textShadow=`0 0 10px rgba(${st.rgb},0.5)`);const l=document.getElementById("nf-terminal"),s=l==null?void 0:l.querySelector(".nf-proc-active");s&&l&&s.scrollIntoView({behavior:"smooth",block:"center"})}function _e(){at&&at.isConnected||(Jt(),at=document.createElement("button"),at.id="nf-toggle-btn",at.className="nf-toggle-visible",at.innerHTML=yt?fe:ue,at.title="ซ่อน/แสดง Netflow Overlay",at.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",at.onclick=()=>Ae(),document.body.appendChild(at))}function Ae(){U&&(_e(),yt?(U.classList.remove("nf-hidden"),U.classList.add("nf-visible"),U.style.opacity="1",U.style.pointerEvents="auto",at&&(at.innerHTML=ue),yt=!1):(U.classList.remove("nf-visible"),U.classList.add("nf-hidden"),U.style.opacity="0",U.style.pointerEvents="none",at&&(at.innerHTML=fe),yt=!0))}const Pe={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Me(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=Pt;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"green"}catch{t="green"}const o=Pe[t]||Pe.green;let r;try{r=chrome.runtime.getURL(o)}catch{r=`/${o}`}const a=st.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${a},0.25) 0%, rgba(${a},0.12) 50%, rgba(${a},0.20) 100%)`,`url('${r}')`].join(", "),e.style.backgroundSize="auto, auto, 50%",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${a},0.45)`,e.style.boxShadow=`0 0 70px rgba(${a},0.22), 0 0 140px rgba(${a},0.1), inset 0 1px 0 rgba(${a},0.15)`}function Xt(e=1){if(st=We(),pe(),U&&U.isConnected){U.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!et||!et.isConnected)&&(et=null,Jt()),setTimeout(()=>{if(U)try{et!=null&&et.sheet&&et.sheet.cssRules.length>0&&(U.style.removeProperty("background"),U.style.removeProperty("font-family"),U.style.removeProperty("overflow"))}catch{}},200);for(const t of ft)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;Ct=e,J=jt(e),he();for(const t of ft)ee(t);if(Qt(),Kt(),!U.querySelector(".nf-stop-btn")){const t=document.createElement("button");t.className="nf-stop-btn",t.innerHTML='<span class="nf-stop-icon"></span> หยุด',t.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",t.onclick=()=>{var o;window.__NETFLOW_STOP__=!0;try{Lt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((o=chrome.runtime)!=null&&o.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},U.appendChild(t)}yt&&Ae();return}U&&!U.isConnected&&(U=null),et&&(et.remove(),et=null),Jt();for(const t of ft)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;if(Ct=e,J=jt(e),e>1){const t=ft.find(r=>r.id==="video");if(t){const r=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let a=2;a<=e;a++)r.push({id:`scene${a}-prompt`,label:`Scene ${a} Prompt`,status:"waiting"}),r.push({id:`scene${a}-gen`,label:`Scene ${a} Generate`,status:"waiting"}),r.push({id:`scene${a}-wait`,label:`Scene ${a} รอผล`,status:"waiting",progress:0});t.steps=r}const o=ft.find(r=>r.id==="render");if(o){const r=o.steps.find(p=>p.id==="download");r&&(r.label="ดาวน์โหลด 720p");const a=o.steps.find(p=>p.id==="upscale");a&&(a.label="Full Video")}}U=Ye(),U.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(U),U.classList.add("nf-visible"),yt=!1,_e(),Xe(),on(),requestAnimationFrame(()=>Me()),setTimeout(()=>{if(U)try{et!=null&&et.sheet&&et.sheet.cssRules.length>0&&(U.style.removeProperty("background"),U.style.removeProperty("font-family"),U.style.removeProperty("overflow"))}catch{}},200)}function Re(){we(),Se(),yt=!1,U&&(U.classList.add("nf-fade-out"),setTimeout(()=>{U==null||U.remove(),U=null},500)),at&&(at.remove(),at=null)}const an={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function rn(e,t,o){const r=J.findIndex(m=>m.status==="active"),a=J.filter(m=>m.status==="done").length,p=J.length,i=r>=0?r+1:a>=p?p:a,l=document.getElementById("nf-stat-step");l&&(l.textContent=`${i}/${p}`);let s=1;for(const m of J)if(m.status==="active"||m.status==="done")if(m.stepId.startsWith("scene")){const y=m.stepId.match(/^scene(\d+)-/);y&&(s=Math.max(s,parseInt(y[1],10)))}else(m.stepId==="download"||m.stepId==="upscale"||m.stepId==="open")&&(s=Ct);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=Ct>1?`${s}/${Ct}`:"1/1"),t==="active"){const m=document.getElementById("nf-stat-status"),y=an[e]||e.toUpperCase();m&&(m.textContent=y)}else if(t==="done"&&a>=p){const m=document.getElementById("nf-stat-status");m&&(m.textContent="COMPLETE")}else if(t==="error"){const m=document.getElementById("nf-stat-status");m&&(m.textContent="ERROR")}const u=document.getElementById("nf-stat-progress");u&&(o!==void 0&&o>0?u.textContent=`${Math.min(100,o)}%`:t==="active"&&(u.textContent="—"))}function A(e,t,o){if(!U)return;for(const a of ft)for(const p of a.steps)p.id===e&&(p.status=t,o!==void 0&&(p.progress=o));for(const a of J)a.stepId===e&&(a.status=t,o!==void 0&&(a.progress=o));const r=document.getElementById(`nf-step-${e}`);if(r&&(r.className="nf-step",t==="active"?r.classList.add("nf-step-active"):t==="done"?r.classList.add("nf-step-done"):t==="error"&&r.classList.add("nf-step-error")),rn(e,t,o),o!==void 0){const a=document.getElementById(`nf-bar-${e}`);a&&(a.style.width=`${Math.min(100,o)}%`)}Qt(),Kt()}function It(e){A(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function Nt(e=4e3){we(),Se(),Qt(),Kt(),setTimeout(()=>Re(),e)}function Qt(){for(const e of ft){const t=e.steps.filter(s=>s.status!=="skipped").length,o=e.steps.filter(s=>s.status==="done").length,r=e.steps.some(s=>s.status==="active"),a=t>0?Math.round(o/t*100):0,p=document.getElementById(`nf-pct-${e.id}`);p&&(p.textContent=`${a}%`);const i=document.getElementById(`nf-modbar-${e.id}`);i&&(i.style.width=`${a}%`);const l=document.getElementById(`nf-mod-${e.id}`);l&&(l.classList.remove("nf-active","nf-done"),a>=100?l.classList.add("nf-done"):r&&l.classList.add("nf-active"))}}function sn(e){var r,a,p,i;Ct=e;const t=new Map;for(const l of J)t.set(l.stepId,{status:l.status,progress:l.progress});J=jt(e);for(const l of J){const s=t.get(l.stepId);s&&(l.status=s.status,s.progress!==void 0&&(l.progress=s.progress))}if(he(),e>1){const l=ft.find(s=>s.id==="video");if(l){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((r=l.steps.find(d=>d.id==="animate"))==null?void 0:r.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((a=l.steps.find(d=>d.id==="vid-prompt"))==null?void 0:a.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((p=l.steps.find(d=>d.id==="vid-generate"))==null?void 0:p.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((i=l.steps.find(d=>d.id==="vid-wait"))==null?void 0:i.status)||"waiting",progress:0}];for(let d=2;d<=e;d++)s.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),s.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),s.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});l.steps=s,ee(l)}}const o=ft.find(l=>l.id==="render");if(o&&e>1){const l=o.steps.find(d=>d.id==="download");l&&(l.label="ดาวน์โหลด 720p");const s=o.steps.find(d=>d.id==="upscale");s&&(s.label="Full Video"),ee(o)}Qt(),Kt()}function ee(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(a=>a.remove()),e.steps.forEach(a=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${a.id}`;let i="";a.progress!==void 0&&(i=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${i}
        `,t.appendChild(p)});const r=document.createElement("div");r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(r)}function Lt(e){e.replace(/^\[Netflow AI\]\s*/,"")}let St=null,vt=null;const ln=new Promise(e=>{vt=e,setTimeout(()=>e(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},e=>{!chrome.runtime.lastError&&(e!=null&&e.tabId)&&(St=e.tabId,console.log(`[Netflow AI] Tab ID: ${St}`)),vt&&(vt(St),vt=null)})}catch{vt&&(vt(null),vt=null)}function mt(){return St?`netflow_pending_action_${St}`:"netflow_pending_action"}function Be(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Lt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},R=e=>{console.warn(`[Netflow AI] ${e}`);try{Lt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}};(()=>{const e=(o,r)=>{const a=o.tagName.toLowerCase(),p=o.id?`#${o.id}`:"",i=o.className&&typeof o.className=="string"?"."+o.className.trim().split(/\s+/).join("."):"",l=o.getBoundingClientRect(),s={};for(const c of o.attributes)["class","id","style"].includes(c.name)||(s[c.name]=c.value.length>80?c.value.slice(0,80)+"…":c.value);const d=(o.textContent||"").trim().slice(0,120),u=Array.from(o.querySelectorAll('i, [class*="icon"]')).map(c=>{var h;return(h=c.textContent)==null?void 0:h.trim()}).filter(Boolean).join(", "),m=[];let y=o.parentElement;for(let c=0;c<5&&y;c++){const h=y.tagName.toLowerCase(),I=y.id?`#${y.id}`:"",F=y.className&&typeof y.className=="string"?"."+y.className.trim().split(/\s+/).slice(0,2).join("."):"";m.push(`${h}${I}${F}`),y=y.parentElement}const O=r==="click"?`%c🖱️ CLICK %c<${a}${p}${i}>`:`%c👆 HOVER %c<${a}${p}${i}>`;console.groupCollapsed(O,r==="click"?"background:#e74c3c;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold":"background:#3498db;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold","color:#f39c12;font-weight:bold"),console.log("Element:",o),console.log("Selector:",`${a}${p}${i}`),console.log("Rect:",{x:Math.round(l.x),y:Math.round(l.y),w:Math.round(l.width),h:Math.round(l.height)}),Object.keys(s).length&&console.log("Attributes:",s),d&&console.log("Text:",d),u&&console.log("Icons:",u),m.length&&console.log("Ancestors:",m.join(" > ")),console.groupEnd()};document.addEventListener("click",o=>{const r=o.target;r!=null&&r.closest("#netflow-engine-overlay")||e(r,"click")},!0);let t=null;document.addEventListener("mouseover",o=>{const r=o.target;r!==t&&(r!=null&&r.closest("#netflow-engine-overlay")||(t=r,e(r,"hover")))},!0),console.log("%c[Netflow AI] 🔍 Debug Element Inspector ACTIVE — click/hover elements to inspect","background:#2ecc71;color:#000;padding:4px 8px;border-radius:4px;font-weight:bold")})();function ne(e=3e3){n(`🔒 จะปิดแท็บ automation ใน ${e/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},t=>{chrome.runtime.lastError?R(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${t==null?void 0:t.message}`)})}catch(t){R(`ปิดแท็บผิดพลาด: ${t.message}`)}},e)}async function oe(){try{if(await new Promise(a=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},p=>{if(chrome.runtime.lastError){a(!1);return}a(!!(p!=null&&p.cached))})}catch{a(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const a=document.querySelectorAll("video");for(const p of a){const i=p.src||p.currentSrc||"";if(i)return i}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const t=document.querySelectorAll("video");let o=null,r=0;for(const a of t){let p=a.src||"";if(!p){const s=a.querySelector("source");s&&(p=s.getAttribute("src")||"")}if(!p&&a.currentSrc&&(p=a.currentSrc),!p)continue;if(tt()){o||(o=p,r=1);continue}const i=a.getBoundingClientRect(),l=i.width*i.height;i.width>50&&l>r&&(r=l,o=p)}if(!o)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${o.substring(0,80)}... (area=${r.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const a=await fetch(o);if(!a.ok)return n(`[TikTok] fetch failed: HTTP ${a.status}`),await De(o),o;const p=await a.blob(),i=(p.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${i} MB, type: ${p.type}`),p.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${p.size} bytes) — อาจเป็น thumbnail`);const l=await new Promise((s,d)=>{const u=new FileReader;u.onloadend=()=>s(u.result),u.onerror=()=>d(new Error("FileReader error")),u.readAsDataURL(p)});n(`[TikTok] Data URL พร้อม: ${(l.length/1024/1024).toFixed(1)} MB`),await new Promise(s=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:l},d=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):d!=null&&d.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${d==null?void 0:d.error}`),s()})})}catch(a){n(`[TikTok] Content script fetch error: ${a.message}`),await De(o)}return o}catch(e){return n(`[TikTok] captureVideoUrl error: ${e.message}`),null}}async function De(e){if(e.startsWith("https://"))try{await new Promise(t=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched via background: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),t()})})}catch{}}function ie(e){if(e){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:e,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const j=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),ae=/Win/i.test(navigator.userAgent),Oe=j?"🍎 Mac":ae?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${Oe}`),window.__VIDEO_COMPLETE_SENT__=!1;class re extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Ft=null,$t=null,Ne=!1;const _t=new Map;let Le=0;function cn(){if(Ft)return Ft;try{const e=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Ft=new Worker(URL.createObjectURL(e)),Ft.onmessage=t=>{const o=_t.get(t.data);o&&(_t.delete(t.data),o())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Ft}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function dn(){if($t)return $t;if(Ne)return null;try{return $t=chrome.runtime.connect({name:"timer"}),$t.onMessage.addListener(e=>{const t=_t.get(e.id);t&&(_t.delete(e.id),t())}),$t.onDisconnect.addListener(()=>{$t=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),$t}catch{return Ne=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const f=e=>new Promise((t,o)=>{if(window.__NETFLOW_STOP__)return o(new re);let r=!1;const a=()=>{if(!r){if(r=!0,window.__NETFLOW_STOP__)return o(new re);t()}};setTimeout(a,e);const p=cn();if(p){const s=++Le;_t.set(s,a),p.postMessage({id:s,ms:e});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e+2e3},()=>{chrome.runtime.lastError||a()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e},()=>{chrome.runtime.lastError?setTimeout(a,e):a()});return}catch{}const i=dn();if(i){const s=++Le;_t.set(s,a),i.postMessage({cmd:"delay",id:s,ms:e});return}const l=setTimeout(a,e);f._lastId=l});function Et(){return!!window.__NETFLOW_STOP__}const tt=()=>document.hidden;let Fe=0;async function kt(){if(!document.hidden)return!1;const e=Date.now();if(e-Fe<15e3)return!1;Fe=e;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await f(1500),!0}catch{return!1}}async function wt(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(t=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>t()));const e=Date.now();for(;document.hidden&&Date.now()-e<5e3;)await f(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function ze(){var o;const e=["audio generation failed","couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","might violate","violate our policies","อาจละเมิด","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const r of t){if(r.closest("#netflow-engine-overlay"))continue;const a=(r.textContent||"").trim().toLowerCase();if(!(a.length>200||a.length<5)){for(const p of e)if(a.includes(p))return((o=r.textContent)==null?void 0:o.trim())||p}}return null}function pn(e){let t=e;const o=[/STRICT FACE & HEAD LOCK:[^.]*\./gi,/BODY LOCK:[^.]*\./gi,/HAIR LOCK:[^.]*\./gi,/FACE LOCK[^.]*\./gi,/PRODUCT IDENTITY LOCK:[^.]*\./gi,/LABEL LOCK:[^.]*\./gi,/PRODUCT EVERY FRAME:[^.]*\./gi,/TRANSITION STABILITY:[^.]*\./gi,/ANTI[_-]DUPLICATION:[^.]*\./gi,/ANTI[_-]TEXT[^.]*\./gi,/ANTI[_-]MORPH[^.]*\./gi,/ANTI[_-]DISTORTION[^.]*\./gi,/ANTI[_-]ADDITION[^.]*\./gi,/ANTI[_-]FLOATING[^.]*\./gi,/PROPS vs PRODUCT:[^.]*\./gi,/BRAND IDENTITY FREEZE[^.]*\./gi,/BRAND MORPHING[^.]*\./gi,/PRODUCT SIZE \(CRITICAL\):[^.]*\./gi,/PRODUCT SIZE REALISM:[^.]*\./gi,/VOICE DISCIPLINE:[^.]*\./gi,/ZERO INVENTION:[^.]*\./gi,/REALISM:[^.]*\./gi,/SCREEN CONTENT[^.]*\./gi,/SINGLE UTENSIL RULE[^.]*\./gi,/PRODUCT LOCK[^.]*\./gi,/FACE & HEAD LOCK[^.]*\./gi,/CLOTHING FIDELITY[^.]*\./gi,/FRONT[_-]FACING[^.]*\./gi];for(const i of o)t=t.replace(i,"");const r=["DO NOT","NEVER","FORBIDDEN","MUST NOT","ABSOLUTELY NO","IMMUTABLE","LOCKED","HIGHEST PRIORITY","#1 FORBIDDEN","Do NOT let","Do NOT add","Do NOT generate","Do NOT simplify","Do NOT invent","ZERO on-screen","NO split screen","NO collage","NO side-by-side","NO divided frames","never morph","never simplify","never change shape","never disappear","never be hidden","never exit","BRAND MORPHING IS","objects MUST NOT magically"];return t=t.split(/(?<=[.!])\s+/).filter(i=>!r.some(l=>i.includes(l))).join(" "),t=t.replace(/\s{2,}/g," ").trim(),t.length>1200&&(t=t.replace(/Render with extreme surface detail[^.]*\./gi,""),t=t.replace(/High-fidelity visual detail[^.]*\./gi,""),t=t.replace(/Product lit with soft rim light[^.]*\./gi,""),t=t.replace(/visible material texture[^.]*\./gi,""),t=t.replace(/Fluid motion, cinematic motion blur[^.]*\./gi,""),t=t.replace(/AI-observed appearance:[^.]*\./gi,""),t=t.replace(/Reference clothing:[^.]*\./gi,""),t=t.replace(/\s{2,}/g," ").trim()),n(`🛡️ Safe retry prompt: ${e.length} → ${t.length} chars (${Math.round((1-t.length/e.length)*100)}% reduction)`),t}async function rt(e){if(tt()){e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),e.click();return}const t=e.getBoundingClientRect(),o=t.left+t.width/2,r=t.top+t.height/2,a={bubbles:!0,cancelable:!0,clientX:o,clientY:r,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",a)),await f(80),e.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",a)),e.dispatchEvent(new MouseEvent("click",a)),await f(50),e.click()}function zt(e){const t=e.getBoundingClientRect(),o=t.left+t.width/2,r=t.top+t.height/2,a={bubbles:!0,cancelable:!0,clientX:o,clientY:r};e.dispatchEvent(new PointerEvent("pointerenter",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",a)),e.dispatchEvent(new PointerEvent("pointerover",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",a)),e.dispatchEvent(new PointerEvent("pointermove",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",a))}function fn(e){const t=[],o=document.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols'], [data-icon]");for(const r of o){if((r.textContent||"").trim()!==e)continue;let p=r,i=null,l=1/0;for(let s=0;s<20&&p&&(p=p.parentElement,!(!p||p===document.body));s++){if(tt()){s>=3&&p.children.length>0&&!i&&(i=p);continue}const d=p.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const u=d.width*d.height;u<l&&(i=p,l=u)}}i&&!t.includes(i)&&t.push(i)}return t.sort((r,a)=>{const p=r.getBoundingClientRect(),i=a.getBoundingClientRect();return p.left-i.left}),t}function se(e=!1){const t=[],o=document.querySelectorAll("video");for(const i of o){let l=i.parentElement;for(let s=0;s<10&&l;s++){if(tt()){if(s>=3&&l.children.length>0){t.push({el:l,left:0});break}l=l.parentElement;continue}const d=l.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){t.push({el:l,left:d.left});break}l=l.parentElement}}const r=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const i of r){const l=(i.textContent||"").trim();if(l==="play_arrow"||l==="play_circle"||l==="videocam"){let s=i.parentElement;for(let d=0;d<10&&s;d++){if(tt()){if(d>=3&&s.children.length>0){t.push({el:s,left:0});break}s=s.parentElement;continue}const u=s.getBoundingClientRect();if(u.width>120&&u.height>80&&u.width<window.innerWidth*.7&&u.top>=-50&&u.left<window.innerWidth*.75){t.push({el:s,left:u.left});break}s=s.parentElement}}}const a=document.querySelectorAll("img");for(const i of a){const l=(i.alt||"").toLowerCase();if(l.includes("video")||l.includes("วิดีโอ")){let s=i.parentElement;for(let d=0;d<10&&s;d++){if(tt()){if(d>=3&&s.children.length>0){t.push({el:s,left:0});break}s=s.parentElement;continue}const u=s.getBoundingClientRect();if(u.width>120&&u.height>80&&u.width<window.innerWidth*.7&&u.top>=-50&&u.left<window.innerWidth*.75){t.push({el:s,left:u.left});break}s=s.parentElement}}}const p=Array.from(new Set(t.map(i=>i.el))).map(i=>t.find(l=>l.el===i));if(p.sort((i,l)=>i.left-l.left),p.length>0){const i=p[0].el,l=i.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${l.left.toFixed(0)},${l.top.toFixed(0)}) ขนาด ${l.width.toFixed(0)}x${l.height.toFixed(0)}`),i}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function un(){const e=fn("image");if(e.length>0){const o=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${o.left.toFixed(0)},${o.top.toFixed(0)}) ขนาด ${o.width.toFixed(0)}x${o.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const o of t){let r=o.parentElement;for(let a=0;a<10&&r;a++){if(tt()){if(a>=3&&r.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),r;r=r.parentElement;continue}const p=r.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${p.left.toFixed(0)},${p.top.toFixed(0)})`),r;r=r.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function gn(e,t){var l;const[o,r]=e.split(","),a=((l=o.match(/:(.*?);/))==null?void 0:l[1])||"image/png",p=atob(r),i=new Uint8Array(p.length);for(let s=0;s<p.length;s++)i[s]=p.charCodeAt(s);return new File([i],t,{type:a})}async function mn(e,t=1024,o=.8){try{if(e.length<5e5)return n(`🗜️ รูปเล็กพอ (${(e.length/1024).toFixed(0)} KB base64) — ไม่บีบอัด`),e;n(`🗜️ รูปใหญ่ (${(e.length/1024).toFixed(0)} KB base64) — กำลังบีบอัด...`);const r=new Image;await new Promise((u,m)=>{r.onload=()=>u(),r.onerror=()=>m(new Error("Image load failed")),r.src=e});let{width:p,height:i}=r;if(p>t||i>t){const u=t/Math.max(p,i);p=Math.round(p*u),i=Math.round(i*u)}const l=document.createElement("canvas");l.width=p,l.height=i;const s=l.getContext("2d");if(!s)return e;s.drawImage(r,0,0,p,i);const d=l.toDataURL("image/jpeg",o);return n(`🗜️ บีบอัดแล้ว: ${(e.length/1024).toFixed(0)} KB → ${(d.length/1024).toFixed(0)} KB (${p}x${i})`),l.width=0,l.height=0,d}catch(r){return R(`🗜️ บีบอัดล้มเหลว: ${r.message} — ใช้รูปต้นฉบับ`),e}}function ht(e){var a;const t=[],o=new WeakSet,r=["i.google-symbols","i[class*='google-symbols']",".material-symbols-outlined",".material-icons",".material-symbols-rounded",".material-symbols-sharp","i[class*='material']","span[class*='material']","i[class*='icon']","span[class*='icon']","[data-icon]","[class*='gm-icon']","[class*='gmat-icon']","i"];for(const p of r){for(const i of document.querySelectorAll(p))if(((a=i.textContent)==null?void 0:a.trim())===e){const l=i.closest("button");l&&!o.has(l)&&(o.add(l),t.push(l))}if(t.length>0)break}if(t.length===0)for(const p of document.querySelectorAll("button")){const i=(p.getAttribute("aria-label")||"").toLowerCase();(i===e.toLowerCase()||i.includes(e.toLowerCase()))&&(o.has(p)||(o.add(p),t.push(p)))}return t}async function hn(e=5e3){const t=Date.now();for(;Date.now()-t<e;){const o=document.querySelectorAll('input[type="file"]');if(o.length>0)return o[o.length-1];await f(300)}return null}function le(){const e=["add","add_2","add_circle","add_circle_outline","attach_file","attach_file_add","attachment","note_add"];let t=[];for(const i of e)if(t=ht(i),t.length>0)break;if(t.length>0){let i=null,l=0;for(const s of t){const d=s.getBoundingClientRect();d.y>l&&(l=d.y,i=s)}if(i)return n(`พบปุ่ม "+" ของ Prompt Bar (icon) ที่ y=${l.toFixed(0)}`),i}n("ไม่พบปุ่มเพิ่มจากไอคอน — ลอง fallback ทั้งหมด");const o=["add","attach","upload","create","insert","plus","เพิ่ม","แนบ","อัปโหลด","สร้าง"];for(const i of document.querySelectorAll("button")){const l=(i.getAttribute("aria-label")||"").toLowerCase(),s=(i.getAttribute("title")||"").toLowerCase();if(o.some(d=>l.includes(d)||s.includes(d))){if(tt())return n('พบปุ่ม "+" (aria/title) hidden mode'),i;const d=i.getBoundingClientRect();if(d.bottom>window.innerHeight*.6&&d.width<80&&d.height<80)return n(`พบปุ่ม "+" (aria="${l}" title="${s}") ที่ y=${d.y.toFixed(0)}`),i}}const r=document.querySelectorAll("button");for(const i of r){const l=(i.textContent||"").trim();if(l!=="+"&&l!=="add"&&l!=="Add")continue;if(tt())return i;const s=i.getBoundingClientRect();if(s.bottom>window.innerHeight*.6&&s.width<80&&s.height<80)return n(`พบปุ่ม "+" (text="${l}") ที่ y=${s.y.toFixed(0)}`),i}const a=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');if(a){const i=a.getBoundingClientRect();let l=null,s=1/0;for(const d of r){const u=d.getBoundingClientRect();if(u.width<10||u.height<10||u.width>100||u.height>100||Math.abs(u.top-i.top)>80)continue;const m=Math.abs(u.left-i.left)+Math.abs(u.top-i.top);m<s&&(s=m,l=d)}if(l)return n(`พบปุ่ม "+" (ใกล้ prompt bar, dist=${s.toFixed(0)})`),l}for(const i of r){const l=i.querySelector("svg");if(!l)continue;const s=l.querySelectorAll("path, line, polygon"),d=Array.from(s).map(u=>u.getAttribute("d")||"").join(" ");if(d.includes("M12")||d.includes("M11")||d.includes("M10")){if(tt())return i;const u=i.getBoundingClientRect();if(u.bottom>window.innerHeight*.6&&u.width<80&&u.height<80)return n(`พบปุ่ม "+" (SVG) ที่ y=${u.y.toFixed(0)}`),i}}const p=[];for(const i of r){const l=i.getBoundingClientRect();if(l.bottom>window.innerHeight*.6&&l.width>0){const s=(i.textContent||"").trim().substring(0,30),d=i.getAttribute("aria-label")||"",u=(i.className||"").substring(0,40),m=i.querySelector("i, span[class*='icon'], svg")?"has-icon":"no-icon";p.push(`"${s}" aria="${d}" cls="${u}" ${m} y=${l.y.toFixed(0)}`)}}return R(`ไม่พบปุ่ม "+" — ปุ่มที่พบบริเวณล่าง (${p.length}): ${p.slice(0,5).join(" | ")}`),null}function ce(){for(const r of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const a=ht(r);let p=null,i=0;for(const l of a){const s=l.getBoundingClientRect();s.y>i&&(i=s.y,p=l)}if(p)return n(`พบปุ่ม Generate จากไอคอน "${r}" ที่ y=${i.toFixed(0)}`),p}const e=document.querySelectorAll("button");let t=null,o=0;for(const r of e){if(tt())break;const a=r.getBoundingClientRect();if(a.bottom>window.innerHeight*.7&&a.right>window.innerWidth*.5){const p=Math.abs(a.width-a.height)<10&&a.width<60,i=a.y+a.x+(p?1e3:0);i>o&&(o=i,t=r)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const r of e){const a=(r.getAttribute("aria-label")||"").toLowerCase();if(a.includes("generate")||a.includes("submit")||a.includes("send")||a.includes("สร้าง"))return r}return null}function de(){const e=document.querySelectorAll("textarea");for(const r of e)if(tt()||r.getBoundingClientRect().bottom>window.innerHeight*.5)return r;const t=document.querySelectorAll('[contenteditable="true"]');for(const r of t)if(tt()||r.getBoundingClientRect().bottom>window.innerHeight*.5)return r;const o=document.querySelectorAll("input[type='text'], input:not([type])");for(const r of o){const a=r.placeholder||"";if(a.includes("สร้าง")||a.includes("prompt")||a.includes("describe"))return r}return e.length>0?e[e.length-1]:null}async function Vt(e,t){var o,r,a,p;e.focus(),await f(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const i=new DataTransfer;i.setData("text/plain",t),i.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:i});e.dispatchEvent(l),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const s=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:i});e.dispatchEvent(s),await f(800);const d=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(i){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await f(100);const i=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(i);const l=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(l),await f(800);const s=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(i){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await f(200);const i=new DataTransfer;i.setData("text/plain",t),i.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const l=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:i});e.dispatchEvent(l),await f(800);const s=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(i){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((o=navigator.clipboard)!=null&&o.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const l=document.createElement("textarea");l.value=t,l.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(l),l.focus(),l.select(),document.execCommand("copy"),document.body.removeChild(l),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await f(200),document.execCommand("paste"),await f(500);const i=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(i.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${i.length} ตัวอักษร)`);return}}catch(i){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const i=Object.keys(e).find(l=>l.startsWith("__reactFiber$")||l.startsWith("__reactInternalInstance$"));if(i){let l=e[i];for(let s=0;s<30&&l;s++){const d=l.memoizedProps,u=l.memoizedState;if((r=d==null?void 0:d.editor)!=null&&r.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const m=d.editor;m.selection,m.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((p=(a=u==null?void 0:u.memoizedState)==null?void 0:a.editor)!=null&&p.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),u.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}l=l.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(i){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${i.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function At(){let e=0;const t=document.querySelectorAll("img");for(const r of t){if(r.closest("#netflow-engine-overlay")||!r.src)continue;if(tt()){e++;continue}const a=r.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&r.offsetParent!==null&&e++}const o=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const r of o){if(r.closest("#netflow-engine-overlay"))continue;if(tt()){e++;continue}const a=r.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&r.offsetParent!==null&&e++}return e}async function bn(e,t=5e3){var l;const o=Date.now(),r=["upload","upload_file","upload_2","cloud_upload","file_upload","add_photo_alternate","photo_library"],a=["upload image","อัปโหลดรูปภาพ","upload","อัปโหลด","upload file","add image","เพิ่มรูป","เพิ่มรูปภาพ"],p=new Set(["tab","tablist","tabpanel","navigation"]);for(;Date.now()-o<t;){const s=[],d=e.getAttribute("aria-controls");if(d){const m=document.getElementById(d);m&&s.push(m)}const u=e.getAttribute("aria-owns");if(u){const m=document.getElementById(u);m&&s.push(m)}for(const m of["[data-radix-portal]","[data-radix-popper-content-wrapper]",'[role="dialog"]','[role="menu"]','[role="listbox"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]","[data-radix-popover-content]",'[class*="popover"]','[class*="dropdown"]','[class*="menu-content"]','[class*="dialog"]'])for(const y of document.querySelectorAll(m))s.push(y);for(const m of s)for(const y of m.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[tabindex], a")){if(y===e)continue;const O=(y.getAttribute("role")||"").toLowerCase();if(p.has(O))continue;const C=y.querySelector("i, span[class*='icon'], span[class*='material']"),w=((l=C==null?void 0:C.textContent)==null?void 0:l.trim().toLowerCase())||"";if(r.includes(w))return n(`พบปุ่ม Upload (icon="${w}")`),y;const c=(y.textContent||"").trim().toLowerCase(),h=Array.from(y.querySelectorAll("span, div, p")).map(F=>{var D;return((D=F.textContent)==null?void 0:D.trim().toLowerCase())||""});if(a.some(F=>c===F||h.some(D=>D===F))){if(c==="image"||c==="video"||c==="รูปภาพ"||c==="วิดีโอ")continue;return n(`พบปุ่ม Upload (text="${c.substring(0,40)}")`),y}const I=(y.getAttribute("aria-label")||"").toLowerCase();if(a.some(F=>I.includes(F)))return n(`พบปุ่ม Upload (aria="${I}")`),y}if(Date.now()-o>t/2)for(const m of document.querySelectorAll("button, [role='menuitem']")){if(m===e)continue;const y=(m.getAttribute("role")||"").toLowerCase();if(p.has(y))continue;const O=(m.textContent||"").trim().toLowerCase();if(O==="image"||O==="video"||O==="รูปภาพ"||O==="วิดีโอ")continue;const C=m.getBoundingClientRect();if(!(C.width===0||C.height===0)&&a.some(w=>O===w||O.includes(w))&&O.length<50)return n(`พบปุ่ม Upload (global search, text="${O.substring(0,40)}")`),m}await f(500)}const i=[];for(const s of["[data-radix-portal]",'[role="dialog"]','[role="menu"]']){const d=document.querySelectorAll(s);if(d.length>0)for(const u of d){const m=u.querySelectorAll("button, [role='menuitem']");for(const y of m)i.push(`[${s}] "${(y.textContent||"").trim().substring(0,30)}"`)}}return R(`ไม่พบปุ่ม Upload — พบ elements ใน dialogs: ${i.slice(0,8).join(" | ")||"(ว่าง)"}`),null}async function Ve(e,t){n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const o=await mn(e),r=gn(o,t);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const a=At();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const p=j?1.8:1,i=HTMLInputElement.prototype.click,l=HTMLInputElement.prototype.showPicker,s=()=>{HTMLInputElement.prototype.click=function(){if(this.type==="file"){n("🚫 บล็อก file dialog จาก click()");return}return i.call(this)},typeof l=="function"&&(HTMLInputElement.prototype.showPicker=function(){if(this.type==="file"){n("🚫 บล็อก file dialog จาก showPicker()");return}return l.call(this)})},d=()=>{HTMLInputElement.prototype.click=i,typeof l=="function"&&(HTMLInputElement.prototype.showPicker=l)};s();try{n("── วิธี A: ฉีดไฟล์ลง file input โดยตรง (ไม่คลิก UI) ──");let u=Ue();if(u){if(n(`พบ file input: accept="${u.accept}" multiple=${u.multiple}`),await Ge(u,r,t,a))return!0;n("วิธี A ล้มเหลว — ลองวิธี B")}else n("ไม่พบ file input[accept=image/*] — ลองวิธี B");n("── วิธี B: คลิก '+' → เปิด dialog → ฉีดไฟล์ ──"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300);let m=le();if(m||(await f(2e3*p),m=le()),!m){const y=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');y&&(y.click(),await f(2e3*p)),m=le()}if(m){await rt(m),n("คลิกปุ่ม '+' (Create) ✅"),await f(1500*p);let y=await bn(m,j?5e3:3e3);if(y?(y.click(),n("คลิกปุ่ม Upload ✅"),await f(j?1500:800)):n("ไม่พบปุ่ม Upload ใน dialog — ลองฉีดไฟล์โดยตรง"),u=Ue(),u||(u=await hn(j?5e3:3e3)),u&&await Ge(u,r,t,a))return document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),!0;document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else R("ไม่พบปุ่ม '+' บน Prompt Bar");return n("── วิธี C: drag-drop ──"),await wn(r,a)}finally{setTimeout(()=>d(),1e4)}}function Ue(){const e=document.querySelectorAll('input[type="file"][accept*="image"]');if(e.length>0)return e[e.length-1];const t=document.querySelectorAll('input[type="file"]');return t.length>0?t[t.length-1]:null}async function Ge(e,t,o,r){var s,d;const a=new DataTransfer;a.items.add(t),e.files=a.files,n(`ฉีดไฟล์ ${o} เข้า file input (${((s=e.files)==null?void 0:s.length)??0} ไฟล์)`);const p=e._valueTracker;p&&(p.setValue(""),n("รีเซ็ต React _valueTracker")),e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));try{const u=(d=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"files"))==null?void 0:d.set;u&&(u.call(e,a.files),e.dispatchEvent(new Event("change",{bubbles:!0})))}catch{}n("ส่ง change + input event ✅"),n("── รอยืนยันรูปย่อ ──");const i=Date.now();let l=!1;for(;Date.now()-i<2e4;){const u=At();if(u>r)return n(`✅ ยืนยัน: รูปย่อเพิ่มจาก ${r} → ${u}`),!0;const m=document.querySelectorAll("span, div, p");for(const y of m){if(y.closest("#netflow-engine-overlay"))continue;const O=(y.textContent||"").trim();if(/^\d{1,2}%$/.test(O)){n(`กำลังอัพโหลด: ${O}`),l=!0;break}}if(l&&!Array.from(document.querySelectorAll("span, div, p")).some(O=>!O.closest("#netflow-engine-overlay")&&/^\d{1,2}%$/.test((O.textContent||"").trim()))){await f(1e3);const O=At();return O>r?(n(`✅ ยืนยัน (หลัง upload เสร็จ): รูปย่อ ${r} → ${O}`),!0):(n("✅ ยอมรับ: เห็น upload % แล้วหายไป — น่าจะอัพโหลดสำเร็จ"),!0)}await f(1e3)}return R(`❌ อัพโหลด ${o} ล้มเหลว — ไม่พบรูปย่อใหม่หลัง 20 วินาที`),!1}async function wn(e,t){n("── Fallback: drag-and-drop ลงบน workspace ──");const o=new DataTransfer;o.items.add(e);let r=null;const a=document.querySelectorAll('[class*="workspace"], [class*="drop"], [class*="media"], main, [role="main"]');for(const u of a){const m=u.getBoundingClientRect();if(m.width>200&&m.height>200){r=u;break}}r||(r=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)||document.body);const p=r.getBoundingClientRect(),i=p.left+p.width/2,l=p.top+p.height/2,s={bubbles:!0,cancelable:!0,clientX:i,clientY:l,dataTransfer:o};r.dispatchEvent(new DragEvent("dragenter",s)),await f(100),r.dispatchEvent(new DragEvent("dragover",s)),await f(100),r.dispatchEvent(new DragEvent("drop",s)),n(`ส่ง drag-drop ลง <${r.tagName}>`);const d=Date.now();for(;Date.now()-d<8e3;){if(At()>t)return n("✅ drag-drop สำเร็จ — พบรูปย่อใหม่"),!0;await f(1e3)}return R("❌ drag-drop ล้มเหลว — ไม่พบรูปย่อใหม่"),!1}async function xn(e,t){var O;n("=== ขั้น 0: ตั้งค่า Flow ===");let o=null;for(let C=0;C<10;C++){const w=document.querySelectorAll("button, div, span, [role='button']");for(const h of w){const I=(h.textContent||"").trim();if(!(I.length>80)&&(I.includes("Nano Banana")||I.includes("Imagen")||I.includes("วิดีโอ")||I.includes("รูปภาพ")||I.includes("Image")||I.includes("Video"))){const F=h.getBoundingClientRect();F.bottom>window.innerHeight*.7&&F.width>30&&F.height>10&&(!o||(h.textContent||"").length<(o.textContent||"").length)&&(o=h)}}if(o){n(`พบปุ่มตั้งค่าจากข้อความ: "${(o.textContent||"").substring(0,40).trim()}"`);break}const c=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons, .material-symbols-rounded, span[class*='material'], span[class*='icon'], i");for(const h of c){const I=((O=h.textContent)==null?void 0:O.trim())||"";if(I.includes("crop")||I==="aspect_ratio"||I==="photo_size_select_large"){const F=h.closest("button, div[role='button'], [role='button']")||h.parentElement;if(F){const D=F.getBoundingClientRect();if(D.bottom>window.innerHeight*.7&&D.width>0){o=F,n(`พบปุ่มตั้งค่าจากไอคอน: ${I}`);break}}}}if(o)break;for(const h of w){const I=(h.textContent||"").trim();if(!(I.length>40)&&/x[1-4]/.test(I)&&(I.includes("วิดีโอ")||I.includes("รูปภาพ")||I.includes("Video")||I.includes("Image"))){const F=h.getBoundingClientRect();if(F.bottom>window.innerHeight*.7&&F.width>30){o=h,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${I.substring(0,40)}"`);break}}}if(o)break;n(`⏳ รอปุ่มตั้งค่า... (${C+1}/10)`),await f(1e3)}if(!o)return R("ไม่พบปุ่มตั้งค่า (หมด 10 รอบ)"),!1;const r=o.getBoundingClientRect(),a=r.left+r.width/2,p=r.top+r.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:p,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",i)),await f(80),o.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",i)),o.dispatchEvent(new MouseEvent("click",i)),n("คลิกปุ่มตั้งค่าแล้ว"),await f(2500);let l=!1,s=null;const d=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const C of d){const w=C.getAttribute("aria-controls")||"",c=C.id||"";if(w.toUpperCase().includes("IMAGE")||c.toUpperCase().includes("IMAGE")){s=C,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${w})`);break}}if(!s)for(const C of document.querySelectorAll('[role="tab"]')){const w=C.id||"";if(w.toUpperCase().includes("TRIGGER-IMAGE")){s=C,n(`พบแท็บ Image ผ่าน id: ${w}`);break}}if(!s)for(const C of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const w=(C.textContent||"").trim();if(!(w.length>30)&&(w==="Image"||w.endsWith("Image")||w==="รูปภาพ"||w==="ภาพ"||w.includes("รูปภาพ"))&&!w.includes("Video")&&!w.includes("วิดีโอ")){const c=C.getBoundingClientRect();if(c.width>0&&c.height>0){s=C,n(`พบแท็บ Image ผ่านข้อความ: "${w}"`);break}}}if(s){const C=s.getAttribute("data-state")||"",w=s.getAttribute("aria-selected")||"";if(C==="active"||w==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const c=s.getBoundingClientRect(),h={bubbles:!0,cancelable:!0,clientX:c.left+c.width/2,clientY:c.top+c.height/2,button:0};s.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mousedown",h)),await f(80),s.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mouseup",h)),s.dispatchEvent(new MouseEvent("click",h)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await f(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const u=e==="horizontal"?"แนวนอน":"แนวตั้ง",m=e==="horizontal"?"landscape":"portrait";for(const C of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const w=(C.textContent||"").trim();if(!(w.length>30)&&(w===u||w.includes(u)||w.toLowerCase()===m||w.toLowerCase().includes(m))){const c=C.getBoundingClientRect(),h={bubbles:!0,cancelable:!0,clientX:c.left+c.width/2,clientY:c.top+c.height/2,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",h)),await f(80),C.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",h)),C.dispatchEvent(new MouseEvent("click",h)),n(`เลือกทิศทาง: ${u}`),await f(400);break}}const y=`x${t}`;for(const C of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const w=(C.textContent||"").trim();if(!(w.length>10)&&(w===y||w===`${t}`)){const c=C.getBoundingClientRect(),h={bubbles:!0,cancelable:!0,clientX:c.left+c.width/2,clientY:c.top+c.height/2,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",h)),await f(80),C.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",h)),C.dispatchEvent(new MouseEvent("click",h)),n(`เลือกจำนวน: ${y}`),await f(400);break}}return await f(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),o.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",i)),await f(80),o.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",i)),o.dispatchEvent(new MouseEvent("click",i)),n("ปิดหน้าตั้งค่าแล้ว"),await f(600),!0}async function yn(e){const t=e==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",o=e==="quality"?"Quality":"Fast",r=e==="quality"?"Fast":"Quality",a=e==="quality"?"คุณภาพ":"เร็ว",p=e==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${t} (${a}) ===`);let i=null;const l=Date.now()+1e4;for(;!i&&Date.now()<l;){const w=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const c of w){const h=(c.textContent||"").trim();if(!(h.length>80)&&(h.includes("Veo")||h.includes("veo"))&&(c.hasAttribute("aria-haspopup")||c.hasAttribute("aria-expanded")||c.getAttribute("role")==="combobox"||h.includes("arrow_drop_down")||c.querySelector("svg"))){i=c,n(`พบปุ่ม Veo dropdown (Strategy A): "${h.substring(0,50).trim()}"`);break}}if(!i)for(const c of w){const h=(c.textContent||"").trim();if(!(h.length>80)&&(h.includes("Veo")||h.includes("veo"))){const I=c.getBoundingClientRect();if(I.width>0&&I.height>0){i=c,n(`พบปุ่ม Veo dropdown (Strategy B): "${h.substring(0,50).trim()}"`);break}}}if(!i)for(const c of w){const h=(c.textContent||"").trim();if(!(h.length>50)&&(h.includes("Fast")||h.includes("Quality")||h.includes("เร็ว")||h.includes("คุณภาพ"))&&(c.hasAttribute("aria-haspopup")||c.hasAttribute("aria-expanded")||c.querySelector("svg"))){i=c,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${h.substring(0,50).trim()}"`);break}}if(!i){const c=document.querySelectorAll("div, span, button, [role='button']");for(const h of c){const I=(h.textContent||"").trim();if(I==="Veo 3.1 - Fast"||I==="Veo 3.1 - Quality"||I==="Fast"||I==="Quality"||I==="Veo 3.1 - เร็ว"||I==="Veo 3.1 - คุณภาพสูง"||I==="Veo 3.1 - คุณภาพ"||I==="Veo 2 - Fast"||I==="Veo 2 - Quality"){const F=h.getBoundingClientRect();if(F.width>0&&F.height>0){i=h,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${I}"`);break}}}}if(!i){const c=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const h of c){const I=(h.textContent||"").trim();if(!(I.length>60)&&(I.includes("3.1")||I.includes("model")||I.includes("โมเดล"))){const F=h.getBoundingClientRect();if(F.bottom>window.innerHeight*.4&&F.width>0&&F.height>0){i=h,n(`พบปุ่ม model selector (Strategy E): "${I.substring(0,50).trim()}"`);break}}}}i||await f(1e3)}if(!i)return R("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const s=(i.textContent||"").trim();if(s.includes(t)||s.includes(o)&&!s.includes(r)||s.includes(a)&&!s.includes(p))return n(`✅ Veo quality เป็น "${s}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const d=i.getBoundingClientRect(),u=d.left+d.width/2,m=d.top+d.height/2,y={bubbles:!0,cancelable:!0,clientX:u,clientY:m,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",y)),await f(80),i.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",y)),i.dispatchEvent(new MouseEvent("click",y)),n("คลิกเปิด Veo quality dropdown"),await f(1e3);let O=!1;const C=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const w of C){const c=(w.textContent||"").trim();if((c===t||c===o||c.includes(t)||c.includes(a))&&!c.includes("arrow_drop_down")){const I=w.getBoundingClientRect();if(I.width>0&&I.height>0){const F=I.left+I.width/2,D=I.top+I.height/2,L={bubbles:!0,cancelable:!0,clientX:F,clientY:D,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",L)),await f(80),w.dispatchEvent(new PointerEvent("pointerup",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",L)),w.dispatchEvent(new MouseEvent("click",L)),n(`✅ เลือก "${c}" สำเร็จ`),O=!0;break}}}return O?(await f(600),!0):(R(`ไม่พบตัวเลือก "${t}" หรือ "${a}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),!1)}async function vn(e){var I,F,D,L;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,o=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),r=o?o[1]:"unknown",a=j?"macOS":ae?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",p=j?((F=(I=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:I[1])==null?void 0:F.replace(/_/g,"."))||"":ae&&((D=t.match(/Windows NT ([0-9.]+)/))==null?void 0:D[1])||"",i=navigator.language||"unknown",l=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${a} ${p} | Chrome ${r}`),n(`🌐 ภาษา: ${i} | หน้าจอ: ${l} | แพลตฟอร์ม: ${Oe}`),n("══════════════════════════════════════════");try{qt(e.theme)}catch{}try{Xt(e.sceneCount||1)}catch(b){console.warn("Overlay show error:",b)}const s=[],d=[];if(e.needsNewProject){try{A("open-flow","done"),A("new-project","active"),n("=== สร้างโปรเจคใหม่ ===");let b=null;for(let _=0;_<15;_++){const B=document.querySelectorAll("button, [role='button']");for(const g of B){const v=(g.textContent||"").trim().toLowerCase();if(v.includes("new project")||v.includes("สร้างโปรเจค")||v.includes("โปรเจกต์ใหม่")){b=g;break}}if(!b){const g=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], i[class*='material'], span[class*='material'], span[class*='icon'], span[class*='google-symbols'], i");for(const v of g)if((v.textContent||"").trim()==="add_2"){const x=v.closest("button");if(x){b=x;break}}if(!b){const v=ht("add_2");v.length>0&&(b=v[0])}}if(b)break;n(`⏳ รอปุ่ม New Project... (${_+1}/15)`),await f(1e3)}if(b){n(`✅ พบปุ่ม New Project: "${(b.textContent||"").trim().substring(0,30)}"`),await rt(b),await f(500),await rt(b),await f(2e3);let _=!1;for(let B=0;B<20;B++){const g=document.body.innerText||"";if(g.includes("Start creating")||g.includes("เริ่มสร้าง")||g.includes("What do you want to create")||g.includes("drop media")||document.querySelector("textarea, input[placeholder]")){_=!0;break}await f(500)}n(_?"✅ Workspace พร้อมแล้ว":"⚠️ Workspace อาจยังไม่โหลดเสร็จ — ดำเนินการต่อ"),A("new-project","done"),s.push("✅ New Project")}else R("ไม่พบปุ่ม New Project — อาจอยู่ใน workspace แล้ว ดำเนินการต่อ"),A("new-project","skipped"),s.push("⚠️ New Project (skipped)")}catch(b){R(`New Project error: ${b.message}`),A("new-project","error"),s.push("⚠️ New Project")}await f(3e3)}else{try{A("open-flow","skipped")}catch{}try{A("new-project","skipped")}catch{}await f(3e3)}try{A("settings","active");const b=e.orientation||"vertical",_=e.outputCount||1,B=await xn(b,_);s.push(B?"✅ Settings":"⚠️ Settings"),A("settings",B?"done":"error")}catch(b){R(`ตั้งค่าผิดพลาด: ${b.message}`),s.push("⚠️ Settings"),A("settings","error")}try{const b=e.veoQuality||"fast";await yn(b)?(s.push(`✅ Veo ${b}`),n(`✅ Veo quality: ${b}`)):(s.push("⚠️ Veo quality"),R("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(b){R(`Veo quality error: ${b.message}`),s.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),await f(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const u=()=>{const b=document.querySelectorAll("span, div, p, label");for(const _ of b){const B=(_.textContent||"").trim();if(/^\d{1,3}%$/.test(B)){if(B==="100%")return null;const g=_.getBoundingClientRect();if(g.width>0&&g.height>0&&g.top>0&&g.top<window.innerHeight)return B}}return null},m=async b=>{n(`รอการอัพโหลด ${b} เสร็จ...`),await f(2e3);const _=Date.now(),B=6e4;let g="",v=Date.now();const x=15e3;for(;Date.now()-_<B;){const $=u();if($){if($!==g)g=$,v=Date.now(),n(`กำลังอัพโหลด: ${$} — รอ...`);else if(Date.now()-v>x){n(`✅ อัพโหลด ${b} — % ค้างที่ ${$} นาน ${x/1e3} วินาที ถือว่าเสร็จ`),await f(1e3);return}await f(1500)}else{n(`✅ อัพโหลด ${b} เสร็จ — ไม่พบตัวบอก %`),await f(1e3);return}}R(`⚠️ อัพโหลด ${b} หมดเวลาหลัง ${B/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){A("upload-char","active");try{const b=await Ve(e.characterImage,"character.png");s.push(b?"✅ ตัวละคร":"⚠️ ตัวละคร"),b||d.push("character upload failed"),A("upload-char",b?"done":"error")}catch(b){R(`อัพโหลดตัวละครผิดพลาด: ${b.message}`),s.push("❌ ตัวละคร"),d.push("character upload error"),A("upload-char","error")}await m("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else It("upload-char");if(e.productImage){A("upload-prod","active");try{const b=await Ve(e.productImage,"product.png");s.push(b?"✅ สินค้า":"⚠️ สินค้า"),b||d.push("product upload failed"),A("upload-prod",b?"done":"error")}catch(b){R(`อัพโหลดสินค้าผิดพลาด: ${b.message}`),s.push("❌ สินค้า"),d.push("product upload error"),A("upload-prod","error")}await m("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else It("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800);const y=u();y&&(n(`⚠️ อัพโหลดยังแสดง ${y} — รอเพิ่มเติม...`),await m("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await f(1e3);const O=(e.characterImage?1:0)+(e.productImage?1:0);if(O>0){let b=At();b<O&&(n(`⏳ เห็นรูปย่อแค่ ${b}/${O} — รอ 3 วินาที...`),await f(3e3),b=At()),b>=O?n(`✅ ยืนยันรูปย่ออ้างอิง: ${b}/${O}`):R(`⚠️ คาดว่าจะมี ${O} รูปย่อ แต่พบ ${b} — ดำเนินการต่อ`)}if(Et()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{Nt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),A("img-prompt","active"),await f(1e3);const C=de();C?(await Vt(C,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),s.push("✅ Prompt"),A("img-prompt","done")):(R("ไม่พบช่องป้อนข้อความ Prompt"),s.push("❌ Prompt"),d.push("prompt input not found"),A("img-prompt","error")),await f(800);const w=new Set;document.querySelectorAll("img").forEach(b=>{b.src&&w.add(b.src)}),n(`บันทึกรูปเดิม: ${w.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),A("img-generate","active"),await f(500);const c=ce();if(c){const b=c.getBoundingClientRect(),_=b.left+b.width/2,B=b.top+b.height/2,g={bubbles:!0,cancelable:!0,clientX:_,clientY:B,button:0};c.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",g)),await f(80),c.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",g)),c.dispatchEvent(new MouseEvent("click",g)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),s.push("✅ Generate"),await f(500),c.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",g)),await f(80),c.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",g)),c.dispatchEvent(new MouseEvent("click",g)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),A("img-generate","done")}else R("ไม่พบปุ่ม → Generate"),s.push("❌ Generate"),d.push("generate button not found"),A("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),A("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await f(15e3);const b=()=>{const x=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of x){if($.closest("#netflow-engine-overlay"))continue;const M=($.textContent||"").trim();if(M.length>10)continue;const E=M.match(/(\d{1,3})\s*%/);if(!E)continue;const k=parseInt(E[1],10);if(k<1||k>100)continue;if(tt())return k;const T=$.getBoundingClientRect();if(!(T.width===0||T.width>150)&&!(T.top<0||T.top>window.innerHeight))return k}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let _=null,B=-1,g=0;const v=Date.now();for(;!_&&Date.now()-v<18e4;){const x=document.querySelectorAll("img");for(const $ of x){if(w.has($.src)||!($.alt||"").toLowerCase().includes("generated"))continue;if(tt()?$.naturalWidth>120&&$.naturalHeight>120:(()=>{const k=$.getBoundingClientRect();return k.width>120&&k.height>120&&k.top>0&&k.top<window.innerHeight*.85})()){const k=$.closest("div");if(k){_=k,n(`พบรูป AI จาก alt="${$.alt}": ${$.src.substring(0,80)}...${tt()?" (hidden-mode)":""}`);break}}}if(!_)for(const $ of x){if(w.has($.src))continue;const M=$.closest("div"),E=(M==null?void 0:M.textContent)||"";if(E.includes("product.png")||E.includes("character.png")||E.includes(".png")||E.includes(".jpg"))continue;if(tt()?$.naturalWidth>120&&$.naturalHeight>120:(()=>{const T=$.getBoundingClientRect();return T.width>120&&T.height>120&&T.top>0&&T.top<window.innerHeight*.85})()){const T=$.closest("div");if(T){_=T,n(`พบรูปใหม่ (สำรอง): ${$.src.substring(0,80)}...${tt()?" (hidden-mode)":""}`);break}}}if(!_){if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const $=g>0?Date.now()-g:1/0;if(B<20||$>3e4){const E=ze();if(E){R(`❌ สร้างรูปล้มเหลว: ${E}`),d.push(`image gen failed: ${E}`),A("img-wait","error");break}}const M=b();if(M!==null)M!==B&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${M}%`),B=M,A("img-wait","active",M)),g=Date.now();else if(B>30){const E=Math.floor((Date.now()-g)/1e3);E>=3&&n(`🖼️ % หายที่ ${B}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&E>=5&&B>50&&(n("🍎 Tab ซ่อน + รูปน่าจะเสร็จ → เปิด tab เต็มเพื่อตรวจหารูป"),await wt(),await f(3e3))}document.hidden&&B>0&&Date.now()-g>1e4&&await kt(),document.hidden&&B<1&&Date.now()-v>3e4&&await kt(),await f(3e3)}}if(!_)R("หมดเวลารอรูปที่สร้าง"),s.push("⚠️ Wait Image"),A("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),s.push("✅ Image Found"),A("img-wait","done",100),await wt();const x=_.getBoundingClientRect(),$=x.left+x.width/2,M=x.top+x.height/2,E={bubbles:!0,cancelable:!0,clientX:$,clientY:M};_.dispatchEvent(new PointerEvent("pointerenter",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),_.dispatchEvent(new MouseEvent("mouseenter",E)),_.dispatchEvent(new PointerEvent("pointerover",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),_.dispatchEvent(new MouseEvent("mouseover",E)),_.dispatchEvent(new PointerEvent("pointermove",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),_.dispatchEvent(new MouseEvent("mousemove",E)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await f(1500);let k=null;for(const T of["more_vert","more_horiz","more"]){const G=ht(T);for(const S of G){const P=S.getBoundingClientRect();if(P.top>=x.top-20&&P.top<=x.bottom&&P.right>=x.right-150&&P.right<=x.right+20){k=S;break}}if(k)break}if(!k){const T=document.querySelectorAll("button");for(const G of T){const S=G.getBoundingClientRect();if(S.width<50&&S.height<50&&S.top>=x.top-10&&S.top<=x.top+60&&S.left>=x.right-80){const P=G.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const V of P)if((((L=V.textContent)==null?void 0:L.trim())||"").includes("more")){k=G;break}if(k)break;const z=G.getAttribute("aria-label")||"";if(z.includes("เพิ่มเติม")||z.includes("more")){k=G;break}}}}if(!k)R("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),s.push("⚠️ 3-dots");else{const T=k.getBoundingClientRect(),G=T.left+T.width/2,S=T.top+T.height/2,P={bubbles:!0,cancelable:!0,clientX:G,clientY:S,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",P)),await f(80),k.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",P)),k.dispatchEvent(new MouseEvent("click",P)),n("คลิกปุ่ม 3 จุดแล้ว"),await f(1500);let z=null;const V=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const q of V){const N=(q.textContent||"").trim();if(N.includes("ทำให้เป็นภาพเคลื่อนไหว")||N.includes("Animate")||N.includes("animate")){z=q;break}}if(!z)R("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),s.push("⚠️ Animate");else{const q=z.getBoundingClientRect(),N=q.left+q.width/2,K=q.top+q.height/2,H={bubbles:!0,cancelable:!0,clientX:N,clientY:K,button:0};z.dispatchEvent(new PointerEvent("pointerdown",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mousedown",H)),await f(80),z.dispatchEvent(new PointerEvent("pointerup",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mouseup",H)),z.dispatchEvent(new MouseEvent("click",H)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),s.push("✅ Animate"),A("animate","done"),await f(3e3)}}}}catch(b){R(`ขั้น 4 ผิดพลาด: ${b.message}`),s.push("⚠️ Animate")}if(Et()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{Nt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),A("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await f(3e3);let b=!1;const _=document.querySelectorAll("button, span, div");for(const x of _){const $=(x.textContent||"").trim(),M=x.getBoundingClientRect();if(($==="วิดีโอ"||$==="Video"||$.includes("วิดีโอ"))&&M.bottom>window.innerHeight*.7){b=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}b||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let B=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise($=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>$())),B=!0;const x=Date.now();for(;document.hidden&&Date.now()-x<5e3;)await f(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await f(1e3);let g=!1;for(let x=1;x<=5&&!g;x++){if(x>1&&document.hidden){n(`🔄 Retry ${x}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(k=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>k())),B=!0;const E=Date.now();for(;document.hidden&&Date.now()-E<5e3;)await f(200);document.hidden||await f(2e3)}catch{}}const $=de();if(!$){n(`⚠️ ครั้งที่ ${x}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await f(3e3);continue}x>1&&($.focus(),await f(500)),await Vt($,e.videoPrompt),await f(500);const M=($.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();M.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${x} (${M.length} ตัวอักษร)`),s.push("✅ Video Prompt"),A("vid-prompt","done"),g=!0):(n(`⚠️ ครั้งที่ ${x}: Prompt ไม่ถูกวาง (ได้ ${M.length} ตัวอักษร)`),await f(1500))}if(!g)throw R("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),s.push("❌ Video Prompt"),d.push("video prompt paste failed after 5 attempts"),A("vid-prompt","error"),new Error("Video prompt paste failed");await f(1e3),A("vid-generate","active");const v=ce();if(v){const x=v.getBoundingClientRect(),$=x.left+x.width/2,M=x.top+x.height/2,E={bubbles:!0,cancelable:!0,clientX:$,clientY:M,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",E)),await f(80),v.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",E)),v.dispatchEvent(new MouseEvent("click",E)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),s.push("✅ Video Generate"),A("vid-generate","done"),await f(500),v.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",E)),await f(80),v.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",E)),v.dispatchEvent(new MouseEvent("click",E)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else R("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),s.push("❌ Video Generate"),d.push("video generate button not found"),A("vid-generate","error");if(B){await f(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(b){R(`ขั้น 5 ผิดพลาด: ${b.message}`),s.push("⚠️ Video Gen"),d.push(`video gen error: ${b.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),It("animate"),It("vid-prompt"),It("vid-generate"),It("vid-wait");if(e.videoPrompt){A("vid-wait","active");const b=e.sceneCount||1,_=e.videoScenePrompts||[e.videoPrompt];if(b>1)try{sn(b)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${b>1?`ต่อ ${b} ฉาก`:"ดาวน์โหลด"} ===`);const B=()=>{const x=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of x){if($.closest("#netflow-engine-overlay"))continue;const M=($.textContent||"").trim();if(M.length>10)continue;const E=M.match(/(\d{1,3})\s*%/);if(!E)continue;const k=parseInt(E[1],10);if(k<1||k>100)continue;if(tt())return k;const T=$.getBoundingClientRect();if(!(T.width===0||T.width>150)&&!(T.top<0||T.top>window.innerHeight))return k}return null},g=async(x=6e5)=>{n("รอการสร้างวิดีโอ..."),A("vid-wait","active"),await f(5e3);const $=()=>{const Y=document.querySelectorAll("div, span, p, label, strong, small");let X=0;for(const nt of Y){if(nt.closest("#netflow-engine-overlay"))continue;const W=(nt.textContent||"").trim();if(W.includes("%")&&W.length<15){const it=nt.tagName.toLowerCase(),ot=nt.className&&typeof nt.className=="string"?nt.className.split(/\s+/).slice(0,2).join(" "):"",Z=nt.getBoundingClientRect();if(n(`  🔍 "${W}" ใน <${it}.${ot}> ที่ (${Z.left.toFixed(0)},${Z.top.toFixed(0)}) w=${Z.width.toFixed(0)}`),X++,X>=5)break}}X===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},M=async(Y,X)=>{n(`🔄 Policy Retry ${X}/2 — สร้าง Safe Prompt แล้วลองใหม่...`),await wt(),await f(2e3);const nt=de();if(!nt)return R("❌ Retry: ไม่พบช่อง Prompt"),!1;nt.focus(),await f(300);const W=window.getSelection();W&&W.selectAllChildren(nt),await f(200),nt.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"deleteContentBackward"})),nt.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"deleteContentBackward"})),await f(500);let it=pn(Y);X>=2&&(it=it.substring(0,600).replace(/\s\S*$/,"").trim(),n(`🛡️ 2nd retry: ultra-short prompt (${it.length} chars)`)),await Vt(nt,it),await f(500);const ot=(nt.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(ot.length<20)return R(`❌ Retry: วาง Safe Prompt ไม่สำเร็จ (${ot.length} ตัวอักษร)`),!1;n(`✅ วาง Safe Prompt สำเร็จ (${ot.length} ตัวอักษร)`),await f(500);const Z=ce();if(!Z)return R("❌ Retry: ไม่พบปุ่ม Generate"),!1;const ut=Z.getBoundingClientRect(),xt=ut.left+ut.width/2,Ut=ut.top+ut.height/2,Gt={bubbles:!0,cancelable:!0,clientX:xt,clientY:Ut,button:0};return Z.dispatchEvent(new PointerEvent("pointerdown",{...Gt,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Z.dispatchEvent(new MouseEvent("mousedown",Gt)),await f(80),Z.dispatchEvent(new PointerEvent("pointerup",{...Gt,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Z.dispatchEvent(new MouseEvent("mouseup",Gt)),Z.dispatchEvent(new MouseEvent("click",Gt)),n(`✅ คลิก Generate สำหรับ Safe Retry ${X}`),await f(5e3),!0},E=se();n(E?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),$();const k=Date.now();let T=-1,G=0,S=!1,P=0;const z=2;for(;Date.now()-k<x;){const Y=B();if(Y!==null){if(Y!==T&&(n(`ความคืบหน้าวิดีโอ: ${Y}%`),T=Y,A("vid-wait","active",Y)),G=Date.now(),Y>=100){n("✅ ตรวจพบ 100%!"),S=!0;break}}else if(T>30){const X=Math.floor((Date.now()-G)/1e3);if(X>=5){n(`✅ % หายไปที่ ${T}% (หาย ${X} วินาที) — วิดีโอเสร็จ!`),S=!0;break}n(`⏳ % หายที่ ${T}% — ยืนยันใน ${5-X} วินาที...`)}else{const X=Math.floor((Date.now()-k)/1e3);X%15<3&&n(`⏳ รอ... (${X} วินาที) ไม่พบ %`)}if(!S&&T>0&&se(!0)&&!E){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${T}% — วิดีโอเสร็จ!`),S=!0;break}if(Et())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(T<1){const X=ze();if(X){if(R(`❌ สร้างวิดีโอล้มเหลว: ${X}`),P<z&&e.videoPrompt)if(P++,n(`🔄 Policy violation detected — attempting safe retry ${P}/${z}...`),await M(e.videoPrompt,P)){T=-1,G=0,n(`✅ Safe retry ${P} started — continuing to monitor...`);continue}else R(`❌ Safe retry ${P} failed to start`);return null}}document.hidden&&T>0&&Date.now()-G>1e4&&await kt(),document.hidden&&T<1&&Date.now()-k>3e4&&await kt(),await f(3e3)}await wt();let V=null;for(let Y=1;Y<=10&&(V=se(),!V);Y++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${Y}/10)`),Y%3===0&&await wt(),await f(3e3);if(!V)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),A("vid-wait","error"),null;const q=V;S?(A("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await f(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const N=q.getBoundingClientRect();let K=N.left+N.width/2,H=N.top+N.height/2,Q=q;const lt=q.querySelector("video, img, canvas");if(lt){const Y=lt.getBoundingClientRect();Y.width>50&&Y.height>50&&(K=Y.left+Y.width/2,H=Y.top+Y.height/2,Q=lt,n(`🎯 พบรูปย่อ <${lt.tagName.toLowerCase()}> ในการ์ดที่ (${K.toFixed(0)},${H.toFixed(0)}) ${Y.width.toFixed(0)}x${Y.height.toFixed(0)}`))}else H=N.top+N.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${K.toFixed(0)},${H.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${K.toFixed(0)}, ${H.toFixed(0)})...`),zt(Q);for(let Y=0;Y<8;Y++){const X={bubbles:!0,cancelable:!0,clientX:K+Y%2,clientY:H};Q.dispatchEvent(new PointerEvent("pointermove",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Q.dispatchEvent(new MouseEvent("mousemove",X)),await f(500)}try{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"mute_video",sceneCount:b,scenePrompts:_,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${b} ฉาก, ${_.length} prompts, theme: ${e.theme})`)}catch(Y){n(`⚠️ ไม่สามารถบันทึก pending action: ${Y.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await v(Q),n("✅ คลิกการ์ดวิดีโอเสร็จ"),q},v=async x=>{const $=x.getBoundingClientRect(),M=$.left+$.width/2,E=$.top+$.height/2,k={bubbles:!0,cancelable:!0,clientX:M,clientY:E,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",k)),await f(80),x.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",k)),x.dispatchEvent(new MouseEvent("click",k)),await f(50),x.click(),n("คลิกการ์ดวิดีโอแล้ว"),await f(2e3)};try{if(!await g())R("หมดเวลารอการสร้างวิดีโอ"),s.push("⚠️ Video Wait"),A("vid-wait","error");else{s.push("✅ Video Complete"),A("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await f(3e3);const $=await new Promise(M=>{chrome.storage.local.get(mt(),E=>{if(chrome.runtime.lastError){M(null);return}M((E==null?void 0:E[mt()])||null)})});$&&!$._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(mt()),$.action==="mute_video"?await qe($.sceneCount||1,$.scenePrompts||[],$.theme):$.action==="wait_scene_gen_and_download"&&await He($.sceneCount||2,$.currentScene||2,$.theme,$.scenePrompts||[]))}}catch(x){R(`ขั้น 6 ผิดพลาด: ${x.message}`),s.push("⚠️ Step6"),d.push(`step 6: ${x.message}`)}}const h=d.length===0;try{Nt(h?5e3:8e3)}catch(b){console.warn("Overlay complete error:",b)}return{success:h,message:h?`สำเร็จ! ${s.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${s.join(" → ")} | ${d.join(", ")}`,step:h?"done":"partial"}}async function qe(e,t=[],o){var F;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{o&&qt(o)}catch{}try{Xt(e)}catch(D){n(`⚠️ showOverlay error: ${D.message}`)}try{const D=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const L of D)A(L,"done");e>=2&&A("scene2-prompt","active"),n(`✅ overlay restored: ${D.length} steps done, sceneCount=${e}`)}catch(D){n(`⚠️ overlay restore error: ${D.message}`)}await f(1500);const r=(()=>{for(const D of document.querySelectorAll("button")){const L=D.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const _ of L){const B=(_.textContent||"").trim();if(B==="volume_up"||B==="volume_off"||B==="volume_mute"){const g=D.getBoundingClientRect();if(g.width>0&&g.height>0)return D}}const b=(D.getAttribute("aria-label")||"").toLowerCase();if(b.includes("mute")||b.includes("ปิดเสียง")){const _=D.getBoundingClientRect();if(_.width>0&&_.height>0)return D}}return null})();r?(r.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let a=null;if(e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await f(2e3);for(let S=2;S<=e;S++){const P=t[S-1];if(!P){R(`ไม่พบ prompt สำหรับฉากที่ ${S}`);continue}n(`── ฉากที่ ${S}/${e}: วาง prompt + generate ──`);let z=null;const V=Date.now();for(;!z&&Date.now()-V<1e4;){const W=document.querySelectorAll("[data-slate-editor='true']");if(W.length>0&&(z=W[W.length-1]),!z){const it=document.querySelectorAll("[role='textbox'][contenteditable='true']");it.length>0&&(z=it[it.length-1])}z||await f(1e3)}if(!z){R("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${z.tagName.toLowerCase()}> ${z.className.substring(0,40)}`),await Vt(z,P),n(`วาง prompt ฉาก ${S} (${P.length} ตัวอักษร) ✅`);try{A(`scene${S}-prompt`,"done"),A(`scene${S}-gen`,"active")}catch{}await f(1e3);const q=z.getBoundingClientRect();let N=null,K=1/0;for(const W of document.querySelectorAll("button")){if(W.disabled)continue;const it=W.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let ot=!1;for(const xt of it){const Ut=(xt.textContent||"").trim();if(Ut==="arrow_forward"||Ut==="send"||Ut==="arrow_upward"){ot=!0;break}}if(!ot)continue;const Z=W.getBoundingClientRect();if(Z.width<=0||Z.height<=0)continue;const ut=Math.abs(Z.top-q.top)+Math.abs(Z.right-q.right);ut<K&&(K=ut,N=W)}if(!N)for(const W of["arrow_forward","send","arrow_upward"]){const it=ht(W);for(const ot of it)if(!ot.disabled){const Z=ot.getBoundingClientRect();if(Z.width>0&&Z.height>0){N=ot;break}}if(N)break}if(!N)for(const W of document.querySelectorAll("button")){const it=W.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const ot of it)if((ot.textContent||"").trim()==="arrow_forward"){const Z=W.getBoundingClientRect();if(Z.width>0&&Z.height>0){N=W;break}}if(N)break}if(!N){R("ไม่พบปุ่ม Generate/Send");return}await new Promise(W=>{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:S,scenePrompts:t}},()=>W())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${S}/${e})`),await rt(N),n(`คลิก Generate ฉาก ${S} ✅`);try{A(`scene${S}-gen`,"done"),A(`scene${S}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${S} gen เสร็จ ──`),await f(5e3);let H=0,Q=0;const lt=Date.now(),Y=6e5,X=5e3;let nt=!1;for(;Date.now()-lt<Y;){let W=null;const it=document.querySelectorAll("div, span, p, label, strong, small");for(const ot of it){if(ot.closest("#netflow-engine-overlay"))continue;const ut=(ot.textContent||"").trim().match(/^(\d{1,3})%$/);if(ut){const xt=ot.getBoundingClientRect();if(xt.width>0&&xt.height>0&&xt.width<120&&xt.height<60){W=parseInt(ut[1],10);break}}}if(W!==null){if(W!==H){n(`🎬 ฉาก ${S} ความคืบหน้า: ${W}%`),H=W;try{A(`scene${S}-wait`,"active",W)}catch{}}Q=0}else if(H>0){if(Q===0)Q=Date.now(),n(`🔍 ฉาก ${S}: % หายไป (จาก ${H}%) — กำลังยืนยัน...`);else if(Date.now()-Q>=X){n(`✅ ฉาก ${S}: % หายไป ${X/1e3} วินาที — เจนเสร็จ!`),nt=!0;break}}if(Et()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&H>0&&Q===0&&await kt(),await f(2e3)}nt||R(`ฉาก ${S} หมดเวลา`),n(`✅ ฉาก ${S} เสร็จแล้ว`);try{A(`scene${S}-wait`,"done",100)}catch{}chrome.storage.local.remove(mt()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await f(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{A("download","active")}catch{}let D=!1;if(await wt()&&document.hidden===!1&&(D=!0),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(S=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>S())),D=!0,await f(j?8e3:5e3)}catch{}}await f(j?3e3:2e3);const b=Date.now();let _=null;const B=Date.now();for(;!_&&Date.now()-B<(j?15e3:1e4);){const S=ht("download");for(const P of S){const z=P.getBoundingClientRect();if(z.width>0&&z.height>0){_=P;break}}if(!_)for(const P of document.querySelectorAll("button")){const z=P.querySelector("i, span[class*='icon'], span[class*='material']");if(z&&(z.textContent||"").trim()==="download"){const N=P.getBoundingClientRect();if(N.width>0&&N.height>0){_=P;break}}const V=(P.getAttribute("aria-label")||"").toLowerCase(),q=(P.getAttribute("title")||"").toLowerCase();if(V.includes("download")||V.includes("ดาวน์โหลด")||q.includes("download")||q.includes("ดาวน์โหลด")){const N=P.getBoundingClientRect();if(N.width>0&&N.height>0){_=P;break}}}_||await f(1e3)}if(!_){if(R("ไม่พบปุ่มดาวน์โหลด"),D)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await rt(_),n("คลิกดาวน์โหลดแล้ว ✅");try{A("download","done"),A("upscale","active")}catch{}await f(j?3e3:1500);const g=(S,P)=>new Promise(async z=>{const V=Date.now();for(;Date.now()-V<P;){const q="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const N of document.querySelectorAll(q)){const K=(N.textContent||"").trim();if(K.includes(S)&&K.length<100){const H=N.getBoundingClientRect();if(H.width>0&&H.height>0){z(N);return}}}await f(500)}z(null)}),v=(S,P)=>new Promise(async z=>{const V=Date.now();for(;Date.now()-V<S;){const q="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const N of document.querySelectorAll(q)){const K=(N.textContent||"").trim();if(K.includes("720p")&&K.length<50){const Q=N.getBoundingClientRect();if(Q.width>0&&Q.height>0){z(N);return}}const H=N.querySelectorAll("span");for(const Q of H)if((Q.textContent||"").trim()==="720p"){const lt=N.getBoundingClientRect();if(lt.width>0&&lt.height>0){z(N);return}}}P!=null&&P.isConnected&&zt(P),await f(500)}z(null)});let x=null;for(let S=0;S<(j?5:3)&&!x;S++){S>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${S+1}...`),_.isConnected&&(await rt(_),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await f(j?3e3:2e3)));const P=await g("Full Video",j?1e4:5e3);if(!P){R("ไม่พบ Full Video");continue}zt(P),await f(j?1e3:500),await rt(P),n("คลิก/hover Full Video ✅"),await f(j?3e3:2e3),x=await v(j?12e3:8e3,P)}if(!x){if(R("ไม่พบ 720p"),D)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await rt(x),n("คลิก 720p ✅"),D){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const $=Date.now();let M=!1,E=!1;for(;Date.now()-$<3e5;){for(const S of document.querySelectorAll("div[data-title] div, div[data-content] div")){const P=(S.textContent||"").trim();if(P==="Download complete!"||P==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),M=!0;break}(P.includes("Downloading your extended video")||P.includes("กำลังดาวน์โหลด"))&&(E||(E=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(M)break;if(E){let S=!1;for(const P of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((P.textContent||"").trim().includes("Downloading")){S=!0;break}if(!S){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),M=!0;break}}if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await f(2e3)}if(!M){R("เตรียมไฟล์หมดเวลา");return}try{A("upscale","done",100),A("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let k=!1;const T=Date.now();for(;Date.now()-T<6e4&&!k;){try{await new Promise(S=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:b},P=>{chrome.runtime.lastError?R(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):P!=null&&P.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${P.message}`),k=!0,P.downloadUrl&&(a=P.downloadUrl,n(`[TikTok] จะใช้ download URL: ${P.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-T)/1e3)}s)`),S()})})}catch(S){R(`ตรวจสอบผิดพลาด: ${S.message}`)}k||await f(3e3)}k||R("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const G=await oe();a||(a=G);try{A("open","done"),Nt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),ie(a),ne(2e3);return}if(n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await wt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(D=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>D())),await f(j?8e3:5e3)}catch{}}await f(j?3e3:2e3);const p=(D,L="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const b of document.querySelectorAll(L)){const _=(b.textContent||"").trim();if(_.includes(D)&&_.length<100){const B=b.getBoundingClientRect();if(B.width>0&&B.height>0&&B.top>=0)return b}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let i=null;const l=Date.now();for(;!i&&Date.now()-l<(j?15e3:1e4);){const D=ht("download");for(const L of D){const b=L.getBoundingClientRect();if(b.width>0&&b.height>0){i=L;break}}if(!i)for(const L of document.querySelectorAll("button, [role='button']")){const b=(L.textContent||"").trim(),_=b.toLowerCase();if((_.includes("download")||_.includes("ดาวน์โหลด"))&&b.length<80){const B=L.getBoundingClientRect();if(B.width>0&&B.height>0){i=L;break}}}if(!i)for(const L of document.querySelectorAll("button")){const b=(L.getAttribute("aria-label")||"").toLowerCase(),_=(L.getAttribute("title")||"").toLowerCase();if(b.includes("download")||b.includes("ดาวน์")||_.includes("download")||_.includes("ดาวน์")){const B=L.getBoundingClientRect();if(B.width>0&&B.height>0){i=L;break}}}i||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await f(1e3))}if(!i){R("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(i.textContent||"").trim().substring(0,40)}"`),await rt(i),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await f(j?3e3:1500);const s=Date.now();let d=null;const u=Date.now();for(;!d&&Date.now()-u<(j?1e4:5e3);)d=p("1080p"),d||(n("รอ 1080p..."),await f(500));if(!d){R("ไม่พบ 1080p");return}await rt(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const m=Date.now();let y=!1,O=!1,C=0;const w=3e3;for(;Date.now()-m<3e5;){const L=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(L.includes("upscaling complete")||L.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),y=!0;break}for(const _ of document.querySelectorAll("div, span, p")){const B=(_.textContent||"").trim().toLowerCase();if(B.length<60&&(B.includes("upscaling complete")||B.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(F=_.textContent)==null?void 0:F.trim()}")`),y=!0;break}}if(y)break;if(L.includes("upscaling your video")||L.includes("กำลังอัปสเกล")){O=!0,C=0;const _=Math.floor((Date.now()-m)/1e3);n(`⏳ กำลังอัปสเกล... (${_} วินาที)`)}else if(O){if(C===0)C=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-C>=w){n(`✅ ข้อความ Upscaling หายไป ${w/1e3} วินาที — เสร็จ!`),y=!0;break}}else{const _=Math.floor((Date.now()-m)/1e3);_%10<3&&n(`⏳ รอ Upscale... (${_} วินาที)`)}if(Et()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await f(2e3)}if(!y){R("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let c=!1;const h=Date.now();for(;Date.now()-h<6e4&&!c;){try{await new Promise(D=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:s},L=>{chrome.runtime.lastError?R(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):L!=null&&L.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${L.message}`),c=!0,L.downloadUrl&&(a=L.downloadUrl,n(`[TikTok] จะใช้ download URL: ${L.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-h)/1e3)}s)`),D()})})}catch(D){R(`ตรวจสอบผิดพลาด: ${D.message}`)}c||await f(3e3)}c||R("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const I=await oe();a||(a=I),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),ie(a),ne(2e3)}async function He(e=2,t=2,o,r=[]){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{o&&qt(o)}catch{}try{Xt(e)}catch(g){n(`⚠️ showOverlay error: ${g.message}`)}try{const g=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let v=2;v<=t;v++)g.push(`scene${v}-prompt`,`scene${v}-gen`),v<t&&g.push(`scene${v}-wait`);for(const v of g)A(v,"done");A(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${g.length} steps done (scene ${t}/${e} navigate)`)}catch(g){n(`⚠️ overlay restore error: ${g.message}`)}await f(2e3);const a=(()=>{for(const g of document.querySelectorAll("button")){const v=g.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const $ of v){const M=($.textContent||"").trim();if(M==="volume_up"||M==="volume_off"||M==="volume_mute"){const E=g.getBoundingClientRect();if(E.width>0&&E.height>0)return g}}const x=(g.getAttribute("aria-label")||"").toLowerCase();if(x.includes("mute")||x.includes("ปิดเสียง")){const $=g.getBoundingClientRect();if($.width>0&&$.height>0)return g}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);let p=0,i=0;const l=Date.now(),s=6e5,d=5e3;let u=!1,m=0;for(;Date.now()-l<s;){let g=null;const v=document.querySelectorAll("div, span, p, label, strong, small");for(const x of v){if(x.closest("#netflow-engine-overlay"))continue;const M=(x.textContent||"").trim().match(/^(\d{1,3})%$/);if(M){const E=x.getBoundingClientRect();if(E.width>0&&E.height>0&&E.width<120&&E.height<60){g=parseInt(M[1],10);break}}}if(g!==null){if(m=0,g!==p){n(`🎬 scene ${t} ความคืบหน้า: ${g}%`),p=g;try{A(`scene${t}-wait`,"active",g)}catch{}}i=0}else if(p>0){if(i===0)i=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${p}%) — กำลังยืนยัน...`);else if(Date.now()-i>=d){n(`✅ scene ${t}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),u=!0;break}}else if(m++,m>=15){const x=document.querySelectorAll("video");let $=!1;for(const M of x)if(M.readyState>=2&&!M.paused&&M.getBoundingClientRect().width>200){$=!0;break}if($){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),u=!0;break}if(m>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),u=!0;break}}document.hidden&&p>0&&i===0&&await kt(),await f(2e3)}u||n(`⚠️ scene ${t} หมดเวลา — ลองต่อไป`);try{A(`scene${t}-wait`,"done",100)}catch{}if(n(`✅ scene ${t} เสร็จ`),t<e&&r.length>0){n(`═══ ยังเหลืออีก ${e-t} ฉาก — ต่อฉากถัดไป ═══`),await f(2e3);for(let g=t+1;g<=e;g++){const v=r[g-1];if(!v){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${g} — ข้าม`);continue}n(`── ฉากที่ ${g}/${e}: วาง prompt + generate (pending recovery) ──`);let x=null;const $=Date.now();for(;!x&&Date.now()-$<1e4;){const V=document.querySelectorAll("[data-slate-editor='true']");if(V.length>0&&(x=V[V.length-1]),!x){const q=document.querySelectorAll("[role='textbox'][contenteditable='true']");q.length>0&&(x=q[q.length-1])}x||await f(1e3)}if(!x){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${g}`);break}await Vt(x,v),n(`วาง prompt ฉาก ${g} (${v.length} ตัวอักษร) ✅`);try{A(`scene${g}-prompt`,"done"),A(`scene${g}-gen`,"active")}catch{}await f(1e3);const M=x.getBoundingClientRect();let E=null,k=1/0;for(const V of document.querySelectorAll("button")){if(V.disabled)continue;const q=V.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let N=!1;for(const Q of q){const lt=(Q.textContent||"").trim();if(lt==="arrow_forward"||lt==="send"||lt==="arrow_upward"){N=!0;break}}if(!N)continue;const K=V.getBoundingClientRect();if(K.width<=0||K.height<=0)continue;const H=Math.abs(K.top-M.top)+Math.abs(K.right-M.right);H<k&&(k=H,E=V)}if(!E)for(const V of["arrow_forward","send","arrow_upward"]){const q=ht(V);for(const N of q)if(!N.disabled){const K=N.getBoundingClientRect();if(K.width>0&&K.height>0){E=N;break}}if(E)break}if(!E)for(const V of document.querySelectorAll("button")){const q=V.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const N of q)if((N.textContent||"").trim()==="arrow_forward"){const K=V.getBoundingClientRect();if(K.width>0&&K.height>0){E=V;break}}if(E)break}if(!E){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${g}`);break}await new Promise(V=>{chrome.storage.local.set({[mt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:g,scenePrompts:r}},()=>V())}),await rt(E),n(`คลิก Generate ฉาก ${g} ✅`);try{A(`scene${g}-gen`,"done"),A(`scene${g}-wait`,"active")}catch{}await f(5e3);let T=0,G=0;const S=Date.now();let P=!1,z=0;for(;Date.now()-S<6e5;){let V=null;const q=document.querySelectorAll("div, span, p, label, strong, small");for(const N of q){if(N.closest("#netflow-engine-overlay"))continue;const H=(N.textContent||"").trim().match(/^(\d{1,3})%$/);if(H){const Q=N.getBoundingClientRect();if(Q.width>0&&Q.height>0&&Q.width<120&&Q.height<60){V=parseInt(H[1],10);break}}}if(V!==null){if(z=0,V!==T){n(`🎬 ฉาก ${g} ความคืบหน้า: ${V}%`),T=V;try{A(`scene${g}-wait`,"active",V)}catch{}}G=0}else if(T>0){if(G===0)G=Date.now();else if(Date.now()-G>=5e3){n(`✅ ฉาก ${g}: เจนเสร็จ!`),P=!0;break}}else if(z++,z>=15){const N=document.querySelectorAll("video");let K=!1;for(const H of N)if(H.readyState>=2&&!H.paused&&H.getBoundingClientRect().width>200){K=!0;break}if(K){n(`✅ ฉาก ${g}: พบวิดีโอเล่นอยู่ — เสร็จ`),P=!0;break}if(z>=30){n(`✅ ฉาก ${g}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),P=!0;break}}document.hidden&&T>0&&G===0&&await kt(),await f(2e3)}P||n(`⚠️ ฉาก ${g} หมดเวลา`);try{A(`scene${g}-wait`,"done",100)}catch{}n(`✅ ฉาก ${g} เสร็จแล้ว`),chrome.storage.local.remove(mt()),await f(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await f(3e3);let y=null;try{A("download","active")}catch{}if(n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──"),await wt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(g=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>g())),await f(j?8e3:5e3)}catch{}}await f(j?3e3:2e3);const O=Date.now();let C=null;const w=Date.now();for(;!C&&Date.now()-w<(j?15e3:1e4);){const g=ht("download");for(const v of g){const x=v.getBoundingClientRect();if(x.width>0&&x.height>0){C=v;break}}if(!C)for(const v of document.querySelectorAll("button")){const x=v.querySelector("i, span[class*='icon'], span[class*='material']");if(x&&(x.textContent||"").trim()==="download"){const E=v.getBoundingClientRect();if(E.width>0&&E.height>0){C=v;break}}const $=(v.getAttribute("aria-label")||"").toLowerCase(),M=(v.getAttribute("title")||"").toLowerCase();if($.includes("download")||$.includes("ดาวน์โหลด")||M.includes("download")||M.includes("ดาวน์โหลด")){const E=v.getBoundingClientRect();if(E.width>0&&E.height>0){C=v;break}}}C||await f(1e3)}if(!C){R("ไม่พบปุ่มดาวน์โหลด");return}await rt(C),n("คลิกดาวน์โหลดแล้ว ✅");try{A("download","done"),A("upscale","active")}catch{}await f(j?3e3:1500);const c=(g,v)=>new Promise(async x=>{const $=Date.now();for(;Date.now()-$<v;){const M="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div";for(const E of document.querySelectorAll(M)){const k=(E.textContent||"").trim();if(k.includes(g)&&k.length<100){const T=E.getBoundingClientRect();if(T.width>0&&T.height>0){x(E);return}}}await f(500)}x(null)}),h=(g,v)=>new Promise(async x=>{const $=Date.now();for(;Date.now()-$<g;){const M="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const E of document.querySelectorAll(M)){const k=(E.textContent||"").trim();if(k.includes("720p")&&k.length<50){const G=E.getBoundingClientRect();if(G.width>0&&G.height>0){x(E);return}}const T=E.querySelectorAll("span");for(const G of T)if((G.textContent||"").trim()==="720p"){const S=E.getBoundingClientRect();if(S.width>0&&S.height>0){x(E);return}}}v!=null&&v.isConnected&&zt(v),await f(500)}x(null)});let I=null;for(let g=0;g<(j?5:3)&&!I;g++){g>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${g+1}...`),C.isConnected&&(await rt(C),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await f(j?3e3:2e3)));const v=await c("Full Video",j?1e4:5e3);if(!v){R("ไม่พบ Full Video");continue}zt(v),await f(j?1e3:500),await rt(v),n("คลิก/hover Full Video ✅"),await f(j?3e3:2e3),I=await h(j?12e3:8e3,v)}if(!I){R("ไม่พบ 720p");return}await rt(I),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const F=Date.now();let D=!1,L=!1;for(;Date.now()-F<3e5;){for(const g of document.querySelectorAll("div[data-title] div, div[data-content] div")){const v=(g.textContent||"").trim();if(v==="Download complete!"||v==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),D=!0;break}(v.includes("Downloading your extended video")||v.includes("กำลังดาวน์โหลด"))&&(L||(L=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(D)break;if(L){let g=!1;for(const v of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((v.textContent||"").trim().includes("Downloading")){g=!0;break}if(!g){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),D=!0;break}}await f(2e3)}if(!D){R("เตรียมไฟล์หมดเวลา");return}try{A("upscale","done",100),A("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let b=!1;const _=Date.now();for(;Date.now()-_<6e4&&!b;){try{await new Promise(g=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:O},v=>{chrome.runtime.lastError?R(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):v!=null&&v.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${v.message}`),b=!0,v.downloadUrl&&(y=v.downloadUrl,n(`[TikTok] จะใช้ download URL: ${v.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-_)/1e3)}s)`),g()})})}catch(g){R(`ตรวจสอบผิดพลาด: ${g.message}`)}b||await f(3e3)}b||R("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const B=await oe();y||(y=B);try{A("open","done"),Nt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),ie(y),ne(2e3)}async function $n(){try{await ln;const e=mt();let t=await new Promise(i=>{chrome.storage.local.get(e,l=>{if(chrome.runtime.lastError){i(null);return}i((l==null?void 0:l[e])||null)})});if(!t&&St){const i="netflow_pending_action";t=await new Promise(l=>{chrome.storage.local.get(i,s=>{if(chrome.runtime.lastError){l(null);return}l((s==null?void 0:s[i])||null)})}),t&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(i))}if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const r=Date.now()-t.timestamp;if(r>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(e);return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=a,await new Promise(i=>{chrome.storage.local.set({[e]:t},()=>i())}),await f(300),!await new Promise(i=>{chrome.storage.local.get(e,l=>{const s=l==null?void 0:l[e];i((s==null?void 0:s._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(e),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(r/1e3)} วินาที)`),t.action==="mute_video"?await qe(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await He(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,o)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),o({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),vn(e).then(r=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${r.message}`),Be()}).catch(r=>{if(r instanceof re||(r==null?void 0:r.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Lt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Re()}catch{}}else console.error("[Netflow AI] Generate error:",r);Be()}),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,o({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return o({status:"ready"}),!1;if((e==null?void 0:e.type)==="CAPTURE_PAGE_VIDEO")return(async()=>{try{const r=document.querySelectorAll("video");let a="",p=0;for(const d of r){const u=d.src||d.currentSrc||"";if(!u)continue;const m=d.getBoundingClientRect(),y=m.width*m.height;(y>p||!a&&u)&&(p=y,a=u)}if(!a){o({success:!1,error:"No video found"});return}const i=await fetch(a);if(!i.ok){o({success:!1,error:"HTTP "+i.status});return}const l=await i.blob();if(l.size<1e4){o({success:!1,error:"Video too small: "+l.size});return}const s=await new Promise((d,u)=>{const m=new FileReader;m.onloadend=()=>d(m.result),m.onerror=()=>u(new Error("FileReader error")),m.readAsDataURL(l)});o({success:!0,data:s,size:l.size})}catch(r){o({success:!1,error:r.message})}})(),!0;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return o({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await f(500);const r=un();if(!r){R("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const a=r.getBoundingClientRect(),p=a.left+a.width/2,i=a.top+a.height/2;n(`การ์ดรูปที่ (${p.toFixed(0)}, ${i.toFixed(0)}) ${a.width.toFixed(0)}x${a.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let l=0;l<2;l++){const s=document.elementFromPoint(p,i);s?(await rt(s),n(`คลิก ${l+1}/2 บน <${s.tagName.toLowerCase()}>`)):(await rt(r),n(`คลิก ${l+1}/2 บนการ์ด (สำรอง)`)),await f(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),(async()=>{try{const e=await new Promise(t=>{chrome.storage.local.get("netflow_preshow_overlay",o=>{if(chrome.runtime.lastError){t(null);return}t((o==null?void 0:o.netflow_preshow_overlay)||null)})});if(e&&e.timestamp&&Date.now()-e.timestamp<3e4){n("⚡ Pre-show overlay — แสดง overlay ทันที");try{qt(e.theme)}catch{}try{Xt(e.sceneCount||1)}catch(t){n(`⚠️ pre-show overlay error: ${t.message}`)}chrome.storage.local.remove("netflow_preshow_overlay")}}catch{}})(),$n()})();
