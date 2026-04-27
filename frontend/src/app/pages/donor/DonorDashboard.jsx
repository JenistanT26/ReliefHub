import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Sidebar from "../../components/shared/Sidebar";
import PriorityBadge from "../../components/shared/PriorityBadge";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import { Heart, MapPin, Package, CheckCircle } from "lucide-react";
import { mockRequests } from "../../data/mockData";
import Header from "../../components/shared/Header";

export default function DonorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = {
    totalDonations: 12,
    activeDonations: 3,
    impactScore: 847
  };

  const nearbyRequests = mockRequests.filter(r => r.status !== "fulfilled").slice(0, 5);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="donor" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="Donor Dashboard" 
          subtitle="Welcome back, Rajesh Kumar" 
          setSidebarOpen={setSidebarOpen} 
          actions={
            <Link to="/donor/requests">
              <Button className="bg-green-600 hover:bg-green-700">
                <Heart className="w-4 h-4 mr-2" />
                Browse Requests
              </Button>
            </Link>
          }
        />

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Donations</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalDonations}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Lifetime contributions</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Donations</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeDonations}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Currently in progress</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Impact Score</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.impactScore}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Based on your contributions</p>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Map */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Nearby Relief Requests</h3>
              <MapPlaceholder 
                location={{ name: "Your Area - Delhi", lat: 28.6139, lng: 77.2090 }} 
                className="h-80"
              />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">4</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Within 50km</p>
                  <p className="text-2xl font-bold text-blue-600">18</p>
                </div>
              </div>
            </Card>

            {/* Nearby Requests List */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Active Requests</h3>
                <Link to="/donor/requests">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
              <div className="space-y-3">
                {nearbyRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{request.id}</p>
                        <p className="text-sm text-gray-600">{request.ngoName}</p>
                      </div>
                      <PriorityBadge priority={request.urgency} />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      {request.location.name}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <span className="text-sm text-gray-600">
                        {request.items.length} items needed
                      </span>
                      <Link to={`/donor/requests/${request.id}`}>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Impact Section */}
          <Card className="p-8 mt-6 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Impact Matters</h3>
              <p className="text-gray-600 mb-6">
                Through your {stats.totalDonations} donations, you've helped relief efforts reach thousands of people
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div>
                  <p className="text-3xl font-bold text-green-600">2,340</p>
                  <p className="text-sm text-gray-600 mt-1">People Helped</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">8</p>
                  <p className="text-sm text-gray-600 mt-1">Disasters Supported</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600">₹2.8L</p>
                  <p className="text-sm text-gray-600 mt-1">Estimated Value</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
