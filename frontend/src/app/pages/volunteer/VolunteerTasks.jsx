import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Sidebar from "../../components/shared/Sidebar";
import PriorityBadge from "../../components/shared/PriorityBadge";
import { MapPin, Calendar, CheckCircle } from "lucide-react";
import { mockRequests } from "../../data/mockData";
import { toast } from "sonner";

export default function VolunteerTasks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tasks = mockRequests.filter(r => r.status !== "fulfilled").map((req, idx) => ({
    ...req,
    skills: idx % 2 === 0 ? ["Medical Aid"] : ["Distribution"],
    matchScore: 92 - idx * 5
  }));

  const handleAccept = (taskId) => {
    toast.success("Task accepted! NGO will contact you soon.");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="volunteer" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Nearby Requests</h1>
            <p className="text-gray-600">Volunteer opportunities matching your skills</p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-6">
            {tasks.map((task) => (
              <Card key={task.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{task.id}</h3>
                      <PriorityBadge priority={task.urgency} />
                    </div>
                    <p className="text-gray-600 mb-1">{task.ngoName}</p>
                    <p className="text-gray-700">{task.description}</p>
                  </div>
                  <div className="text-right ml-6">
                    <div className="text-sm text-gray-600 mb-1">Match Score</div>
                    <div className="text-3xl font-bold text-green-600">{task.matchScore}%</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">{task.location.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Posted</p>
                      <p className="font-medium text-gray-900">{new Date(task.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Required Skills</p>
                    <div className="flex gap-2 mt-1">
                      {task.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button onClick={() => handleAccept(task.id)} className="flex-1 bg-orange-600 hover:bg-orange-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept Task
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
