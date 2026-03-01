import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import Sidebar from "../../components/shared/Sidebar";
import StatusBadge from "../../components/shared/StatusBadge";
import { Package, MapPin, Calendar } from "lucide-react";
import Header from "../../components/shared/Header";

export default function DonorMyDonations() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const donations = [
    {
      id: "DON-001",
      requestId: "REQ-001",
      ngoName: "Red Cross India",
      items: "Food Packets (200)",
      location: "Patna, Bihar",
      date: "2026-02-19",
      status: "pending"
    },
    {
      id: "DON-002",
      requestId: "REQ-002",
      ngoName: "Care Foundation",
      items: "Blankets (100)",
      location: "Uttarkashi, Uttarakhand",
      date: "2026-02-15",
      status: "accepted"
    },
    {
      id: "DON-003",
      requestId: "REQ-004",
      ngoName: "Community Care",
      items: "Water Bottles (500)",
      location: "Latur, Maharashtra",
      date: "2026-02-10",
      status: "completed"
    }
  ];

  const pending = donations.filter(d => d.status === "pending");
  const accepted = donations.filter(d => d.status === "accepted");
  const completed = donations.filter(d => d.status === "completed");

  const DonationCard = ({ donation }) => (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{donation.id}</h3>
          <p className="text-gray-600">{donation.ngoName}</p>
        </div>
        <StatusBadge status={donation.status} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <Package className="w-4 h-4 text-gray-400" />
          <span>{donation.items}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{donation.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{donation.date}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-600">
          Request ID: <span className="text-blue-600 font-medium">{donation.requestId}</span>
        </p>
      </div>
    </Card>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="donor" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="My Donations" 
          subtitle="Track all your donation activities" 
          setSidebarOpen={setSidebarOpen} 
        />

        <div className="p-6">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({donations.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
              <TabsTrigger value="accepted">Accepted ({accepted.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {donations.map(donation => <DonationCard key={donation.id} donation={donation} />)}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {pending.map(donation => <DonationCard key={donation.id} donation={donation} />)}
              </div>
            </TabsContent>

            <TabsContent value="accepted" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {accepted.map(donation => <DonationCard key={donation.id} donation={donation} />)}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {completed.map(donation => <DonationCard key={donation.id} donation={donation} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
