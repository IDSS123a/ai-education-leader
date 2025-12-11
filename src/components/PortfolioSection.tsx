import { motion } from "framer-motion";
import { useState } from "react";
import { 
  TrendingUp, Users, Hospital, Pill, Calculator, ShoppingCart, 
  Truck, Car, Building2, Factory, GraduationCap, BookOpen, 
  Shield, Hotel, UserSearch, Scale, HardHat, UtensilsCrossed, 
  Zap, Warehouse, ChevronDown, ChevronUp, Sparkles, Lightbulb,
  FileText, Brain, Target, BarChart3, Megaphone, Globe, Lock, Briefcase
} from "lucide-react";

// Complete list of 20 web apps - shuffled by industry
const webApps = [
  {
    id: 1,
    name: "Sales Lead Scoring AI",
    industry: "Sales",
    icon: TrendingUp,
    purpose: "Lead prioritization",
    problem: "Sales teams waste time on contacts that will never buy. Most leads are lost because the process isn't automated.",
    solution: "Automatically ranks leads based on purchase likelihood using CRM and behavioral signals.",
    value: "Cuts sales qualification time ~60%; improves conversion 15–30%; focuses sales effort."
  },
  {
    id: 2,
    name: "Clinic Appointment Optimizer",
    industry: "Healthcare",
    icon: Hospital,
    purpose: "Appointment scheduling",
    problem: "Patients wait too long because scheduling isn't optimized. Clinics have empty time slots.",
    solution: "AI reallocates appointments and fills unused time slots automatically.",
    value: "Reduces patient waiting 30–70%; increases utilization; saves personnel time."
  },
  {
    id: 3,
    name: "Credit Risk Automation Engine",
    industry: "Banking",
    icon: Building2,
    purpose: "Credit decisioning",
    problem: "Banks manually process credit applications and waste too much time.",
    solution: "Automated credit scoring with transparent explanations.",
    value: "Loan processing time down 60–90%; bad loans reduced 10–20%."
  },
  {
    id: 4,
    name: "Enterprise Churn Prevention Hub",
    industry: "SaaS / IT",
    icon: Users,
    purpose: "Customer retention",
    problem: "Companies lose users because they don't know when customers are dissatisfied and leaving.",
    solution: "Predicts churn and orchestrates automated retention workflows.",
    value: "Churn reduction 20–40%; revenue saved; retention automation."
  },
  {
    id: 5,
    name: "Hotel Revenue Dynamic Pricing",
    industry: "Hospitality",
    icon: Hotel,
    purpose: "Dynamic pricing",
    problem: "Hotels lose money because prices aren't dynamic.",
    solution: "Real-time pricing based on demand and competitive signals.",
    value: "RevPAR increase 5–20%; higher profitability."
  },
  {
    id: 6,
    name: "Pharmacy Demand Forecaster",
    industry: "Pharmacy",
    icon: Pill,
    purpose: "Stock management",
    problem: "Pharmacies often run out of medications or have excess that expires.",
    solution: "Forecasts drug demand and recommends optimal purchase orders.",
    value: "Stock-outs reduced 60%; expired inventory down 25–50%."
  },
  {
    id: 7,
    name: "Production Line AI Monitor",
    industry: "Manufacturing",
    icon: Factory,
    purpose: "Line optimization",
    problem: "Production lines have expensive downtime that nobody predicts in time.",
    solution: "Real-time anomaly detection and process analytics.",
    value: "Downtime down 30–60%; higher throughput; OPEX savings."
  },
  {
    id: 8,
    name: "Smart Accounting Validator",
    industry: "Finance",
    icon: Calculator,
    purpose: "Transaction audit",
    problem: "Manual validation of financial data takes days and increases error risk.",
    solution: "Automatic validation of bookkeeping entries and policy compliance.",
    value: "Manual review down 70%; lower error rate; faster closing."
  },
  {
    id: 9,
    name: "Route & Load Optimizer",
    industry: "Transport / Logistics",
    icon: Truck,
    purpose: "Route planning",
    problem: "Trucks waste too much fuel and time on poor routes.",
    solution: "Optimizes delivery routes and vehicle load utilization.",
    value: "Fuel cost down 10–25%; better fleet efficiency; faster cycle times."
  },
  {
    id: 10,
    name: "Insurance Fraud Intelligence",
    industry: "Insurance",
    icon: Shield,
    purpose: "Fraud detection",
    problem: "Too many fraudulent claims pass through and money is lost.",
    solution: "Combines rules + ML to score suspicious claims.",
    value: "Loss reduction 25–60%; faster processing of legitimate claims."
  },
  {
    id: 11,
    name: "Retail Demand Planner",
    industry: "Retail",
    icon: ShoppingCart,
    purpose: "Inventory planning",
    problem: "Stores buy too much or too little because they don't know real demand.",
    solution: "SKU-level forecasts with regional modifiers and promo effects.",
    value: "Inventory reduction 15–35%; availability increased; markdown reduced."
  },
  {
    id: 12,
    name: "Contract Risk Analyzer",
    industry: "Legal",
    icon: Scale,
    purpose: "Contract review",
    problem: "Lawyers spend hours reviewing documents.",
    solution: "Flags risky clauses and provides suggested amendments.",
    value: "Legal review effort down 40–70%; lower commercial risk."
  },
  {
    id: 13,
    name: "Fleet Predictive Maintenance",
    industry: "Transport",
    icon: Car,
    purpose: "Maintenance planning",
    problem: "Vehicles break down at the worst time due to unplanned failures.",
    solution: "Predicts failures based on sensor analytics & ML.",
    value: "Downtime reduced 40–75%; fewer emergency repairs; planned maintenance."
  },
  {
    id: 14,
    name: "School Timetable Optimizer Pro",
    industry: "Education",
    icon: GraduationCap,
    purpose: "Schedule planning",
    problem: "Administrator spends days creating schedules without priority logic.",
    solution: "Automates school timetable based on constraints & rules.",
    value: "Admin time reduced 80%; fewer conflicts; better classroom utilization."
  },
  {
    id: 15,
    name: "Construction Cost Planner",
    industry: "Construction",
    icon: HardHat,
    purpose: "Budget optimization",
    problem: "Projects are overpaid due to poor material procurement planning.",
    solution: "Tracks cost and optimizes supply planning.",
    value: "Budget overruns reduced 10–30%; better procurement control."
  },
  {
    id: 16,
    name: "Energy Usage Forecaster",
    industry: "Energy",
    icon: Zap,
    purpose: "Consumption prediction",
    problem: "Companies exceed energy limits and receive penalties.",
    solution: "Predicts usage and balances grids to avoid peaks.",
    value: "Penalty/cost reduction; energy cost optimization 8–25%."
  },
  {
    id: 17,
    name: "Talent Screening & Ranking",
    industry: "HR",
    icon: UserSearch,
    purpose: "Candidate pre-selection",
    problem: "HR spends weeks reviewing CVs.",
    solution: "Scores resumes and cultural compatibility.",
    value: "Shortlisting time cut 70–90%; higher interview quality."
  },
  {
    id: 18,
    name: "Menu Profit Maximizer",
    industry: "Hospitality",
    icon: UtensilsCrossed,
    purpose: "Menu optimization",
    problem: "Restaurants don't know which items bring profit.",
    solution: "Profit analytics per dish with suggested mix.",
    value: "Margin increase 5–15%; better ingredient inventory."
  },
  {
    id: 19,
    name: "Adaptive Learning Companion",
    industry: "Education",
    icon: BookOpen,
    purpose: "Personalized learning",
    problem: "Students get lost because they can't keep up with class pace.",
    solution: "Individual learning paths with analytics and content recommendations.",
    value: "Learning improvement 30–70%; less preparation time for teachers."
  },
  {
    id: 20,
    name: "Smart Warehouse Picker Routing",
    industry: "Logistics",
    icon: Warehouse,
    purpose: "Warehouse efficiency",
    problem: "Workers in warehouses waste time walking unnecessarily.",
    solution: "Optimizes picking sequence and workforce assignment.",
    value: "Picker productivity +20–50%; faster fulfillment."
  }
];

