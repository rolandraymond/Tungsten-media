"use client";

import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Code,
  Compass,
  Figma,
  Globe2,
  LayoutGrid,
  Palette,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { services } from "@/data/services-data";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import PageTransition from "@/components/effects/PageTransition";
import Seo from "@/hooks/use-seo";

const iconMap: Record<string, React.ElementType> = {
  Search,
  Code,
  Palette,
  Share2,
  TrendingUp,
  Figma,
};

type Locale = "ar" | "en";

const copy = {
  ar: {
    back: "العودة للخدمات",
    cta: "ابدأ مشروعك",
    badge: "خدمة احترافية",
    premium: "Premium Service Detail",
    showcase: "نظرة تنفيذية",
    deliverables: "ما ستحصل عليه",
    process: "طريقة التنفيذ",
    fit: "مناسب لـ",
    highlight: "لماذا هذه الخدمة مختلفة",
    response: "تصميم مرن ومهيأ للقراءة على كل الشاشات",
    quickFacts: ["استراتيجية", "تنفيذ", "قياس", "تحسين مستمر"],
    processSteps: [
      "فهم الهدف التجاري وموقع العلامة.",
      "تحديد الخطة الإبداعية ومسار التنفيذ.",
      "إطلاق العمل مع تحسينات مبنية على الأداء.",
    ],
    idealFor: [
      "براندات تريد حضورًا أوضح.",
      "شركات تحتاج مخرجات تسويقية قابلة للقياس.",
      "مشاريع تبحث عن مظهر احترافي من أول تواصل.",
    ],
    benefits: [
      "هوية بصرية أقوى وأكثر اتساقًا.",
      "رسائل تسويقية أوضح وأكثر تأثيرًا.",
      "قرارات مبنية على بيانات وليست افتراضات.",
      "تجربة تنفيذ منظمة وسريعة.",
    ],
  },
  en: {
    back: "Back to services",
    cta: "Start your project",
    badge: "Premium service",
    premium: "Premium Service Detail",
    showcase: "Execution preview",
    deliverables: "Deliverables",
    process: "How it works",
    fit: "Best for",
    highlight: "Why this service stands out",
    response: "Responsive design built for every screen size",
    quickFacts: ["Strategy", "Execution", "Measurement", "Optimization"],
    processSteps: [
      "Understand the business goal and brand position.",
      "Define the creative direction and execution path.",
      "Launch, measure, and improve continuously.",
    ],
    idealFor: [
      "Brands that need stronger presence.",
      "Teams looking for measurable marketing output.",
      "Projects that need a polished first impression.",
    ],
    benefits: [
      "Sharper and more consistent brand presence.",
      "Clearer marketing messages with stronger impact.",
      "Decisions driven by data, not assumptions.",
      "A clean, structured, fast-moving process.",
    ],
  },
} as const;

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useTranslation();
  const navigate = useNavigate();

  const locale = (lang === "ar" ? "ar" : "en") as Locale;
  const isRtl = locale === "ar";
  const txt = copy[locale];

  const service = useMemo(() => services.find((s) => s.slug === slug), [slug]);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = iconMap[service.icon] || Search;
  const title = service.title[lang];
  const description = service.description[lang];
  const features = service.features[lang] as readonly string[];

  return (
    <PageTransition>
      <Seo title={title} description={description} />

      <div dir={isRtl ? "rtl" : "ltr"} className="relative min-h-screen overflow-hidden bg-background pt-24 text-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--primary-rgb),0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(var(--primary-rgb),0.10),transparent_24%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <section className="relative py-14 md:py-20 lg:py-24">
          <div className="container mx-auto max-w-7xl px-6">
            <Link
              to="/services"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft size={16} className={isRtl ? "rotate-180" : ""} />
              {t("service.back")}
            </Link>

            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/80 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.10)] backdrop-blur-2xl md:p-8"
                >
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

                  <div className="relative flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      {txt.badge}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {txt.premium}
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-5">
                    <motion.div
                      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] border border-primary/15 bg-primary/10 shadow-sm"
                      initial={{ scale: 0.7, rotate: -8 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 180, damping: 16 }}
                    >
                      <Icon className="h-10 w-10 text-primary" />
                    </motion.div>

                    <div className="min-w-0 flex-1">
                      <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                        <RevealText className="block text-foreground">{title}</RevealText>
                      </h1>
                      <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                        {description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {txt.quickFacts.map((item) => (
                      <div key={item} className="rounded-2xl border border-border bg-background px-4 py-3 shadow-sm">
                        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Tungsten</div>
                        <div className="mt-2 text-sm font-semibold">{item}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <MagneticButton onClick={() => navigate("/contact")}>
                      <span className="inline-flex items-center gap-2">
                        {txt.cta}
                        <ArrowUpRight size={16} />
                      </span>
                    </MagneticButton>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      {txt.response}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.65 }}
                  className="mt-6 grid gap-4 sm:grid-cols-2"
                >
                  <MiniPanel icon={Compass} title={txt.process} items={txt.processSteps} rtl={isRtl} />
                  <MiniPanel icon={Globe2} title={txt.fit} items={txt.idealFor} rtl={isRtl} />
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.7 }}
                >
                  <div className="relative aspect-[16/10] border-b border-border bg-gradient-to-br from-primary/15 via-background to-primary/5 p-6 md:p-8">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.14),transparent_30%)]" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground backdrop-blur">
                          <Sparkles className="h-3.5 w-3.5 text-primary" />
                          {txt.showcase}
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                          <TrendingUp className="h-3.5 w-3.5" />
                          UX / UI
                        </div>
                      </div>

                      <div className="mt-10 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl border border-border bg-card/90 p-4 shadow-sm backdrop-blur">
                          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                            <Zap className="h-4 w-4 text-primary" />
                            Strategy
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[82%] rounded-full bg-primary" />
                          </div>
                          <p className="mt-3 text-xs leading-5 text-muted-foreground">
                            {features[0] ?? description}
                          </p>
                        </div>

                        <div className="rounded-3xl border border-border bg-card/90 p-4 shadow-sm backdrop-blur">
                          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                            <LayoutGrid className="h-4 w-4 text-primary" />
                            Delivery
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {features.slice(1, 5).map((feature) => (
                              <div key={feature} className="rounded-2xl border border-border bg-background px-3 py-2 text-[11px] leading-4 text-muted-foreground">
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="rounded-[2rem] border border-border bg-background p-6 shadow-[0_20px_80px_rgba(0,0,0,0.06)] md:p-8"
                >
                  <h3 className="text-xl font-bold text-foreground">{txt.deliverables}</h3>
                  <div className="mt-5 space-y-3">
                    {features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
                        initial={{ opacity: 0, x: isRtl ? -18 : 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.22 + i * 0.06, duration: 0.5 }}
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-foreground">{feature}</div>
                          <div className="mt-1 text-xs leading-5 text-muted-foreground">
                            {locale === "ar"
                              ? "جزء من تسليم منظم يوازن بين الجودة والسرعة والوضوح."
                              : "Part of a structured delivery that balances quality, speed, and clarity."}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {txt.benefits.map((item, i) => (
                <motion.div
                  key={item}
                  className="rounded-[1.6rem] border border-border bg-card p-5 shadow-sm"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.55 }}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {i + 1}
                    </span>
                    {txt.highlight}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

function MiniPanel({
  icon: Icon,
  title,
  items,
  rtl,
}: {
  icon: React.ElementType;
  title: string;
  items: readonly string[];
  rtl: boolean;
}) {
  return (
    <div className="rounded-[1.75rem] border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-base font-bold">{title}</h3>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className={`flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-3 ${rtl ? "text-right" : "text-left"}`}
          >
            <div className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
            <p className="text-sm leading-6 text-muted-foreground">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceDetail;
