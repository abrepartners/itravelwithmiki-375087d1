import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';
import SEOHead from '@/components/SEOHead';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { tripCategories } from '@/data/trips';
import { useTrips } from '@/stores/tripStore';
import { cn } from '@/lib/utils';

const Trips = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const allTrips = useTrips();

  const filteredTrips = useMemo(() => {
    if (activeCategory === 'all') {
      return allTrips;
    }
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

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary-foreground/80 text-sm tracking-[0.2em] uppercase font-semibold mb-4">
              Explore Our Adventures
            </p>
            <h1
              className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Find Your Perfect Trip
            </h1>
            <p className="text-primary-foreground/80 text-body-lg max-w-2xl mx-auto">
              From scenic bus tours across America to unforgettable international adventures,
              we have a journey waiting just for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-40 bg-background border-b border-border py-4 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {tripCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  'px-6 py-3 rounded-full text-base font-medium transition-all duration-300',
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-md'
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
          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground text-center mb-8"
          >
            Showing {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'}
          </motion.p>

          {/* Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <TripCard trip={trip} />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredTrips.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg mb-4">
                No trips found in this category.
              </p>
              <button
                onClick={() => handleCategoryChange('all')}
                className="text-primary font-medium hover:underline"
              >
                View all trips
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-secondary">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-heading-lg md:text-heading-xl font-semibold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Don't See What You're Looking For?
            </h2>
            <p className="text-muted-foreground text-body-lg mb-8">
              We're always planning new adventures! Contact us to learn about upcoming trips
              or to request a custom group tour.
            </p>
            <a
              href="/support"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Trips;
