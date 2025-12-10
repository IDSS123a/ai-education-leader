import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, TrendingUp, Users, Briefcase, Landmark, Heart } from "lucide-react";

const experiences = [
  {
    title: "CEO / Managing Director",
    organization: "Internationale Deutsche Schule Sarajevo & International Montessori House",
    period: "Jul 2020 – Present",
    icon: Building2,
    achievements: [
      "Led operational management enhancing adherence to German curricula through AI-supported performance tracking",
      "Created strategic plans driving 220% increase in student enrollment",
      "Spearheaded recruitment initiatives, boosting employee retention by 30%",
      "Facilitated IB Middle Years Programme adoption, securing €45,000 in funding",
      "Implemented ISO 9001:2015 and HACCP standards, achieving 30% reduction in non-conformance",
    ],
    metrics: { revenue: "€815K", growth: "▲240%", team: "53" },
    technologies: ["AI Analytics", "Predictive Tools", "LMS", "IBMYP"],
    current: true,
  },
  {
    title: "Corporate Sales Manager",
    organization: "Bisnode / Dun & Bradstreet",
    period: "Jul 2019 – Jul 2020",
    icon: TrendingUp,
    achievements: [
      "Advised 80+ companies on commercial strategies, contributing to 25% average revenue boost",
      "Built high-performing sales team of 6, increasing efficiency by 40%",
      "Launched two innovative product lines, increasing sales by €84,000 annually",
      "Managed 50+ key accounts, driving 44% revenue growth",
    ],
    metrics: { growth: "44%", clients: "80+" },
  },
  {
    title: "CEO / Managing Director & COO",
    organization: "Blue Trade Ltd. (Krautz-Temax Group)",
    period: "Feb 2018 – Jul 2019",
    icon: Briefcase,
    achievements: [
      "Formulated strategic business plans driving €394,000 in net profit (+673%)",
      "Designed operational strategies boosting efficiency by 25%",
      "Strengthened partnerships facilitating €1.2M in joint ventures",
      "Directed financial oversight achieving 40% ROI across business units",
    ],
    metrics: { profit: "€394K", growth: "▲673%", team: "8" },
  },
  {
    title: "CEO (Assistant General Manager) / COO",
    organization: "Xylon Corporation Ltd. (Plena Group)",
    period: "Apr 2015 – Feb 2018",
    icon: Building2,
    achievements: [
      "Directed corporate strategy contributing to €16M (+33%) operating income",
      "Managed cross-functional team of 190 employees, improving productivity by 35%",
      "Engineered production strategies leading to €15M annual revenue",
      "Reorganized procurement systems, saving €400,000 annually",
      "Orchestrated ERP implementation, cutting lead times by 30%",
    ],
    metrics: { income: "€16M", growth: "▲33%", team: "197" },
    technologies: ["ERP Systems", "ISO", "FSC", "PEFC", "LEAN"],
  },
  {
    title: "CEO / Business Development Director",
    organization: "D.I.K. International Limited",
    period: "Jan 2013 – Apr 2015",
    icon: TrendingUp,
    achievements: [
      "Streamlined organizational strategy resulting in 32% increase to €10M revenue",
      "Enhanced HR practices improving employee retention by 20%",
      "Implemented innovative strategies generating €2.4M in additional revenue",
      "Led KAIZEN initiatives cutting operational waste by 30%",
    ],
    metrics: { revenue: "€10M", growth: "▲32%", team: "42" },
  },
  {
    title: "CEO / Head of Regional Office",
    organization: "LOK Microcredit Foundation",
    period: "Apr 2007 – Jan 2013",
    icon: Landmark,
    achievements: [
      "Directed operations for 16 regional offices, expanding portfolio by 300% to €12M",
      "Expanded operations by establishing 12 new offices and recruiting 33 credit officers",
      "Chaired loan committee with 97% repayment rate",
      "Increased client base by 364% through innovative credit strategies",
    ],
    metrics: { portfolio: "€12M", growth: "▲300%", team: "43" },
  },
  {
    title: "CEO / Managing Director",
    organization: "Hospitalija Trgovina d.o.o.",
    period: "Dec 2003 – Apr 2007",
    icon: Heart,
    achievements: [
      "Implemented ISO 9001:2000 standards, reducing documentation errors by 40%",
      "Built strategic client partnerships generating €2M in opportunities",
      "Executed marketing strategies boosting net sales by 45%",
      "Secured exclusive dealership agreements increasing revenue by €400,000 annually",
    ],
    metrics: { revenue: "€2M", team: "8" },
  },
  {
    title: "Senior Operations Associate",
    organization: "USAID, KPMG – Banking Project (Balkans)",
    period: "Mar 1997 – Dec 2003",
    icon: Landmark,
    achievements: [
      "Directed Operations Unit achieving 25% improvement in efficiency",
      "Managed credit and loan approvals, disbursing €10M+ in funds",
      "Implemented VBA solutions reducing operational costs by €250,000 annually",
      "Delivered analytical reports to the US Ambassador on major funding allocations",
    ],
    metrics: { disbursed: "€10M+", savings: "€250K" },
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            >
              Professional Journey
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              25+ Years of Executive Leadership
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Driving growth, innovation, and operational excellence across education, 
              finance, manufacturing, and corporate sectors.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="relative mb-8 last:mb-0 pl-16 md:pl-20"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-0 md:left-2 w-12 h-12 rounded-full flex items-center justify-center border-4 border-background z-10 ${
                    exp.current ? "bg-primary" : "bg-card border-primary/30"
                  }`}>
                    <Icon className={`w-5 h-5 ${exp.current ? "text-primary-foreground" : "text-primary"}`} />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`bg-card p-6 lg:p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all ${
                      exp.current ? "border-2 border-primary/30" : "border border-border"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        {exp.current && (
                          <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium mb-2">
                            Current Role
                          </span>
                        )}
                        <h3 className="text-xl font-bold text-foreground">
                          {exp.title}
                        </h3>
                        <p className="text-primary font-medium">
                          {exp.organization}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exp.period}
                        </p>
                      </div>

                      {/* Metrics */}
                      {exp.metrics && (
                        <div className="flex flex-wrap gap-3">
                          {Object.entries(exp.metrics).map(([key, value]) => (
                            <div key={key} className="text-center bg-background px-3 py-2 rounded-lg">
                              <div className="text-lg font-bold text-primary">{value}</div>
                              <div className="text-xs text-muted-foreground capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    {exp.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
