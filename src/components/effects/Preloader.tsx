"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/lib/context-theme";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/img/LogoDark.png" : "/img/LogoLight.png";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5500); // وقت كافٍ لكل الحركات
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Ambient Glow */}
          <motion.div
            className="absolute h-[500px] w-[500px] rounded-full bg-primary/10 blur-[150px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center">
            
            {/* 🚀 Wrapper ثابت للـ SVG والشرارة لضمان المحاذاة بالملي */}
            <div className="relative w-[400px] h-[300px]">
              <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">
                <defs>
                  <filter id="wireGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <linearGradient id="tungstenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* خطوط التوصيل الصاعدة */}
                <motion.path d="M 120 300 L 120 155" 
                  fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeOpacity="0.3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }}
                />
                <motion.path d="M 280 300 L 280 155" 
                  fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeOpacity="0.3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }}
                />

                {/* 🚀 كويل التنجستن (مقسم لجزئين عشان الحرارة تتقابل في النص) */}
                <motion.path
                  d="M 120 155 C 130 120, 145 190, 160 155 C 175 120, 190 190, 200 155"
                  fill="none" stroke="url(#tungstenGradient)" strokeWidth="4" strokeLinecap="round"
                  filter="url(#wireGlow)"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 0.8, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 280 155 C 270 120, 255 190, 240 155 C 225 120, 210 190, 200 155"
                  fill="none" stroke="url(#tungstenGradient)" strokeWidth="4" strokeLinecap="round"
                  filter="url(#wireGlow)"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 0.8, ease: "easeInOut" }}
                />

                {/* 🚀 موجة الانفجار (Shockwave) اللي بتطلع مع الشرارة */}
                <motion.circle
                  cx="200" cy="155" fill="none" stroke="hsl(var(--primary))"
                  initial={{ r: 0, opacity: 0, strokeWidth: 8 }}
                  animate={{ r: [0, 80, 150], opacity: [0, 0.8, 0], strokeWidth: [8, 2, 0] }}
                  transition={{ duration: 1.2, delay: 2.4, ease: "easeOut" }}
                />
              </svg>

              {/* الشرارة (Spark) - محاذاة دقيقة فوق نقطة الالتحام (200, 155) */}
              <motion.div
                className="absolute left-1/2 top-[155px] -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 4, 0], opacity: [0, 1, 1, 0] }}
                transition={{ delay: 2.4, duration: 0.8 }}
              >
                <div className="h-8 w-8 rounded-full bg-white blur-sm" />
              </motion.div>
            </div>

            {/* اللوجو */}
            <motion.img
              src={logoSrc}
              className="relative z-10 h-56 w-auto mt-[-120px]"
              initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 2.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* الاسم (TUNGSTEN) */}
            <motion.h1 className="mt-8 text-5xl font-black tracking-[0.35em] text-foreground flex">
              {"TUNGSTEN".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 + index * 0.08, duration: 0.4 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* الخط الذهبي */}
            <motion.div 
              className="mt-6 h-[2px] w-48 bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 4, duration: 0.6 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;