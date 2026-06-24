import Hero from "@/components/Hero";
import ExpertChefs from "@/components/ExpertChefs";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedRecipes from "@/components/FeaturedRecipes";
import PopularRecipes from "@/components/PopularRecipes";

export default function Home() {
  return (
    <div>
       <Hero></Hero>
       <FeaturedRecipes></FeaturedRecipes>
       <PopularRecipes></PopularRecipes>
       <ExpertChefs></ExpertChefs>
       <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
