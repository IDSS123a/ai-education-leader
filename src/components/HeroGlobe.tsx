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
    const size = 500;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.4;
    const nodeCount = 70;

    // Generate nodes on a sphere
    const nodes = Array.from({ length: nodeCount }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      return { phi, theta };
    });

    // Meridian and parallel lines
    const meridians = 8;
    const parallels = 6;

    const project = (phi: number, theta: number, rot: number) => {
      const x3d = Math.cos(theta + rot) * Math.sin(phi);
      const y3d = Math.sin(theta + rot) * Math.sin(phi);
      const z3d = Math.cos(phi);
      return {
        x: cx + x3d * radius,
        y: cy + z3d * radius,
        z: y3d,
        opacity: 0.2 + (y3d + 1) * 0.4,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      rotation += 0.002;

      // Outer glow
      const outerGlow = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.3);
      outerGlow.addColorStop(0, "hsla(210, 82%, 55%, 0.05)");
      outerGlow.addColorStop(1, "hsla(210, 82%, 55%, 0)");
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Draw wireframe meridians
      for (let m = 0; m < meridians; m++) {
        const mTheta = (m / meridians) * Math.PI * 2;
        ctx.beginPath();
        for (let i = 0; i <= 40; i++) {
          const phi = (i / 40) * Math.PI;
          const p = project(phi, mTheta, rotation);
          if (p.z < -0.1) continue;
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `hsla(210, 82%, 55%, 0.08)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw wireframe parallels
      for (let p = 1; p < parallels; p++) {
        const phi = (p / parallels) * Math.PI;
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
          const theta = (i / 60) * Math.PI * 2;
          const pt = project(phi, theta, rotation);
          if (pt.z < -0.1) continue;
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = `hsla(210, 82%, 55%, 0.06)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      const projected = nodes.map((n) => project(n.phi, n.theta, rotation));

      // Draw connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          if (a.z < 0 && b.z < 0) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < radius * 0.55) {
            const op = Math.min(a.opacity, b.opacity) * 0.35 * (1 - dist / (radius * 0.55));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(210, 82%, 60%, ${op})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow
      for (const p of projected) {
        if (p.z < -0.2) continue;
        const nodeSize = 1.5 + p.opacity * 2.5;

        // Node glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, nodeSize * 4);
        grd.addColorStop(0, `hsla(210, 82%, 60%, ${p.opacity * 0.3})`);
        grd.addColorStop(1, "hsla(210, 82%, 60%, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize * 4, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(210, 82%, 65%, ${p.opacity * 0.9})`;
        ctx.fill();
      }

      // Inner core glow (accent color)
      const coreGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.35);
      coreGrd.addColorStop(0, "hsla(160, 64%, 50%, 0.12)");
      coreGrd.addColorStop(0.5, "hsla(210, 82%, 55%, 0.05)");
      coreGrd.addColorStop(1, "hsla(210, 82%, 55%, 0)");
      ctx.fillStyle = coreGrd;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.35, 0, Math.PI * 2);
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
      style={{ opacity: 0.7 }}
    />
  );
}
