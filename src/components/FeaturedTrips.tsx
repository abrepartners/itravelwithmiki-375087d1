import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import TripCard from '@/components/TripCard';
import { useFeaturedTrips } from '@/stores/tripStore';

const FeaturedTrips = () => {
  const featuredTrips = useFeaturedTrips();
  const displayTrips = featuredTrips.slice(0, 4);
  const mainFeatured = displayTrips[0];
  const otherTrips = displayTrips.slice(1);

  if (!mainFeatured) {
    return null;
  }

  return (
    <section
      className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden"
      id="trips"
      style={{
        background: 'linear-gradient(160deg, hsl(220 14% 97%) 0%, hsl(220 14% 94%) 100%)',
      }}
    >
      {/* Decorative background element */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[100px] pointer-events-none"
        style={{ background: 'hsl(221 83% 33%)' }}
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-3">
              Don't Miss Out
            </p>
            <h2
              className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold text-foreground leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Featured
              <br />
              <span className="italic font-normal text-foreground/70">Adventures</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-base max-w-xs md:text-right leading-relaxed">
            Popular trips selling fast. Book now to secure your spot.
          </p>
        </motion.div>

        {/* Main Featured Trip — full-width hero card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <TripCard trip={mainFeatured} featured className="w-full" />
        </motion.div>

        {/* Other Trips — equal-height grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {otherTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <TripCard trip={trip} className="flex-grow" />
            </motion.div>
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
            className="inline-flex items-center gap-2 text-primary font-semibold text-base hover:gap-3 transition-all duration-300 group"
          >
            View All Trips
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTrips;
