import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const MagneticButton = ({ children, className = "", onClick, ariaLabel }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.3);
    y.set(dy * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const glowOpacity = useTransform(springX, [-20, 0, 20], [0.6, 1, 0.6]);

  return (
    <motion.button
      ref={ref}
      data-magnetic
      aria-label={ariaLabel}
      role="button"
      className={`relative overflow-hidden rounded-lg px-8 py-4 font-semibold transition-colors gradient-tungsten text-primary-foreground ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="absolute inset-0 rounded-lg box-glow-strong"
        style={{ opacity: glowOpacity }}
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default MagneticButton;
