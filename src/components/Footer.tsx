import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-20 px-6 lg:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2
              className="text-3xl font-semibold mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              iTravelWithMiki
            </h2>
            <p className="text-background/70 max-w-md mb-8">
              Inspiring wanderlust through immersive storytelling and curated travel experiences.
              Join the journey.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">Explore</h3>
            <ul className="space-y-4">
              {['Destinations', 'Stories', 'Travel Tips', 'Photography'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-background/70 hover:text-background transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">Newsletter</h3>
            <p className="text-background/70 text-sm mb-4">
              Get the latest travel stories delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus-visible:ring-background/30"
              />
              <Button
                size="icon"
                className="bg-background text-foreground hover:bg-background/90 flex-shrink-0"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2026 iTravelWithMiki. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-background/50 text-sm hover:text-background transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
