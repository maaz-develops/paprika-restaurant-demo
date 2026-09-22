import React from 'react';
import { motion } from 'motion/react';

interface CrystalRefractionProps {
  className?: string;
  variant?: 'subtle' | 'accent' | 'ambient';
}

export const CrystalRefraction: React.FC<CrystalRefractionProps> = ({
  className = '',
  variant = 'subtle'
}) => {
  if (variant === 'ambient') {
    return (
      <div
        className={`pointer-events-none fixed inset-0 overflow-hidden select-none z-0 ${className}`}
        style={{ contain: 'strict', transform: 'translate3d(0,0,0)' }}
      >
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-br from-[#B82428]/12 via-[#E6B87D]/8 to-transparent blur-2xl opacity-60 dark:opacity-40"
          style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-tl from-[#9B1B1E]/10 via-[#E6B87D]/10 to-transparent blur-2xl opacity-50 dark:opacity-30"
          style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
        />
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute -inset-[1px] rounded-[inherit] overflow-hidden ${className}`}>
      {/* Specular edge highlight */}
      <div className="absolute inset-0 rounded-[inherit] border border-white/40 dark:border-white/10 [mask-image:linear-gradient(135deg,black,transparent_70%)]" />
      {/* Subtle crystal refraction diagonal light sweep */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent dark:via-white/[0.02]" />
    </div>
  );
};
