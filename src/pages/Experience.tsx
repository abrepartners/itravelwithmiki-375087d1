import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Heart, Shield, MapPin, Bus, Camera, Star,
  Luggage, Search, Smile, Mouse, ChevronDown,
  Globe, Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import mikiPhoto from '@/assets/miki-photo.jpeg';

/* ───────────────────── Data ───────────────────── */

const differentiators = [
  {
    icon: Luggage,
    title: 'Stress-Free Travel',
    description: 'We plan every detail — hotels, meals, attractions, transportation — so you just pack your bags and enjoy the ride.',
  },
  {
    icon: Heart,
    title: 'Family, Not a Tour Group',
    description: 'You\'re not joining a tour group — you\'re joining a family. We remember your name, your seat preference, and your birthday.',
  },
  {
    icon: Shield,
    title: 'Designed for Your Comfort',
    description: 'Every trip is built with your comfort and pace in mind. Frequent rest stops, accessible accommodations, and no rushed itineraries.',
  },
  {
    icon: Star,
    title: 'Moments That Matter',
    description: 'Bus games with prizes, surprise stops, group dinners, and Miki\'s legendary energy turn every trip into a celebration.',
  },
];

const stats = [
  { value: '2,000+', label: 'Happy Travelers' },
  { value: '500+', label: 'Trips Completed' },
  { value: '15+', label: 'Years of Adventures' },
  { value: '30+', label: 'Destinations' },
];

const steps = [
  { number: '01', icon: Search, title: 'Browse & Choose', description: 'Explore our upcoming trips and find the adventure that calls to you.' },
  { number: '02', icon: Phone, title: 'Book with Ease', description: 'Reserve your spot online or by phone. We offer flexible payment plans.' },
  { number: '03', icon: Luggage, title: 'Pack & Prepare', description: 'We send you everything you need — packing lists, itineraries, and tips.' },
  { number: '04', icon: Smile, title: 'Travel & Enjoy', description: 'Show up with a smile. We handle the rest — meals, transport, and fun.' },
];

const milestones = [
  { year: '2009', text: 'Miki leads her first group trip with just 12 travelers to Branson, Missouri' },
  { year: '2012', text: 'iTravel with Miki becomes a licensed travel agency in Arkansas' },
  { year: '2016', text: 'First international trip — Ireland steals everyone\'s heart' },
  { year: '2020', text: 'Pivoted to virtual travel events to keep the family connected during the pandemic' },
  { year: '2023', text: 'Expanded to river cruises and ocean voyages worldwide' },
  { year: '2026', text: 'Over 2,000 travelers have joined the iTravel family' },
];

const experienceFaqs = [
  {
    question: 'Who are these trips designed for?',
    answer: 'Our trips are designed for travelers aged 50 and up who want stress-free, well-organized adventures with like-minded people. Whether you\'re a seasoned traveler or taking your first big trip, we plan everything so you can just relax and enjoy.',
  },
  {
    question: "What's included in the trip price?",
    answer: 'Most trips include transportation, hotel accommodations, many meals (breakfast is almost always included), admission to attractions, and the services of a professional tour guide. Specifics vary by trip and are listed on each trip page.',
  },
  {
    question: 'Can I travel solo or do I need a companion?',
    answer: 'You can absolutely come solo! Many of our travelers do. We foster a warm, family-like atmosphere where everyone feels welcome. Solo travelers can choose single-occupancy rooms or be matched with a roommate to share costs.',
  },
  {
    question: 'What makes traveling with Miki different from other travel agencies?',
    answer: 'We\'re a family, not a faceless agency. Miki personally plans and often leads every trip. Expect bus games, surprise stops, birthday celebrations, and someone who genuinely cares about your comfort and happiness.',
  },
  {
    question: 'How physically demanding are the trips?',
    answer: 'Our trips are designed with comfort in mind. We include frequent rest stops, accessible accommodations, and no rushed itineraries. If you have specific mobility needs, let us know at booking and we\'ll make accommodations.',
  },
];

/* ───────────── Scroll-reveal hook ─────────────── */

