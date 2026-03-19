import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import stackedLogo from '@/assets/logos/stacked-logo.png';

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
          className="w-full h-full object-cover scale-105"
          poster="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/3015510/3015510-uhd_2560_1440_24fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Layered gradient: strong bottom, subtle top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40" />
        {/* Warm color wash for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <img src={stackedLogo} alt="iTravelWithMiki" className="h-40 md:h-52 lg:h-64 w-auto drop-shadow-2xl" />
        </motion.div>

        {/* Eyebrow line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex items-center gap-4 mb-5"
        >
          <div className="h-px w-12 bg-white/40" />
          <span className="text-white/70 text-xs tracking-[0.3em] uppercase font-medium">
            Curated Group Journeys
          </span>
          <div className="h-px w-12 bg-white/40" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-semibold mb-5 max-w-4xl leading-[1.1] tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Travel with Family,
          <br />
          <span className="italic font-normal text-white/80">Not Strangers</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base md:text-lg text-white/65 mb-10 max-w-xl leading-relaxed"
        >
          Warm hosting, premium touches, and enough story to make you fall in love before you ever book.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <Button
            size="lg"
            className="btn-senior bg-accent hover:bg-accent/90 text-accent-foreground px-10 shadow-lg shadow-accent/20 group"
            asChild
          >
            <a href="/land-trips" className="flex items-center gap-2">
              Explore Signature Trips
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="btn-senior border-white/30 text-white hover:bg-white hover:text-foreground bg-white/10 backdrop-blur-sm group"
            asChild
          >
            <a href="/experience" className="flex items-center gap-2">
              <Play className="w-4 h-4" fill="currentColor" />
              See The Experience
            </a>
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-6 text-white/50 text-xs tracking-widest uppercase"
        >
          <span>15+ Years</span>
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <span>10,000+ Travelers</span>
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <span>500+ Trips</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
