import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LandTrip } from '@/types/land-trip';
import { cn } from '@/lib/utils';

interface LandTripCardProps {
  trip: LandTrip;
  index: number;
}

const LandTripCard = ({ trip, index }: LandTripCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % trip.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + trip.images.length) % trip.images.length);
  };

  const isActive = trip.status === 'Active';
  const showBookNow = isActive && trip.booking_link !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="group overflow-hidden rounded-2xl border-0 shadow-elevated hover-lift bg-card flex flex-col h-full">
        {/* Image Carousel */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={trip.images[currentImageIndex]}
            alt={trip.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Status dot pill */}
          <div className="absolute top-4 left-4">
            <span
              className={cn(
                'inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full backdrop-blur-md border',
                isActive
                  ? 'bg-green-500/20 text-white border-green-400/30'
                  : 'bg-amber-500/20 text-white border-amber-400/30'
              )}
            >
              <span className={cn('w-2 h-2 rounded-full', isActive ? 'bg-green-400' : 'bg-amber-400')} />
              {trip.status}
            </span>
          </div>

          {/* Image Navigation */}
          {trip.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {trip.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-300',
                      idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/60 hover:bg-white/80'
                    )}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Card Content — flex-col with flex-grow for uniform height */}
        <div className="flex flex-col flex-grow p-6 space-y-3">
          {/* Title — line-clamp-2 for uniform header height */}
          <h3
            className="text-xl md:text-2xl font-bold text-foreground leading-tight line-clamp-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {trip.title}
          </h3>

          {/* Dates */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-base">{trip.date_display}</span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
            {trip.sub_description}
          </p>

          {/* Spacer to push buttons to bottom */}
          <div className="flex-grow" />

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 min-w-[140px] rounded-full"
              asChild
            >
              <a href={`/land-trips/${trip.id}`}>
                Explore Trip Details
              </a>
            </Button>

            {showBookNow && (
              <Button
                size="lg"
                className="flex-1 min-w-[140px] rounded-full bg-primary text-primary-foreground hover:bg-primary/90 group/btn"
                asChild
              >
                <a
                  href={trip.booking_link!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LandTripCard;
