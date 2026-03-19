import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const FAQ = () => {
  return (
    <main className="min-h-screen">
      <SEOHead
        title="Frequently Asked Questions — iTravelWithMiki"
        description="Find answers to common questions about booking, payments, trip details, packing, travel insurance, and more with iTravelWithMiki."
        canonical="https://itravelwithmiki.lovable.app/faq"
      />
      <Navbar />

      {/* Gradient Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-12 bg-gradient-to-b from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-semibold tracking-widest uppercase mb-6">
              <HelpCircle className="w-4 h-4" />
              Knowledge Base
            </span>
            <h1
              className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Frequently Asked Questions
            </h1>
            <p className="text-primary-foreground/80 text-body-lg max-w-2xl mx-auto">
              Everything you need to know about traveling with Miki — from booking to boarding.
            </p>
          </motion.div>
        </div>
      </section>

      <div>
        <FAQSection compact={false} showHeader={false} />
      </div>
      <Footer />
    </main>
  );
};

export default FAQ;
