const volunteerAssignmentSchema = new mongoose.Schema(
  {
    assignmentStatus: {
      type: String,
      enum: ['assigned', 'completed', 'cancelled'],
      default: 'assigned',
    },
    assignedAt: {
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

module.exports = mongoose.model('VolunteerAssignment', volunteerAssignmentSchema);