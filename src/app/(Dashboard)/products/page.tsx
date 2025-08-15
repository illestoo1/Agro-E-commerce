"use client";

import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { TrendingUp, Package, Layers, DollarSign, Edit, Trash2, Plus, X, Search } from "lucide-react";
import { useState } from "react";

const statsCards = [
  {
    title: "Total Products",
    value: "320",
    change: "+5.2%",
    changeType: "positive" as const,
    icon: <Package />,
    color: "bg-blue-500"
  },
  {
    title: "Categories",
    value: "12",
    change: "+1.0%",
    changeType: "positive" as const,
    icon: <Layers />,
    color: "bg-green-500"
  },
  {
    title: "Stock Value",
    value: "$12,400",
    change: "-2.3%",
    changeType: "negative" as const,
    icon: <DollarSign />,
    color: "bg-emerald-500"
  },
  {
    title: "Revenue",
    value: "$8,900",
    change: "+8.7%",
    changeType: "positive" as const,
    icon: <TrendingUp />,
    color: "bg-cyan-500"
  }
];

const initialProducts = [
  { id: 1, name: "Maize Seed", category: "Seeds", price: 25, stock: 120, status: "Active" },
  { id: 2, name: "Urea Fertilizer", category: "Fertilizers", price: 40, stock: 80, status: "Active" },
  { id: 3, name: "Drip Kit", category: "Irrigation", price: 150, stock: 15, status: "Inactive" },
  { id: 4, name: "Tomato Seedling", category: "Seeds", price: 10, stock: 200, status: "Active" },
  { id: 5, name: "NPK Fertilizer", category: "Fertilizers", price: 35, stock: 60, status: "Active" },
  { id: 6, name: "Sprayer", category: "Equipment", price: 75, stock: 25, status: "Inactive" },
  { id: 7, name: "Hybrid Rice Seed", category: "Seeds", price: 30, stock: 90, status: "Active" },
  { id: 8, name: "Compost", category: "Fertilizers", price: 20, stock: 50, status: "Active" },
  { id: 9, name: "Greenhouse Film", category: "Equipment", price: 200, stock: 8, status: "Inactive" },
  { id: 10, name: "Onion Seed", category: "Seeds", price: 18, stock: 110, status: "Active" },
];

const categories = ["Seeds", "Fertilizers", "Irrigation", "Equipment"];

// Product type
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
};

function ProductModal({ open, onClose, onSave, product }: {
  open: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
  product: Omit<Product, 'id'> | null;
}) {
  const [form, setForm] = useState<Omit<Product, 'id'>>(product || { name: "", category: categories[0], price: 0, stock: 0, status: "Active" });
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}><X /></button>
        <h2 className="text-lg font-semibold mb-4">{product ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input className="mt-1 block w-full border rounded-md px-3 py-2" value={form.name} onChange={e => setForm((f) => ({ ...f, name: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select className="mt-1 block w-full border rounded-md px-3 py-2" value={form.category} onChange={e => setForm((f) => ({ ...f, category: e.target.value }))}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input type="number" min={0} className="mt-1 block w-full border rounded-md px-3 py-2" value={form.price} onChange={e => setForm((f) => ({ ...f, price: Number(e.target.value) }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" min={0} className="mt-1 block w-full border rounded-md px-3 py-2" value={form.stock} onChange={e => setForm((f) => ({ ...f, stock: Number(e.target.value) }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select className="mt-1 block w-full border rounded-md px-3 py-2" value={form.status} onChange={e => setForm((f) => ({ ...f, status: e.target.value }))}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">{product ? "Save Changes" : "Add Product"}</button>
        </form>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<{ open: boolean; product: Omit<Product, 'id'> | null }>({ open: false, product: null });
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const productsPerPage = 5;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * productsPerPage, page * productsPerPage);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  function handleAdd() {
    setModal({ open: true, product: null });
    setEditIdx(null);
  }
  function handleEdit(idx: number) {
    setModal({ open: true, product: products[idx] });
    setEditIdx(idx);
  }
  function handleDelete(idx: number) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products => products.filter((_, i) => i !== idx));
    }
  }
  function handleSave(product: Omit<Product, 'id'>) {
    if (editIdx !== null) {
      setProducts(products => products.map((p, i) => i === editIdx ? { ...p, ...product } : p));
    } else {
      setProducts(products => [...products, { ...product, id: Date.now() }]);
    }
    setModal({ open: false, product: null });
    setEditIdx(null);
  }

  return (
    <DashboardLayout title="Products" subtitle="Manage all products in your agro management system.">
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
              placeholder="Search products..."
              className="pl-10 pr-3 py-2 w-full border-2 border-gray-300 rounded-md text-gray-900 text-base shadow-sm focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none transition"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={handleAdd}
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">No products found.</td>
                </tr>
              ) : paginated.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{product.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{product.category}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-900">{product.stock}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${product.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>{product.status}</span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-right flex gap-2 justify-end">
                    <button className="text-blue-700 hover:text-blue-900" onClick={() => handleEdit(products.findIndex(p => p.id === product.id))}><Edit className="w-4 h-4" /></button>
                    <button className="text-red-700 hover:text-red-900" onClick={() => handleDelete(products.findIndex(p => p.id === product.id))}><Trash2 className="w-4 h-4" /></button>
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
        <ProductModal
          open={modal.open}
          onClose={() => setModal({ open: false, product: null })}
          onSave={handleSave}
          product={modal.product}
        />
      </div>
    </DashboardLayout>
  );
} 