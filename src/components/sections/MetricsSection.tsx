import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { useLang } from "@/lib/context-language";

// 1. تعريف الأنواع لضمان نظافة الكود (TypeScript Interfaces)
interface MetricItem {
  key: string;
  value: number;
  suffix: string;
}

interface MetricCardProps {
  metric: MetricItem;
  index: number;
  t: (key: string) => string;
  lang: string;
}

// 2. مكون العداد - يعيد العد في كل مرة يظهر فيها
const Counter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    } else {
      motionValue.set(0); 
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString();
      }
    });
  }, [springValue]);

  return <span ref={ref} className="tabular-nums">0</span>;
};

// 3. كارت الإحصائيات (تم استبدال any بالنوع الصحيح)
const MetricCard = ({ metric, index, t, lang }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="relative group p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-0 group-hover:opacity-100" />

      <div className="relative z-10 text-center">
        <div className="text-5xl md:text-7xl font-black text-foreground mb-4 flex items-center justify-center gap-1">
          <Counter value={metric.value} />
          <span className="text-primary text-2xl md:text-4xl font-bold">{metric.suffix}</span>
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-4 bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:animate-ping" />
          <div className="h-[1px] w-4 bg-primary/30" />
        </div>
        
        <p className={`text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors duration-300 ${lang === 'ar' ? 'font-bold' : ''}`}>
          {t(metric.key)}
        </p>
      </div>

      <div className="absolute bottom-4 right-6 text-[8px] font-mono text-white/10 group-hover:text-white/30 transition-colors uppercase">
        Data_Stream_{index + 1}
      </div>
    </motion.div>
  );
};

// 4. السكشن الأساسي (بدون الكلمة الخلفية)
const metrics: MetricItem[] = [
  { key: "metrics.roi", value: 340, suffix: "%" },
  { key: "metrics.projects", value: 200, suffix: "+" },
  { key: "metrics.clients", value: 85, suffix: "+" },
  { key: "metrics.years", value: 8, suffix: "+" },
];

const MetricsSection = () => {
  const { t } = useTranslation();
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-32 bg-background relative overflow-hidden border-y border-white/5 text-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {metrics.map((m, i) => (
            <MetricCard key={m.key} metric={m} index={i} t={t} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;