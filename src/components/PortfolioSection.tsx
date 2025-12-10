import { motion } from "framer-motion";
import { useState } from "react";
import { 
  TrendingUp, Users, Hospital, Pill, Calculator, ShoppingCart, 
  Truck, Car, Building2, Factory, GraduationCap, BookOpen, 
  Shield, Hotel, UserSearch, Scale, HardHat, UtensilsCrossed, 
  Zap, Warehouse, ChevronDown, ChevronUp, Sparkles, Lightbulb
} from "lucide-react";

const webApps = [
  {
    id: 1,
    name: "Sales Lead Scoring AI",
    industry: "Prodaja",
    icon: TrendingUp,
    problem: "Prodajne ekipe troše vrijeme na kontakte koji nikada neće kupiti. Većina leadova se izgubi jer proces nije automatiziran.",
    solution: "AI aplikacija automatski rangira leadove po vjerovatnoći kupovine i predlaže optimalne korake follow-upa.",
    features: ["Automatsko rangiranje leadova", "Prediktivna analitika", "CRM integracija", "Real-time scoring"]
  },
  {
    id: 2,
    name: "Customer Churn Predictor",
    industry: "SaaS / IT",
    icon: Users,
    problem: "Kompanije gube korisnike jer ne znaju kada su nezadovoljni i odlaze. Reaktivno djeluju prekasno.",
    solution: "Sistem koristi AI da predvidi koji će korisnici otkazati i automatski pokreće preventivne akcije.",
    features: ["Churn prediction", "Automatske kampanje zadržavanja", "Sentiment analiza", "Dashboard metrika"]
  },
  {
    id: 3,
    name: "Hospital Appointment Optimizer",
    industry: "Zdravstvo",
    icon: Hospital,
    problem: "Pacijenti čekaju predugo jer raspored nije optimizovan. Klinike imaju prazne termine.",
    solution: "AI automatski popunjava praznine i predlaže optimalno raspoređivanje doktora i termina.",
    features: ["Smart scheduling", "No-show prediction", "Automatski reminderi", "Kapacitet optimizacija"]
  },
  {
    id: 4,
    name: "Pharmacy Inventory Intelligent Stock",
    industry: "Farmacija",
    icon: Pill,
    problem: "Farmacije često ili ostaju bez lijekova ili imaju višak koji ističe.",
    solution: "AI prognozira potražnju i naručuje optimalne količine lijekova.",
    features: ["Demand forecasting", "Expiry tracking", "Auto-naručivanje", "Supplier integracija"]
  },
  {
    id: 5,
    name: "Smart Accounting Validator",
    industry: "Financije",
    icon: Calculator,
    problem: "Ručna validacija finansijskih podataka troši dane i povećava rizik greške.",
    solution: "AI automatski provjerava transakcije i označava sumnjive ili netačne unose.",
    features: ["Anomaly detection", "Auto-reconciliation", "Compliance check", "Audit trail"]
  },
  {
    id: 6,
    name: "Retail Demand Forecasting",
    industry: "Maloprodaja",
    icon: ShoppingCart,
    problem: "Trgovine kupuju previše ili premalo robe jer ne znaju stvarnu potražnju.",
    solution: "Algoritmi predviđaju prodaju po artiklu po sedmici i optimizuju narudžbe.",
    features: ["SKU-level forecasting", "Sezonska analiza", "Inventory optimization", "POS integracija"]
  },
  {
    id: 7,
    name: "AI Transport Route Optimizer",
    industry: "Transport i logistika",
    icon: Truck,
    problem: "Kamioni troše previše goriva i vremena na loše rute.",
    solution: "AI izračunava optimalne rute i minimizira transportne troškove.",
    features: ["Multi-stop optimization", "Real-time traffic", "Fuel savings tracking", "Fleet dashboard"]
  },
  {
    id: 8,
    name: "Fleet Predictive Maintenance",
    industry: "Transport",
    icon: Car,
    problem: "Vozila staju u najgorem trenutku zbog neplanske kvara.",
    solution: "Aplikacija predviđa kvarove na osnovu kilometraže i senzora.",
    features: ["IoT senzor integracija", "Maintenance scheduling", "Cost prediction", "Alert sistem"]
  },
  {
    id: 9,
    name: "Bank Risk Scoring Engine",
    industry: "Bankarstvo",
    icon: Building2,
    problem: "Banke ručno obrađuju kreditne zahtjeve i previše gube vremena.",
    solution: "AI automatski procjenjuje rizik i preporučuje odobrenje / odbijanje.",
    features: ["Credit scoring", "Risk assessment", "Regulatory compliance", "Decision automation"]
  },
  {
    id: 10,
    name: "Production Line AI Monitor",
    industry: "Proizvodnja",
    icon: Factory,
    problem: "Proizvodne linije imaju skupe zastoje koje niko na vrijeme ne predvidi.",
    solution: "Sistem analizira mašine u realnom vremenu i predlaže intervencije.",
    features: ["Real-time monitoring", "Predictive alerts", "OEE tracking", "SCADA integracija"]
  },
  {
    id: 11,
    name: "Smart School Timetable Generator",
    industry: "Obrazovanje",
    icon: GraduationCap,
    problem: "Administrator provodi dane u pravljenju rasporeda bez logike prioriteta.",
    solution: "AI raspoređuje časove, profesore, učionice i optimizuje vrijeme.",
    features: ["Constraint optimization", "Room allocation", "Teacher preferences", "Conflict resolution"]
  },
  {
    id: 12,
    name: "AI Learning Assistant",
    industry: "Obrazovanje",
    icon: BookOpen,
    problem: "Učenici se gube jer ne prate tempo nastave.",
    solution: "Aplikacija personalizira sadržaj i kreira individualni plan učenja.",
    features: ["Adaptive learning", "Progress tracking", "Knowledge gaps ID", "Personalized content"]
  },
  {
    id: 13,
    name: "Insurance Fraud Detection",
    industry: "Osiguranje",
    icon: Shield,
    problem: "Previše lažnih zahtjeva prolazi i gubi se novac.",
    solution: "AI automatski označava sumnjive zahtjeve i procjenjuje rizik od prevare.",
    features: ["Pattern recognition", "Risk scoring", "Claims automation", "Investigation prioritization"]
  },
  {
    id: 14,
    name: "Hotel Dynamic Pricing",
    industry: "Turizam",
    icon: Hotel,
    problem: "Hoteli gube novac jer cijene nisu dinamične.",
    solution: "AI mijenja cijene u realnom vremenu prema potražnji i konkurenciji.",
    features: ["Competitor monitoring", "Demand prediction", "Revenue optimization", "Channel management"]
  },
  {
    id: 15,
    name: "Smart HR Recruiting",
    industry: "HR",
    icon: UserSearch,
    problem: "HR provodi sedmice pregledajući CV-e.",
    solution: "AI automatski rangira kandidate po kompetencijama.",
    features: ["CV parsing", "Skill matching", "Bias reduction", "Interview scheduling"]
  },
  {
    id: 16,
    name: "Legal Document Analyzer",
    industry: "Pravo",
    icon: Scale,
    problem: "Advokati troše sate da pregledaju dokumente.",
    solution: "AI analizira ugovore i označava rizike i sporne klauzule.",
    features: ["Contract analysis", "Risk highlighting", "Clause extraction", "Compliance check"]
  },
  {
    id: 17,
    name: "Construction Cost Optimizer",
    industry: "Građevina",
    icon: HardHat,
    problem: "Projekti se preplaćuju zbog loše planirane nabavke materijala.",
    solution: "Aplikacija optimizira količine i cijene materijala.",
    features: ["BOM optimization", "Supplier bidding", "Cost tracking", "Project forecasting"]
  },
  {
    id: 18,
    name: "Restaurant Menu Profit Engine",
    industry: "Ugostiteljstvo",
    icon: UtensilsCrossed,
    problem: "Restorani ne znaju koji artikli donose profit.",
    solution: "AI predlaže jelovnik s najvećim profitom po sastojku.",
    features: ["Menu engineering", "Cost analysis", "Margin optimization", "Sales prediction"]
  },
  {
    id: 19,
    name: "Energy Consumption Predictor",
    industry: "Energetika",
    icon: Zap,
    problem: "Kompanije prelaze energetske limite i dobivaju penale.",
    solution: "AI predviđa potrošnju i šalje upozorenja prije prekoračenja.",
    features: ["Consumption forecasting", "Peak alerts", "Cost optimization", "Sustainability reporting"]
  },
  {
    id: 20,
    name: "Smart Warehouse Routing",
    industry: "Logistika",
    icon: Warehouse,
    problem: "Radnici u skladištu gube vrijeme hodajući nepotrebno.",
    solution: "Sistem optimizuje rute fizičkog kretanja u skladištu.",
    features: ["Pick path optimization", "Slot assignment", "Labor tracking", "WMS integracija"]
  }
];

