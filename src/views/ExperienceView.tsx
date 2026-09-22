import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, ShieldCheck, Heart, Award, Clock } from 'lucide-react';
import { EXPERIENCE_STORY, RESTAURANT_INFO } from '../data/restaurantData';
import { NavTab } from '../types';

interface ExperienceViewProps {
  onNavigateTab: (tab: NavTab) => void;
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({ onNavigateTab }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-24 select-none px-2 sm:px-4">
      {/* Cinematic Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B1B1E]/10 dark:bg-[#9B1B1E]/20 text-[#9B1B1E] dark:text-[#E6B87D] text-xs font-semibold uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Philosophy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-stone-900 dark:text-stone-100 tracking-tight">
          CRAFT, AMBIENCE <br />
          <span className="font-semibold italic text-[#9B1B1E] dark:text-[#E6B87D]">& HOSPITALITY</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light">
          An intentional dialogue between modern architectural elegance and the warmth of South Punjab dining traditions.
        </p>
      </div>

      {/* Alternating Image / Text Sections */}
      <div className="space-y-20">
        {EXPERIENCE_STORY.map((story, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Column */}
              <div
                className={`lg:col-span-7 relative group ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.14)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/60 dark:border-white/10 bg-stone-900 aspect-[16/11]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-black/50 text-[#E6B87D] backdrop-blur-md border border-white/15">
                      {story.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Narrative Column */}
              <div
                className={`lg:col-span-5 space-y-5 ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                  Chapter 0{idx + 1}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight leading-snug">
                  {story.title}
                </h2>
                <p className="font-serif italic text-base sm:text-lg text-[#9B1B1E] dark:text-[#E6B87D]">
                  "{story.lead}"
                </p>
                <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {story.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Culinary Values Trio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-3xl glass-surface border border-white/70 dark:border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-[#9B1B1E]/10 dark:bg-[#9B1B1E]/20 flex items-center justify-center text-[#9B1B1E] dark:text-[#E6B87D]">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
            Artisanal Charcoal Heritage
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Our tandoors and live charcoal pits are fired with fruitwood to infuse each skewer with authentic woodsmoke essence.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-surface border border-white/70 dark:border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-700 dark:text-amber-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
            Purity & Integrity
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            From fresh Atlantic salmon to hand-churned desi ghee and single-origin peppercorns, we never compromise on source quality.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-surface border border-white/70 dark:border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
            Attentive Concierge
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Every table reservation is treated with bespoke dignity, ensuring celebrations and executive dinners unfold seamlessly.
          </p>
        </div>
      </div>

      {/* Call to Reserve */}
      <div className="text-center p-8 sm:p-12 rounded-[2.5rem] glass-surface border border-white/80 dark:border-white/15 space-y-6">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
          Experience Paprika in Person
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
          Reserve your preferred table at 42 Businessman Colony, Rahim Yar Khan.
        </p>
        <button
          onClick={() => onNavigateTab('reservation')}
          className="px-8 py-4 rounded-2xl bg-[#9B1B1E] hover:bg-[#851518] text-white font-medium text-sm transition-all shadow-[0_10px_30px_rgba(155,27,30,0.3)] active:scale-[0.98] cursor-pointer"
        >
          Book Your Table Now
        </button>
      </div>
    </div>
  );
};
