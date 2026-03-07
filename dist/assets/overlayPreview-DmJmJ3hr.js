import"./modulepreload-polyfill-B5Qt9EMX.js";const O={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let k=O.green,K=null;function Se(t){O[t]&&(K=t,k=O[t],$e(),requestAnimationFrame(()=>Ee()))}function Pe(){if(K&&O[K])return O[K];try{const t=localStorage.getItem("netflow_app_theme");if(t&&O[t])return O[t]}catch{}return O.green}let L=0,F=255,R=65;function $e(){const t=k.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(L=parseInt(t[1],16),F=parseInt(t[2],16),R=parseInt(t[3],16))}let S=null,I=null,_=null,le=0,ae=0,q=!1,D=null,J=null,ee=1,M=[];function re(t){const e=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let a=2;a<=t;a++)e.push({stepId:`scene${a}-prompt`,label:`ฉาก ${a} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${a}-gen`,label:`ฉาก ${a} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${a}-wait`,label:`ฉาก ${a} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const Y=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];M=re(1);function Te(t){const e=t.rgb,a=t.accentRgb,r=t.doneRgb,o=t.hex,c=t.accentHex,p=t.doneHex,i=(()=>{const n=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!n)return"#4ade80";const g=h=>Math.min(255,h+80);return`#${[1,2,3].map(h=>g(parseInt(n[h],16)).toString(16).padStart(2,"0")).join("")}`})(),s=(()=>{const n=p.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!n)return"#4ade80";const g=h=>Math.min(255,h+60);return`#${[1,2,3].map(h=>g(parseInt(n[h],16)).toString(16).padStart(2,"0")).join("")}`})(),d=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),v=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,C=d?parseInt(d[1],16)/v:0,T=d?parseInt(d[2],16)/v:1,E=d?parseInt(d[3],16)/v:.25,f=n=>`${Math.round(C*n)}, ${Math.round(T*n)}, ${Math.round(E*n)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${e},0.15) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${a},0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 10% 80%, rgba(${e},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 90% 10%, rgba(${a},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(${f(18)},0.94) 0%, rgba(${f(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
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
    mix-blend-mode: screen;
}

/* ─── Vignette Overlay (enhanced with theme tint at edges) ─── */
#netflow-engine-overlay .nf-vignette {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.95) 100%),
        radial-gradient(ellipse at 0% 0%, rgba(${e},0.12) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 100%, rgba(${a},0.09) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 0%, rgba(${e},0.06) 0%, transparent 35%),
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
        rgba(${e},0.045) 2px,
        rgba(${e},0.045) 4px
    );
    pointer-events: none;
    z-index: 1;
    will-change: transform;
    animation: nf-scanline-shift 0.15s steps(2) infinite;
}

@keyframes nf-scanline-shift {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
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
    border: 1.5px solid rgba(${e},0.24);
    box-shadow: 0 0 30px rgba(${e},0.09), inset 0 0 30px rgba(${e},0.06);
    pointer-events: none;
    z-index: 1;
    animation: nf-pulse-expand 5s ease-out infinite;
}
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${a},0.18); box-shadow: 0 0 25px rgba(${a},0.09); }
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
    inset: -80px;
    background-image:
        radial-gradient(circle, rgba(${e},0.15) 1px, transparent 1px),
        radial-gradient(circle, rgba(${e},0.10) 1px, transparent 1px);
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
    inset: -80px;
    background-image:
        linear-gradient(rgba(${e},0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${e},0.08) 1px, transparent 1px);
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
        rgba(${e},0.042) 90px,
        rgba(${e},0.042) 91px
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
        rgba(${e},0.066) 110px,
        rgba(${e},0.066) 111px,
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
    background: radial-gradient(circle, rgba(${e},0.21) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${e},0.13) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${e},0.18) 0%, rgba(${a},0.06) 40%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${e},0.18) 0%, transparent 65%);
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
        linear-gradient(0deg, rgba(${e},0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${e},0.04) 1px, transparent 1px),
        linear-gradient(0deg, rgba(${a},0.025) 2px, transparent 2px),
        linear-gradient(90deg, rgba(${a},0.025) 2px, transparent 2px);
    background-size: 80px 80px, 80px 80px, 160px 160px, 160px 160px;
    pointer-events: none;
    z-index: 0;
}

/* ─── Pattern: Honeycomb Hex ─── */
.nf-pat-honeycomb {
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(circle at 50% 0%, rgba(${e},0.06) 2px, transparent 2px),
        radial-gradient(circle at 0% 75%, rgba(${a},0.05) 2px, transparent 2px),
        radial-gradient(circle at 100% 75%, rgba(${e},0.05) 2px, transparent 2px);
    background-size: 40px 46px;
    pointer-events: none;
    z-index: 0;
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
        rgba(${e},0.1) 15deg,
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
        radial-gradient(circle, rgba(${e},0.07) 1.5px, transparent 1.5px),
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
            rgba(${e},0.03) 40px, rgba(${e},0.03) 41px
        ),
        repeating-linear-gradient(
            -45deg, transparent, transparent 40px,
            rgba(${a},0.025) 40px, rgba(${a},0.025) 41px
        );
    pointer-events: none;
    z-index: 0;
}

