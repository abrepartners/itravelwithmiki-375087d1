import { useEffect, useRef, useState } from 'react';
import { Search, MapPin, Luggage, Heart } from 'lucide-react';
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
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, hsl(220 15% 10%), hsl(220 15% 15%), hsl(220 15% 10%))' }}
    >
      {/* Subtle gold accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(40 80% 55%), transparent)' }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          data-index={-1}
          className={`text-center mb-16 lg:mb-20 transition-all duration-700 ease-out ${
            visibleItems.has(-1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p
            className="uppercase tracking-[0.2em] text-sm font-medium mb-4"
            style={{ color: 'hsl(40 80% 60%)' }}
          >
            How It Works
          </p>
          <h2
            className="text-heading-lg lg:text-hero text-white mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Make Memories That Last
            <br />
            <span style={{ color: 'hsl(40 80% 60%)' }}>a Lifetime</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'hsl(220 10% 70%)' }}>
            Three simple steps to your next unforgettable adventure with the iTravel family.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16 lg:mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                data-index={index}
                className={`relative text-center group transition-all duration-700 ease-out ${
                  visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Step number */}
                <span
                  className="block text-6xl lg:text-7xl font-bold mb-6 opacity-10"
                  style={{ fontFamily: 'var(--font-display)', color: 'hsl(40 80% 55%)' }}
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, hsl(40 80% 55% / 0.15), hsl(40 80% 55% / 0.05))',
                    border: '1px solid hsl(40 80% 55% / 0.2)',
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: 'hsl(40 80% 60%)' }} />
                </div>

                {/* Content */}
                <h3
                  className="text-xl lg:text-heading-sm text-white font-semibold mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed max-w-sm mx-auto" style={{ color: 'hsl(220 10% 65%)' }}>
                  {step.description}
                </p>

                {/* Connector line (between steps on desktop) */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-[4.5rem] -right-6 lg:-right-8 w-12 lg:w-16 h-px"
                    style={{ background: 'linear-gradient(to right, hsl(40 80% 55% / 0.3), hsl(40 80% 55% / 0.05))' }}
                  />
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
          <div
            className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full text-sm"
            style={{
              background: 'hsl(40 80% 55% / 0.1)',
              border: '1px solid hsl(40 80% 55% / 0.2)',
              color: 'hsl(40 80% 60%)',
            }}
          >
            <Heart className="w-4 h-4" />
            Ready to Join the Family?
          </div>
          <h3
            className="text-heading-md lg:text-heading-lg text-white mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Your Next Adventure Awaits
          </h3>
          <a href="/trips">
            <Button
              className="btn-senior text-lg px-10 py-5 font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, hsl(40 80% 50%), hsl(35 85% 45%))',
                color: 'hsl(220 15% 10%)',
                border: 'none',
              }}
            >
              Book Your Next Trip
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
