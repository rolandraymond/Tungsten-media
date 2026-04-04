import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

const SpotlightCard = ({ children, className = "" }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Internal spotlight fill
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}px ${y}px, hsl(45 93% 47% / 0.08), transparent 60%)`
  );

  // Glassmorphic proximity border glow
  const borderGlow = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(200px circle at ${x}px ${y}px, hsl(45 93% 47% / 0.6), hsl(45 93% 47% / 0.1) 40%, transparent 70%)`
  );

  return (
    <div className="relative p-[1px] rounded-xl group">
      {/* Proximity border glow layer */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: borderGlow }}
      />
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        className={`relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors backdrop-blur-sm ${className}`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 rounded-xl"
          style={{ background }}
        />
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
};

export default SpotlightCard;