const aiPrompts = [
  { id: 1, industry: "Prodaja", title: "Lead Qualification Prompt", description: "Analiziraj ovog potencijalnog klijenta i ocijeni vjerovatnoću kupovine od 1-100 na osnovu: industrije, veličine kompanije, prethodne interakcije i budget signala." },
  { id: 2, industry: "Prodaja", title: "Objection Handler", description: "Generiraj 5 odgovora na prigovor 'Cijena vam je previsoka' prilagođenih B2B software prodaji." },
  { id: 3, industry: "Marketing", title: "Content Calendar Generator", description: "Kreiraj mjesečni content plan za LinkedIn s 20 postova koji pokrivaju thought leadership, case studies i engagement postove." },
  { id: 4, industry: "Marketing", title: "Ad Copy Optimizer", description: "Napiši 10 varijanti Facebook ad copy-a za [proizvod] testirajući različite hooks, benefite i CTA-ove." },
  { id: 5, industry: "HR", title: "Interview Question Generator", description: "Generiraj 15 behavioral interview pitanja za poziciju [role] fokusirajući se na problem-solving i leadership." },
  { id: 6, industry: "HR", title: "Performance Review Assistant", description: "Na osnovu ovih KPI-eva i feedback-a, napiši konstruktivan performance review s konkretnim preporukama za razvoj." },
  { id: 7, industry: "Finansije", title: "Financial Report Summarizer", description: "Analiziraj ovaj finansijski izvještaj i identificiraj top 5 rizika i 5 prilika s konkretnim brojevima." },
  { id: 8, industry: "Finansije", title: "Budget Variance Analyzer", description: "Usporedi planirani i ostvareni budget, identificiraj odstupanja veća od 10% i predloži korekcije." },
  { id: 9, industry: "IT", title: "Code Review Assistant", description: "Pregledaj ovaj kod i identificiraj security vulnerabilities, performance issues i predloži best practices." },
  { id: 10, industry: "IT", title: "Technical Documentation Writer", description: "Na osnovu ovog koda, generiraj API dokumentaciju s primjerima korištenja i error handling-om." },
  { id: 11, industry: "Zdravstvo", title: "Patient Triage Assistant", description: "Na osnovu simptoma, predloži prioritet tretmana i potrebne dijagnostičke testove." },
  { id: 12, industry: "Zdravstvo", title: "Medical Report Simplifier", description: "Pretvori ovaj medicinski nalaz u razumljiv tekst za pacijenta bez medicinskog znanja." },
  { id: 13, industry: "Pravo", title: "Contract Risk Analyzer", description: "Analiziraj ovaj ugovor i identificiraj sve rizične klauzule s objašnjenjem potencijalnih posljedica." },
  { id: 14, industry: "Pravo", title: "Legal Research Assistant", description: "Pronađi relevantne presude i zakone vezane za [pravno pitanje] u jurisdikciji [država]." },
  { id: 15, industry: "Obrazovanje", title: "Lesson Plan Creator", description: "Kreiraj detaljan plan časa za [temu] uključujući ciljeve, aktivnosti, materijale i evaluaciju." },
  { id: 16, industry: "Obrazovanje", title: "Student Feedback Generator", description: "Na osnovu ovih rezultata, napiši personalizirani feedback za učenika s konkretnim savjetima za poboljšanje." },
  { id: 17, industry: "Turizam", title: "Travel Itinerary Optimizer", description: "Kreiraj optimalni 7-dnevni itinerar za [destinaciju] balansirajući atrakcije, odmor i budget." },
  { id: 18, industry: "Turizam", title: "Guest Review Responder", description: "Napiši profesionalni odgovor na negativnu recenziju hotela adresirujući specifične pritužbe." },
  { id: 19, industry: "Proizvodnja", title: "Quality Issue Root Cause", description: "Analiziraj ove podatke o defektima i identificiraj najvjerovatnije root cause s preporukama za korekciju." },
  { id: 20, industry: "Proizvodnja", title: "Production Schedule Optimizer", description: "Na osnovu narudžbi i kapaciteta, predloži optimalni proizvodni raspored minimizirajući changeover vrijeme." },
  { id: 21, industry: "Retail", title: "Product Description Writer", description: "Napiši SEO-optimiziran opis proizvoda koji ističe benefite, specifikacije i odgovara na česte upite kupaca." },
  { id: 22, industry: "Retail", title: "Customer Complaint Handler", description: "Generiraj empatičan odgovor na pritužbu kupca nudeći konkretno rješenje i kompenzaciju." },
  { id: 23, industry: "Logistika", title: "Delivery Route Planner", description: "Optimiziraj rute za 50 dostava minimizirajući ukupnu kilometražu i poštujući vremenske prozore." },
  { id: 24, industry: "Logistika", title: "Inventory Reorder Calculator", description: "Na osnovu povijesne prodaje i lead time-a, izračunaj optimalne reorder points i safety stock." },
  { id: 25, industry: "Osiguranje", title: "Claim Assessment Assistant", description: "Analiziraj ovaj zahtjev za odštetu i ocijeni vjerovatnoću prevare s obrazloženjem." },
  { id: 26, industry: "Osiguranje", title: "Policy Recommendation Engine", description: "Na osnovu profila klijenta, preporuči najprikladniju policu s detaljnim obrazloženjem pokrića." },
  { id: 27, industry: "Bankarstvo", title: "Loan Application Evaluator", description: "Analiziraj finansijske podatke aplikanta i procijeni kreditnu sposobnost s preporukom uvjeta." },
  { id: 28, industry: "Bankarstvo", title: "Fraud Detection Alert", description: "Pregledaj ove transakcije i identificiraj sumnjive obrasce koji mogu indicirati pranje novca." },
  { id: 29, industry: "Energetika", title: "Energy Audit Reporter", description: "Na osnovu podataka o potrošnji, identificiraj top 5 prilika za uštedu energije s ROI kalkulacijom." },
  { id: 30, industry: "Energetika", title: "Outage Impact Analyzer", description: "Procijeni utjecaj planiranog prekida na korisnike i predloži optimalno vrijeme intervencije." },
  { id: 31, industry: "Građevina", title: "Project Risk Assessor", description: "Analiziraj ovaj građevinski projekt i identificiraj top 10 rizika s mitigation strategijama." },
  { id: 32, industry: "Građevina", title: "Material Quantity Estimator", description: "Na osnovu nacrta, izračunaj precizne količine materijala s 10% contingency-em." },
  { id: 33, industry: "Ugostiteljstvo", title: "Menu Engineering Analyzer", description: "Analiziraj profitabilnost svakog jela i preporuči promjene cijena ili pozicioniranja na meniju." },
  { id: 34, industry: "Ugostiteljstvo", title: "Staff Scheduling Optimizer", description: "Kreiraj sedmični raspored osoblja balansirajući troškove, potrebe i preferencije zaposlenika." },
  { id: 35, industry: "Farmacija", title: "Drug Interaction Checker", description: "Analiziraj ovu listu lijekova i identificiraj potencijalne interakcije s preporukama." },
  { id: 36, industry: "Farmacija", title: "Prescription Validator", description: "Provjeri ovaj recept za doziranje, kontraindikacije i usklađenost s protokolima." },
  { id: 37, industry: "Consulting", title: "Business Case Builder", description: "Na osnovu ovih podataka, kreiraj business case s cost-benefit analizom i ROI projekcijom." },
  { id: 38, industry: "Consulting", title: "Competitive Analysis Report", description: "Analiziraj konkurente i identificiraj SWOT s konkretnim preporukama za diferencijaciju." },
  { id: 39, industry: "General", title: "Meeting Summary Generator", description: "Na osnovu transkripta sastanka, generiraj strukturirani sažetak s action itemima i odgovornim osobama." },
  { id: 40, industry: "General", title: "Email Response Optimizer", description: "Prepiši ovaj email da bude profesionalniji, kraći i s jasnim CTA-om." }
];

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
            20 web aplikacija i 40 AI promptova koji rješavaju stvarne poslovne probleme u različitim industrijama
          </p>
        </motion.div>

        {/* Web Apps Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Web Aplikacije</h3>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              20 rješenja
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
                          <h5 className="text-xs font-semibold text-destructive mb-1">Problem:</h5>
                          <p className="text-sm text-muted-foreground">{app.problem}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-primary mb-1">Rješenje:</h5>
                          <p className="text-sm text-muted-foreground">{app.solution}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-semibold text-foreground mb-2">Funkcionalnosti:</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {app.features.map((feature, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
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
            <h3 className="text-2xl font-bold text-foreground">AI Promptovi</h3>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
              40 rješenja
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedPrompts.map((prompt, index) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="bg-card rounded-xl border border-border/50 p-4 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    {prompt.industry}
                  </span>
                  <span className="text-xs text-muted-foreground">#{prompt.id}</span>
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-2 group-hover:text-accent transition-colors">
                  {prompt.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {prompt.description}
                </p>
              </motion.div>
            ))}
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
                Prikaži sve promptove
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
