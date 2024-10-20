import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetTotalPendingOrdersByRetailer = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/order/totalPendingOrdersByRetailer`,
    "GET",
    { authtoken: localStorage.getItem("authTokenSeller") }
  );
  return {
    totalPendingOrders: fetchedData?.totalItems,
    fetching,
    getTotalPendingOrders: refetch,
  };
};

export default useGetTotalPendingOrdersByRetailer;
