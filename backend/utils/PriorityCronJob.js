import cron from "node-cron";
import Request from "../models/Request.js";
import { computePriorityScore } from "../utils/priorityEngine.js";

cron.schedule("*/10 * * * *", async () => {
  console.log("Recalculating priorities...");

  const requests = await Request.find({ status: "open" }).populate("items");

  for (let req of requests) {
    const transformedRequest = {
  ...req.body,
  items: items.map(item => ({
    name: item.name,
    category: item.category,
    quantity: Number(item.quantity),
    quantity_fullfilled: 0
  }))
};

    let score = 90;
    try {
      score = await computePriorityScore(transformedRequest);
    } catch (err) {
      console.error("ML error:", err.message);
    }
    req.ai_priority_score = score*10;
    await req.save();
  }
});