import useFetch from "../../lowLevelHooks/useFetch";

const useUpdateSubCategory = (subCatId) => {
  const { refetch, fetching } = useFetch(
    `api/subCategory/update`,
    "PUT",
    {
      id: subCatId,
      authtoken: localStorage.getItem("authTokenAdmin"),
    },
    {},
    true,
    false
  );

  const updateSubCategory = async (data) => {
    await refetch(data);
  };
  return { updateSubCategory, fetching };
};

export default useUpdateSubCategory;
