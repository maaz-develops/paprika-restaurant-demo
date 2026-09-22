import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Phone,
  MessageSquare,
  MapPin,
  Award,
  ChevronRight,
  ChevronLeft,
  Plus,
} from 'lucide-react';
import { Dish, NavTab } from '../types';
import { RESTAURANT_INFO, MENU_DISHES } from '../data/restaurantData';

/* ============================================================
   GITHUB PAGES ASSET HELPER
   ============================================================ */

const asset = (filename: string) =>
  `${import.meta.env.BASE_URL}${filename}`;

/* ============================================================
   REAL PAPRIKA INTERIOR / EXTERIOR VIEWS
   ============================================================ */

const HALL_VIEWS = [
  {
    id: 'buffet-hall',
    src: asset('paprika-buffet-hall.jpg'),
    tag: 'ORIGINAL INTERIOR',
    title: 'Buffet Grand Dining Hall',
    subtitle: 'Signature Tufted Leather & Gourmet Chafing Banquet',
    location: 'Sadiq Club Rd',
  },
  {
    id: 'night-facade',
    src: asset('paprika-night-facade.jpg'),
    tag: 'NIGHT EXTERIOR & CAFE',
    title: 'Paprika Restaurant & Cafe Night View',
    subtitle: 'Illuminated Neon Red Chili & Rooftop Balcony',
    location: 'Businessman Colony',
  },
  {
    id: 'fine-dining',
    src: asset('paprika-interior-original.jpg'),
    tag: 'FINE DINING SUITE',
    title: 'Executive Fine Dining Hall',
    subtitle: 'Acoustic Wood Paneling & Ambient Warm Chandeliers',
    location: '42 Businessman Colony',
  },
];

