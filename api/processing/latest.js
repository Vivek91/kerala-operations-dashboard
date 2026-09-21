import { storage } from "hatchable";
export const access = "public";
export const methods = ["GET"];
export default async function(req,res){
  try{
    const item=await storage.get("shared/processing-pending");
    if(!item?.buffer)return res.status(404).json({error:"no_processing"});
    res.setHeader("Content-Type",item.contentType||"application/octet-stream");
    try{
      const n=await storage.get("shared/processing-pending-name");
      if(n?.buffer)res.setHeader("X-Processing-Filename",new TextDecoder().decode(n.buffer));
    }catch(_){}
    return res.send(item.buffer);
  }catch(e){return res.status(404).json({error:"no_processing"});}
}