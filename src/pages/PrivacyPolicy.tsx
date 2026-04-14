import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6 lg:px-12 bg-gradient-to-b from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1
            className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Privacy Policy
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
                Introduction
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                iTravelWithMiki ("we," "our," or "us") is committed to protecting the privacy of our travelers and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, book a trip, or interact with us in any way. Please read this policy carefully. By using our website or services, you consent to the practices described in this policy.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Information We Collect
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-3">
                We may collect information about you in a variety of ways, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground text-base leading-relaxed space-y-2">
                <li><strong className="text-foreground">Personal Data:</strong> Name, email address, phone number, mailing address, date of birth, passport information, emergency contact details, and other information you provide when booking a trip or contacting us.</li>
                <li><strong className="text-foreground">Payment Information:</strong> Credit card numbers and billing information processed through our secure third-party payment processors. We do not store full payment card details on our servers.</li>
                <li><strong className="text-foreground">Travel Preferences:</strong> Dietary requirements, mobility needs, roommate preferences, and other travel-related information you share with us.</li>
                <li><strong className="text-foreground">Website Usage Data:</strong> IP address, browser type, operating system, pages visited, time spent on pages, and other analytical data collected through cookies and similar technologies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground text-base leading-relaxed space-y-2">
                <li>To process and manage your trip bookings and reservations</li>
                <li>To communicate with you about upcoming trips, itinerary changes, and travel updates</li>
                <li>To send promotional emails about new trips and special offers (you may opt out at any time)</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To share necessary information with tour operators, hotels, and transportation providers to fulfill your booking</li>
                <li>To improve our website, services, and customer experience</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Information Sharing
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We may share your information with trusted third parties who assist us in operating our business, including tour operators (such as Diamond Tours and Grand Circle Travel), hotels, airlines, travel insurance providers, and payment processors. These parties are obligated to keep your information confidential and use it only for the purposes for which it was shared. We do not sell your personal information to third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Cookies and Tracking
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies help us understand how visitors use our site, remember your preferences, and improve our services. You can control cookie settings through your browser preferences. Disabling cookies may limit some features of our website.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Data Security
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We implement reasonable administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Your Rights
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                You may request access to, correction of, or deletion of your personal information at any time by contacting us. You may also opt out of receiving marketing communications by following the unsubscribe instructions in our emails or by contacting us directly.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Children's Privacy
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a minor, please contact us so we can promptly delete it.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Changes to This Policy
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Contact Us
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicy;
