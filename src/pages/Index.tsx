import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedTrips from '@/components/FeaturedTrips';
import AboutMickey from '@/components/AboutMickey';
import Footer from '@/components/Footer';
import EmailPopup from '@/components/EmailPopup';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedTrips />
      <AboutMickey />
      <Footer />
      <EmailPopup />
    </main>
  );
};

export default Index;
