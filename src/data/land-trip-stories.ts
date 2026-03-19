import type { LandTripStory } from '@/types/land-trip';

export const landTripStories: Record<string, LandTripStory> = {
  'alpine-europe-2026': {
    overview:
      'A scenic fall journey through Italy, Switzerland, Austria, and Germany with a hosted-group feel and a stronger onsite story before any booking handoff.',
    highlights: [
      'Italian Lakes, alpine rail scenery, and storybook villages.',
      'Signature small-group moments including farm, winery, and local cultural stops.',
      'A comfort-first pace designed for memory-making, not rushing.',
    ],
    included: [
      'Hosted group support and curated touring.',
      'Thoughtful transportation, hotel flow, and shared experiences.',
      'A trip page that answers the “what does this feel like?” question onsite.',
    ],
    travelNotes: [
      'Best for travelers comfortable with moderate walking.',
      'Layered clothing is smart for changing mountain weather.',
      'Reach out early if you want help comparing flights or insurance.',
    ],
    preview: [
      { title: 'Italian Lakes', items: ['Ease into the trip with lakeside views and welcoming group energy.'] },
      { title: 'Swiss Alps', items: ['Expect classic mountain scenery, charming towns, and unforgettable vistas.'] },
      { title: 'Austria & Beyond', items: ['Close with culture-rich stops and polished hosted travel pacing.'] },
    ],
  },
  'ireland-2027': {
    overview:
      'An immersive Ireland itinerary built around scenery, hospitality, and enough onsite context for travelers to picture the rhythm of the trip before leaving the site.',
    highlights: [
      'Dublin, Kilkenny, Cork, Killarney, Galway, and iconic countryside views.',
      'A blend of celebrated landmarks and warm local connection.',
      'Hosted travel with a familiar, family-style atmosphere.',
    ],
    included: [
      'Guided sightseeing with room for relaxed discovery.',
      'A community-oriented hosted group environment.',
      'Clear next-step guidance before any offline or external booking follow-up.',
    ],
    travelNotes: [
      'Bring layers and rain-ready outerwear.',
      'A great fit for travelers who enjoy coach touring with moderate walking.',
      'Good option for guests wanting help with passports, flights, or protection coverage.',
    ],
    preview: [
      { title: 'Historic Cities', items: ['Start with architecture, history, and lively Irish city energy.'] },
      { title: 'Coastal Drama', items: ['See iconic landscapes and scenic routes that define the destination.'] },
      { title: 'Local Warmth', items: ['Enjoy the people, stories, and atmosphere that make Ireland memorable.'] },
    ],
  },
  'australia-nz-2027': {
    overview:
      'A bucket-list long-haul adventure through Australia and New Zealand, presented with enough onsite detail to build excitement and confidence before the booking conversation.',
    highlights: [
      'Headline destinations, dramatic landscapes, and high-impact touring.',
      'A curated group experience that makes a faraway trip feel approachable.',
      'A polished mix of natural wonder, city energy, and shared adventure.',
    ],
    included: [
      'Structured multi-stop itinerary with hosted support.',
      'A travel style that balances spectacle with comfort and clarity.',
      'An internal trip page built to reduce friction before next steps.',
    ],
    travelNotes: [
      'Best planned early because of flight distance and timing.',
      'Great for travelers comfortable with a fuller schedule.',
      'Ask Miki about payment planning and optional protection well in advance.',
    ],
    preview: [
      { title: 'Australia Icons', items: ['Big-sky scenery, major highlights, and memorable first impressions.'] },
      { title: 'Natural Wonders', items: ['The itinerary leans into the scale and beauty of the region.'] },
      { title: 'New Zealand Finish', items: ['Close with cinematic landscapes and reflective final moments.'] },
    ],
  },
  'italy-2026': {
    overview:
      'This sold-out trip now works as an internal showcase page so future guests can understand the style of departures Miki curates without bouncing to the legacy site.',
    highlights: [
      'Strong demand and sold-out interest signal audience trust.',
      'An example of premium, hosted European group travel.',
      'Useful as a waitlist and future-trip inspiration page.',
    ],
    included: [
      'A clear internal story for a sold-out departure.',
      'Better onsite merchandising for future related trips.',
      'A stronger path to support or waitlist follow-up.',
    ],
    travelNotes: [
      'Best for travelers interested in future Italy or Europe departures.',
      'Contact the team early if Italy is high on your wish list.',
    ],
    preview: [
      { title: 'Italy Energy', items: ['Classic scenery, shared meals, and a premium hosted-group tone.'] },
    ],
  },
  'spain-portugal-2026': {
    overview:
      'A culture-forward Iberian itinerary that now keeps the trip story onsite first, giving visitors a better sense of place, pace, and fit before any booking handoff.',
    highlights: [
      'Historic cities, coastal beauty, and memorable regional variety.',
      'A deeper, richer itinerary than a quick highlights pass.',
      'Useful both for inquiries and future waitlist-style interest.',
    ],
    included: [
      'Hosted-group guidance and curated touring rhythm.',
      'An internal page experience that supports comparison and confidence.',
      'Clear next-step options for booking or support.',
    ],
    travelNotes: [
      'Sold out status means this page mainly supports inquiry and future interest.',
      'A good benchmark for similar future cultural departures.',
    ],
    preview: [
      { title: 'Portugal', items: ['Expect elegance, charm, and local flavor early in the trip.'] },
      { title: 'Spain', items: ['Continue with iconic cities and a strong mix of history and atmosphere.'] },
    ],
  },
};
