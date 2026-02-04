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
  category: 'land' | 'river-cruise' | 'ocean-cruise' | 'bus';
  featured: boolean;
  description?: string;
  bookingUrl?: string;
  subheading?: string;
  operator?: string;
  soldOut?: boolean;
}
