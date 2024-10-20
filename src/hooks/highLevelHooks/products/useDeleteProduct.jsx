import useFetch from "../../lowLevelHooks/useFetch";

const useDeleteProduct = (productId, catId, subCatId) => {
  const { refetch, fetching } = useFetch(
    `api/product/delete`,
    "DELETE",
    {
      id: productId,
      category: catId,
      subcategory: subCatId,
      authtoken: localStorage.getItem("authTokenSeller"),
    },
    {},
    true,
    false
  );
  return { deleteProduct: refetch, fetching };
};

export default useDeleteProduct;
