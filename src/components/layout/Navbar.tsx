import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  Variants,
} from "framer-motion";
import { Menu, X, Sun, Moon, Globe2 } from "lucide-react";
import { useLang } from "@/lib/context-language";
import { useTheme } from "@/lib/context-theme";
import { useTranslation } from "@/hooks/use-translation";
import { services } from "@/data/services-data";

const navLinks = [
  { key: "nav.home", path: "/" },
  { key: "nav.about", path: "/about" },
  { key: "nav.services", path: "/services" },
  { key: "nav.contact", path: "/contact" },
  { key: "nav.profile", path: "/profile" },
];

const menuVariants: Variants = {
  initial: { opacity: 0, y: "-6%", scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", bounce: 0, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: "-6%",
    scale: 0.98,
    transition: { duration: 0.22 },
  },
};

const linkContainerVariants: Variants = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const linkItemVariants: Variants = {
  initial: { y: 16, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { y: 10, opacity: 0, transition: { duration: 0.18 } },
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const { t, lang } = useTranslation();
  const { lang: currentLang, setLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollYProgress, scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const slugMatch = location.pathname.match(/^\/services\/(.+)/);
  const currentSlug = slugMatch?.[1];
  const currentService = currentSlug
    ? services.find((s) => s.slug === currentSlug)
    : null;

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-3 sm:px-4 pt-3 sm:pt-6 pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.nav
          className={`pointer-events-auto relative flex items-center justify-between rounded-full bg-background/75 backdrop-blur-2xl shadow-2xl transition-all duration-500 overflow-hidden border border-border/30 ${
            isScrolled
              ? "py-2 px-3 sm:px-4 w-[96%] md:w-[85%] lg:w-[80%]"
              : "py-3 sm:py-4 px-3 sm:px-5 w-[100%] md:w-[90%] lg:w-[85%]"
          }`}
          layout
        >
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-border/40" />
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-primary shadow-[0_0_10px_var(--primary)]"
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          />

          {/* Logo */}
          <Link
            to="/"
            className="relative z-10 flex items-center gap-2 sm:gap-3 group h-8 sm:h-10 shrink-0"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={theme}
                src={theme === "dark" ? "/img/LogoDark.png" : "/img/LogoLight.png"}
                alt="Company Logo"
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
          </Link>

          {/* Desktop Nav */}
          <div
            className="hidden md:flex items-center gap-1 lg:gap-2"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);

              if (link.path === "/services" && currentService && active) {
                return (
                  <motion.div
                    layoutId="service-pill"
                    key="active-service-pill"
                    className="relative z-10 flex items-center gap-2 px-3 py-1 mx-1 bg-foreground/5 rounded-full border border-border/50 backdrop-blur-md"
                  >
                    <Link
                      to="/services"
                      className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t(link.key)}
                    </Link>
                    <motion.div
                      className="w-1 h-1 rounded-full bg-primary/80"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-widest text-primary drop-shadow-[0_0_5px_rgba(251,191,36,0.3)]">
                      {currentService.title[lang]}
                    </span>
                  </motion.div>
                );
              }

              return (
                <div key={link.key} className="relative flex items-center">
                  <Link
                    to={link.path}
                    onMouseEnter={() => setHoveredPath(link.path)}
                    className={`relative z-10 px-3 md:px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                      active || hoveredPath === link.path
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t(link.key)}
                    {(active || hoveredPath === link.path) && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 z-[-1] rounded-full bg-primary/10 border border-primary/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 relative z-10">
            {/* Desktop only */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => navigate("/contact")}
                className="group relative overflow-hidden rounded-full bg-primary/10 border border-primary/30 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:bg-primary hover:text-background hidden lg:block"
              >
                <span className="relative z-10 drop-shadow-sm">
                  {lang === "en" ? "Start Project" : "ابدأ مشروعك"}
                </span>
                <motion.div
                  className="absolute top-0 left-0 h-full w-[200%] bg-gradient-to-r from-transparent via-primary/40 to-transparent -skew-x-12 group-hover:hidden"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
              </button>

              <button
                onClick={toggleTheme}
                className="relative flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground overflow-hidden"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -30, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 30, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              <button
                onClick={() => setLang(currentLang === "en" ? "ar" : "en")}
                className="flex h-8 items-center justify-center gap-1.5 rounded-full px-2.5 text-[10px] font-bold text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground uppercase tracking-widest"
                aria-label="Toggle language"
              >
                <Globe2 size={12} />
                {currentLang === "en" ? "AR" : "EN"}
              </button>
            </div>

            {/* Mobile only: no X here, only Menu */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-colors active:scale-95"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -10, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 10, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                  </motion.div>
                </AnimatePresence>
              </button>

              <button
                onClick={() => setLang(currentLang === "en" ? "ar" : "en")}
                aria-label="Toggle language"
                className="flex h-9 min-w-9 items-center justify-center gap-1 rounded-full bg-foreground/5 px-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground transition-colors active:scale-95"
              >
                <Globe2 size={13} />
                <span className="leading-none">
                  {currentLang === "en" ? "AR" : "EN"}
                </span>
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="relative flex h-9 w-9 md:hidden items-center justify-center rounded-full bg-primary/10 text-foreground transition-transform active:scale-95 border border-primary/15"
            >
              <Menu size={18} />
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[98] bg-black/35 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            <motion.div
              variants={menuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-[99] bg-background/96 backdrop-blur-3xl flex flex-col px-5 pt-[calc(5.5rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
            >
              {/* Top bar - one close button only */}
              <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Menu
                  </span>
                </div>

                <button
                  onClick={closeMobileMenu}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-transform active:scale-95"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Links pushed upward */}
              <motion.div
                variants={linkContainerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-3"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.key} variants={linkItemVariants}>
                    <Link
                      to={link.path}
                      onClick={closeMobileMenu}
                      className="group flex items-center justify-between rounded-2xl border border-border/40 bg-foreground/5 px-4 py-4 active:scale-[0.99] transition-transform"
                    >
                      <span
                        className={`text-3xl sm:text-4xl font-black uppercase tracking-tighter transition-colors duration-300 ${
                          isActive(link.path)
                            ? "text-primary"
                            : "text-foreground group-hover:text-primary"
                        }`}
                      >
                        {t(link.key)}
                      </span>

                      <div
                        className={`h-2.5 w-2.5 rounded-full transition-all ${
                          isActive(link.path)
                            ? "bg-primary shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                            : "bg-border"
                        }`}
                      />
                    </Link>
                  </motion.div>
                ))}

                {currentService && location.pathname.startsWith("/services") && (
                  <motion.div variants={linkItemVariants} className="mt-1 pl-1">
                    <span className="text-sm text-primary/80 font-medium tracking-wider">
                      ↳ {currentService.title[lang]}
                    </span>
                  </motion.div>
                )}

                {/* CTA lower, after links */}
                <motion.div variants={linkItemVariants} className="mt-5 w-full">
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      navigate("/contact");
                    }}
                    className="group relative w-full overflow-hidden rounded-2xl bg-primary px-6 py-5 text-center text-lg font-black uppercase tracking-[0.2em] text-background shadow-[0_0_30px_rgba(251,191,36,0.25)] transition-transform active:scale-95"
                  >
                    <span className="relative z-10">
                      {lang === "en" ? "Start Project" : "ابدأ مشروعك"}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12"
                      animate={{ x: ["-180%", "180%"] }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                    />
                  </button>
                </motion.div>
              </motion.div>

              <div className="mt-auto pt-6 text-center text-[11px] tracking-[0.25em] uppercase text-muted-foreground/70">
                {lang === "en" ? "Navigate freely" : "تصفح براحتك"}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;