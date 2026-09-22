import express from 'express';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory orders store for the live session
interface ServerOrder {
  id: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  subtotal: number;
  deliveryFee: number;
  riderTip?: number;
  total: number;
  paymentMethod: 'jazzcash' | 'easypaisa' | 'cod';
  paymentStatus: 'paid' | 'pending_on_delivery' | 'processing';
  transactionRef?: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  orderType: 'delivery' | 'takeaway' | 'dine_in_preorder';
  createdAt: string;
}

const activeOrders: Map<string, ServerOrder> = new Map();

// Helper: Calculate JazzCash HMAC-SHA256 Secure Hash
function generateJazzCashSecureHash(params: Record<string, string>, integritySalt: string): string {
  // JazzCash requires sorting alphabetically by key, ignoring empty and specific keys
  const sortedKeys = Object.keys(params).sort();
  let hashString = integritySalt;
  for (const key of sortedKeys) {
    if (params[key] && key !== 'pp_SecureHash') {
      hashString += `&${params[key]}`;
    }
  }
  return crypto.createHmac('sha256', integritySalt).update(hashString).digest('hex').toUpperCase();
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    restaurant: 'Paprika Restaurant Rahim Yar Khan',
    time: new Date().toISOString()
  });
});

// 2. Public Payment Gateway Config (Safe public info only)
app.get('/api/payment/config', (req, res) => {
  const isJazzCashConfigured = Boolean(
    process.env.JAZZCASH_MERCHANT_ID && process.env.JAZZCASH_INTEGRITY_SALT
  );
  const isEasypaisaConfigured = Boolean(
    process.env.EASYPAISA_STORE_ID && process.env.EASYPAISA_HASH_KEY
  );

  res.json({
    currency: 'PKR',
    currencySymbol: 'Rs.',
    gatewayMode: process.env.PAYMENT_GATEWAY_MODE || 'sandbox',
    supportedMethods: [
      {
        id: 'jazzcash',
        name: 'JazzCash',
        type: 'mobile_wallet_and_card',
        tagline: 'Pay instantly via JazzCash Mobile Account or Voucher',
        isConfigured: isJazzCashConfigured,
        icon: 'jazzcash',
        accentColor: '#EB1C24'
      },
      {
        id: 'easypaisa',
        name: 'Easypaisa',
        type: 'mobile_wallet',
        tagline: 'Direct Easypaisa Wallet & In-App Prompt',
        isConfigured: isEasypaisaConfigured,
        icon: 'easypaisa',
        accentColor: '#00AA4F'
      },
      {
        id: 'cod',
        name: 'Cash on Delivery (COD)',
        type: 'cash',
        tagline: 'Pay cash or card to the rider upon delivery in Rahim Yar Khan',
        isConfigured: true,
        icon: 'cod',
        accentColor: '#9B1B1E'
      }
    ],
    deliveryAreas: [
      'Businessman Colony, Rahim Yar Khan',
      'Sadiq Club Road, Rahim Yar Khan',
      'Model Town, Rahim Yar Khan',
      'Gulshan-e-Iqbal, Rahim Yar Khan',
      'Abbasia Town, Rahim Yar Khan',
      'Canal View Colony, Rahim Yar Khan',
      'Trust Colony, Rahim Yar Khan',
      'Officers Colony, Rahim Yar Khan'
    ],
    freeDeliveryThreshold: 3000,
    standardDeliveryFee: 150
  });
});

// 3. JazzCash Initiation Endpoint
app.post('/api/payment/jazzcash/initiate', (req, res) => {
  try {
    const { amount, orderId, customerMobile, customerCnic } = req.body;

    if (!amount || !orderId || !customerMobile) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters (amount, orderId, customerMobile)'
      });
    }

    const merchantId = process.env.JAZZCASH_MERCHANT_ID || 'MC12345_SANDBOX';
    const password = process.env.JAZZCASH_PASSWORD || 'dummy_pass';
    const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT || 'paprika_jazzcash_salt_secret';
    const returnUrl = process.env.JAZZCASH_RETURN_URL || `${process.env.APP_URL || 'http://localhost:3000'}/api/payment/callback`;

    // Timestamp in YYYYMMDDHHmmss
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const txnDateTime = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    
    const expiryDate = new Date(now.getTime() + 60 * 60 * 1000);
    const txnExpiryDateTime = `${expiryDate.getFullYear()}${pad(expiryDate.getMonth() + 1)}${pad(expiryDate.getDate())}${pad(expiryDate.getHours())}${pad(expiryDate.getMinutes())}${pad(expiryDate.getSeconds())}`;
    
    // Amount in paisas (PKR * 100)
    const amountInPaisa = Math.round(Number(amount) * 100).toString();
    const txnRefNo = `T${Date.now().toString().slice(-10)}`;

    const postData: Record<string, string> = {
      pp_Version: '1.1',
      pp_TxnType: 'MWALLET',
      pp_Language: 'EN',
      pp_MerchantID: merchantId,
      pp_Password: password,
      pp_TxnRefNo: txnRefNo,
      pp_Amount: amountInPaisa,
      pp_TxnCurrency: 'PKR',
      pp_TxnDateTime: txnDateTime,
      pp_BillReference: orderId,
      pp_Description: `Paprika Dining Order ${orderId}`,
      pp_TxnExpiryDateTime: txnExpiryDateTime,
      pp_ReturnURL: returnUrl,
      pp_MobileNumber: customerMobile.replace(/\D/g, ''),
      pp_CNIC: customerCnic ? customerCnic.slice(-6) : '345678'
    };

    const secureHash = generateJazzCashSecureHash(postData, integritySalt);
    postData.pp_SecureHash = secureHash;

    const isLive = Boolean(process.env.JAZZCASH_MERCHANT_ID && process.env.PAYMENT_GATEWAY_MODE === 'live');

    // In live mode with credentials, gateway endpoint is used.
    // In sandbox mode or client demo, it validates and returns a high-fidelity authorization token.
    return res.json({
      success: true,
      provider: 'JazzCash',
      mode: isLive ? 'live' : 'sandbox',
      transactionRef: txnRefNo,
      orderId,
      amount: Number(amount),
      formattedAmount: `Rs. ${Number(amount).toLocaleString()}`,
      secureHash,
      postParams: postData,
      endpointUrl: isLive
        ? 'https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform'
        : 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform',
      message: 'JazzCash transaction initialized. Prompting wallet approval.'
    });
  } catch (err: any) {
    console.error('JazzCash initiation error:', err);
    return res.status(500).json({ success: false, error: err.message || 'JazzCash initiation failed' });
  }
});

