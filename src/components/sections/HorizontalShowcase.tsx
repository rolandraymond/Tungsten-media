"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface CaseStudy {
  id: string;
  title: Record<string, string>;
  desc: Record<string, string>;
  image: string;
  color: string;
}

const cases: CaseStudy[] = [
  {
    id: "1",
    title: { en: "E-Commerce Revolution", ar: "ثورة التجارة الإلكترونية" },
    desc: {
      en: "We built a high-conversion scalable commerce system.",
      ar: "بناء نظام تجارة إلكترونية عالي التحويل وقابل للتوسع.",
    },
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070",
    color: "#fbbf24",
  },
  {
    id: "2",
    title: { en: "SaaS Growth Engine", ar: "محرك نمو SaaS" },
    desc: {
      en: "Scaling systems powered by deep analytics.",
      ar: "أنظمة نمو مدعومة بالتحليل العميق.",
    },
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
    color: "#3b82f6",
  },
  {
    id: "3",
    title: { en: "Brand Identity", ar: "الهوية البصرية" },
    desc: {
      en: "A futuristic identity crafted for impact.",
      ar: "هوية بصرية مستقبلية مصممة للتأثير.",
    },
    image:
      "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=2070",
    color: "#a855f7",
  },
];

export default function CinematicCases() {
  return (
    <section className="relative bg-black text-white">
      {cases.map((item, index) => (
        <Scene key={item.id} item={item} index={index} />
      ))}
    </section>
  );
}

// 🎬 Scene Component
function Scene({
  item,
  index,
}: {
  item: CaseStudy;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { lang } = useTranslation();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 🎯 animations
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const opacityText = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const yText = useTransform(scrollYProgress, [0.2, 0.5], [100, 0]);

  const smoothY = useSpring(yImage, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 🌌 Background Glow */}
      <motion.div
        className="absolute inset-0 blur-[120px] opacity-30"
        style={{ background: item.color }}
      />

      {/* 🖼 Image */}
      <motion.img
        src={item.image}
        alt=""
        style={
          prefersReducedMotion
            ? {}
            : {
                y: smoothY,
                scale: scaleImage,
              }
        }
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* ✍️ Content */}
      <motion.div
        style={
          prefersReducedMotion
            ? {}
            : {
                opacity: opacityText,
                y: yText,
              }
        }
        className="relative z-10 max-w-4xl px-6 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          {item.title[lang]}
        </h2>

        <p className="text-lg md:text-xl opacity-80 mb-10">
          {item.desc[lang]}
        </p>

        <button
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-black font-bold"
          style={{ background: item.color }}
        >
          Explore <ArrowUpRight />
        </button>
      </motion.div>

      {/* 🔢 Index */}
      <div className="absolute bottom-6 right-6 text-6xl font-black opacity-10">
        0{index + 1}
      </div>
    </section>
  );
}