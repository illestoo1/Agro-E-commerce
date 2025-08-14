"use client";

import { useState, useRef, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  Leaf, 
  Droplets, 
  Sun, 
  Thermometer, 
  BarChart3, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  User
} from "lucide-react";

// Import components
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import WeatherCard from "@/components/WeatherCard";
import ActivityCard from "@/components/ActivityCard";
import TaskCard from "@/components/TaskCard";
import ActionCard from "@/components/ActionCard";

// Mock data for the dashboard
const statsCards = [
  {
    title: "Total Crops",
    value: "1,234",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: <Leaf />,
    color: "bg-green-500"
  },
  {
    title: "Active Farmers",
    value: "456",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: <Users />,
    color: "bg-blue-500"
  },
  {
    title: "Water Usage",
    value: "2.3M L",
    change: "-5.1%",
    changeType: "negative" as const,
    icon: <Droplets />,
    color: "bg-cyan-500"
  },
  {
    title: "Revenue",
    value: "$45.2K",
    change: "+15.3%",
    changeType: "positive" as const,
    icon: <TrendingUp />,
    color: "bg-emerald-500"
  }
];

const weatherData = [
  { label: "Temperature", value: "24°C", icon: Thermometer, color: "text-red-500" },
  { label: "Humidity", value: "65%", icon: Droplets, color: "text-blue-500" },
  { label: "Sunlight", value: "8.5h", icon: Sun, color: "text-yellow-500" },
  { label: "Soil pH", value: "6.8", icon: Leaf, color: "text-green-500" }
];

const recentActivities = [
  { 
    title: "Crop Harvested", 
    description: "Wheat field A-12 harvested successfully", 
    time: "2 hours ago",
    status: "completed" as const,
    icon: CheckCircle
  },
  { 
    title: "Irrigation Started", 
    description: "Automated irrigation system activated", 
    time: "4 hours ago",
    status: "completed" as const,
    icon: Droplets
  },
  { 
    title: "Weather Alert", 
    description: "Heavy rainfall expected in next 24 hours", 
    time: "6 hours ago",
    status: "warning" as const,
    icon: AlertTriangle
  },
  { 
    title: "Fertilizer Applied", 
    description: "Nitrogen fertilizer applied to corn field", 
    time: "1 day ago",
    status: "completed" as const,
    icon: Leaf
  }
];

const upcomingTasks = [
  { title: "Pest Control", date: "Today", priority: "high" as const },
  { title: "Soil Testing", date: "Tomorrow", priority: "medium" as const },
  { title: "Equipment Maintenance", date: "Dec 15", priority: "low" as const },
  { title: "Crop Rotation", date: "Dec 20", priority: "medium" as const }
];

const quickActions = [
  { title: "Add Crop", icon: Leaf, color: "bg-green-500" },
  { title: "Schedule Task", icon: Calendar, color: "bg-blue-500" },
  { title: "View Reports", icon: BarChart3, color: "bg-purple-500" },
  { title: "Monitor Sensors", icon: Activity, color: "bg-orange-500" }
];

export default function Home() {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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
    <DashboardLayout title="Dashboard" subtitle="Welcome to your agro management dashboard">
      {/* Header removed: now in DashboardLayout */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {statsCards.map((card, index) => (
            <StatsCard key={index} {...card} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Weather & Environment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather & Environment</h3>
              <div className="space-y-4">
                {weatherData.map((item, index) => (
                  <WeatherCard key={index} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <ActivityCard key={index} {...activity} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingTasks.map((task, index) => (
                <TaskCard key={index} {...task} />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <ActionCard key={index} {...action} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
