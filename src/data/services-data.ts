import type { Lang } from "./translations";

export interface Service {
  slug: string;
  icon: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  features: Record<Lang, string[]>;
}

export const services: Service[] = [
  {
    slug: "seo",
    icon: "Search",
    title: { en: "SEO & Organic Growth", ar: "تحسين محركات البحث والنمو العضوي" },
    description: {
      en: "Dominate search results with data-driven SEO strategies that compound over time. We engineer visibility that converts.",
      ar: "تصدر نتائج البحث باستراتيجيات تحسين محركات البحث المبنية على البيانات والتي تتراكم بمرور الوقت.",
    },
    features: {
      en: ["Technical SEO Audits", "Content Strategy", "Link Building", "Local SEO", "Analytics & Reporting"],
      ar: ["تدقيق SEO التقني", "استراتيجية المحتوى", "بناء الروابط", "SEO المحلي", "التحليلات والتقارير"],
    },
  },
  {
    slug: "web-development",
    icon: "Code",
    title: { en: "Web Development", ar: "تطوير المواقع" },
    description: {
      en: "Pixel-perfect, blazing-fast web experiences built with modern frameworks. Performance is not optional — it's our standard.",
      ar: "تجارب ويب مثالية وسريعة للغاية مبنية بأحدث الأطر البرمجية. الأداء ليس اختيارياً — إنه معيارنا.",
    },
    features: {
      en: ["React & Next.js", "Headless CMS", "E-Commerce", "Progressive Web Apps", "API Development"],
      ar: ["React و Next.js", "نظام إدارة محتوى", "التجارة الإلكترونية", "تطبيقات ويب تقدمية", "تطوير API"],
    },
  },
  {
    slug: "branding",
    icon: "Palette",
    title: { en: "Brand Identity", ar: "الهوية البصرية" },
    description: {
      en: "Forge unforgettable brand identities that resonate. From logo to full brand systems — we craft stories that stick.",
      ar: "صياغة هويات علامات تجارية لا تُنسى وتحقق صدى. من الشعار إلى أنظمة العلامة الكاملة.",
    },
    features: {
      en: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy", "Packaging Design"],
      ar: ["تصميم الشعار", "إرشادات العلامة", "الهوية البصرية", "استراتيجية العلامة", "تصميم التغليف"],
    },
  },
  {
    slug: "social-media",
    icon: "Share2",
    title: { en: "Social Media Marketing", ar: "التسويق عبر وسائل التواصل" },
    description: {
      en: "Build communities, spark conversations, and drive engagement across every platform that matters to your audience.",
      ar: "بناء المجتمعات وإثارة المحادثات وتعزيز التفاعل عبر كل منصة تهم جمهورك.",
    },
    features: {
      en: ["Content Creation", "Community Management", "Paid Social", "Influencer Marketing", "Analytics"],
      ar: ["إنشاء المحتوى", "إدارة المجتمع", "الإعلانات المدفوعة", "التسويق عبر المؤثرين", "التحليلات"],
    },
  },
  {
    slug: "performance-marketing",
    icon: "TrendingUp",
    title: { en: "Performance Marketing", ar: "التسويق القائم على الأداء" },
    description: {
      en: "Every dollar tracked, every conversion optimized. We run paid campaigns that deliver measurable, scalable results.",
      ar: "كل دولار يتم تتبعه، كل تحويل يتم تحسينه. نحن ندير حملات مدفوعة تحقق نتائج قابلة للقياس.",
    },
    features: {
      en: ["Google Ads", "Meta Ads", "Conversion Optimization", "A/B Testing", "ROI Tracking"],
      ar: ["إعلانات Google", "إعلانات Meta", "تحسين التحويل", "اختبار A/B", "تتبع العائد"],
    },
  },
  {
    slug: "ui-ux-design",
    icon: "Figma",
    title: { en: "UI/UX Design", ar: "تصميم واجهات المستخدم" },
    description: {
      en: "Human-centered design that delights users and drives business goals. Beautiful interfaces backed by real user research.",
      ar: "تصميم يركز على الإنسان يسعد المستخدمين ويحقق أهداف العمل. واجهات جميلة مدعومة ببحث حقيقي.",
    },
    features: {
      en: ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Design Systems"],
      ar: ["بحث المستخدم", "التخطيط الشبكي", "النماذج الأولية", "اختبار قابلية الاستخدام", "أنظمة التصميم"],
    },
  },
];
