import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import Sidebar from "../../components/shared/Sidebar";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import { Plus, X, AlertCircle } from "lucide-react";
import { disasters, categories } from "../../data/mockData";
import { toast } from "sonner";
import API from "../../api/axios";
// import api from '../../api/axios'

export default function NGOCreateRequest() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    disaster_type: "",
    latitude: null || 80.2707, 
    longitude: null || 13.0827,
    urgency_level: "",
    description: "",
    items: []
  });
  const [currentItem, setCurrentItem] = useState({
    name: "",
    quantity: "",
    category: "",
    critical: "Standard"
  });

  const addItem = () => {
    if (currentItem.name && currentItem.quantity && currentItem.category) {
      setFormData({
        ...formData,
        items: [...formData.items, { ...currentItem }]
      });
      setCurrentItem({ name: "", quantity: "", category: "", critical: "Standard" });
    }
  };

  const removeItem = (id) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== id)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.items.length === 0) {
      toast.error("Please add at least one item to the request");
      return;
    }
    try {
      const response = API.post('/request',formData)
      toast.success("Relief request created successfully!");
      navigate("/ngo/requests");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
    
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="ngo" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Create Relief Request</h1>
            <p className="text-gray-600">Submit a new disaster relief request</p>
          </div>
        </div>

        <div className="p-6">
          <Card className="max-w-4xl mx-auto p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="disasterType">Disaster Type *</Label>
                  <Select value={formData.disaster_type} onValueChange={(value) => setFormData({ ...formData, disaster_type: value })} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select disaster type" />
                    </SelectTrigger>
                    <SelectContent>
                      {disasters.map((disaster) => (
                        <SelectItem key={disaster.id} value={disaster.name}>
                          {disaster.icon} {disaster.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="urgency">Urgency Level *</Label>
                  <Select value={formData.urgency_level} onValueChange={(value) => setFormData({ ...formData, urgency_level: value })} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">🔴 High - Critical</SelectItem>
                      <SelectItem value="medium">🟠 Medium - Moderate</SelectItem>
                      <SelectItem value="low">🟢 Low - Routine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Location *</Label>
                <MapPlaceholder location={formData.location} className="h-64 mt-2" />
                <p className="text-sm text-gray-500 mt-2">Click on map to set disaster location</p>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the situation, number of affected people, immediate needs, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Required Items</h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Add all required relief items</p>
                      <p className="mt-1">Specify item name, quantity, category, and mark critical items</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-5 gap-3 mb-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="itemName" className="text-sm">Item Name</Label>
                    <Input
                      id="itemName"
                      placeholder="e.g., Food Packets"
                      value={currentItem.name}
                      onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity" className="text-sm">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="0"
                      value={currentItem.quantity}
                      onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-sm">Category</Label>
                    <Select value={currentItem.category} onValueChange={(value) => setCurrentItem({ ...currentItem, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button type="button" onClick={addItem} className="w-full bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    id="critical"
                    checked={currentItem.critical}
                    onChange={(e) => setCurrentItem({ ...currentItem, critical: e.target.checked ?"Critical":"Standard" })}
                  />
                  <Label htmlFor="critical" className="font-normal cursor-pointer">
                    Mark as critical item
                  </Label>
                </div>

                {formData.items.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium text-gray-700">Item Name</th>
                          <th className="text-left p-3 text-sm font-medium text-gray-700">Quantity</th>
                          <th className="text-left p-3 text-sm font-medium text-gray-700">Category</th>
                          <th className="text-left p-3 text-sm font-medium text-gray-700">Critical</th>
                          <th className="text-right p-3 text-sm font-medium text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.items.map((item) => (
                          <tr key={item.id} className="border-t">
                            <td className="p-3">{item.name}</td>
                            <td className="p-3">{item.quantity}</td>
                            <td className="p-3">
                              <span className="px-2 py-1 bg-gray-100 rounded text-sm">{item.category}</span>
                            </td>
                            <td className="p-3">
                              {item.critical && (
                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-medium">
                                  Critical
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-right">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                              >
                                <X className="w-4 h-4 text-red-600" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {formData.items.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No items added yet. Add items using the form above.
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/ngo/dashboard")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Submit Request
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
