export interface Trip {
  id: string;
  name: string;
  destination: string;
  images: string[];
  price: number;
  discountPrice?: number;
  spotsLeft?: number;
  urgencyMessage?: string;
  departureDate: string;
  category: 'bus' | 'land' | 'international';
  featured: boolean;
  description?: string;
}
