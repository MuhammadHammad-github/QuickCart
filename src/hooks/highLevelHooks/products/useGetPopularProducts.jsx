import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetPopularProducts = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/product/popular`,
    "GET",
    {},
    {},
    false
  );
  return {
    products: fetchedData?.items,
    fetching,
    getProducts: refetch,
  };
};

export default useGetPopularProducts;
