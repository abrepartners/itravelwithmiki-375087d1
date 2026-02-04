export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  icon: string;
  faqs: FAQ[];
}

export const faqCategories: FAQCategory[] = [
  {
    title: 'Booking & Payments',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'How do I book a trip?',
        answer: 'Booking is easy! Simply browse our available trips, select the one you want, and click "Book Now." You can also call us directly at (501) 951-1749 and we\'ll be happy to help you over the phone.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), personal checks, and money orders. We also offer payment plans for most trips.',
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'Cancellation policies vary by trip. Generally, cancellations made 60+ days before departure receive a full refund minus a small processing fee. Cancellations 30-59 days out receive a 50% refund. Within 30 days, refunds depend on our ability to fill your spot. Travel insurance is highly recommended.',
      },
      {
        question: 'Can I make payment installments?',
        answer: 'Yes! We offer flexible payment plans for most trips. A deposit is required to secure your spot, with the remaining balance due 45 days before departure. Contact us to set up a payment schedule that works for you.',
      },
    ],
  },
  {
    title: 'Before Your Trip',
    icon: 'Luggage',
    faqs: [
      {
        question: 'What should I pack?',
        answer: 'We provide a detailed packing list specific to each trip. Generally, pack comfortable walking shoes, layered clothing appropriate for the season, any medications you need, and a camera! We recommend packing light since you\'ll be getting on and off the bus.',
      },
      {
        question: 'Do I need a passport?',
        answer: 'For domestic U.S. bus tours, you do not need a passport—just a valid government-issued ID. For international trips, you\'ll need a passport valid for at least 6 months beyond your travel dates. Some destinations may also require visas.',
      },
      {
        question: 'How do I get trip updates?',
        answer: 'Once you\'re booked, you\'ll receive regular email updates with all the details. About 2 weeks before departure, you\'ll get a comprehensive trip packet with itinerary, hotel information, and what to expect. You can also call us anytime with questions!',
      },
      {
        question: 'What about mobility accommodations?',
        answer: 'We\'re happy to accommodate travelers with mobility needs. Please let us know at the time of booking if you use a wheelchair, walker, or have any special requirements. Our buses have comfortable seating, and we can arrange accessible hotel rooms.',
      },
    ],
  },
  {
    title: 'During Your Trip',
    icon: 'Bus',
    faqs: [
      {
        question: "What's included in the trip?",
        answer: 'Our trips typically include motorcoach transportation, hotel accommodations, many meals (breakfast is almost always included), admission to attractions, and the services of a professional tour guide. Specific inclusions are listed on each trip page.',
      },
      {
        question: 'What about meals?',
        answer: 'Most trips include breakfast daily and several group dinners at local restaurants. For lunches and other meals, you\'ll have the opportunity to explore and dine on your own, giving you flexibility to try local favorites. We always accommodate dietary restrictions with advance notice.',
      },
      {
        question: 'What are the bus activities like?',
        answer: 'We make bus time fun! Expect games with prizes, snacks, travel videos, and plenty of time to chat with your fellow travelers. Miki keeps the energy up and makes sure everyone is having a great time. Rest stops are scheduled every 2-3 hours.',
      },
      {
        question: 'Who do I contact in case of emergency?',
        answer: 'Your tour guide (often Miki herself!) is available 24/7 during the trip. You\'ll receive emergency contact numbers before departure. We also recommend registering with the Smart Traveler Enrollment Program (STEP) for international trips.',
      },
    ],
  },
  {
    title: 'Travel Insurance',
    icon: 'Shield',
    faqs: [
      {
        question: 'Do I need travel insurance?',
        answer: 'We strongly recommend travel insurance for all trips. Life is unpredictable, and insurance protects your investment if you need to cancel due to illness, family emergency, or other covered reasons. It also covers medical emergencies during your trip.',
      },
      {
        question: 'What does travel insurance cover?',
        answer: 'Coverage typically includes trip cancellation/interruption, emergency medical expenses, emergency evacuation, baggage loss/delay, and travel delay coverage. Specific coverage varies by plan—we offer two options to fit different needs and budgets.',
      },
      {
        question: 'How do I purchase travel insurance?',
        answer: 'We offer travel insurance through our trusted partners. When you book your trip, we\'ll provide you with insurance options and pricing. You can also download our insurance flyers from this page to review the coverage details.',
      },
      {
        question: 'How do I file a claim?',
        answer: 'If you need to file a claim, contact the insurance company directly using the information in your policy documents. Keep all receipts and documentation. Our team can help guide you through the process if needed.',
      },
    ],
  },
];

export const downloadableResources = [
  {
    title: 'Travel Insurance Plan A',
    description: 'Comprehensive coverage for peace of mind',
    type: 'PDF',
    href: '#', // Placeholder - will be updated with actual PDF link
  },
  {
    title: 'Travel Insurance Plan B',
    description: 'Essential coverage at an affordable price',
    type: 'PDF',
    href: '#', // Placeholder - will be updated with actual PDF link
  },
  {
    title: 'Packing Checklist',
    description: 'Never forget the essentials',
    type: 'PDF',
    href: '#', // Placeholder - will be updated with actual PDF link
  },
];
