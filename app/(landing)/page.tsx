import { LandingContent } from "@/components/ui/LandingContent";
import { LandingHero } from "@/components/ui/LandingHero";
import { LandingNavbar } from "@/components/ui/Landingnavbar";

const LandingPage = () => {
  return (
    <div className="h-full ">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default LandingPage;
