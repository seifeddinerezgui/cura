'use client';

import { useEffect, useMemo, useState } from 'react';
import StatsCards from '@/components/admin/StatsCards';
import OrdersTable from '@/components/admin/OrdersTable';
import { Order } from '@/lib/types';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [confirmingOrderId, setConfirmingOrderId] = useState<string | null>(null);

  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);
  const codOrders = useMemo(
    () => orders.filter((order) => order.status === 'pending_cod'),
    [orders]
  );

  // Fetches all orders for dashboard lists and COD confirmation actions.
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

  // Confirms a COD order from the dedicated dashboard section.
  const handleConfirmCodOrder = async (orderId: string) => {
    setConfirmingOrderId(orderId);

    try {
      const response = await fetch(`/api/orders/${orderId}/confirm-cod`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || 'Impossible de confirmer cette commande COD.'
        );
      }

      await fetchOrders();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue pendant la confirmation.'
      );
    } finally {
      setConfirmingOrderId(null);
    }
  };

  useEffect(() => {
    void fetchOrders();
  }, []);

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

      {/* COD Orders To Confirm */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Commandes COD à confirmer
        </h2>

        {loadingOrders ? (
          <div className="bg-white border border-gray-100 rounded-lg p-6">
            <p className="text-gray-500 text-sm">Chargement des commandes COD...</p>
          </div>
        ) : codOrders.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-lg p-6">
            <p className="text-gray-500 text-sm">
              Aucune commande COD en attente de confirmation.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium">
                      Commande
                    </th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium">
                      Client
                    </th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium">
                      Montant
                    </th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {codOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                        {order.totalAmount.toFixed(2)} TND
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleConfirmCodOrder(order._id)}
                          disabled={confirmingOrderId === order._id}
                          className="px-3 py-1.5 rounded-sm text-xs font-medium bg-cuir text-white hover:bg-cuir-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {confirmingOrderId === order._id
                            ? 'Confirmation...'
                            : 'Confirmer'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
        {loadingOrders ? (
          <div className="bg-white border border-gray-100 rounded-lg p-6">
            <p className="text-gray-500 text-sm">Chargement des commandes...</p>
          </div>
        ) : (
          <OrdersTable orders={recentOrders} />
        )}
      </div>
    </div>
  );
}
