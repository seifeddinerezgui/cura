'use client';

import { Order } from '@/lib/types';
import { formatPrice, formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface OrdersTableProps {
  orders: Order[];
}

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
  pending_cod: 'COD à confirmer',
  confirmed_cod: 'COD confirmée',
  paid: 'Payée',
};

const statusVariants: Record<string, 'warning' | 'info' | 'default' | 'success' | 'danger'> = {
  pending: 'warning',
  confirmed: 'info',
  shipped: 'default',
  delivered: 'success',
  cancelled: 'danger',
  pending_cod: 'warning',
  confirmed_cod: 'info',
  paid: 'success',
};

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" id="orders-table">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium">
                Commande
              </th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium">
                Client
              </th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium">
                Date
              </th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium">
                Montant
              </th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium">
                Articles
              </th>
              <th className="text-left px-6 py-4 text-xs uppercase tracking-wider text-gray-500 font-medium">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerEmail}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {formatDate(order.createdAt)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {formatPrice(order.totalAmount)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} article(s)
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={statusVariants[order.status] || 'default'}>
                    {statusLabels[order.status] || order.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
