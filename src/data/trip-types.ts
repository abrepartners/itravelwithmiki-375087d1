export interface TripTypeFAQ {
  question: string;
  answer: string;
}

export interface TripTypeInfo {
  id: string;
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  image: string;
  category: string;
  heroImage: string;
  description: string;
  highlights: string[];
  faqs: TripTypeFAQ[];
}

export const tripTypes: TripTypeInfo[] = [
  {
    id: 'land-trips',
    slug: 'land-trips',
    name: 'Land Trips',
    icon: 'Globe',
    tagline: 'Explore the world on foot and by coach',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=75&fm=webp',
    category: 'land',
    heroImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&q=75&fm=webp',
    description: 'Our international land trips take you to the world\'s most captivating destinations — from the rolling hills of Ireland to the ancient streets of Italy. Each journey is thoughtfully curated with expert local guides, immersive cultural experiences, and comfortable accommodations. Whether you\'re wandering through European villages or discovering hidden gems across the globe, every moment is designed to inspire.',
    highlights: [
      'Expert local guides at every destination',
      'Premium hotel accommodations included',
      'Cultural immersion with authentic local experiences',
      'Small group sizes for a personal touch',
    ],
    faqs: [
      { question: 'What fitness level is needed for land trips?', answer: 'Most land trips involve moderate walking on uneven terrain. We rate each trip\'s activity level so you can choose what\'s comfortable. If you have mobility concerns, let us know — we\'ll help find the perfect fit.' },
      { question: 'Do I need a passport for land trips?', answer: 'Yes, all international land trips require a valid passport with at least 6 months remaining before expiration. Some destinations may also require visas — we\'ll notify you of any requirements when you book.' },
      { question: 'How large are the land trip groups?', answer: 'Our international land trip groups typically range from 20-40 travelers, depending on the tour operator. This ensures a personal experience while still having a fun group dynamic.' },
      { question: 'Are flights included in land trip pricing?', answer: 'It depends on the trip. Some packages include airfare while others are land-only. Each trip listing clearly states what\'s included. We can also help you book flights if needed.' },
    ],
  },
  {
    id: 'river-cruises',
    slug: 'river-cruises',
    name: 'River Cruises',
    icon: 'Ship',
    tagline: 'Drift through stunning landscapes',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=75&fm=webp',
    category: 'river-cruise',
    heroImage: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1400&q=75&fm=webp',
    description: 'Glide through Europe\'s most scenic waterways aboard intimate river cruise ships. Wake up each morning to a new city, from the castles along the Rhine to the vineyards of the Douro Valley. River cruising offers the perfect blend of relaxation and exploration — unpack once and let the world come to you.',
    highlights: [
      'All-inclusive dining and beverages',
      'Daily excursions at each port of call',
      'Intimate ships with personalized service',
      'Scenic routes through Europe\'s heartland',
    ],
    faqs: [
      { question: 'How big are river cruise ships?', answer: 'River cruise ships are much smaller than ocean liners — typically hosting 100-190 passengers. This intimate setting means personalized service, no crowds, and easy access to charming river towns.' },
      { question: 'Do river cruises get rough like ocean cruises?', answer: 'Not at all! River cruises sail on calm inland waterways, so motion sickness is rarely an issue. The ride is smooth and gentle — perfect for those who love the idea of cruising but worry about rough seas.' },
      { question: 'What\'s the dress code on river cruises?', answer: 'River cruises are typically smart casual. Comfortable daywear for excursions and slightly dressier attire for dinners. No formal nights like ocean cruises — just be comfortable and enjoy!' },
      { question: 'Are shore excursions included?', answer: 'Yes! Most river cruises include daily guided excursions at each port. Premium or specialty excursions may be available at an additional cost, but the included options are excellent.' },
    ],
  },
  {
    id: 'ocean-cruises',
    slug: 'ocean-cruises',
    name: 'Ocean Cruises',
    icon: 'Anchor',
    tagline: 'Set sail for unforgettable horizons',
    image: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=600&q=75&fm=webp',
    category: 'ocean-cruise',
    heroImage: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=1400&q=75&fm=webp',
    description: 'Experience the grandeur of ocean travel with our carefully selected cruise itineraries. From Caribbean islands to Mediterranean ports, ocean cruises offer world-class entertainment, gourmet dining, and the thrill of waking up in a new paradise every day. Travel with our group and enjoy the best of both worlds — the freedom of a cruise with the warmth of family.',
    highlights: [
      'World-class onboard entertainment and dining',
      'Multiple destinations in a single voyage',
      'Group activities and exclusive shore excursions',
      'Spacious staterooms with ocean views',
    ],
    faqs: [
      { question: 'What cabin type should I choose?', answer: 'We recommend ocean-view or balcony cabins for the best experience. Interior cabins are more affordable but you\'ll miss the views! Contact us and we\'ll help you choose the perfect stateroom for your budget.' },
      { question: 'Is there a doctor onboard?', answer: 'Yes, all major cruise ships have a medical center with a doctor and nurses available 24/7. Travel insurance is still strongly recommended to cover any medical expenses.' },
      { question: 'Can I do my own thing at ports?', answer: 'Absolutely! While we organize group shore excursions, you\'re free to explore ports independently. We\'ll provide recommendations and tips for each destination.' },
      { question: 'What about seasickness?', answer: 'Modern cruise ships have stabilizers that minimize rocking. If you\'re concerned, choose a mid-ship cabin on a lower deck for the smoothest ride. Over-the-counter remedies and patches also work well.' },
    ],
  },
  {
    id: 'bus-trips',
    slug: 'bus-trips',
    name: 'Bus Trips',
    icon: 'Bus',
    tagline: 'Scenic American road adventures',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=75&fm=webp',
    category: 'bus',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=75&fm=webp',
    description: 'Our motorcoach tours are the heart and soul of iTravel with Miki. Hop aboard our luxury coach for day trips and weekend getaways across America\'s most beloved destinations. From Branson shows to fall foliage tours, these trips are where lifelong friendships are made — complete with bus games, snacks, and Miki\'s legendary energy.',
    highlights: [
      'Luxury motorcoach with comfortable seating',
      'Fun onboard entertainment and bus games',
      'Affordable domestic getaways',
      'No passport required — just pack and go',
    ],
    faqs: [
      { question: 'Where does the bus depart from?', answer: 'Most bus trips depart from convenient pickup locations in the Little Rock, Arkansas area. Exact pickup points and times are provided in your trip confirmation packet about 2 weeks before departure.' },
      { question: 'How long are the bus rides?', answer: 'It varies by destination! Day trips are typically 1-3 hours each way. Weekend getaways may have longer drives, but we make frequent rest stops and keep the bus fun with games and prizes.' },
      { question: 'Can I bring snacks on the bus?', answer: 'Yes! We provide snacks and water on the bus, but you\'re welcome to bring your own favorites. Just no strong-smelling foods, please — we\'re all sharing the space!' },
      { question: 'What if I need to cancel a bus trip?', answer: 'Bus trip cancellation policies vary. Generally, cancellations 14+ days out receive a full refund. Within 14 days, refunds depend on our ability to fill your seat. Travel insurance covers cancellations for covered reasons.' },
    ],
  },
  {
    id: 'holiday-specials',
    slug: 'holiday-specials',
    name: 'Holiday Specials',
    icon: 'Sparkles',
    tagline: 'Celebrate the season in style',
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&q=75&fm=webp',
    category: 'holiday',
    heroImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1400&q=75&fm=webp',
    description: 'Make the holidays magical with our seasonal special trips. From Christmas market tours in Europe to New Year\'s Eve celebrations and Thanksgiving getaways, these limited-edition journeys bring festive joy and unforgettable memories. Celebrate with your travel family in the most wonderful destinations.',
    highlights: [
      'Exclusive seasonal itineraries',
      'Festive dining and entertainment',
      'Holiday-themed decorations and celebrations',
      'Limited availability — book early',
    ],
    faqs: [
      { question: 'How far in advance should I book holiday trips?', answer: 'Holiday specials sell out fast! We recommend booking at least 3-6 months in advance. Some popular trips like Christmas markets fill up even earlier. Sign up for our newsletter to get first access.' },
      { question: 'Are holiday trips more expensive?', answer: 'Holiday trips may be slightly higher due to peak-season pricing, but we work hard to negotiate group rates that save you money compared to booking independently. The festive experiences are absolutely worth it!' },
      { question: 'Will there be holiday-themed activities?', answer: 'Absolutely! Each holiday trip is designed around the season — think Christmas market visits, holiday shows, festive dinners, and seasonal decorations. We go all out to make it magical.' },
      { question: 'Can I give a holiday trip as a gift?', answer: 'Yes! Holiday trips make wonderful gifts. Contact us to purchase a trip as a gift — we can provide a beautiful gift certificate with all the trip details.' },
    ],
  },
];
