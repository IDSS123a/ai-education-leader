import { Linkedin, Download } from "lucide-react";
import { CVRequestDialog } from "@/components/CVRequestDialog";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";

// Forward ref button for DialogTrigger compatibility
const CVButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => (
    <button
      ref={ref}
      {...props}
      className="flex items-center gap-2 px-4 py-2 bg-background/10 hover:bg-background/20 rounded-full transition-colors text-sm"
    >
      <Download className="w-4 h-4" />
      Download CV
    </button>
  )
);
CVButton.displayName = "CVButton";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Books", href: "#books" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Volunteering", href: "#volunteering" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="py-12 lg:py-16 bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center mb-12">
          {/* Logo/Initials */}
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-primary-foreground">DM</span>
          </div>
          <h3 className="text-xl font-semibold mb-1">Davor Mulalić</h3>
          <p className="text-background/70 text-sm">C-Level AI Leader</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-background/70 hover:text-background transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="https://www.linkedin.com/in/davormulalic/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-background/10 hover:bg-background/20 rounded-full transition-colors text-sm"
          >
            <Linkedin className="w-4 h-4" />
            Connect
          </a>
          <CVRequestDialog>
            <CVButton />
          </CVRequestDialog>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-background/10 pt-8">
          <p className="text-background/60 text-sm text-center">
            © 2026 Davor Mulalić. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
