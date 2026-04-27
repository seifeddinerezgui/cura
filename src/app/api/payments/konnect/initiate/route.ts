import { NextResponse } from 'next/server';
import { createOrder, setOrderPaymentReference } from '@/lib/orders-store';
import { CartItem, OrderItem } from '@/lib/types';

const KONNECT_API_BASE_URL = 'https://api.konnect.network/api/v2';

interface KonnectInitiateBody {
  items: CartItem[];
  totalAmount: number;
}

// Converts cart items to order items for persistence before redirecting to Konnect.
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

// Extracts a redirect URL from different Konnect response shapes.
function getKonnectPaymentUrl(payload: any) {
  return (
    payload?.payUrl ||
    payload?.paymentUrl ||
    payload?.url ||
    payload?.result?.payUrl ||
    payload?.result?.paymentUrl ||
    payload?.result?.url ||
    null
  );
}

// Initiates a Konnect payment and returns a hosted payment URL for client redirect.
export async function POST(request: Request) {
  try {
    const konnectApiKey = process.env.KONNECT_API_KEY;
    const konnectWalletId = process.env.KONNECT_WALLET_ID;

    if (!konnectApiKey || !konnectWalletId) {
      return NextResponse.json(
        { error: 'Configuration Konnect manquante' },
        { status: 500 }
      );
    }

    const { items, totalAmount } =
      (await request.json()) as KonnectInitiateBody;

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
      paymentMethod: 'konnect',
      status: 'pending',
    });

    const amountInMillimes = Math.round(totalAmount * 1000);
    const successUrl = `${baseUrl}/checkout/success?method=konnect&orderId=${order._id}`;
    const failUrl = `${baseUrl}/checkout?error=paiement_echoue&method=konnect`;

    const response = await fetch(
      `${KONNECT_API_BASE_URL}/payments/init-payment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': konnectApiKey,
        },
        body: JSON.stringify({
          receiverWalletId: konnectWalletId,
          amount: amountInMillimes,
          token: 'TND',
          type: 'immediate',
          orderId: order._id,
          successUrl,
          failUrl,
        }),
      }
    );

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            payload?.message || 'Impossible de demarrer le paiement Konnect',
        },
        { status: response.status }
      );
    }

    const paymentUrl = getKonnectPaymentUrl(payload);
    const paymentReference =
      payload?.paymentRef || payload?.paymentReference || payload?.id || null;

    if (!paymentUrl) {
      return NextResponse.json(
        { error: 'URL de paiement Konnect introuvable dans la reponse API' },
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
        error: error.message || 'Erreur lors de l\'initialisation Konnect',
      },
      { status: 500 }
    );
  }
}
