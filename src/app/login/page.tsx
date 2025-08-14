"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      if (email === "admin@agro.com" && password === "password") {
        // Simulate auth state (for now, just redirect)
        router.push("/");
      } else {
        setError("Invalid email or password");
      }
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">Agro Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full border rounded-md px-3 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full border rounded-md px-3 py-2 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
} 