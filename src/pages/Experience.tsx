import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, Camera, Sparkles, Heart, Shield, MapPin, ArrowRight, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import mikiPhoto from '@/assets/miki-photo.jpeg';

/* ───────────────────── Data ───────────────────── */

const pillars = [
  {
    icon: Sparkles,
    title: 'Curated Experiences',
    description:
      'Every destination is handpicked by Miki herself. No cookie-cutter itineraries — just authentic adventures designed around what our travel family actually loves.',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80&fm=webp',
  },
  {
    icon: Camera,
    title: 'Photo-First Storytelling',
    description:
      'We document every moment so you can relive it forever. Professional photos, candid memories, and stories that make your friends jealous.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80&fm=webp',
  },
  {
    icon: Heart,
    title: 'Family-Style Hosting',
    description:
      'You\'re not a booking number — you\'re family. Miki remembers your name, your birthday, and your favorite seat on the bus.',
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1200&q=80&fm=webp',
  },
  {
    icon: Shield,
    title: 'Worry-Free Planning',
    description:
      'Hotels, meals, transportation, activities — we handle every single detail. You just show up with a smile and your sense of adventure.',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80&fm=webp',
  },
];

const testimonials = [
  {
    quote: 'Traveling with Miki changed my life. I went solo and came home with a family. I\'ve been on 8 trips now and I\'m already planning number 9!',
    name: 'Barbara K.',
    trip: 'Ireland Adventure 2023',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&fm=webp',
  },
  {
    quote: 'I was nervous about traveling alone at 67. By the second day, I had 30 new friends. Miki makes everyone feel like they belong.',
    name: 'James R.',
    trip: 'Branson Fall Festival',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fm=webp',
  },
  {
    quote: 'The attention to detail is incredible. Every meal, every stop, every surprise — you can tell Miki pours her heart into every trip.',
    name: 'Linda M.',
    trip: 'Mediterranean Cruise 2024',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&fm=webp',
  },
];