interface HomeViewProps {
  onNavigateTab: (tab: NavTab) => void;
  onSelectDish: (dish: Dish) => void;
  onAddToCart?: (dish: Dish) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigateTab,
  onSelectDish,
  onAddToCart,
}) => {
  const featuredDishes = MENU_DISHES
    .filter((d) => d.isChefSpecial || d.isPopular)
    .slice(0, 4);

  const [activeHallIndex, setActiveHallIndex] = useState(0);
  const currentHall = HALL_VIEWS[activeHallIndex];

  const handleNextHall = () => {
    setActiveHallIndex((prev) => (prev + 1) % HALL_VIEWS.length);
  };

  const handlePrevHall = () => {
    setActiveHallIndex(
      (prev) => (prev - 1 + HALL_VIEWS.length) % HALL_VIEWS.length
    );
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 select-none">

      {/* ==================================================== */}
      {/* 1. CINEMATIC HERO                                    */}
      {/* ==================================================== */}

      <section className="relative w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/60 dark:border-white/10">

        <div className="relative min-h-[580px] sm:min-h-[660px] flex flex-col justify-between p-6 sm:p-12 text-white">

          {/* REAL PAPRIKA EXTERIOR */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-stone-950">

            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1.8,
                ease: 'easeOut',
              }}
              src={asset('paprika-hero-exterior.jpg')}
              alt="Paprika Restaurant Exterior - Rahim Yar Khan"
              className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08]"
              referrerPolicy="no-referrer"
            />

            {/* Cinematic overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,36,40,0.25)_0%,transparent_60%)]" />
          </div>

          {/* TOP BADGES */}

          <div className="relative z-10 flex items-center justify-between">

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-xl text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-[11px] font-medium tracking-wider text-stone-200 uppercase">
                Open Daily Until 1:00 AM
              </span>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-stone-300"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E6B87D]" />

              <span>
                Businessman Colony, RYK
              </span>
            </motion.div>
          </div>

          {/* HERO CONTENT */}

          <div className="relative z-10 max-w-2xl space-y-6 pt-24">

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
              className="space-y-3"
            >

              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#E6B87D] font-semibold">

                <Sparkles className="w-3.5 h-3.5" />

                <span>
                  Rahim Yar Khan, Pakistan
                </span>

              </div>

              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide text-white leading-[1.08]">
                PAPRIKA
              </h1>

              <p className="font-serif italic text-lg sm:text-2xl text-stone-300 font-normal">
                "Speak With The Taste"
              </p>

              <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed max-w-lg">
                Experience architectural luxury, authentic charcoal fire, and masterfully curated Continental & Pakistani dining in the heart of South Punjab.
              </p>

            </motion.div>

            {/* HERO BUTTONS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.35,
              }}
              className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto"
            >

              <button
                id="hero-explore-menu-btn"
                onClick={() => onNavigateTab('menu')}
                className="group relative w-full sm:w-auto min-h-[48px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#9B1B1E] to-[#B82428] hover:from-[#821316] hover:to-[#9B1B1E] text-white text-xs sm:text-sm font-semibold tracking-wider transition-all shadow-[0_10px_30px_rgba(155,27,30,0.5)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
              >
                <span>
                  EXPLORE MENU
                </span>

                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-reserve-table-btn"
                onClick={() => onNavigateTab('reservation')}
                className="group relative w-full sm:w-auto min-h-[48px] px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-[0.98] border border-white/30 hover:border-white/50 text-white text-xs sm:text-sm font-semibold tracking-wider backdrop-blur-2xl transition-all shadow-[0_10px_25px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
              >
                <Calendar className="w-4 h-4 text-[#E6B87D]" />

                <span>
                  RESERVE TABLE
                </span>
              </button>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. PAPRIKA EXPERIENCE                               */}
      {/* ==================================================== */}

      <section className="relative px-2 sm:px-4">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* IMAGE SHOWCASE */}

          <div className="lg:col-span-7 relative group">

            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/60 dark:border-white/10 bg-stone-900 aspect-[4/3] sm:aspect-[16/11]">

              <motion.img
                key={currentHall.id}
                initial={{
                  opacity: 0.4,
                  scale: 1.03,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                src={currentHall.src}
                alt={currentHall.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

              {/* TOP CONTROLS */}

              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10">

                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-bold tracking-widest text-[#E6B87D] uppercase">
                  {currentHall.tag} • {activeHallIndex + 1}/{HALL_VIEWS.length}
                </span>

                <div className="flex items-center gap-1.5">

                  <button
                    onClick={handlePrevHall}
                    aria-label="Previous view"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleNextHall}
                    aria-label="Next view"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                </div>
              </div>

              {/* DETAILS */}

              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white z-10 space-y-2 sm:space-y-2.5">

                <div className="flex items-end justify-between gap-2 sm:gap-3">

                  <div>

                    <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#E6B87D] font-semibold leading-tight">
                      {currentHall.title}
                    </div>

                    <div className="font-serif text-sm sm:text-base md:text-lg font-medium text-stone-100 leading-tight mt-0.5">
                      {currentHall.subtitle}
                    </div>

                  </div>

                  <div className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/20 backdrop-blur-md text-[9px] sm:text-[10px] font-mono text-stone-200 shrink-0">
                    {currentHall.location}
                  </div>

                </div>

                {/* THUMBNAILS */}

                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1 border-t border-white/20">

                  {HALL_VIEWS.map((view, idx) => (

                    <button
                      key={view.id}
                      onClick={() => setActiveHallIndex(idx)}
                      className={`relative h-11 sm:h-14 rounded-xl overflow-hidden border text-left transition-all cursor-pointer touch-manipulation ${
                        activeHallIndex === idx
                          ? 'border-[#E6B87D] ring-2 ring-[#E6B87D]/60 scale-[1.02]'
                          : 'border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >

                      <img
                        src={view.src}
                        alt={view.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <span className="absolute bottom-1 left-1 sm:left-1.5 right-1 sm:right-1.5 text-[8px] sm:text-[9px] font-semibold text-white truncate drop-shadow block leading-tight">
                        {idx === 0
                          ? 'Buffet Hall'
                          : idx === 1
                            ? 'Night Cafe'
                            : 'Fine Dining'}
                      </span>

                    </button>
                  ))}

                </div>
              </div>
            </div>

            {/* FLOATING CARD */}

            <div className="hidden sm:block absolute -bottom-6 -right-6 w-60 p-4 rounded-2xl glass-surface border border-white/80 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.12)]">

              <div className="flex items-center gap-2 mb-2">

                <Award className="w-4 h-4 text-[#9B1B1E] dark:text-[#E6B87D]" />

                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                  Top Rated in RYK
                </span>

              </div>

              <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug">
                Voted premier dining destination for celebratory family gatherings and fine hospitality.
              </p>

            </div>

          </div>

          {/* EXPERIENCE COPY */}

          <div className="lg:col-span-5 space-y-6">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B1B1E]/10 dark:bg-[#9B1B1E]/20 border border-[#9B1B1E]/25 text-xs text-[#9B1B1E] dark:text-[#E6B87D] font-semibold tracking-wider uppercase">

              <Sparkles className="w-3.5 h-3.5" />

              <span>
                Architectural Atmosphere
              </span>

            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 dark:text-stone-100 tracking-tight leading-[1.15]">

              THE PAPRIKA <br />

              <span className="font-semibold italic text-[#9B1B1E] dark:text-[#E6B87D]">
                EXPERIENCE
              </span>

            </h2>

            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Step into an ambiance crafted with intention. From illuminated warm timber and refractive crystal accents to the aroma of authentic Punjabi charcoal grills, Paprika elevates dining in Rahim Yar Khan into an art form.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">

              <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60">

                <div className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  100%
                </div>

                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Prime Halal Cuts & Fresh Ingredients
                </div>

              </div>

              <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60">

                <div className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  4 Distinct
                </div>

                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Seating Halls & VIP Lounges
                </div>

              </div>

            </div>

            <button
              id="view-experience-btn"
              onClick={() => onNavigateTab('experience')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#9B1B1E] dark:text-[#E6B87D] hover:underline pt-2 group cursor-pointer"
            >

              <span>
                Discover our architectural heritage
              </span>

              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />

            </button>

          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 3. FEATURED DISHES                                  */}
      {/* ==================================================== */}

      <section className="space-y-8 px-2 sm:px-4">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">

          <div>

            <div className="text-xs uppercase tracking-[0.25em] text-[#9B1B1E] dark:text-[#E6B87D] font-semibold mb-1">
              Curated By Our Executive Chef
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
              Signature Dishes
            </h2>

          </div>

          <button
            id="see-all-menu-btn"
            onClick={() => onNavigateTab('menu')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-surface border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors self-start sm:self-auto cursor-pointer"
          >

            <span>
              Full Menu ({MENU_DISHES.length} Specialties)
            </span>

            <ChevronRight className="w-4 h-4" />

          </button>

        </div>

        {/* DISH GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {featuredDishes.map((dish) => (

            <motion.div
              key={dish.id}
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={() => onSelectDish(dish)}
              className="group cursor-pointer rounded-3xl overflow-hidden glass-card transition-all flex flex-col justify-between"
            >

              <div className="relative aspect-[4/3] overflow-hidden bg-stone-950">

                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                <div className="absolute top-3 left-3">

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/50 text-white backdrop-blur-md border border-white/20">
                    {dish.category}
                  </span>

                </div>

                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-stone-900 dark:text-white font-serif font-bold text-sm shadow-md">
                  Rs. {dish.price.toLocaleString()}
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

                <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-stone-800 text-[11px] text-stone-400">

                  <span>
                    Tap for ingredients
                  </span>

                  <div className="flex items-center gap-2">

                    {onAddToCart && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(dish);
                        }}
                        className="px-2.5 py-1 rounded-full bg-[#9B1B1E] hover:bg-[#801417] text-white font-semibold text-[10px] flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                      >

                        <Plus className="w-3 h-3" />

                        <span>
                          Order
                        </span>

                      </button>
                    )}

                    <span className="font-medium text-[#9B1B1E] dark:text-[#E6B87D] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>

                  </div>

                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ==================================================== */}
      {/* 4. HOSPITALITY / CONTACT                            */}
      {/* ==================================================== */}

      <section className="relative px-2 sm:px-4">

        <div className="relative rounded-3xl p-6 sm:p-10 glass-surface border border-white/70 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.1)] overflow-hidden">

          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#9B1B1E]/10 dark:bg-[#9B1B1E]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            <div className="space-y-2 max-w-xl">

              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9B1B1E] dark:text-[#E6B87D]">
                Concierge & Reservations
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                Plan Your Evening at Paprika
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                Whether you prefer an intimate candlelit dinner or a grand celebratory feast with family, our hosts are available to arrange your ideal table.
              </p>

            </div>

            {/* CONTACT BUTTONS */}

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">

              <a
                id="home-call-btn"
                href={RESTAURANT_INFO.phoneCallUrl}
                className="flex-1 sm:flex-initial py-3.5 px-6 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-950 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
              >

                <Phone className="w-4 h-4 text-[#E6B87D] dark:text-[#9B1B1E]" />

                <span>
                  CALL PAPRIKA
                </span>

              </a>

              <a
                id="home-whatsapp-btn"
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md"
              >

                <MessageSquare className="w-4 h-4" />

                <span>
                  WHATSAPP PAPRIKA
                </span>

              </a>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
