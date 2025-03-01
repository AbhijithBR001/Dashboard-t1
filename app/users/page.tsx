"use client";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";
import UserTable from "@/components/users/user-table";
import { useState } from "react";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      setSearchTerm(e.target.value);
    }
  };

  return (
    <DashboardLayout>
      <p className="text-white mb-4">List of users</p>
      <Card className="mb-6 rounded-xl">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-end items-end mb-6">
            <div className="flex gap-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground  rounded-xl"
                  size={18}
                />
                <Input
                  className="pl-10 rounded-xl"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-l-none rounded-xl"
                onClick={() => handleSearch()}
              >
                Search
              </Button>
            </div>
          </div>

          <UserTable searchTerm={searchTerm} />
        </div>
      </Card>
    </DashboardLayout>
  );
}
