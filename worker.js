const jsonHeaders={"Content-Type":"application/json","Cache-Control":"no-store"};
const MAX=24*1024*1024;
function cors(h=new Headers()){h.set("Access-Control-Allow-Origin","*");h.set("Access-Control-Allow-Methods","GET,POST,OPTIONS");h.set("Access-Control-Allow-Headers","Content-Type,X-File-Name");return h}
function j(data,status=200){return new Response(JSON.stringify(data),{status,headers:cors(new Headers(jsonHeaders))})}
async function saveFile(env,name,request){
  if(!env.DATA)return j({ok:false,error:"Storage is not connected. Add a Cloudflare KV binding named DATA in Bindings."},503);
  const form=await request.formData(); const file=form.get("file");
  if(!file || typeof file.arrayBuffer!=="function")return j({ok:false,error:"No file received."},400);
  const buf=await file.arrayBuffer(); if(buf.byteLength>MAX)return j({ok:false,error:"File is larger than the Cloudflare free storage limit (24 MB)."},413);
  const filename=String(file.name||"upload.xlsx"); const contentType=String(file.type||"application/octet-stream");
  const meta={filename,contentType,size:buf.byteLength,updatedAt:new Date().toISOString()};
  await env.DATA.put("file:"+name,buf); await env.DATA.put("meta:"+name,JSON.stringify(meta));
  return j({ok:true,...meta});
}
async function latestFile(env,name,header){
  if(!env.DATA)return j({ok:false,error:"Storage is not connected."},503);
  const value=await env.DATA.get("file:"+name,"arrayBuffer"); if(!value)return j({ok:false,error:"not_found"},404);
  let meta={}; try{meta=JSON.parse(await env.DATA.get("meta:"+name)||"{}")}catch{}
  const h=cors(new Headers()); h.set("Content-Type",meta.contentType||"application/octet-stream"); h.set("Cache-Control","no-store"); if(meta.filename)h.set(header,meta.filename);
  return new Response(value,{headers:h});
}
async function mapping(env,method,request){
  if(!env.DATA)return j({ok:false,error:"Storage is not connected."},503);
  if(method==="GET"){const raw=await env.DATA.get("cluster-matrix"); if(!raw)return j({}); try{return j(JSON.parse(raw))}catch{return j({})}}
  const body=await request.json(); const input=body&&body.mapping&&typeof body.mapping==="object"?body.mapping:{}; const out={};
  for(const [k,v] of Object.entries(input)){const key=String(k??"").trim().toUpperCase(),cl=String(v??"").trim();if(key&&cl)out[key]=cl}
  if(!Object.keys(out).length)return j({ok:false,error:"At least one valid Location → Cluster mapping is required."},400);
  const updatedAt=new Date().toISOString(); await env.DATA.put("cluster-matrix",JSON.stringify(out)); await env.DATA.put("meta:cluster-matrix",JSON.stringify({locations:Object.keys(out).length,clusters:new Set(Object.values(out)).size,updatedAt}));
  return j({ok:true,locations:Object.keys(out).length,clusters:new Set(Object.values(out)).size,updatedAt,mapping:out});
}
export default {async fetch(request,env){
  if(request.method==="OPTIONS")return new Response(null,{status:204,headers:cors()});
  const url=new URL(request.url),p=url.pathname;
  try{
    if(p==="/health")return j({ok:true,service:"kerala-operations-dashboard",cloudflare:true});
    if(p==="/api/status")return j({ok:true,service:"kerala-operations-dashboard",storage:!!env.DATA});
    if(p==="/api/cluster-matrix/latest"||p==="/api/cluster-matrix/mapping"){if(p.endsWith("/latest"))return mapping(env,"GET",request);return mapping(env,"GET",request)}
    if(p==="/api/cluster-matrix/upload"||p==="/api/cluster-matrix/mapping")return mapping(env,"POST",request);
    if(p==="/api/dashboard/upload"&&request.method==="POST")return saveFile(env,"dashboard",request);
    if(p==="/api/pdd/upload"&&request.method==="POST")return saveFile(env,"pdd-dashboard",request);
    if(p==="/api/processing/upload"&&request.method==="POST")return saveFile(env,"processing-pending",request);
    if(p==="/api/dashboard/latest"&&request.method==="GET")return latestFile(env,"dashboard","X-Dashboard-Filename");
    if(p==="/api/pdd/latest"&&request.method==="GET")return latestFile(env,"pdd-dashboard","X-PDD-Filename");
    if(p==="/api/processing/latest"&&request.method==="GET")return latestFile(env,"processing-pending","X-Processing-Filename");
    if(p==="/api/cluster-matrix/status"){if(!env.DATA)return j({ok:true,locations:0,clusters:0,updatedAt:null});const raw=await env.DATA.get("cluster-matrix"),m=raw?JSON.parse(raw):{};return j({ok:true,locations:Object.keys(m).length,clusters:new Set(Object.values(m)).size,updatedAt:(JSON.parse(await env.DATA.get("meta:cluster-matrix")||"{}").updatedAt)||null})}
    if(p.startsWith("/api/"))return j({ok:false,error:"API route not found"},404);
    if(env.ASSETS)return env.ASSETS.fetch(request);
    return new Response("Kerala Operations Dashboard",{headers:cors(new Headers({"Content-Type":"text/plain; charset=utf-8"}))});
  }catch(e){return j({ok:false,error:e&&e.message?e.message:"Server error"},500)}
}};
