import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle, className = '' }) => {
  return (
    <button
      id="theme-toggle-btn"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      className={`relative inline-flex items-center h-9 w-16 p-1 rounded-full transition-colors duration-500 glass-surface border border-white/60 dark:border-white/10 shadow-sm cursor-pointer ${className}`}
    >
      {/* Sliding liquid glass indicator */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-7 h-7 rounded-full bg-white dark:bg-stone-800 shadow-[0_2px_10px_rgba(0,0,0,0.18)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.6)] flex items-center justify-center border border-white/90 dark:border-white/15"
        style={{
          marginLeft: isDark ? 'auto' : '0'
        }}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-amber-200" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-600" />
        )}
      </motion.div>
    </button>
  );
};
