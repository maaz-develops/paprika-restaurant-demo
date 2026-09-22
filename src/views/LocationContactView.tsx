import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, ExternalLink, Globe, Shield, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationContactView: React.FC = () => {
  return (
    <div className="space-y-12 pb-24 select-none px-2 sm:px-4 max-w-4xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B1B1E]/10 dark:bg-[#9B1B1E]/20 text-[#9B1B1E] dark:text-[#E6B87D] text-xs font-semibold uppercase tracking-[0.25em]">
          <MapPin className="w-3.5 h-3.5" />
          <span>Sadiq Club Road, Rahim Yar Khan</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 dark:text-stone-100 tracking-tight">
          LOCATION & <span className="font-semibold italic text-[#9B1B1E] dark:text-[#E6B87D]">CONCIERGE</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light max-w-md mx-auto">
          Visit us at 42 Businessman Colony or contact our guest relations team directly.
        </p>
      </div>

      {/* Primary Action Glass Buttons - Exactly mandated text & links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          id="location-call-paprika-btn"
          href={RESTAURANT_INFO.phoneCallUrl}
          className="group relative p-6 rounded-3xl glass-surface border border-stone-200 dark:border-white/10 hover:border-[#9B1B1E]/50 transition-all flex items-center justify-between shadow-[0_12px_30px_rgba(0,0,0,0.06)] active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#9B1B1E]/10 dark:bg-[#9B1B1E]/20 text-[#9B1B1E] dark:text-[#E6B87D] flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                Immediate Host Line
              </div>
              <div className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#9B1B1E] dark:group-hover:text-[#E6B87D] transition-colors">
                CALL PAPRIKA
              </div>
              <div className="text-xs text-stone-500 font-mono mt-0.5">
                {RESTAURANT_INFO.phoneDisplay}
              </div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white transition-colors" />
        </a>

        <a
          id="location-whatsapp-paprika-btn"
          href={RESTAURANT_INFO.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="group relative p-6 rounded-3xl glass-surface border border-stone-200 dark:border-white/10 hover:border-emerald-500/50 transition-all flex items-center justify-between shadow-[0_12px_30px_rgba(0,0,0,0.06)] active:scale-[0.98]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">
                Fast WhatsApp Support
              </div>
              <div className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                WHATSAPP PAPRIKA
              </div>
              <div className="text-xs text-stone-500 font-mono mt-0.5">
                {RESTAURANT_INFO.whatsappDisplay}
              </div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-stone-900 dark:group-hover:text-white transition-colors" />
        </a>
      </div>

      {/* Apple Maps Inspired Interactive Map Display */}
      <div className="relative rounded-3xl overflow-hidden glass-surface border border-white/70 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
        {/* Map Header bar */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 bg-white/40 dark:bg-stone-900/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 flex items-center justify-center font-bold text-xs">
              <MapPin className="w-4 h-4 text-[#E6B87D] dark:text-[#9B1B1E]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                Paprika Restaurant
              </div>
              <div className="text-[10px] text-stone-500 dark:text-stone-400">
                Rahim Yar Khan, Punjab 64200
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Paprika+Restaurant+Rahim+Yar+Khan"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-medium hover:opacity-90 transition-opacity"
          >
            <Navigation className="w-3 h-3 text-[#E6B87D] dark:text-[#9B1B1E]" />
            <span>Open in Maps</span>
          </a>
        </div>

        {/* Map Visual (Styled vector schematic + satellite feeling) */}
        <div className="relative h-72 sm:h-84 w-full bg-[#1b1e23] overflow-hidden flex items-center justify-center">
          {/* Real exterior backdrop with dark map overlay */}
          <img
            src="/paprika-hero-exterior.jpg"
            alt="Paprika Location Map"
            className="w-full h-full object-cover opacity-25 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-stone-950/60 [background-image:radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Central Pulsing iOS Map Pin */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute -top-3 w-16 h-16 rounded-full bg-[#9B1B1E]/40 blur-md pointer-events-none"
            />
            <div className="relative w-12 h-12 rounded-2xl bg-[#9B1B1E] text-white shadow-2xl border-2 border-white flex items-center justify-center">
              <img
                src="/paprika-logo.png"
                alt="Paprika Pin"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="mt-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-md">
              Paprika Restaurant
            </div>
          </div>
        </div>

        {/* Details Footer */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#9B1B1E] dark:text-[#E6B87D] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-stone-900 dark:text-stone-100">Full Address</div>
              <div className="text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                42 Businessman Colony, Sadiq Club Road, Rahim Yar Khan, Punjab, Pakistan
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#9B1B1E] dark:text-[#E6B87D] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-stone-900 dark:text-stone-100">Dining Hours</div>
              <div className="text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                Monday – Sunday: 12:00 PM – 01:00 AM (Continuous Service)
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Globe className="w-4 h-4 text-[#9B1B1E] dark:text-[#E6B87D] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-stone-900 dark:text-stone-100">Official Portal</div>
              <a
                href={RESTAURANT_INFO.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="text-[#9B1B1E] dark:text-[#E6B87D] hover:underline mt-0.5 block"
              >
                https://paprika.pk/
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
