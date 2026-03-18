import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Ship, Anchor, Bus, Sparkles, ArrowLeft, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';
import { tripTypes } from '@/data/trip-types';
import { useTrips } from '@/stores/tripStore';

const iconMap: Record<string, React.ElementType> = {
  Globe, Ship, Anchor, Bus, Sparkles,
};

const TripTypeDetail = () => {
  const { type } = useParams<{ type: string }>();
  const allTrips = useTrips();

  const tripType = tripTypes.find(t => t.slug === type);

  const filteredTrips = useMemo(() => {
    if (!tripType) return [];
    if (tripType.category === 'holiday') {
      return allTrips.filter(t =>
        t.name.toLowerCase().includes('christmas') ||
        t.name.toLowerCase().includes('holiday') ||
        t.name.toLowerCase().includes('new year')
      );
    }
    return allTrips.filter(t => t.category === tripType.category);
  }, [tripType, allTrips]);

  if (!tripType) {
    return <Navigate to="/trips" replace />;
  }

  const Icon = iconMap[tripType.icon] || Globe;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] lg:h-[60vh] overflow-hidden">
        <img
          src={tripType.heroImage}
          alt={tripType.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 lg:px-12 pb-12 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <a
                href="/trips"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Trips
              </a>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'hsl(0 0% 100% / 0.15)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid hsl(0 0% 100% / 0.25)',
                  }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1
                    className="text-heading-lg lg:text-hero text-white font-bold"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {tripType.name}
                  </h1>
                  <p className="text-white/70 text-lg">{tripType.tagline}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description + Highlights */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-10"
          >
            <div className="lg:col-span-3">
              <h2
                className="text-heading-md text-foreground font-semibold mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                About {tripType.name}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {tripType.description}
              </p>
            </div>
            <div className="lg:col-span-2">
              <h3
                className="text-heading-sm text-foreground font-semibold mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                What's Included
              </h3>
              <ul className="space-y-3">
                {tripType.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-base">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-heading-md lg:text-heading-lg text-foreground font-semibold mb-2 text-center"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Available {tripType.name}
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'} available
            </p>
          </motion.div>

          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <TripCard trip={trip} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card border border-border rounded-2xl">
              <p className="text-muted-foreground text-lg mb-4">
                No {tripType.name.toLowerCase()} are currently available.
              </p>
              <a
                href="/trips"
                className="text-primary font-semibold hover:underline underline-offset-4"
              >
                Browse all trips →
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TripTypeDetail;
