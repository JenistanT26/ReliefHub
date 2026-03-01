import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Sidebar from "../../components/shared/Sidebar";
import PriorityBadge from "../../components/shared/PriorityBadge";
import { AlertTriangle, Clock, MapPin } from "lucide-react";
import { mockRequests } from "../../data/mockData";
import Header from "../../components/shared/Header";

export default function NGOPriorityAlerts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const myRequests = mockRequests.filter(r => r.ngoId === "NGO-001");
  const filteredRequests = filter === "all" 
    ? myRequests 
    : myRequests.filter(r => r.urgency === filter);

  // Sort by priority (highest first)
  const sortedRequests = [...filteredRequests].sort((a, b) => b.priority - a.priority);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="ngo" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="Priority Alerts" 
          subtitle="Requests sorted by AI priority score" 
          setSidebarOpen={setSidebarOpen} 
        />

        <div className="p-6">
          {/* Filters */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All Priorities
            </Button>
            <Button
              variant={filter === "high" ? "default" : "outline"}
              onClick={() => setFilter("high")}
              className={filter === "high" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              High Priority
            </Button>
            <Button
              variant={filter === "medium" ? "default" : "outline"}
              onClick={() => setFilter("medium")}
              className={filter === "medium" ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              Medium Priority
            </Button>
            <Button
              variant={filter === "low" ? "default" : "outline"}
              onClick={() => setFilter("low")}
              className={filter === "low" ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Low Priority
            </Button>
          </div>

          {/* Alerts Grid */}
          <div className="grid gap-4">
            {sortedRequests.map((request) => (
              <Card
                key={request.id}
                className={`p-6 transition-all ${
                  request.urgency === "high"
                    ? "border-l-4 border-l-red-500 bg-red-50/50"
                    : request.urgency === "medium"
                    ? "border-l-4 border-l-orange-500"
                    : "border-l-4 border-l-green-500"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        request.urgency === "high"
                          ? "bg-red-600"
                          : request.urgency === "medium"
                          ? "bg-orange-600"
                          : "bg-green-600"
                      }`}
                    >
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{request.id}</h3>
                        <PriorityBadge priority={request.urgency} />
                      </div>
                      <p className="text-gray-700 mb-3">{request.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {request.location.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(request.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm text-gray-600 mb-1">Priority Score</div>
                    <div
                      className={`text-3xl font-bold ${
                        request.priority >= 80
                          ? "text-red-600"
                          : request.priority >= 60
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {request.priority}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    {request.items.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white rounded text-sm">
                        {item.name}
                      </span>
                    ))}
                    {request.items.length > 3 && (
                      <span className="px-2 py-1 bg-gray-200 rounded text-sm">
                        +{request.items.length - 3}
                      </span>
                    )}
                  </div>
                  <Link to={`/ngo/requests/${request.id}`}>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {sortedRequests.length === 0 && (
            <Card className="p-12 text-center">
              <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No alerts found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
