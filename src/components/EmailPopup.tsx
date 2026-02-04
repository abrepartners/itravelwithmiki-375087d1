import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const POPUP_DELAY = 8000; // 8 seconds
const STORAGE_KEY = 'itravelwithmiki-email-popup-dismissed';

const EmailPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if popup was already dismissed
    const isDismissed = localStorage.getItem(STORAGE_KEY);
    if (isDismissed) return;

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Close after success message
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors z-10"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              {/* Header Image */}
              <div className="relative h-40 bg-primary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <Mail className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm font-medium tracking-wide uppercase">Join Our Family</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <Heart className="w-12 h-12 text-accent mx-auto mb-4" fill="currentColor" />
                    <h3
                      className="text-2xl font-semibold text-foreground mb-2"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Welcome to the Family!
                    </h3>
                    <p className="text-muted-foreground">
                      You'll receive our latest travel updates and exclusive offers.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h3
                      className="text-2xl font-semibold text-foreground text-center mb-3"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Join the Traveling Family!
                    </h3>
                    <p className="text-muted-foreground text-center mb-6">
                      Get exclusive trip updates, early-bird discounts, and travel tips 
                      delivered straight to your inbox.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 text-lg px-4"
                        required
                      />
                      <Button
                        type="submit"
                        className="w-full btn-senior bg-primary hover:bg-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Joining...' : 'Join Now'}
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      We respect your privacy. Unsubscribe anytime.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmailPopup;
