import { useEffect } from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetOneCategory = (categoryId) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/category/one`,
    "GET",
    {
      id: categoryId,
    },
    {},
    false,
    false
  );
  useEffect(() => {
    if (!categoryId) return;
    refetch();
  }, [categoryId]);
  return {
    category: fetchedData?.item,
    fetchingCategory: fetching,
    refetch,
  };
};

export default useGetOneCategory;
