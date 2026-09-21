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

app.post("/api/cluster-matrix/mapping",express.json({limit:"10mb"}),(req,res)=>{\n  const mapping=req.body&&req.body.mapping;\n  if(!mapping || typeof mapping!=="object" || Array.isArray(mapping) || !Object.keys(mapping).length)return res.status(400).json({error:"mapping_required"});\n  fs.writeFileSync(keyPath("cluster-matrix-mapping.json"),JSON.stringify({mapping,updatedAt:new Date().toISOString()}));\n  res.json({ok:true,locations:Object.keys(mapping).length,updatedAt:new Date().toISOString()});\n});\napp.get("/api/cluster-matrix/mapping",(req,res)=>{\n  const p=keyPath("cluster-matrix-mapping.json");\n  if(!fs.existsSync(p))return res.status(404).json({error:"not_found"});\n  res.json(JSON.parse(fs.readFileSync(p,"utf8")));\n});\n\napp.post("/api/cluster-matrix/upload-json",(req,res)=>{\n  if(!req.body || !req.body.data)return res.status(400).json({error:"file_required"});\n  try{\n    const buf=Buffer.from(req.body.data,"base64");\n    if(!buf.length)return res.status(400).json({error:"file_required"});\n    const filename=String(req.body.filename||"cluster-matrix.xlsx");\n    save("cluster-matrix",buf,req.body.contentType||"application/octet-stream",filename);\n    res.json({ok:true,filename,size:buf.length,updatedAt:new Date().toISOString()});\n  }catch(e){res.status(400).json({error:"invalid_file"});}\n});\n\napp.post("/api/cluster-matrix/upload-raw",express.raw({type:"*/*",limit:"100mb"}),(req,res)=>{\n  if(!req.body || !Buffer.isBuffer(req.body) || !req.body.length)return res.status(400).json({error:"No file data received. Please select an Excel file."});\n  const filename=String(req.headers["x-file-name"]||"cluster-matrix.xlsx");\n  save("cluster-matrix",req.body,req.headers["content-type"]||"application/octet-stream",filename);\n  res.json({ok:true,filename,size:req.body.length,updatedAt:new Date().toISOString()});\n});\n\napp.post("/api/cluster-matrix/upload",upload.single("file"),(req,res)=>{
  if(!req.file)return res.status(400).json({error:"file_required"});
  save("cluster-matrix",req.file.buffer,req.file.mimetype,req.file.originalname);
  res.json({ok:true,filename:req.file.originalname,size:req.file.size,updatedAt:new Date().toISOString()});
});
app.get("/api/cluster-matrix/latest",(req,res)=>send("cluster-matrix",res,"X-Cluster-Matrix-Filename"));

app.get("/matrix-upload",(req,res)=>{res.setHeader("Cache-Control","no-store");res.send('<!doctype html><html><head><meta charset="utf-8"><title>Cluster Matrix Upload</title></head><body style="font-family:Arial;padding:40px"><h2>Cluster Matrix Upload</h2><p>Select the Excel containing HUB NAME / Location and CLUSTER NAME / Cluster.</p><form action="/api/cluster-matrix/upload-native" method="POST" enctype="multipart/form-data"><input type="file" name="file" accept=".xlsx,.xls,.csv" required><br><br><button type="submit">Upload Cluster Matrix</button></form></body></html>')});
app.post("/api/cluster-matrix/upload-native",upload.single("file"),(req,res)=>{if(!req.file)return res.status(400).send("No file received. Please select an Excel file.");try{const wb=XLSX.read(req.file.buffer,{type:"buffer"});const ws=wb.Sheets[wb.SheetNames[0]];const rows=XLSX.utils.sheet_to_json(ws,{defval:""});const hs=rows.length?Object.keys(rows[0]):[];const normH=x=>String(x||"").trim().toLowerCase().replace(/\\s+/g," ");const hc=hs.find(h=>["hub name","hub","location","location name"].includes(normH(h)))||hs.find(h=>normH(h).includes("hub"));const cc=hs.find(h=>["cluster name","cluster"].includes(normH(h)))||hs.find(h=>normH(h).includes("cluster"));if(!hc||!cc)return res.status(400).send("Matrix must contain HUB NAME / Location and CLUSTER NAME / Cluster columns.");const mapping={};rows.forEach(r=>{const hub=String(r[hc]??"").trim().toUpperCase(),cl=String(r[cc]??"").trim();if(hub&&cl)mapping[hub]=cl});if(!Object.keys(mapping).length)return res.status(400).send("No Hub/Cluster mappings found.");fs.writeFileSync(keyPath("cluster-matrix-mapping.json"),JSON.stringify({mapping,updatedAt:new Date().toISOString()}));save("cluster-matrix",req.file.buffer,req.file.mimetype,req.file.originalname);res.send("<h2 style='font-family:Arial;color:green'>Cluster Matrix uploaded successfully.</h2><p style='font-family:Arial'>"+Object.keys(mapping).length+" locations mapped and shared with the dashboard.</p><p><a href='/'>Return to dashboard</a></p>")}catch(e){res.status(500).send("Could not process the Excel file: "+e.message)}});
app.get("/v2",(req,res)=>{res.setHeader("Cache-Control","no-store, no-cache, must-revalidate");res.sendFile(path.join(__dirname,"public","index.html"));});
app.use(express.static(path.join(__dirname,"public"),{setHeaders:(res)=>res.setHeader("Cache-Control","no-store")}));
app.use((req,res)=>{res.setHeader("Cache-Control","no-store");res.sendFile(path.join(__dirname,"public","index.html"));});

app.listen(PORT,"0.0.0.0",()=>console.log("Kerala Operations Dashboard listening on "+PORT));
