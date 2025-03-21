
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import Layout from "@/components/layout/layout";

export default function Home() {
  return (
    <Layout>
     
          <div className="space-y-12">
              <HeroSection/>
              <FeaturesSection/>
          </div>
      
   
    </Layout>
  );
}
