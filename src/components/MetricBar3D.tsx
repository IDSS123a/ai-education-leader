import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface MetricBar3DProps {
  metric: string;
  label: string;
  sub?: string;
  percentage: number; // 0-100 for bar height
  delay?: number;
  color?: "primary" | "accent" | "purple" | "amber";
}

const colorMap = {
  primary: {
    front: "from-primary/90 to-primary/70",
    top: "bg-primary/50",
    side: "from-primary/60 to-primary/40",
    glow: "shadow-[0_0_30px_hsl(var(--primary)/0.3)]",
    text: "text-primary",
  },
  accent: {
    front: "from-accent/90 to-accent/70",
    top: "bg-accent/50",
    side: "from-accent/60 to-accent/40",
    glow: "shadow-[0_0_30px_hsl(var(--accent)/0.3)]",
    text: "text-accent",
  },
  purple: {
    front: "from-[hsl(var(--accent-purple))]/90 to-[hsl(var(--accent-purple))]/70",
    top: "bg-[hsl(var(--accent-purple))]/50",
    side: "from-[hsl(var(--accent-purple))]/60 to-[hsl(var(--accent-purple))]/40",
    glow: "shadow-[0_0_30px_hsl(var(--accent-purple)/0.3)]",
    text: "text-[hsl(var(--accent-purple))]",
  },
  amber: {
    front: "from-[hsl(var(--accent-amber))]/90 to-[hsl(var(--accent-amber))]/70",
    top: "bg-[hsl(var(--accent-amber))]/50",
    side: "from-[hsl(var(--accent-amber))]/60 to-[hsl(var(--accent-amber))]/40",
    glow: "shadow-[0_0_30px_hsl(var(--accent-amber)/0.3)]",
    text: "text-[hsl(var(--accent-amber))]",
  },
};

export function MetricBar3D({
  metric,
  label,
  sub,
  percentage,
  delay = 0,
  color = "primary",
}: MetricBar3DProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const c = colorMap[color];

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      {/* Metric value */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: delay + 0.3, duration: 0.4 }}
        className={`text-xl md:text-2xl font-bold ${c.text}`}
      >
        {metric}
      </motion.div>

      {/* 3D Bar */}
      <div className="relative h-32 md:h-40 w-14 md:w-16" style={{ perspective: "400px" }}>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{
            delay,
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute bottom-0 w-full origin-bottom"
          style={{
            height: `${percentage}%`,
            transformStyle: "preserve-3d",
            transform: "rotateX(-5deg) rotateY(-15deg)",
          }}
        >
          {/* Front face */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${c.front} rounded-t-lg ${c.glow} backdrop-blur-sm`}
          />

          {/* Top face */}
          <div
            className={`absolute top-0 left-0 w-full h-3 ${c.top} rounded-t-sm`}
            style={{
              transform: "rotateX(60deg) translateZ(6px)",
              transformOrigin: "bottom",
            }}
          />

          {/* Right face */}
          <div
            className={`absolute top-0 right-0 w-3 h-full bg-gradient-to-b ${c.side} rounded-r-sm`}
            style={{
              transform: "rotateY(-60deg) translateZ(6px)",
              transformOrigin: "left",
            }}
          />

          {/* Reflection line */}
          <div className="absolute inset-y-0 left-1 w-[2px] bg-white/20 rounded-full" />
        </motion.div>

        {/* Base shadow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-2 bg-primary/10 rounded-full blur-sm" />
      </div>

      {/* Labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.5, duration: 0.4 }}
        className="text-center"
      >
        {sub && (
          <div className="text-xs font-semibold text-accent">{sub}</div>
        )}
        <div className="text-xs text-muted-foreground leading-tight max-w-[80px]">
          {label}
        </div>
      </motion.div>
    </div>
  );
}

interface MetricBarGroupProps {
  metrics: {
    metric: string;
    label: string;
    sub?: string;
    percentage: number;
    color?: "primary" | "accent" | "purple" | "amber";
  }[];
  className?: string;
}

export function MetricBarGroup({ metrics, className = "" }: MetricBarGroupProps) {
  return (
    <div className={`flex items-end justify-center gap-6 md:gap-8 ${className}`}>
      {metrics.map((m, i) => (
        <MetricBar3D
          key={i}
          metric={m.metric}
          label={m.label}
          sub={m.sub}
          percentage={m.percentage}
          delay={0.2 + i * 0.15}
          color={m.color || "primary"}
        />
      ))}
    </div>
  );
}
