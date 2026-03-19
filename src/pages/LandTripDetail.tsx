import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Calendar, CheckCircle2, Compass, Heart, Map, Phone,
  ChevronLeft, ChevronRight, Share2, Clock,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { getLandTripById } from '@/data/land-trips';

const LandTripDetail = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const trip = tripId ? getLandTripById(tripId) : undefined;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!trip) {
    return <Navigate to="/land-trips" replace />;
  }

  const isActive = trip.status === 'Active';

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % trip.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + trip.images.length) % trip.images.length);

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title={`${trip.title} — iTravelWithMiki`}
        description={trip.sub_description}
        canonical={`https://itravelwithmiki.lovable.app/land-trips/${trip.id}`}
      />
      <Navbar />

      {/* Hero — Full-bleed image with image switcher */}
      <section className="relative min-h-[75vh] overflow-hidden">
        {/* Background images */}
        {trip.images.map((img, i) => (
          <img
            key={img}
            src={img}
            alt={`${trip.title} — photo ${i + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Image nav arrows */}
        {trip.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all duration-200 border border-white/20 z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-all duration-200 border border-white/20 z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            {/* Image dots */}
            <div className="absolute bottom-20 right-8 flex flex-col gap-1.5 z-10">
              {trip.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentImageIndex ? 'bg-white h-5 w-1.5' : 'bg-white/40 h-1.5 w-1.5 hover:bg-white/70'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Content */}
        <div className="relative container mx-auto flex min-h-[75vh] items-end px-6 pb-14 pt-32 lg:px-12 lg:pb-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl text-white"
          >
            <a
              href="/land-trips"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to land trips
            </a>

            {/* Status */}
            <div className="mb-4 flex items-center gap-3 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                {isActive ? <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> : <Clock className="w-3 h-3" />}
                {trip.status}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/50 border border-white/15 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <Calendar className="h-3.5 w-3.5" />
                {trip.date_display}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/50 border border-white/15 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <Compass className="h-3.5 w-3.5" />
                Hosted by Miki
              </span>
            </div>

            <h1
              className="mb-5 text-heading-lg md:text-heading-xl lg:text-hero font-semibold leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {trip.title}
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-white/75 mb-8">{trip.detail.overview}</p>

            <div className="flex flex-wrap gap-3">
              {trip.booking_link && isActive ? (
                <Button
                  size="lg"
                  className="rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90 font-semibold shadow-lg"
                  asChild
                >
                  <a href={trip.booking_link} target="_blank" rel="noopener noreferrer">
                    Reserve Your Spot
                  </a>
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90 font-semibold shadow-lg"
                  asChild
                >
                  <a href="/support">Talk to Miki First</a>
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/25 bg-white/8 px-8 text-white hover:bg-white hover:text-foreground transition-all duration-300"
                asChild
              >
                <a href="#included">See what's included</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature Moments + Perfect For */}
      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="container mx-auto grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
          {/* Signature Moments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border bg-card p-8 shadow-soft"
          >
            <p className="text-primary text-xs tracking-[0.2em] uppercase font-semibold mb-3">Highlights</p>
            <h2
              className="mb-6 text-heading-md font-semibold text-foreground leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Signature Moments
            </h2>
            <div className="space-y-4">
              {trip.detail.signatureMoments.map((moment) => (
                <div key={moment} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <p className="text-base leading-relaxed text-muted-foreground">{moment}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Perfect For */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-3xl border border-border bg-secondary p-8 shadow-soft"
          >
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Heart className="h-5 w-5" />
            </div>
            <h2
              className="mb-5 text-xl font-semibold text-foreground leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Perfect for travelers who want...
            </h2>
            <div className="space-y-3">
              {trip.detail.perfectFor.map((item) => (
                <p key={item} className="rounded-2xl bg-background/70 p-4 text-sm leading-relaxed text-muted-foreground border border-border/40">
                  {item}
                </p>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      {/* Included + Planning Notes */}
      <section id="included" className="bg-secondary px-6 py-16 lg:px-12 lg:py-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-3">What to Expect</p>
            <h2
              className="text-heading-md font-semibold text-foreground leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Everything You Need to Know
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-background p-8 shadow-soft border border-border"
            >
              <h3
                className="mb-6 text-heading-sm font-semibold text-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                What's included
              </h3>
              <ul className="space-y-4">
                {trip.detail.included.map((item) => (
                  <li key={item} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Planning Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-soft"
            >
              <h3
                className="mb-6 text-heading-sm font-semibold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Planning notes before you go
              </h3>
              <ul className="space-y-4 text-primary-foreground/80">
                {trip.detail.planningNotes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <Map className="mt-0.5 h-5 w-5 flex-shrink-0 opacity-70" />
                    <span className="text-sm leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Itinerary Preview */}
      <section className="px-6 py-16 lg:px-12 lg:py-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Day by Day</p>
            <h2
              className="text-heading-lg font-semibold text-foreground leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Itinerary Preview
            </h2>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-3">
            {trip.detail.itineraryPreview.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-3xl border border-border bg-card p-7 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3
                  className="mb-4 text-lg font-semibold text-foreground leading-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item} className="text-sm leading-relaxed text-muted-foreground flex gap-2">
                      <span className="text-primary/40 flex-shrink-0 mt-0.5">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-secondary px-6 py-16 lg:px-12 lg:py-24">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-card p-8 text-center shadow-soft border border-border lg:p-12"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h2
              className="mb-4 text-heading-md font-semibold text-foreground leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Want help deciding if this trip fits your style?
            </h2>
            <p className="mb-8 text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Reach out before you book. We can walk through pace, comfort, logistics, and whether
              this is the right adventure for you or someone traveling with you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full px-8 font-semibold" asChild>
                <a href="tel:+15019511749">Call (501) 951-1749</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <a href="/support">Visit support center</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LandTripDetail;
