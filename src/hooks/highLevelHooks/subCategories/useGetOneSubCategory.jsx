import { useEffect } from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetOneSubCategory = (subCategoryId) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/subCategory/one`,
    "GET",
    {
      id: subCategoryId,
    },
    {},
    false,
    false
  );
  useEffect(() => {
    if (!subCategoryId) return;
    refetch();
  }, [subCategoryId]);
  return {
    subCategory: fetchedData?.item,
    fetchingSubCategory: fetching,
    refetch,
  };
};

export default useGetOneSubCategory;
