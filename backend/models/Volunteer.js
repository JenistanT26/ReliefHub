const volunteerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    availabilityStatus: {
      type: String,
      enum: ['available', 'unavailable', 'limited'],
      default: 'available',
    },
    experienceYear: {
      type: Number,
      default: 0,
      min: 0,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    location: {
      type: String,
      required: true,
    },
    // resetPasswordToken: String,
    // resetPasswordExpire: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
