import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedTrips from '@/components/FeaturedTrips';
import AboutMiki from '@/components/AboutMiki';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedTrips />
      <AboutMiki />
      <Footer />
    </main>
  );
};

export default Index;
