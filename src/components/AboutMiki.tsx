import { motion } from 'framer-motion';
import { Play, Users, Calendar, Award } from 'lucide-react';
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image/Video Side */}
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
                alt="Miki - Your Travel Guide"
                className="w-full h-[350px] sm:h-[400px] md:h-[500px] object-cover"
              />
              {/* Play Button Overlay */}
              <button
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Play video"
              >
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </button>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-32 sm:w-48 h-32 sm:h-48 bg-accent/10 rounded-2xl -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-sm tracking-[0.2em] uppercase font-semibold mb-4">
              Meet Your Guide
            </p>
            <h2
              className="text-heading-lg md:text-heading-xl font-semibold text-foreground mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Travel with Family,
              <br />
              <span className="text-primary">Not Strangers</span>
            </h2>
            <p className="text-muted-foreground text-body-lg mb-6 leading-relaxed">
              Hi, I'm Miki! Based in Maumelle, Arkansas, I've been helping travelers aged 50 and up 
              experience the joy of group travel for over 15 years. When you travel with us, you're 
              not just joining a tour—you're becoming part of our traveling family.
            </p>
            <p className="text-muted-foreground text-body-lg mb-8 leading-relaxed">
              Our motorcoach trips include fun on-bus activities like games, snacks, and videos to keep 
              everyone engaged. Whether it's a scenic U.S. bus tour or an international adventure, I take 
              care of everything so you can focus on making memories and meeting wonderful new friends.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button className="btn-senior bg-primary hover:bg-primary/90" asChild>
              <a href="/support">Learn More About Miki</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMiki;
