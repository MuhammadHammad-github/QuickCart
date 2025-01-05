import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";
import { useFetchQuery } from "../../lowLevelHooks/useFetchQueries";

// const useGetPopularProducts = () => {
//   const { fetchedData, fetching, refetch } = useFetch(
//     `api/product/popular`,
//     "GET",
//     {},
//     {},
//     false
//   );
//   return {
//     products: fetchedData?.items,
//     fetching,
//     getProducts: refetch,
//   };
// };
const useGetPopularProducts = () => {
  const { fetchedData, fetching, refetch } = useFetchQuery(
    `api/product/popular`,
    ["products", { type: "popular" }]
  );
  return {
    products: fetchedData?.items,
    fetching,
    getProducts: refetch,
  };
};

export default useGetPopularProducts;
