'use client';

import StatsCards from '@/components/admin/StatsCards';
import OrdersTable from '@/components/admin/OrdersTable';
import { mockOrders } from '@/lib/mock-data';

export default function AdminDashboard() {
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 mt-1">
          Bienvenue sur le panneau d&apos;administration CURA.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <StatsCards />
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Commandes récentes
          </h2>
          <a
            href="/admin/commandes"
            className="text-sm text-cuir hover:text-cuir-dark transition-colors"
          >
            Voir tout →
          </a>
        </div>
        <OrdersTable orders={recentOrders} />
      </div>
    </div>
  );
}
