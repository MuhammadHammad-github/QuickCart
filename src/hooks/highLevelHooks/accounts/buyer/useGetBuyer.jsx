import { useNavigate } from "react-router-dom";
import useFetch from "../../../lowLevelHooks/useFetch";
import { useEffect } from "react";

const useGetBuyer = () => {
  const navigate = useNavigate();
  const { fetchedData, fetching, refetch } = useFetch(
    `api/buyer/`,
    "GET",
    {
      authtoken: localStorage.getItem("authTokenBuyer"),
    },
    {},
    false,
    false
  );
  useEffect(() => {
    const token = localStorage.getItem("authTokenBuyer");
    if (token) refetch();
  }, []);
  useEffect(() => {
    console.log(fetchedData);
    if (!fetchedData) return;
    if (fetchedData?.action === "logout") {
      localStorage.removeItem("authTokenBuyer");
      navigate("/loginBuyer");
    }
  }, [fetchedData]);
  return { buyerData: fetchedData?.account, fetching, refetch };
};

export default useGetBuyer;
