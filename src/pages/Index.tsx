import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BentoGrid from '@/components/BentoGrid';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BentoGrid />
      <Footer />
    </main>
  );
};

export default Index;
