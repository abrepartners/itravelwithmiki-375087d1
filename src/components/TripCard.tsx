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
        'group relative overflow-hidden rounded-2xl bg-card hover-lift shadow-elevated flex flex-col',
        featured && 'md:col-span-2 lg:col-span-3',
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Carousel */}
      <div className={cn('relative overflow-hidden', featured ? 'h-80 md:h-96' : 'h-64')}>
        {trip.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${trip.name} - Image ${index + 1}`}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-700',
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {trip.images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {trip.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {trip.urgencyMessage && (
          <div className="absolute top-4 left-4">
            <UrgencyBadge
              message={trip.urgencyMessage}
              variant={trip.soldOut ? 'default' : trip.spotsLeft ? 'spots' : 'discount'}
            />
          </div>
        )}
      </div>

      {/* Content — flex-col + flex-grow so button always sits at the bottom */}
      <div className={cn('flex flex-col flex-grow p-6', featured && 'md:p-8')}>
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{trip.destination}</span>
        </div>

        {/* Title — line-clamp-2 ensures ALL cards have the same header height */}
        <h3
          className={cn(
            'font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug',
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          )}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {trip.name}
        </h3>

        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{trip.departureDate}</span>
        </div>

        {/* Spacer — pushes price + CTA to the bottom */}
        <div className="flex-grow" />

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-3">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-accent">
                  ${trip.discountPrice?.toLocaleString()}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ${trip.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-foreground">
                ${trip.price.toLocaleString()}
              </span>
            )}
            <span className="text-sm text-muted-foreground">
              {trip.singlePrice ? 'dbl' : 'per person'}
            </span>
          </div>
          {trip.singlePrice && (
            <p className="text-xs text-muted-foreground mt-0.5">
              ${trip.singlePrice.toLocaleString()} single occupancy
            </p>
          )}
        </div>

        {/* CTA — smart: Book Now / Join Waitlist / Sold Out / Contact to Book */}
        {trip.soldOut ? (
          trip.waitlistUrl ? (
            <Button
              className={cn('w-full btn-senior bg-amber-600 hover:bg-amber-700 text-white group/btn', featured && 'md:w-auto')}
              asChild
            >
              <a href={trip.waitlistUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                Join Waitlist
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </Button>
          ) : (
            <Button
              className={cn('w-full btn-senior bg-muted text-muted-foreground cursor-not-allowed', featured && 'md:w-auto')}
              disabled
            >
              Sold Out
            </Button>
          )
        ) : trip.bookingUrl ? (
          <Button
            className={cn('w-full btn-senior bg-primary hover:bg-primary/90 group/btn', featured && 'md:w-auto')}
            asChild
          >
            <a href={trip.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              Book Now
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </Button>
        ) : (
          <Button
            className={cn('w-full btn-senior bg-primary hover:bg-primary/90 group/btn', featured && 'md:w-auto')}
            asChild
          >
            <a href="/support" className="flex items-center justify-center gap-2">
              Contact to Book
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </Button>
        )}
      </div>
    </motion.article>
  );
};

export default TripCard;
