export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
] as const

const photo = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

export const featuredDishes = [
  {
    name: 'Truffle Tagliatelle',
    description: 'Fresh pasta, parmesan, black truffle',
    price: '$24',
    image: photo('photo-1551183053-bf91a1d81141', 1200),
    alt: 'Fresh ribbon pasta with herbs and parmesan',
  },
  {
    name: 'Grilled Salmon',
    description: 'Herbs, lemon, seasonal vegetables',
    price: '$28',
    image: photo('photo-1467003909585-2f8a72700288', 1200),
    alt: 'Grilled salmon with lemon and herbs',
  },
  {
    name: 'Roasted Chicken',
    description: 'Garlic, rosemary, roasted potatoes',
    price: '$22',
    image: photo('photo-1598103442097-8b74394b95c6', 1200),
    alt: 'Roasted chicken with rosemary and potatoes',
  },
] as const

export const categories = ['Starters', 'Mains', 'Desserts', 'Drinks'] as const

export type MenuCategory = (typeof categories)[number]

export const menu: Record<MenuCategory, { name: string; description: string; price: string }[]> = {
  Starters: [
    {
      name: 'Burrata & Tomatoes',
      description: 'Creamy burrata, heirloom tomatoes, basil oil.',
      price: '$14',
    },
    {
      name: 'Citrus Fennel Salad',
      description: 'Shaved fennel, orange, olive oil, and herbs.',
      price: '$13',
    },
    {
      name: 'Warm Olives',
      description: 'Castelvetrano olives, chili, and lemon zest.',
      price: '$9',
    },
    {
      name: 'Market Soup',
      description: 'Seasonal vegetables, olive oil, and toasted bread.',
      price: '$12',
    },
  ],
  Mains: [
    {
      name: 'Truffle Tagliatelle',
      description: 'Fresh pasta, parmesan, black truffle.',
      price: '$24',
    },
    {
      name: 'Mushroom Risotto',
      description: 'Wild mushrooms, parmesan, herbs.',
      price: '$19',
    },
    {
      name: 'Herb-Crusted Salmon',
      description: 'Seasonal vegetables, lemon butter.',
      price: '$27',
    },
    {
      name: 'Grilled Salmon',
      description: 'Herbs, lemon, seasonal vegetables.',
      price: '$28',
    },
    {
      name: 'Roasted Chicken',
      description: 'Garlic, rosemary, roasted potatoes.',
      price: '$22',
    },
  ],
  Desserts: [
    {
      name: 'Chocolate Tart',
      description: 'Dark chocolate, sea salt, vanilla cream.',
      price: '$11',
    },
    {
      name: 'Olive Oil Cake',
      description: 'Citrus, whipped cream, and toasted almond.',
      price: '$10',
    },
    {
      name: 'Vanilla Panna Cotta',
      description: 'Vanilla bean with a little seasonal fruit.',
      price: '$9',
    },
    {
      name: 'Affogato',
      description: 'Espresso poured over vanilla gelato.',
      price: '$8',
    },
  ],
  Drinks: [
    {
      name: 'House Spritz',
      description: 'Citrus, sparkling wine, and herbs.',
      price: '$13',
    },
    {
      name: 'Evening Red',
      description: 'A glass of the pour we are opening tonight.',
      price: '$14',
    },
    {
      name: 'Espresso',
      description: 'Short, rich, and simply made.',
      price: '$4',
    },
    {
      name: 'Seasonal Lemonade',
      description: 'Fresh lemon with a little honey.',
      price: '$6',
    },
    {
      name: 'Sparkling Water',
      description: 'Chilled, with a slice of citrus.',
      price: '$4',
    },
  ],
}

export const galleryImages = [
  {
    src: photo('photo-1504674900247-0877df9cc836', 1600),
    alt: 'Sharing plates arranged on the table',
  },
  {
    src: photo('photo-1540189549336-e6e99c3679fe', 1200),
    alt: 'A fresh salad with herbs and citrus',
  },
  {
    src: photo('photo-1600891964092-4316c288032e', 1200),
    alt: 'Sliced steak with crisp potatoes',
  },
  {
    src: photo('photo-1488477181946-6428a0291777', 1600),
    alt: 'Vanilla cream desserts with strawberries',
  },
  {
    src: photo('photo-1551218808-94e220e084d2', 1400),
    alt: 'Fresh ingredients being prepared in the kitchen',
  },
  {
    src: photo('photo-1519708227418-c8fd9a32b7a2', 1200),
    alt: 'Seared salmon with seasonal vegetables',
  },
] as const

export const testimonials = [
  {
    quote: 'Beautiful food, warm atmosphere, and incredibly thoughtful service.',
    name: 'Olivia M.',
  },
  {
    quote: 'One of those places where everything feels effortless.',
    name: 'Daniel R.',
  },
  {
    quote: 'The perfect spot for a relaxed dinner.',
    name: 'Sophia K.',
  },
] as const

export const reservationTimes = [
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
] as const

export const images = {
  hero: photo('photo-1414235077428-338989a2e8c0', 1800),
  about: photo('photo-1517248135467-4c7edcad34c4', 1600),
  experience: photo('photo-1550966871-3ed3cdb5ed0c', 2000),
}
