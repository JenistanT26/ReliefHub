const volunteerRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requiredSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    persons: {
      type: Number,
      required: true,
      min: 1,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ngo',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('VolunteerRequest', volunteerRequestSchema);