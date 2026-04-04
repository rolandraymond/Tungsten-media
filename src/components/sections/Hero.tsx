import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/use-translation";
import { useLang } from "@/lib/context-language";
import MagneticButton from "@/components/ui/MagneticButton";
import { TrendingUp, BarChart3, Zap, ArrowUpRight, LucideIcon } from "lucide-react";

// ==========================================
// 1. TYPESCRIPT INTERFACES (Fixing the 'any' Error)
// ==========================================
interface FloatingOrbProps {
  delay: number;
  icon: LucideIcon;
  text: string;
  styleProps: React.CSSProperties;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

// ==========================================
// 2. SUB-COMPONENTS (MAGNETIC FLOATING ORBS)
// ==========================================
const FloatingMagneticOrb = ({ delay, icon: Icon, text, styleProps, mouseX, mouseY }: FloatingOrbProps) => {
  const springConfig = { stiffness: 60, damping: 20 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const x = useTransform(smoothMouseX, [0, 1], [-20, 20]);
  const y = useTransform(smoothMouseY, [0, 1], [-20, 20]);

  return (
    <motion.div
      className="absolute hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-background/40 backdrop-blur-xl border border-border/40 shadow-xl z-0"
      style={{ ...styleProps, x, y }}
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <Icon size={14} className="text-primary" />
      <span className="text-[10px] font-black tracking-widest text-foreground uppercase">{text}</span>
    </motion.div>
  );
};

// ==========================================
// 3. MAIN HERO COMPONENT
// ==========================================
const Hero = () => {
  const { t } = useTranslation();
  const { lang } = useLang();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax logic for scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleVisuals = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // FIX: Explicitly set type to <number> to fix TS2769 error
  const mouseX = useMotionValue<number>(0.5);
  const mouseY = useMotionValue<number>(0.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={ref} className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-background">
      
      {/* LAYER 1: Dynamic Grid Background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 z-0"
        style={{ 
          scale: scaleVisuals,
          backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 100%)'
        }}
      />

      {/* LAYER 2: Kinetic Floating Orbs */}
      <FloatingMagneticOrb delay={0} icon={TrendingUp} text="250% ROI" styleProps={{ top: "25%", left: "10%" }} mouseX={mouseX} mouseY={mouseY} />
      <FloatingMagneticOrb delay={1.5} icon={BarChart3} text="Scaling" styleProps={{ bottom: "30%", right: "8%" }} mouseX={mouseX} mouseY={mouseY} />
      <FloatingMagneticOrb delay={2.5} icon={Zap} text="Agile Tech" styleProps={{ top: "35%", right: "15%" }} mouseX={mouseX} mouseY={mouseY} />

      {/* LAYER 3: Dynamic Aurora Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-screen">
        <motion.div 
          className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[hsl(45,93%,40%)]/20 blur-[150px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Main Content Area */}
      <motion.div 
        style={{ opacity: opacityText, y: yText }} 
        className="container mx-auto px-4 sm:px-6 text-center relative z-10 w-full max-w-6xl"
      >
        {/* Top Badge with Spinner Glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-10 flex justify-center"
        >
          <div className="relative group overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full animate-[spin_4s_linear_infinite]" />
            <div className="relative px-6 py-2.5 bg-background rounded-full border border-primary/20 backdrop-blur-xl transition-all duration-300 group-hover:bg-background/10">
              <span className="text-[10px] md:text-xs font-black text-primary tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                Digital Marketing & Technology
              </span>
            </div>
          </div>
        </motion.div>

        {/* FIX: Typography Clipping Reveal 
          Added py-6 and -my-6 to allow Arabic fonts to bleed without getting chopped off.
          Removed conflicting Tailwind CSS (text-foreground vs text-transparent).
        */}
        <h1 className={`text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black mb-10 overflow-hidden py-6 -my-6 tracking-tighter ${lang === 'ar' ? 'leading-[1.3]' : 'leading-[1.1]'}`}>
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/60 drop-shadow-sm pb-4"
          >
            {t("hero.title")}
          </motion.div>
        </h1>

        <motion.p
          className={`text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16 font-medium px-4 ${lang === 'ar' ? 'leading-relaxed' : 'leading-relaxed tracking-wide'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Fluid Interaction CTA Group */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/60 to-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <MagneticButton onClick={() => navigate("/contact")}>
              <span className={`flex items-center gap-2.5 ${lang === 'ar' ? 'text-base font-bold' : 'text-sm font-black uppercase tracking-widest'}`}>
                {t("hero.cta")}
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </MagneticButton>
          </div>
          
          <button
            onClick={() => navigate("/services")}
            className="group relative overflow-hidden rounded-full border border-border/50 px-10 py-4 font-bold text-xs uppercase tracking-widest text-foreground transition-all duration-300 hover:border-primary hover:text-primary bg-background/50 backdrop-blur-md active:scale-95"
          >
            <span className="relative z-10">{t("hero.explore")}</span>
            <motion.div 
              className="absolute top-0 left-0 h-full w-[200%] bg-gradient-to-r from-transparent via-foreground/5 to-transparent -skew-x-12"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="h-10 w-5 rounded-full border-2 border-border flex items-start justify-center p-1 bg-background/20 backdrop-blur-sm">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(251,191,36,0.8)]"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;