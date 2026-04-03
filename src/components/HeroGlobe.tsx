import { useEffect, useRef } from "react";

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let rotation = 0;
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.38;
    const nodeCount = 50;

    // Generate nodes on a sphere (projected to 2D)
    const nodes = Array.from({ length: nodeCount }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      return { phi, theta };
    });

    const project = (phi: number, theta: number, rot: number) => {
      const x3d = Math.cos(theta + rot) * Math.sin(phi);
      const y3d = Math.sin(theta + rot) * Math.sin(phi);
      const z3d = Math.cos(phi);
      return {
        x: cx + x3d * radius,
        y: cy + z3d * radius,
        z: y3d,
        opacity: 0.3 + (y3d + 1) * 0.35,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      rotation += 0.003;

      const projected = nodes.map((n) => project(n.phi, n.theta, rotation));

      // Draw connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius * 0.7) {
            const op = Math.min(a.opacity, b.opacity) * 0.3 * (1 - dist / (radius * 0.7));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(210, 82%, 55%, ${op})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of projected) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 + p.opacity * 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(210, 82%, 55%, ${p.opacity * 0.8})`;
        ctx.fill();
      }

      // Core glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.3);
      grd.addColorStop(0, "hsla(160, 64%, 50%, 0.15)");
      grd.addColorStop(1, "hsla(210, 82%, 55%, 0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.3, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
