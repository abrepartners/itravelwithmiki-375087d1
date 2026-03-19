import { useState } from 'react';
import { Loader2, Sparkles, Instagram, Facebook, Mail, MessageSquare, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { tripStore } from '@/stores/tripStore';
import { contentStore, type ContentItem } from '@/stores/contentStore';
import ContentCard from './ContentCard';
import { toast } from 'sonner';

type ContentType = 'instagram' | 'facebook' | 'email' | 'sms' | 'calendar' | 'all';

const CONTENT_TYPES: { value: ContentType; label: string; icon: React.ReactNode }[] = [
  { value: 'all', label: 'Generate All', icon: <Sparkles className="w-4 h-4" /> },
  { value: 'instagram', label: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
  { value: 'facebook', label: 'Facebook', icon: <Facebook className="w-4 h-4" /> },
  { value: 'email', label: 'Email Blast', icon: <Mail className="w-4 h-4" /> },
  { value: 'sms', label: 'SMS', icon: <MessageSquare className="w-4 h-4" /> },
  { value: 'calendar', label: 'Content Calendar', icon: <CalendarDays className="w-4 h-4" /> },
];

const ContentStudio = () => {
  const trips = tripStore.getTrips();
  const [selectedTripId, setSelectedTripId] = useState<string>('manual');
  const [manualName, setManualName] = useState('');
  const [manualDestination, setManualDestination] = useState('');
  const [manualDate, setManualDate] = useState('');
  const [manualDescription, setManualDescription] = useState('');
  const [flyerUrl, setFlyerUrl] = useState('');
  const [flyerText, setFlyerText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ContentItem[]>([]);
  const [history, setHistory] = useState<ContentItem[]>(contentStore.getItems());

  const selectedTrip = trips.find((t) => t.id === selectedTripId);

  const getTripData = () => {
    if (selectedTrip) {
      return {
        tripName: selectedTrip.name,
        destination: selectedTrip.destination,
        departureDate: selectedTrip.departureDate,
        category: selectedTrip.category,
        price: selectedTrip.price,
        description: selectedTrip.description,
      };
    }
    return {
      tripName: manualName,
      destination: manualDestination,
      departureDate: manualDate,
      description: manualDescription,
    };
  };

  const generate = async (contentType: ContentType) => {
    const tripData = getTripData();
    if (!tripData.tripName || !tripData.destination) {
      toast.error('Please select a trip or enter trip name and destination');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { ...tripData, flyerUrl: flyerUrl || undefined, flyerText: flyerText || undefined, contentType },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const result = data.result;
      const now = new Date().toISOString();
      const newItems: ContentItem[] = [];

      if (contentType === 'all' && typeof result === 'object') {
        if (result.instagram) {
          newItems.push({ id: crypto.randomUUID(), tripName: tripData.tripName, destination: tripData.destination, contentType: 'instagram', content: result.instagram, createdAt: now });
        }
        if (result.facebook) {
          newItems.push({ id: crypto.randomUUID(), tripName: tripData.tripName, destination: tripData.destination, contentType: 'facebook', content: result.facebook, createdAt: now });
        }
        if (result.email_subject || result.email_body) {
          newItems.push({ id: crypto.randomUUID(), tripName: tripData.tripName, destination: tripData.destination, contentType: 'email', content: result.email_body ?? '', subject: result.email_subject ?? '', createdAt: now });
        }
        if (result.sms) {
          newItems.push({ id: crypto.randomUUID(), tripName: tripData.tripName, destination: tripData.destination, contentType: 'sms', content: result.sms, createdAt: now });
        }
        if (result.calendar) {
          newItems.push({ id: crypto.randomUUID(), tripName: tripData.tripName, destination: tripData.destination, contentType: 'calendar', content: result.calendar, createdAt: now });
        }
      } else if (contentType === 'email' && typeof result === 'object') {
        newItems.push({ id: crypto.randomUUID(), tripName: tripData.tripName, destination: tripData.destination, contentType: 'email', content: result.body ?? result.email_body ?? String(result), subject: result.subject ?? result.email_subject ?? '', createdAt: now });
      } else {
        newItems.push({ id: crypto.randomUUID(), tripName: tripData.tripName, destination: tripData.destination, contentType: contentType === 'all' ? 'instagram' : contentType, content: String(result), createdAt: now });
      }

      newItems.forEach((item) => contentStore.addItem(item));
      setResults(newItems);
      setHistory(contentStore.getItems());
      toast.success(`Generated ${newItems.length} content piece${newItems.length > 1 ? 's' : ''}`);
    } catch (e: any) {
      console.error('Generation error:', e);
      toast.error(e.message || 'Content generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (id: string, updates: Partial<ContentItem>) => {
    contentStore.updateItem(id, updates);
    setResults((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)));
    setHistory(contentStore.getItems());
  };

  const handleDelete = (id: string) => {
    contentStore.deleteItem(id);
    setResults((prev) => prev.filter((i) => i.id !== id));
    setHistory(contentStore.getItems());
  };

  return (
    <div className="space-y-8">
      {/* Generator Section */}
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 space-y-6">
        <div>
          <h2 className="text-heading-md font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
            Content Studio
          </h2>
          <p className="text-muted-foreground mt-1">Generate marketing content for your trips using AI.</p>
        </div>

        {/* Trip Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select Trip</label>
            <Select value={selectedTripId} onValueChange={setSelectedTripId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a trip or enter manually" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">✏️ Enter manually</SelectItem>
                {trips.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTripId === 'manual' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Trip Name *</label>
                <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={manualName} onChange={(e) => setManualName(e.target.value)} placeholder="e.g. Danube River Cruise" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Destination *</label>
                <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={manualDestination} onChange={(e) => setManualDestination(e.target.value)} placeholder="e.g. Budapest, Vienna, Prague" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Departure Date</label>
                <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={manualDate} onChange={(e) => setManualDate(e.target.value)} placeholder="e.g. October 15, 2025" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea value={manualDescription} onChange={(e) => setManualDescription(e.target.value)} placeholder="Trip highlights, included amenities, etc." className="min-h-[80px]" />
              </div>
            </>
          )}
        </div>

        {/* Optional Flyer Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Flyer Image URL <span className="text-muted-foreground">(optional)</span></label>
            <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={flyerUrl} onChange={(e) => setFlyerUrl(e.target.value)} placeholder="https://example.com/flyer.jpg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Paste Flyer Text <span className="text-muted-foreground">(optional)</span></label>
            <Textarea value={flyerText} onChange={(e) => setFlyerText(e.target.value)} placeholder="Paste flyer details, itinerary text, etc." className="min-h-[80px]" />
          </div>
        </div>

        {/* Generate Buttons */}
        <div className="flex flex-wrap gap-2">
          {CONTENT_TYPES.map((ct) => (
            <Button
              key={ct.value}
              onClick={() => generate(ct.value)}
              disabled={loading}
              variant={ct.value === 'all' ? 'default' : 'outline'}
              className="gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : ct.icon}
              {ct.label}
            </Button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center gap-3 text-muted-foreground py-4">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating content with AI...</span>
          </div>
        )}
      </div>

      {/* Latest Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-heading-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
            Latest Generation
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {results.map((item) => (
              <ContentCard key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-heading-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Content History
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm('Clear all saved content?')) {
                  contentStore.clearAll();
                  setHistory([]);
                  setResults([]);
                }
              }}
            >
              Clear All
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {history.map((item) => (
              <ContentCard key={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentStudio;
