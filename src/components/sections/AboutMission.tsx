"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { Target, Eye, Compass, Activity, Zap, Shield, LucideIcon } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- 1. تعريف الأنواع لضمان استقرار TypeScript ---
interface MissionCardProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  tag: string;
  footerIcon: LucideIcon;
  footerText: string;
  side: "left" | "right";
}

const AboutMission = () => {
  const { t, lang } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isAr = lang === 'ar';

  // بارالاكس للخلفية باستخدام Framer Motion فقط
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const rotateDecor = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 md:py-48 overflow-hidden bg-background border-y border-border/50"
    >
      {/* 1. LAYER: Dynamic Background Decor */}
      <motion.div 
        style={{ y: backgroundY, rotate: rotateDecor }}
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] dark:opacity-[0.03]"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary rounded-full blur-[120px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* --- MISSION MODULE --- */}
          <MissionCard 
            title={t("about.mission.title")}
            desc={t("about.mission.desc")}
            icon={Compass}
            tag={isAr ? "المهمة_٠١" : "Mission_01"}
            footerIcon={Zap}
            footerText="CORE_FOUNDATION"
            side="left"
          />

          {/* --- VISION MODULE --- */}
          <MissionCard 
            title={t("about.vision.title")}
            desc={t("about.vision.desc")}
            icon={Eye}
            tag={isAr ? "الرؤية_٠٢" : "Vision_02"}
            footerIcon={Activity}
            footerText="FUTURE_TRAJECTORY"
            side="right"
          />

        </div>

        {/* --- BOTTOM HUD (Technical Metadata) --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="font-mono text-[10px] tracking-widest px-3 py-1">
              SYSTEM_AUTH: OK
            </Badge>
            <span className="font-mono text-[9px] uppercase opacity-40 tracking-[0.3em] hidden sm:block">
              // Encrypted_Communication_v2
            </span>
          </div>
          
          <div className="flex gap-8 items-center opacity-40 font-mono text-[9px] uppercase tracking-widest">
            <div className="flex items-center gap-2">
               <Shield size={10} className="text-primary" /> Security_Verified
            </div>
            <div>© 2026 Tungsten Labs</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================
// مكون الكارت المبتكر (The Spotlight Card)
// ==========================================
const MissionCard = ({ title, desc, icon: Icon, tag, footerIcon: FooterIcon, footerText, side }: MissionCardProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -50 : 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative h-full group bg-card/20 backdrop-blur-3xl border-border/50 overflow-hidden rounded-[3rem] transition-colors duration-500 hover:border-primary/30"
      >
        {/* Spotlight Effect */}
        <div 
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(var(--primary-rgb), 0.15), transparent 40%)`,
          }}
        />

        <CardContent className="p-10 md:p-16 flex flex-col h-full justify-between relative z-10">
          <div>
            <div className="flex items-center justify-between mb-12">
              <Badge variant="outline" className="font-mono text-[9px] tracking-[0.5em] uppercase border-primary/20 text-primary py-1 px-4">
                {tag}
              </Badge>
              <div className="h-12 w-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                <Icon size={20} className="text-primary" />
              </div>
            </div>

            <h3 className="text-5xl md:text-6xl font-black text-foreground mb-8 tracking-tighter uppercase leading-[1.1]">
              <RevealText>{title}</RevealText>
              <span className="text-primary">.</span>
            </h3>

            <p className="text-muted-foreground text-lg md:text-2xl leading-relaxed font-light italic opacity-80 group-hover:opacity-100 transition-opacity">
              {desc}
            </p>
          </div>

          <div className="mt-16 flex items-center gap-4">
            <FooterIcon size={18} className="text-primary animate-pulse" />
            <div className="h-[1px] flex-1 bg-border/50" />
            <span className="text-[9px] font-mono tracking-[0.4em] opacity-30 group-hover:opacity-100 transition-opacity">
              {footerText}
            </span>
          </div>
        </CardContent>

        {/* Interior Technical Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(var(--primary-rgb),0.01)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_6s_linear_infinite] pointer-events-none" />
      </Card>
    </motion.div>
  );
};

export default AboutMission;