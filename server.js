const DEFAULT_CLUSTER_MAPPING={"AMACHAL":"Adarsh S S","AMARAVILA":"Adarsh S S","AND/NMG/LM1":"Adarsh S S","AYOOR1":"Adarsh S S","CHITHARA":"Adarsh S S","KAL/KUL/LM1":"Adarsh S S","KALLAYAM":"Adarsh S S","KANIYAPURAM":"Adarsh S S","KARAKULAM":"Adarsh S S","KILIMANOOR":"Adarsh S S","KUTTICHAL":"Adarsh S S","NEMOM":"Adarsh S S","NEYYATTINKARA":"Adarsh S S","PAL/KAN/LM1":"Adarsh S S","PARASSALA":"Adarsh S S","PARAVUR":"Adarsh S S","POT/KOD/LM1":"Adarsh S S","QLN/KLM/LM1":"Adarsh S S","VAZHUTHAKKAD":"Adarsh S S","NEY/VAE/LM1":"Adarsh S S","AKALD":"AKSHAY","ELATHUR":"AKSHAY","IRINGATH":"AKSHAY","KAINATTY":"AKSHAY","MAKKARAPARAMBA":"AKSHAY","MEPPADI":"AKSHAY","NIL/PLD/LM":"AKSHAY","PKT/WDR/LM1":"AKSHAY","THUVAKUNNU":"AKSHAY","VALANCHERY":"AKSHAY","PUTHYANGADI":"AKSHAY","VNC/VAY/LM1":"AKSHAY","EDAPPAL":"Deepak E","GURUVAYUR":"Deepak E","MPM/VGR/LM1":"Deepak E","PERINTHALMANNA":"Deepak E","PNT/PNT/LM1":"Deepak E","TIRUR":"Deepak E","ADR/ADR/LM1":"Harikrishna S G","ATL/KTD/LM1":"Harikrishna S G","EDAVA":"Harikrishna S G","KOLLAM":"Harikrishna S G","TRV/KNA":"Harikrishna S G","TRV/TRV":"Harikrishna S G","MANANTHAVADY":"Jagath Bahadur","CALICUT":"Jagath Bahadur","CALICUT2":"Jagath Bahadur","MANJERY":"Jagath Bahadur","MDY/TPZ/LM1":"Jagath Bahadur","SBT/DPK/LM1":"Jagath Bahadur","THALASSERY":"Jagath Bahadur","ADIMALI":"Jithin K A","EDAKUNNAM":"Jithin K A","ERATTUPETTA":"Jithin K A","KOTTARAKKARA":"Jithin K A","MANNAR":"Jithin K A","MARAYOOR":"Jithin K A","MUPPATHADAM1":"Jithin K A","PALLIKKATHOD":"Jithin K A","PALLIPURAM":"Jithin K A","PATHANAPURAM":"Jithin K A","PUNALUR":"Jithin K A","RANNI1":"Jithin K A","SASTHAMCOTTA":"Jithin K A","THL/THA/LM1":"Jithin K A","CHE/MAV/LM1":"Jithin K A","MATTANCHERRY":"Jithin K A","THO/THA1/LM1":"Jithin K A","THALAYOLAPARAMBU":"Jithin K A","MUNNAR":"Jithin K A","KYP/KUY/LM1":"Jithin K A","ALANALLUR":"Jithin M S","DHEASHMANGALAM":"Jithin M S","EDAMUTTAM":"Jithin M S","GVR/KUM/LM1":"Jithin M S","KARAKURISSI":"Jithin M S","KERALASSERY":"Jithin M S","KUNNAMKULAM1":"Jithin M S","KUZHALMANNAM":"Jithin M S","MALA":"Jithin M S","MANALUR":"Jithin M S","NALLEPILLY":"Jithin M S","OLLUR":"Jithin M S","OTTUPARA":"Jithin M S","PUTHUCODE":"Jithin M S","RAMAVARMAPURAM":"Jithin M S","TRIPRAYAR":"Jithin M S","PGT/ERL/LM1":"Jithin M S","KGD/PGM/LM1":"Jithu Gopal","OTTAPALAM":"Jithu Gopal","PALAKKAD":"Jithu Gopal","POOCHETTY-TML":"Jithu Gopal","TRICHUR":"Jithu Gopal","TRS/PCD/LM1":"Jithu Gopal","KASARGODE":"Kiran K V","KNR/KPU/LM":"Kiran K V","KNR/MTR/LM":"Kiran K V","KSR/NER/LM1":"Kiran K V","KSR/RAJ/LM1":"Kiran K V","PAYYANNUR":"Kiran K V","ALAKODE":"Muhammed Fasil","BAKKALAM":"Muhammed Fasil","BALUSSERY":"Muhammed Fasil","CHE/KSR/LM1":"Muhammed Fasil","EZHOME":"Muhammed Fasil","KALLACHI":"Muhammed Fasil","KAN/KSR/LM1":"Muhammed Fasil","KODANCHERY":"Muhammed Fasil","MAYYIL":"Muhammed Fasil","NADUVIL":"Muhammed Fasil","PAPPINISSERI":"Muhammed Fasil","TRI/KSR/LM1":"Muhammed Fasil","VALIYANNUR":"Muhammed Fasil","COK/COK":"VISHAL","ETM/ETM/LM1":"VISHAL","KOTTAYAM":"VISHAL","PALA":"VISHAL","THODUPUZHA":"VISHAL","THP/KTM/LM1":"VISHAL","THP/KTP":"VISHAL","TRIPPUNITHURA":"VISHAL","ALLAPEY":"VISHAL-TEMP CL","CLA/CLA/LM1":"VISHAL-TEMP CL","CLA/CRL/LM1":"VISHAL-TEMP CL","CNY/CGY/LM":"VISHAL-TEMP CL","MAVELIKERA":"VISHAL-TEMP CL","PMT/PDM/LM1":"VISHAL-TEMP CL","PMT/PMT/LM1":"VISHAL-TEMP CL","AGM/AGM/LM1":"Yoonus E","AWY/AWY/LM1":"Yoonus E","COK/CHN/LM1":"Yoonus E","COK/EKC":"Yoonus E","EKM/VPN/LM1":"Yoonus E","NORTH PARAVUR":"Yoonus E","PVR/PKP":"Yoonus E"};
const XLSX=require("xlsx");
const express=require("express");
const multer=require("multer");
const fs=require("fs");
const path=require("path");

