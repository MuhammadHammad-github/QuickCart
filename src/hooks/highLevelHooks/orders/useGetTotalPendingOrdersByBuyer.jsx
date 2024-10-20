import useFetch from "../../lowLevelHooks/useFetch";

const useGetTotalPendingOrdersByBuyer = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/order/totalPendingOrdersByBuyer`,
    "GET",
    { authtoken: localStorage.getItem("authTokenBuyer") }
  );
  return {
    totalPendingOrders: fetchedData?.totalItems,
    fetching,
    getTotalPendingOrders: refetch,
  };
};

export default useGetTotalPendingOrdersByBuyer;
