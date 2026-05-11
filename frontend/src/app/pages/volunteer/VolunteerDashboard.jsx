import { useState } from "react";
import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Sidebar from "../../components/shared/Sidebar";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import PriorityBadge from "../../components/shared/PriorityBadge";
import { CheckCircle, Clock, Award, MapPin } from "lucide-react";
import { mockRequests } from "../../data/mockData";
import Header from "../../components/shared/Header";

export default function VolunteerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = {
    tasksCompleted: 24,
    activeTasks: 2,
    totalHours: 156
  };

  const nearbyTasks = mockRequests.filter(r => r.status !== "fulfilled").slice(0, 4);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="volunteer" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="Volunteer Dashboard" 
          subtitle="Welcome back, Amit Singh" 
          setSidebarOpen={setSidebarOpen} 
          actions={
            <Link to="/volunteer/tasks">
              <Button className="bg-orange-600 hover:bg-orange-700">
                View All Tasks
              </Button>
            </Link>
          }
        />

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tasks Completed</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.tasksCompleted}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Lifetime contributions</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Tasks</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeTasks}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Currently in progress</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Hours</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalHours}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Volunteering time</p>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Map */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">Nearby Opportunities</h3>
              <MapPlaceholder 
                location={{ name: "Your Area - Bangalore", lat: 12.9716, lng: 77.5946 }} 
                className="h-80"
              />
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Skill-based matching:</strong> Our AI finds opportunities matching your skills (Medical Aid, Search & Rescue)
                </p>
              </div>
            </Card>

            {/* Nearby Tasks */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Recommended Tasks</h3>
                <Link to="/volunteer/tasks">
                  <Button variant="ghost" size="sm">View All</Button>
                </Link>
              </div>
              <div className="space-y-3">
                {nearbyTasks.map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{task.id}</p>
                        <p className="text-sm text-gray-600">{task.ngoName}</p>
                      </div>
                      <PriorityBadge priority={task.urgency} />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      {task.location.name}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <span className="text-sm font-medium text-green-600">92% Match</span>
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Accept Task
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recognition */}
          <Card className="p-8 mt-6 bg-gradient-to-br from-orange-50 to-yellow-50">
            <div className="text-center">
              <Award className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Outstanding Volunteer</h3>
              <p className="text-gray-600 mb-6">
                You're in the top 10% of volunteers! Your dedication is making a real difference.
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div>
                  <p className="text-3xl font-bold text-orange-600">1,240</p>
                  <p className="text-sm text-gray-600 mt-1">People Helped</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-gray-600 mt-1">Relief Operations</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">4.9/5</p>
                  <p className="text-sm text-gray-600 mt-1">Rating</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
