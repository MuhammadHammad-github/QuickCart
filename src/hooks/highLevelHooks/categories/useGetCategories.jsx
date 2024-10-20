import useFetch from "../../lowLevelHooks/useFetch";

const useGetCategories = () => {
  const { fetchedData, fetching, refetch } = useFetch(`api/category/`);
  return {
    categories: fetchedData?.items,
    fetching,
    getCategories: refetch,
  };
};

export default useGetCategories;
