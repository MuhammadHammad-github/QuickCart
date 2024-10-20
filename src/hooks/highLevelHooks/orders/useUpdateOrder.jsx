import useFetch from "../../lowLevelHooks/useFetch";

const useUpdateOrder = (id) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/order/update`,
    "POST",
    { authtoken: localStorage.getItem("authTokenSeller"), id: id },
    {},
    true,
    false
  );
  const updateOrder = async (data) => await refetch(data);
  return {
    updateOrder,
    fetching,
  };
};

export default useUpdateOrder;
