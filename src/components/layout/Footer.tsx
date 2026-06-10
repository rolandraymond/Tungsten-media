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
  { label: "Instagram", href: "https://www.instagram.com/tungstenmedianet?igsh=ajUwanNlMHV0ODdv" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/tungsten-media00" },
  { label: "Twitter / X", href: "#" },
  { label: "Facebook", href: "https://www.facebook.com/tungstenmedianet/" },
];

const Footer = () => {
  const { t, lang } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState<string>("");

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

  const xMarquee = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const footerScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <footer
      ref={containerRef}
      // 🚀 Premium Glassmorphism Effect
      className="relative bg-background/90 backdrop-blur-3xl border-t border-border/50 overflow-hidden pt-32 pb-12 transition-colors duration-700 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]"
    >
      {/* 1. KINETIC BRAND WATERMARK (SEO Optimized: Hidden from Screen Readers) */}
      <div className="absolute top-0 left-0 w-full pointer-events-none select-none z-0" aria-hidden="true">
        <motion.div style={{ x: xMarquee, opacity: opacityFade }} className="flex whitespace-nowrap">
          <h2 className="text-[28vw] font-black uppercase leading-none tracking-tighter text-foreground/[0.02] dark:text-foreground/[0.03]">
            TUNGSTEN — CREATIVE — TUNGSTEN — CREATIVE —
          </h2>
        </motion.div>
      </div>

      {/* 2. ARCHITECTURAL GRID OVERLAY */}
      <div className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[length:120px_120px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* 3. MAIN CONTENT WRAPPER */}
      <motion.div 
        style={{ scale: footerScale }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-20 xl:gap-12 mb-32">
          
          <div className="xl:col-span-7 flex flex-col items-start space-y-12 text-left rtl:text-right">
            
            <Link to="/" className="group relative inline-block" aria-label="Tungsten Media Home">
              <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full scale-50 group-hover:scale-110 transition-transform duration-700 opacity-0 group-hover:opacity-100" />
              
              <img 
                src="/img/LogoLight.png" 
                alt="Tungsten Media Agency Logo" 
                className="relative z-10 h-20 md:h-28 w-auto object-contain block dark:hidden transition-transform duration-700 group-hover:scale-105 origin-left rtl:origin-right drop-shadow-sm"
              />
              <img 
                src="/img/LogoDark.png" 
                alt="Tungsten Media Agency Logo" 
                className="relative z-10 h-20 md:h-28 w-auto object-contain hidden dark:block transition-transform duration-700 group-hover:scale-105 origin-left rtl:origin-right"
              />
            </Link>

            {/* 🚀 Elegant typography with subtle gradient */}
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 uppercase max-w-3xl overflow-visible pb-4">
              {lang === "ar" ? "دعنا نُبهر العالم" : "Let's stun the world"}
              <span className="text-primary animate-pulse inline-block ml-2">.</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
               <Link to="/contact" className="group relative px-10 py-5 bg-foreground text-background rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.1)] active:scale-95">
                  <span className="relative z-10 font-black uppercase text-sm tracking-widest">{t("nav.contact")}</span>
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
               </Link>
               <div className="text-muted-foreground font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed border-l-2 border-border/50 rtl:border-l-0 rtl:border-r-2 pl-4 rtl:pr-4" aria-hidden="true">
                  // System_Status: Online <br />
                  // Response_Time: {"<"}1hr
               </div>
            </div>
          </div>

          <div className="xl:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-16 xl:pl-10 rtl:xl:pl-0 rtl:xl:pr-10">
            
            <nav className="space-y-10" aria-label="Footer Navigation">
              <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px] tracking-[0.5em] border-b border-border/30 pb-4">
                <Terminal size={14} /> // Root_Map
              </div>
              <div className="flex flex-col gap-6 text-left rtl:text-right">
                {[
                  { to: "/", label: t("nav.home") },
                  { to: "/about", label: t("nav.about") },
                  { to: "/services", label: t("nav.services") },
                  { to: "/contact", label: t("nav.contact") },
                  { to: "/profile", label: t("nav.profile") },
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
              </div>
            </nav>

            <nav className="space-y-10" aria-label="Social Media Links">
              <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px] tracking-[0.5em] border-b border-border/30 pb-4">
                <Share2 size={14} /> // Global_Sync
              </div>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <MagneticSocial key={link.label} label={link.label} href={link.href} />
                ))}
              </div>
            </nav>

          </div>
        </div>

        {/* --- BOTTOM HUD BAR: Technical Metadata --- */}
        <div className="pt-10 border-t border-border/30 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-60 font-mono text-[9px] tracking-[0.2em] uppercase text-foreground w-full lg:w-auto">
            <div className="space-y-2">
              <div className="text-primary font-black flex items-center gap-2"><Clock size={12} /> Time_Sync</div>
              <div aria-live="polite">{time || "Loading..."}</div>
            </div>
            
            {/* 🚀 Semantic Address Tag for Local SEO */}
            <address className="space-y-2 not-italic">
              <div className="text-primary font-black flex items-center gap-2"><Globe size={12} /> Location</div>
              <div>CAI // 30.04N</div>
            </address>
            
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

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Return to top of page"
            className="group flex items-center gap-6 self-start lg:self-auto hover:gap-8 transition-all duration-500"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">
              Return_To_Top
            </span>
            <div className="h-12 w-12 rounded-full border border-border/50 group-hover:border-primary flex items-center justify-center bg-background/50 backdrop-blur-md group-hover:bg-primary transition-all duration-500 shadow-sm group-hover:shadow-lg">
               <ArrowUp size={16} className="text-foreground group-hover:text-background group-hover:-translate-y-1 transition-transform duration-500" />
            </div>
          </button>
        </div>
      </motion.div>
    </footer>
  );
};

// ==========================================
// 2. MagneticSocial Component (Glassmorphism Refined)
// ==========================================
const MagneticSocial = ({ label, href }: SocialLink) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow us on ${label}`}
      // 🚀 Premium Glass Button Design
      className="group relative flex items-center justify-between p-5 bg-background/40 border border-border/20 rounded-2xl overflow-hidden hover:border-primary/40 hover:bg-background/80 transition-all duration-500 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative z-10 flex flex-col justify-center">
        <span className="text-lg font-black text-foreground/80 group-hover:text-foreground transition-colors uppercase tracking-tighter leading-none">
          {label}
        </span>
      </div>
      
      <div className="relative z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-sm">
        <ArrowUpRight size={14} className="text-foreground/70 group-hover:text-background group-hover:rotate-45 transition-all duration-500" />
      </div>
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      />
    </motion.a>
  );
};

export default Footer;