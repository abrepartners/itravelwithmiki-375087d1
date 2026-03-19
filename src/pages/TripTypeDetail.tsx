import { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Ship, Anchor, Bus, Sparkles, ArrowLeft, Check, Calendar, Clock, Package, HelpCircle, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';
import { tripTypes } from '@/data/trip-types';
import { useTrips } from '@/stores/tripStore';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Globe, Ship, Anchor, Bus, Sparkles,
};

const tabs = [
  { id: 'upcoming', label: 'Upcoming Trips', icon: Calendar },
  { id: 'past', label: 'Past Trips', icon: Clock },
  { id: 'included', label: "What's Included", icon: Package },
  { id: 'faq', label: 'FAQs', icon: HelpCircle },
] as const;

type TabId = typeof tabs[number]['id'];

const TripTypeDetail = () => {
  const { type } = useParams<{ type: string }>();
  const allTrips = useTrips();
  const [activeTab, setActiveTab] = useState<TabId>('upcoming');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

  const upcomingTrips = useMemo(() => filteredTrips.filter(t => !t.soldOut), [filteredTrips]);
  const pastTrips = useMemo(() => filteredTrips.filter(t => t.soldOut), [filteredTrips]);

  if (!tripType) {
    return <Navigate to="/trips" replace />;
  }

  const Icon = iconMap[tripType.icon] || Globe;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Taller Hero with reticle corners */}
      <section className="relative h-[55vh] min-h-[420px] lg:h-[65vh] overflow-hidden">
        <img
          src={tripType.heroImage}
          alt={tripType.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Reticle corner accents */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/30" />
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-white/30" />
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-white/30" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-white/30" />

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
                <div className="w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-md bg-white/15 border border-white/25">
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

      {/* About strip */}
      <section className="py-12 lg:py-16 px-6 lg:px-12 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-heading-md text-foreground font-semibold mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              About {tripType.name}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {tripType.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabbed Content with AnimatePresence */}
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="container mx-auto">
          {/* Tab Bar with count badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const count = tab.id === 'upcoming' ? upcomingTrips.length : tab.id === 'past' ? pastTrips.length : null;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium transition-all duration-300',
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                  )}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                  {count !== null && (
                    <span className={cn(
                      'ml-1 text-xs font-bold rounded-full px-2 py-0.5',
                      activeTab === tab.id
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-foreground/10 text-foreground'
                    )}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {/* Upcoming Trips */}
            {activeTab === 'upcoming' && (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-muted-foreground text-center mb-8">
                  {upcomingTrips.length} upcoming {upcomingTrips.length === 1 ? 'trip' : 'trips'}
                </p>
                {upcomingTrips.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {upcomingTrips.map((trip, index) => (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <TripCard trip={trip} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-card border border-border rounded-2xl">
                    <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg mb-4">
                      No upcoming {tripType.name.toLowerCase()} right now.
                    </p>
                    <a href="/trips" className="text-primary font-semibold hover:underline underline-offset-4">
                      Browse all trips →
                    </a>
                  </div>
                )}
              </motion.div>
            )}

            {/* Past Trips */}
            {activeTab === 'past' && (
              <motion.div
                key="past"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-muted-foreground text-center mb-8">
                  {pastTrips.length} past {pastTrips.length === 1 ? 'trip' : 'trips'}
                </p>
                {pastTrips.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 opacity-80">
                    {pastTrips.map((trip, index) => (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <TripCard trip={trip} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-card border border-border rounded-2xl">
                    <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">
                      No past {tripType.name.toLowerCase()} to show yet.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* What's Included */}
            {activeTab === 'included' && (
              <motion.div
                key="included"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-card border border-border rounded-2xl p-8 lg:p-10 shadow-soft">
                  <h3
                    className="text-heading-md text-foreground font-semibold mb-6"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    What's Included with {tripType.name}
                  </h3>
                  <ul className="space-y-4">
                    {tripType.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground text-lg">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-muted-foreground text-base">
                      Have questions about what's included? <a href="/support" className="text-primary font-medium hover:underline">Contact our team</a> — we're happy to help.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* FAQs */}
            {activeTab === 'faq' && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <h3
                  className="text-heading-md text-foreground font-semibold mb-6 text-center"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {tripType.name} FAQs
                </h3>
                <div className="space-y-3">
                  {tripType.faqs.map((faq, i) => {
                    const isOpen = openFaqIndex === i;
                    return (
                      <div
                        key={i}
                        className="bg-card border border-border rounded-xl overflow-hidden shadow-soft"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                          className="w-full flex items-center justify-between p-5 text-left text-foreground hover:bg-muted/50 transition-colors duration-200"
                        >
                          <span className="text-base font-medium pr-4">{faq.question}</span>
                          <ChevronDown
                            className={cn(
                              'w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-300',
                              isOpen && 'rotate-180'
                            )}
                          />
                        </button>
                        <div
                          className={cn(
                            'overflow-hidden transition-all duration-300 ease-out',
                            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          )}
                        >
                          <p className="px-5 pb-5 text-muted-foreground text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center mt-8">
                  <a
                    href="/faq"
                    className="text-primary font-semibold text-lg hover:underline underline-offset-4"
                  >
                    View All FAQs →
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TripTypeDetail;
