import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Sidebar from "../../components/shared/Sidebar";
import PriorityBadge from "../../components/shared/PriorityBadge";
import StatusBadge from "../../components/shared/StatusBadge";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import { ArrowLeft, MapPin, Calendar, CheckCircle, X, Lock, User, Phone } from "lucide-react";
import { mockRequests, mockMatches } from "../../data/mockData";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRequestById } from "../../store/slices/requestSlice";
import { useDispatch } from "react-redux";

export default function NGORequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {selectedRequest,loading} = useSelector((state) => state.requests)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const request = selectedRequest;
  const relatedMatches = mockMatches.filter(m => m.requestId === id);

  useEffect(() => {
    dispatch(fetchRequestById(id));
  }, [id,dispatch]);

  if (!request) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request not found</h2>
          <Button onClick={() => navigate("/ngo/requests")}>Back to Requests</Button>
        </div>
      </div>
    );
  }

  const handleAcceptMatch = (matchId) => {
    toast.success("Match accepted successfully!");
  };

  const handleRejectMatch = (matchId) => {
    toast.info("Match rejected");
  };

  const handleLockRequest = () => {
    toast.success("Request locked for resource allocation");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="ngo" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center gap-4 mb-2">
              <Button variant="ghost" size="icon" onClick={() => navigate("/ngo/requests")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{request.id}</h1>
                <p className="text-gray-600">{request.disaster_type} Relief Request</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Request Overview</h2>
                    <div className="flex gap-2">
                      <StatusBadge status={request.status} />
                      <PriorityBadge priority={request.urgency_level} />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">AI Priority Score</div>
                    <div className="text-4xl font-bold text-blue-600">{request.priority}</div>
                    <div className="text-xs text-gray-500 mt-1">out of 100</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-600">{request.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium text-gray-900">{request.location.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Created</p>
                        <p className="font-medium text-gray-900">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Required Items */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Required Items</h2>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 text-sm font-medium text-gray-700">Item</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-700">Quantity</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-700">Category</th>
                        <th className="text-left p-3 text-sm font-medium text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {request.items.map((item, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-3 font-medium">{item.item_name}</td>
                          <td className="p-3">{item.quantity}</td>
                          <td className="p-3">
                            <span className="px-2 py-1 bg-gray-100 rounded text-sm">{item.category}</span>
                          </td>
                          <td className="p-3">
                            {item.critical ? (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-medium">
                                Critical
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                Standard
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Matches */}
              {/* <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Matched Donors & Volunteers ({relatedMatches.length})
                </h2>
                <div className="space-y-4">
                  {relatedMatches.map((match) => (
                    <div key={match.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {match.donorName || match.volunteerName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {match.donorId ? 'Donor' : 'Volunteer'} • {match.distance} km away
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Match Confidence</div>
                          <div className="text-lg font-bold text-green-600">{match.matchConfidence}%</div>
                        </div>
                      </div>

                      {match.items && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-1">Offering:</p>
                          {match.items.map((item, idx) => (
                            <span key={idx} className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm mr-2">
                              {item.name} ({item.quantity})
                            </span>
                          ))}
                        </div>
                      )}

                      {match.skills && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 mb-1">Skills:</p>
                          {match.skills.map((skill, idx) => (
                            <span key={idx} className="inline-block px-2 py-1 bg-orange-50 text-orange-700 rounded text-sm mr-2">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                          onClick={() => handleAcceptMatch(match.id)}
                          disabled={match.status === "accepted"}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {match.status === "accepted" ? "Accepted" : "Accept"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                          onClick={() => handleRejectMatch(match.id)}
                          disabled={match.status === "accepted"}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}

                  {relatedMatches.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No matches found yet. Our AI is working on finding the best donors and volunteers.
                    </div>
                  )}
                </div>
              </Card> */}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Map */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Location</h3>
                <MapPlaceholder location={request.location} className="h-48" />
              </Card>

              {/* Actions */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={handleLockRequest}>
                    <Lock className="w-4 h-4 mr-2" />
                    Lock for Allocation
                  </Button>
                  <Button variant="outline" className="w-full">
                    Edit Request
                  </Button>
                  <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-50">
                    Close Request
                  </Button>
                </div>
              </Card>

              {/* Statistics */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-bold text-gray-900">{request.items.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Critical Items</span>
                    <span className="font-bold text-red-600">
                      {request.items.filter(i => i.critical).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Donor Matches</span>
                    {/* <span className="font-bold text-blue-600">{request.matches.donors}</span> */}
                    <span className="font-bold text-blue-600">10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Volunteer Matches</span>
                    {/* <span className="font-bold text-green-600">{request.matches.volunteers}</span> */}
                    <span className="font-bold text-green-600">10</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
