"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();

  // 1. إعداد Lenis (باستخدام RequestAnimationFrame الأصلي)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // سرعة السكرول (ثانية وجزءين)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // محرك الحركة البديل لـ GSAP Ticker
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // بدء المحرك
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. تصفير السكرول عند تغيير المسار (Pathname)
  useEffect(() => {
    if (lenisRef.current) {
      // السكرول بيرجع للصفر فوراً بدون أنيميشن عشان اليوزر ميحسش بلخبطة
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return (
    <div className="smooth-scroll-wrapper relative">
      {children}
    </div>
  );
};

export default SmoothScroll;