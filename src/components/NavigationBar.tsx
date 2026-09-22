import React from 'react';
import { motion } from 'motion/react';
import { User, Phone, MessageSquare, MapPin, Smartphone, Monitor, ShoppingBag } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { UserSession } from '../types';

interface NavigationBarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenLogin: () => void;
  userSession: UserSession;
  onNavigateHome: () => void;
  onNavigateLocation: () => void;
  isIPhoneFrame: boolean;
  onToggleFrame: () => void;
  cartItemCount?: number;
  onOpenCart?: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  isDark,
  onToggleTheme,
  onOpenLogin,
  userSession,
  onNavigateHome,
  onNavigateLocation,
  isIPhoneFrame,
  onToggleFrame,
  cartItemCount = 0,
  onOpenCart
}) => {
  return (
    <header className="sticky top-0 z-40 w-full pt-2 sm:pt-3 px-2 sm:px-4 md:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2 p-1.5 sm:p-2.5 rounded-full glass-surface border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] pointer-events-auto transition-all">
        {/* Left: Brand Identity with Authentic Logo */}
        <button
          id="nav-logo-btn"
          onClick={onNavigateHome}
          className="flex items-center gap-2 pl-1 sm:pl-2 pr-2 sm:pr-3 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group text-left shrink-0 min-h-[38px] touch-manipulation"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-stone-900 border border-white/20 flex items-center justify-center p-0.5 shadow-sm shrink-0">
            <img
              src="/paprika-logo.png"
              alt="Paprika Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-sm sm:text-base tracking-wider text-stone-900 dark:text-stone-100 uppercase leading-none">
              Paprika
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#9B1B1E] dark:text-[#E6B87D] font-medium hidden sm:block leading-none mt-1">
              Rahim Yar Khan
            </span>
          </div>
        </button>

        {/* Center / Right controls with responsive mobile & tablet buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
          {/* Location Shortcut (Tablet & Desktop) */}
          <button
            id="nav-location-btn"
            onClick={onNavigateLocation}
            title="Location & Directions"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800/60 transition-colors min-h-[38px]"
          >
            <MapPin className="w-3.5 h-3.5 text-[#9B1B1E] dark:text-[#E6B87D]" />
            <span className="text-[11px] font-medium">Sadiq Club Rd</span>
          </button>

          {/* Direct Phone Call Button */}
          <a
            id="nav-phone-call"
            href={RESTAURANT_INFO.phoneCallUrl}
            title="Call Paprika Restaurant"
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 text-stone-800 dark:text-stone-200 border border-stone-200/60 dark:border-stone-700/60 transition-all flex items-center justify-center gap-1.5 text-xs min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] touch-manipulation"
          >
            <Phone className="w-3.5 h-3.5 text-[#9B1B1E] dark:text-[#E6B87D]" />
            <span className="hidden lg:inline text-[11px] font-medium">0304 5888899</span>
          </a>

          {/* Direct WhatsApp Concierge */}
          <a
            id="nav-whatsapp-link"
            href={RESTAURANT_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            title="WhatsApp Paprika"
            className="p-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-all min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center touch-manipulation"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </a>

          {/* Desktop/iPhone Frame Toggle (Convenient for client presentations on wider screens) */}
          <button
            id="toggle-iphone-frame-btn"
            onClick={onToggleFrame}
            title={isIPhoneFrame ? 'Switch to Full Screen View' : 'Preview in iPhone Frame'}
            className="hidden lg:flex p-2 rounded-full bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/60 hover:text-stone-900 dark:hover:text-white transition-colors min-w-[36px] min-h-[36px] items-center justify-center"
          >
            {isIPhoneFrame ? (
              <Monitor className="w-3.5 h-3.5" />
            ) : (
              <Smartphone className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Dining Bag / Cart Button */}
          {onOpenCart && (
            <button
              id="nav-dining-bag-btn"
              onClick={onOpenCart}
              title="View Dining Bag & Checkout"
              className={`relative p-2 rounded-full border transition-all cursor-pointer min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center touch-manipulation ${
                cartItemCount > 0
                  ? 'bg-[#9B1B1E] text-white border-[#9B1B1E] shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border-stone-200/60 dark:border-stone-700/60 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-[#9B1B1E] font-bold text-[9px] flex items-center justify-center shadow-md">
                  {cartItemCount}
                </span>
              )}
            </button>
          )}

          {/* Animated Glass Theme Toggle */}
          <div className="shrink-0">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>

          {/* User / Login State Badge */}
          <button
            id="open-login-btn"
            onClick={onOpenLogin}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-full border text-xs font-medium transition-all min-h-[36px] sm:min-h-[40px] touch-manipulation ${
              userSession.isLoggedIn
                ? 'bg-[#9B1B1E]/10 dark:bg-[#9B1B1E]/20 text-[#9B1B1E] dark:text-[#E6B87D] border-[#9B1B1E]/30'
                : 'bg-stone-900 text-white dark:bg-white dark:text-stone-950 border-stone-800 dark:border-white shadow-sm hover:opacity-90'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {userSession.isLoggedIn ? 'VIP Guest' : 'Sign In'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
