import useFetch from "../../../lowLevelHooks/useFetch";

const useGetTotalSellers = () => {
  const { fetchedData, fetching, refetch } = useFetch(`api/retailer/total`);
  return { totalSellers: fetchedData?.totalItems, fetching, refetch };
};

export default useGetTotalSellers;
