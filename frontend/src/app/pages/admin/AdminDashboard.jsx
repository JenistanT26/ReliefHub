import { useState } from "react";
import { Card } from "../../components/ui/card";
import Sidebar from "../../components/shared/Sidebar";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import { Building2, FileText, Users, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { mockNGOs, mockRequests, stats } from "../../data/mockData";
import Header from "../../components/shared/Header";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const performanceData = [
    { month: "Jan", requests: 145, fulfilled: 120, avgTime: 24 },
    { month: "Feb", requests: 178, fulfilled: 152, avgTime: 22 },
    { month: "Mar", requests: 156, fulfilled: 138, avgTime: 20 },
    { month: "Apr", requests: 192, fulfilled: 175, avgTime: 18 }
  ];

  const categoryData = [
    { name: "Food", count: 345 },
    { name: "Medical", count: 287 },
    { name: "Shelter", count: 234 },
    { name: "Water", count: 298 },
    { name: "Clothing", count: 156 }
  ];

  const adminStats = {
    totalNGOs: 342,
    activeRequests: 89,
    totalVolunteers: 3421,
    fulfillmentRate: 87
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="Admin Dashboard" 
          subtitle="System overview and management" 
          setSidebarOpen={setSidebarOpen} 
        />

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Registered NGOs</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{adminStats.totalNGOs}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Requests</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{adminStats.activeRequests}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Volunteers</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{adminStats.totalVolunteers}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Fulfillment Rate</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{adminStats.fulfillmentRate}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Request Trends & Fulfillment</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="requests" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="fulfilled" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Requests by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Map and Tables */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Active Emergencies Heatmap</h3>
              <MapPlaceholder 
                location={{ name: "India", lat: 20.5937, lng: 78.9629 }} 
                className="h-64"
              />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Critical</p>
                  <p className="text-2xl font-bold text-red-600">12</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Moderate</p>
                  <p className="text-2xl font-bold text-orange-600">35</p>
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-2 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Recent NGO Registrations</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">NGO Name</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Darpan ID</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Location</th>
                      <th className="text-left p-3 text-sm font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockNGOs.map((ngo) => (
                      <tr key={ngo.id} className="border-t hover:bg-gray-50">
                        <td className="p-3 font-medium">{ngo.name}</td>
                        <td className="p-3 text-sm">{ngo.darpanId}</td>
                        <td className="p-3 text-sm">{ngo.location.name}</td>
                        <td className="p-3">
                          {ngo.verified ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                              Verified
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* AI Performance Metrics */}
          <Card className="p-6 mt-6">
            <h3 className="font-bold text-gray-900 mb-6">AI System Performance</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">94.2%</p>
                <p className="text-sm text-gray-600">Match Accuracy</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">2.3s</p>
                <p className="text-sm text-gray-600">Avg Response Time</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">1.2M</p>
                <p className="text-sm text-gray-600">Requests Processed</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600">0.02%</p>
                <p className="text-sm text-gray-600">Error Rate</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
