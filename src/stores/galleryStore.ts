import type { GalleryImage } from '@/types/gallery';

const GALLERY_KEY = 'gallery_images';

const defaultGalleryImages: GalleryImage[] = [
  {
    id: '1',
    url: '/images/gallery/stingray-caribbean.jpeg',
    caption: 'Caribbean Stingray Adventure',
    tripName: 'Caribbean',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    url: '/images/gallery/quebec-cobblestone.png',
    caption: 'Old Quebec City',
    tripName: 'Montreal & Quebec',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    url: '/images/gallery/versailles-hall.jpeg',
    caption: 'Hall of Mirrors, Versailles',
    tripName: 'France',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    url: '/images/gallery/french-patisserie.jpeg',
    caption: 'French Patisserie',
    tripName: 'France',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    url: '/images/gallery/group-fall-foliage.jpeg',
    caption: 'Fall Foliage Group Trip',
    tripName: 'Vermont',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    url: '/images/gallery/outdoor-dining.jpeg',
    caption: 'Dining Al Fresco',
    tripName: 'Travel Dining',
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    url: '/images/gallery/line-dancing.jpeg',
    caption: 'Line Dancing Night',
    tripName: 'Group Fun',
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    url: '/images/gallery/olive-market.jpeg',
    caption: 'European Olive Market',
    tripName: 'Spain & Portugal',
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    url: '/images/gallery/veggie-market.jpeg',
    caption: 'French Market',
    tripName: 'France',
    createdAt: new Date().toISOString(),
  },
  {
    id: '10',
    url: '/images/gallery/nashville-fun.jpeg',
    caption: 'Nashville Fun',
    tripName: 'Nashville',
    createdAt: new Date().toISOString(),
  },
  {
    id: '11',
    url: '/images/gallery/bus-games.jpeg',
    caption: 'Bus Games with Miki',
    tripName: 'Bus Trip',
    createdAt: new Date().toISOString(),
  },
  {
    id: '12',
    url: '/images/gallery/ferry-deck.jpeg',
    caption: 'On the Water',
    tripName: 'Cruise',
    createdAt: new Date().toISOString(),
  },
  {
    id: '13',
    url: '/images/gallery/french-village-selfie.jpeg',
    caption: 'French Village Vibes',
    tripName: 'France',
    createdAt: new Date().toISOString(),
  },
  {
    id: '14',
    url: '/images/gallery/sunny-selfie.jpeg',
    caption: 'Travel Family',
    tripName: 'Adventures',
    createdAt: new Date().toISOString(),
  },
  {
    id: '15',
    url: '/images/gallery/country-music-show.jpeg',
    caption: 'Country Music Night',
    tripName: 'Nashville',
    createdAt: new Date().toISOString(),
  },
  {
    id: '16',
    url: '/images/gallery/entertainment-night.jpeg',
    caption: 'Entertainment Night',
    tripName: 'Nashville',
    createdAt: new Date().toISOString(),
  },
  {
    id: '17',
    url: '/images/gallery/maine-departure.jpeg',
    caption: 'On Our Way to Maine!',
    tripName: 'Beautiful Maine',
    createdAt: new Date().toISOString(),
  },
  {
    id: '18',
    url: '/images/gallery/versailles-ceiling.jpeg',
    caption: 'Versailles Ceiling',
    tripName: 'France',
    createdAt: new Date().toISOString(),
  },
];

export const galleryStore = {
  getImages: (): GalleryImage[] => {
    const stored = localStorage.getItem(GALLERY_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultGalleryImages;
      }
    }
    localStorage.setItem(GALLERY_KEY, JSON.stringify(defaultGalleryImages));
    return defaultGalleryImages;
  },

  addImage: (image: Omit<GalleryImage, 'id' | 'createdAt'>): void => {
    const images = galleryStore.getImages();
    const newImage: GalleryImage = {
      ...image,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    images.push(newImage);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(images));
  },

  deleteImage: (id: string): void => {
    const images = galleryStore.getImages();
    const filtered = images.filter((img) => img.id !== id);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(filtered));
  },

  resetToDefaults: (): void => {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(defaultGalleryImages));
  },
};

export const useGalleryImages = () => {
  return galleryStore.getImages();
};
