import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import Navbar from "../../components/shared/Navbar";
import { Building2, Heart, Users } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [activeTab, setActiveTab] = useState("ngo");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

const handleSubmit = (e) => {
  e.preventDefault();

  setShowAlert(true);

  const dashboardRoutes = {
    ngo: "/ngo/dashboard",
    donor: "/donor/dashboard",
    volunteer: "/volunteer/dashboard"
  };

  setTimeout(() => {
    setShowAlert(false);
    navigate(dashboardRoutes[activeTab]);
  }, 1500);
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-12">
      {showAlert && (
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white border border-green-200 shadow-lg rounded-lg px-6 py-3 flex items-center gap-3 z-50">
        <span className="text-green-600 text-xl">✅</span>
        <p className="text-green-700 font-medium">
          Login Successful!
        </p>
      </div>
    )}
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Login to continue coordinating relief</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ngo" className="text-xs sm:text-sm">
                <Building2 className="w-4 h-4 mr-1" />
                NGO
              </TabsTrigger>
              <TabsTrigger value="donor" className="text-xs sm:text-sm">
                <Heart className="w-4 h-4 mr-1" />
                Donor
              </TabsTrigger>
              <TabsTrigger value="volunteer" className="text-xs sm:text-sm">
                <Users className="w-4 h-4 mr-1" />
                Volunteer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ngo" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
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
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Login as NGO
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="donor" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="donor-phone">Phone Number</Label>
                  <Input
                    id="donor-phone"
                    type="tel"
                    placeholder="+91-9876543210"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="donor-otp">OTP</Label>
                  <Input
                    id="donor-otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                  <p className="text-xs text-gray-500 mt-1">OTP will be sent to your phone</p>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Login as Donor
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="volunteer" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="vol-email">Email or Phone</Label>
                  <Input
                    id="vol-email"
                    type="text"
                    placeholder="volunteer@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="vol-password">Password</Label>
                  <Input
                    id="vol-password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                  Login as Volunteer
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm text-gray-600">
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <div className="mt-6 pt-6 border-t text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/role-selection" className="text-blue-600 hover:underline font-medium">
                Register now
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
