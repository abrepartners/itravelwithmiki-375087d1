import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/contexts/AdminContext';
import wordmarkLogo from '@/assets/logos/wordmark-logo.png';

const AdminLogin = () => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(passcode)) {
      navigate('/admin');
    } else {
      setError('Invalid passcode. Please try again.');
      setPasscode('');
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src={wordmarkLogo}
              alt="iTravelWithMiki"
              className="h-10 mx-auto mb-6"
            />
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 
              className="text-heading-md font-semibold text-foreground"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Admin Access
            </h1>
            <p className="text-muted-foreground mt-2">
              Enter your passcode to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="passcode" className="text-base">Passcode</Label>
              <Input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="h-12 text-base"
                autoFocus
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-base font-semibold">
              Access Admin
            </Button>
          </form>

          {/* Back Link */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              ← Back to Website
            </a>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default AdminLogin;
