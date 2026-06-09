"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/lib/context-theme";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // التوقيت مضبوط ليتناسب مع الحركة اللولبية والشرارة
    const timer = setTimeout(() => setIsLoading(false), 4600);
    return () => clearTimeout(timer);
  }, []);

  const logoSrc = theme === "dark" ? "/img/LogoDark.png" : "/img/LogoLight.png";

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] overflow-hidden bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* إضاءة محيطية في الخلفية */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10 flex h-full w-full items-center justify-center">
            
            <div className="relative h-[400px] w-[400px] flex items-center justify-center overflow-visible">
              
              <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible">
                <defs>
                  {/* فلتر الوهج الحراري للسلك */}
                  <filter id="wireGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  
                  {/* فلتر الانفجار للشرارة */}
                  <filter id="ignitionSpark" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="12" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* تدرج لوني للسلك ليعطي إحساس الحرارة */}
                  <linearGradient id="tungstenGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                    <stop offset="80%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* ======================================================= */}
                {/* 1. السلك الأيسر (خط مستقيم -> 3 حلقات لولبية -> المركز) */}
                {/* ======================================================= */}
                <motion.path
                  d="
                    M 130 400 
                    L 130 350 
                    C 180 340, 103 310, 153 300 
                    C 203 290, 126 260, 176 250 
                    C 226 240, 149 210, 199 200
                  "
                  fill="none"
                  stroke="url(#tungstenGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#wireGlow)"
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  animate={{ pathLength: 1, opacity: 1, strokeWidth: [2, 4.5, 3.5] }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />

                {/* ======================================================= */}
                {/* 2. السلك الأيمن (خط مستقيم -> 3 حلقات لولبية عكسية -> المركز) */}
                {/* ======================================================= */}
                <motion.path
                  d="
                    M 270 400 
                    L 270 350 
                    C 220 340, 297 310, 247 300 
                    C 197 290, 274 260, 224 250 
                    C 174 240, 251 210, 201 200
                  "
                  fill="none"
                  stroke="url(#tungstenGradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#wireGlow)"
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  animate={{ pathLength: 1, opacity: 1, strokeWidth: [2, 4.5, 3.5] }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />

                {/* ======================================================= */}
                {/* 3. الشرارة (The Ignition Spark) */}
                {/* ======================================================= */}
                <motion.circle
                  cx="200" cy="200"
                  fill="#ffffff"
                  filter="url(#ignitionSpark)"
                  initial={{ r: 0, opacity: 0 }}
                  // تظهر الشرارة في اللحظة 2.5 (وقت تلامس السلكين)
                  animate={{ r: [0, 30, 120, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, delay: 2.5, ease: "easeOut" }}
                />
                
                {/* موجة الإشعاع (Shockwave) */}
                <motion.circle
                  cx="200" cy="200"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="5"
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: [0, 150, 300], opacity: [0, 0.8, 0], strokeWidth: [10, 2, 0] }}
                  transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
                />
              </svg>

              {/* ======================================================= */}
              {/* 4. ظهور اللوجو والنص من قلب الانفجار */}
              {/* ======================================================= */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center z-20"
                initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 2.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative flex justify-center items-center">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <img
                    src={logoSrc}
                    alt="Tungsten Media"
                    className="relative z-10 h-32 w-auto object-contain sm:h-44 md:h-52 drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                  />
                </div>

                {/* <motion.h1
                  className="mt-6 text-3xl font-black tracking-[0.4em] text-foreground sm:text-4xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 3.2 }}
                >
                  TUNGSTEN
                </motion.h1> */}

                <motion.p
                  className="mt-3 text-[10px] font-bold uppercase tracking-[0.5em] text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 3.5 }}
                >
                  Igniting Creativity
                </motion.p>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;