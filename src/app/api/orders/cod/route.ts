import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/orders-store';
import { CartItem, OrderItem } from '@/lib/types';

interface CodCheckoutBody {
  items: CartItem[];
  totalAmount?: number;
}

// Converts cart items from the client store to the order item structure used in the admin order system.
function mapCartItemsToOrderItems(items: CartItem[]): OrderItem[] {
  return items.map((item) => ({
    productId: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  }));
}

// Calculates an order total when the client did not provide one.
function getFallbackTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Creates a cash-on-delivery order and marks it as pending confirmation in admin.
export async function POST(request: Request) {
  try {
    const { items, totalAmount } = (await request.json()) as CodCheckoutBody;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Le panier est vide' },
        { status: 400 }
      );
    }

    const order = createOrder({
      items: mapCartItemsToOrderItems(items),
      totalAmount: totalAmount || getFallbackTotal(items),
      paymentMethod: 'cod',
      status: 'pending_cod',
    });

    return NextResponse.json({
      success: true,
      orderId: order._id,
      url: '/checkout/success?method=cod',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création de la commande COD' },
      { status: 500 }
    );
  }
}
