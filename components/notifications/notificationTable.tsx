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

const UserTable = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Notification title",
      message: "Notification message",
      date: "July 3, 2023 12:27 pm",
      status: "Sent",
    },
    {
      id: "2",
      title: "Notification title",
      message: "Notification message",
      date: "July 3, 2023 12:27 pm",
      status: "Scheduled",
    },
    {
      id: "3",
      title: "Notification title",
      message: "Notification message",
      date: "July 3, 2023 12:27 pm",
      status: "Draft",
    },
    {
      id: "4",
      title: "Notification title",
      message: "Notification message",
      date: "July 3, 2023 12:27 pm",
      status: "Sent",
    },
    {
      id: "5",
      title: "Notification title",
      message: "Notification message",
      date: "July 3, 2023 12:27 pm",
      status: "Draft",
    },
    {
      id: "6",
      title: "Notification title",
      message: "Notification message",
      date: "July 3, 2023 12:27 pm",
      status: "Sent",
    },
  ]);

  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered notifications based on search input
  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectNotification = (notificationId: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const handleDelete = () => {
    setNotifications((prev) =>
      prev.filter(
        (notification) => !selectedNotifications.includes(notification.id)
      )
    );
    setSelectedNotifications([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Notification List</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left w-10">
                <Checkbox
                  checked={
                    selectedNotifications.length ===
                      filteredNotifications.length &&
                    filteredNotifications.length > 0
                  }
                  onCheckedChange={() =>
                    setSelectedNotifications(
                      selectedNotifications.length ===
                        filteredNotifications.length
                        ? []
                        : filteredNotifications.map((n) => n.id)
                    )
                  }
                />
              </th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Message</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-right">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.map((notification) => (
              <tr
                key={notification.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4">
                  <Checkbox
                    checked={selectedNotifications.includes(notification.id)}
                    onCheckedChange={() =>
                      handleSelectNotification(notification.id)
                    }
                  />
                </td>
                <td className="py-4 px-4">{notification.title}</td>
                <td className="py-4 px-4">{notification.message}</td>
                <td className="py-4 px-4">{notification.date}</td>
                <td className="py-4 px-4 text-right">{notification.status}</td>
                <td className="py-4 px-4 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-5 w-5 text-gray-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2 bg-white shadow-md rounded-lg">
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          className="justify-start text-sm text-green-500"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start text-sm text-red-500"
                        >
                          Delete
                        </Button>
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
        <div className="flex items-start">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={selectedNotifications.length === 0}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500 mr-2">Displaying page</span>
          <Button variant="outline" size="sm" className="h-8 w-16">
            First
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8">
            &lt;
          </Button>
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className="h-8 w-8"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="h-8 w-8">
            &gt;
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-16">
            Last
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
