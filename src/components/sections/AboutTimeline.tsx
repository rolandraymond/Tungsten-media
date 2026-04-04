"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { 
  ArrowUpRight, Zap, Target, Rocket, Award, 
  Calendar, Cpu, Activity, Binary 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// 1. تحديث النوع ليشمل ترجمة الوصف
interface TimelineItem {
  year: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  icon: React.ElementType;
}

// 2. تحديث البيانات بالترجمات الكاملة
const timeline: TimelineItem[] = [
  { 
    year: "2018", 
    titleEn: "The Genesis", 
    titleAr: "نقطة الانطلاق", 
    descEn: "Founded with a vision to disrupt the digital status quo through design-centric logic.", 
    descAr: "تأسست برؤية تهدف لكسر القواعد الرقمية التقليدية من خلال منطق يركز على التصميم الإبداعي.",
    icon: Zap 
  },
  { 
    year: "2019", 
    titleEn: "Expansion", 
    titleAr: "توسع الأفق", 
    descEn: "20+ Global clients joined the Tungsten ecosystem across 5 continents.", 
    descAr: "انضم أكثر من 20 عميلاً عالمياً إلى منظومة تنجستن في 5 قارات مختلفة.",
    icon: Target 
  },
  { 
    year: "2021", 
    titleEn: "Innovation", 
    titleAr: "ثورة تقنية", 
    descEn: "Launching our core Tech Division for advanced R&D and AI integration.", 
    descAr: "إطلاق قطاع التقنية الأساسي للبحث والتطوير المتقدم ودمج حلول الذكاء الاصطناعي.",
    icon: Rocket 
  },
  { 
    year: "2023", 
    titleEn: "Results", 
    titleAr: "ثمار النجاح", 
    descEn: "Achieving 340% average ROI for our strategic partners globally.", 
    descAr: "تحقيق متوسط عائد استثمار بنسبة 340% لشركائنا الاستراتيجيين حول العالم.",
    icon: Award 
  },
  { 
    year: "2026", 
    titleEn: "Future", 
    titleAr: "رؤية 2026", 
    descEn: "Leading the global digital shift through autonomous digital architectures.", 
    descAr: "قيادة التحول الرقمي العالمي من خلال بنية تحتية رقمية ذاتية الإدارة.",
    icon: Calendar 
  },
];

const AboutTimeline = () => {
  const { lang } = useTranslation();
  const isAr = lang === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative bg-background py-32 md:py-64 overflow-hidden">
      
      {/* Technical Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, var(--primary) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Central Neural Path */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/10 -translate-x-1/2">
        <motion.div 
          style={{ scaleY: pathLength, originY: 0, opacity }}
          className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-transparent shadow-[0_0_15px_var(--primary)]"
        />
        <motion.div 
          style={{ top: useTransform(pathLength, [0, 1], ["0%", "100%"]), opacity }}
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full blur-[4px] z-30"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-40 space-y-6 text-center md:text-left rtl:md:text-right">
          <Badge variant="outline" className="px-5 py-1.5 border-primary/30 bg-primary/5 text-primary font-mono tracking-[0.4em] uppercase text-[10px] animate-pulse">
             <Binary size={12} className="mr-2 inline" />
             {isAr ? "بروتوكول_النمو_الزمني" : "TEMPORAL_GROWTH_PROTOCOL"}
          </Badge>
          <h2 className="text-6xl md:text-[10vw] font-black tracking-tighter uppercase leading-none text-foreground">
            {isAr ? "تطورنا" : "ROADMAP"}<span className="text-primary text-glow">.</span>
          </h2>
        </div>

        <div className="relative">
          {timeline.map((item, i) => {
            const isEven = i % 2 === 0;
            
            return (
              <div key={item.year} className={`group relative flex flex-col md:flex-row items-center justify-between mb-32 last:mb-0 ${!isEven && 'md:flex-row-reverse'}`}>
                
                {/* A. Year Label */}
                <div className={`w-full md:w-[42%] flex ${isEven ? 'md:justify-end' : 'md:justify-start'} mb-12 md:mb-0`}>
                  <motion.div
                    initial={{ opacity: 0, rotateX: 45 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative"
                  >
                    <span className="text-7xl md:text-[12vw] font-black leading-none text-primary/[0.07] dark:text-primary/[0.04] select-none tracking-tighter block font-mono italic">
                      {item.year}
                    </span>
                    <div className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-4 w-full ${isEven ? 'justify-end' : 'justify-start'}`}>
                       <span className="text-xs font-mono uppercase tracking-widest bg-background px-3 py-1 border border-border/50 rounded-full shadow-xl">
                          {isAr ? `المرحلة_٠${i+1}` : `STG_0${i+1}`}
                       </span>
                    </div>
                  </motion.div>
                </div>

                {/* B. The Technical Card */}
                <div className="w-full md:w-[48%] relative perspective-1000">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, type: "spring" }}
                  >
                    <Card className="relative overflow-hidden border-border/40 bg-card/40 backdrop-blur-2xl rounded-[2rem] group-hover:border-primary/50 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.1)]">
                      <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-primary/20 group-hover:border-primary/60 transition-colors duration-500 rounded-tr-[2rem]" />
                      
                      <CardContent className="p-8 md:p-12 space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-1000 shadow-inner">
                            <item.icon size={32} className="text-primary" strokeWidth={1.5} />
                          </div>
                          <div>
                             <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground group-hover:text-glow transition-all">
                                {isAr ? item.titleAr : item.titleEn}
                             </h3>
                             <div className="h-1 w-12 bg-primary/30 mt-2 group-hover:w-full transition-all duration-700" />
                          </div>
                        </div>

                        {/* هنا الترجمة الصحيحة للوصف واتجاه النص */}
                        <p className={`text-lg md:text-2xl text-muted-foreground leading-relaxed font-light ${isAr ? 'font-cairo text-right' : 'text-left'}`}>
                          {isAr ? item.descAr : item.descEn}
                        </p>

                        <div className="pt-6 flex items-center justify-between border-t border-border/30">
                          <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent font-mono text-[10px] tracking-[0.4em]">
                            {isAr ? "فتح_الملف" : "EXECUTE_LOG"}
                            <ArrowUpRight className={`${isAr ? 'mr-2 rotate-[-90deg]' : 'ml-2'} group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform`} size={14} />
                          </Button>
                          
                          <div className="flex items-center gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
                             <Activity size={14} className="text-primary animate-pulse" />
                             <span className="text-[8px] font-mono tracking-tighter uppercase">
                               {isAr ? "الحالة: مباشر" : "Status: Live"}
                             </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* C. The Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 z-20">
                  <motion.div 
                    whileInView={{ scale: [1, 1.5, 1], rotate: [0, 90, 0] }}
                    className="h-4 w-4 bg-background border-2 border-primary rounded-sm shadow-[0_0_15px_var(--primary)]" 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;