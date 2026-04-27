import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequestById } from "../../store/slices/requestSlice";
import { submitDonationIntent, fetchDonationIntentsByRequestId } from "../../store/slices/donoritemSlice";

import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

import Sidebar from "../../components/shared/Sidebar";
import Header from "../../components/shared/Header";
import PriorityBadge from "../../components/shared/PriorityBadge";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import PageLoader from "../Loading";

import { ArrowLeft, MapPin, Building2, Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DonorRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({ item: "", quantity: ""});
  const [donationItems, setDonationItems] = useState([]);

  const { selectedRequest: request, loading } = useSelector((state) => state.requests);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    dispatch(fetchRequestById(id)).then(() => setInitialLoad(false));

    const interval = setInterval(() => {
      dispatch(fetchRequestById(id));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, id]);

  if (initialLoad) {
    return <PageLoader title="Loading Request Details" subtitle="Fetching details..." />;
  }

  const handleAddItem = () => {
    if (!currentItem.item || !currentItem.quantity) {
      toast.error("Please select item and quantity");
      return;
    }

    setDonationItems((prev) => [...prev, { ...currentItem }]);
    setCurrentItem({ item: "", quantity: "", deliveryTime: ""});
  };

  const handleRemoveItem = (index) => {
    setDonationItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleDonate = async () => {
  if (donationItems.length === 0) {
    toast.error("Please add at least one item to donate");
    return;
  }

  // Build the donationItems array for backend
  const payload = donationItems.map((donItem) => ({
    item_name: donItem.item,
    quantity_submitted: Number(donItem.quantity),
    category: request.items.find((i) => i.item_name === donItem.item)?.category || "general",
    request_item_id: request.items.find((i) => i.item_name === donItem.item)?._id,
    delivery_time: donItem.deliveryTime || null,
  }));

  try {
    // Send single POST to backend
    await dispatch(submitDonationIntent({ 
      donor_id: "507f191e810c19729de860ea", // Replace with authenticated user id
      relief_request_id: request._id,
      donationItems: payload 
    })).unwrap();

    toast.success("Donation intent submitted successfully!");
    setDialogOpen(false);
    setDonationItems([]);
    dispatch(fetchDonationIntentsByRequestId(request._id));
    navigate("/donor/my-donations");
  } catch (err) {
    console.log("Donation Intent Error:", err);
    toast.error("Failed to submit donation intent: " + (typeof err === "string" ? err : err?.message || "Internal Error"));
  }
};

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="donor" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title={
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/donor/requests")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              {request.request_code} <span className="text-gray-500 font-light">({request.disaster_type} Relief)</span>
            </div>
          }
          setSidebarOpen={setSidebarOpen} 
        />

        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Request Overview */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      {/* <h2 className="text-xl font-bold text-gray-900">{request.ngo_id}</h2> */}
                      <h2 className="text-xl font-bold text-gray-900">{request.ngo_name || "Relief Organization"}</h2>
                    </div>
                    <PriorityBadge priority={request.urgency} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Distance</div>
                    <div className="text-2xl font-bold text-blue-600">12.5 km</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Situation</h3>
                    <p className="text-gray-600">{request.description}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{request.location?.name || "Chennai,India"}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Required Items */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Required Items</h2>
                <div className="space-y-3">
                  {request.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{item.item_name}</p>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{item.quantity}</p>
                        {item.status === "Critical" && (
                          <span className="text-xs text-red-600 font-medium">Critical</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Map */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Location</h3>
                <MapPlaceholder location={request.location} className="h-48" />
              </Card>

              {/* Donation */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
                <h3 className="font-bold text-gray-900 mb-4">Make an Impact</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Your donation will directly help people affected by {request.disaster_type?.toLowerCase()} in {request.location?.name}.
                </p>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                      <Heart className="w-4 h-4 mr-2" />
                      Express Donation Intent
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Express Donation Intent</DialogTitle>
                      <DialogDescription className="sr-only">
                        Fill out the details to express your donation intent.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                      {/* Current Item Form */}
                      <div className="space-y-2">
                        <Label>Select Item</Label>
                        <Select value={currentItem.item} onValueChange={(value) => setCurrentItem({ ...currentItem, item: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose an item" />
                          </SelectTrigger>
                          <SelectContent>
                            {request.items?.map((item, idx) => (
                              <SelectItem key={idx} value={item.item_name}>{item.item_name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          placeholder="Enter quantity"
                          value={currentItem.quantity}
                          onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })}
                        />

                        <Label>Estimated Delivery Time</Label>
                        <Select 
                          // value={currentItem.deliveryTime} 
                          // onValueChange={(value) => setCurrentItem({ ...currentItem, deliveryTime: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24h">Within 24 hours</SelectItem>
                            <SelectItem value="48h">Within 48 hours</SelectItem>
                            <SelectItem value="week">Within a week</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-700" onClick={handleAddItem}>
                          Add Item
                        </Button>
                      </div>

                      {/* List of Added Items */}
                      {donationItems.length > 0 && (
                        <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
                          <h4 className="font-medium text-gray-700">Items to Donate</h4>
                          {donationItems.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
                              <div>
                                {item.item} - {item.quantity} pcs 
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(idx)}>
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleDonate}>
                        Confirm Donation
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </Card>

              {/* AI Match Score */}
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">AI Match Score</h3>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">87%</div>
                  <p className="text-sm text-gray-600">
                    Based on your location, past donations, and resource availability
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}