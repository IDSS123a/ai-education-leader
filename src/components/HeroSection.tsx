import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import davorProfile from "@/assets/davor-profile-real.png";

const highlights = [
  { metric: "€16M+", label: "Operating Income Growth" },
  { metric: "25+", label: "Years Leadership Experience" },
  { metric: "673%", label: "Net Profit Increase" },
  { metric: "500+", label: "Professionals Mentored" },
];

const industries = [
  "Micro Finance",
  "NGO",
  "Project Management",
  "Holding",
  "Business Consulting",
  "Education & EdTech",
  "Finance & Banking",
  "Manufacturing",
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-hero pt-20 lg:pt-0"
    >
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            >
              Executive Leader & AI Strategist
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Davor Mulalić
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-6 max-w-xl leading-relaxed"
            >
              CEO & Managing Director with a proven track record of driving growth, 
              innovation, and operational excellence across multiple industries. 
              Expert in AI Strategy & Digital Transformation.
            </motion.p>

            {/* Industries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {industries.map((industry, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + index * 0.05 }}
                  className="px-3 py-1.5 bg-card border border-border rounded-full text-sm text-muted-foreground"
                >
                  {industry}
                </motion.span>
              ))}
            </motion.div>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + index * 0.08 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {item.metric}
                  </div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <a href="#experience">
                  View Experience
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="/Davor_Mulalic_CV.pdf" download>
                  <Download className="w-5 h-5" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full" />
              
              {/* Image container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-card shadow-xl">
                <img
                  src={davorProfile}
                  alt="Davor Mulalić - Executive Leader & AI Strategist"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card px-6 py-3 rounded-full shadow-lg border border-border"
              >
                <span className="text-sm font-semibold text-primary">
                  25+ Years Leadership
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
