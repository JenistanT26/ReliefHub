import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import RoleSelection from "./pages/auth/RoleSelection";
import Login from "./pages/auth/Login";
import NGORegister from "./pages/auth/NGORegister";
import DonorRegister from "./pages/auth/DonorRegister";
import VolunteerRegister from "./pages/auth/VolunteerRegister";
import NGODashboard from "./pages/ngo/NGODashboard";
import NGOCreateRequest from "./pages/ngo/NGOCreateRequest";
import NGOCreateVolunteerRequest from "./pages/ngo/NGOCreateVolunteerRequest";
import NGOMyRequests from "./pages/ngo/NGOMyRequests";
import NGORequestDetail from "./pages/ngo/NGORequestDetail";
import NGOMatches from "./pages/ngo/NGOMatches";
import NGOPriorityAlerts from "./pages/ngo/NGOPriorityAlerts";
import NGODonations from "./pages/ngo/NGODonations";
import DonorDashboard from "./pages/donor/DonorDashboard";
import DonorRequests from "./pages/donor/DonorRequests";
import DonorCreateRequest from "./pages/donor/DonorCreateRequest";
import DonorRequestDetail from "./pages/donor/DonorRequestDetail";
import DonorMyDonations from "./pages/donor/DonorMyDonations";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import VolunteerTasks from "./pages/volunteer/VolunteerTasks";
import VolunteerHistory from "./pages/volunteer/VolunteerHistory";
import AIVisualization from "./pages/AIVisualization";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/role-selection",
    Component: RoleSelection,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register/ngo",
    Component: NGORegister,
  },
  {
    path: "/register/donor",
    Component: DonorRegister,
  },
  {
    path: "/register/volunteer",
    Component: VolunteerRegister,
  },
  {
    path: "/ngo/dashboard",
    Component: NGODashboard,
  },
  {
    path: "/ngo/create-request",
    Component: NGOCreateRequest,
  },
  {
    path: "/ngo/create-volunteer-request",
    Component: NGOCreateVolunteerRequest,
  },
  {
    path: "/ngo/requests",
    Component: NGOMyRequests,
  },
  {
    path: "/ngo/requests/:id",
    Component: NGORequestDetail,
  },
  {
    path: "/ngo/matches",
    Component: NGOMatches,
  },
  {
    path: "/ngo/priority-alerts",
    Component: NGOPriorityAlerts,
  },
  {
    path: "/ngo/donations",
    Component: NGODonations,
  },
  {
    path: "/donor/dashboard",
    Component: DonorDashboard,
  },
  {
    path: "/donor/requests",
    Component: DonorRequests,
  },
  {
    path: "/donor/create-request",
    Component: DonorCreateRequest,
  },
  {
    path: "/donor/requests/:id",
    Component: DonorRequestDetail,
  },
  {
    path: "/donor/my-donations",
    Component: DonorMyDonations,
  },
  {
    path: "/volunteer/dashboard",
    Component: VolunteerDashboard,
  },
  {
    path: "/volunteer/tasks",
    Component: VolunteerTasks,
  },
  {
    path: "/volunteer/history",
    Component: VolunteerHistory,
  },
  {
    path: "/ai-system",
    Component: AIVisualization,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/notifications",
    Component: Notifications,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
