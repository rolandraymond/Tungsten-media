import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Code, Palette, Share2, TrendingUp, Figma, ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { services } from "@/data/services-data";
import SpotlightCard from "@/components/ui/SpotlightCard";
import RevealText from "@/components/ui/RevealText";
import PageTransition from "@/components/effects/PageTransition";
import Seo from "@/hooks/use-seo";

const iconMap: Record<string, React.ElementType> = {
  Search, Code, Palette, Share2, TrendingUp, Figma,
};

const ServicesIndex = () => {
  const { t, lang } = useTranslation();

  return (
    <PageTransition>
      <Seo title={t("services.title")} description={t("services.subtitle")} />
      <div className="pt-24">
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <RevealText className="text-foreground">{t("services.title")}</RevealText>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("services.subtitle")}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service, i) => {
                const Icon = iconMap[service.icon] || Search;
                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link to={`/services/${service.slug}`}>
                      <SpotlightCard className="cursor-pointer h-full">
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                            <Icon className="h-7 w-7 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              {service.title[lang]}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                              {service.description[lang]}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {service.features[lang].slice(0, 3).map((f) => (
                                <span
                                  key={f}
                                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                              Learn more <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </SpotlightCard>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default ServicesIndex;
