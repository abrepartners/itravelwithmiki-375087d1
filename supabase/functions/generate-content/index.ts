import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const {
      tripName,
      destination,
      departureDate,
      category,
      price,
      description,
      flyerUrl,
      flyerText,
      contentType,
    } = await req.json();

    const tripContext = [
      `Trip: ${tripName}`,
      `Destination: ${destination}`,
      departureDate ? `Departure: ${departureDate}` : null,
      category ? `Category: ${category}` : null,
      price ? `Price: $${price}` : null,
      description ? `Description: ${description}` : null,
      flyerUrl ? `Flyer image URL (for reference): ${flyerUrl}` : null,
      flyerText ? `Flyer details:\n${flyerText}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const systemPrompt = `You are a travel marketing copywriter for "iTravelWithMiki", a premium group travel brand. Miki organizes curated trips (river cruises, ocean cruises, land tours, bus trips). The brand voice is warm, exciting, aspirational, and personal — like a well-traveled friend sharing an amazing opportunity. Use emojis tastefully for social media. Keep content engaging and action-oriented with clear calls to action.`;

    let userPrompt: string;

    if (contentType === "all") {
      userPrompt = `Generate ALL of the following marketing content for this trip:\n\n${tripContext}\n\nReturn a JSON object with these exact keys:\n- "instagram": An Instagram caption (engaging, with hashtags, emojis, under 2200 chars)\n- "facebook": A Facebook post (slightly longer, conversational, with a CTA)\n- "email_subject": Email subject line (compelling, under 60 chars)\n- "email_body": Email body (HTML-friendly, warm greeting, trip highlights, CTA button text, sign-off from Miki)\n- "sms": SMS text (under 160 chars, urgent/exciting, with a link placeholder [LINK])\n- "calendar": A 4-week content calendar as a markdown table with columns: Week, Platform, Post Type, Content Summary, Best Time to Post\n\nReturn ONLY valid JSON, no markdown fences.`;
    } else {
      const prompts: Record<string, string> = {
        instagram: `Write an Instagram caption for this trip:\n\n${tripContext}\n\nMake it engaging with relevant emojis and hashtags. Under 2200 characters. Include a call to action.`,
        facebook: `Write a Facebook post for this trip:\n\n${tripContext}\n\nMake it conversational, slightly longer than Instagram, with a compelling CTA. Include relevant emojis.`,
        email: `Write a marketing email for this trip:\n\n${tripContext}\n\nReturn a JSON object with "subject" (under 60 chars, compelling) and "body" (warm greeting, trip highlights with bullet points, CTA, sign-off from Miki). Return ONLY valid JSON, no markdown fences.`,
        sms: `Write an SMS marketing text for this trip:\n\n${tripContext}\n\nKeep it under 160 characters. Make it urgent and exciting. Use [LINK] as placeholder for the booking link.`,
        calendar: `Create a 4-week social media content calendar for promoting this trip:\n\n${tripContext}\n\nFormat as a markdown table with columns: Week, Platform (Instagram/Facebook/Email/SMS), Post Type (e.g. Countdown, Testimonial, Behind-the-scenes), Content Summary, Best Time to Post.`,
      };
      userPrompt = prompts[contentType] || prompts.instagram;
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited — please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Add funds in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI generation failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content ?? "";

    // For 'all' and 'email', try to parse JSON from the response
    if (contentType === "all" || contentType === "email") {
      try {
        const cleaned = rawContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const parsed = JSON.parse(cleaned);
        return new Response(JSON.stringify({ result: parsed, contentType }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch {
        // If JSON parsing fails, return raw content
        return new Response(JSON.stringify({ result: rawContent, contentType }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    return new Response(JSON.stringify({ result: rawContent, contentType }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-content error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
