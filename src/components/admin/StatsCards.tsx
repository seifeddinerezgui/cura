'use client';

import { Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { mockOrders, mockProducts } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';

export default function StatsCards() {
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = mockOrders.length;
  const totalProducts = mockProducts.length;
  const inStockProducts = mockProducts.filter((p) => p.inStock).length;

  const stats = [
    {
      label: 'Chiffre d\'affaires',
      value: formatPrice(totalRevenue),
      icon: TrendingUp,
      change: '+12%',
      changePositive: true,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Commandes',
      value: totalOrders.toString(),
      icon: ShoppingCart,
      change: '+3',
      changePositive: true,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Produits',
      value: totalProducts.toString(),
      icon: Package,
      change: `${inStockProducts} en stock`,
      changePositive: true,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Clients',
      value: new Set(mockOrders.map((o) => o.customerEmail)).size.toString(),
      icon: Users,
      change: 'Clients uniques',
      changePositive: true,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
            >
              <stat.icon size={20} />
            </div>
            <span className="text-xs text-green-600 font-medium">
              {stat.change}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
