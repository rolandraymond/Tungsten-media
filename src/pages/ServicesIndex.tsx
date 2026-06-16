import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Code2,
  Palette,
  Share2,
  TrendingUp,
  Figma,
  ArrowUpRight,
  Sparkles,
  Layers3,
  Compass,
  CircleDashed,
  Wand2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { services } from "@/data/services-data";
import SpotlightCard from "@/components/ui/SpotlightCard";
import RevealText from "@/components/ui/RevealText";
import PageTransition from "@/components/effects/PageTransition";
import Seo from "@/hooks/use-seo";

const iconMap: Record<string, React.ElementType> = {
  Search,
  Code2,
  Code: Code2,
  Palette,
  Share2,
  TrendingUp,
  Figma,
};

type OrbitItem = {
  service: (typeof services)[number];
  angle: number;
  radius: number;
  size: number;
};

const ServicesIndex = () => {
  const { t, lang } = useTranslation();
  const reduceMotion = useReducedMotion() ?? false;

  const isArabic = lang === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const featuredServices = services.slice(0, 6);

  const orbitItems: OrbitItem[] = useMemo(() => {
    const count = Math.max(featuredServices.length, 1);
    return featuredServices.map((service, index) => {
      const angle = (360 / count) * index - 90;
      const radius = index % 2 === 0 ? 182 : 150;
      const size = index % 3 === 0 ? 120 : index % 3 === 1 ? 108 : 112;
      return { service, angle, radius, size };
    });
  }, [featuredServices]);

  return (
    <PageTransition>
      <Seo title={t("services.title")} description={t("services.subtitle")} />

      <div
        dir={dir}
        className="relative isolate min-h-screen overflow-hidden bg-background pt-24"
      >
        {/* atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_26%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_26%)]" />

          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? { opacity: 0.16 }
                : { y: [0, -18, 0], x: [0, 10, 0], opacity: [0.16, 0.26, 0.16] }
            }
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-28 right-[-8rem] h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-[130px]"
          />

          <motion.div
            aria-hidden="true"
            animate={
              reduceMotion
                ? { opacity: 0.1 }
                : { y: [0, 14, 0], x: [0, -12, 0], opacity: [0.08, 0.16, 0.08] }
            }
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-14rem] left-[-10rem] h-[36rem] w-[36rem] rounded-full bg-foreground/5 blur-[140px]"
          />

          <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:52px_52px] text-foreground" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          {/* hero */}
          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-card/30 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.14)] backdrop-blur-2xl sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-60" />

            <div className="relative grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
              <div className={isArabic ? "text-right" : "text-left"}>
                <motion.div
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className={`inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-primary backdrop-blur-xl ${
                    isArabic ? "flex-row-reverse" : ""
                  }`}
                >
                  <Sparkles size={13} />
                  <span>{isArabic ? "خدمات تتحرك كمنظومة" : "Services as a living system"}</span>
                </motion.div>

                <div className="mt-6 max-w-3xl">
                  <h1 className="text-4xl font-black leading-[0.9] tracking-[-0.08em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                    <RevealText className="block">{t("services.title")}</RevealText>
                    <span className="mt-4 block max-w-2xl text-base font-medium leading-7 tracking-normal text-muted-foreground sm:text-lg md:text-xl">
                      {t("services.subtitle")}
                    </span>
                  </h1>
                </div>

                <div
                  className={`mt-8 flex flex-wrap gap-3 ${
                    isArabic ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/55 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-xl">
                    <Compass size={14} className="text-primary" />
                    {isArabic ? "واجهة عربية / إنجليزية" : "Arabic / English interface"}
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/55 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-xl">
                    <Layers3 size={14} className="text-primary" />
                    {isArabic ? "Dark / Light جاهز" : "Dark / Light ready"}
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/55 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-xl">
                    <Wand2 size={14} className="text-primary" />
                    {isArabic ? "حركة سينمائية" : "Cinematic motion"}
                  </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.5rem] border border-border/50 bg-background/50 p-4 backdrop-blur-xl">
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                      {isArabic ? "الأسلوب" : "Style"}
                    </div>
                    <div className="mt-2 text-lg font-black text-foreground">
                      {isArabic ? "Premium" : "Premium"}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-border/50 bg-background/50 p-4 backdrop-blur-xl">
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                      {isArabic ? "البنية" : "Structure"}
                    </div>
                    <div className="mt-2 text-lg font-black text-foreground">
                      {isArabic ? "Adaptive" : "Adaptive"}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-border/50 bg-background/50 p-4 backdrop-blur-xl">
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                      {isArabic ? "الأثر" : "Impact"}
                    </div>
                    <div className="mt-2 text-lg font-black text-foreground">
                      {isArabic ? "High" : "High"}
                    </div>
                  </div>
                </div>

                <div className={`mt-8 flex flex-wrap items-center gap-3 ${isArabic ? "justify-end" : "justify-start"}`}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-black text-background transition-transform hover:scale-[1.02]"
                  >
                    {isArabic ? "ابدأ مشروعك" : "Start your project"}
                    <ArrowUpRight size={16} />
                  </Link>

                  <a
                    href="#services-grid"
                    className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/55 px-5 py-3 text-sm font-bold text-foreground backdrop-blur-xl transition-transform hover:scale-[1.02]"
                  >
                    {isArabic ? "استكشف الخدمات" : "Explore services"}
                    {isArabic ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                  </a>
                </div>
              </div>

              {/* orbit panel */}
              <div className="relative">
                <div className="absolute -inset-6 rounded-[2.5rem] bg-primary/10 blur-3xl" />
                <div className="relative mx-auto aspect-square w-full max-w-[560px]">
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-border/40"
                    animate={
                      reduceMotion
                        ? { opacity: 0.55 }
                        : { rotate: 360, opacity: [0.45, 0.65, 0.45] }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0.2 }
                        : { duration: 60, repeat: Infinity, ease: "linear" }
                    }
                  />

                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-8 rounded-full border border-dashed border-primary/20"
                    animate={reduceMotion ? { opacity: 0.5 } : { rotate: -360 }}
                    transition={
                      reduceMotion
                        ? { duration: 0.2 }
                        : { duration: 90, repeat: Infinity, ease: "linear" }
                    }
                  />

                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-20 rounded-full border border-border/30"
                    animate={reduceMotion ? { opacity: 0.5 } : { rotate: 360 }}
                    transition={
                      reduceMotion
                        ? { duration: 0.2 }
                        : { duration: 80, repeat: Infinity, ease: "linear" }
                    }
                  />

                  <div className="absolute left-1/2 top-1/2 flex h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border/50 bg-background/75 shadow-[0_25px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
                    <div className="absolute inset-[-18px] rounded-full bg-primary/10 blur-2xl" />
                    <div className="relative flex h-[124px] w-[124px] items-center justify-center rounded-full border border-primary/20 bg-background">
                      <div className="text-center">
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Sparkles size={20} />
                        </div>
                        <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
                          {isArabic ? "المنظومة" : "System"}
                        </div>
                        <div className="mt-1 text-lg font-black uppercase tracking-[-0.03em] text-foreground">
                          {services.length}
                        </div>
                      </div>
                    </div>
                  </div>

                  {orbitItems.map(({ service, angle, radius, size }, index) => {
                    const Icon = iconMap[service.icon] || Search;
                    const x = `calc(50% + ${Math.cos((angle * Math.PI) / 180) * radius}px)`;
                    const y = `calc(50% + ${Math.sin((angle * Math.PI) / 180) * radius}px)`;

                    return (
                      <motion.div
                        key={service.slug}
                        className="absolute left-1/2 top-1/2"
                        style={{
                          x,
                          y,
                          translateX: "-50%",
                          translateY: "-50%",
                        }}
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: 2 }}
                      >
                        <Link to={`/services/${service.slug}`} className="group block">
                          <div
                            className="relative rounded-[1.6rem] border border-border/50 bg-card/60 p-3 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-transform duration-300"
                            style={{ width: size }}
                          >
                            <div className="absolute inset-0 rounded-[1.6rem] bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative flex items-start gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-[9px] font-black uppercase tracking-[0.32em] text-muted-foreground">
                                  {isArabic ? "خدمة" : "Service"}
                                </div>
                                <div className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-foreground">
                                  {service.title[lang]}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* grid */}
          <section id="services-grid" className="py-10 sm:py-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div className={isArabic ? "text-right" : "text-left"}>
                <h2 className="text-2xl font-black tracking-[-0.05em] text-foreground sm:text-3xl">
                  {isArabic ? "استكشف الخدمات" : "Explore the services"}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  {isArabic
                    ? "كل بطاقة هنا لها شخصية مستقلة، لكنهم كلهم مربوطين بنفس النَفَس البصري."
                    : "Every card has its own identity, yet all of them share one visual pulse."}
                </p>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-border/50 bg-background/55 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur-xl md:inline-flex">
                {isArabic ? "اسحب لأسفل" : "Scroll down"}
                {isArabic ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, i) => {
                const Icon = iconMap[service.icon] || Search;

                return (
                  <motion.div
                    key={service.slug}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: 0.55, delay: i * 0.04 }}
                    className="h-full"
                  >
                    <Link to={`/services/${service.slug}`} className="block h-full">
                      <SpotlightCard className="group h-full overflow-hidden rounded-[2rem] border border-border/50 bg-card/35 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.10)] backdrop-blur-2xl transition-transform duration-300 hover:-translate-y-1">
                        <div
                          className={`flex h-full flex-col gap-5 ${
                            isArabic ? "text-right" : "text-left"
                          }`}
                        >
                          <div
                            className={`flex items-start gap-4 ${
                              isArabic ? "flex-row-reverse" : ""
                            }`}
                          >
                            <div className="relative">
                              <div className="absolute -inset-3 rounded-[1.5rem] bg-primary/10 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border/50 bg-background/70 text-primary">
                                <Icon className="h-7 w-7" />
                              </div>
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
                                {isArabic ? "خدمة" : "Service"}
                              </div>
                              <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-foreground">
                                {service.title[lang]}
                              </h3>
                            </div>
                          </div>

                          <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
                            {service.description[lang]}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {service.features[lang].slice(0, 4).map((f) => (
                              <span
                                key={f}
                                className="rounded-full border border-border/50 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                              >
                                {f}
                              </span>
                            ))}
                          </div>

                          <div
                            className={`mt-auto flex items-center pt-2 ${
                              isArabic ? "justify-end" : "justify-start"
                            }`}
                          >
                            <span
                              className={`inline-flex items-center gap-2 text-sm font-bold text-primary ${
                                isArabic ? "flex-row-reverse" : ""
                              }`}
                            >
                              {isArabic ? "اعرف المزيد" : "Learn more"}
                              <ArrowUpRight size={15} />
                            </span>
                          </div>
                        </div>
                      </SpotlightCard>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* footer strip */}
          <section className="pb-8">
            <div className="rounded-[2rem] border border-border/50 bg-card/30 p-6 backdrop-blur-2xl">
              <div
                className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
                  isArabic ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className={isArabic ? "text-right" : "text-left"}>
                  <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground">
                    {isArabic ? "الخلاصة" : "Summary"}
                  </div>
                  <h3 className="mt-2 text-xl font-black text-foreground">
                    {isArabic
                      ? "صفحة خدمات ليست قائمة... بل مشهد متحرك."
                      : "Not a services list... a moving scene."}
                  </h3>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-black text-background transition-transform hover:scale-[1.02]"
                >
                  {isArabic ? "ابدأ مشروعك" : "Start your project"}
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default ServicesIndex;