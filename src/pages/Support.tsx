import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Download, CreditCard, Luggage,
  Bus, Shield, HelpCircle, MessageCircle, ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
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
  CreditCard, Luggage, Bus, Shield, HelpCircle,
};

const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    detail: '(501) 951-1749',
    sub: 'Mon–Fri, 9am–5pm CST',
    href: 'tel:+15019511749',
    cta: 'Call now',
    color: 'bg-primary/8 text-primary',
  },
  {
    icon: Mail,
    title: 'Email Us',
    detail: 'info@itravelwithmiki.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:info@itravelwithmiki.com',
    cta: 'Send email',
    color: 'bg-accent/8 text-accent',
  },
  {
    icon: MapPin,
    title: 'Write to Us',
    detail: 'P.O. Box 13993',
    sub: 'Little Rock, AR 72113',
    href: null,
    cta: null,
    color: 'bg-emerald-500/8 text-emerald-600',
  },
];

const Support = () => {
  const location = useLocation();
  const insuranceProviders = useInsuranceProviders();

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
      <SEOHead
        title="Support & FAQ — iTravelWithMiki"
        description="Get help with booking, travel insurance, packing tips, and more. Contact iTravelWithMiki by phone, email, or mail."
        canonical="https://itravelwithmiki.lovable.app/support"
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
              <MessageCircle className="w-3.5 h-3.5" />
              Support Center
            </div>
            <h1
              className="text-heading-lg md:text-heading-xl lg:text-hero font-semibold mb-5 text-white leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              We're Here to Help
            </h1>
            <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
              Find answers to common questions, download helpful resources, or contact us directly.
              We want your travel experience to be worry-free!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 px-6 lg:px-12 bg-secondary border-b border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-background rounded-2xl p-6 border border-border shadow-soft text-center"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${method.color}`}>
                  <method.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-base">{method.title}</h3>
                {method.href ? (
                  <a
                    href={method.href}
                    className="text-primary font-medium text-sm hover:underline underline-offset-2 block mb-1"
                  >
                    {method.detail}
                  </a>
                ) : (
                  <p className="text-foreground font-medium text-sm mb-1">{method.detail}</p>
                )}
                <p className="text-muted-foreground text-xs">{method.sub}</p>
                {method.cta && method.href && (
                  <a
                    href={method.href}
                    className="inline-flex items-center gap-1 mt-3 text-xs text-primary font-semibold hover:underline underline-offset-2"
                  >
                    {method.cta} <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
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
            <p className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-4">FAQ</p>
            <h2
              className="text-heading-lg md:text-heading-xl font-semibold text-foreground mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-base">
              Click on any question to see the answer.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqCategories.map((category, categoryIndex) => {
              const IconComponent = iconMap[category.icon];
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
                  className="rounded-3xl border border-border bg-card overflow-hidden shadow-soft"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 px-7 py-5 border-b border-border bg-secondary/40">
                    {IconComponent && (
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <h3
                      className="text-lg font-semibold text-foreground"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {category.title}
                    </h3>
                  </div>

                  <div className="px-7 py-2">
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem
                          key={faqIndex}
                          value={`${category.title}-${faqIndex}`}
                          className="border-border/60"
                        >
                          <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline py-5 hover:text-primary transition-colors duration-200">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-secondary" id="insurance">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-4">Protect Your Investment</p>
            <h2
              className="text-heading-lg md:text-heading-xl font-semibold text-foreground mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Travel Insurance
            </h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-3xl p-8 text-center scroll-mt-32 border border-border shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3
                  className="text-xl font-semibold text-foreground mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {provider.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-3">{provider.subtitle}</p>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{provider.description}</p>
                {provider.pdfUrl && provider.pdfUrl !== '#' ? (
                  <Button asChild className="gap-2 rounded-full">
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
            <p className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-4">Resources</p>
            <h2
              className="text-heading-lg md:text-heading-xl font-semibold text-foreground mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Helpful Downloads
            </h2>
            <p className="text-muted-foreground text-base">
              Download these documents to help prepare for your trip.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {downloadableResources.map((resource, index) => (
              <motion.a
                key={resource.title}
                href={resource.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-secondary rounded-3xl p-7 text-center hover:shadow-elevated transition-all duration-300 group border border-border hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-200">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-base">{resource.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{resource.description}</p>
                <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-2.5 transition-all duration-200">
                  Download {resource.type}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-secondary">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-4">Still have questions?</p>
            <h2
              className="text-heading-lg md:text-heading-xl font-semibold text-foreground mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              We're Just a Call Away
            </h2>
            <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto leading-relaxed">
              Don't hesitate to reach out. We're real people who genuinely care about making your trip perfect.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full px-8 font-semibold" asChild>
                <a href="tel:+15019511749" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (501) 951-1749
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <a href="mailto:info@itravelwithmiki.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Support;
