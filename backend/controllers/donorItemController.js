import DonorItem from "../models/DonorItem.js";

/* 1️⃣ Create Donor Item */
export const createDonorItem = async (req, res) => {
  try {
    const { item_name, quantity_submitted, category } = req.body;

    const item = await DonorItem.create({
      donor_id: req.user.id, // 🔥 from auth middleware
      item_name,
      quantity_submitted,
      category,
    });

    res.status(201).json({ success: true, item });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* 2️⃣ Get All Donor Items */
export const getAllDonorItems = async (req, res) => {
  try {
    const items = await DonorItem.find();

    res.status(200).json({ success: true, data: items });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* 3️⃣ Get Donor Items By Donor ID */
export const getDonorItemsByDonorId = async (req, res) => {
  try {
    const items = await DonorItem.find({
      donor_id: req.params.donorId,
    });

    res.status(200).json({ success: true, data: items });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* 4️⃣ Get Single Donor Item */
export const getDonorItemById = async (req, res) => {
  try {
    const item = await DonorItem.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ message: "Donor item not found" });
    }

    res.status(200).json({ success: true, data: item });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};