import { useEffect, useRef, useState } from 'react';
import { Search, MapPin, Luggage, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Browse Our Upcoming Trips',
    description: 'Explore our handpicked collection of guided group adventures — from scenic bus tours to international voyages.',
  },
  {
    number: '02',
    icon: MapPin,
    title: 'Pick Your Perfect Adventure',
    description: 'Choose the trip that speaks to your soul. Every journey is designed for comfort, connection, and unforgettable moments.',
  },
  {
    number: '03',
    icon: Luggage,
    title: 'Pack Your Bags — We Handle the Rest',
    description: 'From hotels to meals to activities, everything is taken care of. Just show up with a smile and your suitcase.',
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(150deg, hsl(220 20% 9%), hsl(221 30% 14%), hsl(220 20% 9%))' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.06] blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, hsl(221 83% 53%), transparent)' }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(hsl(0 0% 100% / 1) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          data-index={-1}
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ease-out ${
            visibleItems.has(-1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="uppercase tracking-[0.25em] text-xs font-medium mb-5 text-white/40">
            How It Works
          </p>
          <h2
            className="text-heading-lg lg:text-hero text-white mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Make Memories That Last
            <br />
            <span className="italic font-normal text-white/50">a Lifetime</span>
          </h2>
          <p className="text-base max-w-lg mx-auto text-white/40 leading-relaxed">
            Three simple steps to your next unforgettable adventure with the iTravel family.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 mb-16 lg:mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                data-index={index}
                className={`relative group transition-all duration-700 ease-out ${
                  visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card */}
                <div className="relative rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-7 h-full hover:bg-white/6 hover:border-white/12 transition-all duration-300">
                  {/* Step number — large watermark */}
                  <span
                    className="absolute -top-3 -left-1 text-7xl font-bold text-white/[0.04] select-none pointer-events-none leading-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.number}
                  </span>

                  {/* Icon ring */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/20 border border-primary/25 group-hover:bg-primary/30 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-lg text-white font-semibold mb-3 leading-snug line-clamp-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/45">
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-10 -right-4 z-10 items-center justify-center w-8">
                    <ArrowRight className="w-4 h-4 text-primary/30" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          data-index={10}
          className={`text-center transition-all duration-700 ease-out ${
            visibleItems.has(10) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-xs bg-primary/10 border border-primary/20 text-white/60 tracking-wider uppercase">
            <Heart className="w-3.5 h-3.5 text-primary" />
            Ready to Join the Family?
          </div>
          <h3
            className="text-heading-md lg:text-heading-lg text-white mb-8 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your Next Adventure Awaits
          </h3>
          <a href="/trips">
            <Button
              className="btn-senior text-base px-10 py-5 font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground border-none group"
            >
              Book Your Next Trip
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
