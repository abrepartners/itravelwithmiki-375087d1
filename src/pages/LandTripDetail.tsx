import { Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, CheckCircle2, Compass, Map, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { getLandTripById } from '@/data/land-trips';
import { landTripStories } from '@/data/land-trip-stories';

const LandTripDetail = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const trip = tripId ? getLandTripById(tripId) : undefined;

  if (!trip) {
    return <Navigate to="/land-trips" replace />;
  }

  const story = landTripStories[trip.id];

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title={`${trip.title} — iTravelWithMiki`}
        description={trip.sub_description}
        canonical={`https://itravelwithmiki.lovable.app/land-trips/${trip.id}`}
      />
      <Navbar />

      <section className="relative min-h-[68vh] overflow-hidden">
        <img src={trip.images[0]} alt={trip.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35" />
        <div className="relative container mx-auto flex min-h-[68vh] items-end px-6 pb-14 pt-32 lg:px-12 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl text-white"
          >
            <a href="/land-trips" className="mb-6 inline-flex items-center gap-2 text-sm text-white/75 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to land trips
            </a>
            <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              {trip.status}
            </div>
            <h1 className="mb-5 text-heading-lg md:text-heading-xl lg:text-hero font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              {trip.title}
            </h1>
            <div className="mb-5 flex flex-wrap items-center gap-4 text-white/80">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {trip.date_display}
              </span>
              <span className="inline-flex items-center gap-2">
                <Compass className="h-4 w-4" />
                Hosted group experience with Miki
              </span>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-white/85">{story?.overview ?? trip.sub_description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90" asChild>
                <a href={trip.booking_link ?? '/support'} target={trip.booking_link ? '_blank' : undefined} rel={trip.booking_link ? 'noopener noreferrer' : undefined}>
                  {trip.booking_link ? 'Reserve Your Spot' : 'Talk to Miki First'}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/25 bg-white/5 px-8 text-white hover:bg-white hover:text-foreground" asChild>
                <a href="#trip-story">View trip story</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="trip-story" className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="container mx-auto grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="mb-6 text-heading-md font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Why travelers will love this itinerary
            </h2>
            <div className="space-y-4">
              {(story?.highlights ?? [trip.sub_description]).map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <p className="text-base leading-relaxed text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="rounded-3xl border border-border bg-secondary p-8 shadow-soft">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Planning notes</h2>
            <div className="space-y-3">
              {(story?.travelNotes ?? []).map((item) => (
                <p key={item} className="rounded-2xl bg-background/70 p-4 text-sm leading-relaxed text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="bg-secondary px-6 py-16 lg:px-12 lg:py-24">
        <div className="container mx-auto grid gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-3xl bg-background p-8 shadow-soft">
            <h2 className="mb-6 text-heading-md font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              What this page now does better
            </h2>
            <ul className="space-y-4">
              {(story?.included ?? []).map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }} className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-soft">
            <h2 className="mb-6 text-heading-md font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Quick preview
            </h2>
            <div className="space-y-5 text-primary-foreground/85">
              {(story?.preview ?? []).map((section) => (
                <div key={section.title}>
                  <h3 className="mb-2 font-semibold text-primary-foreground">{section.title}</h3>
                  {section.items.map((item) => (
                    <div key={item} className="flex gap-3">
                      <Map className="mt-1 h-4 w-4 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-card p-8 text-center shadow-soft lg:p-12">
          <Phone className="mx-auto mb-5 h-10 w-10 text-primary" />
          <h2 className="mb-4 text-heading-md font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
            Need help deciding if this trip is right for you?
          </h2>
          <p className="mb-8 text-body-lg text-muted-foreground">
            Reach out before you book. We can talk through pace, comfort, logistics, and whether this is the right fit for you or anyone traveling with you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-full px-8" asChild>
              <a href="tel:+15019511749">Call (501) 951-1749</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
              <a href="/support">Visit support center</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LandTripDetail;
