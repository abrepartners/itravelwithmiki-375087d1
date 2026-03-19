import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';
import SEOHead from '@/components/SEOHead';
import { tripCategories } from '@/data/trips';
import { useTrips } from '@/stores/tripStore';
import { cn } from '@/lib/utils';

const Trips = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const allTrips = useTrips();

  const filteredTrips = useMemo(() => {
    if (activeCategory === 'all') return allTrips;
    return allTrips.filter((trip) => trip.category === activeCategory);
  }, [activeCategory, allTrips]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const activeLabel = tripCategories.find(c => c.id === activeCategory)?.label || 'All Trips';

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Browse Trips — iTravelWithMiki"
        description="Explore bus tours, river cruises, ocean cruises, and international land trips. Find your perfect adventure with iTravelWithMiki."
        canonical="https://itravelwithmiki.lovable.app/trips"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-6 lg:px-12 overflow-hidden"
        style={{ background: 'linear-gradient(150deg, hsl(221 83% 28%) 0%, hsl(221 83% 38%) 100%)' }}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[100px] pointer-events-none"
          style={{ background: 'hsl(0 0% 100%)' }} />
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(hsl(0 0% 100% / 1) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs tracking-[0.2em] uppercase">
              <MapPin className="w-3.5 h-3.5" />
              Explore Our Adventures
            </div>
            <h1
              className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold mb-5 text-white leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Find Your Perfect
              <br />
              <span className="italic font-normal text-white/70">Adventure</span>
            </h1>
            <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
              From scenic bus tours across America to unforgettable international adventures —
              a journey is waiting just for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/60 py-3 px-6 lg:px-12 shadow-soft">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wide mr-1 flex-shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter
            </div>
            {tripCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0',
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="py-12 lg:py-20 px-6 lg:px-12">
        <div className="container mx-auto">
          {/* Results header */}
          <div className="flex items-center justify-between mb-8">
            <motion.p
              key={activeCategory}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-muted-foreground text-sm"
            >
              Showing <span className="font-semibold text-foreground">{filteredTrips.length}</span>{' '}
              {filteredTrips.length === 1 ? 'trip' : 'trips'}
              {activeCategory !== 'all' && (
                <span className="text-primary font-medium"> · {activeLabel}</span>
              )}
            </motion.p>
            {activeCategory !== 'all' && (
              <button
                onClick={() => handleCategoryChange('all')}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
            >
              {filteredTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="flex flex-col"
                >
                  <TripCard trip={trip} className="flex-grow" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredTrips.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 rounded-3xl border border-border bg-secondary/40"
            >
              <MapPin className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-2 font-medium">No trips in this category yet.</p>
              <p className="text-muted-foreground text-sm mb-6">Check back soon — new adventures are always being planned!</p>
              <button
                onClick={() => handleCategoryChange('all')}
                className="text-primary font-semibold hover:underline underline-offset-4"
              >
                View all trips →
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-secondary">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-4">Can't find what you need?</p>
            <h2
              className="text-heading-lg md:text-heading-xl font-semibold text-foreground mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Don't See What You're
              <br />
              <span className="italic font-normal">Looking For?</span>
            </h2>
            <p className="text-muted-foreground text-base mb-8 max-w-lg mx-auto leading-relaxed">
              We're always planning new adventures! Contact us to learn about upcoming trips
              or to request a custom group tour.
            </p>
            <a
              href="/support"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group"
            >
              Contact Us
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Trips;
