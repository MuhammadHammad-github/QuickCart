import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetOrdersByRetailer = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/order/retailerOrders`,
    "GET",
    { authtoken: localStorage.getItem("authTokenSeller") }
  );
  return {
    retailerOrders: fetchedData?.items,
    fetching,
    getOrders: refetch,
  };
};

export default useGetOrdersByRetailer;
