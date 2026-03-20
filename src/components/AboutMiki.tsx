import { motion } from 'framer-motion';
import { Play, Users, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mikiPhoto from '@/assets/miki-photo.jpeg';

const stats = [
  { icon: Calendar, value: '15+', label: 'Years Together' },
  { icon: Users, value: '10,000+', label: 'Travel Family Members' },
  { icon: Award, value: '500+', label: 'Amazing Trips' },
];

const AboutMiki = () => {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 bg-background" id="about">
      <div className="container mx-auto">
        {/* Eyebrow + heading */}
        <motion.div
          initial={{ opacity: 0.4, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase font-semibold mb-4">
            Meet Your Host
          </p>
          <h2
            className="text-heading-lg md:text-heading-xl font-semibold text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Hey There, I'm{' '}
            <em className="text-primary not-italic">Miki!</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={mikiPhoto}
                alt="Miki - Your Travel Host"
                className="w-full h-[350px] sm:h-[400px] md:h-[500px] object-cover"
              />
              <button
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Play video"
              >
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </button>
            </div>
            {/* Decorative reticle corner */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-primary/25 rounded-br-lg pointer-events-none" />
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-primary/25 rounded-tl-lg pointer-events-none" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground text-body-lg mb-6 leading-relaxed">
              I'm based in Maumelle, Arkansas, and for over 15 years I've been doing what I love most — 
              bringing people together through travel. When you come on one of my trips, you're not signing 
              up for a tour. You're joining a family. ❤️
            </p>
            <p className="text-muted-foreground text-body-lg mb-8 leading-relaxed">
              On our bus trips, we have games, snacks, music, and plenty of laughs along the way. Whether 
              we're road-tripping across the U.S. or exploring somewhere new overseas, I take care of 
              everything — so all you have to do is show up, relax, and have the time of your life.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-secondary/60 border border-border">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button className="btn-senior bg-primary hover:bg-primary/90" asChild>
              <a href="/support">Get to Know Me</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMiki;
