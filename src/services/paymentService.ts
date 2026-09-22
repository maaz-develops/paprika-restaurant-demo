import { PaymentMethod, Order, CartItem } from '../types';

export interface JazzCashResponse {
  success: boolean;
  provider: string;
  mode: 'live' | 'sandbox';
  transactionRef: string;
  orderId: string;
  amount: number;
  formattedAmount: string;
  secureHash: string;
  postParams?: Record<string, string>;
  endpointUrl?: string;
  message: string;
}

export interface EasypaisaResponse {
  success: boolean;
  provider: string;
  mode: 'live' | 'sandbox';
  transactionRef: string;
  orderId: string;
  storeId: string;
  amount: number;
  formattedAmount: string;
  signature: string;
  mobileNumber: string;
  endpointUrl?: string;
  message: string;
}

export const PaymentService = {
  // 1. Initiate JazzCash Mobile Wallet payment
  async initiateJazzCash(params: {
    amount: number;
    orderId: string;
    customerMobile: string;
    customerCnic?: string;
  }): Promise<JazzCashResponse> {
    const res = await fetch('/api/payment/jazzcash/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'JazzCash payment request failed' }));
      throw new Error(err.error || 'Failed to initiate JazzCash');
    }
    return res.json();
  },

  // 2. Initiate Easypaisa Mobile Account payment
  async initiateEasypaisa(params: {
    amount: number;
    orderId: string;
    mobileNumber: string;
  }): Promise<EasypaisaResponse> {
    const res = await fetch('/api/payment/easypaisa/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Easypaisa payment request failed' }));
      throw new Error(err.error || 'Failed to initiate Easypaisa');
    }
    return res.json();
  },

  // 3. Create and finalize order
  async createOrder(data: {
    items: Array<{ id: string; name: string; price: number; quantity: number; image?: string }>;
    subtotal: number;
    deliveryFee: number;
    riderTip?: number;
    total: number;
    paymentMethod: PaymentMethod;
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    orderType: 'delivery' | 'takeaway' | 'dine_in_preorder';
    transactionRef?: string;
  }): Promise<{ success: boolean; order: Order; whatsappUrl: string }> {
    const res = await fetch('/api/order/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Failed to record order' }));
      throw new Error(err.error || 'Order placement failed');
    }
    return res.json();
  }
};
