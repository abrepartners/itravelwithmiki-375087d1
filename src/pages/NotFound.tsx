import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg"
        >
          {/* Animated compass */}
          <motion.div
            animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-8"
          >
            <Compass className="w-12 h-12 text-primary" />
          </motion.div>

          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Error 404</p>
          <h1
            className="text-heading-lg md:text-heading-xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Lost in Transit
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Looks like this route doesn't exist. Don't worry — let's get you back on track to your next adventure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8" asChild>
              <a href="/">Return Home</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
              <a href="/trips">Browse Trips</a>
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
};

export default NotFound;
