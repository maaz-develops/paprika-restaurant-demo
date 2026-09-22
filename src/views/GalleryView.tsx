import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/restaurantData';

interface GalleryViewProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

type GalleryFilter = 'all' | 'exterior' | 'interior' | 'dining' | 'food';

export const GalleryView: React.FC<GalleryViewProps> = ({ onOpenLightbox }) => {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all');

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    activeFilter === 'all' ? true : item.category === activeFilter
  );

  return (
    <div className="space-y-8 pb-24 select-none px-2 sm:px-4">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B1B1E]/10 dark:bg-[#9B1B1E]/20 text-[#9B1B1E] dark:text-[#E6B87D] text-xs font-semibold uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Authentic Photography</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 dark:text-stone-100 tracking-tight">
          THE PAPRIKA <span className="font-semibold italic text-[#9B1B1E] dark:text-[#E6B87D]">GALLERY</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light">
          A visual record of our architectural presence, culinary plating, and celebratory guest ambiance in Rahim Yar Khan.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {(['all', 'exterior', 'interior', 'dining', 'food'] as GalleryFilter[]).map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              id={`gallery-filter-${filter}`}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                isActive
                  ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-md'
                  : 'glass-surface text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-200 dark:border-stone-800'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Asymmetric Editorial Bento Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => {
          const isWide = item.aspect === 'wide';
          const isTall = item.aspect === 'tall';

          return (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => onOpenLightbox(item)}
              className={`group relative rounded-3xl overflow-hidden glass-card cursor-pointer ${
                isWide ? 'sm:col-span-2' : ''
              } ${isTall ? 'row-span-2' : ''}`}
            >
              <div className="relative w-full h-72 sm:h-80 lg:h-96 overflow-hidden bg-stone-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Corner Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/40 text-white backdrop-blur-md border border-white/20">
                    {item.category}
                  </span>
                </div>

                {/* Expand icon */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <h3 className="font-serif text-lg font-bold tracking-wide group-hover:text-[#E6B87D] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-300 font-light line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
