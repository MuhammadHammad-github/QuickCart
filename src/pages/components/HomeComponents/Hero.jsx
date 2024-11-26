import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick/lib/slider";
import MyButton from "../../../components/MyButton";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import NextArrow from "../../../components/NextArrow";
import PrevArrow from "../../../components/PrevArrow";
import useGetSlides from "../../../hooks/highLevelHooks/slides/useGetSlides";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const Hero = () => {
  const navigate = useNavigate();
  const { slides } = useGetSlides();
  const settings = {
    dots: false,
    infinite: slides?.length > 1 ? true : false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="overflow-x-hidden group">
      {slides ? (
        <Slider {...settings}>
          {slides?.map((slide, index) => {
            return (
              <div
                key={index}
                className="!grid md:grid-cols-2 grid-cols-1 min-h-[50vh] bg-gradient-to-r from-neutral1-100  to-neutral1 p-10"
              >
                <div className=" md:block hidden">
                  <img
                    loading="lazy"
                    src={slide.image}
                    alt="slide image"
                    className="max-w-full mx-auto  h-[26rem] object-contain"
                  />
                </div>
                <div className=" flex flex-col gap-5 justify-center ">
                  <h1 className=" leading-tight text-white">
                    {slide.heading.slice(0, 14)}
                    <br />
                    {slide.heading.slice(14)}
                  </h1>
                  <p className="text-white">{slide.text}</p>
                  <MyButton
                    text={"Shop Now"}
                    onClick={() => navigate(slide.link)}
                  />
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <Skeleton
          variant="rectangular"
          width={210}
          height={60}
          className="!w-full !h-[50vh]"
        />
      )}
    </section>
  );
};

export default Hero;
