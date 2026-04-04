import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Search, Code, Palette, Share2, TrendingUp, Figma } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { services } from "@/data/services-data";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import PageTransition from "@/components/effects/PageTransition";
import Seo from "@/hooks/use-seo";
import { useNavigate } from "react-router-dom";

const iconMap: Record<string, React.ElementType> = {
  Search, Code, Palette, Share2, TrendingUp, Figma,
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = iconMap[service.icon] || Search;

  return (
    <PageTransition>
      <Seo title={service.title[lang]} description={service.description[lang]} />
      <div className="pt-24">
        <section className="py-24">
          <div className="container mx-auto px-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              {t("service.back")}
            </Link>

            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <motion.div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Icon className="h-8 w-8 text-primary" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <RevealText className="text-foreground">{service.title[lang]}</RevealText>
                </h1>

                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {service.description[lang]}
                </motion.p>

                <MagneticButton onClick={() => navigate("/contact")}>
                  {t("service.cta")}
                </MagneticButton>
              </div>

              <div>
                {/* Video placeholder */}
                <motion.div
                  className="aspect-video rounded-2xl bg-card border border-border mb-10 flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10">
                      <div className="h-0 w-0 border-l-[16px] border-t-[10px] border-b-[10px] border-l-primary border-t-transparent border-b-transparent ml-1" />
                    </div>
                    <span className="text-sm text-muted-foreground">Tungsten Showcase</span>
                  </div>
                </motion.div>

                {/* Features */}
                <h3 className="text-xl font-bold text-foreground mb-6">{t("service.features")}</h3>
                <div className="space-y-4">
                  {service.features[lang].map((feature, i) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-3 rounded-xl border border-border p-4 bg-card"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-tungsten">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <span className="text-foreground font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default ServiceDetail;
