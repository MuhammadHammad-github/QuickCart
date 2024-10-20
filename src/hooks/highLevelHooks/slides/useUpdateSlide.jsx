import useFetch from "../../lowLevelHooks/useFetch";

const useUpdateSlide = (id) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/slide/update`,
    "PUT",
    {
      authtoken: localStorage.getItem("authTokenAdmin"),
      id,
    },
    {},
    true,
    false
  );
  const updateSlide = async (body) => await refetch(body);
  return {
    fetching,
    updateSlide,
  };
};

export default useUpdateSlide;
