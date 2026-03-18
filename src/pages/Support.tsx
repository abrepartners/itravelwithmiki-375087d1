import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Download, CreditCard, Luggage, Bus, Shield, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { faqCategories, downloadableResources } from '@/data/faqs';
import { useInsuranceProviders } from '@/stores/insuranceStore';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CreditCard,
  Luggage,
  Bus,
  Shield,
  HelpCircle,
};

const Support = () => {
  const location = useLocation();
  const insuranceProviders = useInsuranceProviders();

  // Handle anchor scroll on page load
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary-foreground/80 text-sm tracking-[0.2em] uppercase font-semibold mb-4">
              Support Center
            </p>
            <h1
              className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              We're Here to Help
            </h1>
            <p className="text-primary-foreground/80 text-body-lg max-w-2xl mx-auto">
              Find answers to common questions, download helpful resources, or contact us directly.
              We want your travel experience to be worry-free!
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-heading-lg md:text-heading-xl font-semibold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-body-lg">
              Click on any question to see the answer.
            </p>
          </motion.div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => {
              const IconComponent = iconMap[category.icon];
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="bg-secondary rounded-2xl p-6 lg:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    {IconComponent && (
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <h3
                      className="text-xl font-semibold text-foreground"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {category.title}
                    </h3>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${category.title}-${faqIndex}`}
                        className="border-border"
                      >
                        <AccordionTrigger className="text-left text-base lg:text-lg font-medium text-foreground hover:no-underline py-5">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-5">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Insurance Providers Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-secondary" id="insurance">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-heading-lg md:text-heading-xl font-semibold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Travel Insurance
            </h2>
            <p className="text-muted-foreground text-body-lg">
              Protect your trip investment with comprehensive travel insurance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insuranceProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                id={`insurance-${provider.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background rounded-2xl p-6 lg:p-8 text-center scroll-mt-32"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3
                  className="text-xl font-semibold text-foreground mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {provider.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-3">{provider.subtitle}</p>
                <p className="text-muted-foreground text-sm mb-6">{provider.description}</p>
                {provider.pdfUrl && provider.pdfUrl !== '#' ? (
                  <Button asChild className="gap-2">
                    <a href={provider.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  </Button>
                ) : (
                  <p className="text-muted-foreground text-sm italic">PDF coming soon</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-heading-lg md:text-heading-xl font-semibold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Helpful Resources
            </h2>
            <p className="text-muted-foreground text-body-lg">
              Download these documents to help prepare for your trip.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {downloadableResources.map((resource, index) => (
              <motion.a
                key={resource.title}
                href={resource.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-secondary rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{resource.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                <span className="inline-flex items-center gap-1 text-primary font-medium text-sm">
                  Download {resource.type}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-heading-lg md:text-heading-xl font-semibold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground text-body-lg">
              We're just a phone call or email away. Don't hesitate to reach out!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-secondary rounded-2xl p-6 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
              <a
                href="tel:+15019511749"
                className="text-primary text-xl font-bold hover:underline"
              >
                (501) 951-1749
              </a>
              <p className="text-muted-foreground text-sm mt-2">Mon-Fri 9am-5pm CST</p>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-secondary rounded-2xl p-6 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
              <a
                href="mailto:info@itravelwithmiki.com"
                className="text-primary font-medium hover:underline break-all"
              >
                info@itravelwithmiki.com
              </a>
              <p className="text-muted-foreground text-sm mt-2">We respond within 24 hours</p>
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-secondary rounded-2xl p-6 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Mail Us</h3>
              <p className="text-muted-foreground">
                P.O. Box 13993
                <br />
                Little Rock, AR 72113
              </p>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button className="btn-senior bg-primary hover:bg-primary/90" asChild>
              <a href="tel:+15019511749">Call Now — We'd Love to Chat!</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Support;
