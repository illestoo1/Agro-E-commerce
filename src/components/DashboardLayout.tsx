"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, User } from "lucide-react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ children, title = "Dashboard", subtitle = "Welcome to your agro management dashboard" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-white rounded-md shadow-lg text-gray-600 hover:text-gray-900"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        {/* Top nav/profile bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-gray-600">{subtitle}</p>
              </div>
              <div className="flex items-center space-x-2">
                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileDropdownOpen((open) => !open)}
                    className="flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Profile
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-20">
                      <button
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => { setProfileDropdownOpen(false); /* handle view profile */ }}
                      >
                        View Profile
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 border-t"
                        onClick={() => { setProfileDropdownOpen(false); /* handle logout */ }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
} 