const app=express();
app.use(express.json({limit:"150mb"}));
const PORT=process.env.PORT||8080;
const DATA_DIR=process.env.DATA_DIR||path.join(__dirname,"data");
fs.mkdirSync(DATA_DIR,{recursive:true});
if(!fs.existsSync(keyPath("cluster-matrix-mapping.json"))){fs.writeFileSync(keyPath("cluster-matrix-mapping.json"),JSON.stringify({mapping:DEFAULT_CLUSTER_MAPPING,updatedAt:new Date().toISOString()}));}
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:100*1024*1024}});

function keyPath(key){return path.join(DATA_DIR,key.replace(/[^a-zA-Z0-9._-]/g,"_"));}
function save(name,buf,contentType,filename){
  fs.writeFileSync(keyPath(name),buf);
  fs.writeFileSync(keyPath(name+".meta.json"),JSON.stringify({contentType,filename,updatedAt:new Date().toISOString()}));
}
function send(name,res,header){
  const p=keyPath(name);
  if(!fs.existsSync(p))return res.status(404).json({error:"not_found"});
  let meta={};
  try{meta=JSON.parse(fs.readFileSync(keyPath(name+".meta.json"),"utf8"))}catch{}
  res.setHeader("Content-Type",meta.contentType||"application/octet-stream");
  if(meta.filename)res.setHeader(header,meta.filename);
  res.send(fs.readFileSync(p));
}

