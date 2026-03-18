import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Shield, MapPin, Phone, Bus, Camera, Star, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import mikiPhoto from '@/assets/miki-photo.jpeg';

const milestones = [
  { year: '2009', text: 'Miki leads her first group trip with just 12 travelers' },
  { year: '2012', text: 'iTravel with Miki becomes a licensed travel agency' },
  { year: '2016', text: 'First international trip — Ireland steals everyone\'s heart' },
  { year: '2020', text: 'Pivoted to virtual travel events during the pandemic' },
  { year: '2023', text: 'Expanded to river and ocean cruises worldwide' },
  { year: '2026', text: 'Over 2,000 travelers have joined the family' },
];

const values = [
  {
    icon: Heart,
    title: 'Family First',
    description: 'Every traveler is treated like family, not a customer. We remember your name, your favorite seat, and your dietary needs.',
  },
  {
    icon: Shield,
    title: 'Safety & Comfort',
    description: 'From premium motorcoaches to vetted hotels, every detail is chosen with your comfort and safety in mind.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Our trips create lifelong friendships. Many of our travelers have been with us for over a decade — that says everything.',
  },
  {
    icon: Star,
    title: 'Unforgettable Moments',
    description: 'We don\'t just visit destinations — we create experiences. Bus games, surprise stops, and Miki\'s legendary energy make every trip special.',
  },
];

const whatToExpect = [
  { icon: Bus, title: 'Luxury Transportation', text: 'Comfortable motorcoaches with reclining seats, WiFi, and restrooms for domestic trips. Premium carriers for international adventures.' },
  { icon: Coffee, title: 'Meals & Snacks', text: 'Most trips include breakfast daily, several group dinners, and onboard snacks. We accommodate dietary needs with advance notice.' },
  { icon: Camera, title: 'Guided Experiences', text: 'Professional local guides, exclusive access, and behind-the-scenes tours you won\'t find anywhere else.' },
  { icon: Phone, title: '24/7 Support', text: 'Miki or a team member is always available during your trip. You\'re never on your own — that\'s the family promise.' },
];

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            setVisibleItems((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
    );
    const items = timelineRef.current?.querySelectorAll('[data-idx]');
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] lg:h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=1920&q=80"
          alt="Group of happy travelers"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 lg:px-12 pb-14 lg:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <p
                className="uppercase tracking-[0.2em] text-sm font-medium mb-4"
                style={{ color: 'hsl(40 80% 60%)' }}
              >
                The Experience
              </p>
              <h1
                className="text-heading-lg lg:text-hero text-white font-bold mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Travel with Family,
                <br />
                <span style={{ color: 'hsl(40 80% 60%)' }}>Not Strangers</span>
              </h1>
              <p className="text-white/80 text-lg lg:text-xl max-w-2xl">
                Discover what makes an iTravel with Miki trip unlike anything else — 
                where every journey feels like coming home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="uppercase tracking-[0.2em] text-sm font-medium text-primary mb-4">
                Our Story
              </p>
              <h2
                className="text-heading-md lg:text-heading-lg text-foreground font-semibold mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                It Started with a Bus and a Dream
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  In 2009, Miki gathered 12 friends for a weekend bus trip to Branson, Missouri. 
                  What was supposed to be a one-time adventure turned into something much bigger — 
                  a community of travelers who felt more like family than strangers.
                </p>
                <p>
                  Today, iTravel with Miki has grown into a full-service travel agency offering 
                  motorcoach tours, river cruises, ocean voyages, and international land trips. 
                  But one thing hasn't changed: the feeling that you belong.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={mikiPhoto}
                  alt="Miki - Your Travel Guide"
                  className="w-full h-[400px] lg:h-[480px] object-cover"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground px-6 py-4 rounded-xl shadow-lg"
              >
                <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>15+</p>
                <p className="text-sm text-primary-foreground/80">Years of Adventures</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="py-20 lg:py-28 px-6 lg:px-12"
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
              className="text-heading-lg text-white font-semibold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Milestones Along the Way
            </h2>
          </div>
          <div ref={timelineRef} className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: 'hsl(40 80% 55% / 0.2)' }} />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  data-idx={i}
                  className={`relative pl-16 transition-all duration-600 ease-out ${
                    visibleItems.has(i) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-4 top-1 w-5 h-5 rounded-full border-2"
                    style={{
                      borderColor: 'hsl(40 80% 55%)',
                      background: visibleItems.has(i) ? 'hsl(40 80% 55%)' : 'transparent',
                      transition: 'background 0.4s ease',
                    }}
                  />
                  <span
                    className="block text-sm font-bold mb-1"
                    style={{ color: 'hsl(40 80% 60%)' }}
                  >
                    {m.year}
                  </span>
                  <p className="text-white/80 text-lg">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-28 px-6 lg:px-12 bg-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.2em] text-sm font-medium text-primary mb-4">
              What We Stand For
            </p>
            <h2
              className="text-heading-lg text-foreground font-semibold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((v, i) => {
              const VIcon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-primary/10 flex items-center justify-center">
                    <VIcon className="w-7 h-7 text-primary" />
                  </div>
                  <h3
                    className="text-lg font-semibold text-foreground mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.2em] text-sm font-medium text-primary mb-4">
              On Every Trip
            </p>
            <h2
              className="text-heading-lg text-foreground font-semibold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              What to Expect
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatToExpect.map((item, i) => {
              const WIcon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-8 shadow-soft"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <WIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold text-foreground mb-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 lg:py-28 px-6 lg:px-12"
        style={{ background: 'linear-gradient(135deg, hsl(220 15% 10%), hsl(220 15% 14%))' }}
      >
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MapPin className="w-10 h-10 mx-auto mb-6" style={{ color: 'hsl(40 80% 60%)' }} />
            <h2
              className="text-heading-lg lg:text-heading-xl text-white font-bold mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ready to Experience It
              <br />
              <span style={{ color: 'hsl(40 80% 60%)' }}>For Yourself?</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Join the iTravel with Miki family and discover why thousands of travelers keep coming back.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="btn-senior text-lg px-10 rounded-xl shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, hsl(40 80% 50%), hsl(35 85% 45%))',
                  color: 'hsl(220 15% 10%)',
                }}
                asChild
              >
                <a href="/trips">Browse Trips</a>
              </Button>
              <Button
                variant="outline"
                className="btn-senior text-lg px-10 rounded-xl border-white/20 text-white hover:bg-white/10"
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