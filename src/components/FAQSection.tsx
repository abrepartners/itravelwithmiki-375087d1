import { useEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle, CreditCard, Bus, Luggage } from 'lucide-react';
import { faqCategories } from '@/data/faqs';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  HelpCircle, CreditCard, Bus, Luggage,
};

interface FAQSectionProps {
  compact?: boolean;
  showHeader?: boolean;
}

const FAQSection = ({ compact = false, showHeader = true }: FAQSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const displayCategories = compact
    ? faqCategories.slice(0, 2).map((cat) => ({ ...cat, faqs: cat.faqs.slice(0, 2) }))
    : faqCategories;

  const allFaqs = displayCategories.flatMap((cat) => cat.faqs);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-secondary" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-6 lg:px-12">
        {showHeader && (
          <div
            className={`text-center mb-14 transition-all duration-700 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'
            }`}
          >
            <p className="uppercase tracking-[0.2em] text-sm font-medium text-primary mb-4">
              We're Here to Help
            </p>
            <h2
              className="text-heading-lg lg:text-heading-xl text-foreground mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Got Questions? We've Got Answers!
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to know about traveling with Miki and the family — no question is too small!
            </p>
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-4">
          {displayCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`transition-all duration-600 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-3'
              }`}
              style={{ transitionDelay: `${catIndex * 100}ms` }}
            >
              {(() => {
                const IconComp = categoryIcons[category.icon];
                return (
                  <div className="flex items-center gap-3 mb-3 mt-8 first:mt-0">
                    {IconComp && (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComp className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    <h3
                      className="text-heading-sm text-foreground font-semibold"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {category.title}
                    </h3>
                  </div>
                );
              })()}

              <div className="space-y-2">
                {category.faqs.map((faq, faqIndex) => {
                  const itemId = `${catIndex}-${faqIndex}`;
                  const isOpen = openItems.has(itemId);

                  return (
                    <div
                      key={itemId}
                      className="bg-card border border-border rounded-xl overflow-hidden shadow-soft"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full flex items-center justify-between p-5 text-left text-foreground hover:bg-muted/50 transition-colors duration-200"
                      >
                        <span className="text-base font-medium pr-4">{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-out ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="px-5 pb-5 text-muted-foreground text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {compact && (
          <div
            className={`text-center mt-10 transition-all duration-700 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-3'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <a
              href="/faq"
              className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:underline underline-offset-4 transition-colors"
            >
              View All FAQs →
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
