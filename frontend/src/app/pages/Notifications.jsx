import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Navbar from "../components/shared/Navbar";
import { Bell, Heart, Users, Lock, CheckCircle, Trash2 } from "lucide-react";
import { mockNotifications } from "../data/mockData";

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unread = notifications.filter(n => !n.read);
  const read = notifications.filter(n => n.read);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "match":
        return <Users className="w-5 h-5 text-blue-600" />;
      case "donation":
        return <Heart className="w-5 h-5 text-green-600" />;
      case "task":
        return <CheckCircle className="w-5 h-5 text-orange-600" />;
      case "locked":
        return <Lock className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50/50";
      case "medium":
        return "border-l-orange-500 bg-orange-50/50";
      case "low":
        return "border-l-green-500 bg-green-50/50";
      default:
        return "border-l-gray-300";
    }
  };

  const NotificationCard = ({ notification }) => (
    <Card 
      className={`p-4 border-l-4 transition-all ${
        !notification.read ? getPriorityColor(notification.priority) : "border-l-gray-300"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          {getIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-gray-900">{notification.title}</h3>
            {!notification.read && (
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </div>
          <p className="text-gray-700 mb-2">{notification.message}</p>
          <p className="text-sm text-gray-500">
            {new Date(notification.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {!notification.read && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => markAsRead(notification.id)}
              className="text-blue-600 hover:text-blue-700"
            >
              Mark Read
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => deleteNotification(notification.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar user={{ name: "User" }} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
          <p className="text-gray-600">
            Stay updated with matches, donations, and important alerts
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">
              {unread.length} unread notification{unread.length !== 1 ? 's' : ''}
            </span>
          </div>
          {unread.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unread.length})</TabsTrigger>
            <TabsTrigger value="read">Read ({read.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <Card className="p-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-600">You're all caught up!</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {unread.length > 0 ? (
              unread.map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <Card className="p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-600">No unread notifications</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="read" className="space-y-4">
            {read.length > 0 ? (
              read.map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <Card className="p-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No read notifications</h3>
                <p className="text-gray-600">Read notifications will appear here</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
