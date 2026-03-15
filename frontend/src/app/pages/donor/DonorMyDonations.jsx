import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDonationIntentsByDonorId } from "../../store/slices/donoritemSlice";

import { Card } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

import Sidebar from "../../components/shared/Sidebar";
import StatusBadge from "../../components/shared/StatusBadge";
import Header from "../../components/shared/Header";

import { Package, MapPin, Calendar } from "lucide-react";

export default function DonorMyDonations() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const { donationIntents, loading } = useSelector(
    (state) => state.donorItems
  );

  /* Temporary donor id until auth is implemented */
  const donorId = "507f191e810c19729de860ea";

  useEffect(() => {
    dispatch(fetchDonationIntentsByDonorId(donorId));
  }, [dispatch]);

  /* Transform API data → UI friendly structure */

  const donations = donationIntents;

  console.log("Donation intents:", donationIntents);

  const pending = donations.filter((d) => d.status === "pending");
  const accepted = donations.filter((d) => d.status === "approved");
  const rejected = donations.filter((d) => d.status === "rejected");
  const completed = donations.filter((d) => d.status === "completed");

  const DonationCard = ({ donation }) => (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">
            {donation.donor_item_id?.item_name}
          </h3>

          <p className="text-gray-600">
            NGO ID: {donation.relief_request_id?.ngo_id}
          </p>
        </div>

        <StatusBadge status={donation.status} />
      </div>

      <div className="space-y-3">
        {/* Item + Quantity */}
        <div className="flex items-center gap-2 text-gray-700">
          <Package className="w-4 h-4 text-gray-400" />
          <span>
            {donation.donor_item_id?.item_name} ({donation.quantity_offered})
          </span>
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 text-gray-700">
          <Package className="w-4 h-4 text-gray-400" />
          <span>
            Category: {donation.donor_item_id?.category}
          </span>
        </div>

        {/* Disaster Type */}
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>
            Disaster: {donation.relief_request_id?.disaster_type}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>
            Location: {donation.relief_request_id?.location?.coordinates?.join(", ")}
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>
            {new Date(donation.createdAt || donation.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-600">
          Request ID:{" "}
          <span className="text-blue-600 font-medium">
            {donation.relief_request_id?._id}
          </span>
        </p>

        {donation.request_item_id && (
          <p className="text-sm text-gray-600 mt-1">
            Requested Item:{" "}
            <span className="text-green-600 font-medium">
              {donation.request_item_id.item_name}
            </span>
          </p>
        )}
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
              <TabsTrigger value="rejected">Rejected ({rejected.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {donations.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {pending.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accepted" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {accepted.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {completed.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}
              </div>
            </TabsContent>

          </Tabs>

        </div>
      </div>
    </div>
  );
}