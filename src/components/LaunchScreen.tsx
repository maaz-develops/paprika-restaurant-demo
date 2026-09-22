import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface LaunchScreenProps {
  onEnter: () => void;
}

export const LaunchScreen: React.FC<LaunchScreenProps> = ({ onEnter }) => {
  useEffect(() => {
    // Automatically transition into the app after a smooth, brief logo presentation
    const timer = setTimeout(() => {
      onEnter();
    }, 1700);

    return () => clearTimeout(timer);
  }, [onEnter]);

  return (
    <motion.div
      id="paprika-launch-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onClick={onEnter}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D11] overflow-hidden select-none cursor-pointer"
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Subtle ambient luxury backdrop glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#9B1B1E]/20 via-[#B82428]/15 to-transparent blur-3xl opacity-70"
          style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
        />
      </div>

      {/* ONLY The Official Paprika Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center justify-center px-6"
      >
        <img
          src="/paprika-logo.png"
          alt="Paprika Restaurant"
          className="w-52 sm:w-64 md:w-72 h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
        />
      </motion.div>
    </motion.div>
  );
};
