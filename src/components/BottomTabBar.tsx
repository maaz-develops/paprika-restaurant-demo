import React from 'react';
import { motion } from 'motion/react';
import { Compass, UtensilsCrossed, Image as ImageIcon, Sparkles, CalendarDays } from 'lucide-react';
import { NavTab } from '../types';

interface BottomTabBarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

interface TabItem {
  id: NavTab;
  label: string;
  icon: React.ElementType;
}

const TABS: TabItem[] = [
  { id: 'home', label: 'Home', icon: Compass },
  { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'experience', label: 'Experience', icon: Sparkles },
  { id: 'reservation', label: 'Reserve', icon: CalendarDays }
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] pt-1.5 px-2 sm:px-4 pointer-events-none flex justify-center">
      <div className="w-full max-w-[calc(100vw-1rem)] sm:max-w-md md:max-w-lg lg:max-w-xl p-1 sm:p-1.5 rounded-[1.75rem] sm:rounded-[2rem] glass-surface border border-white/70 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] pointer-events-auto flex items-center justify-between transition-all">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className="relative flex-1 min-h-[44px] sm:min-h-[48px] flex flex-col items-center justify-center py-1 sm:py-1.5 px-0.5 sm:px-1 rounded-2xl transition-all cursor-pointer select-none group touch-manipulation"
            >
              {/* Active liquid glass capsule background */}
              {isActive && (
                <motion.div
                  layoutId="active-tab-indicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="absolute inset-0 rounded-[1.2rem] sm:rounded-[1.35rem] bg-gradient-to-b from-[#9B1B1E] to-[#B82428] dark:from-[#9B1B1E] dark:to-[#801417] shadow-[0_4px_18px_rgba(155,27,30,0.45)] border border-white/20"
                />
              )}

              <div className="relative z-10 flex flex-col items-center">
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                    isActive
                      ? 'text-white scale-110'
                      : 'text-stone-500 dark:text-stone-400 group-hover:text-stone-800 dark:group-hover:text-stone-200'
                  }`}
                />
                <span
                  className={`text-[9px] sm:text-[10px] md:text-[11px] font-medium mt-0.5 sm:mt-1 tracking-tight sm:tracking-wider whitespace-nowrap leading-none transition-colors ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-stone-500 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-300'
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
