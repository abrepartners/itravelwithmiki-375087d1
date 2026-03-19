import { Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, CheckCircle2, Compass, Heart, Map, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { getLandTripById } from '@/data/land-trips';

const LandTripDetail = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const trip = tripId ? getLandTripById(tripId) : undefined;

  if (!trip) {
    return <Navigate to="/land-trips" replace />;
  }

  const isActive = trip.status === 'Active';

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title={`${trip.title} — iTravelWithMiki`}
        description={trip.sub_description}
        canonical={`https://itravelwithmiki.lovable.app/land-trips/${trip.id}`}
      />
      <Navbar />

      <section className="relative min-h-[72vh] overflow-hidden">
        <img src={trip.images[0]} alt={trip.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35" />
        <div className="relative container mx-auto flex min-h-[72vh] items-end px-6 pb-14 pt-32 lg:px-12 lg:pb-20">
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
            <h1
              className="mb-5 text-heading-lg md:text-heading-xl lg:text-hero font-semibold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
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
            <p className="max-w-2xl text-lg leading-relaxed text-white/85">{trip.detail.overview}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {trip.booking_link && isActive ? (
                <Button size="lg" className="rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90" asChild>
                  <a href={trip.booking_link} target="_blank" rel="noopener noreferrer">Reserve Your Spot</a>
                </Button>
              ) : (
                <Button size="lg" className="rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90" asChild>
                  <a href="/support">Talk to Miki First</a>
                </Button>
              )}
              <Button size="lg" variant="outline" className="rounded-full border-white/25 bg-white/5 px-8 text-white hover:bg-white hover:text-foreground" asChild>
                <a href="#included">See what&apos;s included</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="container mx-auto grid gap-8 lg:grid-cols-[1.35fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border bg-card p-8 shadow-soft"
          >
            <h2 className="mb-6 text-heading-md font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Signature moments
            </h2>
            <div className="space-y-4">
              {trip.detail.signatureMoments.map((moment) => (
                <div key={moment} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <p className="text-base leading-relaxed text-muted-foreground">{moment}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-3xl border border-border bg-secondary p-8 shadow-soft"
          >
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Heart className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Perfect for travelers who want...</h2>
            <div className="space-y-3">
              {trip.detail.perfectFor.map((item) => (
                <p key={item} className="rounded-2xl bg-background/70 p-4 text-sm leading-relaxed text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="included" className="bg-secondary px-6 py-16 lg:px-12 lg:py-24">
        <div className="container mx-auto grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-background p-8 shadow-soft"
          >
            <h2 className="mb-6 text-heading-md font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              What&apos;s included in the experience
            </h2>
            <ul className="space-y-4">
              {trip.detail.included.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-soft"
          >
            <h2 className="mb-6 text-heading-md font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
              Planning notes before you go
            </h2>
            <ul className="space-y-4 text-primary-foreground/85">
              {trip.detail.planningNotes.map((note) => (
                <li key={note} className="flex gap-3">
                  <Map className="mt-1 h-5 w-5 flex-shrink-0" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 max-w-3xl"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Itinerary preview</p>
            <h2 className="text-heading-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              A stronger onsite story before guests ever click away
            </h2>
          </motion.div>
          <div className="grid gap-6 lg:grid-cols-3">
            {trip.detail.itineraryPreview.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-3xl border border-border bg-card p-8 shadow-soft"
              >
                <h3 className="mb-4 text-xl font-semibold text-foreground">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary px-6 py-16 lg:px-12 lg:py-24">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-card p-8 text-center shadow-soft lg:p-12">
          <Phone className="mx-auto mb-5 h-10 w-10 text-primary" />
          <h2 className="mb-4 text-heading-md font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
            Want help deciding if this trip fits your style?
          </h2>
          <p className="mb-8 text-body-lg text-muted-foreground">
            Reach out before you book. We can walk through pace, comfort, logistics, and whether this is the right adventure for you or someone traveling with you.
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
