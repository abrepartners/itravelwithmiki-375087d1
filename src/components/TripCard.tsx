import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UrgencyBadge from '@/components/UrgencyBadge';
import type { Trip } from '@/types/trip';
import { cn } from '@/lib/utils';

interface TripCardProps {
  trip: Trip;
  featured?: boolean;
  className?: string;
}

const TripCard = ({ trip, featured = false, className }: TripCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % trip.images.length);
  }, [trip.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + trip.images.length) % trip.images.length);
  }, [trip.images.length]);

  useEffect(() => {
    if (isPaused || trip.images.length <= 1) return;
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, [isPaused, nextImage, trip.images.length]);

  const hasDiscount = trip.discountPrice && trip.discountPrice < trip.price;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-card shadow-elevated flex flex-col',
        'border border-border/50 hover:border-primary/20 transition-all duration-500',
        featured && 'md:col-span-2 lg:col-span-3',
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Carousel */}
      <div className={cn('relative overflow-hidden flex-shrink-0', featured ? 'h-80 md:h-[420px]' : 'h-56')}>
        {trip.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${trip.name} - Image ${index + 1}`}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-all duration-700',
              index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            )}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Destination badge overlaid on image */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
          <MapPin className="w-3.5 h-3.5 text-white/80" />
          <span className="text-xs font-medium text-white/90 tracking-wide">{trip.destination}</span>
        </div>

        {/* Carousel Controls */}
        {trip.images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 border border-white/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60 border border-white/20"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute top-3 right-3 flex gap-1.5">
              {trip.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 w-1.5'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Urgency Badge */}
        {trip.urgencyMessage && (
          <div className="absolute top-3 left-3">
            <UrgencyBadge
              message={trip.urgencyMessage}
              variant={trip.soldOut ? 'default' : trip.spotsLeft ? 'spots' : 'discount'}
            />
          </div>
        )}
      </div>

      {/* Content — flex-col + flex-grow so the button always sits at the bottom */}
      <div className={cn('flex flex-col flex-grow p-5', featured && 'md:p-7')}>
        {/* Date */}
        <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-xs font-medium tracking-wide">{trip.departureDate}</span>
        </div>

        {/* Title — line-clamp-2 ensures ALL cards have the same header height */}
        <h3
          className={cn(
            'font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300',
            'line-clamp-2 leading-snug',
            featured ? 'text-2xl md:text-3xl' : 'text-lg'
          )}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {trip.name}
        </h3>

        {/* Operator tag */}
        {trip.operator && (
          <span className="inline-block text-xs text-muted-foreground bg-secondary rounded-full px-2.5 py-0.5 mb-3 self-start">
            {trip.operator}
          </span>
        )}

        {/* Spacer to push price + CTA to the bottom */}
        <div className="flex-grow" />

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4 pt-3 border-t border-border/60">
          {hasDiscount ? (
            <>
              <span className={cn('font-bold text-accent', featured ? 'text-3xl' : 'text-2xl')}>
                ${trip.discountPrice?.toLocaleString()}
              </span>
              <span className="text-base text-muted-foreground line-through">
                ${trip.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className={cn('font-bold text-foreground', featured ? 'text-3xl' : 'text-2xl')}>
              ${trip.price.toLocaleString()}
            </span>
          )}
          <span className="text-xs text-muted-foreground">/ person</span>
        </div>

        {/* CTA Button */}
        {trip.bookingUrl ? (
          <Button
            className={cn(
              'w-full btn-senior group/btn',
              trip.soldOut
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90',
              featured && 'md:w-auto'
            )}
            disabled={trip.soldOut}
            asChild={!trip.soldOut}
          >
            {trip.soldOut ? (
              <span>Sold Out</span>
            ) : (
              <a href={trip.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Book Now
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            )}
          </Button>
        ) : (
          <Button
            className={cn(
              'w-full btn-senior bg-primary hover:bg-primary/90',
              featured && 'md:w-auto'
            )}
          >
            Book Now
          </Button>
        )}
      </div>
    </motion.article>
  );
};

export default TripCard;
