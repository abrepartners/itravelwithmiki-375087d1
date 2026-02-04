import { motion } from 'framer-motion';
import TripCard from '@/components/TripCard';
import { featuredTrips } from '@/data/trips';

const FeaturedTrips = () => {
  // Get up to 4 featured trips for the layout
  const displayTrips = featuredTrips.slice(0, 4);
  const mainFeatured = displayTrips[0];
  const otherTrips = displayTrips.slice(1);

  if (!mainFeatured) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-secondary" id="trips">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Featured Trip - Full width on mobile, 2/3 on desktop */}
          <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
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
