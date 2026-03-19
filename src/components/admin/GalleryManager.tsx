import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Image, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { galleryStore } from '@/stores/galleryStore';
import type { GalleryImage } from '@/types/gallery';
import { isSafeUrl } from '@/lib/url-validation';

interface GalleryManagerProps {
  images: GalleryImage[];
  onRefresh: () => void;
}

const GalleryManager = ({ images, onRefresh }: GalleryManagerProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImage, setNewImage] = useState({ url: '', caption: '', tripName: '' });

  const [urlError, setUrlError] = useState('');

  const handleAdd = () => {
    if (!newImage.url.trim()) return;
    
    if (!isSafeUrl(newImage.url)) {
      setUrlError('Image URL must start with http:// or https://');
      return;
    }
    setUrlError('');
    
    galleryStore.addImage({
      url: newImage.url.trim(),
      caption: newImage.caption.trim() || undefined,
      tripName: newImage.tripName.trim() || undefined,
    });
    
    setNewImage({ url: '', caption: '', tripName: '' });
    setShowAddForm(false);
    onRefresh();
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this image from the gallery?')) {
      galleryStore.deleteImage(id);
      onRefresh();
    }
  };

  const handleReset = () => {
    if (confirm('Reset gallery to default images? This will remove all custom images.')) {
      galleryStore.resetToDefaults();
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 
            className="text-heading-md font-semibold text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Gallery Photos
          </h2>
          <p className="text-muted-foreground mt-1">
            {images.length} {images.length === 1 ? 'image' : 'images'} in the footer gallery
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
          <Button onClick={() => setShowAddForm(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Image
          </Button>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary rounded-xl p-6 space-y-4"
        >
          <h3 className="font-semibold text-foreground">Add New Gallery Image</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL *</Label>
              <Input
                id="imageUrl"
                value={newImage.url}
                onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                placeholder="https://..."
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                value={newImage.caption}
                onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
                placeholder="e.g., Ireland 2024"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tripName">Trip Name</Label>
              <Input
                id="tripName"
                value={newImage.tripName}
                onChange={(e) => setNewImage({ ...newImage, tripName: e.target.value })}
                placeholder="e.g., Ireland in Depth"
                className="h-11"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            {urlError && <p className="text-sm text-destructive">{urlError}</p>}
            <Button onClick={handleAdd} disabled={!newImage.url.trim()}>
              Add Image
            </Button>
          </div>
        </motion.div>
      )}

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No gallery images. Add your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative group aspect-square rounded-lg overflow-hidden bg-muted"
            >
              <img
                src={image.url}
                alt={image.caption || 'Gallery image'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80';
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2">
                <p className="text-white text-xs text-center mb-2 line-clamp-2">
                  {image.caption || 'No caption'}
                </p>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(image.id)}
                  className="gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
