import { storage } from "hatchable";
export const access = "public";
export const methods = ["POST"];
export default async function(req,res){
  const f=req.files?.find(x=>x.field==="file")||req.files?.[0];
  if(!f?.buffer)return res.status(400).json({error:"file_required"});
  await storage.put("shared/processing-pending",f.buffer,f.contentType||"application/octet-stream");
  await storage.put("shared/processing-pending-name",new TextEncoder().encode(f.filename||"Latest Processing Pending data.xlsx"),"text/plain; charset=utf-8");
  return res.json({ok:true,filename:f.filename,size:f.buffer.length,updatedAt:new Date().toISOString()});
}