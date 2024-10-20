import React from "react";
import MiniProductCard from "../../../components/MiniProductCard";
import MyButton from "../../../components/MyButton";
import useGetPopularProducts from "../../../hooks/highLevelHooks/products/useGetPopularProducts";
const Popular = () => {
  const { products } = useGetPopularProducts();
  const popularProducts = [
    {
      images: ["/shoes.png"],
      name: "Gents Shoes, Good for jogging.",
      originalPrice: 100,
      salePrice: 80,
    },
    {
      images: ["/shoes_white.png"],
      name: "Gents Shoes, Good for jogging.",
      originalPrice: 100,
      salePrice: 80,
    },
    {
      images: ["/smart_watch.png"],
      name: "Gents Shoes, Good for jogging.",
      originalPrice: 100,
      salePrice: 80,
    },
    {
      images: ["/cap.png"],
      name: "Gents Shoes, Good for jogging.",
      originalPrice: 100,
      salePrice: 80,
    },
    {
      images: ["/purse_khaki.png"],
      name: "Gents Shoes, Good for jogging.",
      originalPrice: 100,
      salePrice: 80,
    },
    {
      images: ["/shoes.png"],
      name: "Gents Shoes, Good for jogging.",
      originalPrice: 100,
      salePrice: 80,
    },
    {
      images: ["/shoes.png"],
      name: "Gents Shoes, Good for jogging.",
      originalPrice: 100,
      salePrice: 80,
    },
    {
      images: ["/shoes.png"],
      name: "Gents Shoes, Good for jogging.",
      originalPrice: 100,
      salePrice: 80,
    },
    {
      images: ["/shoes.png"],
      name: "Gents Shoes, Good for jogging.",
      originalPrice: 100,
      salePrice: 80,
    },
  ];
  return (
    <div className="my-20">
      <h2 className="text-center">Popular Products</h2>
      <div className="resp3ColGrid gap-8 my-10">
        {products?.map((product, index) => {
          return (
            <MiniProductCard
              id={product._id}
              image={product.images[0]}
              name={product.name}
              originalPrice={product.originalPrice}
              salePrice={product.salePrice}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
