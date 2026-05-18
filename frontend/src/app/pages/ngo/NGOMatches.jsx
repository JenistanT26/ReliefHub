import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDonationIntents, updateDonationIntentStatus } from "../../store/slices/donoritemSlice";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import Sidebar from "../../components/shared/Sidebar";
import StatusBadge from "../../components/shared/StatusBadge";
import { User, MapPin, CheckCircle, X } from "lucide-react";
import { mockMatches } from "../../data/mockData";
import { toast } from "sonner";
import Header from "../../components/shared/Header";

export default function NGOMatches() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { donationIntents, loading } = useSelector((state) => state.donorItems);

  useEffect(() => {
    dispatch(fetchDonationIntents());
  }, [dispatch]);

  const donorMatches = donationIntents || [];
  const volunteerMatches = mockMatches.filter(m => m.volunteerId);

  const handleAccept = (matchId) => {
    dispatch(updateDonationIntentStatus({ id: matchId, status: "approved" }))
      .unwrap()
      .then(() => {
        toast.success("Match accepted!");
        dispatch(fetchDonationIntents());
      })
      .catch((err) => {
        toast.error("Failed to accept match: " + err);
      });
  };

  const handleReject = (matchId) => {
    dispatch(updateDonationIntentStatus({ id: matchId, status: "rejected" }))
      .unwrap()
      .then(() => {
        toast.info("Match rejected");
        dispatch(fetchDonationIntents());
      })
      .catch((err) => {
        toast.error("Failed to reject match: " + err);
      });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="ngo" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="Matches" 
          subtitle="AI-matched donors and volunteers for your requests" 
          setSidebarOpen={setSidebarOpen} 
        />

        <div className="p-6">
          <Tabs defaultValue="donors">
            <TabsList>
              <TabsTrigger value="donors">Donor Matches ({donorMatches.length})</TabsTrigger>
              <TabsTrigger value="volunteers">Volunteer Matches ({volunteerMatches.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="donors" className="mt-6">
              <div className="grid gap-6">
                {loading ? (
                  <div className="p-12 text-center text-gray-500">Loading matches...</div>
                ) : donorMatches.length === 0 ? (
                  <div className="p-12 text-center text-gray-500">No donor matches found</div>
                ) : donorMatches.map((match) => (
                  <Card key={match._id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{match.donor_item_id?.donor_id?.name || "Rajesh"}</h3>
                          <p className="text-sm text-gray-600">For request: {match.relief_request_id?.request_code || match.relief_request_id?._id || "N/A"}</p>
                        </div>
                      </div>
                      <StatusBadge status={match.status === "completed" || match.status === "approved" ? "completed" : match.status} />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Distance</p>
                          <p className="font-medium text-gray-900">{match.distance || "N/A"} km</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Match Confidence</p>
                        <p className="font-medium text-green-600">{match.matchConfidence || 85}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Matched On</p>
                        <p className="font-medium text-gray-900">
                          {match.createdAt ? new Date(match.createdAt).toLocaleDateString() : "Unknown"}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Offering Items:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                          {match.donor_item_id?.item_name || "Item"} ({match.quantity_offered || 1})
                        </span>
                      </div>
                    </div>

                    {match.status === "pending" && (
                      <div className="flex gap-3 pt-4 border-t">
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleAccept(match._id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept Match
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                          onClick={() => handleReject(match._id)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="volunteers" className="mt-6">
              <div className="grid gap-6">
                {volunteerMatches.map((match) => (
                  <Card key={match.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{match.volunteerName}</h3>
                          <p className="text-sm text-gray-600">For request: {match.requestId}</p>
                        </div>
                      </div>
                      <StatusBadge status={match.status} />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Distance</p>
                          <p className="font-medium text-gray-900">{match.distance} km</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Match Confidence</p>
                        <p className="font-medium text-green-600">{match.matchConfidence}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Matched On</p>
                        <p className="font-medium text-gray-900">
                          {new Date(match.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {match.skills && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {match.skills.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {match.status === "pending" && (
                      <div className="flex gap-3 pt-4 border-t">
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleAccept(match.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept Match
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                          onClick={() => handleReject(match.id)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
