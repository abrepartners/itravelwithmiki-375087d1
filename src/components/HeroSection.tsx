import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import stackedLogo from '@/assets/logos/stacked-logo.webp';

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=75&fm=webp"
        >
          <source
            src="https://videos.pexels.com/video-files/3015510/3015510-uhd_2560_1440_24fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="mb-8">
          <img src={stackedLogo} alt="iTravelWithMiki" className="h-48 md:h-60 lg:h-80 w-auto" />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-4 max-w-3xl">
          Travel with Family, Not Strangers
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl"
        >
          Curated group journeys with warm hosting, premium touches, and enough story on the site to help you fall in love before you ever book.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button 
            size="lg" 
            className="btn-senior bg-accent hover:bg-accent/90 text-accent-foreground px-10"
            asChild
          >
            <a href="/land-trips">
              Explore Signature Trips
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="btn-senior border-white/30 text-white hover:bg-white hover:text-foreground bg-transparent"
            asChild
          >
            <a href="/experience">See The Experience</a>
          </Button>
        </motion.div>

        {/* Trust Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center gap-6 md:gap-10 mt-10"
        >
          {[
            { value: '15+', label: 'Years' },
            { value: '10,000+', label: 'Travelers' },
            { value: '500+', label: 'Trips' },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6 md:gap-10">
              {i > 0 && <span className="text-white/30 text-2xl font-light">·</span>}
              <div className="text-center">
                <span className="block text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</span>
                <span className="text-xs md:text-sm uppercase tracking-widest text-white/60">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
