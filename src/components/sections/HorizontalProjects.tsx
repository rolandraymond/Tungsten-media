import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/context-language";
import { ArrowUpRight, LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// تعريف الأنواع لضمان عدم وجود أخطاء TypeScript
interface Project {
  id: string;
  megaTextEn: string;
  megaTextAr: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  img: string;
}

const projects: Project[] = [
  { id: "01", megaTextEn: "CYBER", megaTextAr: "سيبراني", titleEn: "Cybernetic UI", titleAr: "واجهات سيبرانية", categoryEn: "Web Design", categoryAr: "تصميم مواقع", img: "/img/p1.png" },
  { id: "02", megaTextEn: "NEON", megaTextAr: "نيون", titleEn: "Neon Marketing", titleAr: "تسويق نيون", categoryEn: "Digital Campaign", categoryAr: "حملة رقمية", img: "/img/p2.png" },
  { id: "03", megaTextEn: "HOLO", megaTextAr: "هولو", titleEn: "Hologram Brand", titleAr: "هوية هولوجرام", categoryEn: "Branding", categoryAr: "هوية بصرية", img: "/img/p3.png" },
  { id: "04", megaTextEn: "CORE", megaTextAr: "تنجستن", titleEn: "Tungsten Engine", titleAr: "محرك تنجستن", categoryEn: "Development", categoryAr: "برمجة", img: "/img/p4.png" },
];

const HorizontalProjects = () => {
  const { lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wrapper = scrollWrapperRef.current;
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    const isRTL = lang === "ar";
    const amount = wrapper.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // التحريك العرضي الأساسي مع إضافة خاصية skewVelocity
      const scrollTween = gsap.to(wrapper, {
        x: isRTL ? amount : -amount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${amount}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          // إبداع: تحديث الميلان بناءً على سرعة التمرير
          onUpdate: (self) => {
            const skew = self.getVelocity() / 200;
            gsap.to(wrapper, { skewX: isRTL ? -skew : skew, overwrite: true, duration: 0.5 });
          }
        },
      });

      // بارالاكس النصوص العملاقة (Mega Text)
      gsap.utils.toArray<HTMLElement>(".mega-text").forEach((text) => {
        gsap.to(text, {
          x: isRTL ? -120 : 120,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: text.parentElement,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });

      // بارالاكس وتكبير الصور (Project Images)
      gsap.utils.toArray<HTMLElement>(".project-image").forEach((img) => {
        gsap.fromTo(img, 
          { xPercent: isRTL ? -20 : 20, scale: 1.2 },
          { 
            xPercent: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            }
          }
        );
      });

      // تأثير الـ Spotlight (تغميق الكروت البعيدة)
      gsap.utils.toArray<HTMLElement>(".project-card-wrapper").forEach((card) => {
        gsap.fromTo(card, 
          { filter: "brightness(0.3) blur(2px)", scale: 0.9 },
          { 
            filter: "brightness(1) blur(0px)", 
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left center+=20%",
              end: "center center",
              toggleActions: "play reverse play reverse",
              scrub: true,
            }
          }
        );
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, { dependencies: [lang], scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-background overflow-hidden border-t border-white/5">
      
      {/* Overlay Title */}
      <div className="absolute top-12 left-12 z-50 pointer-events-none mix-blend-difference">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4"
        >
          <div className="w-10 h-[1px] bg-primary" />
          <h2 className="text-xs md:text-sm font-black text-white/40 tracking-[0.5em] uppercase">
            {lang === 'ar' ? 'المعرض الإبداعي' : 'Creative Gallery'}
          </h2>
        </motion.div>
      </div>

      <div 
        ref={scrollWrapperRef} 
        className="flex h-full will-change-transform items-center" 
        style={{ width: "max-content" }}
        dir="ltr"
      >
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-card-wrapper relative h-full w-screen flex items-center justify-center overflow-hidden shrink-0"
          >
            {/* Mega Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <span className="mega-text text-[24vw] font-black uppercase text-transparent opacity-5 select-none transition-opacity duration-1000"
                    style={{ WebkitTextStroke: '1px var(--foreground)' }}>
                {lang === 'ar' ? project.megaTextAr : project.megaTextEn}
              </span>
            </div>

            {/* Premium Project Card */}
            <div className="relative z-10 w-[85%] md:w-[75%] lg:w-[65%] aspect-[16/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] bg-black group">
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={project.img} 
                  alt={project.titleEn}
                  className="project-image w-full h-full object-cover grayscale-[60%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                  onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${project.id}/1920/1080`; }}
                />
                {/* Gradient Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-70" />
              </div>

              {/* Card Content Area */}
              <div className={`absolute bottom-0 w-full p-8 md:p-14 flex flex-col md:flex-row items-end justify-between gap-8 z-20 ${lang === 'ar' ? 'text-right' : 'text-left'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <div className="flex flex-col gap-4">
                  <motion.div className="flex items-center gap-4">
                    <span className="text-primary font-black text-3xl drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                      {project.id}
                    </span>
                    <div className="h-[1px] w-16 bg-primary/40" />
                    <span className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase">
                      {lang === 'ar' ? project.categoryAr : project.categoryEn}
                    </span>
                  </motion.div>
                  <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                    {lang === 'ar' ? project.titleAr : project.titleEn}
                  </h3>
                </div>
                
                {/* Floating Neon Action Button */}
                <button className="group relative w-20 h-20 rounded-full bg-white/5 backdrop-blur-2xl border border-white/20 flex items-center justify-center transition-all duration-500 hover:bg-primary hover:border-primary hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                  <ArrowUpRight size={36} className="text-white group-hover:text-black transition-colors duration-300" />
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>

              {/* Decorative Corner Light */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalProjects;