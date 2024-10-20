import { useNavigate } from "react-router-dom";
import useFetch from "../../../lowLevelHooks/useFetch";
import { useEffect } from "react";

const useGetSeller = () => {
  const navigate = useNavigate();
  const { fetchedData, fetching, refetch } = useFetch(
    `api/retailer/`,
    "GET",
    {
      authtoken: localStorage.getItem("authTokenSeller"),
    },
    {},
    false,
    false
  );
  useEffect(() => {
    const token = localStorage.getItem("authTokenSeller");
    if (token) refetch();
  }, []);
  useEffect(() => {
    if (!fetchedData) return;
    if (fetchedData?.action === "logout") {
      localStorage.removeItem("authTokenSeller");
      navigate("/loginSeller");
    }
  }, [fetchedData]);
  return { sellerData: fetchedData?.account, fetching };
};

export default useGetSeller;
