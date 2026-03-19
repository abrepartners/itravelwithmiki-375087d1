import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Trip } from '@/types/trip';
import { isSafeUrl } from '@/lib/url-validation';

interface TripFormProps {
  trip?: Trip | null;
  onSave: (trip: Trip) => void;
  onCancel: () => void;
}

const categoryOptions = [
  { value: 'land', label: 'Land Trip' },
  { value: 'river-cruise', label: 'River Cruise' },
  { value: 'ocean-cruise', label: 'Ocean Cruise' },
  { value: 'bus', label: 'Bus Trip' },
];

const TripForm = ({ trip, onSave, onCancel }: TripFormProps) => {
  const [formData, setFormData] = useState<Omit<Trip, 'id'> & { id?: string }>({
    name: '',
    destination: '',
    departureDate: '',
    price: 0,
    discountPrice: undefined,
    category: 'land',
    operator: '',
    subheading: '',
    description: '',
    bookingUrl: '',
    featured: false,
    soldOut: false,
    urgencyMessage: '',
    images: ['', '', ''],
  });

  useEffect(() => {
    if (trip) {
      setFormData({
        ...trip,
        images: [
          trip.images[0] || '',
          trip.images[1] || '',
          trip.images[2] || '',
        ],
      });
    }
  }, [trip]);

  const [urlError, setUrlError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError('');

    // Validate all URL fields
    const urlsToCheck = [
      { value: formData.bookingUrl || '', label: 'Booking URL' },
      ...formData.images.filter(img => img.trim() !== '').map((img, i) => ({ value: img, label: `Image ${i + 1} URL` })),
    ];
    const unsafeUrl = urlsToCheck.find(u => u.value.trim() !== '' && !isSafeUrl(u.value));
    if (unsafeUrl) {
      setUrlError(`${unsafeUrl.label} must start with http:// or https://`);
      return;
    }
    
    // Generate ID if new trip
    const id = formData.id || formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
    
    // Clean up images array
    const images = formData.images.filter(img => img.trim() !== '');
    
    onSave({
      ...formData,
      id,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'],
      discountPrice: formData.discountPrice || undefined,
      urgencyMessage: formData.urgencyMessage || undefined,
    } as Trip);
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trip Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base">Trip Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Ireland in Depth 2027"
            required
            className="h-12"
          />
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-base">Destination *</Label>
          <Input
            id="destination"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            placeholder="e.g., Ireland"
            required
            className="h-12"
          />
        </div>

        {/* Departure Date */}
        <div className="space-y-2">
          <Label htmlFor="departureDate" className="text-base">Departure Date *</Label>
          <Input
            id="departureDate"
            value={formData.departureDate}
            onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
            placeholder="e.g., Mar 27 - Apr 10, 2027"
            required
            className="h-12"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-base">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value: Trip['category']) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-base">Price ($) *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            placeholder="5695"
            required
            min={0}
            className="h-12"
          />
        </div>

        {/* Discount Price */}
        <div className="space-y-2">
          <Label htmlFor="discountPrice" className="text-base">Discount Price ($)</Label>
          <Input
            id="discountPrice"
            type="number"
            value={formData.discountPrice || ''}
            onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="Optional"
            min={0}
            className="h-12"
          />
        </div>

        {/* Operator */}
        <div className="space-y-2">
          <Label htmlFor="operator" className="text-base">Tour Operator</Label>
          <Input
            id="operator"
            value={formData.operator || ''}
            onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
            placeholder="e.g., Grand Circle"
            className="h-12"
          />
        </div>

        {/* Subheading */}
        <div className="space-y-2">
          <Label htmlFor="subheading" className="text-base">Subheading</Label>
          <Input
            id="subheading"
            value={formData.subheading || ''}
            onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
            placeholder="Brief tagline or description"
            className="h-12"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-base">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Full trip description..."
          rows={4}
        />
      </div>

      {/* Booking URL */}
      <div className="space-y-2">
        <Label htmlFor="bookingUrl" className="text-base">Booking URL</Label>
        <Input
          id="bookingUrl"
          type="url"
          value={formData.bookingUrl || ''}
          onChange={(e) => setFormData({ ...formData, bookingUrl: e.target.value })}
          placeholder="https://..."
          className="h-12"
        />
      </div>

      {/* Checkboxes */}
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => setFormData({ ...formData, featured: checked === true })}
          />
          <Label htmlFor="featured" className="text-base cursor-pointer">Featured Trip</Label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="soldOut"
            checked={formData.soldOut}
            onCheckedChange={(checked) => setFormData({ ...formData, soldOut: checked === true })}
          />
          <Label htmlFor="soldOut" className="text-base cursor-pointer">Sold Out</Label>
        </div>
      </div>

      {/* Urgency Badge */}
      <div className="space-y-2">
        <Label htmlFor="urgencyMessage" className="text-base">Urgency Badge Message</Label>
        <Input
          id="urgencyMessage"
          value={formData.urgencyMessage || ''}
          onChange={(e) => setFormData({ ...formData, urgencyMessage: e.target.value })}
          placeholder="e.g., Only 3 spots left!, SOLD OUT"
          className="h-12"
        />
      </div>

      {/* Images */}
      <div className="space-y-4">
        <Label className="text-base">Image URLs (up to 3)</Label>
        {[0, 1, 2].map((index) => (
          <Input
            key={index}
            value={formData.images[index] || ''}
            onChange={(e) => updateImage(index, e.target.value)}
            placeholder={`Image ${index + 1} URL`}
            className="h-12"
          />
        ))}
      </div>

      {/* URL Validation Error */}
      {urlError && (
        <p className="text-sm text-destructive">{urlError}</p>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel} className="h-12 px-6">
          Cancel
        </Button>
        <Button type="submit" className="h-12 px-6">
          {trip ? 'Update Trip' : 'Add Trip'}
        </Button>
      </div>
    </form>
  );
};

export default TripForm;
