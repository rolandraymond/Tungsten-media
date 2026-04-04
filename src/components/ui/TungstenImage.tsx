import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TungstenImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  masked?: boolean;
}

const TungstenImage = ({ src, alt, className = "", aspectRatio = "16/9", masked = true }: TungstenImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clipPath = masked
    ? useTransform(scrollYProgress, [0, 0.4], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"])
    : undefined;
  const scale = useTransform(scrollYProgress, [0, 0.4], [1.15, 1]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden rounded-2xl bg-muted ${className}`}
      style={{ aspectRatio, ...(clipPath ? { clipPath } : {}) }}
    >
      {/* Blur placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover"
        style={{ scale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

export default TungstenImage;
