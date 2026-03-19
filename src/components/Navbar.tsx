import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopTextClass = isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white";

  const mobileIconClass = isScrolled ? "text-foreground" : "text-white";

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="grid grid-cols-[48px_1fr_48px] md:grid-cols-[1fr_auto_1fr] items-center min-h-[56px]">
          {/* Mobile Menu Button */}
          <div className="flex items-center justify-start md:hidden">
            <button
              type="button"
              className="relative z-10 w-12 h-12 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${mobileIconClass}`} />
              ) : (
                <Menu className={`w-6 h-6 ${mobileIconClass}`} />
              )}
            </button>
          </div>

          {/* Desktop Left */}
          <div className="hidden md:flex items-center justify-start gap-8 min-w-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`flex items-center gap-1 text-base font-medium tracking-wide transition-colors duration-300 ${desktopTextClass}`}
                >
                  Trips
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52">
                {tripCategories.map((category) => (
                  <DropdownMenuItem key={category.label} asChild>
                    <a href={category.href} className="text-base py-3 cursor-pointer">
                      {category.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href={navLinks[0].href}
              className={`text-base font-medium tracking-wide transition-colors duration-300 whitespace-nowrap ${desktopTextClass}`}
            >
              {navLinks[0].label}
            </a>
          </div>

          {/* Center Logo */}
          <div className="flex items-center justify-center">
            <a
              href="/"
              className="relative z-10 inline-flex items-center justify-center px-2 md:px-8"
              aria-label="Go to homepage"
            >
              <img
                src={wordmarkLogo}
                alt="iTravelWithMiki"
                className={`h-12 md:h-14 w-auto transition-all duration-300 ${isScrolled ? "" : "brightness-0 invert"}`}
              />
            </a>
          </div>

          {/* Mobile Spacer */}
          <div className="flex items-center justify-end md:hidden">
            <div className="w-12 h-12" />
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center justify-end gap-8 min-w-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`flex items-center gap-1 text-base font-medium tracking-wide transition-colors duration-300 whitespace-nowrap ${desktopTextClass}`}
                >
                  Travel Insurance
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                {insuranceOptions.map((option) => (
                  <DropdownMenuItem key={option.label} asChild>
                    <a href={option.href} className="flex flex-col items-start py-3 cursor-pointer">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs text-muted-foreground">{option.subtitle}</span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-base font-medium tracking-wide transition-colors duration-300 whitespace-nowrap ${desktopTextClass}`}
              >
                {link.label}
              </a>
            ))}

            <Button
              size="lg"
              className={`rounded-full px-6 whitespace-nowrap transition-all duration-300 ${
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border py-6 px-6 shadow-lg"
          >
            <div className="flex flex-col gap-4">
              <div className="border-b border-border pb-4">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Trips</p>
                {tripCategories.map((category) => (
                  <a
                    key={category.label}
                    href={category.href}
                    className="block text-foreground text-lg py-2"
                    onClick={closeMobileMenu}
                  >
                    {category.label}
                  </a>
                ))}
              </div>

              <div className="border-b border-border pb-4">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Travel Insurance
                </p>
                {insuranceOptions.map((option) => (
                  <a
                    key={option.label}
                    href={option.href}
                    className="block text-foreground text-lg py-2"
                    onClick={closeMobileMenu}
                  >
                    {option.label}
                    <span className="block text-sm text-muted-foreground">{option.subtitle}</span>
                  </a>
                ))}
              </div>

              <div className="border-b border-border pb-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-foreground text-lg py-2"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <Button className="w-full mt-2 btn-senior bg-primary hover:bg-primary/90" asChild>
                <a href="/trips" onClick={closeMobileMenu}>
                  Book a Trip
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
