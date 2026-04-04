import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/context-language";

// ==========================================
// 1. DYNAMIC BILINGUAL SLOGANS (Replace with your own)
// ==========================================
const slogans = {
  ar: [
    "الابتكار هو هويتنا", "نصنع المستقبل الرقمي", "الإبداع بلا حدود", "تكنولوجيا تسبق العصر",
    "تصميم استراتيجي فخم", "نتائج ملموسة بالمللي", "حلول سيبرانية متكاملة", "الابتكار هو هويتنا",
  ],
  en: [
    "Innovation is our DNA", "Engineering Digital Futures", "Unleashing Creativity", "Future-Proof Technology",
    "Strategic Design Excellence", "Tangible Results (ROI)", "Next-Gen Solutions", "Innovation is our DNA",
  ],
};

const KineticMarquee3D = () => {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 2. تتبع السكرول عشان نعمل تأثير "العصر" (Twist)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Trigger across the whole view
  });

  // Smoothing the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 300
  });

  // 3. THE MAGIC: Transform scroll into 3D Twist
  const skewX = useTransform(smoothProgress, [0, 1], [-20, 20]); // الميل الأفقي
  const skewY = useTransform(smoothProgress, [0, 1], [-5, 5]); // الميل الرأسي
  const rotateY = useTransform(smoothProgress, [0, 1], [-15, 15]); // الدوران الـ 3D
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.1]); // التكبير الخفيف
  
  // Speed factor for the automatic rotation (speeds up slightly on scroll)
  const speedFactor = useTransform(smoothProgress, [0, 1], [1, 2]);

  const currentSlogans = [...slogans[lang], ...slogans[lang]];

  return (
    <section 
      ref={containerRef} 
      className="relative py-28 bg-background overflow-hidden border-y border-white/5 perspective-[800px]"
    >
      {/* Side Masks for that cinematic fade out */}
      <div className="absolute left-0 top-0 bottom-0 w-40 z-20 bg-gradient-to-r from-background via-background/90 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 z-20 bg-gradient-to-l from-background via-background/90 to-transparent pointer-events-none" />

      {/* ========================================== */}
      {/* THE KINETIC 3D RIBBON                    */}
      {/* ========================================== */}
      <motion.div
        style={{ skewX, skewY, rotateY, scale, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full flex items-center justify-center will-change-transform"
      >
        <motion.div
          className="flex whitespace-nowrap gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30, // Base duration
              ease: "linear",
            },
          }}
        >
          {currentSlogans.map((slogan, i) => (
            <motion.div
              key={i}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(251, 191, 36, 0.1)",
                borderColor: "rgba(251, 191, 36, 0.5)"
              }}
              className="group relative px-10 py-5 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-xl flex items-center justify-center transition-all duration-500 shadow-2xl"
              style={{ translateZ: i % 2 === 0 ? 50 : 0 }} // بيدي عمق 3D بين الكلمات
            >
              {/* Neon Glow under the text */}
              <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <span 
                className={`relative z-10 text-2xl md:text-3xl font-black transition-colors duration-500 uppercase select-none ${lang === 'ar' ? 'leading-tight' : 'leading-[1.1] tracking-[0.3em]'}`}
                style={{ 
                  color: "rgba(var(--foreground-rgb), 0.2)",
                  WebkitTextStroke: i % 3 === 0 ? '1px var(--foreground)' : 'none',
                  opacity: i % 3 === 0 ? 0.3 : 1
                }}
              >
                {/* Hollow Text on some items for variety */}
                {slogan}
              </span>

              {/* Decorative Corner Indicatior */}
              <div className="absolute bottom-3 right-5 w-10 h-[2px] bg-white/10 group-hover:bg-primary group-hover:shadow-[0_0_10px_var(--primary)] transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Huge Background Watermark (Adds massive scale) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.h3 
          // تم تعديل الكلاسات هنا:
          // موبايل: text-7xl وتضييق الحروف (tracking-tight)
          // لابتوب (lg): تكبير مناسب (text-[12rem]) وإلغاء الارتفاع الزائد (leading-none)
          className="text-7xl lg:text-[12rem] font-black opacity-[0.03] uppercase tracking-tight lg:tracking-tighter select-none text-foreground leading-none"
          // تقليل سمك الـ Stroke لـ 1px ليكون أنعم ولا يسبب زحمة بصرية
          style={{ WebkitTextStroke: '1px var(--primary)' }}
        >
          {lang === 'ar' ? 'إبداع' : 'IDEAS'}
        </motion.h3>
      </div>

    </section>
  );
};

export default KineticMarquee3D;