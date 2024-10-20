import useFetch from "../../lowLevelHooks/useFetch";

const useDeleteSlide = (id) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/slide/delete`,
    "DELETE",
    {
      authtoken: localStorage.getItem("authTokenAdmin"),
      id,
    },
    {},
    false,
    false
  );
  const deleteSlide = async (body) => await refetch(body);
  return {
    fetching,
    deleteSlide,
  };
};

export default useDeleteSlide;
