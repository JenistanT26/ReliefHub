import mongoose from "mongoose";

const donationIntentSchema = new mongoose.Schema({

  donor_item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DonorItem",
    required: true
  },

  donor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DonorItem",
    required: true
  },

  request_item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RequestItem",
    required: true
  },

  relief_request_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
    required: true
  },

  quantity_offered: Number,

  status: {
    type: String,
    enum: [
      "pending",
      "approved",
      "rejected",
      "cancelled",
      "completed"
    ],
    default: "pending"
  },

  intent_type: {
    type: String,
    enum: ["manual","auto_match"],
    default: "manual"
  }

}, { timestamps: true });

export default mongoose.model("DonationIntent", donationIntentSchema);