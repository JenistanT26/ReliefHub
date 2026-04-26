import DonationIntent from "../models/DonationIntent.js";
import DonorItem from "../models/DonorItem.js";
import ReqItem from "../models/ReqItem.js";
import mongoose from "mongoose";


/* 1️⃣ Create Donor Item */
export const createDonorItem = async (req, res) => {
  try {

    const { item_name, quantity, category, donorId } = req.body;

    const item = await DonorItem.create({
      donor_id: req.user?.id || donorId,
      item_name,
      category,
      quantity,
      status: "available"
    });

    res.status(201).json({
      success: true,
      data: item
    });

  } catch (error) {
    res.status(500).json({ success:false, error: error.message });
  }
};

/* 2️⃣ Get All Donor Items */
export const getAllDonorItems = async (req, res) => {
  try {

    const items = await DonorItem.find()
      .populate("donor_id");

    res.status(200).json({
      success: true,
      data: items
    });

  } catch (error) {
    res.status(500).json({ success:false, error: error.message });
  }
};

/* 3️⃣ Get All Donor Items */
export const getDonorItemsByDonorId = async (req, res) => {
  try {
    const items = await DonorItem.find({
      donor_id: req.params.donorId
    }).populate("donor_id");

    res.status(200).json({
      success: true,
      data: items
    });

  } catch (error) {
    res.status(500).json({ success:false, error: error.message });
  }
};

/* 4️⃣ Get Single Donor Item */
export const getDonorItemById = async (req, res) => {
  try {

    const item = await DonorItem.findById(req.params.itemId)
      .populate("donor_id");

    if (!item) {
      return res.status(404).json({
        success:false,
        message: "Donor item not found"
      });
    }

    res.status(200).json({
      success: true,
      data: item
    });

  } catch (error) {
    res.status(500).json({ success:false, error: error.message });
  }
};

/* 5️⃣ Submit Donation Intent for Manual */
export const submitDonationIntent = async (req, res) => {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const { donor_id, relief_request_id, donationItems } = req.body;

    if (!donationItems || donationItems.length === 0) {
      throw new Error("No donation items submitted");
    }

    /* Create Donor Items */
    const createdDonorItems = await DonorItem.insertMany(
      donationItems.map((item) => ({
        donor_id,
        item_name: item.item_name,
        category: item.category,
        quantity: item.quantity_submitted
      })),
      { session }
    );


    /* Create Donation Intents */
    const intents = await DonationIntent.insertMany(
      donationItems.map((item, index) => ({
        donor_id,
        donor_item_id: createdDonorItems[index]._id,
        request_item_id: item.request_item_id,
        relief_request_id,
        quantity_offered: item.quantity_submitted,
        status: "pending",
        intent_type: "manual"
      })),
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      donorItems: createdDonorItems,
      intents
    });

  } catch (error) {

    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success:false,
      error: error.message
    });
  }
};

/* 6️⃣ Get All Donation Intents */
export const getAllDonationIntents = async (req, res) => {
  try {

    const intents = await DonationIntent.find()
      .populate("donor_item_id")
      .populate("request_item_id")
      .populate("relief_request_id");

    res.status(200).json({
      success: true,
      data: intents
    });

  } catch (error) {
    res.status(500).json({ success:false, error: error.message });
  }
};

/* 7️⃣ Approve / Reject Donation Intent */
export const updateDonationIntentStatus = async (req, res) => {

  const session = await mongoose.startSession();
  session.startTransaction();

  try {

    const { status } = req.body;

    const intent = await DonationIntent
      .findById(req.params.id)
      .session(session);

    if (!intent) {
      throw new Error("Intent not found");
    }

    if (intent.status !== "pending") {
      throw new Error("Intent already processed");
    }

    const donorItem = await DonorItem
      .findById(intent.donor_item_id)
      .session(session);

    const requestItem = await ReqItem
      .findById(intent.request_item_id)
      .session(session);


    if (status === "approved") {

      if (donorItem.quantity < intent.quantity_offered) {
        throw new Error("Donor item quantity insufficient");
      }

      if (requestItem.quantity < intent.quantity_offered) {
        throw new Error("Request already fulfilled");
      }

      donorItem.quantity -= intent.quantity_offered;
      requestItem.quantity -= intent.quantity_offered;

      /* Update donor item status */
      if (donorItem.quantity === 0) {
        donorItem.status = "donated";
      }

      await donorItem.save({ session });
      await requestItem.save({ session });

      intent.status = "approved";
    }


    if (status === "rejected") {
      intent.status = "rejected";
    }


    await intent.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      data: intent
    });

  } catch (error) {

    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success:false,
      error: error.message
    });
  }
};

/* 8️⃣ Get Intents by Request */
export const getDonationIntentsByRequestId = async (req, res) => {
  try {

    const intents = await DonationIntent.find({
      relief_request_id: new mongoose.Types.ObjectId(req.params.id)
    })
      .populate("donor_item_id")

    res.status(200).json({
      success: true,
      data: intents
    });

  } catch (error) {
    res.status(500).json({ success:false, error: error.message });
  }
};

/* 9️⃣ Get Intents by Request Item */
export const getDonationIntentsByRequestItemId = async (req, res) => {
  try {

    const intents = await DonationIntent.find({
      request_item_id: req.params.requestItemId
    })
      .populate("donor_item_id")
      .populate("request_item_id");

    res.status(200).json({
      success: true,
      data: intents
    });

  } catch (error) {
    res.status(500).json({ success:false, error: error.message });
  }
};

/* 🔟 Get Intents by Donor */
export const getDonationIntentsByDonorId = async (req, res) => {
  try {

    const donorId = new mongoose.Types.ObjectId(req.params.donorId);
    const intents = await DonationIntent.find({
      donor_id: donorId
    })
      .populate("donor_item_id")
      .populate("request_item_id")
      .populate("relief_request_id")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: intents
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};