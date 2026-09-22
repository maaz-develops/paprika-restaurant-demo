import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  allItems: GalleryItem[];
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  item,
  allItems,
  onClose,
  onSelectIndex
}) => {
  if (!item) return null;

  const currentIndex = allItems.findIndex((it) => it.id === item.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = (currentIndex - 1 + allItems.length) % allItems.length;
    onSelectIndex(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (currentIndex + 1) % allItems.length;
    onSelectIndex(next);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onSelectIndex((currentIndex - 1 + allItems.length) % allItems.length);
      if (e.key === 'ArrowRight') onSelectIndex((currentIndex + 1) % allItems.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, allItems.length, onClose, onSelectIndex]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 select-none">
        {/* Background Backdrop with liquid blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl transition-opacity"
        />

        {/* Floating Top Controls */}
        <div className="fixed top-6 left-6 right-6 z-20 flex items-center justify-between text-white pointer-events-none">
          <div className="pointer-events-auto px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono tracking-wider">
            {currentIndex + 1} / {allItems.length}
          </div>

          <button
            id="close-gallery-lightbox-btn"
            onClick={onClose}
            className="pointer-events-auto p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white backdrop-blur-md transition-all border border-white/15"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Left Arrow */}
        <button
          id="prev-lightbox-btn"
          onClick={handlePrev}
          className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/15 hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          id="next-lightbox-btn"
          onClick={handleNext}
          className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/15 hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Container with smooth motion */}
        <motion.div
          key={item.id}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl max-h-[85vh] z-10 flex flex-col items-center"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] border border-white/15 bg-stone-950">
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[70vh] w-auto object-contain mx-auto"
            />
          </div>

          {/* Caption Glass Bar */}
          <div className="mt-4 px-6 py-3 rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-xl text-center max-w-xl text-white">
            <h3 className="font-serif text-lg font-medium tracking-wide text-white">
              {item.title}
            </h3>
            <p className="text-xs text-stone-300 mt-1 font-light leading-relaxed">
              {item.caption}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
