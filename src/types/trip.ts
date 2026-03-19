export interface Trip {
  id: string;
  name: string;
  destination: string;
  images: string[];
  price: number;               // double/shared occupancy price (or base price for intl trips)
  singlePrice?: number;        // single occupancy price (bus trips only)
  discountPrice?: number;
  spotsLeft?: number;
  urgencyMessage?: string;
  departureDate: string;
  category: 'land' | 'river-cruise' | 'ocean-cruise' | 'bus';
  featured: boolean;
  description?: string;
  bookingUrl?: string;         // TravelJoy booking link
  waitlistUrl?: string;        // Separate waitlist link (if different from bookingUrl)
  flyerUrl?: string;           // Uploaded flyer PDF/image URL
  subheading?: string;
  operator?: string;
  soldOut?: boolean;
}