const useScrollReveal = (rootMargin = '0px 0px -60px 0px') => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            if (!isNaN(idx)) setVisible((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.15, rootMargin }
    );
    const items = ref.current?.querySelectorAll('[data-idx]');
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, visible };
};

/* ───────────────── Component ──────────────────── */

const Experience = () => {
  const timeline = useScrollReveal();
  const diffCards = useScrollReveal();
  const processCards = useScrollReveal();
  const statsReveal = useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="The Experience — iTravelWithMiki"
        description="Discover what makes traveling with Miki different. Stress-free group adventures designed for travelers 50+ with a family atmosphere."
        canonical="https://itravelwithmiki.lovable.app/experience"
      />
      <Navbar />
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ════════════ HERO — Full-Screen Cinematic ════════════ */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1920&q=80"
          alt="Happy travelers together"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1
              className="text-heading-xl sm:text-hero lg:text-[5rem] text-white font-bold leading-[1.1] mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              We Don't Just Plan Trips —
              <br />
              <span style={{ color: 'hsl(40 80% 60%)' }}>We Create Memories</span>
            </h1>
            <p className="text-white/70 text-lg lg:text-xl max-w-2xl mx-auto mb-12">
              Made by travelers, for travelers
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/50 text-sm tracking-widest uppercase">Scroll to Explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-white/70"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════ MIKI'S STORY — Parallax Reveal ════════════ */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="uppercase tracking-[0.2em] text-sm font-medium mb-4"
                style={{ color: 'hsl(40 80% 55%)' }}
              >
                Our Story
              </p>
              <h2
                className="text-heading-md lg:text-heading-lg text-foreground font-bold mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                A Story That Started
                <br />
                <span className="text-primary">15+ Years Ago</span>
              </h2>
              <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
                <p>
                  In 2009, Miki — a mother, grandmother, and lifelong adventurer from Maumelle, 
                  Arkansas — gathered 12 friends for a weekend bus trip to Branson, Missouri. 
                  What was supposed to be a one-time getaway became the spark for something extraordinary.
                </p>
                <p>
                  Miki saw that travelers aged 50 and up were underserved. They wanted adventure 
                  without the stress, companionship without the awkwardness, and someone who truly 
                  cared about their comfort. So she built exactly that.
                </p>
                <p>
                  Today, iTravel with Miki is a full-service travel agency offering bus tours, 
                  river cruises, ocean voyages, and international land trips. But the heart of 
                  it hasn't changed — every traveler is family, every trip is personal, and 
                  every memory is precious.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={mikiPhoto}
                  alt="Miki — Your Travel Guide"
                  className="w-full h-[420px] lg:h-[520px] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-primary text-primary-foreground px-7 py-5 rounded-xl shadow-lg">
                <p className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>15+</p>
                <p className="text-sm text-primary-foreground/80">Years of Adventures</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════ WHAT MAKES US DIFFERENT — 4 Cards ════════════ */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-secondary">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="uppercase tracking-[0.2em] text-sm font-medium text-primary mb-4">
              The Difference
            </p>
            <h2
              className="text-heading-lg lg:text-heading-xl text-foreground font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              What Makes Us Different
            </h2>
          </motion.div>

          <div ref={diffCards.ref} className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {differentiators.map((d, i) => {
              const DIcon = d.icon;
              return (
                <div
                  key={i}
                  data-idx={i}
                  className={`bg-card border border-border rounded-2xl p-8 lg:p-10 shadow-soft transition-all duration-700 ease-out ${
                    diffCards.visible.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <DIcon className="w-7 h-7 text-primary" />
                  </div>
                  <h3
                    className="text-xl font-semibold text-foreground mb-3"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {d.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{d.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ BY THE NUMBERS — Stats ════════════ */}
      <section
        className="py-20 lg:py-24 px-6 lg:px-12"
        style={{ background: 'linear-gradient(135deg, hsl(220 15% 10%), hsl(220 15% 15%))' }}
      >
        <div ref={statsReveal.ref} className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <p
              className="uppercase tracking-[0.2em] text-sm font-medium mb-4"
              style={{ color: 'hsl(40 80% 60%)' }}
            >
              By the Numbers
            </p>
            <h2
              className="text-heading-lg text-white font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              A Growing Family
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div
                key={i}
                data-idx={i}
                className={`text-center transition-all duration-700 ease-out ${
                  statsReveal.visible.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p
                  className="text-4xl lg:text-5xl font-bold mb-2"
                  style={{ color: 'hsl(40 80% 60%)', fontFamily: 'var(--font-display)' }}
                >
                  {s.value}
                </p>
                <p className="text-white/60 text-base">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS — 4-Step Process ════════════ */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="uppercase tracking-[0.2em] text-sm font-medium text-primary mb-4">
              Your Journey
            </p>
            <h2
              className="text-heading-lg lg:text-heading-xl text-foreground font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              How It Works
            </h2>
          </motion.div>

          <div ref={processCards.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const SIcon = step.icon;
              return (
                <div
                  key={i}
                  data-idx={i}
                  className={`relative text-center transition-all duration-700 ease-out ${
                    processCards.visible.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Step number */}
                  <span
                    className="block text-6xl font-bold mb-4 opacity-10 text-primary"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.number}
                  </span>
                  <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-primary/10 flex items-center justify-center">
                    <SIcon className="w-7 h-7 text-primary" />
                  </div>
                  <h3
                    className="text-lg font-semibold text-foreground mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{step.description}</p>

                  {/* Connector arrow (desktop) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 -right-4 text-border">
                      <ChevronDown className="w-6 h-6 rotate-[-90deg]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════ TIMELINE ════════════ */}
      <section
        className="py-24 lg:py-32 px-6 lg:px-12"
        style={{ background: 'linear-gradient(135deg, hsl(220 15% 10%), hsl(220 15% 15%))' }}
      >
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <p
              className="uppercase tracking-[0.2em] text-sm font-medium mb-4"
              style={{ color: 'hsl(40 80% 60%)' }}
            >
              Our Journey
            </p>
            <h2
              className="text-heading-lg text-white font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Milestones Along the Way
            </h2>
          </div>
          <div ref={timeline.ref} className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: 'hsl(40 80% 55% / 0.2)' }} />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  data-idx={i}
                  className={`relative pl-16 transition-all duration-600 ease-out ${
                    timeline.visible.has(i) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className="absolute left-4 top-1 w-5 h-5 rounded-full border-2"
                    style={{
                      borderColor: 'hsl(40 80% 55%)',
                      background: timeline.visible.has(i) ? 'hsl(40 80% 55%)' : 'transparent',
                      transition: 'background 0.4s ease',
                    }}
                  />
                  <span className="block text-sm font-bold mb-1" style={{ color: 'hsl(40 80% 60%)' }}>
                    {m.year}
                  </span>
                  <p className="text-white/80 text-lg">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ EXPERIENCE FAQs ════════════ */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="uppercase tracking-[0.2em] text-sm font-medium text-primary mb-4">
              Common Questions
            </p>
            <h2
              className="text-heading-lg lg:text-heading-xl text-foreground font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Questions About the Experience
            </h2>
          </motion.div>

          <div className="space-y-3">
            {experienceFaqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-soft"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left text-foreground hover:bg-muted/50 transition-colors duration-200"
                >
                  <span className="text-base font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-secondary">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MapPin className="w-10 h-10 mx-auto mb-6 text-primary" />
            <h2
              className="text-heading-lg lg:text-heading-xl text-foreground font-bold mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ready to Experience It
              <br />
              <span className="text-primary">For Yourself?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Join the iTravel with Miki family and discover why thousands of travelers keep coming back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="btn-senior text-lg px-10 rounded-xl bg-primary hover:bg-primary/90"
                asChild
              >
                <a href="/trips">Browse Trips</a>
              </Button>
              <Button
                variant="outline"
                className="btn-senior text-lg px-10 rounded-xl"
                asChild
              >
                <a href="/support">Contact Us</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Experience;