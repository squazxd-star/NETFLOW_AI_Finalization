(function(){"use strict";if(window.__NETFLOW_YOUTUBE_UPLOAD_LOADED__)console.log("[NetFlow YouTube] Already loaded — skipping duplicate injection");else{window.__NETFLOW_YOUTUBE_UPLOAD_LOADED__=!0,console.log("[NetFlow YouTube] Content script loaded on:",window.location.href);const a=e=>new Promise(n=>setTimeout(n,e)),R=(e,n)=>Math.floor(Math.random()*(n-e+1))+e,r=e=>{console.log(`[NetFlow YouTube] ${e}`);try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:`[YT] ${e}`})}catch{}},v=e=>{console.warn(`[NetFlow YouTube] ⚠️ ${e}`);try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`[YT] ⚠️ ${e}`})}catch{}},m=async(e,n=2e4,l=500)=>{const d=Date.now();for(;Date.now()-d<n;){const u=typeof e=="string"?document.querySelector(e):e();if(u)return u;await a(l)}return null},_=(e,n)=>{const l=[];return l.push(...Array.from(e.querySelectorAll(n))),e.querySelectorAll("*").forEach(d=>{d.shadowRoot&&l.push(..._(d.shadowRoot,n))}),l},f=e=>{e.focus(),e.click(),e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0}))},x=(e,n="button, a, span, div, label, tp-yt-paper-item, ytcp-text, yt-formatted-string, tp-yt-paper-radio-button",l=!1)=>{const d=Array.from(document.querySelectorAll(n)),u=_(document,n),E=[...d,...u],b=new Set;for(const w of E){if(b.has(w))continue;b.add(w);const g=(w.textContent||"").replace(/\s+/g," ").trim(),S=(w.innerText||"").replace(/\s+/g," ").trim();for(const T of e){const C=l?g===T:g.includes(T),B=l?S===T:S.includes(T);if(C||B){const U=w.getBoundingClientRect();if(U.width>0&&U.height>0)return w}}}return null},F=async(e,n)=>{if(e.focus(),e.click(),await a(200),document.execCommand("selectAll"),await a(100),document.execCommand("delete"),await a(200),Math.random()<.5)document.execCommand("insertText",!1,n),r(`[Paste] "${n.substring(0,40)}..."`);else{for(const d of n)document.execCommand("insertText",!1,d),await a(R(30,120));r(`[Type] "${n.substring(0,40)}..."`)}await a(300)},L=async(e,n)=>{e.focus(),e.click(),await a(200),e.select(),await a(100),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await a(200);for(const l of n)e.value+=l,e.dispatchEvent(new Event("input",{bubbles:!0})),await a(R(50,150));e.dispatchEvent(new Event("change",{bubbles:!0})),await a(200)};let q=null,$=null,I=[],O=0,A=null;const P={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}},K=e=>{const n=e.rgb,l=e.accentRgb,d=e.doneRgb,u=e.hex,E=e.doneHex,b=u.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),w=b?Math.max(parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16),1):255,g=b?parseInt(b[1],16)/w:0,S=b?parseInt(b[2],16)/w:1,T=b?parseInt(b[3],16)/w:.25,C=B=>`${Math.round(g*B)}, ${Math.round(S*B)}, ${Math.round(T*B)}`;return`
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700&display=swap');

#netflow-youtube-hud {
    position: fixed; top: 16px; right: 16px; z-index: 999999;
    min-width: 300px; max-width: 340px;
    background:
        radial-gradient(ellipse at 20% 10%, rgba(${n},0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 90%, rgba(${l},0.06) 0%, transparent 50%),
        linear-gradient(135deg, rgba(${C(8)},0.97) 0%, rgba(${C(2)},0.98) 100%);
    border: 1px solid rgba(${n},0.35);
    border-radius: 14px;
    padding: 0;
    color: #e0ffe8;
    box-shadow:
        0 0 20px rgba(${n},0.15),
        0 0 60px rgba(${n},0.06),
        0 8px 32px rgba(0,0,0,0.7),
        inset 0 1px 0 rgba(${n},0.1);
    overflow: hidden;
    animation: nfyt-fade-in 0.5s ease-out;
    font-family: 'Inter', system-ui, sans-serif;
}

@keyframes nfyt-fade-in {
    from { opacity: 0; transform: translateY(-12px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes nfyt-fade-out {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.95) translateY(-8px); }
}
@keyframes nfyt-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
@keyframes nfyt-scan {
    0% { top: 0; }
    100% { top: 100%; }
}

/* ── Header ── */
#netflow-youtube-hud .nfyt-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 14px 10px;
    background: linear-gradient(90deg, rgba(${n},0.08) 0%, transparent 70%);
    border-bottom: 1px solid rgba(${n},0.15);
    position: relative;
}
#netflow-youtube-hud .nfyt-header::after {
    content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1px;
    background: linear-gradient(90deg, rgba(${n},0.5), rgba(${l},0.3), transparent);
}
#netflow-youtube-hud .nfyt-title {
    font-family: 'Orbitron', monospace;
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
    color: ${u}; text-transform: uppercase;
    text-shadow: 0 0 8px rgba(${n},0.5);
    display: flex; align-items: center; gap: 7px;
}
#netflow-youtube-hud .nfyt-timer {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; color: rgba(${n},0.6);
    letter-spacing: 0.5px;
}

/* ── Steps ── */
#netflow-youtube-hud .nfyt-steps {
    padding: 10px 14px 12px;
    position: relative;
}
/* Scanline effect */
#netflow-youtube-hud .nfyt-steps::before {
    content: ''; position: absolute; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(${n},0.12), transparent);
    animation: nfyt-scan 4s linear infinite;
    pointer-events: none; z-index: 1;
}
#netflow-youtube-hud .nfyt-step {
    display: flex; align-items: center; gap: 8px;
    padding: 5px 0; font-size: 11.5px;
    transition: all 0.3s ease;
}
/* Dot indicator */
#netflow-youtube-hud .nfyt-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
    border: 1.5px solid rgba(100,100,100,0.5);
    background: transparent;
    transition: all 0.3s ease;
    display: flex; align-items: center; justify-content: center;
}
#netflow-youtube-hud .nfyt-step[data-status="done"] .nfyt-dot {
    background: ${E}; border-color: ${E};
    box-shadow: 0 0 6px rgba(${d},0.6);
}
#netflow-youtube-hud .nfyt-step[data-status="active"] .nfyt-dot {
    background: ${u}; border-color: ${u};
    box-shadow: 0 0 8px rgba(${n},0.8);
    animation: nfyt-pulse 1.2s ease-in-out infinite;
}
#netflow-youtube-hud .nfyt-step[data-status="error"] .nfyt-dot {
    background: #ef4444; border-color: #ef4444;
    box-shadow: 0 0 6px rgba(239,68,68,0.6);
}
/* Labels */
#netflow-youtube-hud .nfyt-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; color: rgba(255,255,255,0.35);
    transition: color 0.3s ease;
}
#netflow-youtube-hud .nfyt-step[data-status="done"] .nfyt-label { color: rgba(${d},0.85); }
#netflow-youtube-hud .nfyt-step[data-status="active"] .nfyt-label { color: ${u}; text-shadow: 0 0 6px rgba(${n},0.4); }
#netflow-youtube-hud .nfyt-step[data-status="error"] .nfyt-label { color: #ef4444; }

/* ── Footer ── */
#netflow-youtube-hud .nfyt-footer {
    padding: 6px 14px 8px;
    border-top: 1px solid rgba(${n},0.1);
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; color: rgba(${n},0.3);
    text-align: center; letter-spacing: 0.5px;
}
`},z=e=>{if(q)return;const n=P[e||""]||P.green;$||($=document.createElement("style"),document.head.appendChild($)),$.textContent=K(n),O=Date.now(),q=document.createElement("div"),q.id="netflow-youtube-hud",q.innerHTML=`
        <div class="nfyt-header">
            <div class="nfyt-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                YOUTUBE UPLOAD
            </div>
            <div class="nfyt-timer" id="nfyt-timer">00:00</div>
        </div>
        <div class="nfyt-steps" id="netflow-yt-steps"></div>
        <div class="nfyt-footer">NETFLOW AI ENGINE • SHORTS AUTOMATION</div>
    `,document.body.appendChild(q),A=setInterval(()=>{const l=document.getElementById("nfyt-timer");if(!l)return;const d=Math.floor((Date.now()-O)/1e3),u=String(Math.floor(d/60)).padStart(2,"0"),E=String(d%60).padStart(2,"0");l.textContent=`${u}:${E}`},1e3)},h=(e,n)=>{e>=0&&e<I.length&&(I[e].status=n);const l=document.getElementById("netflow-yt-steps");l&&(l.innerHTML=I.map(d=>{const u=d.status||"pending";return`<div class="nfyt-step" data-status="${u}"><div class="nfyt-dot">${u==="done"?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':u==="error"?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>':""}</div><span class="nfyt-label">${d.label}</span></div>`}).join(""))},H=(e=5e3)=>{A&&(clearInterval(A),A=null),q&&(q.style.animation="nfyt-fade-out 0.4s ease-in forwards"),setTimeout(()=>{q==null||q.remove(),q=null,$==null||$.remove(),$=null},e)},j=()=>new Promise(e=>{chrome.runtime.sendMessage({type:"GET_CACHED_VIDEO"},n=>{var l;if(chrome.runtime.lastError||!(n!=null&&n.success)||!n.data){v("No cached video from background"),e(null);return}try{const[d,u]=n.data.split(","),E=((l=d.match(/:(.*?);/))==null?void 0:l[1])||"video/mp4",b=atob(u),w=new Uint8Array(b.length);for(let S=0;S<b.length;S++)w[S]=b.charCodeAt(S);const g=new File([w],"netflow-shorts.mp4",{type:E});r(`Video file created: ${(g.size/1024/1024).toFixed(1)} MB`),e(g)}catch(d){v(`Failed to create File: ${d.message}`),e(null)}})});async function V(e){r("=== เริ่ม YouTube Shorts Upload ==="),r(`Title: "${e.title}" | Visibility: ${e.visibility} | Kids: ${e.madeForKids} | Schedule: ${e.scheduleEnabled?`${e.scheduleDate} ${e.scheduleTime}`:"ไม่ตั้ง"}`),I=[{label:"เปิดหน้าอัพโหลด",status:"pending"},{label:"อัพโหลดวิดีโอ",status:"pending"},{label:"กรอกชื่อ + คำอธิบาย",status:"pending"},{label:"เลือกผู้ชม (เด็ก/ไม่เด็ก)",status:"pending"},{label:"ข้ามไปหน้าเผยแพร่",status:"pending"},{label:"เลือกการเผยแพร่ + โพสต์",status:"pending"}],z(e.theme),h(-1,"");try{if(h(0,"active"),r("── ขั้น 1: เปิดหน้าอัพโหลด (เนื้อหา → Shorts → อัปโหลดวิดีโอ) ──"),!document.querySelector("ytcp-uploads-dialog")){const o=await m(()=>{const s=document.querySelector("#menu-item-1");if(s){const t=s.getBoundingClientRect();if(t.width>0&&t.height>0)return s}return x(["เนื้อหา","Content"],"a.menu-item-link, tp-yt-paper-icon-item, div.nav-item-text")},1e4);if(o){const s=o.closest("a.menu-item-link")||o;f(s),r('คลิก "เนื้อหา/Content" ใน sidebar'),await a(3e3)}else{const s=window.location.pathname.match(/\/channel\/([^/]+)/),t=s?s[1]:"";t&&(r('ไม่พบเมนู "เนื้อหา" — ใช้ URL ตรง'),window.location.href=`${window.location.origin}/channel/${t}/videos/shorts`,await a(4e3))}const i=await m(()=>{const s=document.querySelectorAll("tp-yt-paper-tab");for(const t of s)if((t.textContent||"").trim()==="Shorts"){const y=t.getBoundingClientRect();if(y.width>0&&y.height>0)return t}return x(["Shorts"],"tp-yt-paper-tab, div.tab-content")},8e3);if(i){const s=i.closest("tp-yt-paper-tab")||i;f(s),r('คลิก tab "Shorts"'),await a(2500)}else{v('ไม่พบ tab "Shorts" — ลอง URL ตรง');const s=window.location.pathname.match(/\/channel\/([^/]+)/),t=s?s[1]:"";t&&(window.location.href=`${window.location.origin}/channel/${t}/videos/shorts`,await a(3e3))}const c=await m(()=>{const s=document.querySelector('ytcp-button-shape button[aria-label="อัปโหลดวิดีโอ"]')||document.querySelector('ytcp-button-shape button[aria-label="Upload videos"]')||document.querySelector('ytcp-button-shape button[aria-label="Upload video"]');if(s){const t=s.getBoundingClientRect();if(t.width>0&&t.height>0)return s}return x(["อัปโหลดวิดีโอ","Upload videos","Upload video"],"button, ytcp-button-shape")},1e4);if(c)f(c),r('คลิกปุ่ม "อัปโหลดวิดีโอ" บนหน้า Shorts'),await a(2500);else{r('ไม่พบปุ่มอัปโหลดบนหน้า Shorts — ใช้ปุ่ม "สร้าง/Create" แทน');const s=await m(()=>{const t=document.querySelector('ytcp-button-shape button[aria-label="สร้าง"]')||document.querySelector('ytcp-button-shape button[aria-label="Create"]');if(t){const y=t.getBoundingClientRect();if(y.width>0&&y.height>0)return t}const p=document.querySelectorAll("ytcp-button-shape button");for(const y of p){const k=(y.textContent||"").replace(/\s+/g," ").trim();if(k==="สร้าง"||k==="Create"){const D=y.getBoundingClientRect();if(D.width>0&&D.height>0)return y}}return x(["สร้าง","Create"],"ytcp-button-shape button, button")},1e4);if(s){f(s),r('คลิกปุ่ม "สร้าง/Create" (มุมขวาบน)'),await a(2e3);const t=await m(()=>{const p=document.querySelectorAll("ytcp-text-menu yt-formatted-string.item-text, tp-yt-paper-item yt-formatted-string");for(const y of p){const k=(y.textContent||"").replace(/\s+/g," ").trim();if(k==="อัปโหลดวิดีโอ"||k==="Upload videos"||k==="Upload video"){const D=y.closest("tp-yt-paper-item")||y.closest("div.style-scope.ytcp-text-menu")||y,N=D.getBoundingClientRect();if(N.width>0&&N.height>0)return D}}return x(["อัปโหลดวิดีโอ","Upload videos","Upload video"],"tp-yt-paper-item, ytcp-text-menu div, yt-formatted-string")},8e3);t?(f(t),r('คลิก "อัปโหลดวิดีโอ/Upload videos" จาก dropdown'),await a(2500)):v('ไม่พบ "อัปโหลดวิดีโอ" ใน dropdown ของปุ่มสร้าง')}else v("ไม่พบทั้งปุ่มอัปโหลดและปุ่มสร้าง — ไม่สามารถเปิดหน้าอัปโหลดได้")}}h(0,"done"),await a(3e3),h(1,"active"),r("── ขั้น 2: อัพโหลดวิดีโอ ──");const l=await j();if(!l)return h(1,"error"),{success:!1,error:"ไม่พบไฟล์วิดีโอใน cache"};let d=!1;const u=await m(()=>{const o=document.querySelector("ytcp-uploads-file-picker");if(o){const i=o.querySelector('input[type="file"]')||o.querySelector('input[name="Filedata"]');if(i)return i}return document.querySelector('input[name="Filedata"]')||document.querySelector('ytcp-uploads-dialog input[type="file"]')},1e4);if(u){const o=u.getAttribute("style")||"";u.style.cssText="display:block !important; opacity:1; width:auto; height:auto; position:static; overflow:visible;",await a(200);const i=new DataTransfer;i.items.add(l),u.files=i.files,u.dispatchEvent(new Event("change",{bubbles:!0})),u.dispatchEvent(new Event("input",{bubbles:!0})),r(`ฉีดไฟล์ผ่าน file input (${l.name}, ${(l.size/1024/1024).toFixed(1)} MB)`),d=!0,await a(500),u.setAttribute("style",o)}if(!d){const o=document.querySelector("ytcp-uploads-file-picker #content")||document.querySelector("ytcp-uploads-file-picker");if(o){const i=new DataTransfer;i.items.add(l),o.dispatchEvent(new DragEvent("dragenter",{dataTransfer:i,bubbles:!0})),await a(100),o.dispatchEvent(new DragEvent("dragover",{dataTransfer:i,bubbles:!0})),await a(100),o.dispatchEvent(new DragEvent("drop",{dataTransfer:i,bubbles:!0})),r("ฉีดไฟล์ผ่าน drag-and-drop"),d=!0}}if(!d)return h(1,"error"),{success:!1,error:"ไม่พบ file input หรือ drop zone"};r("รอ YouTube ประมวลผลไฟล์..."),await a(5e3);const E=await m(()=>document.querySelector('#title-textarea #textbox[contenteditable="true"]')||document.querySelector('ytcp-social-suggestion-input #textbox[contenteditable="true"]')||document.querySelector('div[contenteditable="true"][aria-label*="ชื่อ"]')||document.querySelector('div[contenteditable="true"][aria-label*="title" i]'),3e4);if(!E)return h(1,"error"),{success:!1,error:"อัพโหลดไม่สำเร็จ — ไม่พบช่อง Title"};h(1,"done"),await a(3e3),h(2,"active"),r("── ขั้น 3: กรอกชื่อ + คำอธิบาย ──");let b=e.title||"Netflow AI Video";await F(E,b),r(`กรอกชื่อ: "${b}"`),await a(1e3);const w=x(["เพิ่มทั้งหมด","Add all"],"button, ytcp-button-shape button, div.ytcpButtonShapeImpl__button-text-content");if(w){const o=w.closest("button")||w;f(o),r('คลิก "เพิ่มทั้งหมด" — เพิ่มแฮชแท็กที่แนะนำ'),await a(800)}else r('ไม่พบปุ่ม "เพิ่มทั้งหมด" สำหรับแฮชแท็ก — ข้าม');let g=e.description||"";if(!g.includes("#Shorts")&&!g.includes("#shorts")&&(g=g.trim()?`${g.trim()}

#Shorts`:"#Shorts",r("เพิ่ม #Shorts ใน description อัตโนมัติ")),g){const o=await m(()=>document.querySelector('#description-textarea #textbox[contenteditable="true"]')||document.querySelector('div[contenteditable="true"][aria-label*="คำอธิบาย"]')||document.querySelector('div[contenteditable="true"][aria-label*="description" i]')||document.querySelector('div[contenteditable="true"][aria-label*="บอกข้อมูล"]'),8e3);o?(await F(o,g),r(`กรอกคำอธิบาย: "${g.substring(0,50)}..."`)):v("ไม่พบช่อง Description")}h(2,"done"),await a(3e3),h(3,"active"),r('── ขั้น 4: เลือก "สร้างมาเพื่อเด็ก" ──'),await a(1e3);const S=document.querySelector("#scrollable-content")||document.querySelector("ytcp-uploads-dialog .scrollable");S&&(S.scrollTop=S.scrollHeight,await a(500));const T=e.madeForKids?["ใช่ วิดีโอนี้สร้างมาเพื่อเด็ก","Yes, it's made for kids"]:["ไม่ วิดีโอนี้ไม่ได้สร้างมาเพื่อเด็ก","No, it's not made for kids"],C=await m(()=>x(T,"tp-yt-paper-radio-button"),1e4);if(C)f(C),r(`เลือก: ${e.madeForKids?"สร้างมาเพื่อเด็ก":"ไม่ได้สร้างมาเพื่อเด็ก"}`);else{v("ไม่พบตัวเลือก Made for Kids — fallback");const o=document.querySelectorAll("tp-yt-paper-radio-button");o.length>=2&&f(e.madeForKids?o[0]:o[1])}h(3,"done"),await a(3e3),h(4,"active"),r('── ขั้น 5: กด "ถัดไป/Next" 3 ครั้ง ──');for(let o=0;o<3;o++){const i=await m(()=>{const c=document.querySelector("#next-button");if(c&&!c.hidden){const s=c.querySelector("ytcp-button-shape button")||c.querySelector("button");if(s&&!s.disabled)return s;if(!c.disabled)return c}return x(["ถัดไป","Next"],"button")},1e4);if(i)f(i),r(`กด "ถัดไป/Next" ครั้งที่ ${o+1}/3`),await a(2500);else{v(`ไม่พบปุ่ม "ถัดไป" ครั้งที่ ${o+1}`);const c=document.querySelector("#next-button");c&&(f(c),await a(2500))}}h(4,"done"),await a(3e3),h(5,"active"),r("── ขั้น 6: เลือกการเผยแพร่ ──"),await a(1500);const U={public:"PUBLIC",unlisted:"UNLISTED",private:"PRIVATE"}[e.visibility]||"PUBLIC";let M=document.querySelector(`tp-yt-paper-radio-button[name="${U}"]`);if(!M){const o={public:["สาธารณะ","Public"],unlisted:["ไม่เป็นสาธารณะ","Unlisted"],private:["ส่วนตัว","Private"]};M=x(o[e.visibility]||o.public,"tp-yt-paper-radio-button")}if(M)f(M),r(`เลือกการเผยแพร่: ${e.visibility} (${U})`);else{v("ไม่พบตัวเลือกการเผยแพร่ — ลอง index");const o=document.querySelectorAll("#privacy-radios tp-yt-paper-radio-button"),i=e.visibility==="private"?0:e.visibility==="unlisted"?1:2;o[i]&&f(o[i])}await a(1500),r("รอการอัพโหลดเสร็จก่อนเผยแพร่...");const W=Date.now();for(;Date.now()-W<3e5;){const o=document.body.innerText;if(["การตรวจสอบเสร็จสมบูรณ์","ตรวจสอบเสร็จแล้ว","Checks complete","การประมวลผลเสร็จสมบูรณ์","Finished processing","Upload complete","ไม่พบปัญหา","No issues found","การอัปโหลดเสร็จสมบูรณ์","อัปโหลดเสร็จแล้ว"].some(s=>o.includes(s))){r("✅ อัพโหลด/ตรวจสอบเสร็จ");break}const c=document.querySelector("#done-button");if(c){const s=c.querySelector("button");if(s&&!s.disabled){r("✅ ปุ่มเผยแพร่/ตั้งเวลา พร้อมใช้งาน");break}}await a(3e3)}if(e.scheduleEnabled&&e.scheduleDate&&e.scheduleTime){r("── โหมดตั้งเวลา ──");const o=await m(()=>{const t=document.querySelector("#second-container-expand-button");if(t){const p=t.getBoundingClientRect();if(p.width>0&&p.height>0)return t}return x(["ตั้งเวลา","Schedule"],"ytcp-icon-button, .early-access-header")},5e3);o?(f(o),r('คลิกเปิด "ตั้งเวลา" chevron'),await a(2e3)):v("ไม่พบปุ่มเปิดตั้งเวลา");const i=await m(()=>{const t=document.querySelector("ytcp-datetime-picker");if(!t)return null;const p=t.querySelector("ytcp-text-dropdown-trigger")||t.querySelector("ytcp-dropdown-trigger");if(p){const y=p.getBoundingClientRect();if(y.width>0&&y.height>0)return p}return t.querySelector('div[role="button"].container')},5e3);if(i){f(i),r("คลิกเปิด date dropdown"),await a(1500);const t=await m(()=>document.querySelector("ytcp-date-picker tp-yt-iron-input input")||document.querySelector("ytcp-date-picker tp-yt-paper-input input[autofocus]")||document.querySelector("ytcp-date-picker tp-yt-paper-input input")||document.querySelector("ytcp-date-picker input.style-scope"),5e3);t?(t.focus(),await a(200),t.select(),await a(100),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await a(500),await m(()=>x(["วันที่ไม่ถูกต้อง","Invalid date"],"div, tp-yt-paper-input-error, #a11yWrapper"),3e3)&&r('พบ error "วันที่ไม่ถูกต้อง" — พร้อมใส่วันที่'),await L(t,e.scheduleDate),r(`ใส่วันที่: "${e.scheduleDate}"`),await a(500),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),await a(1e3),r("กด Enter ยืนยันวันที่")):v("ไม่พบช่อง input วันที่")}else v("ไม่พบ date dropdown trigger");const c=await m(()=>{const t=document.querySelector("ytcp-datetime-picker");if(!t)return null;const p=t.querySelector("#time-of-day-container");return p?p.querySelector("tp-yt-iron-input input")||p.querySelector("tp-yt-paper-input input")||p.querySelector("input"):t.querySelector("tp-yt-paper-input#textbox input")||t.querySelector("#time-of-day-container input")},5e3);c?(c.focus(),c.click(),await a(800),c.select(),await a(200),c.value="",c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0})),await a(300),await L(c,e.scheduleTime),r(`ใส่เวลา: "${e.scheduleTime}"`),await a(500),c.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),c.dispatchEvent(new KeyboardEvent("keypress",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),c.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),await a(1e3),r("กด Enter ยืนยันเวลา")):v("ไม่พบช่อง input เวลา");const s=await m(()=>{const t=document.querySelector("#done-button");if(t){const p=t.querySelector('button[aria-label="ตั้งเวลา"]')||t.querySelector('button[aria-label="Schedule"]');if(p&&!p.disabled)return p;const y=t.querySelector("button:not([disabled])");if(y){const k=(y.textContent||"").trim();if(k.includes("ตั้งเวลา")||k.includes("Schedule"))return y}}return document.querySelector('button[aria-label="ตั้งเวลา"]:not([disabled])')||document.querySelector('button[aria-label="Schedule"]:not([disabled])')||x(["ตั้งเวลา","Schedule"],"button")},1e4);if(s)f(s),r('✅ คลิก "ตั้งเวลา/Schedule"'),h(5,"done");else return h(5,"error"),{success:!1,error:'ไม่พบปุ่ม "ตั้งเวลา/Schedule"'}}else{r("── โหมดเผยแพร่ทันที ──");const o=await m(()=>{const i=document.querySelector("#done-button");if(i){const c=i.querySelector('button[aria-label="เผยแพร่"]')||i.querySelector('button[aria-label="Publish"]')||i.querySelector('button[aria-label="บันทึก"]')||i.querySelector('button[aria-label="Save"]');if(c&&!c.disabled)return c;const s=i.querySelector("button:not([disabled])");if(s){const t=(s.textContent||"").trim();if(["เผยแพร่","Publish","บันทึก","Save"].some(p=>t.includes(p)))return s}}return document.querySelector('button[aria-label="เผยแพร่"]:not([disabled])')||document.querySelector('button[aria-label="Publish"]:not([disabled])')||x(["เผยแพร่","Publish","บันทึก","Save"],"button")},1e4);if(o)f(o),r('✅ คลิก "เผยแพร่/Publish"'),h(5,"done");else return h(5,"error"),{success:!1,error:"ไม่พบปุ่มเผยแพร่/บันทึก"}}await a(3e3);const Y=await m(()=>{const o=document.querySelector("ytcp-video-share-dialog");if(o){const i=o.querySelector('#close-button button[aria-label="ปิด"]')||o.querySelector('#close-button button[aria-label="Close"]')||o.querySelector("#close-button button");if(i){const c=i.getBoundingClientRect();if(c.width>0&&c.height>0)return i}}return document.querySelector('tp-yt-paper-dialog button[aria-label="ปิด"]')||document.querySelector('tp-yt-paper-dialog button[aria-label="Close"]')||document.querySelector('ytcp-video-share-dialog button[aria-label="ปิด"]')||document.querySelector('ytcp-video-share-dialog button[aria-label="Close"]')},1e4);if(Y)f(Y),r("ปิด dialog สำเร็จ");else{const o=document.querySelector("ytcp-video-share-dialog #close-icon-button")||document.querySelector('ytcp-video-share-dialog ytcp-icon-button[icon="close"]')||document.querySelector('tp-yt-paper-dialog ytcp-icon-button[icon="close"]');if(o)f(o),r("ปิด dialog ผ่าน X button");else{const i=x(["ปิด","Close"],"tp-yt-paper-dialog button, ytcp-video-share-dialog button");i&&(f(i),r("ปิด dialog ผ่าน text match"))}}r("=== ✅ YouTube Shorts Upload เสร็จสมบูรณ์! ==="),H(5e3);try{chrome.runtime.sendMessage({type:"YOUTUBE_UPLOAD_COMPLETE",title:b,visibility:e.visibility,scheduled:e.scheduleEnabled||!1})}catch{}return{success:!0}}catch(n){return v(`Upload error: ${n.message}`),H(8e3),{success:!1,error:n.message}}}chrome.runtime.onMessage.addListener((e,n,l)=>{if((e==null?void 0:e.action)==="UPLOAD_YOUTUBE")return r("ได้รับคำสั่ง UPLOAD_YOUTUBE"),l({success:!0,message:"⏳ เริ่มอัพโหลด YouTube Shorts..."}),V({title:e.title||"",description:e.description||"",madeForKids:e.madeForKids||!1,visibility:e.visibility||"public",scheduleEnabled:e.scheduleEnabled||!1,scheduleDate:e.scheduleDate||"",scheduleTime:e.scheduleTime||"",theme:e.theme||"green"}).then(d=>{r(`Upload result: ${d.success?"✅":"❌"} ${d.error||""}`)}),!1;if((e==null?void 0:e.action)==="PING")return l({success:!0,message:"YouTube Upload script ready"}),!1}),r("สคริปต์ YouTube Upload พร้อมแล้ว — รอคำสั่ง")}})();
