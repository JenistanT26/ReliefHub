import mongoose from "mongoose";

const volunteerAssignmentSchema = new mongoose.Schema(
  {
    volunteer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: true,
    },
    request_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
    status: {
      type: String,
      enum: ["assigned", "in-progress", "completed", "cancelled"],
      default: "assigned",
    },
    hours_logged: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    skill_used: {
      type: String,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("VolunteerAssignment", volunteerAssignmentSchema);
