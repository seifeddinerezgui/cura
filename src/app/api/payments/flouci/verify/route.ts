import { NextResponse } from 'next/server';
import {
  findOrderById,
  findOrderByPaymentReference,
  updateOrderStatus,
} from '@/lib/orders-store';

const FLOUCI_API_BASE_URL = 'https://www.flouci.com/api';

// Extracts payment and order identifiers from common Flouci callback payload formats.
function getFlouciCallbackRefs(payload: any) {
  return {
    paymentId:
      payload?.payment_id ||
      payload?.paymentId ||
      payload?.id ||
      payload?.result?.payment_id ||
      null,
    orderId:
      payload?.developer_tracking_id ||
      payload?.order_id ||
      payload?.orderId ||
      payload?.metadata?.orderId ||
      null,
  };
}

// Fetches payment details from Flouci to validate a callback before updating order status.
async function fetchFlouciPaymentStatus(paymentId: string, token: string) {
  const endpoints = [
    `${FLOUCI_API_BASE_URL}/verify_payment/${paymentId}`,
    `${FLOUCI_API_BASE_URL}/payment/${paymentId}`,
  ];

  for (const endpoint of endpoints) {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      continue;
    }

    return response.json();
  }

  return null;
}

// Detects whether a Flouci verification payload indicates a successful payment.
function isFlouciPaymentSuccessful(payload: any) {
  const rawStatus = String(
    payload?.result?.status ||
      payload?.status ||
      payload?.result?.payment_status ||
      payload?.payment_status ||
      ''
  ).toLowerCase();

  return (
    payload?.success === true ||
    payload?.result?.success === true ||
    payload?.paid === true ||
    payload?.result?.paid === true ||
    ['success', 'paid', 'completed', 'succeeded', 'approved'].includes(rawStatus)
  );
}

// Verifies a Flouci payment callback and updates the associated order to paid when successful.
export async function POST(request: Request) {
  try {
    const flouciAppToken = process.env.FLOUCI_APP_TOKEN;

    if (!flouciAppToken) {
      return NextResponse.json(
        { error: 'Configuration Flouci manquante' },
        { status: 500 }
      );
    }

    const payload = await request.json();
    const refs = getFlouciCallbackRefs(payload);

    if (!refs.paymentId && !refs.orderId) {
      return NextResponse.json(
        { error: 'Aucun identifiant de paiement Flouci fourni' },
        { status: 400 }
      );
    }

    const verificationPayload = refs.paymentId
      ? await fetchFlouciPaymentStatus(refs.paymentId, flouciAppToken)
      : payload;

    if (!verificationPayload) {
      return NextResponse.json(
        { error: 'Impossible de verifier le paiement Flouci' },
        { status: 502 }
      );
    }

    const isPaid = isFlouciPaymentSuccessful(verificationPayload);

    if (!isPaid) {
      return NextResponse.json(
        { success: false, redirectUrl: '/checkout?error=paiement_echoue' },
        { status: 400 }
      );
    }

    const order =
      (refs.orderId ? findOrderById(refs.orderId) : null) ||
      (refs.paymentId ? findOrderByPaymentReference(refs.paymentId) : null);

    if (!order) {
      return NextResponse.json(
        { error: 'Commande introuvable pour ce paiement Flouci' },
        { status: 404 }
      );
    }

    updateOrderStatus(order._id, 'paid');

    return NextResponse.json({ success: true, orderId: order._id });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || 'Erreur lors de la verification Flouci',
      },
      { status: 500 }
    );
  }
}
