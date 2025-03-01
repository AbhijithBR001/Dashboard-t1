"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/login`, 
        {
          email: formData.email,
          password: formData.password
        }
      );
      
      // Store token or user data in localStorage or cookie if needed
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
      }
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      alert("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
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
      <div className="w-full max-w-4xl bg-white bg-opacity-50 backdrop-blur-xl rounded-lg shadow-sm p-6 flex">
        {/* Left side with logo */}
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

        <div className="flex items-center mr-6"> 
          <Image
            src="/line.png"
            width={7} 
            height={12}
            alt="Divider line"
            className="object-contain ml-10"
          />
        </div>

        {/* Right side with login form */}
        <div className="flex-1 p-8 bg-white border-3 rounded-xl shadow-sm backdrop-blur-sm">
          <div className="w-full">
            <h2 className="text-xl font-bold text-start mb-2">Log in</h2>
            <p className="text-start text-sm text-gray-500 mb-6">
              Welcome to Free Shops App controller
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full border-black rounded-xl focus:border-gray-400 focus:ring-0"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full border-black rounded-xl focus:border-gray-400 focus:ring-0 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 6.75l4.875 4.875M19.5 9.75l-7.5 7.5-7.5-7.5 7.5-7.5 7.5 7.5z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link
                  href="/forgot-password"
                  className="text-xs text-grey-500 hover:underline"
                >
                  Forgot Password
                </Link>
              </div>

              <div className="pt-2 flex justify-center">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-3/12 bg-[#199FB1] hover:bg-[#00ACC1] text-white rounded-xl py-2 text-center"
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                <Link
                  href="/register"
                  className="text-[#00BCD4] hover:underline"
                >
                  Create New Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}