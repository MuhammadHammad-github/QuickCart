import React from "react";
import useFetch from "../../../lowLevelHooks/useFetch";

const useGetBuyers = () => {
  const { fetchedData, fetching, refetch } = useFetch(`api/buyer/all`, "GET");
  return { buyers: fetchedData?.items };
};

export default useGetBuyers;
