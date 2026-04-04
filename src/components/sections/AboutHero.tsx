"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { useLocation } from "react-router-dom";
import { Cpu, Zap, Activity } from "lucide-react";

// --- 1. محرك الجزيئات السريع (كما هو) ---
const ParticleField = () => {
  const count = 75;
  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 0.5,
      duration: Math.random() * 15 + 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/40"
          initial={{ left: `${p.x}%`, top: `${p.y}%`, opacity: 0 }}
          animate={{
            top: ["-10%", "110%", "-10%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: -Math.random() * 20,
          }}
          style={{
            width: p.size,
            height: p.size,
            filter: "blur(1px)",
            boxShadow: `0 0 10px var(--primary)`,
          }}
        />
      ))}
    </div>
  );
};

const AboutHero = () => {
  const { t, lang } = useTranslation();
  const { pathname } = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const headingText = lang === 'ar' ? 'قصتنا' : 'Our Legacy';

  // 2. البارالاكس والاختفاء (Scroll Logic)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // --- التعديلات السحرية هنا يا ماريو ---
  
  // حركنا النص الخلفي لفوق بس بنسبة أقل عشان يبان كله
  const bgTextY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const bgTextScale = useTransform(smoothProgress, [0, 1], [0.9, 1.1]);
  
  // الوضوح: بيبدأ شفاف جداً (0.02) وبيوضح أكتر (0.2) وأنت بتنزل
  const bgTextOpacity = useTransform(smoothProgress, [0, 0.5], [0.03, 0.2]);

  // رسم الخط: الخط بيبدأ من طول 0 لحد 1 (رسم كامل) مع السكرول
  const pathLength = useTransform(smoothProgress, [0, 0.8], [0, 1]);
  
  // حركة "الجري": بنخلي الـ Dash تمشي (Offset) عشان الخط يبان كأنه بيتحرك
  const pathOffset = useTransform(smoothProgress, [0, 1], [0, 2]);

  // اختفاء المحتوى الأمامي
  const contentOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(smoothProgress, [0, 0.4], [0, -80]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20"
    >
      <ParticleField />

      {/* LAYER 2: Background SVG Text (The Running Stroke) */}
      <motion.div 
        style={{ 
          y: bgTextY, 
          scale: bgTextScale, 
          opacity: bgTextOpacity 
        }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none px-4"
      >
        <svg 
          viewBox="0 0 1000 250" 
          className="w-full h-auto max-w-[95vw] md:max-w-[85vw]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. الطبقة الثابتة (الباهتة) عشان الكلمة تكون مقروءة دايماً */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-black text-[180px] uppercase fill-foreground/[0.05] dark:fill-white/[0.02]"
            style={{ letterSpacing: "-0.02em" }}
          >
            TUNGSTEN
          </text>
          
          {/* 2. الطبقة المتحركة (النيون اللي بيجري) */}
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-black text-[180px] uppercase stroke-primary"
            strokeWidth="1.5"
            style={{ 
              letterSpacing: "-0.02em",
              pathLength: pathLength, // الخط بيترسم مع السكرول
              pathOffset: pathOffset, // الخط بيمشي (بيجري) مع السكرول
              strokeDasharray: "100 20", // بيخلي الخط عبارة عن شرط (Dashes) بتجري
            }}
          >
            TUNGSTEN
          </motion.text>
        </svg>
      </motion.div>

      {/* LAYER 3: Main Content (المحتوى اللي بيختفي) */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <div className="relative">
          <motion.div 
            key={`badge-${pathname}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-glow backdrop-blur-sm"
          >
            <Zap size={14} className="animate-pulse" /> 
            TNGSTN_CORE_RECONSTRUCTION
          </motion.div>

          <h1 className="text-6xl md:text-[11vw] font-black tracking-tighter uppercase leading-[0.95] pb-8 text-foreground">
            <span className="glitch-once inline-block" data-text={headingText}>
              {headingText}
            </span>
            <span className="text-primary animate-pulse ml-2">.</span>
          </h1>

          <p className="text-xl md:text-3xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed pt-4 italic">
            {t("about.subtitle")}
          </p>
        </div>
      </motion.div>

      {/* LAYER 4: Bottom Meta */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="absolute bottom-12 left-12 right-12 flex justify-between items-end z-20 pointer-events-none opacity-40 font-mono text-[9px] uppercase tracking-[0.5em] text-foreground"
      >
         <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-primary font-bold">
               <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
               SYSTEM_LIVE_2026
            </div>
            <div>Coords: 30.04°N / 31.23°E</div>
         </div>
         <div className="text-right flex flex-col items-end gap-2">
            <div className="flex gap-1 mb-1">
               {[1,2,3,4].map(i => <div key={i} className="h-1 w-1 bg-primary/40 rounded-full" />)}
            </div>
            <span>Architected by Tungsten Labs</span>
         </div>
      </motion.div>
    </section>
  );
};

export default AboutHero;