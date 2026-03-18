/**
 * Organization + LocalBusiness JSON-LD schema for SEO.
 * Rendered once in the app (Index page).
 */
const OrganizationSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['TravelAgency', 'LocalBusiness'],
    name: 'iTravelWithMiki',
    url: 'https://itravelwithmiki.lovable.app',
    logo: 'https://itravelwithmiki.lovable.app/og-image.png',
    image: 'https://itravelwithmiki.lovable.app/og-image.png',
    description:
      'Unforgettable group adventures designed for travelers aged 50+ who love to explore, connect, and create lasting memories together.',
    telephone: '+1-501-951-1749',
    email: 'info@itravelwithmiki.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'P.O. Box 13993',
      addressLocality: 'Little Rock',
      addressRegion: 'AR',
      postalCode: '72113',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.7465,
      longitude: -92.2896,
    },
    areaServed: 'US',
    foundingDate: '2009',
    founder: {
      '@type': 'Person',
      name: 'Miki',
    },
    sameAs: [
      'https://www.facebook.com/itravelwithmiki',
      'https://www.instagram.com/itravelwithmiki',
    ],
    priceRange: '$$',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default OrganizationSchema;
