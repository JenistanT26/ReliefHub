import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import Navbar from "../../components/shared/Navbar";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import { Upload, Building2 } from "lucide-react";

export default function NGORegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ngoName: "",
    darpanId: "",
    email: "",
    phone: "",
    address: "",
    location: { name: "Select location on map", lat: null, lng: null },
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock registration
    navigate("/ngo/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">NGO Registration</h1>
            <p className="text-gray-600">Register your verified NGO to coordinate relief efforts</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="ngoName">NGO Name *</Label>
                <Input
                  id="ngoName"
                  placeholder="Enter NGO name"
                  value={formData.ngoName}
                  onChange={(e) => setFormData({ ...formData, ngoName: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="darpanId">NGO Darpan ID *</Label>
                <Input
                  id="darpanId"
                  placeholder="DL/2015/0012345"
                  value={formData.darpanId}
                  onChange={(e) => setFormData({ ...formData, darpanId: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="certificate">Registration Certificate *</Label>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="certificate" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload certificate</span>
                      <input id="certificate" name="certificate" type="file" className="sr-only" accept=".pdf,.jpg,.png" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email">Contact Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ngo@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                placeholder="Enter complete address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div>
              <Label>Location *</Label>
              <MapPlaceholder location={formData.location} className="h-48 mt-2" />
              <p className="text-sm text-gray-500 mt-2">Click on map to set your NGO location</p>
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
                I confirm that the information provided is accurate and I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </Label>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
              Register NGO
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
