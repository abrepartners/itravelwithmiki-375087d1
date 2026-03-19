export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  tripName?: string;
  createdAt: string;
}

export interface InsuranceProvider {
  id: 'allianz' | 'diamond';
  name: string;
  subtitle: string;
  description: string;
  pdfUrl: string;
  websiteUrl?: string;
}
