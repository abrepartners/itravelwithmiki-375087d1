import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-card">
        {/* Image Carousel */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={trip.images[currentImageIndex]}
            alt={trip.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge
              className={`text-sm font-semibold px-3 py-1.5 ${
                isActive
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}
            >
              {trip.status}
            </Badge>
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
              
              {/* Image Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {trip.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex
                        ? 'bg-white w-6'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Card Content */}
        <CardContent className="p-6 space-y-4">
          {/* Title */}
          <h3 className="font-playfair text-xl md:text-2xl font-bold text-foreground leading-tight">
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

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            {/* Learn More - Always visible */}
            <Button
              variant="outline"
              size="lg"
              className="flex-1 min-w-[140px] rounded-full"
              asChild
            >
              <a href={trip.learn_more_link}>
                Learn More
              </a>
            </Button>

            {/* Book Now - Only if Active AND booking_link exists */}
            {showBookNow && (
              <Button
                size="lg"
                className="flex-1 min-w-[140px] rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
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
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LandTripCard;
