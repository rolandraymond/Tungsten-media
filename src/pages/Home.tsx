import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import MetricsSection from "@/components/sections/MetricsSection";
import Marquee from "@/components/sections/Marquee";
import HorizontalShowcase from "@/components/sections/HorizontalShowcase";
import CTASection from "@/components/sections/CTASection";
import PageTransition from "@/components/effects/PageTransition";
import Seo from "@/hooks/use-seo";
import HorizontalProjects from "@/components/sections/HorizontalProjects";

const Home = () => {
  return (
    <PageTransition>
      <Seo title="Home" description="Tungsten Marketing — We Power Brands Digitally. Strategy, Design, Technology, Results." />
      <Hero />
      {/* <HorizontalProjects /> */}
      <Marquee />
      <MetricsSection />
      <ServicesGrid />
      <HorizontalShowcase />
      <CTASection />
    </PageTransition>
  );
};

export default Home;
