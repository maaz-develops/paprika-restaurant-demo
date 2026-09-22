import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Phone, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { UserSession } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  userSession: UserSession;
  onLoginSuccess: (phone: string) => void;
  onLogout: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  userSession,
  onLoginSuccess,
  onLogout
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    const cleanPhone = phoneNumber.trim().replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid Pakistani phone number (e.g. 0304 5888899).');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage('Password must be at least 4 characters.');
      return;
    }

    setSuccessAnimation(true);
    setTimeout(() => {
      onLoginSuccess(cleanPhone);
      setSuccessAnimation(false);
      onClose();
    }, 1200);
  };

  const handleDemoFill = () => {
    setPhoneNumber('0304 5888899');
    setPassword('paprika2026');
    setErrorMessage('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xl transition-all"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 glass-surface border border-white/70 dark:border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            id="close-login-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-200/50 dark:bg-stone-800/60 hover:bg-stone-300/50 dark:hover:bg-stone-700/60 text-stone-600 dark:text-stone-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* If already logged in */}
          {userSession.isLoggedIn ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 font-semibold">
                  Member Active
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 font-mono">
                  {userSession.phone}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>VIP Guest Privileges Unlocked</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-950 font-medium text-sm transition-transform active:scale-[0.98]"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={onLogout}
                  className="w-full py-2.5 rounded-2xl border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#9B1B1E]/10 dark:bg-[#9B1B1E]/20 border border-[#9B1B1E]/20 flex items-center justify-center text-[#9B1B1E] dark:text-[#E6B87D]">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 font-bold tracking-tight">
                  Guest Sign In
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Access your VIP table reservations and Paprika privileges
                </p>
              </div>

              {/* Demo Helper Pill */}
              <div className="mb-5 p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 flex items-center justify-between text-xs">
                <span className="text-stone-700 dark:text-stone-300">Client Demo Mode active</span>
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="px-2.5 py-1 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-800 dark:text-amber-200 font-medium transition-colors"
                >
                  Auto Fill Demo
                </button>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form - Only Phone and Password */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="login-phone"
                    className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      id="login-phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="0304 5888899"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9B1B1E]/40 focus:border-[#9B1B1E] text-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-100/80 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#9B1B1E]/40 focus:border-[#9B1B1E] text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-stone-400">Encrypted mock guest session</span>
                  <button
                    type="button"
                    onClick={() => setShowForgotNotice(!showForgotNotice)}
                    className="text-[#9B1B1E] dark:text-[#E6B87D] hover:underline font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                {showForgotNotice && (
                  <div className="p-3 rounded-xl bg-stone-200/50 dark:bg-stone-800/50 text-[11px] text-stone-600 dark:text-stone-400">
                    To reset your password in this demo, simply click <strong>Auto Fill Demo</strong> above or WhatsApp our concierge at <strong>+92 303 6522333</strong>.
                  </div>
                )}

                <button
                  id="submit-login-btn"
                  type="submit"
                  disabled={successAnimation}
                  className="relative w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#9B1B1E] to-[#B82428] hover:from-[#851518] hover:to-[#9B1B1E] active:scale-[0.98] text-white font-medium text-sm transition-all shadow-[0_8px_25px_rgba(155,27,30,0.35)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {successAnimation ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-2 text-white"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                      <span>Welcome back to Paprika...</span>
                    </motion.div>
                  ) : (
                    <span>Login</span>
                  )}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
