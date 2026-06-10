"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/lib/context-theme";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/img/LogoDark.png" : "/img/LogoLight.png";

  useEffect(() => {
    // تقليل الوقت لـ 4.5 ثواني ليكون الإيقاع أسرع وأكثر حيوية (Snappy)
    const timer = setTimeout(() => setIsLoading(false), 4500); 
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
            className="absolute inset-0 bg-primary/30 pointer-events-none mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
          />

          {/* Ambient Glow */}
          <motion.div
            className="absolute h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary/10 blur-[100px] sm:blur-[150px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center w-full px-4">
            
            {/* 🚀 Wrapper متجاوب للـ SVG يعتمد على النسب (Aspect Ratio) ليكون مثالياً على الموبايل */}
            <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] aspect-[4/3]">
              <svg viewBox="0 0 400 300" className="w-full h-full overflow-visible">
                <defs>
                  <filter id="wireGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="sparkGlow">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <linearGradient id="tungstenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* ============================================================== */}
                {/* 1. الطبقة الخارجية (المعدن السميك المتوهج) بنفس اللفة المطلوبة  */}
                {/* ============================================================== */}
                
                {/* الفتيلة اليسرى */}
                <motion.path
                  d="M 140 260 L 140 125 A 25 25 0 1 0 115 150 L 200 150"
                  fill="none" stroke="url(#tungstenGradient)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
                  filter="url(#wireGlow)"
                  initial={{ pathLength: 0 }} 
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                />
                
                {/* الفتيلة اليمنى */}
                <motion.path
                  d="M 260 260 L 260 125 A 25 25 0 1 1 285 150 L 200 150"
                  fill="none" stroke="url(#tungstenGradient)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
                  filter="url(#wireGlow)"
                  initial={{ pathLength: 0 }} 
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                />

                {/* ============================================================== */}
                {/* 2. الطبقة الداخلية (القلب الأبيض الناصع لزيادة واقعية الحرارة) */}
                {/* ============================================================== */}
                
                <motion.path
                  d="M 140 260 L 140 125 A 25 25 0 1 0 115 150 L 200 150"
                  fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} 
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 260 260 L 260 125 A 25 25 0 1 1 285 150 L 200 150"
                  fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} 
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                />

                {/* ============================================================== */}
                {/* 3. الانفجار والشرارة في المنتصف (تتزامن مع وقت التلاقي 1.6s) */}
                {/* ============================================================== */}
                
                {/* موجة الانفجار (Shockwave) */}
                <motion.circle
                  cx="200" cy="150" fill="none" stroke="hsl(var(--primary))"
                  initial={{ r: 0, opacity: 0, strokeWidth: 12 }}
                  animate={{ r: [0, 120, 250], opacity: [0, 1, 0], strokeWidth: [12, 3, 0] }}
                  transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
                />

                {/* الشرارة (Spark) داخل الـ SVG لضمان الدقة على الموبايل */}
                <motion.circle
                  cx="200" cy="150" fill="#ffffff" filter="url(#sparkGlow)"
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: [0, 18, 30, 0], opacity: [0, 1, 1, 0] }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                />
              </svg>
            </div>

            {/* اللوجو - يظهر من وسط الانفجار */}
            {/* <motion.img
              src={logoSrc}
              className="relative z-10 h-28 sm:h-40 md:h-52 w-auto mt-[-50px] sm:mt-[-80px] md:mt-[-100px]"
              initial={{ opacity: 0, scale: 0.4, filter: "blur(30px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 1.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            /> */}

            {/* الاسم (TUNGSTEN) - دخول دراماتيكي متجاوب */}
            {/* <motion.h1 className="mt-5 sm:mt-8 text-2xl sm:text-4xl md:text-5xl font-black tracking-[0.25em] sm:tracking-[0.4em] text-foreground flex justify-center flex-wrap">
              {"TUNGSTEN".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.8, filter: "blur(15px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: 2.2 + index * 0.05, duration: 0.6, ease: "easeOut" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1> */}

            {/* الخط الذهبي */}
            <motion.div 
              className="mt-4 sm:mt-6 h-[2px] w-24 sm:w-48 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 2.9, duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;