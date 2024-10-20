import useFetch from "../../lowLevelHooks/useFetch";

const useGetTotalProducts = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/product/totalProducts`
  );
  return {
    totalProducts: fetchedData?.totalItems,
    fetching,
    getTotalProducts: refetch,
  };
};

export default useGetTotalProducts;
