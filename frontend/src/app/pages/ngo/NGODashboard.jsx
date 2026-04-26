import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Sidebar from "../../components/shared/Sidebar";
import { Bell, FileText, Users, CheckCircle, AlertTriangle, TrendingUp, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { mockRequests } from "../../data/mockData";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import Header from "../../components/shared/Header";

export default function NGODashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = {
    totalRequests: 45,
    activeRequests: 12,
    fulfilledRequests: 28,
    pendingMatches: 18
  };

  const priorityData = [
    { name: "High", value: 8, color: "#ef4444" },
    { name: "Medium", value: 15, color: "#f97316" },
    { name: "Low", value: 22, color: "#22c55e" }
  ];

  const monthlyData = [
    { month: "Jan", requests: 8 },
    { month: "Feb", requests: 12 },
    { month: "Mar", requests: 10 },
    { month: "Apr", requests: 15 }
  ];

  const myRequests = mockRequests.filter(r => r.ngoId === "NGO-001");
  const recentRequests = myRequests.slice(0, 3);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="ngo" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="NGO Dashboard" 
          subtitle="Welcome back, Red Cross India" 
          setSidebarOpen={setSidebarOpen} 
          actions={
            <>
              <Link to="/notifications">
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </Button>
              </Link>
              <Link to="/ngo/create-request">
                <Button className="hidden sm:flex bg-blue-600 hover:bg-blue-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Request
                </Button>
              </Link>
            </>
          }
        />

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalRequests}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-green-600">12% from last month</span>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Requests</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeRequests}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Awaiting fulfillment
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Fulfilled</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.fulfilledRequests}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Successfully completed
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Matches</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pendingMatches}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Awaiting your response
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Priority Distribution */}
            <Card className="lg:col-span-1 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Priority Distribution</h3>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priorityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {priorityData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-700">{item.name} Priority</span>
                    </div>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Monthly Requests */}
            <Card className="lg:col-span-2 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Monthly Requests</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Requests */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Recent Requests</h3>
                <Link to="/ngo/requests">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{request.id}</p>
                        <p className="text-sm text-gray-600">{request.disasterType} Relief</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        request.urgency === 'high' ? 'bg-red-100 text-red-700' :
                        request.urgency === 'medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {request.urgency.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {request.location.name}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      AI Score: <span className="font-medium text-blue-600">{request.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Donor Availability Heatmap */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Nearby Donor Availability</h3>
              <MapPlaceholder 
                location={{ name: "New Delhi Region", lat: 28.6139, lng: 77.2090 }} 
                className="h-64"
              />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Active Donors</p>
                  <p className="text-2xl font-bold text-blue-600">124</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Active Volunteers</p>
                  <p className="text-2xl font-bold text-green-600">87</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
