import useFetch from "../../lowLevelHooks/useFetch";
import { useFetchQuery } from "../../lowLevelHooks/useFetchQueries";

// const useGetProducts = (autoCall = true) => {
//   const { fetchedData, fetching, refetch } = useFetch(
//     `api/product/all`,
//     "GET",
//     {},
//     {},
//     false,
//     autoCall
//   );
//   return {
//     products: fetchedData?.items,
//     fetching,
//     getProducts: refetch,
//   };
// };
const useGetProducts = (autoCall = true) => {
  const { fetchedData, fetching, refetch } = useFetchQuery(`api/product/all`, [
    "products",
  ]);
  return {
    products: fetchedData?.items,
    fetching,
    getProducts: refetch,
  };
};
export default useGetProducts;
