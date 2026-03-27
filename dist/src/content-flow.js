(function(){"use strict";const yt={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let lt=yt.blue,Rt=null;function Gt(e){e&&yt[e]&&(Rt=e,lt=yt[e],ue(),tt&&(tt.remove(),tt=null),Xt(),requestAnimationFrame(()=>De()))}function Ye(){if(Rt&&yt[Rt])return yt[Rt];try{const e=localStorage.getItem("netflow_app_theme");if(e&&yt[e])return yt[e]}catch{}return yt.blue}let ct=43,dt=125,pt=233;function ue(){const e=lt.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(ct=parseInt(e[1],16),dt=parseInt(e[2],16),pt=parseInt(e[3],16))}const ge='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',me='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let H=null,st=null,tt=null,he=0,Wt=null,mt=null,ee=0,$t=!1,ft=null,_t=null,ht=null,jt=0,ne=performance.now(),be=0,Kt=null,It=1,it=[];function Yt(e){const t=[{stepId:"open-flow",label:"เปิด Google Flow",status:"waiting"},{stepId:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let o=2;o<=e;o++)t.push({stepId:`scene${o}-prompt`,label:`ฉาก ${o} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${o}-gen`,label:`ฉาก ${o} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${o}-wait`,label:`ฉาก ${o} — กำลังสร้าง`,status:"waiting",progress:0});t.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return t}const ut=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"open-flow",label:"เปิด Google Flow",status:"waiting"},{id:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];it=Yt(1);function Xe(e){const t=e.rgb,o=e.accentRgb,l=e.doneRgb,s=e.hex,p=e.accentHex,i=e.doneHex,r=(()=>{const S=s.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!S)return"#4ade80";const c=k=>Math.min(255,k+80);return`#${[1,2,3].map(k=>c(parseInt(S[k],16)).toString(16).padStart(2,"0")).join("")}`})(),a=(()=>{const S=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!S)return"#4ade80";const c=k=>Math.min(255,k+60);return`#${[1,2,3].map(k=>c(parseInt(S[k],16)).toString(16).padStart(2,"0")).join("")}`})(),d=s.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),g=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,m=d?parseInt(d[1],16)/g:0,v=d?parseInt(d[2],16)/g:1,B=d?parseInt(d[3],16)/g:.25,R=S=>`${Math.round(m*S)}, ${Math.round(v*S)}, ${Math.round(B*S)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${R(18)},0.94) 0%, rgba(${R(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: rgba(${R(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${R(180)},0.05),
        inset 0 1px 0 rgba(${t},0.1),
        inset 0 0 40px rgba(${t},0.03);
    animation: nf-core-breathe 4s ease-in-out infinite;
    z-index: 10;
}

@keyframes nf-core-breathe {
    0%, 100% {
        box-shadow:
            0 0 60px rgba(${t},0.15),
            0 0 120px rgba(${t},0.08),
            0 0 200px rgba(${R(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${R(180)},0.08),
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
    color: ${r};
    font-weight: 700;
    text-shadow: 0 0 10px rgba(${t},0.5);
}

.nf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${s};
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
.nf-term-line.nf-term-done { color: rgba(${l}, 0.85); }
.nf-term-line.nf-term-error { color: rgba(239, 68, 68, 0.8); }
.nf-term-line.nf-term-waiting { color: rgba(255, 255, 255, 0.55); }

.nf-term-prefix {
    color: rgba(${t},0.92);
    font-weight: 700;
    user-select: none;
}

.nf-term-active .nf-term-prefix { color: ${s}; text-shadow: 0 0 6px rgba(${t},0.4); }

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
    color: ${r};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${t},0.3);
}

@keyframes nf-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.nf-term-done .nf-term-status {
    background: rgba(${l}, 0.12);
    color: ${a};
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
    background: linear-gradient(180deg, rgba(${R(5)},0.95) 0%, rgba(${R(12)},0.98) 100%);
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
    background: linear-gradient(180deg, rgba(${R(6)},0.75) 0%, rgba(${R(3)},0.92) 100%);
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
    background: rgba(${R(8)}, 0.88);
    border: none;
    border-radius: 12px;
    padding: 14px 17px;
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
    box-shadow: 0 0 20px rgba(${l}, 0.1);
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
    background: linear-gradient(90deg, transparent, rgba(${l}, 0.5), transparent);
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
    color: ${s};
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
    color: rgba(${l}, 0.85);
    text-shadow:
        0 0 4px rgba(${l},0.5),
        0 0 12px rgba(${l},0.3);
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
    background: ${s};
    box-shadow: 0 0 6px rgba(${t},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: ${i};
    box-shadow: 0 0 5px rgba(${l}, 0.5);
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
    background: linear-gradient(90deg, ${s}, ${r});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${t},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${i}, ${a});
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
    background: linear-gradient(90deg, ${s}, ${p});
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
    box-shadow: 0 0 6px rgba(${t},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${i}, ${a});
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
    background: rgba(${R(8)},0.8);
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
    background: rgba(${R(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${s};
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
    color: ${s};
    text-shadow: 0 0 6px rgba(${t},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${s};
    box-shadow: 0 0 6px rgba(${t},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}
.nf-proc-active .nf-proc-badge {
    background: rgba(${t},0.12);
    color: ${r};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${t},0.3);
}

.nf-proc-done {
    color: rgba(${l},0.85);
}
.nf-proc-done .nf-proc-num {
    color: rgba(${l},0.5);
    text-shadow: 0 0 4px rgba(${l},0.3);
}
.nf-proc-done .nf-proc-label {
    text-shadow:
        0 0 3px rgba(${l},0.4),
        0 0 8px rgba(${l},0.2);
}
.nf-proc-done .nf-proc-dot {
    background: ${i};
    box-shadow: 0 0 5px rgba(${l},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${l},0.1);
    color: ${a};
    text-shadow: 0 0 4px rgba(${l},0.3);
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

    `}function Xt(){tt||(tt=document.createElement("style"),tt.id="netflow-overlay-styles",tt.textContent=Xe(lt),document.head.appendChild(tt))}function we(e){e.innerHTML="",it.forEach((t,o)=>{const l=document.createElement("div");l.className="nf-proc-row nf-proc-waiting",l.id=`nf-proc-${t.stepId}`,l.innerHTML=`
            <span class="nf-proc-num">${o+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(l)})}function xe(){const e=document.getElementById("nf-terminal");if(!e)return;we(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${it.length}`)}function ye(e,t){let r="";for(let v=0;v<20;v++){const B=v/20*Math.PI*2,R=(v+.2)/20*Math.PI*2,S=(v+.5)/20*Math.PI*2,c=(v+.8)/20*Math.PI*2,k=(v+1)/20*Math.PI*2;r+=`${v===0?"M":"L"}${(120+100*Math.cos(B)).toFixed(1)},${(120+100*Math.sin(B)).toFixed(1)} `,r+=`L${(120+100*Math.cos(R)).toFixed(1)},${(120+100*Math.sin(R)).toFixed(1)} `,r+=`L${(120+112*Math.cos(S)).toFixed(1)},${(120+112*Math.sin(S)).toFixed(1)} `,r+=`L${(120+100*Math.cos(c)).toFixed(1)},${(120+100*Math.sin(c)).toFixed(1)} `,r+=`L${(120+100*Math.cos(k)).toFixed(1)},${(120+100*Math.sin(k)).toFixed(1)} `}r+="Z";const a=14,d=72,g=62;let m="";for(let v=0;v<a;v++){const B=v/a*Math.PI*2,R=(v+.25)/a*Math.PI*2,S=(v+.75)/a*Math.PI*2,c=(v+1)/a*Math.PI*2;m+=`${v===0?"M":"L"}${(120+g*Math.cos(B)).toFixed(1)},${(120+g*Math.sin(B)).toFixed(1)} `,m+=`L${(120+d*Math.cos(R)).toFixed(1)},${(120+d*Math.sin(R)).toFixed(1)} `,m+=`L${(120+d*Math.cos(S)).toFixed(1)},${(120+d*Math.sin(S)).toFixed(1)} `,m+=`L${(120+g*Math.cos(c)).toFixed(1)},${(120+g*Math.sin(c)).toFixed(1)} `}return m+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${r}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="100" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.4"/>
        </g>

        <!-- Inner ring (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${m}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${g}" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${e},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${e},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Qe(){const e=document.createElement("div");e.id="netflow-engine-overlay",ft=document.createElement("canvas"),ft.id="nf-matrix-canvas",e.appendChild(ft);const t=document.createElement("div");t.className="nf-pat-plasma",e.appendChild(t);for(let $=1;$<=2;$++){const x=document.createElement("div");x.className=`nf-ambient-orb nf-orb-${$}`,e.appendChild(x)}const o=document.createElement("div");o.className="nf-pat-diag-a",e.appendChild(o);const l=document.createElement("div");l.className="nf-pat-noise",e.appendChild(l);const s=document.createElement("div");s.className="nf-crt-scanlines",e.appendChild(s);const p=document.createElement("div");p.className="nf-vignette",e.appendChild(p);for(let $=0;$<2;$++){const x=document.createElement("div");x.className="nf-pulse-ring",e.appendChild(x)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach($=>{const x=document.createElement("div");x.className=`nf-corner-deco ${$}`,e.appendChild(x)});const i=document.createElement("button");i.className="nf-stop-btn",i.innerHTML='<span class="nf-stop-icon"></span> หยุด',i.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",i.onclick=()=>{var $;window.__NETFLOW_STOP__=!0;try{Lt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&(($=chrome.runtime)!=null&&$.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},e.appendChild(i);const r=document.createElement("div");r.className="nf-layout";const a=document.createElement("div");a.className="nf-core-monitor",a.id="nf-core-monitor";const d=document.createElement("div");d.className="nf-core-header",d.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${it.length}</div>
    `,a.appendChild(d);const g=document.createElement("div");g.className="nf-terminal",g.id="nf-terminal",we(g),a.appendChild(g);const m=document.createElement("div");m.className="nf-engine-core",m.id="nf-engine-core";const v=document.createElement("div");v.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach($=>{const x=document.createElement("div");x.className=`nf-frame-corner ${$}`,v.appendChild(x)}),m.appendChild(v);const B="http://www.w3.org/2000/svg",R=document.createElementNS(B,"svg");R.setAttribute("class","nf-engine-waves"),R.setAttribute("viewBox","0 0 560 140"),R.setAttribute("preserveAspectRatio","none"),R.id="nf-engine-waves";for(let $=0;$<4;$++){const x=document.createElementNS(B,"path");x.setAttribute("fill","none"),x.setAttribute("stroke-width",$<2?"1.5":"1"),x.setAttribute("stroke",$<2?`rgba(${lt.rgb},${.14+$*.1})`:`rgba(${lt.accentRgb},${.1+($-2)*.08})`),x.setAttribute("data-wave-idx",String($)),R.appendChild(x)}m.appendChild(R);const S=document.createElement("div");S.className="nf-engine-brand-inner",S.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${ye(lt.rgb,lt.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${ye(lt.rgb,lt.accentRgb)}
        </div>
    `,m.appendChild(S);const c=document.createElement("div");c.className="nf-engine-stats",c.id="nf-engine-stats",c.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"],["FPS","nf-stat-fps","--"]].map(([$,x,C])=>`<div class="nf-stat-item"><span class="nf-stat-label">${$}</span><span class="nf-stat-val" id="${x}">${C}</span></div>`).join(""),m.appendChild(c),a.appendChild(m),r.appendChild(a);const k=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ut.forEach(($,x)=>{const C=Ze($);C.classList.add(k[x]),C.id=`nf-mod-${$.id}`,r.appendChild(C)}),e.appendChild(r);for(let $=0;$<10;$++){const x=document.createElement("div");x.className="nf-particle",x.style.left=`${5+Math.random()*90}%`,x.style.bottom=`${Math.random()*40}%`,x.style.animationDuration=`${3+Math.random()*5}s`,x.style.animationDelay=`${Math.random()*4}s`;const C=.3+Math.random()*.4,y=.7+Math.random()*.3;x.style.background=`rgba(${Math.floor(ct*y)}, ${Math.floor(dt*y)}, ${Math.floor(pt*y)}, ${C})`,x.style.width=`${1+Math.random()*2}px`,x.style.height=x.style.width,e.appendChild(x)}return e}function Ze(e){const t=document.createElement("div");t.className="nf-module";const o=document.createElement("div");o.className="nf-mod-header",o.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(o),e.steps.forEach(s=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${s.id}`;let i="";s.progress!==void 0&&(i=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${s.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${s.label}</span>
            ${i}
        `,t.appendChild(p)});const l=document.createElement("div");return l.className="nf-mod-progress",l.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(l),t}function Je(){he=Date.now(),Wt=setInterval(()=>{const e=Math.floor((Date.now()-he)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),o=String(e%60).padStart(2,"0"),l=document.getElementById("nf-timer");l&&(l.textContent=`${t}:${o}`);const s=document.getElementById("nf-stat-elapsed");s&&(s.textContent=`${t}:${o}`)},1e3)}function ve(){Wt&&(clearInterval(Wt),Wt=null)}const tn=50,$e=120,Ee=.4;let St=null,ke=0,Ce=0,Te=0,Bt=[];function en(e,t){Bt=[];for(let o=0;o<tn;o++){const l=Math.random();let s;l<.22?s=0:l<.4?s=1:l<.55?s=2:l<.68?s=3:l<.84?s=4:s=5;const p=Math.random()*e,i=Math.random()*t,r=50+Math.random()*220,a=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Bt.push({x:s===0?Math.random()*e:p+Math.cos(a)*r,y:s===0?Math.random()*t:i+Math.sin(a)*r,vx:(Math.random()-.5)*Ee,vy:(Math.random()-.5)*Ee,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:s,oCx:p,oCy:i,oRadius:r,oAngle:a,oSpeed:d})}}function _e(){if(!ft)return;const e=ft;if(_t=e.getContext("2d"),!_t)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,Bt.length===0&&en(e.width,e.height)};t(),window.addEventListener("resize",t);let o=null,l=0,s=0,p=0;function i(){if(!_t||!ft){ht=null;return}if(ht=requestAnimationFrame(i),jt++,p++,p%3!==0)return;const r=_t,a=ft.width,d=ft.height;r.fillStyle=`rgba(${ct*.04|0},${dt*.04|0},${pt*.06|0},1)`,r.fillRect(0,0,a,d),(!o||l!==a||s!==d)&&(l=a,s=d,o=r.createRadialGradient(a*.5,d*.5,0,a*.5,d*.5,Math.max(a,d)*.6),o.addColorStop(0,`rgba(${ct*.08|0},${dt*.08|0},${pt*.1|0},0.4)`),o.addColorStop(1,"rgba(0,0,0,0)")),r.fillStyle=o,r.fillRect(0,0,a,d);const g=Bt,m=g.length,v=$e*$e;for(let S=0;S<m;S++){const c=g[S];if(c.pulsePhase+=c.pulseSpeed,c.motion===0)c.x+=c.vx,c.y+=c.vy,c.x<0?(c.x=0,c.vx=Math.abs(c.vx)*(.8+Math.random()*.4)):c.x>a&&(c.x=a,c.vx=-Math.abs(c.vx)*(.8+Math.random()*.4)),c.y<0?(c.y=0,c.vy=Math.abs(c.vy)*(.8+Math.random()*.4)):c.y>d&&(c.y=d,c.vy=-Math.abs(c.vy)*(.8+Math.random()*.4));else if(c.motion===1)c.oAngle+=c.oSpeed,c.x=c.oCx+Math.cos(c.oAngle)*c.oRadius,c.y=c.oCy+Math.sin(c.oAngle)*c.oRadius,c.oCx+=Math.sin(c.oAngle*.3)*.15,c.oCy+=Math.cos(c.oAngle*.3)*.15;else if(c.motion===2)c.oAngle+=c.oSpeed,c.x=c.oCx+Math.cos(c.oAngle)*c.oRadius,c.y=c.oCy+Math.sin(c.oAngle)*c.oRadius*.5,c.oCx+=Math.sin(c.oAngle*.2)*.1,c.oCy+=Math.cos(c.oAngle*.2)*.1;else if(c.motion===3){c.oAngle+=c.oSpeed;const k=c.oAngle,$=c.oRadius*.7;c.x=c.oCx+$*Math.cos(k),c.y=c.oCy+$*Math.sin(k)*Math.cos(k),c.oCx+=Math.sin(k*.15)*.12,c.oCy+=Math.cos(k*.15)*.12}else if(c.motion===4){c.oAngle+=c.oSpeed*1.2;const k=c.oRadius*(.5+.5*Math.abs(Math.sin(c.oAngle*.15)));c.x=c.oCx+Math.cos(c.oAngle)*k,c.y=c.oCy+Math.sin(c.oAngle)*k,c.oCx+=Math.sin(c.oAngle*.1)*.18,c.oCy+=Math.cos(c.oAngle*.1)*.18}else c.oAngle+=c.oSpeed,c.x+=c.vx*.8,c.y=c.oCy+Math.sin(c.oAngle+c.x*.008)*c.oRadius*.35,c.x<-30?c.x=a+30:c.x>a+30&&(c.x=-30),c.oCy+=Math.sin(c.oAngle*.1)*.08;if(c.motion>0){const k=c.oRadius+50;c.oCx<-k?c.oCx=a+k:c.oCx>a+k&&(c.oCx=-k),c.oCy<-k?c.oCy=d+k:c.oCy>d+k&&(c.oCy=-k)}}r.beginPath(),r.strokeStyle=`rgba(${ct},${dt},${pt},0.06)`,r.lineWidth=.4;const B=new Path2D;for(let S=0;S<m;S++){const c=g[S];for(let k=S+1;k<m;k++){const $=g[k],x=c.x-$.x,C=c.y-$.y,y=x*x+C*C;y<v&&(1-y/v<.4?(r.moveTo(c.x,c.y),r.lineTo($.x,$.y)):(B.moveTo(c.x,c.y),B.lineTo($.x,$.y)))}}if(r.stroke(),r.strokeStyle=`rgba(${ct},${dt},${pt},0.18)`,r.lineWidth=.8,r.stroke(B),!St||ke!==ct||Ce!==dt||Te!==pt){St=document.createElement("canvas");const S=48;St.width=S,St.height=S;const c=St.getContext("2d"),k=c.createRadialGradient(S/2,S/2,0,S/2,S/2,S/2);k.addColorStop(0,`rgba(${ct},${dt},${pt},0.9)`),k.addColorStop(.3,`rgba(${ct},${dt},${pt},0.35)`),k.addColorStop(1,`rgba(${ct},${dt},${pt},0)`),c.fillStyle=k,c.fillRect(0,0,S,S),ke=ct,Ce=dt,Te=pt}const R=St;for(let S=0;S<m;S++){const c=g[S],k=.6+.4*Math.sin(c.pulsePhase),$=c.radius*5*(.8+k*.4);r.globalAlpha=.5+k*.4,r.drawImage(R,c.x-$/2,c.y-$/2,$,$)}r.globalAlpha=1,r.fillStyle="rgba(255,255,255,0.45)",r.beginPath();for(let S=0;S<m;S++){const c=g[S];if(c.radius>2){const k=.6+.4*Math.sin(c.pulsePhase),$=c.radius*(.8+k*.4)*.35;r.moveTo(c.x+$,c.y),r.arc(c.x,c.y,$,0,Math.PI*2)}}r.fill()}i()}function nn(){ht!==null&&(cancelAnimationFrame(ht),ht=null),ft=null,_t=null,Bt=[]}let Dt=null;const Qt=560,on=140,Ie=Qt/2,Se=on/2,Ae=[];for(let e=0;e<=Qt;e+=8){const t=Math.abs(e-Ie)/Ie;Ae.push(Math.pow(Math.min(1,t*1.6),.6))}const an=[0,1,2,3].map(e=>({amp:10+e*5,freq:(1.2+e*.35)*Math.PI*2/Qt,off:e*.6,spd:.7+e*.12}));let oe=!1;function ie(){if(mt=requestAnimationFrame(ie),oe=!oe,oe)return;if(ee+=.07,!Dt){const t=document.getElementById("nf-engine-waves");if(!t){mt=null;return}Dt=Array.from(t.querySelectorAll("path"))}const e=[];for(let t=0;t<Dt.length;t++){const o=an[t],l=ee*o.spd+o.off;e.length=0,e.push(`M 0 ${Se}`);let s=0;for(let p=0;p<=Qt;p+=8){const i=Se+o.amp*Ae[s++]*Math.sin(p*o.freq+l);e.push(`L${p} ${i*10+.5|0}`)}Dt[t].setAttribute("d",e.join(" "))}}function rn(){ee=0,jt=0,ne=performance.now(),ie(),_e(),Kt=setInterval(()=>{const e=performance.now(),t=(e-ne)/1e3;if(t>0){be=Math.round(jt/t);const o=document.getElementById("nf-stat-fps");o&&(o.textContent=`${be}`)}jt=0,ne=e},1e3)}function Pe(){mt!==null&&(cancelAnimationFrame(mt),mt=null),Kt&&(clearInterval(Kt),Kt=null),Dt=null,nn()}function Zt(){let e=0;const t=it.filter(d=>d.status!=="skipped").length;for(const d of it){const g=document.getElementById(`nf-proc-${d.stepId}`);if(!g)continue;g.className="nf-proc-row";const m=g.querySelector(".nf-proc-badge");switch(d.status){case"done":g.classList.add("nf-proc-done"),m&&(m.textContent="✅ done"),e++;break;case"active":g.classList.add("nf-proc-active"),m&&(m.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":g.classList.add("nf-proc-error"),m&&(m.textContent="❌ error");break;case"skipped":g.classList.add("nf-proc-skipped"),m&&(m.textContent="— skip");break;default:g.classList.add("nf-proc-waiting"),m&&(m.textContent="(queued)")}}const o=it.findIndex(d=>d.status==="active"),l=o>=0?o+1:e>=t&&t>0?it.length:e,s=document.getElementById("nf-step-counter");s&&(s.textContent=`${l}/${it.length}`);const p=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");e>=t&&t>0?(p&&(p.textContent="COMPLETE",p.style.color=lt.doneHex),i&&(i.style.background=lt.doneHex,i.style.boxShadow=`0 0 8px rgba(${lt.doneRgb},0.7)`)):it.some(g=>g.status==="error")?(p&&(p.textContent="ERROR",p.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):it.some(g=>g.status==="active")&&p&&(p.textContent="ACTIVE",p.style.color=lt.hex,p.style.textShadow=`0 0 10px rgba(${lt.rgb},0.5)`);const r=document.getElementById("nf-terminal"),a=r==null?void 0:r.querySelector(".nf-proc-active");a&&r&&a.scrollIntoView({behavior:"smooth",block:"center"})}function Me(){st&&st.isConnected||(Xt(),st=document.createElement("button"),st.id="nf-toggle-btn",st.className="nf-toggle-visible",st.innerHTML=$t?ge:me,st.title="ซ่อน/แสดง Netflow Overlay",st.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",st.onclick=()=>Re(),document.body.appendChild(st))}function Re(){H&&(Me(),$t?(H.classList.remove("nf-hidden"),H.classList.add("nf-visible"),H.style.opacity="1",H.style.pointerEvents="auto",st&&(st.innerHTML=me),$t=!1,_t&&ft&&ht===null&&_e(),mt===null&&ie()):(H.classList.remove("nf-visible"),H.classList.add("nf-hidden"),H.style.opacity="0",H.style.pointerEvents="none",st&&(st.innerHTML=ge),$t=!0,ht!==null&&(cancelAnimationFrame(ht),ht=null),mt!==null&&(cancelAnimationFrame(mt),mt=null)))}const Be={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function De(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=Rt;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"blue"}catch{t="blue"}const o=Be[t]||Be.blue;let l;try{l=chrome.runtime.getURL(o)}catch{l=`/${o}`}const s=lt.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${s},0.25) 0%, rgba(${s},0.12) 50%, rgba(${s},0.20) 100%)`,`url('${l}')`].join(", "),e.style.backgroundSize="auto, auto, 50%",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${s},0.45)`,e.style.boxShadow=`0 0 70px rgba(${s},0.22), 0 0 140px rgba(${s},0.1), inset 0 1px 0 rgba(${s},0.15)`}function Jt(e=1){if(lt=Ye(),ue(),H&&H.isConnected){H.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!tt||!tt.isConnected)&&(tt=null,Xt()),setTimeout(()=>{if(H)try{tt!=null&&tt.sheet&&tt.sheet.cssRules.length>0&&(H.style.removeProperty("background"),H.style.removeProperty("font-family"),H.style.removeProperty("overflow"))}catch{}},200);for(const t of ut)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;It=e,it=Yt(e),xe();for(const t of ut)ae(t);if(te(),Zt(),!H.querySelector(".nf-stop-btn")){const t=document.createElement("button");t.className="nf-stop-btn",t.innerHTML='<span class="nf-stop-icon"></span> หยุด',t.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",t.onclick=()=>{var o;window.__NETFLOW_STOP__=!0;try{Lt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((o=chrome.runtime)!=null&&o.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},H.appendChild(t)}$t&&Re();return}H&&!H.isConnected&&(H=null),tt&&(tt.remove(),tt=null),Xt();for(const t of ut)for(const o of t.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;if(It=e,it=Yt(e),e>1){const t=ut.find(l=>l.id==="video");if(t){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let s=2;s<=e;s++)l.push({id:`scene${s}-prompt`,label:`Scene ${s} Prompt`,status:"waiting"}),l.push({id:`scene${s}-gen`,label:`Scene ${s} Generate`,status:"waiting"}),l.push({id:`scene${s}-wait`,label:`Scene ${s} รอผล`,status:"waiting",progress:0});t.steps=l}const o=ut.find(l=>l.id==="render");if(o){const l=o.steps.find(p=>p.id==="download");l&&(l.label="ดาวน์โหลด 720p");const s=o.steps.find(p=>p.id==="upscale");s&&(s.label="Full Video")}}H=Qe(),H.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(H),H.classList.add("nf-visible"),$t=!1,Me(),Je(),rn(),requestAnimationFrame(()=>De()),setTimeout(()=>{if(H)try{tt!=null&&tt.sheet&&tt.sheet.cssRules.length>0&&(H.style.removeProperty("background"),H.style.removeProperty("font-family"),H.style.removeProperty("overflow"))}catch{}},200)}function Oe(){ve(),Pe(),$t=!1,H&&(H.classList.add("nf-fade-out"),setTimeout(()=>{H==null||H.remove(),H=null},500)),st&&(st.remove(),st=null)}const sn={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function ln(e,t,o){const l=it.findIndex(m=>m.status==="active"),s=it.filter(m=>m.status==="done").length,p=it.length,i=l>=0?l+1:s>=p?p:s,r=document.getElementById("nf-stat-step");r&&(r.textContent=`${i}/${p}`);let a=1;for(const m of it)if(m.status==="active"||m.status==="done")if(m.stepId.startsWith("scene")){const v=m.stepId.match(/^scene(\d+)-/);v&&(a=Math.max(a,parseInt(v[1],10)))}else(m.stepId==="download"||m.stepId==="upscale"||m.stepId==="open")&&(a=It);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=It>1?`${a}/${It}`:"1/1"),t==="active"){const m=document.getElementById("nf-stat-status"),v=sn[e]||e.toUpperCase();m&&(m.textContent=v)}else if(t==="done"&&s>=p){const m=document.getElementById("nf-stat-status");m&&(m.textContent="COMPLETE")}else if(t==="error"){const m=document.getElementById("nf-stat-status");m&&(m.textContent="ERROR")}const g=document.getElementById("nf-stat-progress");g&&(o!==void 0&&o>0?g.textContent=`${Math.min(100,o)}%`:t==="active"&&(g.textContent="—"))}function P(e,t,o){if(!H)return;for(const s of ut)for(const p of s.steps)p.id===e&&(p.status=t,o!==void 0&&(p.progress=o));for(const s of it)s.stepId===e&&(s.status=t,o!==void 0&&(s.progress=o));const l=document.getElementById(`nf-step-${e}`);if(l&&(l.className="nf-step",t==="active"?l.classList.add("nf-step-active"):t==="done"?l.classList.add("nf-step-done"):t==="error"&&l.classList.add("nf-step-error")),ln(e,t,o),o!==void 0){const s=document.getElementById(`nf-bar-${e}`);s&&(s.style.width=`${Math.min(100,o)}%`)}te(),Zt()}function At(e){P(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function Ot(e=4e3){ve(),Pe(),te(),Zt(),setTimeout(()=>Oe(),e)}function te(){for(const e of ut){const t=e.steps.filter(a=>a.status!=="skipped").length,o=e.steps.filter(a=>a.status==="done").length,l=e.steps.some(a=>a.status==="active"),s=t>0?Math.round(o/t*100):0,p=document.getElementById(`nf-pct-${e.id}`);p&&(p.textContent=`${s}%`);const i=document.getElementById(`nf-modbar-${e.id}`);i&&(i.style.width=`${s}%`);const r=document.getElementById(`nf-mod-${e.id}`);r&&(r.classList.remove("nf-active","nf-done"),s>=100?r.classList.add("nf-done"):l&&r.classList.add("nf-active"))}}function cn(e){var l,s,p,i;It=e;const t=new Map;for(const r of it)t.set(r.stepId,{status:r.status,progress:r.progress});it=Yt(e);for(const r of it){const a=t.get(r.stepId);a&&(r.status=a.status,a.progress!==void 0&&(r.progress=a.progress))}if(xe(),e>1){const r=ut.find(a=>a.id==="video");if(r){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((l=r.steps.find(d=>d.id==="animate"))==null?void 0:l.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((s=r.steps.find(d=>d.id==="vid-prompt"))==null?void 0:s.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((p=r.steps.find(d=>d.id==="vid-generate"))==null?void 0:p.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((i=r.steps.find(d=>d.id==="vid-wait"))==null?void 0:i.status)||"waiting",progress:0}];for(let d=2;d<=e;d++)a.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),a.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),a.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});r.steps=a,ae(r)}}const o=ut.find(r=>r.id==="render");if(o&&e>1){const r=o.steps.find(d=>d.id==="download");r&&(r.label="ดาวน์โหลด 720p");const a=o.steps.find(d=>d.id==="upscale");a&&(a.label="Full Video"),ae(o)}te(),Zt()}function ae(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(s=>s.remove()),e.steps.forEach(s=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${s.id}`;let i="";s.progress!==void 0&&(i=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${s.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${s.label}</span>
            ${i}
        `,t.appendChild(p)});const l=document.createElement("div");l.className="nf-mod-progress",l.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(l)}function Lt(e){e.replace(/^\[Netflow AI\]\s*/,"")}let Pt=null,Et=null;const dn=new Promise(e=>{Et=e,setTimeout(()=>e(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},e=>{!chrome.runtime.lastError&&(e!=null&&e.tabId)&&(Pt=e.tabId,console.log(`[Netflow AI] Tab ID: ${Pt}`)),Et&&(Et(Pt),Et=null)})}catch{Et&&(Et(null),Et=null)}function bt(){return Pt?`netflow_pending_action_${Pt}`:"netflow_pending_action"}function Le(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Lt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},M=e=>{console.warn(`[Netflow AI] ${e}`);try{Lt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}};(()=>{const e=(o,l)=>{const s=o.tagName.toLowerCase(),p=o.id?`#${o.id}`:"",i=o.className&&typeof o.className=="string"?"."+o.className.trim().split(/\s+/).join("."):"",r=o.getBoundingClientRect(),a={};for(const c of o.attributes)["class","id","style"].includes(c.name)||(a[c.name]=c.value.length>80?c.value.slice(0,80)+"…":c.value);const d=(o.textContent||"").trim().slice(0,120),g=Array.from(o.querySelectorAll('i, [class*="icon"]')).map(c=>{var k;return(k=c.textContent)==null?void 0:k.trim()}).filter(Boolean).join(", "),m=[];let v=o.parentElement;for(let c=0;c<5&&v;c++){const k=v.tagName.toLowerCase(),$=v.id?`#${v.id}`:"",x=v.className&&typeof v.className=="string"?"."+v.className.trim().split(/\s+/).slice(0,2).join("."):"";m.push(`${k}${$}${x}`),v=v.parentElement}const B=l==="click"?`%c🖱️ CLICK %c<${s}${p}${i}>`:`%c👆 HOVER %c<${s}${p}${i}>`;console.groupCollapsed(B,l==="click"?"background:#e74c3c;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold":"background:#3498db;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold","color:#f39c12;font-weight:bold"),console.log("Element:",o),console.log("Selector:",`${s}${p}${i}`),console.log("Rect:",{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}),Object.keys(a).length&&console.log("Attributes:",a),d&&console.log("Text:",d),g&&console.log("Icons:",g),m.length&&console.log("Ancestors:",m.join(" > ")),console.groupEnd()};document.addEventListener("click",o=>{const l=o.target;l!=null&&l.closest("#netflow-engine-overlay")||e(l,"click")},!0);let t=null;document.addEventListener("mouseover",o=>{const l=o.target;l!==t&&(l!=null&&l.closest("#netflow-engine-overlay")||(t=l,e(l,"hover")))},!0),console.log("%c[Netflow AI] 🔍 Debug Element Inspector ACTIVE — click/hover elements to inspect","background:#2ecc71;color:#000;padding:4px 8px;border-radius:4px;font-weight:bold")})();function re(e=3e3){n(`🔒 จะปิดแท็บ automation ใน ${e/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},t=>{chrome.runtime.lastError?M(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${t==null?void 0:t.message}`)})}catch(t){M(`ปิดแท็บผิดพลาด: ${t.message}`)}},e)}async function se(){try{if(await new Promise(s=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},p=>{if(chrome.runtime.lastError){s(!1);return}s(!!(p!=null&&p.cached))})}catch{s(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const s=document.querySelectorAll("video");for(const p of s){const i=p.src||p.currentSrc||"";if(i)return i}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const t=document.querySelectorAll("video");let o=null,l=0;for(const s of t){let p=s.src||"";if(!p){const a=s.querySelector("source");a&&(p=a.getAttribute("src")||"")}if(!p&&s.currentSrc&&(p=s.currentSrc),!p)continue;if(et()){o||(o=p,l=1);continue}const i=s.getBoundingClientRect(),r=i.width*i.height;i.width>50&&r>l&&(l=r,o=p)}if(!o)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${o.substring(0,80)}... (area=${l.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const s=await fetch(o);if(!s.ok)return n(`[TikTok] fetch failed: HTTP ${s.status}`),await Ne(o),o;const p=await s.blob(),i=(p.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${i} MB, type: ${p.type}`),p.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${p.size} bytes) — อาจเป็น thumbnail`);const r=await new Promise((a,d)=>{const g=new FileReader;g.onloadend=()=>a(g.result),g.onerror=()=>d(new Error("FileReader error")),g.readAsDataURL(p)});n(`[TikTok] Data URL พร้อม: ${(r.length/1024/1024).toFixed(1)} MB`),await new Promise(a=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:r},d=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):d!=null&&d.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${d==null?void 0:d.error}`),a()})})}catch(s){n(`[TikTok] Content script fetch error: ${s.message}`),await Ne(o)}return o}catch(e){return n(`[TikTok] captureVideoUrl error: ${e.message}`),null}}async function Ne(e){if(e.startsWith("https://"))try{await new Promise(t=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched via background: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),t()})})}catch{}}function le(e){if(e){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:e,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const Y=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),ce=/Win/i.test(navigator.userAgent),Fe=Y?"🍎 Mac":ce?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${Fe}`),window.__VIDEO_COMPLETE_SENT__=!1;class de extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Nt=null,kt=null,ze=!1;const Mt=new Map;let Ve=0;function pn(){if(Nt)return Nt;try{const e=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Nt=new Worker(URL.createObjectURL(e)),Nt.onmessage=t=>{const o=Mt.get(t.data);o&&(Mt.delete(t.data),o())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Nt}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function fn(){if(kt)return kt;if(ze)return null;try{return kt=chrome.runtime.connect({name:"timer"}),kt.onMessage.addListener(e=>{const t=Mt.get(e.id);t&&(Mt.delete(e.id),t())}),kt.onDisconnect.addListener(()=>{kt=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),kt}catch{return ze=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const f=e=>new Promise((t,o)=>{if(window.__NETFLOW_STOP__)return o(new de);let l=!1;const s=()=>{if(!l){if(l=!0,window.__NETFLOW_STOP__)return o(new de);t()}};setTimeout(s,e);const p=pn();if(p){const a=++Ve;Mt.set(a,s),p.postMessage({id:a,ms:e});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e+2e3},()=>{chrome.runtime.lastError||s()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:e},()=>{chrome.runtime.lastError?setTimeout(s,e):s()});return}catch{}const i=fn();if(i){const a=++Ve;Mt.set(a,s),i.postMessage({cmd:"delay",id:a,ms:e});return}const r=setTimeout(s,e);f._lastId=r});function Ct(){return!!window.__NETFLOW_STOP__}const et=()=>document.hidden;let Ue=0;async function Tt(){if(!document.hidden)return!1;const e=Date.now();if(e-Ue<15e3)return!1;Ue=e;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await f(1500),!0}catch{return!1}}async function wt(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(t=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>t()));const e=Date.now();for(;document.hidden&&Date.now()-e<5e3;)await f(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function qe(){var l,s,p;const e=document.querySelectorAll("div, p, span");for(const i of e){const r=(i.textContent||"").trim().toLowerCase();if(r.includes("experiencing high demand")||r.includes("high demand. things might not be working")){let a=i.parentElement;for(let d=0;d<5&&a;d++){const g=a.querySelector("button");if(g&&((l=g.textContent)!=null&&l.toLowerCase().includes("close")||g.innerHTML.includes("close")||g.innerHTML.includes("svg")||(s=g.textContent)!=null&&s.includes("X"))){g.click(),n("❌ ปิดแจ้งเตือน High Demand อัตโนมัติ");break}if(a.getAttribute("role")==="alert"||a.style.position==="fixed"){a.style.display="none",n("❌ ซ่อนแจ้งเตือน High Demand อัตโนมัติ");break}a=a.parentElement}}}const t=["audio generation failed","couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","might violate","violate our policies","อาจละเมิด","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],o=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const i of o){if(i.closest("#netflow-engine-overlay"))continue;const r=(i.textContent||"").trim().toLowerCase();if(!(r.length>200||r.length<5)&&!(r.includes("high demand")||r.includes("experiencing high demand")||r.includes("things might not be working"))){for(const a of t)if(r.includes(a)){if(r.includes("high demand")||r.includes("experiencing high demand"))continue;return((p=i.textContent)==null?void 0:p.trim())||a}}}return null}function un(e){let t=e;const o=[/STRICT FACE & HEAD LOCK:[^.]*\./gi,/BODY LOCK:[^.]*\./gi,/HAIR LOCK:[^.]*\./gi,/FACE LOCK[^.]*\./gi,/PRODUCT IDENTITY LOCK:[^.]*\./gi,/LABEL LOCK:[^.]*\./gi,/PRODUCT EVERY FRAME:[^.]*\./gi,/TRANSITION STABILITY:[^.]*\./gi,/ANTI[_-]DUPLICATION:[^.]*\./gi,/ANTI[_-]TEXT[^.]*\./gi,/ANTI[_-]MORPH[^.]*\./gi,/ANTI[_-]DISTORTION[^.]*\./gi,/ANTI[_-]ADDITION[^.]*\./gi,/ANTI[_-]FLOATING[^.]*\./gi,/PROPS vs PRODUCT:[^.]*\./gi,/BRAND IDENTITY FREEZE[^.]*\./gi,/BRAND MORPHING[^.]*\./gi,/PRODUCT SIZE \(CRITICAL\):[^.]*\./gi,/PRODUCT SIZE REALISM:[^.]*\./gi,/VOICE DISCIPLINE:[^.]*\./gi,/ZERO INVENTION:[^.]*\./gi,/REALISM:[^.]*\./gi,/SCREEN CONTENT[^.]*\./gi,/SINGLE UTENSIL RULE[^.]*\./gi,/PRODUCT LOCK[^.]*\./gi,/FACE & HEAD LOCK[^.]*\./gi,/CLOTHING FIDELITY[^.]*\./gi,/FRONT[_-]FACING[^.]*\./gi];for(const i of o)t=t.replace(i,"");const l=["DO NOT","NEVER","FORBIDDEN","MUST NOT","ABSOLUTELY NO","IMMUTABLE","LOCKED","HIGHEST PRIORITY","#1 FORBIDDEN","Do NOT let","Do NOT add","Do NOT generate","Do NOT simplify","Do NOT invent","ZERO on-screen","NO split screen","NO collage","NO side-by-side","NO divided frames","never morph","never simplify","never change shape","never disappear","never be hidden","never exit","BRAND MORPHING IS","objects MUST NOT magically"];return t=t.split(/(?<=[.!])\s+/).filter(i=>!l.some(r=>i.includes(r))).join(" "),t=t.replace(/\s{2,}/g," ").trim(),t.length>1200&&(t=t.replace(/Render with extreme surface detail[^.]*\./gi,""),t=t.replace(/High-fidelity visual detail[^.]*\./gi,""),t=t.replace(/Product lit with soft rim light[^.]*\./gi,""),t=t.replace(/visible material texture[^.]*\./gi,""),t=t.replace(/Fluid motion, cinematic motion blur[^.]*\./gi,""),t=t.replace(/AI-observed appearance:[^.]*\./gi,""),t=t.replace(/Reference clothing:[^.]*\./gi,""),t=t.replace(/\s{2,}/g," ").trim()),n(`🛡️ Safe retry prompt: ${e.length} → ${t.length} chars (${Math.round((1-t.length/e.length)*100)}% reduction)`),t}async function Q(e){if(et()){e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),e.click();return}const t=e.getBoundingClientRect(),o=t.left+t.width/2,l=t.top+t.height/2,s={bubbles:!0,cancelable:!0,clientX:o,clientY:l,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",s)),await f(80),e.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",s)),e.dispatchEvent(new MouseEvent("click",s)),await f(50),e.click()}function Ft(e){const t=e.getBoundingClientRect(),o=t.left+t.width/2,l=t.top+t.height/2,s={bubbles:!0,cancelable:!0,clientX:o,clientY:l};e.dispatchEvent(new PointerEvent("pointerenter",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",s)),e.dispatchEvent(new PointerEvent("pointerover",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",s)),e.dispatchEvent(new PointerEvent("pointermove",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",s))}function gn(e){const t=[],o=document.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols'], [data-icon]");for(const l of o){if((l.textContent||"").trim()!==e)continue;let p=l,i=null,r=1/0;for(let a=0;a<20&&p&&(p=p.parentElement,!(!p||p===document.body));a++){if(et()){a>=3&&p.children.length>0&&!i&&(i=p);continue}const d=p.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const g=d.width*d.height;g<r&&(i=p,r=g)}}i&&!t.includes(i)&&t.push(i)}return t.sort((l,s)=>{const p=l.getBoundingClientRect(),i=s.getBoundingClientRect();return p.left-i.left}),t}function pe(e=!1){const t=[],o=document.querySelectorAll("video");for(const i of o){let r=i.parentElement;for(let a=0;a<10&&r;a++){if(et()){if(a>=3&&r.children.length>0){t.push({el:r,left:0});break}r=r.parentElement;continue}const d=r.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){t.push({el:r,left:d.left});break}r=r.parentElement}}const l=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const i of l){const r=(i.textContent||"").trim();if(r==="play_arrow"||r==="play_circle"||r==="videocam"){let a=i.parentElement;for(let d=0;d<10&&a;d++){if(et()){if(d>=3&&a.children.length>0){t.push({el:a,left:0});break}a=a.parentElement;continue}const g=a.getBoundingClientRect();if(g.width>120&&g.height>80&&g.width<window.innerWidth*.7&&g.top>=-50&&g.left<window.innerWidth*.75){t.push({el:a,left:g.left});break}a=a.parentElement}}}const s=document.querySelectorAll("img");for(const i of s){const r=(i.alt||"").toLowerCase();if(r.includes("video")||r.includes("วิดีโอ")){let a=i.parentElement;for(let d=0;d<10&&a;d++){if(et()){if(d>=3&&a.children.length>0){t.push({el:a,left:0});break}a=a.parentElement;continue}const g=a.getBoundingClientRect();if(g.width>120&&g.height>80&&g.width<window.innerWidth*.7&&g.top>=-50&&g.left<window.innerWidth*.75){t.push({el:a,left:g.left});break}a=a.parentElement}}}const p=Array.from(new Set(t.map(i=>i.el))).map(i=>t.find(r=>r.el===i));if(p.sort((i,r)=>i.left-r.left),p.length>0){const i=p[0].el,r=i.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),i}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function mn(){const e=gn("image");if(e.length>0){const o=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${o.left.toFixed(0)},${o.top.toFixed(0)}) ขนาด ${o.width.toFixed(0)}x${o.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const o of t){let l=o.parentElement;for(let s=0;s<10&&l;s++){if(et()){if(s>=3&&l.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),l;l=l.parentElement;continue}const p=l.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${p.left.toFixed(0)},${p.top.toFixed(0)})`),l;l=l.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function hn(e,t){var r;const[o,l]=e.split(","),s=((r=o.match(/:(.*?);/))==null?void 0:r[1])||"image/png",p=atob(l),i=new Uint8Array(p.length);for(let a=0;a<p.length;a++)i[a]=p.charCodeAt(a);return new File([i],t,{type:s})}async function bn(e,t=1024,o=.8){try{if(e.length<5e5)return n(`🗜️ รูปเล็กพอ (${(e.length/1024).toFixed(0)} KB base64) — ไม่บีบอัด`),e;n(`🗜️ รูปใหญ่ (${(e.length/1024).toFixed(0)} KB base64) — กำลังบีบอัด...`);const l=new Image;await new Promise((g,m)=>{l.onload=()=>g(),l.onerror=()=>m(new Error("Image load failed")),l.src=e});let{width:p,height:i}=l;if(p>t||i>t){const g=t/Math.max(p,i);p=Math.round(p*g),i=Math.round(i*g)}const r=document.createElement("canvas");r.width=p,r.height=i;const a=r.getContext("2d");if(!a)return e;a.drawImage(l,0,0,p,i);const d=r.toDataURL("image/jpeg",o);return n(`🗜️ บีบอัดแล้ว: ${(e.length/1024).toFixed(0)} KB → ${(d.length/1024).toFixed(0)} KB (${p}x${i})`),r.width=0,r.height=0,d}catch(l){return M(`🗜️ บีบอัดล้มเหลว: ${l.message} — ใช้รูปต้นฉบับ`),e}}function xt(e){var s;const t=[],o=new WeakSet,l=["i.google-symbols","i[class*='google-symbols']",".material-symbols-outlined",".material-icons",".material-symbols-rounded",".material-symbols-sharp","i[class*='material']","span[class*='material']","i[class*='icon']","span[class*='icon']","[data-icon]","[class*='gm-icon']","[class*='gmat-icon']","i"];for(const p of l){for(const i of document.querySelectorAll(p))if(((s=i.textContent)==null?void 0:s.trim())===e){const r=i.closest("button");r&&!o.has(r)&&(o.add(r),t.push(r))}if(t.length>0)break}if(t.length===0)for(const p of document.querySelectorAll("button")){const i=(p.getAttribute("aria-label")||"").toLowerCase();(i===e.toLowerCase()||i.includes(e.toLowerCase()))&&(o.has(p)||(o.add(p),t.push(p)))}return t}function wn(){const e=["add","add_2","add_circle","add_circle_outline","attach_file","attach_file_add","attachment","note_add"];let t=[];for(const i of e)if(t=xt(i),t.length>0)break;if(t.length>0){let i=null,r=0;for(const a of t){const d=a.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.y>r&&(r=d.y,i=a)}if(i)return n(`พบปุ่ม "+" ของ Prompt Bar (icon) ที่ y=${r.toFixed(0)}`),i}n("ไม่พบปุ่มเพิ่มจากไอคอน — ลอง fallback ทั้งหมด");const o=["add","attach","upload","create","insert","plus","เพิ่ม","แนบ","อัปโหลด","สร้าง"];for(const i of document.querySelectorAll("button")){const r=(i.getAttribute("aria-label")||"").toLowerCase(),a=(i.getAttribute("title")||"").toLowerCase();if(o.some(d=>r.includes(d)||a.includes(d))){if(et())return n('พบปุ่ม "+" (aria/title) hidden mode'),i;const d=i.getBoundingClientRect();if(d.bottom>window.innerHeight*.6&&d.width<80&&d.height<80)return n(`พบปุ่ม "+" (aria="${r}" title="${a}") ที่ y=${d.y.toFixed(0)}`),i}}const l=document.querySelectorAll("button");for(const i of l){const r=(i.textContent||"").trim();if(r!=="+"&&r!=="add"&&r!=="Add")continue;if(et())return i;const a=i.getBoundingClientRect();if(a.bottom>window.innerHeight*.6&&a.width<80&&a.height<80)return n(`พบปุ่ม "+" (text="${r}") ที่ y=${a.y.toFixed(0)}`),i}const s=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');if(s){const i=s.getBoundingClientRect();let r=null,a=1/0;for(const d of l){const g=d.getBoundingClientRect();if(g.width<10||g.height<10||g.width>100||g.height>100||Math.abs(g.top-i.top)>80)continue;const m=Math.abs(g.left-i.left)+Math.abs(g.top-i.top);m<a&&(a=m,r=d)}if(r)return n(`พบปุ่ม "+" (ใกล้ prompt bar, dist=${a.toFixed(0)})`),r}for(const i of l){const r=i.querySelector("svg");if(!r)continue;const a=r.querySelectorAll("path, line, polygon"),d=Array.from(a).map(g=>g.getAttribute("d")||"").join(" ");if(d.includes("M12")||d.includes("M11")||d.includes("M10")){if(et())return i;const g=i.getBoundingClientRect();if(g.bottom>window.innerHeight*.6&&g.width<80&&g.height<80)return n(`พบปุ่ม "+" (SVG) ที่ y=${g.y.toFixed(0)}`),i}}const p=[];for(const i of l){const r=i.getBoundingClientRect();if(r.bottom>window.innerHeight*.6&&r.width>0){const a=(i.textContent||"").trim().substring(0,30),d=i.getAttribute("aria-label")||"",g=(i.className||"").substring(0,40),m=i.querySelector("i, span[class*='icon'], svg")?"has-icon":"no-icon";p.push(`"${a}" aria="${d}" cls="${g}" ${m} y=${r.y.toFixed(0)}`)}}return M(`ไม่พบปุ่ม "+" — ปุ่มที่พบบริเวณล่าง (${p.length}): ${p.slice(0,5).join(" | ")}`),null}function fe(){for(const l of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const s=xt(l);let p=null,i=0;for(const r of s){const a=r.getBoundingClientRect();a.y>i&&(i=a.y,p=r)}if(p)return n(`พบปุ่ม Generate จากไอคอน "${l}" ที่ y=${i.toFixed(0)}`),p}const e=document.querySelectorAll("button");let t=null,o=0;for(const l of e){if(et())break;const s=l.getBoundingClientRect();if(s.bottom>window.innerHeight*.7&&s.right>window.innerWidth*.5){const p=Math.abs(s.width-s.height)<10&&s.width<60,i=s.y+s.x+(p?1e3:0);i>o&&(o=i,t=l)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const l of e){const s=(l.getAttribute("aria-label")||"").toLowerCase();if(s.includes("generate")||s.includes("submit")||s.includes("send")||s.includes("สร้าง"))return l}return null}function zt(){const e=document.querySelectorAll("textarea");for(const l of e)if(et()||l.getBoundingClientRect().bottom>window.innerHeight*.5)return l;const t=document.querySelectorAll('[contenteditable="true"]');for(const l of t)if(et()||l.getBoundingClientRect().bottom>window.innerHeight*.5)return l;const o=document.querySelectorAll("input[type='text'], input:not([type])");for(const l of o){const s=l.placeholder||"";if(s.includes("สร้าง")||s.includes("prompt")||s.includes("describe"))return l}return e.length>0?e[e.length-1]:null}async function Vt(e,t){var o,l,s,p;e.focus(),await f(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const i=new DataTransfer;i.setData("text/plain",t),i.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const r=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:i});e.dispatchEvent(r),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const a=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:i});e.dispatchEvent(a),await f(800);const d=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(i){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await f(100);const i=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(i);const r=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(r),await f(800);const a=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(a.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${a.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(i){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await f(200);const i=new DataTransfer;i.setData("text/plain",t),i.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const r=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:i});e.dispatchEvent(r),await f(800);const a=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(a.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${a.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(i){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((o=navigator.clipboard)!=null&&o.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const r=document.createElement("textarea");r.value=t,r.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(r),r.focus(),r.select(),document.execCommand("copy"),document.body.removeChild(r),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await f(200),document.execCommand("paste"),await f(500);const i=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(i.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${i.length} ตัวอักษร)`);return}}catch(i){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${i.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const i=Object.keys(e).find(r=>r.startsWith("__reactFiber$")||r.startsWith("__reactInternalInstance$"));if(i){let r=e[i];for(let a=0;a<30&&r;a++){const d=r.memoizedProps,g=r.memoizedState;if((l=d==null?void 0:d.editor)!=null&&l.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const m=d.editor;m.selection,m.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((p=(s=g==null?void 0:g.memoizedState)==null?void 0:s.editor)!=null&&p.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),g.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}r=r.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(i){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${i.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Ut(){const e=new Set,t=document.querySelectorAll('img, canvas, video, [role="img"], [style*="background-image"], [class*="thumb"], [class*="preview"], [class*="upload"], [class*="attachment"]');for(const o of t){if(o.closest("#netflow-engine-overlay")||(o instanceof HTMLImageElement||o instanceof HTMLVideoElement)&&!o.src)continue;if(et()){e.add(o);continue}const l=o.getBoundingClientRect(),s=l.width>20&&l.width<220&&l.height>20&&l.height<220,p=l.bottom>window.innerHeight*.55,i=o.offsetParent!==null||getComputedStyle(o).position==="fixed";s&&p&&i&&e.add(o)}return e.size}async function He(e,t=5e3){var r;const o=Date.now(),l=["upload","upload_file","upload_2","cloud_upload","file_upload","add_photo_alternate","photo_library"],s=["upload image","อัปโหลดรูปภาพ","upload","อัปโหลด","upload file","add image","เพิ่มรูป","เพิ่มรูปภาพ"],p=new Set(["tab","tablist","tabpanel","navigation"]);for(;Date.now()-o<t;){for(const m of document.querySelectorAll("button")){if(m===e)continue;const v=m.querySelector("i");if(!v)continue;const B=(v.textContent||"").trim().toLowerCase();if(B==="upload"||B==="upload_file"||B==="cloud_upload"){const R=m.getBoundingClientRect();if(R.width>0&&R.height>0&&R.y>window.innerHeight*.4)return n(`🎯 พบปุ่ม Upload โดยตรง (icon="${B}" y=${R.y.toFixed(0)})`),m}}const a=[],d=e.getAttribute("aria-controls");if(d){const m=document.getElementById(d);m&&a.push(m)}const g=e.getAttribute("aria-owns");if(g){const m=document.getElementById(g);m&&a.push(m)}for(const m of["[data-radix-portal]","[data-radix-popper-content-wrapper]",'[role="dialog"]','[role="menu"]','[role="listbox"]',"[data-radix-menu-content]","[data-radix-dropdown-menu-content]","[data-radix-popover-content]",'[class*="popover"]','[class*="dropdown"]','[class*="menu-content"]','[class*="dialog"]'])for(const v of document.querySelectorAll(m))a.push(v);for(const m of document.querySelectorAll("[id]"))(m.id||"").match(/^radix-/)&&a.push(m);for(const m of a)for(const v of m.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[tabindex], a")){if(v===e)continue;const B=(v.getAttribute("role")||"").toLowerCase();if(p.has(B))continue;const R=v.querySelector("i, span[class*='icon'], span[class*='material']"),S=((r=R==null?void 0:R.textContent)==null?void 0:r.trim().toLowerCase())||"";if(l.includes(S))return n(`พบปุ่ม Upload (icon="${S}")`),v;const c=(v.textContent||"").trim().toLowerCase(),k=Array.from(v.querySelectorAll("span, div, p")).map(x=>{var C;return((C=x.textContent)==null?void 0:C.trim().toLowerCase())||""});if(s.some(x=>c===x||k.some(C=>C===x))){if(c==="image"||c==="video"||c==="รูปภาพ"||c==="วิดีโอ")continue;return n(`พบปุ่ม Upload (text="${c.substring(0,40)}")`),v}const $=(v.getAttribute("aria-label")||"").toLowerCase();if(s.some(x=>$.includes(x)))return n(`พบปุ่ม Upload (aria="${$}")`),v}if(Date.now()-o>t/2)for(const m of document.querySelectorAll("button, [role='menuitem']")){if(m===e)continue;const v=(m.getAttribute("role")||"").toLowerCase();if(p.has(v))continue;const B=(m.textContent||"").trim().toLowerCase();if(B==="image"||B==="video"||B==="รูปภาพ"||B==="วิดีโอ")continue;const R=m.getBoundingClientRect();if(!(R.width===0||R.height===0||R.y<window.innerHeight*.4)&&s.some(S=>B===S||B.includes(S))&&B.length<50)return n(`พบปุ่ม Upload (global search, text="${B.substring(0,40)}")`),m}await f(500)}const i=[];for(const a of["[data-radix-portal]",'[role="dialog"]','[role="menu"]']){const d=document.querySelectorAll(a);if(d.length>0)for(const g of d){const m=g.querySelectorAll("button, [role='menuitem']");for(const v of m)i.push(`[${a}] "${(v.textContent||"").trim().substring(0,30)}"`)}}return M(`ไม่พบปุ่ม Upload — พบ elements ใน dialogs: ${i.slice(0,8).join(" | ")||"(ว่าง)"}`),null}async function xn(){document.querySelectorAll("[data-netflow-captured]").forEach(t=>t.removeAttribute("data-netflow-captured")),document.documentElement.removeAttribute("data-nf-block-active");const e=document.createElement("script");if(e.textContent=`(function(){
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
    })();`,document.documentElement.appendChild(e),e.remove(),document.documentElement.hasAttribute("data-nf-block-active")){n("🛡️ File dialog blocked in MAIN WORLD (inline script)");return}M("⚠️ Inline script blocked by CSP — using chrome.scripting fallback");try{await new Promise((t,o)=>{chrome.runtime.sendMessage({type:"BLOCK_FILE_DIALOG"},l=>{chrome.runtime.lastError?o(new Error(chrome.runtime.lastError.message)):t()})}),await f(200),document.documentElement.hasAttribute("data-nf-block-active")?n("🛡️ File dialog blocked in MAIN WORLD (chrome.scripting fallback)"):M("❌ Failed to block file dialog — both methods failed")}catch(t){M(`❌ chrome.scripting fallback failed: ${t.message}`)}}function yn(){const e=document.createElement("script");e.textContent=`(function(){
        if(!window.__nfBlocked) return;
        HTMLInputElement.prototype.click = window.__nfOrigClick;
        if(typeof window.__nfOrigShowPicker==='function'){
            HTMLInputElement.prototype.showPicker = window.__nfOrigShowPicker;
        }
        delete window.__nfBlocked;
        delete window.__nfOrigClick;
        delete window.__nfOrigShowPicker;
        document.documentElement.removeAttribute('data-nf-block-active');
    })();`,document.documentElement.appendChild(e),e.remove(),document.documentElement.hasAttribute("data-nf-block-active")&&chrome.runtime.sendMessage({type:"UNBLOCK_FILE_DIALOG"},()=>{}),document.querySelectorAll("[data-netflow-captured]").forEach(t=>t.removeAttribute("data-netflow-captured")),n("🛡️ File dialog UNBLOCKED in MAIN WORLD")}async function Ge(e,t){n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const o=await bn(e),l=hn(o,t);n(`ขนาดไฟล์: ${(l.size/1024).toFixed(1)} KB`);const s=Ut();n(`รูปย่อปัจจุบันใน Prompt Bar: ${s} รูป`),n("── ขั้นตอน 1: คลิกปุ่ม '+' (Create) ──"),await wt();const p=zt();p&&(p.focus(),await f(500));let i=null;for(let a=0;a<15&&(i=wn(),!i);a++){if(await f(1e3),a%3===0){const d=zt();d&&d.focus()}n(`⏳ รอปุ่ม '+' บน Prompt Bar... (${a+1}/15)`)}if(!i)return M("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;i.click(),n("คลิกปุ่ม '+' (Create) ✅"),await f(1500),n("── ขั้นตอน 2: หาและคลิกปุ่ม 'Upload image' ──");const r=await He(i,5e3);if(!r){M("ไม่พบปุ่ม 'Upload image' ใน Dialog — ลอง pointer events สำหรับปุ่ม '+'");const a=i.getBoundingClientRect(),d=a.left+a.width/2,g=a.top+a.height/2,m={bubbles:!0,cancelable:!0,clientX:d,clientY:g,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",m)),await f(80),i.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",m)),i.dispatchEvent(new MouseEvent("click",m)),await f(1500);const v=await He(i,3e3);return v?await We(v,l,t,s):(M("❌ ไม่พบปุ่ม Upload image หลังจากลองทั้ง 2 วิธี"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),!1)}return await We(r,l,t,s)}async function We(e,t,o,l){var d;n("── ขั้นตอน 3: บล็อค file dialog + คลิก Upload + ฉีดไฟล์ ──"),await xn();try{document.querySelectorAll("[data-netflow-captured]").forEach(g=>g.removeAttribute("data-netflow-captured")),e.click(),n("คลิกปุ่ม 'Upload image' ✅"),await f(800)}finally{yn()}let s=document.querySelector('input[type="file"][data-netflow-captured]');if(s&&n(`🎯 พบ captured file input จาก main world: accept="${s.accept}"`),s||(s=vn()||document.querySelector('input[type="file"]')),!s)return M("ไม่พบ file input หลังคลิก Upload — ลอง direct drag-drop"),await $n(t,l);const p=new DataTransfer;p.items.add(t),s.files=p.files,n(`ฉีดไฟล์ ${o} เข้า file input (${((d=s.files)==null?void 0:d.length)??0} ไฟล์)`);const i=s._valueTracker;i&&(i.setValue(""),n("รีเซ็ต React _valueTracker")),s.dispatchEvent(new Event("change",{bubbles:!0})),n("ส่ง change event ✅ (single event เพื่อป้องกันรูปซ้ำ)"),n("── ขั้นตอน 4: รอยืนยันรูปย่อ ──");const r=Date.now();let a=!1;for(;Date.now()-r<15e3;){const g=Ut();if(g>l)return n(`✅ สำเร็จ: รูปย่อเพิ่มจาก ${l} → ${g}`),!0;const m=document.querySelectorAll("span, div, p");for(const v of m){const B=(v.textContent||"").trim();if(/^\d{1,3}%$/.test(B)){a=!0,n(`กำลังอัพโหลด: ${B}`);break}}await f(1e3)}return a?(n(`✅ ตรวจพบการอัพโหลด ${o} แล้ว แม้ยังนับรูปย่อใหม่ไม่ชัด — ดำเนินการต่อ`),!0):(M(`❌ อัพโหลด ${o} ไม่สำเร็จ — ไม่พบรูปย่อภายใน 15 วินาที`),!1)}function vn(){const e=document.querySelectorAll('input[type="file"][accept*="image"]');if(e.length>0)return e[e.length-1];const t=document.querySelectorAll('input[type="file"]');return t.length>0?t[t.length-1]:null}async function $n(e,t){n("── Fallback: drag-and-drop ลงบน workspace ──");const o=new DataTransfer;o.items.add(e);let l=null;const s=document.querySelectorAll('[class*="workspace"], [class*="drop"], [class*="media"], main, [role="main"]');for(const g of s){const m=g.getBoundingClientRect();if(m.width>200&&m.height>200){l=g;break}}l||(l=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)||document.body);const p=l.getBoundingClientRect(),i=p.left+p.width/2,r=p.top+p.height/2,a={bubbles:!0,cancelable:!0,clientX:i,clientY:r,dataTransfer:o};l.dispatchEvent(new DragEvent("dragenter",a)),await f(100),l.dispatchEvent(new DragEvent("dragover",a)),await f(100),l.dispatchEvent(new DragEvent("drop",a)),n(`ส่ง drag-drop ลง <${l.tagName}>`);const d=Date.now();for(;Date.now()-d<8e3;){if(Ut()>t)return n("✅ drag-drop สำเร็จ — พบรูปย่อใหม่"),!0;await f(1e3)}return M("❌ drag-drop ล้มเหลว — ไม่พบรูปย่อใหม่"),!1}async function En(e,t){var k,$;n("=== ขั้น 0: ตั้งค่า Flow ===");let o=null;for(let x=0;x<10;x++){const C=document.querySelectorAll("button, div, span, [role='button']");for(const u of C){const b=(u.textContent||"").trim();if(!(b.length>80)&&!(b.includes("ดาวน์โหลด")||b.includes("Download")||b.includes("download"))&&!(b.length>30)&&(b.includes("Nano Banana")||b.includes("Imagen")||b.includes("วิดีโอ")||b.includes("รูปภาพ")||b.includes("Image")||b.includes("Video"))){const D=u.getBoundingClientRect();D.bottom>window.innerHeight*.7&&D.width>30&&D.height>10&&(!o||(u.textContent||"").length<(o.textContent||"").length)&&(o=u)}}if(o){n(`พบปุ่มตั้งค่าจากข้อความ: "${(o.textContent||"").substring(0,40).trim()}"`);break}const y=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons, .material-symbols-rounded, span[class*='material'], span[class*='icon'], i");for(const u of y){const b=((k=u.textContent)==null?void 0:k.trim())||"";if(b.includes("crop")||b==="aspect_ratio"||b==="photo_size_select_large"){const D=u.closest("button, div[role='button'], [role='button']")||u.parentElement;if(D){const h=D.getBoundingClientRect();if(h.bottom>window.innerHeight*.7&&h.width>0){o=D,n(`พบปุ่มตั้งค่าจากไอคอน: ${b}`);break}}}}if(o)break;for(const u of C){const b=(u.textContent||"").trim();if(!(b.length>40)&&/x[1-4]/.test(b)&&(b.includes("วิดีโอ")||b.includes("รูปภาพ")||b.includes("Video")||b.includes("Image"))){const D=u.getBoundingClientRect();if(D.bottom>window.innerHeight*.7&&D.width>30){o=u,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${b.substring(0,40)}"`);break}}}if(o)break;n(`⏳ รอปุ่มตั้งค่า... (${x+1}/10)`),await f(1e3)}if(!o)return M("ไม่พบปุ่มตั้งค่า (หมด 10 รอบ)"),!1;const l=["Video","Image","วิดีโอ","รูปภาพ","Nano Banana","Imagen"],s=x=>{const C=(x.textContent||"").trim();return C.length>40||C.includes("ดาวน์โหลด")||C.includes("Download")||C.includes("download")?!1:l.some(y=>C.includes(y))},p=[];p.push(o);const i=o.closest("button");i&&i!==o&&s(i)&&(p.unshift(i),n(`ปุ่มตั้งค่า: parent <button> "${(i.textContent||"").trim().substring(0,30)}"`));const r=o.closest('[role="button"]');r&&r!==o&&r!==i&&s(r)&&(p.unshift(r),n(`ปุ่มตั้งค่า: parent [role=button] "${(r.textContent||"").trim().substring(0,30)}"`));let a=o;for(let x=0;x<3&&a;x++)a=a.parentElement,a&&s(a)&&!p.includes(a)&&p.push(a);const d=()=>document.querySelectorAll('[data-radix-portal], [data-radix-popper-content-wrapper], [role="dialog"], [role="menu"], [role="listbox"]').length;let g=!1,m=p[0];for(const x of p){const C=d();n(`ลองคลิกตั้งค่า: <${x.tagName}> "${(x.textContent||"").trim().substring(0,30)}"`),await Q(x),await f(2500);const y=d(),u=!!document.querySelector('[role="tab"]');if(y>C||u){g=!0,m=x,n(`✅ Popover เปิดแล้ว (portals: ${C}→${y}, tabs: ${u})`);break}n(`❌ ไม่มี popover เปิด (portals: ${C}→${y}) — ลองตัวถัดไป`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}g||(n("⚠️ Popover ไม่เปิดจากการคลิก — ลองคลิกปุ่มตั้งค่าอีกครั้งพร้อมรอนานขึ้น (Mac)"),await Q(m),await f(5e3));let v=!1,B=null;for(let x=0;x<3&&!B;x++){x>0&&(n(`⏳ ลองหาแท็บ Image อีกครั้ง (${x+1}/3)...`),await Q(m),await f(2e3));const C=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"], [class*="tab_slider_trigger"][role="tab"]');for(const y of C){const u=y.getAttribute("aria-controls")||"",b=y.id||"";if(u.toUpperCase().includes("IMAGE")||b.toUpperCase().includes("IMAGE")){B=y,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${u})`);break}}if(!B)for(const y of document.querySelectorAll('[role="tab"]')){const u=y.id||"";if(u.toUpperCase().includes("IMAGE")){B=y,n(`พบแท็บ Image ผ่าน id: ${u}`);break}}if(!B)for(const y of document.querySelectorAll('[role="tab"]')){const u=y.getAttribute("aria-label")||(($=y.textContent)==null?void 0:$.trim())||"";if(u.toLowerCase().includes("image")||u.includes("รูปภาพ")){B=y,n(`พบแท็บ Image ผ่าน accessible name: "${u.substring(0,30)}"`);break}}if(!B)for(const y of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const u=(y.textContent||"").trim();if(!(u.length>30)&&(u==="Image"||u.endsWith("Image")||u==="รูปภาพ"||u==="ภาพ"||u.includes("รูปภาพ"))&&!u.includes("Video")&&!u.includes("วิดีโอ")){const b=y.getBoundingClientRect();if(b.width>0&&b.height>0){B=y,n(`พบแท็บ Image ผ่านข้อความ: "${u}"`);break}}}if(!B)for(const y of document.querySelectorAll('[data-radix-portal], [data-radix-popper-content-wrapper], [role="dialog"], [role="menu"]')){for(const u of y.querySelectorAll('button, [role="tab"]')){const b=(u.textContent||"").trim().toLowerCase();if((b==="image"||b.includes("image"))&&!b.includes("video")){B=u,n(`พบแท็บ Image ใน Radix portal: "${b}"`);break}}if(B)break}B||await f(1e3)}if(B){const x=B.getAttribute("data-state")||"",C=B.getAttribute("aria-selected")||"";x==="active"||C==="true"?(v=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก")):(await Q(B),v=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await f(400))}if(!v&&!B){n("⚠️ ลองสลับโหมดด้วยวิธีตรง..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500);const x=document.querySelectorAll("button, div, span, [role='button'], [role='tab']"),C=[];for(const y of x){const u=(y.textContent||"").trim();if(u.length>40||!u.includes("Video")&&!u.includes("วิดีโอ"))continue;const b=y.getBoundingClientRect();!et()&&(b.bottom<window.innerHeight*.7||b.width<10||b.height<8)||C.push(y)}C.sort((y,u)=>(y.textContent||"").length-(u.textContent||"").length);for(const y of C){n(`Fallback 6: คลิก "${(y.textContent||"").trim().substring(0,30)}" <${y.tagName}>`);const u=[y],b=y.closest("button, [role='button']");b&&b!==y&&u.push(b),y.parentElement&&u.push(y.parentElement);for(const D of u){await Q(D),await f(2500);const h=document.querySelectorAll('[role="option"], [role="menuitem"], [role="tab"], [role="radio"], button, div, span');for(const E of h){const w=(E.textContent||"").trim();if(!(w.length>20)&&(w==="Image"||w==="รูปภาพ"||w==="ภาพ"||w.endsWith("Image"))&&!w.includes("Video")&&!w.includes("วิดีโอ")&&(E.getBoundingClientRect().width>0||et())){await Q(E),v=!0,n(`✅ สลับเป็น Image ผ่าน Fallback 6: "${w}"`),await f(500);break}}if(v)break;document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300)}if(v)break}}v||M("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว หรือต้องสลับด้วยตนเอง");const R=e==="horizontal"?"แนวนอน":"แนวตั้ง",S=e==="horizontal"?"landscape":"portrait";for(const x of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const C=(x.textContent||"").trim();if(!(C.length>30)&&(C===R||C.includes(R)||C.toLowerCase()===S||C.toLowerCase().includes(S))){const y=x.getBoundingClientRect(),u={bubbles:!0,cancelable:!0,clientX:y.left+y.width/2,clientY:y.top+y.height/2,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",u)),await f(80),x.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",u)),x.dispatchEvent(new MouseEvent("click",u)),n(`เลือกทิศทาง: ${R}`),await f(400);break}}const c=`x${t}`;for(const x of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const C=(x.textContent||"").trim();if(!(C.length>10)&&(C===c||C===`${t}`)){const y=x.getBoundingClientRect(),u={bubbles:!0,cancelable:!0,clientX:y.left+y.width/2,clientY:y.top+y.height/2,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",u)),await f(80),x.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",u)),x.dispatchEvent(new MouseEvent("click",u)),n(`เลือกจำนวน: ${c}`),await f(400);break}}return await f(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),await Q(m),n("ปิดหน้าตั้งค่าแล้ว"),await f(600),!0}async function kn(e){const t=e==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",o=e==="quality"?"Quality":"Fast",l=e==="quality"?"Fast":"Quality",s=e==="quality"?"คุณภาพ":"เร็ว",p=e==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${t} (${s}) ===`);let i=null;const r=Date.now()+1e4;for(;!i&&Date.now()<r;){const S=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const c of S){const k=(c.textContent||"").trim();if(!(k.length>80)&&(k.includes("Veo")||k.includes("veo"))&&(c.hasAttribute("aria-haspopup")||c.hasAttribute("aria-expanded")||c.getAttribute("role")==="combobox"||k.includes("arrow_drop_down")||c.querySelector("svg"))){i=c,n(`พบปุ่ม Veo dropdown (Strategy A): "${k.substring(0,50).trim()}"`);break}}if(!i)for(const c of S){const k=(c.textContent||"").trim();if(!(k.length>80)&&(k.includes("Veo")||k.includes("veo"))){const $=c.getBoundingClientRect();if($.width>0&&$.height>0){i=c,n(`พบปุ่ม Veo dropdown (Strategy B): "${k.substring(0,50).trim()}"`);break}}}if(!i)for(const c of S){const k=(c.textContent||"").trim();if(!(k.length>50)&&(k.includes("Fast")||k.includes("Quality")||k.includes("เร็ว")||k.includes("คุณภาพ"))&&(c.hasAttribute("aria-haspopup")||c.hasAttribute("aria-expanded")||c.querySelector("svg"))){i=c,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${k.substring(0,50).trim()}"`);break}}if(!i){const c=document.querySelectorAll("div, span, button, [role='button']");for(const k of c){const $=(k.textContent||"").trim();if($==="Veo 3.1 - Fast"||$==="Veo 3.1 - Quality"||$==="Fast"||$==="Quality"||$==="Veo 3.1 - เร็ว"||$==="Veo 3.1 - คุณภาพสูง"||$==="Veo 3.1 - คุณภาพ"||$==="Veo 2 - Fast"||$==="Veo 2 - Quality"){const x=k.getBoundingClientRect();if(x.width>0&&x.height>0){i=k,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${$}"`);break}}}}if(!i){const c=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const k of c){const $=(k.textContent||"").trim();if(!($.length>60)&&($.includes("3.1")||$.includes("model")||$.includes("โมเดล"))){const x=k.getBoundingClientRect();if(x.bottom>window.innerHeight*.4&&x.width>0&&x.height>0){i=k,n(`พบปุ่ม model selector (Strategy E): "${$.substring(0,50).trim()}"`);break}}}}i||await f(1e3)}if(!i)return M("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const a=(i.textContent||"").trim();if(a.includes(t)||a.includes(o)&&!a.includes(l)||a.includes(s)&&!a.includes(p))return n(`✅ Veo quality เป็น "${a}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const d=i.getBoundingClientRect(),g=d.left+d.width/2,m=d.top+d.height/2,v={bubbles:!0,cancelable:!0,clientX:g,clientY:m,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",v)),await f(80),i.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",v)),i.dispatchEvent(new MouseEvent("click",v)),n("คลิกเปิด Veo quality dropdown"),await f(1e3);let B=!1;const R=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const S of R){const c=(S.textContent||"").trim();if((c===t||c===o||c.includes(t)||c.includes(s))&&!c.includes("arrow_drop_down")){const $=S.getBoundingClientRect();if($.width>0&&$.height>0){const x=$.left+$.width/2,C=$.top+$.height/2,y={bubbles:!0,cancelable:!0,clientX:x,clientY:C,button:0};S.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousedown",y)),await f(80),S.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseup",y)),S.dispatchEvent(new MouseEvent("click",y)),n(`✅ เลือก "${c}" สำเร็จ`),B=!0;break}}}return B?(await f(600),!0):(M(`ไม่พบตัวเลือก "${t}" หรือ "${s}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),!1)}async function Cn(e){var $,x,C,y;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,o=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),l=o?o[1]:"unknown",s=Y?"macOS":ce?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",p=Y?((x=($=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:$[1])==null?void 0:x.replace(/_/g,"."))||"":ce&&((C=t.match(/Windows NT ([0-9.]+)/))==null?void 0:C[1])||"",i=navigator.language||"unknown",r=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${s} ${p} | Chrome ${l}`),n(`🌐 ภาษา: ${i} | หน้าจอ: ${r} | แพลตฟอร์ม: ${Fe}`),n("══════════════════════════════════════════");try{Gt(e.theme)}catch{}try{Jt(e.sceneCount||1)}catch(u){console.warn("Overlay show error:",u)}const a=[],d=[];if(e.needsNewProject){try{P("open-flow","done"),P("new-project","active"),n("=== สร้างโปรเจคใหม่ ===");let u=null;for(let b=0;b<15;b++){const D=document.querySelectorAll("button, [role='button']");for(const h of D){const E=(h.textContent||"").trim().toLowerCase();if(E.includes("new project")||E.includes("สร้างโปรเจค")||E.includes("โปรเจกต์ใหม่")){u=h;break}}if(!u){const h=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], i[class*='material'], span[class*='material'], span[class*='icon'], span[class*='google-symbols'], i");for(const E of h)if((E.textContent||"").trim()==="add_2"){const w=E.closest("button");if(w){u=w;break}}if(!u){const E=xt("add_2");E.length>0&&(u=E[0])}}if(u)break;n(`⏳ รอปุ่ม New Project... (${b+1}/15)`),await f(1e3)}if(u){n(`✅ พบปุ่ม New Project: "${(u.textContent||"").trim().substring(0,30)}"`),await Q(u),await f(500),await Q(u),await f(2e3);let b=!1;for(let D=0;D<30;D++){const h=window.location.pathname.includes("/project/"),E=!!document.querySelector('[data-slate-editor="true"]');if(h&&E){n("✅ ตรวจพบหน้า Workspace (Project URL + Slate Editor)"),await f(2e3),b=!0;break}else if(E&&!window.location.pathname.endsWith("/")){n("✅ ตรวจพบหน้า Workspace (Slate Editor)"),await f(2e3),b=!0;break}await f(500)}n(b?"✅ Workspace พร้อมแล้ว":"⚠️ Workspace อาจยังไม่โหลดเสร็จ — ดำเนินการต่อ"),P("new-project","done"),a.push("✅ New Project")}else M("ไม่พบปุ่ม New Project — อาจอยู่ใน workspace แล้ว ดำเนินการต่อ"),P("new-project","skipped"),a.push("⚠️ New Project (skipped)")}catch(u){M(`New Project error: ${u.message}`),P("new-project","error"),a.push("⚠️ New Project")}await f(3e3)}else{try{P("open-flow","skipped")}catch{}try{P("new-project","skipped")}catch{}await f(3e3)}try{P("settings","active");const u=e.orientation||"vertical",b=e.outputCount||1,D=await En(u,b);a.push(D?"✅ Settings":"⚠️ Settings"),P("settings",D?"done":"error")}catch(u){M(`ตั้งค่าผิดพลาด: ${u.message}`),a.push("⚠️ Settings"),P("settings","error")}try{const u=e.veoQuality||"fast";await kn(u)?(a.push(`✅ Veo ${u}`),n(`✅ Veo quality: ${u}`)):(a.push("⚠️ Veo quality"),M("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(u){M(`Veo quality error: ${u.message}`),a.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),await f(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const g=()=>{const u=document.querySelectorAll("span, div, p, label");for(const b of u){const D=(b.textContent||"").trim();if(/^\d{1,3}%$/.test(D)){if(D==="100%")return null;const h=b.getBoundingClientRect();if(h.width>0&&h.height>0&&h.top>0&&h.top<window.innerHeight)return D}}return null},m=async u=>{n(`รอการอัพโหลด ${u} เสร็จ...`),await f(2e3);const b=Date.now(),D=6e4;let h="",E=Date.now();const w=15e3;for(;Date.now()-b<D;){const T=g();if(T){if(T!==h)h=T,E=Date.now(),n(`กำลังอัพโหลด: ${T} — รอ...`);else if(Date.now()-E>w){n(`✅ อัพโหลด ${u} — % ค้างที่ ${T} นาน ${w/1e3} วินาที ถือว่าเสร็จ`),await f(1e3);return}await f(1500)}else{n(`✅ อัพโหลด ${u} เสร็จ — ไม่พบตัวบอก %`),await f(1e3);return}}M(`⚠️ อัพโหลด ${u} หมดเวลาหลัง ${D/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){P("upload-char","active");try{const u=await Ge(e.characterImage,"character.png");a.push(u?"✅ ตัวละคร":"⚠️ ตัวละคร"),u||d.push("character upload failed"),P("upload-char",u?"done":"error")}catch(u){M(`อัพโหลดตัวละครผิดพลาด: ${u.message}`),a.push("❌ ตัวละคร"),d.push("character upload error"),P("upload-char","error")}await m("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else At("upload-char");if(e.productImage){P("upload-prod","active");try{const u=await Ge(e.productImage,"product.png");a.push(u?"✅ สินค้า":"⚠️ สินค้า"),u||d.push("product upload failed"),P("upload-prod",u?"done":"error")}catch(u){M(`อัพโหลดสินค้าผิดพลาด: ${u.message}`),a.push("❌ สินค้า"),d.push("product upload error"),P("upload-prod","error")}await m("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else At("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800);const v=g();v&&(n(`⚠️ อัพโหลดยังแสดง ${v} — รอเพิ่มเติม...`),await m("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await f(1e3);const B=(e.characterImage?1:0)+(e.productImage?1:0);if(B>0){let u=Ut();u<B&&(n(`⏳ เห็นรูปย่อแค่ ${u}/${B} — รอ 3 วินาที...`),await f(3e3),u=Ut()),u>=B?n(`✅ ยืนยันรูปย่ออ้างอิง: ${u}/${B}`):M(`⚠️ คาดว่าจะมี ${B} รูปย่อ แต่พบ ${u} — ดำเนินการต่อ`)}if(Ct()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{Ot(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),P("img-prompt","active"),await f(1e3);const R=zt();R?(await Vt(R,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),a.push("✅ Prompt"),P("img-prompt","done")):(M("ไม่พบช่องป้อนข้อความ Prompt"),a.push("❌ Prompt"),d.push("prompt input not found"),P("img-prompt","error")),await f(800);const S=new Set;document.querySelectorAll("img").forEach(u=>{u.src&&S.add(u.src)}),n(`บันทึกรูปเดิม: ${S.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),P("img-generate","active"),await f(500);const c=fe();if(c){const u=c.getBoundingClientRect(),b=u.left+u.width/2,D=u.top+u.height/2,h={bubbles:!0,cancelable:!0,clientX:b,clientY:D,button:0};c.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",h)),await f(80),c.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",h)),c.dispatchEvent(new MouseEvent("click",h)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),a.push("✅ Generate"),await f(500),c.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",h)),await f(80),c.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",h)),c.dispatchEvent(new MouseEvent("click",h)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),P("img-generate","done")}else M("ไม่พบปุ่ม → Generate"),a.push("❌ Generate"),d.push("generate button not found"),P("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),P("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await f(15e3);const u=()=>{const w=document.querySelectorAll("div, span, p, label, strong, small");for(const T of w){if(T.closest("#netflow-engine-overlay"))continue;const O=(T.textContent||"").trim();if(O.length>10)continue;const _=O.match(/(\d{1,3})\s*%/);if(!_)continue;const L=parseInt(_[1],10);if(L<1||L>100)continue;if(et())return L;const N=T.getBoundingClientRect();if(!(N.width===0||N.width>150)&&!(N.top<0||N.top>window.innerHeight))return L}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let b=null,D=-1,h=0;const E=Date.now();for(;!b&&Date.now()-E<18e4;){const w=document.querySelectorAll("img");for(const T of w){if(S.has(T.src)||!(T.alt||"").toLowerCase().includes("generated"))continue;if(et()?T.naturalWidth>120&&T.naturalHeight>120:(()=>{const L=T.getBoundingClientRect();return L.width>120&&L.height>120&&L.top>0&&L.top<window.innerHeight*.85})()){const L=T.closest("div");if(L){b=L,n(`พบรูป AI จาก alt="${T.alt}": ${T.src.substring(0,80)}...${et()?" (hidden-mode)":""}`);break}}}if(!b)for(const T of w){if(S.has(T.src))continue;const O=T.closest("div"),_=(O==null?void 0:O.textContent)||"";if(_.includes("product.png")||_.includes("character.png")||_.includes(".png")||_.includes(".jpg"))continue;if(et()?T.naturalWidth>120&&T.naturalHeight>120:(()=>{const N=T.getBoundingClientRect();return N.width>120&&N.height>120&&N.top>0&&N.top<window.innerHeight*.85})()){const N=T.closest("div");if(N){b=N,n(`พบรูปใหม่ (สำรอง): ${T.src.substring(0,80)}...${et()?" (hidden-mode)":""}`);break}}}if(!b){if(Ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const T=h>0?Date.now()-h:1/0;if(D<20||T>3e4){const _=qe();if(_){M(`❌ สร้างรูปล้มเหลว: ${_}`),d.push(`image gen failed: ${_}`),P("img-wait","error");break}}const O=u();if(O!==null)O!==D&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${O}%`),D=O,P("img-wait","active",O)),h=Date.now();else if(D>30){const _=Math.floor((Date.now()-h)/1e3);_>=3&&n(`🖼️ % หายที่ ${D}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&_>=5&&D>50&&(n("🍎 Tab ซ่อน + รูปน่าจะเสร็จ → เปิด tab เต็มเพื่อตรวจหารูป"),await wt(),await f(3e3))}document.hidden&&D>0&&Date.now()-h>1e4&&await Tt(),document.hidden&&D<1&&Date.now()-E>3e4&&await Tt(),await f(3e3)}}if(!b)M("หมดเวลารอรูปที่สร้าง"),a.push("⚠️ Wait Image"),P("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),a.push("✅ Image Found"),P("img-wait","done",100),await wt();const w=b.getBoundingClientRect(),T=w.left+w.width/2,O=w.top+w.height/2,_={bubbles:!0,cancelable:!0,clientX:T,clientY:O};b.dispatchEvent(new PointerEvent("pointerenter",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseenter",_)),b.dispatchEvent(new PointerEvent("pointerover",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseover",_)),b.dispatchEvent(new PointerEvent("pointermove",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousemove",_)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await f(1500);let L=null;for(const N of["more_vert","more_horiz","more"]){const j=xt(N);for(const I of j){const A=I.getBoundingClientRect();if(A.top>=w.top-20&&A.top<=w.bottom&&A.right>=w.right-150&&A.right<=w.right+20){L=I;break}}if(L)break}if(!L){const N=document.querySelectorAll("button");for(const j of N){const I=j.getBoundingClientRect();if(I.width<50&&I.height<50&&I.top>=w.top-10&&I.top<=w.top+60&&I.left>=w.right-80){const A=j.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const V of A)if((((y=V.textContent)==null?void 0:y.trim())||"").includes("more")){L=j;break}if(L)break;const z=j.getAttribute("aria-label")||"";if(z.includes("เพิ่มเติม")||z.includes("more")){L=j;break}}}}if(!L)M("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),a.push("⚠️ 3-dots");else{const N=L.getBoundingClientRect(),j=N.left+N.width/2,I=N.top+N.height/2,A={bubbles:!0,cancelable:!0,clientX:j,clientY:I,button:0};L.dispatchEvent(new PointerEvent("pointerdown",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mousedown",A)),await f(80),L.dispatchEvent(new PointerEvent("pointerup",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mouseup",A)),L.dispatchEvent(new MouseEvent("click",A)),n("คลิกปุ่ม 3 จุดแล้ว"),await f(1500);let z=null;const V=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const q of V){const F=(q.textContent||"").trim();if(F.includes("ทำให้เป็นภาพเคลื่อนไหว")||F.includes("Animate")||F.includes("animate")){z=q;break}}if(!z)M("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),a.push("⚠️ Animate");else{const q=z.getBoundingClientRect(),F=q.left+q.width/2,K=q.top+q.height/2,W={bubbles:!0,cancelable:!0,clientX:F,clientY:K,button:0};z.dispatchEvent(new PointerEvent("pointerdown",{...W,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mousedown",W)),await f(80),z.dispatchEvent(new PointerEvent("pointerup",{...W,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mouseup",W)),z.dispatchEvent(new MouseEvent("click",W)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),a.push("✅ Animate"),P("animate","done"),await f(3e3)}}}}catch(u){M(`ขั้น 4 ผิดพลาด: ${u.message}`),a.push("⚠️ Animate")}if(Ct()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{Ot(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),P("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await f(3e3);let u=!1;const b=document.querySelectorAll("button, span, div");for(const w of b){const T=(w.textContent||"").trim(),O=w.getBoundingClientRect();if((T==="วิดีโอ"||T==="Video"||T.includes("วิดีโอ"))&&O.bottom>window.innerHeight*.7){u=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}u||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let D=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise(T=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>T())),D=!0;const w=Date.now();for(;document.hidden&&Date.now()-w<5e3;)await f(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await f(1e3);let h=!1;for(let w=1;w<=5&&!h;w++){if(w>1&&document.hidden){n(`🔄 Retry ${w}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(L=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>L())),D=!0;const _=Date.now();for(;document.hidden&&Date.now()-_<5e3;)await f(200);document.hidden||await f(2e3)}catch{}}const T=zt();if(!T){n(`⚠️ ครั้งที่ ${w}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await f(3e3);continue}w>1&&(T.focus(),await f(500)),await Vt(T,e.videoPrompt),await f(500);const O=(T.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();O.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${w} (${O.length} ตัวอักษร)`),a.push("✅ Video Prompt"),P("vid-prompt","done"),h=!0):(n(`⚠️ ครั้งที่ ${w}: Prompt ไม่ถูกวาง (ได้ ${O.length} ตัวอักษร)`),await f(1500))}if(!h)throw M("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),a.push("❌ Video Prompt"),d.push("video prompt paste failed after 5 attempts"),P("vid-prompt","error"),new Error("Video prompt paste failed");await f(1e3),P("vid-generate","active");const E=fe();if(E){const w=E.getBoundingClientRect(),T=w.left+w.width/2,O=w.top+w.height/2,_={bubbles:!0,cancelable:!0,clientX:T,clientY:O,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",_)),await f(80),E.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",_)),E.dispatchEvent(new MouseEvent("click",_)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),a.push("✅ Video Generate"),P("vid-generate","done"),await f(500),E.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",_)),await f(80),E.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",_)),E.dispatchEvent(new MouseEvent("click",_)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else M("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),a.push("❌ Video Generate"),d.push("video generate button not found"),P("vid-generate","error");if(D){await f(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(u){M(`ขั้น 5 ผิดพลาด: ${u.message}`),a.push("⚠️ Video Gen"),d.push(`video gen error: ${u.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),At("animate"),At("vid-prompt"),At("vid-generate"),At("vid-wait");if(e.videoPrompt){P("vid-wait","active");const u=e.sceneCount||1,b=e.videoScenePrompts||[e.videoPrompt];if(u>1)try{cn(u)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${u>1?`ต่อ ${u} ฉาก`:"ดาวน์โหลด"} ===`);const D=()=>{const w=document.querySelectorAll("div, span, p, label, strong, small");for(const T of w){if(T.closest("#netflow-engine-overlay"))continue;const O=(T.textContent||"").trim();if(O.length>10)continue;const _=O.match(/(\d{1,3})\s*%/);if(!_)continue;const L=parseInt(_[1],10);if(L<1||L>100)continue;if(et())return L;const N=T.getBoundingClientRect();if(!(N.width===0||N.width>150)&&!(N.top<0||N.top>window.innerHeight))return L}return null},h=async(w=6e5)=>{n("รอการสร้างวิดีโอ..."),P("vid-wait","active"),await f(5e3);const T=()=>{const U=document.querySelectorAll("div, span, p, label, strong, small");let Z=0;for(const ot of U){if(ot.closest("#netflow-engine-overlay"))continue;const G=(ot.textContent||"").trim();if(G.includes("%")&&G.length<15){const rt=ot.tagName.toLowerCase(),at=ot.className&&typeof ot.className=="string"?ot.className.split(/\s+/).slice(0,2).join(" "):"",J=ot.getBoundingClientRect();if(n(`  🔍 "${G}" ใน <${rt}.${at}> ที่ (${J.left.toFixed(0)},${J.top.toFixed(0)}) w=${J.width.toFixed(0)}`),Z++,Z>=5)break}}Z===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},O=async(U,Z)=>{n(`🔄 Policy Retry ${Z}/2 — สร้าง Safe Prompt แล้วลองใหม่...`),await wt(),await f(2e3);const ot=zt();if(!ot)return M("❌ Retry: ไม่พบช่อง Prompt"),!1;ot.focus(),await f(300);const G=window.getSelection();G&&G.selectAllChildren(ot),await f(200),ot.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"deleteContentBackward"})),ot.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"deleteContentBackward"})),await f(500);let rt=un(U);Z>=2&&(rt=rt.substring(0,600).replace(/\s\S*$/,"").trim(),n(`🛡️ 2nd retry: ultra-short prompt (${rt.length} chars)`)),await Vt(ot,rt),await f(500);const at=(ot.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(at.length<20)return M(`❌ Retry: วาง Safe Prompt ไม่สำเร็จ (${at.length} ตัวอักษร)`),!1;n(`✅ วาง Safe Prompt สำเร็จ (${at.length} ตัวอักษร)`),await f(500);const J=fe();if(!J)return M("❌ Retry: ไม่พบปุ่ม Generate"),!1;const gt=J.getBoundingClientRect(),vt=gt.left+gt.width/2,qt=gt.top+gt.height/2,Ht={bubbles:!0,cancelable:!0,clientX:vt,clientY:qt,button:0};return J.dispatchEvent(new PointerEvent("pointerdown",{...Ht,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousedown",Ht)),await f(80),J.dispatchEvent(new PointerEvent("pointerup",{...Ht,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mouseup",Ht)),J.dispatchEvent(new MouseEvent("click",Ht)),n(`✅ คลิก Generate สำหรับ Safe Retry ${Z}`),await f(5e3),!0},_=pe();n(_?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),T();const L=Date.now();let N=-1,j=0,I=!1,A=0;const z=2;for(;Date.now()-L<w;){const U=D();if(U!==null){if(U!==N&&(n(`ความคืบหน้าวิดีโอ: ${U}%`),N=U,P("vid-wait","active",U)),j=Date.now(),U>=100){n("✅ ตรวจพบ 100%!"),I=!0;break}}else if(N>30){const Z=Math.floor((Date.now()-j)/1e3);if(Z>=5){n(`✅ % หายไปที่ ${N}% (หาย ${Z} วินาที) — วิดีโอเสร็จ!`),I=!0;break}n(`⏳ % หายที่ ${N}% — ยืนยันใน ${5-Z} วินาที...`)}else{const Z=Math.floor((Date.now()-L)/1e3);Z%15<3&&n(`⏳ รอ... (${Z} วินาที) ไม่พบ %`)}if(!I&&N>0&&pe(!0)&&!_){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${N}% — วิดีโอเสร็จ!`),I=!0;break}if(Ct())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(N<1){const Z=qe();if(Z){if(M(`❌ สร้างวิดีโอล้มเหลว: ${Z}`),A<z&&e.videoPrompt)if(A++,n(`🔄 Policy violation detected — attempting safe retry ${A}/${z}...`),await O(e.videoPrompt,A)){N=-1,j=0,n(`✅ Safe retry ${A} started — continuing to monitor...`);continue}else M(`❌ Safe retry ${A} failed to start`);return null}}document.hidden&&N>0&&Date.now()-j>1e4&&await Tt(),document.hidden&&N<1&&Date.now()-L>3e4&&await Tt(),await f(3e3)}await wt();let V=null;for(let U=1;U<=10&&(V=pe(),!V);U++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${U}/10)`),U%3===0&&await wt(),await f(3e3);if(!V)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),P("vid-wait","error"),null;const q=V;I?(P("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await f(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const F=q.getBoundingClientRect();let K=F.left+F.width/2,W=F.top+F.height/2,X=q;const nt=q.querySelector("video, img, canvas");if(nt){const U=nt.getBoundingClientRect();U.width>50&&U.height>50&&(K=U.left+U.width/2,W=U.top+U.height/2,X=nt,n(`🎯 พบรูปย่อ <${nt.tagName.toLowerCase()}> ในการ์ดที่ (${K.toFixed(0)},${W.toFixed(0)}) ${U.width.toFixed(0)}x${U.height.toFixed(0)}`))}else W=F.top+F.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${K.toFixed(0)},${W.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${K.toFixed(0)}, ${W.toFixed(0)})...`),Ft(X);for(let U=0;U<8;U++){const Z={bubbles:!0,cancelable:!0,clientX:K+U%2,clientY:W};X.dispatchEvent(new PointerEvent("pointermove",{...Z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),X.dispatchEvent(new MouseEvent("mousemove",Z)),await f(500)}try{chrome.storage.local.set({[bt()]:{timestamp:Date.now(),action:"mute_video",sceneCount:u,scenePrompts:b,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${u} ฉาก, ${b.length} prompts, theme: ${e.theme})`)}catch(U){n(`⚠️ ไม่สามารถบันทึก pending action: ${U.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await E(X),n("✅ คลิกการ์ดวิดีโอเสร็จ"),q},E=async w=>{const T=w.getBoundingClientRect(),O=T.left+T.width/2,_=T.top+T.height/2,L={bubbles:!0,cancelable:!0,clientX:O,clientY:_,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",L)),await f(80),w.dispatchEvent(new PointerEvent("pointerup",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",L)),w.dispatchEvent(new MouseEvent("click",L)),await f(50),w.click(),n("คลิกการ์ดวิดีโอแล้ว"),await f(2e3)};try{if(!await h())M("หมดเวลารอการสร้างวิดีโอ"),a.push("⚠️ Video Wait"),P("vid-wait","error");else{a.push("✅ Video Complete"),P("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await f(3e3);const T=await new Promise(O=>{chrome.storage.local.get(bt(),_=>{if(chrome.runtime.lastError){O(null);return}O((_==null?void 0:_[bt()])||null)})});T&&!T._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(bt()),T.action==="mute_video"?await je(T.sceneCount||1,T.scenePrompts||[],T.theme):T.action==="wait_scene_gen_and_download"&&await Ke(T.sceneCount||2,T.currentScene||2,T.theme,T.scenePrompts||[]))}}catch(w){M(`ขั้น 6 ผิดพลาด: ${w.message}`),a.push("⚠️ Step6"),d.push(`step 6: ${w.message}`)}}const k=d.length===0;try{Ot(k?5e3:8e3)}catch(u){console.warn("Overlay complete error:",u)}return{success:k,message:k?`สำเร็จ! ${a.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${a.join(" → ")} | ${d.join(", ")}`,step:k?"done":"partial"}}async function je(e,t=[],o){var x;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{o&&Gt(o)}catch{}try{Jt(e)}catch(C){n(`⚠️ showOverlay error: ${C.message}`)}try{const C=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const y of C)P(y,"done");e>=2&&P("scene2-prompt","active"),n(`✅ overlay restored: ${C.length} steps done, sceneCount=${e}`)}catch(C){n(`⚠️ overlay restore error: ${C.message}`)}await f(1500);const l=(()=>{for(const C of document.querySelectorAll("button")){const y=C.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const b of y){const D=(b.textContent||"").trim();if(D==="volume_up"||D==="volume_off"||D==="volume_mute"){const h=C.getBoundingClientRect();if(h.width>0&&h.height>0)return C}}const u=(C.getAttribute("aria-label")||"").toLowerCase();if(u.includes("mute")||u.includes("ปิดเสียง")){const b=C.getBoundingClientRect();if(b.width>0&&b.height>0)return C}}return null})();l?(l.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let s=null;if(e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await f(2e3);for(let I=2;I<=e;I++){const A=t[I-1];if(!A){M(`ไม่พบ prompt สำหรับฉากที่ ${I}`);continue}n(`── ฉากที่ ${I}/${e}: วาง prompt + generate ──`);let z=null;const V=Date.now();for(;!z&&Date.now()-V<1e4;){const G=document.querySelectorAll("[data-slate-editor='true']");if(G.length>0&&(z=G[G.length-1]),!z){const rt=document.querySelectorAll("[role='textbox'][contenteditable='true']");rt.length>0&&(z=rt[rt.length-1])}z||await f(1e3)}if(!z){M("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${z.tagName.toLowerCase()}> ${z.className.substring(0,40)}`),await Vt(z,A),n(`วาง prompt ฉาก ${I} (${A.length} ตัวอักษร) ✅`);try{P(`scene${I}-prompt`,"done"),P(`scene${I}-gen`,"active")}catch{}await f(1e3);const q=z.getBoundingClientRect();let F=null,K=1/0;for(const G of document.querySelectorAll("button")){if(G.disabled)continue;const rt=G.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let at=!1;for(const vt of rt){const qt=(vt.textContent||"").trim();if(qt==="arrow_forward"||qt==="send"||qt==="arrow_upward"){at=!0;break}}if(!at)continue;const J=G.getBoundingClientRect();if(J.width<=0||J.height<=0)continue;const gt=Math.abs(J.top-q.top)+Math.abs(J.right-q.right);gt<K&&(K=gt,F=G)}if(!F)for(const G of["arrow_forward","send","arrow_upward"]){const rt=xt(G);for(const at of rt)if(!at.disabled){const J=at.getBoundingClientRect();if(J.width>0&&J.height>0){F=at;break}}if(F)break}if(!F)for(const G of document.querySelectorAll("button")){const rt=G.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const at of rt)if((at.textContent||"").trim()==="arrow_forward"){const J=G.getBoundingClientRect();if(J.width>0&&J.height>0){F=G;break}}if(F)break}if(!F){M("ไม่พบปุ่ม Generate/Send");return}await new Promise(G=>{chrome.storage.local.set({[bt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:I,scenePrompts:t}},()=>G())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${I}/${e})`),await Q(F),n(`คลิก Generate ฉาก ${I} ✅`);try{P(`scene${I}-gen`,"done"),P(`scene${I}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${I} gen เสร็จ ──`),await f(5e3);let W=0,X=0;const nt=Date.now(),U=6e5,Z=5e3;let ot=!1;for(;Date.now()-nt<U;){let G=null;const rt=document.querySelectorAll("div, span, p, label, strong, small");for(const at of rt){if(at.closest("#netflow-engine-overlay"))continue;const gt=(at.textContent||"").trim().match(/^(\d{1,3})%$/);if(gt){const vt=at.getBoundingClientRect();if(vt.width>0&&vt.height>0&&vt.width<120&&vt.height<60){G=parseInt(gt[1],10);break}}}if(G!==null){if(G!==W){n(`🎬 ฉาก ${I} ความคืบหน้า: ${G}%`),W=G;try{P(`scene${I}-wait`,"active",G)}catch{}}X=0}else if(W>0){if(X===0)X=Date.now(),n(`🔍 ฉาก ${I}: % หายไป (จาก ${W}%) — กำลังยืนยัน...`);else if(Date.now()-X>=Z){n(`✅ ฉาก ${I}: % หายไป ${Z/1e3} วินาที — เจนเสร็จ!`),ot=!0;break}}if(Ct()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&W>0&&X===0&&await Tt(),await f(2e3)}ot||M(`ฉาก ${I} หมดเวลา`),n(`✅ ฉาก ${I} เสร็จแล้ว`);try{P(`scene${I}-wait`,"done",100)}catch{}chrome.storage.local.remove(bt()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await f(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{P("download","active")}catch{}let C=!1;if(await wt()&&document.hidden===!1&&(C=!0),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(I=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>I())),C=!0,await f(Y?8e3:5e3)}catch{}}await f(Y?3e3:2e3);const u=Date.now();let b=null;const D=Date.now();for(;!b&&Date.now()-D<(Y?15e3:1e4);){const I=xt("download");for(const A of I){const z=A.getBoundingClientRect();if(z.width>0&&z.height>0){b=A;break}}if(!b)for(const A of document.querySelectorAll("button")){const z=A.querySelector("i, span[class*='icon'], span[class*='material']");if(z&&(z.textContent||"").trim()==="download"){const F=A.getBoundingClientRect();if(F.width>0&&F.height>0){b=A;break}}const V=(A.getAttribute("aria-label")||"").toLowerCase(),q=(A.getAttribute("title")||"").toLowerCase();if(V.includes("download")||V.includes("ดาวน์โหลด")||q.includes("download")||q.includes("ดาวน์โหลด")){const F=A.getBoundingClientRect();if(F.width>0&&F.height>0){b=A;break}}}b||await f(1e3)}if(!b){if(M("ไม่พบปุ่มดาวน์โหลด"),C)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await Q(b),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await f(Y?3e3:1500);const h=(I,A)=>new Promise(async z=>{const V=Date.now(),F=[I.toLowerCase(),"full video","entire video","complete video","download video"];for(;Date.now()-V<A;){const X="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div, [role='menu'] div, [role='listbox'] div, [role='option']";for(const nt of document.querySelectorAll(X)){const U=(nt.textContent||"").trim(),Z=U.toLowerCase();if(U.length<100&&U.length>0){for(const ot of F)if(Z.includes(ot)){const G=nt.getBoundingClientRect();if(G.width>0&&G.height>0){n(`🔍 พบเมนู: "${U}" (matched "${ot}")`),z(nt);return}}}}await f(500)}const K="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] *, [data-radix-dropdown-menu-content] *, [role='menu'] *, [role='listbox'] *",W=[];for(const X of document.querySelectorAll(K)){const nt=(X.textContent||"").trim(),U=X.getBoundingClientRect();nt.length>0&&nt.length<100&&U.width>0&&U.height>0&&!W.includes(nt)&&W.push(nt)}W.length>0?n(`🔍 เมนูที่เห็น: [${W.join(" | ")}]`):n("🔍 ไม่พบเมนูใดๆ ใน dropdown (อาจปิดไปแล้ว)"),z(null)}),E=(I,A)=>new Promise(async z=>{const V=Date.now();for(;Date.now()-V<I;){const q="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const F of document.querySelectorAll(q)){const K=(F.textContent||"").trim();if(K.includes("720p")&&K.length<50){const X=F.getBoundingClientRect();if(X.width>0&&X.height>0){z(F);return}}const W=F.querySelectorAll("span");for(const X of W)if((X.textContent||"").trim()==="720p"){const nt=F.getBoundingClientRect();if(nt.width>0&&nt.height>0){z(F);return}}}A!=null&&A.isConnected&&Ft(A),await f(500)}z(null)});let w=null;for(let I=0;I<(Y?5:4)&&!w;I++){I>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${I+1}...`),b.isConnected&&(await Q(b),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await f(Y?3e3:2e3)));const A=await E(2e3,null);if(A){n("🎯 พบ 720p โดยตรงใน dropdown (ไม่ต้องผ่าน Full Video)"),w=A;break}const z=await h("Full Video",Y?1e4:7e3);if(!z){M("ไม่พบ Full Video");continue}Ft(z),await f(Y?1e3:500),await Q(z),n("คลิก/hover Full Video ✅"),await f(Y?3e3:2e3),w=await E(Y?12e3:8e3,z)}if(w)await Q(w),n("คลิก 720p ✅");else{M("ไม่พบ 720p — ลอง fallback คลิก Full Video โดยตรง"),b.isConnected&&(await Q(b),await f(2e3));const I=await h("video",5e3);if(I)await Q(I),n("🔄 คลิก video menu item โดยตรงเป็น fallback");else{if(C)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}}if(C){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const T=Date.now();let O=!1,_=!1;for(;Date.now()-T<3e5;){for(const I of document.querySelectorAll("div[data-title] div, div[data-content] div")){const A=(I.textContent||"").trim();if(A==="Download complete!"||A==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),O=!0;break}(A.includes("Downloading your extended video")||A.includes("กำลังดาวน์โหลด"))&&(_||(_=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(O)break;if(_){let I=!1;for(const A of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((A.textContent||"").trim().includes("Downloading")){I=!0;break}if(!I){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),O=!0;break}}if(Ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await f(2e3)}if(!O){M("เตรียมไฟล์หมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let L=!1;const N=Date.now();for(;Date.now()-N<6e4&&!L;){try{await new Promise(I=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:u},A=>{chrome.runtime.lastError?M(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):A!=null&&A.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${A.message}`),L=!0,A.downloadUrl&&(s=A.downloadUrl,n(`[TikTok] จะใช้ download URL: ${A.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-N)/1e3)}s)`),I()})})}catch(I){M(`ตรวจสอบผิดพลาด: ${I.message}`)}L||await f(3e3)}L||M("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const j=await se();s||(s=j);try{P("open","done"),Ot(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),le(s),re(2e3);return}if(n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await wt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(C=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>C())),await f(Y?8e3:5e3)}catch{}}await f(Y?3e3:2e3);const p=(C,y="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const u of document.querySelectorAll(y)){const b=(u.textContent||"").trim();if(b.includes(C)&&b.length<100){const D=u.getBoundingClientRect();if(D.width>0&&D.height>0&&D.top>=0)return u}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let i=null;const r=Date.now();for(;!i&&Date.now()-r<(Y?15e3:1e4);){const C=xt("download");for(const y of C){const u=y.getBoundingClientRect();if(u.width>0&&u.height>0){i=y;break}}if(!i)for(const y of document.querySelectorAll("button, [role='button']")){const u=(y.textContent||"").trim(),b=u.toLowerCase();if((b.includes("download")||b.includes("ดาวน์โหลด"))&&u.length<80){const D=y.getBoundingClientRect();if(D.width>0&&D.height>0){i=y;break}}}if(!i)for(const y of document.querySelectorAll("button")){const u=(y.getAttribute("aria-label")||"").toLowerCase(),b=(y.getAttribute("title")||"").toLowerCase();if(u.includes("download")||u.includes("ดาวน์")||b.includes("download")||b.includes("ดาวน์")){const D=y.getBoundingClientRect();if(D.width>0&&D.height>0){i=y;break}}}i||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await f(1e3))}if(!i){M("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(i.textContent||"").trim().substring(0,40)}"`),await Q(i),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await f(Y?3e3:1500);const a=Date.now();let d=null;const g=Date.now();for(;!d&&Date.now()-g<(Y?1e4:5e3);)d=p("1080p"),d||(n("รอ 1080p..."),await f(500));if(!d){M("ไม่พบ 1080p");return}await Q(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const m=Date.now();let v=!1,B=!1,R=0;const S=3e3;for(;Date.now()-m<3e5;){const y=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(y.includes("upscaling complete")||y.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),v=!0;break}for(const b of document.querySelectorAll("div, span, p")){const D=(b.textContent||"").trim().toLowerCase();if(D.length<60&&(D.includes("upscaling complete")||D.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(x=b.textContent)==null?void 0:x.trim()}")`),v=!0;break}}if(v)break;if(y.includes("upscaling your video")||y.includes("กำลังอัปสเกล")){B=!0,R=0;const b=Math.floor((Date.now()-m)/1e3);n(`⏳ กำลังอัปสเกล... (${b} วินาที)`)}else if(B){if(R===0)R=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-R>=S){n(`✅ ข้อความ Upscaling หายไป ${S/1e3} วินาที — เสร็จ!`),v=!0;break}}else{const b=Math.floor((Date.now()-m)/1e3);b%10<3&&n(`⏳ รอ Upscale... (${b} วินาที)`)}if(Ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await f(2e3)}if(!v){M("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let c=!1;const k=Date.now();for(;Date.now()-k<6e4&&!c;){try{await new Promise(C=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:a},y=>{chrome.runtime.lastError?M(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):y!=null&&y.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${y.message}`),c=!0,y.downloadUrl&&(s=y.downloadUrl,n(`[TikTok] จะใช้ download URL: ${y.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-k)/1e3)}s)`),C()})})}catch(C){M(`ตรวจสอบผิดพลาด: ${C.message}`)}c||await f(3e3)}c||M("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const $=await se();s||(s=$),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),le(s),re(2e3)}async function Ke(e=2,t=2,o,l=[]){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{o&&Gt(o)}catch{}try{Jt(e)}catch(h){n(`⚠️ showOverlay error: ${h.message}`)}try{const h=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let E=2;E<=t;E++)h.push(`scene${E}-prompt`,`scene${E}-gen`),E<t&&h.push(`scene${E}-wait`);for(const E of h)P(E,"done");P(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${h.length} steps done (scene ${t}/${e} navigate)`)}catch(h){n(`⚠️ overlay restore error: ${h.message}`)}await f(2e3);const s=(()=>{for(const h of document.querySelectorAll("button")){const E=h.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const T of E){const O=(T.textContent||"").trim();if(O==="volume_up"||O==="volume_off"||O==="volume_mute"){const _=h.getBoundingClientRect();if(_.width>0&&_.height>0)return h}}const w=(h.getAttribute("aria-label")||"").toLowerCase();if(w.includes("mute")||w.includes("ปิดเสียง")){const T=h.getBoundingClientRect();if(T.width>0&&T.height>0)return h}}return null})();s?(s.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);let p=0,i=0;const r=Date.now(),a=6e5,d=5e3;let g=!1,m=0;for(;Date.now()-r<a;){let h=null;const E=document.querySelectorAll("div, span, p, label, strong, small");for(const w of E){if(w.closest("#netflow-engine-overlay"))continue;const O=(w.textContent||"").trim().match(/^(\d{1,3})%$/);if(O){const _=w.getBoundingClientRect();if(_.width>0&&_.height>0&&_.width<120&&_.height<60){h=parseInt(O[1],10);break}}}if(h!==null){if(m=0,h!==p){n(`🎬 scene ${t} ความคืบหน้า: ${h}%`),p=h;try{P(`scene${t}-wait`,"active",h)}catch{}}i=0}else if(p>0){if(i===0)i=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${p}%) — กำลังยืนยัน...`);else if(Date.now()-i>=d){n(`✅ scene ${t}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),g=!0;break}}else if(m++,m>=15){const w=document.querySelectorAll("video");let T=!1;for(const O of w)if(O.readyState>=2&&!O.paused&&O.getBoundingClientRect().width>200){T=!0;break}if(T){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),g=!0;break}if(m>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),g=!0;break}}document.hidden&&p>0&&i===0&&await Tt(),await f(2e3)}g||n(`⚠️ scene ${t} หมดเวลา — ลองต่อไป`);try{P(`scene${t}-wait`,"done",100)}catch{}if(n(`✅ scene ${t} เสร็จ`),t<e&&l.length>0){n(`═══ ยังเหลืออีก ${e-t} ฉาก — ต่อฉากถัดไป ═══`),await f(2e3);for(let h=t+1;h<=e;h++){const E=l[h-1];if(!E){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${h} — ข้าม`);continue}n(`── ฉากที่ ${h}/${e}: วาง prompt + generate (pending recovery) ──`);let w=null;const T=Date.now();for(;!w&&Date.now()-T<1e4;){const V=document.querySelectorAll("[data-slate-editor='true']");if(V.length>0&&(w=V[V.length-1]),!w){const q=document.querySelectorAll("[role='textbox'][contenteditable='true']");q.length>0&&(w=q[q.length-1])}w||await f(1e3)}if(!w){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${h}`);break}await Vt(w,E),n(`วาง prompt ฉาก ${h} (${E.length} ตัวอักษร) ✅`);try{P(`scene${h}-prompt`,"done"),P(`scene${h}-gen`,"active")}catch{}await f(1e3);const O=w.getBoundingClientRect();let _=null,L=1/0;for(const V of document.querySelectorAll("button")){if(V.disabled)continue;const q=V.querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols']");let F=!1;for(const X of q){const nt=(X.textContent||"").trim();if(nt==="arrow_forward"||nt==="send"||nt==="arrow_upward"){F=!0;break}}if(!F)continue;const K=V.getBoundingClientRect();if(K.width<=0||K.height<=0)continue;const W=Math.abs(K.top-O.top)+Math.abs(K.right-O.right);W<L&&(L=W,_=V)}if(!_)for(const V of["arrow_forward","send","arrow_upward"]){const q=xt(V);for(const F of q)if(!F.disabled){const K=F.getBoundingClientRect();if(K.width>0&&K.height>0){_=F;break}}if(_)break}if(!_)for(const V of document.querySelectorAll("button")){const q=V.querySelectorAll("i, span[class*='icon'], span[class*='material']");for(const F of q)if((F.textContent||"").trim()==="arrow_forward"){const K=V.getBoundingClientRect();if(K.width>0&&K.height>0){_=V;break}}if(_)break}if(!_){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${h}`);break}await new Promise(V=>{chrome.storage.local.set({[bt()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:e,currentScene:h,scenePrompts:l}},()=>V())}),await Q(_),n(`คลิก Generate ฉาก ${h} ✅`);try{P(`scene${h}-gen`,"done"),P(`scene${h}-wait`,"active")}catch{}await f(5e3);let N=0,j=0;const I=Date.now();let A=!1,z=0;for(;Date.now()-I<6e5;){let V=null;const q=document.querySelectorAll("div, span, p, label, strong, small");for(const F of q){if(F.closest("#netflow-engine-overlay"))continue;const W=(F.textContent||"").trim().match(/^(\d{1,3})%$/);if(W){const X=F.getBoundingClientRect();if(X.width>0&&X.height>0&&X.width<120&&X.height<60){V=parseInt(W[1],10);break}}}if(V!==null){if(z=0,V!==N){n(`🎬 ฉาก ${h} ความคืบหน้า: ${V}%`),N=V;try{P(`scene${h}-wait`,"active",V)}catch{}}j=0}else if(N>0){if(j===0)j=Date.now();else if(Date.now()-j>=5e3){n(`✅ ฉาก ${h}: เจนเสร็จ!`),A=!0;break}}else if(z++,z>=15){const F=document.querySelectorAll("video");let K=!1;for(const W of F)if(W.readyState>=2&&!W.paused&&W.getBoundingClientRect().width>200){K=!0;break}if(K){n(`✅ ฉาก ${h}: พบวิดีโอเล่นอยู่ — เสร็จ`),A=!0;break}if(z>=30){n(`✅ ฉาก ${h}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),A=!0;break}}document.hidden&&N>0&&j===0&&await Tt(),await f(2e3)}A||n(`⚠️ ฉาก ${h} หมดเวลา`);try{P(`scene${h}-wait`,"done",100)}catch{}n(`✅ ฉาก ${h} เสร็จแล้ว`),chrome.storage.local.remove(bt()),await f(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await f(3e3);let v=null;try{P("download","active")}catch{}if(n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──"),await wt(),document.hidden){n("🔄 Tab ยังซ่อนอยู่ — ลอง FOCUS_TAB โดยตรง");try{await new Promise(h=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>h())),await f(Y?8e3:5e3)}catch{}}await f(Y?3e3:2e3);const B=Date.now();let R=null;const S=Date.now();for(;!R&&Date.now()-S<(Y?15e3:1e4);){const h=xt("download");for(const E of h){const w=E.getBoundingClientRect();if(w.width>0&&w.height>0){R=E;break}}if(!R)for(const E of document.querySelectorAll("button")){const w=E.querySelector("i, span[class*='icon'], span[class*='material']");if(w&&(w.textContent||"").trim()==="download"){const _=E.getBoundingClientRect();if(_.width>0&&_.height>0){R=E;break}}const T=(E.getAttribute("aria-label")||"").toLowerCase(),O=(E.getAttribute("title")||"").toLowerCase();if(T.includes("download")||T.includes("ดาวน์โหลด")||O.includes("download")||O.includes("ดาวน์โหลด")){const _=E.getBoundingClientRect();if(_.width>0&&_.height>0){R=E;break}}}R||await f(1e3)}if(!R){M("ไม่พบปุ่มดาวน์โหลด");return}await Q(R),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await f(Y?3e3:1500);const c=(h,E)=>new Promise(async w=>{const T=Date.now(),_=[h.toLowerCase(),"full video","entire video","complete video","download video"];for(;Date.now()-T<E;){const j="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] div, [data-radix-dropdown-menu-content] div, [role='menu'] div, [role='listbox'] div, [role='option']";for(const I of document.querySelectorAll(j)){const A=(I.textContent||"").trim(),z=A.toLowerCase();if(A.length<100&&A.length>0){for(const V of _)if(z.includes(V)){const q=I.getBoundingClientRect();if(q.width>0&&q.height>0){n(`🔍 พบเมนู: "${A}" (matched "${V}")`),w(I);return}}}}await f(500)}const L="[role='menuitem'], [data-radix-collection-item], [data-radix-menu-content] *, [data-radix-dropdown-menu-content] *, [role='menu'] *, [role='listbox'] *",N=[];for(const j of document.querySelectorAll(L)){const I=(j.textContent||"").trim(),A=j.getBoundingClientRect();I.length>0&&I.length<100&&A.width>0&&A.height>0&&!N.includes(I)&&N.push(I)}N.length>0?n(`🔍 เมนูที่เห็น: [${N.join(" | ")}]`):n("🔍 ไม่พบเมนูใดๆ ใน dropdown (อาจปิดไปแล้ว)"),w(null)}),k=(h,E)=>new Promise(async w=>{const T=Date.now();for(;Date.now()-T<h;){const O="button[role='menuitem'], div[role='menuitem'] button, [data-radix-collection-item], [data-radix-menu-content] button, [role='menu'] button";for(const _ of document.querySelectorAll(O)){const L=(_.textContent||"").trim();if(L.includes("720p")&&L.length<50){const j=_.getBoundingClientRect();if(j.width>0&&j.height>0){w(_);return}}const N=_.querySelectorAll("span");for(const j of N)if((j.textContent||"").trim()==="720p"){const I=_.getBoundingClientRect();if(I.width>0&&I.height>0){w(_);return}}}E!=null&&E.isConnected&&Ft(E),await f(500)}w(null)});let $=null;for(let h=0;h<(Y?5:4)&&!$;h++){h>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${h+1}...`),R.isConnected&&(await Q(R),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await f(Y?3e3:2e3)));const E=await k(2e3,null);if(E){n("🎯 พบ 720p โดยตรงใน dropdown (ไม่ต้องผ่าน Full Video)"),$=E;break}const w=await c("Full Video",Y?1e4:7e3);if(!w){M("ไม่พบ Full Video");continue}Ft(w),await f(Y?1e3:500),await Q(w),n("คลิก/hover Full Video ✅"),await f(Y?3e3:2e3),$=await k(Y?12e3:8e3,w)}if($)await Q($),n("คลิก 720p ✅");else{M("ไม่พบ 720p — ลอง fallback คลิก Full Video โดยตรง"),R.isConnected&&(await Q(R),await f(2e3));const h=await c("video",5e3);if(h)await Q(h),n("🔄 คลิก video menu item โดยตรงเป็น fallback");else return}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const x=Date.now();let C=!1,y=!1;for(;Date.now()-x<3e5;){for(const h of document.querySelectorAll("div[data-title] div, div[data-content] div")){const E=(h.textContent||"").trim();if(E==="Download complete!"||E==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),C=!0;break}(E.includes("Downloading your extended video")||E.includes("กำลังดาวน์โหลด"))&&(y||(y=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(C)break;if(y){let h=!1;for(const E of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((E.textContent||"").trim().includes("Downloading")){h=!0;break}if(!h){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),C=!0;break}}await f(2e3)}if(!C){M("เตรียมไฟล์หมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let u=!1;const b=Date.now();for(;Date.now()-b<6e4&&!u;){try{await new Promise(h=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:B},E=>{chrome.runtime.lastError?M(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):E!=null&&E.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${E.message}`),u=!0,E.downloadUrl&&(v=E.downloadUrl,n(`[TikTok] จะใช้ download URL: ${E.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-b)/1e3)}s)`),h()})})}catch(h){M(`ตรวจสอบผิดพลาด: ${h.message}`)}u||await f(3e3)}u||M("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const D=await se();v||(v=D);try{P("open","done"),Ot(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),le(v),re(2e3)}async function Tn(){try{await dn;const e=bt();let t=await new Promise(i=>{chrome.storage.local.get(e,r=>{if(chrome.runtime.lastError){i(null);return}i((r==null?void 0:r[e])||null)})});if(!t&&Pt){const i="netflow_pending_action";t=await new Promise(r=>{chrome.storage.local.get(i,a=>{if(chrome.runtime.lastError){r(null);return}r((a==null?void 0:a[i])||null)})}),t&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(i))}if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const l=Date.now()-t.timestamp;if(l>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(e);return}const s=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=s,await new Promise(i=>{chrome.storage.local.set({[e]:t},()=>i())}),await f(300),!await new Promise(i=>{chrome.storage.local.get(e,r=>{const a=r==null?void 0:r[e];i((a==null?void 0:a._claimed)===s)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(e),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(l/1e3)} วินาที)`),t.action==="mute_video"?await je(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await Ke(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,o)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),o({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Cn(e).then(l=>{if(n(`✅ ระบบอัตโนมัติเสร็จ: ${l.message}`),!l.success){n("⚠️ Automation จบแต่มีข้อผิดพลาด — ส่ง VIDEO_GENERATION_ERROR เพื่อให้ loop ข้ามไปรอบถัดไป");try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_ERROR",error:l.message||"Automation completed with errors",source:"veo",recoverable:!0})}catch{}}Le()}).catch(l=>{if(l instanceof de||(l==null?void 0:l.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Lt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Oe()}catch{}try{chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}}else{console.error("[Netflow AI] Generate error:",l),n(`❌ Automation ล้มเหลว: ${(l==null?void 0:l.message)||"Unknown error"} — ส่ง VIDEO_GENERATION_ERROR`);try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_ERROR",error:(l==null?void 0:l.message)||"Automation failed",source:"veo",recoverable:!0})}catch{}}Le()}),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,o({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return o({status:"ready"}),!1;if((e==null?void 0:e.type)==="CAPTURE_PAGE_VIDEO")return(async()=>{try{const l=document.querySelectorAll("video");let s="",p=0;for(const d of l){const g=d.src||d.currentSrc||"";if(!g)continue;const m=d.getBoundingClientRect(),v=m.width*m.height;(v>p||!s&&g)&&(p=v,s=g)}if(!s){o({success:!1,error:"No video found"});return}const i=await fetch(s);if(!i.ok){o({success:!1,error:"HTTP "+i.status});return}const r=await i.blob();if(r.size<1e4){o({success:!1,error:"Video too small: "+r.size});return}const a=await new Promise((d,g)=>{const m=new FileReader;m.onloadend=()=>d(m.result),m.onerror=()=>g(new Error("FileReader error")),m.readAsDataURL(r)});o({success:!0,data:a,size:r.size})}catch(l){o({success:!1,error:l.message})}})(),!0;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return o({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await f(500);const l=mn();if(!l){M("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const s=l.getBoundingClientRect(),p=s.left+s.width/2,i=s.top+s.height/2;n(`การ์ดรูปที่ (${p.toFixed(0)}, ${i.toFixed(0)}) ${s.width.toFixed(0)}x${s.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let r=0;r<2;r++){const a=document.elementFromPoint(p,i);a?(await Q(a),n(`คลิก ${r+1}/2 บน <${a.tagName.toLowerCase()}>`)):(await Q(l),n(`คลิก ${r+1}/2 บนการ์ด (สำรอง)`)),await f(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),(async()=>{try{const e=await new Promise(t=>{chrome.storage.local.get("netflow_preshow_overlay",o=>{if(chrome.runtime.lastError){t(null);return}t((o==null?void 0:o.netflow_preshow_overlay)||null)})});if(e&&e.timestamp&&Date.now()-e.timestamp<3e4){n("⚡ Pre-show overlay — แสดง overlay ทันที");try{Gt(e.theme)}catch{}try{Jt(e.sceneCount||1)}catch(t){n(`⚠️ pre-show overlay error: ${t.message}`)}chrome.storage.local.remove("netflow_preshow_overlay")}}catch{}})(),Tn()})();
