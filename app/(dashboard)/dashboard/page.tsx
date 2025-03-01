"use client";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import UserTable from "@/components/dashboard/user-table";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import OverviewChart from "@/components/dashboard/overview-chart";
import { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      console.log(token);
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl text-white font-normal">Analytics</h1>
      </div>

      {/* Main content layout */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Left side with 2x2 card grid and earning chart */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          {/* 2x2 grid of cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Active Users Card */}
            <Card className="p-4 rounded-xl bg-blue-50 border-t-4 border-blue-400">
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Active Users
                </p>
                <div className="h-24 w-full overflow-hidden">
                  <svg
                    viewBox="0 0 300 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      d="M0,60 L20,45 L40,55 L60,30 L80,50 L100,20 L120,40 L140,25 L160,45 L180,15 L200,35 L220,50 L240,25 L260,45 L280,20 L300,30"
                      stroke="#199FB1"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M0,60 L20,45 L40,55 L60,30 L80,50 L100,20 L120,40 L140,25 L160,45 L180,15 L200,35 L220,50 L240,25 L260,45 L280,20 L300,30 L300,80 L0,80 Z"
                      fill="#199FB1"
                      fillOpacity="0.1"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mt-1 text-blue-500">5556</h3>
                <div className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 p-0 mt-0 text-xs hover:bg-transparent"
                  >
                    View All Users
                  </Button>
                </div>
              </div>
            </Card>

            {/* Total Buyers Card */}
            <Card className="p-4 rounded-xl bg-green-50 border-t-4 border-green-400">
              <div>
                <p className="text-sm font-medium text-green-800">
                  Total Buyers
                </p>
                <div className="h-20 w-full overflow-hidden">
                  <svg
                    viewBox="0 0 300 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      d="M0,50 L20,60 L40,50 L60,55 L80,45 L100,60 L120,40 L140,45 L160,30 L180,40 L200,35 L220,25 L240,20 L260,15 L280,20 L300,10"
                      stroke="#48BB78"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M0,50 L20,60 L40,50 L60,55 L80,45 L100,60 L120,40 L140,45 L160,30 L180,40 L200,35 L220,25 L240,20 L260,15 L280,20 L300,10 L300,80 L0,80 Z"
                      fill="#48BB78"
                      fillOpacity="0.1"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mt-1 text-green-500">3480</h3>
                <div className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600 p-0 mt-0 text-xs hover:bg-transparent"
                  >
                    View All Buyers
                  </Button>
                </div>
              </div>
            </Card>

            {/* Total Ads Card */}
            <Card className="p-4 rounded-xl bg-yellow-50 border-t-4 border-yellow-400">
              <div>
                <p className="text-sm font-medium text-yellow-800">Total Ads</p>
                <div className="h-20 w-full overflow-hidden">
                  <svg
                    viewBox="0 0 300 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      d="M0,40 L20,30 L40,45 L60,20 L80,35 L100,25 L120,50 L140,30 L160,45 L180,35 L200,40 L220,30 L240,45 L260,35 L280,40 L300,25"
                      stroke="#ECC94B"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M0,40 L20,30 L40,45 L60,20 L80,35 L100,25 L120,50 L140,30 L160,45 L180,35 L200,40 L220,30 L240,45 L260,35 L280,40 L300,25 L300,80 L0,80 Z"
                      fill="#ECC94B"
                      fillOpacity="0.1"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mt-1 text-yellow-500">459</h3>
                <div className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-yellow-600 p-0 mt-0 text-xs hover:bg-transparent"
                  >
                    View All Ads
                  </Button>
                </div>
              </div>
            </Card>

            {/* Total Sellers Card */}
            <Card className="p-4 rounded-xl bg-red-50 border-t-4 border-red-400">
              <div>
                <p className="text-sm font-medium text-red-800">
                  Total Sellers
                </p>
                <div className="h-20 w-full overflow-hidden">
                  <svg
                    viewBox="0 0 300 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      d="M0,60 L20,55 L40,50 L60,45 L80,50 L100,40 L120,45 L140,35 L160,40 L180,30 L200,35 L220,25 L240,20 L260,15 L280,20 L300,10"
                      stroke="#F56565"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M0,60 L20,55 L40,50 L60,45 L80,50 L100,40 L120,45 L140,35 L160,40 L180,30 L200,35 L220,25 L240,20 L260,15 L280,20 L300,10 L300,80 L0,80 Z"
                      fill="#F56565"
                      fillOpacity="0.1"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mt-1 text-red-500">2924</h3>
                <div className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 p-0 mt-0 text-xs hover:bg-transparent"
                  >
                    View All Sellers
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Total Earning chart */}
          <Card className="p-4 rounded-xl ">
            <div>
              <p className="text-sm font-medium text-yellow-800 ">
                Total Earning
              </p>
              <div className="h-28">
                <div className="mt-1 h-12">
                
                </div>
              </div>
              <h3 className="text-3xl font-bold mt-1 text-yellow-500">
                12,423,48.00
              </h3>
            </div>
          </Card>
        </div>

        {/* Right side with company growth chart */}
        <div className="lg:w-1/2 h">
          {/* <Card className="rounded-xl h-full"> */}
          <div className="">
            <div className=""></div>
            <div className="h-[76vh]">
              <OverviewChart />
            </div>
          </div>
          {/* </Card> */}
        </div>
      </div>

      {/* User table section */}
      <Card className="rounded-xl">
        <div className="p-6">
          <UserTable />
        </div>
      </Card>
    </DashboardLayout>
  );
}
