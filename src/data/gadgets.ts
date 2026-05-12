import type { Gadget, Review, BlogPost, Category } from '../types';

export const gadgets: Gadget[] = [
  {
    id: '1',
    name: 'Samsung Galaxy A54 5G',
    brand: 'Samsung',
    categoryId: 'c1',
    image: '/img/latest-Gadget/lp-1.png',
    price: 350,
    description: 'The mid-range king in Nigeria. Excellent battery life for long power outages and a bright AMOLED screen.',
    specs: { 'Battery': '5000mAh', 'Screen': '6.4" Super AMOLED', 'RAM': '8GB' },
    reviewCount: 450,
    avgRating: 4.6
  },
  {
    id: '2',
    name: 'Tecno Camon 20 Pro',
    brand: 'Tecno',
    categoryId: 'c1',
    image: '/img/latest-Gadget/lp-7.png',
    price: 200,
    description: 'Aimed at heavy picture takers, the Camon 20 Pro brings high-end camera vibes to a budget price.',
    specs: { 'Camera': '64MP + 2MP', 'Storage': '256GB', 'Processor': 'Helio G99' },
    reviewCount: 620,
    avgRating: 4.3
  },
  {
    id: '3',
    name: 'Oraimo Freepods 4',
    brand: 'Oraimo',
    categoryId: 'c2',
    image: '/img/hero/model4-removebg-preview.png',
    price: 35,
    description: 'Active Noise Cancellation and big bass, specifically tuned for Afrobeats.',
    specs: { 'Battery Life': '35.5 hours with case', 'ANC': 'Yes, up to 30dB' },
    reviewCount: 1250,
    avgRating: 4.8
  },
  {
    id: '4',
    name: 'MacBook Air M1 (2020)',
    brand: 'Apple',
    categoryId: 'c3',
    image: '/img/latest-Gadget/laptops-removebg-preview.png',
    price: 750,
    description: 'Still the best value laptop for Nigerian creatives and programmers. Incredible battery efficiency.',
    specs: { 'Chip': 'Apple M1', 'RAM': '8GB', 'SSD': '256GB' },
    reviewCount: 310,
    avgRating: 4.9
  },
  {
    id: '5',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    categoryId: 'c1',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800',
    price: 1199,
    description: 'The pinnacle of mobile tech. Titanium build, A17 Pro chip, and the best video recording on any smartphone.',
    specs: { 'Chip': 'A17 Pro', 'Storage': '256GB/512GB/1TB', 'Material': 'Titanium' },
    reviewCount: 840,
    avgRating: 4.9
  }
];

export const reviews: Review[] = [
  {
    id: 'r1',
    GadgetId: '1',
    author: 'Chinedu Eze',
    authorId: 'chinedu-eze',
    date: 'Apr 12, 2026',
    rating: 5,
    title: 'Solid phone for everyday use',
    comment: 'I bought this phone at Slot last month. The screen is incredibly bright even under the Lagos sun. Battery easily carries me through the whole day without needing to touch my powerbank.',
    pros: ['Bright screen', 'Strong battery'],
    cons: ['Had to buy my own charger'],
    isVerifiedPurchase: true,
    helpfulCount: 24
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'Weekly poll: Does your phone have Android 15 yet?',
    date: 'May 4, 2026',
    commentCount: 5,
    image: '/img/blog/pcs.jpg',
    excerpt: 'Some companies already have preview builds of Android 16, others are still trying to get Android 15 out.'
  }
];

export const categories: Category[] = [
  { id: 'c1', name: 'Smartphones', image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200' },
  { id: 'c2', name: 'Audio & Music', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200' },
  { id: 'c3', name: 'Computing', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200' },
  { id: 'c4', name: 'Gaming Zone', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200' },
  { id: 'c5', name: 'Photography', image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1200' },
  { id: 'c6', name: 'Smart Life', image: 'https://images.unsplash.com/photo-1508921234172-b68ed335b3e6?q=80&w=1200' }
];
