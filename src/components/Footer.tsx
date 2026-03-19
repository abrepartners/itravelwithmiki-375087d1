import { Compass, BookOpen, Phone, Mail, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FooterGallery from '@/components/FooterGallery';
import primaryLogo from '@/assets/logos/primary-logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground" id="contact">
      {/* Scrolling Gallery */}
      <FooterGallery />
      
      <div className="container mx-auto py-16 px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={primaryLogo}
              alt="iTravelWithMiki"
              className="h-20 w-auto mb-4"
            />
            <p className="text-primary-foreground/80 mb-6 text-base leading-relaxed">
              Your trusted travel family since 2009. Creating unforgettable memories, one trip at a time.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Compass, href: '/experience', label: 'The Experience' },
                { icon: BookOpen, href: '/land-trips', label: 'Land Trips' },
                { icon: Phone, href: '/support', label: 'Support' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-11 h-11 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'All Trips', href: '/trips' },
                { label: 'About Miki', href: '#about' },
                { label: 'Support & FAQ', href: '/support' },
                { label: 'Travel Insurance', href: '/support#insurance' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-wider mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+15019511749" className="text-primary-foreground font-medium hover:underline">
                    (501) 951-1749
                  </a>
                  <p className="text-primary-foreground/70 text-sm">Mon-Fri 9am-5pm CST</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@itravelwithmiki.com" className="text-primary-foreground hover:underline">
                  info@itravelwithmiki.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-primary-foreground/80">
                  P.O. Box 13993<br />
                  Little Rock, AR 72113
                </p>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-wider mb-5">Stay Updated</h3>
            <p className="text-primary-foreground/80 text-base mb-4">
              Get first access to new departures, waitlist openings, and curated travel updates from the iTravel family.
            </p>
            <div className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Your email"
                className="h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
              />
              <Button
                className="h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/70 text-sm">
            © 2026 iTravelWithMiki. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors duration-300"
              >
                {link}
              </a>
            ))}
            <a
              href="/admin"
              className="text-primary-foreground/50 text-sm hover:text-primary-foreground transition-colors duration-300"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
