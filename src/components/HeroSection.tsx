import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
          poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/80 text-sm md:text-base tracking-[0.3em] uppercase mb-6"
          >
            Explore • Experience • Discover
          </motion.p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-white font-semibold leading-tight text-balance max-w-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Travel the World
            <br />
            <span className="italic font-normal">with Miki</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 text-white/70 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Curated journeys to the world's most breathtaking destinations.
            Stories that inspire wanderlust.
          </motion.p>
        </motion.div>

        {/* Glassmorphism Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full max-w-2xl"
        >
          <div className="glass-light rounded-2xl p-2">
            <div className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-4">
              <MapPin className="w-5 h-5 text-white/60 flex-shrink-0" />
              <Input
                type="text"
                placeholder="Search destinations..."
                className="flex-1 bg-transparent border-none text-white placeholder:text-white/50 text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <button className="flex-shrink-0 bg-white text-foreground p-3 rounded-xl hover:bg-white/90 transition-colors duration-300">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