// Complete list of 40 AI prompts - shuffled by industry
const aiPrompts = [
  { id: 21, industry: "Healthcare", title: "Clinical Summary Extractor", description: "Creates structured summaries from unstructured clinical notes.", value: "50–80% physician time saved; faster clinical decisions." },
  { id: 22, industry: "Banking", title: "Credit Underwriting Rationale", description: "Human-readable rationale for automated underwriting.", value: "Higher transparency; reduced regulatory risk; faster approvals." },
  { id: 23, industry: "Retail", title: "SKU Price Elasticity Modeler", description: "Hypotheses for elasticity + suggested tests per SKU.", value: "Revenue potential +3–12%; smarter price experiments." },
  { id: 24, industry: "Pharma", title: "Regulatory Compliance Drafter", description: "Generates documents for CTD submissions according to standards.", value: "Preparation time cut 40–70%; fewer compliance issues." },
  { id: 25, industry: "Manufacturing", title: "Production Bottleneck Solver", description: "Recommendations to increase throughput per station.", value: "Output up 10–25%; downtime reduced." },
  { id: 26, industry: "Finance", title: "Financial Anomaly Investigator", description: "Detects unusual transactions and proposes root-cause hypotheses.", value: "Up to 80% faster incident identification; reduced financial losses." },
  { id: 27, industry: "Transport", title: "Multimodal Route Replanner", description: "Suggests alternative routes based on weather and traffic.", value: "Crisis downtime reduced; time savings 15–40%." },
  { id: 28, industry: "Education", title: "Curriculum Gap Analyzer", description: "Analyzes assessments and identifies content gaps.", value: "Better outcomes; prep time reduced." },
  { id: 29, industry: "Insurance", title: "Claims Fraud Hypothesis Generator", description: "Suggests fraud hypotheses and case prioritization.", value: "Lower losses; more effective audit focus." },
  { id: 30, industry: "Industry", title: "Predictive Maintenance Explainer", description: "Engineering-grade root cause report + maintenance plan.", value: "Faster decision making; lower downtime." },
  { id: 31, industry: "Tourism / Hotels", title: "Dynamic Rate Recommender", description: "Suggests pricing adjustments based on demand patterns.", value: "Revenue increase; better market responsiveness." },
  { id: 32, industry: "HR", title: "Candidate Cultural Fit Assessor", description: "Generates assessments and interview questions.", value: "Lower attrition; better hires." },
  { id: 33, industry: "Legal", title: "Contract Clause Risk Scorer", description: "Rates and explains clause-level contractual risks.", value: "Less legal review effort; faster negotiations." },
  { id: 34, industry: "Education", title: "Personalized Lesson Generator", description: "Differentiated lessons per student style and level.", value: "Prep time down 60–80%; improved learning results." },
  { id: 35, industry: "Construction / Procurement", title: "Procurement Price Negotiator", description: "Generates arguments, benchmarks, and tactics.", value: "Cost savings in procurement 5–15%." },
  { id: 36, industry: "Hospitality", title: "Menu Engineering Optimizer", description: "Suggests menu changes based on profitability and behavior.", value: "Higher menu profitability; better inventory mix." },
  { id: 37, industry: "Energy", title: "Grid Load Balancing Planner", description: "Simulates load and suggests dispatch schedules.", value: "Lower overload events; energy cost optimization." },
  { id: 38, industry: "Logistics", title: "Warehouse Picking Sequence AI", description: "Generates pick path and batching strategy.", value: "Picking time down 20–50%; higher throughput." },
  { id: 39, industry: "Marketing", title: "Marketing Campaign ROI Estimator", description: "Projects campaign ROI and budget allocation.", value: "Higher ROI; smarter budget allocation." },
  { id: 40, industry: "Finance / Tax", title: "Cross-border Tax Assistant", description: "Summarizes key tax implications for cross-border cases.", value: "Fewer filing errors; lower penalty exposure." },
  { id: 41, industry: "Pharma", title: "Clinical Trial Cohort Selector", description: "Recommends stratification criteria and priorities.", value: "Faster enrollment; higher study validity." },
  { id: 42, industry: "Banking", title: "AML Transaction Pattern Finder", description: "ML-augmented suspicious pattern hypotheses.", value: "Better AML detection; lower regulatory risk." },
  { id: 43, industry: "Pharma", title: "Pharmacovigilance Signal Detector", description: "Detects adverse event signals in reports.", value: "Faster response; reduced patient risk." },
  { id: 44, industry: "Finance", title: "Financial Forecast Sensitivity Analyzer", description: "Generates stress test scenarios & variable sensitivities.", value: "Better preparedness; faster capital planning." },
  { id: 45, industry: "Manufacturing", title: "Supplier Risk Monitor", description: "Aggregates supplier performance, logistics, and finance.", value: "Fewer supply interruptions; proactive replacement." },
  { id: 46, industry: "E-commerce", title: "UX Conversion Auditor", description: "Funnel analysis + concrete A/B testing suggestions.", value: "Conversion uplift 5–30%." },
  { id: 47, industry: "IT / Legal", title: "Privacy Impact Assessor", description: "Generates PIA with mitigation points.", value: "Lower compliance risk; faster approvals." },
  { id: 48, industry: "Management", title: "Executive Briefing Generator", description: "Creates concise 1-page insights from large data.", value: "Saves executive time; faster decisions." },
  { id: 49, industry: "PR / Comms", title: "Crisis Comms Playbook Creator", description: "Generates steps and messages for crisis scenarios.", value: "Faster coordinated response; lower reputation risk." },
  { id: 50, industry: "Corporate", title: "M&A Target Quick-Scan", description: "Summarizes finance, risk, synergies, and integration points.", value: "Faster pre-screening; analyst time saved." },
  { id: 51, industry: "AI / Tech", title: "Large-Scale Prompt Chain Architect", description: "Generates modular prompt-chain platform architecture.", value: "Lower development time 30–60%." },
  { id: 52, industry: "Legal", title: "High-Risk Contract Redline Generator", description: "Suggests clause edits and priority risk items.", value: "Faster negotiation; lower legal overhead." },
  { id: 53, industry: "Healthcare", title: "Patient Pathway Optimizer", description: "Maps optimal hospitalization steps and reductions.", value: "Reduced length of stay; cost savings." },
  { id: 54, industry: "Sales", title: "High-Value Sales Pitch Builder", description: "Generates evidence-based personalized sales pitches.", value: "Higher win rate; less prep time." },
  { id: 55, industry: "Regulatory", title: "Compliance-ready Report Formatter", description: "Turns analytical reports into audit-ready documentation.", value: "Audit time reduced; lower regulatory exposure." },
  { id: 56, industry: "Logistics", title: "Supply Chain Disruption Simulator", description: "Generates alternative flows and action plans.", value: "Faster recovery; lower disruption risk." },
  { id: 57, industry: "Healthcare / AI", title: "High-Precision Medical Image Annotator", description: "Suggests annotation & description for radiology images.", value: "Faster annotation; better ML datasets." },
  { id: 58, industry: "AI Governance", title: "Ethical AI Audit Checklist Generator", description: "Generates audit checklist + KPIs & mitigations.", value: "Lower ethical/regulatory risk." },
  { id: 59, industry: "Management", title: "Cross-Functional OKR Synthesizer", description: "Aggregates team goals and proposes aligned OKRs.", value: "Faster alignment; clearer priorities." },
  { id: 60, industry: "IT / DevOps", title: "Auto-Code Review & Refactor Advisor", description: "Suggests refactors and security fixes from commits.", value: "Less tech debt; fewer bugs; faster reviews." }
];

