import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import PageTransition from "@/components/effects/PageTransition";
import Seo from "@/hooks/use-seo";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <PageTransition>
      <Seo title={t("contact.title")} />
      <div className="pt-24">
        <section className="py-24">
          <div className="container mx-auto px-6 max-w-2xl">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <RevealText className="text-foreground">{t("contact.title")}</RevealText>
              </h1>
              <motion.p
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {t("contact.subtitle")}
              </motion.p>
            </div>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.name")}
                </label>
                <input
                  {...register("name", { required: true })}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder={t("contact.name")}
                />
                {errors.name && (
                  <span className="text-xs text-destructive mt-1">Required</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.email")}
                </label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  type="email"
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder={t("contact.email")}
                />
                {errors.email && (
                  <span className="text-xs text-destructive mt-1">Valid email required</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("contact.message")}
                </label>
                <textarea
                  {...register("message", { required: true })}
                  rows={5}
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder={t("contact.message")}
                />
                {errors.message && (
                  <span className="text-xs text-destructive mt-1">Required</span>
                )}
              </div>

              <div className="pt-4">
                <MagneticButton>
                  <span className="flex items-center gap-2">
                    {t("contact.send")} <Send size={16} />
                  </span>
                </MagneticButton>
              </div>

              {submitted && (
                <motion.div
                  className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-center text-primary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {t("contact.success")}
                </motion.div>
              )}
            </motion.form>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;
