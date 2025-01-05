import useFetch from "../../lowLevelHooks/useFetch";
import { useMutateQuery } from "../../lowLevelHooks/useFetchQueries";

// const useDeleteProduct = (productId, catId, subCatId) => {
//   const { refetch, fetching } = useFetch(
//     `api/product/delete`,
//     "DELETE",
//     {
//       id: productId,
//       category: catId,
//       subcategory: subCatId,
//       authtoken: localStorage.getItem("authTokenSeller"),
//     },
//     {},
//     true,
//     false
//   );
//   return { deleteProduct: refetch, fetching };
// };
const useDeleteProduct = (productId, catId, subCatId) => {
  const { refetch, fetching } = useMutateQuery(
    `api/product/delete`,
    ["products"],
    {
      id: productId,
      category: catId,
      subcategory: subCatId,
      authtoken: localStorage.getItem("authTokenSeller"),
    },
    "DELETE"
  );
  return { deleteProduct: refetch, fetching };
};

export default useDeleteProduct;
