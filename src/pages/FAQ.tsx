import Navbar from '@/components/Navbar';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const FAQ = () => {
  return (
    <main className="min-h-screen">
      <SEOHead
        title="Frequently Asked Questions — iTravelWithMiki"
        description="Find answers to common questions about booking, payments, trip details, packing, travel insurance, and more with iTravelWithMiki."
        canonical="https://itravelwithmiki.lovable.app/faq"
      />
      <Navbar />
      <div className="pt-24 container mx-auto px-6 lg:px-12">
        <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      </div>
      <div>
        <FAQSection compact={false} showHeader={true} />
      </div>
      <Footer />
    </main>
  );
};

export default FAQ;
