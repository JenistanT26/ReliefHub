const volunteerApplicationSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    message: {
      type: String,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Volunteer',
      required: true,
    },
    volunteerRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VolunteerRequest',
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure one application per volunteer per request
volunteerApplicationSchema.index({
  volunteerId: 1,
  volunteerRequestId: 1,
  unique: true,
});

module.exports = mongoose.model('VolunteerApplication', volunteerApplicationSchema);