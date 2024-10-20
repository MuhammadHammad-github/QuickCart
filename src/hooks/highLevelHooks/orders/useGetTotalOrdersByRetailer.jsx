import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetTotalOrdersByRetailer = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/order/totalRetailerOrders`,
    "GET",
    { authtoken: localStorage.getItem("authTokenSeller") }
  );
  return {
    totalRetailerOrders: fetchedData?.totalItems,
    fetching,
    getTotalOrders: refetch,
  };
};

export default useGetTotalOrdersByRetailer;
