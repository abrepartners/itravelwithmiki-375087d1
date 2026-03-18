import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedTrips from '@/components/FeaturedTrips';
import HowItWorks from '@/components/HowItWorks';
import AboutMiki from '@/components/AboutMiki';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedTrips />
      <HowItWorks />
      <AboutMiki />
      <FAQSection compact={true} showHeader={true} />
      <Footer />
    </main>
  );
};

export default Index;
