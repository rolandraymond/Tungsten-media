import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import RevealText from "@/components/ui/RevealText";
import { ArrowUpRight, Zap, Globe, Sparkles } from "lucide-react";

// شلنا الـ interface الفاضي عشان نرضي الـ ESLint
const CTASection = () => {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // إحداثيات الماوس للهالة الضوئية
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // تنعيم الحركة لتكون انسيابية جداً
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // حساب المكان بالنسبة للسكشن
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-40 transition-colors duration-700"
    >
      {/* 1. ARCHITECTURAL BACKGROUND (Blueprint Mode) */}
      <div className="absolute inset-0 z-0">
        {/* شبكة هندسية واضحة جداً للمود الفاتح والغامق */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--primary)_1px,transparent_1px)] bg-[length:50px_50px] opacity-[0.06] dark:opacity-[0.03]" />
        
        {/* نصوص خلفية ضخمة (ثقيلة وواضحة في الـ Light Mode) */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none opacity-[0.12] dark:opacity-[0.05]">
          <motion.h2 
            animate={{ x: [-50, 50] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
            className="text-[25vw] font-black uppercase text-foreground leading-none tracking-tighter"
          >
            TUNGSTEN
          </motion.h2>
          <h2 className="text-[20vw] font-black uppercase text-primary leading-none -mt-10 tracking-[0.2em]">
            {lang === 'ar' ? 'إبداع' : 'CORE'}
          </h2>
        </div>
      </div>

      {/* 2. THE RADIANT SEARCHLIGHT (الكشاف التفاعلي) */}
      <motion.div 
        className="absolute pointer-events-none z-10 w-[700px] h-[700px] rounded-full blur-[130px] opacity-25 dark:opacity-40"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, var(--primary) 0%, transparent 75%)`
        }}
      />

      {/* 3. CONTENT CORE */}
      <div className="container mx-auto px-6 relative z-20 text-center">
        
        {/* Floating System Status Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-12 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
        >
          <Sparkles size={14} className="text-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">
            {lang === 'ar' ? 'نظام تنجستن جاهز' : 'SYSTEM_READY_v4.2'}
          </span>
        </motion.div>

        {/* --- MAIN TITLE (Visible, Readable, and Radiant) --- */}
        <div className="relative inline-block max-w-full">
          <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-[1.25] pb-10 pt-4 text-foreground relative z-10 overflow-visible h-auto">
            <RevealText className="inline-block relative">
              {lang === 'ar' ? 'لنصنع شيئاً' : "Let's Build"}
            </RevealText>
            <br />
            <span className="text-primary italic relative inline-block">
               {lang === 'ar' ? 'عالمياً' : 'Global'}
               {/* خط ضوئي تحت الكلمة الملونة */}
               <motion.div 
                className="absolute -bottom-4 left-0 w-full h-1.5 bg-primary shadow-[0_0_25px_var(--primary)]"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 0.6 }}
               />
            </span>
            <span className="text-primary">.</span>
          </h2>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-xl md:text-3xl max-w-3xl mx-auto mb-20 font-light leading-relaxed"
        >
          {t("cta.desc")}
        </motion.p>

        {/* 4. THE MAGNETIC PORTAL BUTTON */}
        <div className="relative group inline-block">
          {/* حلقة ضوئية تقنية تدور */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 border border-dashed border-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700"
          />
          
          <motion.button
            onClick={() => navigate("/contact")}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="relative h-48 w-48 md:h-64 md:w-64 rounded-full bg-foreground text-background flex flex-col items-center justify-center transition-all duration-700 shadow-2xl group-hover:shadow-[0_0_60px_rgba(var(--primary-rgb),0.4)]"
          >
            <ArrowUpRight size={50} className="mb-2 group-hover:rotate-45 transition-transform duration-500" />
            <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">
              {lang === 'ar' ? 'ابدأ الرحلة' : 'Enter_Core'}
            </span>
            
            {/* تأثير السائل المغناطيسي الداخلي */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
          </motion.button>
        </div>
      </div>

      {/* 5. BOTTOM METADATA (Technical Aura) */}
      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end opacity-40 font-mono text-[9px] z-30 uppercase tracking-[0.4em] text-foreground">
         <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
               <Zap size={14} className="text-primary animate-pulse" />
               Aura_Status: Optimized_v4
            </div>
            <div className="text-primary/60">Lat: 30.04° N // Lon: 31.23° E</div>
         </div>
         <div className="text-right hidden sm:block">
            Architected by Tungsten Labs<br />
            Egypt // Global Creative Core
         </div>
      </div>
    </section>
  );
};

export default CTASection;