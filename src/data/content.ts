const photo = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`

export const hoursLine = 'Open Tuesday — Sunday · 11:30 AM — 10:00 PM'
export const hoursDays = 'Tuesday — Sunday'
export const hoursTime = '11:30 AM — 10:00 PM'
export const location = 'Wales, UK'
export const email = 'doneporpor@gmail.com'
export const xProfile = 'https://x.com/donecraft225'

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
] as const

export const footerLinks = [
  { label: 'Instagram', href: '#instagram', placeholder: true },
  { label: 'Facebook', href: '#facebook', placeholder: true },
  { label: 'Contact', href: '#contact', placeholder: false },
  { label: 'Menu', href: '#menu', placeholder: false },
] as const

export const heroImage = {
  src: photo('1414235077428-338989a2e8c0', 2000),
  alt: 'A plated dish on a linen-covered restaurant table',
}

export const aboutImage = {
  src: photo('1517248135467-4c7edcad34c4', 1800),
  alt: 'The SAVORÉ dining room set for service',
}

export const experienceImage = {
  src: photo('1550966871-3ed3cdb5ed0c', 2200),
  alt: 'A quietly lit dining room prepared for the evening',
}

export type FeaturedDish = {
  name: string
  description: string
  price: number
  image: string
  alt: string
}

export const featuredDishes: FeaturedDish[] = [
  {
    name: 'Truffle Tagliatelle',
    description: 'Fresh pasta, parmesan, black truffle',
    price: 24,
    image: photo('1621996346565-e3dbc646d9a9', 1400),
    alt: 'A bowl of fresh tagliatelle with parmesan',
  },
  {
    name: 'Grilled Salmon',
    description: 'Herbs, lemon, seasonal vegetables',
    price: 28,
    image: photo('1467003909585-2f8a72700288', 1400),
    alt: 'Grilled salmon with lemon and seasonal vegetables',
  },
  {
    name: 'Roasted Chicken',
    description: 'Garlic, rosemary, roasted potatoes',
    price: 22,
    image: photo('1532550907401-a500c9a57435', 1400),
    alt: 'Herb chicken with lemon, rosemary, and vegetables',
  },
]

export const menuCategories = ['Starters', 'Mains', 'Desserts', 'Drinks'] as const
export type MenuCategory = (typeof menuCategories)[number]

export type MenuItem = {
  name: string
  description: string
  price: number
}

export const menu: Record<MenuCategory, MenuItem[]> = {
  Starters: [
    {
      name: 'Burrata & Tomatoes',
      description: 'Creamy burrata, heirloom tomatoes, basil oil.',
      price: 14,
    },
    {
      name: 'Citrus Fennel Salad',
      description: 'Shaved fennel, orange, soft herbs, olive oil.',
      price: 12,
    },
    {
      name: 'Warm Olives',
      description: 'Chili, lemon zest, and good olive oil.',
      price: 8,
    },
    {
      name: 'Mushroom Toast',
      description: 'Wild mushrooms, garlic, country bread.',
      price: 15,
    },
  ],
  Mains: [
    {
      name: 'Mushroom Risotto',
      description: 'Wild mushrooms, parmesan, herbs.',
      price: 19,
    },
    {
      name: 'Herb-Crusted Salmon',
      description: 'Seasonal vegetables, lemon butter.',
      price: 27,
    },
    {
      name: 'Truffle Tagliatelle',
      description: 'Fresh pasta, parmesan, black truffle.',
      price: 24,
    },
    {
      name: 'Roasted Chicken',
      description: 'Garlic, rosemary, roasted potatoes.',
      price: 22,
    },
  ],
  Desserts: [
    {
      name: 'Chocolate Tart',
      description: 'Dark chocolate, sea salt, vanilla cream.',
      price: 11,
    },
    {
      name: 'Olive Oil Cake',
      description: 'Citrus zest, almond, light cream.',
      price: 10,
    },
    {
      name: 'Poached Pear',
      description: 'Vanilla, honey, toasted walnuts.',
      price: 12,
    },
    {
      name: 'Affogato',
      description: 'Espresso poured over vanilla gelato.',
      price: 8,
    },
  ],
  Drinks: [
    {
      name: 'House Lemonade',
      description: 'Lemon, thyme, sparkling water.',
      price: 6,
    },
    {
      name: 'Seasonal Spritz',
      description: 'Citrus, herbs, sparkling wine.',
      price: 12,
    },
    {
      name: 'Still or Sparkling Water',
      description: 'Served chilled.',
      price: 5,
    },
    {
      name: 'Espresso',
      description: 'Short, dark, and simple.',
      price: 4,
    },
  ],
}

export type GalleryImage = {
  id: string
  src: string
  alt: string
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'shared-table',
    src: photo('1504674900247-0877df9cc836', 1800),
    alt: 'Seasonal dishes arranged on a shared table',
  },
  {
    id: 'dining-room',
    src: photo('1559339352-11d035aa65de', 1800),
    alt: 'Tables set on a quiet open-air terrace',
  },
  {
    id: 'fresh-bowl',
    src: photo('1540189549336-e6e99c3679fe', 1400),
    alt: 'A colorful bowl of fresh ingredients',
  },
  {
    id: 'tomatoes',
    src: photo('1608897013039-887f21d8c804', 1400),
    alt: 'Tomato pasta with basil and fresh herbs',
  },
  {
    id: 'dessert',
    src: photo('1565958011703-44f9829ba187', 1600),
    alt: 'A berry dessert finished with cream',
  },
  {
    id: 'pasta',
    src: photo('1473093295043-cdd812d0e601', 1600),
    alt: 'A bowl of fresh pasta',
  },
]

export const galleryFrames = [
  'col-span-2 row-span-2',
  'col-span-2',
  'col-span-1',
  'col-span-1',
  'col-span-2',
  'col-span-2',
] as const

export type Testimonial = {
  quote: string
  name: string
}

export const testimonials: Testimonial[] = [
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
]

function buildReservationTimes() {
  const times: string[] = []

  for (let minutes = 11 * 60 + 30; minutes <= 21 * 60 + 30; minutes += 30) {
    const hour24 = Math.floor(minutes / 60)
    const mins = minutes % 60
    const suffix = hour24 >= 12 ? 'PM' : 'AM'
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
    times.push(`${hour12}:${mins.toString().padStart(2, '0')} ${suffix}`)
  }

  return times
}

export const reservationTimes = buildReservationTimes()

export function formatPrice(price: number) {
  return `$${price}`
}

export function todayInputValue() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}
