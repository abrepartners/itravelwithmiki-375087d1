import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Accessibility = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-6 lg:px-12 bg-gradient-to-b from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1
            className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Accessibility Statement
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
                Our Commitment
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                iTravelWithMiki is committed to ensuring that our website and travel services are accessible to all individuals, including those with disabilities. We strive to provide an inclusive digital experience and continually work to improve the accessibility and usability of our website in accordance with applicable standards and guidelines.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Standards We Follow
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines help make web content more accessible to people with a wide range of disabilities, including visual, auditory, motor, and cognitive impairments.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Accessibility Features
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-3">
                Our website includes the following accessibility features:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground text-base leading-relaxed space-y-2">
                <li>Descriptive alt text for images throughout the site</li>
                <li>Clear heading structure for easy navigation with screen readers</li>
                <li>Sufficient color contrast ratios for text readability</li>
                <li>Keyboard-navigable interactive elements, including menus and buttons</li>
                <li>Responsive design that adapts to various screen sizes and zoom levels</li>
                <li>Clearly labeled form fields and interactive controls</li>
                <li>ARIA attributes where appropriate to enhance screen reader compatibility</li>
              </ul>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Travel Accessibility
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-3">
                We understand that accessibility extends beyond the website to the travel experience itself. We work with our travelers and tour partners to accommodate a range of needs:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground text-base leading-relaxed space-y-2">
                <li>Wheelchair-accessible motorcoaches are available on many Diamond Tours bus trips upon advance request</li>
                <li>Accessible cabin options are available on most cruise itineraries</li>
                <li>We are happy to discuss mobility considerations, dietary needs, and other accommodations before you book</li>
                <li>Our team can help connect you with the right trip based on your specific accessibility requirements</li>
              </ul>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Known Limitations
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                While we strive to make all areas of our website fully accessible, some content may not yet fully meet all accessibility standards. We are actively working to identify and address these areas. If you encounter any content that is not accessible to you, please let us know so we can assist you and work to improve the experience.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Feedback and Assistance
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Your feedback is important to us. If you experience any difficulty accessing our website or need assistance with any part of our site, please contact us. We are happy to help and will do our best to provide the information you need in an accessible format.
              </p>
              <ul className="list-none text-muted-foreground text-base leading-relaxed mt-3 space-y-1">
                <li>Email: <a href="mailto:info@itravelwithmiki.com" className="text-primary hover:underline">info@itravelwithmiki.com</a></li>
                <li>Phone: <a href="tel:+15017993820" className="text-primary hover:underline">(501) 799-3820</a></li>
                <li>Mail: P.O. Box 13993, Little Rock, AR 72113</li>
              </ul>
              <p className="text-muted-foreground text-base leading-relaxed mt-4">
                When contacting us about an accessibility issue, please include the URL of the page and a description of the problem so we can address it promptly.
              </p>
            </div>

            <div>
              <h2 className="text-heading-md font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Continuous Improvement
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Accessibility is an ongoing effort for iTravelWithMiki. We regularly review our website and processes to identify opportunities for improvement. We are committed to making travel accessible and enjoyable for everyone in our iTravel family.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Accessibility;
