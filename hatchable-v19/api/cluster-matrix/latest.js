import { storage } from "hatchable";
export const access = "public";
export const methods = ["GET"];
export default async function (req,res){
  try { const item=await storage.get("shared/cluster-matrix"); if(!item?.buffer)return res.status(404).json({error:"no_matrix"}); return res.json(JSON.parse(new TextDecoder().decode(item.buffer))); }
  catch(e){ return res.status(404).json({error:"no_matrix"}); }
}