import React, { useState } from "react";
import ProductCard from "../../../components/ProductCard";
import Slider from "react-slick/lib/slider";
import NextArrow from "../../../components/NextArrow";
import PrevArrow from "../../../components/PrevArrow";
import MyButton from "../../../components/MyButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGetFeaturedProducts from "../../../hooks/highLevelHooks/products/useGetFeaturedProducts";
import SkeletonProductCard from "../../../components/SkeletonProductCard";
const FeaturedAndSale = () => {
  const { featuredProducts, fetching } = useGetFeaturedProducts();
  const specifySlides = (number) => {
    return featuredProducts?.length >= number
      ? number
      : featuredProducts?.length || 1;
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: specifySlides(4),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow myClassName={"group-hover:!-right-2"} />,
    prevArrow: <PrevArrow myClassName={"group-hover:!-left-2"} />,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: specifySlides(3),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: specifySlides(2),
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="my-20">
      <div className="flex items-center justify-center">
        <h3>Featured Products</h3>
      </div>
      <div className="my-10 group">
        <ProductsSlider
          settings={settings}
          products={featuredProducts}
          fetching={fetching}
        />
      </div>
    </div>
  );
};

export default FeaturedAndSale;
const Tabs = ({ showFeatured, setShowFeatured }) => {
  return (
    <div className="flex items-center justify-center gap-5">
      <div
        onClick={() => setShowFeatured(true)}
        className={`${
          showFeatured && "!bg-secondary text-white"
        } bg-neutral-200 transitional  rounded-md py-4 min-w-max w-28 cursor-pointer`}
      >
        <h6 className="text-center">Featured</h6>
      </div>{" "}
      <div
        onClick={() => setShowFeatured(false)}
        className={`${
          !showFeatured && "!bg-secondary text-white"
        } bg-neutral-200 transitional  rounded-md py-4 min-w-max w-28 cursor-pointer`}
      >
        <h6 className="text-center">Sale</h6>
      </div>
    </div>
  );
};
const ProductsSlider = ({ settings, products = [], fetching }) => {
  return (
    <Slider {...settings}>
      {fetching && <SkeletonProductCard />}
      {fetching && <SkeletonProductCard />}
      {fetching && <SkeletonProductCard />}
      {!fetching &&
        products?.map((product, index) => {
          return <ProductCard product={product} key={index} />;
        })}
    </Slider>
  );
};
