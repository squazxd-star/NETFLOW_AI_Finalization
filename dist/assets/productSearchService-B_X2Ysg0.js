import{g as u,G as m}from"./main-BEi-NGLs.js";import"./modulepreload-polyfill-B5Qt9EMX.js";const g=`คุณเป็นผู้เชี่ยวชาญรีวิวสินค้า ค้นหาข้อมูลจริงของสินค้านี้จากอินเทอร์เน็ต

ชื่อสินค้า: "{PRODUCT_NAME}"

ค้นหาข้อมูลต่อไปนี้ให้ครบถ้วนและถูกต้อง:

1. สรุปสินค้าสั้นๆ (1-2 ประโยค)
2. จุดเด่น/ฟีเจอร์สำคัญ (อย่างน้อย 5 ข้อ — ข้อมูลจริงเท่านั้น)
3. สเปคทางเทคนิค (เช่น ขนาด น้ำหนัก วัสดุ ส่วนประกอบ ความจุ ฯลฯ)
4. อุปกรณ์เสริม/ของแถมในกล่อง
5. ช่วงราคาโดยประมาณ (บาท)
6. ข้อดี (สำหรับเขียนรีวิว)
7. ข้อควรรู้/ข้อเสีย

⚠️ กฎสำคัญ:
- ข้อมูลต้องเป็นข้อเท็จจริง ห้ามแต่งขึ้นเอง
- ถ้าไม่แน่ใจ ให้บอกว่า "ไม่พบข้อมูล" แทนการเดา
- ตอบเป็น JSON เท่านั้น ไม่ต้องมี markdown

ตอบในรูปแบบ JSON:
{
  "summary": "...",
  "keyFeatures": ["...", "..."],
  "specs": {"key": "value"},
  "accessories": ["...", "..."],
  "priceRange": "...",
  "pros": ["...", "..."],
  "cons": ["...", "..."]
}`;async function P(e,n){if(!(e!=null&&e.trim()))return null;const r=localStorage.getItem("netflow_ai_provider")||"openai";try{return r==="gemini"?await A(e,n):await f(e,n)}catch(t){console.warn("🔍 Product search failed, trying fallback...",t);try{return await d(e)}catch(s){return console.error("🔍 All product search methods failed:",s),null}}}async function A(e,n){const r=await u("gemini");if(!r)throw new Error("Gemini API Key not found");const s=new m(r).getGenerativeModel({model:"gemini-2.0-flash",tools:[{googleSearch:{}}]}),o=g.replace("{PRODUCT_NAME}",e),a=[o];if(n){const l=n.includes(",")?n.split(",")[1]:n,p=n.includes("png")?"image/png":"image/jpeg";a.push({inlineData:{data:l,mimeType:p}}),a[0]=o+`

(ดูรูปสินค้าประกอบเพื่อระบุสินค้าให้ถูกต้อง)`}console.log("🔍 Searching product info with Gemini + Google Search grounding...");const i=(await s.generateContent(a)).response.text();return console.log("🔍 Gemini search result:",i.substring(0,300)),h(i,e)}async function f(e,n){var i,l,p,y;const r=await u("openai");if(!r)throw new Error("OpenAI API Key not found");const t=g.replace("{PRODUCT_NAME}",e),s=[];n?s.push({role:"user",content:[{type:"text",text:t+`

(ดูรูปสินค้าประกอบเพื่อระบุสินค้าให้ถูกต้อง)`},{type:"image_url",image_url:{url:n,detail:"low"}}]}):s.push({role:"user",content:t}),console.log("🔍 Searching product info with OpenAI...");const o=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({model:n?"gpt-4o":"gpt-4o-mini",messages:s,max_tokens:1e3,temperature:.3})});if(!o.ok){const w=await o.json();throw new Error(((i=w.error)==null?void 0:i.message)||"OpenAI API Error")}const c=((y=(p=(l=(await o.json()).choices)==null?void 0:l[0])==null?void 0:p.message)==null?void 0:y.content)||"";return console.log("🔍 OpenAI search result:",c.substring(0,300)),h(c,e)}async function d(e){const n=await u("gemini");if(!n){if(await u("openai"))return f(e,null);throw new Error("No API Key available")}const t=new m(n).getGenerativeModel({model:"gemini-2.0-flash"}),s=g.replace("{PRODUCT_NAME}",e);console.log("🔍 Searching product info with Gemini (no grounding fallback)...");const a=(await t.generateContent(s)).response.text();return h(a,e)}function h(e,n){try{const t=e.replace(/```json\s*/gi,"").replace(/```\s*/gi,"").trim().match(/\{[\s\S]*\}/);if(!t)return console.warn("🔍 Could not find JSON in response"),null;const s=JSON.parse(t[0]),o={summary:s.summary||`${n}`,keyFeatures:Array.isArray(s.keyFeatures)?s.keyFeatures:[],specs:typeof s.specs=="object"&&s.specs?s.specs:{},accessories:Array.isArray(s.accessories)?s.accessories:[],priceRange:s.priceRange||"ไม่พบข้อมูล",pros:Array.isArray(s.pros)?s.pros:[],cons:Array.isArray(s.cons)?s.cons:[],rawText:e};return console.log(`🔍 Product info parsed: ${o.keyFeatures.length} features, ${Object.keys(o.specs).length} specs`),o}catch(r){return console.warn("🔍 Failed to parse product info:",r),null}}function k(e){const n=[];if(e.summary&&n.push(`📋 สรุป: ${e.summary}`),e.keyFeatures.length>0&&n.push(`✨ จุดเด่น:
${e.keyFeatures.map(r=>`- ${r}`).join(`
`)}`),Object.keys(e.specs).length>0){const r=Object.entries(e.specs).slice(0,8).map(([t,s])=>`- ${t}: ${s}`);n.push(`📐 สเปค:
${r.join(`
`)}`)}return e.accessories.length>0&&n.push(`📦 อุปกรณ์ในกล่อง: ${e.accessories.join(", ")}`),e.priceRange&&e.priceRange!=="ไม่พบข้อมูล"&&n.push(`💰 ราคา: ${e.priceRange}`),e.pros.length>0&&n.push(`👍 ข้อดี:
${e.pros.map(r=>`- ${r}`).join(`
`)}`),e.cons.length>0&&n.push(`⚠️ ข้อควรรู้:
${e.cons.map(r=>`- ${r}`).join(`
`)}`),n.join(`

`)}export{k as formatProductInfoForPrompt,P as searchProductInfo};
