import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Navbar from "../components/shared/Navbar";
import MapPlaceholder from "../components/shared/MapPlaceholder";
import { User, Mail, Phone, MapPin, Shield, Bell, Save } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Red Cross India",
    email: "contact@redcross.in",
    phone: "+91-9876543230",
    address: "123 Relief Road, New Delhi",
    location: { name: "New Delhi", lat: 28.6139, lng: 77.2090 }
  });

  const handleSave = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar user={{ name: profile.name }} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                  <p className="text-gray-600">NGO Account</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Verified</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Organization Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>Location</Label>
                  <MapPlaceholder 
                    location={profile.location} 
                    className="h-48 mt-2" 
                    onLocationChange={(coords) => setProfile({ ...profile, location: { ...profile.location, lat: coords.lat, lng: coords.lng } })}
                  />
                </div>

                <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Update Password
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h4 className="font-bold text-gray-900 mb-4">Two-Factor Authentication</h4>
                <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                {[
                  { id: "matches", label: "New Matches", description: "Get notified when donors or volunteers are matched" },
                  { id: "donations", label: "Donation Updates", description: "Receive updates about donation status" },
                  { id: "alerts", label: "Priority Alerts", description: "Notifications for high-priority requests" },
                  { id: "messages", label: "Messages", description: "Direct messages from donors and volunteers" },
                  { id: "reports", label: "Weekly Reports", description: "Summary of your activity and impact" }
                ].map((item) => (
                  <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Bell className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="mt-1" />
                  </div>
                ))}
              </div>
              <Button onClick={handleSave} className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                Save Preferences
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
