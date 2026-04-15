import type { Trip } from '@/types/trip';
import { allTrips as defaultTrips } from '@/data/trips';

const TRIPS_KEY = 'admin_trips';

export const tripStore = {
  getTrips: (): Trip[] => {
    return defaultTrips;
  },

  addTrip: (_trip: Trip): void => {
    // No-op: trips are managed via the codebase
  },

  updateTrip: (_id: string, _updatedTrip: Trip): void => {
    // No-op: trips are managed via the codebase
  },

  deleteTrip: (_id: string): void => {
    // No-op: trips are managed via the codebase
  },

  resetToDefaults: (): void => {
    // No-op: defaults are always returned
  },

  generateId: (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  },
};

// Hook for React components to get trips with reactivity
export const useTrips = () => {
  const trips = tripStore.getTrips();
  return trips;
};

export const useFeaturedTrips = () => {
  const trips = tripStore.getTrips();
  return trips.filter((trip) => trip.featured);
};
