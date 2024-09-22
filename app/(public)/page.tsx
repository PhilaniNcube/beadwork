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
     <HomePageCallToAction />
    </div>
  );
}
