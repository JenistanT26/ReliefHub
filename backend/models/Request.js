// models/Request.js
import mongoose from "mongoose";
// import "../models/ReqItem.js"
import './ReqItem.js'

const requestSchema = new mongoose.Schema({
  ngo_id: {
    type:String,
    required: true,
  },
  disaster_type :{
    type:String,
    enum: ["Flood","Earthquake","Cyclone","Fire","Drought","Landslide"]
  },

  description: {
    type: String,
    required: true,
  },

  urgency_level: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  request_code: {
    type: String,
    unique: true,
  },
  ai_priority_score:{
    type:Number
  },

  status: {
    type: String,
    enum: ["open", "matched", "fulfilled", "closed"],
    default: "open",
  },
},
{ timestamps: true }
);

requestSchema.index({ location: "2dsphere" });
requestSchema.virtual("items", {
  ref: "RequestItem",
  localField: "_id",
  foreignField: "request_id"
});

requestSchema.set("toObject", { virtuals: true });
requestSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Request", requestSchema);