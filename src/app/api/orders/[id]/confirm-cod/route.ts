import { NextResponse } from 'next/server';
import { findOrderById, updateOrderStatus } from '@/lib/orders-store';

// Confirms a pending COD order from the admin dashboard.
export async function PATCH(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const order = findOrderById(id);

  if (!order) {
    return NextResponse.json(
      { error: 'Commande introuvable' },
      { status: 404 }
    );
  }

  if (order.status !== 'pending_cod') {
    return NextResponse.json(
      { error: 'Seules les commandes COD en attente peuvent être confirmées' },
      { status: 400 }
    );
  }

  const updatedOrder = updateOrderStatus(id, 'confirmed_cod');

  return NextResponse.json({ success: true, order: updatedOrder });
}
