import React from "react";
import useFetch from "../../../lowLevelHooks/useFetch";

const useGetTotalBuyers = () => {
  const { fetchedData, fetching, refetch } = useFetch(`api/buyer/total`);
  return { totalBuyers: fetchedData?.totalItems, fetching, refetch };
};

export default useGetTotalBuyers;
