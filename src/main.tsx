import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 1. البحث عن العنصر الأساسي بشكل آمن وسريع
const rootElement = document.getElementById("root");

// 2. التحقق لمنع الشاشة البيضاء التي تدمر أرشفة جوجل (SEO Fatal Error)
if (!rootElement) {
  throw new Error("Critical Error: Failed to find the root element. Check your index.html file.");
}

// 3. بناء التطبيق باستخدام أحدث معايير React 18+ لضمان أسرع وقت استجابة (TTFB)
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ==========================================
// 🚀 World-Class SEO Addition: Core Web Vitals (أحدث معايير جوجل)
// ==========================================

// 🚀 حل مشكلة ESLint: تعريف نوع دقيق للبيانات بدلاً من استخدام 'any'
type ReportCallback = (metric: unknown) => void;

const reportWebVitals = (onPerfEntry?: ReportCallback) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    // يتم استدعاء المكتبة بشكل ديناميكي (Lazy Load) حتى لا تبطئ التحميل الأولي
    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry); // ثبات العناصر على الشاشة (Cumulative Layout Shift)
      
      // 🚀 حل مشكلة TypeScript: استخدام INP بدلاً من FID (المقياس الأحدث من جوجل)
      onINP(onPerfEntry); // سرعة استجابة الموقع للتفاعلات المعقدة (Interaction to Next Paint)
      
      onFCP(onPerfEntry); // سرعة ظهور أول عنصر (First Contentful Paint)
      onLCP(onPerfEntry); // سرعة تحميل أكبر عنصر في الشاشة (Largest Contentful Paint)
      onTTFB(onPerfEntry); // سرعة استجابة السيرفر (Time to First Byte)
    });
  }
};

// يمكنك تشغيلها لطباعة النتائج في الـ Console أثناء التطوير
// أو ربطها بـ Google Analytics / Vercel Analytics لاحقاً
// reportWebVitals(console.log);