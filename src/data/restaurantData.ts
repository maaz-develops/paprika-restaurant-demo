import { Dish, GalleryItem, VideoTourItem } from '../types';

export const RESTAURANT_INFO = {
  name: 'PAPRIKA',
  tagline: 'Speak With The Taste',
  subLocation: 'Rahim Yar Khan, Pakistan',
  address: '42 Businessman Colony, Sadiq Club Road, Rahim Yar Khan, Punjab, Pakistan',
  phoneDisplay: '+92 304 5888899',
  phoneCallUrl: 'tel:+920304588899',
  whatsappUrl: 'https://wa.me/923036522333',
  whatsappDisplay: '+92 303 6522333',
  officialWebsite: 'https://paprika.pk/',
  hours: 'Daily: 12:00 PM – 01:00 AM',
  cuisines: ['Continental', 'Barbecue', 'Italian & Pastas', 'Traditional Pakistani', 'Artisan Desserts'],
  seatingZones: [
    'Main Crystal Dining Hall',
    'Executive Family Sanctuary',
    'Starlit Terrace Court',
    'Private VIP Crystal Lounge'
  ]
};

export const MENU_DISHES: Dish[] = [
  // STARTERS
  {
    id: 'starter-1',
    name: 'Crispy Crustacean Tempura',
    category: 'STARTERS',
    description: 'Golden fried ocean prawns seasoned with smoked sea salt, served with kaffir lime zest & sweet chili reduction.',
    price: 1450,
    image: '/dish-1.jpg',
    ingredients: ['King Prawns', 'Japanese Panko', 'Kaffir Lime', 'Paprika Infusion', 'Sweet Chili Coulis'],
    chefNote: 'Flash-fried at 190°C for exceptional crunch while preserving tender juiciness.',
    calories: 420,
    preparationTime: '15 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 1
  },
  {
    id: 'starter-2',
    name: 'Artisan Jalapeño Cheese Poppers',
    category: 'STARTERS',
    description: 'Hand-stuffed charred jalapeños with aged mozzarella, cream cheese, herbs, and paprika emulsion.',
    price: 980,
    image: '/dish-2.jpg',
    ingredients: ['Fresh Jalapeños', 'Aged Mozzarella', 'Philadelphia Cream Cheese', 'Herb Crust', 'Paprika Mayo'],
    chefNote: 'Molten center with balanced acidity and a gentle warm kick.',
    calories: 380,
    preparationTime: '12 mins',
    isPopular: true,
    spiceLevel: 2
  },
  {
    id: 'starter-3',
    name: 'Dynamite Chicken Bites',
    category: 'STARTERS',
    description: 'Tender chicken bites tossed in our signature secret spicy dynamite glaze with toasted sesame and scallions.',
    price: 1150,
    image: '/dish-3.jpg',
    ingredients: ['Prime Chicken Breast', 'House Dynamite Sauce', 'Toasted Sesame', 'Spring Onion', 'Crisp Vermicelli'],
    chefNote: 'An all-time guest favorite in Rahim Yar Khan.',
    calories: 460,
    preparationTime: '14 mins',
    isPopular: true,
    spiceLevel: 2
  },

  // MAINS
  {
    id: 'main-1',
    name: 'Charred Prime Flank Steak',
    category: 'MAINS',
    description: 'Dry-rubbed prime cut grilled to perfection over charcoal, accompanied by truffle potato purée and peppercorn jus.',
    price: 2850,
    image: '/dish-4.jpg',
    ingredients: ['Prime Beef Cut', 'Wild Forest Peppercorns', 'Truffle Butter', 'Smoked Garlic', 'Rosemary'],
    chefNote: 'Seared on cast iron to lock in natural juices with a rich caramelised crust.',
    calories: 680,
    preparationTime: '22 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 1
  },
  {
    id: 'main-2',
    name: 'Chicken Supreme au Champignon',
    category: 'MAINS',
    description: 'Pan-roasted tender chicken breast bathed in a velvety forest mushroom cream sauce, served with buttered asparagus.',
    price: 1850,
    image: '/dish-5.jpg',
    ingredients: ['Free-Range Chicken Breast', 'Porcini & Button Mushrooms', 'French Cream', 'Fresh Thyme', 'Parmigiano Reggiano'],
    chefNote: 'Delicate sauce slow-simmered with reduced white grape broth and fresh herbs.',
    calories: 590,
    preparationTime: '20 mins',
    isChefSpecial: true,
    isPopular: false,
    spiceLevel: 0
  },
  {
    id: 'main-3',
    name: 'Traditional Royal Mutton Handi',
    category: 'MAINS',
    description: 'Slow-simmered mutton tenderloin cooked in a clay pot with freshly ground spices, roasted tomatoes, and desi ghee.',
    price: 2450,
    image: '/dish-6.jpg',
    ingredients: ['Farm-Fresh Mutton', 'Heirloom Spices', 'Pure Desi Ghee', 'Ginger Batons', 'Coriander Essence'],
    chefNote: 'Slow cooked for three hours inside earthen cookware for unmatched depth.',
    calories: 740,
    preparationTime: '25 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 2
  },

  // GRILLS
  {
    id: 'grill-1',
    name: 'Signature Paprika BBQ Platter',
    category: 'GRILLS',
    description: 'Grand charcoal presentation featuring Malai Boti, Reshmi Seekh Kebabs, Smoked Lamb Chops, and Charred Wings.',
    price: 3850,
    image: '/dish-7.jpg',
    ingredients: ['Malai Boti', 'Smoked Lamb Chops', 'Charred Chicken Wings', 'Tandoori Naan', 'Mint Raita'],
    chefNote: 'Smoked using seasoned sheesham wood for an authentic Punjab barbecue aroma.',
    calories: 920,
    preparationTime: '25 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 2
  },
  {
    id: 'grill-2',
    name: 'Char-Grilled Atlantic Salmon',
    category: 'GRILLS',
    description: 'Wood-fired salmon fillet brushed with smoked paprika glaze, grilled lemon half, and blistered baby tomatoes.',
    price: 3450,
    image: '/dish-8.jpg',
    ingredients: ['Wild Atlantic Salmon', 'Paprika Glaze', 'Meyer Lemon', 'Olive Oil', 'Dill Herb Sauce'],
    chefNote: 'Crispy skin with silky, buttery pink center.',
    calories: 520,
    preparationTime: '18 mins',
    isChefSpecial: true,
    isPopular: false,
    spiceLevel: 1
  },
  {
    id: 'grill-3',
    name: 'Smoked Reshmi Kebabs',
    category: 'GRILLS',
    description: 'Melt-in-mouth chicken mince kebabs blended with cream, saffron, roasted cumin, and slow-broiled over hot embers.',
    price: 1550,
    image: '/dish-9.jpg',
    ingredients: ['Prime Minced Chicken', 'Saffron', 'Double Cream', 'Green Cardamom', 'Charcoal Smoke'],
    chefNote: 'Delicate texture that melts effortlessly on the palate.',
    calories: 480,
    preparationTime: '18 mins',
    isPopular: true,
    spiceLevel: 1
  },

  // PASTA
  {
    id: 'pasta-1',
    name: 'Fettuccine Alfredo Paprika',
    category: 'PASTA',
    description: 'Handmade ribbon pasta tossed in 24-month aged Parmigiano Reggiano cream, topped with charred garlic herb chicken.',
    price: 1650,
    image: '/dish-10.jpg',
    ingredients: ['Bronze-Die Fettuccine', 'Aged Parmigiano', 'Garlic Confit', 'Fresh Nutmeg', 'Pan-Seared Chicken'],
    chefNote: 'Silky emulsion made without heavy flour thickeners.',
    calories: 630,
    preparationTime: '16 mins',
    isPopular: true,
    spiceLevel: 0
  },
  {
    id: 'pasta-2',
    name: 'Spicy Prawn Tagliatelle',
    category: 'PASTA',
    description: 'Pan-seared jumbo prawns with slow-roasted cherry tomatoes, fiery Calabrian chili, garlic, and fresh basil.',
    price: 1950,
    image: '/dish-11.jpg',
    ingredients: ['Italian Tagliatelle', 'Jumbo Prawns', 'San Marzano Tomatoes', 'Calabrian Chili', 'Extra Virgin Olive Oil'],
    chefNote: 'Pungent, vibrant and bursting with Mediterranean aroma.',
    calories: 540,
    preparationTime: '16 mins',
    isChefSpecial: true,
    isPopular: false,
    spiceLevel: 2
  },

  // DESSERTS
  {
    id: 'dessert-1',
    name: 'Molten Belgian Lava Cake',
    category: 'DESSERTS',
    description: 'Dark Belgian chocolate cake with a warm flowing truffle center, served with artisanal Madagascar vanilla bean gelato.',
    price: 1100,
    image: '/dish-2.jpg',
    ingredients: ['70% Callebaut Dark Chocolate', 'Pure Butter', 'Vanilla Bean Gelato', 'Berry Coulis', 'Gold Leaf'],
    chefNote: 'Baked to order for the ultimate liquid chocolate cascade.',
    calories: 510,
    preparationTime: '15 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 0
  },
  {
    id: 'dessert-2',
    name: 'New York Smoked Cheesecake',
    category: 'DESSERTS',
    description: 'Silky baked cheesecake on a spiced graham cracker crust, topped with macerated wild berries and mint.',
    price: 950,
    image: '/dish-5.jpg',
    ingredients: ['Cream Cheese', 'Graham Crust', 'Wild Blackberry Compote', 'Organic Vanilla', 'Mint Sprig'],
    chefNote: 'Subtle citrus zest balances rich dairy luxury.',
    calories: 430,
    preparationTime: '10 mins',
    isPopular: true,
    spiceLevel: 0
  },

  // DRINKS
  {
    id: 'drink-1',
    name: 'Paprika Sunset Refresher',
    category: 'DRINKS',
    description: 'Fresh pomegranate extract, pressed Valencia orange, crushed mint, sparkling tonic, and pomegranate pearls.',
    price: 680,
    image: '/dish-1.jpg',
    ingredients: ['Pomegranate Reduction', 'Fresh Orange Juice', 'Wild Mint Leaves', 'Sparkling Spring Water', 'Ice Shards'],
    chefNote: 'Crafted as an invigorating palate cleanser between courses.',
    calories: 140,
    preparationTime: '8 mins',
    isChefSpecial: true,
    isPopular: true,
    spiceLevel: 0
  },
  {
    id: 'drink-2',
    name: 'Mint & Lychee Crystal Mojito',
    category: 'DRINKS',
    description: 'Muddled garden mint, lychee nectar, sparkling soda, and crystal ice cubes infused with lime zest.',
    price: 620,
    image: '/dish-3.jpg',
    ingredients: ['Fresh Mint', 'Lychee Puree', 'Key Lime', 'Club Soda', 'Cane Sugar Syrup'],
    chefNote: 'Crisp, aromatic, and deeply refreshing on warm Rahim Yar Khan evenings.',
    calories: 120,
    preparationTime: '6 mins',
    isPopular: true,
    spiceLevel: 0
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Paprika Grand Facade',
    category: 'exterior',
    image: '/paprika-hero-exterior.jpg',
    caption: 'Official exterior view of Paprika Restaurant on Sadiq Club Road, welcoming guests into Rahim Yar Khan’s most prestigious dining venue.',
    aspect: 'wide'
  },
  {
    id: 'gal-buffet',
    title: 'Original Buffet Dining Hall',
    category: 'interior',
    image: '/paprika-buffet-hall.jpg',
    caption: 'The authentic Paprika buffet hall in Rahim Yar Khan featuring signature caramel tufted leather chairs, cyan-glass tables, and gourmet chafing banquets.',
    aspect: 'tall'
  },
  {
    id: 'gal-facade-night',
    title: 'Paprika Restaurant & Cafe Night View',
    category: 'exterior',
    image: '/paprika-night-facade.jpg',
    caption: 'Evening view of Paprika Restaurant & Cafe on Sadiq Club Road with glowing red chili pepper emblem, rooftop balcony, and takeaway counter.',
    aspect: 'tall'
  },
  {
    id: 'gal-2',
    title: 'Original Paprika Interior Dining Hall',
    category: 'interior',
    image: '/paprika-interior-1.jpg',
    caption: 'Official interior of Paprika Restaurant in Rahim Yar Khan, featuring warm ambient golden illumination, handcrafted banquet seating, and family fine-dining elegance.',
    aspect: 'tall'
  },
  {
    id: 'gal-3',
    title: 'Executive Dining Suite',
    category: 'dining',
    image: '/paprika-dining-1.jpg',
    caption: 'Private banquette seating designed for intimate family gatherings, corporate banquets, and celebratory feasts.',
    aspect: 'square'
  },
  {
    id: 'gal-4',
    title: 'Panoramic Hospitality Lounge',
    category: 'interior',
    image: '/paprika-dining-2.jpg',
    caption: 'Expansive social dining area combining contemporary minimalism with warm Eastern hospitality.',
    aspect: 'wide'
  },
  {
    id: 'gal-5',
    title: 'Charred Charcoal Barbecue',
    category: 'food',
    image: '/gallery-1.jpg',
    caption: 'Master pitmasters crafting authentic charcoal-grilled skewers with heritage spices.',
    aspect: 'square'
  },
  {
    id: 'gal-6',
    title: 'Artisan Culinary Plating',
    category: 'food',
    image: '/gallery-2.jpg',
    caption: 'Precision culinary craftsmanship where each dish is plated as an edible work of art.',
    aspect: 'tall'
  },
  {
    id: 'gal-7',
    title: 'Evening Atmosphere & Lighting',
    category: 'dining',
    image: '/gallery-3.jpg',
    caption: 'Subtle ambient lighting casts a golden glow across crystal glassware and crisp linens.',
    aspect: 'square'
  },
  {
    id: 'gal-8',
    title: 'Executive Chef Craftsmanship',
    category: 'dining',
    image: '/gallery-4.jpg',
    caption: 'Behind the pass: our culinary artisans meticulously balancing flavors, textures, and temperature.',
    aspect: 'wide'
  }
];