app.get("/health",(req,res)=>res.json({ok:true}));
app.get("/api/status",(req,res)=>res.json({ok:true,service:"kerala-operations-dashboard",dataDir:DATA_DIR,version:"central-mapping-v2"}));
app.get("/api/dashboard/status",(req,res)=>{
  const files=["dashboard","pdd-dashboard","processing-pending","cluster-matrix-mapping.json"];
  const out={};
  for(const name of files){const p=keyPath(name);out[name]={exists:fs.existsSync(p),updatedAt:null};try{const m=JSON.parse(fs.readFileSync(keyPath(name+".meta.json"),"utf8"));out[name].updatedAt=m.updatedAt}catch{}}
  res.json({ok:true,...out});
});
app.get("/api/cluster-matrix/status",(req,res)=>{
  const p=keyPath("cluster-matrix-mapping.json");
  if(!fs.existsSync(p))return res.json({ok:true,locations:0,updatedAt:null});
  try{const x=JSON.parse(fs.readFileSync(p,"utf8"));return res.json({ok:true,locations:Object.keys(x.mapping||{}).length,updatedAt:x.updatedAt||null})}catch(e){return res.status(500).json({error:"mapping_read_failed"})}
});

app.post("/api/dashboard/upload",upload.single("file"),(req,res)=>{
  if(!req.file)return res.status(400).json({error:"No file received. Please select an Excel file."});
  save("dashboard",req.file.buffer,req.file.mimetype,req.file.originalname);
  res.json({ok:true,filename:req.file.originalname,size:req.file.size,updatedAt:new Date().toISOString()});
});
app.get("/api/dashboard/latest",(req,res)=>send("dashboard",res,"X-Dashboard-Filename"));

app.post("/api/pdd/upload",upload.single("file"),(req,res)=>{
  if(!req.file)return res.status(400).json({error:"file_required"});
  save("pdd-dashboard",req.file.buffer,req.file.mimetype,req.file.originalname);
  res.json({ok:true,filename:req.file.originalname,size:req.file.size,updatedAt:new Date().toISOString()});
});
app.get("/api/pdd/latest",(req,res)=>send("pdd-dashboard",res,"X-PDD-Filename"));

app.post("/api/processing/upload",upload.single("file"),(req,res)=>{
  if(!req.file)return res.status(400).json({error:"file_required"});
  save("processing-pending",req.file.buffer,req.file.mimetype,req.file.originalname);
  res.json({ok:true,filename:req.file.originalname,size:req.file.size,updatedAt:new Date().toISOString()});
});
app.get("/api/processing/latest",(req,res)=>send("processing-pending",res,"X-Processing-Filename"));

app.post("/api/cluster-matrix/mapping",express.json({limit:"10mb"}),(req,res)=>{
  const mapping=req.body&&req.body.mapping;
  if(!mapping || typeof mapping!=="object" || Array.isArray(mapping) || !Object.keys(mapping).length)return res.status(400).json({error:"mapping_required"});
  fs.writeFileSync(keyPath("cluster-matrix-mapping.json"),JSON.stringify({mapping,updatedAt:new Date().toISOString()}));
  res.json({ok:true,locations:Object.keys(mapping).length,updatedAt:new Date().toISOString()});
});
app.get("/api/cluster-matrix/mapping",(req,res)=>{
  const p=keyPath("cluster-matrix-mapping.json");
  if(!fs.existsSync(p))return res.status(404).json({error:"not_found"});
  res.json(JSON.parse(fs.readFileSync(p,"utf8")));
});

app.post("/api/cluster-matrix/upload-json",(req,res)=>{
  if(!req.body || !req.body.data)return res.status(400).json({error:"file_required"});
  try{
    const buf=Buffer.from(req.body.data,"base64");
    if(!buf.length)return res.status(400).json({error:"file_required"});
    const filename=String(req.body.filename||"cluster-matrix.xlsx");
    save("cluster-matrix",buf,req.body.contentType||"application/octet-stream",filename);
    res.json({ok:true,filename,size:buf.length,updatedAt:new Date().toISOString()});
  }catch(e){res.status(400).json({error:"invalid_file"});}
});

app.post("/api/cluster-matrix/upload-raw",express.raw({type:"*/*",limit:"100mb"}),(req,res)=>{
  if(!req.body || !Buffer.isBuffer(req.body) || !req.body.length)return res.status(400).json({error:"No file data received. Please select an Excel file."});
  const filename=String(req.headers["x-file-name"]||"cluster-matrix.xlsx");
  save("cluster-matrix",req.body,req.headers["content-type"]||"application/octet-stream",filename);
  res.json({ok:true,filename,size:req.body.length,updatedAt:new Date().toISOString()});
});

