import { useEffect } from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetRetailerProducts = (id) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/product/retailerProducts`,
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
    retailerProducts: fetchedData?.items,
    fetching,
    getProducts: refetch,
  };
};

export default useGetRetailerProducts;
