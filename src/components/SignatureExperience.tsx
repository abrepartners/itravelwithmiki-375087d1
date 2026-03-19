import { motion } from 'framer-motion';
import { Camera, HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const pillars = [
  {
    icon: Sparkles,
    title: 'Brand-led experiences',
    description:
      'Every page leans into a warmer, more premium feel focused on curated adventures instead of generic listings.',
    gradient: 'from-blue-500/10 to-blue-600/5',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    numColor: 'text-blue-600',
  },
  {
    icon: Camera,
    title: 'Photo-first storytelling',
    description:
      'Trips are presented as immersive experiences with stronger visual rhythm and reasons to imagine yourself there.',
    gradient: 'from-amber-500/10 to-amber-600/5',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    numColor: 'text-amber-600',
  },
  {
    icon: HeartHandshake,
    title: 'Family-style hosting',
    description:
      'This is hosted travel with community, care, and real connection built into every single journey.',
    gradient: 'from-rose-500/10 to-rose-600/5',
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-50',
    numColor: 'text-rose-600',
  },
  {
    icon: ShieldCheck,
    title: 'Keep visitors onsite longer',
    description:
      'High-interest land trips have internal detail pages so guests can browse, compare, and fall in love before booking.',
    gradient: 'from-emerald-500/10 to-emerald-600/5',
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    numColor: 'text-emerald-600',
  },
];

const SignatureExperience = () => {
  return (
    <section className="bg-background py-20 lg:py-28 px-6 lg:px-12">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Why this brand wins
          </p>
          <h2
            className="mb-5 text-heading-lg md:text-heading-xl font-semibold text-foreground leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Designed to feel like a{' '}
            <span className="italic font-normal">hosted travel club,</span>
            <br />
            not a booking warehouse
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            More trust, more story, and more reasons to stay engaged before leaving for payment or final reservations.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={cn(
                  'group relative rounded-2xl border border-border/60 bg-gradient-to-br p-6 shadow-soft',
                  'hover:shadow-elevated hover:-translate-y-1 transition-all duration-300',
                  pillar.gradient
                )}
              >
                {/* Faint number watermark */}
                <span
                  className="absolute top-4 right-5 text-5xl font-bold opacity-[0.05] text-foreground select-none pointer-events-none"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className={cn('mb-5 flex h-12 w-12 items-center justify-center rounded-xl', pillar.iconBg)}>
                  <Icon className={cn('h-6 w-6', pillar.iconColor)} />
                </div>

                <h3 className="mb-2.5 text-base font-semibold text-foreground leading-snug">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SignatureExperience;
