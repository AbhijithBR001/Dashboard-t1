"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "User Management", path: "/users" },
    // { name: "Rating and Review", path: "/rating-and-review" },
    // { name: "Settings", path: "/settings" },
    { name: "History", path: "/history" },
    // { name: "All Bookings", path: "/all-bookings" },
    { name: "Push Notification", path: "/push-notifications" },
    { name: "Transaction List", path: "/transaction-list" },
    { name: "Google Analytics", path: "/google-analytics" },
    // { name: "Multi-Currency", path: "/multi-currency" },
    // { name: "Category", path: "/category" },
    // { name: "Live Chat History", path: "/live-chat-history" },
    // { name: "Package Plan", path: "/package-plan" },
    // { name: "Referral History", path: "/referral-history" },
    { name: "Google Map", path: "/maps" },
  ];

  return (
    <div className="h-screen bg-orange-500 flex flex-col">
      <div className="mx-4 bg-white rounded-xl flex flex-col overflow- mt-4  ">
        <div className="py-5 flex justify-center">
          <span className="text-[#199fb1] font-medium text-lg">Logo</span>
        </div>

        <div className="flex-1 flex flex-col p-1 gap-2">
          {menuItems.map((item, index) => (
            <div key={item.path}>
              <Link
                href={item.path}
                className={`py-3 px-6 block ${
                  isActive(item.path)
                    ? "bg-[#199fb1] text-white p-2 mx-2 rounded-xl mb-2"
                    : "text-[#199fb1]"
                }`}
              >
                {item.name}
              </Link>
              {index < menuItems.length - 1 && (
                <div className="border-t border-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
