"use client";

import { useState } from "react";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Home,
  Leaf,
  Droplets,
  Calendar
} from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { name: "Dashboard", icon: Home, href: "/" },
  { name: "Users", icon: Users, href: "/users" },
  { name: "Orders", icon: ShoppingCart, href: "/orders" },
  { name: "Products", icon: Package, href: "/products" },
  { name: "Deliveries", icon: Droplets, href: "/deliveries" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Agro Admin</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              // Determine if this item is active
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive
                      ? 'bg-green-100 text-green-700 border-r-2 border-green-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">A</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@agro.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 