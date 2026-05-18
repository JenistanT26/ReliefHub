import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Sidebar from "../../components/shared/Sidebar";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import PriorityBadge from "../../components/shared/PriorityBadge";
import { CheckCircle, Clock, Award, MapPin, Loader2 } from "lucide-react";
import Header from "../../components/shared/Header";
import { fetchVolunteerStats, fetchAvailableTasks, acceptTask } from "../../store/slices/volunteerSlice";
import { toast } from "sonner";

export default function VolunteerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { stats, availableTasks, loading, volunteer } = useSelector((state) => state.volunteer);

  useEffect(() => {
    dispatch(fetchVolunteerStats());
    dispatch(fetchAvailableTasks());
  }, [dispatch]);

  const handleAccept = async (taskId) => {
    try {
      await dispatch(acceptTask(taskId)).unwrap();
      toast.success("Task accepted! NGO will contact you soon.");
      dispatch(fetchAvailableTasks());
      dispatch(fetchVolunteerStats());
    } catch (error) {
      toast.error(error.message || "Failed to accept task");
    }
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  const nearbyTasks = availableTasks.slice(0, 4);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="volunteer" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="Volunteer Dashboard" 
          subtitle={`Welcome back, ${volunteer?.name || 'Volunteer'}`} 
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
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats?.tasksCompleted || 0}</p>
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
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats?.activeTasks || 0}</p>
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
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats?.totalHours || 0}</p>
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
                location={volunteer?.location ? { 
                  name: "Your Area", 
                  lat: volunteer.location.coordinates[1], 
                  lng: volunteer.location.coordinates[0] 
                } : { name: "Bangalore", lat: 12.9716, lng: 77.5946 }} 
                className="h-80"
              />
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Skill-based matching:</strong> Our AI finds opportunities matching your skills ({volunteer?.skills?.join(", ") || 'N/A'})
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
                {nearbyTasks.length > 0 ? nearbyTasks.map((task) => (
                  <div key={task._id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{task.request_code || task._id.substring(0, 8)}</p>
                        <p className="text-sm text-gray-600">{task.disaster_type} Assistance</p>
                      </div>
                      <PriorityBadge priority={task.urgency_level} />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      {task.location?.coordinates?.join(", ")}
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <span className="text-sm font-medium text-green-600">{task.matchScore}% Match</span>
                      <Button 
                        size="sm" 
                        onClick={() => handleAccept(task._id)}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        Accept Task
                      </Button>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 text-center py-8">No nearby tasks found.</p>
                )}
              </div>
            </Card>
          </div>

          {/* Recognition */}
          <Card className="p-8 mt-6 bg-gradient-to-br from-orange-50 to-yellow-50">
            <div className="text-center">
              <Award className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Outstanding Volunteer</h3>
              <p className="text-gray-600 mb-6">
                You're making a real difference. Your dedication is highly appreciated!
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div>
                  <p className="text-3xl font-bold text-orange-600">{stats?.peopleHelped || 0}</p>
                  <p className="text-sm text-gray-600 mt-1">People Helped</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">{stats?.reliefOperations || 0}</p>
                  <p className="text-sm text-gray-600 mt-1">Relief Operations</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">{stats?.rating || 0}/5</p>
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
