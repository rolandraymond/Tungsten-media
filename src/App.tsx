import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async"; // 🚀 تمت إضافة Helmet
import { AnimatePresence } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LangProvider } from "@/lib/context-language";
import { ThemeProvider } from "@/lib/context-theme";
import { TrackingProvider } from "@/lib/tracking-provider";
import { useTranslation } from "@/hooks/use-translation"; // 🚀 استدعاء الترجمة لتغيير لغة الـ HTML

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/effects/Preloader";
import CustomCursor from "@/components/effects/CustomCursor";
import SmoothScroll from "@/components/effects/SmoothScroll";
import ScrollProgress from "@/components/effects/ScrollProgress";
import PageLoader from "@/components/effects/PageLoader";
import SkipToContent from "@/components/layout/SkipToContent";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const ServicesIndex = lazy(() => import("@/pages/ServicesIndex"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

// ==========================================
// 1. Global SEO Component (الإضافة الجديدة)
// ==========================================
const GlobalSeo = () => {
  const { lang } = useTranslation();
  const isAr = lang === "ar";

  return (
    <Helmet 
      // 🚀 الأهم للـ SEO: إخبار جوجل بلغة الصفحة واتجاهها ديناميكياً
      htmlAttributes={{ 
        lang: isAr ? "ar" : "en", 
        dir: isAr ? "rtl" : "ltr" 
      }}
      // 🚀 القالب الافتراضي لعناوين الصفحات (مثلاً: About | Tungsten)
      titleTemplate="%s | Tungsten"
      defaultTitle={isAr ? "تنجستن | وكالة رقمية إبداعية" : "Tungsten | Creative Digital Agency"}
    >
      <meta name="description" content={isAr ? "نصنع تجارب رقمية عالمية، من تطوير الويب المتطور إلى الهوية البصرية." : "We craft world-class digital experiences, from advanced web development to brand identity."} />
      
      {/* Fallback Open Graph / Social Media Meta Tags */}
      <meta property="og:site_name" content="Tungsten Creative" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

const ScrollRefresh = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <>
      <ScrollRefresh />
      <GlobalSeo /> {/* 🚀 تفعيل إعدادات الـ SEO الافتراضية لكل الموقع */}
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesIndex />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider>
        <LangProvider>
          <TooltipProvider>
            <BrowserRouter>
              <TrackingProvider>
                <SmoothScroll>
                  <div className="relative min-h-screen flex flex-col">
                    <SkipToContent /> {/* ممتاز للـ Accessibility والـ SEO */}
                    <Preloader />
                    <CustomCursor />
                    <ScrollProgress />
                    <Navbar />
                    <main id="main-content" className="flex-grow">
                      <AnimatedRoutes />
                    </main>
                    <Footer />
                  </div>
                </SmoothScroll>
              </TrackingProvider>
            </BrowserRouter>
          </TooltipProvider>
        </LangProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;