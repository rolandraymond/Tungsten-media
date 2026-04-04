import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import Seo from "@/hooks/use-seo";
import PageTransition from "@/components/effects/PageTransition";

const NotFound = () => {
  const navigate = useNavigate();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <PageTransition>
      <Seo title="404 — Lost in the Void" />
      <div
        className="min-h-screen flex items-center justify-center overflow-hidden relative"
        style={{ background: "hsl(0 0% 3%)" }}
      >
        {/* Flashlight radial gradient following cursor */}
        <div
          className="pointer-events-none fixed inset-0 z-10 transition-none"
          style={{
            background: `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, hsl(45 93% 47% / 0.12), transparent 70%)`,
          }}
        />

        {/* Hidden text revealed by flashlight */}
        <div className="relative z-20 text-center">
          <motion.h1
            className="text-[20vw] font-bold leading-none text-transparent select-none"
            style={{
              WebkitTextStroke: "1px hsl(45 93% 47% / 0.15)",
              background: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, hsl(45 93% 47% / 0.6), transparent 60%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            404
          </motion.h1>

          <motion.p
            className="text-lg mb-10"
            style={{
              background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, hsl(0 0% 60%), transparent 70%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            You've drifted into the void. Move your cursor to find the way back.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <MagneticButton onClick={() => navigate("/")}>
              Return to Base
            </MagneticButton>
          </motion.div>
        </div>

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </PageTransition>
  );
};

export default NotFound;
