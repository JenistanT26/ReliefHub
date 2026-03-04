// models/DonorItem.js
import mongoose from "mongoose";

const donorItemSchema = new mongoose.Schema(
{
  donor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    required: true,
  },

  item_name: {
    type: String,
    required: true,
  },

  quantity_submitted: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
  },
},
{ timestamps: true }
);

export default mongoose.model("DonorItem", donorItemSchema);