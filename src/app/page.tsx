"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Leaf, 
  Droplets, 
  Sun, 
  Thermometer, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Activity,
  Package,
  DollarSign,
  ShoppingCart,
  Eye,
  Edit,
  Trash2,
  Plus,
  MapPin,
  AlertCircle,
  Menu,
  X
} from "lucide-react";

import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Import components
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import WeatherCard from "@/components/WeatherCard";
import ActivityCard from "@/components/ActivityCard";
import TaskCard from "@/components/TaskCard";
import ActionCard from "@/components/ActionCard";
import { useRouter } from "next/navigation";

// Enhanced mock data for the dashboard
const enhancedStatsCards = [
  {
    title: "Total Sales",
    value: "₦2.4M",
    change: "+18.5%",
    changeType: "positive" as const,
    icon: <DollarSign />,
    color: "bg-green-500"
  },
  {
    title: "Total Orders",
    value: "1,847",
    change: "+12.3%",
    changeType: "positive" as const,
    icon: <ShoppingCart />,
    color: "bg-blue-500"
  },
  {
    title: "Top Product",
    value: "Corn Seeds",
    change: "+8.7%",
    changeType: "positive" as const,
    icon: <Package />,
    color: "bg-purple-500"
  },
  {
    title: "Low Stock Alerts",
    value: "12",
    change: "+3",
    changeType: "negative" as const,
    icon: <AlertCircle />,
    color: "bg-red-500"
  }
];

// Sales data for line chart
const salesData = [
  { date: "Mon", sales: 45000, orders: 23 },
  { date: "Tue", sales: 52000, orders: 28 },
  { date: "Wed", sales: 48000, orders: 25 },
  { date: "Thu", sales: 61000, orders: 32 },
  { date: "Fri", sales: 55000, orders: 29 },
  { date: "Sat", sales: 67000, orders: 35 },
  { date: "Sun", sales: 58000, orders: 31 }
];

// Product category breakdown for pie chart
const productCategories = [
  { name: "Crops", value: 35, color: "#10B981" },
  { name: "Seeds", value: 25, color: "#3B82F6" },
  { name: "Fertilizers", value: 20, color: "#F59E0B" },
  { name: "Tools", value: 15, color: "#8B5CF6" },
  { name: "Livestock", value: 5, color: "#EF4444" }
];

// Order management data
const ordersData = [
  {
    id: "ORD-001",
    customer: "John Smith",
    date: "2024-01-15",
    status: "completed",
    amount: "₦45,000",
    location: "Lagos"
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    date: "2024-01-15",
    status: "pending",
    amount: "₦32,500",
    location: "Abuja"
  },
  {
    id: "ORD-003",
    customer: "Mike Wilson",
    date: "2024-01-14",
    status: "completed",
    amount: "₦67,800",
    location: "Kano"
  },
  {
    id: "ORD-004",
    customer: "Lisa Brown",
    date: "2024-01-14",
    status: "canceled",
    amount: "₦28,900",
    location: "Port Harcourt"
  },
  {
    id: "ORD-005",
    customer: "David Lee",
    date: "2024-01-13",
    status: "pending",
    amount: "₦54,200",
    location: "Ibadan"
  }
];

// Inventory overview data
const lowStockProducts = [
  {
    name: "Corn Seeds",
    currentStock: 45,
    minStock: 100,
    supplier: "Agro Supply Co.",
    restockDate: "2024-01-20"
  },
  {
    name: "NPK Fertilizer",
    currentStock: 23,
    minStock: 50,
    supplier: "Fertilizer Plus",
    restockDate: "2024-01-18"
  },
  {
    name: "Wheat Seeds",
    currentStock: 67,
    minStock: 150,
    supplier: "Seed Masters",
    restockDate: "2024-01-22"
  },
  {
    name: "Garden Tools Set",
    currentStock: 8,
    minStock: 25,
    supplier: "Tool World",
    restockDate: "2024-01-16"
  }
];

