import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartFloatingButtonProps {
  items: CartItem[];
  onOpenCart: () => void;
}

export const CartFloatingButton: React.FC<CartFloatingButtonProps> = ({ items, onOpenCart }) => {
  const totalCount = items.reduce((acc, it) => acc + it.quantity, 0);
  const totalPrice = items.reduce((acc, it) => acc + it.dish.price * it.quantity, 0);

  if (totalCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] left-3 right-3 sm:left-4 sm:right-4 z-40 max-w-[calc(100vw-1.5rem)] sm:max-w-md md:max-w-lg mx-auto pointer-events-none"
      >
        <button
          id="open-cart-checkout-btn"
          onClick={onOpenCart}
          className="w-full pointer-events-auto p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#9B1B1E] via-[#B82428] to-[#801417] text-white shadow-[0_12px_35px_rgba(155,27,30,0.55)] border border-white/25 backdrop-blur-xl flex items-center justify-between group active:scale-[0.98] transition-transform cursor-pointer touch-manipulation min-h-[52px]"
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative p-2 rounded-xl bg-white/20 backdrop-blur-md shrink-0">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-[#9B1B1E] font-bold text-[10px] sm:text-[11px] flex items-center justify-center shadow-md">
                {totalCount}
              </span>
            </div>

            <div className="text-left">
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-stone-200 font-semibold leading-tight">
                Dining Bag
              </div>
              <div className="font-serif font-bold text-sm sm:text-base md:text-lg text-white leading-tight">
                Rs. {totalPrice.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wider uppercase border border-white/20 group-hover:bg-white/25 transition-colors shrink-0">
            <span>Checkout</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
