
export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO date string or formatted date string
}

export interface Product {
  id:string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  popularity: number; // Higher is more popular
  externalLink: string;
  dataAiHint: string; // For placeholder image generation
  brand?: string;
  colors?: string[];
  reviews?: Review[];
}

export interface Filters {
  category: string;
  sortBy: 'price-asc' | 'price-desc' | 'popularity' | 'name-asc' | 'name-desc';
  searchTerm: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location?: string;
  avatarUrl?: string;
  rating?: number; // Optional: 1-5 stars
  dataAiHint?: string;
}
