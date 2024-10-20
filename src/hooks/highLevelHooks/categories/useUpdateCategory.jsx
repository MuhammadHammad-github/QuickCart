import useFetch from "../../lowLevelHooks/useFetch";

const useUpdateCategory = (catId) => {
  const { refetch, fetching } = useFetch(
    `api/category/update`,
    "PUT",
    {
      id: catId,
      authtoken: localStorage.getItem("authTokenAdmin"),
    },
    {},
    true,
    false
  );
  const updateCategory = async (data) => await refetch(data);
  return { updateCategory, fetching };
};

export default useUpdateCategory;
