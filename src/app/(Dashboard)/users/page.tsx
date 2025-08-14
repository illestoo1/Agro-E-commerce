"use client";

import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { TrendingUp, Users as UsersIcon, Leaf, Droplets, Edit, Trash2, Plus, X, Search } from "lucide-react";
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
    icon: <UsersIcon />,
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

const initialUsers = [
  { id: 1, name: "Amina Bello", email: "amina@agro.com", role: "admin", status: "Active" },
  { id: 2, name: "John Doe", email: "john@agro.com", role: "user", status: "Active" },
  { id: 3, name: "Grace Uche", email: "grace@agro.com", role: "user", status: "Inactive" },
  { id: 4, name: "Samuel Okoro", email: "samuel@agro.com", role: "admin", status: "Active" },
  { id: 5, name: "Fatima Musa", email: "fatima@agro.com", role: "user", status: "Active" },
  { id: 6, name: "Chinedu Obi", email: "chinedu@agro.com", role: "user", status: "Inactive" },
  { id: 7, name: "Blessing Eze", email: "blessing@agro.com", role: "user", status: "Active" },
  { id: 8, name: "Ibrahim Sani", email: "ibrahim@agro.com", role: "admin", status: "Active" },
  { id: 9, name: "Ngozi Nwosu", email: "ngozi@agro.com", role: "user", status: "Inactive" },
  { id: 10, name: "Peter Yusuf", email: "peter@agro.com", role: "user", status: "Active" },
];

const roles = ["admin", "user"];

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

function UserModal({ open, onClose, onSave, user }: {
  open: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, 'id'>) => void;
  user: Omit<User, 'id'> | null;
}) {
  const [form, setForm] = useState<Omit<User, 'id'>>(user || { name: "", email: "", role: roles[0], status: "Active" });
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}><X /></button>
        <h2 className="text-lg font-semibold mb-4">{user ? "Edit User" : "Add User"}</h2>
        <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input className="mt-1 block w-full border rounded-md px-3 py-2" value={form.name} onChange={e => setForm((f) => ({ ...f, name: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full border rounded-md px-3 py-2" value={form.email} onChange={e => setForm((f) => ({ ...f, email: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select className="mt-1 block w-full border rounded-md px-3 py-2" value={form.role} onChange={e => setForm((f) => ({ ...f, role: e.target.value }))}>
              {roles.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select className="mt-1 block w-full border rounded-md px-3 py-2" value={form.status} onChange={e => setForm((f) => ({ ...f, status: e.target.value }))}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">{user ? "Save Changes" : "Add User"}</button>
        </form>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<{ open: boolean; user: Omit<User, 'id'> | null }>({ open: false, user: null });
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const usersPerPage = 5;

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * usersPerPage, page * usersPerPage);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  function handleAdd() {
    setModal({ open: true, user: null });
    setEditIdx(null);
  }
  function handleEdit(idx: number) {
    setModal({ open: true, user: users[idx] });
    setEditIdx(idx);
  }
  function handleDelete(idx: number) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users => users.filter((_, i) => i !== idx));
    }
  }
  function handleSave(user: Omit<User, 'id'>) {
    if (editIdx !== null) {
      setUsers(users => users.map((u, i) => i === editIdx ? { ...u, ...user } : u));
    } else {
      setUsers(users => [...users, { ...user, id: Date.now() }]);
    }
    setModal({ open: false, user: null });
    setEditIdx(null);
  }

  return (
    <DashboardLayout title="Users" subtitle="Manage all users in your agro management system.">
      <div className="w-full max-w-8xl mx-auto px-2 sm:px-8 lg:px-16 py-8">
        {/* <h1 className="text-2xl font-bold text-gray-900 mb-2">Users</h1> */}
        {/* <p className="text-gray-600 mb-6">Manage all users in your agro management system.</p> */}
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
              placeholder="Search users..."
              className="pl-10 pr-3 py-2 w-full border-2 border-gray-300 rounded-md text-gray-900 text-base shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={handleAdd}
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">No users found.</td>
                </tr>
              ) : paginated.map((user, idx) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{user.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{user.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{user.role}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>{user.status}</span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-right flex gap-2 justify-end">
                    <button className="text-blue-700 hover:text-blue-900" onClick={() => handleEdit(users.findIndex(u => u.id === user.id))}><Edit className="w-4 h-4" /></button>
                    <button className="text-red-700 hover:text-red-900" onClick={() => handleDelete(users.findIndex(u => u.id === user.id))}><Trash2 className="w-4 h-4" /></button>
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
        <UserModal
          open={modal.open}
          onClose={() => setModal({ open: false, user: null })}
          onSave={handleSave}
          user={modal.user}
        />
      </div>
    </DashboardLayout>
  );
} 