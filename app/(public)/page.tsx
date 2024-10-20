import CategoriesSection from "./_components/home/categories-section";
import FeaturedProducts from "./_components/home/featured-products";
import HomepageAbout from "./_components/home/homepage-about";
import HomePageCallToAction from "./_components/home/homepage-call-to-action";
import HomepageHero from "./_components/home/homepage-hero";

export default async function Home() {

  return (
    <div className="">
     <HomepageHero />
     {/* <HomepageAbout /> */}
     <FeaturedProducts />
     <CategoriesSection />
     <HomePageCallToAction />
    </div>
  );
}
