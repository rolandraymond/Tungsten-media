"use client";

import React, { useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { MessageCircle, Zap, Sparkles } from "lucide-react";

// --- 1. HOOK: التفاعل مع الماوس (Magnetic Effect) ---
const useMagnetic = (stiffness = 150, damping = 15) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness, damping };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { springX, springY, onMouseMove, onMouseLeave };
};

// --- 2. الإبداع: Tooltip احترافي يظهر عند التفاعل ---
const InteractiveTooltip = ({ isVisible }: { isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: -110 }}
        exit={{ opacity: 0, x: -20 }}
        className="absolute top-2 hidden md:flex items-center gap-2 bg-background/80 backdrop-blur-xl border border-primary/20 px-4 py-2 rounded-2xl shadow-2xl whitespace-nowrap"
      >
        <Sparkles size={12} className="text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">Need Support?</span>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- 3. الكود الأساسي للزرار (WhatsApp Core) ---
const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { springX, springY, onMouseMove, onMouseLeave } = useMagnetic();
  
  const phoneNumber = "201288148848";
  const message = "Tungsten Media - We are ready to innovate.";

  return (
    <div className="fixed bottom-10 right-10 z-[9999]">
      <InteractiveTooltip isVisible={isHovered} />

      <motion.a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ x: springX, y: springY }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { onMouseLeave(); setIsHovered(false); }}
        onMouseEnter={() => setIsHovered(true)}
        className="relative flex items-center justify-center h-16 w-16 rounded-3xl bg-background/50 border border-border/40 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer group"
        whileHover={{ scale: 1.15, borderColor: "rgba(var(--primary-rgb), 0.5)" }}
        whileTap={{ scale: 0.9 }}
      >
        {/* تأثير الدوران السحري */}
        <motion.div 
          className="absolute inset-0 rounded-3xl border border-primary/20 opacity-0 group-hover:opacity-100"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* أيقونة الواتساب بتفاعل متغير */}
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          className="relative z-10"
        >
          <MessageCircle size={28} className="text-foreground group-hover:text-primary transition-colors" />
        </motion.div>

        {/* النقطة الذكية */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>

        {/* تأثير الـ Zap عند الضغط */}
        <motion.div 
          initial={{ scale: 0 }}
          whileHover={{ scale: 1.5, opacity: 0 }}
          className="absolute inset-0 bg-primary/10 rounded-3xl"
        />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;