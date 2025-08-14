"use client";

import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { Truck, Package, User, MapPin, Calendar, Edit, Trash2, Plus, X, Search, TrendingUp } from "lucide-react";
import { useState } from "react";

const statsCards = [
  {
    title: "Total Deliveries",
    value: "120",
    change: "+3.5%",
    changeType: "positive" as const,
    icon: <Truck />,
    color: "bg-blue-500"
  },
  {
    title: "Delivered",
    value: "98",
    change: "+2.0%",
    changeType: "positive" as const,
    icon: <TrendingUp />,
    color: "bg-green-500"
  },
  {
    title: "Pending",
    value: "15",
    change: "-1.2%",
    changeType: "negative" as const,
    icon: <Package />,
    color: "bg-yellow-500"
  },
  {
    title: "Cancelled",
    value: "7",
    change: "+0.5%",
    changeType: "negative" as const,
    icon: <X />,
    color: "bg-red-500"
  }
];

const initialDeliveries = [
  { id: 1, product: "Maize Seed", recipient: "Amina Bello", address: "12 Farm Lane, Kano", date: "2024-06-01", status: "Delivered" },
  { id: 2, product: "Urea Fertilizer", recipient: "John Doe", address: "45 Agro Rd, Abuja", date: "2024-06-03", status: "Pending" },
  { id: 3, product: "Drip Kit", recipient: "Grace Uche", address: "88 Green St, Enugu", date: "2024-06-02", status: "Delivered" },
  { id: 4, product: "Tomato Seedling", recipient: "Samuel Okoro", address: "23 River Ave, Ibadan", date: "2024-06-04", status: "Cancelled" },
  { id: 5, product: "NPK Fertilizer", recipient: "Fatima Musa", address: "7 Market Rd, Kaduna", date: "2024-06-05", status: "Pending" },
  { id: 6, product: "Sprayer", recipient: "Chinedu Obi", address: "19 Tool St, Lagos", date: "2024-06-06", status: "Delivered" },
  { id: 7, product: "Hybrid Rice Seed", recipient: "Blessing Eze", address: "3 Rice Blvd, Jos", date: "2024-06-07", status: "Pending" },
  { id: 8, product: "Compost", recipient: "Ibrahim Sani", address: "55 Compost Rd, Minna", date: "2024-06-08", status: "Delivered" },
  { id: 9, product: "Greenhouse Film", recipient: "Ngozi Nwosu", address: "21 Greenhouse Ave, Owerri", date: "2024-06-09", status: "Cancelled" },
  { id: 10, product: "Onion Seed", recipient: "Peter Yusuf", address: "10 Onion St, Ilorin", date: "2024-06-10", status: "Delivered" },
];

const statuses = ["Pending", "Delivered", "Cancelled"];

// Delivery type
type Delivery = {
  id: number;
  product: string;
  recipient: string;
  address: string;
  date: string;
  status: string;
};

function DeliveryModal({ open, onClose, onSave, delivery }: {
  open: boolean;
  onClose: () => void;
  onSave: (delivery: Omit<Delivery, 'id'>) => void;
  delivery: Omit<Delivery, 'id'> | null;
}) {
  const [form, setForm] = useState<Omit<Delivery, 'id'>>(delivery || { product: "", recipient: "", address: "", date: "", status: statuses[0] });
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}><X /></button>
        <h2 className="text-lg font-semibold mb-4">{delivery ? "Edit Delivery" : "Add Delivery"}</h2>
        <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input className="mt-1 block w-full border rounded-md px-3 py-2" value={form.product} onChange={e => setForm((f) => ({ ...f, product: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
            <input className="mt-1 block w-full border rounded-md px-3 py-2" value={form.recipient} onChange={e => setForm((f) => ({ ...f, recipient: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input className="mt-1 block w-full border rounded-md px-3 py-2" value={form.address} onChange={e => setForm((f) => ({ ...f, address: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery Date</label>
            <input type="date" className="mt-1 block w-full border rounded-md px-3 py-2" value={form.date} onChange={e => setForm((f) => ({ ...f, date: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select className="mt-1 block w-full border rounded-md px-3 py-2" value={form.status} onChange={e => setForm((f) => ({ ...f, status: e.target.value }))}>
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">{delivery ? "Save Changes" : "Add Delivery"}</button>
        </form>
      </div>
    </div>
  );
}

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<{ open: boolean; delivery: Omit<Delivery, 'id'> | null }>({ open: false, delivery: null });
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const deliveriesPerPage = 5;

  const filtered = deliveries.filter(d =>
    d.product.toLowerCase().includes(search.toLowerCase()) ||
    d.recipient.toLowerCase().includes(search.toLowerCase()) ||
    d.address.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * deliveriesPerPage, page * deliveriesPerPage);
  const totalPages = Math.ceil(filtered.length / deliveriesPerPage);

  function handleAdd() {
    setModal({ open: true, delivery: null });
    setEditIdx(null);
  }
  function handleEdit(idx: number) {
    setModal({ open: true, delivery: deliveries[idx] });
    setEditIdx(idx);
  }
  function handleDelete(idx: number) {
    if (window.confirm("Are you sure you want to delete this delivery?")) {
      setDeliveries(deliveries => deliveries.filter((_, i) => i !== idx));
    }
  }
  function handleSave(delivery: Omit<Delivery, 'id'>) {
    if (editIdx !== null) {
      setDeliveries(deliveries => deliveries.map((d, i) => i === editIdx ? { ...d, ...delivery } : d));
    } else {
      setDeliveries(deliveries => [...deliveries, { ...delivery, id: Date.now() }]);
    }
    setModal({ open: false, delivery: null });
    setEditIdx(null);
  }

  return (
    <DashboardLayout title="Deliveries" subtitle="Manage all deliveries in your agro management system.">
      <div className="w-full max-w-8xl mx-auto px-2 sm:px-8 lg:px-16 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 mb-10">
          {statsCards.map((card, idx) => (
            <StatsCard key={idx} {...card} />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <div className="relative w-full sm:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Search deliveries..."
              className="pl-10 pr-3 py-2 w-full border-2 border-gray-300 rounded-md text-gray-900 text-base shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={handleAdd}
          >
            <Plus className="w-4 h-4" /> Add Delivery
          </button>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Delivery ID</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Recipient</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Address</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">No deliveries found.</td>
                </tr>
              ) : paginated.map((delivery, idx) => (
                <tr key={delivery.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{delivery.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{delivery.product}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{delivery.recipient}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{delivery.address}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{delivery.date}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${delivery.status === "Delivered" ? "bg-green-100 text-green-700" : delivery.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{delivery.status}</span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-right flex gap-2 justify-end">
                    <button className="text-blue-700 hover:text-blue-900" onClick={() => handleEdit(deliveries.findIndex(d => d.id === delivery.id))}><Edit className="w-4 h-4" /></button>
                    <button className="text-red-700 hover:text-red-900" onClick={() => handleDelete(deliveries.findIndex(d => d.id === delivery.id))}><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <DeliveryModal
          open={modal.open}
          onClose={() => setModal({ open: false, delivery: null })}
          onSave={handleSave}
          delivery={modal.delivery}
        />
      </div>
    </DashboardLayout>
  );
} 