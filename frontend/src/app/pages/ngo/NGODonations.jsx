import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../../components/ui/card";
import Sidebar from "../../components/shared/Sidebar";
import StatusBadge from "../../components/shared/StatusBadge";
import { Heart, TrendingUp, Package, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Header from "../../components/shared/Header";
import { fetchDonationIntents } from "../../store/slices/donoritemSlice";

export default function NGODonations() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  
  const { donationIntents, loading, error } = useSelector((state) => state.donorItems);

  useEffect(() => {
    dispatch(fetchDonationIntents());
  }, [dispatch]);

  // Derived dynamic stats
  const stats = useMemo(() => {
    if (!donationIntents) return { totalDonations: 0, activeDonors: 0, valueReceived: 0 };
    
    const uniqueDonors = new Set(donationIntents.map(d => d.donor_id));
    const totalQty = donationIntents.reduce((sum, d) => sum + (d.quantity_offered || 0), 0);
    
    return {
      totalDonations: donationIntents.length,
      activeDonors: uniqueDonors.size,
      valueReceived: totalQty, // Approximate value as total items
    };
  }, [donationIntents]);

  // Derived dynamic monthly data
  const monthlyData = useMemo(() => {
    if (!donationIntents) return [];
    
    const monthCounts = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    donationIntents.forEach(d => {
      const date = new Date(d.createdAt);
      if (!isNaN(date)) {
        const month = months[date.getMonth()];
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      }
    });
    
    // Convert to array format for Recharts
    return Object.keys(monthCounts).map(month => ({
      month,
      donations: monthCounts[month]
    }));
  }, [donationIntents]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="ngo" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="Donations Received" 
          subtitle="Track all donations for your relief requests" 
          setSidebarOpen={setSidebarOpen} 
        />

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
                Dynamic from DB
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
                  <p className="text-sm text-gray-600">Total Items Received</p>
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
              {monthlyData.length > 0 ? (
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="donations" fill="#22c55e" radius={[8, 8, 0, 0]} />
                </BarChart>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  No donation data available
                </div>
              )}
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
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">Loading donations...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-red-500">Error loading donations: {error}</td>
                    </tr>
                  ) : donationIntents && donationIntents.length > 0 ? (
                    donationIntents.map((donation) => (
                      <tr key={donation._id} className="border-t hover:bg-gray-50">
                        <td className="p-3 font-medium">{donation._id.substring(0, 8)}...</td>
                        <td className="p-3">{donation.donor_item_id?.donor_id?.name || "Unknown Donor"}</td>
                        <td className="p-3">
                          {donation.donor_item_id?.item_name || "Item"} ({donation.quantity_offered})
                        </td>
                        <td className="p-3 text-blue-600">
                          {donation.relief_request_id?.request_code || donation.relief_request_id?._id?.substring(0, 8) || "N/A"}
                        </td>
                        <td className="p-3">{new Date(donation.createdAt).toLocaleDateString()}</td>
                        <td className="p-3">
                          <StatusBadge status={donation.status === "completed" || donation.status === "approved" ? "completed" : "pending"} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">No donations found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
