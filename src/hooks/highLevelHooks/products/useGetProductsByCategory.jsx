import React, { useEffect } from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetProductsByCategory = (id) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/product/byCategory`,
    "GET",
    { id },
    {},
    false,
    false
  );
  useEffect(() => {
    if (!id || id === "null") return;
    console.log("hey", id);
    refetch();
  }, [id]);
  return {
    productsByCategory: fetchedData?.items,
    fetching,
    getProductsByCategory: refetch,
  };
};

export default useGetProductsByCategory;
