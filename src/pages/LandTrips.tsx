import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LandTripCard from '@/components/LandTripCard';
import SEOHead from '@/components/SEOHead';
import BreadcrumbNav from '@/components/BreadcrumbNav';
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
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Current Land Trips
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
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
