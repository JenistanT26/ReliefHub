import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Sidebar from "../../components/shared/Sidebar";
import PriorityBadge from "../../components/shared/PriorityBadge";
import StatusBadge from "../../components/shared/StatusBadge";
import { Search, Filter, MapPin, Package, Calendar, Activity } from "lucide-react";
import { mockRequests } from "../../data/mockData";
import Header from "../../components/shared/Header";
import { fetchRequests, setSelectedRequest } from "../../store/slices/requestSlice.js";
import { useSelector,useDispatch } from "react-redux";

export default function NGOMyRequests() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  // const [details, setDetails] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {requests,loading,error} = useSelector((state) => state.requests)
  

  const myRequests = mockRequests.filter(r => r.ngoId === "NGO-001");

  const filteredRequests = myRequests.filter(request => {
    const matchesSearch = request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.disasterType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleClick = (request) => {
    // console.log(request)
    dispatch(setSelectedRequest(request))
    navigate(`/ngo/requests/${request._id}`)
  }
  // useEffect(()=>{
  //   async function fetchData() {
  //     const response = await API.get('/request')
  //     console.log(response.data.data)
  //     setDetails(response.data.data)
  //     // console.log(details)
  //   }
  //   fetchData()
  // },[dispatch])
  useEffect(()=>{
    dispatch(fetchRequests())
  },[dispatch])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="ngo" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <Header 
          title="My Requests" 
          subtitle="Manage your outgoing relief requests and their matched responses." 
          setSidebarOpen={setSidebarOpen} 
          actions={
            <Link to="/ngo/create-request">
              <Button className="bg-blue-600 hover:bg-blue-700">Create New Request</Button>
            </Link>
          }
        />

        <div className="p-6">
          {/* Filters */}
          <Card className="p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by ID, disaster type, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "open" ? "default" : "outline"}
                  onClick={() => setFilterStatus("open")}
                  size="sm"
                >
                  Open
                </Button>
                <Button
                  variant={filterStatus === "matching" ? "default" : "outline"}
                  onClick={() => setFilterStatus("matching")}
                  size="sm"
                >
                  Matching
                </Button>
                <Button
                  variant={filterStatus === "fulfilled" ? "default" : "outline"}
                  onClick={() => setFilterStatus("fulfilled")}
                  size="sm"
                >
                  Fulfilled
                </Button>
              </div>
            </div>
          </Card>

          {/* Requests Grid */}
          <div className="grid gap-6">
            {requests.map((request) => (
              <Card key={request._id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {/* <h3 className="text-xl font-bold text-gray-900">{request.id}</h3> */}
                      <h3 className="text-xl font-bold text-gray-900">{request.request_code}</h3>
                      <StatusBadge status={request.status} />
                      <PriorityBadge priority={request.urgency_level} />
                    </div>
                    <p className="text-gray-600">{request.disaster_type} Relief</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">AI Priority Score</div>
                    <div className="text-3xl font-bold text-blue-600">91</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{request.description}</p>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium text-gray-900">Chennai</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Items Required</p>
                      <p className="font-medium text-gray-900">{request.items.length} items</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Matches Found</p>
                    <p className="font-medium text-gray-900">
                      {/* {request.matches.donors} donors, {request.matches.volunteers} volunteers */}
                      1 donors, 3 volunteers
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {request.items.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {item.item_name} ({item.quantity})
                    </span>
                  ))}
                  {request.items.length > 3 && (
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">
                      +{request.items.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  {/* <Link to={`/ngo/requests/${request._id}`} className="flex-1">
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Link> */}
                    <Button variant="outline" className="w-full flex-1" onClick={()=>handleClick(request)}>View Details</Button>
                  {request.status === "open" && (
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                      {/* View Matches ({request.matches.donors + request.matches.volunteers}) */}
                      View Matches
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <Card className="p-12 text-center">
              <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}