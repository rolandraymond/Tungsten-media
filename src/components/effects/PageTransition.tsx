import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

// Apple-style smooth Bezier Curve
const customEase = [0.22, 1, 0.36, 1] as const;

const pageVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 20, 
    filter: "blur(10px)", // Cinematic out-of-focus
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", // Sharp focus
    transition: { 
      duration: 0.8, 
      ease: customEase,
      staggerChildren: 0.1 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    filter: "blur(10px)",
    transition: { 
      duration: 0.5, 
      ease: customEase 
    } 
  },
};

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    // Clean wrapper without Perspective or 3D Transforms that break Sticky elements
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full flex-grow flex flex-col relative z-10"
      style={{ willChange: "opacity, filter, transform" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;