import React from "react";
import MiniProductCard from "../../../components/MiniProductCard";
import MyButton from "../../../components/MyButton";
import useGetPopularProducts from "../../../hooks/highLevelHooks/products/useGetPopularProducts";
const Popular = () => {
  const { products } = useGetPopularProducts();

  if (products && products.length > 0)
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
