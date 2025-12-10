import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import davorLogo from "@/assets/davor-logo.png";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Books", href: "#books" },
  { label: "Volunteering", href: "#volunteering" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img
              src={davorLogo}
              alt="Davor Mulalić"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
            />
            <span className="font-semibold text-foreground hidden sm:block">
              Davor Mulalić
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href="/Davor_Mulalic_CV.pdf" download>
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href="https://calendly.com/mulalic71" target="_blank" rel="noopener noreferrer">
                Book Consultation
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-4 space-y-2 border-t border-border mt-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="/Davor_Mulalic_CV.pdf" download>
                    <Download className="w-4 h-4" />
                    Download CV
                  </a>
                </Button>
                <Button size="sm" className="w-full" asChild>
                  <a href="https://calendly.com/mulalic71" target="_blank" rel="noopener noreferrer">
                    Book Consultation
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
