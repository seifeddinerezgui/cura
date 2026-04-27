import 'server-only';

import { mockOrders } from '@/lib/mock-data';
import { Order, OrderItem, OrderStatus, PaymentMethod } from '@/lib/types';

interface CreateOrderInput {
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  customerName?: string;
  customerEmail?: string;
  shippingAddress?: string;
  paymentReference?: string;
}

interface OrdersStore {
  orders: Order[];
}

// Generates a readable CURA order number using the current year and a random 6-digit suffix.
function generateOrderNumber() {
  const year = new Date().getFullYear();
  const suffix = Math.floor(100000 + Math.random() * 900000);
  return `CURA-${year}-${suffix}`;
}

// Bootstraps the in-memory orders store with existing mock orders only once per server process.
function bootstrapOrders(): Order[] {
  return mockOrders.map((order) => ({
    ...order,
    paymentMethod: order.paymentMethod || 'stripe',
  }));
}

// Returns a process-level singleton store so API routes share the same in-memory orders state.
function getOrderStore(): OrdersStore {
  const storeKey = '__cura_orders_store__';
  const globalStore = globalThis as typeof globalThis & {
    [storeKey]?: OrdersStore;
  };

  if (!globalStore[storeKey]) {
    globalStore[storeKey] = {
      orders: bootstrapOrders(),
    };
  }

  return globalStore[storeKey];
}

// Returns all orders sorted from newest to oldest for admin views.
export function getAllOrders() {
  return [...getOrderStore().orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Creates a new order and stores it in memory for payment callbacks and admin confirmation flows.
export function createOrder(input: CreateOrderInput) {
  const order: Order = {
    _id: `order-${crypto.randomUUID()}`,
    orderNumber: generateOrderNumber(),
    customerName: input.customerName || 'Client CURA',
    customerEmail: input.customerEmail || 'client@cura.tn',
    items: input.items,
    totalAmount: input.totalAmount,
    status: input.status,
    paymentMethod: input.paymentMethod,
    paymentReference: input.paymentReference,
    stripeSessionId: input.paymentMethod === 'stripe' ? input.paymentReference : undefined,
    shippingAddress: input.shippingAddress || 'Adresse à confirmer',
    createdAt: new Date().toISOString(),
  };

  getOrderStore().orders.unshift(order);

  return order;
}

// Updates the status of an order by id and returns the updated order when found.
export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const store = getOrderStore();
  const order = store.orders.find((currentOrder) => currentOrder._id === orderId);

  if (!order) {
    return null;
  }

  order.status = status;
  return order;
}

// Stores an external payment reference on an existing order for webhook correlation.
export function setOrderPaymentReference(orderId: string, paymentReference: string) {
  const order = findOrderById(orderId);

  if (!order) {
    return null;
  }

  order.paymentReference = paymentReference;
  return order;
}

// Finds an order by id for admin actions and callbacks.
export function findOrderById(orderId: string) {
  return getOrderStore().orders.find((order) => order._id === orderId) || null;
}

// Finds an order by a payment reference coming from external payment providers.
export function findOrderByPaymentReference(paymentReference: string) {
  return (
    getOrderStore().orders.find(
      (order) => order.paymentReference === paymentReference
    ) || null
  );
}
