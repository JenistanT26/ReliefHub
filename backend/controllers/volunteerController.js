// controllers/authController.js
const Ngo = require('../models/Ngo');
const Volunteer = require('../models/Volunteer');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// NGO Registration
exports.ngoRegister = async (req, res) => {
  try {
    const { ngoName, email, password, phoneNumber, address } = req.body;

    // Check if NGO already exists
    let ngo = await Ngo.findOne({ email });
    if (ngo) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Create NGO
    ngo = await Ngo.create({
      ngoName,
      email,
      password,
      phoneNumber,
      address,
    });

    const token = generateToken(ngo._id);

    res.status(201).json({
      success: true,
      token,
      ngo,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// NGO Login
exports.ngoLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide email and password' });
    }

    const ngo = await Ngo.findOne({ email }).select('+password');
    if (!ngo) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await ngo.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(ngo._id);

    res.status(200).json({
      success: true,
      token,
      ngo,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Volunteer Registration
exports.volunteerRegister = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, availabilityStatus, experienceYear, skills, location } = req.body;

    // Check if Volunteer already exists
    let volunteer = await Volunteer.findOne({ email });
    if (volunteer) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Create Volunteer
    volunteer = await Volunteer.create({
      fullname,
      email,
      password,
      phoneNumber,
      availabilityStatus,
      experienceYear,
      skills: Array.isArray(skills) ? skills : [skills],
      location,
    });

    const token = generateToken(volunteer._id);

    res.status(201).json({
      success: true,
      token,
      volunteer,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Volunteer Login
exports.volunteerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide email and password' });
    }

    const volunteer = await Volunteer.findOne({ email }).select('+password');
    if (!volunteer) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await volunteer.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(volunteer._id);

    res.status(200).json({
      success: true,
      token,
      volunteer,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Current User
exports.getCurrentUser = async (req, res) => {
  try {
    let user;
    if (req.user.model === 'ngo') {
      user = await Ngo.findById(req.user.id);
    } else {
      user = await Volunteer.findById(req.user.id);
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// controllers/volunteerRequestController.js
const VolunteerRequest = require('../models/VolunteerRequest');
const VolunteerApplication = require('../models/VolunteerApplication');
const VolunteerAssignment = require('../models/VolunteerAssignment');

// Get all open requests for volunteers
exports.getAllOpenRequests = async (req, res) => {
  try {
    const requests = await VolunteerRequest.find({ status: 'open' })
      .populate('ngoId', 'ngoName email phoneNumber address')
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get NGO's requests
exports.getNgoRequests = async (req, res) => {
  try {
    const requests = await VolunteerRequest.find({ ngoId: req.user.id })
      .populate({
        path: 'volunteerApplications',
        populate: { path: 'volunteerId', select: 'fullname email phoneNumber skills' },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single request
exports.getRequestById = async (req, res) => {
  try {
    const request = await VolunteerRequest.findById(req.params.id)
      .populate('ngoId', 'ngoName email phoneNumber address')
      .populate({
        path: 'volunteerApplications',
        populate: { path: 'volunteerId', select: 'fullname email phoneNumber skills location' },
      });

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create request (NGO)
exports.createRequest = async (req, res) => {
  try {
    const { title, description, requiredSkills, persons, location, date } = req.body;

    const request = await VolunteerRequest.create({
      title,
      description,
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [requiredSkills],
      persons,
      location,
      date: new Date(date),
      ngoId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: request,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update request (NGO)
exports.updateRequest = async (req, res) => {
  try {
    let request = await VolunteerRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Check ownership
    if (request.ngoId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const { title, description, requiredSkills, persons, location, date, status } = req.body;

    request = await VolunteerRequest.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : [requiredSkills],
        persons,
        location,
        date: date ? new Date(date) : request.date,
        status: status || request.status,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete request (NGO)
exports.deleteRequest = async (req, res) => {
  try {
    const request = await VolunteerRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Check ownership
    if (request.ngoId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await VolunteerRequest.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Request deleted',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// controllers/applicationController.js

// Volunteer: Create application
exports.createApplication = async (req, res) => {
  try {
    const { volunteerRequestId, message } = req.body;

    // Check if request exists
    const request = await VolunteerRequest.findById(volunteerRequestId);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Check if already applied
    const existingApp = await VolunteerApplication.findOne({
      volunteerId: req.user.id,
      volunteerRequestId,
    });

    if (existingApp) {
      return res.status(400).json({ success: false, message: 'Already applied' });
    }

    const application = await VolunteerApplication.create({
      volunteerId: req.user.id,
      volunteerRequestId,
      message,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Volunteer: Get own applications
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await VolunteerApplication.find({
      volunteerId: req.user.id,
    })
      .populate('volunteerRequestId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Volunteer: Delete application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await VolunteerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    // Check ownership
    if (application.volunteerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await VolunteerApplication.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Application deleted',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// NGO: Get applications for a request
exports.getRequestApplications = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await VolunteerRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Check ownership
    if (request.ngoId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const applications = await VolunteerApplication.find({
      volunteerRequestId: requestId,
    })
      .populate('volunteerId', 'fullname email phoneNumber skills location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// NGO: Approve application
exports.approveApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await VolunteerApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const request = await VolunteerRequest.findById(application.volunteerRequestId);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Check ownership
    if (request.ngoId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Update application status
    application.status = 'approved';
    await application.save();

    // Create assignment
    const assignment = await VolunteerAssignment.create({
      volunteerId: application.volunteerId,
      volunteerRequestId: application.volunteerRequestId,
      assignmentStatus: 'assigned',
    });

    // Check if request is full (3 volunteers assigned)
    const assignmentCount = await VolunteerAssignment.countDocuments({
      volunteerRequestId: request._id,
    });

    if (assignmentCount >= request.persons) {
      request.status = 'closed';
      await request.save();
    }

    res.status(200).json({
      success: true,
      message: 'Application approved',
      data: { application, assignment },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// NGO: Reject application
exports.rejectApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await VolunteerApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const request = await VolunteerRequest.findById(application.volunteerRequestId);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Check ownership
    if (request.ngoId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    application.status = 'rejected';
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application rejected',
      data: application,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// controllers/assignmentController.js

// Get volunteer's assignments
exports.getMyAssignments = async (req, res) => {
  try {
    const assignments = await VolunteerAssignment.find({
      volunteerId: req.user.id,
    })
      .populate('volunteerRequestId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single assignment
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await VolunteerAssignment.findById(req.params.id)
      .populate('volunteerId')
      .populate('volunteerRequestId');

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    // Check ownership
    if (assignment.volunteerId._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// controllers/volunteerController.js

// Get volunteer profile
exports.getVolunteerProfile = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }

    res.status(200).json({
      success: true,
      data: volunteer,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update volunteer profile
exports.updateVolunteerProfile = async (req, res) => {
  try {
    const { fullname, phoneNumber, availabilityStatus, experienceYear, skills, location } = req.body;

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.user.id,
      {
        fullname,
        phoneNumber,
        availabilityStatus,
        experienceYear,
        skills: Array.isArray(skills) ? skills : [skills],
        location,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: volunteer,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
