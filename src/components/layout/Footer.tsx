"use client";

import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowUp, Globe, Clock, ArrowUpRight, Terminal, Share2 } from "lucide-react";

// --- 1. الأنوُاع (Interfaces) ---
interface SocialLink {
  label: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "Dribbble", href: "#" },
];

const Footer = () => {
  const { t, lang } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState<string>("");

  // تحديث الساعة الحية (Live Technical Clock)
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString(lang === "ar" ? "ar-EG" : "en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [lang]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // حركات البارالاكس مع السكرول
  const xMarquee = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const footerScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <footer
      ref={containerRef}
      className="relative bg-background border-t border-border overflow-hidden pt-32 pb-12 transition-colors duration-700"
    >
      {/* 1. KINETIC BRAND WATERMARK */}
      <div className="absolute top-0 left-0 w-full pointer-events-none select-none z-0">
        <motion.div style={{ x: xMarquee, opacity: opacityFade }} className="flex whitespace-nowrap">
          <h2 className="text-[28vw] font-black uppercase leading-none tracking-tighter text-foreground/[0.02] dark:text-foreground/[0.03]">
            TUNGSTEN — CREATIVE — TUNGSTEN — CREATIVE —
          </h2>
        </motion.div>
      </div>

      {/* 2. ARCHITECTURAL GRID OVERLAY */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[length:120px_120px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* 3. MAIN CONTENT WRAPPER */}
      <motion.div 
        style={{ scale: footerScale }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-20 xl:gap-12 mb-32">
          
          {/* --- Column 1: The Brand Core (Massive Logo) --- */}
          <div className="xl:col-span-7 flex flex-col items-start space-y-12 text-left rtl:text-right">
            
            {/* اللوجو مع التبديل التلقائي بين اللايت والدارك */}
            <Link to="/" className="group relative inline-block">
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-50 group-hover:scale-110 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
              
              <img 
                src="/img/LogoLight.png" 
                alt="Tungsten Logo" 
                className="relative z-10 h-20 md:h-28 w-auto object-contain block dark:hidden transition-transform duration-700 group-hover:scale-105 origin-left rtl:origin-right"
              />
              <img 
                src="/img/LogoDark.png" 
                alt="Tungsten Logo" 
                className="relative z-10 h-20 md:h-28 w-auto object-contain hidden dark:block transition-transform duration-700 group-hover:scale-105 origin-left rtl:origin-right"
              />
            </Link>

            {/* العنوان الكبير */}
            <h3 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.1] text-foreground uppercase max-w-3xl overflow-visible pb-4">
              {lang === "ar" ? "دعنا نُبهر العالم" : "Let's stun the world"}
              <span className="text-primary animate-pulse inline-block ml-2">.</span>
            </h3>

            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
               <Link to="/contact" className="group relative px-10 py-5 bg-foreground text-background rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-2xl">
                  <span className="relative z-10 font-black uppercase text-sm tracking-widest">{t("nav.contact")}</span>
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
               </Link>
               <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed border-l-2 border-border rtl:border-l-0 rtl:border-r-2 pl-4 rtl:pr-4">
                  // System_Status: Online <br />
                  // Response_Time: {"<"}1hr
               </div>
            </div>
          </div>

          {/* --- Column 2 & 3 Wrapper: Tech Navigation & Socials --- */}
          <div className="xl:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-16 xl:pl-10 rtl:xl:pl-0 rtl:xl:pr-10">
            
            {/* --- The Navigation Matrix --- */}
            <div className="space-y-10">
              <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px] tracking-[0.5em] border-b border-border/50 pb-4">
                <Terminal size={14} /> // Root_Map
              </div>
              <nav className="flex flex-col gap-6 text-left rtl:text-right">
                {[
                  { to: "/", label: t("nav.home") },
                  { to: "/about", label: t("nav.about") },
                  { to: "/services", label: t("nav.services") },
                  { to: "/contact", label: t("nav.contact") },
                ].map((link, i) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group flex items-center gap-4 text-2xl md:text-3xl font-black text-foreground/40 hover:text-foreground transition-all duration-500"
                  >
                    <span className="text-[10px] font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                      0{i+1}
                    </span>
                    <span className="group-hover:translate-x-3 rtl:group-hover:-translate-x-3 transition-transform uppercase tracking-tighter">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* --- The Social Grid --- */}
            <div className="space-y-10">
              <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px] tracking-[0.5em] border-b border-border/50 pb-4">
                <Share2 size={14} /> // Global_Sync
              </div>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <MagneticSocial key={link.label} label={link.label} href={link.href} />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* --- BOTTOM HUD BAR: Technical Metadata --- */}
        <div className="pt-10 border-t border-border/60 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-50 font-mono text-[9px] tracking-[0.2em] uppercase text-foreground w-full lg:w-auto">
            <div className="space-y-2">
              <div className="text-primary font-black flex items-center gap-2"><Clock size={12} /> Time_Sync</div>
              <div>{time || "Loading..."}</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary font-black flex items-center gap-2"><Globe size={12} /> Location</div>
              <div>CAI // 30.04N</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary font-black">Legal</div>
              <div>© {new Date().getFullYear()} Tungsten</div>
            </div>
            <div className="space-y-2">
              <div className="text-primary font-black">Status</div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> All Systems Op.
              </div>
            </div>
          </div>

          {/* Return to Top Premium Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-6 self-start lg:self-auto hover:gap-8 transition-all duration-500"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">
              Return_To_Top
            </span>
            <div className="h-12 w-12 rounded-full border border-border group-hover:border-primary flex items-center justify-center bg-background group-hover:bg-primary transition-colors duration-500 shadow-lg">
               <ArrowUp size={16} className="text-foreground group-hover:text-background group-hover:-translate-y-1 transition-transform duration-500" />
            </div>
          </button>
        </div>
      </motion.div>
    </footer>
  );
};

// ==========================================
// 2. MagneticSocial Component (Refined)
// ==========================================
const MagneticSocial = ({ label, href }: SocialLink) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between p-5 bg-card/30 border border-border/40 rounded-2xl overflow-hidden hover:border-primary/60 hover:bg-card/80 transition-all duration-500 backdrop-blur-sm"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative z-10 flex flex-col justify-center">
        <span className="text-lg font-black text-foreground/70 group-hover:text-foreground transition-colors uppercase tracking-tighter leading-none">
          {label}
        </span>
      </div>
      
      <div className="relative z-10 h-8 w-8 rounded-full bg-background border border-border/50 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
        <ArrowUpRight size={14} className="text-foreground/50 group-hover:text-background group-hover:rotate-45 transition-all duration-500" />
      </div>
      
      {/* Liquid Premium Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />
    </motion.a>
  );
};

export default Footer;