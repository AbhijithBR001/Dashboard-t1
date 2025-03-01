"use client";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";
import UserTable from "@/components/users/user-table";
import { useState } from "react";
import TransactionTable from "@/components/transactionlist/transcationTable";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e?: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      setSearchTerm(e.target.value);
    }
  };

  return (
    <DashboardLayout>

          {/* <UserTable searchTerm={searchTerm} /> */}
          <TransactionTable/>
       
    </DashboardLayout>
  );
}
