"use client";
import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UserTable from "@/components/notifications/notificationTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PushNotifications = () => {
  const [sendTo, setSendTo] = useState("all");

  // Dummy data for browser usage

  return (
    <DashboardLayout>
      <div className="min-h-screen  p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border-t-4 border-red-400">
            <h1 className="text-xl font-semibold mb-1">Push Notifications</h1>
            <p className="text-gray-500 mb-6">
              Create and manage push notifications.
            </p>

            {/* Notification Title Input */}
            <label htmlFor="Notification" className="text-sm font-bold">
              Notification Title
            </label>
            <Input
              type="text"
              className="w-full p-3 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Message Input */}
            <label htmlFor="Message" className="text-sm font-bold">
              Message
            </label>

            <Textarea className="w-full p-3 border rounded-xl mb-4 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"></Textarea>

            <div className="flex gap-6">
              {/* Send To Selection */}
              <div className="w-1/2">
                <h2 className="text-black font-bold mb-2">Send to</h2>
                <div className="border rounded-xl p-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sendTo"
                      value="single"
                      checked={sendTo === "single"}
                      onChange={() => setSendTo("single")}
                      className="mr-2"
                    />
                    Single
                  </label>
                  <label className="flex items-center mt-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sendTo"
                      value="all"
                      checked={sendTo === "all"}
                      onChange={() => setSendTo("all")}
                      className="mr-2"
                    />
                    All
                  </label>
                </div>
              </div>

              {/* Banner Upload */}
              <div className="w-1/2">
                <h2 className="text-black font-bold mb-2">Banner</h2>
                <div className="border rounded-xl p-3 text-center cursor-pointer h-4/6">
                  <label
                    htmlFor="upload"
                    className="text-blue-500 underline cursor-pointer flex items-center justify-center h-full"
                  >
                    Upload Profile Pictures
                  </label>
                  <input type="file" id="upload" className="hidden" />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-12 justify-center">
              <button className="bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600">
                Send Now
              </button>
              <button className="border border-teal-500 text-teal-500 px-4 py-2 rounded-xl hover:bg-teal-100">
                Schedule for Later
              </button>
            </div>
          </div>

        <UserTable/>
          
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PushNotifications;
