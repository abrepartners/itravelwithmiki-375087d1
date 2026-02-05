import type { Trip } from '@/types/trip';
import { allTrips as defaultTrips } from '@/data/trips';

const TRIPS_KEY = 'admin_trips';

export const tripStore = {
  getTrips: (): Trip[] => {
    const stored = localStorage.getItem(TRIPS_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultTrips;
      }
    }
    // Initialize with default trips on first load
    localStorage.setItem(TRIPS_KEY, JSON.stringify(defaultTrips));
    return defaultTrips;
  },

  addTrip: (trip: Trip): void => {
    const trips = tripStore.getTrips();
    trips.push(trip);
    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
  },

  updateTrip: (id: string, updatedTrip: Trip): void => {
    const trips = tripStore.getTrips();
    const index = trips.findIndex((t) => t.id === id);
    if (index !== -1) {
      trips[index] = updatedTrip;
      localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
    }
  },

  deleteTrip: (id: string): void => {
    const trips = tripStore.getTrips();
    const filtered = trips.filter((t) => t.id !== id);
    localStorage.setItem(TRIPS_KEY, JSON.stringify(filtered));
  },

  resetToDefaults: (): void => {
    localStorage.setItem(TRIPS_KEY, JSON.stringify(defaultTrips));
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
