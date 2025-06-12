
import type { Product } from '@/types';

export const productCategories = ["All", "Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Elegant Floral Maxi Dress',
    description: 'A beautiful flowing maxi dress with a vibrant floral pattern, perfect for summer events.',
    price: 79.99,
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'floral dress',
    category: 'Dresses',
    popularity: 5,
    externalLink: '#',
    brand: 'Chic Boutique',
    colors: ['Red', 'White', 'Green'],
    reviews: [
      { id: 'r1', author: 'Jane D.', rating: 5, comment: 'Absolutely stunning dress! The fit is perfect and the fabric is lovely.', date: '2023-07-15' },
      { id: 'r2', author: 'Emily S.', rating: 4, comment: 'Very pretty dress, got lots of compliments. A bit long for me though.', date: '2023-07-20' },
    ],
  },
  {
    id: '2',
    name: 'Classic Cotton Tee',
    description: 'A soft and comfortable classic cotton t-shirt, available in multiple colors.',
    price: 24.99,
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'cotton t-shirt',
    category: 'Tops',
    popularity: 4,
    externalLink: '#',
    brand: 'Casual Wear Co.',
    colors: ['Black', 'White', 'Blue', 'Grey'],
    reviews: [
      { id: 'r3', author: 'Mike P.', rating: 5, comment: 'Best basic tee I own. Super soft and holds up well in wash.', date: '2023-06-10' },
      { id: 'r4', author: 'Lisa K.', rating: 4, comment: 'Good quality for the price. Wish they had more vibrant colors.', date: '2023-06-12' },
      { id: 'r5', author: 'Tom H.', rating: 5, comment: 'My go-to t-shirt now. Bought one in every color!', date: '2023-08-01' },
    ],
  },
  {
    id: '3',
    name: 'Slim Fit Denim Jeans',
    description: 'Stylish slim fit jeans made from high-quality stretch denim for all-day comfort.',
    price: 59.50,
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'denim jeans',
    category: 'Bottoms',
    popularity: 5,
    externalLink: '#',
    brand: 'Urban Denim',
    colors: ['Dark Blue', 'Black'],
    reviews: [
      { id: 'r6', author: 'Sarah W.', rating: 5, comment: 'Perfect fit and so comfortable. Will buy another pair!', date: '2023-05-25' },
    ],
  },
  {
    id: '4',
    name: 'Lightweight Bomber Jacket',
    description: 'A versatile and stylish lightweight bomber jacket, perfect for transitional weather.',
    price: 89.00,
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'bomber jacket',
    category: 'Outerwear',
    popularity: 3,
    externalLink: '#',
    brand: 'Modern Threads',
    colors: ['Olive Green', 'Black', 'Navy'],
    reviews: [], // No reviews yet for this one
  },
  {
    id: '5',
    name: 'Leather Crossbody Bag',
    description: 'A chic and practical leather crossbody bag with multiple compartments.',
    price: 120.00,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'leather bag',
    category: 'Accessories',
    popularity: 4,
    externalLink: '#',
    brand: 'Luxury Goods',
    colors: ['Tan', 'Black'],
    reviews: [
       { id: 'r7', author: 'Olivia C.', rating: 5, comment: 'Beautiful bag, excellent quality leather. Perfect size.', date: '2023-07-01' },
       { id: 'r8', author: 'Chloe M.', rating: 4, comment: 'Very stylish and functional. The strap is a bit thinner than I expected.', date: '2023-07-10' },
    ],
  },
  {
    id: '6',
    name: 'Silk Scarf Print',
    description: 'A luxurious silk scarf with an artistic abstract print.',
    price: 45.00,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'silk scarf',
    category: 'Accessories',
    popularity: 3,
    externalLink: '#',
    brand: 'Chic Boutique',
    colors: ['Multicolor'],
    reviews: [
      { id: 'r9', author: 'Grace P.', rating: 5, comment: 'The print is even more beautiful in person!', date: '2023-08-05' },
    ]
  },
  {
    id: '7',
    name: 'Knit Cardigan Sweater',
    description: 'Cozy knit cardigan sweater, perfect for layering on chilly days.',
    price: 65.00,
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'knit cardigan',
    category: 'Outerwear',
    popularity: 4,
    externalLink: '#',
    brand: 'WarmKnits Co.',
    colors: ['Beige', 'Grey', 'Charcoal'],
    // No reviews yet
  },
  {
    id: '8',
    name: 'Pleated Midi Skirt',
    description: 'An elegant pleated midi skirt that flows beautifully with every step.',
    price: 55.99,
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'pleated skirt',
    category: 'Bottoms',
    popularity: 5,
    externalLink: '#',
    brand: 'Modern Threads',
    colors: ['Dusty Rose', 'Black', 'Forest Green'],
    reviews: [
      { id: 'r10', author: 'Sophie T.', rating: 5, comment: 'Gorgeous skirt, fits true to size and the pleats are lovely.', date: '2023-06-20' },
      { id: 'r11', author: 'Mia L.', rating: 4, comment: 'Beautiful color, but a bit sheer. Needs a slip underneath.', date: '2023-06-22' },
    ],
  },
   {
    id: '9',
    name: 'Ruffled Sleeve Blouse',
    description: 'A charming blouse with delicate ruffled sleeves, adding a touch of romance.',
    price: 49.90,
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'ruffled blouse',
    category: 'Tops',
    popularity: 4,
    externalLink: '#',
    brand: 'Chic Boutique',
    colors: ['White', 'Pastel Pink', 'Light Blue'],
    // No reviews yet
  },
  {
    id: '10',
    name: 'Sun Hat Wide Brim',
    description: 'Stylish wide-brim sun hat for ultimate sun protection and a fashionable look.',
    price: 30.00,
    imageUrl: 'https://placehold.co/400x400.png',
    dataAiHint: 'sun hat',
    category: 'Accessories',
    popularity: 3,
    externalLink: '#',
    brand: 'Summer Essentials',
    colors: ['Natural Straw', 'White'],
    // No reviews yet
  },
  {
    id: '11',
    name: 'Linen Blend Trousers',
    description: 'Breathable and comfortable linen blend trousers, ideal for warm weather.',
    price: 62.00,
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'linen trousers',
    category: 'Bottoms',
    popularity: 4,
    externalLink: '#',
    brand: 'Casual Wear Co.',
    colors: ['Khaki', 'White', 'Navy'],
    reviews: [
      { id: 'r12', author: 'Anna K.', rating: 5, comment: 'So comfy and chic for summer!', date: '2023-07-01' },
    ]
  },
  {
    id: '12',
    name: 'Bohemian Print Kimono',
    description: 'A lightweight kimono with a vibrant bohemian print, perfect as a stylish cover-up.',
    price: 39.99,
    imageUrl: 'https://placehold.co/400x600.png',
    dataAiHint: 'print kimono',
    category: 'Outerwear',
    popularity: 4,
    externalLink: '#',
    brand: 'Free Spirit Styles',
    colors: ['Multicolor'],
    // No reviews yet
  }
];
declare module '@/types' {
  interface Testimonial {
    dataAiHint?: string;
  }
}
