const express=require("express");
const multer=require("multer");
const fs=require("fs");
const path=require("path");

const app=express();
app.use(express.json({limit:"150mb"}));
const PORT=process.env.PORT||8080;
const DATA_DIR=process.env.DATA_DIR||path.join(__dirname,"data");
fs.mkdirSync(DATA_DIR,{recursive:true});
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
  if(!req.file)return res.status(400).json({error:"file_required"});
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

app.post("/api/cluster-matrix/mapping",express.json({limit:"10mb"}),(req,res)=>{\n  const mapping=req.body&&req.body.mapping;\n  if(!mapping || typeof mapping!=="object" || Array.isArray(mapping) || !Object.keys(mapping).length)return res.status(400).json({error:"mapping_required"});\n  fs.writeFileSync(keyPath("cluster-matrix-mapping.json"),JSON.stringify({mapping,updatedAt:new Date().toISOString()}));\n  res.json({ok:true,locations:Object.keys(mapping).length,updatedAt:new Date().toISOString()});\n});\napp.get("/api/cluster-matrix/mapping",(req,res)=>{\n  const p=keyPath("cluster-matrix-mapping.json");\n  if(!fs.existsSync(p))return res.status(404).json({error:"not_found"});\n  res.json(JSON.parse(fs.readFileSync(p,"utf8")));\n});\n\napp.post("/api/cluster-matrix/upload-json",(req,res)=>{\n  if(!req.body || !req.body.data)return res.status(400).json({error:"file_required"});\n  try{\n    const buf=Buffer.from(req.body.data,"base64");\n    if(!buf.length)return res.status(400).json({error:"file_required"});\n    const filename=String(req.body.filename||"cluster-matrix.xlsx");\n    save("cluster-matrix",buf,req.body.contentType||"application/octet-stream",filename);\n    res.json({ok:true,filename,size:buf.length,updatedAt:new Date().toISOString()});\n  }catch(e){res.status(400).json({error:"invalid_file"});}\n});\n\napp.post("/api/cluster-matrix/upload-raw",express.raw({type:"*/*",limit:"100mb"}),(req,res)=>{\n  if(!req.body || !Buffer.isBuffer(req.body) || !req.body.length)return res.status(400).json({error:"file_required"});\n  const filename=String(req.headers["x-file-name"]||"cluster-matrix.xlsx");\n  save("cluster-matrix",req.body,req.headers["content-type"]||"application/octet-stream",filename);\n  res.json({ok:true,filename,size:req.body.length,updatedAt:new Date().toISOString()});\n});\n\napp.post("/api/cluster-matrix/upload",upload.single("file"),(req,res)=>{
  if(!req.file)return res.status(400).json({error:"file_required"});
  save("cluster-matrix",req.file.buffer,req.file.mimetype,req.file.originalname);
  res.json({ok:true,filename:req.file.originalname,size:req.file.size,updatedAt:new Date().toISOString()});
});
app.get("/api/cluster-matrix/latest",(req,res)=>send("cluster-matrix",res,"X-Cluster-Matrix-Filename"));

app.use(express.static(path.join(__dirname,"public"),{setHeaders:(res)=>res.setHeader("Cache-Control","no-store")}));
app.use((req,res)=>{res.setHeader("Cache-Control","no-store");res.sendFile(path.join(__dirname,"public","index.html"));});

app.listen(PORT,"0.0.0.0",()=>console.log("Kerala Operations Dashboard listening on "+PORT));
