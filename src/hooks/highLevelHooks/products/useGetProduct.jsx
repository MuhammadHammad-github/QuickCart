import React, { useEffect } from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetProduct = (id) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/product/`,
    "GET",
    {
      id,
    },
    {},
    false,
    false
  );
  useEffect(() => {
    if (!id) return;
    refetch();
  }, [id]);
  return {
    product: fetchedData?.item,
    fetching,
    getProduct: refetch,
  };
};

export default useGetProduct;
