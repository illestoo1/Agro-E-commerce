"use client";

import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { Users, DollarSign, PieChart, Calendar, Filter, Download, Eye, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from "recharts";

const statsCards = [
  {
    title: "Total Revenue",
    value: "$45,680",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: <DollarSign />,
    color: "bg-green-500"
  },
  {
    title: "Total Orders",
    value: "1,240",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: <ShoppingCart />,
    color: "bg-blue-500"
  },
  {
    title: "Active Users",
    value: "980",
    change: "+2.4%",
    changeType: "positive" as const,
    icon: <Users />,
    color: "bg-emerald-500"
  },
  {
    title: "Deliveries",
    value: "312",
    change: "-1.1%",
    changeType: "negative" as const,
    icon: <Truck />,
    color: "bg-yellow-500"
  }
];

const revenueData = [
  { month: "Jan", revenue: 12000, orders: 45, users: 120 },
  { month: "Feb", revenue: 13800, orders: 52, users: 135 },
  { month: "Mar", revenue: 14500, orders: 58, users: 142 },
  { month: "Apr", revenue: 15800, orders: 64, users: 158 },
  { month: "May", revenue: 17100, orders: 71, users: 165 },
  { month: "Jun", revenue: 16500, orders: 68, users: 162 },
  { month: "Jul", revenue: 18200, orders: 75, users: 178 },
  { month: "Aug", revenue: 19500, orders: 82, users: 185 },
  { month: "Sep", revenue: 18800, orders: 79, users: 180 },
  { month: "Oct", revenue: 20100, orders: 86, users: 192 },
  { month: "Nov", revenue: 21800, orders: 93, users: 205 },
  { month: "Dec", revenue: 23500, orders: 100, users: 220 }
];

const productCategoryData = [
  { name: "Seeds", value: 35, color: "#10B981" },
  { name: "Fertilizers", value: 28, color: "#3B82F6" },
  { name: "Equipment", value: 22, color: "#F59E0B" },
  { name: "Irrigation", value: 15, color: "#8B5CF6" }
];

const deliveryStatusData = [
  { month: "Jan", delivered: 32, pending: 12, cancelled: 3 },
  { month: "Feb", delivered: 45, pending: 10, cancelled: 2 },
  { month: "Mar", delivered: 51, pending: 8, cancelled: 1 },
  { month: "Apr", delivered: 47, pending: 9, cancelled: 2 },
  { month: "May", delivered: 58, pending: 7, cancelled: 1 },
  { month: "Jun", delivered: 62, pending: 5, cancelled: 0 }
];

const topProducts = [
  { name: "Maize Seed", sales: 245, revenue: 6125, growth: "+15%" },
  { name: "Urea Fertilizer", sales: 189, revenue: 7560, growth: "+8%" },
  { name: "Tomato Seedling", sales: 167, revenue: 1670, growth: "+22%" },
  { name: "NPK Fertilizer", sales: 134, revenue: 4690, growth: "+12%" },
  { name: "Hybrid Rice Seed", sales: 98, revenue: 2940, growth: "+5%" }
];

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6M");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const periods = [
    { value: "3M", label: "Last 3 Months" },
    { value: "6M", label: "Last 6 Months" },
    { value: "1Y", label: "Last Year" },
    { value: "ALL", label: "All Time" }
  ];

  const categories = ["All", "Seeds", "Fertilizers", "Equipment", "Irrigation"];

  const filteredRevenueData = selectedPeriod === "3M" ? revenueData.slice(-3) :
                              selectedPeriod === "6M" ? revenueData.slice(-6) :
                              selectedPeriod === "1Y" ? revenueData.slice(-12) : revenueData;

  return (
    <DashboardLayout title="Analytics Dashboard" subtitle="Comprehensive insights and performance metrics for your agro business.">
      <div className="w-full max-w-8xl mx-auto px-2 sm:px-8 lg:px-16 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 mb-10">
          {statsCards.map((card, idx) => (
            <StatsCard key={idx} {...card} />
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>{period.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Revenue</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Product Categories */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Categories</h3>
              <PieChart className="w-5 h-5 text-gray-500" />
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={productCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {productCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {productCategoryData.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm text-gray-600">{category.name}</span>
                  <span className="text-sm font-medium text-gray-900">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Delivery Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delivery Status</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Delivered</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Pending</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Cancelled</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deliveryStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="delivered" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cancelled" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orders & Users Trend */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Orders & Users Trend</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Orders</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Users</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#3B82F6" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: "#3B82F6" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#8B5CF6" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: "#8B5CF6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sales</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Growth</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sales}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.growth.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.growth}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-green-600 hover:text-green-900 flex items-center gap-1 ml-auto">
                        <Eye className="w-4 h-4" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 