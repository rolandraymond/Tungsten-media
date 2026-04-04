import { useLang } from "@/lib/context-language";
import { translations } from "@/data/translations";

export const useTranslation = () => {
  const { lang } = useLang();
  const t = (key: string): string => translations[key]?.[lang] ?? key;
  return { t, lang };
};
