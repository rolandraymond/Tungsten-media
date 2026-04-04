import PageTransition from "@/components/effects/PageTransition";
import Seo from "@/hooks/use-seo";
import { useTranslation } from "@/hooks/use-translation";
import AboutHero from "@/components/sections/AboutHero";
import AboutMission from "@/components/sections/AboutMission";
import AboutTimeline from "@/components/sections/AboutTimeline";
import AboutValues from "@/components/sections/AboutValues";
import KineticText from "@/components/sections/KineticText";
const About = () => {
  const { t } = useTranslation();

  return (
    <PageTransition>
      <Seo title={t("about.title")} />
      <main className="bg-background overflow-x-hidden">
        <AboutHero />
        <AboutMission />
        <KineticText />
        <AboutTimeline />
        <AboutValues />
      </main>
    </PageTransition>
  );
};

export default About;