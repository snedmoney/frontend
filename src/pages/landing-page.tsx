import AnimatedSupportedChains from "@/components/landingPage/animated-supported-chains";
import HeroSection from "@/components/landingPage/hero-section";
import ProblemsSection from "@/components/landingPage/problems-section";
import FeaturesBenefitsSection from "@/components/landingPage/features-benefits-section";
import FAQSection from "@/components/landingPage/faq-section";
import PoweredBySection from "@/components/landingPage/powered-by-section";
import CTASection from "@/components/landingPage/cta-section";
import Footer from "@/components/landingPage/footer-section";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <AnimatedSupportedChains />
      <ProblemsSection />
      {/* <FeaturesScroll /> */}
      <FeaturesBenefitsSection />
      <FAQSection />
      <CTASection />
      <PoweredBySection />
      <Footer />
    </div>
  );
};

export default LandingPage;
