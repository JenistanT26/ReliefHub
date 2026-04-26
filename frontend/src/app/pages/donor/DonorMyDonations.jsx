import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDonationIntentsByDonorId } from "../../store/slices/donoritemSlice";

import { Card } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";

import Sidebar from "../../components/shared/Sidebar";
import StatusBadge from "../../components/shared/StatusBadge";
import Header from "../../components/shared/Header";

import { Package, MapPin, Calendar, Search } from "lucide-react";

import { categories } from "../../data/mockData";

export default function DonorMyDonations() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const { donationIntents = [], loading } = useSelector(
    (state) => state.donorItems || {}
  );

  const donorId = "507f191e810c19729de860ea";

  /* Filters */
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [intentFilter, setIntentFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchDonationIntentsByDonorId(donorId));
  }, [dispatch, donorId]);

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredDonations = donationIntents.filter((donation) => {

    const matchesSearch =
      donation.donor_item_id?.item_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      donation.donor_item_id?.category === categoryFilter;

    const matchesIntent =
      intentFilter === "all" ||
      donation.intent_type === intentFilter;

    return matchesSearch && matchesCategory && matchesIntent;
  });

  /* Status Tabs */

  const pending = filteredDonations.filter((d) => d.status === "pending");
  const accepted = filteredDonations.filter((d) => d.status === "approved");
  const rejected = filteredDonations.filter((d) => d.status === "rejected");
  const completed = filteredDonations.filter((d) => d.status === "completed");

  /* ---------------- CARD ---------------- */

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

        <div className="flex items-center gap-2 text-gray-700">
          <Package className="w-4 h-4 text-gray-400" />
          <span>
            {donation.donor_item_id?.item_name} ({donation.quantity_offered})
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <Package className="w-4 h-4 text-gray-400" />
          <span>
            Category: {donation.donor_item_id?.category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>
            Disaster: {donation.relief_request_id?.disaster_type}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>
            Location: {donation.relief_request_id?.location?.coordinates?.join(", ")}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>
            {new Date(
              donation.createdAt || donation.updatedAt
            ).toLocaleDateString()}
          </span>
        </div>

      </div>

      <div className="mt-4 pt-4 border-t">

        <p className="text-sm text-gray-600">
          Request ID:
          <span className="text-blue-600 font-medium ml-1">
            {donation.relief_request_id?._id}
          </span>
        </p>

        {donation.request_item_id && (
          <p className="text-sm text-gray-600 mt-1">
            Requested Item:
            <span className="text-green-600 font-medium ml-1">
              {donation.request_item_id.item_name}
            </span>
          </p>
        )}

      </div>

    </Card>
  );

  /* ---------------- PAGE ---------------- */

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

          {/* FILTER CARD */}

          <Card className="p-4 mb-6">

            <div className="grid md:grid-cols-3 gap-4">

              {/* SEARCH */}

              <div className="relative">

                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

                <Input
                  placeholder="Search donations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />

              </div>

              {/* CATEGORY */}

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>

                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="all">All Categories</SelectItem>

                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}

                </SelectContent>

              </Select>

              {/* INTENT TYPE */}

              <Select value={intentFilter} onValueChange={setIntentFilter}>

                <SelectTrigger>
                  <SelectValue placeholder="Intent Type" />
                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="all">All Intents</SelectItem>

                  <SelectItem value="manual">
                    Manual Donation
                  </SelectItem>

                  <SelectItem value="auto_match">
                    Auto Matched
                  </SelectItem>

                </SelectContent>

              </Select>

            </div>

          </Card>

          {/* TABS */}

          <Tabs defaultValue="all">

            <TabsList>

              <TabsTrigger value="all">
                All ({filteredDonations.length})
              </TabsTrigger>

              <TabsTrigger value="pending">
                Pending ({pending.length})
              </TabsTrigger>

              <TabsTrigger value="accepted">
                Accepted ({accepted.length})
              </TabsTrigger>

              <TabsTrigger value="rejected">
                Rejected ({rejected.length})
              </TabsTrigger>

              <TabsTrigger value="completed">
                Completed ({completed.length})
              </TabsTrigger>

            </TabsList>

            {/* ALL */}

            <TabsContent value="all" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">

                {filteredDonations.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}

              </div>
            </TabsContent>

            {/* PENDING */}

            <TabsContent value="pending" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">

                {pending.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}

              </div>
            </TabsContent>

            {/* ACCEPTED */}

            <TabsContent value="accepted" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">

                {accepted.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}

              </div>
            </TabsContent>

            {/* REJECTED */}

            <TabsContent value="rejected" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">

                {rejected.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}

              </div>
            </TabsContent>

            {/* COMPLETED */}

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