import axios from "axios";

export const computePriorityScore = async (request) => {

  const total_items = request.items.length;

  const is_medical = request.items.some(i => i.category === "Medical") ? 1 : 0;
  const is_water = request.items.some(i => i.name.toLowerCase().includes("water")) ? 1 : 0;

  const total_requested = request.items.reduce((sum, i) => sum + Number(i.quantity), 0);
  const total_fulfilled = request.items.reduce((sum, i) => sum + (i.quantity_fullfilled || 0), 0);

  const fulfillment_ratio = total_requested === 0 ? 0 : total_fulfilled / total_requested;

  const hours_since_creation = (Date.now() - new Date(request.createdAt)) / (1000 * 60 * 60);

  const urgencyMap = { low: 3, medium: 5, high: 7 };

  const payload = {
    urgency_level: urgencyMap[request.urgency_level],
    total_items,
    hours_since_creation,
    is_medical,
    is_water,
    fulfillment_ratio,
    distance_to_hub: 10, // TODO: compute properly
    disaster_type_earthquake: request.disaster_type === "Earthquake" ? 1 : 0,
    disaster_type_flood: request.disaster_type === "Flood" ? 1 : 0,
    disaster_type_volcano: request.disaster_type === "Volcano" ? 1 : 0
  };

  const res = await axios.post("http://localhost:5000/predict", payload);

  console.log(res.data.priority_score);

  return res.data.priority_score;
};