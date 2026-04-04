import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MaskedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const MaskedImage = ({ src, alt, className = "" }: MaskedImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
  );
  const scale = useTransform(scrollYProgress, [0, 0.4], [1.2, 1]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden rounded-2xl ${className}`}
      style={{ clipPath }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ scale }}
      />
    </motion.div>
  );
};

export default MaskedImage;
