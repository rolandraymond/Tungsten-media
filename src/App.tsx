import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LangProvider } from "@/lib/context-language";
import { ThemeProvider } from "@/lib/context-theme";
import { TrackingProvider } from "@/lib/tracking-provider";
import { useTranslation } from "@/hooks/use-translation";

// Layout & Components
import WhatsAppButton from "@/components/layout/WhatsAppButton";
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
// 1. Global SEO Component
// ==========================================
const GlobalSeo = () => {
  const { lang } = useTranslation();
  const location = useLocation();
  
  const isAr = lang === "ar";
  const siteName = "Tungsten Media Agency";
  const currentUrl = `https://tungsten-media.com${location.pathname}`;

  const defaultTitle = isAr 
    ? "تونجستين ميديا | وكالة تسويق رقمي وحلول برمجيات" 
    : "Tungsten Media Agency | Digital Marketing & Software Solutions";
    
  const description = isAr 
    ? "تونجستين ميديا هي وكالتك المتكاملة للتسويق الرقمي، تطوير المواقع، وحلول السوفتوير الذكية. نصنع تجارب رقمية تضاعف نمو أعمالك." 
    : "Tungsten Media is your full-service agency for digital marketing, web development, and smart software solutions. We craft digital experiences that multiply your business growth.";

  const keywords = isAr
    ? "تسويق رقمي, ديجيتال ماركتنج, تطوير برمجيات, تصميم مواقع, Tungsten Media Agency, حلول سوفتوير"
    : "Digital Marketing, Software Development, Web Design, Tungsten Media Agency, Software Solutions";

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": "https://tungsten-media.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://tungsten-media.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet 
      htmlAttributes={{ lang: isAr ? "ar" : "en", dir: isAr ? "rtl" : "ltr" }}
      titleTemplate={`%s | ${siteName}`}
      defaultTitle={defaultTitle}
    >
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://tungsten-media.com/img/og-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://tungsten-media.com/img/og-image.jpg" />
      <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
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
      <GlobalSeo />
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
                    <SkipToContent /> 
                    <Preloader />
                    <CustomCursor />
                    <ScrollProgress />
                    <Navbar />
                    
                    <main id="main-content" className="flex-grow">
                      <AnimatedRoutes />
                    </main>
                    
                    {/* 🚀 الـ WhatsApp Button ثابت هنا ليرافق المستخدم في كل الصفحات */}
                    <WhatsAppButton />
                    
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