import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import awardCeremony from "@/assets/award-ceremony.jpg";
import speakingEvent from "@/assets/speaking-event.jpg";

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "€16M", label: "Operating Income Growth" },
  { value: "90%", label: "Revenue Boost" },
  { value: "1000+", label: "Professionals Led" },
];

const competencies = [
  "Leadership & Future-Ready Management",
  "AI Strategy & Digital Transformation",
  "Workforce Development & Team Building",
  "Business Strategy & Sales Development",
  "Financial & Production Management",
  "Complex Problem Solving",
  "Negotiation",
  "Client Acquisition",
  "New Market Penetration",
];

const education = [
  { degree: "Master of International Business", institution: "Cambridge International Business Study" },
  { degree: "Doctor of Veterinary Medicine", institution: "Veterinary Faculty" },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            >
              About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground"
            >
              Executive Leader & AI Strategist
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Executive Leader and expert in AI Strategy and Digital Transformation with over 25 years 
                of experience driving growth, innovation, and operational excellence across multiple industries. 
                In my roles as CEO and Managing Director, I have a proven track record of delivering strong 
                financial results, including a €16M (33%) increase in operating income and a 90% boost in revenue.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Leveraging my deep understanding of business needs and emerging technologies, I bridge traditional 
                leadership with AI-powered solutions, creating strategic roadmaps, implementing no-code AI tools, 
                and enabling data-driven decision-making that accelerates sustainable growth.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                A skilled negotiator and relationship builder, I have secured contracts exceeding €11M and 
                cultivated long-term partnerships with key clients and suppliers. My initiatives have driven 
                a 50% increase in employee engagement, demonstrating my ability to combine results-driven 
                leadership with people-centered management.
              </p>

              {/* Education */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Education</h3>
                <div className="space-y-3">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-background p-4 rounded-xl border border-border"
                    >
                      <div className="font-medium text-foreground">{edu.degree}</div>
                      <div className="text-sm text-muted-foreground">{edu.institution}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Competencies */}
              <h3 className="text-lg font-semibold text-foreground mb-4">Core Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {competencies.map((item, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-background p-6 lg:p-8 rounded-2xl text-center shadow-card hover:shadow-card-hover transition-shadow"
                  >
                    <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Achievement Images */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.85 }}
                className="relative group"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                    <img
                      src={awardCeremony}
                      alt="Receiving Business Excellence Award"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-xs font-medium text-primary bg-background/90 px-2 py-1 rounded-full">
                        Award Ceremony
                      </span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                    <img
                      src={speakingEvent}
                      alt="Keynote Speaker at Business Leaders Summit"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-xs font-medium text-primary bg-background/90 px-2 py-1 rounded-full">
                        Keynote Speaker
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm text-muted-foreground">
                    Sustainable Development Business Leaders Award 2025
                  </p>
                </div>
              </motion.div>

              {/* Languages & Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
                className="bg-background p-6 rounded-2xl shadow-card"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Languages</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Bosnian/Croatian/Serbian</span>
                    <span className="text-primary font-medium">C2 Native</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">English</span>
                    <span className="text-primary font-medium">C1 Professional</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">German</span>
                    <span className="text-muted-foreground">A2</span>
                  </div>
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
                className="bg-background p-6 rounded-2xl shadow-card"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Standards & Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {["ISO 9001:2015", "HACCP", "FSC", "PEFC", "ERP Implementation", "KAIZEN", "LEAN", "IAS"].map((cert, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
