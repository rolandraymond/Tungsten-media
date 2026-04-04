"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  MotionValue,
  useMotionValueEvent,
  transform,
} from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowUpRight, Crosshair, BarChart } from "lucide-react";

interface CaseStudy {
  id: string;
  title: Record<string, string>;
  desc: Record<string, string>;
  category: string;
  image: string;
  stats: string;
  color: string;
  techCode: string;
}

interface CaseCardProps {
  item: CaseStudy;
  index: number;
  total: number;
  lang: string;
  progress: MotionValue<number>;
  isMobile: boolean;
}

const cases: CaseStudy[] = [
  {
    id: "CS-01",
    title: { en: "E-Commerce Revolution", ar: "ثورة التجارة الإلكترونية" },
    desc: {
      en: "Architecting a seamless, high-conversion headless commerce experience.",
      ar: "هندسة تجربة تسوق إلكتروني سلسة وعالية التحويل تعتمد على البنية المنفصلة.",
    },
    category: "Development",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    stats: "+340% ROI",
    color: "#fbbf24",
    techCode: "ECOM_REV_v9.1",
  },
  {
    id: "CS-02",
    title: { en: "SaaS Growth Engine", ar: "محرك نمو البرمجيات" },
    desc: {
      en: "Scaling organic acquisition through deep technical SEO & data funnels.",
      ar: "توسيع نطاق الاستحواذ العضوي عبر تحسين محركات البحث التقني ومسارات البيانات.",
    },
    category: "Marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    stats: "10X TRAFFIC",
    color: "#3b82f6",
    techCode: "SAAS_GRW_x10",
  },
  {
    id: "CS-03",
    title: { en: "Brand Identity", ar: "الهوية البصرية" },
    desc: {
      en: "Forging a bold, futuristic visual language for a fintech disruptor.",
      ar: "صياغة لغة بصرية جريئة ومستقبلية لشركة تقنية مالية صاعدة.",
    },
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=2070&auto=format&fit=crop",
    stats: "REBRAND",
    color: "#a855f7",
    techCode: "V_ID_FINTECH",
  },
  {
    id: "CS-04",
    title: { en: "Social Domination", ar: "السيطرة الاجتماعية" },
    desc: {
      en: "Viral algorithm manipulation resulting in unprecedented brand reach.",
      ar: "هندسة خوارزميات الانتشار الفيروسي لتحقيق وصول غير مسبوق للعلامة التجارية.",
    },
    category: "Social Media",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    stats: "5M+ IMPR",
    color: "#ec4899",
    techCode: "SOC_DOM_5M",
  },
];

