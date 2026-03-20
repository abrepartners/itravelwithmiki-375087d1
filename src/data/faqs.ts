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
    title: 'General',
    icon: 'HelpCircle',
    faqs: [
      {
        question: 'Who are these trips designed for?',
        answer: 'Our trips are designed for travelers aged 50 and up who want stress-free, well-organized adventures with like-minded people. Whether you\'re a seasoned traveler or a first-timer, our trips are paced for comfort and built for connection.',
      },
      {
        question: 'What makes traveling with Miki different from other travel agencies?',
        answer: 'We\'re not a faceless agency — we\'re a family. Miki personally plans and often leads every trip. You\'ll never feel like just another customer. We remember your name, your preferences, and your birthday. Every trip is infused with personal touches, bus games, surprise stops, and genuine care.',
      },
      {
        question: 'Can I travel solo or do I need a companion?',
        answer: 'Absolutely you can travel solo! Many of our travelers come alone and leave with lifelong friends. We foster a family atmosphere where everyone feels welcome. Solo travelers can opt for single-occupancy rooms or be matched with a roommate to save on costs.',
      },
      {
        question: 'How long has iTravelWithMiki been in business?',
        answer: 'Miki has been leading group trips since 2009, starting with a small bus trip to Branson, Missouri. Over 15 years later, iTravel with Miki is a full-service travel agency based in Little Rock, Arkansas, serving over 2,000 happy travelers.',
      },
      {
        question: 'What types of trips do you offer?',
        answer: 'We offer a wide variety: domestic bus tours across the U.S., international land trips, European river cruises, ocean cruises, and special holiday-themed getaways. There\'s something for every taste and budget.',
      },
    ],
  },
  {
    title: 'Booking & Payment',
    icon: 'CreditCard',
    faqs: [
      {
        question: 'How do I book a trip?',
        answer: 'Booking is easy! Simply browse our available trips, select the one you want, and click "Book Now." You can also call us directly at (501) 951-1749 and we\'ll be happy to help you over the phone.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), personal checks, and money orders. We also offer flexible payment plans for most trips.',
      },
      {
        question: 'Can I make payment installments?',
        answer: 'Yes! We offer flexible payment plans for most trips. A deposit is required to secure your spot, with the remaining balance due 45 days before departure. Contact us to set up a payment schedule that works for you.',
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'Cancellation policies vary by trip. Generally, cancellations made 60+ days before departure receive a full refund minus a small processing fee. Cancellations 30-59 days out receive a 50% refund. Within 30 days, refunds depend on our ability to fill your spot. Travel insurance is highly recommended.',
      },
      {
        question: 'Is travel insurance included in the price?',
        answer: 'Travel insurance is not included but is strongly recommended. We offer affordable insurance options through our trusted partners. You can review coverage details on our Support page or ask us when you book.',
      },
    ],
  },
  {
    title: 'Trip Details',
    icon: 'Bus',
    faqs: [
      {
        question: "What's included in the trip price?",
        answer: 'Our trips typically include motorcoach transportation, hotel accommodations, many meals (breakfast is almost always included), admission to attractions, and the services of a professional tour guide. Specific inclusions are listed on each trip page.',
      },
      {
        question: 'What about meals during the trip?',
        answer: 'Most trips include breakfast daily and several group dinners at local restaurants. For lunches and other meals, you\'ll have the opportunity to explore and dine on your own, giving you flexibility to try local favorites. We always accommodate dietary restrictions with advance notice.',
      },
      {
        question: 'What are the bus activities like?',
        answer: 'We make bus time fun! Expect games with prizes, snacks, travel videos, and plenty of time to chat with your fellow travelers. Miki keeps the energy up and makes sure everyone is having a great time. Rest stops are scheduled every 2-3 hours.',
      },
      {
        question: 'Who do I contact in case of emergency during the trip?',
        answer: 'Your tour guide (often Miki herself!) is available 24/7 during the trip. You\'ll receive emergency contact numbers before departure. We also recommend registering with the Smart Traveler Enrollment Program (STEP) for international trips.',
      },
      {
        question: 'What about mobility accommodations?',
        answer: 'We\'re happy to accommodate travelers with mobility needs. Please let us know at the time of booking if you use a wheelchair, walker, or have any special requirements. Our buses have comfortable seating, and we can arrange accessible hotel rooms.',
      },
    ],
  },
  {
    title: 'Travel Preparation',
    icon: 'Luggage',
    faqs: [
      {
        question: 'What should I pack?',
        answer: 'We provide a detailed packing list specific to each trip. Generally, pack comfortable walking shoes, layered clothing appropriate for the season, any medications you need, and a camera! We recommend packing light since you\'ll be getting on and off the bus.',
      },
      {
        question: 'Do I need a passport?',
        answer: 'For domestic U.S. bus tours, you do not need a passport — just a valid government-issued ID. For international trips, you\'ll need a passport valid for at least 6 months beyond your travel dates. Some destinations may also require visas.',
      },
      {
        question: 'How do I get trip updates and information?',
        answer: 'Once you\'re booked, you\'ll receive regular email updates with all the details. About 2 weeks before departure, you\'ll get a comprehensive trip packet with itinerary, hotel information, and what to expect. You can also call us anytime with questions!',
      },
      {
        question: 'Do I need travel insurance?',
        answer: 'We strongly recommend travel insurance for all trips. Life is unpredictable, and insurance protects your investment if you need to cancel due to illness, family emergency, or other covered reasons. It also covers medical emergencies during your trip.',
      },
      {
        question: 'What if I have dietary restrictions or allergies?',
        answer: 'Just let us know when you book! We work with our hotel and restaurant partners to accommodate dietary needs including vegetarian, vegan, gluten-free, and allergy-specific requirements. The earlier you tell us, the better we can prepare.',
      },
    ],
  },
];

export const downloadableResources = [
];
