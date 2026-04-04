import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const RevealText = ({ children, className = "", delay = 0 }: RevealTextProps) => {
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  if (!text) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="mask-text-reveal inline-block mx-[0.15em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.05,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default RevealText;
