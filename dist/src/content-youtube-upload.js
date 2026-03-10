(function(){"use strict";if(window.__NETFLOW_YOUTUBE_UPLOAD_LOADED__)console.log("[NetFlow YouTube] Already loaded — skipping duplicate injection");else{window.__NETFLOW_YOUTUBE_UPLOAD_LOADED__=!0,console.log("[NetFlow YouTube] Content script loaded on:",window.location.href);const r=e=>new Promise(t=>setTimeout(t,e)),I=(e,t)=>Math.floor(Math.random()*(t-e+1))+e,a=e=>{console.log(`[NetFlow YouTube] ${e}`);try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:`[YT] ${e}`})}catch{}},w=e=>{console.warn(`[NetFlow YouTube] ⚠️ ${e}`);try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`[YT] ⚠️ ${e}`})}catch{}},m=async(e,t=2e4,c=500)=>{const d=Date.now();for(;Date.now()-d<t;){const u=typeof e=="string"?document.querySelector(e):e();if(u)return u;await r(c)}return null},A=(e,t)=>{const c=[];return c.push(...Array.from(e.querySelectorAll(t))),e.querySelectorAll("*").forEach(d=>{d.shadowRoot&&c.push(...A(d.shadowRoot,t))}),c},h=e=>{e.focus(),e.click(),e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0}))},g=(e,t="button, a, span, div, label, tp-yt-paper-item, ytcp-text, yt-formatted-string, tp-yt-paper-radio-button",c=!1)=>{const d=Array.from(document.querySelectorAll(t)),u=A(document,t),v=[...d,...u],p=new Set;for(const f of v){if(p.has(f))continue;p.add(f);const S=(f.textContent||"").replace(/\s+/g," ").trim(),E=(f.innerText||"").replace(/\s+/g," ").trim();for(const q of e){const B=c?S===q:S.includes(q),T=c?E===q:E.includes(q);if(B||T){const C=f.getBoundingClientRect();if(C.width>0&&C.height>0)return f}}}return null},M=async(e,t)=>{if(e.focus(),e.click(),await r(200),document.execCommand("selectAll"),await r(100),document.execCommand("delete"),await r(200),Math.random()<.5)document.execCommand("insertText",!1,t),a(`[Paste] "${t.substring(0,40)}..."`);else{for(const d of t)document.execCommand("insertText",!1,d),await r(I(30,120));a(`[Type] "${t.substring(0,40)}..."`)}await r(300)},_=async(e,t)=>{e.focus(),e.click(),await r(200),e.select(),await r(100),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await r(200);for(const c of t)e.value+=c,e.dispatchEvent(new Event("input",{bubbles:!0})),await r(I(50,150));e.dispatchEvent(new Event("change",{bubbles:!0})),await r(200)};let x=null,$=null,U=[],R=0,D=null;const F={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}},H=e=>{const t=e.rgb,c=e.accentRgb,d=e.doneRgb,u=e.hex,v=e.doneHex,p=u.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),f=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,S=p?parseInt(p[1],16)/f:0,E=p?parseInt(p[2],16)/f:1,q=p?parseInt(p[3],16)/f:.25,B=T=>`${Math.round(S*T)}, ${Math.round(E*T)}, ${Math.round(q*T)}`;return`
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700&display=swap');

#netflow-youtube-hud {
    position: fixed; top: 16px; right: 16px; z-index: 999999;
    min-width: 300px; max-width: 340px;
    background:
        radial-gradient(ellipse at 20% 10%, rgba(${t},0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 90%, rgba(${c},0.06) 0%, transparent 50%),
        linear-gradient(135deg, rgba(${B(8)},0.97) 0%, rgba(${B(2)},0.98) 100%);
    border: 1px solid rgba(${t},0.35);
    border-radius: 14px;
    padding: 0;
    color: #e0ffe8;
    box-shadow:
        0 0 20px rgba(${t},0.15),
        0 0 60px rgba(${t},0.06),
        0 8px 32px rgba(0,0,0,0.7),
        inset 0 1px 0 rgba(${t},0.1);
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
    background: linear-gradient(90deg, rgba(${t},0.08) 0%, transparent 70%);
    border-bottom: 1px solid rgba(${t},0.15);
    position: relative;
}
#netflow-youtube-hud .nfyt-header::after {
    content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1px;
    background: linear-gradient(90deg, rgba(${t},0.5), rgba(${c},0.3), transparent);
}
#netflow-youtube-hud .nfyt-title {
    font-family: 'Orbitron', monospace;
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
    color: ${u}; text-transform: uppercase;
    text-shadow: 0 0 8px rgba(${t},0.5);
    display: flex; align-items: center; gap: 7px;
}
#netflow-youtube-hud .nfyt-timer {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; color: rgba(${t},0.6);
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
    background: linear-gradient(90deg, transparent, rgba(${t},0.12), transparent);
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
    background: ${v}; border-color: ${v};
    box-shadow: 0 0 6px rgba(${d},0.6);
}
#netflow-youtube-hud .nfyt-step[data-status="active"] .nfyt-dot {
    background: ${u}; border-color: ${u};
    box-shadow: 0 0 8px rgba(${t},0.8);
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
#netflow-youtube-hud .nfyt-step[data-status="active"] .nfyt-label { color: ${u}; text-shadow: 0 0 6px rgba(${t},0.4); }
#netflow-youtube-hud .nfyt-step[data-status="error"] .nfyt-label { color: #ef4444; }

/* ── Footer ── */
#netflow-youtube-hud .nfyt-footer {
    padding: 6px 14px 8px;
    border-top: 1px solid rgba(${t},0.1);
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; color: rgba(${t},0.3);
    text-align: center; letter-spacing: 0.5px;
}
`},Y=e=>{if(x)return;const t=F[e||""]||F.green;$||($=document.createElement("style"),document.head.appendChild($)),$.textContent=H(t),R=Date.now(),x=document.createElement("div"),x.id="netflow-youtube-hud",x.innerHTML=`
        <div class="nfyt-header">
            <div class="nfyt-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                YOUTUBE UPLOAD
            </div>
            <div class="nfyt-timer" id="nfyt-timer">00:00</div>
        </div>
        <div class="nfyt-steps" id="netflow-yt-steps"></div>
        <div class="nfyt-footer">NETFLOW AI ENGINE • SHORTS AUTOMATION</div>
    `,document.body.appendChild(x),D=setInterval(()=>{const c=document.getElementById("nfyt-timer");if(!c)return;const d=Math.floor((Date.now()-R)/1e3),u=String(Math.floor(d/60)).padStart(2,"0"),v=String(d%60).padStart(2,"0");c.textContent=`${u}:${v}`},1e3)},b=(e,t)=>{e>=0&&e<U.length&&(U[e].status=t);const c=document.getElementById("netflow-yt-steps");c&&(c.innerHTML=U.map(d=>{const u=d.status||"pending";return`<div class="nfyt-step" data-status="${u}"><div class="nfyt-dot">${u==="done"?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':u==="error"?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>':""}</div><span class="nfyt-label">${d.label}</span></div>`}).join(""))},L=(e=5e3)=>{D&&(clearInterval(D),D=null),x&&(x.style.animation="nfyt-fade-out 0.4s ease-in forwards"),setTimeout(()=>{x==null||x.remove(),x=null,$==null||$.remove(),$=null},e)},N=()=>new Promise(e=>{chrome.runtime.sendMessage({type:"GET_CACHED_VIDEO"},t=>{var c;if(chrome.runtime.lastError||!(t!=null&&t.success)||!t.data){w("No cached video from background"),e(null);return}try{const[d,u]=t.data.split(","),v=((c=d.match(/:(.*?);/))==null?void 0:c[1])||"video/mp4",p=atob(u),f=new Uint8Array(p.length);for(let E=0;E<p.length;E++)f[E]=p.charCodeAt(E);const S=new File([f],"netflow-shorts.mp4",{type:v});a(`Video file created: ${(S.size/1024/1024).toFixed(1)} MB`),e(S)}catch(d){w(`Failed to create File: ${d.message}`),e(null)}})});async function K(e){a("=== เริ่ม YouTube Shorts Upload ==="),a(`Title: "${e.title}" | Visibility: ${e.visibility} | Kids: ${e.madeForKids} | Schedule: ${e.scheduleEnabled?`${e.scheduleDate} ${e.scheduleTime}`:"ไม่ตั้ง"}`),U=[{label:"เปิดหน้าอัพโหลด",status:"pending"},{label:"อัพโหลดวิดีโอ",status:"pending"},{label:"กรอกชื่อ + คำอธิบาย",status:"pending"},{label:"เลือกผู้ชม (เด็ก/ไม่เด็ก)",status:"pending"},{label:"ข้ามไปหน้าเผยแพร่",status:"pending"},{label:"เลือกการเผยแพร่ + โพสต์",status:"pending"}],Y(e.theme),b(-1,"");try{if(b(0,"active"),a("── ขั้น 1: เปิดหน้าอัพโหลด (เนื้อหา → Shorts → อัปโหลดวิดีโอ) ──"),!document.querySelector("ytcp-uploads-dialog")){const n=await m(()=>{const s=document.querySelector("#menu-item-1");if(s){const o=s.getBoundingClientRect();if(o.width>0&&o.height>0)return s}return g(["เนื้อหา","Content"],"a.menu-item-link, tp-yt-paper-icon-item, div.nav-item-text")},1e4);if(n){const s=n.closest("a.menu-item-link")||n;h(s),a('คลิก "เนื้อหา/Content" ใน sidebar'),await r(3e3)}else{const s=window.location.pathname.match(/\/channel\/([^/]+)/),o=s?s[1]:"";o&&(a('ไม่พบเมนู "เนื้อหา" — ใช้ URL ตรง'),window.location.href=`${window.location.origin}/channel/${o}/videos/shorts`,await r(4e3))}const i=await m(()=>{const s=document.querySelectorAll("tp-yt-paper-tab");for(const o of s)if((o.textContent||"").trim()==="Shorts"){const k=o.getBoundingClientRect();if(k.width>0&&k.height>0)return o}return g(["Shorts"],"tp-yt-paper-tab, div.tab-content")},8e3);if(i){const s=i.closest("tp-yt-paper-tab")||i;h(s),a('คลิก tab "Shorts"'),await r(2500)}else{w('ไม่พบ tab "Shorts" — ลอง URL ตรง');const s=window.location.pathname.match(/\/channel\/([^/]+)/),o=s?s[1]:"";o&&(window.location.href=`${window.location.origin}/channel/${o}/videos/shorts`,await r(3e3))}const l=await m(()=>{const s=document.querySelector('ytcp-button-shape button[aria-label="อัปโหลดวิดีโอ"]')||document.querySelector('ytcp-button-shape button[aria-label="Upload videos"]')||document.querySelector('ytcp-button-shape button[aria-label="Upload video"]');if(s){const o=s.getBoundingClientRect();if(o.width>0&&o.height>0)return s}return g(["อัปโหลดวิดีโอ","Upload videos","Upload video"],"button, ytcp-button-shape")},1e4);l?(h(l),a('คลิกปุ่ม "อัปโหลดวิดีโอ" บนหน้า Shorts'),await r(2500)):w('ไม่พบปุ่ม "อัปโหลดวิดีโอ" บนหน้า Shorts')}b(0,"done"),b(1,"active"),a("── ขั้น 2: อัพโหลดวิดีโอ ──");const c=await N();if(!c)return b(1,"error"),{success:!1,error:"ไม่พบไฟล์วิดีโอใน cache"};let d=!1;const u=await m(()=>{const n=document.querySelector("ytcp-uploads-file-picker");if(n){const i=n.querySelector('input[type="file"]')||n.querySelector('input[name="Filedata"]');if(i)return i}return document.querySelector('input[name="Filedata"]')||document.querySelector('ytcp-uploads-dialog input[type="file"]')},1e4);if(u){const n=u.getAttribute("style")||"";u.style.cssText="display:block !important; opacity:1; width:auto; height:auto; position:static; overflow:visible;",await r(200);const i=new DataTransfer;i.items.add(c),u.files=i.files,u.dispatchEvent(new Event("change",{bubbles:!0})),u.dispatchEvent(new Event("input",{bubbles:!0})),a(`ฉีดไฟล์ผ่าน file input (${c.name}, ${(c.size/1024/1024).toFixed(1)} MB)`),d=!0,await r(500),u.setAttribute("style",n)}if(!d){const n=document.querySelector("ytcp-uploads-file-picker #content")||document.querySelector("ytcp-uploads-file-picker");if(n){const i=new DataTransfer;i.items.add(c),n.dispatchEvent(new DragEvent("dragenter",{dataTransfer:i,bubbles:!0})),await r(100),n.dispatchEvent(new DragEvent("dragover",{dataTransfer:i,bubbles:!0})),await r(100),n.dispatchEvent(new DragEvent("drop",{dataTransfer:i,bubbles:!0})),a("ฉีดไฟล์ผ่าน drag-and-drop"),d=!0}}if(!d)return b(1,"error"),{success:!1,error:"ไม่พบ file input หรือ drop zone"};a("รอ YouTube ประมวลผลไฟล์..."),await r(5e3);const v=await m(()=>document.querySelector('#title-textarea #textbox[contenteditable="true"]')||document.querySelector('ytcp-social-suggestion-input #textbox[contenteditable="true"]')||document.querySelector('div[contenteditable="true"][aria-label*="ชื่อ"]')||document.querySelector('div[contenteditable="true"][aria-label*="title" i]'),3e4);if(!v)return b(1,"error"),{success:!1,error:"อัพโหลดไม่สำเร็จ — ไม่พบช่อง Title"};b(1,"done"),b(2,"active"),a("── ขั้น 3: กรอกชื่อ + คำอธิบาย ──");let p=e.title||"Netflow AI Video";await M(v,p),a(`กรอกชื่อ: "${p}"`),await r(1e3);const f=g(["เพิ่มทั้งหมด","Add all"],"button, ytcp-button-shape button, div.ytcpButtonShapeImpl__button-text-content");if(f){const n=f.closest("button")||f;h(n),a('คลิก "เพิ่มทั้งหมด" — เพิ่มแฮชแท็กที่แนะนำ'),await r(800)}else a('ไม่พบปุ่ม "เพิ่มทั้งหมด" สำหรับแฮชแท็ก — ข้าม');if(e.description){const n=await m(()=>document.querySelector('#description-textarea #textbox[contenteditable="true"]')||document.querySelector('div[contenteditable="true"][aria-label*="คำอธิบาย"]')||document.querySelector('div[contenteditable="true"][aria-label*="description" i]')||document.querySelector('div[contenteditable="true"][aria-label*="บอกข้อมูล"]'),8e3);n?(await M(n,e.description),a(`กรอกคำอธิบาย: "${e.description.substring(0,50)}..."`)):w("ไม่พบช่อง Description")}b(2,"done"),b(3,"active"),a('── ขั้น 4: เลือก "สร้างมาเพื่อเด็ก" ──'),await r(1e3);const S=document.querySelector("#scrollable-content")||document.querySelector("ytcp-uploads-dialog .scrollable");S&&(S.scrollTop=S.scrollHeight,await r(500));const E=e.madeForKids?["ใช่ วิดีโอนี้สร้างมาเพื่อเด็ก","Yes, it's made for kids"]:["ไม่ วิดีโอนี้ไม่ได้สร้างมาเพื่อเด็ก","No, it's not made for kids"],q=await m(()=>g(E,"tp-yt-paper-radio-button"),1e4);if(q)h(q),a(`เลือก: ${e.madeForKids?"สร้างมาเพื่อเด็ก":"ไม่ได้สร้างมาเพื่อเด็ก"}`);else{w("ไม่พบตัวเลือก Made for Kids — fallback");const n=document.querySelectorAll("tp-yt-paper-radio-button");n.length>=2&&h(e.madeForKids?n[0]:n[1])}b(3,"done"),await r(1e3),b(4,"active"),a('── ขั้น 5: กด "ถัดไป/Next" 3 ครั้ง ──');for(let n=0;n<3;n++){const i=await m(()=>{const l=document.querySelector("#next-button");if(l&&!l.hidden){const s=l.querySelector("ytcp-button-shape button")||l.querySelector("button");if(s&&!s.disabled)return s;if(!l.disabled)return l}return g(["ถัดไป","Next"],"button")},1e4);if(i)h(i),a(`กด "ถัดไป/Next" ครั้งที่ ${n+1}/3`),await r(2500);else{w(`ไม่พบปุ่ม "ถัดไป" ครั้งที่ ${n+1}`);const l=document.querySelector("#next-button");l&&(h(l),await r(2500))}}b(4,"done"),b(5,"active"),a("── ขั้น 6: เลือกการเผยแพร่ ──"),await r(1500);const T={public:"PUBLIC",unlisted:"UNLISTED",private:"PRIVATE"}[e.visibility]||"PUBLIC";let C=document.querySelector(`tp-yt-paper-radio-button[name="${T}"]`);if(!C){const n={public:["สาธารณะ","Public"],unlisted:["ไม่เป็นสาธารณะ","Unlisted"],private:["ส่วนตัว","Private"]};C=g(n[e.visibility]||n.public,"tp-yt-paper-radio-button")}if(C)h(C),a(`เลือกการเผยแพร่: ${e.visibility} (${T})`);else{w("ไม่พบตัวเลือกการเผยแพร่ — ลอง index");const n=document.querySelectorAll("#privacy-radios tp-yt-paper-radio-button"),i=e.visibility==="private"?0:e.visibility==="unlisted"?1:2;n[i]&&h(n[i])}await r(1500),a("รอการอัพโหลดเสร็จก่อนเผยแพร่...");const z=Date.now();for(;Date.now()-z<3e5;){const n=document.body.innerText;if(["การตรวจสอบเสร็จสมบูรณ์","ตรวจสอบเสร็จแล้ว","Checks complete","การประมวลผลเสร็จสมบูรณ์","Finished processing","Upload complete","ไม่พบปัญหา","No issues found","การอัปโหลดเสร็จสมบูรณ์","อัปโหลดเสร็จแล้ว"].some(s=>n.includes(s))){a("✅ อัพโหลด/ตรวจสอบเสร็จ");break}const l=document.querySelector("#done-button");if(l){const s=l.querySelector("button");if(s&&!s.disabled){a("✅ ปุ่มเผยแพร่/ตั้งเวลา พร้อมใช้งาน");break}}await r(3e3)}if(e.scheduleEnabled&&e.scheduleDate&&e.scheduleTime){a("── โหมดตั้งเวลา ──");const n=await m(()=>{const o=document.querySelector("#second-container-expand-button");if(o){const y=o.getBoundingClientRect();if(y.width>0&&y.height>0)return o}return g(["ตั้งเวลา","Schedule"],"ytcp-icon-button, .early-access-header")},5e3);n?(h(n),a('คลิกเปิด "ตั้งเวลา" chevron'),await r(2e3)):w("ไม่พบปุ่มเปิดตั้งเวลา");const i=await m(()=>{const o=document.querySelector("ytcp-datetime-picker");if(!o)return null;const y=o.querySelector("ytcp-text-dropdown-trigger")||o.querySelector("ytcp-dropdown-trigger");if(y){const k=y.getBoundingClientRect();if(k.width>0&&k.height>0)return y}return o.querySelector('div[role="button"].container')},5e3);if(i){h(i),a("คลิกเปิด date dropdown"),await r(1500);const o=await m(()=>document.querySelector("ytcp-date-picker tp-yt-iron-input input")||document.querySelector("ytcp-date-picker tp-yt-paper-input input[autofocus]")||document.querySelector("ytcp-date-picker tp-yt-paper-input input")||document.querySelector("ytcp-date-picker input.style-scope"),5e3);o?(o.focus(),await r(200),o.select(),await r(100),o.value="",o.dispatchEvent(new Event("input",{bubbles:!0})),o.dispatchEvent(new Event("change",{bubbles:!0})),await r(500),await m(()=>g(["วันที่ไม่ถูกต้อง","Invalid date"],"div, tp-yt-paper-input-error, #a11yWrapper"),3e3)&&a('พบ error "วันที่ไม่ถูกต้อง" — พร้อมใส่วันที่'),await _(o,e.scheduleDate),a(`ใส่วันที่: "${e.scheduleDate}"`),await r(500),o.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keypress",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),await r(1e3),a("กด Enter ยืนยันวันที่")):w("ไม่พบช่อง input วันที่")}else w("ไม่พบ date dropdown trigger");const l=await m(()=>{const o=document.querySelector("ytcp-datetime-picker");if(!o)return null;const y=o.querySelector("#time-of-day-container");return y?y.querySelector("tp-yt-iron-input input")||y.querySelector("tp-yt-paper-input input")||y.querySelector("input"):o.querySelector("tp-yt-paper-input#textbox input")||o.querySelector("#time-of-day-container input")},5e3);l?(l.focus(),l.click(),await r(800),l.select(),await r(200),l.value="",l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0})),await r(300),await _(l,e.scheduleTime),a(`ใส่เวลา: "${e.scheduleTime}"`),await r(500),l.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),l.dispatchEvent(new KeyboardEvent("keypress",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),l.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),await r(1e3),a("กด Enter ยืนยันเวลา")):w("ไม่พบช่อง input เวลา");const s=await m(()=>{const o=document.querySelector("#done-button");if(o){const y=o.querySelector('button[aria-label="ตั้งเวลา"]')||o.querySelector('button[aria-label="Schedule"]');if(y&&!y.disabled)return y;const k=o.querySelector("button:not([disabled])");if(k){const P=(k.textContent||"").trim();if(P.includes("ตั้งเวลา")||P.includes("Schedule"))return k}}return document.querySelector('button[aria-label="ตั้งเวลา"]:not([disabled])')||document.querySelector('button[aria-label="Schedule"]:not([disabled])')||g(["ตั้งเวลา","Schedule"],"button")},1e4);if(s)h(s),a('✅ คลิก "ตั้งเวลา/Schedule"'),b(5,"done");else return b(5,"error"),{success:!1,error:'ไม่พบปุ่ม "ตั้งเวลา/Schedule"'}}else{a("── โหมดเผยแพร่ทันที ──");const n=await m(()=>{const i=document.querySelector("#done-button");if(i){const l=i.querySelector('button[aria-label="เผยแพร่"]')||i.querySelector('button[aria-label="Publish"]')||i.querySelector('button[aria-label="บันทึก"]')||i.querySelector('button[aria-label="Save"]');if(l&&!l.disabled)return l;const s=i.querySelector("button:not([disabled])");if(s){const o=(s.textContent||"").trim();if(["เผยแพร่","Publish","บันทึก","Save"].some(y=>o.includes(y)))return s}}return document.querySelector('button[aria-label="เผยแพร่"]:not([disabled])')||document.querySelector('button[aria-label="Publish"]:not([disabled])')||g(["เผยแพร่","Publish","บันทึก","Save"],"button")},1e4);if(n)h(n),a('✅ คลิก "เผยแพร่/Publish"'),b(5,"done");else return b(5,"error"),{success:!1,error:"ไม่พบปุ่มเผยแพร่/บันทึก"}}await r(3e3);const O=await m(()=>{const n=document.querySelector("ytcp-video-share-dialog");if(n){const i=n.querySelector('#close-button button[aria-label="ปิด"]')||n.querySelector('#close-button button[aria-label="Close"]')||n.querySelector("#close-button button");if(i){const l=i.getBoundingClientRect();if(l.width>0&&l.height>0)return i}}return document.querySelector('tp-yt-paper-dialog button[aria-label="ปิด"]')||document.querySelector('tp-yt-paper-dialog button[aria-label="Close"]')||document.querySelector('ytcp-video-share-dialog button[aria-label="ปิด"]')||document.querySelector('ytcp-video-share-dialog button[aria-label="Close"]')},1e4);if(O)h(O),a("ปิด dialog สำเร็จ");else{const n=document.querySelector("ytcp-video-share-dialog #close-icon-button")||document.querySelector('ytcp-video-share-dialog ytcp-icon-button[icon="close"]')||document.querySelector('tp-yt-paper-dialog ytcp-icon-button[icon="close"]');if(n)h(n),a("ปิด dialog ผ่าน X button");else{const i=g(["ปิด","Close"],"tp-yt-paper-dialog button, ytcp-video-share-dialog button");i&&(h(i),a("ปิด dialog ผ่าน text match"))}}a("=== ✅ YouTube Shorts Upload เสร็จสมบูรณ์! ==="),L(5e3);try{chrome.runtime.sendMessage({type:"YOUTUBE_UPLOAD_COMPLETE",title:p,visibility:e.visibility,scheduled:e.scheduleEnabled||!1})}catch{}return{success:!0}}catch(t){return w(`Upload error: ${t.message}`),L(8e3),{success:!1,error:t.message}}}chrome.runtime.onMessage.addListener((e,t,c)=>{if((e==null?void 0:e.action)==="UPLOAD_YOUTUBE")return a("ได้รับคำสั่ง UPLOAD_YOUTUBE"),c({success:!0,message:"⏳ เริ่มอัพโหลด YouTube Shorts..."}),K({title:e.title||"",description:e.description||"",madeForKids:e.madeForKids||!1,visibility:e.visibility||"public",scheduleEnabled:e.scheduleEnabled||!1,scheduleDate:e.scheduleDate||"",scheduleTime:e.scheduleTime||"",theme:e.theme||"green"}).then(d=>{a(`Upload result: ${d.success?"✅":"❌"} ${d.error||""}`)}),!1;if((e==null?void 0:e.action)==="PING")return c({success:!0,message:"YouTube Upload script ready"}),!1}),a("สคริปต์ YouTube Upload พร้อมแล้ว — รอคำสั่ง")}})();
