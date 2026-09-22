import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Filter, Flame, Heart, Plus } from 'lucide-react';
import { Dish, MenuCategory } from '../types';
import { MENU_DISHES } from '../data/restaurantData';

interface MenuViewProps {
  onSelectDish: (dish: Dish) => void;
  favoriteDishIds: string[];
  onToggleFavorite: (dishId: string) => void;
  onAddToCart: (dish: Dish) => void;
}

const CATEGORIES: { id: MenuCategory | 'ALL'; label: string }[] = [
  { id: 'ALL', label: 'ALL DISHES' },
  { id: 'STARTERS', label: 'STARTERS' },
  { id: 'MAINS', label: 'MAINS' },
  { id: 'GRILLS', label: 'GRILLS' },
  { id: 'PASTA', label: 'PASTA' },
  { id: 'DESSERTS', label: 'DESSERTS' },
  { id: 'DRINKS', label: 'DRINKS' }
];

export const MenuView: React.FC<MenuViewProps> = ({
  onSelectDish,
  favoriteDishIds,
  onToggleFavorite,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyChefSpecials, setOnlyChefSpecials] = useState(false);

  const filteredDishes = useMemo(() => {
    return MENU_DISHES.filter((dish) => {
      const matchesCategory =
        selectedCategory === 'ALL' || dish.category === selectedCategory;
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesChef = !onlyChefSpecials || dish.isChefSpecial;

      return matchesCategory && matchesSearch && matchesChef;
    });
  }, [selectedCategory, searchQuery, onlyChefSpecials]);

  return (
    <div className="space-y-8 pb-24 select-none px-2 sm:px-4">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B1B1E]/10 dark:bg-[#9B1B1E]/20 text-[#9B1B1E] dark:text-[#E6B87D] text-xs font-semibold uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute Cuisine & Barbecue</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 dark:text-stone-100 tracking-tight">
          THE PAPRIKA <span className="font-semibold italic text-[#9B1B1E] dark:text-[#E6B87D]">MENU</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light">
          From slow-charred barbecue over Punjab fruitwood to handmade pastas and artisanal desserts.
        </p>
      </div>

      {/* Search Bar & Chef Filter */}
      <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2.5 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            id="menu-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tender steak, tempura, barbecue..."
            className="w-full pl-11 pr-14 py-3 sm:py-3.5 rounded-2xl glass-surface border border-stone-200 dark:border-stone-700/80 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9B1B1E]/40 text-xs sm:text-sm transition-all min-h-[46px]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
            >
              Clear
            </button>
          )}
        </div>

        <button
          id="chef-specials-toggle-btn"
          onClick={() => setOnlyChefSpecials(!onlyChefSpecials)}
          className={`w-full sm:w-auto px-4 py-3 sm:py-3.5 rounded-2xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[46px] touch-manipulation shrink-0 ${
            onlyChefSpecials
              ? 'bg-[#9B1B1E] text-white border-[#9B1B1E] shadow-sm'
              : 'glass-surface text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E6B87D]" />
          <span>Chef’s Signature Only</span>
        </button>
      </div>

      {/* Segmented Category Glass Controller (Horizontally scrollable and auto-adjusting on mobile & tablet) */}
      <div className="w-full overflow-x-auto scroll-touch scrollbar-none py-1.5 px-0.5">
        <div className="flex items-center justify-start sm:justify-center gap-1 sm:gap-1.5 min-w-max mx-auto p-1 sm:p-1.5 rounded-full glass-surface border border-white/70 dark:border-white/10 shadow-sm">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id.toLowerCase()}`}
                onClick={() => setSelectedCategory(cat.id)}
                className="relative px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all select-none cursor-pointer touch-manipulation min-h-[38px] flex items-center justify-center"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-category-pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 rounded-full bg-stone-900 text-white dark:bg-white dark:text-stone-950 shadow-md"
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isActive
                      ? 'text-white dark:text-stone-950 font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Dish Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => {
              const isFav = favoriteDishIds.includes(dish.id);

              return (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => onSelectDish(dish)}
                  className="group cursor-pointer rounded-3xl overflow-hidden glass-card transition-all flex flex-col justify-between"
                  style={{ willChange: 'opacity, transform' }}
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-stone-950">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/50 text-white backdrop-blur-md border border-white/20">
                        {dish.category}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(dish.id);
                        }}
                        className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFav ? 'fill-[#B82428] text-[#B82428]' : 'text-white'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      {dish.isChefSpecial ? (
                        <div className="flex items-center gap-1 text-[11px] font-medium text-[#E6B87D]">
                          <Sparkles className="w-3 h-3" />
                          <span>Signature</span>
                        </div>
                      ) : (
                        <div />
                      )}

                      <div className="font-serif font-bold text-base sm:text-lg bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                        Rs. {dish.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#9B1B1E] dark:group-hover:text-[#E6B87D] transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-stone-800 text-[11px]">
                      <div className="flex items-center gap-1.5 text-stone-400">
                        {dish.spiceLevel !== undefined && dish.spiceLevel > 0 && (
                          <div className="flex items-center gap-0.5 text-red-500">
                            <Flame className="w-3 h-3 fill-red-500" />
                          </div>
                        )}
                        <span>{dish.ingredients.slice(0, 2).join(', ')}...</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(dish);
                          }}
                          className="px-3.5 py-1.5 rounded-full bg-[#9B1B1E] hover:bg-[#801417] text-white font-semibold text-[11px] flex items-center gap-1 shadow-sm active:scale-95 transition-all min-h-[34px] touch-manipulation cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Order</span>
                        </button>

                        <span className="font-medium text-stone-500 dark:text-stone-400 group-hover:text-[#9B1B1E] dark:group-hover:text-[#E6B87D] transition-colors">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center space-y-3">
              <p className="text-stone-500 text-sm">No dishes found matching your search filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                  setOnlyChefSpecials(false);
                }}
                className="px-4 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-xs font-medium"
              >
                Reset Menu Filters
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
