import { useEffect } from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetSubCategoriesByCategory = (category) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/subCategory/byCategory`,
    "GET",
    { id: category },
    {},
    false,
    false
  );
  useEffect(() => {
    if (!category) return;
    refetch();
  }, [category]);
  return {
    subCategories: fetchedData?.items,
    fetching,
    getSubCategories: refetch,
  };
};

export default useGetSubCategoriesByCategory;
