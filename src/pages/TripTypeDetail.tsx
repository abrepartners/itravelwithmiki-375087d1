import { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Ship, Anchor, Bus, Sparkles, ArrowLeft, Check,
  Calendar, Clock, Package, HelpCircle, ChevronDown, ArrowRight,
} from 'lucide-react';
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

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] lg:h-[65vh] overflow-hidden">
        <img
          src={tripType.heroImage}
          alt={tripType.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* Reticle corners */}
        <div className="absolute inset-8 pointer-events-none hidden lg:block">
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-white/20" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-white/20" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-white/20" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-white/20" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 lg:px-12 pb-12 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <a
                href="/trips"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Trips
              </a>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'hsl(0 0% 100% / 0.12)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid hsl(0 0% 100% / 0.2)',
                  }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1
                    className="text-heading-lg lg:text-hero text-white font-bold leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {tripType.name}
                  </h1>
                  <p className="text-white/60 text-base mt-0.5">{tripType.tagline}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="py-10 lg:py-14 px-6 lg:px-12 bg-secondary border-b border-border">
        <div className="container mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-muted-foreground text-base lg:text-lg leading-relaxed text-center"
          >
            {tripType.description}
          </motion.p>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="py-14 lg:py-20 px-6 lg:px-12">
        <div className="container mx-auto">
          {/* Tab Bar */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const count = tab.id === 'upcoming' ? upcomingTrips.length
                : tab.id === 'past' ? pastTrips.length
                : null;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-md scale-105'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                  )}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  {tab.label}
                  {count !== null && count > 0 && (
                    <span className={cn(
                      'text-xs rounded-full px-1.5 py-0.5 font-bold',
                      activeTab === tab.id ? 'bg-white/20' : 'bg-primary/10 text-primary'
                    )}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* Upcoming Trips */}
            {activeTab === 'upcoming' && (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {upcomingTrips.length > 0 ? (
                  <>
                    <p className="text-muted-foreground text-sm text-center mb-8">
                      <span className="font-semibold text-foreground">{upcomingTrips.length}</span> upcoming{' '}
                      {upcomingTrips.length === 1 ? 'trip' : 'trips'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                      {upcomingTrips.map((trip, index) => (
                        <motion.div
                          key={trip.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="flex flex-col"
                        >
                          <TripCard trip={trip} className="flex-grow" />
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20 rounded-3xl border border-border bg-secondary/40 max-w-lg mx-auto">
                    <Calendar className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
                    <p className="text-muted-foreground text-base mb-2 font-medium">
                      No upcoming {tripType.name.toLowerCase()} right now.
                    </p>
                    <p className="text-muted-foreground text-sm mb-5">New trips are always being planned — check back soon!</p>
                    <a href="/trips" className="text-primary font-semibold hover:underline underline-offset-4 text-sm inline-flex items-center gap-1">
                      Browse all trips <ArrowRight className="w-3.5 h-3.5" />
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
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {pastTrips.length > 0 ? (
                  <>
                    <p className="text-muted-foreground text-sm text-center mb-8">
                      <span className="font-semibold text-foreground">{pastTrips.length}</span> past{' '}
                      {pastTrips.length === 1 ? 'trip' : 'trips'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 opacity-75">
                      {pastTrips.map((trip, index) => (
                        <motion.div
                          key={trip.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="flex flex-col"
                        >
                          <TripCard trip={trip} className="flex-grow" />
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20 rounded-3xl border border-border bg-secondary/40 max-w-lg mx-auto">
                    <Clock className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
                    <p className="text-muted-foreground text-base">
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
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-card border border-border rounded-3xl p-8 lg:p-10 shadow-soft">
                  <p className="text-primary text-xs tracking-[0.2em] uppercase font-semibold mb-3">Inclusions</p>
                  <h3
                    className="text-heading-md text-foreground font-semibold mb-7 leading-tight"
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
                        <span className="text-foreground text-base leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Have questions about what's included?{' '}
                      <a href="/support" className="text-primary font-semibold hover:underline underline-offset-2">
                        Contact our team
                      </a>{' '}
                      — we're happy to help.
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
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="max-w-2xl mx-auto"
              >
                <p className="text-primary text-xs tracking-[0.2em] uppercase font-semibold mb-3 text-center">FAQ</p>
                <h3
                  className="text-heading-md text-foreground font-semibold mb-7 text-center leading-tight"
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
                        className="bg-card border border-border rounded-2xl overflow-hidden shadow-soft"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                          className="w-full flex items-center justify-between p-5 text-left text-foreground hover:bg-secondary/60 transition-colors duration-200"
                        >
                          <span className="text-sm font-medium pr-4 leading-snug">{faq.question}</span>
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-300',
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
                          <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center mt-8">
                  <a
                    href="/support"
                    className="text-primary font-semibold text-sm hover:underline underline-offset-4 inline-flex items-center gap-1"
                  >
                    View all FAQs <ArrowRight className="w-3.5 h-3.5" />
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