app.post("/api/cluster-matrix/import",upload.single("file"),(req,res)=>{
  if(!req.file)return res.status(400).json({error:"file_required"});
  try{
    const wb=XLSX.read(req.file.buffer,{type:"buffer"});
    const ws=wb.Sheets[wb.SheetNames[0]];
    const data=XLSX.utils.sheet_to_json(ws,{defval:""});
    if(!data.length)return res.status(400).json({error:"empty_file"});
    const hs=Object.keys(data[0]);
    const normH=x=>String(x??"").trim().toLowerCase().replace(/[_\-]+/g," ").replace(/\s+/g," ");
    const hc=hs.find(h=>["hub name","hub","location","location name"].includes(normH(h)))||hs.find(h=>normH(h).includes("hub"));
    const cc=hs.find(h=>["cluster name","cluster"].includes(normH(h)))||hs.find(h=>normH(h).includes("cluster"));
    if(!hc||!cc)return res.status(400).json({error:"Need HUB NAME and CLUSTER NAME columns"});
    const mapping={};
    data.forEach(r=>{
      const hub=String(r[hc]??"").trim().toUpperCase();
      const cluster=String(r[cc]??"").trim();
      if(hub&&cluster)mapping[hub]=cluster;
    });
    if(!Object.keys(mapping).length)return res.status(400).json({error:"No location/cluster mappings found"});
    fs.writeFileSync(keyPath("cluster-matrix-mapping.json"),JSON.stringify({mapping,updatedAt:new Date().toISOString()}));
    res.json({ok:true,locations:Object.keys(mapping).length,filename:req.file.originalname,updatedAt:new Date().toISOString()});
  }catch(e){res.status(400).json({error:"Could not read the Excel file: "+e.message});}
});
app.post("/api/cluster-matrix/upload",upload.any(),(req,res)=>{
  try{
    const file=(req.files&&req.files[0])||null;
    if(!file)return res.status(400).json({error:"No file received. Please select an Excel or CSV matrix file."});
    const wb=XLSX.read(file.buffer,{type:"buffer"});
    const ws=wb.Sheets[wb.SheetNames[0]];
    const data=XLSX.utils.sheet_to_json(ws,{defval:""});
    if(!data.length)return res.status(400).json({error:"empty_file"});
    const hs=Object.keys(data[0]);
    const normH=x=>String(x??"").trim().toLowerCase().replace(/[_\\-]+/g," ").replace(/\\s+/g," ");
    const hc=hs.find(h=>["hub name","hub","location","location name"].includes(normH(h)))||hs.find(h=>normH(h).includes("hub"));
    const cc=hs.find(h=>["cluster name","cluster"].includes(normH(h)))||hs.find(h=>normH(h).includes("cluster"));
    if(!hc||!cc)return res.status(400).json({error:"Need HUB NAME and CLUSTER NAME columns"});
    const mapping={};
    data.forEach(row=>{
      const hub=String(row[hc]??"").trim().toUpperCase();
      const cluster=String(row[cc]??"").trim();
      if(hub&&cluster)mapping[hub]=cluster;
    });
    if(!Object.keys(mapping).length)return res.status(400).json({error:"No location/cluster mappings found"});
    save("cluster-matrix",file.buffer,file.mimetype,file.originalname);
    fs.writeFileSync(keyPath("cluster-matrix-mapping.json"),JSON.stringify({mapping,updatedAt:new Date().toISOString()}));
    res.json({ok:true,filename:file.originalname,size:file.size,locations:Object.keys(mapping).length,updatedAt:new Date().toISOString()});
  }catch(e){res.status(400).json({error:"Could not read the Cluster Matrix file: "+e.message});}
});
app.get("/api/cluster-matrix/latest",(req,res)=>send("cluster-matrix",res,"X-Cluster-Matrix-Filename"));

