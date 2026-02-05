import { motion } from 'framer-motion';
import { Edit, Trash2, Star, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Trip } from '@/types/trip';

interface TripListProps {
  trips: Trip[];
  onEdit: (trip: Trip) => void;
  onDelete: (id: string) => void;
}

const categoryLabels: Record<Trip['category'], string> = {
  land: 'Land',
  'river-cruise': 'River Cruise',
  'ocean-cruise': 'Ocean Cruise',
  bus: 'Bus',
};

const TripList = ({ trips, onEdit, onDelete }: TripListProps) => {
  if (trips.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No trips found. Add your first trip!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {trips.map((trip, index) => (
        <motion.div
          key={trip.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.02 }}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Trip Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-semibold text-foreground truncate">{trip.name}</h3>
                {trip.featured && (
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
                )}
                {trip.soldOut && (
                  <Ban className="w-4 h-4 text-destructive flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap text-sm text-muted-foreground">
                <span>{trip.destination}</span>
                <span>•</span>
                <span>{trip.departureDate}</span>
                <span>•</span>
                <span>${trip.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {categoryLabels[trip.category]}
                </Badge>
                {trip.operator && (
                  <Badge variant="outline" className="text-xs">
                    {trip.operator}
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(trip)}
                className="h-9 px-3"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this trip?')) {
                    onDelete(trip.id);
                  }
                }}
                className="h-9 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TripList;
