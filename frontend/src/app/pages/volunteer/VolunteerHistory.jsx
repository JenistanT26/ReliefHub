import { useState } from "react";
import { Card } from "../../components/ui/card";
import Sidebar from "../../components/shared/Sidebar";
import StatusBadge from "../../components/shared/StatusBadge";
import { MapPin, Calendar, Award } from "lucide-react";
import Header from "../../components/shared/Header";

export default function VolunteerHistory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const history = [
    {
      id: "TASK-001",
      requestId: "REQ-001",
      ngoName: "Red Cross India",
      location: "Patna, Bihar",
      skill: "Medical Aid",
      date: "2026-02-15",
      hours: 8,
      rating: 5,
      status: "completed"
    },
    {
      id: "TASK-002",
      requestId: "REQ-002",
      ngoName: "Care Foundation",
      location: "Uttarkashi, Uttarakhand",
      skill: "Search & Rescue",
      date: "2026-02-10",
      hours: 12,
      rating: 5,
      status: "completed"
    },
    {
      id: "TASK-003",
      requestId: "REQ-003",
      ngoName: "Helping Hands NGO",
      location: "Puri, Odisha",
      skill: "Distribution",
      date: "2026-02-05",
      hours: 6,
      rating: 4,
      status: "completed"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="volunteer" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="Task History" 
          subtitle="Your volunteering journey" 
          setSidebarOpen={setSidebarOpen} 
        />

        <div className="p-6">
          <div className="grid gap-6">
            {history.map((task) => (
              <Card key={task.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{task.id}</h3>
                    <p className="text-gray-600">{task.ngoName}</p>
                  </div>
                  <StatusBadge status={task.status} />
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{task.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium text-gray-900">{task.date}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Skill Used</p>
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm mt-1">
                      {task.skill}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hours</p>
                    <p className="font-bold text-gray-900">{task.hours}h</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">
                      Rating: {task.rating}/5
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Request: <span className="text-blue-600 font-medium">{task.requestId}</span>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