/* ─── Pattern: Concentric Ripples ─── */
.nf-pat-ripple-1 {
    position: absolute;
    left: 20%; top: 30%;
    width: 700px; height: 700px;
    transform: translate(-50%, -50%);
    background: repeating-radial-gradient(
        circle, transparent 0px, transparent 30px,
        rgba(${e},0.04) 30px, rgba(${e},0.04) 31px
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
        linear-gradient(45deg, rgba(${e},0.035) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(${e},0.035) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(${a},0.03) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(${a},0.03) 75%);
    background-size: 60px 60px;
    background-position: 0 0, 0 30px, 30px -30px, 30px 0px;
    pointer-events: none;
    z-index: 0;
}

/* ─── Pattern: Plasma Blobs ─── */
.nf-pat-plasma {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse at 20% 50%, rgba(${e},0.14) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(${a},0.12) 0%, transparent 45%),
        radial-gradient(ellipse at 60% 80%, rgba(${e},0.10) 0%, transparent 40%),
        radial-gradient(ellipse at 30% 10%, rgba(${a},0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 60%, rgba(${e},0.09) 0%, transparent 45%);
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
        rgba(${e},0.08) 1.5%,
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
    background: rgba(${f(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${f(180)},0.05),
        inset 0 1px 0 rgba(${e},0.1),
        inset 0 0 40px rgba(${e},0.03);
    animation: nf-core-breathe 4s ease-in-out infinite;
    z-index: 10;
    backdrop-filter: blur(20px) saturate(1.5);
    -webkit-backdrop-filter: blur(20px) saturate(1.5);
}

@keyframes nf-core-breathe {
    0%, 100% {
        box-shadow:
            0 0 60px rgba(${e},0.15),
            0 0 120px rgba(${e},0.08),
            0 0 200px rgba(${f(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${f(180)},0.08),
            inset 0 1px 0 rgba(${e},0.15),
            inset 0 0 50px rgba(${e},0.05);
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
    border-bottom: 1px solid rgba(${e},0.2);
    background: linear-gradient(180deg, rgba(${e},0.06) 0%, transparent 100%);
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
    color: ${i};
    font-weight: 700;
    text-shadow: 0 0 10px rgba(${e},0.5);
}

.nf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${o};
    box-shadow: 0 0 8px rgba(${e}, 0.7);
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
    background: rgba(${e},0.1);
    border: 1px solid rgba(${e},0.3);
    font-family: 'Rajdhani', 'Orbitron', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 8px rgba(${e},0.4);
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
    scrollbar-color: rgba(${e},0.3) transparent;
}

.nf-terminal::-webkit-scrollbar { width: 4px; }
.nf-terminal::-webkit-scrollbar-track { background: transparent; }
.nf-terminal::-webkit-scrollbar-thumb { background: rgba(${e},0.3); border-radius: 2px; }

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
    color: rgba(${e},0.92);
    font-weight: 700;
    user-select: none;
}

.nf-term-active .nf-term-prefix { color: ${o}; text-shadow: 0 0 6px rgba(${e},0.4); }

.nf-term-status {
    margin-left: auto;
    font-size: 17px;
    font-weight: 600;
    padding: 1px 7px;
    border-radius: 4px;
    letter-spacing: 0.5px;
}

.nf-term-active .nf-term-status {
    background: rgba(${e},0.12);
    color: ${i};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
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
    border-top: 1px solid rgba(${e},0.2);
    background: linear-gradient(180deg, rgba(${f(5)},0.95) 0%, rgba(${f(12)},0.98) 100%);
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
        rgba(${e},0.045) 2px,
        rgba(${e},0.045) 4px
    );
    pointer-events: none;
    z-index: 4;
}

/* HUD Frame */
.nf-engine-frame {
    position: absolute;
    inset: 8px 14px;
    border: 1px solid rgba(${e},0.25);
    border-radius: 3px;
    box-shadow:
        0 0 20px rgba(${e},0.08),
        0 0 40px rgba(${e},0.04),
        inset 0 0 20px rgba(${e},0.02);
    animation: nf-frame-pulse 4s ease-in-out infinite;
}

@keyframes nf-frame-pulse {
    0%, 100% {
        border-color: rgba(${e},0.25);
        box-shadow: 0 0 20px rgba(${e},0.08), inset 0 0 20px rgba(${e},0.02);
    }
    50% {
        border-color: rgba(${e},0.45);
        box-shadow: 0 0 30px rgba(${e},0.15), inset 0 0 30px rgba(${e},0.04);
    }
}

/* Frame corner accents */
.nf-frame-corner {
    position: absolute;
    width: 14px;
    height: 14px;
    border-style: solid;
    border-color: rgba(${a},0.6);
}
.nf-frame-corner.nf-fc-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.nf-frame-corner.nf-fc-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
.nf-frame-corner.nf-fc-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
.nf-frame-corner.nf-fc-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

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
    background: radial-gradient(circle, rgba(${e},0.25) 0%, rgba(${a},0.08) 40%, transparent 70%);
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
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter:
        drop-shadow(0 0 4px rgba(${e},1))
        drop-shadow(0 0 12px rgba(${e},0.7))
        drop-shadow(0 0 28px rgba(${e},0.35));
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
    background: linear-gradient(135deg, rgba(${e},1) 0%, rgba(255,255,255,0.95) 45%, rgba(${e},0.9) 70%, rgba(255,255,255,0.85) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-text-stroke: 0.5px rgba(255,255,255,0.35);
    filter:
        drop-shadow(0 0 4px rgba(255,255,255,0.9))
        drop-shadow(0 0 12px rgba(${e},0.8))
        drop-shadow(0 0 30px rgba(${e},0.45))
        drop-shadow(0 0 60px rgba(${e},0.2));
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
    border: 1px solid rgba(${e},0.25);
    border-top: 1px solid rgba(${a},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${f(6)},0.75) 0%, rgba(${f(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${e},0.12), 0 0 24px rgba(${e},0.06), inset 0 1px 0 rgba(${a},0.08);
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
    background: linear-gradient(180deg, transparent, rgba(${e},0.4), transparent);
}

.nf-stat-label {
    color: rgba(${e},0.75);
    font-weight: 600;
    font-size: 11.5px;
    letter-spacing: 1.8px;
    text-shadow: 0 0 4px rgba(${e},0.3);
    white-space: nowrap;
}
.nf-stat-val {
    color: rgba(${a},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${a},0.7),
        0 0 12px rgba(${a},0.35),
        0 0 20px rgba(${e},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${f(8)}, 0.88);
    border: 1px solid rgba(${e},0.2);
    border-radius: 12px;
    padding: 14px 17px;
    backdrop-filter: blur(16px) saturate(1.3);
    -webkit-backdrop-filter: blur(16px) saturate(1.3);
    overflow: hidden;
    animation: nf-module-in 0.5s ease-out both;
    transition: border-color 0.4s, box-shadow 0.4s;
    z-index: 5;
}

.nf-module.nf-active {
    border-color: rgba(${e},0.5);
    box-shadow:
        0 0 30px rgba(${e},0.12),
        0 0 60px rgba(${e},0.06),
        inset 0 0 20px rgba(${e},0.03);
}

.nf-module.nf-done {
    border-color: rgba(${r}, 0.4);
    box-shadow: 0 0 20px rgba(${r}, 0.1);
}

.nf-module::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(${e},0.5), transparent);
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
    color: ${o};
    text-transform: uppercase;
    text-shadow: 0 0 8px rgba(${e},0.5), 0 0 16px rgba(${e},0.2);
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
        0 0 10px rgba(${e},0.8),
        0 0 20px rgba(${e},0.5),
        0 0 35px rgba(${e},0.3);
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
    background: ${o};
    box-shadow: 0 0 6px rgba(${e},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: ${p};
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
    background: linear-gradient(90deg, ${o}, ${i});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${e},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${p}, ${s});
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
    background: linear-gradient(90deg, ${o}, ${c});
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
    box-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${p}, ${s});
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
    color: rgba(${e}, 0.35);
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(${e},0.2), 0 0 40px rgba(${e},0.1);
}

.nf-brand-logo {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    border: 2px solid rgba(${e},0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(${f(8)},0.8);
    box-shadow: 0 0 20px rgba(${e},0.15);
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
    background: rgba(${e}, 0.04);
    border: 1px solid rgba(${e}, 0.15);
    border-radius: 8px;
    color: rgba(${e}, 0.5);
    font-size: 19px;
    padding: 6px 14px;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 20;
    font-family: inherit;
}

.nf-close-btn:hover {
    background: rgba(${e}, 0.15);
    border-color: rgba(${e}, 0.4);
    color: #fff;
    text-shadow: 0 0 8px rgba(${e},0.5);
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
    stroke: rgba(${e},0.2);
    stroke-width: 4px;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
}

.nf-pipe-glow {
    fill: none;
    stroke: rgba(${e},0.3);
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
    fill: rgba(${e},0.9);
    filter: drop-shadow(0 0 6px rgba(${e},0.9));
}

/* ─── Particles ─── */
.nf-particle {
    position: absolute;
    width: 2px; height: 2px;
    background: rgba(${e},0.5);
    border-radius: 50%;
    animation: nf-float-up linear infinite;
    pointer-events: none;
    box-shadow: 0 0 4px rgba(${e},0.3);
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
    border: 2px solid rgba(${e},0.5);
    background: rgba(${f(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${o};
    font-size: 23px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(${e},0.3), 0 4px 12px rgba(0,0,0,0.5);
    transition: all 0.3s ease;
    animation: nf-toggle-pulse 2.5s ease-in-out infinite;
    font-family: 'Inter', system-ui, sans-serif;
}

#nf-toggle-btn:hover {
    transform: scale(1.1);
    border-color: rgba(${e},0.8);
    box-shadow: 0 0 30px rgba(${e},0.5), 0 4px 16px rgba(0,0,0,0.6);
    background: rgba(${e},0.15);
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
    0%, 100% { box-shadow: 0 0 20px rgba(${e},0.3), 0 4px 12px rgba(0,0,0,0.5); }
    50% { box-shadow: 0 0 30px rgba(${e},0.5), 0 4px 16px rgba(0,0,0,0.5); }
}

/* ─── Corner decorative brackets ─── */
.nf-corner-deco {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: rgba(${e},0.15);
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
    color: rgba(${e},0.35);
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
.nf-proc-active .nf-proc-num {
    color: ${o};
    text-shadow: 0 0 6px rgba(${e},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${o};
    box-shadow: 0 0 6px rgba(${e},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}
.nf-proc-active .nf-proc-badge {
    background: rgba(${e},0.12);
    color: ${i};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-proc-done {
    color: rgba(${r},0.7);
}
.nf-proc-done .nf-proc-num { color: rgba(${r},0.5); }
.nf-proc-done .nf-proc-dot {
    background: ${p};
    box-shadow: 0 0 5px rgba(${r},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${r},0.1);
    color: ${s};
}

.nf-proc-error {
    color: rgba(239,68,68,0.8);
}
.nf-proc-error .nf-proc-dot { background: #ef4444; }
.nf-proc-error .nf-proc-badge {
    background: rgba(239,68,68,0.1);
    color: #f87171;
}

.nf-proc-skipped {
    opacity: 0.15;
}

    `}function we(){_||(_=document.createElement("style"),_.id="netflow-overlay-styles",_.textContent=Te(k),document.head.appendChild(_))}function ye(t){t.innerHTML="",M.forEach((e,a)=>{const r=document.createElement("div");r.className="nf-proc-row nf-proc-waiting",r.id=`nf-proc-${e.stepId}`,r.innerHTML=`
            <span class="nf-proc-num">${a+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(r)})}function ze(){const t=document.getElementById("nf-terminal");if(!t)return;ye(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${M.length}`)}function de(t,e){let i="";for(let l=0;l<32;l++){const b=l/32*Math.PI*2,u=(l+.2)/32*Math.PI*2,m=(l+.5)/32*Math.PI*2,w=(l+.8)/32*Math.PI*2,y=(l+1)/32*Math.PI*2;i+=`${l===0?"M":"L"}${(120+104*Math.cos(b)).toFixed(1)},${(120+104*Math.sin(b)).toFixed(1)} `,i+=`L${(120+104*Math.cos(u)).toFixed(1)},${(120+104*Math.sin(u)).toFixed(1)} `,i+=`L${(120+116*Math.cos(m)).toFixed(1)},${(120+116*Math.sin(m)).toFixed(1)} `,i+=`L${(120+104*Math.cos(w)).toFixed(1)},${(120+104*Math.sin(w)).toFixed(1)} `,i+=`L${(120+104*Math.cos(y)).toFixed(1)},${(120+104*Math.sin(y)).toFixed(1)} `}i+="Z";const s=24,d=100,v=90;let C="";for(let l=0;l<s;l++){const b=l/s*Math.PI*2,u=(l+.25)/s*Math.PI*2,m=(l+.75)/s*Math.PI*2,w=(l+1)/s*Math.PI*2;C+=`${l===0?"M":"L"}${(120+v*Math.cos(b)).toFixed(1)},${(120+v*Math.sin(b)).toFixed(1)} `,C+=`L${(120+d*Math.cos(u)).toFixed(1)},${(120+d*Math.sin(u)).toFixed(1)} `,C+=`L${(120+d*Math.cos(m)).toFixed(1)},${(120+d*Math.sin(m)).toFixed(1)} `,C+=`L${(120+v*Math.cos(w)).toFixed(1)},${(120+v*Math.sin(w)).toFixed(1)} `}C+="Z";let T="";for(let l=0;l<64;l++){const b=l/64*Math.PI*2,u=l%4===0?117:119,m=l%4===0?124:122,w=l%4===0?.8:.4,y=l%4===0?.7:.35;T+=`<line x1="${(120+u*Math.cos(b)).toFixed(1)}" y1="${(120+u*Math.sin(b)).toFixed(1)}" x2="${(120+m*Math.cos(b)).toFixed(1)}" y2="${(120+m*Math.sin(b)).toFixed(1)}" stroke="rgba(${t},${y})" stroke-width="${w}"/>`}const E=26,f=78,n=68;let g="";for(let l=0;l<E;l++){const b=l/E*Math.PI*2,u=(l+.2)/E*Math.PI*2,m=(l+.5)/E*Math.PI*2,w=(l+.8)/E*Math.PI*2,y=(l+1)/E*Math.PI*2;g+=`${l===0?"M":"L"}${(120+n*Math.cos(b)).toFixed(1)},${(120+n*Math.sin(b)).toFixed(1)} `,g+=`L${(120+n*Math.cos(u)).toFixed(1)},${(120+n*Math.sin(u)).toFixed(1)} `,g+=`L${(120+f*Math.cos(m)).toFixed(1)},${(120+f*Math.sin(m)).toFixed(1)} `,g+=`L${(120+n*Math.cos(w)).toFixed(1)},${(120+n*Math.sin(w)).toFixed(1)} `,g+=`L${(120+n*Math.cos(y)).toFixed(1)},${(120+n*Math.sin(y)).toFixed(1)} `}g+="Z";let h="";for(let l=0;l<48;l++){const b=l/48*Math.PI*2,u=l%4===0?79:80,m=l%4===0?85:83,w=l%4===0?.6:.3,y=l%4===0?.6:.3;h+=`<line x1="${(120+u*Math.cos(b)).toFixed(1)}" y1="${(120+u*Math.sin(b)).toFixed(1)}" x2="${(120+m*Math.cos(b)).toFixed(1)}" y2="${(120+m*Math.sin(b)).toFixed(1)}" stroke="rgba(${e},${y})" stroke-width="${w}"/>`}function H(l,b,u,m,w){let y="";for(let N=0;N<u;N++){const $=N/u*Math.PI*2,x=(N+.25)/u*Math.PI*2,A=(N+.75)/u*Math.PI*2,V=(N+1)/u*Math.PI*2;y+=`${N===0?"M":"L"}${(l+w*Math.cos($)).toFixed(1)},${(b+w*Math.sin($)).toFixed(1)} `,y+=`L${(l+m*Math.cos(x)).toFixed(1)},${(b+m*Math.sin(x)).toFixed(1)} `,y+=`L${(l+m*Math.cos(A)).toFixed(1)},${(b+m*Math.sin(A)).toFixed(1)} `,y+=`L${(l+w*Math.cos(V)).toFixed(1)},${(b+w*Math.sin(V)).toFixed(1)} `}return y+"Z"}const P=42,z=[],B=H(120,120,14,18,13);z.push(`<g class="nf-kinetic-sub" style="transform-origin:120px 120px">
        <path d="${B}" fill="none" stroke="rgba(${t},0.8)" stroke-width="1.2"/>
        <circle cx="120" cy="120" r="9" fill="none" stroke="rgba(${e},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="120" cy="120" r="4" fill="rgba(${t},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);for(let l=0;l<8;l++){const b=l/8*Math.PI*2,u=120+P*Math.cos(b),m=120+P*Math.sin(b),y=H(u,m,10,14,10),N=l%2===0?"":"animation-direction:reverse;";z.push(`<g class="nf-kinetic-sub" style="transform-origin:${u.toFixed(1)}px ${m.toFixed(1)}px;${N}">
            <path d="${y}" fill="none" stroke="rgba(${e},0.6)" stroke-width="0.9"/>
            <circle cx="${u.toFixed(1)}" cy="${m.toFixed(1)}" r="7" fill="none" stroke="rgba(${t},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${u.toFixed(1)}" cy="${m.toFixed(1)}" r="2.5" fill="rgba(${t},0.6)"/>
        </g>`)}const X=z.join(`
`);let j="";for(let l=0;l<8;l++){const b=l/8*Math.PI*2,u=120+10*Math.cos(b),m=120+10*Math.sin(b),w=120+(P-10)*Math.cos(b),y=120+(P-10)*Math.sin(b);j+=`<line x1="${u.toFixed(1)}" y1="${m.toFixed(1)}" x2="${w.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(${e},0.25)" stroke-width="0.5"/>`}return`<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="nfKGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="rgba(${t},0.95)"/>
                <stop offset="50%" stop-color="rgba(${e},0.75)"/>
                <stop offset="100%" stop-color="rgba(${t},0.95)"/>
            </linearGradient>
            <linearGradient id="nfKGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(${e},0.8)"/>
                <stop offset="100%" stop-color="rgba(${t},0.6)"/>
            </linearGradient>
            <linearGradient id="nfKGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="rgba(${t},0.85)"/>
                <stop offset="50%" stop-color="rgba(${e},0.65)"/>
                <stop offset="100%" stop-color="rgba(${t},0.85)"/>
            </linearGradient>
        </defs>

        <!-- Outermost ambient rings + tick marks -->
        <g opacity="0.3">
            <circle cx="120" cy="120" r="126" stroke="rgba(${t},0.4)" stroke-width="0.3" stroke-dasharray="2,8"/>
            <circle cx="120" cy="120" r="124" stroke="rgba(${t},0.2)" stroke-width="0.2"/>
        </g>
        ${T}

        <!-- OUTER LAYER 1 — 32 sharp teeth (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${i}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.5" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="104" fill="none" stroke="rgba(${t},0.2)" stroke-width="0.5"/>
        </g>

        <!-- OUTER LAYER 2 — 24 teeth (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${C}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${v}" fill="none" stroke="rgba(${e},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
        </g>

        <!-- INNER RING 3 — 26 teeth (CW fast) + inner tick marks -->
        <g class="nf-kinetic-inner">
            <path d="${g}" fill="none" stroke="url(#nfKGrad3)" stroke-width="1.1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${n}" fill="none" stroke="rgba(${t},0.2)" stroke-width="0.4"/>
            <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="1,2"/>
        </g>
        ${h}

        <!-- Precision rings between inner gear and core -->
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="3,5" opacity="0.5"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(${e},0.1)" stroke-width="0.2"/>

        <!-- Connecting spokes (static) -->
        ${j}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${X}
        </g>
    </svg>`}function Ne(){const t=document.createElement("div");t.id="netflow-engine-overlay",D=document.createElement("canvas"),D.id="nf-matrix-canvas",t.appendChild(D);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let $=1;$<=5;$++){const x=document.createElement("div");x.className=`nf-ambient-orb nf-orb-${$}`,t.appendChild(x)}const a=document.createElement("div");a.className="nf-pat-data",t.appendChild(a);const r=document.createElement("div");r.className="nf-pat-diag-a",t.appendChild(r);const o=document.createElement("div");o.className="nf-pat-diag-b",t.appendChild(o);const c=document.createElement("div");c.className="nf-pat-circuit",t.appendChild(c);const p=document.createElement("div");p.className="nf-pat-honeycomb",t.appendChild(p);const i=document.createElement("div");i.className="nf-pat-binary",t.appendChild(i);const s=document.createElement("div");s.className="nf-pat-crosshatch",t.appendChild(s);const d=document.createElement("div");d.className="nf-pat-diamond",t.appendChild(d);const v=document.createElement("div");v.className="nf-pat-wave-h",t.appendChild(v);const C=document.createElement("div");C.className="nf-pat-radar",t.appendChild(C);const T=document.createElement("div");T.className="nf-pat-ripple-1",t.appendChild(T);const E=document.createElement("div");E.className="nf-pat-ripple-2",t.appendChild(E);const f=document.createElement("div");f.className="nf-pat-techscan",t.appendChild(f);const n=document.createElement("div");n.className="nf-center-glow",t.appendChild(n);const g=document.createElement("div");g.className="nf-pat-noise",t.appendChild(g);const h=document.createElement("div");h.className="nf-crt-scanlines",t.appendChild(h);const H=document.createElement("div");H.className="nf-vignette",t.appendChild(H);for(let $=0;$<3;$++){const x=document.createElement("div");x.className="nf-pulse-ring",t.appendChild(x)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach($=>{const x=document.createElement("div");x.className=`nf-corner-deco ${$}`,t.appendChild(x)});const P=document.createElement("button");P.className="nf-close-btn",P.textContent="✕ ซ่อน",P.onclick=()=>oe(),t.appendChild(P);const z=document.createElement("div");z.className="nf-layout";const B=document.createElement("div");B.className="nf-core-monitor",B.id="nf-core-monitor";const X=document.createElement("div");X.className="nf-core-header",X.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${M.length}</div>
    `,B.appendChild(X);const j=document.createElement("div");j.className="nf-terminal",j.id="nf-terminal",ye(j),B.appendChild(j);const l=document.createElement("div");l.className="nf-engine-core",l.id="nf-engine-core";const b=document.createElement("div");b.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach($=>{const x=document.createElement("div");x.className=`nf-frame-corner ${$}`,b.appendChild(x)}),l.appendChild(b);const u="http://www.w3.org/2000/svg",m=document.createElementNS(u,"svg");m.setAttribute("class","nf-engine-waves"),m.setAttribute("viewBox","0 0 560 140"),m.setAttribute("preserveAspectRatio","none"),m.id="nf-engine-waves";for(let $=0;$<4;$++){const x=document.createElementNS(u,"path");x.setAttribute("fill","none"),x.setAttribute("stroke-width",$<2?"1.5":"1"),x.setAttribute("stroke",$<2?`rgba(${k.rgb},${.14+$*.1})`:`rgba(${k.accentRgb},${.1+($-2)*.08})`),x.setAttribute("data-wave-idx",String($)),m.appendChild(x)}l.appendChild(m);const w=document.createElement("div");w.className="nf-engine-brand-inner",w.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${de(k.rgb,k.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${de(k.rgb,k.accentRgb)}
        </div>
    `,l.appendChild(w);const y=document.createElement("div");y.className="nf-engine-stats",y.id="nf-engine-stats",y.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([$,x,A])=>`<div class="nf-stat-item"><span class="nf-stat-label">${$}</span><span class="nf-stat-val" id="${x}">${A}</span></div>`).join(""),l.appendChild(y),B.appendChild(l),z.appendChild(B);const N=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];Y.forEach(($,x)=>{const A=Le($);A.classList.add(N[x]),A.id=`nf-mod-${$.id}`,z.appendChild(A)}),t.appendChild(z);for(let $=0;$<30;$++){const x=document.createElement("div");x.className="nf-particle",x.style.left=`${5+Math.random()*90}%`,x.style.bottom=`${Math.random()*40}%`,x.style.animationDuration=`${3+Math.random()*5}s`,x.style.animationDelay=`${Math.random()*4}s`;const A=.3+Math.random()*.4,V=.7+Math.random()*.3;x.style.background=`rgba(${Math.floor(L*V)}, ${Math.floor(F*V)}, ${Math.floor(R*V)}, ${A})`,x.style.width=`${1+Math.random()*2}px`,x.style.height=x.style.width,t.appendChild(x)}return t}function Le(t){const e=document.createElement("div");e.className="nf-module";const a=document.createElement("div");a.className="nf-mod-header",a.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(a),t.steps.forEach(o=>{const c=document.createElement("div");c.className="nf-step",c.id=`nf-step-${o.id}`;let p="";o.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),c.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${p}
        `,e.appendChild(c)});const r=document.createElement("div");return r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(r),e}function Fe(){le=Date.now(),setInterval(()=>{const t=Math.floor((Date.now()-le)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),a=String(t%60).padStart(2,"0"),r=document.getElementById("nf-timer");r&&(r.textContent=`${e}:${a}`);const o=document.getElementById("nf-stat-elapsed");o&&(o.textContent=`${e}:${a}`)},1e3)}const Re=120,pe=160,ce=.4;let W=null,fe=0,ge=0,be=0,te=[];function Ae(t,e){te=[];for(let a=0;a<Re;a++){const r=Math.random();let o;r<.22?o=0:r<.4?o=1:r<.55?o=2:r<.68?o=3:r<.84?o=4:o=5;const c=Math.random()*t,p=Math.random()*e,i=50+Math.random()*220,s=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);te.push({x:o===0?Math.random()*t:c+Math.cos(s)*i,y:o===0?Math.random()*e:p+Math.sin(s)*i,vx:(Math.random()-.5)*ce,vy:(Math.random()-.5)*ce,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:o,oCx:c,oCy:p,oRadius:i,oAngle:s,oSpeed:d})}}function Be(){if(!D)return;const t=D;if(J=t.getContext("2d"),!J)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,te.length===0&&Ae(t.width,t.height)};e(),window.addEventListener("resize",e);let a=null,r=0,o=0;function c(){if(!J||!D)return;requestAnimationFrame(c);const p=J,i=D.width,s=D.height;p.fillStyle=`rgba(${L*.04|0},${F*.04|0},${R*.06|0},1)`,p.fillRect(0,0,i,s),(!a||r!==i||o!==s)&&(r=i,o=s,a=p.createRadialGradient(i*.5,s*.5,0,i*.5,s*.5,Math.max(i,s)*.6),a.addColorStop(0,`rgba(${L*.08|0},${F*.08|0},${R*.1|0},0.4)`),a.addColorStop(1,"rgba(0,0,0,0)")),p.fillStyle=a,p.fillRect(0,0,i,s);const d=te,v=d.length,C=pe*pe;for(let f=0;f<v;f++){const n=d[f];if(n.pulsePhase+=n.pulseSpeed,n.motion===0)n.x+=n.vx,n.y+=n.vy,n.x<0?(n.x=0,n.vx=Math.abs(n.vx)*(.8+Math.random()*.4)):n.x>i&&(n.x=i,n.vx=-Math.abs(n.vx)*(.8+Math.random()*.4)),n.y<0?(n.y=0,n.vy=Math.abs(n.vy)*(.8+Math.random()*.4)):n.y>s&&(n.y=s,n.vy=-Math.abs(n.vy)*(.8+Math.random()*.4));else if(n.motion===1)n.oAngle+=n.oSpeed,n.x=n.oCx+Math.cos(n.oAngle)*n.oRadius,n.y=n.oCy+Math.sin(n.oAngle)*n.oRadius,n.oCx+=Math.sin(n.oAngle*.3)*.15,n.oCy+=Math.cos(n.oAngle*.3)*.15;else if(n.motion===2)n.oAngle+=n.oSpeed,n.x=n.oCx+Math.cos(n.oAngle)*n.oRadius,n.y=n.oCy+Math.sin(n.oAngle)*n.oRadius*.5,n.oCx+=Math.sin(n.oAngle*.2)*.1,n.oCy+=Math.cos(n.oAngle*.2)*.1;else if(n.motion===3){n.oAngle+=n.oSpeed;const g=n.oAngle,h=n.oRadius*.7;n.x=n.oCx+h*Math.cos(g),n.y=n.oCy+h*Math.sin(g)*Math.cos(g),n.oCx+=Math.sin(g*.15)*.12,n.oCy+=Math.cos(g*.15)*.12}else if(n.motion===4){n.oAngle+=n.oSpeed*1.2;const g=n.oRadius*(.5+.5*Math.abs(Math.sin(n.oAngle*.15)));n.x=n.oCx+Math.cos(n.oAngle)*g,n.y=n.oCy+Math.sin(n.oAngle)*g,n.oCx+=Math.sin(n.oAngle*.1)*.18,n.oCy+=Math.cos(n.oAngle*.1)*.18}else n.oAngle+=n.oSpeed,n.x+=n.vx*.8,n.y=n.oCy+Math.sin(n.oAngle+n.x*.008)*n.oRadius*.35,n.x<-30?n.x=i+30:n.x>i+30&&(n.x=-30),n.oCy+=Math.sin(n.oAngle*.1)*.08;if(n.motion>0){const g=n.oRadius+50;n.oCx<-g?n.oCx=i+g:n.oCx>i+g&&(n.oCx=-g),n.oCy<-g?n.oCy=s+g:n.oCy>s+g&&(n.oCy=-g)}}p.beginPath(),p.strokeStyle=`rgba(${L},${F},${R},0.06)`,p.lineWidth=.4;const T=new Path2D;for(let f=0;f<v;f++){const n=d[f];for(let g=f+1;g<v;g++){const h=d[g],H=n.x-h.x,P=n.y-h.y,z=H*H+P*P;z<C&&(1-z/C<.4?(p.moveTo(n.x,n.y),p.lineTo(h.x,h.y)):(T.moveTo(n.x,n.y),T.lineTo(h.x,h.y)))}}if(p.stroke(),p.strokeStyle=`rgba(${L},${F},${R},0.18)`,p.lineWidth=.8,p.stroke(T),!W||fe!==L||ge!==F||be!==R){W=document.createElement("canvas");const f=48;W.width=f,W.height=f;const n=W.getContext("2d"),g=n.createRadialGradient(f/2,f/2,0,f/2,f/2,f/2);g.addColorStop(0,`rgba(${L},${F},${R},0.9)`),g.addColorStop(.3,`rgba(${L},${F},${R},0.35)`),g.addColorStop(1,`rgba(${L},${F},${R},0)`),n.fillStyle=g,n.fillRect(0,0,f,f),fe=L,ge=F,be=R}const E=W;for(let f=0;f<v;f++){const n=d[f],g=.6+.4*Math.sin(n.pulsePhase),h=n.radius*5*(.8+g*.4);p.globalAlpha=.5+g*.4,p.drawImage(E,n.x-h/2,n.y-h/2,h,h)}p.globalAlpha=1,p.fillStyle="rgba(255,255,255,0.45)",p.beginPath();for(let f=0;f<v;f++){const n=d[f];if(n.radius>2){const g=.6+.4*Math.sin(n.pulsePhase),h=n.radius*(.8+g*.4)*.35;p.moveTo(n.x+h,n.y),p.arc(n.x,n.y,h,0,Math.PI*2)}}p.fill()}c()}let Z=null;const ne=560,Ge=140,xe=ne/2,me=Ge/2,ve=[];for(let t=0;t<=ne;t+=8){const e=Math.abs(t-xe)/xe;ve.push(Math.pow(Math.min(1,e*1.6),.6))}const He=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/ne,off:t*.6,spd:.7+t*.12}));function ke(){if(requestAnimationFrame(ke),ae+=.035,!Z){const e=document.getElementById("nf-engine-waves");if(!e)return;Z=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<Z.length;e++){const a=He[e],r=ae*a.spd+a.off;t.length=0,t.push(`M 0 ${me}`);let o=0;for(let c=0;c<=ne;c+=8){const p=me+a.amp*ve[o++]*Math.sin(c*a.freq+r);t.push(`L${c} ${p*10+.5|0}`)}Z[e].setAttribute("d",t.join(" "))}}function Oe(){ae=0,ke(),Be(),setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),a=document.getElementById("nf-stat-lat2"),r=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function Me(){let t=0;const e=M.filter(i=>i.status!=="skipped").length;for(const i of M){const s=document.getElementById(`nf-proc-${i.stepId}`);if(!s)continue;s.className="nf-proc-row";const d=s.querySelector(".nf-proc-badge");switch(i.status){case"done":s.classList.add("nf-proc-done"),d&&(d.textContent="✅ done"),t++;break;case"active":s.classList.add("nf-proc-active"),d&&(d.textContent=i.progress!==void 0&&i.progress>0?`⏳ ${i.progress}%`:"⏳ active");break;case"error":s.classList.add("nf-proc-error"),d&&(d.textContent="❌ error");break;case"skipped":s.classList.add("nf-proc-skipped"),d&&(d.textContent="— skip");break;default:s.classList.add("nf-proc-waiting"),d&&(d.textContent="(queued)")}}const a=document.getElementById("nf-step-counter");a&&(a.textContent=`${t}/${M.length}`);const r=document.querySelector(".nf-core-title-val"),o=document.querySelector(".nf-status-dot");t>=e&&e>0?(r&&(r.textContent="COMPLETE",r.style.color=k.doneHex),o&&(o.style.background=k.doneHex,o.style.boxShadow=`0 0 8px rgba(${k.doneRgb},0.7)`)):M.some(s=>s.status==="error")?(r&&(r.textContent="ERROR",r.style.color="#f87171"),o&&(o.style.background="#ef4444",o.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):M.some(s=>s.status==="active")&&r&&(r.textContent="ACTIVE",r.style.color=k.hex,r.style.textShadow=`0 0 10px rgba(${k.rgb},0.5)`);const c=document.getElementById("nf-terminal"),p=c==null?void 0:c.querySelector(".nf-proc-active");p&&c&&p.scrollIntoView({behavior:"smooth",block:"center"})}function Ce(){I&&I.isConnected||(we(),I=document.createElement("button"),I.id="nf-toggle-btn",I.className="nf-toggle-visible",I.innerHTML=q?"⚡":"✕",I.title="ซ่อน/แสดง Netflow Overlay",I.onclick=()=>oe(),document.body.appendChild(I))}function oe(){S&&(Ce(),q?(S.classList.remove("nf-hidden"),S.classList.add("nf-visible"),I&&(I.innerHTML="✕"),q=!1):(S.classList.remove("nf-visible"),S.classList.add("nf-hidden"),I&&(I.innerHTML="⚡"),q=!0))}const he={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Ee(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=K;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"red"}catch{e="red"}const a=he[e]||he.red;let r;try{r=chrome.runtime.getURL(a)}catch{r=`/${a}`}const o=k.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${o},0.25) 0%, rgba(${o},0.12) 50%, rgba(${o},0.20) 100%)`,`url('${r}')`].join(", "),t.style.backgroundSize="auto, auto, cover",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${o},0.45)`,t.style.boxShadow=`0 0 70px rgba(${o},0.22), 0 0 140px rgba(${o},0.1), inset 0 1px 0 rgba(${o},0.15)`}function _e(t=1){if(k=Pe(),$e(),S&&S.isConnected){q&&oe();return}if(S&&!S.isConnected&&(S=null),_&&(_.remove(),_=null),we(),ee=t,M=re(t),t>1){const e=Y.find(r=>r.id==="video");if(e){const r=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let o=2;o<=t;o++)r.push({id:`scene${o}-prompt`,label:`Scene ${o} Prompt`,status:"waiting"}),r.push({id:`scene${o}-gen`,label:`Scene ${o} Generate`,status:"waiting"}),r.push({id:`scene${o}-wait`,label:`Scene ${o} รอผล`,status:"waiting",progress:0});e.steps=r}const a=Y.find(r=>r.id==="render");if(a){const r=a.steps.find(c=>c.id==="download");r&&(r.label="ดาวน์โหลด 720p");const o=a.steps.find(c=>c.id==="upscale");o&&(o.label="Full Video")}}S=Ne(),document.body.appendChild(S),q=!1,Ce(),Fe(),Oe(),requestAnimationFrame(()=>Ee())}const De={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function je(t,e,a){const r=M.filter(i=>i.status==="done").length,o=M.length,c=document.getElementById("nf-stat-step");c&&(c.textContent=`${r}/${o}`);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=ee>1?`1/${ee}`:"1/1"),e==="active"){const i=document.getElementById("nf-stat-status"),s=De[t]||t.toUpperCase();i&&(i.textContent=s)}else if(e==="done"&&r>=o){const i=document.getElementById("nf-stat-status");i&&(i.textContent="COMPLETE")}else if(e==="error"){const i=document.getElementById("nf-stat-status");i&&(i.textContent="ERROR")}}function G(t,e,a){if(!S)return;for(const o of Y)for(const c of o.steps)c.id===t&&(c.status=e);for(const o of M)o.stepId===t&&(o.status=e);const r=document.getElementById(`nf-step-${t}`);r&&(r.className="nf-step",e==="active"?r.classList.add("nf-step-active"):e==="done"?r.classList.add("nf-step-done"):e==="error"&&r.classList.add("nf-step-error")),je(t,e),Ie(),Me()}function Ie(){for(const t of Y){const e=t.steps.filter(s=>s.status!=="skipped").length,a=t.steps.filter(s=>s.status==="done").length,r=t.steps.some(s=>s.status==="active"),o=e>0?Math.round(a/e*100):0,c=document.getElementById(`nf-pct-${t.id}`);c&&(c.textContent=`${o}%`);const p=document.getElementById(`nf-modbar-${t.id}`);p&&(p.style.width=`${o}%`);const i=document.getElementById(`nf-mod-${t.id}`);i&&(i.classList.remove("nf-active","nf-done"),o>=100?i.classList.add("nf-done"):r&&i.classList.add("nf-active"))}}function Ye(t){var r,o,c,p;ee=t;const e=new Map;for(const i of M)e.set(i.stepId,{status:i.status,progress:i.progress});M=re(t);for(const i of M){const s=e.get(i.stepId);s&&(i.status=s.status,s.progress!==void 0&&(i.progress=s.progress))}ze();{const i=Y.find(s=>s.id==="video");if(i){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((r=i.steps.find(d=>d.id==="animate"))==null?void 0:r.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((o=i.steps.find(d=>d.id==="vid-prompt"))==null?void 0:o.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((c=i.steps.find(d=>d.id==="vid-generate"))==null?void 0:c.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((p=i.steps.find(d=>d.id==="vid-wait"))==null?void 0:p.status)||"waiting",progress:0}];for(let d=2;d<=t;d++)s.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),s.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),s.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});i.steps=s,ue(i)}}const a=Y.find(i=>i.id==="render");if(a&&t>1){const i=a.steps.find(d=>d.id==="download");i&&(i.label="ดาวน์โหลด 720p");const s=a.steps.find(d=>d.id==="upscale");s&&(s.label="Full Video"),ue(a)}Ie(),Me()}function ue(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(o=>o.remove()),t.steps.forEach(o=>{const c=document.createElement("div");c.className="nf-step",c.id=`nf-step-${o.id}`;let p="";o.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),c.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${p}
        `,e.appendChild(c)});const r=document.createElement("div");r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(r)}function U(t){t.replace(/^\[Netflow AI\]\s*/,"")}window.chrome={runtime:{sendMessage:()=>{},lastError:null},storage:{local:{get:(t,e)=>e==null?void 0:e({}),set:()=>{}}}};const ie=new URLSearchParams(location.search).get("theme")||"red";Se(ie);Ye(2);_e();setTimeout(()=>{U("🚀 Overlay preview started — theme: "+ie),G("settings","active")},400);setTimeout(()=>{G("settings","done"),G("upload","active"),U("✅ Settings configured")},1600);setTimeout(()=>{G("upload","done"),G("prompt","active"),U("✅ Images uploaded (2 refs)")},3e3);setTimeout(()=>{G("prompt","done"),G("generate","active"),U("✅ Prompt injected"),U("⏳ Waiting for Scene 1 generation...")},4500);setTimeout(()=>{G("generate","done"),G("scene2","active"),U("✅ Scene 1 generated"),U("⏳ Generating Scene 2...")},7e3);const se=document.createElement("div");se.style.cssText=`
    position: fixed; bottom: 16px; right: 16px; z-index: 99999999;
    display: flex; gap: 8px; align-items: center;
`;const Ue=["red","blue","green","yellow","purple"],Q={red:"#ef4444",blue:"#3b82f6",green:"#00ff41",yellow:"#eab308",purple:"#8b5cf6"};Ue.forEach(t=>{const e=document.createElement("button");e.textContent=t,e.style.cssText=`
        background: ${Q[t]}22; border: 1.5px solid ${Q[t]};
        color: ${Q[t]}; padding: 4px 10px; border-radius: 6px;
        cursor: pointer; font-size: 11px; font-family: monospace; font-weight: 700;
        ${t===ie?"opacity:1; box-shadow: 0 0 8px "+Q[t]:"opacity:0.5"};
    `,e.onclick=()=>location.search="?theme="+t,se.appendChild(e)});document.body.appendChild(se);
