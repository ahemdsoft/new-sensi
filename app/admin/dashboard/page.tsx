'use client';

import { useState } from 'react';
import { ShoppingBag, Clock, Package, DollarSign, Plus, Eye } from 'lucide-react';

export default function DashboardPage() {
  const [stats] = useState({
    totalOrders: 150,
    pendingOrders: 25,
    totalProducts: 45,
    totalRevenue: 25000
  });

  const cardData = [
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: <ShoppingBag className="h-6 w-6 text-indigo-500" />
    },
    {
      label: 'Pending Orders',
      value: stats.pendingOrders,
      icon: <Clock className="h-6 w-6 text-yellow-500" />
    },
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: <Package className="h-6 w-6 text-green-500" />
    },
    {
      label: 'Total Revenue',
      value: `৳${stats.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="h-6 w-6 text-rose-500" />
    }
  ];

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight text-center">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg p-5 flex items-center hover:shadow-2xl transition duration-300"
            >
              <div className="p-3 bg-white/60 rounded-full shadow-inner">{card.icon}</div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 font-medium">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all">
              <Plus className="w-5 h-5" /> Add New Product
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 transition-all">
              <Eye className="w-5 h-5" /> View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
