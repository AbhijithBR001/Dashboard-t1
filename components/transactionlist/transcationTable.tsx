"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { format } from "date-fns";
import { DateRange } from "react-day-picker"; // Import DateRange type

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([
    {
      id: "#0089785421",
      amount: 100000,
      date: "July 3, 2023 12:27 pm",
      paymentMethod: "Credit Card",
      status: "Completed",
    },
    {
      id: "#0089785421",
      amount: 30000,
      date: "July 3, 2023 12:27 pm",
      paymentMethod: "PayPal",
      status: "Pending",
    },
    {
      id: "#0089785421",
      amount: 6000,
      date: "July 3, 2023 12:27 pm",
      paymentMethod: "UPI",
      status: "Failed",
    },
    {
      id: "#0089785421",
      amount: 345699,
      date: "July 3, 2023 12:27 pm",
      paymentMethod: "PayPal",
      status: "Completed",
    },
    {
      id: "#0089785421",
      amount: 888999,
      date: "July 3, 2023 12:27 pm",
      paymentMethod: "Credit Card",
      status: "Pending",
    },
    {
      id: "#0089785421",
      amount: 1000000,
      date: "July 3, 2023 12:27 pm",
      paymentMethod: "Cash",
      status: "Failed",
    },
  ]);

  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: [] as string[],
    dateRange: { from: undefined as Date | undefined, to: undefined as Date | undefined },
    amountRange: [500, 5000000] as [number, number],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filtered transactions based on search and filters
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount.toString().includes(searchQuery) ||
      transaction.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.paymentMethod
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filters.status.length === 0 || filters.status.includes(transaction.status);
    const matchesAmount =
      transaction.amount >= filters.amountRange[0] && transaction.amount <= filters.amountRange[1];

    const transactionDate = new Date(transaction.date);
    const matchesDate =
      !filters.dateRange.from || !filters.dateRange.to ||
      (transactionDate >= filters.dateRange.from && transactionDate <= filters.dateRange.to);

    return matchesSearch && matchesStatus && matchesAmount && matchesDate;
  });

  const handleSelectTransaction = (transactionId: string) => {
    setSelectedTransactions((prev) =>
      prev.includes(transactionId)
        ? prev.filter((id) => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const handleDelete = () => {
    setTransactions((prev) =>
      prev.filter(
        (transaction) => !selectedTransactions.includes(transaction.id)
      )
    );
    setSelectedTransactions([]);
  };

  const handleStatusFilterChange = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }));
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: {
        from: range?.from || undefined,
        to: range?.to || undefined,
      },
    }));
  };

  const handleAmountRangeChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      amountRange: value as [number, number],
    }));
  };

  const applyFilters = () => {
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      status: [],
      dateRange: { from: undefined, to: undefined },
      amountRange: [500, 5000000],
    });
    setIsFilterOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Transaction List</h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and manage all financial transactions.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl">
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-white shadow-md rounded-lg">
              <div className="space-y-4">
                {/* Status Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Status Filter</h4>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleStatusFilterChange("Pending")}
                      className={`flex-1 ${filters.status.includes("Pending") ? "bg-yellow-500 text-white" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      Pending
                    </Button>
                    <Button
                      onClick={() => handleStatusFilterChange("Completed")}
                      className={`flex-1 ${filters.status.includes("Completed") ? "bg-green-500 text-white" : "bg-green-100 text-green-800"}`}
                    >
                      Completed
                    </Button>
                    <Button
                      onClick={() => handleStatusFilterChange("Failed")}
                      className={`flex-1 ${filters.status.includes("Failed") ? "bg-red-500 text-white" : "bg-red-100 text-red-800"}`}
                    >
                      Failed
                    </Button>
                  </div>
                </div>

                {/* Date Range Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Date Range Filter</h4>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w- toLocaleDateString4" />
                        {filters.dateRange.from ? (
                          filters.dateRange.to ? (
                            <>
                              {format(filters.dateRange.from, "MMM dd, yyyy")} -{" "}
                              {format(filters.dateRange.to, "MMM dd, yyyy")}
                            </>
                          ) : (
                            format(filters.dateRange.from, "MMM dd, yyyy")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="range"
                        selected={filters.dateRange}
                        onSelect={handleDateRangeChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Amount Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Amount Filter</h4>
                  <Slider
                    min={500}
                    max={5000000}
                    step={100}
                    value={filters.amountRange}
                    onValueChange={handleAmountRangeChange}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-500 mt-2">
                    {filters.amountRange[0].toLocaleString()} - {filters.amountRange[1].toLocaleString()}
                  </div>
                </div>

                {/* Apply and Reset Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={applyFilters}
                    className="bg-teal-500 hover:bg-teal-600 text-white w-full"
                  >
                    Apply
                  </Button>
                  <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="w-full"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <div className="relative flex-1 md:w-80 lg:w-96">
            <Input
              type="text"
              placeholder="Search transactions by ID, user, or date"
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
                  checked={
                    selectedTransactions.length ===
                      filteredTransactions.length &&
                    filteredTransactions.length > 0
                  }
                  onCheckedChange={() =>
                    setSelectedTransactions(
                      selectedTransactions.length ===
                        filteredTransactions.length
                        ? []
                        : filteredTransactions.map((t) => t.id)
                    )
                  }
                />
              </th>
              <th className="py-3 px-4 text-left">Transaction ID</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Payment Method</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4">
                  <Checkbox
                    checked={selectedTransactions.includes(transaction.id)}
                    onCheckedChange={() =>
                      handleSelectTransaction(transaction.id)
                    }
                  />
                </td>
                <td className="py-4 px-4">{transaction.id}</td>
                <td className="py-4 px-4">{transaction.amount}</td>
                <td className="py-4 px-4">{transaction.date}</td>
                <td className="py-4 px-4">{transaction.paymentMethod}</td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-5 w-5 text-gray-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-42 p-2 bg-white shadow-md rounded-lg">
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          className="justify-start text-sm"
                        >
                          View Details
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start text-sm text-red-500"
                        >
                          Delete Record
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
        <div className="flex items-center">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={selectedTransactions.length === 0}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </Button>
          <span className="ml-4 text-sm text-gray-500">
            Displaying page {filteredTransactions.length > 0 ? "1" : "0"} of{" "}
            {Math.ceil(transactions.length / 6)} total transactions
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;