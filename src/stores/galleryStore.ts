import type { GalleryImage } from '@/types/gallery';

const GALLERY_KEY = 'gallery_images';

const defaultGalleryImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=400&q=80',
    caption: 'Ireland 2024',
    tripName: 'Ireland in Depth',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    caption: 'Alpine Europe',
    tripName: 'Romantic Villages of Alpine Europe',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80',
    caption: 'Venice, Italy',
    tripName: 'Our Private Italy',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&q=80',
    caption: 'Spain & Portugal',
    tripName: 'Spain & Portugal in Depth',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=400&q=80',
    caption: 'Rhine River',
    tripName: 'Great Rivers of Europe',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec?w=400&q=80',
    caption: 'Savannah, GA',
    tripName: 'Savannah, Jekyll Island & Beaufort',
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=400&q=80',
    caption: 'New Orleans',
    tripName: 'New Orleans',
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=400&q=80',
    caption: 'Grand Canyon',
    tripName: 'Grand Canyon & Las Vegas',
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
