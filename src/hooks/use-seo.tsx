import { Helmet } from "react-helmet-async";
import { useLang } from "@/lib/context-language";

interface SeoProps {
  title: string;
  description?: string;
}

const Seo = ({ title, description }: SeoProps) => {
  const { lang } = useLang();
  const fullTitle = `${title} | Tungsten Marketing`;
  const desc = description || (lang === "ar"
    ? "وكالة تسويق رقمي وتكنولوجيا متميزة"
    : "Premium Digital Marketing & Technology Agency");

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} />
    </Helmet>
  );
};

export default Seo;
