(function(){"use strict";if(window.__NETFLOW_YOUTUBE_UPLOAD_LOADED__)console.log("[NetFlow YouTube] Already loaded — skipping duplicate injection");else{window.__NETFLOW_YOUTUBE_UPLOAD_LOADED__=!0,console.log("[NetFlow YouTube] Content script loaded on:",window.location.href);const a=e=>new Promise(i=>setTimeout(i,e)),D=(e,i)=>Math.floor(Math.random()*(i-e+1))+e,o=e=>{console.log(`[NetFlow YouTube] ${e}`);try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:`[YT] ${e}`})}catch{}},m=e=>{console.warn(`[NetFlow YouTube] ⚠️ ${e}`);try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`[YT] ⚠️ ${e}`})}catch{}},f=async(e,i=2e4,c=500)=>{const u=Date.now();for(;Date.now()-u<i;){const b=typeof e=="string"?document.querySelector(e):e();if(b)return b;await a(c)}return null},A=(e,i)=>{const c=[];return c.push(...Array.from(e.querySelectorAll(i))),e.querySelectorAll("*").forEach(u=>{u.shadowRoot&&c.push(...A(u.shadowRoot,i))}),c},y=e=>{e.focus(),e.click(),e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0}))},w=(e,i="button, a, span, div, label, tp-yt-paper-item, ytcp-text, yt-formatted-string, tp-yt-paper-radio-button",c=!1)=>{const u=Array.from(document.querySelectorAll(i)),b=A(document,i),k=[...u,...b],v=new Set;for(const h of k){if(v.has(h))continue;v.add(h);const x=(h.textContent||"").replace(/\s+/g," ").trim(),S=(h.innerText||"").replace(/\s+/g," ").trim();for(const T of e){const L=c?x===T:x.includes(T),$=c?S===T:S.includes(T);if(L||$){const C=h.getBoundingClientRect();if(C.width>0&&C.height>0)return h}}}return null},I=async(e,i)=>{if(e.focus(),e.click(),await a(200),document.execCommand("selectAll"),await a(100),document.execCommand("delete"),await a(200),Math.random()<.5)document.execCommand("insertText",!1,i),o(`[Paste] "${i.substring(0,40)}..."`);else{for(const u of i)document.execCommand("insertText",!1,u),await a(D(30,120));o(`[Type] "${i.substring(0,40)}..."`)}await a(300)},_=async(e,i)=>{e.focus(),e.click(),await a(200),e.select(),await a(100),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await a(200);for(const c of i)e.value+=c,e.dispatchEvent(new Event("input",{bubbles:!0})),await a(D(50,150));e.dispatchEvent(new Event("change",{bubbles:!0})),await a(200)};let g=null,q=null,B=[],F=0,U=null;const Y=`
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700&display=swap');

#netflow-youtube-hud {
    position: fixed; top: 16px; right: 16px; z-index: 999999;
    min-width: 300px; max-width: 340px;
    background:
        radial-gradient(ellipse at 20% 10%, rgba(0,255,65,0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 90%, rgba(0,255,180,0.06) 0%, transparent 50%),
        linear-gradient(135deg, rgba(0,8,2,0.97) 0%, rgba(0,3,0,0.98) 100%);
    border: 1px solid rgba(0,255,65,0.35);
    border-radius: 14px;
    padding: 0;
    color: #e0ffe8;
    box-shadow:
        0 0 20px rgba(0,255,65,0.15),
        0 0 60px rgba(0,255,65,0.06),
        0 8px 32px rgba(0,0,0,0.7),
        inset 0 1px 0 rgba(0,255,65,0.1);
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
    background: linear-gradient(90deg, rgba(0,255,65,0.08) 0%, transparent 70%);
    border-bottom: 1px solid rgba(0,255,65,0.15);
    position: relative;
}
#netflow-youtube-hud .nfyt-header::after {
    content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1px;
    background: linear-gradient(90deg, rgba(0,255,65,0.5), rgba(0,255,180,0.3), transparent);
}
#netflow-youtube-hud .nfyt-title {
    font-family: 'Orbitron', monospace;
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
    color: #00ff41; text-transform: uppercase;
    text-shadow: 0 0 8px rgba(0,255,65,0.5);
    display: flex; align-items: center; gap: 7px;
}
#netflow-youtube-hud .nfyt-timer {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; color: rgba(0,255,65,0.6);
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
    background: linear-gradient(90deg, transparent, rgba(0,255,65,0.12), transparent);
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
}
#netflow-youtube-hud .nfyt-step[data-status="done"] .nfyt-dot {
    background: #22c55e; border-color: #22c55e;
    box-shadow: 0 0 6px rgba(34,197,94,0.6);
}
#netflow-youtube-hud .nfyt-step[data-status="active"] .nfyt-dot {
    background: #00ff41; border-color: #00ff41;
    box-shadow: 0 0 8px rgba(0,255,65,0.8);
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
#netflow-youtube-hud .nfyt-step[data-status="done"] .nfyt-label { color: rgba(34,197,94,0.85); }
#netflow-youtube-hud .nfyt-step[data-status="active"] .nfyt-label { color: #00ff41; text-shadow: 0 0 6px rgba(0,255,65,0.4); }
#netflow-youtube-hud .nfyt-step[data-status="error"] .nfyt-label { color: #ef4444; }

/* ── Footer ── */
#netflow-youtube-hud .nfyt-footer {
    padding: 6px 14px 8px;
    border-top: 1px solid rgba(0,255,65,0.1);
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; color: rgba(0,255,65,0.3);
    text-align: center; letter-spacing: 0.5px;
}
`,N=()=>{g||(q||(q=document.createElement("style"),q.textContent=Y,document.head.appendChild(q)),F=Date.now(),g=document.createElement("div"),g.id="netflow-youtube-hud",g.innerHTML=`
        <div class="nfyt-header">
            <div class="nfyt-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                YOUTUBE UPLOAD
            </div>
            <div class="nfyt-timer" id="nfyt-timer">00:00</div>
        </div>
        <div class="nfyt-steps" id="netflow-yt-steps"></div>
        <div class="nfyt-footer">NETFLOW AI ENGINE • SHORTS AUTOMATION</div>
    `,document.body.appendChild(g),U=setInterval(()=>{const e=document.getElementById("nfyt-timer");if(!e)return;const i=Math.floor((Date.now()-F)/1e3),c=String(Math.floor(i/60)).padStart(2,"0"),u=String(i%60).padStart(2,"0");e.textContent=`${c}:${u}`},1e3))},d=(e,i)=>{e>=0&&e<B.length&&(B[e].status=i);const c=document.getElementById("netflow-yt-steps");c&&(c.innerHTML=B.map(u=>{const b=u.status||"pending";return`<div class="nfyt-step" data-status="${b}"><div class="nfyt-dot">${b==="done"?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':b==="error"?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>':""}</div><span class="nfyt-label">${u.label}</span></div>`}).join(""))},M=(e=5e3)=>{U&&(clearInterval(U),U=null),g&&(g.style.animation="nfyt-fade-out 0.4s ease-in forwards"),setTimeout(()=>{g==null||g.remove(),g=null,q==null||q.remove(),q=null},e)},K=()=>new Promise(e=>{chrome.runtime.sendMessage({type:"GET_CACHED_VIDEO"},i=>{var c;if(chrome.runtime.lastError||!(i!=null&&i.success)||!i.data){m("No cached video from background"),e(null);return}try{const[u,b]=i.data.split(","),k=((c=u.match(/:(.*?);/))==null?void 0:c[1])||"video/mp4",v=atob(b),h=new Uint8Array(v.length);for(let S=0;S<v.length;S++)h[S]=v.charCodeAt(S);const x=new File([h],"netflow-shorts.mp4",{type:k});o(`Video file created: ${(x.size/1024/1024).toFixed(1)} MB`),e(x)}catch(u){m(`Failed to create File: ${u.message}`),e(null)}})});async function R(e){o("=== เริ่ม YouTube Shorts Upload ==="),o(`Title: "${e.title}" | Visibility: ${e.visibility} | Kids: ${e.madeForKids} | Schedule: ${e.scheduleEnabled?`${e.scheduleDate} ${e.scheduleTime}`:"ไม่ตั้ง"}`),B=[{label:"เปิดหน้าอัพโหลด",status:"pending"},{label:"อัพโหลดวิดีโอ",status:"pending"},{label:"กรอกชื่อ + คำอธิบาย",status:"pending"},{label:"เลือกผู้ชม (เด็ก/ไม่เด็ก)",status:"pending"},{label:"ข้ามไปหน้าเผยแพร่",status:"pending"},{label:"เลือกการเผยแพร่ + โพสต์",status:"pending"}],N(),d(-1,"");try{if(d(0,"active"),o("── ขั้น 1: เปิดหน้าอัพโหลด (เนื้อหา → Shorts → อัปโหลดวิดีโอ) ──"),!document.querySelector("ytcp-uploads-dialog")){const t=await f(()=>{const l=document.querySelector("#menu-item-1");if(l){const n=l.getBoundingClientRect();if(n.width>0&&n.height>0)return l}return w(["เนื้อหา","Content"],"a.menu-item-link, tp-yt-paper-icon-item, div.nav-item-text")},1e4);if(t){const l=t.closest("a.menu-item-link")||t;y(l),o('คลิก "เนื้อหา/Content" ใน sidebar'),await a(3e3)}else{const l=window.location.pathname.match(/\/channel\/([^/]+)/),n=l?l[1]:"";n&&(o('ไม่พบเมนู "เนื้อหา" — ใช้ URL ตรง'),window.location.href=`${window.location.origin}/channel/${n}/videos/shorts`,await a(4e3))}const r=await f(()=>{const l=document.querySelectorAll("tp-yt-paper-tab");for(const n of l)if((n.textContent||"").trim()==="Shorts"){const E=n.getBoundingClientRect();if(E.width>0&&E.height>0)return n}return w(["Shorts"],"tp-yt-paper-tab, div.tab-content")},8e3);if(r){const l=r.closest("tp-yt-paper-tab")||r;y(l),o('คลิก tab "Shorts"'),await a(2500)}else{m('ไม่พบ tab "Shorts" — ลอง URL ตรง');const l=window.location.pathname.match(/\/channel\/([^/]+)/),n=l?l[1]:"";n&&(window.location.href=`${window.location.origin}/channel/${n}/videos/shorts`,await a(3e3))}const s=await f(()=>{const l=document.querySelector('ytcp-button-shape button[aria-label="อัปโหลดวิดีโอ"]')||document.querySelector('ytcp-button-shape button[aria-label="Upload videos"]')||document.querySelector('ytcp-button-shape button[aria-label="Upload video"]');if(l){const n=l.getBoundingClientRect();if(n.width>0&&n.height>0)return l}return w(["อัปโหลดวิดีโอ","Upload videos","Upload video"],"button, ytcp-button-shape")},1e4);s?(y(s),o('คลิกปุ่ม "อัปโหลดวิดีโอ" บนหน้า Shorts'),await a(2500)):m('ไม่พบปุ่ม "อัปโหลดวิดีโอ" บนหน้า Shorts')}d(0,"done"),d(1,"active"),o("── ขั้น 2: อัพโหลดวิดีโอ ──");const c=await K();if(!c)return d(1,"error"),{success:!1,error:"ไม่พบไฟล์วิดีโอใน cache"};let u=!1;const b=await f(()=>{const t=document.querySelector("ytcp-uploads-file-picker");if(t){const r=t.querySelector('input[type="file"]')||t.querySelector('input[name="Filedata"]');if(r)return r}return document.querySelector('input[name="Filedata"]')||document.querySelector('ytcp-uploads-dialog input[type="file"]')},1e4);if(b){const t=b.getAttribute("style")||"";b.style.cssText="display:block !important; opacity:1; width:auto; height:auto; position:static; overflow:visible;",await a(200);const r=new DataTransfer;r.items.add(c),b.files=r.files,b.dispatchEvent(new Event("change",{bubbles:!0})),b.dispatchEvent(new Event("input",{bubbles:!0})),o(`ฉีดไฟล์ผ่าน file input (${c.name}, ${(c.size/1024/1024).toFixed(1)} MB)`),u=!0,await a(500),b.setAttribute("style",t)}if(!u){const t=document.querySelector("ytcp-uploads-file-picker #content")||document.querySelector("ytcp-uploads-file-picker");if(t){const r=new DataTransfer;r.items.add(c),t.dispatchEvent(new DragEvent("dragenter",{dataTransfer:r,bubbles:!0})),await a(100),t.dispatchEvent(new DragEvent("dragover",{dataTransfer:r,bubbles:!0})),await a(100),t.dispatchEvent(new DragEvent("drop",{dataTransfer:r,bubbles:!0})),o("ฉีดไฟล์ผ่าน drag-and-drop"),u=!0}}if(!u)return d(1,"error"),{success:!1,error:"ไม่พบ file input หรือ drop zone"};o("รอ YouTube ประมวลผลไฟล์..."),await a(5e3);const k=await f(()=>document.querySelector('#title-textarea #textbox[contenteditable="true"]')||document.querySelector('ytcp-social-suggestion-input #textbox[contenteditable="true"]')||document.querySelector('div[contenteditable="true"][aria-label*="ชื่อ"]')||document.querySelector('div[contenteditable="true"][aria-label*="title" i]'),3e4);if(!k)return d(1,"error"),{success:!1,error:"อัพโหลดไม่สำเร็จ — ไม่พบช่อง Title"};d(1,"done"),d(2,"active"),o("── ขั้น 3: กรอกชื่อ + คำอธิบาย ──");let v=e.title||"Netflow AI Video";await I(k,v),o(`กรอกชื่อ: "${v}"`),await a(1e3);const h=w(["เพิ่มทั้งหมด","Add all"],"button, ytcp-button-shape button, div.ytcpButtonShapeImpl__button-text-content");if(h){const t=h.closest("button")||h;y(t),o('คลิก "เพิ่มทั้งหมด" — เพิ่มแฮชแท็กที่แนะนำ'),await a(800)}else o('ไม่พบปุ่ม "เพิ่มทั้งหมด" สำหรับแฮชแท็ก — ข้าม');if(e.description){const t=await f(()=>document.querySelector('#description-textarea #textbox[contenteditable="true"]')||document.querySelector('div[contenteditable="true"][aria-label*="คำอธิบาย"]')||document.querySelector('div[contenteditable="true"][aria-label*="description" i]')||document.querySelector('div[contenteditable="true"][aria-label*="บอกข้อมูล"]'),8e3);t?(await I(t,e.description),o(`กรอกคำอธิบาย: "${e.description.substring(0,50)}..."`)):m("ไม่พบช่อง Description")}d(2,"done"),d(3,"active"),o('── ขั้น 4: เลือก "สร้างมาเพื่อเด็ก" ──'),await a(1e3);const x=document.querySelector("#scrollable-content")||document.querySelector("ytcp-uploads-dialog .scrollable");x&&(x.scrollTop=x.scrollHeight,await a(500));const S=e.madeForKids?["ใช่ วิดีโอนี้สร้างมาเพื่อเด็ก","Yes, it's made for kids"]:["ไม่ วิดีโอนี้ไม่ได้สร้างมาเพื่อเด็ก","No, it's not made for kids"],T=await f(()=>w(S,"tp-yt-paper-radio-button"),1e4);if(T)y(T),o(`เลือก: ${e.madeForKids?"สร้างมาเพื่อเด็ก":"ไม่ได้สร้างมาเพื่อเด็ก"}`);else{m("ไม่พบตัวเลือก Made for Kids — fallback");const t=document.querySelectorAll("tp-yt-paper-radio-button");t.length>=2&&y(e.madeForKids?t[0]:t[1])}d(3,"done"),await a(1e3),d(4,"active"),o('── ขั้น 5: กด "ถัดไป/Next" 3 ครั้ง ──');for(let t=0;t<3;t++){const r=await f(()=>{const s=document.querySelector("#next-button");if(s&&!s.hidden){const l=s.querySelector("ytcp-button-shape button")||s.querySelector("button");if(l&&!l.disabled)return l;if(!s.disabled)return s}return w(["ถัดไป","Next"],"button")},1e4);if(r)y(r),o(`กด "ถัดไป/Next" ครั้งที่ ${t+1}/3`),await a(2500);else{m(`ไม่พบปุ่ม "ถัดไป" ครั้งที่ ${t+1}`);const s=document.querySelector("#next-button");s&&(y(s),await a(2500))}}d(4,"done"),d(5,"active"),o("── ขั้น 6: เลือกการเผยแพร่ ──"),await a(1500);const $={public:"PUBLIC",unlisted:"UNLISTED",private:"PRIVATE"}[e.visibility]||"PUBLIC";let C=document.querySelector(`tp-yt-paper-radio-button[name="${$}"]`);if(!C){const t={public:["สาธารณะ","Public"],unlisted:["ไม่เป็นสาธารณะ","Unlisted"],private:["ส่วนตัว","Private"]};C=w(t[e.visibility]||t.public,"tp-yt-paper-radio-button")}if(C)y(C),o(`เลือกการเผยแพร่: ${e.visibility} (${$})`);else{m("ไม่พบตัวเลือกการเผยแพร่ — ลอง index");const t=document.querySelectorAll("#privacy-radios tp-yt-paper-radio-button"),r=e.visibility==="private"?0:e.visibility==="unlisted"?1:2;t[r]&&y(t[r])}await a(1500),o("รอการอัพโหลดเสร็จก่อนเผยแพร่...");const z=Date.now();for(;Date.now()-z<3e5;){const t=document.body.innerText;if(["การตรวจสอบเสร็จสมบูรณ์","ตรวจสอบเสร็จแล้ว","Checks complete","การประมวลผลเสร็จสมบูรณ์","Finished processing","Upload complete","ไม่พบปัญหา","No issues found","การอัปโหลดเสร็จสมบูรณ์","อัปโหลดเสร็จแล้ว"].some(l=>t.includes(l))){o("✅ อัพโหลด/ตรวจสอบเสร็จ");break}const s=document.querySelector("#done-button");if(s){const l=s.querySelector("button");if(l&&!l.disabled){o("✅ ปุ่มเผยแพร่/ตั้งเวลา พร้อมใช้งาน");break}}await a(3e3)}if(e.scheduleEnabled&&e.scheduleDate&&e.scheduleTime){o("── โหมดตั้งเวลา ──");const t=await f(()=>{const n=document.querySelector("#second-container-expand-button");if(n){const p=n.getBoundingClientRect();if(p.width>0&&p.height>0)return n}return w(["ตั้งเวลา","Schedule"],"ytcp-icon-button, .early-access-header")},5e3);t?(y(t),o('คลิกเปิด "ตั้งเวลา" chevron'),await a(2e3)):m("ไม่พบปุ่มเปิดตั้งเวลา");const r=await f(()=>{const n=document.querySelector("ytcp-datetime-picker");if(!n)return null;const p=n.querySelector("ytcp-text-dropdown-trigger")||n.querySelector("ytcp-dropdown-trigger");if(p){const E=p.getBoundingClientRect();if(E.width>0&&E.height>0)return p}return n.querySelector('div[role="button"].container')},5e3);if(r){y(r),o("คลิกเปิด date dropdown"),await a(1500);const n=await f(()=>document.querySelector("ytcp-date-picker tp-yt-iron-input input")||document.querySelector("ytcp-date-picker tp-yt-paper-input input[autofocus]")||document.querySelector("ytcp-date-picker tp-yt-paper-input input")||document.querySelector("ytcp-date-picker input.style-scope"),5e3);n?(n.focus(),await a(200),n.select(),await a(100),n.value="",n.dispatchEvent(new Event("input",{bubbles:!0})),n.dispatchEvent(new Event("change",{bubbles:!0})),await a(500),await f(()=>w(["วันที่ไม่ถูกต้อง","Invalid date"],"div, tp-yt-paper-input-error, #a11yWrapper"),3e3)&&o('พบ error "วันที่ไม่ถูกต้อง" — พร้อมใส่วันที่'),await _(n,e.scheduleDate),o(`ใส่วันที่: "${e.scheduleDate}"`),await a(500),n.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),n.dispatchEvent(new KeyboardEvent("keypress",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),n.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),await a(1e3),o("กด Enter ยืนยันวันที่")):m("ไม่พบช่อง input วันที่")}else m("ไม่พบ date dropdown trigger");const s=await f(()=>{const n=document.querySelector("ytcp-datetime-picker");if(!n)return null;const p=n.querySelector("#time-of-day-container");return p?p.querySelector("tp-yt-iron-input input")||p.querySelector("tp-yt-paper-input input")||p.querySelector("input"):n.querySelector("tp-yt-paper-input#textbox input")||n.querySelector("#time-of-day-container input")},5e3);s?(s.focus(),s.click(),await a(800),s.select(),await a(200),s.value="",s.dispatchEvent(new Event("input",{bubbles:!0})),s.dispatchEvent(new Event("change",{bubbles:!0})),await a(300),await _(s,e.scheduleTime),o(`ใส่เวลา: "${e.scheduleTime}"`),await a(500),s.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),s.dispatchEvent(new KeyboardEvent("keypress",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),s.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),await a(1e3),o("กด Enter ยืนยันเวลา")):m("ไม่พบช่อง input เวลา");const l=await f(()=>{const n=document.querySelector("#done-button");if(n){const p=n.querySelector('button[aria-label="ตั้งเวลา"]')||n.querySelector('button[aria-label="Schedule"]');if(p&&!p.disabled)return p;const E=n.querySelector("button:not([disabled])");if(E){const P=(E.textContent||"").trim();if(P.includes("ตั้งเวลา")||P.includes("Schedule"))return E}}return document.querySelector('button[aria-label="ตั้งเวลา"]:not([disabled])')||document.querySelector('button[aria-label="Schedule"]:not([disabled])')||w(["ตั้งเวลา","Schedule"],"button")},1e4);if(l)y(l),o('✅ คลิก "ตั้งเวลา/Schedule"'),d(5,"done");else return d(5,"error"),{success:!1,error:'ไม่พบปุ่ม "ตั้งเวลา/Schedule"'}}else{o("── โหมดเผยแพร่ทันที ──");const t=await f(()=>{const r=document.querySelector("#done-button");if(r){const s=r.querySelector('button[aria-label="เผยแพร่"]')||r.querySelector('button[aria-label="Publish"]')||r.querySelector('button[aria-label="บันทึก"]')||r.querySelector('button[aria-label="Save"]');if(s&&!s.disabled)return s;const l=r.querySelector("button:not([disabled])");if(l){const n=(l.textContent||"").trim();if(["เผยแพร่","Publish","บันทึก","Save"].some(p=>n.includes(p)))return l}}return document.querySelector('button[aria-label="เผยแพร่"]:not([disabled])')||document.querySelector('button[aria-label="Publish"]:not([disabled])')||w(["เผยแพร่","Publish","บันทึก","Save"],"button")},1e4);if(t)y(t),o('✅ คลิก "เผยแพร่/Publish"'),d(5,"done");else return d(5,"error"),{success:!1,error:"ไม่พบปุ่มเผยแพร่/บันทึก"}}await a(3e3);const O=await f(()=>{const t=document.querySelector("ytcp-video-share-dialog");if(t){const r=t.querySelector('#close-button button[aria-label="ปิด"]')||t.querySelector('#close-button button[aria-label="Close"]')||t.querySelector("#close-button button");if(r){const s=r.getBoundingClientRect();if(s.width>0&&s.height>0)return r}}return document.querySelector('tp-yt-paper-dialog button[aria-label="ปิด"]')||document.querySelector('tp-yt-paper-dialog button[aria-label="Close"]')||document.querySelector('ytcp-video-share-dialog button[aria-label="ปิด"]')||document.querySelector('ytcp-video-share-dialog button[aria-label="Close"]')},1e4);if(O)y(O),o("ปิด dialog สำเร็จ");else{const t=document.querySelector("ytcp-video-share-dialog #close-icon-button")||document.querySelector('ytcp-video-share-dialog ytcp-icon-button[icon="close"]')||document.querySelector('tp-yt-paper-dialog ytcp-icon-button[icon="close"]');if(t)y(t),o("ปิด dialog ผ่าน X button");else{const r=w(["ปิด","Close"],"tp-yt-paper-dialog button, ytcp-video-share-dialog button");r&&(y(r),o("ปิด dialog ผ่าน text match"))}}o("=== ✅ YouTube Shorts Upload เสร็จสมบูรณ์! ==="),M(5e3);try{chrome.runtime.sendMessage({type:"YOUTUBE_UPLOAD_COMPLETE",title:v,visibility:e.visibility,scheduled:e.scheduleEnabled||!1})}catch{}return{success:!0}}catch(i){return m(`Upload error: ${i.message}`),M(8e3),{success:!1,error:i.message}}}chrome.runtime.onMessage.addListener((e,i,c)=>{if((e==null?void 0:e.action)==="UPLOAD_YOUTUBE")return o("ได้รับคำสั่ง UPLOAD_YOUTUBE"),c({success:!0,message:"⏳ เริ่มอัพโหลด YouTube Shorts..."}),R({title:e.title||"",description:e.description||"",madeForKids:e.madeForKids||!1,visibility:e.visibility||"public",scheduleEnabled:e.scheduleEnabled||!1,scheduleDate:e.scheduleDate||"",scheduleTime:e.scheduleTime||""}).then(u=>{o(`Upload result: ${u.success?"✅":"❌"} ${u.error||""}`)}),!1;if((e==null?void 0:e.action)==="PING")return c({success:!0,message:"YouTube Upload script ready"}),!1}),o("สคริปต์ YouTube Upload พร้อมแล้ว — รอคำสั่ง")}})();
