import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createDonorItem } from "../../store/slices/donoritemSlice";

import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../components/ui/select";

import Sidebar from "../../components/shared/Sidebar";
import MapPlaceholder from "../../components/shared/MapPlaceholder";
import Header from "../../components/shared/Header";

import { Plus, X } from "lucide-react";
import { categories } from "../../data/mockData";
import { toast } from "sonner";

export default function DonorCreateRequest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { loading } = useSelector((state) => state.donor);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
    description: "",
    items: []
  });

  const [currentItem, setCurrentItem] = useState({
    item_name: "",
    quantity: "",
    category: "",
    critical: false
  });

  const addItem = () => {
    if (currentItem.item_name && currentItem.quantity && currentItem.category) {
      setFormData({
        ...formData,
        items: [
          ...formData.items,
          {
            ...currentItem,
            id: Date.now()
          }
        ]
      });

      setCurrentItem({
        item_name: "",
        quantity: "",
        category: "",
        critical: false
      });
    }
  };

  const removeItem = (id) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== id)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.items.length === 0) {
      toast.error("Please add at least one item");
      return;
    }

    try {
      await dispatch(createDonorItem(formData)).unwrap();

      toast.success("Donation created successfully!");

      navigate("/donor/my-donations");
    } catch (error) {
      toast.error(error || "Failed to create donation");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        role="donor"
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 overflow-auto">
        <Header
          title="Donate Items"
          subtitle="Submit available items"
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-6">
          <Card className="max-w-4xl mx-auto p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* ================= ITEMS ================= */}

              <div>
                <h3 className="text-lg font-bold mb-4">Available Items</h3>

                <div className="grid md:grid-cols-5 gap-3 mb-4">

                  <div className="md:col-span-2">
                    <Label>Item Name</Label>
                    <Input
                      placeholder="Food Packets"
                      value={currentItem.item_name}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          name: e.target.value
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={currentItem.quantity}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          quantity: e.target.value
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label>Category</Label>

                    <Select
                      value={currentItem.category}
                      onValueChange={(value) =>
                        setCurrentItem({
                          ...currentItem,
                          category: value
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>

                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      type="button"
                      onClick={addItem}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    checked={currentItem.critical}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        critical: e.target.checked
                      })
                    }
                  />

                  <Label className="font-normal">
                    Mark as critical item
                  </Label>
                </div>

                {/* ================= TABLE ================= */}

                {formData.items.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-3 text-left">Item</th>
                          <th className="p-3 text-left">Quantity</th>
                          <th className="p-3 text-left">Category</th>
                          <th className="p-3 text-left">Critical</th>
                          <th className="p-3 text-right">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {formData.items.map((item) => (
                          <tr key={item.id} className="border-t">
                            <td className="p-3">{item.item_name}</td>
                            <td className="p-3">{item.quantity}</td>
                            <td className="p-3">{item.category}</td>

                            <td className="p-3">
                              {item.critical && (
                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">
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
              </div>

              {/* ================= MAP ================= */}

              <div className="border-t pt-6">
                <Label>Location</Label>

                <MapPlaceholder
                  location={formData.location}
                  className="h-64 mt-2"
                />

                <p className="text-sm text-gray-500 mt-2">
                  Click on map to set location
                </p>
              </div>

              {/* ================= DESCRIPTION ================= */}

              <div>
                <Label>Description</Label>

                <Textarea
                  placeholder="Provide item details or expiry info"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value
                    })
                  }
                  rows={4}
                />
              </div>

              {/* ================= BUTTONS ================= */}

              <div className="flex gap-3 pt-6 border-t">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/donor/dashboard")}
                  className="flex-1"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
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