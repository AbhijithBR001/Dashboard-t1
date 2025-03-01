"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/layout/dashboard-layout";

const ActivityHistory = () => {
  const [activities, setActivities] = useState([
    { id: "1", user: { name: "Yeray Rosalos", image: "/user.png" }, action: "Log In", dateTime: "July 3, 2023 12:29 pm" },
    { id: "2", user: { name: "Alan Robert", image: "/user2.png" }, action: "Booked Product", dateTime: "July 3, 2023 12:27 pm" },
    { id: "3", user: { name: "Yeray Rosalos", image: "/user.png" }, action: "Selling Product", dateTime: "July 3, 2023 12:29 pm" },
    { id: "4", user: { name: "Alan Robert", image: "/user2.png" }, action: "Commented", dateTime: "July 3, 2023 12:27 pm" },
    { id: "5", user: { name: "Yeray Rosalos", image: "/user.png" }, action: "Bought Product", dateTime: "July 3, 2023 12:29 pm" },
    { id: "6", user: { name: "Alan Robert", image: "/user2.png" }, action: "Log out", dateTime: "July 3, 2023 12:27 pm" },
    { id: "7", user: { name: "Yeray Rosalos", image: "/user.png" }, action: "Delete Product", dateTime: "July 3, 2023 12:29 pm" },
    { id: "8", user: { name: "Alan Robert", image: "/user2.png" }, action: "Share Product", dateTime: "July 3, 2023 12:27 pm" },
  ]);

  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered activities based on search input
  const filteredActivities = activities.filter(
    (activity) =>
      activity.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.dateTime.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectActivity = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
    );
  };

  const handleDelete = () => {
    setActivities((prev) => prev.filter((activity) => !selectedActivities.includes(activity.id)));
    setSelectedActivities([]);
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Activity History</h2>
            <p className="text-sm text-gray-500 mt-1">
              View historical data of actions taken within the app.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <div className="relative flex-1 md:w-80 lg:w-96">
              <Input
                type="text"
                placeholder="Search by user, date, or activity type"
                className="pr-10 w-full rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-0 top-0 h-full bg-teal-500 hover:bg-teal-600 text-white rounded-l-none rounded-xl">
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left w-10">
                  <Checkbox
                    checked={selectedActivities.length === filteredActivities.length && filteredActivities.length > 0}
                    onCheckedChange={() =>
                      setSelectedActivities(selectedActivities.length === filteredActivities.length ? [] : filteredActivities.map((a) => a.id))
                    }
                  />
                </th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Action</th>
                <th className="py-3 px-4 text-left">Date & Time</th>
                <th className="py-3 px-4 text-right">Options</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <Checkbox checked={selectedActivities.includes(activity.id)} onCheckedChange={() => handleSelectActivity(activity.id)} />
                  </td>
                  <td className="py-4 px-4 flex items-center gap-3">
                    <img src={activity.user.image} alt={activity.user.name} className="h-10 w-10 rounded-full object-cover" />
                    <span className="font-medium">{activity.user.name}</span>
                  </td>
                  <td className="py-4 px-4">{activity.action}</td>
                  <td className="py-4 px-4">{activity.dateTime}</td>
                  <td className="py-4 px-4 text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-5 w-5 text-gray-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-42 p-2 bg-white shadow-md rounded-lg">
                        <div className="flex flex-col space-y-1">
                          <Button variant="ghost" className="justify-start text-sm">View Details</Button>
                          <Button variant="ghost" className="justify-start text-sm text-red-500">Delete Record</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center">
            <Button variant="destructive" onClick={handleDelete} disabled={selectedActivities.length === 0} className="bg-red-500 hover:bg-red-600">
              Delete
            </Button>
            <span className="ml-4 text-sm text-gray-500">
              Showing {filteredActivities.length} of {activities.length} total activities
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActivityHistory;
