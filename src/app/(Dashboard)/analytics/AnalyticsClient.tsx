"use client";
import StatsCard, { StatsCardProps } from "@/components/StatsCard";
import { BarChart3, Package, Users, Truck } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from "recharts";

const stats: StatsCardProps[] = [
  { title: "Total Orders", value: "1,240", change: "+8.2%", changeType: "positive" as const, icon: <Package />, color: "bg-blue-500" },
  { title: "Active Users", value: "980", change: "+2.4%", changeType: "positive" as const, icon: <Users />, color: "bg-emerald-500" },
  { title: "Deliveries", value: "312", change: "-1.1%", changeType: "negative" as const, icon: <Truck />, color: "bg-yellow-500" },
  { title: "Conversion Rate", value: "4.7%", change: "+0.6%", changeType: "positive" as const, icon: <BarChart3 />, color: "bg-purple-500" },
];

const deliveriesByMonth = [
  { month: "Jan", delivered: 32, pending: 12 },
  { month: "Feb", delivered: 45, pending: 10 },
  { month: "Mar", delivered: 51, pending: 8 },
  { month: "Apr", delivered: 47, pending: 9 },
  { month: "May", delivered: 58, pending: 7 },
  { month: "Jun", delivered: 62, pending: 5 },
];

const revenueTrend = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 13800 },
  { month: "Mar", revenue: 14500 },
  { month: "Apr", revenue: 15800 },
  { month: "May", revenue: 17100 },
  { month: "Jun", revenue: 16500 },
];

export default function AnalyticsClient() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((card, idx) => (
          <StatsCard key={idx} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Deliveries by Month</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveriesByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="delivered" fill="#10B981" name="Delivered" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#F59E0B" name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={3} dot={{ r: 3 }} name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 