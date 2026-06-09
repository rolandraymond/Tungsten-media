"use client";

import React, { useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

// Magnetic hover hook
const useMagnetic = (stiffness = 180, damping = 18) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness, damping };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * 0.18);
    y.set((e.clientY - centerY) * 0.18);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { springX, springY, onMouseMove, onMouseLeave };
};

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="none">
    <path
      d="M19.11 17.39c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.74.91-.91 1.1-.17.19-.34.21-.62.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.47.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.87-2.11-.23-.56-.46-.48-.64-.49l-.55-.01c-.19 0-.49.07-.75.35-.26.28-1 1-1 2.44 0 1.44 1.03 2.84 1.18 3.04.14.19 2.06 3.15 4.99 4.42.7.3 1.25.48 1.68.61.71.23 1.36.2 1.87.12.57-.09 1.66-.68 1.89-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33z"
      fill="currentColor"
    />
    <path
      d="M26.67 5.33A14.96 14.96 0 0 0 16 .98C7.71.98.98 7.71.98 16c0 2.65.69 5.25 2 7.55L0 32l8.63-2.26A15.06 15.06 0 0 0 16 31.02C24.29 31.02 31.02 24.29 31.02 16c0-4-1.56-7.76-4.35-10.67zM16 28.98c-2.36 0-4.66-.63-6.64-1.81l-.48-.29-5.12 1.34 1.37-4.98-.31-.5A11.9 11.9 0 0 1 4.1 16C4.1 9.48 9.48 4.1 16 4.1S27.9 9.48 27.9 16 22.52 28.98 16 28.98z"
      fill="currentColor"
    />
  </svg>
);

const InteractiveTooltip = ({ isVisible }: { isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, x: -10, scale: 0.96 }}
        animate={{ opacity: 1, x: -118, scale: 1 }}
        exit={{ opacity: 0, x: -10, scale: 0.96 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 rounded-2xl border border-emerald-400/25 bg-background/80 px-4 py-2 backdrop-blur-xl shadow-2xl whitespace-nowrap"
      >
        <Sparkles size={12} className="text-emerald-500" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground">
          Need Support?
        </span>
      </motion.div>
    )}
  </AnimatePresence>
);

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { springX, springY, onMouseMove, onMouseLeave } = useMagnetic();

  const phoneNumber = "201206399775";
  const message = "Tungsten Media - We are ready to innovate.";

  return (
    <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[9999]">
      <InteractiveTooltip isVisible={isHovered} />

      <motion.a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ x: springX, y: springY }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => {
          onMouseLeave();
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        aria-label="Contact us on WhatsApp"
        className="group relative flex h-15 w-15 items-center justify-center rounded-3xl border border-emerald-400/25 bg-[#25D366]/10 backdrop-blur-2xl shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition-transform duration-300 md:h-16 md:w-16"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        {/* green glow */}
        <motion.span
          className="absolute inset-0 rounded-3xl bg-[#25D366]/15 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* rotating border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border border-[#25D366]/25 opacity-0 group-hover:opacity-100"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* inner button */}
        <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#25D366] shadow-[0_0_22px_rgba(37,211,102,0.35)] md:h-12 md:w-12">
          <WhatsAppIcon className="h-5 w-5 text-white md:h-5.5 md:w-5.5" />
        </div>

        {/* ping dot */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-70" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border border-background bg-[#25D366]" />
        </span>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;