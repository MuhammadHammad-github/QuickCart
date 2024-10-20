import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetFeaturedProducts = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/product/featured`,
    "GET",
    {},
    {},
    false
  );
  return {
    featuredProducts: fetchedData?.items,
    fetching,
    getProducts: refetch,
  };
};

export default useGetFeaturedProducts;