export const EXPERIENCE_STORY = [
  {
    title: 'A New Epoch in Rahim Yar Khan Dining',
    lead: 'Where timeless Pakistani hospitality meets contemporary architectural refinement.',
    body: 'Paprika Restaurant was envisioned as a sanctuary for those who appreciate both culinary precision and atmospheric grace. Located in the heart of Businessman Colony along Sadiq Club Road, our halls are crafted with acoustic care, layered warm illumination, and crystal-clear hospitality.',
    image: '/paprika-interior-1.jpg',
    tag: 'ARCHITECTURE'
  },
  {
    title: 'The Art of Fire & Charcoal',
    lead: 'Authentic Punjabi barbecue infused with Continental panache.',
    body: 'Every kebab, steak, and grill at Paprika begins with seasoned fruitwood and hardwood charcoal embers. We honor regional grilling traditions while introducing modern sous-vide and cast-iron techniques to deliver unrivaled tenderness.',
    image: '/dish-7.jpg',
    tag: 'THE KITCHEN'
  },
  {
    title: 'Crafted Hospitality & Moments',
    lead: 'A dedication to your celebrations, family feasts, and executive dinners.',
    body: 'From private banquettes to expansive family dining halls, our team curates each visit with discrete yet attentive service. We believe great food is only half the experience—the rest is how you feel while savoring it.',
    image: '/paprika-dining-1.jpg',
    tag: 'HOSPITALITY'
  }
];
