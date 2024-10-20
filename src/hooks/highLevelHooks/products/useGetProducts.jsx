import useFetch from "../../lowLevelHooks/useFetch";

const useGetProducts = (autoCall = true) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/product/all`,
    "GET",
    {},
    {},
    false,
    autoCall
  );
  return {
    products: fetchedData?.items,
    fetching,
    getProducts: refetch,
  };
};

export default useGetProducts;
