"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Users, Terminal, Cpu, Zap, ShieldCheck, Layers } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useTranslation } from "@/hooks/use-translation";

// 1. تعريف واجهة الكارد
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
}

// 2. الكارد الإبداعي
const FeatureCard = ({ icon: Icon, title, desc }: FeatureCardProps) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-3xl bg-card/30 border border-border/40 backdrop-blur-md flex flex-col gap-4"
  >
    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
      <Icon size={24} />
    </div>
    <h3 className="font-black uppercase tracking-widest">{title}</h3>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </motion.div>
);

const CompanyProfile = () => {
  const { t } = useTranslation();
  const pdfUrl = "/assets/Tungsten_Profile.pdf"; 

  return (
    <div className="relative min-h-screen bg-background pt-32 pb-20 overflow-hidden font-sans">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full" 
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Section */}
        <header className="max-w-4xl mb-16 md:mb-24">
          <div className="flex items-center gap-3 text-primary font-mono text-[10px] uppercase tracking-[0.5em] mb-4">
            <Cpu size={14} /> // Tungsten_Core / Identity_Vault
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[1.1] mb-6">
            {t("profile.title")} <br />
            <span className="text-foreground/40 italic text-3xl md:text-5xl lg:text-6xl font-sans font-light tracking-normal block mt-2">
              {t("profile.subtitle")}
            </span>
          </h1>

          <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
            {t("profile.description")}
          </p>
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Features */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <FeatureCard icon={Zap} title={t("feature.tech.title")} desc={t("feature.tech.desc")} />
            <FeatureCard icon={ShieldCheck} title={t("feature.quality.title")} desc={t("feature.quality.desc")} />
            <FeatureCard icon={Layers} title={t("feature.scale.title")} desc={t("feature.scale.desc")} />
            
            <a href={pdfUrl} download className="block pt-6">
              <MagneticButton className="w-full bg-foreground text-background py-5 flex items-center justify-center gap-3 rounded-2xl">
                <Download size={20} />
                <span className="font-black uppercase text-xs tracking-[0.2em]">{t("profile.download")}</span>
              </MagneticButton>
            </a>
          </div>

          {/* Right Column: PDF Display */}
          <div className="lg:col-span-8">
            <div className="relative h-[60vh] md:h-[700px] w-full rounded-[2rem] bg-card border border-border/40 overflow-hidden shadow-2xl">
              <iframe 
                src={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`} 
                className="w-full h-full border-none"
                title="Company Profile"
              />
            </div>
            <p className="mt-4 text-[10px] text-muted-foreground uppercase tracking-widest text-center">
              {t("profile.status")}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;