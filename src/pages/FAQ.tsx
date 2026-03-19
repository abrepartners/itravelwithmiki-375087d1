import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const FAQ = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Frequently Asked Questions — iTravelWithMiki"
        description="Find answers to common questions about booking, payments, trip details, packing, travel insurance, and more with iTravelWithMiki."
        canonical="https://itravelwithmiki.lovable.app/faq"
      />
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-28 pb-20 px-6 lg:px-12 overflow-hidden"
        style={{ background: 'linear-gradient(150deg, hsl(221 83% 28%) 0%, hsl(221 83% 38%) 100%)' }}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.10] blur-[120px] pointer-events-none"
          style={{ background: 'hsl(0 0% 100%)' }} />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(hsl(0 0% 100% / 1) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs tracking-[0.2em] uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              Got Questions?
            </div>
            <h1
              className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold mb-5 text-white leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Frequently Asked
              <br />
              <span className="italic font-normal text-white/60">Questions</span>
            </h1>
            <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
              Everything you need to know about traveling with Miki and the family.
            </p>
          </motion.div>
        </div>
      </section>

      <FAQSection compact={false} showHeader={false} />
      <Footer />
    </main>
  );
};

export default FAQ;
