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
  { label: "Allianz Insurance", subtitle: "For International Trips", href: "/support#insurance-allianz" },
  { label: "Travel Confident", subtitle: "For Diamond Tours", href: "/support#insurance-diamond" },
];

const navLinks = [
  { label: "About Miki", href: "#about" },
  { label: "The Experience", href: "/experience" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "#contact" },
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

  const desktopLinkClass = `text-base font-medium tracking-wide transition-colors duration-300 ${
    isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
  }`;

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
        <nav className="relative flex items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          <button
            className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
            )}
          </button>

          <div className="hidden min-w-0 items-center gap-8 justify-self-start md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={desktopLinkClass}>
                  <span className="flex items-center gap-1">
                    Trips
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {tripCategories.map((category) => (
                  <DropdownMenuItem key={category.label} asChild>
                    <a href={category.href} className="cursor-pointer py-3 text-base">
                      {category.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="#about" className={desktopLinkClass}>
              About Miki
            </a>
          </div>

          <a href="/" className="flex flex-1 justify-center md:flex-none md:justify-self-center">
            <img
              src={wordmarkLogo}
              alt="iTravelWithMiki"
              className={`h-12 w-auto max-w-[220px] transition-all duration-300 md:h-14 ${isScrolled ? "" : "brightness-0 invert"}`}
            />
          </a>

          <div className="hidden min-w-0 items-center justify-self-end gap-8 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={desktopLinkClass}>
                  <span className="flex items-center gap-1">
                    Travel Insurance
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {insuranceOptions.map((option) => (
                  <DropdownMenuItem key={option.label} asChild>
                    <a href={option.href} className="flex cursor-pointer flex-col items-start py-3">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs text-muted-foreground">{option.subtitle}</span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(1).map((link) => (
              <a key={link.label} href={link.href} className={desktopLinkClass}>
                {link.label}
              </a>
            ))}
            <Button
              size="lg"
              className={`rounded-full px-6 transition-all duration-300 ${
                isScrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-white text-foreground hover:bg-white/90"
              }`}
              asChild
            >
              <a href="/trips">Book a Trip</a>
            </Button>
          </div>

          <div className="h-12 w-12 flex-shrink-0 md:hidden" />
        </nav>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 top-full border-b border-border bg-background px-6 py-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              <div className="border-b border-border pb-4">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Trips</p>
                {tripCategories.map((category) => (
                  <a
                    key={category.label}
                    href={category.href}
                    className="block py-2 text-lg text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.label}
                  </a>
                ))}
              </div>

              <div className="border-b border-border pb-4">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Travel Insurance
                </p>
                {insuranceOptions.map((option) => (
                  <a
                    key={option.label}
                    href={option.href}
                    className="block py-2 text-lg text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {option.label}
                    <span className="block text-sm text-muted-foreground">{option.subtitle}</span>
                  </a>
                ))}
              </div>

              {navLinks.slice(1).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="py-2 text-lg text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <Button className="mt-4 w-full btn-senior bg-primary hover:bg-primary/90" asChild>
                <a href="/trips">Book a Trip</a>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Navbar;
