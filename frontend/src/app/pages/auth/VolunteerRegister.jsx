import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import Navbar from "../../components/shared/Navbar";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import { Users, X } from "lucide-react";
import { skills as availableSkills } from "../../data/mockData";

export default function VolunteerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    skills: [],
    availability: "",
    location: { name: "Select location", lat: null, lng: null },
    password: "",
    confirmPassword: ""
  });

  const toggleSkill = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: formData.skills.filter(s => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/volunteer/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Registration</h1>
            <p className="text-gray-600">Contribute your skills to help communities in need</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91-9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="volunteer@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Skills * (Select all that apply)</Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {availableSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={formData.skills.includes(skill) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      formData.skills.includes(skill)
                        ? "bg-orange-600 hover:bg-orange-700"
                        : "hover:bg-orange-50"
                    }`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                    {formData.skills.includes(skill) && (
                      <X className="w-3 h-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Selected: {formData.skills.length} skill{formData.skills.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div>
              <Label htmlFor="availability">Availability *</Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {["Weekdays", "Weekends", "Anytime"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData({ ...formData, availability: option })}
                    className={`p-3 border-2 rounded-lg transition-colors ${
                      formData.availability === option
                        ? "border-orange-600 bg-orange-50 text-orange-700"
                        : "border-gray-200 hover:border-orange-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Location *</Label>
              <MapPlaceholder 
                location={formData.location} 
                className="h-48 mt-2" 
                onLocationChange={(coords) => setFormData({ ...formData, location: { ...formData.location, lat: coords.lat, lng: coords.lng } })}
              />
              <p className="text-sm text-gray-500 mt-2">Set your location to find nearby volunteering opportunities</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-1" required />
              <Label htmlFor="terms" className="font-normal text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-orange-600 hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>
              </Label>
            </div>

            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
              Register as Volunteer
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 hover:underline font-medium">
              Login here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
