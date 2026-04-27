import { NextResponse } from 'next/server';
import { createOrder, setOrderPaymentReference } from '@/lib/orders-store';
import { CartItem, OrderItem } from '@/lib/types';

const FLOUCI_API_BASE_URL = 'https://www.flouci.com/api';

interface FlouciInitiateBody {
  items: CartItem[];
  totalAmount: number;
}

// Converts cart items to order items for persistence before redirecting to Flouci.
function mapCartItemsToOrderItems(items: CartItem[]): OrderItem[] {
  return items.map((item) => ({
    productId: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  }));
}

// Resolves the app base URL from env or request URL for provider callbacks.
function getBaseUrl(request: Request) {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  return new URL(request.url).origin;
}

// Extracts a redirect URL from different Flouci response shapes.
function getFlouciPaymentUrl(payload: any) {
  return (
    payload?.result?.link ||
    payload?.result?.payment_url ||
    payload?.link ||
    payload?.payment_url ||
    null
  );
}

// Initiates a Flouci payment and returns a hosted payment URL for client redirect.
export async function POST(request: Request) {
  try {
    const flouciAppToken = process.env.FLOUCI_APP_TOKEN;
    const flouciAppSecret = process.env.FLOUCI_APP_SECRET;

    if (!flouciAppToken) {
      return NextResponse.json(
        { error: 'Configuration Flouci manquante' },
        { status: 500 }
      );
    }

    const { items, totalAmount } = (await request.json()) as FlouciInitiateBody;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Le panier est vide' },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl(request);
    const order = createOrder({
      items: mapCartItemsToOrderItems(items),
      totalAmount,
      paymentMethod: 'flouci',
      status: 'pending',
    });

    const amountInMillimes = Math.round(totalAmount * 1000);
    const successLink = `${baseUrl}/checkout/success?method=flouci&orderId=${order._id}`;
    const failLink = `${baseUrl}/checkout?error=paiement_echoue&method=flouci`;

    const response = await fetch(`${FLOUCI_API_BASE_URL}/payment_request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${flouciAppToken}`,
        ...(flouciAppSecret ? { 'x-app-secret': flouciAppSecret } : {}),
      },
      body: JSON.stringify({
        amount: amountInMillimes,
        currency: 'TND',
        success_link: successLink,
        fail_link: failLink,
        developer_tracking_id: order._id,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            payload?.message || 'Impossible de demarrer le paiement Flouci',
        },
        { status: response.status }
      );
    }

    const paymentUrl = getFlouciPaymentUrl(payload);
    const paymentReference =
      payload?.result?.payment_id || payload?.result?.id || payload?.payment_id || null;

    if (!paymentUrl) {
      return NextResponse.json(
        { error: 'URL de paiement Flouci introuvable dans la reponse API' },
        { status: 502 }
      );
    }

    if (paymentReference) {
      setOrderPaymentReference(order._id, String(paymentReference));
    }

    return NextResponse.json({ url: paymentUrl, orderId: order._id });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || 'Erreur lors de l\'initialisation Flouci',
      },
      { status: 500 }
    );
  }
}
