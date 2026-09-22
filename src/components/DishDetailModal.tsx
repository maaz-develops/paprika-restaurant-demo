import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Flame, Sparkles, Clock, Heart, MessageSquare } from 'lucide-react';
import { Dish } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onReserveForDish: (dish: Dish) => void;
  onAddToCart: (dish: Dish) => void;
  isFavorite: boolean;
  onToggleFavorite: (dishId: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onReserveForDish,
  onAddToCart,
  isFavorite,
  onToggleFavorite
}) => {
  if (!dish) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-t-[2.5rem] sm:rounded-3xl glass-surface border border-white/60 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] z-10 flex flex-col overflow-hidden text-stone-900 dark:text-stone-100"
        >
          {/* iOS grabber for mobile */}
          <div className="sm:hidden w-12 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto my-3 shrink-0" />

          {/* Close button */}
          <button
            id="close-dish-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Favorite button */}
          <button
            id="favorite-dish-btn"
            onClick={() => onToggleFavorite(dish.id)}
            className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite ? 'fill-[#B82428] text-[#B82428]' : 'text-white'
              }`}
            />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto scrollbar-none flex-1 pb-6">
            {/* Large Photography Banner */}
            <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-stone-950">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badges on image */}
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#B82428] text-white shadow-md">
                    {dish.category}
                  </span>
                  {dish.isChefSpecial && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#C5A059] text-stone-950 flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3" />
                      Chef’s Signature
                    </span>
                  )}
                </div>

                <div className="font-serif text-2xl font-bold text-white drop-shadow-md">
                  Rs. {dish.price.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Dish Info */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                  {dish.name}
                </h2>
                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mt-2">
                  {dish.description}
                </p>
              </div>

              {/* Quick specs pill row */}
              <div className="flex flex-wrap gap-2.5">
                {dish.preparationTime && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 text-xs text-stone-700 dark:text-stone-300">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Prep: {dish.preparationTime}</span>
                  </div>
                )}
                {dish.calories && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 text-xs text-stone-700 dark:text-stone-300">
                    <span>{dish.calories} kcal</span>
                  </div>
                )}
                {dish.spiceLevel !== undefined && dish.spiceLevel > 0 && (
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 font-medium">
                    <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span>
                      Spice: {dish.spiceLevel === 1 ? 'Mild' : dish.spiceLevel === 2 ? 'Medium' : 'Hot'}
                    </span>
                  </div>
                )}
              </div>

              {/* Chef Tasting Note */}
              {dish.chefNote && (
                <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                  <div className="font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Master Chef’s Note
                  </div>
                  {dish.chefNote}
                </div>
              )}

              {/* Ingredients Tag Cloud */}
              <div>
                <h4 className="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-2.5">
                  Curated Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {dish.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    id="dish-add-to-cart-btn"
                    onClick={() => {
                      onAddToCart(dish);
                      onClose();
                    }}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#9B1B1E] to-[#B82428] hover:from-[#851518] hover:to-[#9B1B1E] text-white font-semibold text-sm transition-all shadow-[0_8px_25px_rgba(155,27,30,0.4)] active:scale-[0.98] text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Order Dish (Rs. {dish.price.toLocaleString()})</span>
                  </button>

                  <button
                    id="dish-reserve-table-btn"
                    onClick={() => {
                      onReserveForDish(dish);
                      onClose();
                    }}
                    className="py-3.5 px-6 rounded-2xl glass-surface border border-stone-200 dark:border-stone-700 hover:bg-stone-200/50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium text-sm transition-all active:scale-[0.98] text-center"
                  >
                    Reserve Table
                  </button>
                </div>

                <a
                  href={`${RESTAURANT_INFO.whatsappUrl}?text=${encodeURIComponent(
                    `Hello Paprika, I would like to inquire about ordering the ${dish.name} (Rs. ${dish.price}).`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-600/20 text-emerald-800 dark:text-emerald-300 font-medium text-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquiries & Delivery Orders</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
