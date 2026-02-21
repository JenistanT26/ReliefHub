// Mock data for the application

export const stats = {
  totalRequests: 1247,
  resourcesMatched: 8934,
  volunteersActive: 3421,
  ngoCount: 342
};

export const disasters = [
  { id: 1, name: "Flood", icon: "💧" },
  { id: 2, name: "Earthquake", icon: "🏚️" },
  { id: 3, name: "Cyclone", icon: "🌀" },
  { id: 4, name: "Fire", icon: "🔥" },
  { id: 5, name: "Drought", icon: "☀️" },
  { id: 6, name: "Landslide", icon: "⛰️" }
];

export const categories = [
  "Food",
  "Medical",
  "Shelter",
  "Water",
  "Clothing",
  "Tools",
  "First Aid",
  "Other"
];

export const urgencyLevels = [
  { value: "high", label: "High", color: "red" },
  { value: "medium", label: "Medium", color: "orange" },
  { value: "low", label: "Low", color: "green" }
];

export const skills = [
  "Medical Aid",
  "Search & Rescue",
  "Distribution",
  "Counseling",
  "Logistics",
  "Communication",
  "Construction",
  "Food Preparation",
  "Teaching",
  "Translation"
];

export const requestStatuses = {
  open: { label: "Open", color: "blue" },
  matching: { label: "Matching", color: "yellow" },
  locked: { label: "Locked", color: "orange" },
  fulfilled: { label: "Fulfilled", color: "green" }
};

export const mockRequests = [
  {
    id: "REQ-001",
    ngoName: "Red Cross India",
    ngoId: "NGO-001",
    disasterType: "Flood",
    location: { name: "Patna, Bihar", lat: 25.5941, lng: 85.1376 },
    urgency: "high",
    priority: 94,
    status: "open",
    description: "Urgent flood relief needed in low-lying areas. Thousands displaced, immediate shelter and food required.",
    items: [
      { name: "Food Packets", quantity: 500, category: "Food", critical: true },
      { name: "Water Bottles", quantity: 1000, category: "Water", critical: true },
      { name: "Blankets", quantity: 300, category: "Shelter", critical: false },
      { name: "First Aid Kits", quantity: 50, category: "Medical", critical: true }
    ],
    createdAt: "2026-02-18T10:30:00",
    matches: {
      donors: 12,
      volunteers: 8
    }
  },
  {
    id: "REQ-002",
    ngoName: "Care Foundation",
    ngoId: "NGO-002",
    disasterType: "Earthquake",
    location: { name: "Uttarkashi, Uttarakhand", lat: 30.7268, lng: 78.4354 },
    urgency: "high",
    priority: 89,
    status: "matching",
    description: "Earthquake aftermath support needed. Building collapsed, medical supplies critical.",
    items: [
      { name: "Medical Supplies", quantity: 200, category: "Medical", critical: true },
      { name: "Tents", quantity: 100, category: "Shelter", critical: true },
      { name: "Warm Clothes", quantity: 500, category: "Clothing", critical: false }
    ],
    createdAt: "2026-02-17T14:20:00",
    matches: {
      donors: 18,
      volunteers: 15
    }
  },
  {
    id: "REQ-003",
    ngoName: "Helping Hands NGO",
    ngoId: "NGO-003",
    disasterType: "Cyclone",
    location: { name: "Puri, Odisha", lat: 19.8135, lng: 85.8312 },
    urgency: "medium",
    priority: 67,
    status: "open",
    description: "Post-cyclone relief work. Need volunteers for distribution and rebuilding efforts.",
    items: [
      { name: "Building Materials", quantity: 150, category: "Tools", critical: false },
      { name: "Food Grains", quantity: 800, category: "Food", critical: true },
      { name: "Clean Water", quantity: 2000, category: "Water", critical: true }
    ],
    createdAt: "2026-02-16T09:00:00",
    matches: {
      donors: 7,
      volunteers: 12
    }
  },
  {
    id: "REQ-004",
    ngoName: "Community Care",
    ngoId: "NGO-004",
    disasterType: "Drought",
    location: { name: "Latur, Maharashtra", lat: 18.4088, lng: 76.5604 },
    urgency: "low",
    priority: 45,
    status: "fulfilled",
    description: "Drought relief - water tankers and agricultural support needed.",
    items: [
      { name: "Water Tankers", quantity: 10, category: "Water", critical: true },
      { name: "Seeds", quantity: 500, category: "Other", critical: false }
    ],
    createdAt: "2026-02-15T11:00:00",
    matches: {
      donors: 5,
      volunteers: 3
    }
  }
];

export const mockDonors = [
  {
    id: "DON-001",
    name: "Rajesh Kumar",
    phone: "+91-9876543210",
    location: { name: "Delhi", lat: 28.6139, lng: 77.2090 },
    donations: 12,
    verified: true
  },
  {
    id: "DON-002",
    name: "Priya Sharma",
    phone: "+91-9876543211",
    location: { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
    donations: 8,
    verified: true
  }
];

export const mockVolunteers = [
  {
    id: "VOL-001",
    name: "Amit Singh",
    phone: "+91-9876543220",
    skills: ["Medical Aid", "Search & Rescue"],
    location: { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
    availability: "Weekends",
    tasksCompleted: 24,
    verified: true
  },
  {
    id: "VOL-002",
    name: "Sneha Patel",
    phone: "+91-9876543221",
    skills: ["Distribution", "Counseling"],
    location: { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
    availability: "Weekdays",
    tasksCompleted: 18,
    verified: true
  }
];

export const mockMatches = [
  {
    id: "MATCH-001",
    requestId: "REQ-001",
    donorId: "DON-001",
    donorName: "Rajesh Kumar",
    distance: 12.5,
    items: [
      { name: "Food Packets", quantity: 200 }
    ],
    matchConfidence: 87,
    status: "pending",
    timestamp: "2026-02-19T08:30:00"
  },
  {
    id: "MATCH-002",
    requestId: "REQ-001",
    volunteerId: "VOL-001",
    volunteerName: "Amit Singh",
    distance: 8.3,
    skills: ["Medical Aid"],
    matchConfidence: 92,
    status: "accepted",
    timestamp: "2026-02-19T09:15:00"
  }
];

export const mockNGOs = [
  {
    id: "NGO-001",
    name: "Red Cross India",
    darpanId: "DL/2015/0012345",
    email: "contact@redcross.in",
    phone: "+91-9876543230",
    address: "123 Relief Road, New Delhi",
    location: { name: "New Delhi", lat: 28.6139, lng: 77.2090 },
    verified: true,
    requestsPosted: 45,
    joinedDate: "2020-03-15"
  }
];

export const mockNotifications = [
  {
    id: "NOT-001",
    type: "match",
    title: "New Match Found",
    message: "Donor Rajesh Kumar matched for REQ-001",
    timestamp: "2026-02-19T08:30:00",
    read: false,
    priority: "high"
  },
  {
    id: "NOT-002",
    type: "donation",
    title: "Donation Accepted",
    message: "Your donation for REQ-002 has been accepted by Care Foundation",
    timestamp: "2026-02-19T07:15:00",
    read: false,
    priority: "medium"
  },
  {
    id: "NOT-003",
    type: "task",
    title: "New Task Assigned",
    message: "You have been assigned to help with distribution in Patna",
    timestamp: "2026-02-18T16:45:00",
    read: true,
    priority: "high"
  },
  {
    id: "NOT-004",
    type: "locked",
    title: "Request Locked",
    message: "REQ-003 has been locked for resource allocation",
    timestamp: "2026-02-18T14:20:00",
    read: true,
    priority: "low"
  }
];
