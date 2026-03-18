import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Globe, Ship, Anchor, Bus, Sparkles } from 'lucide-react';
import { tripTypes } from '@/data/trip-types';
import { useTrips } from '@/stores/tripStore';

const iconMap: Record<string, React.ElementType> = {
  Globe, Ship, Anchor, Bus, Sparkles,
};

const TripTypeSelector = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const allTrips = useTrips();

  // Count trips per category
  const getTripCount = (category: string) => {
    if (category === 'holiday') {
      // Holiday specials could be any trip with holiday-related names
      return allTrips.filter(t => 
        t.name.toLowerCase().includes('christmas') || 
        t.name.toLowerCase().includes('holiday') || 
        t.name.toLowerCase().includes('new year')
      ).length || 0;
    }
    return allTrips.filter(t => t.category === category).length;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((index: number) => {
    const len = tripTypes.length;
    setActiveIndex(((index % len) + len) % len);
  }, []);

  const prev = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => goTo(activeIndex + 1), 5000);
    return () => clearInterval(interval);
  }, [activeIndex, goTo]);

  const activeType = tripTypes[activeIndex];
  const Icon = iconMap[activeType.icon] || Globe;
  const tripCount = getTripCount(activeType.category);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="uppercase tracking-[0.2em] text-sm font-medium text-primary mb-4">
            Choose Your Adventure
          </p>
          <h2
            className="text-heading-lg lg:text-heading-xl text-foreground mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Find the Perfect Trip
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            for your travel style
          </p>
        </div>

        {/* Carousel */}
        <div
          className={`relative transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Main Card */}
          <div className="relative max-w-4xl mx-auto">
            {/* Reticle / Compass Frame */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-elevated">
              {/* Background Image */}
              <a href={`/trips/${activeType.slug}`} className="block">
                <div className="relative h-[360px] sm:h-[420px] lg:h-[480px] overflow-hidden">
                  <img
                    key={activeType.id}
                    src={activeType.image}
                    alt={activeType.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                  {/* Reticle corners */}
                  <div className="absolute inset-6 sm:inset-10 pointer-events-none">
                    {/* Top-left */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/40" />
                    {/* Top-right */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/40" />
                    {/* Bottom-left */}
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/40" />
                    {/* Bottom-right */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/40" />
                    {/* Center crosshair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10">
                      <div className="absolute top-1/2 left-0 w-full h-px bg-white/20" />
                      <div className="absolute left-1/2 top-0 h-full w-px bg-white/20" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-white/30" />
                    </div>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 lg:p-12">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'hsl(0 0% 100% / 0.15)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid hsl(0 0% 100% / 0.2)',
                        }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {tripCount > 0 && (
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            background: 'hsl(0 0% 100% / 0.15)',
                            backdropFilter: 'blur(8px)',
                            color: 'white',
                            border: '1px solid hsl(0 0% 100% / 0.2)',
                          }}
                        >
                          {tripCount}+ Trips Available
                        </span>
                      )}
                    </div>
                    <h3
                      className="text-heading-md sm:text-heading-lg text-white font-bold mb-2"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {activeType.name}
                    </h3>
                    <p className="text-white/80 text-lg max-w-lg">
                      {activeType.tagline}
                    </p>
                  </div>
                </div>
              </a>

              {/* Navigation Arrows */}
              <button
                onClick={prev}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                style={{
                  background: 'hsl(0 0% 100% / 0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid hsl(0 0% 100% / 0.25)',
                }}
                aria-label="Previous trip type"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                style={{
                  background: 'hsl(0 0% 100% / 0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid hsl(0 0% 100% / 0.25)',
                }}
                aria-label="Next trip type"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Indicator Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {tripTypes.map((type, i) => {
                const DotIcon = iconMap[type.icon] || Globe;
                return (
                  <button
                    key={type.id}
                    onClick={() => setActiveIndex(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      i === activeIndex
                        ? 'bg-primary text-primary-foreground shadow-md scale-105'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                    aria-label={type.name}
                  >
                    <DotIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripTypeSelector;
