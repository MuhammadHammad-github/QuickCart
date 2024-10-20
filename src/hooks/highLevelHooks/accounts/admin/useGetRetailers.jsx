import useFetch from "../../../lowLevelHooks/useFetch";
import { useEffect } from "react";

const useGetRetailers = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/admin/all`,
    "GET",
    {
      authToken: localStorage.getItem("authTokenAdmin"),
    },
    {},
    false,
    false
  );
  useEffect(() => {
    const token = localStorage.getItem("authTokenAdmin");
    if (token) refetch();
  }, []);
  return { retailers: fetchedData?.items, fetching, refetch };
};

export default useGetRetailers;
