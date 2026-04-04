import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 1. البحث عن العنصر الأساسي بشكل آمن
const rootElement = document.getElementById("root");

// 2. التحقق لمنع الشاشة البيضاء (White Screen of Death) التي تدمر الـ SEO
if (!rootElement) {
  throw new Error("Critical Error: Failed to find the root element. Check your index.html file.");
}

// 3. بناء التطبيق باستخدام أحدث معايير React 18+
const root = createRoot(rootElement);

root.render(
  // StrictMode لا يظهر في الإنتاج (Production)، لكنه يضمن لك في التطوير أن الكود سريع وخالٍ من المشاكل
  <React.StrictMode>
    <App />
  </React.StrictMode>
);