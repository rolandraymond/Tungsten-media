"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import {
  ArrowUp,
  Globe,
  Clock,
  ArrowUpRight,
  Terminal,
  Share2,
  Sparkles,
  Radar,
} from "lucide-react";

interface SocialLink {
  label: string;
  href: string;
}

interface TimeChipProps {
  label: string;
  time: string;
  zone: string;
  active?: boolean;
  icon?: React.ElementType;
}

const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/tungstenmedianet?igsh=ajUwanNlMHV0ODdv",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/tungsten-media00",
  },
  { label: "Twitter / X", href: "#" },
  { label: "Facebook", href: "https://www.facebook.com/tungstenmedianet/" },
];

const formatTimeInZone = (timeZone: string, locale: string) => {
  try {
    return new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "--:--:--";
  }
};

const getVisitorTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const TimeChip = ({
  label,
  time,
  zone,
  active = false,
  icon: Icon = Clock,
}: TimeChipProps) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2 }}
      className={`group relative overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300 ${
        active
          ? "border-primary/50 bg-primary/[0.06] shadow-[0_0_40px_rgba(251,191,36,0.18)] ring-1 ring-primary/20"
          : "border-border/30 bg-foreground/5 hover:border-primary/20 hover:bg-foreground/7"
      }`}
    >
      {active && (
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        </motion.div>
      )}

      <div className="relative z-10 p-3.5 sm:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1.5">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.28em] text-primary/90">
              <Icon size={11} />
              <span>{label}</span>
            </div>

            <motion.div
              key={time}
              initial={{ opacity: 0.7, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="relative font-mono text-[15px] sm:text-[16px] font-black tracking-[0.14em] text-foreground tabular-nums leading-none"
            >
              <span className="relative inline-block">
                <span
                  aria-hidden="true"
                  className="absolute left-[1px] top-0 text-cyan-400/60 blur-[0.8px] translate-x-[-1px]"
                >
                  {time}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute left-[-1px] top-0 text-fuchsia-400/50 blur-[0.8px] translate-x-[1px]"
                >
                  {time}
                </span>
                <span className="relative z-10 inline-block">{time}</span>
              </span>
            </motion.div>

            <div className="text-[8px] uppercase tracking-[0.22em] text-muted-foreground/80 font-mono truncate">
              {zone}
            </div>
          </div>

          <div
            className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              active
                ? "border-primary/35 bg-primary text-background"
                : "border-border/30 bg-background/70 text-foreground/70 group-hover:border-primary/25 group-hover:text-foreground"
            }`}
          >
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={12} />
            </motion.div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                active ? "bg-primary animate-pulse" : "bg-emerald-500 animate-pulse"
              }`}
            />
            {active ? "Live sync" : "Regional sync"}
          </div>

          {active && (
            <div className="text-[8px] uppercase tracking-[0.26em] text-primary/80 font-black">
              Active
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MagneticSocial = ({ label, href }: SocialLink) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow us on ${label}`}
      className="group relative flex items-center justify-between p-4.5 bg-background/40 border border-border/20 rounded-2xl overflow-hidden hover:border-primary/35 hover:bg-background/75 transition-all duration-500 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative z-10 flex flex-col justify-center">
        <span className="text-base sm:text-lg font-black text-foreground/80 group-hover:text-foreground transition-colors uppercase tracking-tighter leading-none">
          {label}
        </span>
      </div>

      <div className="relative z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-sm">
        <ArrowUpRight
          size={14}
          className="text-foreground/70 group-hover:text-background group-hover:rotate-45 transition-all duration-500"
        />
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      />
    </motion.a>
  );
};

const Footer = () => {
  const { t, lang } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);

  const [cairoTime, setCairoTime] = useState<string>("");
  const [dubaiTime, setDubaiTime] = useState<string>("");
  const [qatarTime, setQatarTime] = useState<string>("");

  const visitorTimeZone = useMemo(() => getVisitorTimeZone(), []);

  const activeZone = useMemo<"cairo" | "dubai" | "qatar" | null>(() => {
    const zone = visitorTimeZone.toLowerCase();

    if (zone.includes("cairo") || zone.includes("egypt")) return "cairo";
    if (
      zone.includes("dubai") ||
      zone.includes("abu_dhabi") ||
      zone.includes("uae") ||
      zone.includes("emirates")
    )
      return "dubai";
    if (zone.includes("qatar") || zone.includes("doha")) return "qatar";

    return null;
  }, [visitorTimeZone]);

  useEffect(() => {
    const updateTimes = () => {
      const locale = lang === "ar" ? "ar-EG" : "en-US";

      setCairoTime(formatTimeInZone("Africa/Cairo", locale));
      setDubaiTime(formatTimeInZone("Asia/Dubai", locale));
      setQatarTime(formatTimeInZone("Asia/Qatar", locale));
    };

    updateTimes();
    const timer = window.setInterval(updateTimes, 1000);

    return () => window.clearInterval(timer);
  }, [lang]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const xMarquee = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const footerScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <footer
      ref={containerRef}
      className="relative bg-background/90 backdrop-blur-3xl border-t border-border/50 overflow-hidden pt-28 pb-10 transition-colors duration-700 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]"
    >
      <div
        className="absolute top-0 left-0 w-full pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <motion.div
          style={{ x: xMarquee, opacity: opacityFade }}
          className="flex whitespace-nowrap"
        >
          <h2 className="text-[28vw] font-black uppercase leading-none tracking-tighter text-foreground/[0.02] dark:text-foreground/[0.03]">
            TUNGSTEN — CREATIVE — TUNGSTEN — CREATIVE —
          </h2>
        </motion.div>
      </div>

      <div
        className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[length:120px_120px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <motion.div
        style={{ scale: footerScale }}
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 xl:gap-12 mb-24">
          <motion.div
            variants={itemVariants}
            className="xl:col-span-7 flex flex-col items-start space-y-10 text-left rtl:text-right"
          >
            <Link
              to="/"
              className="group relative inline-block"
              aria-label="Tungsten Media Home"
            >
              <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full scale-50 group-hover:scale-110 transition-transform duration-700 opacity-0 group-hover:opacity-100" />

              <img
                src="/img/LogoLight.png"
                alt="Tungsten Media Agency Logo"
                className="relative z-10 h-18 md:h-24 w-auto object-contain block dark:hidden transition-transform duration-700 group-hover:scale-105 origin-left rtl:origin-right drop-shadow-sm"
              />
              <img
                src="/img/LogoDark.png"
                alt="Tungsten Media Agency Logo"
                className="relative z-10 h-18 md:h-24 w-auto object-contain hidden dark:block transition-transform duration-700 group-hover:scale-105 origin-left rtl:origin-right"
              />
            </Link>

            <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tighter leading-[1.08] text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 uppercase max-w-3xl pb-2">
              {lang === "ar" ? "دعنا نُبهر العالم" : "Let's stun the world"}
              <span className="text-primary animate-pulse inline-block ml-2">.</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <Link
                to="/contact"
                className="group relative px-8 py-4 bg-foreground text-background rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.08)] active:scale-95"
              >
                <span className="relative z-10 font-black uppercase text-[11px] tracking-[0.22em]">
                  {t("nav.contact")}
                </span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              </Link>

              <div
                className="text-muted-foreground font-mono text-[9px] uppercase tracking-[0.22em] leading-relaxed border-l-2 border-border/50 rtl:border-l-0 rtl:border-r-2 pl-4 rtl:pr-4"
                aria-hidden="true"
              >
                // System_Status: Online <br />
                // Response_Time: {"<"}1hr
              </div>
            </div>
          </motion.div>

          <div className="xl:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-12 xl:pl-10 rtl:xl:pl-0 rtl:xl:pr-10">
            <motion.nav variants={itemVariants} className="space-y-8" aria-label="Footer Navigation">
              <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px] tracking-[0.5em] border-b border-border/30 pb-4">
                <Terminal size={14} /> // Root_Map
              </div>

              <div className="flex flex-col gap-5 text-left rtl:text-right">
                {[
                  { to: "/", label: t("nav.home") },
                  { to: "/about", label: t("nav.about") },
                  { to: "/services", label: t("nav.services") },
                  { to: "/profile", label: t("nav.profile") },
                  { to: "/contact", label: t("nav.contact") },
                ].map((link, i) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group flex items-center gap-4 text-xl md:text-2xl font-black text-foreground/40 hover:text-foreground transition-all duration-500"
                  >
                    <span className="text-[10px] font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300">
                      0{i + 1}
                    </span>
                    <span className="group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform uppercase tracking-tighter">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.nav>

            <motion.nav variants={itemVariants} className="space-y-8" aria-label="Social Media Links">
              <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px] tracking-[0.5em] border-b border-border/30 pb-4">
                <Share2 size={14} /> // Global_Sync
              </div>

              <div className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <MagneticSocial key={link.label} label={link.label} href={link.href} />
                ))}
              </div>
            </motion.nav>
          </div>
        </div>

        <div className="pt-8 border-t border-border/30">
          <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-8 items-end">
            <div className="space-y-4">
              {activeZone === null && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2"
                >
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary">
                    Global Visitor
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {visitorTimeZone}
                  </span>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-3">
                <TimeChip
                  label={lang === "ar" ? "القاهرة" : "Cairo"}
                  time={cairoTime || "Loading..."}
                  zone="Africa/Cairo"
                  active={activeZone === "cairo"}
                  icon={Clock}
                />

                <TimeChip
                  label={lang === "ar" ? "دبي" : "Dubai"}
                  time={dubaiTime || "Loading..."}
                  zone="Asia/Dubai"
                  active={activeZone === "dubai"}
                  icon={Globe}
                />

                <TimeChip
                  label={lang === "ar" ? "قطر" : "Qatar"}
                  time={qatarTime || "Loading..."}
                  zone="Asia/Qatar"
                  active={activeZone === "qatar"}
                  icon={Globe}
                />

                <div className="rounded-2xl border border-border/30 bg-foreground/5 p-4 backdrop-blur-md">
                  <div className="text-[9px] font-black uppercase tracking-[0.34em] text-primary">
                    Legal
                  </div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/80">
                    © {new Date().getFullYear()} Tungsten
                  </div>
                  <div className="mt-2 text-[8px] uppercase tracking-[0.25em] text-muted-foreground/70">
                    Brand ownership secured
                  </div>
                </div>

                <div className="rounded-2xl border border-border/30 bg-foreground/5 p-4 backdrop-blur-md">
                  <div className="text-[9px] font-black uppercase tracking-[0.34em] text-primary">
                    Status
                  </div>
                  <div className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    All Systems Op.
                  </div>
                  <div className="mt-2 text-[8px] uppercase tracking-[0.25em] text-muted-foreground/70">
                    Real-time synced
                  </div>
                </div>
              </div>
            </div>

            <motion.button
              variants={itemVariants}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Return to top of page"
              className="group flex items-center justify-between gap-6 rounded-[24px] border border-border/30 bg-foreground/5 px-5 py-5 backdrop-blur-md hover:border-primary/35 hover:bg-primary/5 transition-all duration-500"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">
                Return_To_Top
              </span>
              <div className="h-11 w-11 rounded-full border border-border/50 group-hover:border-primary flex items-center justify-center bg-background/50 backdrop-blur-md group-hover:bg-primary transition-all duration-500 shadow-sm group-hover:shadow-lg">
                <ArrowUp
                  size={15}
                  className="text-foreground group-hover:text-background group-hover:-translate-y-1 transition-transform duration-500"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;