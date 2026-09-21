import * as XLSX from "xlsx";

const json = (data, status=200) => new Response(JSON.stringify(data), {
  status, headers: {"content-type":"application/json; charset=utf-8","cache-control":"no-store"}
});
const keyFor = name => "datasets/" + name;

async function ensureDb(db){
  await db.prepare("CREATE TABLE IF NOT EXISTS cluster_mapping (location TEXT PRIMARY KEY, cluster TEXT NOT NULL, updated_at TEXT NOT NULL)").run();
}

async function getMapping(db){
  await ensureDb(db);
  const r = await db.prepare("SELECT location, cluster FROM cluster_mapping ORDER BY location").all();
  const mapping = {};
  for(const x of (r.results||[])) mapping[x.location] = x.cluster;
  return mapping;
}

async function saveMapping(db, mapping){
  await ensureDb(db);
  await db.prepare("DELETE FROM cluster_mapping").run();
  const now = new Date().toISOString();
  const statements = Object.entries(mapping).filter(([k,v])=>k&&v).map(([location,cluster]) =>
    db.prepare("INSERT INTO cluster_mapping(location,cluster,updated_at) VALUES(?,?,?)").bind(String(location).trim().toUpperCase(), String(cluster).trim(), now)
  );
  for(let i=0;i<statements.length;i+=50) await db.batch(statements.slice(i,i+50));
  return {locations:Object.keys(mapping).length, clusters:new Set(Object.values(mapping)).size, updatedAt:now};
}

function normalizeMapping(input){
  const out={};
  for(const [k,v] of Object.entries(input||{})){
    const location=String(k??"").trim().toUpperCase();
    const cluster=String(v??"").trim();
    if(location && cluster) out[location]=cluster;
  }
  return out;
}

function detectMatrixColumns(headers){
  const norm=x=>String(x??"").trim().toLowerCase().replace(/[_-]+/g," ").replace(/\s+/g," ");
  const loc=["location","location name","hub","hub name","hubname","hub code","hubcode","svc","rsc"];
  const cl=["cluster","cluster name","cluster_name"];
  return {
    location: headers.find(h=>loc.includes(norm(h))) || headers.find(h=>/hub|location|svc|rsc/.test(norm(h))),
    cluster: headers.find(h=>cl.includes(norm(h))) || headers.find(h=>norm(h).includes("cluster"))
  };
}

async function putDataset(env, name, file){
  const buf = await file.arrayBuffer();
  await env.DATASETS.put(keyFor(name), buf, {
    httpMetadata:{contentType:file.type || "application/octet-stream"},
    customMetadata:{filename:file.name || name, updatedAt:new Date().toISOString()}
  });
  return {filename:file.name || name, size:buf.byteLength, updatedAt:new Date().toISOString()};
}

async function getDataset(env, name){
  const obj=await env.DATASETS.get(keyFor(name));
  if(!obj) return null;
  const headers=new Headers();
  headers.set("content-type", obj.httpMetadata?.contentType || "application/octet-stream");
  headers.set("cache-control","no-store");
  headers.set("x-dashboard-filename", obj.customMetadata?.filename || name);
  return new Response(obj.body,{headers});
}

export async function onRequest(context){
  const {request,env}=context;
  const url=new URL(request.url);
  const path=url.pathname.replace(/^\/api\/?/,"");
  try{
    if(path==="health" || path==="status") return json({ok:true,service:"kerala-operations-dashboard-cloudflare"});
    if(path==="cluster-matrix/mapping" && request.method==="GET"){
      const mapping=await getMapping(env.DB);
      return json({mapping});
    }
    if(path==="cluster-matrix/status" && request.method==="GET"){
      const mapping=await getMapping(env.DB);
      return json({ok:true,locations:Object.keys(mapping).length,clusters:new Set(Object.values(mapping)).size});
    }
    if(path==="cluster-matrix/mapping" && request.method==="POST"){
      const body=await request.json();
      const mapping=normalizeMapping(body.mapping);
      if(!Object.keys(mapping).length) return json({ok:false,error:"At least one valid Location → Cluster mapping is required."},400);
      const stats=await saveMapping(env.DB,mapping);
      return json({ok:true,...stats,mapping});
    }
    if(path==="cluster-matrix/import" && request.method==="POST"){
      const form=await request.formData();
      const file=[...form.values()].find(x=>x instanceof File);
      if(!file) return json({ok:false,error:"No valid Cluster Mapping file was uploaded."},400);
      const wb=XLSX.read(await file.arrayBuffer(),{type:"array"});
      const ws=wb.Sheets[wb.SheetNames[0]];
      const data=XLSX.utils.sheet_to_json(ws,{defval:""});
      if(!data.length) return json({ok:false,error:"The uploaded Cluster Mapping file is empty."},400);
      const cols=detectMatrixColumns(Object.keys(data[0]));
      if(!cols.location || !cols.cluster) return json({ok:false,error:"Cluster Mapping needs a Location/Hub and Cluster column."},400);
      const mapping={};
      for(const row of data){
        const k=String(row[cols.location]??"").trim().toUpperCase();
        const v=String(row[cols.cluster]??"").trim();
        if(k&&v) mapping[k]=v;
      }
      const clean=normalizeMapping(mapping);
      if(!Object.keys(clean).length) return json({ok:false,error:"No valid Location → Cluster mappings were found."},400);
      const stats=await saveMapping(env.DB,clean);
      await putDataset(env,"cluster-matrix",file);
      return json({ok:true,...stats,mapping:clean,filename:file.name});
    }
    if(path==="cluster-matrix/latest" && request.method==="GET") return (await getDataset(env,"cluster-matrix")) || json({error:"not_found"},404);

    const uploads = {
      "dashboard/upload":"dashboard",
      "pdd/upload":"pdd-dashboard",
      "processing/upload":"processing-pending"
    };
    if(uploads[path] && request.method==="POST"){
      const form=await request.formData();
      const file=[...form.values()].find(x=>x instanceof File);
      if(!file) return json({error:"file_required"},400);
      return json({ok:true,...await putDataset(env,uploads[path],file)});
    }
    const latest = {
      "dashboard/latest":"dashboard",
      "pdd/latest":"pdd-dashboard",
      "processing/latest":"processing-pending"
    };
    if(latest[path] && request.method==="GET") return (await getDataset(env,latest[path])) || json({error:"not_found"},404);

    if(path==="dashboard/status" && request.method==="GET"){
      const out={};
      for(const [api,key] of Object.entries({dashboard:"dashboard",pdd:"pdd-dashboard",processing:"processing-pending",matrix:"cluster-matrix"})){
        const o=await env.DATASETS.head(keyFor(key));
        out[api]={exists:!!o,updatedAt:o?.customMetadata?.updatedAt||null};
      }
      return json({ok:true,...out});
    }
    return json({error:"not_found"},404);
  }catch(e){
    return json({ok:false,error:e?.message||"Server error"},500);
  }
}
