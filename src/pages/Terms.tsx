import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6 lg:px-12 bg-gradient-to-b from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1
            className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Terms of Service
          </h1>
          <p className="text-primary-foreground/80 text-body-lg max-w-2xl mx-auto">
            Last updated: April 14, 2026
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-lg max-w-none text-foreground space-y-8">
            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Agreement to Terms
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                By accessing our website or booking a trip through iTravelWithMiki, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services. iTravelWithMiki operates as a travel coordinator and booking agent based in Little Rock, Arkansas.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Services Provided
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                iTravelWithMiki acts as an independent travel coordinator, organizing group bus trips (operated by Diamond Tours), river cruises, ocean cruises, and international land trips (operated by partners such as Grand Circle Travel and Gate 1). We facilitate bookings on your behalf but are not the direct provider of transportation, accommodations, or tour services. The actual travel services are provided by our partner operators, and their own terms and conditions also apply to your booking.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Booking and Payment
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground text-base leading-relaxed space-y-2">
                <li>All trip prices are listed in U.S. dollars and are per person unless otherwise noted.</li>
                <li>Prices for bus trips typically reflect double occupancy. Single occupancy rates are available where noted.</li>
                <li>A deposit may be required to secure your reservation. Deposit amounts and deadlines vary by trip and will be communicated at the time of booking.</li>
                <li>Final payment is due by the deadline specified for each trip. Failure to pay by the deadline may result in cancellation of your reservation.</li>
                <li>Prices are subject to change until full payment is received.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Cancellation and Refund Policy
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-3">
                Cancellation policies vary depending on the trip type and tour operator. In general:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground text-base leading-relaxed space-y-2">
                <li><strong className="text-foreground">Bus Trips (Diamond Tours):</strong> Cancellations must be made in writing. Refunds are subject to Diamond Tours' cancellation policy, which typically includes penalties that increase as the departure date approaches.</li>
                <li><strong className="text-foreground">International Trips and Cruises:</strong> Cancellation policies are set by the respective tour operator (Grand Circle, Gate 1, etc.) and will be provided with your booking confirmation.</li>
                <li><strong className="text-foreground">Travel Insurance:</strong> We strongly recommend purchasing travel insurance at the time of booking to protect your investment against unexpected cancellations. See our <a href="/support#insurance" className="text-primary hover:underline">Support page</a> for recommended providers.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Traveler Responsibilities
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground text-base leading-relaxed space-y-2">
                <li>You are responsible for ensuring you have valid identification and travel documents (passport, visa, etc.) required for your trip.</li>
                <li>You must inform us of any medical conditions, dietary restrictions, or mobility requirements that may affect your travel experience.</li>
                <li>You are expected to behave respectfully toward fellow travelers, tour guides, and service staff at all times.</li>
                <li>You are responsible for your personal belongings throughout the trip.</li>
                <li>You must arrive at designated departure points on time. iTravelWithMiki and its partner operators are not responsible for travelers who miss departures.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Limitation of Liability
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                iTravelWithMiki acts solely as a travel coordinator and agent. We are not liable for any injury, damage, loss, delay, or irregularity that may occur during your trip due to the acts or omissions of hotels, airlines, bus companies, cruise lines, tour operators, or other service providers. We are not responsible for changes to itineraries due to weather, political conditions, mechanical breakdowns, or other circumstances beyond our control. Our liability is limited to the fees paid directly to iTravelWithMiki for our coordination services.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Trip Changes and Cancellations by iTravelWithMiki
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We reserve the right to cancel or modify a trip due to insufficient enrollment, safety concerns, or circumstances beyond our control. In such cases, we will offer you an alternative trip or a full refund of payments made. We are not responsible for additional expenses you may have incurred, such as airfare or other travel arrangements made independently.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Photos and Media
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                By participating in an iTravelWithMiki trip, you grant us permission to use photographs and videos taken during the trip for promotional purposes on our website, social media, and marketing materials. If you prefer not to be photographed, please inform us in writing before the trip.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Intellectual Property
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                All content on the iTravelWithMiki website, including text, images, logos, and design elements, is the property of iTravelWithMiki and is protected by copyright law. You may not reproduce, distribute, or use any content from our website without prior written permission.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Governing Law
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                These Terms of Service are governed by the laws of the State of Arkansas. Any disputes arising from these terms or your use of our services shall be resolved in the courts of Pulaski County, Arkansas.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Changes to These Terms
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We may update these Terms of Service from time to time. Changes will be posted on this page with an updated revision date. Continued use of our website or services after changes are posted constitutes your acceptance of the revised terms.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Contact Us
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none text-muted-foreground text-base leading-relaxed mt-3 space-y-1">
                <li>Email: <a href="mailto:info@itravelwithmiki.com" className="text-primary hover:underline">info@itravelwithmiki.com</a></li>
                <li>Phone: <a href="tel:+15017993820" className="text-primary hover:underline">(501) 799-3820</a></li>
                <li>Mail: P.O. Box 13993, Little Rock, AR 72113</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Terms;
