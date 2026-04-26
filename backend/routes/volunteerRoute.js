// routes/auth.js
const express = require('express');
const router = express.Router();
const {
  ngoRegister,
  ngoLogin,
  volunteerRegister,
  volunteerLogin,
  getCurrentUser,
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Public routes
router.post('/ngo/register', ngoRegister);
router.post('/ngo/login', ngoLogin);
router.post('/volunteer/register', volunteerRegister);
router.post('/volunteer/login', volunteerLogin);

// Protected routes
router.get('/me', auth, getCurrentUser);

module.exports = router;

// routes/volunteersRequests.js
const express = require('express');
const router = express.Router();
const {
  getAllOpenRequests,
  getNgoRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
} = require('../controllers/volunteerRequestController');
const { auth } = require('../middleware/auth');

// Public routes
router.get('/', getAllOpenRequests);
router.get('/:id', getRequestById);

// Protected routes - NGO only
router.get('/ngo/my-requests', auth, getNgoRequests);
router.post('/', auth, createRequest);
router.patch('/:id', auth, updateRequest);
router.delete('/:id', auth, deleteRequest);

module.exports = router;

// routes/applications.js
const express = require('express');
const router = express.Router();
const {
  createApplication,
  getMyApplications,
  deleteApplication,
  getRequestApplications,
  approveApplication,
  rejectApplication,
} = require('../controllers/applicationController');
const { auth } = require('../middleware/auth');

// Volunteer routes
router.post('/', auth, createApplication);
router.get('/my-applications', auth, getMyApplications);
router.delete('/:id', auth, deleteApplication);

// NGO routes
router.get('/request/:requestId', auth, getRequestApplications);
router.patch('/:applicationId/approve', auth, approveApplication);
router.patch('/:applicationId/reject', auth, rejectApplication);

module.exports = router;

// routes/assignments.js
const express = require('express');
const router = express.Router();
const {
  getMyAssignments,
  getAssignmentById,
} = require('../controllers/assignmentController');
const { auth } = require('../middleware/auth');

// Volunteer routes
router.get('/', auth, getMyAssignments);
router.get('/:id', auth, getAssignmentById);

module.exports = router;

// routes/volunteers.js
const express = require('express');
const router = express.Router();
const {
  getVolunteerProfile,
  updateVolunteerProfile,
} = require('../controllers/volunteerController');
const { auth } = require('../middleware/auth');

router.get('/:id', getVolunteerProfile);
router.patch('/profile', auth, updateVolunteerProfile);

module.exports = router;

// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, model: 'volunteer' }; // Detect from token or context
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// server.js - Main Express server file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/volunteer-requests', require('./routes/volunteersRequests'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/volunteers', require('./routes/volunteers'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
