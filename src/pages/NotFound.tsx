import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-md"
        >
          {/* Animated compass icon */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="w-24 h-24 rounded-full bg-primary/8 flex items-center justify-center">
              <Compass className="w-12 h-12 text-primary animate-float" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-accent" />
            </div>
          </div>

          {/* 404 */}
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-3">
            Lost in Transit
          </p>
          <h1
            className="text-[6rem] font-bold text-foreground/10 leading-none mb-2 select-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            404
          </h1>
          <h2
            className="text-heading-md font-semibold text-foreground mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Oops! This Page
            <br />
            <span className="italic font-normal text-muted-foreground">Went Off the Map</span>
          </h2>
          <p className="text-muted-foreground text-base mb-8 leading-relaxed">
            The page you're looking for doesn't exist or may have moved.
            Let's get you back on the right route!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="rounded-full px-8 font-semibold" asChild>
              <a href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
              <a href="/trips">Browse Trips</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
