import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Sidebar from "../../components/shared/Sidebar";
import PriorityBadge from "../../components/shared/PriorityBadge";
import { MapPin, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Header from "../../components/shared/Header";
import { fetchAvailableTasks, acceptTask } from "../../store/slices/volunteerSlice";

export default function VolunteerTasks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { availableTasks, loading } = useSelector((state) => state.volunteer);

  useEffect(() => {
    dispatch(fetchAvailableTasks());
  }, [dispatch]);

  const handleAccept = async (taskId) => {
    try {
      await dispatch(acceptTask(taskId)).unwrap();
      toast.success("Task accepted! NGO will contact you soon.");
      dispatch(fetchAvailableTasks());
    } catch (error) {
      toast.error(error.message || "Failed to accept task");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="volunteer" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="Nearby Requests" 
          subtitle="Volunteer opportunities matching your skills" 
          setSidebarOpen={setSidebarOpen} 
        />

        <div className="p-6">
          {loading && availableTasks.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
          ) : (
            <div className="grid gap-6">
              {availableTasks.length > 0 ? availableTasks.map((task) => (
                <Card key={task._id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {task.request_code || task._id.substring(0, 8)}
                        </h3>
                        <PriorityBadge priority={task.urgency_level} />
                      </div>
                      <p className="text-gray-600 mb-1">{task.disaster_type} Assistance</p>
                      <p className="text-gray-700 line-clamp-2">{task.description}</p>
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
                        <p className="font-medium text-gray-900">
                          {task.location?.coordinates?.join(", ") || "N/A"}
                        </p>
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
                        {(task.skills || ["General"]).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button onClick={() => handleAccept(task._id)} className="flex-1 bg-orange-600 hover:bg-orange-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Task
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </Card>
              )) : (
                <Card className="p-12 text-center text-gray-500">
                  <p>No available tasks in your area at the moment.</p>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
