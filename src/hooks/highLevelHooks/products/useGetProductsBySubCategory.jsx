import React, { useEffect } from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetProductsBySubCategory = (id) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/product/bySubCategory`,
    "GET",
    { id },
    {},
    false,
    false
  );
  useEffect(() => {
    if (!id || id === "null") return;
    refetch();
  }, [id]);
  return {
    productsBySubCategory: fetchedData?.items,
    fetching,
    getProductsBySubCategory: refetch,
  };
};

export default useGetProductsBySubCategory;
