import Hero from "@/components/Hero";
import ExpertChefs from "@/components/ExpertChefs";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedRecipes from "@/components/FeaturedRecipes";

export default function Home() {
  return (
    <div>
       <Hero></Hero>
       <FeaturedRecipes></FeaturedRecipes>
       <ExpertChefs></ExpertChefs>
       <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
