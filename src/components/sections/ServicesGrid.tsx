"use client";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  Variants,
  useReducedMotion,
} from "framer-motion";
import {
  Search,
  Code,
  Palette,
  Share2,
  TrendingUp,
  Figma,
  ArrowUpRight,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { services } from "@/data/services-data";
import RevealText from "@/components/ui/RevealText";

// --- TYPES ---
interface Service {
  slug: string;
  icon: string;
  title: Record<string, string>;
  description: Record<string, string>;
}

const iconMap: Record<string, React.ElementType> = {
  Search,
  Code,
  Palette,
  Share2,
  TrendingUp,
  Figma,
};

// --- ANIMATION VARIANTS ---
const sectionVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const ServicesGrid = () => {
  const { t, lang } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32 transition-colors duration-500 selection:bg-primary selection:text-black">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[320px] w-[320px] rounded-full bg-primary/10 blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[280px] w-[280px] rounded-full bg-blue-500/10 blur-[120px] sm:h-[460px] sm:w-[460px] sm:blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_35%)]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div className="mb-12 max-w-4xl sm:mb-16 lg:mb-20" variants={headerVariants}>
          <div className="mb-5 flex items-center gap-3 sm:mb-7 sm:gap-4">
            <div className="h-px w-8 bg-primary shadow-[0_0_15px_var(--primary)] sm:w-12" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-primary sm:text-[11px] sm:tracking-[0.5em]">
              System_Archive // 0{services.length}
            </span>
          </div>

          <h2 className="max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tighter text-foreground sm:text-6xl lg:text-8xl xl:text-9xl">
            <RevealText className="inline-block">{t("services.title")}</RevealText>
            <span className="text-primary">.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-7 sm:text-lg md:text-xl lg:text-2xl">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {services.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service as Service}
              index={i}
              lang={lang}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

type ServiceCardProps = {
  service: Service;
  index: number;
  lang: string;
};

const ServiceCard = ({ service, index, lang }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const Icon = iconMap[service.icon] || Search;

  const rotateX = useSpring(0, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 18 });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const innerGlow = useMotionTemplate`
    radial-gradient(
      600px circle at ${glowX}% ${glowY}%,
      rgba(var(--primary-rgb), 0.18),
      transparent 42%
    )
  `;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateXValue = ((e.clientY - centerY) / rect.height) * -10;
    const rotateYValue = ((e.clientX - centerX) / rect.width) * 10;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);

    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div variants={itemVariants} className="group">
      <Link to={`/services/${service.slug}`} className="block h-full">
        <motion.div
          ref={cardRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={
            prefersReducedMotion
              ? undefined
              : {
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }
          }
          className="
            relative isolate h-full min-h-[380px] overflow-hidden
            rounded-[2rem] border border-white/10 bg-card/40 p-6
            shadow-[0_20px_80px_rgba(0,0,0,0.18)]
            backdrop-blur-xl transition-all duration-500
            hover:border-primary/40 hover:bg-primary/[0.04]
            sm:min-h-[420px] sm:rounded-[2.25rem] sm:p-7
            lg:min-h-[500px] lg:p-9
            md:hover:-translate-y-2
          "
        >
          {/* Soft inner glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: innerGlow }}
          />

          {/* Background number */}
          <div
            className="
              pointer-events-none absolute -right-6 -top-4 select-none
              text-[7rem] font-black leading-none tracking-tighter text-foreground/5
              transition-all duration-700 group-hover:text-foreground/10
              sm:text-[9rem] lg:text-[11rem]
            "
          >
            0{index + 1}
          </div>

          {/* Top row */}
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background/70 shadow-lg transition-transform duration-500 group-hover:scale-105 sm:h-20 sm:w-20">
              <Icon className="h-8 w-8 text-muted-foreground transition-colors duration-500 group-hover:text-primary sm:h-9 sm:w-9" />
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/80 transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-black sm:h-12 sm:w-12">
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 mt-8 flex h-[calc(100%-6rem)] flex-col justify-between sm:mt-10">
            <div>
              <h3 className="max-w-[90%] text-3xl font-black uppercase leading-[0.98] tracking-tighter text-foreground transition-colors duration-500 group-hover:text-primary sm:text-4xl lg:text-5xl">
                {service.title?.[lang] || service.title?.en}
              </h3>

              <p className="mt-4 max-w-[95%] text-sm leading-7 text-muted-foreground transition-colors duration-500 group-hover:text-foreground sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">
                {service.description?.[lang] || service.description?.en}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 opacity-90 transition-opacity duration-500 group-hover:opacity-100 sm:mt-10">
              {["Innovation", "Strategic", "Modern"].map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full border border-border bg-foreground/5 px-3 py-1.5
                    font-mono text-[9px] font-black uppercase tracking-[0.18em]
                    text-foreground/60 transition-colors duration-500
                    group-hover:border-primary/30 group-hover:text-foreground
                    sm:px-4 sm:text-[10px]
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Corner accents */}
          <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-primary/20 opacity-0 transition-all duration-700 group-hover:opacity-100 sm:h-10 sm:w-10" />
          <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-primary/20 opacity-0 transition-all duration-700 group-hover:opacity-100 sm:h-10 sm:w-10" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ServicesGrid;