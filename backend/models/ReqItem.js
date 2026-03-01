// models/RequestItem.js
import mongoose from "mongoose";

const requestItemSchema = new mongoose.Schema({
  request_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
    required: true,
  },

  item_name: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  
  status:{
    type:String,
    default:"Standard"
  },

  category: {
    type: String,
  },

  normalized_tags: {
    type: [String],
  },
},
{ timestamps: true }
);

export default mongoose.model("RequestItem", requestItemSchema);