import { motion } from 'framer-motion';
import { Play, Users, Calendar, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mikiPhoto from '@/assets/miki-photo.jpeg';

const stats = [
  { icon: Calendar, value: '15+', label: 'Years of Experience' },
  { icon: Users, value: '10,000+', label: 'Happy Travelers' },
  { icon: Award, value: '500+', label: 'Trips Completed' },
];

const AboutMiki = () => {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 bg-background" id="about">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={mikiPhoto}
                alt="Miki - Your Travel Guide"
                className="w-full h-[380px] sm:h-[440px] md:h-[520px] object-cover"
              />
              {/* Subtle color wash */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />

              {/* Play Button */}
              <button
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Play video"
              >
                <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                </div>
              </button>

              {/* Floating review badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground leading-none">Loved by travelers</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">10,000+ happy adventurers</p>
                </div>
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-accent/8 rounded-3xl -z-10" />
            <div className="absolute -top-5 -left-5 w-24 h-24 bg-primary/6 rounded-2xl -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              Meet Your Guide
            </p>
            <h2
              className="text-heading-lg md:text-heading-xl font-semibold text-foreground mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Travel with Family,
              <br />
              <span className="italic font-normal text-primary">Not Strangers</span>
            </h2>
            <p className="text-muted-foreground text-body-lg mb-5 leading-relaxed">
              Hi, I'm Miki! Based in Maumelle, Arkansas, I've been helping travelers aged 50 and up
              experience the joy of group travel for over 15 years. When you travel with us, you're
              not just joining a tour — you're becoming part of our traveling family.
            </p>
            <p className="text-muted-foreground text-body-lg mb-10 leading-relaxed">
              Our motorcoach trips include fun on-bus activities like games, snacks, and videos to keep
              everyone engaged. Whether it's a scenic U.S. bus tour or an international adventure, I take
              care of everything so you can focus on making memories and meeting wonderful new friends.
            </p>

            {/* Stats — horizontal divider style */}
            <div className="grid grid-cols-3 gap-0 mb-10 rounded-2xl border border-border overflow-hidden">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center py-5 px-3 ${
                    index < stats.length - 1 ? 'border-r border-border' : ''
                  } bg-secondary/40 hover:bg-secondary/70 transition-colors duration-200`}
                >
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 opacity-70" />
                  <div className="text-xl sm:text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button className="btn-senior bg-primary hover:bg-primary/90 group" asChild>
              <a href="/support" className="flex items-center gap-2">
                Learn More About Miki
                <Play className="w-4 h-4 opacity-70" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMiki;
