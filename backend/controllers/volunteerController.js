import Volunteer from "../models/Volunteer.js";
import VolunteerAssignment from "../models/VolunteerAssignment.js";
import Request from "../models/Request.js";

// Helper to get or create a default volunteer for testing since we don't have auth yet
const getDefaultVolunteer = async () => {
  let volunteer = await Volunteer.findOne({ email: "volunteer@example.com" });
  if (!volunteer) {
    volunteer = await Volunteer.create({
      name: "Amit Singh",
      email: "volunteer@example.com",
      phone: "+91-9876543210",
      password: "password123",
      skills: ["Medical Aid", "Search & Rescue"],
      location: { type: "Point", coordinates: [77.5946, 12.9716] }, // Bangalore
      stats: {
        tasksCompleted: 24,
        activeTasks: 2,
        totalHours: 156,
        peopleHelped: 1240,
        reliefOperations: 12,
        rating: 4.9
      }
    });
  }
  return volunteer;
};

export const getVolunteerStats = async (req, res) => {
  try {
    const volunteer = await getDefaultVolunteer();
    res.status(200).json({ success: true, stats: volunteer.stats, volunteer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAvailableTasks = async (req, res) => {
  try {
    const volunteer = await getDefaultVolunteer();
    const [lng, lat] = volunteer.location.coordinates;

    // Find open requests nearby (within 50km)
    const requests = await Request.find({
      status: "open",
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: 50000, // 50km
        },
      },
    }).limit(10);

    // Add match score (mock logic for now)
    const tasksWithScore = requests.map((req, idx) => ({
      ...req.toObject(),
      matchScore: 90 - idx * 5, // Simple mock score
      skills: ["Medical Aid", "Distribution"] // Mock skills
    }));

    res.status(200).json({ success: true, tasks: tasksWithScore });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getVolunteerHistory = async (req, res) => {
  try {
    const volunteer = await getDefaultVolunteer();
    const history = await VolunteerAssignment.find({ volunteer_id: volunteer._id })
      .populate("request_id")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const acceptTask = async (req, res) => {
  try {
    const { requestId } = req.body;
    const volunteer = await getDefaultVolunteer();

    // Check if already assigned
    const existing = await VolunteerAssignment.findOne({
      volunteer_id: volunteer._id,
      request_id: requestId,
    });

    if (existing) {
      return res.status(400).json({ success: false, message: "Already assigned to this task" });
    }

    const assignment = await VolunteerAssignment.create({
      volunteer_id: volunteer._id,
      request_id: requestId,
      status: "assigned",
    });

    // Increment active tasks count
    await Volunteer.findByIdAndUpdate(volunteer._id, {
      $inc: { "stats.activeTasks": 1 }
    });

    res.status(201).json({ success: true, assignment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
