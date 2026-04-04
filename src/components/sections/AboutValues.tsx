"use client";

import React, { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
} from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { 
  Target, Lightbulb, Shield, Eye, 
  Fingerprint, Activity, Cpu, 
  Zap, Binary, Radio
} from "lucide-react";

// --- 1. أنواع البيانات المتطورة ---
interface ValueItem {
  id: string;
  icon: React.ElementType;
  en: string;
  ar: string;
  descEn: string;
  descAr: string;
  techCode: string;
  color: string;
}

const values: ValueItem[] = [
  { 
    id: "v1",
    icon: Target, 
    en: "Precision", 
    ar: "الدقة", 
    descEn: "Zero-latency execution in every line of code we architect.",
    descAr: "تنفيذ فائق السرعة وبدون أخطاء في كل سطر برمج نخطط له.",
    techCode: "ERR_0_ACCURACY_100",
    color: "#fbbf24"
  },
  { 
    id: "v2",
    icon: Lightbulb, 
    en: "Innovation", 
    ar: "الابتكار", 
    descEn: "Breaking digital barriers through disruptive neural design.",
    descAr: "كسر الحواجز الرقمية من خلال تصميمات عصبية ثورية.",
    techCode: "NEW_CORE_v4.2",
    color: "#3b82f6"
  },
  { 
    id: "v3",
    icon: Shield, 
    en: "Integrity", 
    ar: "النزاهة", 
    descEn: "Immutable transparency in our strategic protocols.",
    descAr: "شفافية غير قابلة للتغيير في بروتوكولاتنا الاستراتيجية.",
    techCode: "SECURE_PROTOCOL_INIT",
    color: "#10b981"
  },
  { 
    id: "v4",
    icon: Eye, 
    en: "Vision", 
    ar: "الرؤية", 
    descEn: "Synthesizing future trends before they hit the stream.",
    descAr: "تجميع التوجهات المستقبلية قبل وصولها إلى التيار العام.",
    techCode: "VISION_SCAN_ACTIVE",
    color: "#ef4444"
  },
];

// --- 2. مكون الخلفية التفاعلية (The Neural Grid) ---
const NeuralBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0.5px,transparent_0.5px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent"
      />
    </div>
  );
};

// --- 3. مكون الكارت المغناطيسي (The Magnetic HUD Card) ---
const ValueCard = ({ item, index, isAr }: { item: ValueItem, index: number, isAr: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
      className="relative h-[450px] group cursor-none"
    >
      <div className="absolute inset-0 rounded-[3rem] bg-card/30 backdrop-blur-3xl border border-white/5 dark:border-white/10 overflow-hidden group-hover:border-primary/40 transition-colors duration-500">
        
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center opacity-20 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1">
            <div className="w-1 h-4 bg-primary animate-pulse" />
            <div className="w-1 h-3 bg-primary/50" />
            <div className="w-1 h-2 bg-primary/20" />
          </div>
          <span className="text-[8px] font-mono tracking-tighter uppercase">{item.techCode}</span>
        </div>

        <div className="h-full flex flex-col p-10 pt-20 relative z-10" style={{ transform: "translateZ(50px)" }}>
          
          <div className="relative mb-12 self-start rtl:self-end">
            <motion.div 
              animate={{ 
                rotate: [0, 90, 180, 270, 360],
                borderColor: [item.color, "rgba(255,255,255,0.1)", item.color] 
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border border-dashed border-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" 
            />
            <div className="h-20 w-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center relative group-hover:bg-primary/10 transition-all duration-500 overflow-hidden">
               <motion.div 
                 animate={{ top: ["-100%", "200%"] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 right-0 h-[2px] bg-primary/30 z-0" 
               />
               <item.icon className="h-10 w-10 text-primary relative z-10" strokeWidth={1} />
            </div>
          </div>

          <div className={`mt-auto space-y-6 ${isAr ? 'text-right' : 'text-left'}`}>
            {/* تم تصحيح الخطأ هنا: h4 الآن تُغلق بـ h4 */}
            <h4 className="text-4xl font-black uppercase tracking-tighter text-foreground leading-none">
              {isAr ? item.ar : item.en}
            </h4>
            <p className="text-muted-foreground/80 text-lg font-light leading-relaxed rtl:font-cairo">
              {isAr ? item.descAr : item.descEn}
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
              <span className="text-[7px] font-mono uppercase tracking-[0.3em]">Status: Verified</span>
            </div>
            <Fingerprint size={16} className="text-primary/40" />
          </div>
        </div>

        <motion.div 
          style={{ 
            x: useTransform(mouseX, [-0.5, 0.5], [-100, 100]), 
            y: useTransform(mouseY, [-0.5, 0.5], [-100, 100]) 
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-0 group-hover:opacity-20 blur-3xl pointer-events-none" 
        />
      </div>
    </motion.div>
  );
};

// --- 4. المكون الأساسي (AboutValues) ---
const AboutValues = () => {
  const { lang } = useTranslation();
  const isAr = lang === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      ref={sectionRef}
      className="relative py-40 md:py-60 bg-background overflow-hidden selection:bg-primary selection:text-black"
    >
      <NeuralBackground />

      <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden xl:flex flex-col gap-10 opacity-10 pointer-events-none">
        {[Zap, Activity, Cpu, Binary].map((Icon, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Icon size={20} />
            <div className="w-px h-20 bg-gradient-to-b from-primary to-transparent" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-40 gap-10 border-b border-white/5 pb-20">
          <div className="max-w-3xl space-y-6 text-left rtl:text-right">
            <div className="flex items-center gap-4 text-primary font-mono text-xs tracking-[0.5em] uppercase">
              <Radio size={14} className="animate-pulse" />
              {isAr ? 'بروتوكولات_الجوهر' : 'CORE_PROTOCOLS_v.01'}
            </div>
            <h2 className="text-7xl md:text-[11vw] font-black tracking-tighter uppercase leading-[0.8] text-foreground">
              {isAr ? 'القيم التي' : 'VALUES'} <br />
              <span className="text-primary italic underline decoration-primary/20 decoration-8 underline-offset-[15px]">
                {isAr ? 'تحركنا' : 'DRIVE US'}
              </span>
            </h2>
          </div>
          
          <div className="max-w-xs text-muted-foreground/60 font-mono text-[10px] uppercase leading-relaxed tracking-widest hidden md:block">
            Tungsten core values are encoded into every architectural decision we make. 
            Integrity. Precision. Innovation. Vision.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 lg:gap-8 perspective-2000">
          {values.map((v, i) => (
            <ValueCard key={v.id} item={v} index={i} isAr={isAr} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 pt-10 border-t border-white/5 flex flex-wrap justify-between items-center gap-10 opacity-30 font-mono text-[9px] uppercase tracking-[0.4em]"
        >
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-primary mb-1">Architecture</span>
              <span>Next.js 15_FramerMotion</span>
            </div>
            <div className="flex flex-col">
              <span className="text-primary mb-1">Encoding</span>
              <span>UTF-8_Digital_Glow</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <motion.div 
                  key={i}
                  animate={{ height: [4, 12, 4] }}
                  transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                  className="w-1 bg-primary/40"
                />
              ))}
            </div>
            <span>Deep_Processing_Unit</span>
          </div>

          <div className="text-right">
            Designed to last // <br />
            Built to Outperform
          </div>
        </motion.div>
      </div>

      <div className="absolute -bottom-20 right-10 text-[20vw] font-black text-foreground/[0.02] pointer-events-none select-none uppercase tracking-tighter">
        Essence
      </div>
    </section>
  );
};

export default AboutValues;