import useFetch from "../../lowLevelHooks/useFetch";

const useGetTotalCompletedOrdersByRetailer = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/order/totalCompletedOrdersByRetailer`,
    "GET",
    { authtoken: localStorage.getItem("authTokenSeller") }
  );
  return {
    totalCompletedOrders: fetchedData?.totalItems,
    fetching,
    getTotalCompletedOrders: refetch,
  };
};

export default useGetTotalCompletedOrdersByRetailer;
