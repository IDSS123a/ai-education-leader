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
    <div ref={ref} className="flex flex-col items-center w-20 md:w-24">
      {/* Metric value — fixed height area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: delay + 0.3, duration: 0.4 }}
        className={`text-lg md:text-xl font-bold ${c.text} h-8 flex items-end justify-center`}
      >
        {metric}
      </motion.div>

      {/* 3D Bar — fixed height container, bar grows from bottom */}
      <div className="relative h-28 md:h-36 w-12 md:w-14 mt-2" style={{ perspective: "400px" }}>
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

        {/* Base line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
      </div>

      {/* Sub + Label — fixed height area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.5, duration: 0.4 }}
        className="text-center mt-2 h-10 flex flex-col justify-start"
      >
        {sub && (
          <div className="text-xs font-semibold text-accent">{sub}</div>
        )}
        <div className="text-[11px] text-muted-foreground leading-tight">
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
