"use client";

import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { TrendingUp, Users, Leaf, Droplets, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

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

const salesOrders = [
  { id: "ORD-1001", customer: "Amina Bello", product: "Maize", quantity: 120, total: 24000, status: "Completed", date: "2024-06-01" },
  { id: "ORD-1002", customer: "John Doe", product: "Rice", quantity: 80, total: 16000, status: "Pending", date: "2024-06-02" },
  { id: "ORD-1003", customer: "Grace Uche", product: "Cassava", quantity: 50, total: 10000, status: "Shipped", date: "2024-06-03" },
  { id: "ORD-1004", customer: "Samuel Okoro", product: "Yam", quantity: 30, total: 9000, status: "Cancelled", date: "2024-06-04" },
  { id: "ORD-1005", customer: "Fatima Musa", product: "Tomato", quantity: 200, total: 40000, status: "Completed", date: "2024-06-05" },
];

function statusBadge(status: string) {
  const base = "px-2 py-1 rounded text-xs font-semibold";
  switch (status) {
    case "Completed": return <span className={`${base} bg-green-100 text-green-700`}>Completed</span>;
    case "Pending": return <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>;
    case "Shipped": return <span className={`${base} bg-blue-100 text-blue-700`}>Shipped</span>;
    case "Cancelled": return <span className={`${base} bg-red-100 text-red-700`}>Cancelled</span>;
    default: return <span className={base}>{status}</span>;
  }
}

interface OrderDetailsModalProps {
  open: boolean;
  order: any;
  onClose: () => void;
}

function OrderDetailsModal({ open, order, onClose }: OrderDetailsModalProps) {
  if (!open || !order) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative">
        <button className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-2xl font-bold" onClick={onClose} aria-label="Close">×</button>
        <h2 className="text-lg font-bold mb-4 text-gray-900">Order Details</h2>
        <div className="space-y-2 text-gray-900">
          <div><span className="font-semibold">Order ID:</span> {order.id}</div>
          <div><span className="font-semibold">Customer:</span> {order.customer}</div>
          <div><span className="font-semibold">Product:</span> {order.product}</div>
          <div><span className="font-semibold">Quantity:</span> {order.quantity}</div>
          <div><span className="font-semibold">Total:</span> ₦{order.total.toLocaleString()}</div>
          <div><span className="font-semibold">Status:</span> {statusBadge(order.status)}</div>
          <div><span className="font-semibold">Date:</span> {order.date}</div>
        </div>
        <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-semibold" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

interface ConfirmDeleteModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDeleteModal({ open, onConfirm, onCancel }: ConfirmDeleteModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6 relative">
        <h2 className="text-lg font-bold mb-4 text-gray-900">Delete Order</h2>
        <p className="mb-6 text-gray-900">Are you sure you want to delete this order?</p>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-100 text-gray-900 hover:bg-gray-200 font-semibold" onClick={onCancel}>No</button>
          <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-semibold" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [detailsOrder, setDetailsOrder] = useState(null);
  const [deleteIdx, setDeleteIdx] = useState(null);
  const [orders, setOrders] = useState(salesOrders);

  return (
    <DashboardLayout title="Agro Sales" subtitle="View and manage all sales orders in your agro management system.">
      <div className="w-full max-w-8xl mx-auto px-2 sm:px-8 lg:px-16 py-8">
        {/* <h1 className="text-2xl font-bold text-gray-900 mb-2">Agro Sales</h1> */}
        {/* <p className="text-gray-600 mb-6">View and manage all sales orders in your agro management system.</p> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 mb-10">
          {statsCards.map((card, idx) => (
            <StatsCard key={idx} {...card} />
          ))}
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
          <table className="min-w-[900px] w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Total (₦)</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap font-mono text-gray-900">{order.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{order.customer}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{order.product}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-right text-gray-900">{order.quantity}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-right text-gray-900">₦{order.total.toLocaleString()}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">{statusBadge(order.status)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-center text-gray-700">{order.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-center flex items-center justify-center gap-2">
                    <button title="View" onClick={() => setDetailsOrder(order)} className="text-blue-700 hover:text-blue-900">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button title="Delete" onClick={() => setDeleteIdx(idx)} className="text-red-700 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <OrderDetailsModal open={!!detailsOrder} order={detailsOrder} onClose={() => setDetailsOrder(null)} />
        <ConfirmDeleteModal open={deleteIdx !== null} onCancel={() => setDeleteIdx(null)} onConfirm={() => {
          setOrders(orders => orders.filter((_, i) => i !== deleteIdx));
          setDeleteIdx(null);
        }} />
      </div>
    </DashboardLayout>
  );
} 