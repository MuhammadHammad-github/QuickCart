import useFetch from "../../lowLevelHooks/useFetch";

const useDeleteSubCategory = (subCatId, catId) => {
  const { refetch, fetching } = useFetch(
    `api/subCategory/delete`,
    "DELETE",
    {
      id: subCatId,
      authtoken: localStorage.getItem("authTokenAdmin"),
      category: catId,
    },
    {},
    true,
    false
  );

  return { deleteSubCategory: refetch, fetching };
};

export default useDeleteSubCategory;
