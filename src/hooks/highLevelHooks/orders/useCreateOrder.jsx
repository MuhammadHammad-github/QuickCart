import useFetch from "../../lowLevelHooks/useFetch";

const useCreateOrder = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/order/create`,
    "POST",
    { authtoken: localStorage.getItem("authTokenBuyer") },
    {},
    false,
    false
  );
  const createOrder = async (data) => await refetch(data);
  return {
    createOrder,
    fetching,
  };
};

export default useCreateOrder;
