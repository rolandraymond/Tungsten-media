import { motion } from "framer-motion";

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <motion.div
      className="h-12 w-12 rounded-lg gradient-tungsten box-glow-strong"
      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

export default PageLoader;
