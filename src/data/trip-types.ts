export interface TripTypeInfo {
  id: string;
  slug: string;
  name: string;
  icon: string; // lucide icon name for reference
  tagline: string;
  image: string;
  category: string; // maps to Trip.category
  heroImage: string;
  description: string;
  highlights: string[];
}

export const tripTypes: TripTypeInfo[] = [
  {
    id: 'land-trips',
    slug: 'land-trips',
    name: 'Land Trips',
    icon: 'Globe',
    tagline: 'Explore the world on foot and by coach',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    category: 'land',
    heroImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80',
    description: 'Our international land trips take you to the world\'s most captivating destinations — from the rolling hills of Ireland to the ancient streets of Italy. Each journey is thoughtfully curated with expert local guides, immersive cultural experiences, and comfortable accommodations. Whether you\'re wandering through European villages or discovering hidden gems across the globe, every moment is designed to inspire.',
    highlights: [
      'Expert local guides at every destination',
      'Premium hotel accommodations included',
      'Cultural immersion with authentic local experiences',
      'Small group sizes for a personal touch',
    ],
  },
  {
    id: 'river-cruises',
    slug: 'river-cruises',
    name: 'River Cruises',
    icon: 'Ship',
    tagline: 'Drift through stunning landscapes',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
    category: 'river-cruise',
    heroImage: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=80',
    description: 'Glide through Europe\'s most scenic waterways aboard intimate river cruise ships. Wake up each morning to a new city, from the castles along the Rhine to the vineyards of the Douro Valley. River cruising offers the perfect blend of relaxation and exploration — unpack once and let the world come to you.',
    highlights: [
      'All-inclusive dining and beverages',
      'Daily excursions at each port of call',
      'Intimate ships with personalized service',
      'Scenic routes through Europe\'s heartland',
    ],
  },
  {
    id: 'ocean-cruises',
    slug: 'ocean-cruises',
    name: 'Ocean Cruises',
    icon: 'Anchor',
    tagline: 'Set sail for unforgettable horizons',
    image: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=800&q=80',
    category: 'ocean-cruise',
    heroImage: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=1920&q=80',
    description: 'Experience the grandeur of ocean travel with our carefully selected cruise itineraries. From Caribbean islands to Mediterranean ports, ocean cruises offer world-class entertainment, gourmet dining, and the thrill of waking up in a new paradise every day. Travel with our group and enjoy the best of both worlds — the freedom of a cruise with the warmth of family.',
    highlights: [
      'World-class onboard entertainment and dining',
      'Multiple destinations in a single voyage',
      'Group activities and exclusive shore excursions',
      'Spacious staterooms with ocean views',
    ],
  },
  {
    id: 'bus-trips',
    slug: 'bus-trips',
    name: 'Bus Trips',
    icon: 'Bus',
    tagline: 'Scenic American road adventures',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    category: 'bus',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80',
    description: 'Our motorcoach tours are the heart and soul of iTravel with Miki. Hop aboard our luxury coach for day trips and weekend getaways across America\'s most beloved destinations. From Branson shows to fall foliage tours, these trips are where lifelong friendships are made — complete with bus games, snacks, and Miki\'s legendary energy.',
    highlights: [
      'Luxury motorcoach with comfortable seating',
      'Fun onboard entertainment and bus games',
      'Affordable domestic getaways',
      'No passport required — just pack and go',
    ],
  },
  {
    id: 'holiday-specials',
    slug: 'holiday-specials',
    name: 'Holiday Specials',
    icon: 'Sparkles',
    tagline: 'Celebrate the season in style',
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&q=80',
    category: 'holiday',
    heroImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1920&q=80',
    description: 'Make the holidays magical with our seasonal special trips. From Christmas market tours in Europe to New Year\'s Eve celebrations and Thanksgiving getaways, these limited-edition journeys bring festive joy and unforgettable memories. Celebrate with your travel family in the most wonderful destinations.',
    highlights: [
      'Exclusive seasonal itineraries',
      'Festive dining and entertainment',
      'Holiday-themed decorations and celebrations',
      'Limited availability — book early',
    ],
  },
];
