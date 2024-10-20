import React from "react";
import Slider from "react-slick/lib/slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "../../../components/NextArrow";
import PrevArrow from "../../../components/PrevArrow";
import CategoryCard from "../../../components/CategoryCard";
import useGetCategories from "../../../hooks/highLevelHooks/categories/useGetCategories";
const Categories = () => {
  const { categories } = useGetCategories();

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: categories?.length >= 4 ? 4 : categories?.length || 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow myClassName={"group-hover:!-right-2"} />,
    prevArrow: <PrevArrow myClassName={"group-hover:!-left-2"} />,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
  if (categories?.length > 0)
    return (
      <div className="my-20 group">
        <Slider {...settings}>
          {categories?.map((category, index) => {
            return (
              <CategoryCard
                image={category.image}
                key={index}
                name={category.name}
                id={category._id}
              />
            );
          })}
        </Slider>
      </div>
    );
};

export default Categories;
