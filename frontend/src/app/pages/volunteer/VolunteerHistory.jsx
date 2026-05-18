import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../components/ui/card";
import Sidebar from "../../components/shared/Sidebar";
import StatusBadge from "../../components/shared/StatusBadge";
import { MapPin, Calendar, Award, Loader2 } from "lucide-react";
import Header from "../../components/shared/Header";
import { fetchVolunteerHistory } from "../../store/slices/volunteerSlice";

export default function VolunteerHistory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { history, loading } = useSelector((state) => state.volunteer);

  useEffect(() => {
    dispatch(fetchVolunteerHistory());
  }, [dispatch]);

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
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            </div>
          ) : history.length > 0 ? (
            <div className="grid gap-6">
              {history.map((assignment) => (
                <Card key={assignment._id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {assignment.request_id?.request_code || assignment._id.substring(0, 8)}
                      </h3>
                      <p className="text-gray-600">{assignment.request_id?.disaster_type} Relief</p>
                    </div>
                    <StatusBadge status={assignment.status} />
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium text-gray-900">
                          {assignment.request_id?.location?.coordinates?.join(", ") || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Assigned Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(assignment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Skill Used</p>
                      <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm mt-1">
                        {assignment.skill_used || "General Assistance"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hours</p>
                      <p className="font-bold text-gray-900">{assignment.hours_logged}h</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-900">
                        Rating: {assignment.rating ? `${assignment.rating}/5` : "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Request ID: <span className="text-blue-600 font-medium">{assignment.request_id?._id || "N/A"}</span>
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center text-gray-500">
              <p>You haven't accepted any tasks yet.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
