import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    availability: {
      type: String,
      enum: ["Weekdays", "Weekends", "Anytime"],
      default: "Anytime",
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
    stats: {
      tasksCompleted: { type: Number, default: 0 },
      activeTasks: { type: Number, default: 0 },
      totalHours: { type: Number, default: 0 },
      peopleHelped: { type: Number, default: 0 },
      reliefOperations: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

volunteerSchema.index({ location: "2dsphere" });

export default mongoose.model("Volunteer", volunteerSchema);