const mosaicImages = [
  { src: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80&fm=webp', alt: 'Group travel moment' },
  { src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80&fm=webp', alt: 'Beach paradise' },
  { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80&fm=webp', alt: 'Mountain adventure' },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80&fm=webp', alt: 'Scenic waterway' },
  { src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80&fm=webp', alt: 'Cultural experience' },
  { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80&fm=webp', alt: 'Sunset view' },
];

/* ───────────────── Component ──────────────────── */

const Experience = () => {
  const [phase, setPhase] = useState<'teaser' | 'video' | 'revealed'>('teaser');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const videoRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // Parallax for reveal section
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const handleEnter = useCallback(() => {
    setPhase('video');
  }, []);

  // Auto-transition after "video" plays (placeholder for now)
  useEffect(() => {
    if (phase === 'video') {
      const timer = setTimeout(() => {
        setPhase('revealed');
      }, 4000); // 4s simulated video intro
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Testimonial auto-rotate
  useEffect(() => {
    if (phase !== 'revealed') return;
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [phase]);

  const nextTestimonial = () => setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="The Experience — iTravelWithMiki"
        description="Discover what makes traveling with Miki different. An immersive look into our travel family."
        canonical="https://itravelwithmiki.lovable.app/experience"
      />

      {/* Navbar only shows after reveal */}
      {phase === 'revealed' && <Navbar />}

      {/* ═══════════ PHASE 1: TEASER ═══════════ */}
      <AnimatePresence>
        {phase === 'teaser' && (
          <motion.section
            key="teaser"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          >
            {/* BG image with slow zoom */}
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.08] }}
              transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
            >
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80&fm=webp"
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

            {/* Reticle corners */}
            <div className="absolute top-6 left-6 w-14 h-14 border-t-2 border-l-2 border-white/20 z-10" />
            <div className="absolute top-6 right-6 w-14 h-14 border-t-2 border-r-2 border-white/20 z-10" />
            <div className="absolute bottom-6 left-6 w-14 h-14 border-b-2 border-l-2 border-white/20 z-10" />
            <div className="absolute bottom-6 right-6 w-14 h-14 border-b-2 border-r-2 border-white/20 z-10" />

            <div className="relative z-10 text-center px-6 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-[0.25em] uppercase text-white/80 mb-8">
                  <Camera className="w-3.5 h-3.5" />
                  The Experience
                </span>
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-[1.05] mb-6"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  We Don't Just
                  <br />
                  Plan Trips —
                  <br />
                  <em className="text-primary not-italic">We Create Memories</em>
                </h1>
                <p className="text-white/60 text-lg md:text-xl mb-12 max-w-xl mx-auto">
                  An immersive look into what makes our travel family special
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <button
                  onClick={handleEnter}
                  className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-primary text-primary-foreground text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Play className="w-5 h-5" fill="currentColor" />
                    Enter the Experience
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
              </motion.div>

              {/* Scroll hint pulse */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-16"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-5 h-8 rounded-full border-2 border-white/25 mx-auto flex items-start justify-center p-1"
                >
                  <div className="w-1 h-2 rounded-full bg-white/50" />
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ═══════════ PHASE 2: VIDEO INTRO ═══════════ */}
      <AnimatePresence>
        {phase === 'video' && (
          <motion.section
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
          >
            {/* Facebook Video Embed */}
            <div
              ref={videoRef}
              className="relative w-full max-w-5xl mx-auto px-6"
              style={{
                filter: 'drop-shadow(0 0 60px rgba(220, 60, 50, 0.3))',
              }}
            >
              <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fitravelwithmiki%2Fvideos%2F856054342105177%2F&width=900&show_text=false"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none' }}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              {/* Warm red glow ring */}
              <div className="absolute -inset-3 rounded-xl border border-red-500/20 pointer-events-none" />
            </div>

            {/* Skip button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={() => setPhase('revealed')}
              className="absolute bottom-12 right-12 z-20 text-white/40 hover:text-white/80 text-sm tracking-widest uppercase transition-colors"
            >
              Skip →
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ═══════════ PHASE 3: THE REVEALED EXPERIENCE ═══════════ */}
      {phase === 'revealed' && (
        <>
          {/* ─── THE REVEAL: Story + Photo Mosaic ─── */}
          <section ref={revealRef} className="relative py-24 lg:py-36 px-6 lg:px-12 overflow-hidden">
            <div className="container mx-auto max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                {/* Left: Story */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="uppercase tracking-[0.2em] text-sm font-semibold mb-4 text-primary">
                    Our Story
                  </p>
                  <h2
                    className="text-heading-lg lg:text-heading-xl text-foreground font-bold mb-8 leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    We Don't Just Plan Trips —{' '}
                    <em className="text-primary not-italic">We Create Memories</em>
                  </h2>
                  <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
                    <p>
                      In 2009, Miki gathered 12 friends for a weekend bus trip to Branson, Missouri.
                      What started as a simple getaway became the spark for something extraordinary —
                      a travel family that now spans thousands of members across the country.
                    </p>
                    <p>
                      Miki saw what others didn't: travelers aged 50+ wanted more than a tour.
                      They wanted genuine connection, stress-free adventures, and someone who
                      remembered their name and their birthday. So she built exactly that.
                    </p>
                    <p>
                      Today, iTravel with Miki offers bus tours, river cruises, ocean voyages,
                      and international adventures. But the heart hasn't changed — every traveler
                      is family, every trip is personal, and every memory is precious.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-5">
                    <img
                      src={mikiPhoto}
                      alt="Miki"
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div>
                      <p className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Miki</p>
                      <p className="text-sm text-muted-foreground">Founder & Chief Adventure Officer</p>
                    </div>
                  </div>
                </motion.div>

                {/* Right: Asymmetric Photo Mosaic */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                  style={{ y: parallaxY }}
                >
                  <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[500px] lg:h-[600px]">
                    {/* Large top-left */}
                    <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden group">
                      <img
                        src={mosaicImages[0].src}
                        alt={mosaicImages[0].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    {/* Top-right */}
                    <div className="rounded-2xl overflow-hidden group">
                      <img
                        src={mosaicImages[1].src}
                        alt={mosaicImages[1].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    {/* Mid-right */}
                    <div className="rounded-2xl overflow-hidden group">
                      <img
                        src={mosaicImages[2].src}
                        alt={mosaicImages[2].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    {/* Bottom row */}
                    <div className="rounded-2xl overflow-hidden group">
                      <img
                        src={mosaicImages[3].src}
                        alt={mosaicImages[3].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden group">
                      <img
                        src={mosaicImages[4].src}
                        alt={mosaicImages[4].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden group">
                      <img
                        src={mosaicImages[5].src}
                        alt={mosaicImages[5].alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ─── SCROLL PILLARS: Full-Width Cards ─── */}
          <section className="relative">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full min-h-[70vh] flex items-center overflow-hidden"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={pillar.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12 py-20">
                    <motion.div
                      initial={{ opacity: 0.4, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="max-w-xl"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <span className="text-white/40 text-sm font-medium tracking-widest uppercase">
                          0{i + 1} / 04
                        </span>
                      </div>
                      <h3
                        className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-6"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-lg">
                        {pillar.description}
                      </p>
                      {/* Accent line */}
                      <div className="mt-8 w-16 h-1 rounded-full bg-primary" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </section>

          {/* ─── TESTIMONIALS CAROUSEL ─── */}
          <section
            className="py-24 lg:py-32 px-6 lg:px-12"
            style={{ background: 'linear-gradient(135deg, hsl(220 15% 8%), hsl(220 15% 12%))' }}
          >
            <div className="container mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0.4, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className="uppercase tracking-[0.2em] text-sm font-semibold text-primary mb-4">
                  From Our Travel Family
                </p>
                <h2
                  className="text-heading-lg lg:text-heading-xl text-white font-bold"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  What Travelers Say
                </h2>
              </motion.div>

              {/* Carousel */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonialIndex}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <Quote className="w-12 h-12 mx-auto mb-8 text-primary/40" />
                    <blockquote
                      className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed mb-10 max-w-3xl mx-auto italic"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      "{testimonials[testimonialIndex].quote}"
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src={testimonials[testimonialIndex].photo}
                        alt={testimonials[testimonialIndex].name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary/40"
                      />
                      <div className="text-left">
                        <p className="text-white font-semibold">{testimonials[testimonialIndex].name}</p>
                        <p className="text-white/40 text-sm">{testimonials[testimonialIndex].trip}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                <div className="flex justify-center gap-4 mt-10">
                  <button
                    onClick={prevTestimonial}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {/* Dots */}
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === testimonialIndex ? 'bg-primary w-6' : 'bg-white/20'
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextTestimonial}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ─── CTA: Join the Family ─── */}
          <section
            className="relative py-28 lg:py-36 px-6 lg:px-12 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, hsl(1 76% 50%), hsl(1 76% 40%))' }}
          >
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

            <div className="relative z-10 container mx-auto text-center max-w-3xl">
              <motion.div
                initial={{ opacity: 0.4, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <MapPin className="w-10 h-10 mx-auto mb-6 text-white/80" />
                <h2
                  className="text-heading-lg lg:text-hero text-white font-bold mb-6"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Ready to Be Part of
                  <br />
                  Something Special?
                </h2>
                <p className="text-white/80 text-lg md:text-xl mb-12 max-w-xl mx-auto">
                  Join the iTravel with Miki family and discover why thousands of travelers keep coming back trip after trip.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="btn-senior text-lg px-10 rounded-full bg-white text-foreground hover:bg-white/90 font-semibold"
                    asChild
                  >
                    <a href="/trips">
                      Join the Family
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="btn-senior text-lg px-10 rounded-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                    asChild
                  >
                    <a href="/support">Talk to Miki</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </main>
  );
};

export default Experience;
