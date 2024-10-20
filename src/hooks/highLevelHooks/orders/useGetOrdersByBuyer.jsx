import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetOrdersByBuyer = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/order/buyerOrders`,
    "GET",
    { authtoken: localStorage.getItem("authTokenBuyer") }
  );
  return {
    buyerOrders: fetchedData?.items,
    fetching,
    getOrders: refetch,
  };
};

export default useGetOrdersByBuyer;
