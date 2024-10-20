import useFetch from "../../../lowLevelHooks/useFetch";
import { useEffect } from "react";

const useGetAdmin = (authToken) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `api/admin/`,
    "GET",
    {
      authToken,
    },
    {},
    false,
    false
  );
  useEffect(() => {
    const token = localStorage.getItem("authTokenAdmin");
    if (token) refetch();
  }, []);
  useEffect(() => {
    if (!fetchedData) return;
    if (fetchedData?.action === "logout") {
      localStorage.removeItem("authTokenAdmin");
    }
  }, [fetchedData]);
  return { adminData: fetchedData, fetching };
};

export default useGetAdmin;
