export type NavTab = 'home' | 'menu' | 'gallery' | 'experience' | 'reservation' | 'location';

export type PaymentMethod = 'jazzcash' | 'easypaisa' | 'cod';

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export interface Order {
  id: string;
  items: Array<{ id: string; name: string; price: number; quantity: number; image?: string }>;
  subtotal: number;
  deliveryFee: number;
  riderTip?: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending_on_delivery' | 'processing';
  transactionRef?: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  orderType: 'delivery' | 'takeaway' | 'dine_in_preorder';
  createdAt: string;
  whatsappUrl?: string;
}

export type MenuCategory = 'STARTERS' | 'MAINS' | 'GRILLS' | 'PASTA' | 'DESSERTS' | 'DRINKS';

export interface Dish {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number; // in PKR
  image: string;
  ingredients: string[];
  chefNote?: string;
  calories?: number;
  preparationTime?: string;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  spiceLevel?: 0 | 1 | 2 | 3;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'exterior' | 'interior' | 'food' | 'dining';
  image: string;
  caption: string;
  aspect?: 'tall' | 'wide' | 'square';
}

export interface VideoTourItem {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  creator: string;
  duration: string;
  tag: string;
  badgeColor?: string;
  thumbnailUrl: string;
  youtubeUrl: string;
}

export interface ReservationData {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingZone: string;
  specialRequest?: string;
  createdAt: string;
  status: 'confirmed' | 'pending';
}

export interface UserSession {
  phone: string;
  isLoggedIn: boolean;
  savedReservations: ReservationData[];
  favoriteDishIds: string[];
}
