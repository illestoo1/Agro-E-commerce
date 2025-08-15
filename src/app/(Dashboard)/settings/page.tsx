import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { Settings } from "lucide-react";

const stats = [
  {
    title: "Settings Changed",
    value: "3",
    change: "+0%",
    changeType: "neutral" as const, // ✅ Works now
    icon: <Settings />,
    color: "bg-gray-500",
  },
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600 mb-6">
          Manage your system settings and preferences.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((card, idx) => (
            <StatsCard key={idx} {...card} />
          ))}
        </div>

        {/* Placeholder for future settings */}
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-400">
          Settings features coming soon.
        </div>
      </div>
    </DashboardLayout>
  );
}
