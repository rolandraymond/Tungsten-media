"use client";

import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  Variants,
} from "framer-motion";
import {
  Search,
  Code,
  Palette,
  Share2,
  TrendingUp,
  Figma,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { services } from "@/data/services-data";
import RevealText from "@/components/ui/RevealText";

// --- 1. TYPES ---
interface Service {
  slug: string;
  icon: string;
  title: Record<string, string>;
  description: Record<string, string>;
}

const iconMap: Record<string, React.ElementType> = {
  Search, Code, Palette, Share2, TrendingUp, Figma,
};

// --- 2. DYNAMIC MOUSE TRACKER ---
const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY };
};

// --- 3. ANIMATION VARIANTS ---
const sectionVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- 4. MAIN COMPONENT ---
const ServicesGrid = () => {
  const { t, lang } = useTranslation();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { mouseX, mouseY } = useMousePosition();

  const glow = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(var(--primary-rgb), 0.08), transparent 45%)`;

  return (
    <section
      ref={containerRef}
      key={location.pathname}
      className="relative overflow-hidden bg-background py-32 md:py-48 transition-colors duration-500 selection:bg-primary selection:text-black"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[150px]" />
      </div>

      <motion.div className="pointer-events-none absolute inset-0 z-0" style={{ background: glow }} />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div className="mb-24 md:mb-32 max-w-4xl" variants={headerVariants}>
          <div className="mb-8 flex items-center gap-4">
             <div className="h-px w-12 bg-primary shadow-[0_0_15px_var(--primary)]" />
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary font-mono">
               System_Archive // 0{services.length}
             </span>
          </div>

          <h2 className="mb-8 text-5xl font-black leading-[1.1] tracking-tighter md:text-8xl lg:text-9xl text-foreground uppercase">
            <RevealText className="inline-block">{t("services.title")}</RevealText>
            <span className="text-primary animate-pulse">.</span>
          </h2>

          <p className="max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-2xl italic">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service as Service} index={i} lang={lang} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// --- 5. THE 3D MASTERPIECE CARD ---
const ServiceCard = ({ service, index, lang }: { service: Service; index: number; lang: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = iconMap[service.icon] || Search;

  const rotateX = useSpring(0, { stiffness: 100, damping: 15 });
  const rotateY = useSpring(0, { stiffness: 100, damping: 15 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    rotateX.set(((e.clientY - centerY) / rect.height) * -25); // زيادة قوة الميلان
    rotateY.set(((e.clientX - centerX) / rect.width) * 25);

    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
      className="group relative h-[550px] [perspective:2000px]" // زيادة الـ Perspective لعمق أكبر
    >
      <Link to={`/services/${service.slug}`} className="block h-full">
        <motion.div
          ref={cardRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative h-full w-full rounded-[3.5rem] border border-white/10 bg-card/30 p-12 backdrop-blur-2xl transition-all duration-500 hover:border-primary/50 hover:bg-primary/[0.03] shadow-2xl"
        >
          {/* 1. Deep Layer: Large Background Index */}
          <div 
            className="absolute -right-6 -top-6 pointer-events-none select-none opacity-[0.03] transition-opacity duration-700 group-hover:opacity-[0.1]"
            style={{ transform: "translateZ(-80px)" }} // مدفون للداخل
          >
            <span className="text-[20rem] font-black italic leading-none tracking-tighter">
              0{index + 1}
            </span>
          </div>

          {/* 2. Middle Layer: Holographic Inner Glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3.5rem]"
            style={{
              background: useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(var(--primary-rgb), 0.2), transparent 45%)`,
              transform: "translateZ(20px)"
            }}
          />

          {/* 3. Pop-out Layer: Technical Icon Box */}
          <div className="relative z-10 mb-16" style={{ transform: "translateZ(120px)" }}> {/* بارز جداً للخارج */}
            <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-[2.5rem] border border-border bg-background shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:border-primary/60 group-hover:scale-110">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(var(--primary-rgb),0.08)_50%,transparent_100%)] bg-[length:100%_6px] animate-[scan_3s_linear_infinite] opacity-0 group-hover:opacity-100" />
              <Icon className="h-11 w-11 text-muted-foreground transition-all duration-500 group-hover:text-primary" />
            </div>
          </div>

          {/* 4. Content Layer: Title & Description */}
          <div className="relative z-10 flex flex-col" style={{ transform: "translateZ(70px)" }}> {/* بارز بمسافة متوسطة */}
            <div className="mb-8 flex items-start justify-between gap-4">
              <h3 className="text-4xl font-black uppercase leading-[1] tracking-tighter text-foreground transition-colors duration-500 group-hover:text-primary md:text-5xl pb-2">
                {service.title?.[lang] || service.title?.en}
              </h3>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-700 -rotate-45 group-hover:rotate-0 group-hover:bg-primary group-hover:text-black shadow-lg">
                <ArrowUpRight size={24} />
              </div>
            </div>

            <p className="max-w-[95%] text-lg font-medium leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
              {service.description?.[lang] || service.description?.en}
            </p>

            {/* Micro Data Labels */}
            <div className="mt-12 flex flex-wrap gap-3 opacity-30 group-hover:opacity-100 transition-all duration-500" style={{ transform: "translateZ(40px)" }}>
              {["Innovation", "Strategic", "Modern"].map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-foreground/5 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-foreground/50 font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Floating Brackets: Non-traditional Decors */}
          <div 
            className="absolute -left-4 -top-4 h-12 w-12 border-l-2 border-t-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-700" 
            style={{ transform: "translateZ(150px)" }} // طائرة فوق الكارت تماماً
          />
          <div 
            className="absolute -right-4 -bottom-4 h-12 w-12 border-r-2 border-b-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-700" 
            style={{ transform: "translateZ(150px)" }} 
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ServicesGrid;