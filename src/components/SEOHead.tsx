import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
}

/**
 * Sets document title and meta description for interior pages.
 */
const SEOHead = ({ title, description, canonical }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', description);
      document.head.appendChild(metaDesc);
    }

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (link) {
        link.href = canonical;
      } else {
        link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonical;
        document.head.appendChild(link);
      }
    }

    return () => {
      document.title = 'iTravelWithMiki - Travel with Family, Not Strangers';
    };
  }, [title, description, canonical]);

  return null;
};

export default SEOHead;
