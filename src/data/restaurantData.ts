import { Dish, GalleryItem, VideoTourItem } from '../types';

export const RESTAURANT_INFO = {
  name: 'PAPRIKA',
  tagline: 'Speak With The Taste',
  subLocation: 'Rahim Yar Khan, Pakistan',
  address: '42 Businessman Colony, Sadiq Club Road, Rahim Yar Khan, Punjab, Pakistan',

  phoneDisplay: '+92 304 5888899',
  phoneCallUrl: 'tel:+923045888899',

  // Verified Paprika phone number used for call CTA.
  // Do not label this as an officially verified WhatsApp number.
  whatsappUrl: 'https://wa.me/923045888899',
  whatsappDisplay: '+92 304 5888899',

  officialWebsite: 'https://paprika.pk/',
  hours: 'Daily: 12:00 PM – 01:00 AM',

  cuisines: [
    'Continental',
    'Barbecue',
    'Italian & Pastas',
    'Traditional Pakistani',
    'Artisan Desserts'
  ],

  seatingZones: [
    'Main Crystal Dining Hall',
    'Executive Family Sanctuary',
    'Starlit Terrace Court',
    'Private VIP Crystal Lounge'
  ]
};


// ============================================================
// OFFICIAL PAPRIKA WEBSITE IMAGE ASSETS
// ============================================================

const PAPRIKA_IMAGES = {
  salmon:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/13-1.jpg',

  prawns:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/17-1.jpg',

  lobster:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/16.jpg',

  steak:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/2-4.jpg',

  fish:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/14.jpg',

  seafood:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/18-2.jpg',

  pasta:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/15-1.jpg',

  tacos:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/3-3.jpg',

  cupcakes:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/7-1.jpg',

  pie:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/11-1.jpg',

  brownie:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/8.jpg',

  coffee:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/20-2.jpg',

  chocolate:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/21-1.jpg',

  burger:
    'https://wp.validthemes.net/restan/wp-content/uploads/2024/05/6-1.jpg'
};


// ============================================================
// MENU
// ============================================================