const upcomingHarvests = [
  {
    crop: "Corn",
    field: "Field A-12",
    expectedDate: "2024-02-15",
    estimatedYield: "2,500 kg",
    status: "on-track"
  },
  {
    crop: "Wheat",
    field: "Field B-8",
    expectedDate: "2024-02-28",
    estimatedYield: "1,800 kg",
    status: "on-track"
  },
  {
    crop: "Soybeans",
    field: "Field C-5",
    expectedDate: "2024-03-10",
    estimatedYield: "900 kg",
    status: "delayed"
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
    title: "Order Completed", 
    description: "ORD-001 delivered successfully to John Smith", 
    time: "2 hours ago",
    status: "completed" as const,
    icon: CheckCircle
  },
  { 
    title: "New Order", 
    description: "ORD-006 received from Sarah Wilson", 
    time: "4 hours ago",
    status: "completed" as const,
    icon: ShoppingCart
  },
  { 
    title: "Low Stock Alert", 
    description: "Corn Seeds running low (45 units remaining)", 
    time: "6 hours ago",
    status: "warning" as const,
    icon: AlertTriangle
  },
  { 
    title: "Payment Received", 
    description: "₦67,800 received for ORD-003", 
    time: "1 day ago",
    status: "completed" as const,
    icon: DollarSign
  }
];

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const quickActions = [
    { title: "New Order", icon: Plus, color: "bg-green-500", onClick: () => router.push("/orders") },
    { title: "Add Product", icon: Package, color: "bg-blue-500", onClick: () => router.push("/products") },
    { title: "View Reports", icon: BarChart3, color: "bg-purple-500", onClick: () => router.push("/analytics") },
    { title: "Inventory Check", icon: Activity, color: "bg-orange-500", onClick: () => router.push("/products") },
  ];

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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Enhanced Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          {enhancedStatsCards.map((card, index) => (
            <div key={index} className="transform transition-transform hover:scale-105 active:scale-95">
              <StatsCard {...card} />
            </div>
          ))}
        </div>

        {/* Charts & Insights Section - Mobile Responsive */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Sales Over Time Chart */}
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Sales Over Time</h3>
              <div className="flex space-x-1 sm:space-x-2">
                {['day', 'week', 'month'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-md transition-colors ${
                      selectedPeriod === period
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64 sm:h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'sales' ? `₦${value.toLocaleString()}` : value,
                      name === 'sales' ? 'Sales' : 'Orders'
                    ]}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ r: 3, strokeWidth: 2 }}
                    name="Sales"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ r: 2, strokeWidth: 2 }}
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Product Category Breakdown */}
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Product Categories</h3>
            <div className="h-64 sm:h-72 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {productCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Market Share']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {productCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-xs sm:text-sm text-gray-600 truncate">{category.name}</span>
                  <span className="text-xs sm:text-sm font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Management Table - Mobile Optimized */}
        <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6 mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              New Order
            </button>
          </div>
          
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3">
            {ordersData.map((order, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 text-sm">{order.id}</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span className="text-gray-900 font-medium">{order.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900">{order.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="text-gray-900 font-medium">{order.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="text-gray-900 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {order.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                  <button className="flex-1 flex items-center justify-center gap-1 p-2 text-blue-600 hover:bg-blue-50 rounded text-sm">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 p-2 text-green-600 hover:bg-green-50 rounded text-sm">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 p-2 text-red-600 hover:bg-red-50 rounded text-sm">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ordersData.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{order.id}</td>
                    <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                    <td className="py-3 px-4 text-gray-600">{order.date}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">{order.amount}</td>
                    <td className="py-3 px-4 text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {order.location}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Overview - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Low Stock Products */}
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Low Stock Alerts</h3>
            <div className="space-y-3">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-red-50 rounded-lg border border-red-200 gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base">{product.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Current: {product.currentStock} | Min: {product.minStock}
                    </p>
                    <p className="text-xs text-red-600">
                      Restock by: {product.restockDate}
                    </p>
                  </div>
                  <button className="px-3 py-1.5 sm:py-1 bg-red-600 text-white text-xs sm:text-sm rounded-md hover:bg-red-700 transition-colors w-full sm:w-auto">
                    Restock
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Harvests */}
          <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Upcoming Harvests</h3>
            <div className="space-y-3">
              {upcomingHarvests.map((harvest, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  harvest.status === 'delayed' 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : 'bg-green-50 border-green-200'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base">{harvest.crop}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{harvest.field}</p>
                      <p className="text-xs text-gray-500">
                        Expected: {harvest.expectedDate} | Yield: {harvest.estimatedYield}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      harvest.status === 'delayed' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {harvest.status === 'delayed' ? 'Delayed' : 'On Track'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather & Recent Activities - Mobile Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Weather & Environment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Weather & Environment</h3>
              <div className="space-y-3 sm:space-y-4">
                {weatherData.map((item, index) => (
                  <WeatherCard key={index} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-3 sm:space-y-4">
                {recentActivities.map((activity, index) => (
                  <ActivityCard key={index} {...activity} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Mobile Responsive */}
        <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {quickActions.map((action, index) => (
              <div key={index} className="transform transition-transform hover:scale-105 active:scale-95">
                <ActionCard {...action} />
        </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'canceled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to get status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4" />;
    case 'pending':
      return <AlertCircle className="w-4 h-4" />;
    case 'canceled':
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <Activity className="w-4 h-4" />;
  }
};