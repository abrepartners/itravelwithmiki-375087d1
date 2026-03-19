import { useState } from 'react';
import {
  Instagram,
  Facebook,
  Mail,
  MessageSquare,
  CalendarDays,
  Sparkles,
  Upload,
  FileText,
  Loader2,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ContentCard from './ContentCard';
import type { Trip } from '@/types/trip';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface CalendarEntry {
  week: number;
  day: string;
  platform: string;
  contentType: string;
  suggestion: string;
}

interface GeneratedContent {
  instagram: string;
  facebook: string;
  emailSubject: string;
  emailBody: string;
  sms: string;
  calendar: CalendarEntry[];
}

interface ContentStudioProps {
  trips: Trip[];
}

const ContentStudio = ({ trips }: ContentStudioProps) => {
  const [mode, setMode] = useState<'trip' | 'manual'>('trip');
  const [selectedTripId, setSelectedTripId] = useState<string>('');
  const [flyerUrl, setFlyerUrl] = useState('');
  const [flyerText, setFlyerText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  // Manual mode fields
  const [manualName, setManualName] = useState('');
  const [manualDestination, setManualDestination] = useState('');
  const [manualDate, setManualDate] = useState('');
  const [manualPrice, setManualPrice] = useState('');
  const [manualDescription, setManualDescription] = useState('');

  const selectedTrip = trips.find((t) => t.id === selectedTripId);

  const handleGenerate = async () => {
    setError('');
    setGeneratedContent(null);

    // Build the request payload
    let payload: any;

    if (mode === 'trip') {
      if (!selectedTrip) {
        setError('Please select a trip first.');
        return;
      }
      payload = {
        tripName: selectedTrip.name,
        destination: selectedTrip.destination,
        departureDate: selectedTrip.departureDate,
        price: selectedTrip.price,
        singlePrice: selectedTrip.singlePrice,
        description: selectedTrip.description,
        operator: selectedTrip.operator,
        flyerUrl: flyerUrl || selectedTrip.flyerUrl || undefined,
        flyerText: flyerText || undefined,
      };
    } else {
      if (!manualName || !manualDestination) {
        setError('Please fill in at least the trip name and destination.');
        return;
      }
      payload = {
        tripName: manualName,
        destination: manualDestination,
        departureDate: manualDate || 'TBD',
        price: Number(manualPrice) || 0,
        description: manualDescription,
        flyerUrl: flyerUrl || undefined,
        flyerText: flyerText || undefined,
      };
    }

    setIsGenerating(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-content', {
        body: payload,
      });

      if (fnError) {
        throw new Error(fnError.message || 'Edge function error');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedContent(data as GeneratedContent);
    } catch (err: any) {
      console.error('Content generation error:', err);
      setError(
        err.message ||
          'Failed to generate content. Make sure the OPENAI_API_KEY is set in Supabase secrets.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const weekColors = [
    'bg-blue-50 border-blue-200',
    'bg-purple-50 border-purple-200',
    'bg-emerald-50 border-emerald-200',
    'bg-amber-50 border-amber-200',
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2
          className="text-heading-md font-semibold text-foreground"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Content Studio
        </h2>
        <p className="text-muted-foreground mt-1">
          Upload a flyer or select a trip — AI generates social media content, email copy, and a
          4-week content calendar.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-6">
        {/* Mode Toggle */}
        <div className="flex gap-3">
          <Button
            variant={mode === 'trip' ? 'default' : 'outline'}
            onClick={() => setMode('trip')}
            className="gap-2"
          >
            <FileText className="w-4 h-4" />
            From Existing Trip
          </Button>
          <Button
            variant={mode === 'manual' ? 'default' : 'outline'}
            onClick={() => setMode('manual')}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Manual / Flyer Only
          </Button>
        </div>

        {/* Trip Selector */}
        {mode === 'trip' && (
          <div className="space-y-2">
            <Label className="text-base">Select Trip</Label>
            <Select value={selectedTripId} onValueChange={setSelectedTripId}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Choose a trip to generate content for..." />
              </SelectTrigger>
              <SelectContent>
                {trips.map((trip) => (
                  <SelectItem key={trip.id} value={trip.id}>
                    {trip.name} — {trip.destination} ({trip.departureDate})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTrip && (
              <div className="mt-3 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                <strong>{selectedTrip.name}</strong> · {selectedTrip.destination} ·{' '}
                {selectedTrip.departureDate} · ${selectedTrip.price.toLocaleString()}
                {selectedTrip.flyerUrl && (
                  <span className="ml-2 text-xs text-green-600 font-medium">
                    ✓ Flyer attached
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Manual Mode Fields */}
        {mode === 'manual' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base">Trip Name *</Label>
              <Input
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="e.g., Grand Canyon Adventure 2026"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-base">Destination *</Label>
              <Input
                value={manualDestination}
                onChange={(e) => setManualDestination(e.target.value)}
                placeholder="e.g., Arizona"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-base">Departure Date</Label>
              <Input
                value={manualDate}
                onChange={(e) => setManualDate(e.target.value)}
                placeholder="e.g., Oct 15-22, 2026"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-base">Price ($)</Label>
              <Input
                type="number"
                value={manualPrice}
                onChange={(e) => setManualPrice(e.target.value)}
                placeholder="e.g., 1895"
                className="h-12"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label className="text-base">Description / Key Details</Label>
              <Textarea
                value={manualDescription}
                onChange={(e) => setManualDescription(e.target.value)}
                placeholder="Paste any trip details, highlights, inclusions, etc."
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Flyer Input — available in both modes */}
        <div className="border-t border-border pt-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Flyer (Optional — AI will read it for extra details)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">Flyer Image/PDF URL</Label>
              <Input
                value={flyerUrl}
                onChange={(e) => setFlyerUrl(e.target.value)}
                placeholder="https://... (paste URL of uploaded flyer image)"
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                Upload the flyer to Supabase Storage or any image host, then paste the public URL
                here. AI will read the image using vision.
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Or Paste Flyer Text</Label>
              <Textarea
                value={flyerText}
                onChange={(e) => setFlyerText(e.target.value)}
                placeholder="Copy-paste the text from the flyer here if you don't have an image URL..."
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="gap-2 h-12 px-8 text-base"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Content...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate All Content
            </>
          )}
        </Button>
      </div>

      {/* Generated Content */}
      {generatedContent && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3
              className="text-heading-sm font-semibold text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Generated Content
            </h3>
            <p className="text-sm text-muted-foreground">
              Click the copy icon on any card to copy to clipboard. Edit inline before copying.
            </p>
          </div>

          {/* Social Media Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ContentCard
              title="Instagram Post"
              subtitle="Feed caption with hashtags"
              icon={<Instagram className="w-4 h-4 text-purple-600" />}
              content={generatedContent.instagram}
              platform="instagram"
            />
            <ContentCard
              title="Facebook Post"
              subtitle="Community-focused announcement"
              icon={<Facebook className="w-4 h-4 text-blue-600" />}
              content={generatedContent.facebook}
              platform="facebook"
            />
            <ContentCard
              title="Email Blast"
              subtitle={`Subject: ${generatedContent.emailSubject}`}
              icon={<Mail className="w-4 h-4 text-emerald-600" />}
              content={`Subject: ${generatedContent.emailSubject}\n\n${generatedContent.emailBody}`}
              platform="email"
            />
            <ContentCard
              title="SMS / Text Blast"
              subtitle="160 character max"
              icon={<MessageSquare className="w-4 h-4 text-amber-600" />}
              content={generatedContent.sms}
              platform="sms"
              charLimit={160}
            />
          </div>

          {/* Content Calendar */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <CalendarDays className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  4-Week Content Calendar
                </h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {generatedContent.calendar.length} posts planned
                </span>
              </div>
              {showCalendar ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {showCalendar && (
              <div className="border-t border-border p-5 space-y-4">
                {[1, 2, 3, 4].map((week) => {
                  const weekEntries = generatedContent.calendar.filter(
                    (e) => e.week === week
                  );
                  if (weekEntries.length === 0) return null;
                  return (
                    <div key={week}>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Week {week}
                      </h4>
                      <div className="space-y-2">
                        {weekEntries.map((entry, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              'flex items-start gap-4 p-3 rounded-lg border text-sm',
                              weekColors[week - 1]
                            )}
                          >
                            <div className="w-20 shrink-0 font-medium text-foreground">
                              {entry.day}
                            </div>
                            <div className="w-24 shrink-0">
                              <span
                                className={cn(
                                  'inline-block px-2 py-0.5 rounded text-xs font-medium',
                                  entry.platform === 'Instagram' &&
                                    'bg-purple-100 text-purple-700',
                                  entry.platform === 'Facebook' &&
                                    'bg-blue-100 text-blue-700',
                                  entry.platform === 'Email' &&
                                    'bg-emerald-100 text-emerald-700',
                                  entry.platform === 'SMS' &&
                                    'bg-amber-100 text-amber-700'
                                )}
                              >
                                {entry.platform}
                              </span>
                            </div>
                            <div className="flex-1">
                              <span className="font-medium text-foreground">
                                {entry.contentType}
                              </span>
                              <span className="text-muted-foreground ml-2">
                                — {entry.suggestion}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentStudio;