app.get("/matrix-manager",(req,res)=>{res.setHeader("Cache-Control","no-store");res.send(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cluster Matrix Manager</title><script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script><style>body{font-family:Arial;background:#f3f6fa;margin:0;color:#172033}.top{background:linear-gradient(135deg,#0f3b78,#174ea6,#176b87);color:#fff;padding:20px 28px}.wrap{max-width:1100px;margin:auto;padding:22px}.card{background:#fff;border:1px solid #dbe3ee;border-radius:12px;padding:18px;margin-bottom:16px;box-shadow:0 2px 10px #0000000d}.actions{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}button{border:0;border-radius:7px;padding:10px 14px;font-weight:700;cursor:pointer;background:#174ea6;color:#fff}button.alt{background:#eef4ff;color:#174ea6}button.danger{background:#fee2e2;color:#b91c1c}.search{width:100%;box-sizing:border-box;height:40px;border:1px solid #d0d5dd;border-radius:7px;padding:0 10px;margin:8px 0 12px}.table{max-height:620px;overflow:auto;border:1px solid #e4e9f0;border-radius:8px}table{width:100%;border-collapse:collapse}th,td{padding:8px;border-bottom:1px solid #eef0f3;text-align:left}th{position:sticky;top:0;background:#f8fafc}input.cell{width:100%;box-sizing:border-box;border:1px solid #d0d5dd;border-radius:5px;padding:8px}#msg{font-size:13px;color:#667085}.hint{font-size:12px;color:#667085;line-height:1.5}</style></head><body><div class="top"><b style="font-size:22px">Cluster Matrix Manager</b><div style="font-size:12px;margin-top:4px">Edit Location → Cluster mapping directly. Changes are shared with all dashboard users.</div></div><div class="wrap"><div class="card"><div class="actions"><button onclick="addRow()">+ Add Location</button><button class="alt" onclick="document.getElementById('file').click()">Import Excel / CSV</button><button class="alt" onclick="downloadTemplate()">Download Template</button><button onclick="save()">Save Matrix</button><button class="alt" onclick="location.href='/'">Back to Dashboard</button></div><input id="file" type="file" accept=".xlsx,.xls,.csv" style="display:none"><input id="search" class="search" placeholder="Search location or cluster..." oninput="render()"><div id="msg">Loading current matrix...</div><div class="table"><table><thead><tr><th style="width:45%">LOCATION / HUB</th><th style="width:45%">CLUSTER</th><th style="width:10%">ACTION</th></tr></thead><tbody id="body"></tbody></table></div><div class="hint">Recommended Excel format: <b>HUB NAME</b> and <b>CLUSTER NAME</b>. You can also edit/add individual mappings here without preparing an Excel file.</div></div></div><script>let map={};let rows=[];const norm=x=>String(x??'').trim().toLowerCase().replace(/[_\\-]+/g,' ').replace(/\\s+/g,' ');async function load(){try{const r=await fetch('/api/cluster-matrix/mapping',{cache:'no-store'});const x=await r.json();map=x.mapping||{};rows=Object.entries(map).map(([location,cluster])=>({location,cluster}));document.getElementById('msg').textContent=rows.length+' mappings loaded.';render()}catch(e){document.getElementById('msg').textContent='Could not load matrix: '+e.message}}function render(){const q=document.getElementById('search').value.trim().toLowerCase();const b=document.getElementById('body');b.innerHTML='';rows.forEach((r,i)=>{if(q&&!((r.location+' '+r.cluster).toLowerCase().includes(q)))return;const tr=document.createElement('tr');tr.innerHTML='<td><input class="cell" value="'+esc(r.location)+'" onchange="rows['+i+'].location=this.value"></td><td><input class="cell" value="'+esc(r.cluster)+'" onchange="rows['+i+'].cluster=this.value"></td><td><button class="danger" onclick="rows.splice('+i+',1);render()">Delete</button></td>';b.appendChild(tr)})}function esc(x){return String(x).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}function addRow(){rows.push({location:'',cluster:''});render();document.getElementById('body').lastElementChild?.scrollIntoView()}async function save(){const out={};for(const r of rows){const k=String(r.location||'').trim().toUpperCase(),v=String(r.cluster||'').trim();if(k&&v)out[k]=v}if(!Object.keys(out).length){alert('Add at least one location and cluster.');return}document.getElementById('msg').textContent='Saving...';const r=await fetch('/api/cluster-matrix/mapping',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mapping:out})});const x=await r.json();if(!r.ok||!x.ok){document.getElementById('msg').textContent='Save failed: '+(x.error||r.status);return}map=out;rows=Object.entries(out).map(([location,cluster])=>({location,cluster}));document.getElementById('msg').textContent='Saved successfully: '+x.locations+' mappings shared with the dashboard.';render()}function downloadTemplate(){const data=[['HUB NAME','CLUSTER NAME'],...rows.map(r=>[r.location,r.cluster])];const wb=XLSX.utils.book_new(),ws=XLSX.utils.aoa_to_sheet(data);XLSX.utils.book_append_sheet(wb,ws,'Cluster Matrix');XLSX.writeFile(wb,'cluster_matrix_template.xlsx')}document.getElementById('file').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{document.getElementById('msg').textContent='Uploading '+f.name+'...';const fd=new FormData();fd.append('file',f);const r=await fetch('/api/cluster-matrix/import',{method:'POST',body:fd});const x=await r.json();if(!r.ok||!x.ok)throw Error(x.error||'Upload failed');map=x.mapping||map;await load();document.getElementById('msg').textContent='Uploaded and saved successfully: '+x.locations+' mappings shared with the dashboard.'}catch(e){document.getElementById('msg').textContent='Upload failed: '+e.message}e.target.value=''}load();<\/script></body></html>`)});
app.get("/matrix-upload",(req,res)=>{res.setHeader("Cache-Control","no-store");res.send(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cluster Matrix Mapper</title><script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"><\/script></head><body style="font-family:Arial;padding:40px;background:#f5f7fb"><div style="max-width:700px;margin:auto;background:white;padding:30px;border-radius:12px"><h2>Cluster Matrix Mapper</h2><p>Select the Excel containing <b>HUB NAME</b> and <b>CLUSTER NAME</b>. The file will be read locally and the mapping will be saved for all dashboard users.</p><input id="file" type="file" accept=".xlsx,.xls,.csv"><br><br><button id="go" style="padding:12px 20px;background:#174ea6;color:white;border:0;border-radius:7px;font-weight:bold">Map Locations to Clusters</button><p id="msg"></p><a href="/">Return to dashboard</a></div><script>document.getElementById("go").onclick=async()=>{const f=document.getElementById("file").files[0],m=document.getElementById("msg");if(!f){m.textContent="Please select the matrix Excel file.";return}try{m.textContent="Reading matrix...";const wb=XLSX.read(await f.arrayBuffer(),{type:"array"}),ws=wb.Sheets[wb.SheetNames[0]],rows=XLSX.utils.sheet_to_json(ws,{defval:""}),hs=rows.length?Object.keys(rows[0]):[],norm=x=>String(x??"").trim().toLowerCase().replace(/[_\\-]+/g," ").replace(/\\s+/g," "),hc=hs.find(h=>["hub name","hub","location","location name"].includes(norm(h)))||hs.find(h=>norm(h).includes("hub")),cc=hs.find(h=>["cluster name","cluster"].includes(norm(h)))||hs.find(h=>norm(h).includes("cluster"));if(!hc||!cc)throw new Error("Could not find HUB NAME and CLUSTER NAME columns.");const mapping={};rows.forEach(r=>{const hub=String(r[hc]??"").trim().toUpperCase(),cl=String(r[cc]??"").trim();if(hub&&cl)mapping[hub]=cl});if(!Object.keys(mapping).length)throw new Error("No location/cluster mappings found.");m.textContent="Saving "+Object.keys(mapping).length+" location mappings...";const r=await fetch("/api/cluster-matrix/mapping",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({mapping})}),x=await r.json();if(!r.ok||!x.ok)throw new Error(x.error||"Save failed");m.style.color="green";m.innerHTML="<b>Success!</b> "+x.locations+" locations mapped to clusters and shared with the dashboard."; }catch(e){m.style.color="red";m.textContent="Error: "+e.message}};<\/script></body></html>`)});
app.get("/",(req,res)=>{res.setHeader("Cache-Control","no-store, no-cache, must-revalidate");res.sendFile(path.join(__dirname,"public","index.html"));});
app.get("/v2",(req,res)=>{res.redirect(302,"/");});
app.get("/cluster-matrix",(req,res)=>{res.redirect(302,"/cluster-matrix-manager");});
app.get("/cluster-matrix-manager",(req,res)=>{res.setHeader("Cache-Control","no-store");res.send(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cluster Matrix</title><style>body{font-family:Arial,sans-serif;background:#f3f6fa;margin:0;color:#172033}.top{background:linear-gradient(135deg,#0f3b78,#174ea6,#176b87);color:#fff;padding:22px 28px}.wrap{max-width:900px;margin:35px auto;padding:0 20px}.card{background:#fff;border:1px solid #dbe3ee;border-radius:12px;padding:28px;box-shadow:0 2px 12px rgba(16,24,40,.08)}h1{margin:0;font-size:24px}p{color:#667085;line-height:1.5}.drop{border:2px dashed #9db7d9;border-radius:10px;padding:35px;text-align:center;margin:20px 0;background:#f8fbff}.btn{border:0;border-radius:7px;padding:11px 18px;background:#174ea6;color:#fff;font-weight:700;cursor:pointer}.btn.alt{background:#eef4ff;color:#174ea6}.status{margin-top:18px;font-size:14px;font-weight:600}.ok{color:#087443}.err{color:#b42318}.meta{background:#f8fafc;padding:14px;border-radius:8px;margin-top:18px;font-size:13px}</style></head><body><div class="top"><h1>Cluster Matrix</h1><div style="margin-top:5px;font-size:13px">Central Location → Cluster mapping used by all dashboard modules</div></div><div class="wrap"><div class="card"><h2>Upload Cluster Matrix</h2><p>Upload your standard Excel or CSV file. Supported formats: <b>XLSX, XLS, XLSM, CSV</b>.</p><p>The system automatically detects columns such as <b>HUB NAME / HUB / LOCATION</b> and <b>CLUSTER NAME / CLUSTER</b>.</p><div class="drop"><input id="file" type="file" accept=".xlsx,.xls,.xlsm,.csv,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel.sheet.macroEnabled.12" style="display:none"><button class="btn" onclick="document.getElementById('file').click()">Choose Matrix File</button><div id="name" style="margin-top:12px;color:#667085">No file selected</div></div><button id="upload" class="btn" style="width:100%" disabled>Upload & Save Matrix</button><div id="status" class="status">Ready.</div><div id="meta" class="meta">The saved matrix is shared centrally with Aging, PDD and Processing Pending dashboards.</div><div style="display:flex;gap:10px;margin-top:20px"><button class="btn alt" onclick="location.href='/'">Back to Dashboard</button></div></div></div><script>const file=document.getElementById('file'),upload=document.getElementById('upload'),name=document.getElementById('name'),status=document.getElementById('status');file.onchange=()=>{const f=file.files[0];name.textContent=f?f.name+' ('+Math.round(f.size/1024)+' KB)':'No file selected';upload.disabled=!f};upload.onclick=async()=>{const f=file.files[0];if(!f)return;upload.disabled=true;status.className='status';status.textContent='Uploading and processing '+f.name+'...';try{const fd=new FormData();fd.append('file',f);const r=await fetch('/api/cluster-matrix/import',{method:'POST',body:fd});const x=await r.json();if(!r.ok||!x.ok)throw new Error(x.error||('HTTP '+r.status));status.className='status ok';status.textContent='Success — '+x.locations+' location mappings saved and shared with the dashboard.'}catch(e){status.className='status err';status.textContent='Upload failed — '+e.message}finally{upload.disabled=false}};</script></body></html>`)});
app.use(express.static(path.join(__dirname,"public"),{setHeaders:(res)=>res.setHeader("Cache-Control","no-store")}));
app.use((req,res)=>{res.setHeader("Cache-Control","no-store");res.sendFile(path.join(__dirname,"public","index.html"));});

app.listen(PORT,"0.0.0.0",()=>console.log("Kerala Operations Dashboard listening on "+PORT));
