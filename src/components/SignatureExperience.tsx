import { motion } from 'framer-motion';
import { Camera, HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';

const pillars = [
  {
    icon: Sparkles,
    title: 'Curated Experiences',
    description:
      'Every journey is handpicked and designed around comfort, connection, and unforgettable moments — never generic.',
  },
  {
    icon: Camera,
    title: 'Photo-First Storytelling',
    description:
      'Trips are presented as immersive visual experiences with signature moments and reasons to imagine yourself there.',
  },
  {
    icon: HeartHandshake,
    title: 'Family-Style Hosting',
    description:
      'This is hosted travel with community, care, and real connection built into every step of the journey.',
  },
  {
    icon: ShieldCheck,
    title: 'Worry-Free Planning',
    description:
      'Browse, compare, and fall in love with your next trip — we handle every detail so you can focus on making memories.',
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
            The iTravel Difference
          </p>
          <h2
            className="mb-5 text-heading-lg md:text-heading-xl font-semibold text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            A Hosted Travel Club,{' '}
            <em className="text-primary not-italic">Not a Booking Site</em>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            More trust, more story, and more reasons to stay engaged — designed around you.
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
                className="relative rounded-3xl border border-border bg-secondary/60 p-6 shadow-soft overflow-hidden"
              >
                {/* Left accent border */}
                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-primary/30" />

                <div className="pl-3">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3
                    className="mb-3 text-xl font-semibold text-foreground"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{pillar.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SignatureExperience;
