import { Compass, BookOpen, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FooterGallery from '@/components/FooterGallery';
import primaryLogo from '@/assets/logos/primary-logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground" id="contact">
      <FooterGallery />

      <div className="container mx-auto py-16 px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img src={primaryLogo} alt="iTravelWithMiki" className="h-20 w-auto mb-4" />
            <p className="text-primary-foreground/75 mb-6 text-sm leading-relaxed">
              Your trusted travel family since 2009. Creating unforgettable memories, one trip at a time.
            </p>
            {/* Social Links */}
            <div className="flex gap-2.5">
              {[
                { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 text-primary-foreground/60">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'All Trips', href: '/trips' },
                { label: 'Land Trips', href: '/land-trips' },
                { label: 'About Miki', href: '/#about' },
                { label: 'The Experience', href: '/experience' },
                { label: 'Support & FAQ', href: '/support' },
                { label: 'Travel Insurance', href: '/support#insurance' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200 text-sm flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-primary-foreground/40">›</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 text-primary-foreground/60">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-foreground/50" />
                <div>
                  <a href="tel:+15019511749" className="text-primary-foreground font-medium hover:underline text-sm">
                    (501) 951-1749
                  </a>
                  <p className="text-primary-foreground/50 text-xs mt-0.5">Mon–Fri 9am–5pm CST</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-foreground/50" />
                <a href="mailto:info@itravelwithmiki.com" className="text-primary-foreground/80 hover:text-primary-foreground hover:underline text-sm transition-colors duration-200">
                  info@itravelwithmiki.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-foreground/50" />
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  P.O. Box 13993<br />
                  Little Rock, AR 72113
                </p>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] mb-5 text-primary-foreground/60">Stay Updated</h3>
            <p className="text-primary-foreground/70 text-sm mb-4 leading-relaxed">
              Get first access to new departures, waitlist openings, and curated travel updates from the iTravel family.
            </p>
            <div className="flex flex-col gap-2.5">
              <Input
                type="email"
                placeholder="Your email address"
                className="h-11 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-primary-foreground/30 text-sm rounded-xl"
              />
              <Button className="h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-xs">© 2026 iTravelWithMiki. All rights reserved.</p>
          <div className="flex gap-5 flex-wrap justify-center">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((link) => (
              <a key={link} href="#" className="text-primary-foreground/50 text-xs hover:text-primary-foreground transition-colors duration-200">
                {link}
              </a>
            ))}
            <a href="/admin" className="text-primary-foreground/30 text-xs hover:text-primary-foreground/60 transition-colors duration-200">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
