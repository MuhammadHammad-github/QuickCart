import React from "react";
import useFetch from "../../lowLevelHooks/useFetch";

const useGetTotalOrdersByBuyer = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/order/totalOrdersByBuyer`,
    "GET",
    { authtoken: localStorage.getItem("authTokenBuyer") }
  );
  return {
    totalOrders: fetchedData?.totalItems,
    fetching,
    getTotalOrders: refetch,
  };
};

export default useGetTotalOrdersByBuyer;
