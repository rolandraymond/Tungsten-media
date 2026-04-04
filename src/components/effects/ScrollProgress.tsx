import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 right-0 z-[9999] w-[2px] h-screen origin-top gradient-tungsten"
      style={{ scaleY, opacity: scrollYProgress }}
    />
  );
};

export default ScrollProgress;