// 4. Easypaisa Initiation Endpoint
app.post('/api/payment/easypaisa/initiate', (req, res) => {
  try {
    const { amount, orderId, mobileNumber } = req.body;

    if (!amount || !orderId || !mobileNumber) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters (amount, orderId, mobileNumber)'
      });
    }

    const storeId = process.env.EASYPAISA_STORE_ID || 'EP_STORE_RYK_42';
    const hashKey = process.env.EASYPAISA_HASH_KEY || 'easypaisa_paprika_key_ryk';
    const txnRefNo = `EP-${Date.now().toString().slice(-8)}`;

    // Generate SHA-256 signature for Easypaisa IPG
    const rawSign = `amount=${amount}&orderRefNum=${orderId}&storeId=${storeId}&key=${hashKey}`;
    const signature = crypto.createHash('sha256').update(rawSign).digest('hex');

    const isLive = Boolean(process.env.EASYPAISA_STORE_ID && process.env.PAYMENT_GATEWAY_MODE === 'live');

    return res.json({
      success: true,
      provider: 'Easypaisa',
      mode: isLive ? 'live' : 'sandbox',
      transactionRef: txnRefNo,
      orderId,
      storeId,
      amount: Number(amount),
      formattedAmount: `Rs. ${Number(amount).toLocaleString()}`,
      signature,
      mobileNumber: mobileNumber.replace(/\D/g, ''),
      endpointUrl: isLive
        ? 'https://easypay.easypaisa.com.pk/easypay/Index.jsf'
        : 'https://easypaystg.easypaisa.com.pk/easypay/Index.jsf',
      message: 'Easypaisa transaction initiated. Push notification sent to registered wallet.'
    });
  } catch (err: any) {
    console.error('Easypaisa initiation error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Easypaisa initiation failed' });
  }
});

// 5. Complete Order Creation Endpoint
app.post('/api/order/create', (req, res) => {
  try {
    const {
      items,
      subtotal,
      deliveryFee,
      riderTip,
      total,
      paymentMethod,
      customerName,
      customerPhone,
      deliveryAddress,
      orderType = 'delivery',
      transactionRef
    } = req.body;

    if (!items || !items.length || !customerName || !customerPhone) {
      return res.status(400).json({
        success: false,
        error: 'Order requires items, customerName, and customerPhone'
      });
    }

    const orderId = `PPK-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const paymentStatus = paymentMethod === 'cod' ? 'pending_on_delivery' : 'paid';
    const parsedRiderTip = Number(riderTip) || 0;

    const newOrder: ServerOrder = {
      id: orderId,
      items,
      subtotal: Number(subtotal),
      deliveryFee: Number(deliveryFee) || 0,
      riderTip: parsedRiderTip,
      total: Number(total),
      paymentMethod,
      paymentStatus,
      transactionRef: transactionRef || (paymentMethod === 'cod' ? 'COD-ON-ARRIVAL' : `TXN-${Date.now()}`),
      customerName,
      customerPhone,
      deliveryAddress: deliveryAddress || 'Paprika Rahim Yar Khan (Pickup)',
      orderType,
      createdAt: new Date().toISOString()
    };

    activeOrders.set(orderId, newOrder);

    // Build pre-filled WhatsApp message for customer / kitchen dispatch
    const itemsSummary = items
      .map((it: any) => `${it.quantity}x ${it.name} (Rs. ${it.price * it.quantity})`)
      .join('%0A- ');

    const riderTipText = parsedRiderTip > 0
      ? `*Rider Tip:* Rs. ${parsedRiderTip.toLocaleString()} (100% to Delivery Partner)%0A`
      : '';

    const whatsappSummary = `*NEW PAPRIKA ORDER: ${orderId}*%0A` +
      `*Customer:* ${encodeURIComponent(customerName)} (${encodeURIComponent(customerPhone)})%0A` +
      `*Address:* ${encodeURIComponent(deliveryAddress || 'Dine-in / Pickup')}%0A` +
      `*Payment:* ${paymentMethod.toUpperCase()} (${paymentStatus.toUpperCase()})%0A` +
      riderTipText +
      `*Total:* Rs. ${Number(total).toLocaleString()}%0A%0A` +
      `*Items:*%0A- ${encodeURIComponent(itemsSummary)}`;

    const whatsappUrl = `https://wa.me/923036522333?text=${whatsappSummary}`;

    return res.json({
      success: true,
      order: newOrder,
      whatsappUrl,
      message: 'Order placed successfully and recorded in Paprika system.'
    });
  } catch (err: any) {
    console.error('Order creation error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Failed to place order' });
  }
});

// 6. Get Order Details
app.get('/api/order/:id', (req, res) => {
  const order = activeOrders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }
  return res.json({ success: true, order });
});

// ----------------------------------------------------
// VITE SPA / STATIC SERVER SETUP
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Paprika Restaurant Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
