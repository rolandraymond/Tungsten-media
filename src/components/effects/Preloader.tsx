"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/lib/context-theme";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/img/LogoDark.png" : "/img/LogoLight.png";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5800); // زودنا الوقت سكة بسيطة عشان الختام يكون أهدى
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden"
          exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* 💥 Cinematic Flash - وميض سينمائي لحظة اصطدام الحرارة */}
          <motion.div
            className="absolute inset-0 bg-primary/20 pointer-events-none mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ delay: 2.4, duration: 1, ease: "easeOut" }}
          />

          {/* Ambient Glow */}
          <motion.div
            className="absolute h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary/10 blur-[100px] sm:blur-[150px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center w-full px-4">
            
            {/* 🚀 Wrapper متجاوب للـ SVG */}
            <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] aspect-[4/3]">
              <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">
                <defs>
                  <filter id="wireGlow">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="sparkGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <linearGradient id="tungstenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
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

                {/* 🚀 كويل التنجستن */}
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

                {/* 🚀 موجة الانفجار (Shockwave) */}
                <motion.circle
                  cx="200" cy="155" fill="none" stroke="hsl(var(--primary))"
                  initial={{ r: 0, opacity: 0, strokeWidth: 10 }}
                  animate={{ r: [0, 100, 200], opacity: [0, 0.8, 0], strokeWidth: [10, 2, 0] }}
                  transition={{ duration: 1.2, delay: 2.4, ease: "easeOut" }}
                />

                {/* 🚀 الشرارة (Spark) - تم نقلها داخل الـ SVG لتجنب أخطاء الريسبونسف */}
                <motion.circle
                  cx="200" cy="155" fill="#ffffff" filter="url(#sparkGlow)"
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: [0, 15, 25, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ delay: 2.4, duration: 0.8 }}
                />
              </svg>
            </div>

            {/* اللوجو - أحجام وهوامش متجاوبة (Responsive) */}
            <motion.img
              src={logoSrc}
              className="relative z-10 h-32 sm:h-44 md:h-56 w-auto mt-[-70px] sm:mt-[-90px] md:mt-[-120px]"
              initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 2.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* الاسم (TUNGSTEN) - تصغير وتكبير الخط حسب الشاشة */}
            <motion.h1 className="mt-6 sm:mt-8 text-2xl sm:text-4xl md:text-5xl font-black tracking-[0.2em] sm:tracking-[0.35em] text-foreground flex justify-center flex-wrap">
              {"TUNGSTEN".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 3 + index * 0.06, duration: 0.5, ease: "easeOut" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            {/* الخط الذهبي - عرض متجاوب */}
            <motion.div 
              className="mt-4 sm:mt-6 h-[2px] w-32 sm:w-48 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 4, duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;