import { motion } from 'framer-motion';
import { Camera, HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';

const pillars = [
  {
    icon: Sparkles,
    title: 'Handpicked Adventures',
    description:
      'Every trip is personally chosen by Miki — designed around comfort, fun, and making real connections with your travel family.',
  },
  {
    icon: Camera,
    title: 'Stories Worth Sharing',
    description:
      'We capture every trip in photos and stories so vivid, you\'ll feel the excitement before you even pack your bags.',
  },
  {
    icon: HeartHandshake,
    title: 'You\'re Family Here',
    description:
      'This isn\'t a tour group — it\'s a traveling family. Miki hosts every trip with love, laughter, and genuine care.',
  },
  {
    icon: ShieldCheck,
    title: 'We Handle Everything',
    description:
      'No stress, no guesswork. You just show up and enjoy — we take care of every single detail for you.',
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
            What Makes Us Different
          </p>
          <h2
            className="mb-5 text-heading-lg md:text-heading-xl font-semibold text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            A Travel Family,{' '}
            <em className="text-primary not-italic">Not a Tour Company</em>
          </h2>
          <p className="text-body-lg text-muted-foreground">
            When you travel with Miki, you're not a customer — you're family. Here's why thousands keep coming back.
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
