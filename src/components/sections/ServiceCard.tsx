"use client";

import React, { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import {
  ArrowLeftRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Crown,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "ar" | "en";
type CategoryId = "center" | "company" | "doctor";
type TierId = "standard" | "premium" | "growth";

type Category = {
  id: CategoryId;
  icon: React.ComponentType<{ className?: string }>;
  labelEn: string;
  labelAr: string;
  subEn: string;
  subAr: string;
};

type Tier = {
  id: TierId;
  index: string;
  featured?: boolean;
  ctaEn: string;
  ctaAr: string;
};

const CATEGORIES: Category[] = [
  {
    id: "center",
    icon: Store,
    labelEn: "Centers",
    labelAr: "المراكز",
    subEn: "Accredited tier for clinics and medical centers",
    subAr: "مستوى معتمد للعيادات والمراكز الطبية",
  },
  {
    id: "company",
    icon: Building2,
    labelEn: "Companies",
    labelAr: "الشركات",
    subEn: "Structured tier for teams and businesses",
    subAr: "مستوى منظم للشركات والفرق",
  },
  {
    id: "doctor",
    icon: Stethoscope,
    labelEn: "Doctors",
    labelAr: "الأطباء",
    subEn: "Licensed tier for specialists and private practice",
    subAr: "مستوى مرخّص للأطباء والممارسات الفردية",
  },
];

const TIERS: Tier[] = [
  {
    id: "standard",
    index: "REF—01",
    ctaEn: "View details",
    ctaAr: "عرض التفاصيل",
  },
  {
    id: "premium",
    index: "REF—02",
    featured: true,
    ctaEn: "Open premium",
    ctaAr: "عرض البريميم",
  },
  {
    id: "growth",
    index: "REF—03",
    ctaEn: "Explore more",
    ctaAr: "استكشف أكثر",
  },
];

const IMAGE_RATIO_W = 717;
const IMAGE_RATIO_H = 882;

const BORDER_PATH =
  "M 88 24 H 912 C 951 24 976 49 976 88 V 912 C 976 951 951 976 912 976 H 88 C 49 976 24 951 24 912 V 88 C 24 49 49 24 88 24 Z";

function imagePath(category: CategoryId, tier: TierId, variant: "details" | "terms") {
  return `/img/pricing/${category}_${tier}_${variant}.jpg`;
}

function FloatingGlow() {
  return (
    <>
      <div className="pointer-events-none absolute -left-10 top-16 h-36 w-36 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-8 bottom-20 h-28 w-28 rounded-full bg-foreground/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
    </>
  );
}

function OrbitStroke({
  featured,
  uid,
  reducedMotion,
}: {
  featured?: boolean;
  uid: string;
  reducedMotion: boolean;
}) {
  const mainId = `${uid}-main`;
  const softId = `${uid}-soft`;

  return (
    <div className="pointer-events-none absolute inset-[-2px] z-20 overflow-visible">
      <motion.svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: 360,
                scale: [1, 1.01, 1],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                rotate: { duration: 18, repeat: Infinity, ease: "linear" },
                scale: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        <defs>
          <linearGradient id={mainId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="18%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="82%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={softId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--foreground))" stopOpacity={featured ? 0.22 : 0.12} />
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0" />
          </linearGradient>

          <filter id={`${uid}-glow`}>
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={BORDER_PATH}
          fill="none"
          stroke={`url(#${softId})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="38 18"
          animate={
            reducedMotion
              ? undefined
              : {
                  strokeDashoffset: [0, -420],
                  opacity: featured ? [0.5, 0.8, 0.5] : [0.35, 0.65, 0.35],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  strokeDashoffset: { duration: 9, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                }
          }
        />

        <motion.path
          d={BORDER_PATH}
          fill="none"
          stroke={`url(#${mainId})`}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="120 36"
          filter={`url(#${uid}-glow)`}
          animate={
            reducedMotion
              ? undefined
              : {
                  strokeDashoffset: [0, -980],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  strokeDashoffset: { duration: 10.5, repeat: Infinity, ease: "linear" },
                }
          }
        />
      </motion.svg>

      <motion.div
        className={cn(
          "absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full",
          featured ? "bg-primary shadow-[0_0_18px_hsl(var(--primary)/0.85)]" : "bg-foreground/70"
        )}
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, 2, 0],
                opacity: [0.7, 1, 0.7],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                y: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
              }
        }
      />
    </div>
  );
}

function CornerBrackets({ featured }: { featured?: boolean }) {
  const stroke = featured ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.32)";
  const size = 26;
  const w = 2.5;

  const Corner = ({ className, rotate }: { className: string; rotate: number }) => (
    <svg
      viewBox="0 0 30 30"
      className={cn("pointer-events-none absolute h-6 w-6 sm:h-7 sm:w-7", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d={`M 2 ${size} L 2 2 L ${size} 2`} fill="none" stroke={stroke} strokeWidth={w} strokeLinecap="square" />
    </svg>
  );

  return (
    <>
      <Corner className="left-3 top-3" rotate={0} />
      <Corner className="right-3 top-3" rotate={90} />
      <Corner className="bottom-3 right-3" rotate={180} />
      <Corner className="bottom-3 left-3" rotate={270} />
    </>
  );
}

function AccreditationSeal({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute -right-3 -top-3 z-30 h-[72px] w-[72px] sm:-right-4 sm:-top-4 sm:h-20 sm:w-20">
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={reducedMotion ? undefined : { duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id="seal-ring-path" d="M 50 8 A 42 42 0 1 1 49.99 8" fill="none" />
        </defs>
        <circle cx="50" cy="50" r="46" fill="hsl(var(--primary))" />
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="hsl(var(--background))"
          strokeWidth="1.5"
          strokeDasharray="2 3"
          opacity="0.5"
        />
        <text fontSize="7.2" fontWeight="800" letterSpacing="2.4" fill="hsl(var(--primary-foreground))">
          <textPath href="#seal-ring-path" startOffset="0%">
            ACCREDITED · TOP TIER · ACCREDITED ·
          </textPath>
        </text>
      </motion.svg>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={reducedMotion ? undefined : { scale: [1, 1.06, 1], rotate: [0, 6, 0] }}
        transition={reducedMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Crown className="h-7 w-7 text-primary-foreground drop-shadow-sm sm:h-8 sm:w-8" strokeWidth={2.25} />
      </motion.div>
    </div>
  );
}

function PackageCard({
  category,
  tier,
  isAr,
}: {
  category: Category;
  tier: Tier;
  isAr: boolean;
}) {
  const uid = useId();
  const reducedMotion = useReducedMotion();
  const [showTerms, setShowTerms] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const detailsImage = imagePath(category.id, tier.id, "details");
  const termsImage = imagePath(category.id, tier.id, "terms");

  const activeImage = showTerms ? termsImage : detailsImage;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={cn(
        "group relative mx-auto w-full max-w-[34rem]",
        tier.featured ? "lg:-mt-10 lg:scale-[1.035]" : "lg:mt-3"
      )}
    >
      <div
        className={cn(
          "absolute inset-x-6 -bottom-3 h-10 rounded-[2.5rem] blur-2xl transition-all duration-300",
          tier.featured ? "bg-primary/25" : "bg-foreground/10"
        )}
      />

      <motion.div
        className={cn(
          "relative overflow-hidden rounded-[1.95rem] border bg-card shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]",
          tier.featured ? "border-primary/40" : "border-border/60"
        )}
        whileHover={reducedMotion ? undefined : { scale: 1.01 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-[3px] rounded-[calc(1.95rem-3px)] border transition-colors duration-300",
            tier.featured ? "border-primary/25" : "border-border/40"
          )}
        />

        <FloatingGlow />
        <CornerBrackets featured={tier.featured} />
        <OrbitStroke featured={tier.featured} uid={uid} reducedMotion={!!reducedMotion} />
        {tier.featured && <AccreditationSeal reducedMotion={!!reducedMotion} />}

        <div className="relative z-10 flex min-h-[560px] flex-col sm:min-h-[600px]">
          <div className="flex items-start justify-between gap-3 border-b border-border/50 px-5 pb-4 pt-6 sm:px-7">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "font-mono text-[11px] font-bold tracking-[0.18em]",
                    tier.featured ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {tier.index}
                </span>
                <span className="h-3 w-px bg-border/70" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {isAr ? (showTerms ? "الشروط" : "التفاصيل") : showTerms ? "Terms" : "Details"}
                </span>
              </div>

              <h3 className="mt-2.5 text-lg font-black tracking-tight text-foreground sm:text-xl">
                {isAr ? category.labelAr : category.labelEn}
              </h3>

              <p className="mt-1 max-w-[30ch] text-[13px] leading-5 text-muted-foreground">
                {isAr ? category.subAr : category.subEn}
              </p>
            </div>

            {tier.featured ? (
              <span className="mt-1 inline-flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                {isAr ? "معتمد" : "Accredited"}
              </span>
            ) : null}
          </div>

          <div className="relative min-h-0 flex-1 p-5 sm:p-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={showTerms ? "terms" : "details"}
                initial={{ opacity: 0, x: isAr ? -18 : 18, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: isAr ? 18 : -18, scale: 0.985 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-foreground/[0.03]"
                style={{
                  aspectRatio: `${IMAGE_RATIO_W} / ${IMAGE_RATIO_H}`,
                }}
              >
                {!imageFailed ? (
                  <>
                    <motion.img
                      src={activeImage}
                      alt={`${category.labelEn} ${showTerms ? "terms" : "details"}`}
                      className="absolute inset-0 h-full w-full object-contain p-2 sm:p-3"
                      initial={false}
                      animate={reducedMotion ? undefined : { y: [0, -4, 0], scale: [1, 1.01, 1] }}
                      transition={
                        reducedMotion
                          ? undefined
                          : {
                              duration: 6.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                      }
                      onError={() => setImageFailed(true)}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/12 via-transparent to-transparent" />

                    <motion.div
                      className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground backdrop-blur-sm"
                      animate={reducedMotion ? undefined : { y: [0, -2, 0], opacity: [0.85, 1, 0.85] }}
                      transition={reducedMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      {isAr ? "عرض كامل" : "Full view"}
                    </motion.div>

                    <motion.div
                      className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/12 to-transparent"
                      animate={reducedMotion ? undefined : { opacity: [0.3, 0.7, 0.3] }}
                      transition={reducedMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-6">
                    <div className="max-w-xs text-center">
                      <BadgeCheck className="mx-auto h-10 w-10 text-primary" />
                      <h4 className="mt-4 text-sm font-bold text-foreground">
                        {isAr ? "الصورة غير متاحة" : "Preview unavailable"}
                      </h4>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        {isAr
                          ? "يمكنك استبدال المسار بصورة مناسبة داخل /img/pricing/."
                          : "Replace the asset path inside /img/pricing/ with the correct image."}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex-shrink-0 border-t border-border/50 p-5 sm:p-7">
            <motion.button
              type="button"
              onClick={() => {
                setShowTerms((v) => !v);
                setImageFailed(false);
              }}
              whileHover={reducedMotion ? undefined : { y: -1 }}
              whileTap={reducedMotion ? undefined : { scale: 0.985 }}
              className={cn(
                "group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl px-5 py-4 text-sm font-bold transition-all duration-300",
                tier.featured
                  ? "bg-primary text-primary-foreground shadow-[0_14px_30px_hsl(var(--primary)/0.32)] hover:shadow-[0_18px_36px_hsl(var(--primary)/0.4)]"
                  : "border border-border bg-transparent text-foreground hover:border-primary/40 hover:bg-primary/5"
              )}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
                animate={reducedMotion ? undefined : { x: ["-120%", "120%"], opacity: [0, 1, 0] }}
                transition={reducedMotion ? undefined : { duration: 1.8, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
              />

              {showTerms ? <ArrowLeftRight className="h-4 w-4" /> : <ScrollText className="h-4 w-4" />}

              {isAr
                ? showTerms
                  ? "العودة للتفاصيل"
                  : "عرض الشروط والأحكام"
                : showTerms
                  ? "Back to details"
                  : tier.ctaEn}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function ServiceCard() {
  const { lang } = useTranslation();
  const isAr = (lang as Lang) === "ar";
  const [activeCategory, setActiveCategory] = useState<CategoryId>("center");

  const activeData = useMemo(
    () => CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0],
    [activeCategory]
  );

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:56px_56px] text-foreground" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-foreground/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            className="inline-flex items-center gap-2.5 rounded-md border border-border/70 bg-card px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            {isAr ? "لوحة الباقات المعتمدة" : "Accredited package registry"}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ delay: 0.08 }}
            className="mt-5 text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            {isAr ? "باقات معتمدة، موضّحة بحركة فاخرة" : "Accredited tiers, revealed with premium motion"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ delay: 0.14 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
          >
            {isAr
              ? "كل كارت فيه استروك متحرك يلف حوالينه، مع تفاصيل دقيقة، انتقالات ناعمة، وصورة كاملة من غير قص."
              : "Each card carries a moving orbit stroke around it, refined details, smooth transitions, and a full image view without cropping."}
          </motion.p>
        </div>

        <div className="mx-auto mb-12 flex w-full max-w-2xl justify-center">
          <div className="grid w-full grid-cols-3 overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
            {CATEGORIES.map((category, i) => {
              const active = activeCategory === category.id;
              const Icon = category.icon;

              return (
                <motion.button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  className={cn(
                    "relative flex flex-col items-center gap-1.5 px-3 py-4 text-sm font-bold transition-colors duration-300",
                    i > 0 && "border-l border-border/70",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="active-category-underline"
                      className="absolute inset-x-0 bottom-0 h-[2.5px] bg-primary"
                      transition={{ type: "spring", stiffness: 280, damping: 26 }}
                    />
                  )}

                  <Icon className="h-4.5 w-4.5" />
                  <span className="text-[13px]">{isAr ? category.labelAr : category.labelEn}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid grid-cols-1 gap-10 lg:grid-cols-3 xl:gap-12"
          >
            {TIERS.map((tier) => (
              <motion.div
                key={`${activeCategory}-${tier.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 110, damping: 18 }}
              >
                <PackageCard category={activeData} tier={tier} isAr={isAr} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}