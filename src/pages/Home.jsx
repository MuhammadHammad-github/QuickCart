import React, { lazy, Suspense } from "react";
// import Hero from "./components/HomeComponents/Hero";
// import Features from "./components/HomeComponents/Features";
// import SubCategories from "./components/HomeComponents/SubCategories";
// import FeaturedAndSale from "./components/HomeComponents/FeaturedAndSale";
// import Popular from "./components/HomeComponents/Popular";
// import Categories from "./components/HomeComponents/Categories";
import MyLoader from "../components/MyLoader";
const Hero = lazy(() => import("./components/HomeComponents/Hero"));
const Features = lazy(() => import("./components/HomeComponents/Features"));
const SubCategories = lazy(() =>
  import("./components/HomeComponents/SubCategories")
);
const FeaturedAndSale = lazy(() =>
  import("./components/HomeComponents/FeaturedAndSale")
);
const Popular = lazy(() => import("./components/HomeComponents/Popular"));
const Categories = lazy(() => import("./components/HomeComponents/Categories"));

const Home = () => {
  return (
    <Suspense fallback={<MyLoader />}>
      <div>
        <Hero />
        <div className="respPx20">
          <Features />
          <SubCategories />
          <FeaturedAndSale />
          <Popular />
          <Categories />
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