const HorizontalShowcase = () => {
  const { lang } = useTranslation();
  const isAr = lang === "ar";
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [dims, setDims] = useState({ cardW: 35, gapW: 3 });

  useEffect(() => {
    setDims({
      cardW: isMobile ? 34 : 35,
      gapW: isMobile ? 1 : 3,
    });
  }, [isMobile]);

  const totalTrackW = cases.length * dims.cardW + (cases.length - 1) * dims.gapW;
  const centerOffset = totalTrackW / 2 - dims.cardW / 2;

  // زيادة مسافة السكرول بحيث كل الكروت تبان للنهاية
  const sectionHeight = `${Math.max(420, Math.round(totalTrackW * (isMobile ? 7.5 : 8.5)))}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(
      Math.max(Math.round(latest * (cases.length - 1)), 0),
      cases.length - 1
    );
    setActiveIndex(newIndex);
  });

  const percentString = useTransform(scrollYProgress, (v) => {
    if (v >= 0.99) return "100%";
    return `${Math.round(v * 100)}%`;
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 50, damping: 20 });
  const skewVelocity = useTransform(smoothVelocity, [-1, 1], [-5, 5]);

  const progressPoints = cases.map((_, i) => i / (cases.length - 1));
  const colorsArray = cases.map((c) => c.color);
  const ambientColor = useTransform(scrollYProgress, progressPoints, colorsArray);
  const ambientBackground = useTransform(
    ambientColor,
    (color) => `radial-gradient(circle at 50% 50%, ${color}15 0%, transparent 60%)`
  );

  const xLTR = useTransform(
    scrollYProgress,
    [0, 1],
    [`${centerOffset}vw`, `-${centerOffset}vw`]
  );
  const xRTL = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${centerOffset}vw`, `${centerOffset}vw`]
  );
  const x = isAr ? xRTL : xLTR;

  const titleX = useTransform(
    scrollYProgress,
    [0, 1],
    [isAr ? "-20%" : "20%", isAr ? "20%" : "-20%"]
  );

  const progressBarHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const activeCase = cases[activeIndex];

  return (
    <section
      ref={containerRef}
      style={{ height: sectionHeight }}
      className="relative bg-background"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <motion.div
          style={{ background: ambientBackground }}
          className="absolute inset-0 pointer-events-none transition-colors duration-500 z-0"
        />

        <div className="absolute top-[40%] left-0 w-full -translate-y-1/2 pointer-events-none opacity-[0.03] dark:opacity-[0.02] select-none z-0">
          <motion.h2
            style={{ x: titleX, skewX: skewVelocity }}
            className="text-[28vw] md:text-[20vw] font-black uppercase whitespace-nowrap text-foreground tracking-tighter"
          >
            {isAr ? "مشاريع تنجستن المختارة" : "TUNGSTEN ARCHIVE"}
          </motion.h2>
        </div>

        <div className="absolute top-8 left-6 right-6 md:hidden flex justify-between items-center z-30 pointer-events-none">
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeCase.color }}
            />
            <span className="font-mono text-xs tracking-widest text-foreground">
              {activeCase.techCode}
            </span>
          </div>
          <div className="font-mono text-xs font-bold bg-background/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            {activeIndex + 1} / {cases.length}
          </div>
        </div>

        <div className="absolute inset-x-8 inset-y-10 pointer-events-none z-30 hidden md:flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <Crosshair size={18} className="text-primary animate-spin-slow" />
                <span className="font-mono text-xs tracking-[0.4em] uppercase">
                  Target_Lock: {activeCase.techCode}
                </span>
              </motion.div>

              <h2 className="text-6xl font-black uppercase tracking-tighter mt-4 max-w-xl leading-none">
                {isAr ? "المشاريع" : "CASE STUDIES"}
                <span className="text-primary">.</span>
              </h2>
            </div>

            <div className="text-right flex flex-col items-end gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Index // {(activeIndex + 1).toString().padStart(2, "0")}
              </span>
              <div className="flex gap-1 mt-2">
                {cases.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 transition-all duration-500 ${
                      i === activeIndex ? "w-8 bg-primary" : "w-2 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <motion.div
              key={`hud-left-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-1 font-mono text-[10px] tracking-[0.3em] uppercase opacity-50"
            >
              <span>Cat: {activeCase.category}</span>
              <span>Metric: {activeCase.stats}</span>
            </motion.div>

            <div className="flex items-center gap-4">
              <div className="text-right font-mono">
                <div className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                  Global_Scroll
                </div>
                <motion.div className="text-sm text-primary font-bold">
                  {percentString}
                </motion.div>
              </div>
              <div className="h-12 w-[2px] bg-border relative overflow-hidden">
                <motion.div
                  className="absolute top-0 w-full bg-primary"
                  style={{ height: progressBarHeight }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full h-[64vh] md:h-[70vh] flex items-center mt-12 md:mt-0">
          <motion.div
            style={{ x }}
            className="flex items-center gap-[1vw] md:gap-[3vw] absolute left-1/2 -translate-x-1/2"
            dir={isAr ? "rtl" : "ltr"}
          >
            {cases.map((c, i) => (
              <QuantumCard
                key={c.id}
                item={c}
                index={i}
                total={cases.length}
                lang={lang}
                isMobile={isMobile}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const QuantumCard = ({
  item,
  index,
  total,
  lang,
  progress,
  isMobile,
}: CaseCardProps) => {
  const isAr = lang === "ar";

  const centerPoint = index / (total - 1);
  const range = 0.35;
  const input = [centerPoint - range, centerPoint, centerPoint + range];

  const scaleMax = isMobile ? 1.03 : 1.1;
  const scaleMin = isMobile ? 0.92 : 0.75;
  const yOffset = isMobile ? 22 : 100;
  const rotVal = isMobile ? 7 : 25;

  const scale = useTransform(progress, (p) =>
    transform(p, input, [scaleMin, scaleMax, scaleMin])
  );
  const opacity = useTransform(progress, (p) =>
    transform(p, input, [0.4, 1, 0.4])
  );
  const y = useTransform(progress, (p) =>
    transform(p, input, [yOffset, 0, yOffset])
  );

  const rotateY = useTransform(progress, (p) =>
    transform(p, input, isAr ? [-rotVal, 0, rotVal] : [rotVal, 0, -rotVal])
  );
  const rotateZ = useTransform(progress, (p) =>
    transform(p, input, isAr ? [-3, 0, 3] : [5, 0, -5])
  );

  const imgScale = useTransform(progress, (p) =>
    transform(p, input, [1, 1.06, 1])
  );
  const imgFilter = useTransform(progress, (p) =>
    transform(p, input, [
      "grayscale(100%) blur(4px)",
      "grayscale(0%) blur(0px)",
      "grayscale(100%) blur(4px)",
    ])
  );

  return (
    <motion.div
      style={{ scale, opacity, y, rotateY, rotateZ, perspective: "1200px" }}
      className="relative flex-shrink-0 w-[34vw] sm:w-[34vw] md:w-[35vw] aspect-[3/4] md:aspect-[4/5] max-h-[80vh] group cursor-pointer"
    >
      <div
        className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-card/10 border border-white/10 dark:border-white/5 backdrop-blur-md shadow-2xl transition-all duration-700"
        style={{ boxShadow: `0 30px 60px -20px ${item.color}30` }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: imgScale, filter: imgFilter }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
          <img
            src={item.image}
            alt={item.title[lang]}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 flex justify-between items-start z-20">
          <div className="flex items-center gap-2 px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-full bg-background/60 backdrop-blur-xl border border-white/10">
            <div
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[7px] md:text-[9px] font-mono font-bold uppercase tracking-widest text-foreground">
              {item.category}
            </span>
          </div>
          <div className="hidden md:flex h-10 w-10 rounded-full border border-white/10 items-center justify-center backdrop-blur-xl bg-background/30 group-hover:bg-primary/20 transition-colors duration-500">
            <BarChart size={16} className="text-white" />
          </div>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 p-4 md:p-12 z-20 ${
            isAr ? "text-right" : "text-left"
          }`}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="overflow-hidden mb-3 md:mb-6"
          >
            <div
              className="px-3 py-1.5 md:px-4 md:py-2 text-[9px] md:text-xs font-black uppercase tracking-[0.2em] w-fit mb-2 md:mb-4 rounded-lg md:rounded-xl border border-white/10 backdrop-blur-md"
              style={{ color: item.color, backgroundColor: `${item.color}15` }}
            >
              {item.stats}
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-[1.05] mb-2 md:mb-4">
              {item.title[lang]}
            </h3>

            <p className="text-white/80 text-[10px] sm:text-xs md:text-sm lg:text-base font-light leading-relaxed max-w-[95%] md:max-w-[90%] rtl:font-cairo line-clamp-3 md:line-clamp-none">
              {item.desc[lang]}
            </p>
          </motion.div>
        </div>

        <div
          className={`absolute bottom-4 md:bottom-10 ${
            isAr ? "left-4 md:left-10" : "right-4 md:right-10"
          } z-30 max-md:opacity-100 max-md:scale-90 md:opacity-0 md:group-hover:opacity-100 md:scale-75 md:group-hover:scale-100 transition-all duration-500 delay-100`}
        >
          <div
            className="h-10 w-10 md:h-16 md:w-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            style={{ backgroundColor: item.color }}
          >
            <ArrowUpRight
              size={18}
              className={`text-black md:w-[28px] md:h-[28px] ${
                isAr ? "rotate-[-90deg]" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HorizontalShowcase;