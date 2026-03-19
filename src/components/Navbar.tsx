import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import wordmarkLogo from "@/assets/logos/wordmark-logo.png";

const tripCategories = [
  { label: "All Trips", href: "/trips" },
  { label: "Land Trips", href: "/land-trips" },
  { label: "River Cruises", href: "/trips?category=river-cruise" },
  { label: "Ocean Cruises", href: "/trips?category=ocean-cruise" },
  { label: "Bus Trips", href: "/trips?category=bus" },
];

const insuranceOptions = [
  {
    label: "Allianz Insurance",
    subtitle: "For International Trips",
    href: "/support#insurance-allianz",
  },
  {
    label: "Travel Confident",
    subtitle: "For Diamond Tours",
    href: "/support#insurance-diamond",
  },
];

const navLinks = [
  { label: "About Miki", href: "/#about" },
  { label: "The Experience", href: "/experience" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/#contact" },
];

const focusClass = "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 focus-visible:rounded-sm";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const close = () => setIsMobileMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const textClass = isScrolled
    ? "text-foreground hover:text-primary"
    : "text-white/90 hover:text-white";

  const navLinkClass = `relative text-sm font-medium uppercase tracking-wide transition-colors duration-300 whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${focusClass}`;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border py-2"
          : "bg-transparent py-3"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-between">
          {/* Left: Logo + Primary Nav */}
          <div className="flex items-center gap-8">
            <a
              href="/"
              aria-label="Home"
              className={`transition-all duration-300 ${focusClass}`}
            >
              <img
                src={wordmarkLogo}
                alt="iTravelWithMiki"
                className={`transition-all duration-300 ${
                  isScrolled ? "h-10" : "h-12 brightness-0 invert"
                }`}
              />
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`flex items-center gap-1 ${navLinkClass} ${textClass}`}
                >
                  Trips
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                {tripCategories.map((c) => (
                  <DropdownMenuItem key={c.label} asChild>
                    <a href={c.href} className="text-sm py-3 cursor-pointer">
                      {c.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href={navLinks[0].href}
              className={`${navLinkClass} ${textClass}`}
            >
              {navLinks[0].label}
            </a>

            <a
              href={navLinks[1].href}
              className={`${navLinkClass} ${textClass}`}
            >
              {navLinks[1].label}
            </a>
          </div>

          {/* Right: Secondary Nav + CTA */}
          <div className="flex items-center gap-7">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`flex items-center gap-1 ${navLinkClass} ${textClass}`}
                >
                  Travel Insurance
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                {insuranceOptions.map((o) => (
                  <DropdownMenuItem key={o.label} asChild>
                    <a href={o.href} className="flex flex-col items-start py-3 cursor-pointer">
                      <span className="font-medium">{o.label}</span>
                      <span className="text-xs text-muted-foreground">{o.subtitle}</span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(2).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`${navLinkClass} ${textClass}`}
              >
                {link.label}
              </a>
            ))}

            <Button
              size="default"
              className={`rounded-full px-5 py-2 whitespace-nowrap transition-all duration-300 ${focusClass} ${
                isScrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-white text-foreground hover:bg-white/90"
              }`}
              asChild
            >
              <a href="/trips">Book a Trip</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Nav */}
        <nav className="flex md:hidden items-center justify-between">
          <button
            type="button"
            className={`w-10 h-10 flex items-center justify-center ${focusClass}`}
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
            )}
          </button>

          <a
            href="/"
            aria-label="Home"
            className={`transition-all duration-300 ${focusClass}`}
          >
            <img
              src={wordmarkLogo}
              alt="iTravelWithMiki"
              className={`transition-all duration-300 ${
                isScrolled ? "h-8" : "h-9 brightness-0 invert"
              }`}
            />
          </a>

          <div className="w-10" />
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-full bg-foreground/40 backdrop-blur-sm md:hidden"
                onClick={closeMobileMenu}
              />
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border py-6 px-6 shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="border-b border-border pb-4">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Trips</p>
                    {tripCategories.map((c) => (
                      <a key={c.label} href={c.href} className={`block text-foreground text-lg py-2 ${focusClass}`} onClick={closeMobileMenu}>
                        {c.label}
                      </a>
                    ))}
                  </div>

                  <div className="border-b border-border pb-4">
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Travel Insurance</p>
                    {insuranceOptions.map((o) => (
                      <a key={o.label} href={o.href} className={`block text-foreground text-lg py-2 ${focusClass}`} onClick={closeMobileMenu}>
                        {o.label}
                        <span className="block text-sm text-muted-foreground">{o.subtitle}</span>
                      </a>
                    ))}
                  </div>

                  <div className="border-b border-border pb-4">
                    {navLinks.map((link) => (
                      <a key={link.label} href={link.href} className={`block text-foreground text-lg py-2 ${focusClass}`} onClick={closeMobileMenu}>
                        {link.label}
                      </a>
                    ))}
                  </div>

                  <Button className={`w-full mt-2 btn-senior bg-primary hover:bg-primary/90 ${focusClass}`} asChild>
                    <a href="/trips" onClick={closeMobileMenu}>Book a Trip</a>
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
