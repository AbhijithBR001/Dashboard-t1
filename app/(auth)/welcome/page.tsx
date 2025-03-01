"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Welcome() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would navigate to the dashboard or another screen here
    router.push("/update");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url(/1343.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-2xl bg-white bg-opacity-50 backdrop-blur-xl rounded-lg shadow-sm p-6 flex">
        {/* Left side with logo */}

        {/* Divider line image */}

        {/* Right side with welcome content */}
        <div className="flex-1 p-8 bg-white border-3 rounded-xl shadow-sm backdrop-blur-sm ">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-24 h-24">
              <Image
                src="/group.png"
                width={1500}
                height={1500}
                alt="Free Shops logo"
              />
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-xl font-bold text-center mb-2">Welcome!</h2>
            <h4 className="text-xl text-orange-400 font-bold text-center mb-2 ">
              to the Free Shops App Admin Panel
            </h4>
            <p className="text-center text-sm text-gray-500 mb-6">
              Manage and monitor all aspects of your app seamlessly from one{" "}
              <br /> place. Use the tools below to get started.
            </p>

            <div className="mt-6 text-center">
              <Button
                onClick={handleSubmit}
                className="inline bg-[#199FB1] hover:bg-[#00ACC1] text-white rounded-xl py-2 px-4 text-center"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
