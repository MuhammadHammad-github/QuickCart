import useFetch from "../../lowLevelHooks/useFetch";
import { useFetchQuery } from "../../lowLevelHooks/useFetchQueries";

// const useGetTotalProducts = () => {
//   const { fetchedData, fetching, refetch } = useFetch(
//     `api/product/totalProducts`
//   );
//   return {
//     totalProducts: fetchedData?.totalItems,
//     fetching,
//     getTotalProducts: refetch,
//   };
// };
const useGetTotalProducts = () => {
  const { fetchedData, fetching, refetch } = useFetchQuery(
    `api/product/totalProducts`,
    ["totalProducts"]
  );
  return {
    totalProducts: fetchedData?.totalItems,
    fetching,
    getTotalProducts: refetch,
  };
};

export default useGetTotalProducts;
