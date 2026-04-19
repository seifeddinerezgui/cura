import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { CartItem } from '@/lib/types';

const THREE_DECIMAL_CURRENCIES = new Set(['bhd', 'jod', 'kwd', 'omr', 'tnd']);
const ZERO_DECIMAL_CURRENCIES = new Set([
  'bif',
  'clp',
  'djf',
  'gnf',
  'jpy',
  'kmf',
  'krw',
  'mga',
  'pyg',
  'rwf',
  'ugx',
  'vnd',
  'vuv',
  'xaf',
  'xof',
  'xpf',
]);

function getMinorUnitMultiplier(currency: string) {
  if (ZERO_DECIMAL_CURRENCIES.has(currency)) {
    return 1;
  }

  if (THREE_DECIMAL_CURRENCIES.has(currency)) {
    return 1000;
  }

  return 100;
}

export async function POST(request: Request) {
  try {
    const { items } = (await request.json()) as { items: CartItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Le panier est vide' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const stripeCurrency = (process.env.STRIPE_CURRENCY || 'usd').toLowerCase();
    const minorUnitMultiplier = getMinorUnitMultiplier(stripeCurrency);
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((item) => ({
        price_data: {
          currency: stripeCurrency,
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * minorUnitMultiplier),
        },
        quantity: item.quantity,
      })),
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['TN', 'FR', 'DE', 'IT', 'ES', 'BE', 'CH'],
      },
      metadata: {
        items: JSON.stringify(
          items.map((i) => ({
            id: i._id,
            name: i.name,
            qty: i.quantity,
          }))
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création du paiement' },
      { status: 500 }
    );
  }
}
