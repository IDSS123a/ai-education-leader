import { Linkedin, Mail, Download } from "lucide-react";
import davorLogo from "@/assets/davor-logo.png";

const footerLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Books", href: "#books" },
  { label: "Volunteering", href: "#volunteering" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/davormulalic", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@davormulalic.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="py-12 lg:py-16 bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={davorLogo}
                alt="Davor Mulalić"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold text-lg">Davor Mulalić</span>
            </div>
            <p className="text-background/70 leading-relaxed">
              Executive Leader, CEO, AI Strategist, and Author with 25+ years driving growth and innovation across multiple industries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
              <a
                href="/Davor_Mulalic_CV.pdf"
                download
                className="flex items-center gap-2 px-4 h-10 rounded-full bg-background/10 hover:bg-background/20 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} Davor Mulalić. All rights reserved.
            </p>
            <p className="text-background/60 text-sm">
              Driving Growth Through Innovation & Leadership
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
