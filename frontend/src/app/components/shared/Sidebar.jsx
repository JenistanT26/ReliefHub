import { useState } from "react";
import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  FileText, 
  List, 
  Users, 
  AlertTriangle, 
  Heart, 
  User, 
  LogOut,
  CheckSquare,
  History,
  Building2,
  BarChart3,
  Shield,
  Menu
} from "lucide-react";
import { cn } from "../ui/utils";

const roleMenus = {
  ngo: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/ngo/dashboard" },
    { icon: FileText, label: "Create Request", path: "/ngo/create-request" },
    { icon: List, label: "My Requests", path: "/ngo/requests" },
    { icon: Users, label: "Matches", path: "/ngo/matches" },
    { icon: AlertTriangle, label: "Priority Alerts", path: "/ngo/priority-alerts" },
    { icon: Heart, label: "Donations Received", path: "/ngo/donations" },
    { icon: User, label: "Profile", path: "/profile" }
  ],
  donor: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/donor/dashboard" },
    { icon: List, label: "Available Requests", path: "/donor/requests" },
    { icon: Heart, label: "My Donations", path: "/donor/my-donations" },
    { icon: User, label: "Profile", path: "/profile" }
  ],
  volunteer: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/volunteer/dashboard" },
    { icon: List, label: "Nearby Requests", path: "/volunteer/tasks" },
    { icon: CheckSquare, label: "Assigned Tasks", path: "/volunteer/tasks" },
    { icon: History, label: "History", path: "/volunteer/history" },
    { icon: User, label: "Profile", path: "/profile" }
  ],
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Building2, label: "All NGOs", path: "/admin/dashboard" },
    { icon: List, label: "All Requests", path: "/admin/dashboard" },
    { icon: BarChart3, label: "Analytics", path: "/admin/dashboard" },
    { icon: Shield, label: "System Stats", path: "/admin/dashboard" }
  ]
};

export default function Sidebar({ role = "ngo", isOpen = false, onClose = () => {} }) {
  const location = useLocation();
  const [internalOpen, setInternalOpen] = useState(false);
  const menuItems = roleMenus[role] || roleMenus.ngo;

  const isSidebarOpen = isOpen || internalOpen;

  const handleClose = () => {
    setInternalOpen(false);
    if (onClose) onClose();
  };

  const handleOpen = () => {
    setInternalOpen(true);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 border-b border-gray-200 flex items-center px-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                ReliefHub
              </span>
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <div className="space-y-1 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-gray-200">
            <Link
              to="/"
              onClick={handleClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
