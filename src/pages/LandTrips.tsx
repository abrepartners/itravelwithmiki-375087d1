import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LandTripCard from '@/components/LandTripCard';
import SEOHead from '@/components/SEOHead';
import { landTrips } from '@/data/land-trips';

const LandTrips = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Land Trips — iTravelWithMiki"
        description="Explore our handpicked international land trips to Europe, Australia, New Zealand, and beyond. Immersive adventures crafted for travelers 50+."
        canonical="https://itravelwithmiki.lovable.app/land-trips"
      />
      <Navbar />

      {/* Gradient Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 bg-gradient-to-b from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-semibold tracking-widest uppercase mb-6">
              <Globe className="w-4 h-4" />
              Signature Land Trips
            </span>
            <h1
              className="text-heading-lg md:text-heading-xl lg:text-hero font-bold mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Current Land Trips
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Discover our handpicked collection of immersive land-based adventures.
              From the romantic villages of Alpine Europe to the stunning landscapes
              of Australia and New Zealand, each journey is crafted for unforgettable experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trip Cards Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {landTrips.map((trip, index) => (
              <LandTripCard key={trip.id} trip={trip} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandTrips;