export const MENU_DISHES: Dish[] = [

  // STARTERS
  {
    id: 'starter-1',
    name: 'Prawns Fry',
    category: 'STARTERS',
    description:
      'Crispy golden prawns prepared for a rich seafood experience.',
    price: 1450,
    image: PAPRIKA_IMAGES.prawns,
    ingredients: [
      'Fresh Prawns',
      'Seasoning',
      'Herbs',
      'Crisp Coating'
    ],
    chefNote:
      'A premium seafood starter inspired by Paprika’s seafood menu.',
    calories: 420,
    preparationTime: '15 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 1
  },

  {
    id: 'starter-2',
    name: 'Fish Tacos',
    category: 'STARTERS',
    description:
      'Freshly prepared fish tacos with colourful vegetables and a vibrant finish.',
    price: 980,
    image: PAPRIKA_IMAGES.tacos,
    ingredients: [
      'Grilled Fish',
      'Tortilla',
      'Fresh Vegetables',
      'Herbs'
    ],
    chefNote:
      'A contemporary seafood option with a fresh, colourful presentation.',
    calories: 380,
    preparationTime: '12 mins',
    isPopular: true,
    spiceLevel: 2
  },

  {
    id: 'starter-3',
    name: 'Crispy Seafood Bites',
    category: 'STARTERS',
    description:
      'Crispy seafood bites with a rich golden finish and fresh garnish.',
    price: 1150,
    image: PAPRIKA_IMAGES.seafood,
    ingredients: [
      'Seafood',
      'Seasoning',
      'Fresh Herbs',
      'Crisp Coating'
    ],
    chefNote:
      'A refined seafood starter designed for sharing.',
    calories: 460,
    preparationTime: '14 mins',
    isPopular: true,
    spiceLevel: 2
  },


  // MAINS
  {
    id: 'main-1',
    name: 'Grilled Steak',
    category: 'MAINS',
    description:
      'A beautifully grilled steak presented with a rich sauce and fresh greens.',
    price: 2850,
    image: PAPRIKA_IMAGES.steak,
    ingredients: [
      'Prime Beef',
      'Herbs',
      'Pepper Sauce',
      'Fresh Greens'
    ],
    chefNote:
      'A premium grilled main with a rich caramelised finish.',
    calories: 680,
    preparationTime: '22 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 1
  },

  {
    id: 'main-2',
    name: 'Salmon Fry',
    category: 'MAINS',
    description:
      'Golden-seared salmon served with fresh greens for a refined seafood main.',
    price: 2450,
    image: PAPRIKA_IMAGES.salmon,
    ingredients: [
      'Salmon',
      'Herbs',
      'Seasoning',
      'Fresh Greens'
    ],
    chefNote:
      'One of the seafood items featured on Paprika’s official website.',
    calories: 590,
    preparationTime: '20 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 0
  },

  {
    id: 'main-3',
    name: 'Pangasius Basa',
    category: 'MAINS',
    description:
      'Tender fish served with a colourful fresh garnish and aromatic seasoning.',
    price: 2450,
    image: PAPRIKA_IMAGES.fish,
    ingredients: [
      'Basa Fish',
      'Fresh Herbs',
      'Chilli',
      'Seasoning'
    ],
    chefNote:
      'A seafood option listed on Paprika’s official menu.',
    calories: 540,
    preparationTime: '20 mins',
    isPopular: true,
    spiceLevel: 1
  },


  // GRILLS
  {
    id: 'grill-1',
    name: 'Signature Grill Platter',
    category: 'GRILLS',
    description:
      'A premium grilled presentation featuring rich charred flavours and fresh garnish.',
    price: 3850,
    image: PAPRIKA_IMAGES.steak,
    ingredients: [
      'Grilled Meat',
      'Herbs',
      'Seasoning',
      'Fresh Greens'
    ],
    chefNote:
      'Designed as the centrepiece of a premium dining experience.',
    calories: 920,
    preparationTime: '25 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 2
  },

  {
    id: 'grill-2',
    name: 'Char-Grilled Salmon',
    category: 'GRILLS',
    description:
      'Rich grilled salmon with a crisp exterior and tender centre.',
    price: 3450,
    image: PAPRIKA_IMAGES.salmon,
    ingredients: [
      'Salmon',
      'Lemon',
      'Herbs',
      'Seasoning'
    ],
    chefNote:
      'A refined seafood grill inspired by the Salmon Fry listed on Paprika’s website.',
    calories: 520,
    preparationTime: '18 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 1
  },

  {
    id: 'grill-3',
    name: 'Prawns Grill',
    category: 'GRILLS',
    description:
      'Juicy grilled prawns finished with herbs and a rich golden sear.',
    price: 1550,
    image: PAPRIKA_IMAGES.prawns,
    ingredients: [
      'Fresh Prawns',
      'Herbs',
      'Seasoning',
      'Lemon'
    ],
    chefNote:
      'A premium seafood grill for seafood lovers.',
    calories: 480,
    preparationTime: '18 mins',
    isPopular: true,
    spiceLevel: 1
  },


  // PASTA
  {
    id: 'pasta-1',
    name: 'Chicken Alfredo',
    category: 'PASTA',
    description:
      'Creamy pasta with tender chicken and a rich parmesan-style finish.',
    price: 1650,
    image: PAPRIKA_IMAGES.pasta,
    ingredients: [
      'Pasta',
      'Chicken',
      'Cream Sauce',
      'Herbs'
    ],
    chefNote:
      'Chicken Alfredo is listed among the dishes on Paprika’s official website.',
    calories: 630,
    preparationTime: '16 mins',
    isPopular: true,
    spiceLevel: 0
  },

  {
    id: 'pasta-2',
    name: 'Seafood Pasta',
    category: 'PASTA',
    description:
      'Rich seafood pasta with tomato sauce and a vibrant Mediterranean finish.',
    price: 1950,
    image: PAPRIKA_IMAGES.pasta,
    ingredients: [
      'Italian Pasta',
      'Seafood',
      'Tomato Sauce',
      'Herbs'
    ],
    chefNote:
      'A contemporary seafood pasta option.',
    calories: 540,
    preparationTime: '16 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 2
  },


  // DESSERTS
  {
    id: 'dessert-1',
    name: 'Chocolate Brownie',
    category: 'DESSERTS',
    description:
      'Rich chocolate brownie with a deep cocoa flavour.',
    price: 1100,
    image: PAPRIKA_IMAGES.brownie,
    ingredients: [
      'Dark Chocolate',
      'Butter',
      'Cocoa',
      'Sugar'
    ],
    chefNote:
      'Chocolate Brownie is listed on Paprika’s official website.',
    calories: 510,
    preparationTime: '15 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 0
  },

  {
    id: 'dessert-2',
    name: 'Cheesecake',
    category: 'DESSERTS',
    description:
      'Silky cheesecake presented as a refined finishing course.',
    price: 950,
    image: PAPRIKA_IMAGES.cupcakes,
    ingredients: [
      'Cream Cheese',
      'Vanilla',
      'Biscuit Base',
      'Fresh Topping'
    ],
    chefNote:
      'Cheesecake is listed among Paprika’s official dessert offerings.',
    calories: 430,
    preparationTime: '10 mins',
    isPopular: true,
    spiceLevel: 0
  },


  // DRINKS
  {
    id: 'drink-1',
    name: 'Hot Chocolate',
    category: 'DRINKS',
    description:
      'Smooth hot chocolate with a rich creamy finish.',
    price: 680,
    image: PAPRIKA_IMAGES.chocolate,
    ingredients: [
      'Chocolate',
      'Milk',
      'Cream'
    ],
    chefNote:
      'Hot chocolate appears in Paprika’s official popular categories.',
    calories: 140,
    preparationTime: '8 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 0
  },

  {
    id: 'drink-2',
    name: 'Americano Coffee',
    category: 'DRINKS',
    description:
      'Classic black coffee with a rich roasted aroma.',
    price: 620,
    image: PAPRIKA_IMAGES.coffee,
    ingredients: [
      'Arabica Coffee',
      'Filtered Water'
    ],
    chefNote:
      'Americano Coffee is listed on Paprika’s official website.',
    calories: 20,
    preparationTime: '6 mins',
    isPopular: true,
    spiceLevel: 0
  }
];


