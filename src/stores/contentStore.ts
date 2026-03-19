export interface ContentItem {
  id: string;
  tripName: string;
  destination: string;
  contentType: 'instagram' | 'facebook' | 'email' | 'sms' | 'calendar';
  content: string;
  subject?: string;
  createdAt: string;
}

const CONTENT_KEY = 'admin_content';

export const contentStore = {
  getItems: (): ContentItem[] => {
    const stored = localStorage.getItem(CONTENT_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  },

  addItem: (item: ContentItem): void => {
    const items = contentStore.getItems();
    items.unshift(item);
    localStorage.setItem(CONTENT_KEY, JSON.stringify(items));
  },

  updateItem: (id: string, updates: Partial<ContentItem>): void => {
    const items = contentStore.getItems();
    const index = items.findIndex((i) => i.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      localStorage.setItem(CONTENT_KEY, JSON.stringify(items));
    }
  },

  deleteItem: (id: string): void => {
    const items = contentStore.getItems();
    localStorage.setItem(CONTENT_KEY, JSON.stringify(items.filter((i) => i.id !== id)));
  },

  clearAll: (): void => {
    localStorage.removeItem(CONTENT_KEY);
  },
};
