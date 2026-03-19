export interface LandTripHighlightSection {
  title: string;
  items: string[];
}

export interface LandTripDetail {
  overview: string;
  signatureMoments: string[];
  perfectFor: string[];
  included: string[];
  itineraryPreview: LandTripHighlightSection[];
  planningNotes: string[];
}

export interface LandTrip {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  date_display: string;
  sub_description: string;
  status: "Active" | "Sold out, waitlist only";
  booking_link: string | null;
  images: string[];
  detail: LandTripDetail;
}

export interface LandTripStorySection {
  title: string;
  items: string[];
}

export interface LandTripStory {
  overview: string;
  highlights: string[];
  included: string[];
  travelNotes: string[];
  preview: LandTripStorySection[];
}
