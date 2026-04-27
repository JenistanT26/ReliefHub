import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Sidebar from "../../components/shared/Sidebar";
import PriorityBadge from "../../components/shared/PriorityBadge";
import StatusBadge from "../../components/shared/StatusBadge";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  CheckCircle,
  X,
  Lock,
  User
} from "lucide-react";
import { toast } from "sonner";
import Header from "../../components/shared/Header";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDonationIntentsByRequestId,
  updateDonationIntentStatus
} from "../../store/slices/donoritemSlice";
import { fetchRequestById } from "../../store/slices/requestSlice";
import useReverseGeocoding from "../../components/shared/ReverseGeocoding";

export default function NGORequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedRequest } = useSelector((state) => state.requests);
  const { relatedMatches, loading } = useSelector(
    (state) => state.donorItems
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const request = selectedRequest;

  // ✅ Map location fix
  const mapLocation = request?.location?.coordinates
    ? {
        lat: request.location.coordinates[1],
        lng: request.location.coordinates[0],
      }
    : null;

  // ✅ Address
  const { address } = useReverseGeocoding(
    mapLocation?.lat,
    mapLocation?.lng
  );

  useEffect(() => {
    dispatch(fetchRequestById(id));
    dispatch(fetchDonationIntentsByRequestId(id));
  }, [id, dispatch]);

  if (!request) return null;

  // ✅ Split matches
  const acceptedMatches =
    relatedMatches?.filter((m) => m.status === "approved") || [];

  const pendingMatches =
    relatedMatches?.filter((m) => m.status == "pending") || [];

  // ✅ Handlers
  const handleAccept = (id) => {
    dispatch(updateDonationIntentStatus({ id, status: "approved" }));
    toast.success("Accepted");
  };

  const handleReject = (id) => {
    dispatch(updateDonationIntentStatus({ id, status: "rejected" }));
    toast.info("Rejected");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="ngo" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header
          title={
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/ngo/requests")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              {request.request_code}
            </div>
          }
          subtitle={`${request.disaster_type} Relief Request`}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-6 space-y-6">

          {/* ================= MAIN GRID ================= */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {/* OVERVIEW */}
              <Card className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="space-y-4"> 
                    <h3 className="font-medium text-gray-700 mb-2">Description</h3> 
                    <p className="text-gray-600">{request.description}</p> 
                    </div>
                  <div className="flex justify-between mb-4">
                    <StatusBadge status={request.status} />
                    <PriorityBadge priority={request.urgency_level} />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span>{address || "Fetching address..."}</span>
                </div>
              </Card>

              {/* ================= ACCEPTED DRAWER ================= */}
          <Card className="p-4 bg-green-50 border-green-200">
            <h2 className="font-bold text-green-800 mb-3">
              Accepted Matches ({acceptedMatches.length})
            </h2>

            {acceptedMatches.length === 0 ? (
              <p className="text-sm text-gray-500">No accepted matches yet</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {acceptedMatches.map((match) => (
                  <div key={match._id} className="p-3 bg-white rounded shadow-sm">
                    <div className="font-medium">{match.donor_item_id?.item_name}</div>
                    <div className="text-sm text-gray-500">
                      Qty: {match.quantity_offered}
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      ✔ Accepted
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

              {/* MATCHES */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">
                  Pending Matches ({pendingMatches.length})
                </h2>

                {loading ? (
                  <p>Loading...</p>
                ) : pendingMatches.length === 0 ? (
                  <p className="text-gray-500">No pending matches</p>
                ) : (
                  <div className="space-y-4">
                    {pendingMatches.map((match) => (
                      <Card key={match._id} className="p-5 hover:shadow-md">

                        <div className="flex justify-between">
                          <div className="flex gap-3">
                            <User className="w-5 h-5 text-gray-500" />

                            <div>
                              <p className="font-medium">
                                {match.donor_item_id?.item_name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Donor: {match.donor_id}
                              </p>
                            </div>
                          </div>

                          <div className="font-bold">
                            {match.quantity_offered}
                          </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-3 mt-4">
                          <CheckCircle
                            className="w-6 h-6 text-green-600 cursor-pointer hover:scale-110"
                            onClick={() => handleAccept(match._id)}
                          />
                          <X
                            className="w-6 h-6 text-red-600 cursor-pointer hover:scale-110"
                            onClick={() => handleReject(match._id)}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
              <Card className="p-4">
                <MapPlaceholder location={mapLocation} />
              </Card>

              <Card className="p-4">
                <Button
                  className="w-full bg-orange-600"
                  onClick={() => toast.success("Locked")}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Lock Request
                </Button>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}