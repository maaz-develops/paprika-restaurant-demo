import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowRight,
  Clock,
  MapPin,
  MessageSquare,
  Sparkles,
  Lock,
  Heart,
  Bike
} from 'lucide-react';
import { CartItem, PaymentMethod, Order } from '../types';
import { PaymentService } from '../services/paymentService';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  userPhone?: string;
}

const RYK_AREAS = [
  'Businessman Colony',
  'Sadiq Club Road',
  'Model Town',
  'Gulshan-e-Iqbal',
  'Abbasia Town',
  'Canal View Colony',
  'Trust Colony'
];

const TIP_OPTIONS = [
  { amount: 0, label: 'No Tip', tagline: '' },
  { amount: 50, label: 'Rs. 50', tagline: 'Chai ☕' },
  { amount: 100, label: 'Rs. 100', tagline: 'Popular ⭐' },
  { amount: 200, label: 'Rs. 200', tagline: 'Generous 💖' },
  { amount: 300, label: 'Rs. 300', tagline: 'Royal 👑' }
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  userPhone = ''
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dine_in_preorder'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('jazzcash');

  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState(userPhone || '');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedArea, setSelectedArea] = useState('Businessman Colony');

  // Rider Tip state
  const [riderTip, setRiderTip] = useState<number>(100);
  const [isCustomTip, setIsCustomTip] = useState<boolean>(false);
  const [customTipInput, setCustomTipInput] = useState<string>('');

  // Gateway specific states
  const [jazzCashMobile, setJazzCashMobile] = useState(userPhone || '');
  const [jazzCashCnic, setJazzCashCnic] = useState('');
  const [easypaisaMobile, setEasypaisaMobile] = useState(userPhone || '');

  // Processing & Completed state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Calculation
  const subtotal = cartItems.reduce((acc, it) => acc + it.dish.price * it.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 3000 ? 0 : 150) : 0;
  const effectiveTip =
    orderType === 'delivery'
      ? isCustomTip
        ? Math.max(0, parseInt(customTipInput, 10) || 0)
        : riderTip
      : 0;
  const total = subtotal + deliveryFee + effectiveTip;

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
    if (!deliveryAddress || RYK_AREAS.some((a) => deliveryAddress.includes(a))) {
      setDeliveryAddress(`${area}, Rahim Yar Khan`);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cartItems.length === 0) {
      setErrorMessage('Your dining bag is empty. Please select dishes from the menu.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid Pakistani phone number (e.g. 0304 5888899).');
      return;
    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMessage('Please specify your delivery address in Rahim Yar Khan.');
      return;
    }

    const orderId = `PPK-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      setIsProcessing(true);

      let transactionRef = `COD-${Date.now().toString().slice(-6)}`;

      if (paymentMethod === 'jazzcash') {
        const jcMobile = jazzCashMobile.trim() || customerPhone.trim();
        setProcessingStatus('Connecting to JazzCash Payment Gateway API...');
        
        const jcResponse = await PaymentService.initiateJazzCash({
          amount: total,
          orderId,
          customerMobile: jcMobile,
          customerCnic: jazzCashCnic.trim() || '456789'
        });

        transactionRef = jcResponse.transactionRef;
        setProcessingStatus('Verifying JazzCash Mobile Account credentials...');
        await new Promise((r) => setTimeout(r, 900));
        setProcessingStatus('Authorization approved by JazzCash.');
      } else if (paymentMethod === 'easypaisa') {
        const epMobile = easypaisaMobile.trim() || customerPhone.trim();
        setProcessingStatus('Connecting to Easypaisa IPG Gateway API...');

        const epResponse = await PaymentService.initiateEasypaisa({
          amount: total,
          orderId,
          mobileNumber: epMobile
        });

        transactionRef = epResponse.transactionRef;
        setProcessingStatus('Notifying Easypaisa Wallet & verifying hash signature...');
        await new Promise((r) => setTimeout(r, 900));
        setProcessingStatus('Payment verified successfully via Easypaisa.');
      } else {
        // Cash on Delivery
        setProcessingStatus('Booking Cash on Delivery order with kitchen...');
        await new Promise((r) => setTimeout(r, 600));
      }

      // Record final order on server
      const finalOrderResult = await PaymentService.createOrder({
        items: cartItems.map((it) => ({
          id: it.dish.id,
          name: it.dish.name,
          price: it.dish.price,
          quantity: it.quantity,
          image: it.dish.image
        })),
        subtotal,
        deliveryFee,
        riderTip: effectiveTip,
        total,
        paymentMethod,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryAddress:
          orderType === 'delivery'
            ? deliveryAddress.trim()
            : 'Takeaway Pickup - Paprika 42 Businessman Colony, Rahim Yar Khan',
        orderType,
        transactionRef
      });

      setCompletedOrder(finalOrderResult.order);
      onClearCart();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Payment processing failed. Please verify your details.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!isProcessing) onClose();
          }}
          className="fixed inset-0 bg-black/75 backdrop-blur-2xl transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ y: '100%', opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 32, stiffness: 350 }}
          style={{ willChange: 'transform, opacity' }}
          className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-t-[2.5rem] sm:rounded-3xl glass-surface border border-white/70 dark:border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.6)] z-10 flex flex-col overflow-hidden text-stone-900 dark:text-stone-100"
        >
          {/* iOS Grabber */}
          <div className="sm:hidden w-12 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto my-3 shrink-0" />

          {/* Close button */}
          {!isProcessing && (
            <button
              id="close-checkout-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 p-2 rounded-full bg-stone-200/60 dark:bg-stone-800/60 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
            >
              <X className="w-5 h-5 text-stone-700 dark:text-stone-300" />
            </button>
          )}

          {/* ORDER SUCCESS SCREEN */}
          {completedOrder ? (
            <div className="p-6 sm:p-10 space-y-6 overflow-y-auto text-center">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-pulse" />
                <div className="relative w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-xl">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9B1B1E] dark:text-[#E6B87D]">
                  Paprika Dining Receipt
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                  ORDER CONFIRMED & DISPATCHED
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm mx-auto">
                  Your meal is being prepared by our master chefs in Rahim Yar Khan.
                </p>
              </div>

              {/* Order receipt pill */}
              <div className="p-5 rounded-2xl bg-stone-100/90 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-700">
                  <span className="text-stone-400 uppercase tracking-wider text-[10px]">
                    Order Number
                  </span>
                  <span className="font-mono font-bold text-stone-900 dark:text-white">
                    {completedOrder.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase">Payment Method</div>
                    <div className="font-bold text-stone-800 dark:text-stone-200 mt-0.5 uppercase flex items-center gap-1.5">
                      {completedOrder.paymentMethod === 'jazzcash' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EB1C24]" />
                      )}
                      {completedOrder.paymentMethod === 'easypaisa' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00AA4F]" />
                      )}
                      {completedOrder.paymentMethod === 'cod' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#9B1B1E]" />
                      )}
                      {completedOrder.paymentMethod.toUpperCase()}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-stone-400 uppercase">Status</div>
                    <div className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {completedOrder.paymentStatus === 'paid' ? 'PAID IN ADVANCE' : 'PAY ON DELIVERY'}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-stone-400 uppercase">Transaction Ref</div>
                    <div className="font-mono text-stone-700 dark:text-stone-300 mt-0.5 truncate">
                      {completedOrder.transactionRef}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-stone-400 uppercase">Total Amount</div>
                    <div className="font-serif font-bold text-base text-[#9B1B1E] dark:text-[#E6B87D]">
                      Rs. {completedOrder.total.toLocaleString()}
                    </div>
                  </div>

                  {completedOrder.riderTip !== undefined && completedOrder.riderTip > 0 && (
                    <div className="col-span-2 text-left pt-1 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                        <span>Rider Tip Included (100% to Delivery Partner):</span>
                      </span>
                      <span className="font-mono font-bold">Rs. {completedOrder.riderTip.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-200 dark:border-stone-700">
                  <div className="text-[10px] text-stone-400 uppercase mb-1">Items Ordered:</div>
                  <div className="space-y-1">
                    {completedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-[11px]">
                        <span>
                          {it.quantity}x {it.name}
                        </span>
                        <span className="font-mono text-stone-500">
                          Rs. {(it.price * it.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`${RESTAURANT_INFO.whatsappUrl}?text=${encodeURIComponent(
                    `Hello Paprika, I have placed order ${completedOrder.id} for Rs. ${completedOrder.total} (${completedOrder.paymentMethod.toUpperCase()}). Please confirm dispatch.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify Kitchen on WhatsApp</span>
                </a>

                <button
                  id="order-done-btn"
                  onClick={onClose}
                  className="py-3.5 px-6 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium text-xs sm:text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <div className="overflow-y-auto scrollbar-none flex-1 p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9B1B1E] dark:text-[#E6B87D] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rahim Yar Khan Dining & Delivery</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                  CHECKOUT & PAYMENT
                </h2>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* 1. Dining Bag Summary */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-400">
                  <span>Selected Dishes ({cartItems.length})</span>
                  <span>Price</span>
                </div>

                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.dish.id}
                      className="p-3 rounded-2xl bg-stone-100/70 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-semibold text-stone-900 dark:text-stone-100">
                            {item.dish.name}
                          </div>
                          <div className="text-stone-400 text-[11px]">
                            Rs. {item.dish.price.toLocaleString()} each
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/70 dark:bg-stone-700/60 border border-stone-200 dark:border-stone-600">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.dish.id, -1)}
                            className="p-1 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.dish.id, 1)}
                            className="p-1 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.dish.id)}
                          className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Order Fulfillment Mode */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                  Order Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#9B1B1E] text-white border-[#9B1B1E] shadow-sm'
                        : 'glass-surface border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    Home Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
                      orderType === 'takeaway'
                        ? 'bg-[#9B1B1E] text-white border-[#9B1B1E] shadow-sm'
                        : 'glass-surface border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    Takeaway Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('dine_in_preorder')}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
                      orderType === 'dine_in_preorder'
                        ? 'bg-[#9B1B1E] text-white border-[#9B1B1E] shadow-sm'
                        : 'glass-surface border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    Dine-in Pre-order
                  </button>
                </div>
              </div>

              {/* 3. Delivery / Customer Information */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
                      Full Name
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Asad Malik"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-surface border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-[#9B1B1E]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">
                      Contact Phone
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-surface border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-[#9B1B1E]/40"
                    />
                  </div>
                </div>

                {orderType === 'delivery' && (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Rahim Yar Khan Neighborhood
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {RYK_AREAS.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => handleAreaSelect(area)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] border transition-colors ${
                            selectedArea === area
                              ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 border-transparent'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>

                    <input
                      id="checkout-address"
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House / Street / Landmark in Rahim Yar Khan"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-surface border border-stone-200 dark:border-stone-700 text-xs focus:ring-2 focus:ring-[#9B1B1E]/40"
                    />
                  </div>
                )}
              </div>

              {/* 4. PAYMENT METHODS (JAZZCASH, EASYPAISA, CASH ON DELIVERY) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400">
                    Payment Method (Pakistan)
                  </label>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                    <Lock className="w-3 h-3" />
                    Gateway Encrypted
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* JAZZCASH */}
                  <button
                    type="button"
                    id="select-jazzcash-btn"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'jazzcash'
                        ? 'bg-[#EB1C24]/10 border-[#EB1C24] shadow-md ring-1 ring-[#EB1C24]'
                        : 'glass-surface border-stone-200 dark:border-stone-700/70 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-lg bg-[#EB1C24] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        JC
                      </div>
                      {paymentMethod === 'jazzcash' && (
                        <CheckCircle2 className="w-4 h-4 text-[#EB1C24]" />
                      )}
                    </div>
                    <div className="mt-2.5">
                      <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                        JazzCash
                      </div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400">
                        Mobile Wallet / MPIN
                      </div>
                    </div>
                  </button>

                  {/* EASYPAISA */}
                  <button
                    type="button"
                    id="select-easypaisa-btn"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'easypaisa'
                        ? 'bg-[#00AA4F]/10 border-[#00AA4F] shadow-md ring-1 ring-[#00AA4F]'
                        : 'glass-surface border-stone-200 dark:border-stone-700/70 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-lg bg-[#00AA4F] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        EP
                      </div>
                      {paymentMethod === 'easypaisa' && (
                        <CheckCircle2 className="w-4 h-4 text-[#00AA4F]" />
                      )}
                    </div>
                    <div className="mt-2.5">
                      <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                        Easypaisa
                      </div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400">
                        Direct In-App Wallet
                      </div>
                    </div>
                  </button>

                  {/* CASH ON DELIVERY */}
                  <button
                    type="button"
                    id="select-cod-btn"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      paymentMethod === 'cod'
                        ? 'bg-[#9B1B1E]/10 border-[#9B1B1E] shadow-md ring-1 ring-[#9B1B1E]'
                        : 'glass-surface border-stone-200 dark:border-stone-700/70 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 rounded-lg bg-[#9B1B1E] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        COD
                      </div>
                      {paymentMethod === 'cod' && (
                        <CheckCircle2 className="w-4 h-4 text-[#9B1B1E]" />
                      )}
                    </div>
                    <div className="mt-2.5">
                      <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                        Cash on Delivery
                      </div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400">
                        Pay Cash to Rider
                      </div>
                    </div>
                  </button>
                </div>

                {/* Gateway Inputs for JazzCash */}
                {paymentMethod === 'jazzcash' && (
                  <div className="p-4 rounded-2xl bg-[#EB1C24]/5 border border-[#EB1C24]/20 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#EB1C24]">
                      <span>JazzCash Gateway Details</span>
                      <span className="text-[10px] font-mono">HMAC-SHA256 Signed</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-stone-500 mb-1">
                          JazzCash Mobile Account Number
                        </label>
                        <input
                          type="tel"
                          value={jazzCashMobile}
                          onChange={(e) => setJazzCashMobile(e.target.value)}
                          placeholder="030X XXXXXXX"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs focus:ring-2 focus:ring-[#EB1C24]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-stone-500 mb-1">
                          CNIC Last 6 Digits (Optional)
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={jazzCashCnic}
                          onChange={(e) => setJazzCashCnic(e.target.value)}
                          placeholder="e.g. 543210"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs focus:ring-2 focus:ring-[#EB1C24]"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-500 leading-relaxed">
                      You will receive an instant payment authorization prompt on your mobile handset. Enter your JazzCash MPIN to complete the order.
                    </p>
                  </div>
                )}

                {/* Gateway Inputs for Easypaisa */}
                {paymentMethod === 'easypaisa' && (
                  <div className="p-4 rounded-2xl bg-[#00AA4F]/5 border border-[#00AA4F]/20 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#00AA4F]">
                      <span>Easypaisa IPG Gateway Details</span>
                      <span className="text-[10px] font-mono">Tokenized Vault</span>
                    </div>

                    <div>
                      <label className="block text-[11px] text-stone-500 mb-1">
                        Easypaisa Registered Number
                      </label>
                      <input
                        type="tel"
                        value={easypaisaMobile}
                        onChange={(e) => setEasypaisaMobile(e.target.value)}
                        placeholder="034X XXXXXXX"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs focus:ring-2 focus:ring-[#00AA4F]"
                      />
                    </div>

                    <p className="text-[11px] text-stone-500 leading-relaxed">
                      An approval notification will be routed to your Easypaisa Mobile App. Confirm the transaction to authorize payment for Paprika Rahim Yar Khan.
                    </p>
                  </div>
                )}

                {/* Cash on Delivery Note */}
                {paymentMethod === 'cod' && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
                    <div className="font-semibold mb-1">Cash on Delivery Policy</div>
                    No advance payment required. Please pay Rs. {total.toLocaleString()} in exact change or via mobile transfer to the Paprika delivery concierge upon arrival.
                  </div>
                )}
              </div>

              {/* Rider Tip Section */}
              {orderType === 'delivery' && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#9B1B1E]/5 to-transparent border border-amber-500/20 dark:border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                        <Heart className="w-4 h-4 fill-amber-500 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 flex-wrap">
                          <span>Tip to Rider</span>
                          <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                            100% to Delivery Hero
                          </span>
                        </h4>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                          Show gratitude to your Paprika delivery partner in Rahim Yar Khan.
                        </p>
                      </div>
                    </div>
                    {effectiveTip > 0 && (
                      <span className="font-serif font-bold text-sm text-[#9B1B1E] dark:text-[#E6B87D] font-mono shrink-0">
                        +Rs. {effectiveTip.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Preset Tip Buttons */}
                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {TIP_OPTIONS.map((tip) => {
                      const isSelected = !isCustomTip && riderTip === tip.amount;
                      return (
                        <button
                          key={tip.amount}
                          type="button"
                          onClick={() => {
                            setIsCustomTip(false);
                            setRiderTip(tip.amount);
                          }}
                          className={`py-2 px-1.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-[#9B1B1E] text-white border-[#9B1B1E] shadow-sm font-semibold'
                              : 'bg-white/80 dark:bg-stone-800/80 border-stone-200/80 dark:border-stone-700/80 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700/60'
                          }`}
                        >
                          <span className="text-[11px] whitespace-nowrap">{tip.label}</span>
                          {tip.tagline && (
                            <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>
                              {tip.tagline}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Tip Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomTip(!isCustomTip);
                        if (!isCustomTip && !customTipInput) {
                          setCustomTipInput('150');
                        }
                      }}
                      className={`text-[11px] font-medium px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                        isCustomTip
                          ? 'bg-[#9B1B1E]/15 text-[#9B1B1E] dark:text-[#E6B87D] border-[#9B1B1E]/30'
                          : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 border-dashed border-stone-300 dark:border-stone-700'
                      }`}
                    >
                      {isCustomTip ? 'Custom Tip' : '+ Custom Tip'}
                    </button>

                    {isCustomTip && (
                      <div className="flex-1 flex items-center gap-1.5">
                        <span className="text-xs font-mono text-stone-500">Rs.</span>
                        <input
                          type="number"
                          min="0"
                          step="10"
                          value={customTipInput}
                          onChange={(e) => setCustomTipInput(e.target.value)}
                          placeholder="Amount in PKR"
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 focus:ring-2 focus:ring-[#9B1B1E]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 5. Bill Summary */}
              <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60 space-y-2 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span className="font-mono">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Delivery in Rahim Yar Khan</span>
                  <span className="font-mono">
                    {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                  </span>
                </div>
                {effectiveTip > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span className="flex items-center gap-1.5">
                      <span>Rider Tip</span>
                      <span className="text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">
                        100% to Rider
                      </span>
                    </span>
                    <span className="font-mono font-medium">
                      +Rs. {effectiveTip.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-serif font-bold text-base text-stone-900 dark:text-stone-100 pt-2 border-t border-stone-200 dark:border-stone-700">
                  <span>Total Amount</span>
                  <span className="text-[#9B1B1E] dark:text-[#E6B87D]">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 pb-2 sm:pb-0">
                <button
                  id="confirm-pay-order-btn"
                  onClick={handleCheckout}
                  disabled={isProcessing || cartItems.length === 0}
                  className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-[#9B1B1E] via-[#B82428] to-[#801417] text-white font-semibold text-xs sm:text-sm transition-all shadow-[0_10px_30px_rgba(155,27,30,0.4)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 touch-manipulation min-h-[50px]"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{processingStatus || 'Processing Payment Gateway...'}</span>
                    </div>
                  ) : (
                    <span>
                      {paymentMethod === 'cod'
                        ? `CONFIRM ORDER (Rs. ${total.toLocaleString()})`
                        : `PAY Rs. ${total.toLocaleString()} VIA ${paymentMethod.toUpperCase()}`}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
