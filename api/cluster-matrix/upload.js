import { storage } from "hatchable";
export const access = "public";
export const methods = ["POST"];
export default async function (req,res){
  const body=req.body||{}; if(!body.mapping||typeof body.mapping!=="object") return res.status(400).json({error:"mapping_required"});
  await storage.put("shared/cluster-matrix",new TextEncoder().encode(JSON.stringify(body.mapping)),"application/json");
  return res.json({ok:true,locations:Object.keys(body.mapping).length,updatedAt:new Date().toISOString()});
}