import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavTab, Dish, GalleryItem, ReservationData, UserSession, CartItem } from './types';
import { GALLERY_ITEMS, MENU_DISHES } from './data/restaurantData';
import { LaunchScreen } from './components/LaunchScreen';
import { NavigationBar } from './components/NavigationBar';
import { BottomTabBar } from './components/BottomTabBar';
import { CrystalRefraction } from './components/CrystalRefraction';
import { LoginModal } from './components/LoginModal';
import { DishDetailModal } from './components/DishDetailModal';
import { GalleryLightbox } from './components/GalleryLightbox';
import { ReservationSuccessModal } from './components/ReservationSuccessModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CartFloatingButton } from './components/CartFloatingButton';

// Views
import { HomeView } from './views/HomeView';
import { MenuView } from './views/MenuView';
import { GalleryView } from './views/GalleryView';
import { ExperienceView } from './views/ExperienceView';
import { ReservationView } from './views/ReservationView';
import { LocationContactView } from './views/LocationContactView';

export default function App() {
  // Theme state (Dark Mode by default for luxury iOS restaurant feel, with toggle)
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('paprika_theme');
    if (saved) return saved === 'dark';
    return true; // Default to rich dark mode
  });

  // Launch screen state
  const [hasLaunched, setHasLaunched] = useState<boolean>(() => {
    return false;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Modals & Navigation state
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [activeReservation, setActiveReservation] = useState<ReservationData | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [preselectedDishForReservation, setPreselectedDishForReservation] = useState<string>('');

  // Device Frame simulation (iPhone Pro Frame vs Full Screen)
  const [isIPhoneFrame, setIsIPhoneFrame] = useState<boolean>(false);

  // Cart / Dining Bag state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('paprika_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    // Pre-populate with a signature favorite item to showcase the payment flow instantly
    const signature = MENU_DISHES.find((d) => d.id === 'grill-1') || MENU_DISHES[0];
    return [{ dish: signature, quantity: 1 }];
  });

  // User session state (Local Demo Authentication as instructed)
  const [userSession, setUserSession] = useState<UserSession>(() => {
    const saved = localStorage.getItem('paprika_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      phone: '03045888899',
      isLoggedIn: false,
      savedReservations: [],
      favoriteDishIds: ['starter-1', 'main-1']
    };
  });

  // Sync theme with document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('paprika_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('paprika_theme', 'light');
    }
  }, [isDark]);

  // Persist session
  useEffect(() => {
    localStorage.setItem('paprika_user_session', JSON.stringify(userSession));
  }, [userSession]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('paprika_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleLoginSuccess = (phone: string) => {
    setUserSession((prev) => ({
      ...prev,
      phone,
      isLoggedIn: true
    }));
  };

  const handleLogout = () => {
    setUserSession((prev) => ({
      ...prev,
      phone: '',
      isLoggedIn: false
    }));
  };

  const handleToggleFavorite = (dishId: string) => {
    setUserSession((prev) => {
      const exists = prev.favoriteDishIds.includes(dishId);
      const updated = exists
        ? prev.favoriteDishIds.filter((id) => id !== dishId)
        : [...prev.favoriteDishIds, dishId];
      return { ...prev, favoriteDishIds: updated };
    });
  };

  const handleReserveForDish = (dish: Dish) => {
    setPreselectedDishForReservation(dish.name);
    setActiveTab('reservation');
  };

  const handleReservationSubmitted = (res: ReservationData) => {
    setActiveReservation(res);
    setUserSession((prev) => ({
      ...prev,
      savedReservations: [res, ...prev.savedReservations]
    }));
  };

  // Cart operations
  const handleAddToCart = (dish: Dish) => {
    setCartItems((prev) => {
      const existing = prev.find((it) => it.dish.id === dish.id);
      if (existing) {
        return prev.map((it) =>
          it.dish.id === dish.id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((it) => {
          if (it.dish.id === dishId) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter((it): it is CartItem => it !== null);
    });
  };

  const handleRemoveItem = (dishId: string) => {
    setCartItems((prev) => prev.filter((it) => it.dish.id !== dishId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Scroll to top on tab change
  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans ${
        isDark ? 'bg-[#0B0D11] text-stone-100' : 'bg-[#F9F7F2] text-stone-900'
      }`}
    >
      {/* 1. Launch Screen Experience */}
      <AnimatePresence>
        {!hasLaunched && (
          <LaunchScreen onEnter={() => setHasLaunched(true)} />
        )}
      </AnimatePresence>

      {/* Ambient Crystal Glow in Background */}
      <CrystalRefraction variant="ambient" />

      {/* Layout Container: optionally framed in iPhone Mockup for client demo */}
      <div
        className={
          isIPhoneFrame
            ? 'py-8 px-4 flex justify-center items-center min-h-screen bg-stone-950/80 backdrop-blur-xl'
            : 'w-full'
        }
      >
        <div
          className={
            isIPhoneFrame
              ? 'relative w-full max-w-[420px] h-[880px] rounded-[52px] bg-[#0B0D11] shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_0_12px_#1C1E24,0_0_0_14px_#383B44] border-4 border-[#2A2D36] overflow-hidden flex flex-col'
              : 'relative w-full min-h-screen flex flex-col'
          }
        >
          {/* Simulated iPhone Dynamic Island when in iPhone Frame */}
          {isIPhoneFrame && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-2.5 pointer-events-none shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800" />
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] text-white/80 font-mono">Paprika</span>
              </div>
            </div>
          )}

          {/* Top Floating Glass Navigation Bar with Cart Badge */}
          <NavigationBar
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
            onOpenLogin={() => setIsLoginOpen(true)}
            userSession={userSession}
            onNavigateHome={() => handleSelectTab('home')}
            onNavigateLocation={() => handleSelectTab('location')}
            isIPhoneFrame={isIPhoneFrame}
            onToggleFrame={() => setIsIPhoneFrame(!isIPhoneFrame)}
            cartItemCount={totalCartCount}
            onOpenCart={() => setIsCheckoutOpen(true)}
          />

          {/* Main Scrollable Viewport with responsive mobile/tablet clearance for floating bars */}
          <main
            className={`flex-1 w-full max-w-6xl mx-auto px-2.5 sm:px-6 pt-4 sm:pt-6 ${
              isIPhoneFrame ? 'overflow-y-auto scrollbar-none pb-28' : 'pb-32 sm:pb-36'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{ willChange: 'opacity, transform' }}
              >
                {activeTab === 'home' && (
                  <HomeView
                    onNavigateTab={handleSelectTab}
                    onSelectDish={(dish) => setSelectedDish(dish)}
                    onAddToCart={handleAddToCart}
                  />
                )}

                {activeTab === 'menu' && (
                  <MenuView
                    onSelectDish={(dish) => setSelectedDish(dish)}
                    favoriteDishIds={userSession.favoriteDishIds}
                    onToggleFavorite={handleToggleFavorite}
                    onAddToCart={handleAddToCart}
                  />
                )}

                {activeTab === 'gallery' && (
                  <GalleryView
                    onOpenLightbox={(item) => setLightboxItem(item)}
                  />
                )}

                {activeTab === 'experience' && (
                  <ExperienceView onNavigateTab={handleSelectTab} />
                )}

                {activeTab === 'reservation' && (
                  <ReservationView
                    onSubmitReservation={handleReservationSubmitted}
                    preselectedDishName={preselectedDishForReservation}
                    userPhone={userSession.phone}
                  />
                )}

                {activeTab === 'location' && <LocationContactView />}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Floating Cart Checkout Button (when items exist in bag) */}
          <CartFloatingButton
            items={cartItems}
            onOpenCart={() => setIsCheckoutOpen(true)}
          />

          {/* iOS 26 Liquid Glass Floating Bottom Tab Bar */}
          <BottomTabBar
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
          />
        </div>
      </div>

      {/* Global Modals & Sheets */}
      {/* 1. Dish Detail iOS Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onReserveForDish={handleReserveForDish}
        onAddToCart={handleAddToCart}
        isFavorite={selectedDish ? userSession.favoriteDishIds.includes(selectedDish.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* 2. Checkout & Payment Modal (JazzCash, Easypaisa, Cash on Delivery) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        userPhone={userSession.phone}
      />

      {/* 3. Gallery Lightbox */}
      <GalleryLightbox
        item={lightboxItem}
        allItems={GALLERY_ITEMS}
        onClose={() => setLightboxItem(null)}
        onSelectIndex={(idx) => setLightboxItem(GALLERY_ITEMS[idx])}
      />

      {/* 4. Reservation Confirmation Modal */}
      <ReservationSuccessModal
        reservation={activeReservation}
        onClose={() => {
          setActiveReservation(null);
          setPreselectedDishForReservation('');
        }}
      />

      {/* 5. Login Modal (Phone and Password only as mandated) */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        userSession={userSession}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />
    </div>
  );
}
