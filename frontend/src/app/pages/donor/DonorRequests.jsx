import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";

import Sidebar from "../../components/shared/Sidebar";
import Header from "../../components/shared/Header";
import PriorityBadge from "../../components/shared/PriorityBadge";
import PageLoader from "../Loading"

import { Search, MapPin, Package } from "lucide-react";

import { fetchRequests } from "../../store/slices/requestSlice";

export default function DonorRequests() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  const dispatch = useDispatch();

  const { requests, loading } = useSelector((state) => state.requests);

  useEffect(() => {
  // Initial fetch
  dispatch(fetchRequests());

  // Polling every 5 seconds
  const interval = setInterval(() => {
    dispatch(fetchRequests());
  }, 5000);

  return () => clearInterval(interval);
}, [dispatch]);

  // if (loading) {
  //   return (
  //     <PageLoader
  //       title="Loading Relief Requests"
  //       subtitle="Finding requests you can help with..."
  //     />
  //   );
  // }

  const openRequests =
    requests;

  /* =============================
     Dynamic Categories from DB
  ============================== */

  const categories = [
    ...new Set(
      openRequests.flatMap((r) =>
        r.items?.map((item) => item.category) || []
      )
    ),
  ];

  /* =============================
     Filtering
  ============================== */

  const filteredRequests = openRequests.filter((request) => {

    const matchesSearch =
      request._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.ngoName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.location?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      request.items?.some((item) => item.category === categoryFilter);

    const matchesUrgency =
      urgencyFilter === "all" || request.urgency === urgencyFilter;

    return matchesSearch && matchesCategory && matchesUrgency;
  });

  return (
    <div className="flex h-screen bg-gray-50">

      <Sidebar
        role="donor"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 overflow-auto">

        <Header
          title="Available Requests"
          subtitle="Browse and respond to relief requests"
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-6">
          {/* Filters */}
          <Card className="p-4 mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category */}

              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    All Categories
                  </SelectItem>

                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Urgency */}

              <Select
                value={urgencyFilter}
                onValueChange={setUrgencyFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="all">
                    All Urgency
                  </SelectItem>

                  <SelectItem value="high">
                    High Priority
                  </SelectItem>

                  <SelectItem value="medium">
                    Medium Priority
                  </SelectItem>

                  <SelectItem value="low">
                    Low Priority
                  </SelectItem>

                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Requests Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredRequests.map((request) => (

              <Card
                key={request._id}
                className="p-6 hover:shadow-lg transition-shadow"
              >

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {request.request_code}
                    </h3>

                    <p className="text-gray-600">
                      {request.ngoName || "ABC Relief Organization"}
                    </p>
                  </div>

                  <PriorityBadge priority={request.urgency} />

                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">
                  {request.description}
                </p>

                <div className="space-y-2 mb-4">

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {request.location?.name || "Unknown location"}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Package className="w-4 h-4" />
                    {request.items?.length || 0} items required
                  </div>

                </div>

                <div className="flex flex-wrap gap-2 mb-4">

                  {request.items?.slice(0, 2)?.map((item, idx) => (

                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 rounded text-xs"
                    >
                      {item.item_name}
                    </span>

                  ))}

                  {request.items?.length > 2 && (

                    <span className="px-2 py-1 bg-gray-200 rounded text-xs font-medium">
                      +{request.items.length - 2}
                    </span>

                  )}

                </div>

                <Link
                  to={`/donor/requests/${request._id}`}
                  className="block"
                >

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    View Details & Donate
                  </Button>

                </Link>

              </Card>

            ))}

          </div>

          {/* Empty State */}

          {filteredRequests.length === 0 && (

            <Card className="p-12 text-center">

              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No requests found
              </h3>

              <p className="text-gray-600">
                Try adjusting your filters
              </p>

            </Card>

          )}

        </div>

      </div>

    </div>
  );
}