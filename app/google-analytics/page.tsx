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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const GoogleAnalytics = () => {
  // Dummy data for browser usage
  const browserData = {
    labels: ["Chrome", "Safari", "Edge", "Firefox", "Other"],
    datasets: [
      {
        data: [4200, 2800, 1200, 800, 400],
        backgroundColor: "#7CB5EC",
        barThickness: 20,
      },
    ],
  };
  const [connectionStatus, setConnectionStatus] = useState<string>("");
  // Dummy data for device categories
  const deviceData = {
    labels: ["Mobile", "Desktop", "Tablet"],
    datasets: [
      {
        data: [75, 15, 10],
        backgroundColor: ["#2563EB", "#93C5FD", "#EFF6FF"],
        borderWidth: 0,
      },
    ],
  };

  // Dummy data for location categories
  const locationData = {
    labels: ["USA", "UK", "Canada", "Australia", "Germany", "France"],
    datasets: [
      {
        data: [3500, 2800, 2600, 2400, 2200, 1200],
        backgroundColor: "#E5E7EB",
        barThickness: 30,
      },
    ],
  };

  // Options for bar charts
  const barOptions = {
    indexAxis: "y" as const,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  // Options for the location bar chart (vertical)
  const locationBarOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  // Options for doughnut chart
  const doughnutOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen  p-6">
        <div className="max-w-7xl mx-auto">
          {/* Connection Status Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold mb-6">Google Analytics</h1>
            <p className="text-gray-600 mb-8">
              Track user interactions and app performance metrics.
            </p>
            <h2 className="text-lg font-medium mb-4">
              Status of the Google Analytics connection
            </h2>
            <div className=" w-3/6 ">
              <div
                className="flex items-center p-3 border rounded-xl cursor-pointer"
                onClick={() => setConnectionStatus("connected")}
              >
                <div
                  className={`w-4 h-4  rounded-xl mr-2 ${
                    connectionStatus === "connected"
                      ? "bg-blue-500"
                      : "bg-blue-200"
                  }`}
                ></div>
                <span
                  className={
                    
                    connectionStatus === "connected"
                      ? "text-blue-600 font-medium "
                      : "text-gray-400"
                  }
                >
                  Connected
                </span>
              </div>

              <div
                className="flex items-center p-3 border rounded-xl cursor-pointer"
                onClick={() => setConnectionStatus("disconnected")}
              >
                <div
                  className={`w-4 h-4 rounded-xl mr-2 ${
                    connectionStatus === "disconnected"
                      ? "bg-gray-300"
                      : "bg-gray-100"
                  }`}
                ></div>
                <span
                  className={
                    connectionStatus === "disconnected"
                      ? "text-gray-600 font-medium"
                      : "text-gray-400"
                  }
                >
                  Disconnected
                </span>
              </div>
            </div>
          </div>

          {/* Browser Stats Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                Status of the Google Analytics connection
              </h2>
              <span className="text-sm text-gray-500">Users by Browser</span>
            </div>

            <div className="h-64">
              <Bar data={browserData} options={barOptions} />
            </div>

            <div className="text-right mt-2">
              <a href="#" className="text-blue-500 text-sm">
                View Browsers
              </a>
            </div>
          </div>

          {/* Device and Location Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Device Category Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">
                Users by Device Category
              </h2>

              <div className="h-48 relative flex justify-center">
                <Doughnut data={deviceData} options={doughnutOptions} />
              </div>

              <div className="flex justify-center space-x-8 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  <span className="text-sm">
                    Mobile <br />
                    75%
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-300 rounded-full mr-2"></div>
                  <span className="text-sm">
                    Desktop <br />
                    15%
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-50 rounded-full mr-2"></div>
                  <span className="text-sm">
                    Tablet <br />
                    10%
                  </span>
                </div>
              </div>
            </div>

            {/* Location Category Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">
                Users by Location Category
              </h2>

              <div className="h-64">
                <Bar data={locationData} options={locationBarOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GoogleAnalytics;
