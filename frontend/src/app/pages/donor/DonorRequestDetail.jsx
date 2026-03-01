import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import Sidebar from "../../components/shared/Sidebar";
import PriorityBadge from "../../components/shared/PriorityBadge";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import { ArrowLeft, MapPin, Building2, Heart } from "lucide-react";
import { mockRequests } from "../../data/mockData";
import { toast } from "sonner";
import Header from "../../components/shared/Header";

export default function DonorRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [donation, setDonation] = useState({
    item: "",
    quantity: "",
    deliveryTime: ""
  });

  const request = mockRequests.find(r => r.id === id);

  if (!request) {
    return null;
  }

  const handleDonate = () => {
    if (donation.item && donation.quantity) {
      toast.success("Donation intent submitted successfully!");
      setDialogOpen(false);
      navigate("/donor/my-donations");
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
              {request.id}
            </div>
          }
          subtitle={`${request.disasterType} Relief`}
          setSidebarOpen={setSidebarOpen} 
        />

        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <h2 className="text-xl font-bold text-gray-900">{request.ngoName}</h2>
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
                      <p className="font-medium text-gray-900">{request.location.name}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Required Items</h2>
                <div className="space-y-3">
                  {request.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{item.quantity}</p>
                        {item.critical && (
                          <span className="text-xs text-red-600 font-medium">Critical</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">Location</h3>
                <MapPlaceholder location={request.location} className="h-48" />
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
                <h3 className="font-bold text-gray-900 mb-4">Make an Impact</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Your donation will directly help people affected by {request.disasterType.toLowerCase()} in {request.location.name}.
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
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label>Select Item</Label>
                        <Select value={donation.item} onValueChange={(value) => setDonation({ ...donation, item: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose an item" />
                          </SelectTrigger>
                          <SelectContent>
                            {request.items.map((item, idx) => (
                              <SelectItem key={idx} value={item.name}>{item.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          placeholder="Enter quantity"
                          value={donation.quantity}
                          onChange={(e) => setDonation({ ...donation, quantity: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Estimated Delivery Time</Label>
                        <Select value={donation.deliveryTime} onValueChange={(value) => setDonation({ ...donation, deliveryTime: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24h">Within 24 hours</SelectItem>
                            <SelectItem value="48h">Within 48 hours</SelectItem>
                            <SelectItem value="week">Within a week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleDonate} className="w-full bg-green-600 hover:bg-green-700">
                        Confirm Donation
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </Card>

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
