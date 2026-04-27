'use client';

import { useEffect, useMemo, useState } from 'react';
import OrdersTable from '@/components/admin/OrdersTable';
import { Order } from '@/lib/types';

export default function CommandesPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const filteredOrders = useMemo(
    () =>
      statusFilter === 'all'
        ? orders
        : orders.filter((o) => o.status === statusFilter),
    [orders, statusFilter]
  );

  // Fetches orders for admin filtering and table display.
  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders', {
        cache: 'no-store',
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { orders: Order[] };
      setOrders(data.orders || []);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    void fetchOrders();
  }, []);

  const statusOptions = [
    { value: 'all', label: 'Toutes' },
    { value: 'pending', label: 'En attente' },
    { value: 'pending_cod', label: 'COD à confirmer' },
    { value: 'confirmed_cod', label: 'COD confirmées' },
    { value: 'confirmed', label: 'Confirmées' },
    { value: 'paid', label: 'Payées' },
    { value: 'shipped', label: 'Expédiées' },
    { value: 'delivered', label: 'Livrées' },
    { value: 'cancelled', label: 'Annulées' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Commandes</h1>
          <p className="text-gray-500 mt-1">
            Gérez les commandes de vos clients.
          </p>
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cuir/20 focus:border-cuir"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap gap-3 mb-6">
        {statusOptions.map((option) => {
          const count =
            option.value === 'all'
              ? orders.length
              : orders.filter((o) => o.status === option.value).length;
          return (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                statusFilter === option.value
                  ? 'bg-cuir text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      {loadingOrders ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">Chargement des commandes...</p>
        </div>
      ) : (
        <OrdersTable orders={filteredOrders} />
      )}

      {!loadingOrders && filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">
            Aucune commande avec ce statut.
          </p>
        </div>
      )}
    </div>
  );
}
