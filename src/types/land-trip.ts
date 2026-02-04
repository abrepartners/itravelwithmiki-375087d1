export interface LandTrip {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  date_display: string;
  sub_description: string;
  status: "Active" | "Sold out, waitlist only";
  learn_more_link: string;
  booking_link: string | null;
  images: string[];
}
