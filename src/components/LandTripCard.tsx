import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LandTrip } from '@/types/land-trip';

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
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="flex flex-col h-full"
    >
      <div className="group flex flex-col h-full rounded-3xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1.5">
        {/* Image Carousel */}
        <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
          <img
            src={trip.images[currentImageIndex]}
            alt={trip.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm border ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-700 border-emerald-200'
                  : 'bg-amber-500/15 text-amber-700 border-amber-200'
              }`}
            >
              {isActive ? (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ) : (
                <Clock className="w-3 h-3" />
              )}
              {trip.status}
            </span>
          </div>

          {/* Image Navigation */}
          {trip.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50 border border-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50 border border-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>

              {/* Image Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {trip.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      idx === currentImageIndex
                        ? 'bg-white w-5 h-1.5'
                        : 'bg-white/50 w-1.5 h-1.5 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-grow p-6">
          {/* Date */}
          <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{trip.date_display}</span>
          </div>

          {/* Title — line-clamp-2 for uniform height */}
          <h3
            className="text-lg font-semibold text-foreground leading-snug mb-3 line-clamp-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {trip.title}
          </h3>

          {/* Description — line-clamp-3 */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-grow mb-5">
            {trip.sub_description}
          </p>

          {/* Buttons — always at bottom */}
          <div className="flex flex-wrap gap-2.5 mt-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 min-w-[130px] rounded-full text-sm border-border hover:border-primary hover:text-primary transition-colors duration-200"
              asChild
            >
              <a href={`/land-trips/${trip.id}`} className="flex items-center justify-center gap-1.5">
                Trip Details
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </Button>

            {showBookNow && (
              <Button
                size="sm"
                className="flex-1 min-w-[130px] rounded-full text-sm bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <a
                  href={trip.booking_link!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Now
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
