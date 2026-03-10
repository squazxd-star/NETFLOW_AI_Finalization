(function(){"use strict";if(window.__NETFLOW_YOUTUBE_UPLOAD_LOADED__)console.log("[NetFlow YouTube] Already loaded — skipping duplicate injection");else{window.__NETFLOW_YOUTUBE_UPLOAD_LOADED__=!0,console.log("[NetFlow YouTube] Content script loaded on:",window.location.href);const r=e=>new Promise(o=>setTimeout(o,e)),_=(e,o)=>Math.floor(Math.random()*(o-e+1))+e,q=()=>document.hidden,a=e=>{console.log(`[NetFlow YouTube] ${e}`);try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:`[YT] ${e}`})}catch{}},w=e=>{console.warn(`[NetFlow YouTube] ⚠️ ${e}`);try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`[YT] ⚠️ ${e}`})}catch{}},m=async(e,o=2e4,c=500)=>{const u=Date.now();for(;Date.now()-u<o;){const p=typeof e=="string"?document.querySelector(e):e();if(p)return p;await r(c)}return null},R=(e,o)=>{const c=[];return c.push(...Array.from(e.querySelectorAll(o))),e.querySelectorAll("*").forEach(u=>{u.shadowRoot&&c.push(...R(u.shadowRoot,o))}),c},y=e=>{e.focus(),e.click(),e.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0}))},g=(e,o="button, a, span, div, label, tp-yt-paper-item, ytcp-text, yt-formatted-string, tp-yt-paper-radio-button",c=!1)=>{const u=Array.from(document.querySelectorAll(o)),p=R(document,o),S=[...u,...p],b=new Set;for(const h of S){if(b.has(h))continue;b.add(h);const k=(h.textContent||"").replace(/\s+/g," ").trim(),x=(h.innerText||"").replace(/\s+/g," ").trim();for(const $ of e){const C=c?k===$:k.includes($),B=c?x===$:x.includes($);if(C||B){if(q())return h;const D=h.getBoundingClientRect();if(D.width>0&&D.height>0)return h}}}return null},F=async(e,o)=>{if(e.focus(),e.click(),await r(200),document.execCommand("selectAll"),await r(100),document.execCommand("delete"),await r(200),Math.random()<.5)document.execCommand("insertText",!1,o),a(`[Paste] "${o.substring(0,40)}..."`);else{for(const u of o)document.execCommand("insertText",!1,u),await r(_(30,120));a(`[Type] "${o.substring(0,40)}..."`)}await r(300)},L=async(e,o)=>{e.focus(),e.click(),await r(200),e.select(),await r(100),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await r(200);for(const c of o)e.value+=c,e.dispatchEvent(new Event("input",{bubbles:!0})),await r(_(50,150));e.dispatchEvent(new Event("change",{bubbles:!0})),await r(200)};let E=null,T=null,I=[],O=0,A=null;const P={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}},K=e=>{const o=e.rgb,c=e.accentRgb,u=e.doneRgb,p=e.hex,S=e.doneHex,b=p.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),h=b?Math.max(parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16),1):255,k=b?parseInt(b[1],16)/h:0,x=b?parseInt(b[2],16)/h:1,$=b?parseInt(b[3],16)/h:.25,C=B=>`${Math.round(k*B)}, ${Math.round(x*B)}, ${Math.round($*B)}`;return`
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700&display=swap');

#netflow-youtube-hud {
    position: fixed; top: 16px; right: 16px; z-index: 999999;
    min-width: 300px; max-width: 340px;
    background:
        radial-gradient(ellipse at 20% 10%, rgba(${o},0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 90%, rgba(${c},0.06) 0%, transparent 50%),
        linear-gradient(135deg, rgba(${C(8)},0.97) 0%, rgba(${C(2)},0.98) 100%);
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
    color: ${p}; text-transform: uppercase;
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
    background: ${p}; border-color: ${p};
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
#netflow-youtube-hud .nfyt-step[data-status="active"] .nfyt-label { color: ${p}; text-shadow: 0 0 6px rgba(${o},0.4); }
#netflow-youtube-hud .nfyt-step[data-status="error"] .nfyt-label { color: #ef4444; }

/* ── Footer ── */
#netflow-youtube-hud .nfyt-footer {
    padding: 6px 14px 8px;
    border-top: 1px solid rgba(${o},0.1);
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; color: rgba(${o},0.3);
    text-align: center; letter-spacing: 0.5px;
}
`},z=e=>{if(E)return;const o=P[e||""]||P.green;T||(T=document.createElement("style"),document.head.appendChild(T)),T.textContent=K(o),O=Date.now(),E=document.createElement("div"),E.id="netflow-youtube-hud",E.innerHTML=`
        <div class="nfyt-header">
            <div class="nfyt-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                YOUTUBE UPLOAD
            </div>
            <div class="nfyt-timer" id="nfyt-timer">00:00</div>
        </div>
        <div class="nfyt-steps" id="netflow-yt-steps"></div>
        <div class="nfyt-footer">NETFLOW AI ENGINE • SHORTS AUTOMATION</div>
    `,document.body.appendChild(E),A=setInterval(()=>{const c=document.getElementById("nfyt-timer");if(!c)return;const u=Math.floor((Date.now()-O)/1e3),p=String(Math.floor(u/60)).padStart(2,"0"),S=String(u%60).padStart(2,"0");c.textContent=`${p}:${S}`},1e3)},f=(e,o)=>{e>=0&&e<I.length&&(I[e].status=o);const c=document.getElementById("netflow-yt-steps");c&&(c.innerHTML=I.map(u=>{const p=u.status||"pending";return`<div class="nfyt-step" data-status="${p}"><div class="nfyt-dot">${p==="done"?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':p==="error"?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>':""}</div><span class="nfyt-label">${u.label}</span></div>`}).join(""))},H=(e=5e3)=>{A&&(clearInterval(A),A=null),E&&(E.style.animation="nfyt-fade-out 0.4s ease-in forwards"),setTimeout(()=>{E==null||E.remove(),E=null,T==null||T.remove(),T=null},e)},j=()=>new Promise(e=>{chrome.runtime.sendMessage({type:"GET_CACHED_VIDEO"},o=>{var c;if(chrome.runtime.lastError||!(o!=null&&o.success)||!o.data){w("No cached video from background"),e(null);return}try{const[u,p]=o.data.split(","),S=((c=u.match(/:(.*?);/))==null?void 0:c[1])||"video/mp4",b=atob(p),h=new Uint8Array(b.length);for(let x=0;x<b.length;x++)h[x]=b.charCodeAt(x);const k=new File([h],"netflow-shorts.mp4",{type:S});a(`Video file created: ${(k.size/1024/1024).toFixed(1)} MB`),e(k)}catch(u){w(`Failed to create File: ${u.message}`),e(null)}})});async function V(e){a("=== เริ่ม YouTube Shorts Upload ==="),a(`Title: "${e.title}" | Visibility: ${e.visibility} | Kids: ${e.madeForKids} | Schedule: ${e.scheduleEnabled?`${e.scheduleDate} ${e.scheduleTime}`:"ไม่ตั้ง"}`),I=[{label:"เปิดหน้าอัพโหลด",status:"pending"},{label:"อัพโหลดวิดีโอ",status:"pending"},{label:"กรอกชื่อ + คำอธิบาย",status:"pending"},{label:"เลือกผู้ชม (เด็ก/ไม่เด็ก)",status:"pending"},{label:"ข้ามไปหน้าเผยแพร่",status:"pending"},{label:"เลือกการเผยแพร่ + โพสต์",status:"pending"}],z(e.theme),f(-1,"");try{if(f(0,"active"),a("── ขั้น 1: เปิดหน้าอัพโหลด (เนื้อหา → Shorts → อัปโหลดวิดีโอ) ──"),!document.querySelector("ytcp-uploads-dialog")){const n=await m(()=>{const i=document.querySelector("#menu-item-1");if(i){if(q())return i;const t=i.getBoundingClientRect();if(t.width>0&&t.height>0)return i}return g(["เนื้อหา","Content"],"a.menu-item-link, tp-yt-paper-icon-item, div.nav-item-text")},1e4);if(n){const i=n.closest("a.menu-item-link")||n;y(i),a('คลิก "เนื้อหา/Content" ใน sidebar'),await r(3e3)}else{const i=window.location.pathname.match(/\/channel\/([^/]+)/),t=i?i[1]:"";t&&(a('ไม่พบเมนู "เนื้อหา" — ใช้ URL ตรง'),window.location.href=`${window.location.origin}/channel/${t}/videos/shorts`,await r(4e3))}const s=await m(()=>{const i=document.querySelectorAll("tp-yt-paper-tab");for(const t of i)if((t.textContent||"").trim()==="Shorts"){if(q())return t;const v=t.getBoundingClientRect();if(v.width>0&&v.height>0)return t}return g(["Shorts"],"tp-yt-paper-tab, div.tab-content")},8e3);if(s){const i=s.closest("tp-yt-paper-tab")||s;y(i),a('คลิก tab "Shorts"'),await r(2500)}else{w('ไม่พบ tab "Shorts" — ลอง URL ตรง');const i=window.location.pathname.match(/\/channel\/([^/]+)/),t=i?i[1]:"";t&&(window.location.href=`${window.location.origin}/channel/${t}/videos/shorts`,await r(3e3))}const l=await m(()=>{const i=document.querySelector('ytcp-button-shape button[aria-label="อัปโหลดวิดีโอ"]')||document.querySelector('ytcp-button-shape button[aria-label="Upload videos"]')||document.querySelector('ytcp-button-shape button[aria-label="Upload video"]');if(i){if(q())return i;const t=i.getBoundingClientRect();if(t.width>0&&t.height>0)return i}return g(["อัปโหลดวิดีโอ","Upload videos","Upload video"],"button, ytcp-button-shape")},1e4);if(l)y(l),a('คลิกปุ่ม "อัปโหลดวิดีโอ" บนหน้า Shorts'),await r(2500);else{a('ไม่พบปุ่มอัปโหลดบน Shorts page — ใช้ fallback: ปุ่ม "สร้าง/Create"');const i=await m(()=>{const t=document.querySelector('ytcp-button-shape button[aria-label="สร้าง"]')||document.querySelector('ytcp-button-shape button[aria-label="Create"]');if(t){if(q())return t;const d=t.getBoundingClientRect();if(d.width>0&&d.height>0)return t}return g(["สร้าง","Create"],"ytcp-button-shape button, button")},1e4);if(i){y(i),a('คลิกปุ่ม "สร้าง/Create" ที่มุมขวาบน'),await r(2e3);const t=await m(()=>{const d=document.querySelectorAll("ytcp-text-menu yt-formatted-string.item-text");for(const v of d){const U=(v.textContent||"").trim();if(U==="อัปโหลดวิดีโอ"||U==="Upload videos"||U==="Upload video"){if(q())return v;const N=v.getBoundingClientRect();if(N.width>0&&N.height>0)return v}}return g(["อัปโหลดวิดีโอ","Upload videos","Upload video"],"tp-yt-paper-item, ytcp-text-menu div, yt-formatted-string")},8e3);if(t){const d=t.closest("tp-yt-paper-item")||t;y(d),a('คลิก "อัปโหลดวิดีโอ/Upload videos" จาก dropdown'),await r(2500)}else w('ไม่พบ "อัปโหลดวิดีโอ" ใน dropdown — อาจต้อง verify channel')}else w('ไม่พบปุ่ม "สร้าง/Create" — ตรวจสอบหน้า YouTube Studio')}}f(0,"done"),await r(3e3),f(1,"active"),a("── ขั้น 2: อัพโหลดวิดีโอ ──");const c=await j();if(!c)return f(1,"error"),{success:!1,error:"ไม่พบไฟล์วิดีโอใน cache"};let u=!1;const p=await m(()=>{const n=document.querySelector("ytcp-uploads-file-picker");if(n){const s=n.querySelector('input[type="file"]')||n.querySelector('input[name="Filedata"]');if(s)return s}return document.querySelector('input[name="Filedata"]')||document.querySelector('ytcp-uploads-dialog input[type="file"]')},1e4);if(p){const n=p.getAttribute("style")||"";p.style.cssText="display:block !important; opacity:1; width:auto; height:auto; position:static; overflow:visible;",await r(200);const s=new DataTransfer;s.items.add(c),p.files=s.files,p.dispatchEvent(new Event("change",{bubbles:!0})),p.dispatchEvent(new Event("input",{bubbles:!0})),a(`ฉีดไฟล์ผ่าน file input (${c.name}, ${(c.size/1024/1024).toFixed(1)} MB)`),u=!0,await r(500),p.setAttribute("style",n)}if(!u){const n=document.querySelector("ytcp-uploads-file-picker #content")||document.querySelector("ytcp-uploads-file-picker");if(n){const s=new DataTransfer;s.items.add(c),n.dispatchEvent(new DragEvent("dragenter",{dataTransfer:s,bubbles:!0})),await r(100),n.dispatchEvent(new DragEvent("dragover",{dataTransfer:s,bubbles:!0})),await r(100),n.dispatchEvent(new DragEvent("drop",{dataTransfer:s,bubbles:!0})),a("ฉีดไฟล์ผ่าน drag-and-drop"),u=!0}}if(!u)return f(1,"error"),{success:!1,error:"ไม่พบ file input หรือ drop zone"};a("รอ YouTube ประมวลผลไฟล์..."),await r(5e3);const S=await m(()=>document.querySelector('#title-textarea #textbox[contenteditable="true"]')||document.querySelector('ytcp-social-suggestion-input #textbox[contenteditable="true"]')||document.querySelector('div[contenteditable="true"][aria-label*="ชื่อ"]')||document.querySelector('div[contenteditable="true"][aria-label*="title" i]'),3e4);if(!S)return f(1,"error"),{success:!1,error:"อัพโหลดไม่สำเร็จ — ไม่พบช่อง Title"};f(1,"done"),await r(3e3),f(2,"active"),a("── ขั้น 3: กรอกชื่อ + คำอธิบาย ──");let b=e.title||"Netflow AI Video";await F(S,b),a(`กรอกชื่อ: "${b}"`),await r(1e3);const h=g(["เพิ่มทั้งหมด","Add all"],"button, ytcp-button-shape button, div.ytcpButtonShapeImpl__button-text-content");if(h){const n=h.closest("button")||h;y(n),a('คลิก "เพิ่มทั้งหมด" — เพิ่มแฮชแท็กที่แนะนำ'),await r(800)}else a('ไม่พบปุ่ม "เพิ่มทั้งหมด" สำหรับแฮชแท็ก — ข้าม');const k=n=>n?/#shorts\b/i.test(n)?n:n.trimEnd()+" #Shorts":"#Shorts";if(e.description=k(e.description||""),e.description){const n=await m(()=>document.querySelector('#description-textarea #textbox[contenteditable="true"]')||document.querySelector('div[contenteditable="true"][aria-label*="คำอธิบาย"]')||document.querySelector('div[contenteditable="true"][aria-label*="description" i]')||document.querySelector('div[contenteditable="true"][aria-label*="บอกข้อมูล"]'),8e3);n?(await F(n,e.description),a(`กรอกคำอธิบาย: "${e.description.substring(0,50)}..."`)):w("ไม่พบช่อง Description")}f(2,"done"),await r(3e3),f(3,"active"),a('── ขั้น 4: เลือก "สร้างมาเพื่อเด็ก" ──'),await r(1e3);const x=document.querySelector("#scrollable-content")||document.querySelector("ytcp-uploads-dialog .scrollable");x&&(x.scrollTop=x.scrollHeight,await r(500));const $=e.madeForKids?["ใช่ วิดีโอนี้สร้างมาเพื่อเด็ก","Yes, it's made for kids"]:["ไม่ วิดีโอนี้ไม่ได้สร้างมาเพื่อเด็ก","No, it's not made for kids"],C=await m(()=>g($,"tp-yt-paper-radio-button"),1e4);if(C)y(C),a(`เลือก: ${e.madeForKids?"สร้างมาเพื่อเด็ก":"ไม่ได้สร้างมาเพื่อเด็ก"}`);else{w("ไม่พบตัวเลือก Made for Kids — fallback");const n=document.querySelectorAll("tp-yt-paper-radio-button");n.length>=2&&y(e.madeForKids?n[0]:n[1])}f(3,"done"),await r(3e3),f(4,"active"),a('── ขั้น 5: กด "ถัดไป/Next" 3 ครั้ง ──');for(let n=0;n<3;n++){const s=await m(()=>{const l=document.querySelector("#next-button");if(l&&!l.hidden){const i=l.querySelector("ytcp-button-shape button")||l.querySelector("button");if(i&&!i.disabled)return i;if(!l.disabled)return l}return g(["ถัดไป","Next"],"button")},1e4);if(s)y(s),a(`กด "ถัดไป/Next" ครั้งที่ ${n+1}/3`),await r(2500);else{w(`ไม่พบปุ่ม "ถัดไป" ครั้งที่ ${n+1}`);const l=document.querySelector("#next-button");l&&(y(l),await r(2500))}}f(4,"done"),await r(3e3),f(5,"active"),a("── ขั้น 6: เลือกการเผยแพร่ ──"),await r(1500);const D={public:"PUBLIC",unlisted:"UNLISTED",private:"PRIVATE"}[e.visibility]||"PUBLIC";let M=document.querySelector(`tp-yt-paper-radio-button[name="${D}"]`);if(!M){const n={public:["สาธารณะ","Public"],unlisted:["ไม่เป็นสาธารณะ","Unlisted"],private:["ส่วนตัว","Private"]};M=g(n[e.visibility]||n.public,"tp-yt-paper-radio-button")}if(M)y(M),a(`เลือกการเผยแพร่: ${e.visibility} (${D})`);else{w("ไม่พบตัวเลือกการเผยแพร่ — ลอง index");const n=document.querySelectorAll("#privacy-radios tp-yt-paper-radio-button"),s=e.visibility==="private"?0:e.visibility==="unlisted"?1:2;n[s]&&y(n[s])}await r(1500),a("รอการอัพโหลดเสร็จก่อนเผยแพร่...");const W=Date.now();for(;Date.now()-W<3e5;){const n=document.body.innerText;if(["การตรวจสอบเสร็จสมบูรณ์","ตรวจสอบเสร็จแล้ว","Checks complete","การประมวลผลเสร็จสมบูรณ์","Finished processing","Upload complete","ไม่พบปัญหา","No issues found","การอัปโหลดเสร็จสมบูรณ์","อัปโหลดเสร็จแล้ว"].some(i=>n.includes(i))){a("✅ อัพโหลด/ตรวจสอบเสร็จ");break}const l=document.querySelector("#done-button");if(l){const i=l.querySelector("button");if(i&&!i.disabled){a("✅ ปุ่มเผยแพร่/ตั้งเวลา พร้อมใช้งาน");break}}await r(3e3)}if(e.scheduleEnabled&&e.scheduleDate&&e.scheduleTime){a("── โหมดตั้งเวลา ──");const n=await m(()=>{const t=document.querySelector("#second-container-expand-button");if(t){if(q())return t;const d=t.getBoundingClientRect();if(d.width>0&&d.height>0)return t}return g(["ตั้งเวลา","Schedule"],"ytcp-icon-button, .early-access-header")},5e3);n?(y(n),a('คลิกเปิด "ตั้งเวลา" chevron'),await r(2e3)):w("ไม่พบปุ่มเปิดตั้งเวลา");const s=await m(()=>{const t=document.querySelector("ytcp-datetime-picker");if(!t)return null;const d=t.querySelector("ytcp-text-dropdown-trigger")||t.querySelector("ytcp-dropdown-trigger");if(d){if(q())return d;const v=d.getBoundingClientRect();if(v.width>0&&v.height>0)return d}return t.querySelector('div[role="button"].container')},5e3);if(s){y(s),a("คลิกเปิด date dropdown"),await r(1500);const t=await m(()=>document.querySelector("ytcp-date-picker tp-yt-iron-input input")||document.querySelector("ytcp-date-picker tp-yt-paper-input input[autofocus]")||document.querySelector("ytcp-date-picker tp-yt-paper-input input")||document.querySelector("ytcp-date-picker input.style-scope"),5e3);t?(t.focus(),await r(200),t.select(),await r(100),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await r(500),await m(()=>g(["วันที่ไม่ถูกต้อง","Invalid date"],"div, tp-yt-paper-input-error, #a11yWrapper"),3e3)&&a('พบ error "วันที่ไม่ถูกต้อง" — พร้อมใส่วันที่'),await L(t,e.scheduleDate),a(`ใส่วันที่: "${e.scheduleDate}"`),await r(500),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keypress",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),await r(1e3),a("กด Enter ยืนยันวันที่")):w("ไม่พบช่อง input วันที่")}else w("ไม่พบ date dropdown trigger");const l=await m(()=>{const t=document.querySelector("ytcp-datetime-picker");if(!t)return null;const d=t.querySelector("#time-of-day-container");return d?d.querySelector("tp-yt-iron-input input")||d.querySelector("tp-yt-paper-input input")||d.querySelector("input"):t.querySelector("tp-yt-paper-input#textbox input")||t.querySelector("#time-of-day-container input")},5e3);l?(l.focus(),l.click(),await r(800),l.select(),await r(200),l.value="",l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0})),await r(300),await L(l,e.scheduleTime),a(`ใส่เวลา: "${e.scheduleTime}"`),await r(500),l.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),l.dispatchEvent(new KeyboardEvent("keypress",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),l.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0})),await r(1e3),a("กด Enter ยืนยันเวลา")):w("ไม่พบช่อง input เวลา");const i=await m(()=>{const t=document.querySelector("#done-button");if(t){const d=t.querySelector('button[aria-label="ตั้งเวลา"]')||t.querySelector('button[aria-label="Schedule"]');if(d&&!d.disabled)return d;const v=t.querySelector("button:not([disabled])");if(v){const U=(v.textContent||"").trim();if(U.includes("ตั้งเวลา")||U.includes("Schedule"))return v}}return document.querySelector('button[aria-label="ตั้งเวลา"]:not([disabled])')||document.querySelector('button[aria-label="Schedule"]:not([disabled])')||g(["ตั้งเวลา","Schedule"],"button")},1e4);if(i)y(i),a('✅ คลิก "ตั้งเวลา/Schedule"'),f(5,"done");else return f(5,"error"),{success:!1,error:'ไม่พบปุ่ม "ตั้งเวลา/Schedule"'}}else{a("── โหมดเผยแพร่ทันที ──");const n=await m(()=>{const s=document.querySelector("#done-button");if(s){const l=s.querySelector('button[aria-label="เผยแพร่"]')||s.querySelector('button[aria-label="Publish"]')||s.querySelector('button[aria-label="บันทึก"]')||s.querySelector('button[aria-label="Save"]');if(l&&!l.disabled)return l;const i=s.querySelector("button:not([disabled])");if(i){const t=(i.textContent||"").trim();if(["เผยแพร่","Publish","บันทึก","Save"].some(d=>t.includes(d)))return i}}return document.querySelector('button[aria-label="เผยแพร่"]:not([disabled])')||document.querySelector('button[aria-label="Publish"]:not([disabled])')||g(["เผยแพร่","Publish","บันทึก","Save"],"button")},1e4);if(n)y(n),a('✅ คลิก "เผยแพร่/Publish"'),f(5,"done");else return f(5,"error"),{success:!1,error:"ไม่พบปุ่มเผยแพร่/บันทึก"}}await r(3e3);const Y=await m(()=>{const n=document.querySelector("ytcp-video-share-dialog");if(n){const s=n.querySelector('#close-button button[aria-label="ปิด"]')||n.querySelector('#close-button button[aria-label="Close"]')||n.querySelector("#close-button button");if(s){if(q())return s;const l=s.getBoundingClientRect();if(l.width>0&&l.height>0)return s}}return document.querySelector('tp-yt-paper-dialog button[aria-label="ปิด"]')||document.querySelector('tp-yt-paper-dialog button[aria-label="Close"]')||document.querySelector('ytcp-video-share-dialog button[aria-label="ปิด"]')||document.querySelector('ytcp-video-share-dialog button[aria-label="Close"]')},1e4);if(Y)y(Y),a("ปิด dialog สำเร็จ");else{const n=document.querySelector("ytcp-video-share-dialog #close-icon-button")||document.querySelector('ytcp-video-share-dialog ytcp-icon-button[icon="close"]')||document.querySelector('tp-yt-paper-dialog ytcp-icon-button[icon="close"]');if(n)y(n),a("ปิด dialog ผ่าน X button");else{const s=g(["ปิด","Close"],"tp-yt-paper-dialog button, ytcp-video-share-dialog button");s&&(y(s),a("ปิด dialog ผ่าน text match"))}}a("=== ✅ YouTube Shorts Upload เสร็จสมบูรณ์! ==="),H(5e3);try{chrome.runtime.sendMessage({type:"YOUTUBE_UPLOAD_COMPLETE",title:b,visibility:e.visibility,scheduled:e.scheduleEnabled||!1})}catch{}return{success:!0}}catch(o){return w(`Upload error: ${o.message}`),H(8e3),{success:!1,error:o.message}}}chrome.runtime.onMessage.addListener((e,o,c)=>{if((e==null?void 0:e.action)==="UPLOAD_YOUTUBE")return a("ได้รับคำสั่ง UPLOAD_YOUTUBE"),c({success:!0,message:"⏳ เริ่มอัพโหลด YouTube Shorts..."}),V({title:e.title||"",description:e.description||"",madeForKids:e.madeForKids||!1,visibility:e.visibility||"public",scheduleEnabled:e.scheduleEnabled||!1,scheduleDate:e.scheduleDate||"",scheduleTime:e.scheduleTime||"",theme:e.theme||"green"}).then(u=>{a(`Upload result: ${u.success?"✅":"❌"} ${u.error||""}`)}),!1;if((e==null?void 0:e.action)==="PING")return c({success:!0,message:"YouTube Upload script ready"}),!1}),a("สคริปต์ YouTube Upload พร้อมแล้ว — รอคำสั่ง")}})();
