import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LandTripCard from '@/components/LandTripCard';
import SEOHead from '@/components/SEOHead';
import { landTrips } from '@/data/land-trips';

const LandTrips = () => {
  const activeTrips = landTrips.filter(t => t.status === 'Active');
  const comingSoonTrips = landTrips.filter(t => t.status !== 'Active');

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Land Trips — iTravelWithMiki"
        description="Explore our handpicked international land trips to Europe, Australia, New Zealand, and beyond. Immersive adventures crafted for travelers 50+."
        canonical="https://itravelwithmiki.lovable.app/land-trips"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
        style={{ background: 'linear-gradient(150deg, hsl(221 83% 28%) 0%, hsl(221 83% 38%) 100%)' }}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.10] blur-[120px] pointer-events-none"
          style={{ background: 'hsl(0 0% 100%)' }} />
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(hsl(0 0% 100% / 1) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs tracking-[0.2em] uppercase">
              <Globe className="w-3.5 h-3.5" />
              International Adventures
            </div>
            <h1
              className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold mb-5 text-white leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Current Land Trips
              <br />
              <span className="italic font-normal text-white/60">Around the World</span>
            </h1>
            <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-2xl">
              From the romantic villages of Alpine Europe to the stunning landscapes of Australia
              and New Zealand — each journey is crafted for unforgettable experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Active Trips */}
      <section className="py-16 md:py-24 px-6 lg:px-12">
        <div className="container mx-auto">
          {activeTrips.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-end justify-between mb-10"
              >
                <div>
                  <p className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-2">Book Now</p>
                  <h2
                    className="text-heading-md font-semibold text-foreground leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Available Trips
                  </h2>
                </div>
                <span className="text-muted-foreground text-sm">
                  {activeTrips.length} {activeTrips.length === 1 ? 'trip' : 'trips'} available
                </span>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
                {activeTrips.map((trip, index) => (
                  <LandTripCard key={trip.id} trip={trip} index={index} />
                ))}
              </div>
            </>
          )}

          {/* Coming Soon */}
          {comingSoonTrips.length > 0 && (
            <div className={activeTrips.length > 0 ? 'mt-20' : ''}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-end justify-between mb-10"
              >
                <div>
                  <p className="text-amber-600 text-xs tracking-[0.25em] uppercase font-semibold mb-2">Coming Soon</p>
                  <h2
                    className="text-heading-md font-semibold text-foreground leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    On the Horizon
                  </h2>
                </div>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
                {comingSoonTrips.map((trip, index) => (
                  <LandTripCard key={trip.id} trip={trip} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 px-6 lg:px-12 bg-secondary">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2
              className="text-heading-md font-semibold text-foreground mb-3 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Not sure which trip is right for you?
            </h2>
            <p className="text-muted-foreground text-base mb-6 leading-relaxed">
              Miki personally helps every traveler find their perfect adventure. Reach out and let's chat.
            </p>
            <a
              href="/support"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group"
            >
              Talk to Miki
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandTrips;
