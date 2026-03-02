import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    title: "AISBP Framework™ – Complete System",
    price: "€100",
    description:
      "Includes:\n– AI Solved Business Problems (PDF)\n– AISBP Operational Intelligence System (Web App)\n– The Leadership Matrix™ Simulation",
    buttonText: "Secure Access via PayPal",
    link: "https://www.paypal.com/ncp/payment/TV29C24U3J5SE",
  },
  {
    title: "AI Solved Business Problems – Strategic Field Manual (PDF)",
    price: "€30",
    description:
      "Structured documentation of 50 recurring operational breakdowns across 10 industries, including documented failure modes and conservative ROI models.",
    buttonText: "Purchase PDF",
    link: "https://www.paypal.com/ncp/payment/CKF79P6W4R93Q",
  },
  {
    title: "AISBP Operational Intelligence System – Interactive Access",
    price: "€50",
    description:
      "Interactive executive decision environment with indexed problems, structured prompts, and financial modeling tools.",
    buttonText: "Access Web Application",
    link: "https://www.paypal.com/ncp/payment/BH2JQCNN953EL",
  },
  {
    title: "The Leadership Matrix™ – Executive Simulation Environment",
    price: "€40",
    description:
      "Structured crisis simulation for senior operational leaders navigating capital constraints, stakeholder friction, and time-sensitive decision pressure.",
    buttonText: "Access Simulation",
    link: "https://www.paypal.com/ncp/payment/SVXDJYGJVHDLA",
  },
];

export function AISBPSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="aisbp" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            >
              Executive Decision System
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              AISBP Framework™
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="text-primary text-sm font-medium mb-4"
            >
              Complete Operational Intelligence Architecture
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              An integrated executive decision system built on documented operational failure patterns, conservative financial modeling, and structured AI reasoning frameworks.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
              className="text-muted-foreground max-w-2xl mx-auto mt-3 font-medium"
            >
              50 real business problems. 150 documented failure modes. One integrated execution system.
            </motion.p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.15 }}
                className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
                    {product.price}
                  </span>
                  <p className="text-xs text-muted-foreground mb-5 whitespace-pre-line leading-relaxed">
                    {product.description}
                  </p>
                  <Button variant="default" size="sm" className="w-full" asChild>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {product.buttonText}
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footnote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-center text-xs text-muted-foreground mt-8"
          >
            Access instructions are delivered manually via email within 24 hours of confirmed payment.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