// ============================================================
// GALLERY
// ============================================================

export const GALLERY_ITEMS: GalleryItem[] = [

  {
    id: 'gal-1',
    title: 'Paprika Food Experience',
    category: 'food',
    image: PAPRIKA_IMAGES.salmon,
    caption:
      'A refined seafood presentation featured through Paprika’s official website.',
    aspect: 'wide'
  },

  {
    id: 'gal-buffet',
    title: 'Seafood Selection',
    category: 'food',
    image: PAPRIKA_IMAGES.prawns,
    caption:
      'Premium seafood presentation for the Paprika dining experience.',
    aspect: 'tall'
  },

  {
    id: 'gal-facade-night',
    title: 'Premium Dining Atmosphere',
    category: 'dining',
    image: PAPRIKA_IMAGES.lobster,
    caption:
      'A cinematic food presentation for the restaurant experience.',
    aspect: 'tall'
  },

  {
    id: 'gal-2',
    title: 'Signature Seafood',
    category: 'food',
    image: PAPRIKA_IMAGES.fish,
    caption:
      'Fresh seafood presented with herbs and vibrant seasonal garnish.',
    aspect: 'tall'
  },

  {
    id: 'gal-3',
    title: 'Grilled Signature',
    category: 'dining',
    image: PAPRIKA_IMAGES.steak,
    caption:
      'A rich grilled presentation designed for the premium dining section.',
    aspect: 'square'
  },

  {
    id: 'gal-4',
    title: 'Italian Kitchen',
    category: 'food',
    image: PAPRIKA_IMAGES.pasta,
    caption:
      'Italian-inspired pasta presentation with rich Mediterranean flavours.',
    aspect: 'wide'
  },

  {
    id: 'gal-5',
    title: 'Fresh Fish Tacos',
    category: 'food',
    image: PAPRIKA_IMAGES.tacos,
    caption:
      'Colourful fish tacos with fresh vegetables and herbs.',
    aspect: 'square'
  },

  {
    id: 'gal-6',
    title: 'Dessert Collection',
    category: 'food',
    image: PAPRIKA_IMAGES.cupcakes,
    caption:
      'Elegant dessert presentation for the final course.',
    aspect: 'tall'
  },

  {
    id: 'gal-7',
    title: 'Chocolate Experience',
    category: 'dining',
    image: PAPRIKA_IMAGES.chocolate,
    caption:
      'Rich chocolate presentation for a warm evening dining mood.',
    aspect: 'square'
  },

  {
    id: 'gal-8',
    title: 'Coffee & Conversation',
    category: 'dining',
    image: PAPRIKA_IMAGES.coffee,
    caption:
      'A refined coffee moment to complete the Paprika experience.',
    aspect: 'wide'
  }
];


// ============================================================
// EXPERIENCE STORY
// ============================================================

export const EXPERIENCE_STORY = [

  {
    title: 'A New Epoch in Rahim Yar Khan Dining',

    lead:
      'Where timeless Pakistani hospitality meets contemporary culinary refinement.',

    body:
      'Paprika Restaurant is located at 42 Businessman Colony in Rahim Yar Khan and presents itself as a family fine-dining restaurant.',

    image: PAPRIKA_IMAGES.salmon,

    tag: 'THE EXPERIENCE'
  },

  {
    title: 'The Art of Seafood & Grill',

    lead:
      'From salmon and prawns to rich grilled selections.',

    body:
      'Paprika’s official website highlights seafood selections including Salmon Fry and Prawns Fry alongside a broader food menu.',

    image: PAPRIKA_IMAGES.prawns,

    tag: 'THE KITCHEN'
  },

  {
    title: 'Crafted Hospitality & Moments',

    lead:
      'A place for family dining, celebrations and memorable meals.',

    body:
      'The restaurant describes itself as a family fine-dining destination in Rahim Yar Khan, with booking available through its listed phone numbers.',

    image: PAPRIKA_IMAGES.steak,

    tag: 'HOSPITALITY'
  }
];
