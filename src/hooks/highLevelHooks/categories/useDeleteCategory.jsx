import useFetch from "../../lowLevelHooks/useFetch";

const useDeleteCategory = (catId) => {
  const { refetch, fetching } = useFetch(
    `api/category/delete`,
    "DELETE",
    {
      id: catId,
      authtoken: localStorage.getItem("authTokenAdmin"),
    },
    {},
    true,
    false
  );

  return { deleteCategory: refetch, fetching };
};

export default useDeleteCategory;
