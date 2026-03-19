import { motion } from 'framer-motion';
import { Camera, HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';

const pillars = [
  {
    icon: Sparkles,
    title: 'Brand-led experiences',
    description:
      'Every page now leans into a warmer, more premium feel focused on curated adventures instead of generic listings.',
  },
  {
    icon: Camera,
    title: 'Photo-first storytelling',
    description:
      'Trips are presented as immersive experiences with stronger visual rhythm, signature moments, and reasons to imagine yourself there.',
  },
  {
    icon: HeartHandshake,
    title: 'Family-style hosting',
    description:
      'The message stays consistent: this is hosted travel with community, care, and real connection built into the journey.',
  },
  {
    icon: ShieldCheck,
    title: 'Keep visitors onsite longer',
    description:
      'High-interest land trips now have internal detail pages so guests can browse, compare, and fall in love before any external booking handoff.',
  },
];

const SignatureExperience = () => {
  return (
    <section className="bg-background py-20 lg:py-28 px-6 lg:px-12">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Why this brand wins
          </p>
          <h2
            className="mb-5 text-heading-lg md:text-heading-xl font-semibold text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Designed to feel like a hosted travel club, not a booking warehouse
          </h2>
          <p className="text-body-lg text-muted-foreground">
            We are turning the site into a richer destination of its own: more trust, more story, and more reasons to stay engaged before leaving for payment or final reservations.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-3xl border border-border bg-secondary/60 p-6 shadow-soft"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">{pillar.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{pillar.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SignatureExperience;
