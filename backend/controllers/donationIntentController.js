import mongoose from "mongoose";
import DonationIntent from "../models/DonationIntent.js";
import DonorItem from "../models/DonorItem.js";
import ReqItem from "../models/ReqItem.js";

export const submitDonationIntent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { request_id, request_item_id, quantity } = req.body;

    const donorItem = await DonorItem.findById(req.params.itemId).session(session);

    if (!donorItem)
      return res.status(404).json({ message: "Donor item not found" });

    const remaining =
      donorItem.quantity_submitted - donorItem.quantity_committed;

    if (quantity > remaining)
      return res.status(400).json({ message: "Insufficient quantity" });

    const intent = await DonationIntent.create([{
      donor_item_id: donorItem._id,
      request_id,
      request_item_id,
      quantity_offered: quantity,
    }], { session });

    donorItem.quantity_committed += quantity;

    if (donorItem.quantity_committed === donorItem.quantity_submitted)
      donorItem.status = "fully_committed";
    else
      donorItem.status = "partially_committed";

    await donorItem.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Donation intent submitted",
      intent,
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
};

export const updateDonationIntentStatus = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { status } = req.body; // approved / rejected

    const intent = await DonationIntent.findById(req.params.id).session(session);
    if (!intent)
      return res.status(404).json({ message: "Intent not found" });

    if (status === "approved") {
      const requestItem = await ReqItem.findById(intent.request_item_id).session(session);

      requestItem.quantity -= intent.quantity_offered;
      await requestItem.save({ session });

      intent.status = "approved";
    }

    if (status === "rejected") {
      const donorItem = await DonorItem.findById(intent.donor_item_id).session(session);

      donorItem.quantity_committed -= intent.quantity_offered;
      donorItem.status = "available";
      await donorItem.save({ session });

      intent.status = "rejected";
    }

    await intent.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, intent });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
};