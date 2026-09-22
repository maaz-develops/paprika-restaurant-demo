import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, Calendar, Clock, Users, MapPin, MessageSquare, X } from 'lucide-react';
import { ReservationData } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationSuccessModalProps {
  reservation: ReservationData | null;
  onClose: () => void;
}

export const ReservationSuccessModal: React.FC<ReservationSuccessModalProps> = ({
  reservation,
  onClose
}) => {
  if (!reservation) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-2xl transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 glass-surface border border-white/70 dark:border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.5)] z-10 overflow-hidden text-stone-900 dark:text-stone-100"
        >
          {/* Close button */}
          <button
            id="close-success-reservation-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-200/50 dark:bg-stone-800/60 hover:bg-stone-300/50 dark:hover:bg-stone-700/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Animated Crystal Jewel Icon */}
          <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            {/* Ambient radiant pulse */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#9B1B1E] via-[#E6B87D] to-amber-300 blur-xl"
            />
            {/* Liquid glass sphere */}
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white/90 to-white/40 dark:from-stone-800 dark:to-stone-900 border border-white dark:border-white/20 shadow-xl flex items-center justify-center">
              <Check className="w-8 h-8 text-[#9B1B1E] dark:text-[#E6B87D] stroke-[2.5]" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-1 mb-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9B1B1E] dark:text-[#E6B87D]">
              Paprika Rahim Yar Khan
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              RESERVATION REQUEST RECEIVED
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mx-auto pt-1">
              Your table is prepared with discrete care. No deposit or advance payment is required.
            </p>
          </div>

          {/* Pass details card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-700">
              <span className="text-stone-400 uppercase tracking-wider text-[10px]">Reference</span>
              <span className="font-mono font-semibold text-stone-900 dark:text-stone-100 bg-white/60 dark:bg-stone-700/60 px-2 py-0.5 rounded-md">
                {reservation.id}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#9B1B1E] dark:text-[#E6B87D]" />
                <div>
                  <div className="text-[10px] text-stone-400">Date</div>
                  <div className="font-medium">{reservation.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9B1B1E] dark:text-[#E6B87D]" />
                <div>
                  <div className="text-[10px] text-stone-400">Time</div>
                  <div className="font-medium">{reservation.time}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#9B1B1E] dark:text-[#E6B87D]" />
                <div>
                  <div className="text-[10px] text-stone-400">Party Size</div>
                  <div className="font-medium">{reservation.guests} Guests</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9B1B1E] dark:text-[#E6B87D]" />
                <div>
                  <div className="text-[10px] text-stone-400">Seating Area</div>
                  <div className="font-medium truncate">{reservation.seatingZone}</div>
                </div>
              </div>
            </div>

            {reservation.specialRequest && (
              <div className="pt-2 border-t border-stone-200 dark:border-stone-700">
                <span className="text-[10px] text-stone-400 block mb-0.5">Special Requests:</span>
                <span className="text-stone-700 dark:text-stone-300 italic">
                  "{reservation.specialRequest}"
                </span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={`${RESTAURANT_INFO.whatsappUrl}?text=${encodeURIComponent(
                `Hello Paprika, I have placed a reservation request under ${reservation.name} for ${reservation.guests} guests on ${reservation.date} at ${reservation.time} (Ref: ${reservation.id}).`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>

            <button
              id="done-reservation-btn"
              onClick={onClose}
              className="py-3.5 px-6 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
