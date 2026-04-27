import { NextResponse } from 'next/server';
import { findOrderById, updateOrderStatus } from '@/lib/orders-store';

// Detects whether a Konnect webhook payload indicates a successful payment.
function isKonnectPaymentSuccessful(payload: any) {
  const rawStatus = String(
    payload?.status || payload?.paymentStatus || payload?.state || ''
  ).toLowerCase();

  return (
    payload?.success === true ||
    payload?.paid === true ||
    ['success', 'paid', 'completed', 'succeeded', 'approved'].includes(
      rawStatus
    )
  );
}

// Extracts the order identifier from common Konnect webhook payload formats.
function getKonnectOrderId(payload: any) {
  return (
    payload?.orderId ||
    payload?.order_id ||
    payload?.metadata?.orderId ||
    payload?.payment?.orderId ||
    null
  );
}

// Handles Konnect webhook notifications and marks matching orders as paid.
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const orderId = getKonnectOrderId(payload);

    if (!orderId) {
      return NextResponse.json(
        { error: 'orderId manquant dans le webhook Konnect' },
        { status: 400 }
      );
    }

    const order = findOrderById(orderId);

    if (!order) {
      return NextResponse.json(
        { error: 'Commande introuvable pour ce webhook Konnect' },
        { status: 404 }
      );
    }

    if (isKonnectPaymentSuccessful(payload)) {
      updateOrderStatus(orderId, 'paid');
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || 'Erreur lors du traitement du webhook Konnect',
      },
      { status: 500 }
    );
  }
}
