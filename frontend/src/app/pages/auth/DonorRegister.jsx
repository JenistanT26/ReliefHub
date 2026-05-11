import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Navbar from "../../components/shared/Navbar";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import { Heart, Send } from "lucide-react";

export default function DonorRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: "",
    location: { name: "Select location (optional)", lat: null, lng: null }
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    setOtpSent(true);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (formData.otp.length === 6) {
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/donor/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Donor Registration</h1>
            <p className="text-gray-600">Join us in making a difference through donations</p>
          </div>

          {step === 1 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
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
                <div className="flex gap-2">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91-9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={otpSent}
                    variant="outline"
                    className="whitespace-nowrap"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {otpSent ? "OTP Sent" : "Send OTP"}
                  </Button>
                </div>
                {otpSent && (
                  <p className="text-sm text-green-600 mt-2">✓ OTP sent successfully to your phone</p>
                )}
              </div>

              {otpSent && (
                <div>
                  <Label htmlFor="otp">Enter OTP *</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Didn't receive OTP? <button type="button" className="text-green-600 hover:underline">Resend</button>
                  </p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700" 
                size="lg"
                disabled={!otpSent || formData.otp.length !== 6}
              >
                Verify OTP & Continue
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">✓ Phone number verified successfully</p>
                <p className="text-sm text-green-600 mt-1">{formData.name} • {formData.phone}</p>
              </div>

              <div>
                <Label>Location (Optional)</Label>
                <p className="text-sm text-gray-600 mb-2">
                  Help us show you nearby relief requests that you can support
                </p>
                <MapPlaceholder 
                  location={formData.location} 
                  className="h-48" 
                  onLocationChange={(coords) => setFormData({ ...formData, location: { ...formData.location, lat: coords.lat, lng: coords.lng } })}
                />
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="mt-1" required />
                <Label htmlFor="terms" className="font-normal text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-green-600 hover:underline">Terms of Service</a> and{" "}
                  <a href="#" className="text-green-600 hover:underline">Privacy Policy</a>
                </Label>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" size="lg">
                  Complete Registration
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline font-medium">
              Login here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
