import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import Sidebar from "../../components/shared/Sidebar";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import { toast } from "sonner";
import Header from "../../components/shared/Header";
// Assuming there might be a volunteer request creation endpoint or action to import later
// import { useDispatch } from 'react-redux';
// import { createVolunteerRequest } from "../../store/slices/volunteerSlice";

export default function NGOCreateVolunteerRequest() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority_level: "",
    volunteers_needed: "",
    required_skills: "",
    gender_preference: "",
    minimum_age: "",
    location: null || { lat: 13.0827, lng: 80.2707 },
    address: "",
    event_date: "",
    start_time: "",
    end_time: "",
    special_instructions: ""
  });

  const categoriesList = [
    "Medical Assistance",
    "Food Distribution",
    "Rescue Operations",
    "Logistics",
    "Shelter Setup",
    "Counseling",
    "Cleanup",
    "Other"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category || !formData.priority_level || !formData.volunteers_needed || !formData.location || !formData.event_date || !formData.start_time || !formData.end_time) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      // dispatch(createVolunteerRequest(formData));
      console.log("Volunteer Request Data:", formData);
      toast.success("Volunteer request created successfully!");
      // Assuming a dedicated page for volunteer management, falling back to dashboard
      navigate("/ngo/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create volunteer request");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="ngo" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="Create Volunteer Request" 
          subtitle="Submit a call for volunteers for relief operations" 
          setSidebarOpen={setSidebarOpen} 
        />

        <div className="p-6">
          <Card className="max-w-4xl mx-auto p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b pb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Basic Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Request Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Immediate Cleanup Crew Needed"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the nature of the work, expected duties, etc."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoriesList.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="priority">Priority Level *</Label>
                      <Select value={formData.priority_level} onValueChange={(value) => setFormData({ ...formData, priority_level: value })} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">🔴 High - Critical Need</SelectItem>
                          <SelectItem value="medium">🟠 Medium - Important</SelectItem>
                          <SelectItem value="low">🟢 Low - Routine Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Volunteer Requirements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="volunteersNeeded">Number of Volunteers Needed *</Label>
                    <Input
                      id="volunteersNeeded"
                      type="number"
                      min="1"
                      placeholder="e.g., 10"
                      value={formData.volunteers_needed}
                      onChange={(e) => setFormData({ ...formData, volunteers_needed: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="requiredSkills">Required Skills</Label>
                    <Input
                      id="requiredSkills"
                      placeholder="e.g., First Aid, Heavy Lifting, Multi-lingual"
                      value={formData.required_skills}
                      onChange={(e) => setFormData({ ...formData, required_skills: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="genderPreference">Gender Preference (Optional)</Label>
                    <Select value={formData.gender_preference} onValueChange={(value) => setFormData({ ...formData, gender_preference: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="No Preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">No Preference</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="minAge">Minimum Age (Optional)</Label>
                    <Input
                      id="minAge"
                      type="number"
                      min="18"
                      placeholder="e.g., 18"
                      value={formData.minimum_age}
                      onChange={(e) => setFormData({ ...formData, minimum_age: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Location Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Address / Meeting Point *</Label>
                    <Textarea
                      id="address"
                      placeholder="Specific address instructions or landmarks"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={2}
                      required
                    />
                  </div>
                  <div>
                    <Label>Location Map Picker *</Label>
                    <MapPlaceholder 
                      location={formData.location} 
                      className="h-64 mt-2" 
                      onLocationChange={(coords) => setFormData({ ...formData, location: { ...formData.location, lat: coords.lat, lng: coords.lng } })}
                    />
                    <p className="text-sm text-gray-500 mt-2">Click on map to pin exact location</p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Schedule & Time</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="eventDate">Event Date *</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={formData.event_date}
                      onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.start_time}
                      onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.end_time}
                      onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                <Textarea
                  id="specialInstructions"
                  placeholder="What should they bring? Who to contact upon arrival?"
                  value={formData.special_instructions}
                  onChange={(e) => setFormData({ ...formData, special_instructions: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/ngo/dashboard")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  Post Volunteer Request
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
