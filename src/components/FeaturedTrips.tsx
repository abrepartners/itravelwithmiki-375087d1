import { motion } from 'framer-motion';
import TripCard from '@/components/TripCard';
import { useFeaturedTrips } from '@/stores/tripStore';

const FeaturedTrips = () => {
  const featuredTrips = useFeaturedTrips();
  const displayTrips = featuredTrips.slice(0, 6);

  if (displayTrips.length === 0) return null;

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
            Coming Up Next
          </p>
          <h2
            className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Trips You'll Love
          </h2>
          <p className="text-muted-foreground text-body-lg max-w-2xl mx-auto">
            These popular adventures are filling up fast — grab your spot and come make memories with us!
          </p>
        </motion.div>

        {/* Uniform 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayTrips.map((trip) => (
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
            See All Our Trips →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTrips;
