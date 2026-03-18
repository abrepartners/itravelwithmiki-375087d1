import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TripTypeSelector from '@/components/TripTypeSelector';
import FeaturedTrips from '@/components/FeaturedTrips';
import HowItWorks from '@/components/HowItWorks';
import AboutMiki from '@/components/AboutMiki';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import OrganizationSchema from '@/components/OrganizationSchema';

const Index = () => {
  return (
    <main className="min-h-screen">
      <OrganizationSchema />
      <Navbar />
      <HeroSection />
      <TripTypeSelector />
      <FeaturedTrips />
      <HowItWorks />
      <AboutMiki />
      <FAQSection compact={true} showHeader={true} />
      <Footer />
    </main>
  );
};

export default Index;
