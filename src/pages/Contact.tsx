"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  Star,
  Phone,
  BadgeCheck,
  BrainCircuit,
  LayoutPanelLeft,
  Target,
  Zap,
} from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import PageTransition from "@/components/effects/PageTransition";
import Seo from "@/hooks/use-seo";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

type Locale = "ar" | "en";

type Copy = {
  seoTitle: string;
  badge: string;
  headline: string;
  headlineAccent: string;
  description: string;
  note: string;
  responseTime: string;
  formTitle: string;
  formHint: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  successDetail: string;
  error: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  companyPlaceholder: string;
  messagePlaceholder: string;
  selectService: string;
  selectBudget: string;
  selectTimeline: string;
  services: string[];
  budgets: string[];
  timelines: string[];
  stats: { label: string; value: string }[];
  validation: {
    required: string;
    email: string;
  };
};

const copyByLocale: Record<Locale, Copy> = {
  ar: {
    seoTitle: "تواصل معنا",
    badge: "Project Inquiry",
    headline: "صفحة تواصل بريميم للمشاريع التسويقية",
    headlineAccent: "جاهزة لاستقبال المشاريع الجادة",
    description:
      "اكتب تفاصيل مشروعك بوضوح، وسنحوّلها إلى خطوة عملية مباشرة. الصفحة مصممة لتبدو فاخرة، واضحة، وسهلة الاستخدام على الموبايل والكمبيوتر.",
    note: "استجابة مرتبة ومظهر يليق بوكالة تسويق حديثة",
    responseTime: "عادةً نرد خلال 24 ساعة عمل",
    formTitle: "تفاصيل المشروع",
    formHint: "املأ الحقول الأساسية للحصول على رد سريع ومناسب لمجال عملك.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    company: "اسم الشركة / البراند",
    service: "نوع الخدمة",
    budget: "الميزانية",
    timeline: "المدة المتوقعة",
    message: "رسالة المشروع",
    send: "إرسال الطلب",
    sending: "جارٍ الإرسال...",
    success: "تم إرسال رسالتك بنجاح.",
    successDetail: "سنراجع الطلب ونتواصل معك في أقرب وقت.",
    error: "حدث خطأ أثناء إرسال الرسالة.",
    contactTitle: "تواصل مباشر",
    contactEmail: "hello@youragency.com",
    contactPhone: "+20 XXX XXX XXXX",
    companyPlaceholder: "مثال: Tungsten Studio",
    messagePlaceholder: "اكتب نبذة مختصرة عن المشروع، الأهداف، وما الذي تحتاجه منّا.",
    selectService: "اختر الخدمة",
    selectBudget: "حدد الميزانية",
    selectTimeline: "اختر المدة",
    services: [
      "استراتيجية العلامة التجارية",
      "إدارة السوشيال ميديا",
      "إعلانات ممولة",
      "صناعة المحتوى",
      "SEO",
      "Landing Page / Website",
      "إدارة تسويقية كاملة",
    ],
    budgets: ["أقل من 1000$", "1000$ - 3000$", "3000$ - 7500$", "7500$+", "قابل للنقاش"],
    timelines: ["في أقرب وقت", "خلال أسبوعين", "خلال شهر", "مرن"],
    stats: [
      { label: "وضوح", value: "Brief → Action" },
      { label: "سرعة", value: "Fast Reply" },
      { label: "احترافية", value: "Premium UX" },
    ],
    validation: {
      required: "هذا الحقل مطلوب",
      email: "بريد إلكتروني صحيح مطلوب",
    },
  },
  en: {
    seoTitle: "Contact",
    badge: "Project Inquiry",
    headline: "A premium contact page for marketing projects",
    headlineAccent: "built for serious inquiries",
    description:
      "Share your project details clearly and turn them into a direct next step. The page is designed to feel premium, refined, and effortless on mobile and desktop.",
    note: "A polished experience fit for a modern marketing agency",
    responseTime: "We usually reply within 24 business hours",
    formTitle: "Project Details",
    formHint: "Fill in the essentials so we can respond with clarity and relevance.",
    name: "Name",
    email: "Email",
    company: "Company / Brand",
    service: "Service",
    budget: "Budget",
    timeline: "Timeline",
    message: "Project Message",
    send: "Send Request",
    sending: "Sending...",
    success: "Your message has been sent successfully.",
    successDetail: "We will review your inquiry and reply as soon as possible.",
    error: "An error occurred while sending your message.",
    contactTitle: "Direct Contact",
    contactEmail: "hello@youragency.com",
    contactPhone: "+20 XXX XXX XXXX",
    companyPlaceholder: "e.g. Tungsten Studio",
    messagePlaceholder: "Write a short brief about the project, goals, and what you need from us.",
    selectService: "Select a service",
    selectBudget: "Select budget",
    selectTimeline: "Select timeline",
    services: [
      "Brand Strategy",
      "Social Media Marketing",
      "Performance Ads",
      "Content Creation",
      "SEO",
      "Landing Page / Website",
      "Full Marketing Retainer",
    ],
    budgets: ["Under $1,000", "$1,000 - $3,000", "$3,000 - $7,500", "$7,500+", "Prefer to discuss"],
    timelines: ["As soon as possible", "Within 2 weeks", "Within 1 month", "Flexible"],
    stats: [
      { label: "Clarity", value: "Brief → Action" },
      { label: "Speed", value: "Fast Reply" },
      { label: "Craft", value: "Premium UX" },
    ],
    validation: {
      required: "This field is required",
      email: "A valid email is required",
    },
  },
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  useEffect(() => {
    const readLocale = (): Locale => {
      if (typeof document === "undefined") return "en";
      const lang = (document.documentElement.lang || "en").toLowerCase();
      return lang.startsWith("ar") ? "ar" : "en";
    };

    setLocale(readLocale());
    if (typeof document === "undefined") return;

    const observer = new MutationObserver(() => setLocale(readLocale()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang", "dir"],
    });

    return () => observer.disconnect();
  }, []);

  const copy = copyByLocale[locale];
  const isRtl = locale === "ar";

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSubmitted(false);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          source: "Marketing Agency Contact Page",
          locale,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.error || copy.error);
      }

      setSubmitted(true);
      reset();
      window.setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : copy.error);
    } finally {
      setLoading(false);
    }
  };

  const services = useMemo(() => copy.services, [copy.services]);
  const budgets = useMemo(() => copy.budgets, [copy.budgets]);
  const timelines = useMemo(() => copy.timelines, [copy.timelines]);

  return (
    <PageTransition>
      <Seo title={copy.seoTitle} />

      <div dir={isRtl ? "rtl" : "ltr"} className="relative min-h-screen overflow-hidden bg-background pt-24 text-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--primary-rgb),0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(var(--primary-rgb),0.10),transparent_28%)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <section className="relative py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-5xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur-xl"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                {copy.badge}
              </motion.div>

              <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl lg:text-7xl">
                <RevealText className="block text-foreground">{copy.headline}</RevealText>
                <span className="mt-2 block bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50 bg-clip-text text-transparent">
                  {copy.headlineAccent}
                </span>
              </h1>

              <motion.p
                className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.6 }}
              >
                {copy.description}
              </motion.p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
                <Chip>
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {copy.note}
                </Chip>
                <Chip>
                  <Zap className="h-3.5 w-3.5" />
                  {copy.responseTime}
                </Chip>
                <Chip>
                  <Star className="h-3.5 w-3.5" />
                  Premium Contact Experience
                </Chip>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mx-auto mt-14 max-w-5xl rounded-[2rem] border border-border/70 bg-card/80 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.10)] backdrop-blur-2xl md:p-6"
            >
              <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
                <aside className="relative overflow-hidden rounded-[1.75rem] border border-border bg-background p-6 md:p-8">
                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute -bottom-16 left-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary shadow-sm">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{copy.contactTitle}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{copy.formHint}</p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                      {copy.stats.map((item) => (
                        <div key={item.label} className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm">
                          <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{item.label}</div>
                          <div className="mt-2 text-sm font-semibold text-foreground">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* <div className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-5">
                      <ContactRow icon={Mail} label={copy.email} value={copy.contactEmail} rtl={isRtl} />
                      <ContactRow icon={Phone} label={isRtl ? "الهاتف" : "Phone"} value={copy.contactPhone} rtl={isRtl} />
                    </div> */}
                  </div>
                </aside>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 rounded-[1.75rem] border border-border bg-background p-6 md:p-8"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label={copy.name} error={errors.name} rtl={isRtl} validationMessage={copy.validation.required}>
                      <input
                        {...register("name", { required: true })}
                        dir={isRtl ? "rtl" : "ltr"}
                        className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
                        placeholder={isRtl ? "اسمك" : "Your name"}
                      />
                    </Field>

                    <Field label={copy.email} error={errors.email} rtl={isRtl} validationMessage={copy.validation.email}>
                      <input
                        {...register("email", {
                          required: true,
                          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        })}
                        dir="ltr"
                        type="email"
                        className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
                        placeholder={isRtl ? "بريدك الإلكتروني" : "Your email"}
                      />
                    </Field>
                  </div>

                  <Field label={copy.company} rtl={isRtl}>
                    <input
                      {...register("company")}
                      dir={isRtl ? "rtl" : "ltr"}
                      className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
                      placeholder={copy.companyPlaceholder}
                    />
                  </Field>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label={copy.service} rtl={isRtl}>
                      <select
                        {...register("service")}
                        dir={isRtl ? "rtl" : "ltr"}
                        className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
                      >
                        <option value="">{copy.selectService}</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label={copy.budget} rtl={isRtl}>
                      <select
                        {...register("budget")}
                        dir={isRtl ? "rtl" : "ltr"}
                        className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
                      >
                        <option value="">{copy.selectBudget}</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label={copy.timeline} rtl={isRtl}>
                    <select
                      {...register("timeline")}
                      dir={isRtl ? "rtl" : "ltr"}
                      className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
                    >
                      <option value="">{copy.selectTimeline}</option>
                      {timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label={copy.message} error={errors.message} rtl={isRtl} validationMessage={copy.validation.required}>
                    <textarea
                      {...register("message", { required: true })}
                      dir={isRtl ? "rtl" : "ltr"}
                      rows={7}
                      className="w-full resize-none rounded-2xl border border-border bg-card px-4 py-3.5 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
                      placeholder={copy.messagePlaceholder}
                    />
                  </Field>

                  <div className="pt-2">
                    <MagneticButton>
                      <span className="flex items-center gap-2">
                        {loading ? copy.sending : copy.send}
                        <Send size={16} />
                      </span>
                    </MagneticButton>
                  </div>

                  <AnimatePresence mode="wait">
                    {submitted && (
                      <motion.div
                        key="success"
                        className="flex items-start gap-3 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                        <div>
                          <div className="font-semibold">{copy.success}</div>
                          <div className="mt-1 text-foreground/80">{copy.successDetail}</div>
                        </div>
                      </motion.div>
                    )}

                    {submitError && !submitted && (
                      <motion.div
                        key="error"
                        className="rounded-2xl border border-destructive/25 bg-destructive/10 p-4 text-sm text-destructive"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        {submitError}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

function Field({
  label,
  children,
  error,
  rtl,
  validationMessage,
}: {
  label: string;
  children: React.ReactNode;
  error?: { message?: string };
  rtl?: boolean;
  validationMessage?: string;
}) {
  return (
    <label className={`block ${rtl ? "text-right" : "text-left"}`}>
      <span className="mb-2 block text-sm font-medium text-foreground/90">{label}</span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-destructive">
          {validationMessage ?? (rtl ? "هذا الحقل مطلوب" : "This field is required")}
        </span>
      )}
    </label>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm backdrop-blur">
      {children}
    </span>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  rtl,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  rtl?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 ${rtl ? "text-right" : "text-left"}`}>
      <div className="rounded-xl border border-primary/20 bg-primary/10 p-2 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="mt-1 text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

export default Contact;