const getIconForIndustry = (industry: string) => {
  const iconMap: Record<string, any> = {
    "Healthcare": Hospital,
    "Healthcare / AI": Hospital,
    "Banking": Building2,
    "Pharma": Pill,
    "Finance": Calculator,
    "Finance / Tax": Calculator,
    "Manufacturing": Factory,
    "Transport": Car,
    "Education": GraduationCap,
    "Insurance": Shield,
    "Retail": ShoppingCart,
    "Legal": Scale,
    "E-commerce": ShoppingCart,
    "IT / Legal": Lock,
    "IT / DevOps": Brain,
    "AI / Tech": Brain,
    "AI Governance": Brain,
    "HR": UserSearch,
    "Hospitality": Hotel,
    "Tourism / Hotels": Hotel,
    "Construction / Procurement": HardHat,
    "Energy": Zap,
    "Logistics": Warehouse,
    "Marketing": Megaphone,
    "Industry": Factory,
    "Management": Briefcase,
    "Corporate": Briefcase,
    "PR / Comms": Megaphone,
    "Regulatory": FileText,
    "Sales": TrendingUp
  };
  return iconMap[industry] || Lightbulb;
};

export const PortfolioSection = () => {
  const [expandedApp, setExpandedApp] = useState<number | null>(null);
  const [showAllPrompts, setShowAllPrompts] = useState(false);

  const displayedPrompts = showAllPrompts ? aiPrompts : aiPrompts.slice(0, 12);

  return (
    <section id="portfolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI-Powered Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            60 enterprise-grade AI solutions solving real business problems across 25+ industries with measurable ROI
          </p>
        </motion.div>

        {/* Web Apps Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Web Applications</h3>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              20 solutions
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {webApps.map((app, index) => {
              const Icon = app.icon;
              const isExpanded = expandedApp === app.id;

              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-300 ${
                    isExpanded ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedApp(isExpanded ? null : app.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm leading-tight">
                            {app.name}
                          </h4>
                          <span className="text-xs text-muted-foreground">{app.industry}</span>
                        </div>
                      </div>
                      <button className="text-muted-foreground hover:text-primary transition-colors">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-3"
                      >
                        <div>
                          <h5 className="text-xs font-semibold text-muted-foreground mb-1">Purpose:</h5>
                          <p className="text-sm text-foreground">{app.purpose}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-destructive mb-1">Problem:</h5>
                          <p className="text-sm text-muted-foreground">{app.problem}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-primary mb-1">Solution:</h5>
                          <p className="text-sm text-muted-foreground">{app.solution}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-accent mb-1">Value Delivered:</h5>
                          <p className="text-sm text-accent">{app.value}</p>
                        </div>
                      </motion.div>
                    )}

                    {!isExpanded && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {app.solution}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Prompts Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="w-6 h-6 text-accent" />
            <h3 className="text-2xl font-bold text-foreground">AI Prompts</h3>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
              40 solutions
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedPrompts.map((prompt, index) => {
              const Icon = getIconForIndustry(prompt.industry);
              return (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="bg-card rounded-xl border border-border/50 p-4 hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-md bg-accent/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      {prompt.industry}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-2 group-hover:text-accent transition-colors">
                    {prompt.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {prompt.description}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    {prompt.value}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {!showAllPrompts && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <button
                onClick={() => setShowAllPrompts(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 text-accent rounded-full hover:bg-accent/20 transition-colors font-medium"
              >
                Show All Prompts
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
