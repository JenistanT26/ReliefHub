// models/Request.js
import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  ngo_id: {
    type:String,
    required: true,
  },
  disaster_type :{
    type:String,
    enum: ["flood","earthquake","cyclone","fire","drought","landslide"]
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

  status: {
    type: String,
    enum: ["open", "matched", "fulfilled", "closed"],
    default: "open",
  },
},
{ timestamps: true }
);

requestSchema.index({ location: "2dsphere" });

export default mongoose.model("Request", requestSchema);