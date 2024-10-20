import React from "react";
import Hero from "./components/HomeComponents/Hero";
import Features from "./components/HomeComponents/Features";
import SubCategories from "./components/HomeComponents/SubCategories";
import FeaturedAndSale from "./components/HomeComponents/FeaturedAndSale";
import Popular from "./components/HomeComponents/Popular";
import Categories from "./components/HomeComponents/Categories";

const Home = () => {
  return (
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
  );
};

export default Home;
