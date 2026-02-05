import type { InsuranceProvider } from '@/types/gallery';

const INSURANCE_KEY = 'insurance_providers';

const defaultInsuranceProviders: InsuranceProvider[] = [
  {
    id: 'allianz',
    name: 'Allianz Insurance',
    subtitle: 'For International Trips',
    description: 'Comprehensive travel insurance coverage for Grand Circle and international adventures. Covers trip cancellation, medical emergencies, and more.',
    pdfUrl: '#',
  },
  {
    id: 'diamond',
    name: 'Travel Confident',
    subtitle: 'For Diamond Tours',
    description: 'Travel protection designed specifically for Diamond Tours motorcoach trips. Affordable coverage for domestic travel.',
    pdfUrl: '#',
  },
];

export const insuranceStore = {
  getProviders: (): InsuranceProvider[] => {
    const stored = localStorage.getItem(INSURANCE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultInsuranceProviders;
      }
    }
    localStorage.setItem(INSURANCE_KEY, JSON.stringify(defaultInsuranceProviders));
    return defaultInsuranceProviders;
  },

  updateProvider: (id: 'allianz' | 'diamond', updates: Partial<InsuranceProvider>): void => {
    const providers = insuranceStore.getProviders();
    const index = providers.findIndex((p) => p.id === id);
    if (index !== -1) {
      providers[index] = { ...providers[index], ...updates };
      localStorage.setItem(INSURANCE_KEY, JSON.stringify(providers));
    }
  },

  resetToDefaults: (): void => {
    localStorage.setItem(INSURANCE_KEY, JSON.stringify(defaultInsuranceProviders));
  },
};

export const useInsuranceProviders = () => {
  return insuranceStore.getProviders();
};
