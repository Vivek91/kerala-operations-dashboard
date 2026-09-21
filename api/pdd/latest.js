import { storage } from "hatchable";
export const access = "public";
export const methods = ["GET"];
export default async function(req,res){try{const item=await storage.get("shared/pdd-dashboard");if(!item?.buffer)return res.status(404).json({error:"no_pdd"});res.setHeader("Content-Type",item.contentType||"application/octet-stream");try{const n=await storage.get("shared/pdd-dashboard-name");if(n?.buffer)res.setHeader("X-PDD-Filename",new TextDecoder().decode(n.buffer));}catch(_){}return res.send(item.buffer);}catch(e){return res.status(404).json({error:"no_pdd"});}}