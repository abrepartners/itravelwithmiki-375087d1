import { motion } from 'framer-motion';
import TripCard from '@/components/TripCard';
import type { Trip } from '@/types/trip';

// Sample featured trips data
const featuredTrips: Trip[] = [
  {
    id: '1',
    name: 'Alaskan Wilderness Adventure',
    destination: 'Alaska, USA',
    images: [
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=800&q=80',
    ],
    price: 3299,
    discountPrice: 2899,
    spotsLeft: 4,
    urgencyMessage: 'Only 4 spots left!',
    departureDate: 'June 15-22, 2026',
    category: 'international',
    featured: true,
  },
  {
    id: '2',
    name: 'Nashville Music City Tour',
    destination: 'Nashville, TN',
    images: [
      'https://images.unsplash.com/photo-1545419913-775e3e45f024?w=800&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
    ],
    price: 899,
    urgencyMessage: 'Early Bird Special!',
    departureDate: 'April 10-14, 2026',
    category: 'bus',
    featured: false,
  },
  {
    id: '3',
    name: 'New Orleans Jazz & Culture',
    destination: 'New Orleans, LA',
    images: [
      'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800&q=80',
      'https://images.unsplash.com/photo-1541971297127-c4e7f6e4c7fd?w=800&q=80',
      'https://images.unsplash.com/photo-1550355191-aa8a80b41353?w=800&q=80',
    ],
    price: 1199,
    discountPrice: 999,
    spotsLeft: 8,
    urgencyMessage: 'Save $200 - Limited Time!',
    departureDate: 'May 5-10, 2026',
    category: 'bus',
    featured: false,
  },
  {
    id: '4',
    name: 'Branson Christmas Spectacular',
    destination: 'Branson, MO',
    images: [
      'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=800&q=80',
    ],
    price: 799,
    spotsLeft: 12,
    urgencyMessage: 'Filling up fast!',
    departureDate: 'December 8-12, 2026',
    category: 'bus',
    featured: false,
  },
];

const FeaturedTrips = () => {
  const mainFeatured = featuredTrips[0];
  const otherTrips = featuredTrips.slice(1);

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 bg-secondary" id="trips">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase font-semibold mb-4">
            Don't Miss Out
          </p>
          <h2
            className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Featured Adventures
          </h2>
          <p className="text-muted-foreground text-body-lg max-w-2xl mx-auto">
            These popular trips are selling fast. Book now to secure your spot on these unforgettable journeys.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Featured Trip - Full width on mobile, 2/3 on desktop */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <TripCard trip={mainFeatured} featured className="h-full" />
          </div>

          {/* Other Trips */}
          {otherTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="/trips"
            className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:underline underline-offset-4"
          >
            View All Trips →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTrips;
