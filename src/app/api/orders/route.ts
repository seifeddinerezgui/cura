import { NextResponse } from 'next/server';
import { getAllOrders } from '@/lib/orders-store';

// Returns all orders for admin screens and order management filters.
export async function GET() {
  return NextResponse.json({ orders: getAllOrders() });
}
