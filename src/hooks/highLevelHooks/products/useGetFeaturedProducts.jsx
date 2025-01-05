import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";
import { useFetchQuery } from "../../lowLevelHooks/useFetchQueries";

// const useGetFeaturedProducts = () => {
//   const { fetchedData, fetching, refetch } = useFetch(
//     `api/product/featured`,
//     "GET",
//     {},
//     {},
//     false
//   );
//   return {
//     featuredProducts: fetchedData?.items,
//     fetching,
//     getProducts: refetch,
//   };
// };
const useGetFeaturedProducts = () => {
  const { fetchedData, fetching, refetch } = useFetchQuery(
    `api/product/featured`,
    ["products", { type: "featured" }]
  );
  return {
    featuredProducts: fetchedData?.items,
    fetching,
    getProducts: refetch,
  };
};

export default useGetFeaturedProducts;
