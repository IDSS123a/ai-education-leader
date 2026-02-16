import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, AlertTriangle, Lightbulb, TrendingUp, Code2 } from "lucide-react";
import { PortfolioThumbnail } from "./PortfolioThumbnail";

interface WebAppDetail {
  type: "app";
  id: number;
  name: string;
  industry: string;
  purpose: string;
  problem: string;
  solution: string;
  value: string;
  techStack: string[];
}

interface PromptDetail {
  type: "prompt";
  id: number;
  industry: string;
  title: string;
  description: string;
  value: string;
  techStack: string[];
}

type PortfolioItem = WebAppDetail | PromptDetail;

interface PortfolioDetailCardProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export function PortfolioDetailCard({ item, onClose }: PortfolioDetailCardProps) {
  if (!item) return null;

  const isApp = item.type === "app";
  const name = isApp ? item.name : item.title;
  const accentClass = isApp ? "text-primary" : "text-accent";
  const accentBgClass = isApp ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent";

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg sm:max-h-[85vh] bg-card rounded-2xl border border-border shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header with thumbnail */}
            <div className="relative aspect-[16/9] bg-muted/30 flex-shrink-0">
              <PortfolioThumbnail
                id={item.id}
                industry={item.industry}
                type={isApp ? "app" : "prompt"}
                className="w-full h-full"
              />
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${accentBgClass} backdrop-blur-sm border border-border/50`}>
                  {item.industry}
                </span>
                <button
                  onClick={onClose}
                  className="p-1.5 bg-card/90 backdrop-blur-sm rounded-lg text-muted-foreground hover:text-foreground border border-border/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider ${accentBgClass}`}>
                  {isApp ? "Web Application" : "AI Prompt"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              <h3 className="text-xl font-bold text-foreground mb-1">{name}</h3>
              {isApp && (
                <p className="text-xs text-muted-foreground mb-4">{item.purpose}</p>
              )}

              <div className="space-y-4">
                {isApp ? (
                  <>
                    <div className="flex gap-3">
                      <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-semibold text-destructive uppercase tracking-wider mb-0.5">Problem</p>
                        <p className="text-sm text-muted-foreground">{item.problem}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Lightbulb className={`w-4 h-4 ${accentClass} flex-shrink-0 mt-0.5`} />
                      <div>
                        <p className={`text-[10px] font-semibold ${accentClass} uppercase tracking-wider mb-0.5`}>Solution</p>
                        <p className="text-sm text-muted-foreground">{item.solution}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <Lightbulb className={`w-4 h-4 ${accentClass} flex-shrink-0 mt-0.5`} />
                    <div>
                      <p className={`text-[10px] font-semibold ${accentClass} uppercase tracking-wider mb-0.5`}>Description</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-semibold text-green-500 uppercase tracking-wider mb-0.5">Value</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex gap-3">
                  <Code2 className={`w-4 h-4 ${accentClass} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p className={`text-[10px] font-semibold ${accentClass} uppercase tracking-wider mb-1.5`}>Tech Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-muted rounded-md text-[11px] font-medium text-muted-foreground border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
