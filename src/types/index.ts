export interface NigerianPrices {
  jumia?: number;
  konga?: number;
  slot?: number;
  average?: number;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    image: string;
    rating: number;
    price: number; 
    nigerianPrices?: NigerianPrices;
    originalPrice?: number;
    discount?: number;
    badges: string[];
    description: string;
    specs: Record<string, string>;
    dealEndTime?: Date;
    reviewCount?: number;
    shortSummary?: string;
    pros?: string[]; 
    cons?: string[];
}

export interface Review {
    id: string;
    productId: string;
    author: string;
    authorId: string;
    date: string;
    rating: number;
    title?: string;
    comment: string;
    pros?: string[];
    cons?: string[];
    isVerifiedPurchase?: boolean;
    helpfulCount?: number;
    image?: string;
    isFlagged?: boolean;
}

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    commentCount: number;
    image: string;
    excerpt: string;
}

export interface Category {
    id: string;
    name: string;
    image: string;
    badges: string[];
    discount?: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    status: 'active' | 'suspended';
    joinDate: string;
    avatar?: string;
    reviewCount: number;
}

export interface AdminNotification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    date: string;
    isRead: boolean;
    link?: string;
}

export interface Seller {
    id: string;
    name: string;
    logo: string;
    location: string;
    city: string;
    rating: number;
    reviewCount: number;
    isVerified: boolean;
    specialty: string;
    memberSince: string;
    products?: string[]; // IDs of top products they sell
}
