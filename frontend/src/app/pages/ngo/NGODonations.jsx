import { useState } from "react";
import { Card } from "../../components/ui/card";
import Sidebar from "../../components/shared/Sidebar";
import StatusBadge from "../../components/shared/StatusBadge";
import { Heart, TrendingUp, Package, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function NGODonations() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const donations = [
    { id: "DON-001", donor: "Rajesh Kumar", items: "Food Packets (200)", requestId: "REQ-001", date: "2026-02-19", status: "delivered" },
    { id: "DON-002", donor: "Priya Sharma", items: "Water Bottles (500)", requestId: "REQ-001", date: "2026-02-18", status: "in-transit" },
    { id: "DON-003", donor: "Amit Patel", items: "Blankets (150)", requestId: "REQ-002", date: "2026-02-17", status: "delivered" },
    { id: "DON-004", donor: "Sneha Gupta", items: "Medical Supplies (100)", requestId: "REQ-002", date: "2026-02-16", status: "delivered" }
  ];

  const monthlyData = [
    { month: "Jan", donations: 18 },
    { month: "Feb", donations: 24 },
    { month: "Mar", donations: 19 },
    { month: "Apr", donations: 28 }
  ];

  const stats = {
    totalDonations: 89,
    activeDonors: 45,
    valueReceived: "₹12.5L"
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="ngo" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Donations Received</h1>
            <p className="text-gray-600">Track all donations for your relief requests</p>
          </div>
        </div>

        <div className="p-6">
          {/* Stats */}
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
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                18% from last month
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Donors</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeDonors}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Estimated Value</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.valueReceived}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Chart */}
          <Card className="p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Monthly Donations Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="donations" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Donations Table */}
          <Card className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Recent Donations</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Donation ID</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Donor</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Items</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Request</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation.id} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-medium">{donation.id}</td>
                      <td className="p-3">{donation.donor}</td>
                      <td className="p-3">{donation.items}</td>
                      <td className="p-3 text-blue-600">{donation.requestId}</td>
                      <td className="p-3">{donation.date}</td>
                      <td className="p-3">
                        <StatusBadge status={donation.status === "delivered" ? "completed" : "pending"} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
