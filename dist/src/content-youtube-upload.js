(function(){"use strict";if(window.__NETFLOW_YOUTUBE_UPLOAD_LOADED__)console.log("[NetFlow YouTube] Already loaded — skipping duplicate injection");else{window.__NETFLOW_YOUTUBE_UPLOAD_LOADED__=!0,console.log("[NetFlow YouTube] Content script loaded on:",window.location.href);const a=e=>new Promise(o=>setTimeout(o,e)),M=(e,o)=>Math.floor(Math.random()*(o-e+1))+e,r=e=>{console.log(`[NetFlow YouTube] ${e}`);try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:`[YT] ${e}`})}catch{}},w=e=>{console.warn(`[NetFlow YouTube] ⚠️ ${e}`);try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`[YT] ⚠️ ${e}`})}catch{}},h=async(e,o=2e4,c=500)=>{const u=Date.now();for(;Date.now()-u<o;){const d=typeof e=="string"?document.querySelector(e):e();if(d)return d;await a(c)}return null},R=(e,o)=>{const c=[];return c.push(...Array.from(e.querySelectorAll(o))),e.querySelectorAll("*").forEach(u=>{u.shadowRoot&&c.push(...R(u.shadowRoot,o))}),c},y=e=>{e.focus(),e.click(),e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0}))},g=(e,o="button, a, span, div, label, tp-yt-paper-item, ytcp-text, yt-formatted-string, tp-yt-paper-radio-button",c=!1)=>{const u=Array.from(document.querySelectorAll(o)),d=R(document,o),S=[...u,...d],b=new Set;for(const m of S){if(b.has(m))continue;b.add(m);const q=(m.textContent||"").replace(/\s+/g," ").trim(),v=(m.innerText||"").replace(/\s+/g," ").trim();for(const T of e){const $=c?q===T:q.includes(T),C=c?v===T:v.includes(T);if($||C){const U=m.getBoundingClientRect();if(U.width>0&&U.height>0)return m}}}return null},_=async(e,o)=>{if(e.focus(),e.click(),await a(200),document.execCommand("selectAll"),await a(100),document.execCommand("delete"),await a(200),Math.random()<.5)document.execCommand("insertText",!1,o),r(`[Paste] "${o.substring(0,40)}..."`);else{for(const u of o)document.execCommand("insertText",!1,u),await a(M(30,120));r(`[Type] "${o.substring(0,40)}..."`)}await a(300)},F=async(e,o)=>{e.focus(),e.click(),await a(200),e.select(),await a(100),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await a(200);for(const c of o)e.value+=c,e.dispatchEvent(new Event("input",{bubbles:!0})),await a(M(50,150));e.dispatchEvent(new Event("change",{bubbles:!0})),await a(200)};let E=null,k=null,D=[],L=0,I=null;const O={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}},N=e=>{const o=e.rgb,c=e.accentRgb,u=e.doneRgb,d=e.hex,S=e.doneHex,b=d.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),m=b?Math.max(parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16),1):255,q=b?parseInt(b[1],16)/m:0,v=b?parseInt(b[2],16)/m:1,T=b?parseInt(b[3],16)/m:.25,$=C=>`${Math.round(q*C)}, ${Math.round(v*C)}, ${Math.round(T*C)}`;return`
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700&display=swap');

#netflow-youtube-hud {
    position: fixed; top: 16px; right: 16px; z-index: 999999;
    min-width: 300px; max-width: 340px;
    background:
        radial-gradient(ellipse at 20% 10%, rgba(${o},0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 90%, rgba(${c},0.06) 0%, transparent 50%),
        linear-gradient(135deg, rgba(${$(8)},0.97) 0%, rgba(${$(2)},0.98) 100%);
    border: 1px solid rgba(${o},0.35);
    border-radius: 14px;
    padding: 0;
    color: #e0ffe8;
    box-shadow:
        0 0 20px rgba(${o},0.15),
        0 0 60px rgba(${o},0.06),
        0 8px 32px rgba(0,0,0,0.7),
        inset 0 1px 0 rgba(${o},0.1);
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
    background: linear-gradient(90deg, rgba(${o},0.08) 0%, transparent 70%);
    border-bottom: 1px solid rgba(${o},0.15);
    position: relative;
}
#netflow-youtube-hud .nfyt-header::after {
    content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1px;
    background: linear-gradient(90deg, rgba(${o},0.5), rgba(${c},0.3), transparent);
}
#netflow-youtube-hud .nfyt-title {
    font-family: 'Orbitron', monospace;
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
    color: ${d}; text-transform: uppercase;
    text-shadow: 0 0 8px rgba(${o},0.5);
    display: flex; align-items: center; gap: 7px;
}
#netflow-youtube-hud .nfyt-timer {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; color: rgba(${o},0.6);
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
    background: linear-gradient(90deg, transparent, rgba(${o},0.12), transparent);
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
    background: ${S}; border-color: ${S};
    box-shadow: 0 0 6px rgba(${u},0.6);
}
#netflow-youtube-hud .nfyt-step[data-status="active"] .nfyt-dot {
    background: ${d}; border-color: ${d};
    box-shadow: 0 0 8px rgba(${o},0.8);
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
#netflow-youtube-hud .nfyt-step[data-status="done"] .nfyt-label { color: rgba(${u},0.85); }
#netflow-youtube-hud .nfyt-step[data-status="active"] .nfyt-label { color: ${d}; text-shadow: 0 0 6px rgba(${o},0.4); }
#netflow-youtube-hud .nfyt-step[data-status="error"] .nfyt-label { color: #ef4444; }

/* ── Footer ── */
#netflow-youtube-hud .nfyt-footer {
    padding: 6px 14px 8px;
    border-top: 1px solid rgba(${o},0.1);
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; color: rgba(${o},0.3);
    text-align: center; letter-spacing: 0.5px;
}
`},K=e=>{if(E)return;const o=O[e||""]||O.green;k||(k=document.createElement("style"),document.head.appendChild(k)),k.textContent=N(o),L=Date.now(),E=document.createElement("div"),E.id="netflow-youtube-hud",E.innerHTML=`
        <div class="nfyt-header">
            <div class="nfyt-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                YOUTUBE UPLOAD
            </div>
            <div class="nfyt-timer" id="nfyt-timer">00:00</div>
        </div>
        <div class="nfyt-steps" id="netflow-yt-steps"></div>
        <div class="nfyt-footer">NETFLOW AI ENGINE • SHORTS AUTOMATION</div>
    `,document.body.appendChild(E),I=setInterval(()=>{const c=document.getElementById("nfyt-timer");if(!c)return;const u=Math.floor((Date.now()-L)/1e3),d=String(Math.floor(u/60)).padStart(2,"0"),S=String(u%60).padStart(2,"0");c.textContent=`${d}:${S}`},1e3)},f=(e,o)=>{e>=0&&e<D.length&&(D[e].status=o);const c=document.getElementById("netflow-yt-steps");c&&(c.innerHTML=D.map(u=>{const d=u.status||"pending";return`<div class="nfyt-step" data-status="${d}"><div class="nfyt-dot">${d==="done"?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':d==="error"?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>':""}</div><span class="nfyt-label">${u.label}</span></div>`}).join(""))},P=(e=5e3)=>{I&&(clearInterval(I),I=null),E&&(E.style.animation="nfyt-fade-out 0.4s ease-in forwards"),setTimeout(()=>{E==null||E.remove(),E=null,k==null||k.remove(),k=null},e)},z=()=>new Promise(e=>{chrome.runtime.sendMessage({type:"GET_CACHED_VIDEO"},o=>{var c;if(chrome.runtime.lastError||!(o!=null&&o.success)||!o.data){w("No cached video from background"),e(null);return}try{const[u,d]=o.data.split(","),S=((c=u.match(/:(.*?);/))==null?void 0:c[1])||"video/mp4",b=atob(d),m=new Uint8Array(b.length);for(let v=0;v<b.length;v++)m[v]=b.charCodeAt(v);const q=new File([m],"netflow-shorts.mp4",{type:S});r(`Video file created: ${(q.size/1024/1024).toFixed(1)} MB`),e(q)}catch(u){w(`Failed to create File: ${u.message}`),e(null)}})});async function j(e){r("=== เริ่ม YouTube Shorts Upload ==="),r(`Title: "${e.title}" | Visibility: ${e.visibility} | Kids: ${e.madeForKids} | Schedule: ${e.scheduleEnabled?`${e.scheduleDate} ${e.scheduleTime}`:"ไม่ตั้ง"}`),D=[{label:"เปิดหน้าอัพโหลด",status:"pending"},{label:"อัพโหลดวิดีโอ",status:"pending"},{label:"กรอกชื่อ + คำอธิบาย",status:"pending"},{label:"เลือกผู้ชม (เด็ก/ไม่เด็ก)",status:"pending"},{label:"ข้ามไปหน้าเผยแพร่",status:"pending"},{label:"เลือกการเผยแพร่ + โพสต์",status:"pending"}],K(e.theme),f(-1,"");try{if(f(0,"active"),r("── ขั้น 1: เปิดหน้าอัพโหลด (เนื้อหา → Shorts → อัปโหลดวิดีโอ) ──"),!document.querySelector("ytcp-uploads-dialog")){const t=await h(()=>{const s=document.querySelector("#menu-item-1");if(s){const n=s.getBoundingClientRect();if(n.width>0&&n.height>0)return s}return g(["เนื้อหา","Content"],"a.menu-item-link, tp-yt-paper-icon-item, div.nav-item-text")},1e4);if(t){const s=t.closest("a.menu-item-link")||t;y(s),r('คลิก "เนื้อหา/Content" ใน sidebar'),await a(3e3)}else{const s=window.location.pathname.match(/\/channel\/([^/]+)/),n=s?s[1]:"";n&&(r('ไม่พบเมนู "เนื้อหา" — ใช้ URL ตรง'),window.location.href=`${window.location.origin}/channel/${n}/videos/shorts`,await a(4e3))}const i=await h(()=>{const s=document.querySelectorAll("tp-yt-paper-tab");for(const n of s)if((n.textContent||"").trim()==="Shorts"){const x=n.getBoundingClientRect();if(x.width>0&&x.height>0)return n}return g(["Shorts"],"tp-yt-paper-tab, div.tab-content")},8e3);if(i){const s=i.closest("tp-yt-paper-tab")||i;y(s),r('คลิก tab "Shorts"'),await a(2500)}else{w('ไม่พบ tab "Shorts" — ลอง URL ตรง');const s=window.location.pathname.match(/\/channel\/([^/]+)/),n=s?s[1]:"";n&&(window.location.href=`${window.location.origin}/channel/${n}/videos/shorts`,await a(3e3))}const l=await h(()=>{const s=document.querySelector('ytcp-button-shape button[aria-label="อัปโหลดวิดีโอ"]')||document.querySelector('ytcp-button-shape button[aria-label="Upload videos"]')||document.querySelector('ytcp-button-shape button[aria-label="Upload video"]');if(s){const n=s.getBoundingClientRect();if(n.width>0&&n.height>0)return s}return g(["อัปโหลดวิดีโอ","Upload videos","Upload video"],"button, ytcp-button-shape")},1e4);if(l)y(l),r('คลิกปุ่ม "อัปโหลดวิดีโอ" บนหน้า Shorts'),await a(2500);else{r('ไม่พบปุ่มอัปโหลดบน Shorts page — ใช้ fallback: ปุ่ม "สร้าง/Create"');const s=await h(()=>{const n=document.querySelector('ytcp-button-shape button[aria-label="สร้าง"]')||document.querySelector('ytcp-button-shape button[aria-label="Create"]');if(n){const p=n.getBoundingClientRect();if(p.width>0&&p.height>0)return n}return g(["สร้าง","Create"],"ytcp-button-shape button, button")},1e4);if(s){y(s),r('คลิกปุ่ม "สร้าง/Create" ที่มุมขวาบน'),await a(2e3);const n=await h(()=>{const p=document.querySelectorAll("ytcp-text-menu yt-formatted-string.item-text");for(const x of p){const B=(x.textContent||"").trim();if(B==="อัปโหลดวิดีโอ"||B==="Upload videos"||B==="Upload video"){const Y=x.getBoundingClientRect();if(Y.width>0&&Y.height>0)return x}}return g(["อัปโหลดวิดีโอ","Upload videos","Upload video"],"tp-yt-paper-item, ytcp-text-menu div, yt-formatted-string")},8e3);if(n){const p=n.closest("tp-yt-paper-item")||n;y(p),r('คลิก "อัปโหลดวิดีโอ/Upload videos" จาก dropdown'),await a(2500)}else w('ไม่พบ "อัปโหลดวิดีโอ" ใน dropdown — อาจต้อง verify channel')}else w('ไม่พบปุ่ม "สร้าง/Create" — ตรวจสอบหน้า YouTube Studio')}}f(0,"done"),await a(3e3),f(1,"active"),r("── ขั้น 2: อัพโหลดวิดีโอ ──");const c=await z();if(!c)return f(1,"error"),{success:!1,error:"ไม่พบไฟล์วิดีโอใน cache"};let u=!1;const d=await h(()=>{const t=document.querySelector("ytcp-uploads-file-picker");if(t){const i=t.querySelector('input[type="file"]')||t.querySelector('input[name="Filedata"]');if(i)return i}return document.querySelector('input[name="Filedata"]')||document.querySelector('ytcp-uploads-dialog input[type="file"]')},1e4);if(d){const t=d.getAttribute("style")||"";d.style.cssText="display:block !important; opacity:1; width:auto; height:auto; position:static; overflow:visible;",await a(200);const i=new DataTransfer;i.items.add(c),d.files=i.files,d.dispatchEvent(new Event("change",{bubbles:!0})),d.dispatchEvent(new Event("input",{bubbles:!0})),r(`ฉีดไฟล์ผ่าน file input (${c.name}, ${(c.size/1024/1024).toFixed(1)} MB)`),u=!0,await a(500),d.setAttribute("style",t)}if(!u){const t=document.querySelector("ytcp-uploads-file-picker #content")||document.querySelector("ytcp-uploads-file-picker");if(t){const i=new DataTransfer;i.items.add(c),t.dispatchEvent(new DragEvent("dragenter",{dataTransfer:i,bubbles:!0})),await a(100),t.dispatchEvent(new DragEvent("dragover",{dataTransfer:i,bubbles:!0})),await a(100),t.dispatchEvent(new DragEvent("drop",{dataTransfer:i,bubbles:!0})),r("ฉีดไฟล์ผ่าน drag-and-drop"),u=!0}}if(!u)return f(1,"error"),{success:!1,error:"ไม่พบ file input หรือ drop zone"};r("รอ YouTube ประมวลผลไฟล์..."),await a(5e3);const S=await h(()=>document.querySelector('#title-textarea #textbox[contenteditable="true"]')||document.querySelector('ytcp-social-suggestion-input #textbox[contenteditable="true"]')||document.querySelector('div[contenteditable="true"][aria-label*="ชื่อ"]')||document.querySelector('div[contenteditable="true"][aria-label*="title" i]'),3e4);if(!S)return f(1,"error"),{success:!1,error:"อัพโหลดไม่สำเร็จ — ไม่พบช่อง Title"};f(1,"done"),await a(3e3),f(2,"active"),r("── ขั้น 3: กรอกชื่อ + คำอธิบาย ──");let b=e.title||"Netflow AI Video";await _(S,b),r(`กรอกชื่อ: "${b}"`),await a(1e3);const m=g(["เพิ่มทั้งหมด","Add all"],"button, ytcp-button-shape button, div.ytcpButtonShapeImpl__button-text-content");if(m){const t=m.closest("button")||m;y(t),r('คลิก "เพิ่มทั้งหมด" — เพิ่มแฮชแท็กที่แนะนำ'),await a(800)}else r('ไม่พบปุ่ม "เพิ่มทั้งหมด" สำหรับแฮชแท็ก — ข้าม');const q=t=>t?/#shorts\b/i.test(t)?t:t.trimEnd()+" #Shorts":"#Shorts";if(e.description=q(e.description||""),e.description){const t=await h(()=>document.querySelector('#description-textarea #textbox[contenteditable="true"]')||document.querySelector('div[contenteditable="true"][aria-label*="คำอธิบาย"]')||document.querySelector('div[contenteditable="true"][aria-label*="description" i]')||document.querySelector('div[contenteditable="true"][aria-label*="บอกข้อมูล"]'),8e3);t?(await _(t,e.description),r(`กรอกคำอธิบาย: "${e.description.substring(0,50)}..."`)):w("ไม่พบช่อง Description")}f(2,"done"),await a(3e3),f(3,"active"),r('── ขั้น 4: เลือก "สร้างมาเพื่อเด็ก" ──'),await a(1e3);const v=document.querySelector("#scrollable-content")||document.querySelector("ytcp-uploads-dialog .scrollable");v&&(v.scrollTop=v.scrollHeight,await a(500));const T=e.madeForKids?["ใช่ วิดีโอนี้สร้างมาเพื่อเด็ก","Yes, it's made for kids"]:["ไม่ วิดีโอนี้ไม่ได้สร้างมาเพื่อเด็ก","No, it's not made for kids"],$=await h(()=>g(T,"tp-yt-paper-radio-button"),1e4);if($)y($),r(`เลือก: ${e.madeForKids?"สร้างมาเพื่อเด็ก":"ไม่ได้สร้างมาเพื่อเด็ก"}`);else{w("ไม่พบตัวเลือก Made for Kids — fallback");const t=document.querySelectorAll("tp-yt-paper-radio-button");t.length>=2&&y(e.madeForKids?t[0]:t[1])}f(3,"done"),await a(3e3),f(4,"active"),r('── ขั้น 5: กด "ถัดไป/Next" 3 ครั้ง ──');for(let t=0;t<3;t++){const i=await h(()=>{const l=document.querySelector("#next-button");if(l&&!l.hidden){const s=l.querySelector("ytcp-button-shape button")||l.querySelector("button");if(s&&!s.disabled)return s;if(!l.disabled)return l}return g(["ถัดไป","Next"],"button")},1e4);if(i)y(i),r(`กด "ถัดไป/Next" ครั้งที่ ${t+1}/3`),await a(2500);else{w(`ไม่พบปุ่ม "ถัดไป" ครั้งที่ ${t+1}`);const l=document.querySelector("#next-button");l&&(y(l),await a(2500))}}f(4,"done"),await a(3e3),f(5,"active"),r("── ขั้น 6: เลือกการเผยแพร่ ──"),await a(1500);const U={public:"PUBLIC",unlisted:"UNLISTED",private:"PRIVATE"}[e.visibility]||"PUBLIC";let A=document.querySelector(`tp-yt-paper-radio-button[name="${U}"]`);if(!A){const t={public:["สาธารณะ","Public"],unlisted:["ไม่เป็นสาธารณะ","Unlisted"],private:["ส่วนตัว","Private"]};A=g(t[e.visibility]||t.public,"tp-yt-paper-radio-button")}if(A)y(A),r(`เลือกการเผยแพร่: ${e.visibility} (${U})`);else{w("ไม่พบตัวเลือกการเผยแพร่ — ลอง index");const t=document.querySelectorAll("#privacy-radios tp-yt-paper-radio-button"),i=e.visibility==="private"?0:e.visibility==="unlisted"?1:2;t[i]&&y(t[i])}await a(1500),r("รอการอัพโหลดเสร็จก่อนเผยแพร่...");const V=Date.now();for(;Date.now()-V<3e5;){const t=document.body.innerText;if(["การตรวจสอบเสร็จสมบูรณ์","ตรวจสอบเสร็จแล้ว","Checks complete","การประมวลผลเสร็จสมบูรณ์","Finished processing","Upload complete","ไม่พบปัญหา","No issues found","การอัปโหลดเสร็จสมบูรณ์","อัปโหลดเสร็จแล้ว"].some(s=>t.includes(s))){r("✅ อัพโหลด/ตรวจสอบเสร็จ");break}const l=document.querySelector("#done-button");if(l){const s=l.querySelector("button");if(s&&!s.disabled){r("✅ ปุ่มเผยแพร่/ตั้งเวลา พร้อมใช้งาน");break}}await a(3e3)}if(e.scheduleEnabled&&e.scheduleDate&&e.scheduleTime){r("── โหมดตั้งเวลา ──");const t=await h(()=>{const n=document.querySelector("#second-container-expand-button");if(n){const p=n.getBoundingClientRect();if(p.width>0&&p.height>0)return n}return g(["ตั้งเวลา","Schedule"],"ytcp-icon-button, .early-access-header")},5e3);t?(y(t),r('คลิกเปิด "ตั้งเวลา" chevron'),await a(2e3)):w("ไม่พบปุ่มเปิดตั้งเวลา");const i=await h(()=>{const n=document.querySelector("ytcp-datetime-picker");if(!n)return null;const p=n.querySelector("ytcp-text-dropdown-trigger")||n.querySelector("ytcp-dropdown-trigger");if(p){const x=p.getBoundingClientRect();if(x.width>0&&x.height>0)return p}return n.querySelector('div[role="button"].container')},5e3);if(i){y(i),r("คลิกเปิด date dropdown"),await a(1500);const n=await h(()=>document.querySelector("ytcp-date-picker tp-yt-iron-input input")||document.querySelector("ytcp-date-picker tp-yt-paper-input input[autofocus]")||document.querySelector("ytcp-date-picker tp-yt-paper-input input")||document.querySelector("ytcp-date-picker input.style-scope"),5e3);n?(n.focus(),await a(200),n.select(),await a(100),n.value="",n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0})),await a(500),await h(()=>g(["วันที่ไม่ถูกต้อง","Invalid date"],"div, tp-yt-paper-input-error, #a11yWrapper"),3e3)&&r('พบ error "วันที่ไม่ถูกต้อง" — พร้อมใส่วันที่'),await F(n,e.scheduleDate),r(`ใส่วันที่: "${e.scheduleDate}"`),await a(500),n.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),n.dispatchEvent(new KeyboardEvent("keypress",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),n.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),await a(1e3),r("กด Enter ยืนยันวันที่")):w("ไม่พบช่อง input วันที่")}else w("ไม่พบ date dropdown trigger");const l=await h(()=>{const n=document.querySelector("ytcp-datetime-picker");if(!n)return null;const p=n.querySelector("#time-of-day-container");return p?p.querySelector("tp-yt-iron-input input")||p.querySelector("tp-yt-paper-input input")||p.querySelector("input"):n.querySelector("tp-yt-paper-input#textbox input")||n.querySelector("#time-of-day-container input")},5e3);l?(l.focus(),l.click(),await a(800),l.select(),await a(200),l.value="",l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0})),await a(300),await F(l,e.scheduleTime),r(`ใส่เวลา: "${e.scheduleTime}"`),await a(500),l.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),l.dispatchEvent(new KeyboardEvent("keypress",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),l.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),await a(1e3),r("กด Enter ยืนยันเวลา")):w("ไม่พบช่อง input เวลา");const s=await h(()=>{const n=document.querySelector("#done-button");if(n){const p=n.querySelector('button[aria-label="ตั้งเวลา"]')||n.querySelector('button[aria-label="Schedule"]');if(p&&!p.disabled)return p;const x=n.querySelector("button:not([disabled])");if(x){const B=(x.textContent||"").trim();if(B.includes("ตั้งเวลา")||B.includes("Schedule"))return x}}return document.querySelector('button[aria-label="ตั้งเวลา"]:not([disabled])')||document.querySelector('button[aria-label="Schedule"]:not([disabled])')||g(["ตั้งเวลา","Schedule"],"button")},1e4);if(s)y(s),r('✅ คลิก "ตั้งเวลา/Schedule"'),f(5,"done");else return f(5,"error"),{success:!1,error:'ไม่พบปุ่ม "ตั้งเวลา/Schedule"'}}else{r("── โหมดเผยแพร่ทันที ──");const t=await h(()=>{const i=document.querySelector("#done-button");if(i){const l=i.querySelector('button[aria-label="เผยแพร่"]')||i.querySelector('button[aria-label="Publish"]')||i.querySelector('button[aria-label="บันทึก"]')||i.querySelector('button[aria-label="Save"]');if(l&&!l.disabled)return l;const s=i.querySelector("button:not([disabled])");if(s){const n=(s.textContent||"").trim();if(["เผยแพร่","Publish","บันทึก","Save"].some(p=>n.includes(p)))return s}}return document.querySelector('button[aria-label="เผยแพร่"]:not([disabled])')||document.querySelector('button[aria-label="Publish"]:not([disabled])')||g(["เผยแพร่","Publish","บันทึก","Save"],"button")},1e4);if(t)y(t),r('✅ คลิก "เผยแพร่/Publish"'),f(5,"done");else return f(5,"error"),{success:!1,error:"ไม่พบปุ่มเผยแพร่/บันทึก"}}await a(3e3);const H=await h(()=>{const t=document.querySelector("ytcp-video-share-dialog");if(t){const i=t.querySelector('#close-button button[aria-label="ปิด"]')||t.querySelector('#close-button button[aria-label="Close"]')||t.querySelector("#close-button button");if(i){const l=i.getBoundingClientRect();if(l.width>0&&l.height>0)return i}}return document.querySelector('tp-yt-paper-dialog button[aria-label="ปิด"]')||document.querySelector('tp-yt-paper-dialog button[aria-label="Close"]')||document.querySelector('ytcp-video-share-dialog button[aria-label="ปิด"]')||document.querySelector('ytcp-video-share-dialog button[aria-label="Close"]')},1e4);if(H)y(H),r("ปิด dialog สำเร็จ");else{const t=document.querySelector("ytcp-video-share-dialog #close-icon-button")||document.querySelector('ytcp-video-share-dialog ytcp-icon-button[icon="close"]')||document.querySelector('tp-yt-paper-dialog ytcp-icon-button[icon="close"]');if(t)y(t),r("ปิด dialog ผ่าน X button");else{const i=g(["ปิด","Close"],"tp-yt-paper-dialog button, ytcp-video-share-dialog button");i&&(y(i),r("ปิด dialog ผ่าน text match"))}}r("=== ✅ YouTube Shorts Upload เสร็จสมบูรณ์! ==="),P(5e3);try{chrome.runtime.sendMessage({type:"YOUTUBE_UPLOAD_COMPLETE",title:b,visibility:e.visibility,scheduled:e.scheduleEnabled||!1})}catch{}return{success:!0}}catch(o){return w(`Upload error: ${o.message}`),P(8e3),{success:!1,error:o.message}}}chrome.runtime.onMessage.addListener((e,o,c)=>{if((e==null?void 0:e.action)==="UPLOAD_YOUTUBE")return r("ได้รับคำสั่ง UPLOAD_YOUTUBE"),c({success:!0,message:"⏳ เริ่มอัพโหลด YouTube Shorts..."}),j({title:e.title||"",description:e.description||"",madeForKids:e.madeForKids||!1,visibility:e.visibility||"public",scheduleEnabled:e.scheduleEnabled||!1,scheduleDate:e.scheduleDate||"",scheduleTime:e.scheduleTime||"",theme:e.theme||"green"}).then(u=>{r(`Upload result: ${u.success?"✅":"❌"} ${u.error||""}`)}),!1;if((e==null?void 0:e.action)==="PING")return c({success:!0,message:"YouTube Upload script ready"}),!1}),r("สคริปต์ YouTube Upload พร้อมแล้ว — รอคำสั่ง")}})();
