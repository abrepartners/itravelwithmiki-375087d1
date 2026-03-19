import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContentRequest {
  tripName: string;
  destination: string;
  departureDate: string;
  price: number;
  singlePrice?: number;
  description?: string;
  operator?: string;
  flyerUrl?: string;
  flyerText?: string; // If user pastes text instead of uploading image
}

interface GeneratedContent {
  instagram: string;
  facebook: string;
  emailSubject: string;
  emailBody: string;
  sms: string;
  calendar: CalendarEntry[];
}

interface CalendarEntry {
  week: number;
  day: string;
  platform: string;
  contentType: string;
  suggestion: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiKey) {
      throw new Error("OPENAI_API_KEY not configured in Supabase secrets");
    }

    const body: ContentRequest = await req.json();
    const { tripName, destination, departureDate, price, singlePrice, description, operator, flyerUrl, flyerText } = body;

    // Build the trip context
    const priceInfo = singlePrice
      ? `$${price.toLocaleString()} double/shared, $${singlePrice.toLocaleString()} single occupancy`
      : `$${price.toLocaleString()} per person`;

    const tripContext = `
Trip Name: ${tripName}
Destination: ${destination}
Departure Date: ${departureDate}
Price: ${priceInfo}
${operator ? `Tour Operator: ${operator}` : ""}
${description ? `Description: ${description}` : ""}
${flyerText ? `\nFlyer Content:\n${flyerText}` : ""}
    `.trim();

    // Build messages array — include flyer image if URL provided
    const messages: any[] = [
      {
        role: "system",
        content: `You are a social media marketing expert for iTravel with Miki, a curated group travel company based in Maumelle, Arkansas. The brand voice is warm, family-oriented, and community-focused. The target audience is travelers aged 50+ who love group travel experiences. Miki is the host and has been leading group trips for 15+ years.

Generate marketing content for the following trip. Return ONLY valid JSON with this exact structure:
{
  "instagram": "Instagram caption with relevant emoji and 8-10 hashtags at the end. 150-200 words. Warm, aspirational tone. Include a call-to-action.",
  "facebook": "Facebook post, 200-300 words. Community-focused, conversational, mention the iTravel family. Include trip highlights and a booking CTA.",
  "emailSubject": "Email subject line, max 50 characters. Create urgency or curiosity.",
  "emailBody": "Email body, 250-350 words. Professional but warm. Include trip highlights, pricing, dates, and a clear Book Now CTA. Format with short paragraphs.",
  "sms": "SMS text, max 160 characters. Direct, urgent, include trip name and CTA.",
  "calendar": [
    {"week": 1, "day": "Monday", "platform": "Instagram", "contentType": "Teaser Post", "suggestion": "Brief description of what to post"},
    {"week": 1, "day": "Wednesday", "platform": "Facebook", "contentType": "Announcement", "suggestion": "Brief description"},
    {"week": 1, "day": "Friday", "platform": "Email", "contentType": "Newsletter Feature", "suggestion": "Brief description"},
    {"week": 2, "day": "Monday", "platform": "Instagram", "contentType": "Story/Reel", "suggestion": "Brief description"},
    {"week": 2, "day": "Thursday", "platform": "Facebook", "contentType": "Photo Album", "suggestion": "Brief description"},
    {"week": 3, "day": "Tuesday", "platform": "Instagram", "contentType": "Countdown Post", "suggestion": "Brief description"},
    {"week": 3, "day": "Wednesday", "platform": "SMS", "contentType": "Text Blast", "suggestion": "Brief description"},
    {"week": 3, "day": "Saturday", "platform": "Facebook", "contentType": "Testimonial/Review", "suggestion": "Brief description"},
    {"week": 4, "day": "Monday", "platform": "Email", "contentType": "Last Chance Email", "suggestion": "Brief description"},
    {"week": 4, "day": "Wednesday", "platform": "Instagram", "contentType": "Final CTA", "suggestion": "Brief description"},
    {"week": 4, "day": "Friday", "platform": "Facebook", "contentType": "Urgency Post", "suggestion": "Brief description"},
    {"week": 4, "day": "Friday", "platform": "SMS", "contentType": "Final Reminder", "suggestion": "Brief description"}
  ]
}

Do NOT include any text outside the JSON. Do NOT wrap in markdown code blocks.`
      }
    ];

    // If flyer image URL provided, use vision
    if (flyerUrl) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: `Here is the trip information and flyer image. Read the flyer carefully and extract any additional details (highlights, inclusions, itinerary stops, special features) to enrich the marketing content.\n\n${tripContext}`
          },
          {
            type: "image_url",
            image_url: { url: flyerUrl, detail: "high" }
          }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: `Generate marketing content for this trip:\n\n${tripContext}`
      });
    }

    // Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages,
        temperature: 0.8,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const rawContent = data.choices[0].message.content.trim();

    // Parse the JSON response
    let generatedContent: GeneratedContent;
    try {
      // Strip markdown code blocks if present
      const cleaned = rawContent.replace(/^```json?\n?/i, "").replace(/\n?```$/i, "").trim();
      generatedContent = JSON.parse(cleaned);
    } catch (parseError) {
      throw new Error(`Failed to parse AI response: ${parseError.message}\n\nRaw: ${rawContent.substring(0, 500)}`);
    }

    return new Response(JSON.stringify(generatedContent), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in generate-content:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
