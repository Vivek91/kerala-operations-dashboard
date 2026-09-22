import { storage } from "hatchable";
export const access = "public";
export const methods = ["GET"];
export default async function (req, res) {
  try {
    const item = await storage.get("shared/latest-dashboard");
    if (!item?.buffer) return res.status(404).json({error:"no_dataset"});
    res.setHeader("Content-Type", item.contentType || "application/octet-stream");
    try {
      const name = await storage.get("shared/latest-dashboard-name");
      if (name?.buffer) res.setHeader("X-Dashboard-Filename", new TextDecoder().decode(name.buffer));
    } catch (_) {}
    return res.send(item.buffer);
  } catch (e) { return res.status(404).json({error:"no_dataset"}); }
}