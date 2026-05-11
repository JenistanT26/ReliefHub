import mongoose from "mongoose";

const donorItemSchema = new mongoose.Schema({

  donor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  item_name: {
    type: String,
    required: true
  },

  category: String,

  quantity: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["available","reserved","donated","allocated"],
    default: "available"
  }

}, { timestamps: true });

export default mongoose.model("DonorItem", donorItemSchema);