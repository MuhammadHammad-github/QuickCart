import useFetch from "../../lowLevelHooks/useFetch";

const useGetSubCategories = () => {
  const { fetchedData, fetching, refetch } = useFetch(`api/subCategory/`);
  return {
    subCategories: fetchedData?.items,
    fetching,
    getSubCategories: refetch,
  };
};

export default useGetSubCategories;
