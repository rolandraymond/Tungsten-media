import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const KineticText = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="py-24 overflow-hidden">
      <div className="space-y-4">
        <motion.div style={{ x: x1 }}>
          <h2 className="text-[8vw] font-bold leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:2px_hsl(var(--foreground))] select-none">
            STRATEGY · DESIGN · TECHNOLOGY
          </h2>
        </motion.div>
        <motion.div style={{ x: x2 }}>
          <h2 className="text-[8vw] font-bold leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:2px_hsl(var(--primary))] select-none">
            INNOVATION · GROWTH · RESULTS
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default KineticText;
