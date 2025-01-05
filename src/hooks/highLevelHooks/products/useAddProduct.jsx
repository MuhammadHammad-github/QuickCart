import useFetch from "../../lowLevelHooks/useFetch";
import {
  useFetchQuery,
  useMutateQuery,
} from "../../lowLevelHooks/useFetchQueries";

// const useAddProduct = () => {
//   const { refetch, fetching } = useFetch(
//     `api/product/create`,
//     "POST",
//     {
//       authtoken: localStorage.getItem("authTokenSeller"),
//     },
//     {},
//     false,
//     false
//   );
//   const addProduct = async (data) => await refetch(data);
//   return { addProduct, fetching };
// };
const useAddProduct = () => {
  const { refetch, fetching } = useMutateQuery(
    `api/product/create`,
    ["products"],
    { authtoken: localStorage.getItem("authTokenSeller") }
  );
  const addProduct = async (data) => await refetch(data);
  return { addProduct, fetching };
};

export default useAddProduct;
