import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, FileText, X, ExternalLink } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Trip } from '@/types/trip';

interface TripFormProps {
  trip?: Trip | null;
  onSave: (trip: Trip) => void;
  onCancel: () => void;
}

const categoryOptions = [
  { value: 'land', label: 'Land Trip' },
  { value: 'river-cruise', label: 'River Cruise' },
  { value: 'ocean-cruise', label: 'Ocean Cruise' },
  { value: 'bus', label: 'Bus Trip (Diamond Tours)' },
];

const TripForm = ({ trip, onSave, onCancel }: TripFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [flyerFileName, setFlyerFileName] = useState<string>('');
  const [flyerPreview, setFlyerPreview] = useState<string>('');

  const [formData, setFormData] = useState<Omit<Trip, 'id'> & { id?: string }>({
    name: '',
    destination: '',
    departureDate: '',
    price: 0,
    singlePrice: undefined,
    discountPrice: undefined,
    category: 'land',
    operator: '',
    subheading: '',
    description: '',
    bookingUrl: '',
    waitlistUrl: '',
    flyerUrl: '',
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
        waitlistUrl: trip.waitlistUrl || '',
        flyerUrl: trip.flyerUrl || '',
        singlePrice: trip.singlePrice,
      });
      if (trip.flyerUrl) {
        const parts = trip.flyerUrl.split('/');
        setFlyerFileName(parts[parts.length - 1] || 'Flyer uploaded');
        setFlyerPreview(trip.flyerUrl);
      }
    }
  }, [trip]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const id = formData.id || formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();

    const images = formData.images.filter(img => img.trim() !== '');

    onSave({
      ...formData,
      id,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'],
      discountPrice: formData.discountPrice || undefined,
      singlePrice: formData.singlePrice || undefined,
      urgencyMessage: formData.urgencyMessage || undefined,
      waitlistUrl: formData.waitlistUrl || undefined,
      flyerUrl: formData.flyerUrl || undefined,
    } as Trip);
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleFlyerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFlyerFileName(file.name);
    // Create a local object URL for preview (in production this would upload to storage)
    const objectUrl = URL.createObjectURL(file);
    setFlyerPreview(objectUrl);
    setFormData({ ...formData, flyerUrl: objectUrl });
  };

  const clearFlyer = () => {
    setFlyerFileName('');
    setFlyerPreview('');
    setFormData({ ...formData, flyerUrl: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isBusTrip = formData.category === 'bus';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* ── BASIC INFO ── */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Basic Info</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="space-y-2">
            <Label htmlFor="operator" className="text-base">Tour Operator</Label>
            <Input
              id="operator"
              value={formData.operator || ''}
              onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
              placeholder="e.g., Grand Circle, Diamond Tours"
              className="h-12"
            />
          </div>

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
      </div>

      {/* ── PRICING ── */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Pricing</h4>
        {isBusTrip && (
          <p className="text-xs text-muted-foreground mb-4">Bus trips have two prices — double/shared occupancy and single occupancy.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-base">
              {isBusTrip ? 'Double/Shared Price ($) *' : 'Price ($) *'}
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              placeholder={isBusTrip ? "e.g., 1115" : "e.g., 5695"}
              required
              min={0}
              className="h-12"
            />
          </div>

          {isBusTrip && (
            <div className="space-y-2">
              <Label htmlFor="singlePrice" className="text-base">Single Occupancy Price ($)</Label>
              <Input
                id="singlePrice"
                type="number"
                value={formData.singlePrice || ''}
                onChange={(e) => setFormData({ ...formData, singlePrice: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="e.g., 1605"
                min={0}
                className="h-12"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="discountPrice" className="text-base">
              {isBusTrip ? 'Sale/Discount Price ($)' : 'Discount Price ($)'}
            </Label>
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
        </div>
      </div>

      {/* ── DESCRIPTION ── */}
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

      {/* ── BOOKING LINKS ── */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Booking Links</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="bookingUrl" className="text-base">TravelJoy Booking URL</Label>
            <Input
              id="bookingUrl"
              type="url"
              value={formData.bookingUrl || ''}
              onChange={(e) => setFormData({ ...formData, bookingUrl: e.target.value })}
              placeholder="https://traveljoy.com/bookings/..."
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">The direct TravelJoy link where guests register and pay.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="waitlistUrl" className="text-base">Waitlist URL <span className="text-muted-foreground font-normal">(optional)</span></Label>
            <Input
              id="waitlistUrl"
              type="url"
              value={formData.waitlistUrl || ''}
              onChange={(e) => setFormData({ ...formData, waitlistUrl: e.target.value })}
              placeholder="https://traveljoy.com/bookings/..."
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">If sold out, this link lets guests join the waitlist.</p>
          </div>
        </div>
      </div>

      {/* ── FLYER UPLOAD ── */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Trip Flyer</h4>
        <p className="text-xs text-muted-foreground mb-4">Upload the Diamond Tours flyer PDF or image. This will be used to auto-generate social media content in the Content Studio.</p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          onChange={handleFlyerUpload}
          className="hidden"
          id="flyerUpload"
        />

        {flyerFileName ? (
          <div className="flex items-center gap-3 p-4 bg-secondary/50 border border-border rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{flyerFileName}</p>
              <p className="text-xs text-muted-foreground">Flyer attached</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {flyerPreview && (
                <a
                  href={flyerPreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
              )}
              <button
                type="button"
                onClick={clearFlyer}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor="flyerUpload"
            className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Click to upload flyer</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG or WebP</p>
            </div>
          </label>
        )}
      </div>

      {/* ── STATUS & BADGES ── */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Status & Display</h4>
        <div className="flex flex-wrap gap-6 mb-6">
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

        <div className="space-y-2">
          <Label htmlFor="urgencyMessage" className="text-base">Urgency Badge Message</Label>
          <Input
            id="urgencyMessage"
            value={formData.urgencyMessage || ''}
            onChange={(e) => setFormData({ ...formData, urgencyMessage: e.target.value })}
            placeholder="e.g., Only 3 spots left!, SOLD OUT, WAITLIST ONLY, Airfare included!"
            className="h-12"
          />
        </div>
      </div>

      {/* ── IMAGES ── */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">Images (up to 3)</h4>
        <div className="space-y-3">
          {[0, 1, 2].map((index) => (
            <div key={index} className="space-y-1">
              <Label className="text-sm text-muted-foreground">Image {index + 1} URL {index === 0 && <span className="text-foreground">(required)</span>}</Label>
              <Input
                value={formData.images[index] || ''}
                onChange={(e) => updateImage(index, e.target.value)}
                placeholder={`https://images.unsplash.com/...`}
                className="h-12"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIONS ── */}
      <div className="flex justify-end gap-4 pt-4 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel} className="h-12 px-6">
          Cancel
        </Button>
        <Button type="submit" className="h-12 px-8">
          {trip ? 'Update Trip' : 'Add Trip'}
        </Button>
      </div>
    </form>
  );
};

export default TripForm;
