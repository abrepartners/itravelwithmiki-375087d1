import Navbar from '@/components/Navbar';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const FAQ = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <FAQSection compact={false} showHeader={true} />
      </div>
      <Footer />
    </main>
  );
};

export default FAQ;
